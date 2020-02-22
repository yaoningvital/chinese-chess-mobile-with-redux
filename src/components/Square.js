import React from 'react'

function Square (props) {
  let {data, squareWidth} = props
  let chessColor = '#9a1f00'
  if (data && data.side === 1) {
    chessColor = '#242223'
  }
  // let boxShadow = '0px 2px 4px 2px rgba(0, 0, 0, 0.4)'
  
  return (
    <div className="square" style={{
      width: squareWidth + 'px',
      height: squareWidth + 'px',
    }}>
      {
        data &&
        <button className="chess" style={{
          width: squareWidth * 0.9 + 'px',
          height: squareWidth * 0.9 + 'px',
          borderRadius: squareWidth * 0.9 + 'px',
          fontSize: squareWidth / 2 + 'px',
          color: chessColor,
          backgroundSize: `${squareWidth * 0.9}px  ${squareWidth * 0.9}px`,
          // boxShadow: boxShadow,
        }}>
          {data.name}
        </button>
      }
    </div>
  )
}

export default Square