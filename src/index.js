import React,{useState,useEffect} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

//Hook de efecto o useEffect

const Hijo = (props)=>{
  const [contador, setContador] = useState(0);
  const [latitud, setLatitud] = useState(0);
  const [longitud, setLongitud] = useState(0);

  //Consejo 1 - Separar procesos
  //Consejo 2 - Mejorar rendimiento separando efectos

  //Ejemplo donde no requiere saneamiento
  useEffect(()=>{
    //Emular los métodos de ciclo de vida
    //componentDidMount
    //componentDidUpdate

    console.log("componentDidMount");
    console.log("componentDidUpdate");

    //Posición
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition((pos)=>{
        setLatitud(pos.coords.latitude.toFixed(0));
        setLongitud(pos.coords.longitude.toFixed(0));
      });
    }else{
      console.log("El navegador no soporta la geolocalización");
    }  
  },[latitud,longitud]);

  //Ejemplo donde si requiere saneamiento
  useEffect(()=>{
    //Contador
    const intervalo = setInterval(() => {
      console.log("Intervalo...")
      setContador(contador + 1);
    }, 1000);

    return ()=>{
      //componentWillUnmount
      console.log("componentWillUnmount");
      clearInterval(intervalo);
    }
  },[contador])

  return(
    <div>
       <p>{contador}</p>
       <p>{`Lat: ${latitud}, Lon: ${longitud}`}</p>
    </div>
  )
}

const Componente = (props)=>{
  const [verHijo, setVerHijo] = useState(true);
  
  //Declaración
  //useEffect(()=>{},[]);

  return(
    <div className="padre">
     <h1>{"Hook useEffect by EWebik"}</h1>
     {
       verHijo ? (<Hijo />):("")
     }
     <br/>
     <button onClick={()=>{
          setVerHijo(!verHijo);
     }}>{verHijo ? "Ocultar":"Ver"}</button>
    </div>
  )
}

ReactDOM.render(
  <Componente />,
  document.getElementById('root')
);
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
