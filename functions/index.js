const functions = require('firebase-functions')
const axios = require('axios')
const cheerio = require('cheerio')

const selectors = [
    ...( // singular
        Array(7).fill('#content > div:nth-child(2) > table > tbody > tr:nth-child(A) > td:nth-child(2) > x').map((s, i) => s.replace('A', i + 2))
    ),
    ...( // plural
        Array(7).fill('#content > div:nth-child(2) > table > tbody > tr:nth-child(A) > td:nth-child(3) > x').map((s, i) => s.replace('A', i + 2))
    )
]

module.exports.getPersonalForm = functions.runWith({timeoutSeconds: 10}).https.onCall(async (data, context) => {
    
    try {
        const page = await axios.get(`https://prirucka.ujc.cas.cz/?slovo=${encodeURIComponent(data)}`)
        const $ = cheerio.load(page.data)
        const result = selectors.map(s => $(s).text().replace(/[0-9]/g, ''))
        const error = result.reduce((a, r) => !r || r === '' ? true : a, false)
        return error ? null : result
        // return { error, ...(error ? { result } : {}) }
    } catch (err) {
        return null
    }

})

