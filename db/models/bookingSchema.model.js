import { Schema, model, models } from "mongoose";

const bookingSchema = new Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  checkInDate: { type: Date, required: true },
  checkOutDate: { type: Date, required: true },
  adults: { type: Number, required: true, min: 1 },
  children: { type: Number, default: 0, min: 0 },
  roomType: { type: String, required: true },
  roomId: { type: Schema.Types.ObjectId, ref: "Room" },
  totalNights: { type: Number, required: true },
  totalAmount: { type: Number, required: false },
  bookingStatus: { 
    type: String, 
    enum: ['pending', 'confirmed', 'cancelled', 'completed'], 
    default: 'pending' 
  },
  paymentStatus: { 
    type: String, 
    enum: ['pending', 'paid', 'failed', 'refunded'], 
    default: 'pending' 
  },
  specialRequests: { type: String, default: '' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// // Generate booking reference before saving
// bookingSchema.pre('save', function(next) {
//   if (!this.bookingReference) {
//     this.bookingReference = 'BK' + Date.now() + Math.random().toString(36).substr(2, 4).toUpperCase();
//   }
//   this.updatedAt = new Date();
//   next();
// });

const Booking = models.Booking || model("Booking", bookingSchema);

export default Booking;