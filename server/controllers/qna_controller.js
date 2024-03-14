const Question = require('../models/qna');

module.exports.postQuestion = async function(req, res) {
  try {

    const { title, description, category } = req.body;
    const username = req.user.username; // Assuming you have a way to get the logged-in user's username from the request

    const newQuestion = new Question({
      title,
      description,
      category,
      username,
    });

    const savedQuestion = await newQuestion.save();

    res.status(201).json({ message: 'Question created successfully!', question: savedQuestion });

  } catch (error) {

    console.error(error);
    res.status(500).json({ message: 'Error creating question' });

  }
};

module.exports.getallQuestions = async function(req, res){
    try {
      const questions = await Question.find();
      res.status(200).json({ questions });
    } catch (error) {
      //console.error(error);
      res.status(500).json({ message: 'Error fetching questions' });
    }
};
  

module.exports.addComment = async function(req, res){
  try {

    const { questionId, answer } = req.body;
    const userId = req.user.id; // Assuming you have a way to get the logged-in user ID from the request

    const question = await Question.findById(questionId);

    if (!question) {
      return res.status(404).json({ message: 'Question not found' });
    }

    const newComment = {
      answer,
      user: userId,
    };

    question.comments.push(newComment);

    const updatedQuestion = await question.save();

    res.status(200).json({ message: 'Comment added successfully!', question: updatedQuestion });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error adding comment' });
  }
};

