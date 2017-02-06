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

class BoardEdit extends React.Component {
  renderSquare(i) {
    const squares = this.props.squares;
    return <Square key={i.toString()} value={squares[i]}
                   onClick={(e) => this.props.onClick(e,i)}
                   onContextMenu={(e) => this.props.onContextMenu(e,i)} />;
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
  constructor() {
    super();
    this.state = {
      sol: Array(100).fill(null),
      solWidth: 10,
      solHeight: 10,
    };
  }




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
  }

  render() {

    return (
      <div className="game">
        <div>
          <BoardEdit key={'boardedit'}
            squares={this.state.sol}
            solWidth={this.state.solWidth} solHeight={this.state.solHeight}
            onClick={(e,i) => this.handleClick(e,i)}
            onContextMenu={(e,i) => this.handleClick(e,i)}
          />
        </div>
      </div>
    );
  }
}


export default GameEdit
