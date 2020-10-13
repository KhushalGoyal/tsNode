import { Schema, model, Types } from "mongoose";
import MongoosePaginate from "mongoose-paginate-v2";

const UserSchema = new Schema({
    username : { type : String, required: true, unique: true},
    email : { type : String, required: true, unique : true },
    firstname : { type : String, required: true },
    lastname : { type : String, required: true },
    password : { type : String, required: true }

},{ timestamps: { createdAt: true, updatedAt: true } })

UserSchema.plugin(MongoosePaginate);

export const UserModel = model('users', UserSchema);
