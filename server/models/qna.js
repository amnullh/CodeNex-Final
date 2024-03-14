const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema(
    {
        content: {
            type: String,
            required: true
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        question: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Question',
            required: true
        }
    },
    {
    timestamps: true
    }
);

const QuestionSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        category: {
            type: String,
            required: true
        },
        // Array of top-level comments (no nested comments)
        comments: [CommentSchema],
    },
    {
    timestamps: true
    }
);

const Question = mongoose.model('Question', QuestionSchema)

module.exports = Question;
