const Car = require('../models/Car');
const asyncHandler = require('../middleware/asyncHandler');

// @desc    List a new car
// @route   POST /api/cars/list
// @access  Private
const listCar = asyncHandler(async (req, res) => {
  const { make, model, year, pricePerDay, location, imageUrl } = req.body;

  const car = new Car({
    user: req.user.id, // Get the user ID from the protect middleware
    make,
    model,
    year,
    pricePerDay,
    location,
    imageUrl,
  });

  const createdCar = await car.save();
  res.status(201).json(createdCar);
});

// @desc    Get all cars
// @route   GET /api/cars
// @access  Public
const getCars = asyncHandler(async (req, res) => {
  const limit = parseInt(req.query.limit); // Get limit from query

  let query = Car.find({});

  if (!isNaN(limit) && limit > 0) {
    query = query.limit(limit); // Apply the limit if it's a valid number
  }

  const cars = await query;
  res.json(cars);
});

// @desc    Get single car by ID
// @route   GET /api/cars/:id
// @access  Public
const getCarById = asyncHandler(async (req, res) => {
  const car = await Car.findById(req.params.id);
  if (car) {
    res.json(car);
  } else {
    res.status(404);
    throw new Error('Car not found');
  }
});

// @desc    Get cars within a specific radius (default 10km)
// @route   GET /api/cars/near-me?lat=_&lng=_
// @access  Public
const getCarsNearMe = asyncHandler(async (req, res) => {
  const { lat, lng } = req.query;

  if (!lat || !lng) {
    res.status(400);
    throw new Error("Please provide Latitude and Longitude");
  }

  const coordinates = [parseFloat(lng), parseFloat(lat)];

  const cars = await Car.find({
    location: {
      $near: {
        $geometry: {
          type: "Point",
          coordinates: coordinates
        },
        $maxDistance: 10000
      }
    }
  });

  res.status(200).json({
    count: cars.length,
    data: cars
  });
});

module.exports = { listCar, getCars, getCarById, getCarsNearMe };