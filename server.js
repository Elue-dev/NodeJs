const mongoose = require('mongoose');
const colors = require('colors');
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' }); //to get access to environment variables

const app = require('./app');

app.use('/api/v1/tours', require('./routes/tourRoutes'));
app.use('/api/v1/users', require('./routes/userRoutes'));

// console.log('express environment = ', app.get('env'));
// console.log('node environment = ', process.env);

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

// deals with some deprecation warnings
// connect returns a promise
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Database Connected Successfully!'.cyan.bold));
//con(connection) is the resolved value of the promise (goes into the parantheses).

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`server running on port ${PORT}...`);
});
