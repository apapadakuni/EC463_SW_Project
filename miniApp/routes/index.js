var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// Route called to fetch the sensor data. Opens socket with EC2 instance and gets randomized sensor data. Sends data as json to front-end web app. 
router.get('/sensorData', function(req, res, next){
  var net = require('net');
  var HOST = '13.59.178.74';
  var PORT = 6969;
  var client = new net.Socket();
  client.connect(PORT, HOST, function(){
	  console.log('CONNECTED ' + HOST + ':' + PORT);
    client.write('Request');
    client.on('data', function(data){
      dataObject = JSON.parse(data);

      console.log('DATA: '+ dataObject.Time);
      res.json(dataObject);
      client.destroy();
    });
  });
})

module.exports = router;
