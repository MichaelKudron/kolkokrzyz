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
const setPlayers = (oldPlayer) =>{
    if(oldPlayer === 1||oldPlayer===-1){
        setPlayer(oldPlayer)
        
    }
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
       
    
        return player;
       
    }else{
        return cell
    }
  
} else{
    return cell
}
})
if(newMap.toString()!==gamemap.toString()){
    setGamemap(newMap,handleUpdateHistory(newMap));

    setPlayers();}


}
const sign = (value) => {
    if(value===1){
        return <ImCross size={30}  className='w-2/5 h-2/5'/>;
    }
    else if(value===-1){
        return <FiCircle size={40}  className='w-2/4 h-2/4'/>;
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
useEffect(()=>{

    checkAll()


})
const handleUpdateHistory = (newmap)=>{
    const move = {id:history.length+1,map: [...newmap], player: player}
    const newHistory = [...history,move]
    setHistory(newHistory)

}
const handleBackMove = (id) =>{
  
    history.map(move=>{
        if(move.id===id){
            setWinner(null)
            setGamemap(move.map);
            setPlayers(move.player);
            let newHistory = [...history];
            const index = newHistory.findIndex(element=>(element.id===id));
            newHistory.length = index+1;
            setHistory(newHistory);
        }
        return move;
    })
   
}










const renderHistory = history.map(move=>{
    return <div className="h-[40px] flex w-[150px] items-center justify-center bg-[#01d449] rounded-md my-4 md:w-[400px] md:h-[60px] md:my-2 sm:w-[200px]" onClick={()=>handleBackMove(move.id)}><p>{move.id}. player: </p><div className="h-[20px] w-[20px] flex justify-center items-center mt-1 text-black">{sign(move.player)}</div></div>
})


const mapRender = gamemap.map((cell,index)=>(<><div onClick={()=>handleClick(index)} 
className="flex justify-center items-center p-3 text-4xl square bg-black border-[1px] border-[#5ada86] text-[#01d449] rounded-md m-1">
    {sign(cell)}</div></>))
    return ( 
    <div className="max-w-[1440px] grid md:grid-cols-2  mx-auto grid-cols-1">
    <div className="square w-full relative rounded-md my-auto">
    <div className="grid grid-cols-3">
    {mapRender}
     </div>
    <div className={winner===null?'hidden top-0 left-0 h-full w-full absolute duration-500 w-100 h-100':'bg-black top-0 left-0 absolute w-full h-full flex items-center justify-center opacity-90 backdrop-blur-3xl text-white text-3xl rounded-md flex-col'}>
    <div className="flex justify-center flex-col items-center w-full h-2/5"><p className="mb-4 text-6xl">The winner is: </p>{sign(winner)}</div>
        <div onClick={()=>handleRestart()} className="flex mp-5 my-5"><p>Restart</p><VscDebugRestart color="white" size={15} className='h-full w-full p-1 mt-1'/></div>
    
    </div>
    <div>
    </div>
    </div>
    <div className="text-2xl text-white md:mx-auto ml-10">
     <div className="flex">
    <p>Current Player:</p>
    <div className="w-[30px] flex items-center justify-center mt-1"> {sign(player)}</div>
    <div className="md:ml-[140px] ml-auto mr-10" onClick={()=>handleRestart()}>Restart</div>
    </div>
    <h1 >History:</h1>
    <div className=" text-black grid  grid-cols-2 md:grid-cols-1 px-auto sm:grid-cols-3">
   
        {renderHistory}
    </div>
    </div>
    </div>
     );
}
 
export default GameMap;