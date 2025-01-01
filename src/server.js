// server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const twilio = require('twilio');

const app = express();
const port = process.env.PORT || 5000;

const accountSid = 'ACf4827507ff5ccb39823fe25c9596138a';
const authToken = 'c66952014f94916d7ef56037029e321d';
const client = new twilio(accountSid, authToken);

app.use(cors({origin: 'http://192.168.1.11:3000'}));
app.use(bodyParser.json());

app.post('/send-sms', (req, res) => {
  const { to, message } = req.body;

  const sendMessages = to.map(phoneNumber => {
    return client.messages.create({
      body: message,
      to: phoneNumber,
      from: '+18776646599'
    });
  });

  Promise.all(sendMessages)
    .then(messages => res.json({ success: true, messages }))
    .catch(error => res.json({ success: false, error: error.message }));
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});