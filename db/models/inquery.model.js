import { Schema, model, models } from "mongoose";

const inquerySchema = new Schema({
    fullName: { type: String, required: true },
    email: { type: String, required: true, validate: /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/ },
    phone: { type: String },
    subject: { type: String, required: true },
    message: { type: String, required: true },
    receivedAt: { type: Date, default: Date.now },
    isResolved: { type: Boolean, default: false },
});

const Inquery = models.Inquery || model('Inquery', inquerySchema);

export default Inquery;