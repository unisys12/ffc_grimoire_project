require('babel-polyfill')
let Grimoire = require('./Ishtar/grimoire')

let cards = Grimoire.cards()

cards.then((res)=>{
  console.log(res)
}).catch((err)=>{
  console.log('ERROR', err)
})