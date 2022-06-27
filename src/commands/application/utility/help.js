import Discord from "discord.js"
import {Command} from "mitim"

export default new Command.ApplicationCommand({
    name: "help",
    description: "Get help about a command, or get my command list",
    category: "utility",
    options: [
        {
            name: "command",
            description: "Get help about a command",
            type: "STRING",
            autocomplete: true
        }
    ],
    run: async (bot, interaction) => {
        const command = interaction.options.getString("command")

        if (!command) {
            const row = new Discord.MessageActionRow().addComponents(
                new Discord.MessageButton().setCustomId("delete-message").setLabel("Delete").setStyle("DANGER")
            )

            const row2 = new Discord.MessageActionRow().addComponents(
                new Discord.MessageSelectMenu()
                    .setCustomId("command-list")
                    .setPlaceholder("Select a command category")
                    .addOptions([
                        {
                            label: "Utility",
                            value: "utility",
                            description: "Get a list of utility commands"
                        },
                        {
                            label: "Moderation",
                            value: "moderation",
                            description: "Get a list of moderation commands"
                        },
                        {
                            label: "Configuration",
                            value: "configuration",
                            description: "Get a list of configuration commands"
                        },
                        {
                            label: "Fun",
                            value: "fun",
                            description: "Get a list of fun commands"
                        },
                        {
                            label: "Staff",
                            value: "staff",
                            description: "Get a list of staff commands"
                        }
                    ])
            )

            await interaction.deferReply()

            const m = await interaction.editReply({
                content: `¡Hi 👋!\nIf you use this command, it's because you want to know mi command list.\n> You have a menu in the below part to choose a category.\n${Discord.Formatters.codeBlock(
                    "diff",
                    '+ If you want to know more about a command, use the command "/help <command>"\n+ If you want to know more about me, use the command "botinfo"'
                )}`,
                components: [row2, row]
            })

            const collector = m.createMessageComponentCollector({time: 60000})

            collector.on("collect", async (i) => {
                if (i.values[0] === "utility") {
                    await i.deferUpdate()

                    await i.editReply({
                        content: `**Utility Commands**\nThere are my utility commands: ${Discord.Formatters.codeBlock(
                            "",
                            bot.ApplicationCommand.filter((c) => c.category === "utility")
                                .map((x) => `${x.name} - ${x.description}`)
                                .join("\n")
                        )}`
                    })
                }

                if (i.values[0] === "moderation") {
                    await i.deferUpdate()

                    await i.editReply({
                        content: `**Moderation Commands**\nThere are my moderation commands: ${Discord.Formatters.codeBlock(
                            "",
                            bot.ApplicationCommand.filter((c) => c.category === "moderation")
                                .map((x) => `${x.name} - ${x.description}`)
                                .join("\n")
                        )}`
                    })
                }

                if (i.values[0] === "configuration") {
                    await i.deferUpdate()

                    await i.editReply({
                        content: `**Configuration Commands**\nThere are my configuration commands: ${Discord.Formatters.codeBlock(
                            "",
                            bot.ApplicationCommand.filter((c) => c.category === "configuration")
                                .map((x) => `${x.name} - ${x.description}`)
                                .join("\n")
                        )}`
                    })
                }

                if (i.values[0] === "fun") {
                    await i.deferUpdate()

                    await i.editReply({
                        content: `**Fun Commands**\nThere are my fun commands: ${Discord.Formatters.codeBlock(
                            "",
                            bot.ApplicationCommand.filter((c) => c.category === "fun")
                                .map((x) => `${x.name} - ${x.description}`)
                                .join("\n")
                        )}`
                    })
                }

                if (i.values[0] === "staff") {
                    await i.deferUpdate()

                    await i.editReply({
                        content: `**Staff Commands**\nThere are my staff commands: ${Discord.Formatters.codeBlock(
                            "",
                            bot.ApplicationCommand.filter((c) => c.category === "staff")
                                .map((x) => `${x.name} - ${x.description}`)
                                .join("\n")
                        )}`
                    })
                }
            })

        } else {

            const getCommand = bot.ApplicationCommand.get(command)

            if (!getCommand) return interaction.reply("Command not found")

            const embed = new Discord.MessageEmbed()
            .setAuthor({ name: `${getCommand.name}`, iconURL: bot.user.avatarURL })
            .setDescription(getCommand.description)
            .setColor(interaction.guild.me.displayHexColor)
            .addField("Command", `${Discord.Formatters.codeBlock("", getCommand.name)}`, true)
            .addField("Category", `${Discord.Formatters.codeBlock("", getCommand.category)}`, true)
            .addField("_ _", "_ _", true)
            .addField("Permissions", `${Discord.Formatters.codeBlock("", `User: ${getCommand.permissions?.user || "None"}\nBot: ${getCommand.permissions?.bot || "None"}`)}`, true)
            .addField("Usage", Discord.Formatters.codeBlock("", getCommand.options ? getCommand.options.map((x) => `/${getCommand.name} ${x.name}`).join(" ") : "No options"), true)

            interaction.reply({ embeds: [embed] })

        }

    }
})
