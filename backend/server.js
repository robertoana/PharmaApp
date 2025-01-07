const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');
const app = express();
const router = require('./routes');

dotenv.config();
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.use('/api', router);

app.all('*', (req, res) => {
  res.status(404).json({
    message: `${req.originalUrl} does not exist on this server.`,
  });
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port: ${process.env.PORT}`);
  console.log(
    `You can access the server at: http://${process.env.HOST}:${process.env.PORT}`
  );
});
