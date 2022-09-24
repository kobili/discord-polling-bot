import { SlashCommandBuilder } from 'discord.js';
import type { ChatInputCommandInteraction } from 'discord.js';
import type { DiscordBotSlashCommand } from "./types";

const optionEmojis = ["0️⃣", "1️⃣", "2️⃣", "3️⃣", "4️⃣", "5️⃣", "6️⃣", "7️⃣", "8️⃣", "9️⃣", "🔟"];

const pollCommand: DiscordBotSlashCommand = {
    data: new SlashCommandBuilder()
        .setName("poll")
        .addStringOption(option => 
            option.setName("topic")
                .setDescription("What is the point of your poll?")
                .setRequired(true))
        .addStringOption(option => 
            option.setName("option1")
                .setDescription("First option")
                .setRequired(true))
        .addStringOption(option => 
            option.setName("option2")
                .setDescription("Second option")
                .setRequired(true))
        .setDescription("Create a poll"),

    respond: async (interaction: ChatInputCommandInteraction) => {

        const pollTopic = interaction.options.getString("topic");

        const pollOptions: string[] = [];
        for (let i = 1; i <= 10; i++) {
            const pollOption = interaction.options.getString(`option${i}`)
            if (pollOption) {
                pollOptions.push(pollOption);
            }
            
        }

        let messageContent = `NEW POLL: ${pollTopic}\n\n`;
        let counter = 1;
        for (let pollOption of pollOptions) {
            const optionString = `\t${optionEmojis[counter]}: ${pollOption}\n\n`;
            messageContent += optionString;
            counter++;
        }

        const message = await interaction.reply({content: messageContent, fetchReply: true});
        for (let i = 1; i <= pollOptions.length; i++) {
            message.react(optionEmojis[i]);
        }
    }  
}

for (let i = 3; i <= 10; i++) {
    pollCommand.data.addStringOption(option => 
        option.setName(`option${i}`)
            .setDescription("additional poll option")
            .setRequired(false))
}

export { pollCommand };