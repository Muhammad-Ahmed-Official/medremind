import mongoose from 'mongoose';
const medicineSchema = new mongoose.Schema({

}, { timestamps: true } );

// MedicineName, Dosage, freqncy, (Daily with time ), howlong, startDate, refill:boolean