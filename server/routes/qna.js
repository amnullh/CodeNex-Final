const express = require('express');
const {userVerification} = require('../middlewares/AuthMiddleware');

const router = express.Router();

const {postQuestion, getallQuestions, addComment} = require('../controllers/qna_controller');

router.post('/post-question', userVerification, postQuestion);
router.get('/get-questions', getallQuestions);
router.post('/add-comment', userVerification, addComment);

module.exports = router;