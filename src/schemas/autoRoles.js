import mongoose from "mongoose"

const autoRoles = new mongoose.Schema({
    _id: String,
    roles: Array
})

export default mongoose.model("autoRoles", autoRoles)
