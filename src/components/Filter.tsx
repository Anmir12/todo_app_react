import React from "react";
import { useTodos } from "../context/TodoContext";

const Filter: React.FC = () => {
    const { filterTodos } = useTodos();

    const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        filterTodos(e.target.value as "all" | "active" | "completed" | "notStarted");
    };

    return (
        <div className="filter-container">
            <label htmlFor="filter">Filter:</label>
            <select id="filter" onChange={handleFilterChange}>
                <option value="all">All</option>
                <option value="active">Active</option>
                <option value="completed">Completed</option>
                {/* <option value="notStarted">Not Started</option> */}
            </select>
        </div>
    );
};

export default Filter;
