import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        unique: true
    },
    links: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'link'
    }]
});

export default mongoose.model("user", UserSchema);
