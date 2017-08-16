var express = require('express');
var request = require('request')
var app = express();

app.use(express.static('public'));
app.use(express.static('node_modules'));

app.get('/buses', function(req, res, next) {
    request('http://optibus-interview.herokuapp.com/', function(err, response, body) {
        if (err) {
            next(err);
        } else if (response.headers['content-type'] === "application/json") {
            res.send(body)
        } else {
            next(new Error('Invalid Data Format: Expected JSON'))
        }
    })
})

//not for production, debug use only
app.use(function(err, req, res, next) {
    res.status(500);
    res.send({
        message: err.message,
        error: err
    });
})

app.listen(8000, function() {
    console.log("Listening on 8000");
})