import React from "react";

class counterclass extends React.components{
    constructor(){
        super();
        this.increment =this.increment.bind(this)
        this.state ={
            number:0

        }
    }

    increment(){
        this.setstate({
            number:++this.state.number
    })
    }

    render(){
        return(
            <div>
                <h1>counter = {this.state.number}</h1>
                <button onClick={this.increment}>increment</button>
            </div>
        )
    }
}

export default  counterclass;