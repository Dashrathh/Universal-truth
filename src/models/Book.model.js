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
    BookInfo:{
      type:String,
      require:true
    },
    Ancient_invention: {
      type: String,
      required: true,
    },
    Ancient_inventionImage: {
      type: String,
      required: false,
    },

    description: {
      type: String,
      required: true,
    },
    Images: {
      type: String,
      required: false,
    },

  //   evidence: [
  //     {
  //       Image: {
  //         type: String, // Typw of evidence, e.g., "photo"
  //         required: true,
  //       },

  //       url: {
  //         type: String, // url path to the photot
  //         required: true,
  //       },
  //       description: {
  //         type: String,
  //         required: false,
  //       },
  //     },
  //   ],
  },
  {
    timestamps: true,
  },
);

export const AncientBook = model("AncientBook", BookSchema);
