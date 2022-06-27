import Discord from "discord.js"
import {Event} from "mitim"
import Logs from "../../schemas/logs.js"

export default new Event({
    name: "guildMemberAdd",
    run: async (bot, member) => {
        const data = await Logs.findOne({_id: member.guild.id})

        if (!data) return

        const channel = member.guild.channels.cache.get(data.logs.member.channel)

        if (!channel || !channel.viewable || !channel.permissionsFor(member.guild.me).has("SEND_MESSAGES")) return

        if (data.logs.message.actived) {
            const embed = new Discord.MessageEmbed()
                .setAuthor({name: `Member joined`, iconURL: member.guild.iconURL()})
                .setColor("12B16E")
                .setDescription(`A member has joined (${member})`)
                .addField("Member", `${Discord.Formatters.codeBlock("", `${member.user.tag} / ${member.user.id}`)}`)
                .addField(
                    "Member joined at",
                    `${Discord.Formatters.codeBlock(
                        "",
                        `<t:${Math.floor(member.joinedTimestamp / 1000)}:D> <t:${Math.floor(member.joinedTimestamp / 1000)}:R>`
                    )}`,
                    true
                )
                .addField(
                    "Member created at",
                    `${Discord.Formatters.codeBlock(
                        "",
                        `<t:${Math.floor(member.user.createdTimestamp / 1000)}:D> <t:${Math.floor(member.user.createdTimestamp / 1000)}:R>`
                    )}`,
                    true
                )
                .setTimestamp()

            channel.send({embeds: [embed]})
        }
    }
})
