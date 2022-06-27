import {Command} from "mitim"
import Discord from "discord.js"

export default new Command.ApplicationCommand({
    name: "tictactoe",
    description: "Play a game of Tic Tac Toe",
    category: "fun",
    options: [
        {
            name: "player",
            description: "Choose a player",
            type: "USER",
            required: true
        }
    ],
    run: async (bot, interaction) => {
        const target = interaction.options.getMember("player")

        if (target.id === interaction.user.id)
            return interaction.reply({
                content: `❌ | You can't play against yourself`
            })

        if (target.user.bot)
            return interaction.reply({
                content: `❌ | You can't play against a bot`
            })

        const pendingRow = new Discord.MessageActionRow().addComponents(
            new Discord.MessageButton().setLabel("Accept").setStyle("SUCCESS").setCustomId("accept"),
            new Discord.MessageButton().setLabel("Decline").setStyle("DANGER").setCustomId("decline")
        )

        let inProcess = true

        let fail = false

        await interaction.deferReply()

        const m = await interaction.editReply({
            content: `🏓 | ${target} has invited you to play a game of Tic Tac Toe!\n${Discord.Formatters.codeBlock(
                "",
                `Choose an option with the buttons`
            )}`,
            components: [pendingRow]
        })

        const filter = (p) => p.user.id === target.id
        const pendingCollector = m.createMessageComponentCollector({filter: filter, time: 60000})

        pendingCollector.on("collect", async (button) => {
            button.deferUpdate()

            if (button.customId == "accept") {
                const gameRowA = new Discord.MessageActionRow().addComponents(
                    new Discord.MessageButton().setLabel("➖").setStyle("PRIMARY").setCustomId("a1"),
                    new Discord.MessageButton().setLabel("➖").setStyle("PRIMARY").setCustomId("a2"),
                    new Discord.MessageButton().setLabel("➖").setStyle("PRIMARY").setCustomId("a3")
                )

                const gameRowB = new Discord.MessageActionRow().addComponents(
                    new Discord.MessageButton().setLabel("➖").setStyle("PRIMARY").setCustomId("b1"),
                    new Discord.MessageButton().setLabel("➖").setStyle("PRIMARY").setCustomId("b2"),
                    new Discord.MessageButton().setLabel("➖").setStyle("PRIMARY").setCustomId("b3")
                )

                const gameRowC = new Discord.MessageActionRow().addComponents(
                    new Discord.MessageButton().setLabel("➖").setStyle("PRIMARY").setCustomId("c1"),
                    new Discord.MessageButton().setLabel("➖").setStyle("PRIMARY").setCustomId("c2"),
                    new Discord.MessageButton().setLabel("➖").setStyle("PRIMARY").setCustomId("c3")
                )

                let a1 = false
                let a2 = false
                let a3 = false

                let b1 = false
                let b2 = false
                let b3 = false

                let c1 = false
                let c2 = false
                let c3 = false

                let turn = interaction.user.id

                const m2 = await interaction.editReply({
                    content: `📣 | Let the game begin!\n<@${turn}> it's your turn!`,
                    components: [gameRowA, gameRowB, gameRowC]
                })

                const filter1 = (p) => p.user.id === interaction.user.id
                const filter2 = (p) => p.user.id === target.id

                const collector1 = m2.createMessageComponentCollector({filter: filter1, time: 90000})
                const collector2 = m2.createMessageComponentCollector({filter: filter2, time: 90000})

                collector1.on("collect", async (button) => {
                    button.deferUpdate()

                    if (turn == interaction.user.id) {
                        if (button.customId == "a1") {
                            gameRowA.components[0].setLabel("❌")
                            gameRowA.components[0].setDisabled(true)

                            turn = target.id
                            a1 = interaction.user.id
                            interaction.editReply({content: `📥 | It's turn of ${target}`, components: [gameRowA, gameRowB, gameRowC]})
                        } else if (button.customId == "a2") {
                            gameRowA.components[1].setLabel("❌")
                            gameRowA.components[1].setDisabled(true)

                            turn = target.id
                            a2 = interaction.user.id
                            interaction.editReply({content: `📥 | It's turn of ${target}`, components: [gameRowA, gameRowB, gameRowC]})
                        } else if (button.customId == "a3") {
                            gameRowA.components[2].setLabel("❌")
                            gameRowA.components[2].setDisabled(true)

                            turn = target.id
                            a3 = interaction.user.id
                            interaction.editReply({content: `📥 | It's turn of ${target}`, components: [gameRowA, gameRowB, gameRowC]})
                        } else if (button.customId == "b1") {
                            gameRowB.components[0].setLabel("❌")
                            gameRowB.components[0].setDisabled(true)

                            turn = target.id
                            b1 = interaction.user.id
                            interaction.editReply({content: `📥 | It's turn of ${target}`, components: [gameRowA, gameRowB, gameRowC]})
                        } else if (button.customId == "b2") {
                            gameRowB.components[1].setLabel("❌")
                            gameRowB.components[1].setDisabled(true)

                            turn = target.id
                            b2 = interaction.user.id
                            interaction.editReply({content: `📥 | It's turn of ${target}`, components: [gameRowA, gameRowB, gameRowC]})
                        } else if (button.customId == "b3") {
                            gameRowB.components[2].setLabel("❌")
                            gameRowB.components[2].setDisabled(true)

                            turn = target.id
                            b3 = interaction.user.id
                            interaction.editReply({content: `📥 | It's turn of ${target}`, components: [gameRowA, gameRowB, gameRowC]})
                        } else if (button.customId == "c1") {
                            gameRowC.components[0].setLabel("❌")
                            gameRowC.components[0].setDisabled(true)

                            turn = target.id
                            c1 = interaction.user.id
                            interaction.editReply({content: `📥 | It's turn of ${target}`, components: [gameRowA, gameRowB, gameRowC]})
                        } else if (button.customId == "c2") {
                            gameRowC.components[1].setLabel("❌")
                            gameRowC.components[1].setDisabled(true)

                            turn = target.id
                            c2 = interaction.user.id
                            interaction.editReply({content: `📥 | It's turn of ${target}`, components: [gameRowA, gameRowB, gameRowC]})
                        } else if (button.customId == "c3") {
                            gameRowC.components[2].setLabel("❌")
                            gameRowC.components[2].setDisabled(true)

                            turn = target.id
                            c3 = interaction.user.id
                            interaction.editReply({content: `📥 | It's turn of ${target}`, components: [gameRowA, gameRowB, gameRowC]})
                        }

                        switch (true) {
                            case a1 == interaction.user.id && a2 == interaction.user.id && a3 == interaction.user.id:
                                gameRowA.components[0].setDisabled(true)
                                gameRowA.components[1].setDisabled(true)
                                gameRowA.components[2].setDisabled(true)

                                gameRowB.components[0].setDisabled(true)
                                gameRowB.components[1].setDisabled(true)
                                gameRowB.components[2].setDisabled(true)

                                gameRowC.components[0].setDisabled(true)
                                gameRowC.components[1].setDisabled(true)
                                gameRowC.components[2].setDisabled(true)

                                inProcess = false
                                return interaction.editReply({
                                    content: `🏷️ | End of the game, you have won ${interaction.user}`,
                                    components: [gameRowA, gameRowB, gameRowC]
                                })
                                break

                            case b1 == interaction.user.id && b2 == interaction.user.id && b3 == interaction.user.id:
                                gameRowA.components[0].setDisabled(true)
                                gameRowA.components[1].setDisabled(true)
                                gameRowA.components[2].setDisabled(true)

                                gameRowB.components[0].setDisabled(true)
                                gameRowB.components[1].setDisabled(true)
                                gameRowB.components[2].setDisabled(true)

                                gameRowC.components[0].setDisabled(true)
                                gameRowC.components[1].setDisabled(true)
                                gameRowC.components[2].setDisabled(true)
                                inProcess = false
                                return interaction.editReply({
                                    content: `🏷️ | End of the game, you have won ${interaction.user}`,
                                    components: [gameRowA, gameRowB, gameRowC]
                                })
                                break

                            case c1 == interaction.user.id && c2 == interaction.user.id && c3 == interaction.user.id:
                                gameRowA.components[0].setDisabled(true)
                                gameRowA.components[1].setDisabled(true)
                                gameRowA.components[2].setDisabled(true)

                                gameRowB.components[0].setDisabled(true)
                                gameRowB.components[1].setDisabled(true)
                                gameRowB.components[2].setDisabled(true)

                                gameRowC.components[0].setDisabled(true)
                                gameRowC.components[1].setDisabled(true)
                                gameRowC.components[2].setDisabled(true)
                                inProcess = false
                                return interaction.editReply({
                                    content: `🏷️ | End of the game, you have won ${interaction.user}`,
                                    components: [gameRowA, gameRowB, gameRowC]
                                })
                                break

                            case a1 == interaction.user.id && b1 == interaction.user.id && c1 == interaction.user.id:
                                gameRowA.components[0].setDisabled(true)
                                gameRowA.components[1].setDisabled(true)
                                gameRowA.components[2].setDisabled(true)

                                gameRowB.components[0].setDisabled(true)
                                gameRowB.components[1].setDisabled(true)
                                gameRowB.components[2].setDisabled(true)

                                gameRowC.components[0].setDisabled(true)
                                gameRowC.components[1].setDisabled(true)
                                gameRowC.components[2].setDisabled(true)
                                inProcess = false
                                return interaction.editReply({
                                    content: `🏷️ | End of the game, you have won ${interaction.user}`,
                                    components: [gameRowA, gameRowB, gameRowC]
                                })
                                break

                            case a2 == interaction.user.id && b2 == interaction.user.id && c2 == interaction.user.id:
                                gameRowA.components[0].setDisabled(true)
                                gameRowA.components[1].setDisabled(true)
                                gameRowA.components[2].setDisabled(true)

                                gameRowB.components[0].setDisabled(true)
                                gameRowB.components[1].setDisabled(true)
                                gameRowB.components[2].setDisabled(true)

                                gameRowC.components[0].setDisabled(true)
                                gameRowC.components[1].setDisabled(true)
                                gameRowC.components[2].setDisabled(true)
                                inProcess = false
                                return interaction.editReply({
                                    content: `🏷️ | End of the game, you have won ${interaction.user}`,
                                    components: [gameRowA, gameRowB, gameRowC]
                                })
                                break

                            case a3 == interaction.user.id && b3 == interaction.user.id && c3 == interaction.user.id:
                                gameRowA.components[0].setDisabled(true)
                                gameRowA.components[1].setDisabled(true)
                                gameRowA.components[2].setDisabled(true)

                                gameRowB.components[0].setDisabled(true)
                                gameRowB.components[1].setDisabled(true)
                                gameRowB.components[2].setDisabled(true)

                                gameRowC.components[0].setDisabled(true)
                                gameRowC.components[1].setDisabled(true)
                                gameRowC.components[2].setDisabled(true)
                                inProcess = false
                                return interaction.editReply({
                                    content: `🏷️ | End of the game, you have won ${interaction.user}`,
                                    components: [gameRowA, gameRowB, gameRowC]
                                })
                                break

                            case a1 == interaction.user.id && b2 == interaction.user.id && c3 == interaction.user.id:
                                gameRowA.components[0].setDisabled(true)
                                gameRowA.components[1].setDisabled(true)
                                gameRowA.components[2].setDisabled(true)

                                gameRowB.components[0].setDisabled(true)
                                gameRowB.components[1].setDisabled(true)
                                gameRowB.components[2].setDisabled(true)

                                gameRowC.components[0].setDisabled(true)
                                gameRowC.components[1].setDisabled(true)
                                gameRowC.components[2].setDisabled(true)
                                inProcess = false
                                return interaction.editReply({
                                    content: `🏷️ | End of the game, you have won ${interaction.user}`,
                                    components: [gameRowA, gameRowB, gameRowC]
                                })
                                break

                            case a3 == interaction.user.id && b2 == interaction.user.id && c1 == interaction.user.id:
                                gameRowA.components[0].setDisabled(true)
                                gameRowA.components[1].setDisabled(true)
                                gameRowA.components[2].setDisabled(true)

                                gameRowB.components[0].setDisabled(true)
                                gameRowB.components[1].setDisabled(true)
                                gameRowB.components[2].setDisabled(true)

                                gameRowC.components[0].setDisabled(true)
                                gameRowC.components[1].setDisabled(true)
                                gameRowC.components[2].setDisabled(true)
                                inProcess = false
                                return interaction.editReply({
                                    content: `🏷️ | End of the game, you have won ${interaction.user}`,
                                    components: [gameRowA, gameRowB, gameRowC]
                                })
                                break

                            case a1 == target.id && a2 == target.id && a3 == target.id:
                                gameRowA.components[0].setDisabled(true)
                                gameRowA.components[1].setDisabled(true)
                                gameRowA.components[2].setDisabled(true)

                                gameRowB.components[0].setDisabled(true)
                                gameRowB.components[1].setDisabled(true)
                                gameRowB.components[2].setDisabled(true)

                                gameRowC.components[0].setDisabled(true)
                                gameRowC.components[1].setDisabled(true)
                                gameRowC.components[2].setDisabled(true)
                                inProcess = false
                                return interaction.editReply({
                                    content: `🏷️ | End of the game, you have won ${target}`,
                                    components: [gameRowA, gameRowB, gameRowC]
                                })
                                break

                            case b1 == target.id && b2 == target.id && b3 == target.id:
                                gameRowA.components[0].setDisabled(true)
                                gameRowA.components[1].setDisabled(true)
                                gameRowA.components[2].setDisabled(true)

                                gameRowB.components[0].setDisabled(true)
                                gameRowB.components[1].setDisabled(true)
                                gameRowB.components[2].setDisabled(true)

                                gameRowC.components[0].setDisabled(true)
                                gameRowC.components[1].setDisabled(true)
                                gameRowC.components[2].setDisabled(true)
                                inProcess = false
                                return interaction.editReply({
                                    content: `🏷️ | End of the game, you have won ${target}`,
                                    components: [gameRowA, gameRowB, gameRowC]
                                })
                                break

                            case c1 == target.id && c2 == target.id && c3 == target.id:
                                gameRowA.components[0].setDisabled(true)
                                gameRowA.components[1].setDisabled(true)
                                gameRowA.components[2].setDisabled(true)

                                gameRowB.components[0].setDisabled(true)
                                gameRowB.components[1].setDisabled(true)
                                gameRowB.components[2].setDisabled(true)

                                gameRowC.components[0].setDisabled(true)
                                gameRowC.components[1].setDisabled(true)
                                gameRowC.components[2].setDisabled(true)
                                inProcess = false
                                return interaction.editReply({
                                    content: `🏷️ | End of the game, you have won ${target}`,
                                    components: [gameRowA, gameRowB, gameRowC]
                                })
                                break

                            case a1 == target.id && b1 == target.id && c1 == target.id:
                                gameRowA.components[0].setDisabled(true)
                                gameRowA.components[1].setDisabled(true)
                                gameRowA.components[2].setDisabled(true)

                                gameRowB.components[0].setDisabled(true)
                                gameRowB.components[1].setDisabled(true)
                                gameRowB.components[2].setDisabled(true)

                                gameRowC.components[0].setDisabled(true)
                                gameRowC.components[1].setDisabled(true)
                                gameRowC.components[2].setDisabled(true)
                                inProcess = false
                                return interaction.editReply({
                                    content: `🏷️ | End of the game, you have won ${target}`,
                                    components: [gameRowA, gameRowB, gameRowC]
                                })
                                break

                            case a2 == target.id && b2 == target.id && c2 == target.id:
                                gameRowA.components[0].setDisabled(true)
                                gameRowA.components[1].setDisabled(true)
                                gameRowA.components[2].setDisabled(true)

                                gameRowB.components[0].setDisabled(true)
                                gameRowB.components[1].setDisabled(true)
                                gameRowB.components[2].setDisabled(true)

                                gameRowC.components[0].setDisabled(true)
                                gameRowC.components[1].setDisabled(true)
                                gameRowC.components[2].setDisabled(true)
                                inProcess = false
                                return interaction.editReply({
                                    content: `🏷️ | End of the game, you have won ${target}`,
                                    components: [gameRowA, gameRowB, gameRowC]
                                })
                                break

                            case a3 == target.id && b3 == target.id && c3 == target.id:
                                gameRowA.components[0].setDisabled(true)
                                gameRowA.components[1].setDisabled(true)
                                gameRowA.components[2].setDisabled(true)

                                gameRowB.components[0].setDisabled(true)
                                gameRowB.components[1].setDisabled(true)
                                gameRowB.components[2].setDisabled(true)

                                gameRowC.components[0].setDisabled(true)
                                gameRowC.components[1].setDisabled(true)
                                gameRowC.components[2].setDisabled(true)
                                inProcess = false
                                return interaction.editReply({
                                    content: `🏷️ | End of the game, you have won ${target}`,
                                    components: [gameRowA, gameRowB, gameRowC]
                                })
                                break

                            case a1 == target.id && b2 == target.id && c3 == target.id:
                                gameRowA.components[0].setDisabled(true)
                                gameRowA.components[1].setDisabled(true)
                                gameRowA.components[2].setDisabled(true)

                                gameRowB.components[0].setDisabled(true)
                                gameRowB.components[1].setDisabled(true)
                                gameRowB.components[2].setDisabled(true)

                                gameRowC.components[0].setDisabled(true)
                                gameRowC.components[1].setDisabled(true)
                                gameRowC.components[2].setDisabled(true)
                                inProcess = false
                                return interaction.editReply({
                                    content: `🏷️ | End of the game, you have won ${target}`,
                                    components: [gameRowA, gameRowB, gameRowC]
                                })
                                break

                            case a3 == target.id && b2 == target.id && c1 == target.id:
                                gameRowA.components[0].setDisabled(true)
                                gameRowA.components[1].setDisabled(true)
                                gameRowA.components[2].setDisabled(true)

                                gameRowB.components[0].setDisabled(true)
                                gameRowB.components[1].setDisabled(true)
                                gameRowB.components[2].setDisabled(true)

                                gameRowC.components[0].setDisabled(true)
                                gameRowC.components[1].setDisabled(true)
                                gameRowC.components[2].setDisabled(true)
                                inProcess = false
                                return interaction.editReply({
                                    content: `🏷️ | End of the game, you have won ${target}`,
                                    components: [gameRowA, gameRowB, gameRowC]
                                })
                                break

                            case a1 !== false &&
                                a2 !== false &&
                                a3 !== false &&
                                b1 !== false &&
                                b2 !== false &&
                                b3 !== false &&
                                c1 !== false &&
                                c2 !== false &&
                                c3 !== false:
                                inProcess = false
                                return interaction.editReply({
                                    content: `🏷️ | End of the game, it was a tie!`,
                                    components: [gameRowA, gameRowB, gameRowC]
                                })
                                break
                        }
                    }
                })

                collector2.on("collect", async (button) => {
                    button.deferUpdate()

                    if (turn == target.id) {
                        if (button.customId == "a1") {
                            gameRowA.components[0].setLabel("⭕")
                            gameRowA.components[0].setDisabled(true)

                            turn = interaction.user.id
                            a1 = target.id
                            interaction.editReply({content: `📥 | Is turn of ${interaction.user}`, components: [gameRowA, gameRowB, gameRowC]})
                        } else if (button.customId == "a2") {
                            gameRowA.components[1].setLabel("⭕")
                            gameRowA.components[1].setDisabled(true)

                            turn = interaction.user.id
                            a2 = target.id
                            interaction.editReply({content: `📥 | It's turn of ${interaction.user}`, components: [gameRowA, gameRowB, gameRowC]})
                        } else if (button.customId == "a3") {
                            gameRowA.components[2].setLabel("⭕")
                            gameRowA.components[2].setDisabled(true)

                            turn = interaction.user.id
                            a3 = target.id
                            interaction.editReply({content: `📥 | It's turn of ${interaction.user}`, components: [gameRowA, gameRowB, gameRowC]})
                        } else if (button.customId == "b1") {
                            gameRowB.components[0].setLabel("⭕")
                            gameRowB.components[0].setDisabled(true)

                            turn = interaction.user.id
                            b1 = target.id
                            interaction.editReply({content: `📥 | It's turn of ${interaction.user}`, components: [gameRowA, gameRowB, gameRowC]})
                        } else if (button.customId == "b2") {
                            gameRowB.components[1].setLabel("⭕")
                            gameRowB.components[1].setDisabled(true)

                            turn = interaction.user.id
                            b2 = target.id
                            interaction.editReply({content: `📥 | It's turn of ${interaction.user}`, components: [gameRowA, gameRowB, gameRowC]})
                        } else if (button.customId == "b3") {
                            gameRowB.components[2].setLabel("⭕")
                            gameRowB.components[2].setDisabled(true)

                            turn = interaction.user.id
                            b3 = target.id
                            interaction.editReply({content: `📥 | It's turn of ${interaction.user}`, components: [gameRowA, gameRowB, gameRowC]})
                        } else if (button.customId == "c1") {
                            gameRowC.components[0].setLabel("⭕")
                            gameRowC.components[0].setDisabled(true)

                            turn = interaction.user.id
                            c1 = target.id
                            interaction.editReply({content: `📥 | It's turn of ${interaction.user}`, components: [gameRowA, gameRowB, gameRowC]})
                        } else if (button.customId == "c2") {
                            gameRowC.components[1].setLabel("⭕")
                            gameRowC.components[1].setDisabled(true)

                            turn = interaction.user.id
                            c2 = target.id
                            interaction.editReply({content: `📥 | It's turn of ${interaction.user}`, components: [gameRowA, gameRowB, gameRowC]})
                        } else if (button.customId == "c3") {
                            gameRowC.components[2].setLabel("⭕")
                            gameRowC.components[2].setDisabled(true)

                            turn = interaction.user.id
                            c3 = target.id
                            interaction.editReply({content: `📥 | It's turn of ${interaction.user}`, components: [gameRowA, gameRowB, gameRowC]})
                        }
                        switch (true) {
                            case a1 == interaction.user.id && a2 == interaction.user.id && a3 == interaction.user.id:
                                gameRowA.components[0].setDisabled(true)
                                gameRowA.components[1].setDisabled(true)
                                gameRowA.components[2].setDisabled(true)

                                gameRowB.components[0].setDisabled(true)
                                gameRowB.components[1].setDisabled(true)
                                gameRowB.components[2].setDisabled(true)

                                gameRowC.components[0].setDisabled(true)
                                gameRowC.components[1].setDisabled(true)
                                gameRowC.components[2].setDisabled(true)
                                inProcess = false
                                return interaction.editReply({
                                    content: `🏷️ | End of the game, you have won ${interaction.user}`,
                                    components: [gameRowA, gameRowB, gameRowC]
                                })
                                break

                            case b1 == interaction.user.id && b2 == interaction.user.id && b3 == interaction.user.id:
                                gameRowA.components[0].setDisabled(true)
                                gameRowA.components[1].setDisabled(true)
                                gameRowA.components[2].setDisabled(true)

                                gameRowB.components[0].setDisabled(true)
                                gameRowB.components[1].setDisabled(true)
                                gameRowB.components[2].setDisabled(true)

                                gameRowC.components[0].setDisabled(true)
                                gameRowC.components[1].setDisabled(true)
                                gameRowC.components[2].setDisabled(true)
                                inProcess = false
                                return interaction.editReply({
                                    content: `🏷️ | End of the game, you have won ${interaction.user}`,
                                    components: [gameRowA, gameRowB, gameRowC]
                                })
                                break

                            case c1 == interaction.user.id && c2 == interaction.user.id && c3 == interaction.user.id:
                                gameRowA.components[0].setDisabled(true)
                                gameRowA.components[1].setDisabled(true)
                                gameRowA.components[2].setDisabled(true)

                                gameRowB.components[0].setDisabled(true)
                                gameRowB.components[1].setDisabled(true)
                                gameRowB.components[2].setDisabled(true)

                                gameRowC.components[0].setDisabled(true)
                                gameRowC.components[1].setDisabled(true)
                                gameRowC.components[2].setDisabled(true)
                                inProcess = false
                                return interaction.editReply({
                                    content: `🏷️ | End of the game, you have won ${interaction.user}`,
                                    components: [gameRowA, gameRowB, gameRowC]
                                })
                                break

                            case a1 == interaction.user.id && b1 == interaction.user.id && c1 == interaction.user.id:
                                gameRowA.components[0].setDisabled(true)
                                gameRowA.components[1].setDisabled(true)
                                gameRowA.components[2].setDisabled(true)

                                gameRowB.components[0].setDisabled(true)
                                gameRowB.components[1].setDisabled(true)
                                gameRowB.components[2].setDisabled(true)

                                gameRowC.components[0].setDisabled(true)
                                gameRowC.components[1].setDisabled(true)
                                gameRowC.components[2].setDisabled(true)
                                inProcess = false
                                return interaction.editReply({
                                    content: `🏷️ | End of the game, you have won ${interaction.user}`,
                                    components: [gameRowA, gameRowB, gameRowC]
                                })
                                break

                            case a2 == interaction.user.id && b2 == interaction.user.id && c2 == interaction.user.id:
                                gameRowA.components[0].setDisabled(true)
                                gameRowA.components[1].setDisabled(true)
                                gameRowA.components[2].setDisabled(true)

                                gameRowB.components[0].setDisabled(true)
                                gameRowB.components[1].setDisabled(true)
                                gameRowB.components[2].setDisabled(true)

                                gameRowC.components[0].setDisabled(true)
                                gameRowC.components[1].setDisabled(true)
                                gameRowC.components[2].setDisabled(true)
                                inProcess = false
                                return interaction.editReply({
                                    content: `🏷️ | End of the game, you have won ${interaction.user}`,
                                    components: [gameRowA, gameRowB, gameRowC]
                                })
                                break

                            case a3 == interaction.user.id && b3 == interaction.user.id && c3 == interaction.user.id:
                                gameRowA.components[0].setDisabled(true)
                                gameRowA.components[1].setDisabled(true)
                                gameRowA.components[2].setDisabled(true)

                                gameRowB.components[0].setDisabled(true)
                                gameRowB.components[1].setDisabled(true)
                                gameRowB.components[2].setDisabled(true)

                                gameRowC.components[0].setDisabled(true)
                                gameRowC.components[1].setDisabled(true)
                                gameRowC.components[2].setDisabled(true)
                                inProcess = false
                                return interaction.editReply({
                                    content: `🏷️ | End of the game, you have won ${interaction.user}`,
                                    components: [gameRowA, gameRowB, gameRowC]
                                })
                                break

                            case a1 == interaction.user.id && b2 == interaction.user.id && c3 == interaction.user.id:
                                gameRowA.components[0].setDisabled(true)
                                gameRowA.components[1].setDisabled(true)
                                gameRowA.components[2].setDisabled(true)

                                gameRowB.components[0].setDisabled(true)
                                gameRowB.components[1].setDisabled(true)
                                gameRowB.components[2].setDisabled(true)

                                gameRowC.components[0].setDisabled(true)
                                gameRowC.components[1].setDisabled(true)
                                gameRowC.components[2].setDisabled(true)
                                inProcess = false
                                return interaction.editReply({
                                    content: `🏷️ | End of the game, you have won ${interaction.user}`,
                                    components: [gameRowA, gameRowB, gameRowC]
                                })
                                break

                            case a3 == interaction.user.id && b2 == interaction.user.id && c1 == interaction.user.id:
                                gameRowA.components[0].setDisabled(true)
                                gameRowA.components[1].setDisabled(true)
                                gameRowA.components[2].setDisabled(true)

                                gameRowB.components[0].setDisabled(true)
                                gameRowB.components[1].setDisabled(true)
                                gameRowB.components[2].setDisabled(true)

                                gameRowC.components[0].setDisabled(true)
                                gameRowC.components[1].setDisabled(true)
                                gameRowC.components[2].setDisabled(true)
                                inProcess = false
                                return interaction.editReply({
                                    content: `🏷️ | End of the game, you have won ${interaction.user}`,
                                    components: [gameRowA, gameRowB, gameRowC]
                                })
                                break

                            /*

                                */

                            case a1 == target.id && a2 == target.id && a3 == target.id:
                                gameRowA.components[0].setDisabled(true)
                                gameRowA.components[1].setDisabled(true)
                                gameRowA.components[2].setDisabled(true)

                                gameRowB.components[0].setDisabled(true)
                                gameRowB.components[1].setDisabled(true)
                                gameRowB.components[2].setDisabled(true)

                                gameRowC.components[0].setDisabled(true)
                                gameRowC.components[1].setDisabled(true)
                                gameRowC.components[2].setDisabled(true)
                                inProcess = false
                                return interaction.editReply({
                                    content: `🏷️ | End of the game, you have won ${target}`,
                                    components: [gameRowA, gameRowB, gameRowC]
                                })
                                break

                            case b1 == target.id && b2 == target.id && b3 == target.id:
                                gameRowA.components[0].setDisabled(true)
                                gameRowA.components[1].setDisabled(true)
                                gameRowA.components[2].setDisabled(true)

                                gameRowB.components[0].setDisabled(true)
                                gameRowB.components[1].setDisabled(true)
                                gameRowB.components[2].setDisabled(true)

                                gameRowC.components[0].setDisabled(true)
                                gameRowC.components[1].setDisabled(true)
                                gameRowC.components[2].setDisabled(true)
                                inProcess = false
                                return interaction.editReply({
                                    content: `🏷️ | End of the game, you have won ${target}`,
                                    components: [gameRowA, gameRowB, gameRowC]
                                })
                                break

                            case c1 == target.id && c2 == target.id && c3 == target.id:
                                gameRowA.components[0].setDisabled(true)
                                gameRowA.components[1].setDisabled(true)
                                gameRowA.components[2].setDisabled(true)

                                gameRowB.components[0].setDisabled(true)
                                gameRowB.components[1].setDisabled(true)
                                gameRowB.components[2].setDisabled(true)

                                gameRowC.components[0].setDisabled(true)
                                gameRowC.components[1].setDisabled(true)
                                gameRowC.components[2].setDisabled(true)
                                inProcess = false
                                return interaction.editReply({
                                    content: `🏷️ | End of the game, you have won ${target}`,
                                    components: [gameRowA, gameRowB, gameRowC]
                                })
                                break

                            case a1 == target.id && b1 == target.id && c1 == target.id:
                                gameRowA.components[0].setDisabled(true)
                                gameRowA.components[1].setDisabled(true)
                                gameRowA.components[2].setDisabled(true)

                                gameRowB.components[0].setDisabled(true)
                                gameRowB.components[1].setDisabled(true)
                                gameRowB.components[2].setDisabled(true)

                                gameRowC.components[0].setDisabled(true)
                                gameRowC.components[1].setDisabled(true)
                                gameRowC.components[2].setDisabled(true)
                                inProcess = false
                                return interaction.editReply({
                                    content: `🏷️ | End of the game, you have won ${target}`,
                                    components: [gameRowA, gameRowB, gameRowC]
                                })
                                break

                            case a2 == target.id && b2 == target.id && c2 == target.id:
                                gameRowA.components[0].setDisabled(true)
                                gameRowA.components[1].setDisabled(true)
                                gameRowA.components[2].setDisabled(true)

                                gameRowB.components[0].setDisabled(true)
                                gameRowB.components[1].setDisabled(true)
                                gameRowB.components[2].setDisabled(true)

                                gameRowC.components[0].setDisabled(true)
                                gameRowC.components[1].setDisabled(true)
                                gameRowC.components[2].setDisabled(true)
                                inProcess = false
                                return interaction.editReply({
                                    content: `🏷️ | End of the game, you have won ${target}`,
                                    components: [gameRowA, gameRowB, gameRowC]
                                })
                                break

                            case a3 == target.id && b3 == target.id && c3 == target.id:
                                gameRowA.components[0].setDisabled(true)
                                gameRowA.components[1].setDisabled(true)
                                gameRowA.components[2].setDisabled(true)

                                gameRowB.components[0].setDisabled(true)
                                gameRowB.components[1].setDisabled(true)
                                gameRowB.components[2].setDisabled(true)

                                gameRowC.components[0].setDisabled(true)
                                gameRowC.components[1].setDisabled(true)
                                gameRowC.components[2].setDisabled(true)
                                inProcess = false
                                return interaction.editReply({
                                    content: `🏷️ | End of the game, you have won ${target}`,
                                    components: [gameRowA, gameRowB, gameRowC]
                                })
                                break

                            case a1 == target.id && b2 == target.id && c3 == target.id:
                                gameRowA.components[0].setDisabled(true)
                                gameRowA.components[1].setDisabled(true)
                                gameRowA.components[2].setDisabled(true)

                                gameRowB.components[0].setDisabled(true)
                                gameRowB.components[1].setDisabled(true)
                                gameRowB.components[2].setDisabled(true)

                                gameRowC.components[0].setDisabled(true)
                                gameRowC.components[1].setDisabled(true)
                                gameRowC.components[2].setDisabled(true)
                                inProcess = false
                                return interaction.editReply({
                                    content: `🏷️ | End of the game, you have won ${target}`,
                                    components: [gameRowA, gameRowB, gameRowC]
                                })
                                break

                            case a3 == target.id && b2 == target.id && c1 == target.id:
                                gameRowA.components[0].setDisabled(true)
                                gameRowA.components[1].setDisabled(true)
                                gameRowA.components[2].setDisabled(true)

                                gameRowB.components[0].setDisabled(true)
                                gameRowB.components[1].setDisabled(true)
                                gameRowB.components[2].setDisabled(true)

                                gameRowC.components[0].setDisabled(true)
                                gameRowC.components[1].setDisabled(true)
                                gameRowC.components[2].setDisabled(true)
                                inProcess = false
                                return interaction.editReply({
                                    content: `🏷️ | End of the game, you have won ${target}`,
                                    components: [gameRowA, gameRowB, gameRowC]
                                })
                                break

                            case a1 !== false &&
                                a2 !== false &&
                                a3 !== false &&
                                b1 !== false &&
                                b2 !== false &&
                                b3 !== false &&
                                c1 !== false &&
                                c2 !== false &&
                                c3 !== false:
                                inProcess = false
                                return interaction.editReply({
                                    content: `🏷️ | End of the game, it was a tie`,
                                    components: [gameRowA, gameRowB, gameRowC]
                                })
                                break
                        }
                    }
                })

                collector1.on("end", async () => {
                    if (inProcess) {
                        gameRowA.components[0].setDisabled(true)
                        gameRowA.components[1].setDisabled(true)
                        gameRowA.components[2].setDisabled(true)

                        gameRowB.components[0].setDisabled(true)
                        gameRowB.components[1].setDisabled(true)
                        gameRowB.components[2].setDisabled(true)

                        gameRowC.components[0].setDisabled(true)
                        gameRowC.components[1].setDisabled(true)
                        gameRowC.components[2].setDisabled(true)

                        inProcess = false
                        m2.delete()
                        interaction.editReply("❗ | The game has been finished by exceeding the maximum time (1m and 30s)")
                    }
                })

                collector2.on("end", async () => {
                    if (inProcess) {
                        gameRowA.components[0].setDisabled(true)
                        gameRowA.components[1].setDisabled(true)
                        gameRowA.components[2].setDisabled(true)

                        gameRowB.components[0].setDisabled(true)
                        gameRowB.components[1].setDisabled(true)
                        gameRowB.components[2].setDisabled(true)

                        gameRowC.components[0].setDisabled(true)
                        gameRowC.components[1].setDisabled(true)
                        gameRowC.components[2].setDisabled(true)

                        inProcess = false
                        m2.delete()
                        interaction.editReply("❗ | The game has been finished for exceeding the maximum time (1m and 30s)")
                    }
                })
            } else if (button.customId == "decline") {
                pendingRow.components[0].setDisabled(true)
                pendingRow.components[1].setDisabled(true)
                fail = true

                pendingCollector.stop()
                return interaction.editReply({content: `❌ | ${target} has declined the request`, components: [pendingRow]})
            }
        })

        pendingCollector.on("end", async () => {
            if (!fail) {
                pendingRow.components[0].setDisabled(true)
                pendingRow.components[1].setDisabled(true)
                interaction.editReply({content: `❌ | ${target} has not responded`, components: [pendingRow]})
            }
        })
    }
})
