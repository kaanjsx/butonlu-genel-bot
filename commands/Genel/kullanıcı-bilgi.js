const Command = require('../../structures/Command');
const timestamp = require('discord-timestamp');

class UserInfo extends Command {
  constructor(client) {
    super(client, {
      name: "kullanıcı-bilgi",
      aliases: ["kb", "kullanıcıbilgi"],
      enabled: true,
      permLevel: null
    });
  }

  async execute(message, { client, Embed }, args) {
    const { DiscordBanners } = require('discord-banners');
    const discordBanners = new DiscordBanners(client);
    const target = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find((member) => member.user.username.toLowerCase().includes(args[0])) || message.member;
    const banner = await discordBanners.getBanner(target.user.id, { dynamic: true });
    if (banner.includes('https')) {
      const embed = new Embed()
      .setTitle(`:tools: **${target.user.tag}** Kullanıcısının Bilgileri`)
      .addField('Kullanıcı Adı', target.user.username, true)
      .addField('Kullanıcı ID', target.user.id, true)
      .addField('Kullanıcı Etiketi', target.user.discriminator, true)
      .addField('Sunucuya Katılma Tarihi', `<t:${timestamp(new Date(target.joinedTimestamp))}:D>`, false)
      .addField('Discord\'a Katılma Tarihi', `<t:${timestamp(new Date(target.user.createdTimestamp))}:D>`, false)
      .setImage(banner)
      .setThumbnail(target.user.displayAvatarURL({ dynamic: true }))
      .setColor('#2F3136');
      return message.reply({ embeds: [embed] });
    } else if (!banner.includes('https')) {
      const embed = new Embed()
      .setTitle(`:tools: **${target.user.tag}** Kullanıcısının Bilgileri`)
      .addField('Kullanıcı Adı', target.user.username, true)
      .addField('Kullanıcı ID', target.user.id, true)
      .addField('Kullanıcı Etiketi', target.user.discriminator, true)
      .addField('Sunucuya Katılma Tarihi', `<t:${timestamp(new Date(target.joinedTimestamp))}:D>`, false)
      .addField('Discord\'a Katılma Tarihi', `<t:${timestamp(new Date(target.user.createdTimestamp))}:D>`, false)
      .setThumbnail(target.user.displayAvatarURL({ dynamic: true }))
      .setColor('#2F3136');
      return message.reply({ embeds: [embed] });
    }
  }
}

module.exports = UserInfo;