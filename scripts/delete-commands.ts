import * as dotenv from 'dotenv';
dotenv.config();

import { REST } from '@discordjs/rest';
import { Routes } from 'discord.js';

const token = process.env.BOT_TOKEN;
const guildId = process.env.GUILD_ID;
const clientId = process.env.CLIENT_ID;

if (token && guildId && clientId) {
    const rest = new REST({version: '10'}).setToken(token);

    // use Routes.applicationCommands to delete globally
    rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: [] })
        .then(() => console.log('Successfully deregistered all application commands'))
        .catch(console.error);
} else {
    throw Error("Could not find environment variable(s)")
}