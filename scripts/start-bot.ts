import * as dotenv from 'dotenv';
dotenv.config();

import { Client, GatewayIntentBits, Routes } from 'discord.js';
import { REST } from '@discordjs/rest';
import slashCommands from '../src/commands';

const token = process.env.BOT_TOKEN;
const guildId = process.env.GUILD_ID;
const clientId = process.env.CLIENT_ID;

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

// Notify when bot has started
client.once('ready', () => console.log('Bot running...'));

// handle slash commands
client.on('interactionCreate', async interaction => {
    if (!interaction.isChatInputCommand()) return;

    const command = slashCommands.get(interaction.commandName);
    if (!command) return;

    try {
        await command.respond(interaction);
    } catch (error) {
        console.error(error);
        await interaction.reply({ content: 'There was an error while executing this command...', ephemeral: true});
    }
});

// sync commands
if (token && guildId && clientId) {
    const rest = new REST({version: '10'}).setToken(token);

    rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: slashCommands.map(command => command.data.toJSON()) })
        .then((data: any) => console.log(`Successfully registered ${data.length} application commands`))
        .catch(console.error);
} else {
    throw Error("Could not find environment variable(s)")
}

// Login to discord with client's token
client.login(token);
