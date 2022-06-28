import mongoose from "mongoose"

const welcome = new mongoose.Schema({
    _id: String,
    channel: String,
    message: {
        embed: {
            title: String,
            description: String,
            color: String,
            thumbnail: String,
            image: String
        },
        text: String
    },
    roles: Array
})

export default mongoose.model("welcome", welcome)
