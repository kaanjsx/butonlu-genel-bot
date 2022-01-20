const Command = require('../../structures/Command');
const { MessageButton, MessageActionRow } = require("discord.js");

class KayitAyar extends Command {
  constructor(client) {
    super(client, {
      name: "kayıt-ayar",
      aliases: ["kayıtayar"],
      enabled: true,
      permLevel: 3
    });
  }

  async execute(message, { client, Embed }, args) {
    const ayarlar = {
      kayit: args[0],
      sohbet: args[1],
      erkek: args[2],
      kız: args[3]
    };
    if (!ayarlar.kayit) {
      const embed = new Embed()
      .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
      .setDescription(`<:hayir:928555791550652428> Lütfen Kayıt kanalı için bir kanal ID'si girin!`)
      .setColor('#2F3136')
      .setTimestamp()
      .setFooter(client.user.username, client.user.displayAvatarURL({ dynamic: true }))
      .setThumbnail(message.guild.iconURL({ dynamic: true }));
      return message.reply({ embeds: [embed] });
    } else if (!ayarlar.sohbet) {
      const embed = new Embed()
      .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
      .setDescription(`<:hayir:928555791550652428> Lütfen Sohbet kanalı için bir kanal ID'si girin!`)
      .setColor('#2F3136')
      .setTimestamp()
      .setFooter(client.user.username, client.user.displayAvatarURL({ dynamic: true }))
      .setThumbnail(message.guild.iconURL({ dynamic: true }));
      return message.reply({ embeds: [embed] });
    } else if (!ayarlar.erkek) {
      const embed = new Embed()
      .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
      .setDescription(`<:hayir:928555791550652428> Lütfen Erkek rolü için bir rol ID'si girin!`)
      .setColor('#2F3136')
      .setTimestamp()
      .setFooter(client.user.username, client.user.displayAvatarURL({ dynamic: true }))
      .setThumbnail(message.guild.iconURL({ dynamic: true }));
      return message.reply({ embeds: [embed] });
    } else if (!ayarlar.kız) {
      const embed = new Embed()
      .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
      .setDescription(`<:hayir:928555791550652428> Lütfen Erkek rolü için bir rol ID'si girin!`)
      .setColor('#2F3136')
      .setTimestamp()
      .setFooter(client.user.username, client.user.displayAvatarURL({ dynamic: true }))
      .setThumbnail(message.guild.iconURL({ dynamic: true }));
      return message.reply({ embeds: [embed] });
    }
    const embed = new Embed()
    .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
    .setDescription(`<:evet:928555825172193341> Kayıt ile ilgili tüm ayarlamalar yapıldı!\n\n:star: Kayıt Kanalı: <#${ayarlar.kayit}>\n:star: Sohbet Kanalı: <#${ayarlar.sohbet}>\n:star: Erkek Rolü: <@&${ayarlar.erkek}>\n:star: Kız Rolü: <@&${ayarlar.kız}>`)
    .setColor('#2F3136')
    .setTimestamp()
    .setFooter(client.user.username, client.user.displayAvatarURL({ dynamic: true }))
    .setThumbnail(message.guild.iconURL({ dynamic: true }));
    message.reply({ embeds: [embed] });
    this.db.set(`kayitkanal_${message.guild.id}`, ayarlar.kayit);
    this.db.set(`sohbetkanal_${message.guild.id}`, ayarlar.sohbet);
    this.db.set(`erkek_${message.guild.id}`, ayarlar.erkek);
    this.db.set(`kiz_${message.guild.id}`, ayarlar.kız);
  }
}

module.exports = KayitAyar;