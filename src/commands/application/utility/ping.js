import {Command} from "mitim"
import Discord from "discord.js"

export default new Command.ApplicationCommand({
    category: "utility"
})
    .setName("ping")
    .setDescription("Get the latency of the bot")
    .setRun(async (bot, interaction) => {
        const ping = await bot.ws.ping

        interaction.reply(`Pong! Latency is ${ping}ms`)
    })
