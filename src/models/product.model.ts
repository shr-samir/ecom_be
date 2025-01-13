import mongoose, { Document, Model, Schema } from "mongoose";

interface IProduct extends Document {
  name: string;
  description: string;
  price: number;
  image: string[];
  category: string[];
  subCategory: string[];
  sizes: string[];
  bestSeller?: string;
  date: Date;
}

const productSchema: Schema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  image: [{ type: [String], required: true }],
  category: [{ type: [String], required: true }],
  subCategory: [{ type: [String], required: true }],
  sizes: [{ type: [String], required: true }],
  bestSeller: { type: Boolean },
  date: { type: Date, required: true },
});

const productModel: Model<IProduct> =
  mongoose.models.Product || mongoose.model<IProduct>("Product", productSchema);

export default productModel;
