const express = require('express');
require('dotenv').config();
const app = express();
const PORT = process.env.HOST_PORT;
const route = require('./routes/index.route');
const bodyParser = require('body-parser');
const cors = require('cors');

const database = require('./config/database/index.db');
database.connect();

app.use(bodyParser.json());
app.use(express.json());
app.use(cors());

route(app);

//Chạy server ở cổng 3001
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
