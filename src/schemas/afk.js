import mongoose from "mongoose"

const afk = new mongoose.Schema({
    guildId: String,
    userId: String,
    reason: {
        type: String,
        required: true,
        default: "No reason given"
    },
    time: {
        type: Date,
        required: true,
        default: Date.now()
    }
})

export default mongoose.model("afk", afk)
