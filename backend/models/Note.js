const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    title: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    completed: {
      type: Boolean,
      default: false,
    },
    sequenceId: {
      type: Number,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

// mongoose seqeuence manually

noteSchema.pre("save", async function (next) {
  const note = this;

  if (!note.sequenceId) {
    const lastNote = await Note.findOne({}, {}, { sort: { sequenceId: -1 } });

    if (lastNote) {
      note.sequenceId = lastNote.sequenceId + 1;
    } else {
      note.sequenceId = 1;
    }
  }

  next();
});

const Note = mongoose.model("Note", noteSchema);

module.exports = Note;
