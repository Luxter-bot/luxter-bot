import Discord from "discord.js"
import {Command} from "mitim"
import Logs from "../../../schemas/logs.js"

export default new Command.ApplicationCommand({
    name: "logs",
    description: "Set the logs configuration",
    category: "configuration",
    options: [
        {
            name: "set-channel",
            description: "Set the channel to send the logs",
            type: "CHANNEL",
            required: true,
            channelTypes: ["GUILD_TEXT"]
        },
        {
            name: "type",
            description: "The type of log to send",
            type: "STRING",
            required: true,
            choices: [
                {
                    name: "channel",
                    value: "channel"
                },
                {
                    name: "message",
                    value: "message"
                },
                {
                    name: "guild",
                    value: "guild"
                },
                {
                    name: "member",
                    value: "member"
                },
                {
                    name: "role",
                    value: "role"
                }
            ]
        }
    ],
    permissions: {
        user: ["MANAGE_GUILD"]
    },
    run: async (bot, interaction) => {
        const channel = interaction.options.getChannel("set-channel")
        const type = interaction.options.getString("type")

        const data = await Logs.findOne({_id: interaction.guild.id})

        if (type === "channel") {
            if (!data) {
                new Logs({
                    _id: interaction.guild.id,
                    logs: {
                        channel: {
                            actived: true,
                            channel: channel.id
                        }
                    }
                }).save()
            } else {
                data.logs.channel.actived = true
                data.logs.channel.channel = channel.id
                data.save()
            }

            return interaction.reply(`🔩 | The **${type}** logs will be sended in ${channel}`)
        }

        if (type === "message") {
            if (!data) {
                new Logs({
                    _id: interaction.guild.id,
                    logs: {
                        message: {
                            actived: true,
                            channel: channel.id
                        }
                    }
                }).save()
            } else {
                data.logs.message.actived = true
                data.logs.message.channel = channel.id
                data.save()
            }

            return interaction.reply(`🔩 | The **${type}** logs will be sended in ${channel}`)
        }

        if (type === "guild") {
            if (!data) {
                new Logs({
                    _id: interaction.guild.id,
                    logs: {
                        guild: {
                            actived: true,
                            channel: channel.id
                        }
                    }
                }).save()
            } else {
                data.logs.guild.actived = true
                data.logs.guild.channel = channel.id
                data.save()
            }

            return interaction.reply(`🔩 | The **${type}** logs will be sended in ${channel}`)
        }

        if (type === "member") {
            if (!data) {
                new Logs({
                    _id: interaction.guild.id,
                    logs: {
                        member: {
                            actived: true,
                            channel: channel.id
                        }
                    }
                }).save()
            } else {
                data.logs.member.actived = true
                data.logs.member.channel = channel.id
                data.save()
            }

            return interaction.reply(`🔩 | The **${type}** logs will be sended in ${channel}`)
        }

        if (type === "role") {
            if (!data) {
                new Logs({
                    _id: interaction.guild.id,
                    logs: {
                        roles: {
                            actived: true,
                            channel: channel.id
                        }
                    }
                }).save()
            } else {
                data.logs.roles.actived = true
                data.logs.roles.channel = channel.id
                data.save()
            }

            return interaction.reply(`🔩 | The **${type}** logs will be sended in ${channel}`)
        }
    }
})
