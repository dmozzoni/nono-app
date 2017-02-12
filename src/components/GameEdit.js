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
      // console.log(wid,hgt,j);
        page.push(
            <div key={j.toString()} className="board-row">
              {
                Array(wid).fill(0).map((e, i) => { return this.renderSquare(i+wid*j); })
              }
            </div>
          )
          // console.log(page);
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
      editGridSet: true,
      // size: 10
    };
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



  handleMouseDown(e,i) {
    e.preventDefault();
    // console.log(e);
    // if (e.nativeEvent.which === 3) return;
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
        sol: squares,
        test: true
    });
    this.props.callbackParent(squares);
    // console.log('mouse down with', e.nativeEvent.which);
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



  // componentWillReceiveProps(nextProps) {
  //   alert('willrecieve' + ' ' + this.state.editGridSet + ' ' + nextProps.editGrid)
  //   if (nextProps.editGrid === 'edit' && this.state.editGridSet) {
  //     this.setState({
  //       sol:  nextProps.solution,
  //       solWidth: nextProps.solutionWidth,
  //       solHeight: nextProps.solutionHeight,
  //       editGridSet: false
  //     });
  //   }
  // }


  componentWillReceiveProps(nextProps) {
          // alert('size ' + this.state.size + ' ' + nextProps.size + '\n'
          // +  'solwidth ' + this.state.solWidth + ' ' + nextProps.solutionWidth + '\n'
          // +  'solheight ' + this.state.solWidth + ' ' + nextProps.solutionWidth + '\n')
          // if (nextProps.editGrid === 'edit' && this.state.editGridSet) {


          // alert('size ' + this.state.solWidth + ' ' + nextProps.solutionWidth)
          if (nextProps.solutionWidth && nextProps.solutionHeight) {
              if ((Number(nextProps.solutionWidth) !== Number(this.state.solWidth)) ||
                  (Number(nextProps.solutionHeight) !== Number(this.state.solHeight))) {
                  //  alert('solwidth ' + this.state.solWidth + ' ' + nextProps.solutionWidth + '\n'
                  // +  'solheight ' + this.state.solWidth + ' ' + nextProps.solutionWidth + '\n')
                  if (nextProps.editGrid === 'new') {
                      this.setState({
                          sol: Array(Number(nextProps.solutionWidth) * Number(nextProps.solutionHeight)).fill(null)
                          // sol: nextProps.solution.map( (i) => { return i ? "\u2B1B":null })
                      });
                  } else {
                      this.setState({
                          // sol: Array(Number(nextProps.solutionWidth)*Number(nextProps.solutionHeight)).fill(null)
                          sol: nextProps.solution.map((i) => {
                              return i ? "\u2B1B" : null
                          })
                      });
                  }

              } else {
                if (nextProps.editGrid === 'edit') {
                  this.setState({
                      // sol: Array(Number(nextProps.solutionWidth)*Number(nextProps.solutionHeight)).fill(null)
                      sol: nextProps.solution.map((i) => {
                          return i ? "\u2B1B" : null
                      })
                  });
                }

              }

              this.setState({
                  // size:  Number(nextProps.size),
                  solWidth: nextProps.solutionWidth,
                  solHeight: nextProps.solutionHeight,
                  // editGridSet: false
              });
          }
          if (this.state.sol.length === 0) {
            this.setState({
                sol: Array(100).fill(null)
                // sol: nextProps.solution.map( (i) => { return i ? "\u2B1B":null })
            });

          }


  }




// componentWillMount() {
//   alert('didmount' + ' ' + this.state.editGridSet + ' ' + this.props.editGrid)
//   if (this.props.editGrid === 'edit' && this.state.editGridSet) {
//     this.setState({
//       sol:  this.props.solution,
//       solWidth: this.props.solutionWidth,
//       solHeight: this.props.solutionHeight,
//       editGridSet: false
//     });
//   }
// }
//
//
//   componentWillUnmount() {
//     alert('unmount');
//     this.setState({
//       editGridSet: true
//     });  }


  render() {

// this.resetState();
    return (
      <div className="container">

      <div className="game">
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


export default GameEdit
