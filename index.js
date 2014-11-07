var express = require('express')
var app = express();
var wkhtmltopdf = require('wkhtmltopdf');
var fs = require('fs');
var bodyParser = require('body-parser');

app.set('port', (process.env.PORT || 5000))

app.use(express.static(__dirname + '/public'));
app.use(bodyParser());

app.get('/', function(req, res) {
  fs.readFile(__dirname + '/public/index.html', 'utf8', function(err, index){
    res.send(index);
  });
});

app.post('/receipts', function(req, res){
  console.log(req.body);
});

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'))
})
