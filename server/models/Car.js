const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User', // Associates the car with a User
  },
  make: {
    type: String,
    required: true,
  },
  model: {
    type: String,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  pricePerDay: {
    type: Number,
    required: true,
  },
  location: {
    type: {
      type: String, 
      enum: ['Point'], 
      required: true
    },
    coordinates: {     
      type: [Number],
      required: true
    }
  },
  imageUrl: {
    type: String,
    required: true,
  },
},
  {
    timestamps: true,
  });

carSchema.index({ location: "2dsphere" });
module.exports = mongoose.model('Car', carSchema);