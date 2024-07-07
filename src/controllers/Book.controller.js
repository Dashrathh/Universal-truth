import { AncientBook } from "../models/Book.model.js"
import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"

import { uploadOnCloudinary } from "../utils/cloudinary.js"


const creatBook = asyncHandler(async (req, res) => {
    const { title,
        written_year,
        BookInfo,
        Ancient_invention,
        description,
        // Bookrefer,
    } = req.body;

    const bookImageLocalPath = req.files?.BookImage?.[0]?.path
    // const Ancient_inventionImageLocalPath = req.files?.Ancient_invention?.[0]?.path
    // const ImagesLocalPath = req.files?.Image?.[0]?.path

    console.log(bookImageLocalPath);
    // console.log(Ancient_inventionImageLocalPath);
    // console.log(ImagesLocalPath);

    if (!bookImageLocalPath ) {
        throw new ApiError(400, "All image are requred")
    }


    // uploadImage on cludinary

    const BookImage = await uploadOnCloudinary(bookImageLocalPath)
    // const Ancient_inventionImage =  await uploadOnCloudinary(Ancient_inventionImageLocalPath)
    // const Images = await uploadOnCloudinary(ImagesLocalPath)

    // if (!BookImage || !Ancient_inventionImage || !Images) {
    //     throw new ApiError(400, "Image upload on cloudinary failed")
    // }

    console.log(BookImage);
    const newBook = await AncientBook.create({
        title,
        written_year,
        BookInfo,
        Ancient_invention,
        description,
        // Bookrefer,
        BookImage: BookImage.url,
        // Ancient_inventionImage: Ancient_inventionImage.url,
        // Images: Images.url

    })
    return res.status(200).json(new ApiResponse(201), newBook, "All book creat successfully")
});


//   get book by id 

const getBookById = asyncHandler(async (req, res) => {
    // const { BookId } = req.params;

    const book = await AncientBook.findById(req.params.id)
    console.log("bookss",book);
        if (!book) {
            throw new ApiError(400, "Book not found")
        }
    res.render('Books' , {book})

})

//  update Book data

const UpdateBook = asyncHandler(async (req, res) => {
    const { BookId } = req.params;

    const UpdatedBook = await AncientBook.findByIdAndUpdate(BookId, req.body, {
        new: true,
        runValidators: true
    });

    if (!UpdatedBook) {
        throw new ApiError(400, "Book not upadated")
    }
    return res.status(200).json(new ApiResponse(201), UpdatedBook, "Book updated successfully")
})

//  deleted book

const deleteBook = asyncHandler(async (req, res) => {
    const { BookId } = req.params;
    const deletedBook = await AncientBook.findByIdAndDelete(BookId)

    if (!deletedBook) {
        throw new ApiError(400, "Book not deleted")
    }

    return res.status(200).json(new ApiResponse(201), deletedBook, "Book deleted successfully")
})


export {
    creatBook,
    getBookById,
    UpdateBook,
    deleteBook

}