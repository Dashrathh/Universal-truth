import mongoose, { Schema } from "mongoose";

const ScientistSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },

    birth_year: {
      type: Number,
      required: true,
    },
    death_year: {
      type: Number,
    },
    personalLife: {
      type: String,
      required: true,
    },
    ScientistImage:{
      type:String,
      require:true
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

    evidence: [
      {
        evidenceImage: {
          type: String, // Typw of evidence, e.g., "photo"
          required: true,
        },

        url: {
          type: String, // url path to the photot
          required: true,
        },
        description: {
          type: String,
          required: false,
        },
      },
    ],
  },
  {
    timestamps: true,
  },
);

export const Scientist = mongoose.model("Scientist", ScientistSchema);
