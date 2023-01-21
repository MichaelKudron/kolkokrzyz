import { useState } from "react";
import React from 'react';
import { useEffect } from "react";
import { VscDebugRestart } from 'react-icons/vsc';
import {ImCross} from 'react-icons/im'
import {FiCircle} from 'react-icons/fi'

const GameMap = () => {
    const [gamemap,setGamemap] = useState([
        null,null,null,
        null,null,null,
        null,null,null
    ]);
const [winner, setWinner] = useState(null);
const [player,setPlayer] = useState(1);
const [history,setHistory] = useState([]);
const setPlayers = () =>{
    if(player===1){
        setPlayer(-1);
}else{
    setPlayer(1);
}
}


const checkRows = () =>{
  
    for (let index = 0; index < 3; index++) {
        var value =  0
        value = gamemap[0+(3*index)]+gamemap[1+(3*index)] +gamemap[2+(3*index)]
        if(value===3){
            return 1
        } else if(value===-3){
            return -1
        }
        else {
            continue
        }
    }
    return false
}
const checkColums = () =>{
  
    for (let index = 0; index < 3; index++) {
        var value =  0
        value = gamemap[0+index]+gamemap[3+index] +gamemap[6+index]
        if(value===3){
            return 1
        } else if(value===-3){
            return -1
        }
        else {
            continue
        }
    }
    return false
}
const checkCross = () =>{
    const value1 = gamemap[0]+gamemap[4] +gamemap[8]
    const value2 = gamemap[2]+gamemap[4] +gamemap[6]
    if(value1===3||value2===3){
        return 1
    }else if(value1===-3||value2===-3){
        return-1
    }else{
        return false
    }
}


const checkAll = () =>{
 if(checkColums()){
    setWinner(checkColums())
 }else if(checkRows()){
    setWinner(checkRows())
 }else if(checkCross()){
    setWinner(checkCross())
 }
   
}

const handleClick = (firsIndex) =>{
const newMap = gamemap.map((cell,index)=>{

if(index===firsIndex){
    if(cell===null&&winner===null){
        handleUpdateHistory()
        setPlayers();
        return player;
       
    }else{
        return cell
    }
  
} else{
    return cell
}
})
setGamemap(newMap)

}
const sign = (value) => {
    if(value===1){
        return <ImCross size={30} className='w-2/5 h-2/5'/>;
    }
    else if(value===-1){
        return <FiCircle size={40} className='w-2/4 h-2/4'/>;
    }
}

const handleRestart = ()=>{
    setGamemap([
        null,null,null,
        null,null,null,
        null,null,null
    ]);
    setWinner(null);
    setHistory([])
}
const handleUpdateHistory = ()=>{
    const move = {id:history.length+1,map: [...gamemap], player: player}
    const newHistory = [...history,move]
    setHistory(newHistory)

}
useEffect(()=>{
    checkAll()
})

const renderHistory = history.map(move=>{
    return <div className="h-[20px] flex"><p>{move.id}. player: </p><div className="h-[20px] w-[20px] flex justify-center items-center mt-1">{sign(move.player)}</div></div>
})


const mapRender = gamemap.map((cell,index)=>(<><div onClick={()=>handleClick(index)} className="flex justify-center items-center p-3 text-white text-4xl square bg-gray-900 border-[1px] rounded-md">{sign(cell)}</div></>))
    return ( 
        <div>
    <div className="square w-[70%] relative rounded-md">
    <div className="grid grid-cols-3">
    {mapRender}
     </div>
    <div className={winner===null?'hidden top-0 left-0 h-full w-full absolute duration-500 w-100 h-100':'bg-gray-900 top-0 left-0 absolute w-full h-full flex items-center justify-center opacity-90 backdrop-blur-3xl text-white text-3xl rounded-md flex-col'}>
    <div className="flex justify-center flex-col items-center w-full h-2/5"><p className="mb-2">The winner is: </p>{sign(winner)}</div>
        <div onClick={()=>handleRestart()} className="flex mp-5 my-5"><p>Restart</p><VscDebugRestart color="white" size={15} className='h-full w-full p-1 mt-1'/></div>
    
    </div>
    </div>
    <div className="bg-black text-white">
        sdsd
        {renderHistory}
    </div>
    </div>
     );
}
 
export default GameMap;