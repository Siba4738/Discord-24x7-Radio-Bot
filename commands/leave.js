const { MessageEmbed } = require("discord.js");
const sendError = require("../util/error");

module.exports = {
    info: {
        name: "leave",
        aliases: ["goaway", "disconnect", "bye"],
        description: "Leave The Voice Channel!",
        usage: "Leave",
    },

    run: async function (client, message, args) {
        let channel = message.member.voice.channel;
        if (!channel) return sendError("<:x_:944952424270012447> I'm sorry but you need to be in a voice channel!", message.channel);
        if (!message.guild.me.voice.channel) return sendError("<:x_:944952424270012447> I Am Not In Any Voice Channel!", message.channel);

        try {
            await message.guild.me.voice.channel.leave();
        } catch (error) {
            await message.guild.me.voice.kick(message.guild.me.id);
            return sendError("Trying To Leave The Voice Channel...", message.channel);
        }

        const Embed = new MessageEmbed()
            .setAuthor("Leave Voice Channel", "https://github.com/navaneethkm004/my-images/blob/main/giphy.gif?raw=true")
            .setColor("#fffdd0")
            .setTitle("<a:check_mark:944952166869778502> Success")
            .setDescription("<a:song12:949469152647733339> Left The Voice Channel.")
            .setTimestamp();

        return message.channel.send(Embed).catch(() => message.channel.send("<a:song12:949469152647733339> Left The Voice Channel :C"));
    },
};
