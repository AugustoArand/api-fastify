import mongoose from 'mongoose';

const motorcycleSchema = new mongoose.Schema(
  {
    model: {
      type: String,
      required: true,
      trim: true,
      maxlength: 255,
    },
    year: {
      type: Number,
      required: true,
      min: 1903,
    },
    color: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },
    engine: {
      type: String,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    description: {
      type: String,
      trim: true,
    },
    engineType: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'EngineType',
      default: null,
    },
  },
  { timestamps: true }
);

export const Motorcycle = mongoose.model('Motorcycle', motorcycleSchema);
