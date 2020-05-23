import React,{useState} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

//Manejo de State

//this
class Hijo1 extends React.Component{

  //Si lo declaras de esta forma
  //Recomiendo utilizar funciones de flecha
  state={
    titulo:"Hijo 1",
    subtitulo:"Contador",
    cuenta:1
  }

  constructor(props){
    super(props);
    //Declaración métodos de clase
    this.disminuir = this.disminuir.bind(this);

    //DECLARACIÓN
    /*
    this.state={
      titulo:"Hijo 1",
      subtitulo:"Contador",
      cuenta:1
    }
    */
  }

  //Método de clase
  //No heredan el this
  //La forma oficial y recomendada
  disminuir(){
    //this.state.cuenta--;
    //this.forceUpdate(); //NO ES RECOMENDABLE
    if(this.state.cuenta <= 0){
      this.setState({
        ...this.state,
        cuenta:0
      });
    }else{
      this.setState({
        ...this.state,
        cuenta:this.state.cuenta - 1
      });
    }
    console.log(this.state)
  }

  //Método tipo función de flecha
  //Heredan el this
  //Esto es posible gracias a Babel
  aumentar=()=>{
    this.setState({
      ...this.state,
      cuenta:this.state.cuenta + 1
    });
  }
 
  render(){
    return(
      <div className="componente">
        <h2>{this.state.titulo}</h2>
        <p>{this.state.subtitulo}</p>
        <div className="controles">
          <span 
            className="control"
            onClick={this.disminuir}>-</span>
          <span 
            className="control"
            onClick={this.aumentar}>+</span>
        </div>
        <p>{this.state.cuenta}</p>
      </div>
    );
  }
}

//Hook useState
function Hijo2 (props){
  //Declaración
  const [state, setState] = useState({
    titulo:"Hijo 2",
    subtitulo:"Contador",
    cuenta:1
  });

  const disminuir = ()=>{
    if(state.cuenta <= 0){
      setState({
        ...state,
        cuenta:0
      });
    }else{
      setState({
        ...state,
        cuenta:state.cuenta - 1
      });
    }
  }

  const aumentar = ()=>{
    setState({
      ...state,
      cuenta:state.cuenta + 1
    });
  }

  return(
    <div className="componente">
      <h2>{state.titulo}</h2>
      <p>{state.subtitulo}</p>
      <div className="controles">
          <span 
            className="control"
            onClick={disminuir}>-</span>
          <span 
            className="control"
            onClick={aumentar}>+</span>
        </div>
      <p>{state.cuenta}</p>
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


function Padre(props){
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


//Métodos de ciclo de vida
//componentDidMount
//componentWillUnmount

class Hijo extends React.Component{

  //Si lo declaras de esta forma
  //Recomiendo utilizar funciones de flecha
  state={
    titulo:"Hijo 1",
    subtitulo:"Contador",
    cuenta:1
  }

  intervalo = null;

  componentDidMount(){
    console.log("componentDidMount")
    this.intervalo = setInterval(()=>{
      this.setState({
        cuenta:this.state.cuenta + 1
      })
      console.log(this.state)
    },1000)
  }

  componentWillUnmount(){
    console.log("componentWillUnmount")
    clearInterval(this.intervalo);
  }

  render(){
    return(
      <div className="componente">
        <h2>{this.state.titulo}</h2>
        <p>{this.state.subtitulo}</p>
        <p>{this.state.cuenta}</p>
      </div>
    );
  }
}

function Padre1(props){
  const [ver,setVer] = useState(false)
  const verComponente = ()=>{
    setVer(!ver)
  }
  return(
    <div className="padre">
      <h1>{"Componente Padre"}</h1>
      <button onClick={verComponente}>{ver ? "Ocultar":"ver"}</button>
      <div className="componentes">
       {
         ver ? (<Hijo />):("")
       }
      </div>
    </div>
  );
}




ReactDOM.render(
  <Padre1 />,
  document.getElementById('root')
);
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
