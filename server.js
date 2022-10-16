const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' }); //to get access to environment variables

const app = require('./app');

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
  })
  .then();
//con(connection) is the resolved value of the promise (goes into the parantheses)

//create a schema
const tourSchemas = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A tour must have a name'],
    unique: true,
  },
  rating: {
    type: Number,
    default: 4.5,
  },
  price: {
    type: Number,
    required: [true, 'A tour must have a price'],
  },
});

//create a model out of the schema
const Tour = mongoose.model('Tour', tourSchemas);

//create new document out of the tour model
const testTour = new Tour({
  name: 'The Peoples Palace',
  rating: 5.0,
  price: 650,
});

//save document to the tour collection in the database (returns a promise)
testTour
  .save()
  .then((doc) => {
    console.log(doc);
  })
  .catch((err) => {
    console.log(err);
  });

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`server running on port ${PORT}...`);
});
