require('babel-polyfill')
//const Grimoire = require('./Cards/grimoire')
const Themed = require('./Cards/themeGrimoire')
const Inventory = require('./Inventory')


/**
 * Example to generate Grimoire Cards CSV
 */
//let cards = Grimoire.cards()

/**
 * Example to generate Themed Grimoire CSV
 */
//let themes = Themed.themeCollections()

/**
 * Example to generate Grimoire Pages
 */
// let pages = Themed.pageCollections()

/**
 * Example to generate Grimoire Cards
 */
// let cards = Themed.cardCollections()

/**
 * Example to generate Inventory Item CSV
 */
let items = Inventory.getItems()
