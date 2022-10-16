const fs = require('fs');

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);

// param middleware, fourth arg is the value of the param
exports.checkID = (req, res, next, val) => {
  console.log(`Tour id is ${val}`);
  if (val > tours.length)
    return res.status(400).json({
      status: 'fail',
      message: `No tour matches the id: ${val}`,
    });
  next();
};

exports.checkBody = (req, res, next) => {
  if (!req.body.name) {
    return res.status(400).json({
      status: 'fail',
      message: `Enter name of New Tour`,
    });
  }
  next();
};

exports.getAllTours = (req, res) => {
  console.log(req.requestTime);
  res.status(200).json({
    status: 'success',
    requestedAt: req.requestTime, // middleware we created
    results: tours.length,
    data: { tours },
  });
};

exports.getSingleTour = (req, res) => {
  //   NOTE: you need to convert id to a number, cuz in req.params, its a string
  const tourID = Number(req.params.id);
  const singleTour = tours.find((tour) => tour.id === tourID);
  if (!singleTour)
    return res.status(400).json({
      status: 'fail',
      message: `No tour matches the id: ${tourID}`,
    });
  res.status(200).json({
    status: 'success',
    data: { singleTour },
  });
};

exports.createTour = (req, res) => {
  //  id of the new tour object
  const newTourID = tours[tours.length - 1].id + 1;

  //  the new object to be added to the API
  // const newTour = Object.assign({ id: newTourID }, req.body);
  const newTour = ({ id: newTourID }, req.body);

  //push tour into the array
  tours.push(newTour);

  //persist object to json data
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    () => {
      res.status(201).json({
        status: 'success',
        data: { tour: newTour },
      }); //201: created
    }
  );
};

exports.updateTour = (req, res) => {
  const tourID = Number(req.params.id);
  const tourToBeUpdated = tours.find((tour) => tour.id === tourID);

  tourToBeUpdated.name = req.body.name;

  //persist object to json data
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    () => {
      res.status(200).json({
        status: 'success',
        data: { tourToBeUpdated },
      });
    }
  );
};

exports.deleteTour = (req, res) => {
  res.status(204).json({
    status: 'success',
    data: null,
  });
};
