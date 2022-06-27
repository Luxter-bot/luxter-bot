import Discord from "discord.js"
import {Command} from "mitim"

export default new Command.ApplicationCommand({
    name: "poll",
    description: "Create a poll",
    category: "staff",
    permissions: {
        user: ["MANAGE_MESSAGES"]
    },
    run: async (bot, interaction) => {
        const PollTitle = new Discord.TextInputComponent()
            .setCustomId("poll-title")
            .setLabel("Title")
            .setPlaceholder("Poll Title")
            .setRequired(true)
            .setMaxLength(100)
            .setMinLength(1)
            .setStyle("PARAGRAPH")

        const Question1 = new Discord.TextInputComponent()
            .setCustomId("question-1")
            .setLabel("Question 1")
            .setPlaceholder("Question 1")
            .setRequired(true)
            .setMaxLength(100)
            .setMinLength(1)
            .setStyle("PARAGRAPH")

        const Question2 = new Discord.TextInputComponent()
            .setCustomId("question-2")
            .setLabel("Question 2")
            .setPlaceholder("Question 2")
            .setRequired(true)
            .setStyle("PARAGRAPH")

        const Question3 = new Discord.TextInputComponent()
            .setCustomId("question-3")
            .setLabel("Question 3")
            .setPlaceholder("Question 3")
            .setStyle("PARAGRAPH")

        const Question4 = new Discord.TextInputComponent()
            .setCustomId("question-4")
            .setLabel("Question 4")
            .setPlaceholder("Question 4")
            .setStyle("PARAGRAPH")

        const row = new Discord.MessageActionRow().addComponents(PollTitle)

        const row2 = new Discord.MessageActionRow().addComponents(Question1)

        const row3 = new Discord.MessageActionRow().addComponents(Question2)

        const row4 = new Discord.MessageActionRow().addComponents(Question3)

        const row5 = new Discord.MessageActionRow().addComponents(Question4)

        const modal = new Discord.Modal().addComponents(row, row2, row3, row4, row5).setTitle("Create a poll").setCustomId("poll-modal")

        interaction.showModal(modal)
    }
})
