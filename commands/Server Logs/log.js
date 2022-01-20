const Command = require('../../structures/Command');
const { MessageButton, MessageActionRow } = require("discord.js");


class log extends Command {
  constructor(client) {
    super(client, {
      name: "log",
      aliases: ["log", "log-create"],
      enabled: true,
      permLevel: 4
    });
  }

  async execute(message, { client, Embed }, args) {

let logchannel = message.mentions.channels.first() || message.channel
let logkanal =  this.db.get(`mesajlog_${message.guild.id}`)
  
  if (args[0] === "sıfırla" || args[0] === "kapat") {

  var ayarlanmamıs = new Embed()
  .setColor("#2F3136")
  .setThumbnail(message.author.displayAvatarURL({dynamic: true}))
  .setDescription("<:hayir:928555791550652428> Mesaj Log zaten ayarlanmamış!")
    if(!logkanal) return message.reply({ embeds: [ayarlanmamıs] });
    this.db.delete(`mesajlog_${message.guild.id}`)

  var sıfırlandı = new Embed()
  .setColor("#2F3136")
  .setThumbnail(message.author.displayAvatarURL({dynamic: true}))
  .setDescription("<:evet:928555825172193341> Mesaj Log başarıyla sıfırlandı.")

  return message.reply({ embeds: [sıfırlandı] });

  }
  
this.db.set(`mesajlog_${message.guild.id}`, logchannel.id)


  var basarılı = new Embed()
  .setColor("#2F3136")
  .setThumbnail(message.author.displayAvatarURL({dynamic: true}))
  .setDescription(`<:evet:928555825172193341> Mesaj-log ${logchannel} kanalına kuruldu. Kapatmak için: !log sıfırla`)
  return message.channel.send({ embeds: [basarılı] });

  }
}

module.exports = log;