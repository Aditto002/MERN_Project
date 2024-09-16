import mongoose from "mongoose";


const galleryinfo = new mongoose.Schema({
    picture:{type:String},
    alt:{type:String},
    title:{type:String},
    description:{type:String}

}, { timestamps: true, versionKey: false });

const Gallery = mongoose.model('Gallery',galleryinfo );

export default Gallery;