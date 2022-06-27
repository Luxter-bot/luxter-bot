import Discord from "discord.js"
import {Command} from "mitim"
import PermissionConfig from "../../../schemas/permissions.js"

export default new Command.ApplicationCommand({
    name: "permissions",
    description: "Set what permission type you want the bot use",
    category: "configuration",
    options: [
        {
            name: "type",
            description: "The permission type to set",
            type: "STRING",
            required: true,
            choices: [
                {
                    name: "default permissions",
                    value: "default"
                },
                {
                    name: "integration permissions",
                    value: "integration"
                }
            ]
        }
    ],
    permissions: {
        user: ["MANAGE_GUILD"]
    },
    run: async (bot, interaction) => {
        const option = interaction.options.getString("type")

        const data = await PermissionConfig.findOne({_id: interaction.guild.id})

        if (!data) {
            new PermissionConfig({
                _id: interaction.guild.id,
                permissions: option
            }).save()
        } else {
            data.permissions = option
            data.save()
        }

        let optionDescription =
            option === "default"
                ? `Default permissions: The bot will be use the default discord permissions, i mean, the commands requires permissions`
                : `Integration Permissions: You can configure the command permissions\n- This is a new feature in Discord, with this option, all commands has been accesible for everyone\n\nBe fast to configure the permissions in Server Settings -> Integrations -> Bots and Apps -> Luxter`

        interaction.reply(`🔩 | The permissions config has been set to **${option}**\n${Discord.Formatters.codeBlock("", optionDescription)}`)
    }
})
