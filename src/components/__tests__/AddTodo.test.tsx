import { render, screen, fireEvent } from "@testing-library/react";
import { TodoProvider, useTodos } from "../../context/TodoContext";
import AddTodo from "../../components/AddTodo";

const MockTodoList = () => {
  const { todos } = useTodos();
  return (
    <ul>
      {todos.map((todo) => (
        <li key={todo.id}>{todo.title}</li>
      ))}
    </ul>
  );
};

test("adds a new todo item", async () => {
  render(
    <TodoProvider>
      <AddTodo />
      <MockTodoList />
    </TodoProvider>
  );

  const input = screen.getByPlaceholderText("Add new Todo");
  const addButton = screen.getByText(/add/i);

  fireEvent.change(input, { target: { value: "New Todo" } });
  fireEvent.click(addButton);

  const newTodo = await screen.findByText(/new todo/i);
  expect(newTodo).toBeInTheDocument();
});
