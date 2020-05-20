import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

//Creando un elemento con React.createElement

//Elemento tipo parrafo 'p'
var p = React.createElement('p',{className:'style-parrafo'},'Curso de React JS by EWebik');

//Contenedor 'div'
var container = React.createElement('div',{className:'container'},p);

//Sintaxis JSX, reemplazando a React.createElement
// class -> className

var div = (
    <div className='container'>
      <p className='style-parrafo'>Curso de React JS by EWebik</p>
    </div>
);

//Los componentes personalizados deben ser capitalizados
function HolaEwebik(props){
  return <p>Curso de React JS by EWebik</p>
}

function Contenedor(){
  return <HolaEwebik />
}

//Manejar props o propiedades {}
function HolaEwebikProps(props){
  return (
    <>
      <p>{props.titulo + ' ' + '1'}</p>
      <p>{props.titulo + ' ' + (1+props.indice)}</p>
    </>
    )
}

function Contenedor1(){
  return <HolaEwebikProps titulo="Curso de React JS by EWebik - props" indice={10} />
}

//Perador Spread ...

function Elemento1 (props){
  return(
    <div className='container'>
      <p className='style-parrafo'>{"Titulo: " + props.titulo}</p>
      <p className='style-parrafo'>{"Capitulo: " + props.capitulo}</p>
    </div>
  )
}

function Componente(){
  const props = {
    titulo:"Curso React JS EWebik",
    capitulo:"Introducción a JSX"
  }
  return <Elemento1 {...props} />
}

ReactDOM.render(
  <Componente />,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
