import React from 'react';
import '../index.css';

function Square(props) {
  return (
    <div className="square"    onMouseDown={(e) => props.onMouseDown(e)}
                               onMouseUp={(e) => props.onMouseUp(e)}
                               onContextMenu={(e) =>props.onContextMenu(e)}
                               onMouseEnter={(e) =>props.onMouseEnter(e)}
                               onMouseOut={(e) => props.onMouseOut(e)}
    >
      {props.value}
    </div>
  );
}

class BoardEdit extends React.Component {
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
  renderBoardRows() {
    let wid = Number(this.props.solWidth);
    let hgt = Number(this.props.solHeight);
    let page = [];

    for(let j =0; j<hgt; j++) {
        page.push(
            <div key={j.toString()} className="board-row">
              {
                Array(wid).fill(0).map((e, i) => { return this.renderSquare(i+wid*j); })
              }
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
      sol:  props.solution || Array(100).fill(null),
      solWidth: props.solutionWidth || 10,
      solHeight: props.solutionHeight || 10,
      editGridSet: false
    };
  }

  handleMouseDown(e,i) {
    e.preventDefault();
    const squares = this.state.sol.slice();

    var vals = [null, "\u2B1B"]; // null, square

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
        sol: squares,
        test: true
    });
    this.props.callbackParent(squares);
  }


  handleMouseEnter(e,i) {
    e.preventDefault();
    if(this.state.test) {
      this.handleMouseDown(e,i);
    }
  }

  handleMouseUp(e,i) {
    e.preventDefault();
    this.setState({
        test: false
    });
  }

  handleRightClick(e,i) {
    e.preventDefault();
  }


  componentWillReceiveProps(nextProps) {
      if (nextProps.solutionWidth && nextProps.solutionHeight) {
          if ((Number(nextProps.solutionWidth) !== Number(this.state.solWidth)) ||
              (Number(nextProps.solutionHeight) !== Number(this.state.solHeight))) {

              if (nextProps.editGrid === 'new') {
                  this.setState({
                      sol: Array(Number(nextProps.solutionWidth) * Number(nextProps.solutionHeight)).fill(null)
                  });
              } else {

                  if (this.state.editGridSet) {
                      this.setState({
                          sol: Array(Number(nextProps.solutionWidth) * Number(nextProps.solutionHeight)).fill(null)
                      });

                  } else {
                      this.setState({
                          sol: nextProps.solution.map((i) => {
                              return i ? "\u2B1B" : null
                          }),
                          editGridSet: true
                      });

                  }
              }

          } else {
              if (nextProps.editGrid === 'edit') {
                  this.setState({
                      sol: nextProps.solution.map((i) => {
                          return i ? "\u2B1B" : null
                      })
                  });
              }
          }

          this.setState({
              solWidth: nextProps.solutionWidth,
              solHeight: nextProps.solutionHeight,
          });
      }

      if (this.state.sol.length === 0) {
          this.setState({
              sol: Array(100).fill(null)
          });

      }

  }
  render() {
    return (
      <div className="container">

      <div className="game gameboardedit">
        <div>
          <BoardEdit key={'boardedit'}
            squares={this.state.sol}
            solWidth={this.props.solutionWidth} solHeight={this.props.solutionHeight}
            onMouseDown={(e,i) => this.handleMouseDown(e,i)}
            onMouseUp={(e,i) => this.handleMouseUp(e,i)}
            onContextMenu={(e,i) => this.handleRightClick(e,i)}
            onMouseEnter={(e,i) => this.handleMouseEnter(e,i)}
            onMouseOut={(e,i) => this.handleMouseUp(e,i)}
          />
        </div>
        </div>
        </div>
    );
  }
}

export default GameEdit;
