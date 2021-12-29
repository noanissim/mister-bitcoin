import React, { Component } from 'react'
import { bitcoinService } from '../../services/bitcoinService'
// import { Sparklines, SparklinesLine } from 'react-sparklines'
import { LineChart, Line, CartesianGrid, XAxis, YAxis } from 'recharts'
// const data2 = [
//    { name: 'Page A', uv: 400 },
//    { name: 'Page B', uv: 300 },
//    { name: 'Page c', uv: 500 }
// ]

export class StatisticPage extends Component {
   state = {
      data: null,
      data2: null
   }
   async componentDidMount() {
      const data = await bitcoinService.getMarketPrice()
      const newData = data.map(obj => {
         const value = {
            name: new Date(obj.x).getHours() + ':' + new Date(obj.x).getMinutes(),
            uv: obj.y
         }
         return value
      })
      this.setState({ data: newData })

      const data2 = await bitcoinService.getConfirmedTransactions()
      const newData2 = data2.map(obj => {
         const value = {
            name: new Date(obj.x).getHours() + ':' + new Date(obj.x).getMinutes(),
            uv: obj.y
         }
         return value
      })
      this.setState({ data2: newData2 })
   }

   render() {
      const { data, data2 } = this.state
      if (!data || !data2) return <div>Loading</div>
      return (
         <div className="statistic-page">
            <h1>Statistics:</h1>
            {/* <Sparklines data={[5, 10, 5, 20]}>
               <SparklinesLine color="blue" />
            </Sparklines> */}
            <h2>Market Price</h2>
            <LineChart width={600} height={300} data={data}>
               <Line type="monotone" dataKey="uv" stroke="#8884d8" />
               <CartesianGrid stroke="#ccc" />
               <XAxis dataKey="name" />
               <YAxis />
            </LineChart>
            <h2>The average block size in MB</h2>
            <LineChart width={600} height={300} data={data2}>
               <Line type="monotone" dataKey="uv" stroke="#8d5" />
               <CartesianGrid stroke="#ccc" />
               <XAxis dataKey="name" />
               <YAxis />
            </LineChart>
         </div>
      )
   }
}
