import { Request, Response } from "express";
import { v2 as cloudinary } from "cloudinary";
import productModel from "../models/product.model";
import asyncHandler from "../utils/asyncHandler";

const addProduct = asyncHandler(async (req: Request, res: Response) => {
  try {
    const {
      name,
      description,
      price,
      sizes,
      bestSeller,
      category,
      subCategory,
    } = req.body;
    const files = req.files as { [fieldname: string]: Express.Multer.File[] };
    console.log(files);
    const image1 = files?.image1 && files?.image1?.[0];
    const image2 = files?.image2?.[0];
    const image3 = files?.image3?.[0];
    const image4 = files?.image4?.[0];

    console.log(image1, image2, image3, image4);

    const images = [image1, image2, image3, image4].filter(
      (item) => item !== undefined
    );

    console.log(images);

    let imagesUrl = await Promise.all(
      images.map(async (item) => {
        try {
          console.log("Uploading image:", item.path);
          let result = await cloudinary.uploader.upload(item.path, {
            resource_type: "image",
          });
          console.log("Upload result:", result);
          return result.secure_url;
        } catch (error) {
          console.error("Error uploading image:", error);
          throw error;
        }
      })
    );
    console.log(imagesUrl);

    res.status(201).json({ success: true });
  } catch (error) {
    res.status(500).send({ success: false, message: error });
  }
});

const listProduct = async (req: Request, res: Response) => {};

const removeProduct = async (req: Request, res: Response) => {};

const unitProduct = async (req: Request, res: Response) => {};

export { addProduct, listProduct, removeProduct, unitProduct };
