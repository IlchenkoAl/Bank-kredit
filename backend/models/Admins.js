const { Schema, model } = require("mongoose");

const Admin = new Schema({
  admin: {
    type: String,
    uniqued: true,
    required: true,
  },
});
module.exports = model("Admin", Admin);
