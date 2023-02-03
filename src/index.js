const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;
const route = require('./routes/index.route');
const bodyParser = require('body-parser');

const database = require('./config/database/index.db');
database.connect();

app.use(bodyParser.json());

route(app);

//Chạy server ở cổng 3001
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
