const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const morgan = require('morgan');
const connectDB = require('./config/db');
const blogsRouter = require('./controllers/blogs');
require('colors');

const app = express();

dotenv.config({ path: './config/config.env' });

connectDB();

app.use(express.json());
app.use(cors());

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// ROUTES =========================================
app.use('/api/blogs', blogsRouter);

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(
    `Server is running on ${process.env.NODE_ENV} mode on port ${PORT}`.yellow
      .bold
  );
});

// Handle unhandled promise rejection
// process.on('unhandledRejection', (error, promise) => {
//   console.log(`DB ERROR: ${error.message}`.red.bold);
//   process.close(() => process.exit(1));
// });
