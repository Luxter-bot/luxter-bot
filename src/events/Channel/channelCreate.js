import Discord from "discord.js"
import {Event} from "mitim"
import Logs from "../../schemas/logs.js"
import permissions from "../../data/permissions.js"

export default new Event({
    name: "channelCreate",
    run: async (bot, channel) => {
        const data = await Logs.findOne({_id: channel.guild.id})

        if (!data) return

        const channelLogs = channel.guild.channels.cache.get(data.logs.channel.channel)

        if (!channelLogs || !channelLogs.viewable || !channelLogs.permissionsFor(channel.guild.me).has("SEND_MESSAGES")) return

        const channelType = {
            GUILD_TEXT: "Text",
            GUILD_VOICE: "Voice",
            GUILD_CATEGORY: "Category",
            GUILD_STAGE_VOICE: "Stage",
            GUILD_NEWS: "Announcement",
            GUILD_STORE: "Store"
        }

        if (data.logs.channel.actived) {
            const embed = new Discord.MessageEmbed()
                .setAuthor({name: `Channel created | ${channel.guild.name}`, iconURL: channel.guild.iconURL()})
                .setColor("07AE46")
                .setDescription(`A channel has been created (${channel})`)
                .addField("Channel", `${Discord.Formatters.codeBlock("", `${channel.name} (${channel.id})`)}`)
                .addField("Type", `${Discord.Formatters.codeBlock("", channelType[channel.type])}`, true)
                .addField("Parent", `${Discord.Formatters.codeBlock("", `${channel.parent?.name || "Without parent"} (${channel.parent?.id || ""})`)}`, true)
                .addField("Position", `${Discord.Formatters.codeBlock("", channel.position)}`, true)
                .addField(
                    "Permission Overwrites",
                    `${Discord.Formatters.codeBlock(
                        "",
                        channel.permissionOverwrites.cache
                            .map(
                                (x) =>
                                    `- ${
                                        channel.guild.roles.cache.get(x.id)
                                            ? `${channel.guild.roles.cache.get(x.id).name}`
                                            : `${channel.guild.users.cache.get(x.id).tag}`
                                    }:\nDenied: ${
                                        x.deny
                                            .toArray()
                                            .map((x) => permissions[x])
                                            .join(", ") || "Nothing"
                                    }\nAllowed: ${
                                        x.allow
                                            .toArray()
                                            .map((x) => permissions[x])
                                            .join(", ") || "Nothing"
                                    }`
                            )
                            .join("\n")
                    )}`
                )
                .setTimestamp()

            channelLogs.send({embeds: [embed]})
        }
    }
})
