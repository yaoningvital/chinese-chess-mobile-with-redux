import React from 'react'
import Square from "./Square";

function Board (props) {
  let {layout, squareWidth, scale} = props
  return (
    <div className="board" style={{
      width: scale * 100 + '%'
    }}>
      {
        layout.map((rowArray, rowIndex) => {
          return rowArray.map((chessItem, columnIndex) => (
            <Square key={columnIndex}
                    data={chessItem}
                    squareWidth={squareWidth}
            />
          ))
        })
      }
    </div>)
}

export default Board