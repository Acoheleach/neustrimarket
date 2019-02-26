const Discord = require('discord.js');
const client = new Discord.Client();
let prefix = "!!"

client.on('ready', function () {
  console.log("Je suis connecté !");
})

client.login(process.env.TOKEN);



client.on("message", message => {
    if (!message.guild) return
    let args = message.content.trim().split(/ +/g)

      if (args[0].toLowerCase() === prefix + "marketclear") {
        if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send("Vous n'avez pas la permission d'utiliser cette commande")
        let count = args[1]
        if (!count) return message.channel.send("Veuillez indiquer un nombre de messages à supprimer")
        if (isNaN(count)) return message.channel.send("Veuillez indiquer un nombre valide")
        if (count < 1 || count > 100) return message.channel.send("Veuillez indiquer un nombre entre 1 et 100")
        message.channel.bulkDelete(parseInt(count) + 1)
      }

      if (args[0].toLowerCase() === prefix + "info") {
        if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send("Vous n'avez pas la permission d'utiliser cette commande")
        let count = 0
        message.channel.bulkDelete(parseInt(count) + 1)
        message.channel.send({embed: {
          color: 23983,
          author: {
            name: client.user.username,
            icon_url: client.user.avatarURL
          },
          title: '**:large_orange_diamond: Informations sur le Bot :large_blue_diamond:**',
          description: '',
          fields:[{
            name: ':moneybag: ***Infomation sur les commandes***:moneybag:',
            value: 'Baise le cul de balisto'
          },
          {
            name: ':notes: ***Infomation sur les musiques***:notes: ',
            value: 'Baise le cul de Ender'
          },
          {
            name: ':wrench:***Information sur la modération***:wrench:',
            value: 'Baise le cul de Never'
          }],
          timestamp: new Date(),
          footer: {
            icon_url: client.user.avatarURL,
            text: 'Par Le Bot De La Faction Neustria',
          }
        }});   
      }

    if (args[0].toLowerCase() === prefix + "vc") {
        let gcounter = 0
        let quantity = args[1];
        let items = args[2];
        let paiement = args[3];
        let namec = message.author.username;
        let dm = message.author.id;
        
        if (!quantity,!items,!paiement){
          message.channel.bulkDelete(parseInt(0) + 1)
          message.channel.send({embed: {
            color: 9830405,
            author: {
              name: client.user.username,
              icon_url: client.user.avatarURL
            },
            title: '**⚙Erreur sur la commande**',
            description: '',
            fields:[{
              name: '***Veuillez respectez l\'écriture de la commande.***',
              value: '!vc [Quantité] [Objet de la commande] [Moyen de paiement]\nVous pouvez aussi utiliser les émoticones correspondant à votre commande'
            },
            {
              name: '***:warning: Attention si vos réponses contiennent des espaces remplacer les par _ comme dans l\'exemple ci-dessous***',
              value: '!vc 2 dc Hell sickle vanadium :x: \n!vc 2_dc Hell_Sickle Vanadium :white_check_mark:'
            }],
            timestamp: new Date(),
            footer: {
              icon_url: client.user.avatarURL,
              text: 'Par ⚡NeustriaBot⚡ || By Crisppy 💚',
            }
          }});
        }
        if (quantity,items,paiement) {
          var gro = client.channels.get('525351149952565248');
          message.channel.bulkDelete(parseInt(0) + 1)        
                  gro.send({embed: {
                    color: 1547008,
                    author: {
                      name: client.user.username,
                      icon_url: client.user.avatarURL
                    },
                    title: '**:⚙Confirmation de la commande**',
                    description: '',
                    fields:[{
                      name: `***Bonjour ${message.author.username}, votre commande de ${quantity} ${items} est prise en compte***`,
                      value: 'Si il y a un problème dans votre commande, merci d\'avertir un administrateur rapidement'
                    }],
                    timestamp: new Date(),
                    footer: {
                      icon_url: client.user.avatarURL,
                      text: 'Par ⚡NeustriaBot⚡ || By Crisppy 💚',
                    }
                  }});
                    var robby = client.channels.get('546354572701073419');
                    gcounter++;
                    robby.send({embed: {
                      color: 23983,
                      author: {
                        name: client.user.username,
                        icon_url: client.user.avatarURL
                      },
                      title: '**Demande de commande n°**'+ gcounter,
                      description: '',
                      fields:[{
                        name: `***Bonjour ${message.author.username}, Souhaite commander ${quantity} ${items} et son moyen de paiement est le ${paiement}.***`,
                        value: 'Les réactions suivantes servent à accepter,refuser ou prévenir de la préparation d\'une commande'
                      }],
                      timestamp: new Date(),
                      footer: {
                        icon_url: client.user.avatarURL,
                        text: 'Par ⚡NeustriaBot⚡ || By Crisppy 💚',
                      }
                    }})
                    .then(message => {
                      message.react('✔')
                      message.react('❌')
                      message.react('🕑')
                      // on attend l'event d'ajout d'une réaction
                      client.on('messageReactionAdd', (reaction, user) => {
                        if (reaction.emoji.name === '✔' && user.id !== client.user.id) {
                            client.users.get(dm).send({embed: {
                              color: 1547008,
                              author: {
                                name: client.user.username,
                                icon_url: client.user.avatarURL
                              },
                              title: '**Validation de votre commande.**',
                              description: '',
                              fields:[{
                                name: `***Bonjour ${namec}, j'ai le plaisir de vous annoncez que votre commande de ${quantity} ${items} est terminé.***`,
                                value: 'Pour procéder au paiement, veuillez contactez un administrateur ou un modérateur de la faction\n:warning: Vous avez 48 heures après récéption de ce message pour contacter un responsable de la faction,le cas échéant votre commande sera annulé'
                              }],
                              timestamp: new Date(),
                              footer: {
                                icon_url: client.user.avatarURL,
                                text: 'Par ⚡NeustriaBot⚡ || By Crisppy 💚',
                              }
                            }});
                            message.channel.bulkDelete(parseInt(0) + 1)
                          }

                        if (reaction.emoji.name === '🕑' && user.id !== client.user.id) {
                            client.users.get(dm).send({embed: {
                              color: 23983,
                              author: {
                                name: client.user.username,
                                icon_url: client.user.avatarURL
                              },
                              title: '**Commande en cours.**',
                              description: '',
                              fields:[{
                                name: `***Bonjour ${namec}, j'ai le plaisir de vous annoncez que votre commande de ${quantity} ${items} est en cours de préparation.***`,
                                value: 'Je vous recontacterai pour vous avertir lorsque votre commande sera terminé'
                              }],
                              timestamp: new Date(),
                              footer: {
                                icon_url: client.user.avatarURL,
                                text: 'Par ⚡NeustriaBot⚡ || By Crisppy 💚',
                              }
                            }});
                          }
                          
                        if (reaction.emoji.name === '❌' && user.id !== client.user.id) {
                            client.users.get(dm).send({embed: {
                              color: 9830405,
                              author: {
                                name: client.user.username,
                                icon_url: client.user.avatarURL
                              },
                              title: '**Refus de votre commande.**',
                              description: '',
                              fields:[{
                                name: `***Bonjour ${namec}, j'ai le malheur de vous annoncez que votre commande de ${quantity} ${items} est refusé.***`,
                                value: 'Pour avoir de plus amples infomation suite à votre refus veuillez contactez un administrateur ou un modérateur de la faction'
                              }],
                              timestamp: new Date(),
                              footer: {
                                icon_url: client.user.avatarURL,
                                text: 'Par ⚡NeustriaBot⚡ || By Crisppy 💚',
                              }
                            }});
                            message.channel.bulkDelete(parseInt(0) + 1)
                          }
                          

                        })

                      })
                    }
                  }
              })
