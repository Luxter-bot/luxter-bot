import Discord from "discord.js"
import {Command} from "mitim"

export default new Command.ApplicationCommand({
    name: "nuke",
    description: "Nuke a channel",
    options: [
        {
            name: "channel",
            description: "The channel to nuke",
            type: "CHANNEL",
            channelTypes: ["GUILD_TEXT", "GUILD_VOICE"]
        }
    ],
    category: "staff",
    permissions: {
        bot: ["MANAGE_CHANNELS"],
        user: ["MANAGE_CHANNELS"]
    },
    run: async (bot, interaction) => {
        const channel = interaction.options.getChannel("channel") || interaction.channel

        if (!channel.deletable)
            return interaction.reply({
                content: `❌ | I can't nuke that channel`
            })

        const channelDeleted = await channel.delete()

        const channelCloned = await channelDeleted.clone()

        channelCloned.send({
            content: `✅ | I have nuked the channel **${channel.name}**\n${Discord.Formatters.codeBlock(
                "diff",
                `- Nuked by ${interaction.user.tag}`
            )}`
        })
    }
})
