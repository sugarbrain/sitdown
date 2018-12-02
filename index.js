var express = require('express');
var app = express();
var path = require('path');

app.use('/', express.static('./src/view'));

// viewed at http://localhost:3000
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/src/view/index.html'));
});

app.listen(3000);
console.log("Listening at http://localhost:3000");