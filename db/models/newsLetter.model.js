import { Schema, model, models } from "mongoose";

const newsLetterSchema = new Schema({
  email: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Newsletter = models.Newsletter || model("Newsletter", newsLetterSchema);

export default Newsletter;
