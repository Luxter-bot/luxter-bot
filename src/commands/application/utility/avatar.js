import {Command} from "mitim"
import Discord from "discord.js"

export default new Command.ApplicationCommand({
    category: "utility"
})
    .setName("avatar")
    .setOptions([
        {
            name: "user",
            description: "The user to get the avatar of",
            type: "USER"
        }
    ])
    .setDescription("Get the avatar of a user")
    .setRun(async (bot, interaction) => {
        const user = interaction.options.getUser("user") || interaction.user

        await user.fetch(true)

        const member = interaction.guild.members.cache.get(user.id)

        const row = new Discord.MessageActionRow().addComponents(
            new Discord.MessageButton().setCustomId("delete-message").setLabel("Delete Message").setStyle("DANGER"),
            new Discord.MessageButton().setCustomId("globalAvatar").setLabel("Global Avatar").setStyle("SECONDARY"),
            new Discord.MessageButton()
                .setCustomId("guildAvatar")
                .setLabel("Guild Avatar")
                .setStyle("SECONDARY")
                .setDisabled(member.avatar ? false : true),
            new Discord.MessageButton()
                .setCustomId("banner")
                .setLabel("Banner")
                .setStyle("SECONDARY")
                .setDisabled(user.banner ? false : true)
        )

        await interaction.deferReply()

        const m = await interaction.editReply({
            content: `${user.tag}'s avatar:`,
            files: [
                {
                    attachment: user.displayAvatarURL({
                        format: "png",
                        dynamic: true,
                        size: 1024
                    })
                }
            ],
            components: [row]
        })

        const collector = m.createMessageComponentCollector({time: 60000})

        collector.on("collect", async (i) => {
            if (i.user.id !== interaction.user.id)
                return i.reply({
                    content: `❌ | You can't do that`,
                    ephemeral: true
                })

            if (i.customId === "globalAvatar") {
                await i.deferUpdate()

                i.editReply({
                    content: `${user.tag}'s global avatar:`,
                    files: [
                        {
                            attachment: user.displayAvatarURL({
                                format: "png",
                                dynamic: true,
                                size: 1024
                            })
                        }
                    ]
                })
            }

            if (i.customId === "guildAvatar") {
                await i.deferUpdate()

                i.editReply({
                    content: `${user.tag}'s guild avatar:`,
                    files: [
                        {
                            attachment: member.displayAvatarURL({
                                format: "png",
                                dynamic: true,
                                size: 1024
                            })
                        }
                    ]
                })
            }

            if (i.customId === "banner") {
                await i.deferUpdate()

                i.editReply({
                    content: `${user.tag}'s banner:`,
                    files: [
                        {
                            attachment: user.bannerURL({
                                format: "png",
                                dynamic: true,
                                size: 1024
                            })
                        }
                    ]
                })
            }
        })
    })
