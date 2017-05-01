const Axios = require('axios')
const csvWriter = require('csv-write-stream')
const writer = csvWriter()
const fs = require('fs')
require('dotenv').config()

let Inventory = (()=>{

  let items = ()=>{

    return Axios('https://api.mlab.com/api/1/databases/heroku_6nc0xjkc/collections/destiny.manifest.en.DestinyInventoryItemDefinition?&apiKey=ShN1TAeW8nvttOxjQJlatqmXuQ8RIdVE')
  
  }

  return {

    getItems: async ()=>{

      try {

        let init = await items()

        writer.pipe(fs.createWriteStream('dist/Examples/Inventory/items.csv'))

        init.data.map((x)=>{
          writer.write({
            "id": x._id,
            "itemName": x.itemName,
            "item_description": x.itemDescription,
            "item_icon": x.icon,
            "action_name": x.actionName,
            "item_tier": x.tierTypeName,
            "item_type": x.itemTypeName,
            "item_subType": x.itemSubType,
            "class_type": x.classType,
            "special_item_type": x.specialItemType,
            "equippable": x.equippable,
            "questline_item_hash": x.questlineItemHash
          })
        })

        writer.end()

      } catch (err) {
        console.log('There was a problem generating the Inventory Items CSV: ', err)
      }

    }

  }

})()

module.exports = Inventory