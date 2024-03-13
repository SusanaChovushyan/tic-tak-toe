import React, { useState, useEffect } from "react";
import './TicTakToe.css'
import circle_icon from '../Assets/circle.png'
import cross_icon from '../Assets/cross.png'

let initialData  = ["","","","","","","","",""];

const TicTacToe = () => {

    let [count,setCount] = useState(0);
    let [lock,setLock] = useState(false);
    let [data, setData] = useState(initialData);
    let [winner, setWinner] = useState("");

    const toggle = (e,num) => {
        if (lock || data[num] || winner) {
            return;
        }
        if(count%2===0){
            e.target.innerHTML = `<img src='${cross_icon}'>`;
            data[num]="x";
            setCount(++count)
        }
        else{
            e.target.innerHTML = `<img src='${circle_icon}'>`;
            data[num]="o";
            setCount(++count)  
        }
        checkWinner();
    }

    const resetGame = () => {
        setData(initialData);
        setCount(0);
        setLock(false);
        const boxes = document.querySelectorAll('.boxes');
        boxes.forEach(box => box.innerHTML = '');
        document.title = '';
    };

    const checkWinner = () => {
        const winConditions = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ];
        for (let condition of winConditions) {
            const [a, b, c] = condition;
            if (data[a] && data[a] === data[b] && data[a] === data[c]) {
                setWinner(data[a]);
                setLock(true);
                return;
            }
        }
        if (count === 9) {
            setWinner("draw");
            setLock(true);
        }
    };

    useEffect(() => {
        if (winner === "") {
            document.title = "Tic Tac Toe Game In React";
        } else if (winner === "draw") {
            document.title = "It's a Draw!";
        } else {
            document.title = `Winner is ${winner.toUpperCase()}!`;
        }
    }, [winner]);

    return(
        <div className="container">
         <h1 className="title">{
                winner === "" ? "Tic Tac Toe Game In React" : 
                winner === "draw" ? "It's a Draw!" :
                `Winner is ${winner.toUpperCase()}!`
            }</h1>
            <div className="board">
                <div className="row1">
                    <div className="boxes" onClick={(e)=>{toggle(e,0)}}></div>
                    <div className="boxes" onClick={(e)=>{toggle(e,1)}}></div>
                    <div className="boxes" onClick={(e)=>{toggle(e,2)}}></div>
                </div>
                <div className="row2">
                    <div className="boxes" onClick={(e)=>{toggle(e,3)}}></div>
                    <div className="boxes" onClick={(e)=>{toggle(e,4)}}></div>
                    <div className="boxes" onClick={(e)=>{toggle(e,5)}}></div>
                </div>
                <div className="row3">
                    <div className="boxes" onClick={(e)=>{toggle(e,6)}}></div>
                    <div className="boxes" onClick={(e)=>{toggle(e,7)}}></div>
                    <div className="boxes" onClick={(e)=>{toggle(e,8)}}></div>
                </div>
            </div>
            <button className="reset" onClick={resetGame}>Reset</button>

        </div>
    )
}

export default TicTacToe