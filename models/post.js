const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema(
    {
        title: {
            type: String,
            required: true
        },
        estate: {
            type: String,
            required: true
        },
        purpose: {
            type: String,
            required: true
        },
        market: {
            type: String,
            required: true
        },
        heating: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        area: {
            type: Number,
            required: true
        },
        year: {
            type: Number,
            required: true
        },
        availability: {
            type: String,
            required: true
        },
        place: {
            type: String,
            required: true
        },
        rooms: {
            type: Number,
            required: true,
        },
        level: {
            type: Number,
            required: true
        },
        garage: {
            type: Boolean,
            default: false
        },
        balcony: {
            type: Boolean,
            default: false
        },
        lift: {
            type: Boolean,
            default: false
        },
        ac: {
            type: Boolean,
            default: false
        },
        basement: {
            type: Boolean,
            default: false
        },
        storage: {
            type: Boolean,
            default: false
        },
        description: {
            type: String,
            default: false
        },
        imagePath: {
            type: String,
            default: false
        },
        number: {
            type: String,
            default: false
        },
        pricePerSquareMeter: {
            type: Number,
            required: true,
        },
        creator: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model('Post', postSchema);