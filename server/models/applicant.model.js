import mongoose from "mongoose";

const ApplicantSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    category: {
        type: String,
        enum: ["Individual", "Organizations", "Institute", "Government"],
        required: true
    },
    address: {
        type: String,
        required: true
    },
    postalCode: {
        type: Number,
        required: true
    },
    phone: {
        type: Number,
        required: true
    }
},{
    timestamps:true
});

const Applicant = mongoose.model("Applicant", ApplicantSchema);

export { Applicant };
