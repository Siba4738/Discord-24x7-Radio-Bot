const { MessageEmbed } = require("discord.js");
const sendError = require("../util/error");

module.exports = {
  info: {
    name: "volume",
    description: "To change the server song volume",
    usage: "[volume]",
    aliases: ["v", "vol"],
  },

  run: async function(client, message, args) {
    const channel = message.member.voice.channel;
    if (!channel) return sendError("<:x_:944952424270012447> I'm sorry but you need to be in a voice channel to play music!", message.channel);
    const serverQueue = message.client.queue.get(message.guild.id);
    if (!serverQueue) return sendError("<:x_:944952424270012447> There is nothing playing in this server.", message.channel);
    if (!serverQueue.connection) return sendError("<:x_:944952424270012447> There is nothing playing in this server.", message.channel);
    if (!args[0]) return message.channel.send(`<a:check_mark:944952166869778502> The current volume is: **${serverQueue.volume}** <a:song12:949469152647733339>`);
    if (isNaN(args[0])) return message.channel.send('<:x_:944952424270012447> Numbers only!').catch(err => console.log(err));
    if (parseInt(args[0]) > 150 || (args[0]) < 0) return sendError('<:x_:944952424270012447> You can\'t set the volume more than 150. or lower than 0', message.channel).catch(err => console.log(err));
    serverQueue.volume = args[0];
    serverQueue.connection.dispatcher.setVolumeLogarithmic(args[0] / 100);
    let xd = new MessageEmbed()
      .setDescription(`<a:check_mark:944952166869778502> I set the volume to: **${args[0] / 1}/100**`)
      .setAuthor("Server Volume Manager", "https://github.com/navaneethkm004/my-images/blob/main/giphy.gif?raw=true")
      .setColor("#fffdd0")
    return message.channel.send(xd);
  },
};
