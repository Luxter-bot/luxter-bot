import Discord from "discord.js"
import {Event} from "mitim"
import Logs from "../../schemas/logs.js"

export default new Event({
    name: "messageDelete",
    run: async (bot, message) => {
        const data = await Logs.findOne({_id: message.guild.id})

        if (!data) return

        const channel = message.guild.channels.cache.get(data.logs.message.channel)

        if (!channel || !channel.viewable || !channel.permissionsFor(message.guild.me).has("SEND_MESSAGES")) return

        if (data.logs.message.actived) {
            if (!message.content && !message.attachments.first()) return

            const embed = new Discord.MessageEmbed()
                .setAuthor({name: `Message deleted | ${message.guild.name}`, iconURL: message.guild.iconURL()})
                .setColor("FF335B")
                .setDescription(`A message has been deleted in ${message.channel} by ${message.author}`)
                .addField("Author", `${Discord.Formatters.codeBlock("", `${message.author.tag} / ${message.author.id}`)}`, true)
                .addField("Message", `${Discord.Formatters.codeBlock("", `${message.content || "Without content"}`)}`)
                .addField("Channel", `${Discord.Formatters.codeBlock("", `${message.channel.name} (${message.channel.id})`)}`)
                .setImage(message.attachments.first()?.url || null)
                .setTimestamp()

            channel.send({embeds: [embed]})
        }
    }
})
