import express from "express";
import dotenv from "dotenv";
import usersRouter from "./routes/user.route";
import dbConnect from "./configs/mongoDb";
import cloudinaryConnect from "./configs/cloudinary";
import userRouter from "./routes/user.route";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// middleware 
app.use(express.json());

// routes
app.use("/api/user", userRouter);

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
.catch((error: Error) => {
  console.log("Connection failed", error);
});
