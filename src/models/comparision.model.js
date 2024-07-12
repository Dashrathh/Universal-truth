import mongoose, { Schema } from "mongoose";

const CamparisonSchema = new Schema(
  {

    cardTitle: {
      type: String,
      required: true
    },
    mordenVSancient: {
      type: String,
      required: true
    },

    title: {
      type: String,
      required: true,
    },
    mordenField: {
      type: String,
      required: true,
    },
    mordenImage: {
      type: String,
      required: true,
    },

    ancientField: {
      type: String,
      required: true, // cloudinary url
    },

    ancientImage: {
      type: String,
      required: true, // cloudinary url
    },

    mordenWorkingModel: {
      type: String,
      required: true,
    },

    mordenWorkingImage: {
      type: String,
      required: true,
    },
    ancientWorkingModel: {
      type: String,
      required: true,
    },

    ancientWorkingImage: {
      type: String,
      required: true,
    },

    compareText: {
      type: String,
      required: true,
    },
    summary: {
      type: String,
      required: true,
    },
  },

  {
    timestamps: true,
  },
);

export const comparision = mongoose.model("comparision", CamparisonSchema);
