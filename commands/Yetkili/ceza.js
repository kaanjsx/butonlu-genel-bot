const Command = require('../../structures/Command');
const { MessageButton, MessageActionRow } = require("discord.js");
const db = require("quick.db")
class ceza extends Command {
  constructor(client) {
    super(client, {
      name: "ceza-menü",
      aliases: ["ceza-ver", "ceza"],
      enabled: true,
      permLevel: 4
    });
  }
  async execute(message, { client, Embed }, args) {
 
 const target = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find((member) => member.user.username.toLowerCase().includes(args[0]));
  if (!target) {
    message.reply(':x: Lütfen birisini etiketle!');
  }
 const embed = new Embed()
    .setColor("#2F3136")
    .setDescription(`:wave: **Ceza paneline** <@${message.author.id}>! \n\n :tools: **${target.user.tag}** adlı kişiye gereken cezayı vermek için butonlara bas!`)
    .setFooter("Ghost Development ")
    .setThumbnail(message.author.displayAvatarURL({dynamic: true}))
    var button = new MessageButton()
    .setStyle("SECONDARY")
    .setLabel("Ban")
    .setCustomId("ban")
    var button1 = new MessageButton()
    .setStyle("SECONDARY")
    .setLabel("Kick")
    .setCustomId("kıck")
    var button2 = new MessageButton()
    .setStyle("SECONDARY")
    .setLabel("Uyar")
    .setCustomId("uyar")
  const uyarı = client.db.get(`uyarı_${message.guild.id}_${target.user.id}`);
 const row = new MessageActionRow()
    .addComponents([ button, button1, button2 ]);
    return message.reply({ 
      embeds: [ embed ], 
      components: [ row ]
    }).then(async (msg) => {
      const filter = i => i.user.id !== client.user.id;
      const collector = msg.createMessageComponentCollector({ filter });
      collector.on('collect', async (i) => {
        if (i.user.id !== message.author.id) return false;
        if (!i.isButton()) return;
        if (i.customId == "ban") {
       i.reply({ content: `:tools: Ban işlemi başarıyla gerçekleşti!`, ephemeral: true })
       i.guild.members.ban(target.user)
        }  if (i.customId == "kıck") {
    i.reply({ content: `:tools: Atılma işlemi başarıyla gerçekleşti!`, ephemeral: true })
       i.guild.members.kick(target.user)

        } if (i.customId == "uyar") {
         i.reply({ content: `:tools: Uyarı işlemi başarılı gerekli bilgi uyarılan kişiye gönderildi!`, ephemeral: true })
           target.user.send(`**${i.guild.name}** adlı sunucudan uyarı aldınız!`).catch(() => {});
        }
          })
        })
  }
}

module.exports = ceza;