import mongoose from "mongoose";

const ClickSchema = mongoose.Schema({
    insertedAt: {
        type: Date,
        default: Date.now
    },
    ipAddress: {
        type: String,
        required: true
    },
    targetParamValue: {
        type: String,
        default: ""
    }
});

const LinkSchema = mongoose.Schema({
    originalUrl: {
        type: String,
        required: true
    },
    clicks: [ClickSchema],
    targetParamName: {
        type: String,
        default: "t"
    },
    targetValues: [
        {
            name: {
                type: String,
                required: true
            },
            value: {
                type: String,
                required: true
            }
        }
    ]
});

export default mongoose.model("link", LinkSchema);
