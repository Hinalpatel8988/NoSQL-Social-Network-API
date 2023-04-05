const express = require('express');
const mongoose = require('mongoose');


const PORT = process.env.port || 3001;
const app = express();


app.use(express.urlencoded({ extended: true }));
app.use(express.json());


mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/social-network-api', {
  useFindAndModify: false,
  useNewUrlParser: true,
  useUnifiedTopology: true
});

mongoose.set('debug', true);


app.listen(PORT, () => console.log(`Connected on localhost:${PORT}`));