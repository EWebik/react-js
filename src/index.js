import React,{useEffect, useReducer, useState} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

//HOC React.memo()

const Counter = (props)=>{
  const {counter, title}=props;
  return(
    <div className="hijo">
      <h2>{title}</h2>
      <h3>{"Cuenta: " + counter}</h3>
      <p>{"Último render: " + new Date().getMilliseconds()}</p>
    </div>
  )
}

//Declaración
//React.memo(<Component />, ()=>{})

const CounterMemo = React.memo(
  (props)=>{
    return(
      <Counter {...props} />
    )
});

//Diferenciación manual de propiedades
//React.memo(<Component />, ()=>{})
const CounterMemo1 = React.memo(
  (props)=>{
    const {data} = props;
    return(
      <Counter 
        title={data.title}
        counter={data.counter} />
    )
},(prevProps, nextProps)=>{
  //Si retornamos true:  No se renderiza
  //Si retornamos false: Si se renderiza
  return (
    prevProps.data.title === nextProps.data.title &&
    prevProps.data.counter === nextProps.data.counter
  )
});


const Component = ()=>{
  const [counter1, setCounter1] = useState(0);
  const [counter2, setCounter2] = useState(0);
  const [counter3, setCounter3] = useState(0);

  useEffect(()=>{
    setTimeout(() => {
      setCounter1(counter1 + 1);
    }, 100);
  },[counter1]);

  useEffect(()=>{
    setTimeout(() => {
      setCounter2(counter2 + 1);
    }, 4000);
  },[counter2]);

  useEffect(()=>{
    setTimeout(() => {
      setCounter3(counter3 + 1);
    }, 500);
  },[counter3]);

  return(
    <div className="padre">
      <h1>{"EWebik mejorando el rendimiento con React.memo()"}</h1>
      <div className="hijos">
        <Counter
          title={"No memorizado"}
          counter={counter1}/>

        <CounterMemo
          title={"Memorizado"}
          counter={counter2}/>

        <CounterMemo1
          data={{
            title:"Memorizado 2do nivel",
            counter:counter3
          }} />
      </div>
    </div>
  )
}


ReactDOM.render(
  <Component />,
  document.getElementById('root')
);
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
