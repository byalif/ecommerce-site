import mongoose from "mongoose";

const Schema = mongoose.Schema;

const cartSchema = new Schema({
  items: {
    type: Array,
  },
  amount: {
    type: Number,
  },
  total: {
    type: Number,
  },
});

const cart = mongoose.model("cart", cartSchema);

export default cart;
