import Discord from "discord.js"
import {Command} from "mitim"

export default new Command.ApplicationCommand({
    name: "clear",
    description: "Clear messages from a channel",
    category: "staff",
    options: [
        {
            name: "count",
            description: "The number of messages to delete",
            type: "INTEGER",
            required: true,
            minValue: 1,
            maxValue: 100
        },
        {
            name: "channel",
            description: "The channel to clear",
            type: "CHANNEL",
            required: false,
            channelTypes: ["GUILD_TEXT"]
        },
        {
            name: "user",
            description: "The user to clear",
            type: "USER",
            required: false
        }
    ],
    permissions: {
        user: ["MANAGE_MESSAGES"],
        bot: ["MANAGE_MESSAGES"]
    },
    run: async (bot, interaction) => {
        const count = interaction.options.getInteger("count")

        const channel = interaction.options.getChannel("channel") || interaction.channel

        const user = interaction.options.getUser("user")

        if (!user) {
            const messages = await channel.messages.fetch({
                limit: count
            })

            await channel.bulkDelete(
                messages.filter((m) => !m.pinned),
                true
            )

            interaction.reply({
                content: `✅ | **${messages.size}** messages has been deleted in ${channel}`
            })
        } else {
            const messages = await channel.messages.fetch({
                limit: count
            })

            await channel.bulkDelete(
                messages.filter((m) => !m.pinned && m.author.id === user.id),
                true
            )

            interaction.reply({
                content: `✅ | **${count}** messages has been deleted in ${channel} from the user ${user}`
            })
        }
    }
})
