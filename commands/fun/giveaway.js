const { MessageEmbed } = require("discord.js");
const ms = require("ms");
module.exports = {
  name: "giveaway",
  description: "Crie um simples sorteio",
  usage: "<tempo> <canal> <premio>",
  category: "fun",
  run: async (bot, message, args) => {
    if (!args[0]) return message.channel.send(`You did not specify your time!`);
    if (
      !args[0].endsWith("d") &&
      !args[0].endsWith("h") &&
      !args[0].endsWith("m")
    )
      return message.channel.send(
        `Você não usou a formatação correta para o horário!`
      );
    if (isNaN(args[0][0])) return message.channel.send(`Isso não é um numero!`);
    let channel = message.mentions.channels.first();
    if (!channel)
      return message.channel.send(
        `Não encontrei esse canal no servidor!`
      );
    let prize = args.slice(2).join(" ");
    if (!prize) return message.channel.send(`Nenhum prêmio especificado!`);
    message.channel.send(`*Sorteio criado no ${channel}*`);
    let Embed = new MessageEmbed()
      .setTitle(`Novo sorteio!`)
      .setDescription(
        `O Usuario ${message.author} Está organizando um evento que o prêmio é **${prize}**`
      )
      .setTimestamp(Date.now() + ms(args[0]))
      .setColor(`BLUE`);
    let m = await channel.send(Embed);
    m.react("🎉");
    setTimeout(() => {
      if (m.reactions.cache.get("🎉").count <= 1) {
        message.channel.send(`Reações: ${m.reactions.cache.get("🎉").count}`);
        return message.channel.send(
          `Poucas pessoas reagiram para eu escolher um vencedor :(!`
        );
      }

      let winner = m.reactions.cache
        .get("🎉")
        .users.cache.filter((u) => !u.bot)
        .random();
      channel.send(
        `O ganhador do sorteio de **${prize}** é... ${winner}`
      );
    }, ms(args[0]));
  },
};
