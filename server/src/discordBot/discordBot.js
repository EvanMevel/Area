const Discord = require("discord.js");
const config = require("./config.json");

const weather_channel_id = "1029318661950935071";

const { Client, GatewayIntentBits } = require('discord.js');

const client = new Discord.Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
    ]
})

async function writeMessage(message) {
    client.channels.cache.get(weather_channel_id).send(message);
}

client.login(config.BOT_TOKEN);

module.exports.writeMessage = writeMessage;