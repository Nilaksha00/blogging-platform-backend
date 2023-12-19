import mongoose, { Document, Schema, Model } from "mongoose";
// import bcrypt from "bcrypt";

interface User extends Document {
  fullName: string;
  email: string;
  password: string;
}

const userSchema = new Schema<User>(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 30,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.comparePassword = async function (enteredPassword: string) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const UserModel: Model<User> = mongoose.model<User>(
  "Users",
  userSchema
);

export default UserModel;
