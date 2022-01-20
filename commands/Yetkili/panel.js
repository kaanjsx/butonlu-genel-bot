const Command = require('../../structures/Command');
const { MessageButton, MessageActionRow } = require("discord.js");

class panel extends Command {
  constructor(client) {
    super(client, {
      name: "panel",
      aliases: ["yetkili-panel", "bilgi-panel"],
      enabled: true,
      permLevel: 4
    });
  }

  async execute(message, { client, Embed }, args) {
    const embed = new Embed()
    .setColor("#2F3136")
    .setDescription(`:wave: **Sunucu paneline** hoşgeldin <@${message.author.id}>! \n - Butonlara basarak gerekli bilgileri alabilirsin.`)
    .setFooter("Ghost Development - discord.gg/developers")
    .setThumbnail(message.author.displayAvatarURL({dynamic: true}))
    var button = new MessageButton()
    .setStyle("SECONDARY")
    .setLabel("Ban Listesi")
    .setCustomId("banlıst")
    var button1 = new MessageButton()
    .setStyle("SECONDARY")
    .setLabel("Ban Sayısı")
    .setCustomId("bansayısı")
   var button2 = new MessageButton()
    .setStyle("SECONDARY")
    .setLabel("Banları Kaldır")
    .setCustomId("banlarıkaldır")
    var button3 = new MessageButton()
    .setStyle("SECONDARY")
    .setLabel("Üye Durumu")
    .setCustomId("uyedurum")
    var button4 = new MessageButton()
    .setStyle("LINK")
    .setLabel("Bot Owner")
    .setURL("https://discord.gg/developers")
    const row = new MessageActionRow()
    .addComponents([ button, button1, button2, button3, button4 ]);
    return message.reply({ 
      embeds: [ embed ], 
      components: [ row ]
    }).then(async (msg) => {
      const filter = i => i.user.id !== client.user.id;
      const collector = msg.createMessageComponentCollector({ filter });
      collector.on('collect', async (i) => {
        if (!i.isButton()) return;
        if (i.customId == "banlıst") {
          var melih = i.guild;
          melih.bans.fetch().then(banned => {
            let list = banned.map(user => `**${user.user.tag}** (**${user.user.id}**)`).join('\n');
            if (list.length >= 1950) list = `${list.slice(0, 1948)}...`;
            i.reply({ content: `:tools: Sunucunuzda ${banned.size} banlanmış üye bulunmaktadır ve bunların isimleri ve ID'leri aşağıda bulunmaktadır.\n\n:star: Yasaklanmış Üyeler:\n\n${list}`, ephemeral: true })
          })
        } else if (i.customId == "bansayısı") {
          let kaan = message.guild;
          kaan.bans.fetch().then(async (banneds) => {
            i.reply({ content: `:tools: Sunucunuzda ${banneds.size} banlanmış üye bulunmaktadır.`, ephemeral: true });
          });
        } else if (i.customId == "banlarıkaldır") {
          let kaan = message.guild;
          kaan.bans.fetch().then(async (banneds) => {
            banneds.forEach(async (unban) => {
              if (unban.size == 0) return i.reply({ content: `:tools: Yasağı kaldırılacak kullanıcı yok.`, ephemeral: true });
              await i.guild.members.unban(unban.user.id);
              i.reply({ content: `:tools: Kullanıcıların yasakları kaldırıldı.`, ephemeral: true });
            });
          });
        } else if (i.customId == "uyedurum") { 
          var dnd = message.guild.members.cache.filter(member => member.presence?.status == "dnd").size;
          var idle = message.guild.members.cache.filter(member => member.presence?.status == "idle").size;
          var offline = message.guild.members.cache.filter(member => member.presence?.status !== "online" && member.presence?.status !== "dnd" && member.presence?.status !== "idle").size;
          var online = message.guild.members.cache.filter(member => member.presence?.status == "online").size;
          var durum = `🟡 Boşta Olan Üyelerin Sayısı: **${idle}**\n🔴 Rahatsız Etmeyin Olan Üyelerin Sayısı: **${dnd}**\n🟢 Çevrimiçi Olan Üyelerin Sayısı: **${online}**\n⚪ Çevrimdışı Olan Üyelerin Sayısı: **${offline}**`;
          i.reply({
            content: `:tools: Üyelerin aktiflik durumları aşağıda verilmiştir.\n\n:star: Durumlar:\n\n${durum}`,
            ephemeral: true
          })    
        }
     })
    })
  }
}
module.exports = panel;