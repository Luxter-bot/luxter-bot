import {Event} from "mitim"
import afk from "../../schemas/afk.js"

export default new Event({
    name: "messageCreate",
    run: async (bot, message) => {
        if (message.mentions.users.first()) {
            const afkData = await afk.findOne({guildId: message.guild.id, userId: message.mentions.users.first()?.id})

            if (afkData) {
                return message.reply({
                    content: `❗ | This user has been afk for **${afkData.reason}**\n> Afk ${afkData.time.toLocaleString()} ago`
                })
            }
        } else {
            const afkData = await afk.findOne({guildId: message.guild.id, userId: message.author.id})

            if (afkData) {
                afkData.delete()

                return message.reply({
                    content: `✅ | Welcome back, i have removed your afk status successfully`
                })
            }
        }

        const prefix = "lx!"

        if (message.author.bot) return
        if (!message.content.startsWith(prefix)) return
        if (message.channel.type === "DM") return

        const args = message.content.slice(prefix.length).split(/ +/)
        const commandName = args.shift().toLowerCase()
        const cmd = bot.TextCommand.get(commandName) || bot.TextCommand.find((c) => c.aliases && c.aliases.includes(commandName))

        if (!cmd) return

        cmd.run(bot, message, args)
    }
})
