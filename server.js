const Pusher = require('pusher');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');


const app = express();


app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

var pusher = new Pusher({
  appId: '515289',
  key: '7d0ed1c125d0b78dfd81',
  secret: '4194a41126df5c8c47c1',
  cluster: 'ap2',
  encrypted: true
});


app.set('PORT', process.env.PORT || 5000);


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

app.listen(app.get('PORT'), () => 
  console.log('Listening at ' + app.get('PORT')))


