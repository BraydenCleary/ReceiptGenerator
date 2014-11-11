var express = require('express');
var app = express();
var wkhtmltopdf = require('wkhtmltopdf');
var fs = require('fs');
var bodyParser = require('body-parser');
var _ = require('underscore');
var sleep = require('sleep');

app.set('port', (process.env.PORT || 5000))

app.use(express.static(__dirname + '/public'));
app.use(bodyParser());

app.get('/', function(req, res) {
  fs.readFile(__dirname + '/public/index.html', 'utf8', function(err, index){
    res.send(index);
  });
});

app.post('/receipts', function(req, res){
  var receipt = req.body.receipt
  var dates = req.body.receipt.dates.split(',')
  var receipts = dates.map(function(date){
    individual_receipt = {
      vendor: receipt.vendor,
      amount: receipt.amount,
      location: receipt.location,
      time: receipt.time,
      date: date
    }
    return individual_receipt
  })

  _.each(receipts, function(receipt){
    var filename = receipt.vendor + "_" + receipt.time + "_" + receipt.date
    fs.readFile(__dirname + '/public/receipt.html', 'utf8', function(err, template){
      var compiled = _.template(template);
      sleep.sleep(1);
      var tempFile = fs.writeFile(filename + '.html', compiled(receipt));
      fs.readFile(__dirname + '/' + filename + '.html', 'utf8', function(err, template){
        wkhtmltopdf(template, {output: filename + '.pdf'});
      })
    })
  })
});

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'))
})
