const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const noteSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId, // tipe data ObjectId dari mongoose untuk mereferensikan ke user lain
      required: true,
      ref: "User", // mereferensikan ke model User yang telah kita buat sebelumnya
    },
    title: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: false,
    },
    completed: {
      type: Boolean,
      default: false,
    },
  },
  {
    // timestamps akan membuat mongoose secara otomatis menambahkan field createdAt dan updatedAt pada setiap document yang tersimpan
    timestamps: true,
  }
);

noteSchema.plugin(AutoIncrement, {
  inc_field: "ticket",
  id: "tikcetNums",
  start_seq: 500,
});

const Note = mongoose.model("Note", noteSchema);

module.exports = Note;
