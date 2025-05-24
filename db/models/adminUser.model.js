import { Schema, model, models } from "mongoose";

const adminUserSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    validate: /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/,
  },
  password: { type: String, required: true },
  role: {
    type: String,
    required: true,
    enum: ["admin", "editor"],
    default: "editor",
  },
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
});

const AdminUser = models.AdminUser || model("AdminUser", adminUserSchema);

export default AdminUser;
