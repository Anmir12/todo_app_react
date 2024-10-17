import React from "react";
import { TodoProvider } from "./context/TodoContext";
import TodoList from "./components/TodoList";
import AddTodo from "./components/AddTodo";
import Filter from "./components/Filter";
const App: React.FC = () => {
    return (
        <TodoProvider>
            <div id="root">
            <h1>Todo App</h1>
            <div className="add-todo">
                <AddTodo />
                <Filter />
            </div>
            <TodoList />
        </div>
        </TodoProvider>
    );
};

export default App;
