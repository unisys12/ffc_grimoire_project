const Ishtar = require('./Ishtar/grimoire_call.js')
const fs = require('fs')

async function fetchGrimiore() {

  let init
  let next
  let data = []
  let cards = []

  try {
      
    init = await Ishtar.allCards()
    for (var i = 0; i < init.data.meta.total_pages; i++) {
      data.push(await Ishtar.getNextCard(i))
      console.log(`Getting batch ${i+1} of cards: `)
    }

    data.forEach(function(element) {
      element.data.grimoire_cards.map((x)=>{
        cards.push(x)
      })
    }, this);

  } catch (error) {
    console.log("Error Fetch Grimoire: ", error)
  }

  if (cards.length < 0) {
    return
  }else{
    // Open file and push in the results
    cards.map((x)=>{
       fs.writeFile('grimoire.csv',
          x._id, 
          x.name,
          x.ishtar_url,
          x.intro,
          x.intro_attribution,
          x.description,
          x.image_url,
          x.categories
       , function (err) {
            if (err) throw err;
            console.log('It\'s saved! in same location.');
        });
    })
  }

}

fetchDB()