const Axios = require('axios')

let Ishtar = (()=> {

    return {

        allCards: ()=> {
            return Axios('http://api.ishtar-collective.net/cards/')
        },

        getNextCard: (string)=> {
            return Axios('http://api.ishtar-collective.net/cards/page/' + string)
        },

        getItems: (string)=> {
            return Axios('http://api.ishtar-collective.net/items/' + string)
        },

        getNextItem: (string)=> {
          return Axios('http://api.ishtar-collective.net/cards/item/' + string)
        }
    }

})()

module.exports = Ishtar