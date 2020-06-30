import React,{useState,useRef} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import {esNombre,esCorreo} from "./validaciones"

//Manejo de formularios en React

//Inputs no controlados
class Componente_ extends React.Component{

  constructor(props){
    super(props);
    this.nombre = React.createRef();
    this.correo = React.createRef();
  }
  //Inputs no controlados, obteniendo datos a través de Refs
  clicRefs(evento){
    evento.preventDefault();
    console.log(this.nombre.current.value);
    console.log(this.correo.current.value);
  }

  //Inputs no controlados, obteniendo datos a través del evento submit
  clicEventos(evento){
    evento.preventDefault();
    console.log(evento.target[0].value);
    console.log(evento.target[1].value);
  }

  render(){
    return(
      <form onSubmit={this.clicEventos}>
        <h1>{"Formularios EWebik"}</h1>
        <input type="text" placeholder="Nombre" />
        <input type="text" placeholder="Correo" />
        <button>
          Enviar
        </button>
      </form>
    )
  }
}

//Inputs controlados
class InputText extends React.Component{
  constructor(props){
    super(props);
    this.actualizarState = this.actualizarState.bind(this);
    this.state = {
      value:"",
      error:false,
      mensajeError:""
    };
  }
  actualizarState(e){
    const {name, value} = e.target;
    //console.log(name)
    //console.log(value)
    console.log(this.props.validacion(value));
    
    if(this.props.validacion(value)){
      this.setState({
        value,
        error:false,
        mensajeError:""
      });
      this.props.actualizarState({
        name,value,error:false
      });
    }else{
      this.setState({
        value,
        error:true,
        mensajeError:this.props.mensajeError
      });
      this.props.actualizarState({
        name,value,error:true
      });
    }
  }
  render(){
    return(
      <div className="componente-input">
        <label htmlFor={"id-"+this.props.name}>{this.props.label}</label>
        <input
          id={"id-"+this.props.name}
          type="text"
          name={this.props.name}
          placeholder={this.props.placeholder}
          className={this.state.error ? "border-error":""}
          onChange={this.actualizarState}/>
          {
            this.state.error ? (
            <p className="componente-input-error">{this.state.mensajeError}</p>
            ):("")
          }
      </div>
    )
  }
}

class InputCheckbox extends React.Component{
  constructor(props){
    super(props)
    this.actualizarState = this.actualizarState.bind(this);
    this.state={activo:false};
  }
  actualizarState(e){
    const {name, checked} = e.target;
    this.setState({activo:checked});
    this.props.actualizarState({
      name,value:checked,error:false
    })
  }
  render(){
    return(
      <div>
        <input
          id={"id-"+this.props.name}
          type="checkbox"
          name={this.props.name}
          checked={this.state.activo}
          onChange={this.actualizarState}/>
          <label htmlFor={"id-"+this.props.name}>{this.props.label}</label>
      </div>
    )
  }
}

class InputSelect extends React.Component{
  constructor(props){
    super(props)
    this.actualizarState = this.actualizarState.bind(this);
    this.state={activo:""};
  }
  actualizarState(e){
    const {name, value} = e.target;
    this.setState({value});
    this.props.actualizarState({
      name,value,error: value == "" ? true:false
    })
  }
  render(){
    return(
      <div className="componente-input">
        <label htmlFor={"id-"+this.props.name}>{this.props.label}</label>
        <select
          id={"id-"+this.props.name}
          name={this.props.name}
          onChange={this.actualizarState}>
            {
              this.props.opciones.map((opcion,index)=>(
              <option hey={index} value={opcion.value}>{opcion.texto}</option>
              ))
            }            
        </select>
      </div>
    )
  }
}

class Componente extends React.Component{

  constructor(props){
    super(props);
    this.submit = this.submit.bind(this);
    this.actualizarState = this.actualizarState.bind(this);
    this.state = {
      nombre:{
        value:"",
        error:true
      },
      correo:{
        value:"",
        error:true
      },
      prioridad:{
        value:false,
        error:true
      },
      opciones:{
        value:"",
        error:true
      }
    }
  }
  
  actualizarState(input){
    this.setState({
      ...this.state,
      [input.name]:{
        value:input.value,
        error:input.error
      }
    }, ()=>{console.log(this.state);});
    
  }

  submit(e){
    e.preventDefault();
    console.log(this.state)
  }

  render(){
    return(
      <form onSubmit={this.submit}>
        <h1>{"Formularios EWebik"}</h1>
        <InputText
          label="Nombre"
          name="nombre"
          placeholder="Nombre"
          validacion={esNombre}
          mensajeError="Se esperaban letras"
          actualizarState={this.actualizarState} />
        
        <InputText
          label="Correo"
          name="correo"
          placeholder="Correo"
          validacion={esCorreo}
          mensajeError="Correo no valido"
          actualizarState={this.actualizarState} />

        <InputCheckbox
          name="prioridad"
          label="Prioridad"
          actualizarState={this.actualizarState} />

        <InputSelect
          name="opciones"
          label="Elige una opción:"
          actualizarState={this.actualizarState}
          opciones={[
            {value:"", texto:"Seleccione un opción..."},        
            {value:"1", texto:"Página web"},
            {value:"2", texto:"Aplicación móvil"}
            ]} />
        
        <button
          disabled={this.state.nombre.error ||
            this.state.correo.error ||
            this.state.opciones.error}
          type="submit"
          className={this.state.nombre.error ||
            this.state.correo.error ||
            this.state.opciones.error
            ? 
            "button-disable":"button"}>
          Enviar
        </button>
      </form>
    )
  }
}

ReactDOM.render(
  <Componente/>,
  document.getElementById('root')
);
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
