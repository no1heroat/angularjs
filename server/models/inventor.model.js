import mongoose from "mongoose";

const InventorSchema = new mongoose.Schema({
    Name: {
        type: String,
        required: true
    },
    Email: {
        type: String,
        required: true
    },
    InventionName: {
        type: String,
        required: true
    },
    InventionCategory: {
        type: String,
        enum: ["technical", "cultural", "musical", "traditional", "business", "biological"],
        required: true
    },
    Phone: {
        type: Number,
        required: true
    },
    Address: {
        type: String,
        required: true
    },
    PostalCode: {
        type: Number,
        required: true
    },
    applicant: {
        type: String,
        required: true
    }
});

const Inventor = mongoose.model("Inventor", InventorSchema);

export { Inventor };