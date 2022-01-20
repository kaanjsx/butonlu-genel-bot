const Command = require('../../structures/Command');
const { MessageButton, MessageActionRow } = require("discord.js");

class Avatar extends Command {
  constructor(client) {
    super(client, {
      name: "avatar",
      aliases: ["pp", "pfp"],
      enabled: true,
      permLevel: null
    });
  }

  async execute(message, { client, Embed }, args) {
    const target = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find((member) => member.user.username.toLowerCase().includes(args[0])) || message.member;
    const embed = new Embed()
    .setColor("#2F3136")
    .setTitle(target.user.tag)
    .setImage(target.user.displayAvatarURL({dynamic: true}));
    var button = new MessageButton()
    .setStyle("LINK")
    .setLabel("PNG")
    .setURL(target.user.displayAvatarURL({format:"png"}));
    var button1 = new MessageButton()
    .setStyle("LINK")
    .setLabel("WEBP")
    .setURL(target.user.displayAvatarURL({format:"webp"}));
    var button3 = new MessageButton()
    .setStyle("LINK")
    .setLabel("JPEG")
    .setURL(target.user.displayAvatarURL({format:"jpeg"}));
    var button4 = new MessageButton()
    .setStyle("LINK")
    .setLabel("JPG")
    .setURL(target.user.displayAvatarURL({format:"jpg"}));
    const row = new MessageActionRow()
    .addComponents([ button, button1, button3, button4 ]);
    const row1 = new MessageActionRow()
    .addComponents([ button3, button4 ]);
    return message.reply({ 
      embeds: [ embed ], 
      components: [ row ]
    });  
  }
}
module.exports = Avatar;