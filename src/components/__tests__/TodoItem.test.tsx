import { render, screen, fireEvent } from "@testing-library/react";
import TodoItem from "../TodoItem";
import { useTodos, TodoContextType } from "../../context/TodoContext";

// Mock the useTodos context
jest.mock("../../context/TodoContext");

describe("TodoItem", () => {
    const mockToggleTodo = jest.fn();
    const mockUpdateTodo = jest.fn();
    const mockDeleteTodo = jest.fn();

    beforeEach(() => {
        (useTodos as jest.Mock).mockReturnValue({
            todos: [], // You can mock this if needed
            addTodo: jest.fn(),
            updateTodo: mockUpdateTodo,
            deleteTodo: mockDeleteTodo,
            toggleTodo: mockToggleTodo,
            filterTodos: jest.fn(),
            currentFilter: 'all', // Set a default filter
        } as TodoContextType);
    });

    const todo = { id: "1", title: "Test Todo", completed: false }; // Ensure `id` is a string

    it("renders correctly", () => {
        render(<TodoItem todo={todo} />);
        expect(screen.getByText("Test Todo")).toBeInTheDocument();
        expect(screen.getByRole("checkbox")).not.toBeChecked();
    });

    it("toggles todo on checkbox change", () => {
        render(<TodoItem todo={todo} />);
        fireEvent.click(screen.getByRole("checkbox"));
        expect(mockToggleTodo).toHaveBeenCalledWith(todo.id);
    });

    it("enters editing mode on double click", () => {
        render(<TodoItem todo={todo} />);
        fireEvent.doubleClick(screen.getByText("Test Todo"));
        expect(screen.getByDisplayValue("Test Todo")).toBeInTheDocument();
    });

    it("saves the updated title on enter", () => {
        render(<TodoItem todo={todo} />);
        fireEvent.doubleClick(screen.getByText("Test Todo"));
        const input = screen.getByDisplayValue("Test Todo");
        fireEvent.change(input, { target: { value: "Updated Todo" } });
        fireEvent.keyUp(input, { key: "Enter" });
        expect(mockUpdateTodo).toHaveBeenCalledWith(todo.id, "Updated Todo");
    });

    it("does not save if title is unchanged", () => {
        render(<TodoItem todo={todo} />);
        fireEvent.doubleClick(screen.getByText("Test Todo"));
        const input = screen.getByDisplayValue("Test Todo");
        fireEvent.change(input, { target: { value: "Test Todo" } });
        fireEvent.keyUp(input, { key: "Enter" });
        expect(mockUpdateTodo).not.toHaveBeenCalled();
    });

    it("deletes the todo on delete button click", () => {
        render(<TodoItem todo={todo} />);
        fireEvent.click(screen.getByRole("button", { name: /delete/i }));
        expect(mockDeleteTodo).toHaveBeenCalledWith(todo.id);
    });
});
