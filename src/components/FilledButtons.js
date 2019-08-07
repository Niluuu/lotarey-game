import React from 'react'
import './App.css';

function FilledButton({number, onClick, selected, filledId}){
  return (
    <button 
      className="costum-btn"
      style={selected ? {background: "#F4D03F"} : {background: "#FFF"}}
      onClick={() => onClick(filledId,number,selected)} 
    >
      {number}
    </button>
  );
}


export default FilledButton