import Discord from "discord.js"
import {Command} from "mitim"

export default new Command.ApplicationCommand({
    name: "lock",
    description: "Lock a channel",
    category: "staff",
    options: [
        {
            name: "channel",
            description: "The channel to lock",
            type: "CHANNEL",
            channelTypes: ["GUILD_TEXT"]
        },
        {
            name: "role",
            description: "The role ro lock the channel",
            type: "ROLE"
        }
    ],
    permissions: {
        user: ["MANAGE_CHANNELS"],
        bot: ["MANAGE_CHANNELS"]
    },
    run: async (bot, interaction) => {
        const channel = interaction.options.getChannel("channel") || interaction.channel
        const role = interaction.options.getRole("role") || interaction.guild.roles.everyone

        if (!channel.permissionsFor(role).has("SEND_MESSAGES"))
            return interaction.reply({
                content: `❌ | This channel it's already locked, or already wasn't the **Send Messages** permissions for everyone ${role}`,
                allowedMentions: {parse: []}
            })

        if (!channel.viewable)
            return interaction.reply({
                content: `❌ | I can't view the channel ${channel}`
            })

        await channel.permissionOverwrites
            .create(role, {
                SEND_MESSAGES: false
            })
            .catch((e) => {
                return interaction.reply({
                    content: `❌ | I can't lock the channel ${channel}\n${Discord.Formatters.codeBlock("prolog", e.message)}`
                })
            })

        interaction.reply({
            content: `✅ | The channel ${channel} has been locked for ${role}`
        })
    }
})
