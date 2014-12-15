var request = require('request');

exports.index = function(req, res){
  res.render('index', { title: 'Cooper Union Reddit Proxy' });
};
