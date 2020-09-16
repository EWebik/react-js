import React,{useReducer, useState} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

//Hook useReducer

//Estado inicial
const initialState = {
  count:0,
  countInterval:1,
  increment:true
}

//Reducer, el cual debe cumplir con las características de una función pura
const reducer = (state, action)=>{
  switch (action.type) {
    case "INCREMENT":
      return{
        ...state,
        increment: action.increment
      }
    case "SET_INTERVAL":
      return{
        ...state,
        countInterval: parseInt(action.countInterval)
      }
    case "INCREASE_COUNT":
      return{
        ...state,
        count: state.count + state.countInterval
      }
    case "DECREASE_COUNT":
      return{
        ...state,
        count: state.count - state.countInterval
      }
    case "RESTART":
      return initialState;
    default:
      //Lanzar un error
      return state;
  }
}

const Counter = ()=>{
  //Declaración
  //const [state, dispatch] = useReducer(()=>{},{});
  const [state, dispatch] = useReducer(reducer,initialState);

  const handleIncrement = (e)=>{
    const {checked}=e.target;
    dispatch({type:"INCREMENT",increment:checked});
  }
  const handleCountInterval = (e)=>{
    const {value}=e.target;
    dispatch({type:"SET_INTERVAL",countInterval:value});
  }
  const handleCount = (e)=>{
    if(state.increment){
      dispatch({type:"INCREASE_COUNT"});
    }else{
      dispatch({type:"DECREASE_COUNT"});
    }
  }
  const handleRestart = (e)=>{
    dispatch({type:"RESTART"});
  }

  return(
    <div className="padre">
      <h1>{"Hook useReducer by EWebik"}</h1>
      <p>{"Cuenta: " + state.count}</p>
      <div>
        <input
          type="checkbox"
          id="chk"
          checked={state.increment}
          onChange={handleIncrement} />
        <label htmlFor="chk">
          {"Incrementar"}
        </label>
      </div>
      <br/>
      <div>
        <label htmlFor="interval">
          {"Intervalo"}
        </label>
        <input
          type="text"
          id="interval"
          value={state.countInterval}
          onChange={handleCountInterval} />
      </div>
      <br/>
      <button onClick={handleCount}>
        {state.increment ? "Incrementar":"Decrementar"}
      </button>
      <button onClick={handleRestart}>
        {"Reiniciar"}
      </button>
    </div>
  )
}

ReactDOM.render(
  <Counter />,
  document.getElementById('root')
);
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
