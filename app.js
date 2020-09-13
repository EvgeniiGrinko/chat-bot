const express = require('express');
const {PORT, CONFIRMATION} = require('./config');
const processing = require('./processing');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.post('/', (req, res) => {
  const {body} = req;
  switch (body.type) {
      case "confirmation":
        res.end(CONFIRMATION)
          break;
      case "message_new":
          processing(body.object);
        res.end('ok')
          break;
  
      default:
          res.end('ok')
          break;
  }
})

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`)
});
/*
{
  type: 'message_new',
  object: {
    id: 2,
    date: 1599945694,
    out: 0,
    user_id: 8627789,
    read_state: 0,
    title: '',
    body: 'qwerty',
    owner_ids: []
  },
  group_id: 25357393,
  event_id: 'e0734038fa3d2e5e11d3c0ed5fed7b06d6ba07f2'      
}
*/