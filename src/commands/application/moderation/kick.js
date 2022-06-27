import {Command} from "mitim"
import Discord from "discord.js"

export default new Command.ApplicationCommand({
    name: "kick",
    description: "Kick a user",
    category: "moderation",
    options: [
        {
            name: "user",
            description: "The user to kick",
            type: "USER",
            required: true
        },
        {
            name: "reason",
            description: "The reason for the kick",
            type: "STRING",
            required: false,
            default: "No reason given"
        }
    ],
    permissions: {
        user: ["KICK_MEMBERS"],
        bot: ["KICK_MEMBERS"]
    },
    run: async (bot, interaction) => {
        const member = interaction.options.getMember("user")

        const reason = interaction.options.getString("reason")

        if (member.id === interaction.user.ud)
            return interaction.reply({
                content: `❌ |You can't kick yourself`
            })

        if (member.id === bot.user.id)
            return interaction.reply({
                content: `❌ | You can't kick myself`
            })

        if (member.id === interaction.guild.ownerId)
            return interaction.reply({
                content: `❌ | You can't kick the server owner`
            })

        if (member.roles.highest.position > interaction.member.roles.highest.position)
            return interaction.reply({
                content: `❌ | You can't kick someone with a higher role than you`
            })

        if (!member.kickable)
            return interaction.reply({
                content: `❌ | I can't kick someone with a higher role than me`
            })

        await member.kick(reason).catch((err) => {
            return interaction.reply({
                content: `❌ | An unexpected error has been ocurred trying to kick **${member.user.tag}**\n${Discord.Formatters.codeBlock(
                    "prolog",
                    err
                )}`
            })
        })

        interaction.reply({
            content: `✅ | ${member.username} has been kicked`
        })

        member
            .send({
                content: `⚠️ | You have been kicked from **${interaction.guild.name}**!\n${Discord.Formatters.codeBlock(
                    "",
                    `- Moderator responsible: ${interaction.user.username}\n- Reason: ${reason}`
                )}`
            })
            .catch(() => {})
    }
})
