import React from 'react'
import Square from "./Square";

function Board (props) {
  let {
    layout, squareWidth, scale, handleClickChess, currentChessIndex,
    ableReceiveIndices, history, winnerSide,handleMoveChess
  } = props
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
                    handleClickChess={handleClickChess}
                    index={[rowIndex, columnIndex]}
                    currentChessIndex={currentChessIndex}
                    layout={layout}
                    ableReceiveIndices={ableReceiveIndices}
                    history={history}
                    winnerSide={winnerSide}
                    handleMoveChess={handleMoveChess}
            />
          ))
        })
      }
    </div>)
}

export default Board