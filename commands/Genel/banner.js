const Command = require('../../structures/Command');
const timestamp = require('discord-timestamp');

class banner extends Command {
  constructor(client) {
    super(client, {
      name: "banner",
      aliases: ["banner", "user-banner"],
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
      .setDescription(`**:star2: ${target.user.tag} [kullanıcısının](https://discord.gg/developers) banneri!**`)
      .setImage(banner)
      .setFooter("Ghost Development")
      .setColor('#2F3136');
      return message.reply({ embeds: [embed] });
    } else if (!banner.includes('https')) {
      const embed = new Embed()
      .setDescription(`:x: Bu kullanıcıda banner bulunmamaktadır! \n\n 📔 Not: Hata olduğunu düşünüyorsanız [Discord](https://discord.gg/QtC7Cvh3MQ) sunucumuza gelebilir yada **bug** komutunu kullanabilirsiniz.`)
      .setFooter("Ghost Development")
      .setThumbnail(target.user.displayAvatarURL({dynamic:true}))
      .setColor('#2F3136');
      return message.reply({ embeds: [embed] });
    }
  }
}

module.exports = banner;