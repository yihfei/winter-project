import './App.css';
import Navbar from './Navbar';
import TodoList from './TodoList';
import Create from './Create';
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<TodoList />} />
        <Route path="/create" element={<Create />} />
      </Routes>
    </div>
    
  );
}

export default App;
