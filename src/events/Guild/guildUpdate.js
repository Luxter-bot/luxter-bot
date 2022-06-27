import Discord from "discord.js"
import {Event} from "mitim"
import logs from "../../schemas/logs.js"

export default new Event({
    name: "guildUpdate",
    run: async (bot, oldGuild, newGuild) => {
        const data = await logs.findOne({_id: oldGuild.id})

        if (!data) return

        const channel = bot.channels.cache.get(data.logs.guild.channel)

        if (!channel || !channel.viewable || !channel.permissionsFor(bot.user).has("SEND_MESSAGES")) return

        if (data.logs.guild.actived) {
            if (oldGuild.name !== newGuild.name) {
                const embed = new Discord.MessageEmbed()
                    .setAuthor({name: `Guild name edited`, iconURL: oldGuild.iconURL({dynamic: true})})
                    .setColor("DEBB0C")
                    .setDescription(`The name of the guild has been changed`)
                    .addField("Old name", `${Discord.Formatters.codeBlock("", oldGuild.name)}`)
                    .addField("New name", `${Discord.Formatters.codeBlock("", newGuild.name)}`)
                    .setTimestamp()

                channel.send({embeds: [embed]})
            }

            if (oldGuild.icon !== newGuild.icon) {
                const embed = new Discord.MessageEmbed()
                    .setAuthor({name: `Guild icon edited`, iconURL: oldGuild.iconURL({dynamic: true})})
                    .setColor("DEBB0C")
                    .setDescription(`The icon of the guild has been changed`)
                    .addField("Old icon", `${Discord.Formatters.codeBlock("", `$ oldGuild.iconURL({ dynamic: true }) || "Without icon"}`)}`)
                    .addField("New icon", `${Discord.Formatters.codeBlock("", `${newGuild.iconURL({dynamic: true}) || "Without icon"}`)}`)
                    .setTimestamp()

                channel.send({embeds: [embed]})
            }

            if (oldGuild.banner !== newGuild.banner) {
                const embed = new Discord.MessageEmbed()
                    .setAuthor({name: `Guild banner edited`, iconURL: oldGuild.iconURL({dynamic: true})})
                    .setColor("DEBB0C")
                    .setDescription(`The banner of the guild has been changed`)
                    .addField("Old banner", `${Discord.Formatters.codeBlock("", `$ oldGuild.bannerURL({ dynamic: true }) || "Without banner"}`)}`)
                    .addField("New banner", `${Discord.Formatters.codeBlock("", `${newGuild.bannerURL({dynamic: true}) || "Without banner"}`)}`)
                    .setTimestamp()

                channel.send({embeds: [embed]})
            }

            if (oldGuild.description !== newGuild.description) {
                const embed = new Discord.MessageEmbed()
                    .setAuthor({name: `Guild description edited`, iconURL: oldGuild.iconURL({dynamic: true})})
                    .setColor("DEBB0C")
                    .setDescription(`The description of the guild has been changed`)
                    .addField("Old description", `${Discord.Formatters.codeBlock("", oldGuild.description || "Without description")}`)
                    .addField("New description", `${Discord.Formatters.codeBlock("", newGuild.description || "Without description")}`)
                    .setTimestamp()

                channel.send({embeds: [embed]})
            }

            if (oldGuild.vanityURLCode !== newGuild.vanityURLCode) {
                const embed = new Discord.MessageEmbed()
                    .setAuthor({name: `Guild vanity url code edited`, iconURL: oldGuild.iconURL({dynamic: true})})
                    .setColor("DEBB0C")
                    .setDescription(`The vanity url code of the guild has been changed`)
                    .addField("Old vanity url code", `${Discord.Formatters.codeBlock("", oldGuild.vanityURLCode || "Without vanity url code")}`)
                    .addField("New vanity url code", `${Discord.Formatters.codeBlock("", newGuild.vanityURLCode || "Without vanity url code")}`)
                    .setTimestamp()

                channel.send({embeds: [embed]})
            }

            if (oldGuild.ownerId !== newGuild.ownerId) {
                const oldOwner = await oldGuild.fetchOwner()
                const newOwner = await newGuild.fetchOwner()

                const embed = new Discord.MessageEmbed()
                    .setAuthor({name: `Guild owner edited`, iconURL: oldGuild.iconURL({dynamic: true})})
                    .setColor("DEBB0C")
                    .setDescription(`The owner of the guild has been changed`)
                    .addField("Old owner", `${Discord.Formatters.codeBlock("", `${oldOwner.user.tag} ($ oldGuild.ownerId})`)}`)
                    .addField("New owner", `${Discord.Formatters.codeBlock("", `${newOwner.user.tag} (${newGuild.ownerId})`)}`)
                    .setTimestamp()

                channel.send({embeds: [embed]})
            }
        }
    }
})
