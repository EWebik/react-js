import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

//Componentes funcionales

function _Padre(props){
  return(
    <div className="padre">
      <h1>{"Componente Padre"}</h1>
      <div className="componentes">
        <div className="componente">
          <h2>{"Hijo 1"}</h2>
          <p>{"Contador"}</p>
          <p>{"1"}</p>
        </div>
        <div className="componente">
          <h2>{"Hijo 2"}</h2>
          <p>{"Contador"}</p>
          <p>{"1"}</p>
        </div>
      </div>
    </div>
  );
}

//Extracción y división de componentes
//--- Componentes de clases
//ECMAScript 6
class _Hijo1 extends React.Component{
  render(){
    return(
      <div className="componente">
        <h2>{"Hijo 1"}</h2>
        <p>{"Contador"}</p>
        <p>{"1"}</p>
      </div>
    );
  }
}

function _Hijo2 (props){
  return(
    <div className="componente">
      <h2>{"Hijo 2"}</h2>
      <p>{"Contador"}</p>
      <p>{"1"}</p>
    </div>
  );
}

//Propiedades

//this
class Hijo1 extends React.Component{
  /*
  aumentarCuenta(){
    setInterval(()=>{
      console.log('Intervalo...')
      this.props.cuenta++;
    },1000);
  }
  */
  render(){
    //this.aumentarCuenta();
    return(
      <div className="componente">
        <h2>{this.props.titulo}</h2>
        <p>{this.props.subtitulo}</p>
        <p>{this.props.cuenta}</p>
      </div>
    );
  }
}

function Hijo2 (props){
  /*
  setInterval(()=>{
    console.log('Intervalo...')
    props.cuenta++;
  },1000);
  */
  return(
    <div className="componente">
      <h2>{props.titulo}</h2>
      <p>{props.subtitulo}</p>
      <p>{props.cuenta}</p>
    </div>
  );
}

//Composición de componentes

function Padre(props){
  const propiedades = {
    titulo:"Hijo 2",
    subtitulo:"Contador",
    cuenta:1
  };
  return(
    <div className="padre">
      <h1>{"Componente Padre"}</h1>
      <div className="componentes">
       <Hijo1 
          titulo="Hijo 1" 
          subtitulo="Contador" 
          cuenta={1}/>
       <Hijo2 {...propiedades} />
      </div>
    </div>
  );
}

//UN COMPONENTE NO DEBE MODIFICAR SUS PROPIEDADES
let propiedades = {
  hijo1:{ 
    titulo:"Hijo 1",
    subtitulo:"Contador",
    cuenta:1
  },
  hijo2:{ 
    titulo:"Hijo 2",
    subtitulo:"Contador",
    cuenta:1
  }
};


function Padre1(props){
  console.log(props);
  return(
    <div className="padre">
      <h1>{"Componente Padre"}</h1>
      <div className="componentes">
       <Hijo1 {...props.hijo1} />
       <Hijo2 {...props.hijo2} />
      </div>
    </div>
  );
}


setInterval(()=>{
  //console.log('propiedades - Intervalo...');
  propiedades={
    ...propiedades,
    hijo1:{
      ...propiedades.hijo1,
      cuenta:propiedades.hijo1.cuenta + 1
    },
    hijo2:{
      ...propiedades.hijo2,
      cuenta:propiedades.hijo2.cuenta + 10
    }
  }
  console.log(propiedades);

ReactDOM.render(
  <Padre1 {...propiedades} />,
  document.getElementById('root')
);
},1000);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
