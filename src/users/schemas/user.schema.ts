import * as mongoose from 'mongoose';
import { v4 as uuid } from 'uuid';

export const UserSchema = new mongoose.Schema({
  _id: {
    type: String,
    index: true,
    unique: true,
    default: () => uuid()
  },
  username: String,
  password: String,
  reg_time: {
    type: Date,
    default: Date.now
  },
  permissions: [String],
  login_fail: Number,
  locked: Boolean
}, {
  versionKey: false
});

export const PermissionsSchema = new mongoose.Schema({
  permissions: [String]
}, {
  versionKey: false
});