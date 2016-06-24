var request = require('request');
var cheerio = require('cheerio');
var fs      = require('fs');

var images = [];

request("https://www.bbc.com", function(err, res, body) {
  if(!err && res.statusCode == 200) {
    var $ = cheerio.load(body);
    $('img.img-replace', 'div.module__content').each(function() {
      var img = $(this).attr('src');

      images.push(img);
    });
    // var test = fs.createWriteStream('cat' + i + '.jpg')
    for(var i = 0; i < images.length; i++) {
      request(images[i]).pipe(fs.createWriteStream('images/bbc' + i + '.jpg'));
    }

    console.log(images);
  }

});