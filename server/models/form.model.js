import mongoose from "mongoose";

const FormSchema = new mongoose.Schema({
    applicantId : {
        type: String,
        required: true
    },
    inventorId: {
        type: String
    }
},{
    timestamps:true
});

const Form = mongoose.model("Form", FormSchema);

export { Form };
