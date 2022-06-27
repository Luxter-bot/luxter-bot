import {Event} from "mitim"
import fs from "fs"

export default new Event({
    name: "ready",
    run: async (bot) => {
        bot.guilds.cache.forEach((guild) => {
            bot.ApplicationCommand.forEach(async (command) => {
                await guild.commands.create(command).catch(() => {})
            })
        })

        console.log(`Logged in as ${bot.user.tag}!`)
    }
})
