import { Divider } from '@mui/material'
import React from 'react'

export function MovesList({ moves }) {
   if (!moves || moves.length === 0) return <div>No moves yet</div>
   return (
      <div className="moves-list">
         <h2>Your {moves.length} moves:</h2>
         {moves.map(move => (
            <div className="move" key={Math.random()}>
               <p>To: {move.to}</p>
               <p>At: {move.at}</p>
               <p>Amount: {move.amount} coins</p>
               <Divider />
            </div>
         ))}
      </div>
   )
}
