const Axios = require('axios')
const csvWriter = require('csv-write-stream')
const writer = csvWriter()
const fs = require('fs')

let Grimoire = (()=>{

  let allCards = ()=> {
    return Axios('http://api.ishtar-collective.net/cards/')
  }

  let getNextCard = (string)=> {
    return Axios('http://api.ishtar-collective.net/cards/page/' + string)
  }

  let getItems = (string)=> {
    return Axios('http://api.ishtar-collective.net/items/' + string)
  }

  let getNextItem = (string)=> {
    return Axios('http://api.ishtar-collective.net/cards/item/' + string)
  }

  return {
    cards: async ()=>{
      let init
      let next
      let data = []
      let cards = []

      try {
          
        init = await allCards()

         for (var i = 0; i < init.data.meta.total_pages; i++) {
           data.push(await getNextCard(i))
           console.log(`Getting batch ${i+1} of cards: `)
         }

         data.forEach(function(element) {
           element.data.grimoire_cards.map((x)=>{
             cards.push(x)
           })
         }, this);

         if (cards.length < 0) {
           console.log("No Cards Downloaded...")
         }else{

           writer.pipe(fs.createWriteStream('cards.csv'))
           
           cards.map((x)=>{
             writer.write({
               "card_id": x.bungie_ref,
               "card_name": x.name,
               "card_url": x.ishtar_url,
               "card_intro": x.intro,
               "card_attribution": x.intro_attribution,
               "card_description": x.description,
               "image_url": x.full_image_url,
            })            
           })
           
        }

        } catch (error) {
          console.log("Error Fetching Grimoire: ", error)
        }
    }
  }

})()

module.exports = Grimoire