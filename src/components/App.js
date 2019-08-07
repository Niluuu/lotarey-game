import React, { Component } from 'react';
import './App.css';
import Ticet from './Ticet'

export class App extends Component {
  state = {
    filled1: [],
    filled2: [],
    isChecked: 0,
    isCheckedTwo: 0,
    selectedNumber: {"1": [], "2":[]},
    isTicedWon: false,
    selected: false,
    gameOver: false
  }

  componentDidMount =()=> {
    const filled1 = new Array(20).fill().map((e,i) => {
      return { number: i, selected: this.state.selected }
    }).slice(1);

    const filled2 = new Array(3).fill().map((e,i) => {
      return { number: i, selected: this.state.selected }
    }).slice(1);
    
    this.setState({filled1: filled1})
    this.setState({filled2: filled2})
  }
  

  onClick = ( filledId, number) => {
    const selectedNumber = this.state.selectedNumber
  
    if (filledId === "1") {
      const firstFilled = selectedNumber[1]
      if (firstFilled.length < 8) {
         const newSelect = {
          ...selectedNumber,
          [filledId]: [...firstFilled, number]
        };

        const selected = !this.state.selected
        const selObject = this.state.filled1.map((num) => (num.number === number) ? ({...num , selected }): num )
        
        this.setState({filled1: selObject})
        this.setState({selectedNumber: newSelect})
        this.setState({isChecked: this.state.isChecked + 1})
      }else{ alert("You allready choose 8") }
    } else {  
      const secondFilled = selectedNumber[2]

      if (secondFilled.length < 1 ) {
        const newSelect = {
          ...selectedNumber,
          [filledId]: [...secondFilled, number]
        };

        this.setState({selectedNumber: newSelect})
        this.setState({ isCheckedTwo: this.state.isCheckedTwo + 1 })

        const selected = !this.state.selected
        const selObject = this.state.filled2.map((num) => (num.number === number) ? ({...num , selected }): num )
        this.setState({filled2: selObject})
      }else{ alert("You allready choose 1") }
    }
  }


  getResult = () => {
    const { selectedNumber, isTicedWon, gameOver } = this.state
    // win code [2,3,4,5,6,7,8,9] [1]
    // win code [9,8,7,6,5,4,3,2] [2]

    const winCode = [2,3,4,5,6,7,8,9]
    const winCode2 = [9,8,7,6,5,4,3,2]
    this.setState({ gameOver: !gameOver })

    if ( selectedNumber[2] == 1) {
      if (JSON.stringify(selectedNumber[1]) === JSON.stringify(winCode)){
        this.setState({isTicedWon: !isTicedWon})
      }
    } else {
      if (JSON.stringify(selectedNumber[1]) === JSON.stringify(winCode2)){
        this.setState({isTicedWon: !isTicedWon})
      }
    }
  }

  render() {    
    return (
      <div className="App">
       <Ticet 
          firstFilled={this.state.filled1} 
          secondFilled={this.state.filled2}
          onClick={this.onClick}
          isChecked={this.state.isChecked}
          isCheckedTwo={this.state.isCheckedTwo}
          getResult={this.getResult}
          isTicedWon={this.state.isTicedWon}
          gameOver={this.state.gameOver}
        ></Ticet>
      </div>
    );
  }
}

export default App;