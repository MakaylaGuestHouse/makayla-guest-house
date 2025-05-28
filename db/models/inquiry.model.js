import { Schema, model, models } from "mongoose";

const inquirySchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, validate: /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/ },
    phone: { type: String },
    subject: { type: String, required: true },
    message: { type: String, required: true },
    receivedAt: { type: Date, default: Date.now },
    isResolved: { type: Boolean, default: false },
});

const Inquiry = models.Inquiry || model('Inquiry', inquirySchema);

export default Inquiry;