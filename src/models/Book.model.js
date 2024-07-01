import { model, Schema } from "mongoose";

const BookSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    written_year: {
      type: String,
      required: true,
    },
    BookImage: {
      type: String,
      required: true,
    },

    Ancient_invention: {
      type: String,
      required: true,
    },
    Ancient_inventionImage: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },
    Image: {
      type: String,
      required: true,
    },

    Bookrefer: [
      {
        Image: {
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

export const AncientBook = model("AncientBook", BookSchema);
