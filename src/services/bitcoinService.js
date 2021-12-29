import axios from 'axios'
import { storageService } from './storageService'

export const bitcoinService = {
   getRate,
   getMarketPrice,
   getConfirmedTransactions
}

const STORAGE_KEY = 'btcRate'

// getRate(1000)
async function getRate(coins) {
   const url = `https://blockchain.info/tobtc?currency=USD&value=${coins}`
   try {
      let btc = storageService.load(STORAGE_KEY)
      if (btc) return btc
      else {
         const res = await axios.get(url)
         storageService.store(STORAGE_KEY, res.data)
         return res.data
      }
   } catch (err) {
      console.log(err)
   }
}

async function getMarketPrice() {
   const url = `https://api.blockchain.info/charts/market-price?timespan=1months&format=json&cors=true`
   try {
      const res = await axios.get(url)
      return res.data.values
   } catch (err) {
      console.log(err)
   }
}

async function getConfirmedTransactions() {
   const url = `https://api.blockchain.info/charts/avg-block-size?timespan=5months&format=json&cors=true`
   try {
      const res = await axios.get(url)
      return res.data.values
   } catch (err) {
      console.log(err)
   }
}
