import React, { useState } from "react";
import { Todo } from "../types";
import { useTodos } from "../context/TodoContext";

interface TodoItemProps {
    todo: Todo;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo }) => {
    const { updateTodo, deleteTodo, toggleTodo } = useTodos();
    const [isEditing, setIsEditing] = useState(false);
    const [title, setTitle] = useState(todo.title);

    const handleSave = () => {
        if (title.trim() && title !== todo.title) {
            updateTodo(todo.id, title);
        }
        setIsEditing(false);
    };

    return (
        <li className="todo-item">
            <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleTodo(todo.id)}
            />
            {isEditing ? (
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    onBlur={handleSave}
                    onKeyUp={(e) => e.key === 'Enter' && handleSave()}
                    autoFocus
                />
            ) : (
                <span onDoubleClick={() => setIsEditing(true)}>
                    {todo.title}
                </span>
            )}
            <div className="actions">
                <button className="btn-dynamic btn-edit" onClick={() => setIsEditing(true)}>
                    Edit
                </button>
                <button className="btn-dynamic btn-delete" onClick={() => deleteTodo(todo.id)}>
                    Delete
                </button>
            </div>
        </li>
    );
};

export default TodoItem;
