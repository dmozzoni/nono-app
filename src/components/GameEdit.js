import React from 'react';
import '../index.css';

function Square(props) {
  return (
    <div className="square" onClick={(e) => props.onClick(e)}
                               onContextMenu={(e) =>props.onContextMenu(e)}
                               onDragEnter={(e) =>props.onDragEnter(e)}
 >
      {props.value}
    </div>
  );
}

class BoardEdit extends React.Component {
  renderSquare(i) {
    const squares = this.props.squares;
    return <Square key={i.toString()} value={squares[i]}
                   onClick={(e) => this.props.onClick(e,i)}
                   onContextMenu={(e) => this.props.onContextMenu(e,i)}
                   onDragEnter={(e) => this.props.onDragEnter(e,i)}
 />;
  }
  renderBoardRows() {
    let wid = this.props.solWidth;
    let page = [];

    for(let j =0; j<wid; j++) {
        page.push(
            <div key={j.toString()} className="board-row">
              {Array(wid).join().split(',').map((e, i) => { return this.renderSquare(i+wid*j); })}
            </div>
          )
    }
    return page;
  }

  render() {
    return (
      <div>
        {this.renderBoardRows()}
      </div>
    );
  }
}



class GameEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sol:  Array(100).fill(null),
      solWidth: 10,
      solHeight: 10,
    };
  }

resetState(){
  this.setState({
    sol:  this.props.solution,
    solWidth: this.props.solutionWidth,
    solHeight: this.props.solutionHeight,
  });
}

//
//
// class GameEdit extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       // sol: props.solution, //Array(100).fill(null),
//       // solWidth: props.solWidth ? props.solWidth : 10,
//       // solHeight: props.solHeight ? props.solHeight : 10
//       sol: Array(100).fill(null),
//       solWidth: props.solutionWidth,
//       solHeight: props.solutionHeight
//       // solWidth:  10,
//       // solHeight: 10
//     };
//   }
//

  // componentDidMount() {
  //   if (this.props.solution.length !== 0) {
  //     this.setState({
  //         sol: this.props.solution
  //     });
  //   }
  // }



  handleClick(e,i) {
    e.preventDefault();
    const squares = this.state.sol.slice();

    var vals = [null, "\u2B1B"]; // null, square, dot

    switch (squares[i]) {
      case vals[0]:
        squares[i] = vals[1];
          break;
      case vals[1]:
        squares[i] = vals[0];
          break;
      default:
    }

    this.setState({
        sol: squares
    });

    this.props.callbackParent(squares);

  }

  restoregrid() {
    this.setState({ sol: this.props.solution });
  }

  render() {




// this.resetState();
    return (
      <div className="game">


        <button
          className="btn btn-block btn-lgbtn-primary"
          type="button"
          disabled={this.props.inProgress}
          onClick={() => this.restoregrid}>
          Restore Grid
        </button>



        <div>
          <BoardEdit key={'boardedit'}
            squares={this.state.sol}
            solWidth={this.state.solWidth} solHeight={this.state.solHeight}
            onClick={(e,i) => this.handleClick(e,i)}
            onContextMenu={(e,i) => this.handleClick(e,i)}
            onDragEnter={(e,i) => this.handleClick(e,i)}
          />
        </div>
      </div>
    );
  }
}


export default GameEdit
