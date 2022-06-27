import Discord from "discord.js"
import {Command} from "mitim"
import afk from "../../../schemas/afk.js"

export default new Command.ApplicationCommand({
    name: "afk",
    description: "Set your status to AFK",
    category: "utility",
    options: [
        {
            name: "reason",
            description: "Reason for AFK",
            type: "STRING"
        }
    ],
    run: async (bot, interaction) => {
        const reason = interaction.options.reason || "No reason given"

        new afk({
            guildId: interaction.guild.id,
            userId: interaction.user.id,
            reason: reason,
            time: Date.now()
        }).save()

        interaction.reply({
            content: `✅ | I have set your afk status successfully, with the reason **${reason}**\n> I will let people who mention you know`
        })
    }
})
