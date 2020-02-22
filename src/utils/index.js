export const chessDefault = [
  [
    {side: 0, role: 'ju', name: '車'},
    {side: 0, role: 'ma', name: '馬'},
    {side: 0, role: 'xiang', name: '相'},
    {side: 0, role: 'shi', name: '仕'},
    {side: 0, role: 'jiang', name: '帥'},
    {side: 0, role: 'shi', name: '仕'},
    {side: 0, role: 'xiang', name: '相'},
    {side: 0, role: 'ma', name: '馬'},
    {side: 0, role: 'ju', name: '車'},
  ],
  [null, null, null, null, null, null, null, null, null],
  [
    null,
    {side: 0, role: 'pao', name: '炮'},
    null,
    null,
    null,
    null,
    null,
    {side: 0, role: 'pao', name: '炮'},
    null
  ],
  [
    {side: 0, role: 'bing', name: '兵'},
    null,
    {side: 0, role: 'bing', name: '兵'},
    null,
    {side: 0, role: 'bing', name: '兵'},
    null,
    {side: 0, role: 'bing', name: '兵'},
    null,
    {side: 0, role: 'bing', name: '兵'},
  ],
  [null, null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null, null],
  [
    {side: 1, role: 'bing', name: '卒'},
    null,
    {side: 1, role: 'bing', name: '卒'},
    null,
    {side: 1, role: 'bing', name: '卒'},
    null,
    {side: 1, role: 'bing', name: '卒'},
    null,
    {side: 1, role: 'bing', name: '卒'},
  ],
  [
    null,
    {side: 1, role: 'pao', name: '砲'},
    null,
    null,
    null,
    null,
    null,
    {side: 1, role: 'pao', name: '砲'},
    null
  ],
  [null, null, null, null, null, null, null, null, null],
  [
    {side: 1, role: 'ju', name: '車'},
    {side: 1, role: 'ma', name: '馬'},
    {side: 1, role: 'xiang', name: '象'},
    {side: 1, role: 'shi', name: '士'},
    {side: 1, role: 'jiang', name: '將'},
    {side: 1, role: 'shi', name: '士'},
    {side: 1, role: 'xiang', name: '象'},
    {side: 1, role: 'ma', name: '馬'},
    {side: 1, role: 'ju', name: '車'},
  ],
]


/**
 * 返回当前选中棋子的落子点
 * @param currentChessIndex : 当前选中棋子的坐标 [0,0]
 * @param chessData : 当前选中棋子的数据 {}
 * @param currentChesses : 当前棋子布局
 */
export function getAbleReceiveIndices (currentChessIndex, chessData, currentChesses) {
  let ableReceiveSquares = [] // 所有的落子点的坐标组成的数组 [[0,1],[1,2],...]
  let [currentRowIndex, currentColumnIndex] = currentChessIndex // 当前点击的棋子的坐标
  // 1、如果点击的是“兵”
  if (chessData.role === 'bing') {
    // 点击的是红色的“兵”
    if (chessData.side === 0) {
      if (currentRowIndex <= 4) { // 兵还没有过河
        for (let i = 4; i <= 5; i++) {
          for (let j = 0; j <= 8; j += 2) {
            if (i === currentRowIndex + 1 &&
              j === currentColumnIndex &&
              (
                currentChesses[i][j] === null ||   // 这个点为空
                currentChesses[i][j].side !== chessData.side  // 或者这个点上的棋子是 他方的棋子
              )
            ) { // 那么这个点是一个落子点
              ableReceiveSquares.push([i, j])
            }
          }
        }
      } else { // 兵已经过河
        for (let i = 5; i <= 9; i++) {
          for (let j = 0; j <= 8; j++) {
            if (
              (
                (i === currentRowIndex && Math.abs(j - currentColumnIndex) === 1) ||  // 与 点击的棋子 左右相邻的位置
                (i === currentRowIndex + 1 && j === currentColumnIndex) // 在 点击的棋子 前方的一个位置
              )
              &&
              (
                currentChesses[i][j] === null ||   // 这个点为空
                currentChesses[i][j].side !== chessData.side  // 或者这个点上的棋子是 他方的棋子
              )
            ) { // 那么这个点是一个落子点
              ableReceiveSquares.push([i, j])
            }
          }
        }
      }
      
    }
    // 点击的是黑色的“兵”
    else if (chessData.side === 1) {
      if (currentRowIndex >= 5) { // 兵还没有过河
        for (let i = 4; i <= 5; i++) {
          for (let j = 0; j <= 8; j += 2) {
            if (i === currentRowIndex - 1 &&
              j === currentColumnIndex &&  // 是它正前方的一个位置
              (
                currentChesses[i][j] === null ||   // 这个点为空
                currentChesses[i][j].side !== chessData.side  // 或者这个点上的棋子是 他方的棋子
              )
            ) { // 那么这个点是一个落子点
              ableReceiveSquares.push([i, j])
            }
          }
        }
      } else { // 兵已经过河
        for (let i = 0; i <= 4; i++) {
          for (let j = 0; j <= 8; j++) {
            if (
              (
                (i === currentRowIndex && Math.abs(j - currentColumnIndex) === 1) ||  // 与 点击的棋子 左右相邻的位置
                (i === currentRowIndex - 1 && j === currentColumnIndex) // 在 点击的棋子 前方的一个位置
              )
              &&
              (
                currentChesses[i][j] === null ||   // 这个点为空
                currentChesses[i][j].side !== chessData.side  // 或者这个点上的棋子是 他方的棋子
              )
            ) { // 那么这个点是一个落子点
              ableReceiveSquares.push([i, j])
            }
          }
        }
      }
    }
  }
  // 2、如果点击的是“炮”
  else if (chessData.role === 'pao') {
    let leftBridge = [] // 左边的桥点坐标
    let rightBridge = [] // 右边的桥点坐标
    let topBridge = [] // 上边的桥点坐标
    let bottomBridge = [] // 下边的桥点坐标
    // 找“炮”左边的 移落子点
    for (let j = currentColumnIndex - 1; j >= 0; j--) {
      if (currentChesses[currentRowIndex][j] === null) { // 向左移动一步，还在棋盘内 && 当前位置为空
        ableReceiveSquares.push([currentRowIndex, j])  // 那么这个点是 移落子点
      } else { // 向左移动一步的位置上，是一个棋子
        leftBridge = [currentRowIndex, j]
        break // 不用再往左边遍历了，再往左边的都不是 移落子点 了
      }
    }
    // 找“炮”右边的 移落子点
    for (let j = currentColumnIndex + 1; j <= 8; j++) {
      if (currentChesses[currentRowIndex][j] === null) { // 向右移动一步，还在棋盘内 && 当前位置为空
        ableReceiveSquares.push([currentRowIndex, j])  // 那么这个点是 移落子点
      } else { // 向右移动一步的位置上，是一个棋子
        rightBridge = [currentRowIndex, j]
        break // 不用再往右边遍历了，再往右边的都不是 移落子点 了
      }
    }
    // 找“炮”上边的 移落子点
    for (let i = currentRowIndex - 1; i >= 0; i--) {
      if (currentChesses[i][currentColumnIndex] === null) { // 向上移动一步的位置，为空
        ableReceiveSquares.push([i, currentColumnIndex]) // 那么这个点是 移落子点
      } else { // 向上移动一步的位置上，是一个棋子
        topBridge = [i, currentColumnIndex]
        break
      }
    }
    // 找“炮”下边的 移落子点
    for (let i = currentRowIndex + 1; i <= 9; i++) {
      if (currentChesses[i][currentColumnIndex] === null) { // 向下移动一步的位置，为空
        ableReceiveSquares.push([i, currentColumnIndex]) // 那么这个点是 移落子点
      } else { // 向下移动一步的位置上，是一个棋子
        bottomBridge = [i, currentColumnIndex]
        break
      }
    }
    
    // 找“炮”左边的 吃落子点
    if (leftBridge.length > 0) { // 如果有左边的桥点，才可能有左边的 吃落子点
      for (let j = leftBridge[1] - 1; j >= 0; j--) {
        if (currentChesses[currentRowIndex][j] !== null) { // 如果向左移动一步的位置，是一个棋子
          if (currentChesses[currentRowIndex][j].side !== chessData.side) {
            ableReceiveSquares.push([currentRowIndex, j])
          }
          break
        }
      }
    }
    // 找“炮”右边的 吃落子点
    if (rightBridge.length > 0) { // 如果有右边的桥点，才可能有右边的 吃落子点
      for (let j = rightBridge[1] + 1; j <= 8; j++) {
        if (currentChesses[currentRowIndex][j] !== null) { // 如果向右移动一步的位置，是一个棋子
          if (currentChesses[currentRowIndex][j].side !== chessData.side) {
            ableReceiveSquares.push([currentRowIndex, j])
          }
          break
        }
      }
    }
    // 找“炮”上边的 吃落子点
    if (topBridge.length > 0) { // 如果有上边的桥点，才可能有上边的 吃落子点
      for (let i = topBridge[0] - 1; i >= 0; i--) {
        if (currentChesses[i][currentColumnIndex] !== null) { // 如果向上移动一步的位置，是一个棋子
          if (currentChesses[i][currentColumnIndex].side !== chessData.side) {
            ableReceiveSquares.push([i, currentColumnIndex])
          }
          break
        }
      }
    }
    // 找“炮”下边的 吃落子点
    if (bottomBridge.length > 0) { // 如果有下边的桥点，才可能有下边的 吃落子点
      for (let i = bottomBridge[0] + 1; i <= 9; i++) {
        if (currentChesses[i][currentColumnIndex] !== null) { // 如果向下移动一步的位置，是一个棋子
          if (currentChesses[i][currentColumnIndex].side !== chessData.side) {
            ableReceiveSquares.push([i, currentColumnIndex])
          }
          break
        }
      }
    }
  }
  // 3、如果点击的是“车”
  else if (chessData.role === 'ju') {
    // 找“车”左边的 落子点
    for (let j = currentColumnIndex - 1; j >= 0; j--) {
      if (currentChesses[currentRowIndex][j] === null) { // 向左移动一步，还在棋盘内 && 当前位置为空
        ableReceiveSquares.push([currentRowIndex, j])  // 那么这个点是 移落子点
      } else { // 向左移动一步的位置上，是一个棋子
        if (currentChesses[currentRowIndex][j].side !== chessData.side) { // 是他方的棋子
          ableReceiveSquares.push([currentRowIndex, j])  // 那么这个点是 吃落子点
        }
        break // 不用再往左边遍历了，再往左边的都不是 落子点 了
      }
    }
    // 找“车”右边的 落子点
    for (let j = currentColumnIndex + 1; j <= 8; j++) {
      if (currentChesses[currentRowIndex][j] === null) { // 向右移动一步，还在棋盘内 && 当前位置为空
        ableReceiveSquares.push([currentRowIndex, j])  // 那么这个点是 移落子点
      } else { // 向右移动一步的位置上，是一个棋子
        if (currentChesses[currentRowIndex][j].side !== chessData.side) { // 是他方的棋子
          ableReceiveSquares.push([currentRowIndex, j])  // 那么这个点是 吃落子点
        }
        break // 不用再往右边遍历了，再往右边的都不是 落子点 了
      }
    }
    // 找“车”上边的 落子点
    for (let i = currentRowIndex - 1; i >= 0; i--) {
      if (currentChesses[i][currentColumnIndex] === null) { // 向上移动一步，还在棋盘内 && 当前位置为空
        ableReceiveSquares.push([i, currentColumnIndex])  // 那么这个点是 移落子点
      } else { // 向上移动一步的位置上，是一个棋子
        if (currentChesses[i][currentColumnIndex].side !== chessData.side) { // 是他方的棋子
          ableReceiveSquares.push([i, currentColumnIndex])  // 那么这个点是 吃落子点
        }
        break // 不用再往上边遍历了，再往上边的都不是 落子点 了
      }
    }
    // 找“车”下边的 落子点
    for (let i = currentRowIndex + 1; i <= 9; i++) {
      if (currentChesses[i][currentColumnIndex] === null) { // 向下移动一步，还在棋盘内 && 当前位置为空
        ableReceiveSquares.push([i, currentColumnIndex])  // 那么这个点是 移落子点
      } else { // 向下移动一步的位置上，是一个棋子
        if (currentChesses[i][currentColumnIndex].side !== chessData.side) { // 是他方的棋子
          ableReceiveSquares.push([i, currentColumnIndex])  // 那么这个点是 吃落子点
        }
        break // 不用再往下边遍历了，再往下边的都不是 落子点 了
      }
    }
  }
  // 4、如果点击的是“马”
  else if (chessData.role === 'ma') {
    let maybe = [] // 潜在的落子点位置 （最多8个）
    for (let i = 0; i <= 9; i++) {
      for (let j = 0; j <= 8; j++) {
        let rowD = i - currentRowIndex
        let columnD = j - currentColumnIndex
        if (
          (Math.abs(rowD) === 2 && Math.abs(columnD) === 1) ||
          (Math.abs(rowD) === 1 && Math.abs(columnD) === 2)
        ) {
          maybe.push([i, j])
        }
      }
    }
    for (let maybeItem of maybe) {
      if (
        (maybeItem[0] - currentRowIndex === -2) &&  // 这个潜在落子点 是在这个“马”北边的两个潜在落子点之一
        currentChesses[currentRowIndex - 1][currentColumnIndex] === null && // 这个“马”的正上方一个点是空格
        (
          currentChesses[maybeItem[0]][maybeItem[1]] === null ||
          currentChesses[maybeItem[0]][maybeItem[1]].side !== chessData.side
        )
      ) { // 那么这个潜在落子点 是 真正的落子点
        ableReceiveSquares.push(maybeItem)
      }
      if (
        (maybeItem[1] - currentColumnIndex === -2) && // 这个潜在落子点 是在这个“马”西边的两个潜在落子点之一
        currentChesses[currentRowIndex][currentColumnIndex - 1] === null && // 这个“马”的左边一个点是空格
        (
          currentChesses[maybeItem[0]][maybeItem[1]] === null ||
          currentChesses[maybeItem[0]][maybeItem[1]].side !== chessData.side
        )
      ) { // 那么这个潜在落子点 是 真正的落子点
        ableReceiveSquares.push(maybeItem)
      }
      if (
        (maybeItem[0] - currentRowIndex === 2) &&  // 这个潜在落子点 是在这个“马”南边的两个潜在落子点之一
        currentChesses[currentRowIndex + 1][currentColumnIndex] === null && // 这个“马”的正下方一个点是空格
        (
          currentChesses[maybeItem[0]][maybeItem[1]] === null ||
          currentChesses[maybeItem[0]][maybeItem[1]].side !== chessData.side
        )
      ) { // 那么这个潜在落子点 是 真正的落子点
        ableReceiveSquares.push(maybeItem)
      }
      if (
        (maybeItem[1] - currentColumnIndex === 2) && // 这个潜在落子点 是在这个“马”东边的两个潜在落子点之一
        currentChesses[currentRowIndex][currentColumnIndex + 1] === null && // 这个“马”的右边一个点是空格
        (
          currentChesses[maybeItem[0]][maybeItem[1]] === null ||
          currentChesses[maybeItem[0]][maybeItem[1]].side !== chessData.side
        )
      ) { // 那么这个潜在落子点 是 真正的落子点
        ableReceiveSquares.push(maybeItem)
      }
    }
  }
  // 5、如果点击的是“相”
  else if (chessData.role === 'xiang') {
    // 点击的是红色的“相”
    if (chessData.side === 0) {
      for (let i = 0; i <= 4; i += 2) {
        for (let j = 0; j <= 8; j += 2) {
          if (i - currentRowIndex === -2 && j - currentColumnIndex === -2 &&  // 当前点的 左上角 的潜在落子点
            currentChesses[currentRowIndex - 1][currentColumnIndex - 1] === null &&  // 这个“田”的中心点为空格
            (
              currentChesses[i][j] === null ||  // 这个潜在落子点的位置为空
              currentChesses[i][j].side !== chessData.side  // 这个位置的棋子为他方棋子
            )
          ) {
            ableReceiveSquares.push([i, j])
          }
          
          if (i - currentRowIndex === 2 && j - currentColumnIndex === -2 &&  // 当前点的 左下角 的潜在落子点
            currentChesses[currentRowIndex + 1][currentColumnIndex - 1] === null &&  // 这个“田”的中心点为空格
            (
              currentChesses[i][j] === null ||  // 这个潜在落子点的位置为空
              currentChesses[i][j].side !== chessData.side  // 这个位置的棋子为他方棋子
            )
          ) {
            ableReceiveSquares.push([i, j])
          }
          
          if (i - currentRowIndex === -2 && j - currentColumnIndex === 2 &&  // 当前点的 右上角 的潜在落子点
            currentChesses[currentRowIndex - 1][currentColumnIndex + 1] === null &&  // 这个“田”的中心点为空格
            (
              currentChesses[i][j] === null ||  // 这个潜在落子点的位置为空
              currentChesses[i][j].side !== chessData.side  // 这个位置的棋子为他方棋子
            )
          ) {
            ableReceiveSquares.push([i, j])
          }
          
          if (i - currentRowIndex === 2 && j - currentColumnIndex === 2 &&  // 当前点的 右下角 的潜在落子点
            currentChesses[currentRowIndex + 1][currentColumnIndex + 1] === null &&  // 这个“田”的中心点为空格
            (
              currentChesses[i][j] === null ||  // 这个潜在落子点的位置为空
              currentChesses[i][j].side !== chessData.side  // 这个位置的棋子为他方棋子
            )
          ) {
            ableReceiveSquares.push([i, j])
          }
        }
      }
      
    }
    // 点击的是黑色的“相”
    else {
      for (let i = 5; i <= 9; i += 2) {
        for (let j = 0; j <= 8; j += 2) {
          if (i - currentRowIndex === -2 && j - currentColumnIndex === -2 &&  // 当前点的 左上角 的潜在落子点
            currentChesses[currentRowIndex - 1][currentColumnIndex - 1] === null &&  // 这个“田”的中心点为空格
            (
              currentChesses[i][j] === null ||  // 这个潜在落子点的位置为空
              currentChesses[i][j].side !== chessData.side  // 这个位置的棋子为他方棋子
            )
          ) {
            ableReceiveSquares.push([i, j])
          }
          
          if (i - currentRowIndex === 2 && j - currentColumnIndex === -2 &&  // 当前点的 左下角 的潜在落子点
            currentChesses[currentRowIndex + 1][currentColumnIndex - 1] === null &&  // 这个“田”的中心点为空格
            (
              currentChesses[i][j] === null ||  // 这个潜在落子点的位置为空
              currentChesses[i][j].side !== chessData.side  // 这个位置的棋子为他方棋子
            )
          ) {
            ableReceiveSquares.push([i, j])
          }
          
          if (i - currentRowIndex === -2 && j - currentColumnIndex === 2 &&  // 当前点的 右上角 的潜在落子点
            currentChesses[currentRowIndex - 1][currentColumnIndex + 1] === null &&  // 这个“田”的中心点为空格
            (
              currentChesses[i][j] === null ||  // 这个潜在落子点的位置为空
              currentChesses[i][j].side !== chessData.side  // 这个位置的棋子为他方棋子
            )
          ) {
            ableReceiveSquares.push([i, j])
          }
          
          if (i - currentRowIndex === 2 && j - currentColumnIndex === 2 &&  // 当前点的 右下角 的潜在落子点
            currentChesses[currentRowIndex + 1][currentColumnIndex + 1] === null &&  // 这个“田”的中心点为空格
            (
              currentChesses[i][j] === null ||  // 这个潜在落子点的位置为空
              currentChesses[i][j].side !== chessData.side  // 这个位置的棋子为他方棋子
            )
          ) {
            ableReceiveSquares.push([i, j])
          }
        }
      }
    }
  }
  // 6、如果点击的是“士”
  else if (chessData.role === 'shi') {
    // 点击的是红色的“士”
    if (chessData.side === 0) {
      for (let i = 0; i <= 2; i++) {
        for (let j = 3; j <= 5; j++) {
          if (
            Math.abs(i - currentRowIndex) === 1 &&
            Math.abs(j - currentColumnIndex) === 1 &&
            (
              currentChesses[i][j] === null ||
              currentChesses[i][j].side !== chessData.side
            )
          ) {
            ableReceiveSquares.push([i, j])
          }
        }
      }
    }
    // 点击的是黑色的“士”
    else {
      for (let i = 7; i <= 9; i++) {
        for (let j = 3; j <= 5; j++) {
          if (
            Math.abs(i - currentRowIndex) === 1 &&
            Math.abs(j - currentColumnIndex) === 1 &&
            (
              currentChesses[i][j] === null ||
              currentChesses[i][j].side !== chessData.side
            )
          ) {
            ableReceiveSquares.push([i, j])
          }
        }
      }
    }
  }
  // 7、如果点击的是“将”
  else if (chessData.role === 'jiang') {
    // 点击的是红色的“将”
    if (chessData.side === 0) {
      for (let i = 0; i <= 2; i++) {
        for (let j = 3; j <= 5; j++) {
          if (
            (
              (Math.abs(i - currentRowIndex) === 1 && j === currentColumnIndex) ||
              (Math.abs(j - currentColumnIndex) === 1 && i === currentRowIndex)
            ) &&
            (
              currentChesses[i][j] === null ||
              currentChesses[i][j].side !== chessData.side
            )
          ) {
            ableReceiveSquares.push([i, j])
          }
        }
      }
    }
    // 点击的是黑色的“将”
    else {
      for (let i = 7; i <= 9; i++) {
        for (let j = 3; j <= 5; j++) {
          if (
            (
              (Math.abs(i - currentRowIndex) === 1 && j === currentColumnIndex) ||
              (Math.abs(j - currentColumnIndex) === 1 && i === currentRowIndex)
            ) &&
            (
              currentChesses[i][j] === null ||
              currentChesses[i][j].side !== chessData.side
            )
          ) {
            ableReceiveSquares.push([i, j])
          }
        }
      }
    }
  }
  return ableReceiveSquares
}

/**
 * 判断 要查询的这个点 是不是 所有落子点中的一个
 * @param ableReceiveIndices : 所有落子点的索引组成的数组 ([[0,1],[0,2],[0,3]...])
 * @param searchIndex : 查询的这个点的索引
 * @returns {boolean}
 */
export function isAbleReceiveOrNot (ableReceiveIndices, searchIndex) {
  let isAbleReceive = false
  for (let i = 0; i < ableReceiveIndices.length; i++) {
    if (ableReceiveIndices[i][0] === searchIndex[0] && ableReceiveIndices[i][1] === searchIndex[1]) {
      isAbleReceive = true
      break
    }
  }
  return isAbleReceive
}

// 返回当前方 的所有落子点
export function getAllAbleReceiveIndicesOfThisSide (currentSide, layout) {
  let allAbleReceiveIndices = []
  for (let i = 0; i < layout.length; i++) {
    for (let j = 0; j < layout[i].length; j++) {
      if (layout[i][j] && layout[i][j].side === currentSide) {
        let ableReceiveIndices = getAbleReceiveIndices([i, j], layout[i][j], layout)
        allAbleReceiveIndices = [...allAbleReceiveIndices, ...ableReceiveIndices]
      }
    }
  }
  return allAbleReceiveIndices
}