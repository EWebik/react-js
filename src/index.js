import React,{useState,useRef} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

//Hook de estado useState



const Componente = (props)=>{

  //Declaración
  //const state = React.useState();
  //useState regresa un array
  //const _state = state[0];
  //const setState = state[1]; //función

  //Declaración por desestructuración
  //const [state, setState] = useState();

  //Reglas de los Hooks
  //1- Se deben declarar en el primer nivel del componente
  //2- Los Hooks solo deben ser llamados desde funciones de React

  //Declarar un Hook por cada variable de estado que necesitemos
  //enteros, texto, booleanos
  //La inicialización solo ocurre cuando se monta el componente
  const [enteros, setEnteros] = useState(0);
  const [texto, setTexto] = useState("EWebik");
  const [booleanos, setBooleanos] = useState(true);

  //Un objeto JSON
  const [_json, setJson] = useState({
    enteros:0,
    texto:"EWebik",
    booleanos:true,
  });

  //Listas
  const [lista, setLista] = useState([
    {
      item:0
    },
    {
      item:1
    }
  ]);

  return(
    <div>
      <p>{_json.enteros}</p>
      <button onClick={()=>{
        setJson({
          ..._json,
          enteros: _json.enteros + 1
        });
      }}>Clic</button>
      <p>{_json.texto}</p>
      <input type="text" onChange={(e)=>{
         setJson({
          ..._json,
          texto: e.target.value
        });
      }} />
      <p>{_json.booleanos ? "True":"False"}</p>
      <input type="checkbox" onChange={(e)=>{
        setJson({
          ..._json,
          booleanos: e.target.checked
        });
      }} />
      <br/>
      <button onClick={()=>{
        let tLista = lista;
        tLista.push({
          item: lista.length
        });
        setLista(tLista);
        console.log(tLista);
        //setTimeout(() => {
          setBooleanos(!booleanos);  
        //}, 100);
        
      }}>Agregar</button>
      <ul>
        {
          lista.map((item,index)=>(
            <li key={index}>{item.item}</li>
          ))
        }
      </ul>
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
