import { useState } from "react";
import React from 'react';
import { useEffect } from "react";

const GameMap = () => {
    const [gamemap,setGamemap] = useState([
        null,null,null,
        null,null,null,
        null,null,null
    ]);

const [winner, setWinner] = useState(null);

const [player,setPlayer] = useState(1);


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

useEffect(()=>{
    checkAll()
})



const mapRender = gamemap.map((cell,index)=>(<><div onClick={()=>handleClick(index)} className="flex justify-center items-center p-3 text-white text-4xl square bg-gray-900 border-[1px] rounded-md">{cell}</div></>))
    return ( 
    <div className="square w-[70%]">
    <div className="grid grid-cols-3 ">
    {mapRender}
     </div>
    </div>
     );
}
 
export default GameMap;