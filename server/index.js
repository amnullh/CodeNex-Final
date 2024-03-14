const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
require("dotenv").config();
const cookieParser = require("cookie-parser");
const authRoute = require("./Routes/AuthRoute");
const { MONGO_URL, PORT } = process.env;

const { generateFile } = require("./generateFile");
const { addJobToQueue } = require("./jobQueue");
const Job = require("./models/Job");


// const compilerConnection = mongoose.connect(
//   MONGO_URL,
//   {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//   },
//   (err) => {
//       if (err) {
//           console.error(err);
//           process.exit(1);
//       }
//       console.log("Successfully connected to compiler mongodb database");
//   }
// );


const compilerConnection =mongoose
  .connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB is  connected successfully"))
  .catch((err) => console.error(err));

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(cookieParser());

app.use(express.json());
app.get("/status", async (req, res) => {
  const jobId = req.query.id;
  if (jobId === undefined) {
      return res
          .status(400)
          .json({ success: false, error: "missing id query param" });
  }
  try {
      const job = await Job.findById(jobId);
      if (job === undefined) {
          return res
              .status(404)
              .json({ success: false, error: "invalid job id" });
      }
      return res.status(200).json({ success: true, job });
  } catch (err) {
      return res
          .status(400)
          .json({ success: false, error: JSON.stringify(err) });
  }
});

app.post("/run", async (req, res) => {
  const { language = "python", code, input = "" } = req.body;
  if (code === undefined) {
      return res
          .status(400)
          .json({ success: false, error: "Empty code body" });
  }

  let job;

  try {
      // generate c++ file with content from request
      const files = await generateFile(language, code, input);

      const [filepath, inputFilePath] = files;

      job = await new Job({ language, filepath, inputFilePath }).save({ connection: compilerConnection });
      // console.log(job);

      const jobId = job["_id"];
      addJobToQueue(jobId);

      res.status(201).json({ success: true, jobId });
  } catch (err) {
      return res
          .status(500)
          .json({ success: false, err: JSON.stringify(err) });
  }
});


app.use("/", authRoute);