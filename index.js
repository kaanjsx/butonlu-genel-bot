const Discord = require('discord.js');
const util = require("util");
const path = require('path');
const fs = require("fs");
const { MessageButton, MessageActionRow, MessageEmbed } = require("discord.js");
const Loaders = require('./structures/Loaders');
const client = new Loaders({
  intents: [
		1, 2, 4, 8, 16, 32, 64, 128, 256, 512, 1024, 2048, 4096, 8192, 16384,
	],
	partials: ["MESSAGE", "CHANNEL", "REACTION"],
});
const db = require('quick.db');

fs.readdirSync('./commands/').forEach(async (dir) => {
  let files = fs.readdirSync(`./commands/${dir}`)
  for (let file of files) {
    let cmds = new (require(`./commands/${dir}/${file}`))(client);
    client.logger.log(`${cmds.help.name} adlı komut yüklendi.`, "log")
    client.commands.set(cmds.help.name, cmds)
    cmds.conf.aliases.forEach(async (alias) => {
      client.aliases.set(alias, cmds.help.name)
    })
  }
});

client.on('ready', async () => {
  client.logger.log('Bot başarıyla açıldı!', "ready");
});

client.on('messageCreate', async (message) => {
  const prefix = client.config.prefix;
  if (!message.guild) return;
  if (message.author.bot) return;
  if (message.content.indexOf(prefix) !== 0) return;
  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const command = args.shift();
  const cmd = client.commands.get(command) || client.commands.get(client.aliases.get(command));
  if (!cmd) return;
  if (cmd.conf.permLevel == 5) {
    if (!client.config.ownerIds.includes(message.author.id)) {
      const embed = new Discord.MessageEmbed()
      .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
      .setDescription(`<:hayir:928555791550652428> Bu komutu kullanabilmek için **BOT_OWNER** yetkisine ihtiyacın var!`)
      .setColor('#2F3136')
      .setTimestamp()
      .setFooter(client.user.username, client.user.displayAvatarURL({ dynamic: true }))
      .setThumbnail(message.guild.iconURL({ dynamic: true }));
      return message.reply({ embeds: [ embed ] });
    }
  } else if (cmd.conf.permLevel == 4) {
    if (!message.member.permissions.has('ADMINISTRATOR')) {
      const embed = new Discord.MessageEmbed()
      .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
      .setDescription(`<:hayir:928555791550652428> Bu komutu kullanabilmek için **ADMINISTRATOR** yetkisine ihtiyacın var!`)
      .setColor('#2F3136')
      .setTimestamp()
      .setFooter(client.user.username, client.user.displayAvatarURL({ dynamic: true }))
      .setThumbnail(message.guild.iconURL({ dynamic: true }));
      return message.reply({ embeds: [ embed ] });
    }
  } else if (cmd.conf.permLevel == 3) {
    if (!message.member.permissions.has('MANAGE_GUILD')) {
      const embed = new Discord.MessageEmbed()
      .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
      .setDescription(`<:hayir:928555791550652428> Bu komutu kullanabilmek için **MANAGE_GUILD** yetkisine ihtiyacın var!`)
      .setColor('#2F3136')
      .setTimestamp()
      .setFooter(client.user.username, client.user.displayAvatarURL({ dynamic: true }))
      .setThumbnail(message.guild.iconURL({ dynamic: true }));
      return message.reply({ embeds: [ embed ] });
    }
  } else if (cmd.conf.permLevel == 2) {
    if (!message.member.permissions.has('BAN_MEMBERS')) {
      const embed = new Discord.MessageEmbed()
      .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
      .setDescription(`<:hayir:928555791550652428> Bu komutu kullanabilmek için **BAN_MEMBERS** yetkisine ihtiyacın var!`)
      .setColor('#2F3136')
      .setTimestamp()
      .setFooter(client.user.username, client.user.displayAvatarURL({ dynamic: true }))
      .setThumbnail(message.guild.iconURL({ dynamic: true }));
      return message.reply({ embeds: [ embed ] });
    }
  } else if (cmd.conf.permLevel == 1) {
    if (!message.member.permissions.has('MANAGE_MESSAGES')) {
      const embed = new Discord.MessageEmbed()
      .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
      .setDescription(`<:hayir:928555791550652428> Bu komutu kullanabilmek için **MANAGE_MESSAGES** yetkisine ihtiyacın var!`)
      .setColor('#2F3136')
      .setTimestamp()
      .setFooter(client.user.username, client.user.displayAvatarURL({ dynamic: true }))
      .setThumbnail(message.guild.iconURL({ dynamic: true }));
      return message.reply({ embeds: [ embed ] });
    }
  }
  if (cmd.conf.enabled == true) {
    const Embed = Discord.MessageEmbed;
    cmd.execute(message, { client, Embed }, args);
  } else if (cmd.conf.enabled == false) {
    if (!client.config.ownerIds.includes(message.author.id)) {
      const embed = new Discord.MessageEmbed()
      .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
      .setDescription(`<:hayir:928555791550652428> Bu komut geçici süreliğine kapalı konuma alınmıştır!`)
      .setColor('#2F3136')
      .setTimestamp()
      .setFooter(client.user.username, client.user.displayAvatarURL({ dynamic: true }))
      .setThumbnail(message.guild.iconURL({ dynamic: true }));
      return message.reply({ embeds: [ embed ] });
    } else {
      const Embed = Discord.MessageEmbed;
      cmd.execute(message, { client, Embed }, args);
    }
  }
});

client.login(client.config.token);



client.on("messageDelete", async (message) => {
  if (message.author.bot || message.channel.type == "GUILD_TEXT") return;
  let mesajlog = message.guild.channels.cache.get(db.get(`mesajlog_${message.guild.id}`));
  if (!mesajlog) return;
  const embed = new Discord.MessageEmbed()
.setDescription(`:ghost: **${message.author}** tarafından yazılan mesaj ${message.channel} kanalında silindi. \n ( Mesaj ID: ${message.id} ) \n\n ${message.content}`)
.setColor('#2F3136')
.setThumbnail(message.author.displayAvatarURL({ dynamic: true }))
mesajlog.send({ embeds: [embed] });
})

client.on("messageUpdate", async (oldMessage, newMessage) => {
  let mesajlog = db.get(`mesajlog_${oldMessage.guild.id}`);
  if (!mesajlog) return;
  if (oldMessage.content === newMessage.content) return
  const button = new MessageButton()
  .setLabel('Mesaja atla!')
  .setStyle('LINK')
  .setEmoji(`↗️`)
  .setURL(`https://discord.com/channels/${oldMessage.guild.id}/${oldMessage.channel.id}/${oldMessage.id}`);
  const row = new MessageActionRow()
  .addComponents([ button ]);

  let embed = new Discord.MessageEmbed()
  .setThumbnail(oldMessage.author.displayAvatarURL({ dynamic: true, size: 4096, format: 'png' }))
  .setColor('#2F3136')
  .setDescription(`:ghost: **${oldMessage.author.tag}** ${oldMessage.channel} kanalında bir mesaj düzenledi. \n\n  - **Mesaj ID:** ${oldMessage.id} \n - **Önce:** ${oldMessage.content} \n - **Sonra:** ${newMessage.content}`)
  
  client.channels.cache.get(mesajlog).send({ embeds: [embed], components: [ row ] });

})

/* process.on("unhandledRejection", (err) => {});
process.on("uncaughtException", (err) => {}); */