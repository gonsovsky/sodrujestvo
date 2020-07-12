import mongoose, { Schema, Document } from 'mongoose'

export interface IUser extends Document {
    id: number
    email: string
    first_name: string
    last_name: string
    avatar: string
}

const UserSchema: Schema = new Schema({
    id: {type: Number, required: true, unique: true},
    email: {type: String, required: true, unique: true},
    first_name: {type: String, required: true},
    last_name: {type: String, required: true},
    avatar: {type: String, required: true}
});

export default mongoose.model<IUser>('User', UserSchema)