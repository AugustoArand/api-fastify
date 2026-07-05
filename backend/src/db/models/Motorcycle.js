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
    displacement: {
      type: String,   // ex: "1200cc", "107 cu in"
      trim: true,
    },
    power: {
      type: String,   // ex: "90 HP @ 5000 RPM"
      trim: true,
    },
    torque: {
      type: String,   // ex: "100 Nm @ 3500 RPM"
      trim: true,
    },
    category: {
      type: String,   // ex: "Cruiser", "Touring", "Sport"
      trim: true,
    },
    image: {
      type: String,   // URL da imagem
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

