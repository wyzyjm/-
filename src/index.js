import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
/**
 * class 
 * React 方法
 * React
 *  .Component
 *  super()
 *  render(){}
 *  renderSquare(){}
 * ReatDOM 
 *  .render()
 */
// 一个button
// class Square extends React.Component {

//   // constructor(props) {
//   //   super(props)
//   //   this.state = {
//   //     value: null
//   //   }
//   // }

//   render() {
//     return (
//       //   添加事件
//       <button className="square" onClick={() => this.props.onClick()}>
//         {this.props.value}
//       </button>
//     );
//   }
// }
// 函数形式的button
function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  )
}

//   渲染了 9 个 button
class Board extends React.Component {
  //   引用组件
  renderSquare(i) {
    return (
      <Square
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
      />
    );
  }
  //   渲染组件
  render() {
    return (
      <div>
        {/* <div className="status">{this.props.status}</div> */}
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}


class Game extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      // 历史数据
      history: [
        {
          squares: Array(9).fill(null)
        }
      ],
      xIsNext: true, // 记录该谁走了
      stepNumber: 0, // 记录到第几步了
    }
  }
  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1); // 截取当前步 之前的历史记录
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      history: history.concat([{
        squares: squares,
      }]),
      xIsNext: !this.state.xIsNext,
      stepNumber:history.length
    });
  }
  // 
  jumpTo(index) {
    this.setState({
      stepNumber: index, // 重新设置第几步
      xIsNext: (index % 2) === 0 // 判断是否是偶数步
    })
  }
  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber]
    const winner = calculateWinner(current.squares)

    const moves = history.map((item, index) => {
      const desc = index ? 'Go to move' + index : 'Go to game start'; // 判断游戏是否开始
      return (
        <li key={index}>
          <button onClick={() => this.jumpTo(index)}>{desc}</button>
        </li>
      )
    })

    let status;
    if (winner) {
      status = 'Winner : ' + winner
    } else {
      status = 'Next player : ' + (this.state.xIsNext ? 'x' : 'o')
    }
    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}


// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
)


function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
