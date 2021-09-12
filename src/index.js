import React, {useState} from 'https://esm.sh/react'
import ReactDOM from 'https://esm.sh/react-dom';

const Square = ({value, onClick}) => (
    <button className="square" onClick={onClick}>
        {value}
    </button>
);

class Board extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            squares: Array(9).fill(null),
            xIsNext: true,
        };
    }

    componentDidMount(){
        setInterval(() => {
            fetch(`/squares`, {
                method: 'GET',
            })
                .then(response => response.json())
                .then(json => {
                    console.log(json);
                    this.setState({
                        squares: json.squares,
                        xIsNext: json.isNextPlayerX,
                    });
                });
        },5000)
    }

    handleClick(i) {
        if (this.props.player === null) {
            return;
        }
        let nextPlayer = this.state.xIsNext ? 'X' : 'O';
        if (this.props.player !== nextPlayer) {
            return;
        }
        const squares = this.state.squares.slice();
        if (calculateWinner(squares) || squares[i]) {
            return;
        }
        squares[i] = nextPlayer;
        this.setState({
            squares: squares,
            xIsNext: !this.state.xIsNext,
        });
        fetch(`/squares/${i}`, {
            method: 'PUT',
        })
            .then(response => response.json())
            .then(json => {
                console.log(json);
                this.setState({
                    squares: json
                });
            });
    }


    render() {
        const winner = calculateWinner(this.state.squares);
        let status;
        if (winner) {
            status = 'Winner: ' + winner;
        } else {
            status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
        }

        return (
            <div>
                <div className="status">{status}</div>
                <div className="board-row">
                    <Square
                        value={this.state.squares[0]}
                        onClick={() => this.handleClick(0)}
                    />
                    <Square
                        value={this.state.squares[1]}
                        onClick={() => this.handleClick(1)}
                    />
                    <Square
                        value={this.state.squares[2]}
                        onClick={() => this.handleClick(2)}
                    />
                </div>
                <div className="board-row">
                    <Square
                        value={this.state.squares[3]}
                        onClick={() => this.handleClick(3)}
                    />
                    <Square
                        value={this.state.squares[4]}
                        onClick={() => this.handleClick(4)}
                    />
                    <Square
                        value={this.state.squares[5]}
                        onClick={() => this.handleClick(5)}
                    />
                </div>
                <div className="board-row">
                    <Square
                        value={this.state.squares[6]}
                        onClick={() => this.handleClick(6)}
                    />
                    <Square
                        value={this.state.squares[7]}
                        onClick={() => this.handleClick(7)}
                    />
                    <Square
                        value={this.state.squares[8]}
                        onClick={() => this.handleClick(8)}
                    />
                </div>
            </div>
        );
    }
}

// add a button that makes an http request with a delete method 
const Game = () => {
    const [player, setPlayer] = useState(null);
    const playerChoice = player === null ?
        <div>
            Play as
            <button onClick={() => setPlayer('X')}>X</button>
            <button onClick={() => setPlayer('O')}>O</button>
        </div>
        : <div>
            Playing as {player}
        </div>;
    return (
        <div className="game">
            <div className="game-board">
                <Board player={player}/>
            </div>
            <div className="game-info">
                {playerChoice}
            </div>
        </div>
    );
};

// ========================================

ReactDOM.render(
    <Game/>,
    document.getElementById('root')
);

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

