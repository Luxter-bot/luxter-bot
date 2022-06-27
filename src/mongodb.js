import mongoose from "mongoose"

import "dotenv/config"

mongoose
    .connect(process.env.MONGOURL, {})
    .then(() => console.log("Connected to MongoDB"))
    .catch(console.error)
