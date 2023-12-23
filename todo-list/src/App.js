import './App.css';
import Navbar from './Navbar';
import TodoList from './TodoList';
import Create from './Create';
import { Route, Routes } from "react-router-dom";
import Edit from './Edit';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<TodoList />} />
        <Route path="/create" element={<Create />} />
        <Route path="/edit/:id" element={<Edit />}/>
      </Routes>
    </div>

  );
}

export default App;
