import mitim from "mitim"
import "dotenv/config"
import fs from "fs"
import "./mongodb.js"

const bot = new mitim.Client({intents: 32767})

fs.readdirSync("./src/commands/application").forEach(async (folder) => {
    fs.readdirSync(`./src/commands/application/${folder}`).forEach(async (file) => {
        const command = (await import(`./commands/application/${folder}/${file}`)).default
        bot.ApplicationCommand.set(command.name, command)
    })
})

fs.readdirSync("./src/commands/text").forEach(async (folder) => {
    fs.readdirSync(`./src/commands/text/${folder}`).forEach(async (file) => {
        const command = (await import(`./commands/text/${folder}/${file}`)).default
        bot.TextCommand.set(command.name, command)
    })
})

fs.readdirSync("./src/events").forEach(async (folder) => {
    fs.readdirSync(`./src/events/${folder}`).forEach(async (file) => {
        const event = (await import(`./events/${folder}/${file}`)).default
        bot.on(event.name, event.run.bind(null, bot))
    })
})

process.on("uncaughtException", (err) => console.log(err))

bot.login(process.env.DISCORD_TOKEN)
