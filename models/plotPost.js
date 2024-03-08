const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const plotPostSchema = new Schema(
    {
        title: {
            type: String,
            required: true
        },
        estate: {
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
        place: {
            type: String,
            required: true
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

module.exports = mongoose.model('PlotPost', plotPostSchema);