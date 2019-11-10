import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square (props)
    {
      return(
        <button className="square" onClick={props.click}>
          {props.val}
        </button>
      );
  }
  function calculateWinner(squares)
  {
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
      const [a,b,c]=lines[i];
      
      if(squares[a]==squares[b] && squares[a]==squares[c])
      {
        return squares[a];
      }
      
    }
    return null;
  }

  class Board extends React.Component {
     
    renderSquare(i) {
      return <Square val={this.props.square[i]} click={() => this.props.handleClick(i)}/>;
    }
  
    render() {    
      return (
        <div>
          
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
    constructor(props)
    {
      super(props);
      this.state={
          history:[{square: Array(9).fill(null)}],
          isNext: true,
          stepNumber:0,
      }
    }
    jumpTo(step)
    {
      this.setState({stepNumber: step,
      isNext: (step%2) === 0,
      })
      console.log(this.state);
    }
    handleClick(i) {
    const history = this.state.history.slice(0,this.state.stepNumber+1);
    const current = history[this.state.stepNumber]  ;
    const square = current.square.slice();
    if(calculateWinner(square) || square[i])
    {
      return;
    }
    square[i] = this.state.isNext ? "X":"O";
    this.setState({
      history : history.concat([{
        square:square,
      }]),
      stepNumber : history.length,
      isNext: !this.state.isNext,
    });
    
    
  

  }
    render() {
      const history = this.state.history;
      const current =history[this.state.stepNumber ];
      const winner =calculateWinner(current.square);

      const moves=history.map((step,move) => {
        const desc = move ? "Go to move # "+move : "Go to start";
        return(
          <li key={move}><button onClick={() => {this.jumpTo(move)}}>{desc}</button></li>
        );
      });

      let status;
      if(winner)
      {
        status="winner "+winner;
      }
      else
      {
        status="Next Player: "+(this.state.isNext ? "X":"O");
      }
      return (
        <div className="game">
          <div className="game-board">
            <Board square={current.square} handleClick={(i) => {this.handleClick(i)}}/>
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
  );
  