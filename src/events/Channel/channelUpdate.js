import Discord from "discord.js"
import {Event} from "mitim"
import Logs from "../../schemas/logs.js"
import permissions from "../../data/permissions.js"

export default new Event({
    name: "channelUpdate",
    run: async (bot, oldChannel, newChannel) => {
        const data = await Logs.findOne({_id: oldChannel.guild.id})

        if (!data) return

        const channelLogs = oldChannel.guild.channels.cache.get(data.logs.channel.channel)

        if (!channelLogs || !channelLogs.viewable || !channelLogs.permissionsFor(oldChannel.guild.me).has("SEND_MESSAGES")) return

        const channelType = {
            GUILD_TEXT: "Text",
            GUILD_VOICE: "Voice",
            GUILD_CATEGORY: "Category",
            GUILD_STAGE_VOICE: "Stage",
            GUILD_NEWS: "Announcement",
            GUILD_STORE: "Store"
        }

        if (data.logs.channel.actived) {
            if (oldChannel.name !== newChannel.name) {
                const embed = new Discord.MessageEmbed()
                    .setAuthor({name: `Channel name edited`, iconURL: oldChannel.guild.iconURL()})
                    .setColor("07AE46")
                    .setDescription(`The name of the channel ${oldChannel} has been edited`)
                    .addField("Channel", `${Discord.Formatters.codeBlock("", `${oldChannel.name} (${oldChannel.id})`)}`)
                    .addField("Old Name", `${Discord.Formatters.codeBlock("", `${oldChannel.name}`)}`, true)
                    .addField("New Name", `${Discord.Formatters.codeBlock("", `${newChannel.name}`)}`, true)
                    .setTimestamp()

                channelLogs.send({embeds: [embed]})
            }

            if (oldChannel.topic !== newChannel.topic) {
                const embed = new Discord.MessageEmbed()
                    .setAuthor({name: `Channel topic edited`, iconURL: oldChannel.guild.iconURL()})
                    .setColor("07AE46")
                    .setDescription(`The topic of the channel ${oldChannel} has been edited`)
                    .addField("Channel", `${Discord.Formatters.codeBlock("", `${oldChannel.name} (${oldChannel.id})`)}`)
                    .addField("Old Topic", `${Discord.Formatters.codeBlock("", `${oldChannel.topic || "Without topic"}`)}`, true)
                    .addField("New Topic", `${Discord.Formatters.codeBlock("", `${newChannel.topic || "Without topic"}`)}`, true)
                    .setTimestamp()

                channelLogs.send({embeds: [embed]})
            }

            if (oldChannel.position !== newChannel.position) {
                const embed = new Discord.MessageEmbed()
                    .setAuthor({name: `Channel position edited`, iconURL: oldChannel.guild.iconURL()})
                    .setColor("07AE46")
                    .setDescription(`The position of the channel ${oldChannel} has been edited`)
                    .addField("Channel", `${Discord.Formatters.codeBlock("", `${oldChannel.name} (${oldChannel.id})`)}`)
                    .addField("Old Position", `${Discord.Formatters.codeBlock("", `${oldChannel.position}`)}`, true)
                    .addField("New Position", `${Discord.Formatters.codeBlock("", `${newChannel.position}`)}`, true)
                    .setTimestamp()

                channelLogs.send({embeds: [embed]})
            }

            if (oldChannel.parentID !== newChannel.parentID) {
                const embed = new Discord.MessageEmbed()
                    .setAuthor({name: `Channel parent edited`, iconURL: oldChannel.guild.iconURL()})
                    .setColor("07AE46")
                    .setDescription(`The parent of the channel ${oldChannel} has been edited`)
                    .addField("Channel", `${Discord.Formatters.codeBlock("", `${oldChannel.name} (${oldChannel.id})`)}`)
                    .addField("Old Parent", `${Discord.Formatters.codeBlock("", `${oldChannel.parentID || "Without parent"}`)}`, true)
                    .addField("New Parent", `${Discord.Formatters.codeBlock("", `${newChannel.parentID || "Without parent"}`)}`, true)
                    .setTimestamp()

                channelLogs.send({embeds: [embed]})
            }

            if (oldChannel.nsfw !== newChannel.nsfw) {
                const embed = new Discord.MessageEmbed()
                    .setAuthor({name: `Channel nsfw edited`, iconURL: oldChannel.guild.iconURL()})
                    .setColor("07AE46")
                    .setDescription(`The nsfw of the channel ${oldChannel} has been edited`)
                    .addField("Channel", `${Discord.Formatters.codeBlock("", `${oldChannel.name} (${oldChannel.id})`)}`)
                    .addField("Old nsfw", `${Discord.Formatters.codeBlock("", `${oldChannel.nsfw}`)}`, true)
                    .addField("New nsfw", `${Discord.Formatters.codeBlock("", `${newChannel.nsfw}`)}`, true)
                    .setTimestamp()

                channelLogs.send({embeds: [embed]})
            }

            if (oldChannel.rateLimitPerUser !== newChannel.rateLimitPerUser) {
                const embed = new Discord.MessageEmbed()
                    .setAuthor({name: `Channel rate limit edited`, iconURL: oldChannel.guild.iconURL()})
                    .setColor("07AE46")
                    .setDescription(`The rate limit of the channel ${oldChannel} has been edited`)
                    .addField("Channel", `${Discord.Formatters.codeBlock("", `${oldChannel.name} (${oldChannel.id})`)}`)
                    .addField("Old Rate Limit", `${Discord.Formatters.codeBlock("", `${oldChannel.rateLimitPerUser}`)}`, true)
                    .addField("New Rate Limit", `${Discord.Formatters.codeBlock("", `${newChannel.rateLimitPerUser}`)}`, true)
                    .setTimestamp()

                channelLogs.send({embeds: [embed]})
            }

            if (oldChannel.bitrate !== newChannel.bitrate) {
                const embed = new Discord.MessageEmbed()
                    .setAuthor({name: `Channel bitrate edited`, iconURL: oldChannel.guild.iconURL()})
                    .setColor("07AE46")
                    .setDescription(`The bitrate of the channel ${oldChannel} has been edited`)
                    .addField("Channel", `${Discord.Formatters.codeBlock("", `${oldChannel.name} (${oldChannel.id})`)}`)
                    .addField("Old Bitrate", `${Discord.Formatters.codeBlock("", `${oldChannel.bitrate}`)}`, true)
                    .addField("New Bitrate", `${Discord.Formatters.codeBlock("", `${newChannel.bitrate}`)}`, true)
                    .setTimestamp()

                channelLogs.send({embeds: [embed]})
            }

            if (oldChannel.userLimit !== newChannel.userLimit) {
                const embed = new Discord.MessageEmbed()
                    .setAuthor({name: `Channel user limit edited`, iconURL: oldChannel.guild.iconURL()})
                    .setColor("07AE46")
                    .setDescription(`The user limit of the channel ${oldChannel} has been edited`)
                    .addField("Channel", `${Discord.Formatters.codeBlock("", `${oldChannel.name} (${oldChannel.id})`)}`)
                    .addField("Old User Limit", `${Discord.Formatters.codeBlock("", `${oldChannel.userLimit}`)}`, true)
                    .addField("New User Limit", `${Discord.Formatters.codeBlock("", `${newChannel.userLimit}`)}`, true)
                    .setTimestamp()

                channelLogs.send({embeds: [embed]})
            }

            if (oldChannel.permissionOverwrites.cache !== newChannel.permissionOverwrites.cache) {
                const embed = new Discord.MessageEmbed()
                    .setAuthor({name: `Channel permission overwrites edited`, iconURL: oldChannel.guild.iconURL()})
                    .setColor("07AE46")
                    .setDescription(`The permission overwrites of the channel ${oldChannel} have been edited`)
                    .addField("Channel", `${Discord.Formatters.codeBlock("", `${oldChannel.name} (${oldChannel.id})`)}`)
                    .addField(
                        "Old Permission Overwrites",
                        `${Discord.Formatters.codeBlock(
                            "",
                            `${oldChannel.permissionOverwrites.cache
                                .map(
                                    (x) =>
                                        `- ${
                                            oldChannel.guild.roles.cache.get(x.id)
                                                ? `${oldChannel.guild.roles?.cache.get(x.id).name}`
                                                : `${oldChannel.guild.users?.cache.get(x.id).tag}`
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
                                .join("\n")}`
                        )}`,
                        true
                    )
                    .addField(
                        "New Permission Overwrites",
                        `${Discord.Formatters.codeBlock(
                            "",
                            `${newChannel.permissionOverwrites.cache
                                .filter((x) => !x.allow.toArray().includes(oldChannel.permissionOverwrites.cache))
                                .map(
                                    (x) =>
                                        `- ${
                                            oldChannel.guild.roles.cache.get(x.id)
                                                ? `${oldChannel.guild.roles?.cache.get(x.id).name}`
                                                : `${oldChannel.guild.users?.cache.get(x.id).tag}`
                                        }:\nDenied: ${
                                            x.deny
                                                .toArray()
                                                .map((x) => permissions[x])
                                                .join(", ") || "Nothing"
                                        }\nAllowed: ${
                                            x.allow
                                                .toArray()
                                                .map((x) => permissions[x])
                                                .join("\n") || "Nothing"
                                        }`
                                )}`
                        )}`,
                        true
                    )
                    .setTimestamp()

                channelLogs.send({embeds: [embed]})
            }
        }
    }
})
