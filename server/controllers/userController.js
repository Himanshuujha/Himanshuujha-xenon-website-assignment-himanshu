import bcrypt from "bcryptjs";
import User from "../models/userModel.js";
import { errorHandler } from "../utils/error.js";
import ListingItems from "../models/Listingitemmodel.js";

// Test route
export const test = (req, res) => res.send("Test route being called!!!");

// Update User
export const updateUser = async (req, res, next) => {
  const { id } = req.params;
  if (req.user.id !== id) return next(errorHandler(401, "You can only update your own account!"));

  try {
    if (req.body.password) {
      req.body.password = bcrypt.hashSync(req.body.password, 10);
    }

    const updatedUser = await User.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true }
    );

    const { password, ...rest } = updatedUser._doc;
    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};

// Delete User
export const deleteUser = async (req, res, next) => {
  const { id } = req.params;
  if (req.user.id !== id) return next(errorHandler(401, "You can only delete your own account!"));

  try {
    await User.findByIdAndDelete(id);
    res.clearCookie("access_token");
    res.status(200).json("User has been deleted...");
  } catch (error) {
    next(error);
  }
};

// Get User Listings
export const getUserListings = async (req, res, next) => {
  const { id } = req.params;
  if (req.user.id !== id) return next(errorHandler(401, "You can only view your own listings!"));

  try {
    const listings = await ListingItems.find({ userRef: id });
    res.status(200).json(listings);
  } catch (error) {
    next(error);
  }
};

// Get User
export const getUser = async (req, res, next) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id);
    if (!user) return next(errorHandler(404, "User not found!"));

    const { password, ...rest } = user._doc;
    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};
