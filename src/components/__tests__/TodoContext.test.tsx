import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { TodoProvider, useTodos } from '../../context/TodoContext';
import { Todo } from '../../types';

const MockTodoComponent: React.FC = () => {
    const { todos, addTodo, updateTodo, deleteTodo, toggleTodo, filterTodos } = useTodos();

    return (
        <div>
            <button onClick={() => addTodo("New Todo")}>Add Todo</button>
            <button onClick={() => filterTodos('notStarted')}>Filter Not Started</button>
            <button onClick={() => updateTodo("1", "Updated Todo")}>Update Todo</button>
            <button onClick={() => deleteTodo("1")}>Delete Todo</button>
            <button onClick={() => toggleTodo("1")}>Toggle Todo</button>
            <ul>
                {todos.map(todo => (
                    <li key={todo.id}>
                        {todo.title} - {todo.completed ? 'Completed' : 'Active'}
                    </li>
                ))}
            </ul>
        </div>
    );
};


describe('TodoContext', () => {
    test('initializes with no todos', () => {
        render(
            <TodoProvider>
                <MockTodoComponent />
            </TodoProvider>
        );

        expect(screen.queryByText(/New Todo/)).not.toBeInTheDocument();
    });

    test('adds a new todo', () => {
        render(
            <TodoProvider>
                <MockTodoComponent />
            </TodoProvider>
        );

        fireEvent.click(screen.getByText('Add Todo'));

        expect(screen.getByText('New Todo - Active')).toBeInTheDocument();
    });

    test('updates a todo', () => {
        const initialTodos: Todo[] = [{ id: "1", title: "Test Todo", completed: false }];

        render(
            <TodoProvider initialTodos={initialTodos}>
                <MockTodoComponent />
            </TodoProvider>
        );

        fireEvent.click(screen.getByText('Update Todo'));

        expect(screen.getByText('Updated Todo - Active')).toBeInTheDocument();
        expect(screen.queryByText('Test Todo')).not.toBeInTheDocument();
    });

    test('deletes a todo', () => {
        const initialTodos: Todo[] = [{ id: "1", title: "Test Todo", completed: false }];

        render(
            <TodoProvider initialTodos={initialTodos}>
                <MockTodoComponent />
            </TodoProvider>
        );

        fireEvent.click(screen.getByText('Delete Todo'));

        expect(screen.queryByText('Test Todo')).not.toBeInTheDocument();
    });

    test('toggles todo completion', () => {
        const initialTodos: Todo[] = [{ id: "1", title: "Test Todo", completed: false }];

        render(
            <TodoProvider initialTodos={initialTodos}>
                <MockTodoComponent />
            </TodoProvider>
        );

        fireEvent.click(screen.getByText('Toggle Todo'));

        expect(screen.getByText('Test Todo - Completed')).toBeInTheDocument();
    });

    test('handles toggle for already completed todo', () => {
        const initialTodos: Todo[] = [{ id: "1", title: "Test Todo", completed: true }];

        render(
            <TodoProvider initialTodos={initialTodos}>
                <MockTodoComponent />
            </TodoProvider>
        );

        fireEvent.click(screen.getByText('Toggle Todo'));

        expect(screen.getByText('Test Todo - Active')).toBeInTheDocument();
    });

    test('does not crash when updating non-existent todo', () => {
        const initialTodos: Todo[] = [{ id: "2", title: "Another Todo", completed: false }];

        render(
            <TodoProvider initialTodos={initialTodos}>
                <MockTodoComponent />
            </TodoProvider>
        );

        fireEvent.click(screen.getByText('Update Todo'));

        // Verify that the state remains unchanged
        expect(screen.getByText('Another Todo - Active')).toBeInTheDocument();
    });

    test('does not crash when deleting non-existent todo', () => {
        const initialTodos: Todo[] = [{ id: "1", title: "Test Todo", completed: false }];

        render(
            <TodoProvider initialTodos={initialTodos}>
                <MockTodoComponent />
            </TodoProvider>
        );

        fireEvent.click(screen.getByText('Delete Todo'));

        fireEvent.click(screen.getByText('Delete Todo')); // Try deleting again

        expect(screen.queryByText('Test Todo')).not.toBeInTheDocument();
    });
    test('filters notStarted todos', () => {
        const initialTodos: Todo[] = [
            { id: "1", title: "First Todo", completed: false },
            { id: "2", title: "", completed: false }, // This should be filtered out
            { id: "3", title: "Third Todo", completed: true }, // This should be filtered out
            { id: "4", title: " ", completed: false } // This should be filtered out
        ];
    
        render(
            <TodoProvider initialTodos={initialTodos}>
                <MockTodoComponent />
            </TodoProvider>
        );
    
        // Initially, all todos should be displayed since the default filter is 'all'.
        expect(screen.getByText('First Todo - Active')).toBeInTheDocument();
        expect(screen.getByText('Third Todo - Completed')).toBeInTheDocument();
    
        // Click to filter 'notStarted'
        fireEvent.click(screen.getByText('Filter Not Started'));
    
        // After filtering, only the 'notStarted' todos should be displayed
        expect(screen.queryByText('Third Todo - Completed')).not.toBeInTheDocument();
        expect(screen.queryByText('New Todo - Active')).not.toBeInTheDocument();
    });
    
    
});
