import Discord from "discord.js"
import {Event} from "mitim"
import moment from 'moment'
import Logs from "../../schemas/logs.js"

export default new Event({
    name: "guildMemberRemove",
    run: async (bot, member) => {
        const data = await Logs.findOne({_id: member.guild.id})

        if (!data) return

        const channel = member.guild.channels.cache.get(data.logs.member.channel)

        if (!channel || !channel.viewable || !channel.permissionsFor(member.guild.me).has("SEND_MESSAGES")) return

        if (data.logs.message.actived) {
            const embed = new Discord.MessageEmbed()
                .setAuthor({name: `Member leave`, iconURL: member.guild.iconURL()})
                .setColor("12B16E")
                .setDescription(`A member has leave (${member})`)
                .addField("Member", `${Discord.Formatters.codeBlock("", `${member.user.tag} / ${member.user.id}`)}`)
                .addField(
                    "Member joined at",
                    `${Discord.Formatters.codeBlock(
                        "",
                        `${moment(member.joinedAt).format("DD/MM/YYYY HH:mm:ss")} (${moment(member.joinedAt).fromNow()}`
                    )}`,
                    true
                )
                .addField(
                    "Member created at",
                    `${Discord.Formatters.codeBlock(
                        "",
                        `${moment(member.user.joinedAt).format("DD/MM/YYYY HH:mm:ss")} (${moment(member.user.joinedAt).fromNow()}`
                    )}`,
                    true
                )
                .addField("Roles", `${Discord.Formatters.codeBlock("", member.roles.cache.map((r) => `${r.name} (${r.id})`).join(", "))}`)
                .setTimestamp()

            channel.send({embeds: [embed]})
        }
    }
})
