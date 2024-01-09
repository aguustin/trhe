import mongoose from 'mongoose';
import { mongoose_uri } from './config.js';

export const connectionDB = () => {
    try{
        mongoose.set('strictQuery', false);
        mongoose.connect(mongoose_uri);
        console.log("db connected");
    }catch(err){
        console.log(err);
    }
}