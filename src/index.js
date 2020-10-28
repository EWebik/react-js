import React,{useEffect, useCallback, useState, useMemo} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

//Hook useCallback y useMemo
//React.memo

const Counter = (props)=>{
  const {counter, title}=props;
  return(
    <div className="hijo">
      <h2>{title}</h2>
      <h3>{"Cuenta: " + counter}</h3>
      <p>{"Último render: " + new Date().getMilliseconds()}</p>
    </div>
  )
}

const List = (props)=>{
  const{list,handleDelete}=props;
  return(
    <div className="hijo">
      <h2>{"Lista memorizada"}</h2>
      <p>{"Último render: " + new Date().getMilliseconds()}</p>
      {
        list.map((item)=>(
          <div key={item.id}>
            <span style={{marginRight:10}}>
              {`Id: ${item.id}, Nombre: ${item.nombre}`}
            </span>
            <button onClick={()=>{
              handleDelete(item.id)
            }}>{"Eliminar"}</button>
          </div>
        ))
      }
    </div>
  )
}

const ListMemo = React.memo(
  (props)=>{
    return(
      <List {...props} />
    )
  }
)

const Component = ()=>{
  const [counter1, setCounter1] = useState(0);
  const [list, setList] = useState([]);
  const [id, setId] = useState(0);
  const [update, setUpdate] = useState(0);

  useEffect(()=>{
    let interval = setInterval(() => {
      setCounter1(counter1 + 1);
      if(counter1 >= 1000){
        let tList = list;
        tList.push({
          id:id,
          nombre:"Producto"+id
        });
        setList(tList);
        setId(id + 1);
        setCounter1(0);
        setUpdate(!update);
      }
    }, 1);
    return ()=>{
      clearInterval(interval);
    }
  },[counter1]);

  //Declaración
  //useCallback(()=>{},[]);

  const handleDeleteCallback = useCallback(
    (id)=>{
      const tList = list.filter((item)=>{
        return item.id !== id
      });
      setList(tList);
      setUpdate(!update);
    },[list]);

    const handleDelete =
      (id)=>{
        const tList = list.filter((item)=>{
          return item.id !== id
        });
        setList(tList);
        setUpdate(!update);
      };

  //useMemo
  const listUseMemo = useMemo(
    ()=>
    <List
      list={list}
      update={update}
      handleDelete={handleDelete} />
  ,[update]);

  return(
    <div className="padre">
      <h1>{"EWebik mejorando el rendimiento useCallback y useMemo"}</h1>
      <div className="hijos">
        <Counter
          title={"No memorizado"}
          counter={counter1}/>
      </div>
      <div className="hijos">
      <ListMemo
        list={list}
        update={update}
        handleDelete={handleDeleteCallback} />
      </div>
      <div className="hijos">
        {
          listUseMemo
        }
      </div>
    </div>
  )
}


ReactDOM.render(
  <Component />,
  document.getElementById('root')
);
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
