import {Formatters, InteractionCollector} from "discord.js"
import {Event} from "mitim"
import Discord from "discord.js"
import PermissionConfig from "../../schemas/permissions.js"
import Welcome from "../../schemas/welcome.js"

export default new Event({
    name: "interactionCreate",
    run: async (bot, interaction) => {
        if (interaction.isCommand()) {
            const data = (await PermissionConfig.findOne({_id: interaction.guild.id})) || "default"

            const permissions = data?.permissions || "default"

            const command = bot.ApplicationCommand.get(interaction.commandName)

            if (!command) return

            if (command.permissions?.bot) {
                if (!interaction.member.permissions.has(command.permissions.bot))
                    return interaction.reply({
                        content: `❌ | I don't have the required permissions to use this command\n${Formatters.codeBlock(
                            command.permissions.bot.join(", ")
                        )}`,
                        ephemeral: true
                    })
            }

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

                const r = /(?:#|0x)(?:[a-f0-9]{3}|[a-f0-9]{6})\b|(?:rgb|hsl)a?\([^\)]*\)/ig;

                if(!color.match(r)) return interaction.reply({
                    content: "❌ | Introduce a valid hex color"
                })

                const embed = new Discord.MessageEmbed()
                    .setTitle(title)
                    .setColor(color)
                    .setDescription(description)
                    .setThumbnail(thumbnail)
                    .setImage(image)

                await interaction.deferReply({ephemeral: true})

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

            if (interaction.customId === "modal-welcome") {
                const title = interaction.fields.getTextInputValue("title-welcome")
                const description = interaction.fields.getTextInputValue("description-welcome")
                const color = interaction.fields.getTextInputValue("color-welcome")
                const thumbnail = interaction.fields.getTextInputValue("thumbnail-welcome") || null
                const image = interaction.fields.getTextInputValue("image-welcome") || null

                const data = await Welcome.findOne({_id: interaction.guild.id})

                if (data) {
                    data.message.embed.title = title
                    data.message.embed.description = description
                    data.message.embed.color = color
                    data.message.embed.thumbnail = thumbnail
                    data.message.embed.image = image

                    await data.save()

                    interaction.reply({
                        content: "✅ | Welcome message updated"
                    })
                } else {

                    const r = /(?:#|0x)(?:[a-f0-9]{3}|[a-f0-9]{6})\b|(?:rgb|hsl)a?\([^\)]*\)/ig;

                    if(!color.match(r)) return interaction.reply({
                        content: "❌ | Introduce a valid hex color"
                    })

                    const thumbnailURL = new URL(thumbnail)

                    if (!["http:", "https:"].includes(thumbnailURL.protocol))
                        return interaction.reply({
                            content: "❌ | The thumbnail must be a URL"
                        })

                    const imageURL = new URL(image)

                    if (!["http:", "https:"].includes(imageURL.protocol))
                        return interaction.reply({
                            content: "❌ | The image must be a URL"
                        })

                    const embed = new Discord.MessageEmbed()
                        .setTitle(title)
                        .setColor(color)
                        .setDescription(description)
                        .setThumbnail(thumbnailURL.href)
                        .setImage(imageURL.href)

                    interaction.reply({
                        content: "✅ | Welcome message created"
                    })

                    interaction.channel.send({embeds: [embed]})

                    new Welcome({
                        _id: interaction.guild.id,
                        message: {
                            embed: {
                                title: title,
                                description: description,
                                color: color,
                                thumbnail: thumbnailURL.href,
                                image: imageURL.href
                            }
                        }
                    }).save()
                }
            }

            if (interaction.customId === "modal-welcome-text") {
                const content = interaction.fields.getTextInputValue("text-welcome")

                const data = await Welcome.findOne({_id: interaction.guild.id})

                if (data) {
                    data.message.text = content

                    await data.save()

                    interaction.reply({
                        content: "✅ | Welcome message updated"
                    })
                } else {
                    interaction.reply({
                        content: "✅ | Welcome message created"
                    })

                    interaction.channel.send({
                        content: `${content}`
                    })

                    new Welcome({
                        _id: interaction.guild.id,
                        message: {
                            text: content
                        }
                    }).save()
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

        if (interaction.isSelectMenu()) {
            if (interaction.customId === "reaction-roles") {
                await interaction.deferReply({ephemeral: true})

                const roleId = interaction.values[0]
                const role = interaction.guild.roles.cache.get(roleId)

                const hasRole = interaction.member.roles.cache.has(roleId)

                if (hasRole) {
                    await interaction.member.roles.remove(roleId).catch((e) => {
                        return interaction.editReply({
                            content: `❌ | An unexpected error has occurred while removing the role: ${Formatters.codeBlock("prolog", e.message)}`
                        })
                    })

                    interaction.editReply({
                        content: `✅ | The role ${role} has been removed from you`
                    })
                } else {
                    await interaction.member.roles.add(roleId).catch((e) => {
                        return interaction.editReply({
                            content: `❌ | An unexpected error has occurred while adding the role: ${Formatters.codeBlock("prolog", e.message)}`
                        })
                    })

                    interaction.editReply({
                        content: `✅ | The role ${role} has been added from you`
                    })
                }
            }
        }
    }
})
