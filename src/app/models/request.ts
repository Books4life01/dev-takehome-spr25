import connectDB from "@/lib/db";
import {ObjectId} from "mongodb"
export interface ItemRequest{
    id: string,
    _id:ObjectId,
    requestorName: string,
    itemRequested: string,
    createdDate:Date,
    lastEditedDate:Date,
    status:string
}
import mongoose, {Schema,Document} from "mongoose";
await connectDB()

const ItemRequestScheme = new Schema({
    id: {type: String, required: true},
    requestorName: {type: String, required: true},
    itemRequested: {type: String, required: true},
    createdDate: {type: Date, required: true},
    lastEditedDate: {type: Date, required: false},
    status: {type: String, required: true}
});

export default mongoose.models.requests||mongoose.model<ItemRequest & Document>("requests", ItemRequestScheme);
