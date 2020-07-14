import React,{useState,useRef} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

//Introducción API Context React

//DECLARACIÓN
const {Provider, Consumer} = React.createContext();


const Hijo1 = (props)=>{
  return(
    <Consumer>
      {
        ({mensaje, index, actualizarMensaje}) =>(
          <div className="hijo">
            <h2>Hijo 1</h2>
            {
              mensaje !== "" ?(
                <p className={
                  index === 0 ? 'colorPadre':
                  index === 1 ? 'colorHijo1':
                  index === 2 ? 'colorHijo2':''
                }>{
                  ((index === 0 ? 'Padre dice:':
                    index === 1 ? 'Hijo 1 dice:':
                    index === 2 ? 'Hijo 2 dice:':'')
                    + ' ' + mensaje)
                }</p>
              ):("")
            }
            <textarea
              rows="5"
              onChange={(e)=>{
                actualizarMensaje(e,1);
              }} />
          </div>
        )
      }
    </Consumer>
  )
}

const Hijo2 = (props)=>{
  return(
    <Consumer>
    {
      ({mensaje, index, actualizarMensaje}) =>(
        <div className="hijo">
          <h2>Hijo 2</h2>
          {
            mensaje !== "" ?(
              <p className={
                index === 0 ? 'colorPadre':
                index === 1 ? 'colorHijo1':
                index === 2 ? 'colorHijo2':''
              }>{
                ((index === 0 ? 'Padre dice:':
                  index === 1 ? 'Hijo 1 dice:':
                  index === 2 ? 'Hijo 2 dice:':'')
                  + ' ' + mensaje)
              }</p>
            ):("")
          }
          <textarea
            rows="5"
            onChange={(e)=>{
              actualizarMensaje(e,2);
            }} />
        </div>
      )
    }
    </Consumer>
  )
}

class Padre extends React.Component{
  constructor(props){
    super(props)
    this.state={
      mensaje:"",
      index:0
    }
  }

  actualizarMensaje = (e, index)=>{
    const {value} = e.target;
    this.setState({
      ...this.state,
      mensaje:value,
      index
    })
  }

  render(){
    return(
      <Provider value={{
        mensaje: this.state.mensaje,
        index: this.state.index,
        actualizarMensaje:this.actualizarMensaje
      }}>
        <div className="padre">
          <h1>EWebik - API Context</h1>
          {
            this.state.mensaje !== "" ?(
              <p className={
                this.state.index === 0 ? 'colorPadre':
                this.state.index === 1 ? 'colorHijo1':
                this.state.index === 2 ? 'colorHijo2':''
              }>{
                ((this.state.index === 0 ? 'Padre dice:':
                  this.state.index === 1 ? 'Hijo 1 dice:':
                  this.state.index === 2 ? 'Hijo 2 dice:':'')
                  + ' ' + this.state.mensaje)
              }</p>
            ):("")
          }
          <textarea
            rows="5"
            onChange={(e)=>{
              this.actualizarMensaje(e,0);
            }} />
          <div className="hijos">
            <Hijo1 />
            <Hijo2 />
          </div>
        </div>
      </Provider>
    )
  }
}

ReactDOM.render(
  <Padre />,
  document.getElementById('root')
);
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
