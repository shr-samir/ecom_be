import express from "express";
import {
  addProduct,
  listProduct,
  removeProduct,
  unitProduct,
} from "../controllers/product.controller";
import upload from "../middlewares/multer";
import asyncHandler from "../utils/asyncHandler";

const productRouter = express.Router();

// multer middleware to process multipart formdata
productRouter.post(
  "/add",
  upload.fields([
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
    { name: "image3", maxCount: 1 },
    { name: "image4", maxCount: 1 },
  ]),
  addProduct
);

productRouter.post("/remove", asyncHandler(removeProduct));

productRouter.get("/list", asyncHandler(listProduct));

productRouter.post("/unit", asyncHandler(unitProduct));

export default productRouter;
