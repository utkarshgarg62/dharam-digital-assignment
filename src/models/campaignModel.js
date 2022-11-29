const mongoose = require("mongoose")

const campaignSchema = new mongoose.Schema({
    short_token: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    offer: [{
        offer_url: {
            type: String,
            required: true
        },
        ratio_percentage: {
            type: Number,
            required: true
        }
    }],
    enabled: {
        type: Boolean,
        default: false
    }
}, { timestamps: true })
module.exports = mongoose.model("campaignModel", campaignSchema)