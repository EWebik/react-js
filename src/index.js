import React,{useState,useRef} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

//Children en React JS
const Child1 = (props)=>{
  return(
    <div className="hijo">
       <h2>{"Hijo 1"}</h2>
       <p>{props.componente + " " + props.mensaje}</p>
        <textarea rows="5" onChange={(e)=>{
          props.actualizarState(e.target.value, "Hijo 1 dice:")
        }} />
    </div>
   
  )
}

const Child2 = (props)=>{
  return(
    <div className="hijo">
      <h2>{"Hijo 2"}</h2>
      <p>{props.componente + " " + props.mensaje}</p>
        <textarea rows="5" onChange={(e)=>{
          props.actualizarState(e.target.value, "Hijo 2 dice:")
        }} />
  </div>
  )
}


class Padre extends React.Component{
  constructor(props){
    super(props);
    this.state={
      mensaje:"",
      componente:""
    }
  }

  actualizarState = (mensaje, componente)=>{
    this.setState({mensaje, componente})
  }

  render(){
    const {children: propsChildren} = this.props;
    
    //Siempre manejes children como array
    //Comunicación de componentes aplicando Children
    let children = React.Children.map(propsChildren,(child, index)=>{
      return React.cloneElement(child,{
        mensaje: this.state.mensaje,
        componente: this.state.componente,
        actualizarState: this.actualizarState,
      });
    })

    
    return(
      <div className="padre">
        <h1>{"Props Children by EWebik"}</h1>
      <p>{this.state.componente + " " + this.state.mensaje}</p>
      <textarea rows="5" onChange={(e)=>{
        this.actualizarState(e.target.value, "Padre dice:")
      }} />
      <div className="hijos">
        {
          children
        }
      </div>
       
      </div >
    )
  }
}

ReactDOM.render(
  <Padre>
    <Child1/>
    <Child2/>
  </Padre>,
  document.getElementById('root')
);
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
