const express = require('express');
const tourController = require('../controllers/tourController');

const router = express.Router();

const {
  getAllTours,
  createTour,
  getSingleTour,
  updateTour,
  deleteTour,
  checkID,
  checkBody,
} = tourController;

//param middleware, defined in tour controller
router.param('id', checkID);

router.route('/').get(getAllTours).post(checkBody, createTour);

router.route('/:id').get(getSingleTour).patch(updateTour).delete(deleteTour);

module.exports = router;
