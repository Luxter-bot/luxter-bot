import Discord from "discord.js"
import {Command} from "mitim"

export default new Command.ApplicationCommand({
    name: "unlock",
    description: "Unlock a channel",
    category: "staff",
    options: [
        {
            name: "channel",
            description: "The channel to unlock",
            type: "CHANNEL",
            channelTypes: ["GUILD_TEXT"]
        },
        {
            name: "role",
            description: "The role ro unlock the channel",
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

        if (channel.permissionsFor(role).has("SEND_MESSAGES"))
            return interaction.reply({
                content: `❌ | This channel it's already unlocked, or already was the **Send Messages** permissions for ${role}`,
                allowedMentions: {parse: []}
            })

        if (!channel.viewable)
            return interaction.reply({
                content: `❌ | I can't view the channel ${channel}`
            })

        await channel.permissionOverwrites
            .edit(role, {
                SEND_MESSAGES: true
            })
            .catch((e) => {
                return interaction.reply({
                    content: `❌ | I can't unlock the channel ${channel}\n${Discord.Formatters.codeBlock("prolog", e.message)}`
                })
            })

        interaction.reply({
            content: `✅ | The channel ${channel} has been unlocked for ${role}`
        })
    }
})
