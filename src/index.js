import React,{useState,useRef} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

//Listas en React
//https://github.com/EWebik/php-mysql-desde-cero/blob/master/cron/datos.json

import datos from "./data.json";

//Para recorrer una lista debemos usar map

class Componente extends React.Component{
  render(){
    return(
      <>
        <h2 className="centrar">{"Curso de React by EWebik Listas y condiciones"}</h2>
        <div className="cont-tabla">
          <table>
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Categoría</th>
                <th>Precio</th>
                <th>Cantidad vendidos</th>
                <th>En almacen</th>
                <th>Fecha</th>
              </tr>
            </thead>
            <tbody>
              {
                datos.map((dato,index)=>(
                  <tr
                    key={dato.id}
                    className={index%2 == 0 ? '':'trColor'}>
                    <td>{dato.nombre}</td>
                    <td>{dato.categoria}</td>
                    <td>{dato.precio}</td>
                    <td>{dato.cantidad_vendidos}</td>
                    <td>{dato.en_almacen}</td>
                    <td>{dato.fecha_alta}</td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>
      </>
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
