"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const uuid_1 = require("uuid");
exports.ItemSchema = new mongoose.Schema({
    _id: {
        type: String,
        index: true,
        unique: true,
        default: () => uuid_1.v4()
    },
    name: String,
    qty: Number,
    description: String,
});
//# sourceMappingURL=item.schema.js.map