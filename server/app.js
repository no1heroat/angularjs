import express from "express";
import { Applicant } from "./models/applicant.model.js";
import connect from "./db.js"
import { Inventor } from "./models/inventor.model.js";
import cors from "cors"
import { Form } from "./models/form.model.js";
import mongoose from "mongoose";

const app = express();

// Connect to MongoDB
connect();

app.use(express.json());

app.use(cors())

// Route to handle POST request for creating a new applicant
app.post('/applicant', async (req, res) => {
    try {
        const { firstName, lastName, category, phone, address , postalCode} = req.body;
        if (!firstName || !lastName || !category || !phone || !address || !postalCode) {
            return res.status(400).json({ error: "All fields are mandatory." });
        }
        const applicant = await Applicant.create({ firstName, lastName, category, phone, address,postalCode});
        return res.status(200).json({ data: applicant });
    } catch (error) {
        return res.status(500).json({ error: error });
    }
});

app.post('/inventor', async(req, res)=>{
    try{
        const {Name, Email, InventionName, InventionCategory, Phone, Address, PostalCode,applicant} = req.body;
    if(!Name || !Email || !InventionName || !InventionCategory || !Phone || !Address || !PostalCode || !applicant){
        console.log("Yaha chiryo")
        throw new Error("Error while creating Inventor ")
        }
        const inventor = await Inventor.create({Name, Email, InventionName, InventionCategory, Phone, Address, PostalCode,applicant});
        return res.status(200).json({data: inventor});
    } catch(error) {
        console.log(error)
        return res.status(400).json({error: error})
    }

})

app.get('/applicant/id/:id',async (req,res)=>{
    const { id } = req.params;

    try{
        const applicant = await Applicant.findById(id)
        if(!applicant){
            return res.status(404).json({error: "Applicant not found"})
        }
        return res.status(200).json({data: applicant})
    }catch(error){
        return res.status(404).json({error})
    }
})
app.get('/inventor/id/:id',async (req,res)=>{
    const { id } = req.params;

    try{
        const inventor = await Inventor.findById(id)
        if(!inventor){
            return res.status(404).json({error: "Inventor not found"})
        }
        return res.status(200).json({data: inventor})
    }catch(error){
        return res.status(404).json({error})
    }
})

app.get('/applicant/all',async(_,res)=>{
    try{
        const applicants = await Applicant.find()
        if(Array.isArray(applicants) && applicants.length <= 0){
            return res.status(404).json({message: "No applicants found"})
        }
        return res.status(200).json({message: "All applicants fetched",data: applicants,lengthofArray:applicants.length})
    }catch(error){
        res.status(400).json({message: "Failed",error: error})
    }
})

app.post('/form',async (req,res)=>{
    try{
        console.log(req.body)
        const { applicantId , inventorId } = req.body;
        console.log(applicantId, inventorId)
        if (!applicantId || !inventorId){
            throw new Error("No id found")
        }
        const resp = await Form.create({applicantId,inventorId})
        return res.status(200).json({message: "Form Created",data: resp})
    }catch(error){
        console.log(error)
    }
})

app.get('/form',async (req,res)=>{
    try{
        const { applicantId } = req.body;
        const resp = await Form.find({applicantId: applicantId})

        return res.status(200).json({data: resp})
    }catch(error){
        console.log(error)
    }
})

// Start the servers
const PORT = process.env.PORT || 3500;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});