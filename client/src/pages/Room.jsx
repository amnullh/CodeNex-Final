import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import { v4 as uuidV4 } from "uuid";
import toast from "react-hot-toast";
import { ToastContainer } from "react-toastify";

// import '../css/dashboard.css'
// import '../js/home.js'
import "../css/Sign.css";

const Home = () => {
  const [roomId, setRoomId] = useState("");

  const createNewRoom = (e) => {
    e.preventDefault();
    const id = uuidV4();
    setRoomId(id);
    toast.success("Created a new Room");
  };

  const joinRoom = () => {
    if (!roomId || !username) {
      toast.error("Room ID & Username is required");
      return;
    }

    navigate(`/editor/${roomId}`, {
      state: { username },
    });
  };

  const handleSubmit = (e) => {
    if (e.code === "Enter") {
      joinRoom();
    }
  };

  const navigate = useNavigate();
  const [cookies, removeCookie] = useCookies([]);
  const [username, setUsername] = useState("");
  useEffect(() => {
    const verifyCookie = async () => {
      if (!cookies.token) {
        navigate("/");
      }
      const { data } = await axios.post(
        "http://localhost:4000",
        {},
        { withCredentials: true }
      );
      const { status, user } = data;
      setUsername(user);
      return status
        ? console.log("verified")
        : (removeCookie("token"), navigate("/"));
    };
    verifyCookie();
  }, [cookies, navigate, removeCookie]);
  const Logout = () => {
    removeCookie("token");
    navigate("/");
  };
  return (
    <div className="log-page">
      {/* Hi {username}, <br/>*/}
      {/* <button onClick={Logout}>LOGOUT</button>  */}

      <nav>
        <img
          src={require("../images/codenex.png")}
          alt="CodeNex Logo"
          style={{ height: "50px" }}
        />
        <div style={{ display: "flex", alignItems: "center" }}>
          <a href="#">Discussion</a>
          <button className="nav-button" onClick={Logout}>
            LOGOUT
          </button>
          {/* <a href="#" onClick={Logout}>Logout</a> */}
          Hey, &nbsp;<span>{username}</span>
          <img
            src={require("../images/user.png")}
            alt="Avatar"
            style={{ height: "30px", borderRadius: "50%" }}
          />
        </div>
      </nav>

      <div className="log-body">
        <div className="code-card">
          <div className="code-card-text">
            <h2 style={{ color: "#512da8" }}>CodeNex Compiler</h2>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginTop: "-30px",
              }}
            >
              <h1>Hands-on Practice</h1>
              <Link to={"/editor"}>
                <button class="button">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    height="24"
                    width="24"
                  >
                    <path
                      fill="white"
                      d="M23.15 2.587L18.21 0.210001C17.9308 0.075557 17.6167 0.031246 17.3113 0.083204C17.0058 0.135162 16.724 0.280818 16.505 0.500001L7.04499 9.13L2.92499 6.002C2.73912 5.86101 2.50976 5.78953 2.27669 5.79994C2.04363 5.81035 1.82156 5.902 1.64899 6.059L0.326993 7.261C0.223973 7.35465 0.141644 7.46878 0.0852761 7.59608C0.0289081 7.72339 -0.00025659 7.86106 -0.000350724 8.00028C-0.000444857 8.1395 0.0285336 8.27721 0.0847294 8.40459C0.140925 8.53197 0.2231 8.64621 0.325993 8.74L3.89899 12L0.325993 15.26C0.2231 15.3538 0.140925 15.468 0.0847294 15.5954C0.0285336 15.7228 -0.000444857 15.8605 -0.000350724 15.9997C-0.00025659 16.1389 0.0289081 16.2766 0.0852761 16.4039C0.141644 16.5312 0.223973 16.6454 0.326993 16.739L1.64999 17.94C1.82256 18.097 2.04463 18.1887 2.27769 18.1991C2.51076 18.2095 2.74012 18.138 2.92599 17.997L7.04599 14.869L16.506 23.499C16.7248 23.7182 17.0064 23.8639 17.3117 23.9159C17.6171 23.9679 17.931 23.9235 18.21 23.789L23.152 21.412C23.4062 21.2893 23.6207 21.0973 23.7707 20.8581C23.9207 20.619 24.0002 20.3423 24 20.06V3.939C24 3.65647 23.9203 3.37967 23.7699 3.14048C23.6195 2.90129 23.4046 2.70943 23.15 2.587ZM18.004 17.448L10.826 12L18.004 6.552V17.448Z"
                    ></path>
                  </svg>
                  <p class="text">Try it Yourself</p>
                </button>
              </Link>
            </div>

            <p>
              Run, test and experiment with your code without worrying about tedious installation process in our online code editor, all within your browser.
            </p>
          </div>
          {/* 
<div class="card">
<div class="card__content">
  
</div></div> */}

          <img
            src={require("../images/codenex-editor.png")}
            alt="CodeNex Editor"
            style={{ width: "700px", borderRadius: "15px" }}
          />
        </div>


      <div classSsName='code-card' style={{ 'marginTop':'15px'}}>
      <h1 style={{ color: "#512da8", 'text-align': 'center' }}>Code & Collab</h1>
      <p style={{ width: '450px', 'textAlign': 'center' }}>
              Want to code together with your friends or want to join a contest created by your teacher? Create or join a room and start coding together.
            </p>
        <div className="log-container create-room" id="log-container" >
        
          <div className="log-form-container log-sign-in" >
            
            <div className="log-form">
              <h1>Create or Join Room</h1>
              <input
                type="text"
                placeholder="Room ID"
                onChange={(e) => setRoomId(e.target.value)}
                value={roomId}
                onKeyUp={handleSubmit}
              />
              <input
                type="text"
                placeholder="Username"
                onChange={(e) => setUsername(e.target.value)}
                value={username}
                onKeyUp={handleSubmit}
              />
              <button onClick={joinRoom}>Join</button>
              <p>
                If you don't have an invite link, create one &nbsp;
                <a onClick={createNewRoom} href="#" className="createNewBtn">
                  new room
                </a>
              </p>
            </div>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
