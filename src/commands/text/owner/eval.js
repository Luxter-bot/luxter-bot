import Discord from "discord.js"
import {Command} from "mitim"
import {inspect} from "util"

export default new Command.TextCommand({
    name: "eval",
    description: "Evaluate a code",
    category: "owner",
    aliases: ["ev", "e"],
    ownerOnly: true,
    run: async (bot, message, args) => {
        const code = args.join(" ")

        if (!code)
            return message.reply({
                content: "❌ | You need to provide some code to evaluate"
            })

        try {
            const evaled = await eval(code)
            const evaledString = inspect(evaled, {depth: 0})

            message.reply({
                content: `${Discord.Formatters.codeBlock("js", `${typeof evaled}\n${evaledString}`)}`
            })
        } catch (e) {
            message.reply({
                content: `${Discord.Formatters.codeBlock("prolog", `${e.name}\n${e.message}`)}`
            })
        }
    }
})
