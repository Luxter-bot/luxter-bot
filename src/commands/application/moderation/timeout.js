import Discord from "discord.js"
import {Command} from "mitim"
import ms from "ms"
import moment from "moment"

export default new Command.ApplicationCommand({
    name: "timeout",
    description: "Timeout a user",
    category: "moderation",
    options: [
        {
            name: "user",
            description: "The user to timeout",
            type: "USER",
            required: true
        },
        {
            name: "time",
            description: "The time to timeout the user",
            type: "STRING",
            required: true
        },
        {
            name: "reason",
            description: "The reason for the timeout",
            type: "STRING"
        }
    ],
    permissions: {
        user: ["MODERATE_MEMBERS"],
        bot: ["MODERATE_MEMBERS"]
    },
    run: async (bot, interaction) => {
        const member = interaction.options.getMember("user")
        const time = interaction.options.getString("time")
        const reason = interaction.options.getString("reason") || "Not specified"

        if (member.id === interaction.user.id)
            return interaction.reply({
                content: "❌ | You can't timeout yourself"
            })

        if (member.id === bot.user.id)
            return interaction.reply({
                content: "❌ | You can't timeout me"
            })

        if (member.roles.highest.position >= interaction.member.roles.highest.position)
            return interaction.reply({
                content: "❌ | You can't timeout someone with a role higher or equal to yours"
            })

        if (!member.moderatable)
            return interaction.reply({
                content: "❌ | I can't timeout someone with the same or higher role than me"
            })

        const timeMs = ms(time)

        if (!timeMs)
            return interaction.reply({
                content: "❌ | The time you specified is invalid"
            })

        if (timeMs < 1000)
            return interaction.reply({
                content: "❌ | The time you specified is too short"
            })

        if (timeMs > ms("28d"))
            return interaction.reply({
                content: "❌ | The time you specified is highest than 28 days"
            })

        await member.timeout(timeMs, reason)

        interaction.reply({
            content: `✅ | ${member.user.tag} has been timed out for ${time}!\n${Discord.Formatters.codeBlock(
                "",
                `- Reason: ${reason}\n- Timeout Expires: ${moment(Math.floor(Date.now() + timeMs)).format("llll")}`
            )}`
        })

        member.send({
            content: `⚠️ | You have been timed out for ${time}!\n${Discord.Formatters.codeBlock(
                "",
                `- Reason: ${reason}\n- Timeout Expires: ${moment(Math.floor(Date.now() + timeMs)).format("llll")}\n- Moderator responsible: ${
                    interaction.user.tag
                }`
            )}`
        })
    }
})
