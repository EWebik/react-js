import React,{useState,useRef} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import Chart from "chart.js";

//Refs React en componentes de clase
class Componente extends React.Component{

  intervalo = null;

  constructor(props){
    super(props);
    //Creando una referencia
    this.referencia = React.createRef();
    this.state = {
      mensaje:["C","u","r","s","o"," ","d","e"," ","R","e","a","c","t"," ","J","S"," ","b","y"," ","E","W","e","b","i","k"]
    }
  }
  componentDidMount(){
    console.log(this.referencia);
    let contador = 0;
    let strMensaje="";
    let mensaje = this.state.mensaje;
    this.intervalo = setInterval(()=>{
      strMensaje += mensaje[contador];
      //Esto es equivalente document.getElementById
      this.referencia.current.innerText = strMensaje;
      contador++;
      if(contador >= mensaje.length){
        strMensaje="";
        contador=0;
      }
    },200);
  }
  render(){
    return(
      <div>
        <h1 ref={this.referencia}>Curso de React JS by EWebik</h1>
      </div>
    )
  }
}

//Refs React en componentes funcionales
//Hook useRef
function Componente1(props){
  const [ini,setIni] = useState(true);
  const [state,setState] = useState({
    mensaje: ["C","u","r","s","o"," ","d","e"," ","R","e","a","c","t"," ","J","S"," ","b","y"," ","E","W","e","b","i","k"]
  });

  const referencia = useRef(); // React.createRef();

  const animacion = ()=>{
    let contador = 0;
    let strMensaje="";
    let mensaje = state.mensaje;
    setInterval(()=>{
      strMensaje += mensaje[contador];
      //Esto es equivalente document.getElementById
      referencia.current.innerText = strMensaje;
      contador++;
      if(contador >= mensaje.length){
        strMensaje="";
        contador=0;
      }
    },100);
  }

  if(ini){
    setIni(false);
    animacion();
  }

  return(
    <div>
      <h1 ref={referencia}>Curso de React JS by EWebik</h1>
    </div>
  )
}

//Refs React y librerías de terceros
//Chart.js
class Componente2 extends React.Component{
  constructor(props){
    super(props);
    this.referencia = React.createRef();
  }

  componentDidMount(){
    //var ctx = document.getElementById('myChart');
    var ctx = this.referencia.current;
    console.log(ctx)
    new Chart(ctx, {
      type: 'bar',
      data: {
          labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
          datasets: [{
              label: '# of Votes',
              data: [12, 19, 3, 5, 2, 3],
              backgroundColor: [
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 206, 86, 0.2)',
                  'rgba(75, 192, 192, 0.2)',
                  'rgba(153, 102, 255, 0.2)',
                  'rgba(255, 159, 64, 0.2)'
              ],
              borderColor: [
                  'rgba(255, 99, 132, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(75, 192, 192, 1)',
                  'rgba(153, 102, 255, 1)',
                  'rgba(255, 159, 64, 1)'
              ],
              borderWidth: 1
          }]
      },
      options: {
          scales: {
              yAxes: [{
                  ticks: {
                      beginAtZero: true
                  }
              }]
          }
      }
  });
  }
  render(){
    return(
      <div>
        <h1>Curso de React JS by EWebik</h1>
        <canvas 
          id="myChart"
          ref={this.referencia}
          style={{width:400, height:400}}></canvas>
      </div>
    )
  }
}



ReactDOM.render(
  <Componente2/>,
  document.getElementById('root')
);
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
