import Discord from "discord.js"
import {Event} from "mitim"
import Welcome from '../../schemas/welcome.js'
import moment from 'moment'
import Logs from "../../schemas/logs.js"

export default new Event({
    name: "guildMemberAdd",
    run: async (bot, member) => {

        const welcomeData = await Welcome.findOne({_id: member.guild.id})

        if (welcomeData){

            const welcomeChannel = member.guild.channels.cache.get(welcomeData.channel)

            const welcomeRoles = welcomeData.roles.map((r) => member.guild.roles.cache.get(r.role))

            console.log(welcomeRoles)

            welcomeRoles.forEach(async (r) => {
                await member.roles.add(r)
            })

            if (welcomeChannel){

                const textWelcomeMessage = welcomeData.message.text
                .replace("{member}", `${member}`)
                .replace("{user.tag}", `${member.user.tag}`)
                .replace("{user.id}", `${member.user.id}`)
                .replace("{user.discriminator}", `${member.user.discriminator}`)
                .replace("{user.username}", `${member.user.username}`)
                .replace("{guild.name}", `${member.guild.name}`)
                .replace("{guild.id}", `${member.guild.id}`)
                .replace("{guild.owner}", `${(await member.guild.fetchOwner()).user}`)
                .replace("{guild.owner.tag}", `${(await member.guild.fetchOwner()).user.tag}`)
                .replace("{guild.owner.id}", `${(await member.guild.fetchOwner()).user.id}`)
                .replace("{guild.owner.discriminator}", `${(await member.guild.fetchOwner()).user.discriminator}`)
                .replace("{guild.owner.username}", `${(await member.guild.fetchOwner()).user.username}`)

                const embedWelcomeMessage = welcomeData.message.embed;

                const titleEmbed = embedWelcomeMessage.title
                .replace("{member}", `${member}`)
                .replace("{user.tag}", `${member.user.tag}`)
                .replace("{user.id}", `${member.user.id}`)
                .replace("{user.discriminator}", `${member.user.discriminator}`)
                .replace("{user.username}", `${member.user.username}`)
                .replace("{guild.name}", `${member.guild.name}`)
                .replace("{guild.id}", `${member.guild.id}`)
                .replace("{guild.owner}", `${(await member.guild.fetchOwner()).user}`)
                .replace("{guild.owner.tag}", `${(await member.guild.fetchOwner()).user.tag}`)
                .replace("{guild.owner.id}", `${(await member.guild.fetchOwner()).user.id}`)
                .replace("{guild.owner.discriminator}", `${(await member.guild.fetchOwner()).user.discriminator}`)
                .replace("{guild.owner.username}", `${(await member.guild.fetchOwner()).user.username}`)

                const descriptionEmbed = embedWelcomeMessage.description
                .replace("{member}", `${member}`)
                .replace("{user.tag}", `${member.user.tag}`)
                .replace("{user.id}", `${member.user.id}`)
                .replace("{user.discriminator}", `${member.user.discriminator}`)
                .replace("{user.username}", `${member.user.username}`)
                .replace("{guild.name}", `${member.guild.name}`)
                .replace("{guild.id}", `${member.guild.id}`)
                .replace("{guild.owner}", `${(await member.guild.fetchOwner()).user}`)
                .replace("{guild.owner.tag}", `${(await member.guild.fetchOwner()).user.tag}`)
                .replace("{guild.owner.id}", `${(await member.guild.fetchOwner()).user.id}`)
                .replace("{guild.owner.discriminator}", `${(await member.guild.fetchOwner()).user.discriminator}`)
                .replace("{guild.owner.username}", `${(await member.guild.fetchOwner()).user.username}`)

                const colorEmbed = embedWelcomeMessage.color;

                const thumbnailEmbed = embedWelcomeMessage.thumbnail
                ?.replace("{member.avatar}", `${member.user.displayAvatarURL({ dynamic: true, format: "png" })}`)
                ?.replace("{guild.icon}", `${member.guild.iconURL({ dynamic: true, format: "png" })}`)

                const imageEmbed = embedWelcomeMessage.image
                ?.replace("{member.avatar}", `${member.user.displayAvatarURL({ dynamic: true, format: "png" })}`)
                ?.replace("{guild.icon}", `${member.guild.iconURL({ dynamic: true, format: "png" })}`)

                welcomeChannel.send({
                    content: textWelcomeMessage || "_ _",
                    embeds: [{
                        title: titleEmbed || "_ _",
                        description: descriptionEmbed || "_ _",
                        color: colorEmbed || "_ _",
                        thumbnail: {
                            url: thumbnailEmbed || null
                        },
                        image: {
                            url: imageEmbed || null
                        }
                    }]
                }).catch(() => {})

            }
        }

        const data = await Logs.findOne({_id: member.guild.id})

        if (!data) return

        const channel = member.guild.channels.cache.get(data.logs.member.channel)

        if (!channel || !channel.viewable || !channel.permissionsFor(member.guild.me).has("SEND_MESSAGES")) return

        if (data.logs.message.actived) {
            const embed = new Discord.MessageEmbed()
                .setAuthor({name: `Member joined`, iconURL: member.guild.iconURL()})
                .setColor("12B16E")
                .setDescription(`A member has joined (${member})`)
                .addField("Member", `${Discord.Formatters.codeBlock("", `${member.user.tag} / ${member.user.id}`)}`)
                .addField(
                    "Member joined at",
                    `${Discord.Formatters.codeBlock(
                        "",
                        `${moment(member.joinedAt).format("DD/MM/YYYY HH:mm:ss")} (${moment(member.joinedAt).fromNow()})`
                    )}`,
                    true
                )
                .addField(
                    "Member created at",
                    `${Discord.Formatters.codeBlock(
                        "",
                        `${moment(member.user.createdAt).format("DD/MM/YYYY HH:mm:ss")} (${moment(member.user.createdAt).fromNow()}`
                    )}`,
                    true
                )
                .setTimestamp()

            channel.send({embeds: [embed]})
        }
    }
})
