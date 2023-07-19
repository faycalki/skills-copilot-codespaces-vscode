// Create web server application

// Import modules
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');

// Import database
const db = require('./db');

// Create web server
const app = express();

// Apply middleware
app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(cors());

// Create route
app.get('/comments', (req, res) => {
    db.Comment.find({}, 'title content', (error, comments) => {
        if (error) {
            console.error(error);
        }
        res.send({
            comments: comments
        })
    }).sort({_id: -1})
}
);

// Create route
app.post('/comments', (req, res) => {
    const dbComment = new db.Comment({
        title: req.body.title,
        content: req.body.content
    });
    dbComment.save(error => {
        if (error) {
            console.error(error);
        }
        res.send({
            success: true,
            message: 'Comment saved successfully!'
        });
    });
}
);

// Listen to port
app.listen(process.env.PORT || 8081);

// Path: db.js
// Import modules
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define database schema
const commentSchema = new Schema({
    title: String,
    content: String
});

// Create database model
const ModelClass = mongoose.model('comment', commentSchema);

// Export database model
module.exports = ModelClass;

// Path: index.js
