module.exports = class Command {
    constructor(client, {
      name = null,
      aliases = new Array(),
      enabled = true,
      permLevel = new Number()
    })
    {
      this.db = client.db;
      this.client = client;
      this.conf = { aliases, enabled, permLevel };
      this.help = { name };
    }
};