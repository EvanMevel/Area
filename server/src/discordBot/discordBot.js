const config = require("./config.json");

let client;
const weather_channel_id = "1029318661950935071";

async function writeMessage(message) {
    client.channels.cache.get(weather_channel_id).send(message);
}

async function loadBot() {
    console.log("Starting Discord bot...");
    const Discord = require("discord.js");
    client = new Discord.Client({
        intents: [
            Discord.GatewayIntentBits.Guilds,
            Discord.GatewayIntentBits.GuildMessages
        ]
    });

    await client.login(config.BOT_TOKEN);
    console.log("Discord bot started!");
}

module.exports.loadBot = loadBot;

module.exports.writeMessage = writeMessage;