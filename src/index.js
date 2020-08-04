import React,{useState,useRef} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import PropTypes from "prop-types";

//PropTypes en React JS

//Componentes de clase
class _Componente extends React.Component{
  static propTypes = {
    texto: PropTypes.string,
    numero: PropTypes.number.isRequired,
    correo: function(props, propName, componentName){
      if(!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/.test(props[propName])){
        return new Error(
          `Prop no cuenta con un formato de correo ${propName}, para ${componentName}. Error en la validación.`
        )
      }
    }
  }
  render(){
    return(
      <>
        <p>{this.props.texto}</p>
        <p>{this.props.numero}</p>
        <p>{this.props.correo}</p>
      </>
    )
  }
}

//Componentes funcionales
const Componente = props =>{
  return(
    <>
      <p>{props.texto}</p>
      <p>{props.numero}</p>
      <p>{props.correo}</p>
    </>
  )
}

Componente.propTypes = {
  texto: PropTypes.string,
  numero: PropTypes.number.isRequired,
  correo: function(props, propName, componentName){
    if(!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/.test(props[propName])){
      return new Error(
        `Prop no cuenta con un formato de correo ${propName}, para ${componentName}. Error en la validación.`
      )
    }
  }
}

//Valores por default
Componente.defaultProps ={
  texto:"EWebik default",
  numero:10,
  correo:"contacto@ewebik.com.mx"
}


ReactDOM.render(
  <Componente />,
  document.getElementById('root')
);
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
