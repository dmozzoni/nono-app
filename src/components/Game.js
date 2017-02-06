import React from 'react';
import '../index.css';

function Square(props) {
  return (
    <button className="square" onClick={(e) => props.onClick(e)}
                               onContextMenu={(e) =>props.onContextMenu(e)} >
      {props.value}
    </button>
  );
}

function HeadRow(props) {
  return (
    <button className="headRow" >
      {props.value}
    </button>
  );
}
function HeadCol(props) {
  return (
    <button className="headCol" >
      {props.value}
    </button>
  );
}
function HeadBlock(props) {
  return (
    <button className="headBlock" >
    </button>
  );
}

class Board extends React.Component {
  renderSquare(i) {
    const squares = this.props.squares;
    return <Square key={i.toString()} value={squares[i]}
                   onClick={(e) => this.props.onClick(e,i)}
                   onContextMenu={(e) => this.props.onContextMenu(e,i)} />;
  }
  renderHeadRow(j,i) {
    // const squares = this.props.squares;
    return <HeadRow key={j.toString()} value={i} />;
  }
    renderHeadCol(j,i) {
    // const squares = this.props.squares;
    return <HeadCol key={j.toString()} value={i} />;
  }
      renderHeadBlock(i) {
    // const squares = this.props.squares;
    return <HeadBlock value={i} />;
  }



renderBoardRows() {
  let wid = this.props.solWidth;
  let col = this.props.solCol;
  let row = this.props.solRow;
  let page = [];

  for(let j =0; j<wid; j++) {
      page.push(
          <div key={j.toString()} className="board-row">
            {this.renderHeadRow(j,row[j])}
            {Array(wid).join().split(',').map((e, i) => { return this.renderSquare(i+wid*j); })}
          </div>
        )
      }
return page;
}


  render() {
    let wid = this.props.solWidth;
    let col = this.props.solCol;
    let row = this.props.solRow;
    return (
      <div>
        <div className="board-row">
          {this.renderHeadBlock(0)}
          {Array(wid).join().split(',').map((e, i) => { return this.renderHeadCol(i,col[i]); })}
        </div>

        {this.renderBoardRows()}

      </div>
    );
  }
}

class Game extends React.Component {
  constructor() {
    super();
    this.state = {
      history: [{
        squares: Array(36).fill(null),
      }],
      stepNumber: 0,
      xIsNext: true,
      sol:  [0,0,0,0,0,0,
             0,0,0,0,0,0,
             1,1,0,1,1,0,
             0,0,0,0,0,0,
             0,0,0,0,0,0,
             0,0,0,0,0,0],
      solWidth: 6,
      solHeight: 6,
      solCol: [1,1,0,1,1,0],
      solRow: [0,0,[2,2],0,0,0]
    };
  }
  handleClick(e,i) {
    e.preventDefault();
    var history = this.state.history.slice(0, this.state.stepNumber + 1);
    var current = history[history.length - 1];
    const squares = current.squares.slice();
  //  alert(e.nativeEvent.which);

    var vals = [null, "\u2B1B", '\u00b7']; // null, square, dot

 // if (calculateWinner(squares) || squares[i]) {
 if (calculateWinner(squares, this.state.sol)) {
     return;
    }

    if(e.nativeEvent.which === 1) {
      switch (squares[i]) {
    case vals[0]:
        squares[i] = vals[1];
          break;
    case vals[1]:
        squares[i] = vals[2];
          break;
    case vals[2]:
        squares[i] = vals[0];
          break;
    default:
  }
    } else {
          switch (squares[i]) {
    case vals[0]:
        squares[i] = vals[2];
          break;
    case vals[1]:
        squares[i] = vals[0];
          break;
    case vals[2]:
        squares[i] = vals[1];
          break;
    default:
  }
  }

 //   squares[i] = this.state.xIsNext ? "\u2B1B" : '\u00b7';

    this.setState({
      history: history.concat([{
        squares: squares
      }]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
    });
  }
  jumpTo(step) {
    this.setState({
      stepNumber: step,
      // xIsNext: (step % 2) ? false : true,
    });
  }
  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];

    const winner = calculateWinner(current.squares, this.state.sol);
    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : '.');
    }

    const moves = history.map((step, move) => {
      const desc = move ?
        'Move #' + move :
        'Game start';
      return (
        <li key={move}>
          <a href="#" onClick={() => this.jumpTo(move)}>{desc}</a>
        </li>
      );
    });

    return (
      <div className="game">
        <div>
          <Board key={'board'}
            squares={current.squares} solWidth={this.state.solWidth}
            solCol={this.state.solCol} solRow={this.state.solRow}
            onClick={(e,i) => this.handleClick(e,i)}
            onContextMenu={(e,i) => this.handleClick(e,i)}
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

// ReactDOM.render(
//   <Game />,
//   document.getElementById('container')
// );

function calculateWinner(squares, sol) {

  console.log(sol);
  console.log(squares);

  for (var i=0; i<sol.length; i++) {

    if ((sol[i] === 1 && squares[i] !== '\u2B1B') || (sol[i] === 0 && !(squares[i] === null || squares[i] === '\u00b7'))) {

      console.log('mismatch at', i);
      return null;
    }
  }

  console.log('Win')

  return 'Win';
}

export default Game
