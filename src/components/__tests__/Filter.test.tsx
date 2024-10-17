// src/components/Filter.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { TodoProvider } from "../../context/TodoContext";
import Filter from '../Filter';
import TodoList from '../TodoList'; // Import TodoList to verify filter results

const mockTodos = [
    { id: "1", title: "Learn Testing", completed: false },
    { id: "2", title: "Practice Coding", completed: true },
    { id: "3", title: "Read Documentation", completed: false },
];

test('renders filter and filters todos', () => {
    render(
        <TodoProvider initialTodos={mockTodos}>
            <Filter />
            <TodoList />
        </TodoProvider>
    );

    expect(screen.getByRole('combobox')).toBeInTheDocument();

    // Select "Active" filter
    fireEvent.change(screen.getByRole('combobox'), { target: { value: 'active' } });

    // Check if only active todos are displayed
    const activeTodos = screen.getAllByRole('listitem');
    expect(activeTodos).toHaveLength(2); // There should be 2 active todos
    expect(screen.getByText("Learn Testing")).toBeInTheDocument();
    expect(screen.getByText("Read Documentation")).toBeInTheDocument();
    expect(screen.queryByText("Practice Coding")).not.toBeInTheDocument(); // Completed todo should not be displayed

    // Select "Completed" filter
    fireEvent.change(screen.getByRole('combobox'), { target: { value: 'completed' } });

    // Check if only completed todos are displayed
    const completedTodos = screen.getAllByRole('listitem');
    expect(completedTodos).toHaveLength(1); // There should be 1 completed todo
    expect(screen.queryByText("Learn Testing")).not.toBeInTheDocument(); // Active todo should not be displayed
    expect(screen.queryByText("Read Documentation")).not.toBeInTheDocument(); // Active todo should not be displayed
    expect(screen.getByText("Practice Coding")).toBeInTheDocument(); // Completed todo should be displayed

    // Select "All" filter
    fireEvent.change(screen.getByRole('combobox'), { target: { value: 'all' } });

    // Check if all todos are displayed
    const allTodos = screen.getAllByRole('listitem');
    expect(allTodos).toHaveLength(3); // All todos should be displayed
});
