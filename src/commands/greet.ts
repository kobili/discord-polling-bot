import { SlashCommandBuilder } from 'discord.js';
import type { ChatInputCommandInteraction } from 'discord.js';
import type { DiscordBotSlashCommand } from "./types";

const greetCommand: DiscordBotSlashCommand = {
    data: new SlashCommandBuilder()
        .setName("greet")
        .addStringOption(option => 
            option.setName("firstname")
                .setDescription("Who do you want to greet?")
                .setRequired(true))
        .addStringOption(option => 
            option.setName("lastname")
                .setDescription("Do they have a last name?")
                .setRequired(false))
        .setDescription("Greet a person"),

    respond: async (interaction: ChatInputCommandInteraction) => {

        const firstName = interaction.options.getString("firstname")!;
        const lastName = interaction.options.getString("lastname");

        let message = "Hello, " + firstName;
        if (lastName != undefined) {
            message = message + " " + lastName;
        }

        message = message + "!";

        interaction.reply(message);
    }  
}

export { greetCommand };