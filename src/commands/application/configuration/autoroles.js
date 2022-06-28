import Discord from "discord.js"
import {Command} from "mitim"
import ReactionRoles from "../../../schemas/autoRoles.js"

export default new Command.ApplicationCommand({
    name: "autoroles",
    description: "Add a custom role",
    category: "configuration",
    options: [
        {
            name: "add",
            description: "Add a custom role",
            type: "SUB_COMMAND",
            options: [
                {
                    name: "role",
                    description: "The role to add to the menu",
                    type: "ROLE",
                    required: true
                },
                {
                    name: "description",
                    description: "Description of this role",
                    type: "STRING"
                },
                {
                    name: "emoji",
                    description: "The emoji for the role",
                    type: "STRING",
                    required: false
                }
            ]
        },
        {
            name: "panel",
            description: "Deploy the custom roles",
            type: "SUB_COMMAND"
        },
        {
            name: "remove",
            description: "Remove a custom role",
            type: "SUB_COMMAND",
            options: [
                {
                    name: "role",
                    description: "The role to remove from the menu",
                    type: "ROLE",
                    required: true
                }
            ]
        },
        {
            name: "list",
            description: "List all custom roles",
            type: "SUB_COMMAND"
        }
    ],
    permissions: {
        user: ["MANAGE_ROLES"],
        bot: ["MANAGE_ROLES"]
    },
    run: async (bot, interaction) => {
        const option = interaction.options.getSubcommand()

        if (option === "add") {
            const role = interaction.options.getRole("role")
            const roleDescription = interaction.options.getString("description") || null
            const emoji = interaction.options.getString("emoji") || null

            if (role.position >= interaction.guild.me.roles.highest.position)
                return interaction.reply({
                    content: "❌ | I can't add this role, it's higher or equal to my highest role"
                })

            const getEmoji = Discord.Util.parseEmoji(emoji)

            if (getEmoji && !getEmoji.id)
                return interaction.reply({
                    content: "❌ | The emoji is not valid"
                })

            const data = await ReactionRoles.findOne({_id: interaction.guild.id})

            if (!data) {
                new ReactionRoles({
                    _id: interaction.guild.id,
                    roles: [
                        {
                            role: role.id,
                            description: roleDescription,
                            emoji: getEmoji.id
                        }
                    ]
                }).save()
            } else {
                let roleData = data.roles.find((x) => x.role === role.id)

                if (roleData) {
                    roleData = {
                        role: role.id,
                        description: roleDescription,
                        emoji: emoji
                    }
                    data.save()
                } else {
                    data.roles.push({
                        role: role.id,
                        description: roleDescription,
                        emoji: emoji
                    })
                    data.save()
                }
            }

            interaction.reply({
                content: `✅ | The role ${role} has been added to the menu`
            })
        }

        if (option === "panel") {
            const data = await ReactionRoles.findOne({_id: interaction.guild.id})

            if (!data)
                return interaction.reply({
                    content: "❌ | There are no custom roles to display"
                })

            const options = data.roles.map((r) => {
                const role = interaction.guild.roles.cache.get(r.role)

                return {
                    label: role.name,
                    value: role.id,
                    description: r.description || "No description",
                    emoji: r.emoji
                }
            })

            if (options.length > 25)
                return interaction.reply({
                    content: "❌ | There are too many custom roles to display"
                })

            const panel = new Discord.MessageEmbed()
                .setAuthor({name: `Select a role to add`, iconURL: interaction.guild.iconURL({dynamic: true})})
                .setDescription(
                    `**Select what role you want to add in the select menu below**\n> Roles for add:\n${data.roles
                        .map((x) => `<@&${x.role}> - ${x.description || "Without description"}`)
                        .join("\n")}`
                )
                .setColor("RANDOM")

            interaction.reply({
                content: `📝 | Here is the panel for the custom roles`,
                ephemeral: true
            })
            interaction.channel.send({
                embeds: [panel],
                components: [
                    new Discord.MessageActionRow().addComponents(new Discord.MessageSelectMenu().setCustomId("reaction-roles").addOptions(options))
                ]
            })
        }

        if (option === "remove") {
            const role = interaction.options.getRole("role")

            const data = await ReactionRoles.findOne({_id: interaction.guild.id})

            if (!data)
                return interaction.reply({
                    content: "❌ | There are no custom roles to display"
                })

            const roleData = data.roles.find((x) => x.role === role.id)

            if (!roleData)
                return interaction.reply({
                    content: "❌ | This role is not in the menu"
                })

            data.roles = data.roles.filter((x) => x.role !== role.id)
            data.save()

            interaction.reply({
                content: `✅ | The role ${role} has been removed from the menu`
            })
        }

        if (option === "list") {
            const data = await ReactionRoles.findOne({_id: interaction.guild.id})

            if (!data)
                return interaction.reply({
                    content: "❌ | There are no custom roles to display"
                })

            const role = data.roles.map((r) => {
                const role = interaction.guild.roles.cache.get(r.role)
                return role
            })

            interaction.reply({
                content: `📝 | Here is the list of custom roles\n${Discord.Formatters.codeBlock(
                    "",
                    role.map((r) => `${r.name}`)
                )}`
            })
        }
    }
})
