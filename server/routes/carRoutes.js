const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { listCar, getCars, getCarById } = require('../controllers/carController');

// When a POST request is made to '/list', it will first run the `protect`
// middleware, and if that passes, it will run the `listCar` controller.
router.post('/list', protect, listCar);

// GET route to fetch all cars (Public)
router.get('/', getCars); 

// GET route to fetch a single car by ID (Public)
router.get('/:id', getCarById);

module.exports = router;