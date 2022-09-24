import { Collection } from 'discord.js';
import type { DiscordBotSlashCommand } from './types';
import { pollCommand } from './poll';

const commands = new Collection<string, DiscordBotSlashCommand>();

commands.set(pollCommand.data.name, pollCommand);

export default commands;