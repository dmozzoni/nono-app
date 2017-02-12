import React from 'react';
import '../index.css';

function Square(props) {
  return (
    <div className="square"    onMouseDown={(e) => props.onMouseDown(e)}
                               onMouseUp={(e) => props.onMouseUp(e)}
                               onContextMenu={(e) => props.onContextMenu(e)}
                               onMouseEnter={(e) => props.onMouseEnter(e)}
                               onMouseOut={(e) => props.onMouseOut(e)}

    >
      {props.value}
    </div>
  );
}



function HeadRow(props) {
  const divStyle = {
    "width": (30*props.width).toString()+'px'
  };
  return (
    <button style={divStyle} className="headRow" >
      {props.value.replace(/,/g,' ')}
    </button>
  );
}
function HeadCol(props) {
  const divStyle = {
    "height": (30*props.height).toString()+'px'
  };
  return (
    <button style={divStyle} className="headCol" >
      <p className='rottxt'>{props.value.replace(/,/g,' ')}</p>
    </button>
  );
}
function HeadBlock(props) {
  const divStyle = {
    "height": (30*props.height).toString()+'px',
    "width": (30*props.width).toString()+'px'
  };
  return (
    <button style={divStyle} className="headBlock" >
    </button>
  );
}

class Board extends React.Component {
  renderSquare(i) {
    const squares = this.props.squares;
         return <Square key={i.toString()} value={squares[i]}
                        onMouseDown={(e) => this.props.onMouseDown(e,i)}
                        onMouseUp={(e) => this.props.onMouseUp(e)}
                        onContextMenu={(e) => this.props.onContextMenu(e,i)}
                        onMouseEnter={(e) => this.props.onMouseEnter(e,i)}
                        onMouseOut={(e) => this.props.onMouseOut(e,i)}
      />
  }
  renderHeadRow(j,i) {
    return <HeadRow width={this.props.solRowMax} key={j.toString()} value={i.toString()} />;
  }
  renderHeadCol(j,i) {
    return <HeadCol height={this.props.solColMax} key={j.toString()} value={i.toString()} />;
  }
  renderHeadBlock(i) {
    return <HeadBlock width={this.props.solRowMax} height={this.props.solColMax} value={i} />;
  }
  renderBoardRows() {
    let wid = this.props.solWidth;
    let hgt = this.props.solHeight;
    let col = this.props.solCol;
    let row = this.props.solRow;
    let page = [];

    for(let j =0; j<hgt; j++) {
        page.push(
            <div key={j.toString()} className="board-row">
              {this.renderHeadRow(j,row[j])}
              {Array(wid).fill(0).map((e, i) => { return this.renderSquare(i+wid*j); })}
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
          {Array(wid).fill(0).map((e, i) => { return this.renderHeadCol(i,col[i]); })}
        </div>

        {this.renderBoardRows()}

      </div>
    );
  }
}

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [{
        squares: Array(props.solutionWidth*props.solutionHeight).fill(null),
      }],
      stepNumber: 0,
      sol:  props.solution,
      solWidth: props.solutionWidth,
      solHeight: props.solutionHeight,
      solCol: this.calcCols(props.solutionWidth,props.solutionHeight,props.solution),
      solRow: this.calcRows(props.solutionWidth,props.solutionHeight,props.solution),
      solColMax: Math.max(...this.calcCols(props.solutionWidth,props.solutionHeight,props.solution).map((i) => i.length).filter((i) => {return i!==undefined})),
      solRowMax: Math.max(...this.calcRows(props.solutionWidth,props.solutionHeight,props.solution).map((i) => i.length).filter((i) => {return i!==undefined})),
    };
  }


  handleMouseEnter(e,i) {
    e.preventDefault();
    if(this.state.test) {
      // console.log('enter and down');
      this.handleMouseDown(e,i);
    }else{
      // console.log('enter');
    }
  }
  handleMouseUp(e,i) {
    e.preventDefault();
    this.setState({
        test: false
    });
    // console.log('mouse up');
  }

  handleRightClick(e,i) {
    e.preventDefault();
    // console.log('mouse right');
  }



  handleMouseDown(e,i) {
    e.preventDefault();
    var history = this.state.history.slice(0, this.state.stepNumber + 1);
    var current = history[history.length - 1];
    const squares = current.squares.slice();

    var vals = [null, "\u2B1B", '\u00b7']; // null, square, dot

 // if (calculateWinner(squares) || squares[i]) {
    if (calculateWinner(squares, this.state.sol)) {
      return;
    }

// e.nativeEvent.witch --> Left click === 1, Right click === 3
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
} else if (e.nativeEvent.which === 3) {
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

    this.setState({
      history: history.concat([{
        squares: squares
      }]),
      stepNumber: history.length,
      test: true
    });
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      test: false
    });
  }



  calcCols(w,h,sol) {
    let a=[];
    let tmp;
    let col=[];

    for (let k = 0; k<w; k++) {
      sol.map((i,j)=>{if (j%w === k) return col.push(i)});
      tmp = col.join('').split('0').filter((i) => {return i!==''})
                .map( (i) => { return i.length });
      if (tmp.length === 0) {
        a.push(0);
      } else {
        a.push(  tmp  );
      }
      col = [];
    }
    return a;
  }


  calcRows(w,h,sol) {
     let a=[];
     let tmp;

     for (let k = 0; k<h; k++) {
       tmp = sol.slice(k*w,(k+1)*w)
                 .join('').split('0').filter((i) => {return i!==''})
                 .map( (i) => { return i.length })
       if (tmp.length === 0) {
         a.push(0)
       } else {
         a.push(  tmp  );
       }
     }
    return a;
   }

   showalertbox(status) {
     return (<div className="alert alert-success" role="alert">{status}</div>);
    }


  render() {

    const history = this.state.history;
    const current = history[this.state.stepNumber];

    const winner = calculateWinner(current.squares, this.state.sol);

    let status;
    let showalert;
    if (winner) {
      status = 'Congratulations! You solved this nonoGrid!';
      showalert = this.showalertbox(status);
    }

    const moves = history.map((step, move) => {
      const desc = move ?
        'Move #' + move :
        'Game start';
      return (
        <li key={move}>
          <a className="list-group-item" onClick={() => this.jumpTo(move)}>{desc}</a>
        </li>
      );
    });

    return (
      <div className="container">
        {showalert}
        <div className="row">
      <div className="game">
        <div>

          <Board key={'board'}
            squares={current.squares}
            solWidth={this.state.solWidth} solHeight={this.state.solHeight}
            solCol={this.state.solCol} solRow={this.state.solRow}
            solColMax={this.state.solColMax} solRowMax={this.state.solRowMax}
            onMouseDown={(e,i) => this.handleMouseDown(e,i)}
            onMouseUp={(e,i) => this.handleMouseUp(e,i)}
            onContextMenu={(e,i) => this.handleRightClick(e,i)}
            onMouseEnter={(e,i) => this.handleMouseEnter(e,i)}
            onMouseOut={(e,i) => this.handleMouseUp(e,i)}
          />

        </div>
        <div className="panel panel-primary pansize">
          <div className="panel-heading panscrollheader">Undo List</div>
          <div className="panel-body panscroll">
            <ol className="panli">{moves.reverse()}</ol>
          </div>
        </div>
      </div>
    </div>
  </div>
    );
  }
}

// ========================================

function calculateWinner(squares, sol) {

  // console.log(sol);
  // console.log(squares);

  for (var i=0; i<sol.length; i++) {
    if ((sol[i] === 1 && squares[i] !== '\u2B1B') || (sol[i] === 0 && !(squares[i] === null || squares[i] === '\u00b7'))) {
      // console.log('mismatch at', i);
      return null;
    }
  }
  // console.log('Win');
  return 'Win';
}

export default Game
