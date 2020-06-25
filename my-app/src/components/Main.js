import React from 'react'
import Grid from './Grid'
import Buttons from './Buttons'

import styled from 'styled-components'

class Main extends React.Component {
    constructor() {
        super();
        this.speed = 100;
        this.rows = 40;
        this.cols = 40; // column
        this.state = {
            generation: 0,
            gridFull: Array(this.rows).fill().map(() => Array(this.cols).fill(false))
        }
    }
  
    selectBox = (row, col) => {
        let gridCopy = arrayClone(this.state.gridFull);
        gridCopy[row][col] = !gridCopy[row][col];
        this.setState({
            gridFull: gridCopy
        });
    }
    
    reset = () => {
        let gridCopy = arrayClone(this.state.gridFull);
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                if (Math.floor(Math.random() * 4) === 1) {
                    gridCopy[i][j] = true;
                }
            }
        }
        this.setState({
            gridFull: gridCopy
        });
    }
  
    playButton = () => {
        clearInterval(this.intervalId);
        this.intervalId = setInterval(this.play, this.speed);
    }
    
    stopButton = () => {
        clearInterval(this.intervalId);
    }
    
    slow = () => {
        this.speed = 400;
        this.playButton();
      }
  
      normal = () => {
        this.speed = 150;
        this.playButton();
    }
    
    fast = () => {
        this.speed = 25;
        this.playButton();
      }
  
      clear = () => {
        var grid = Array(this.rows).fill().map(() => Array(this.cols).fill(false));
        this.setState({
            gridFull: grid,
            generation: 0
        });
    }
    
    gridSize = (size) => {
        switch (size) {
            case "1":
                this.cols = 30;
                this.rows = 30;
            break;
            case "2":
                this.cols = 40;
                this.rows = 40;
            break;
            default:
                this.cols = 50;
                this.rows = 50;
        }
        this.clear();
    }
    
    play = () => {
        let g = this.state.gridFull;
        let g2 = arrayClone(this.state.gridFull);
  
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
        let count = 0; // the count represents how many neighbors it has
          
            if (i > 0) if (g[i - 1][j]) count++;
            if (i > 0 && j > 0) if (g[i - 1][j - 1]) count++;
            if (i > 0 && j < this.cols - 1) if (g[i - 1][j + 1]) count++;
            if (j < this.cols - 1) if (g[i][j + 1]) count++;
            if (j > 0) if (g[i][j - 1]) count++;
            if (i < this.rows - 1) if (g[i + 1][j]) count++;
            if (i < this.rows - 1 && j > 0) if (g[i + 1][j - 1]) count++;
        if (i < this.rows - 1 && j < this.cols - 1) if (g[i + 1][j + 1]) count++;
  
            if (g[i][j] && (count < 2 || count > 3)) g2[i][j] = false; // if less than 2, or more than 3, it becomes dead
            if (!g[i][j] && count === 3) g2[i][j] = true; // if it's dead, and it has 3 neighbors, it becomes alive
            }
        }
        this.setState({
            gridFull: g2,
            generation: this.state.generation + 1
        });
  
    }
  
    componentDidMount() {
        this.reset();
        this.playButton();
    }
  
    render() {
        return (
            <div>
                <h1>CS Unit 1 BW: Conway's Game of Life</h1>
                <h2>Generations: {this.state.generation}</h2>
                <h6><a href="https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life">About Conway's Game of Life</a></h6>
                
                <Grid
                    gridFull={this.state.gridFull}
                    rows={this.rows}
                    cols={this.cols}
                    selectBox={this.selectBox}
                />
  
                <Buttons
                    playButton={this.playButton}
                    stopButton={this.stopButton}
                    slow={this.slow}
                    normal={this.normal}
                    fast={this.fast}
                    clear={this.clear}
                    reset={this.reset}
                    gridSize={this.gridSize}
                />
            </div>
        );
    }
}
  
function arrayClone(arr) {
    return JSON.parse(JSON.stringify(arr));
}
  

export default Main