
console.log("[Discord] Starting Discord bot...");
const Discord = require("discord.js");

let client;
const weather_channel_id = "1029318661950935071";

async function writeMessage(message) {
    client.channels.cache.get(weather_channel_id).send(message);
}

client = new Discord.Client({
    intents: [
        Discord.GatewayIntentBits.Guilds,
        Discord.GatewayIntentBits.GuildMessages
    ]
});

console.log("[Discord] Discord bot started!");

function stop() {
    console.log("[Discord] Discord bot stopping...");
    client.destroy();
}

module.exports.stop = stop;

module.exports.writeMessage = writeMessage;