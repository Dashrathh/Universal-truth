import mongoose, { Schema } from "mongoose";

const ScientistSchema = new Schema(
  {
    title: {
      type: String,
      required: true
    },

    cardname: {
      type: String,
      required: true
    },
    contribution: {
      type: String,
      required: true
    },

    name: {
      type: String,
      required: true,
    },

    birth_year: {
      type: String,
      required: true,
    },
    death_year: {
      type: String,
    },
    personalLife: {
      type: String,
      required: true,
    },
    ScientistImage: {
      type: String,
      require: true
    },
    their_work: {
      type: String,
      required: true,
    },

    workingImage: {
      type: String,
      required: true,
    },
    achivement: {
      type: String,
      required: false,
    },
    achivementImage: {
      type: String,
      required: true,
    },

    evidenceImage: {
      type: String, // Typw of evidence, e.g., "photo"
      required: true,
    },
    
    refrence: {
      type: String, // Typw of evidence, e.g., "photo"
      required: false,
    },

  },
  {
    timestamps: true,
  },
);

export const Scientist = mongoose.model("Scientist", ScientistSchema);
