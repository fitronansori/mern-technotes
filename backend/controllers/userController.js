// import Model
const User = require("../models/User");
const Note = require("../models/Note");
// import asyncHandler
const asyncHandler = require("express-async-handler");
// import bcrypt untuk mengenkripsi password
const bcrypt = require("bcrypt");

// @desc    Get all users
// @route   GET /users
// @access  Private/Admin

const getAllUsers = asyncHandler(async (req, res) => {
  // ambil semua user dari database
  const users = await User.find().select("-password").lean();

  // cek apakah user ada atau tidak
  if (!users?.length) {
    // jika tidak ada, kirim response dengan status 404
    return res.status(404).json({ message: "Users not found" });
  } else {
    // jika ada, kirim response dengan data user
    res.json(users);
  }
});

// @desc    Create new user
// @route   POST /users
// @access  Private/Admin

const createNewUser = asyncHandler(async (req, res) => {
  const { username, password, roles } = req.body;

  //confirm data
  // jika username, password, atau roles kosong dan roles bukan array, kirim response dengan status 400
  if (!username || !password || !Array.isArray(roles) || !roles.length) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // cek duplikat username
  const duplicate = await User.findOne({ username }).lean().exec();

  if (duplicate) {
    return res.status(400).json({ message: "Username already exists" });
  }

  // hash password
  const hashedPassword = await bcrypt.hash(password, 10);
  // 10 adalah salt round yang akan digunakan untuk mengenkripsi password

  // buat object user baru
  const userObject = {
    username,
    password: hashedPassword,
    roles,
  };

  // buat user baru dan simpan ke database
  const newUser = await User.create(userObject);

  // cek apakah user berhasil dibuat atau tidak
  if (!newUser) {
    // jika tidak berhasil, kirim response dengan status 400
    return res.status(400).json({ message: "User creation failed" });
  } else {
    // jika berhasil, kirim response dengan data user
    res.status(201).json({ message: `User created successfully ${username}` });
  }
});

// @desc    Update a user
// @route   PATCH /users/:id
// @access  Private/Admin

const updateUser = asyncHandler(async (req, res) => {
  const { id, username, password, roles, active } = req.body;

  // confirm data
  if (
    !id ||
    !username ||
    !password ||
    !Array.isArray(roles) ||
    !roles.length ||
    typeof active !== "boolean"
  ) {
    // jika salah satu data kosong, kirim response dengan status 404
    return res.status(404).json({ message: "All fields are required" });
  }

  // cari user berdasarkan id
  const user = await User.findById(id).exec();

  // cek apakah user ada atau tidak
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  // cek duplikat username
  const duplicate = await User.findOne({ username }).lean().exec();

  // jika username sudah ada dan id user (MongoDB) yang ditemukan tidak sama dengan id user (Mongoose) yang akan diupdate, kirim response dengan status 400
  if (duplicate && duplicate._id.toString() !== id) {
    return res.status(400).json({ message: "Username already exists" });
  }

  user.username = username;
  user.roles = roles;
  user.active = active;

  if (password) {
    user.password = await bcrypt.hash(password, 10);
  }

  // simpan user yang sudah diupdate ke database
  const updatedUser = await user.save();

  // cek apakah user berhasil diupdate atau tidak
  if (!updatedUser) {
    // jika tidak berhasil, kirim response dengan status 400
    return res.status(400).json({ message: "User update failed" });
  } else {
    // jika berhasil, kirim response dengan data user
    res.status(201).json({ message: `${updatedUser.username} updated` });
  }
});

// @desc    Delete a user
// @route   DELETE /users/:id
// @access  Private/Admin

const deleteUser = asyncHandler(async (req, res) => {
  const { id } = req.body;

  // cek data
  if (!id) {
    // jika id kosong, kirim response dengan status 404
    return res.status(404).json({ message: "Id is required" });
  }

  // notes adalah array yang berisi semua note yang dimiliki oleh user yang akan dihapus (berdasarkan id)
  const notes = await Note.findOne({ user: id }).lean().exec();
  if (notes?.length) {
    // jika user sudah memiliki notes, kirim response dengan status 400
    return res.status(400).json({ message: "User has assigned notes" });
  }

  // cari user berdasarkan id
  const user = await User.findById(id).exec();

  // cek apakah user ada atau tidak
  if (!user) {
    // jika tidak ada, kirim response dengan status 404
    return res.status(404).json({ message: "User not found" });
  }

  const result = await user.deleteOne();

  res.json({
    message: `Username ${result.username} with ID ${result._id} deleted`,
  });
});

// export semua method
module.exports = {
  getAllUsers,
  createNewUser,
  updateUser,
  deleteUser,
};
