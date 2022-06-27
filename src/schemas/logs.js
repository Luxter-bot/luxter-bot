import mongoose from "mongoose"

const LogsSchema = new mongoose.Schema({
    _id: String,
    logs: {
        message: {
            channel: String,
            actived: Boolean
        },
        guild: {
            channel: String,
            actived: Boolean
        },
        roles: {
            channel: String,
            actived: Boolean
        },
        member: {
            channel: String,
            actived: Boolean
        },
        channel: {
            channel: String,
            actived: Boolean
        }
    }
})

export default mongoose.model("Logs", LogsSchema)
