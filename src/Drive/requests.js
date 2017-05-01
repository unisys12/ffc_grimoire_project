const google = require('googleapis')
const sheet = google.sheets('v4')
require('dotenv').config()

let Request = (()=>{

  let themeSheetRequest = {
    // The spreadsheet to request.
    spreadsheetId: process.env.SHEET_ID,

    // The ranges to retrieve from the spreadsheet.
    ranges: [],

    // True if grid data should be returned.
    // This parameter is ignored if a field mask was set in the request.
    includeGridData: false,

    key: process.env.SHEETS_KEY
  }

  let themeBaseData = (sheet, data)=>{      
    let request = {
      spreadsheetId: process.env.SHEET_ID,
     "range": sheet + '!A2:E2',
      majorDimension: "ROWS",
      values: [
      data
      ]
    }

    return request
  }

  let sheetEntry = (state)=>{
    let resource = {
      // Passes properties that can be alter when creating a new sheet
      resource: {
        properties: {
          title: state
        }
      },
      auth: ''// auth method
    }

    return resource
  }

  return {

    /**
     * Used to retrieve current themed grimoire sheet to check state
     */
    themeSheetState: ()=>{
      sheet.spreadsheets.get(themeSheetRequest, (err, res)=>{
      if(err){
        console.log("Error Fetch Sheet from Google Drive: ", err)
        return
      }
      return res
      })
    },

    themeSheetUpdateBase: (tab, data)=>{
      sheet.spreadsheets.values.append(themeBaseData(tab, data), (err, res)=>{
        if(err){
          console.log("Error appending data to Themed Base Sheet... ", err)
        }

        return res
      })
    },

    createThemeSheet: (state)=>{      
      sheet.spreadsheets.create(sheetEntry(state), (err, res)=>{
        if(err){
          console.log("Error creating new themed sheet: ", err)
        }
        return res
      })
    }

  }

})()

export default Request