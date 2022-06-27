import mongoose from "mongoose"

const PermissionSchema = new mongoose.Schema({
    _id: String,
    permissions: {
        type: String,
        required: true,
        default: "default"
    }
})

export default mongoose.model("Permission", PermissionSchema)
