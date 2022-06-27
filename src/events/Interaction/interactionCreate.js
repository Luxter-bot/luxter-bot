import {Formatters, InteractionCollector} from "discord.js"
import {Event} from "mitim"
import Discord from "discord.js"
import PermissionConfig from "../../schemas/permissions.js"

export default new Event({
    name: "interactionCreate",
    run: async (bot, interaction) => {
        if (interaction.isCommand()) {
            const data = (await PermissionConfig.findOne({_id: interaction.guild.id})) || "default"

            const permissions = data?.permissions || "default"

            const command = bot.ApplicationCommand.get(interaction.commandName)

            if (!command) return

            if (permissions === "default") {
                if (command.permissions) {
                    if (command.permissions.user) {
                        if (!interaction.member.permissions.has(command.permissions.user))
                            return interaction.reply({
                                content: `❌ | You don't have the required permissions to use this command\n${Formatters.codeBlock(
                                    command.permissions.user.join(", ")
                                )}`,
                                ephemeral: true
                            })
                    }
                }
            }

            try {
                command.run(bot, interaction)
            } catch (e) {
                console.error(e)

                if (interaction.replied || interaction.deferred) {
                    return interaction.followUp({
                        content: `❌ | An unexpected error has ocurred while running this command\n${Formatters.codeBlock("", "e.message")}`,
                        ephemeral: true
                    })
                } else {
                    return interaction.reply({
                        content: `❌ | An unexpected error has ocurred while running this command\n${Formatters.codeBlock("", "e.message")}`,
                        ephemeral: true
                    })
                }
            }
        }

        if (interaction.isButton()) {
            if (interaction.customId === "delete-message") {
                await interaction.deferUpdate()

                interaction.deleteReply()
            }
        }

        if (interaction.isModalSubmit()) {
            if (interaction.customId === "poll-modal") {
                const title = interaction.fields.getTextInputValue("poll-title")
                const question1 = interaction.fields.getTextInputValue("question-1")
                const question2 = interaction.fields.getTextInputValue("question-2")
                const question3 = interaction.fields.getTextInputValue("question-3")
                const question4 = interaction.fields.getTextInputValue("question-4")

                if (!question3 && !question4) {
                    const embed = new Discord.MessageEmbed()
                        .setTitle(title)
                        .setColor("RANDOM")
                        .setDescription(`Question 1: **${question1}**\nQuestion 2: **${question2}**`)

                    await interaction.deferReply({ephemeral: true})

                    interaction.editReply({
                        content: "✅ | Poll created"
                    })

                    await interaction.channel
                        .send({
                            embeds: [embed]
                        })
                        .then(async (message) => {
                            await message.react("1⃣").catch(() => {})
                            await message.react("2⃣").catch(() => {})
                        })
                } else {
                    const embed = new Discord.MessageEmbed()

                    const options = []

                    for (let i = 1; i <= 4; i++) {
                        if (eval(`question${i}`)) {
                            options.push(eval(`question${i}`))
                        }
                    }

                    embed.setTitle(title)
                    embed.setColor("RANDOM")
                    embed.setDescription(`${options.map((option, index) => `Question ${index + 1}: **${option}**`).join("\n")}`)

                    await interaction.deferReply({ephemeral: true})

                    interaction.editReply({
                        content: "✅ | Poll created"
                    })

                    await interaction.channel
                        .send({
                            embeds: [embed]
                        })
                        .then(async (message) => {
                            await message.react("1⃣").catch(() => {})
                            await message.react("2⃣").catch(() => {})

                            if (question3) await message.react("3️⃣").catch(() => {})
                            if (question4) await message.react("4️⃣").catch(() => {})
                        })
                }
            }

            if (interaction.customId === "modal-embed") {
                const title = interaction.fields.getTextInputValue("title-embed")
                const description = interaction.fields.getTextInputValue("description-embed")
                const color = interaction.fields.getTextInputValue("color-embed")
                const thumbnail = interaction.fields.getTextInputValue("thumbnail-embed") || null
                const image = interaction.fields.getTextInputValue("image-embed") || null

                const embed = new Discord.MessageEmbed()
                    .setTitle(title)
                    .setColor(InteractionCollector)
                    .setDescription(description)
                    .setThumbnail(thumbnail)
                    .setImage(image)

                await interaction.deferReply({ephemeral: true})

                if (isNaN(color)) {
                    interaction.editReply({
                        content: "❌ | The color must be a number"
                    })
                }

                interaction.channel.send({embeds: [embed]})

                interaction.editReply({
                    content: "✅ | Embed created"
                })
            }

            if (interaction.customId === "modal-say") {
                const content = interaction.fields.getTextInputValue("content-say")
                let anonymous = interaction.fields.getTextInputValue("anonymous-say") || "false"

                if (!interaction.member.permissions.has("ADMINISTRATOR")) anonymous = "true"

                if (anonymous === "true") {
                    await interaction.deferReply({ephemeral: true})

                    interaction.editReply({
                        content: "✅ | Message sent"
                    })

                    interaction.channel.send({
                        content: `${content}\n> Sended by ${interaction.user.tag}`,
                        allowedMentions: interaction.memberPermissions.has("ADMINISTRATOR") ? {} : {parse: []}
                    })
                } else {
                    await interaction.deferReply({ephemeral: true})

                    interaction.editReply({
                        content: "✅ | Message sent"
                    })

                    interaction.channel.send({
                        content: `${content}`,
                        allowedMentions: interaction.memberPermissions.has("ADMINISTRATOR") ? {} : {parse: []}
                    })
                }
            }
        }

        if (interaction.isAutocomplete()) {
            if (interaction.commandName === "report") {
                const commands = bot.ApplicationCommand

                const commandArray = []

                commands.forEach((command) => {
                    commandArray.push({
                        name: command.name,
                        value: command.name
                    })
                })

                interaction.respond(commandArray)
            }
        }
    }
})
