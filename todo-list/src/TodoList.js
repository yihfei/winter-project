import useFetch from "./useFetch";

const TodoList  = () => {

    const {data : tasks, isPending, error} = useFetch('http://localhost:3030/tasks');

    return ( 
        <div className="TodoList">
            <h1>List of Tasks</h1>
            {tasks && tasks.map((task) => (
                <div key={task.id}>
                    <h2>{task.name}</h2>
                    <p>{task.description}</p>
                </div>
            ))}
        </div>
     );
}
 
export default TodoList;