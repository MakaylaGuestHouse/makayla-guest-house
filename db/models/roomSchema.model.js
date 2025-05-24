import { Schema, model, models } from "mongoose";

const roomSchema = new Schema({
  name: { type: String, required: true },
  roomType: { type: String, required: true },
  roomNumber: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  images: [{ type: String, required: true }],
  price: { type: Number, required: true },
  roomSize: { type: String, required: true },
  bedInfo: {
    totalBeds: { type: Number, required: true },
    types: [
      {
        type: { type: String, required: true },
        quantity: { type: Number, required: true },
      },
    ],
    sofaBed: { type: Boolean, default: false },
    extraBedAvailable: { type: Boolean, default: false },
  },
  maxGuests: { type: Number, required: true },
  maxAdults: { type: Number, required: true },
  maxChildren: { type: Number, required: true },
  hasBalcony: { type: Boolean, default: false },
  bathroomType: { type: String, required: true },
  isSmokingAllowed: { type: Boolean, default: false },
  housekeepingFrequency: { type: String, required: true, default: true },
  isAvailable: { type: Boolean, default: true },
  rating: { type: Number, default: 0 },
  tags: [{ type: String }],
  amenities: [{ type: String, required: true }],
  createdAt: { type: Date, default: Date.now },
  creator: { type: Schema.Types.ObjectId, ref: "User", required: true },
});

const Room = models.Room || model("Room", roomSchema);

export default Room;
