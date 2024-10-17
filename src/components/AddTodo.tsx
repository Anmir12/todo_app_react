// src/components/AddTodo.tsx
import React, { useState } from "react";
import { useTodos } from "../context/TodoContext";

const AddTodo: React.FC = () => {
    const { addTodo } = useTodos();
    const [title, setTitle] = useState('');

    const handleAdd = () => {
        if (title.trim()) {
            addTodo(title);
            setTitle('');
        }
    };

    return (
        <div className="add-todo">
            <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Add new Todo"
            />
            <button className="btn-dynamic btn-add" onClick={handleAdd}>Add</button>
        </div>
    );
};

export default AddTodo;
