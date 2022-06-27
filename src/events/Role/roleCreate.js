import Discord from "discord.js"
import {Event} from "mitim"
import Logs from "../../schemas/logs.js"

export default new Event({
    name: "roleCreate",
    run: async (bot, role) => {
        const data = await Logs.findOne({_id: role.guild.id})

        if (!data) return

        const channelLogs = role.guild.channels.cache.get(data.logs.roles.channel)

        if (!channelLogs || !channelLogs.viewable || !channelLogs.permissionsFor(role.guild.me).has("SEND_MESSAGES")) return

        if (data.logs.roles.actived) {
            const embed = new Discord.MessageEmbed()
                .setAuthor({name: `Role created`, iconURL: role.guild.iconURL({dynamic: true})})
                .setColor("4BDE0C")
                .setDescription(`A role has been created`)
                .addField("Role name", `${Discord.Formatters.codeBlock("", `${role.name} (${role.id})`)}`, true)
                .addField("Role color", `${Discord.Formatters.codeBlock("", role.hexColor)}`, true)
                .addField("_ _", "_ _", true)
                .addField("Role position", `${Discord.Formatters.codeBlock("", role.position)}`, true)
                .addField("Role hoisted", `${Discord.Formatters.codeBlock("", role.hoist)}`, true)
                .addField("Role managed", `${Discord.Formatters.codeBlock("", role.managed)}`, true)
                .setTimestamp()

            channelLogs.send({embeds: [embed]})
        }
    }
})
