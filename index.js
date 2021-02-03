var app = require('express')();
var http = require('http').createServer(app);
const io = require('socket.io')(http)

const GPIO = require('./gpio').default

const DB = require('./database').default

app.Interval = setInterval(async function() {

const temp = GPIO.readTemp();


  if (app.socket) {
      console.log('Reading temperature')
      app.socket.emit('temperature', temp)
      app.socket.emit('chart', await DB.getTemperatures(20))
      DB.saveTemperature(temp)
  } else {
      console.log('no socket')
  }
}, 5000)

app.Interval = setInterval(async function() {

  
  
  
    if (app.socket) {
        console.log('Reading inputs')
        app.socket.emit('inputs', GPIO.readInputs())
    } else {
        console.log('no socket')
    }
  }, 1000)

app.get('/', function(req, res){
  res.sendfile(__dirname+'/index.html');
});

app.get('/buttons.html', function(req, res){
  res.sendfile(__dirname+'/buttons.html');
});

app.get('/leds.html', function(req, res){
  res.sendfile(__dirname+'/leds.html');
});

app.get('/temperature.html', function(req, res){
  res.sendfile(__dirname+'/temperature.html');
});


http.listen(3000, function(){
  console.log('listening on *:3000');
});

io.on('connection', socket => {
  app.socket = socket
  socket.on('on', () => {
      console.log('Turning on relais...')
      GPIO.relaisOn()
  })
  socket.on('off', () => {
      console.log('Turning off relais...')
      GPIO.relaisOff()
  })
})

/* GET temperature data */
// router.get('/temperatures', async (req, res, next) => {
//   const { num } = req.query
//   const result = await DB.getTemperatures(num)
//   res.json(result)
// })




