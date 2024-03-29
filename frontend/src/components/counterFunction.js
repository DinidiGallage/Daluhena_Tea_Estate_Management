import React from "react";

function CounterFunction(){
    let [number,setNumber]= useState()

    return(
        <div>
            <h3>Functional Component</h3>
            <h1>Counter ={number}</h1>
            <button>Increment</button>
        </div>
    )

}
export default CounterFunction
