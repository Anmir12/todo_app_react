import React, { createContext, useContext, useState, useMemo } from 'react';
import { Todo } from '../types';

export type TodoContextType = {
    todos: Todo[];
    addTodo: (title: string) => void;
    updateTodo: (id: string, title: string) => void;
    deleteTodo: (id: string) => void;
    toggleTodo: (id: string) => void;
    filterTodos: (filter: 'all' | 'active' | 'completed' | 'notStarted') => void;
    currentFilter: 'all' | 'active' | 'completed' | 'notStarted';
};

const TodoContext = createContext<TodoContextType | undefined>(undefined);

export const TodoProvider: React.FC<{ children: React.ReactNode; initialTodos?: Todo[] }> = ({ children, initialTodos = [] }) => {
    const [todos, setTodos] = useState<Todo[]>(initialTodos);
    const [filter, setFilter] = useState<'all' | 'active' | 'completed' | 'notStarted'>('all');

    const addTodo = (title: string) => {
        setTodos([...todos, { id: Date.now().toString(), title, completed: false }]);
    };

    const updateTodo = (id: string, title: string) => {
        setTodos(todos.map(todo => (todo.id === id ? { ...todo, title } : todo)));
    };

    const deleteTodo = (id: string) => {
        setTodos(todos.filter(todo => todo.id !== id));
    };

    const toggleTodo = (id: string) => {
        const updatedTodos = todos.map(todo => (todo.id === id ? { ...todo, completed: !todo.completed } : todo));
        setTodos(updatedTodos);
    };

    const filterTodos = (filter: 'all' | 'active' | 'completed' | 'notStarted') => {
        setFilter(filter);
    };

    const filteredTodos = useMemo(() => {
        switch (filter) {
            case 'active':
                return todos.filter(todo => !todo.completed);
            case 'completed':
                return todos.filter(todo => todo.completed);
            case 'notStarted':
                return todos.filter(todo => !todo.completed && todo.title.trim() !== '');
            default:
                return todos;
        }
    }, [todos, filter]);

    return (
        <TodoContext.Provider value={{ todos: filteredTodos, addTodo, updateTodo, deleteTodo, toggleTodo, filterTodos, currentFilter: filter }}>
            {children}
        </TodoContext.Provider>
    );
};

export const useTodos = () => {
    const context = useContext(TodoContext);
    if (!context) {
        throw new Error('useTodos must be used within a TodoProvider');
    }
    return context;
};
