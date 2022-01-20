const Command = require('../../structures/Command');
const { MessageButton, MessageActionRow } = require("discord.js");

class Kayit extends Command {
  constructor(client) {
    super(client, {
      name: "kayıt-et",
      aliases: ["kayıt"],
      enabled: true,
      permLevel: 3
    });
  }

  async execute(message, { client, Embed }, args) {
    const roller = { 
      erkek: this.db.get(`erkek_${message.guild.id}`), 
      kız: this.db.get(`kiz_${message.guild.id}`),
      sohbet: this.db.get(`sohbetkanal_${message.guild.id}`),
      kayit: this.db.get(`kayitkanal_${message.guild.id}`)
    };
    if (!roller.erkek) {
      const embed = new Embed()
      .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
      .setDescription(`<:hayir:928555791550652428> Lütfen geçerli bir Erkek rolü ayarla!`)
      .setColor('#2F3136')
      .setTimestamp()
      .setFooter(client.user.username, client.user.displayAvatarURL({ dynamic: true }))
      .setThumbnail(message.guild.iconURL({ dynamic: true }));
      return message.reply({ embeds: [ embed ] });
    } else if (!roller.sohbet) {
      const embed = new Embed()
      .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
      .setDescription(`<:hayir:928555791550652428> Lütfen geçerli bir Kız rolü ayarla!`)
      .setColor('#2F3136')
      .setTimestamp()
      .setFooter(client.user.username, client.user.displayAvatarURL({ dynamic: true }))
      .setThumbnail(message.guild.iconURL({ dynamic: true }));
      return message.reply({ embeds: [ embed ] });
    } else if (!roller.kız) {
      const embed = new Embed()
      .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
      .setDescription(`<:hayir:928555791550652428> Lütfen geçerli bir Sohbet kanalı ayarla!`)
      .setColor('#2F3136')
      .setTimestamp()
      .setFooter(client.user.username, client.user.displayAvatarURL({ dynamic: true }))
      .setThumbnail(message.guild.iconURL({ dynamic: true }));
      return message.reply({ embeds: [ embed ] });
    } else if (!roller.kayit) { 
      const embed = new Embed()
      .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
      .setDescription(`<:hayir:928555791550652428> Lütfen geçerli bir Kayıt kanalı ayarla!`)
      .setColor('#2F3136')
      .setTimestamp()
      .setFooter(client.user.username, client.user.displayAvatarURL({ dynamic: true }))
      .setThumbnail(message.guild.iconURL({ dynamic: true }));
    } else if (roller.kayit !== message.channel.id) {
      const embed = new Embed()
      .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
      .setDescription(`<:hayir:928555791550652428> Lütfen bunu kayıt kanalında dene!`)
      .setColor('#2F3136')
      .setTimestamp()
      .setFooter(client.user.username, client.user.displayAvatarURL({ dynamic: true }))
      .setThumbnail(message.guild.iconURL({ dynamic: true }));
    } else if (roller.kayit == message.channel.id) {
      const target = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find((member) => member.user.username.toLowerCase().includes(args[0]));
      if (!target) {
        const embed = new Embed()
        .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
        .setDescription(`<:hayir:928555791550652428> Lütfen geçerli bir kullanıcı bilgisi verin; **etiketleyin**, **ID'sini girin**!`)
        .setColor('#2F3136')
        .setTimestamp()
        .setFooter(client.user.username, client.user.displayAvatarURL({ dynamic: true }))
        .setThumbnail(message.guild.iconURL({ dynamic: true }));
        return message.reply({ embeds: [ embed ] });
      } else {
        const user = target.user;
        var tip = args[1];
        if (!tip) {
          const embed = new Embed()
          .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
          .setDescription(`<:hayir:928555791550652428> Lütfen kayıt tipi bilgisini verin; **erkek**, **kız**!`)
          .setColor('#2F3136')
          .setTimestamp()
          .setFooter(client.user.username, client.user.displayAvatarURL({ dynamic: true }))
          .setThumbnail(message.guild.iconURL({ dynamic: true }));
          return message.reply({ embeds: [ embed ] });
        } else {
          var bilgiler = { isim: args.slice(2).join(" "), yaş: args[3] };
          if (!bilgiler.isim) {
            const embed = new Embed()
            .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
            .setDescription(`<:hayir:928555791550652428> Lütfen **${user.tag}** adlı kullanıcıyı kayıt etmek için geçerli bir isim girin!`)
            .setColor('#2F3136')
            .setTimestamp()
            .setFooter(client.user.username, client.user.displayAvatarURL({ dynamic: true }))
            .setThumbnail(message.guild.iconURL({ dynamic: true }));
            return message.reply({ embeds: [ embed ] });
          } else if (!bilgiler.yaş) {
            const embed = new Embed()
            .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
            .setDescription(`<:hayir:928555791550652428> Lütfen **${user.tag}** adlı kullanıcıyı kayıt etmek için geçerli bir yaş girin!`)
            .setColor('#2F3136')
            .setTimestamp()
            .setFooter(client.user.username, client.user.displayAvatarURL({ dynamic: true }))
            .setThumbnail(message.guild.iconURL({ dynamic: true }));
            return message.reply({ embeds: [ embed ] });
          }
        }
        const evet = new MessageButton()
        .setStyle('SUCCESS')
        .setLabel('Evet')
        .setCustomId('evet');
        const hayır = new MessageButton()
        .setStyle('DANGER')
        .setLabel('Hayır')
        .setCustomId('hayir');
        const row = new MessageActionRow()
        .addComponents([ evet, hayır ]);
        const kayitt = new Embed()
        .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
        .setDescription(`:grey_question: **${user.tag}** adlı kullanıcıyı kayıt etmek istiyor musunuz?`)
        .setColor('#2F3136')
        .setTimestamp()
        .setFooter(client.user.username, client.user.displayAvatarURL({ dynamic: true }))
        .setThumbnail(message.guild.iconURL({ dynamic: true }));
        const msggs = await message.reply({ embeds: [kayitt], components: [row] });
        const filter = async (interactions) => interactions.user.id !== client.user.id;
        const collector = msggs.createMessageComponentCollector({ filter });
        collector.on('collect', async (interaction) => {
          if (!interaction.isButton()) return;
          if (interaction.customId == "evet") {
            if (tip == "erkek") {
              const selamla = new MessageButton()
              .setStyle('SECONDARY')
              .setLabel('Selamla!')
              .setCustomId('selamla');
              const roww = new MessageActionRow()
              .addComponents([ selamla ]);
              interaction.guild.members.cache.get(user.id).roles.add(roller.erkek);
              interaction.guild.channels.cache.get(roller.sohbet).send({
                content: `${user.toString()}`,
                embeds: [ 
                  new Embed()
                  .setColor('#2F3136')
                  .setDescription(`:wave: **${user.tag}** adlı kullanıcı sunucumuzda kayıt oldu, onunla beraber **${interaction.guild.memberCount}** kişi olduk!`)
                ], components: [
                  roww
                ]
              }).then(async (mss) => {
                var fil = ss => ss.user.id !== client.user.id;
                var cee = mss.createMessageComponentCollector({ fil });
                cee.on('collect', async (inttt) => {
                  if (inttt.customId == "selamla") {
                    if (inttt.user.id == user.id) {
                      return inttt.reply({ content: `:wave: ${user.toString()} herkesi selamladı!` })
                    } else {
                      return inttt.reply({ content: `:wave: ${inttt.user.toString()}, ${user.toString()} kullanıcısını selamladı!` })
                    }
                  }
                })
              });
            } else if (tip == "kız") {
              const selamla = new MessageButton()
              .setStyle('SECONDARY')
              .setLabel('Selamla!')
              .setCustomId('selamla');
              const roww = new MessageActionRow()
              .addComponents([ selamla ]);
              interaction.guild.members.cache.get(user.id).roles.add(roller.kız);
              interaction.guild.channels.cache.get(roller.sohbet).send({
                content: `${user.toString()}`,
                embeds: [ 
                  new Embed()
                  .setColor('#2F3136')
                  .setDescription(`:wave: **${user.tag}** adlı kullanıcı sunucumuzda kayıt oldu, onunla beraber **${interaction.guild.memberCount}** kişi olduk!`)
                ], components: [
                  roww
                ]
              }).then(async (mss) => {
                var fil = ss => ss.user.id !== client.user.id;
                var cee = mss.createMessageComponentCollector({ fil });
                cee.on('collect', async (inttt) => {
                  if (inttt.customId == "selamla") {
                    if (inttt.user.id == user.id) {
                      return inttt.reply({ content: `:wave: ${user.toString()} herkesi selamladı!` })
                    } else {
                      return inttt.reply({ content: `:wave: ${inttt.user.toString()}, ${user.toString()} kullanıcısını selamladı!` })
                    }
                  }
                })
              });
            }
            return collector.stop('Kayıt tamamlandı.');
          } else if (interaction.customId == "hayir") {
            interaction.reply(`:x: Kayıt işlemi ${interaction.user.toString()} tarafından iptal edildi!`);
            return collector.stop('Kayıt iptal edildi.');
          }
        });
      }
    }
  }
}

module.exports = Kayit;