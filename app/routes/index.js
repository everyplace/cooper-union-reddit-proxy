var request = require('request');

exports.index = function(req, res){
  res.render('index', { title: 'Cooper Union Weather Proxy' });
};


exports.json = function(req, res, next) {


  // http://www.colourlovers.com/api/colors/new?format=json
  res.set({
    'Content-Type':'application/json',
    'Access-Control-Allow-Origin':'*'
  });
  next();
};


exports.colors = function(req, res){

  var url = "http://www.colourlovers.com/api/colors?format=json";
  console.log(url);
  request(url,function(err, response, body){

    res.end(body);

  });

};

exports.new = function(req, res){

  var url = "http://www.colourlovers.com/api/colors/new?format=json";
  console.log(url);
  request(url,function(err, response, body){

    res.end(body);

  });

};

exports.top = function(req, res){

  var url = "http://www.colourlovers.com/api/colors/top?format=json";
  console.log(url);
  request(url,function(err, response, body){

    res.end(body);

  });

};
