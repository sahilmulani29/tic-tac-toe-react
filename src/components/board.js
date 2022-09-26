import { Fragment, useState } from "react";

const Board = () => {

    const temp = new Array(3).fill().map((x)=>new Array(3).fill());
    const [board , setBoard] = useState(temp);
    const [turn , setTurn] = useState(1);
    const [winner , setWinner] = useState();
    const [draw , setDraw] = useState(false);

    const onCellClick = (row , column) => {
        if(board[row][column] || winner){
            return;
        }
        let whichPlayerTurn;
        if(turn === 1){
            board[row][column] = 'X';
            whichPlayerTurn = 2;
        }else{
            board[row][column] = 'Y';
            whichPlayerTurn = 1
        }
        setBoard(...[board]);
        const win = checkWinner();
        if(win.isWin){
            setWinner(win.winner)
        }else{
            const isDraw = checkIfDraw();
            isDraw ? setDraw(true)  : setTurn(whichPlayerTurn);
        }
    }

    const onReset = () => {
        setBoard(...[temp]);
        setDraw(false);
        setWinner('');
        setTurn(1)
    }

    const checkWinner = () => {
        let locations = [
            ['00' , '01' , '02'],
            ['10' , '11' , '12'],
            ['20' , '21' , '22'],
            ['00' , '10' , '20'],
            ['01' , '11' , '21'],
            ['02' , '12' , '22'],
            ['00' , '11' , '22'],
            ['02' , '11' , '20']
        ]
        for(let i=0; i<locations.length; i++){
            let a = locations[i][0].split('');
            let b = locations[i][1].split('');
            let c = locations[i][2].split('');
            if(board[a[0]][a[1]] && board[a[0]][a[1]] === board[b[0]][b[1]] && board[a[0]][a[1]] === board[c[0]][c[1]]){
                return {'winner' : board[a[0]][a[1]] , isWin : true};
            }
        }
        return {'winner' : '' , isWin : false};
    }

    const checkIfDraw = () => {
        let draw = true;
        for(let i=0; i<board.length; i++){
            for(let j=0; j<board[i].length; j++){
                if(!board[i][j]){
                    draw = false;
                    break;
                }
            }
            if(!draw){
                break;
            }
        }
        return draw;
    }

    return (
        <Fragment>
            <div className="board-container">
                { !draw && <div className="turn">{`Player ${turn} ${winner ? 'Won' : 'Turn'}`}</div>}
                { draw && <div className="turn">{`Game is Drawn.. Please Reset`}</div>}
                {
                    board.map((boardRow , rowIndex)=>(
                        <div key={rowIndex} className="board-row">
                            {
                                boardRow.map((boardCell , cellIndex)=>(
                                    <div key={cellIndex} className="board-cell" onClick={()=>onCellClick(rowIndex , cellIndex)}>
                                        {boardCell}
                                    </div>
                                ))
                            }
                        </div>
                    ))
                }
                <div className="reset-row">
                    <button className="reset" onClick={()=>onReset()}>Reset</button>
                </div>
            </div>
        </Fragment>
    )

}

export default Board;