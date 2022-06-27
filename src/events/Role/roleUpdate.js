import Discord from "discord.js"
import {Event} from "mitim"
import Logs from "../../schemas/logs.js"
import permissions from "../../data/permissions.js"

export default new Event({
    name: "roleUpdate",
    run: async (bot, oldRole, newRole) => {
        const data = await Logs.findOne({_id: oldRole.guild.id})

        if (!data) return

        const channelLogs = oldRole.guild.channels.cache.get(data.logs.roles.channel)

        if (!channelLogs || !channelLogs.viewable || !channelLogs.permissionsFor(oldRole.guild.me).has("SEND_MESSAGES")) return

        if (data.logs.roles.actived) {
            if (oldRole.name !== newRole.name) {
                const embed = new Discord.MessageEmbed()
                    .setAuthor({name: `Role name changed`, iconURL: oldRole.guild.iconURL({dynamic: true})})
                    .setColor("4BDE0C")
                    .setDescription(`A role name has been changed`)
                    .addField("Old role name", `${Discord.Formatters.codeBlock("", oldRole.name)}`, true)
                    .addField("New role name", `${Discord.Formatters.codeBlock("", newRole.name)}`, true)
                    .setTimestamp()

                channelLogs.send({embeds: [embed]})
            }

            if (oldRole.hexColor !== newRole.hexColor) {
                const embed = new Discord.MessageEmbed()
                    .setAuthor({name: `Role color changed`, iconURL: oldRole.guild.iconURL({dynamic: true})})
                    .setColor("4BDE0C")
                    .setDescription(`A role color has been changed`)
                    .addField("Role", `${Discord.Formatters.codeBlock("", oldRole.name)}`)
                    .addField("Old role color", `${Discord.Formatters.codeBlock("", oldRole.hexColor)}`, true)
                    .addField("New role color", `${Discord.Formatters.codeBlock("", newRole.hexColor)}`, true)
                    .setTimestamp()

                channelLogs.send({embeds: [embed]})
            }

            if (oldRole.position !== newRole.position) {
                const embed = new Discord.MessageEmbed()
                    .setAuthor({name: `Role position changed`, iconURL: oldRole.guild.iconURL({dynamic: true})})
                    .setColor("4BDE0C")
                    .setDescription(`A role position has been changed`)
                    .addField("Role", `${Discord.Formatters.codeBlock("", oldRole.name)}`)
                    .addField("Old role position", `${Discord.Formatters.codeBlock("", oldRole.position)}`, true)
                    .addField("New role position", `${Discord.Formatters.codeBlock("", newRole.position)}`, true)
                    .setTimestamp()

                channelLogs.send({embeds: [embed]})
            }

            if (oldRole.hoist !== newRole.hoist) {
                const embed = new Discord.MessageEmbed()
                    .setAuthor({name: `Role hoisted changed`, iconURL: oldRole.guild.iconURL({dynamic: true})})
                    .setColor("4BDE0C")
                    .setDescription(`A role hoisted has been changed`)
                    .addField("Role", `${Discord.Formatters.codeBlock("", oldRole.name)}`)
                    .addField("Old role hoisted", `${Discord.Formatters.codeBlock("", oldRole.hoist)}`, true)
                    .addField("New role hoisted", `${Discord.Formatters.codeBlock("", newRole.hoist)}`, true)
                    .setTimestamp()

                channelLogs.send({embeds: [embed]})
            }

            if (oldRole.unicodeEmoji !== newRole.unicodeEmoji) {
                const embed = new Discord.MessageEmbed()
                    .setAuthor({name: `Role unicode emoji changed`, iconURL: oldRole.guild.iconURL({dynamic: true})})
                    .setColor("4BDE0C")
                    .setDescription(`A role unicode emoji has been changed`)
                    .addField("Role", `${Discord.Formatters.codeBlock("", oldRole.name)}`)
                    .addField("Old role unicode emoji", `${Discord.Formatters.codeBlock("", oldRole.unicodeEmoji)}`, true)
                    .addField("New role unicode emoji", `${Discord.Formatters.codeBlock("", newRole.unicodeEmoji)}`, true)
                    .setTimestamp()

                channelLogs.send({embeds: [embed]})
            }

            if (oldRole.mentionable !== newRole.mentionable) {
                const embed = new Discord.MessageEmbed()
                    .setAuthor({name: `Role mentionable changed`, iconURL: oldRole.guild.iconURL({dynamic: true})})
                    .setColor("4BDE0C")
                    .setDescription(`A role mentionable has been changed`)
                    .addField("Role", `${Discord.Formatters.codeBlock("", oldRole.name)}`)
                    .addField("Old role mentionable", `${Discord.Formatters.codeBlock("", oldRole.mentionable)}`, true)
                    .addField("New role mentionable", `${Discord.Formatters.codeBlock("", newRole.mentionable)}`, true)
                    .setTimestamp()

                channelLogs.send({embeds: [embed]})
            }

            if (oldRole.permissions !== newRole.permissions) {
                const embed = new Discord.MessageEmbed()
                    .setAuthor({name: `Role permissions changed`, iconURL: oldRole.guild.iconURL({dynamic: true})})
                    .setColor("4BDE0C")
                    .setDescription(
                        `A role permissions has been changed**\n[What those numbers mean](https://discordapi.com/permissions.html#${oldRole.permissions.bitfield})`
                    )
                    .addField("Role", `${Discord.Formatters.codeBlock("", oldRole.name)}`)
                    .addField("Old role permissions", `${Discord.Formatters.codeBlock("", `${oldRole.permissions.bitfield}`)}`, true)
                    .addField("New role permissions", `${Discord.Formatters.codeBlock("", `${newRole.permissions.bitfield}`)}`, true)
                    .setTimestamp()

                channelLogs.send({embeds: [embed]})
            }
        }
    }
})
