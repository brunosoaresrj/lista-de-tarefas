import './App.css';

import {useState, useEffect} from "react";
import {BsTrash, BsBookmarkCheck, BsBookmarkCheckFill} from "react-icons";

const API = "http://localhost:5000";


function App() {
  const [title, setTitle] = useState("");
  const [time, setTime] = useState("");
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadData = async () => {
    setLoading(true);

    const res = await fetch(API + "/todos")
      .then((res) => res.json())
      .then((data)=> data)
      .catch((err) => console.log(err));

      setLoading(false)

      setTodos(res);
    };
    loadData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
 
    const todo = {
      id: Math.random(),
      title,
      time,
      done: false,

    }

    //Envio para a API
   await fetch(API + "/todos", {
    method: "POST",
    body: JSON.stringify(todo),
    headers: {
      "Content-Type": "application/json",
    },
   })

    setTitle("");
    setTime("");
  };
  
  return (
    <div className="App">
      <div className="todo-header">
        <h1> React To Do</h1>
      </div>
      <div className="form-todo">
        <h2> Insira sua próxima tarefa:</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-control">
            <label htmlFor="title">O que você vai fazer?</label>
            <input 
              type="text" 
              name="title" 
              placeholder="Título da tarefa" 
              onChange={(e) => setTitle(e.target.value)} 
              value={title || ""} 
              required 
            />
          </div>
          <div className="form-control">
            <label htmlFor="time">Duração: </label>
            <input 
              type="text" 
              name="time" 
              placeholder="Tempo estimado (em horas)" 
              onChange={(e) => setTime(e.target.value)} 
              value={time || ""} 
              required 
            />
          </div>
          <input type="submit" value="Criar tarefa" />
        </form>
      </div>
      <div className="list-todo">
        <p>Lista de tarefas:</p>
        {todos.length === 0 && <p>Não há tarefas!</p>}
      </div>
    </div>
  );
}

export default App;
