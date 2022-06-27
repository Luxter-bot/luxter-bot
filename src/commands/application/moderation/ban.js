import {Command} from "mitim"
import Discord from "discord.js"

export default new Command.ApplicationCommand({
    name: "ban",
    description: "Ban a user",
    category: "moderation",
    options: [
        {
            name: "user",
            description: "The user to ban",
            type: "USER",
            required: true
        },
        {
            name: "reason",
            description: "The reason for the ban",
            type: "STRING",
            required: true
        }
    ],
    permissions: {
        user: ["BAN_MEMBERS"],
        bot: ["BAN_MEMBERS"]
    },
    run: async (bot, interaction) => {
        const row = new Discord.MessageActionRow().addComponents(
            new Discord.MessageButton().setCustomId("delete-message").setLabel("Delete Message").setStyle("DANGER"),
            new Discord.MessageButton().setCustomId("accept").setLabel("Accept").setStyle("PRIMARY"),
            new Discord.MessageButton().setCustomId("decline").setLabel("Decline").setStyle("SECONDARY")
        )

        const member = interaction.options.getMember("user")

        const reason = interaction.options.getString("reason")

        if (member.id === interaction.user.id)
            return interaction.reply({
                content: `❌ | You can't ban yourself`
            })

        if (member.id === bot.user.id)
            return interaction.reply({
                content: `❌ | You can't ban me`
            })

        if (member.id === interaction.guild.ownerId)
            return interaction.reply({
                content: `❌ | You can't ban the server owner`
            })

        if (member.roles.highest.position > interaction.member.roles.highest.position)
            return interaction.reply({
                content: `❌ | You can't ban a user that has a highest role than you`
            })

        if (!member.bannable)
            return interaction.reply({
                content: `❌ | I can't ban a user that has a highest role than me`
            })

        if (reason.length > 50)
            return interaction.reply({
                content: `❌ | The reason can't has more than 50 characters`
            })

        await interaction.deferReply()

        const m = await interaction.editReply({
            content: `**¿Are you sure you want to ban ${member.user.tag}?**\n> This action it's irreversible.\n${Discord.Formatters.codeBlock(
                "",
                "Choice a button to continue. (You have 30 seconds to choice)"
            )}`,
            components: [row]
        })

        const collector = m.createMessageComponentCollector({time: 30000})

        collector.on("collect", async (i) => {
            if (i.user.id !== interaction.user.id)
                return i.reply({
                    content: `❌ | You cannot interact with this button`,
                    ephemeral: true
                })

            if (i.customId === "accept") {
                await i.deferUpdate()

                collector.stop("accept")

                await member
                    .ban({
                        reason: reason
                    })
                    .catch((error) => {
                        return i.editReply({
                            content: `❌ | I couldn't ban this user, an unexpected error has been ocurred: ${Discord.Formatters.codeBlock(
                                "prolog",
                                error
                            )}`
                        })
                    })

                await i.editReply({
                    content: `✅ | ${member.user.tag} has been banned\n${Discord.Formatters.codeBlock(
                        "",
                        `- User: ${member.user.tag}\n- Reason: ${reason}`
                    )}`,
                    components: []
                })

                member
                    .send({
                        content: `⚠️ | You have been banned from **${interaction.guild.name}**!\n${Discord.Formatters.codeBlock(
                            "",
                            `- Moderator responsible: ${interaction.user.tag}\n- Reason: ${reason}`
                        )}`
                    })
                    .catch(() => {})
            }

            if (i.customId === "decline") {
                await i.deferUpdate()

                collector.stop("declined")

                i.editReply({
                    content: `❌ | ${member.user.tag} has not been banned`,
                    components: []
                })
            }
        })

        collector.on("end", async (collected, reason) => {
            if (reason === "time") {
                interaction.editReply({
                    content: `❌ | You don't choose a button in time, the ban has been cancelled`,
                    components: []
                })
            }
        })
    }
})
