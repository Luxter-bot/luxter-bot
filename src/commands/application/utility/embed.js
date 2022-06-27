import Discord from "discord.js"
import {Command} from "mitim"

export default new Command.ApplicationCommand({
    name: "embed",
    description: "Create an embed",
    category: "utility",
    run: async (bot, interaction) => {
        const title = new Discord.TextInputComponent()
            .setCustomId("title-embed")
            .setLabel("Title")
            .setMaxLength(256)
            .setRequired(true)
            .setStyle("PARAGRAPH")

        const description = new Discord.TextInputComponent()
            .setCustomId("description-embed")
            .setLabel("Description")
            .setMaxLength(2048)
            .setRequired(true)
            .setStyle("PARAGRAPH")

        const color = new Discord.TextInputComponent()
            .setCustomId("color-embed")
            .setLabel("Color")
            .setMaxLength(6)
            .setRequired(true)
            .setStyle("PARAGRAPH")

        const image = new Discord.TextInputComponent().setCustomId("image-embed").setMaxLength(2048).setLabel("Image URL").setStyle("PARAGRAPH")

        const thumbnail = new Discord.TextInputComponent()
            .setCustomId("thumbnail-embed")
            .setLabel("Thumbnail")
            .setMaxLength(2048)
            .setStyle("PARAGRAPH")

        const modal = new Discord.Modal()
            .setCustomId("modal-embed")
            .setTitle("Create an embed")
            .addComponents(
                new Discord.MessageActionRow().addComponents(title),
                new Discord.MessageActionRow().addComponents(description),
                new Discord.MessageActionRow().addComponents(color),
                new Discord.MessageActionRow().addComponents(image),
                new Discord.MessageActionRow().addComponents(thumbnail)
            )

        interaction.showModal(modal)
    }
})
