const Axios = require('axios')
const csvWriter = require('csv-write-stream')
const writer = csvWriter()
const fs = require('fs')
//import Drive from '../Drive/requests'
require('dotenv').config()

let axios = Axios.create({
  headers: {
    'X-API-KEY': process.env.X_API_KEY
  }
})

let Themed = (()=>{

  let init, Response, themeCollection

  let definitions = ()=>{
    return axios('http://www.bungie.net/Platform/Destiny/Vanguard/Grimoire/Definition/')
  }

  return {
    
    themeCollections: async ()=>{

      try {
        init = await definitions()
        Response = init.data.Response
        themeCollection = Response.themeCollection

        writer.pipe(fs.createWriteStream('dist/Examples/themedCards_themes.csv'))

        themeCollection.filter((x)=>{
          writer.write({
            "themeName": x.themeName,
            "card_height": x.highResolution.image.rect.height,
            "card_width": x.highResolution.image.rect.width,
            "card_url": x.highResolution.image.sheetPath
          })       
        })

        writer.end()

      } catch (err) {
        console.log('There was an error assembling the themes: ', err)
      }
    },

    pageCollections: async()=>{

      try {

        init = await definitions()
        Response = init.data.Response
        themeCollection = Response.themeCollection

        themeCollection.map((x)=>{
          writer.pipe(fs.createWriteStream(`dist/Examples/Pages/${ x.themeName }.csv`))
          x.pageCollection.map((y)=>{
            writer.write({
              "pageName": y.pageName,
              "image_height": y.highResolution.image.rect.height,
              "image_width": y.highResolution.image.rect.width,
              "image_url": y.highResolution.image.sheetPath
            })
          })
        })

        writer.end()
        
      } catch (err) {
        console.log('There was an error assembling the pageCollections: ', err)
      }

    },

    cardCollections: async()=>{

      try {
        
        init = await definitions()
        Response = init.data.Response
        themeCollection = Response.themeCollection

        themeCollection.map((x)=>{
          x.pageCollection.map((y)=>{
            writer.pipe(fs.createWriteStream(`dist/Examples/Cards/${ y.pageName }.csv`))
            y.cardCollection.map((z)=>{
              writer.write({
                "card_id": z.cardId,
                "card_name": z.cardName,
                "card_intro": z.cardIntro,
                "card_description": z.cardDescription,
                "unlock_text": z.unlockHowToText,
                "rarity": z.rarity,
                "points": z.points,
                "image_height": z.highResolution.image.rect.height,
                "image_width": z.highResolution.image.rect.width,
                "image_url": z.highResolution.image.sheetPath
              })
            })
          })
        })

        writer.end()

      } catch (err) {
        console.log('There was an error assembling the cardCollections: ', err)
      }

    }

  }

})()

module.exports = Themed