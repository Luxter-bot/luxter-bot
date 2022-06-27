import Discord from "discord.js"
import {Event} from "mitim"
import Logs from "../../schemas/logs.js"

export default new Event({
    name: "messageUpdate",
    run: async (bot, oldMessage, newMessage) => {
        const data = await Logs.findOne({_id: oldMessage.guild.id})

        if (!data) return

        const channel = oldMessage.guild.channels.cache.get(data.logs.message.channel)

        if (!channel || !channel.viewable || !channel.permissionsFor(oldMessage.guild.me).has("SEND_MESSAGES")) return

        if (data.logs.message.actived) {

            if (oldMessage.content !== newMessage.content) {

                const embed = new Discord.MessageEmbed()
                    .setAuthor({name: `Message edited | ${oldMessage.guild.name}`, iconURL: oldMessage.guild.iconURL()})
                    .setColor("FF335B")
                    .setDescription(`A message has edited deleted in ${oldMessage.channel} by ${oldMessage.author}`)
                    .addField("Author", `${Discord.Formatters.codeBlock("", `${oldMessage.author.tag} / ${oldMessage.author.id}`)}`, true)
                    .addField("Before", `${Discord.Formatters.codeBlock("", oldMessage.content || "Without content")}`)
                    .addField("After", `${Discord.Formatters.codeBlock("", newMessage.content || "Without content")}`)
                    .addField("Channel", `${Discord.Formatters.codeBlock("", `${newMessage.channel.name} (${newMessage.channel.id})`)}`)
                    .setTimestamp()

                channel.send({embeds: [embed]})
            }

            if (!oldMessage.pinned && newMessage.pinned) {
                const embed = new Discord.MessageEmbed()
                    .setAuthor({name: `Message pinned | ${message.guild.name}`, iconURL: message.guild.iconURL()})
                    .setColor("FF335B")
                    .addField("Author", `${Discord.Formatters.codeBlock("", `${oldMessage.author.tag} / ${oldMessage.author.id}`)}`, true)
                    .addField("Message", `${Discord.Formatters.codeBlock("", oldMessage.content)}`)
                    .addField("Channel", `${Discord.Formatters.codeBlock("", `${newMessage.channel.name} (${newMessage.channel.id})`)}`)
                    .setTimestamp()

                channel.send({embeds: [embed]})
            }
        }
    }
})
