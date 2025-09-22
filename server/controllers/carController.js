const Car = require('../models/Car');

// @desc    List a new car
// @route   POST /api/cars/list
// @access  Private
const listCar = async (req, res) => {
  try {
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
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

const getCars = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit); // Get limit from query

    let query = Car.find({});

    if (!isNaN(limit) && limit > 0) {
      query = query.limit(limit); // Apply the limit if it's a valid number
    }

    const cars = await query;
    res.json(cars);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

const getCarById = async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);
    if (car) {
      res.json(car);
    } else {
      res.status(404).json({ message: 'Car not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = { listCar, getCars, getCarById };