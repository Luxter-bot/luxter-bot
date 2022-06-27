import Discord from "discord.js"
import {Command} from "mitim"

export default new Command.ApplicationCommand({
    name: "say",
    description: "Make the bot say something",
    category: "utility",
    options: [
        {
            name: "content",
            description: "The content to say",
            type: "STRING"
        }
    ],
    run: async (bot, interaction) => {
        const content = interaction.options.getString("content")

        if (!content) {
            const content = new Discord.TextInputComponent()
                .setCustomId("content-say")
                .setLabel("Content")
                .setMaxLength(2048)
                .setRequired(true)
                .setStyle("PARAGRAPH")

            const anonymous = new Discord.TextInputComponent().setCustomId("anonymous-say").setLabel("Anonymous").setMaxLength(5).setStyle("SHORT")

            const modal = new Discord.Modal()
                .setCustomId("modal-say")
                .setTitle("Make the bot say something")
                .addComponents(new Discord.MessageActionRow().addComponents(content), new Discord.MessageActionRow().addComponents(anonymous))

            interaction.showModal(modal)
        } else {
            if (interaction.member.permissions.has("ADMINISTRATOR")) {
                interaction.channel.send({
                    content: content
                })

                interaction.reply({
                    content: "✅ | Message sended"
                })
            } else {
                interaction.channel.send({
                    content: `${content}\n> Sended by ${interaction.member.user.tag}`,
                    allowedMentions: {parse: []}
                })

                interaction.reply({
                    content: "✅ | Message sended"
                })
            }
        }
    }
})
