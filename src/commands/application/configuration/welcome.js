import Discord from "discord.js"
import {Command} from "mitim"
import welcome from "../../../schemas/welcome.js"

export default new Command.ApplicationCommand({
    name: "welcome",
    description: "Set the config welcome",
    category: "configuration",
    options: [
        {
            name: "channel",
            description: "The channel to set the welcome",
            type: "SUB_COMMAND",
            options: [
                {
                    name: "set",
                    description: "Set the welcome channel",
                    type: "CHANNEL",
                    required: true,
                    channelTypes: ["GUILD_TEXT"]
                }
            ]
        },
        {
            name: "message",
            description: "The message to set the welcome",
            type: "SUB_COMMAND_GROUP",
            options: [
                {
                    name: "embed",
                    description: "Set the welcome message as an embed",
                    type: "SUB_COMMAND"
                },
                {
                    name: "text",
                    description: "Set the welcome message as a text",
                    type: "SUB_COMMAND"
                }
            ]
        },
        {
            name: "roles",
            description: "Add roles to add to the new member",
            type: "SUB_COMMAND_GROUP",
            options: [
                {
                    name: "add",
                    description: "Add a role to the welcome",
                    type: "SUB_COMMAND",
                    options: [
                        {
                            name: "role",
                            description: "The role to add to the welcome",
                            type: "ROLE",
                            required: true
                        }
                    ]
                },
                {
                    name: "remove",
                    description: "Remove a role from the welcome",
                    type: "SUB_COMMAND",
                    options: [
                        {
                            name: "role",
                            description: "The role to remove from the welcome",
                            type: "ROLE",
                            required: true
                        }
                    ]
                },
                {
                    name: "list",
                    description: "List the roles added to the welcome",
                    type: "SUB_COMMAND"
                }
            ]
        }
    ],
    permissions: {
        user: ["ADMINISTRATOR"]
    },
    run: async (bot, interaction) => {
        const option = interaction.options.getSubcommand()

        if (option === "channel") {
            const channel = interaction.options.getChannel("channel") || interaction.channel

            if (!channel.viewable)
                return interaction.reply({
                    content: `❌ | I can't view the channel ${channel}`
                })

            const data = await welcome.findOne({_id: interaction.guild.id})

            if (!data) {
                new welcome({
                    _id: interaction.guild.id,
                    channel: channel.id
                }).save()
            } else {
                data.channel = channel.id
                data.save()
            }

            interaction.reply({
                content: `✅ | The welcome channel is now ${channel}`
            })
        }

        if (option === "embed") {
            const title = new Discord.TextInputComponent()
                .setCustomId("title-welcome")
                .setLabel("Title")
                .setMaxLength(256)
                .setRequired(true)
                .setStyle("PARAGRAPH")

            const description = new Discord.TextInputComponent()
                .setCustomId("description-welcome")
                .setLabel("Description")
                .setMaxLength(4000)
                .setRequired(true)
                .setStyle("PARAGRAPH")

            const color = new Discord.TextInputComponent()
                .setCustomId("color-welcome")
                .setLabel("Color")
                .setMaxLength(6)
                .setRequired(true)
                .setStyle("PARAGRAPH")

            const image = new Discord.TextInputComponent().setCustomId("image-welcome").setMaxLength(2048).setLabel("Image URL").setStyle("PARAGRAPH")

            const thumbnail = new Discord.TextInputComponent()
                .setCustomId("thumbnail-welcome")
                .setLabel("Thumbnail")
                .setMaxLength(2048)
                .setStyle("PARAGRAPH")

            const modal = new Discord.Modal()
                .setCustomId("modal-welcome")
                .setTitle("Create an welcome message")
                .addComponents(
                    new Discord.MessageActionRow().addComponents(title),
                    new Discord.MessageActionRow().addComponents(description),
                    new Discord.MessageActionRow().addComponents(color),
                    new Discord.MessageActionRow().addComponents(image),
                    new Discord.MessageActionRow().addComponents(thumbnail)
                )

            interaction.showModal(modal)
        }

        if (option === "text") {
            const text = new Discord.TextInputComponent()
                .setCustomId("text-welcome")
                .setLabel("Text")
                .setMaxLength(2056)
                .setRequired(true)
                .setStyle("PARAGRAPH")

            const modal = new Discord.Modal()
                .setCustomId("modal-welcome-text")
                .setTitle("Create an welcome message")
                .addComponents(new Discord.MessageActionRow().addComponents(text))

            interaction.showModal(modal)
        }
    }
})
