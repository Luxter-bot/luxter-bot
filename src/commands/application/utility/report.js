import Discord from "discord.js"
import {Command} from "mitim"

export default new Command.ApplicationCommand({
    name: "report",
    description: "Report any bug or suggestion to the bot owner",
    category: "utility",
    options: [
        {
            name: "bug",
            description: "Report a bug",
            type: "SUB_COMMAND",
            options: [
                {
                    name: "command",
                    description: "Report a bug in a command",
                    type: "STRING",
                    required: true,
                    autocomplete: true
                },
                {
                    name: "error",
                    description: "Report an error in a command",
                    type: "STRING",
                    required: true
                }
            ]
        },
        {
            name: "suggestion",
            description: "Report a suggestion",
            type: "SUB_COMMAND",
            options: [
                {
                    name: "suggest",
                    description: "Suggest a feature",
                    type: "STRING",
                    required: true
                }
            ]
        }
    ],
    run: async (bot, interaction) => {
        const option = interaction.options.getSubcommand()

        if (option === "bug") {
            const command = interaction.options.getString("command")

            const cmd = bot.ApplicationCommand.get(command)

            if (!cmd)
                return interaction.reply({
                    content: `❌ | Command not found`
                })

            const embed = new Discord.MessageEmbed()
                .setTitle("Bug Report")
                .setDescription(`${interaction.user.tag} has reported a bug in the command ${command}`)
                .addField("Command", `${cmd.name}`)
                .addField("Bug", `${Discord.Formatters.codeBlock("", interaction.options.getString("error"))}`)
                .setColor("#ff0000")

            bot.channels.cache.get("990677346111586415").send({embeds: [embed]})

            interaction.reply({
                content: `✅ | Bug reported`
            })
        }

        if (option === "suggestion") {
            const suggest = interaction.options.getString("suggest")

            const embed = new Discord.MessageEmbed()
                .setTitle("Suggestion")
                .setDescription(`${interaction.user.tag} has suggested a feature:\n${Discord.Formatters.codeBlock("", suggest)}`)
                .setColor("#00ff00")

            bot.channels.cache.get("990677473769439272").send({embeds: [embed]})

            interaction.reply({
                content: `✅ | Suggestion sent`
            })
        }
    }
})
