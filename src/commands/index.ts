import { Collection } from 'discord.js';
import type { DiscordBotSlashCommand } from './types';
import { pollCommand } from './poll';
import { greetCommand } from './greet';

const commands = new Collection<string, DiscordBotSlashCommand>();

commands.set(pollCommand.data.name, pollCommand);
commands.set(greetCommand.data.name, greetCommand);

export default commands;