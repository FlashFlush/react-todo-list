const mongoose = require("mongoose");
const { Schema } = mongoose;
const itemSchema = new Schema({
  value: {
    type: String,
    required: true
  },
  done: Boolean,
  creator: {
    type: Schema.Types.ObjectId
    // required: true
  }
});

module.exports = mongoose.model("Item", itemSchema);
