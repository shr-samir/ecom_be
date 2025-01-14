import express from "express";
import dotenv from "dotenv";
import dbConnect from "./configs/mongoDb";
import cloudinaryConnect from "./configs/cloudinary";
import userRouter from "./routes/user.route";
import productRouter from "./routes/product.route";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
app.use("/api/user", userRouter);

app.use("/api/product", productRouter);

try {
  cloudinaryConnect();
  console.log("Cloudinary Configured Successfully");
} catch (err) {
  console.error(`Cloudinary Configuration Failed ${err}`);
}

dbConnect()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log("Connection failed", error);
  });
