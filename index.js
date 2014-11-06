var express = require('express')
var app = express();

app.set('port', (process.env.PORT || 5000))

app.get('/', function(request, response) {
  response.send("<h1>Brayden's Receipt Generator</h1>");
});

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'))
})