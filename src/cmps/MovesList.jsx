import React from 'react'

export function MovesList({ moves }) {
   if (!moves || moves.length === 0) return <div>Loading</div>
   return (
      <div className="moves-list">
         {moves.map(move => (
            <div className="move" key={Math.random()}>
               <p>To:{move.to}</p>
               <p>At:{move.at}</p>
               <p>Amount:{move.amount} coins</p>
            </div>
         ))}
      </div>
   )
}
