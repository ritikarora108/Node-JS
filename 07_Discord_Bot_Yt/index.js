import { Client, GatewayIntentBits } from "discord.js";
import dotenv from "dotenv";
import express from "express";
dotenv.config();

import connectMongoDB from "./connection.js"
import urlRouter from "./routes/url.js"
import handleCreateShortIdCommand from "./service/createShortId.js";
import handleFetchURLCommand from "./service/fetchUrl.js";


connectMongoDB(process.env.MONGO_URL)
    .then(() => {
        console.log("MongoDb connected!");
    })
    .catch((error) => 
        console.log(`${error}`)
    );

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/url', urlRouter);

const port = process.env.PORT;
app.listen(port, () => console.log(`Server started on PORT: ${port}`));


const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

client.on("messageCreate", async (message) => {
    if (message.author.bot) return;

    if (message.content.startsWith("create ")) {
        const msg = await handleCreateShortIdCommand(message.content);
        if (!msg) {
            console.error("No message to send, msg is undefined");
            return;
        }
        message.reply(msg);
    }
    else if (message.content.startsWith('fetch')) {
        const msg = await handleFetchURLCommand(message.content);
        message.reply(msg);
    }
    else {
        message.reply({
            content: "Hi from Bot!"
        })
    }
    
})

client.on("interactionCreate", (interaction) => {
    // console.log(interaction)
    interaction.reply("Pong");
})

client.login(process.env.TOKEN);