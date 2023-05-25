const User = require("../models/User");
const Note = require("../models/Note");
// import asyncHandler
const asyncHandler = require("express-async-handler");

// @desc    Get all notes
// @route   GET /notes
// @access  Private/Admin

const getAllNotes = asyncHandler(async (req, res) => {
  // ambil semua note dari database
  const notes = await Note.find().lean();

  // cek apakah note ada atau tidak
  if (!notes?.length) {
    // jika tidak ada, kirim response dengan status 404
    return res.status(404).json({ message: "Notes not found" });
  }

  // tambahkan username ke setiap note yang ada di database sebelum dikirim ke client
  const notesWithUsername = await Promise.all(
    notes.map(async (note) => {
      const user = await User.findById(note.user).lean();
      return {
        ...note,
        username: user.username,
      };
    })
  );

  // kirim response dengan data note
  res.json(notesWithUsername);
});

// @desc    Create new note
// @route   POST /notes
// @access  Private/Admin

const createNewNote = asyncHandler(async (req, res) => {
  const { user, title, text } = req.body;

  // confirm data
  // jika user, title, atau text kosong, kirim response dengan status 400
  if (!user || !title || !text) {
    return res.status(400).json({ message: "All fields are required" });
  }

  //check duplicate note
  const duplicate = await Note.findOne({ title }).lean().exec();

  if (duplicate) {
    return res.status(409).json({ message: "Duplicate note title" });
  }

  // buat note baru dan simpan ke database
  const newNote = await Note.create({
    user,
    title,
    text,
  });

  // kirim response dengan data note yang baru dibuat
  //   if (newNote) {
  //     // Created
  //     return res.status(201).json({ message: "New note created" });
  //   } else {
  //     return res.status(400).json({ message: "Invalid note data received" });
  //   }

  res.status(201).json(newNote);
});

// @desc Update a note
// @route PATCH /notes
// @access Private
const updateNote = asyncHandler(async (req, res) => {
  const { id, user, title, text, completed } = req.body;

  // Confirm data
  if (!id || !user || !title || !text || typeof completed !== "boolean") {
    return res.status(400).json({ message: "All fields are required" });
  }

  // Confirm note exists to update
  const note = await Note.findById(id).exec();

  if (!note) {
    return res.status(400).json({ message: "Note not found" });
  }

  // Check for duplicate title
  const duplicate = await Note.findOne({ title }).lean().exec();

  // Allow renaming of the original note
  if (duplicate && duplicate?._id.toString() !== id) {
    return res.status(409).json({ message: "Duplicate note title" });
  }

  note.user = user;
  note.title = title;
  note.text = text;
  note.completed = completed;

  const updatedNote = await note.save();

  res.json(`'${updatedNote.title}' updated`);
});

// @desc Delete a note
// @route DELETE /notes
// @access Private
const deleteNote = asyncHandler(async (req, res) => {
  const { id } = req.body;

  // Confirm data
  if (!id) {
    return res.status(400).json({ message: "Note ID required" });
  }

  // Confirm note exists to delete
  const note = await Note.findById(id).exec();

  if (!note) {
    return res.status(400).json({ message: "Note not found" });
  }

  const result = await note.deleteOne();

  const reply = `Note '${result.title}' with ID ${result._id} deleted`;

  res.json(reply);
});

module.exports = {
  getAllNotes,
  createNewNote,
  updateNote,
  deleteNote,
};
