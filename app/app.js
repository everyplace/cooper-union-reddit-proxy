var express = require('express')
  , http = require('http')
  , path = require('path')
  , hogan = require('hogan.js')
  , request = require('request')
  , routes = require('./routes')
  , async = require('async');

var app = module.exports = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'hjs');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, '../public')));
  app.use(function(req, res) { res.status(404); res.render('index', { title: '404' }); });
});

app.configure('development', function(){
  app.use(express.errorHandler());
});
//configure routes
// app.get('/', routes.index);

app.get('/', function(req, res){

  var username = process.env.username,
      password = process.env.password,
      base_url = 'https://' + username + ':' + password + '@www.courtlistener.com';

  var search_url = base_url + '/api/rest/v2/search/?q=' + req.query.q;

  request({url: search_url}, function (error, response, body) {

    async.mapSeries(JSON.parse(body).objects, function(result, callback) {
      // console.log(result);

       var document_url = base_url + result.resource_uri;
       console.log(document_url);

       var audio_url = base_url + '/api/rest/v2/audio/?case_number=' + result.case_number + '&format=json';
       // console.log(audio_url);

       

       request({url:audio_url}, function(error, response, body){
        // res.send(JSON.parse(body).objects[0].download_url);

        var audio_results = JSON.parse(body).objects;
        callback(null, audio_results);

       });

    }, function(err, result) {
      res.end(JSON.stringify(result));
    });

     // var results = JSON.parse(body).objects;     

  });

});




//initiate the app server
http.createServer(app).listen(app.get('port'), function(){
  console.log("cooper-union-courtlistener running on port " + app.get('port'));
});
