const Pusher = require('pusher');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app = express();


app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

var pusher = new Pusher({
  appId: '515289',
  key: '7d0ed1c125d0b78dfd81',
  secret: '4194a41126df5c8c47c1',
  cluster: 'ap2',
  encrypted: true
});


app.set('PORT', 80 );


app.post('/message', (req, res) => {
  const payload = req.body;
  pusher.trigger('chat', 'message', payload);
  res.send(payload)
});

app.post('/usercount', (req, res) => {
  const usercount = req.body;
  pusher.trigger('chatUser', 'usercount', usercount);
  console.log('user:   ',usercount.username)
  res.send(usercount);
});


app.get('/' , function(req, res, next) {
  res.sendFile('index1.html');
})
app.listen(app.get('PORT'), () => 
  console.log('Listening at ' + app.get('PORT')))


