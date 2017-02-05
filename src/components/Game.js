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
}function HeadBlock(props) {
  return (
    <button className="headBlock" >
    </button>
  );
}

class Board extends React.Component {
  renderSquare(i) {
    const squares = this.props.squares;
    return <Square value={squares[i]}
                   onClick={(e) => this.props.onClick(e,i)}
                   onContextMenu={(e) => this.props.onContextMenu(e,i)} />;
  }
  renderHeadRow(i) {
    // const squares = this.props.squares;
    return <HeadRow value={i} />;
  }
    renderHeadCol(i) {
    // const squares = this.props.squares;
    return <HeadCol value={i} />;
  }
      renderHeadBlock(i) {
    // const squares = this.props.squares;
    return <HeadBlock value={i} />;
  }
  render() {
    return (
      <div>

        <div className="board-row">
          {this.renderHeadBlock(0)}
          {this.renderHeadCol(0)}
          {this.renderHeadCol(1)}
          {this.renderHeadCol(2)}
          {this.renderHeadCol(3)}
          {this.renderHeadCol(4)}
        </div>

        <div className="board-row">
          {this.renderHeadRow(0)}
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
          {this.renderSquare(3)}
          {this.renderSquare(4)}
        </div>
        <div className="board-row">
           {this.renderHeadRow(0)}
         {this.renderSquare(5)}
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
          {this.renderSquare(9)}
        </div>
        <div className="board-row">
          {this.renderHeadRow([2,2])}
          {this.renderSquare(10)}
           {this.renderSquare(11)}
          {this.renderSquare(12)}
          {this.renderSquare(13)}
          {this.renderSquare(14)}
      </div>
        <div className="board-row">
          {this.renderHeadRow(0)}
           {this.renderSquare(15)}
           {this.renderSquare(16)}
          {this.renderSquare(17)}
          {this.renderSquare(18)}
          {this.renderSquare(19)}
   </div>
        <div className="board-row">
           {this.renderHeadRow(0)}
          {this.renderSquare(20)}
           {this.renderSquare(21)}
          {this.renderSquare(22)}
          {this.renderSquare(23)}
          {this.renderSquare(24)}
   </div>
      </div>
    );
  }
}

class Game extends React.Component {
  constructor() {
    super();
    this.state = {
      history: [{
        squares: Array(25).fill(null),
      }],
      stepNumber: 0,
      xIsNext: true,
      sol:  [0,0,0,0,0,
             0,0,0,0,0,
             1,1,0,1,1,
             0,0,0,0,0,
             0,0,0,0,0],
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
          <Board
            squares={current.squares}
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

ReactDOM.render(
  <Game />,
  document.getElementById('container')
);

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
