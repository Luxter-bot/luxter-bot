import Discord from "discord.js"
import {Event} from "mitim"
import Logs from "../../schemas/logs.js"

export default new Event({
    name: "guildMemberUpdate",
    run: async (bot, oldMember, newMember) => {
        const data = await Logs.findOne({_id: oldMember.guild.id})

        if (!data) return

        const channel = oldMember.guild.channels.cache.get(data.logs.member.channel)

        if (!channel || !channel.viewable || !channel.permissionsFor(oldMember.guild.me).has("SEND_MESSAGES")) return

        if (data.logs.message.actived) {
            if (oldMember.nickname !== newMember.nickname) {
                const embed = new Discord.MessageEmbed()
                    .setAuthor({name: `Member nickname changed`, iconURL: oldMember.guild.iconURL()})
                    .setColor("12B16E")
                    .setDescription(`A member nickname has been changed in ${oldMember.guild.name}`)
                    .addField("Member", `${Discord.Formatters.codeBlock("", `${oldMember.user.tag} / ${oldMember.user.id}`)}`)
                    .addField("Old nickname", `${Discord.Formatters.codeBlock("", `${oldMember.nickname || "Without nickname"}`)}`)
                    .addField("New nickname", `${Discord.Formatters.codeBlock("", `${newMember.nickname || "Without nickname"}`)}`)
                    .setTimestamp()

                channel.send({embeds: [embed]})
            }

            if (oldMember.roles.cache.size !== newMember.roles.cache.size) {
                const rolesAdded = newMember.roles.cache.filter((x) => !oldMember.roles.cache.get(x.id))
                const rolesRemoved = oldMember.roles.cache.filter((x) => !newMember.roles.cache.get(x.id))

                if (rolesAdded.size !== 0 || rolesRemoved !== 0) {
                    const roleAddedString = []
                    for (const role of [...rolesAdded.values()]) {
                        roleAddedString.push(role.name)
                    }

                    const roleRemovedString = []
                    for (const role of [...rolesRemoved.values()]) {
                        roleRemovedString.push(role.name)
                    }

                    const embed = new Discord.MessageEmbed()
                        .setAuthor({name: `Member roles changed`, iconURL: oldMember.guild.iconURL()})
                        .setColor("12B16E")
                        .setDescription(`A member roles has been changed (${oldMember})`)
                        .addField("Member", `${Discord.Formatters.codeBlock("", `${oldMember.user.tag} / ${oldMember.user.id}`)}`)
                        .addField("Roles added", `${Discord.Formatters.codeBlock("", `${roleAddedString.join("\n") || "None"}`)}`)
                        .addField("Roles removed", `${Discord.Formatters.codeBlock("", `${roleRemovedString.join("\n") || "None"}`)}`)
                        .setTimestamp()

                    channel.send({embeds: [embed]})
                }
            }
        }
    }
})
