import Discord, { MessageButton } from 'discord.js'
import moment from 'moment'
import { Command } from 'mitim'

export default new Command.ApplicationCommand({
    name: "random",
    description: "Get a random user",
    category: "fun",
    options: [
        {
            name: "type",
            description: "The type of user to get",
            type: "STRING",
            choices: [
                {
                    name: "user",
                    value: "user"
                }, {
                    name: "bot",
                    value: "bot"
                }
            ]
        }
    ],
    run: async (bot, interaction) => {

        const type = interaction.options.getString("type")

        await interaction.deferReply()

        if(!type) {

            const users = interaction.guild.members.cache;

            const user = users.random()

            const m = await interaction.editReply({
                content: `And the random user is...`
            })

            setTimeout(() => {
                m.edit({
                    content: `Congratulations **${user}**, you have been chosen by this command!\n${Discord.Formatters.codeBlock("", `User: ${user.user.tag} / ${user.id}\nJoined at: ${moment(user.joinedAt).format("DD/MM/YYY HH:mm:ss")} / ${moment(user.joinedAt).fromNow()}`)}`
                }).catch(() => {})
            }, 3000)

        }

        if (type === "user") {
            const users = interaction.guild.members.cache.filter(member => !member.user.bot)
            const user = users.random()
            
            const m = await interaction.editReply({
                content: `And the random user is...`
            })

            setTimeout(() => {
                m.edit({
                    content: `Congratulations **${user}**, you have been chosen by this command!\n${Discord.Formatters.codeBlock("", `User: ${user.user.tag} / ${user.id}\nJoined at: ${moment(user.joinedAt).format("DD/MM/YYY HH:mm:ss")} / ${moment(user.joinedAt).fromNow()}`)}`
                }).catch(() => {})
            }, 3000)

        } else if (type === "bot") {

            const bots = interaction.guild.members.cache.filter(member => member.user.bot)
            const bot = bots.random()
            
            const m = await interaction.editReply({
                content: `And the random user is...`
            })

            setTimeout(() => {
                m.edit({
                    content: `Congratulations **${bot}**, you have been chosen by this command!\n${Discord.Formatters.codeBlock("", `User: ${bot.user.tag} / ${bot.id}\nJoined at: ${moment(bot.joinedAt).format("DD/MM/YYY HH:mm:ss")} / ${moment(bot.joinedAt).fromNow()}`)}`
                }).catch(() => {})
            }, 3000)

        }

    }
})