const { Client, Collection } = require("discord.js");
const util = require("util");
const path = require("path");

class Loaders extends Client {
  constructor(options) {
    super(options);
    // tüm her şeyin olduğu config dosyası
    this.config = require('../config');
    // komutları tanımlayacak olan koleksiyonlar
    this.commands = new Collection();
    this.aliases = new Collection();
    // araç gereçler
    this.logger = require("./helpers/logger");
    this.wait = util.promisify(setTimeout);
    this.db = require('quick.db');
  }
  
  async resolveMember(search, guild) {
    let member = null;
    if (!search || typeof search !== "string") return;
    if (search.match(/^<@!?(\d+)>$/)) {
      let id = search.match(/^<@!?(\d+)>$/)[1];
      member = await guild.members.fetch(id).catch(() => {});
      if (member) return member;
    }
    if (search.match(/^!?([^#]+)#(\d+)$/)) {
      guild = await guild.fetch();
      member = guild.members.find((m) => m.user.tag === search);
      if(member) return member;
    }
    member = await guild.members.fetch(search).catch(() => {});
    return member;
  }

  async resolveUser(search) {
    let user = null;
    if(!search || typeof search !== "string") return;
    if(search.match(/^!?([^#]+)#(\d+)$/)) {
      let id = search.match(/^!?([^#]+)#(\d+)$/)[1];
      user = this.users.fetch(id).catch((err) => {});
      if(user) return user;
    }
    if(search.match(/^!?([^#]+)#(\d+)$/)) {
      let username = search.match(/^!?([^#]+)#(\d+)$/)[0];
      let discriminator = search.match(/^!?([^#]+)#(\d+)$/)[1];
      user = this.users.find((u) => u.username === username && u.discriminator === discriminator);
      if(user) return user;
    }
    user = await this.users.fetch(search).catch(() => {});
    return user;
  }
}

module.exports = Loaders;