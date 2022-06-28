import {Event} from "mitim"
import fs from "fs"

export default new Event({
    name: "guildCreate",
    run: async (bot, guild) => {
      bot.ApplicationCommand.forEach(async (command) => {
        await guild.commands.create(command)
      })

      console.log("Added to "+guild.name)
      
    }
})
