import Discord from "discord.js"
import {Command} from "mitim"
import moment from "moment"

export default new Command.ApplicationCommand({
    name: "botinfo",
    description: "Get info about me",
    category: "utility",
    run: async (bot, interaction) => {
        const embed = new Discord.MessageEmbed()
            .setAuthor({name: `${bot.user.tag}`, iconURL: bot.user.avatarURL()})
            .setDescription(
                `**${bot.user.tag}** is a discord bot, madded by **! xTheSebaSx#7432**.\nI have **${bot.ApplicationCommand.size}** application commands. My purpose is to keep your server safe, with my log system`
            )
            .setColor(interaction.guild.me.displayHexColor)
            .addField("Id", `${Discord.Formatters.codeBlock("", bot.user.id)}`, true)
            .addField("Username", `${Discord.Formatters.codeBlock("", bot.user.tag)}`, true)
            .addField(
                "Stats",
                `${Discord.Formatters.codeBlock(
                    "diff",
                    `+ Guilds: ${bot.guilds.cache.size}\n+ Users: ${bot.users.cache.size}\n+ Channels: ${bot.channels.cache.size}`
                )}`
            )
            .addField(
                "Joined at this server",
                Discord.Formatters.codeBlock(
                    "",
                    `${moment(interaction.guild.me.joinedAt).format("MMMM Do YYYY")} (${moment(interaction.guild.me.joinedAt).fromNow()})`
                ),
                true
            )
            .addField(
                "Created",
                Discord.Formatters.codeBlock("", `${moment(bot.user.createdAt).format("MMMM Do YYYY")} (${moment(bot.user.createdAt).fromNow()})`),
                true
            )
            .addField(
                "Creator Information",
                Discord.Formatters.codeBlock(
                    "md",
                    `# Github: https://github.com/Luxter-bot/luxter-bot\n# Id: 493456079531933708\n# Username: ! xTheSebaSx#7432\n# Twitter: https://twitter.com/xTheSebaSx1`
                )
            )
            .setThumbnail(bot.user.avatarURL())

        const row = new Discord.MessageActionRow().addComponents(
            new Discord.MessageButton().setURL("https://discord.gg/dAeYtXY4Q3").setLabel("Support server").setStyle("LINK"),
            new Discord.MessageButton().setURL("https://github.com/Luxter-bot/luxter-bot").setLabel("Github Repository").setStyle("LINK"),
            new Discord.MessageButton()
                .setURL(`https://discordapp.com/oauth2/authorize?client_id=${bot.user.id}&scope=bot%20applications.commands&permissions=8`)
                .setLabel("Invite me")
                .setStyle("LINK")
        )

        interaction.reply({
            embeds: [embed],
            components: [row]
        })
    }
})
