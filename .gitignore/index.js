const Discord = require('discord.js');
const client = new Discord.Client();
let prefix = "!"

client.on('ready', function () {
  console.log("Je suis connecté !");
})

client.login(process.env.TOKEN);



client.on("message", message => {
    if (!message.guild) return
    let args = message.content.trim().split(/ +/g)
    if (args[0].toLowerCase() === prefix + "vc") {
        let quantity = args[1];
        let items = args[2];
        let paiement = args[3];
        
        if (!quantity,!items,!paiement) return message.channel.send("Veuillez respectez l'écriture, [quantité] [Type_D'objet] [Moyen de paiement].")
        if (quantity,items,paiement) return message.channel.send(`**:gear: Bonjour ${message.author.username}, Vous souhaitez commander ${quantity} de ${items} et payer en ${paiement}. Est-ce correcte ?**`)
        .then(message => {
            message.react('✅')
            message.react('❌')
              // on attend l'event d'ajout d'une réaction
              client.on('messageReactionAdd', (reaction, user) => {

                if (reaction.emoji.name === '✅' && user.id !== client.user.id) {
                  let namec = user
                  let dm = user.id
                  var gro = client.channels.get('525351149952565248');
                  gro.send(`**:gear: ${namec} ta commande à été prise en compte, je te notifirai quand un membre de la faction répondra à ta demande**`)
                    var robby = client.channels.get('546354572701073419');
                    robby.send(`**:gear:@here Le joueur ${namec} souhaite commander ${quantity} ${items} et payer en ${paiement}. \n🛑Utilisez pour refuser une commande, 👋 pour signalez que vous préparez la commande et 🍾 pour signalez que vous avez terminez la commande**`)

                    .then(message => {
                      message.react('🍾')
                      message.react('🛑')
                      message.react('👋')
                        // on attend l'event d'ajout d'une réaction
                        client.on('messageReactionAdd', (reaction, user) => {
          
                          if (reaction.emoji.name === '🍾' && user.id !== client.user.id) {
                            client.users.get(dm).send("**:gear: Je te préviens que ta commande est terminé. contacte un membre de la faction pour l'échange.**")
                            message.channel.bulkDelete(parseInt(0) + 1)
                          }

                          if (reaction.emoji.name === '👋' && user.id !== client.user.id) {
                            client.users.get(dm).send("**:gear: Je te préviens que ta commande est en préparation.**")
                          }
          
          
                          if (reaction.emoji.name === '🛑' && user.id !== client.user.id) {
                              client.users.get(dm).send("**:gear: Malheureusement ta commande à été refusé. Pour avoir d'avanatge d'explication contacte-nous sur notre discord.**")
                              message.channel.bulkDelete(parseInt(0) + 1)
                          }

                        })

                      })
                

                }


                if (reaction.emoji.name === '❌' && user.id !== client.user.id) {
                    message.channel.bulkDelete(parseInt(1) + 1)
                }
              })
            })
    }

    if (args[0].toLowerCase() === prefix + "marketclear") {
        if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send("Vous n'avez pas la permission d'utiliser cette commande")
        let count = args[1]
        if (!count) return message.channel.send("Veuillez indiquer un nombre de messages à supprimer")
        if (isNaN(count)) return message.channel.send("Veuillez indiquer un nombre valide")
        if (count < 1 || count > 100) return message.channel.send("Veuillez indiquer un nombre entre 1 et 100")
        message.channel.bulkDelete(parseInt(count) + 1)
    }

    if (args[0].toLowerCase() === prefix + "marketinfo") {
        if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send("Vous n'avez pas la permission d'utiliser cette commande")
        let count = 0
        message.channel.bulkDelete(parseInt(count) + 1)
        message.channel.send("**:gear: @here Ici, c'est la boutique vous pouvez nous passer commande, nous essayerons de répondre à vos besoins le plus rapidement possible avec un prix convenable :moneybag: \nSi vous souhaitez commander ici veuillez faire la commande suivante:  !vc [Quantité] [Objet de la commande] [Moyen de paiement]**\n*:warning: Attention si vos réponses contiennent des espaces remplacer les par _ comme dans l'exemple ci-dessous*\n**!vc 2 dc Hell sickle vanadium :x: \n!vc 2_dc Hell_Sickle Vanadium :white_check_mark:  **")}


})
