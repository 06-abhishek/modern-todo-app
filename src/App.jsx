import { useState, useEffect } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import { Toaster } from "react-hot-toast";
import Header from "./components/Header";
import TodoList from "./components/TodoList";
import InputForm from "./components/InputForm";
import FilterBar from "./components/FilterBar";
import Footer from "./components/Footer";
import { loadTodos, saveTodos } from "./utils/storage";

function App() {
  const [todos, setTodos] = useState(loadTodos());
  const [filter, setFilter] = useState("all");
  const [sortBy, setSortBy] = useState("date");
  const [searchQuery, setSearchQuery] = useState("");
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("darkMode") === "true";
    }
    return false;
  });

  useEffect(() => {
    saveTodos(todos);
  }, [todos]);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode(!darkMode);

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const items = Array.from(todos);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setTodos(items);
  };

  return (
    <div className="min-h-screen pb-8">
      <Toaster position="top-right" />
      <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />

      <main className="container mx-auto mt-10 px-4 max-w-4xl">
        <InputForm setTodos={setTodos} />
        <FilterBar
          filter={filter}
          setFilter={setFilter}
          sortBy={sortBy}
          setSortBy={setSortBy}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
        <DragDropContext onDragEnd={handleDragEnd}>
          <TodoList
            todos={todos}
            setTodos={setTodos}
            filter={filter}
            sortBy={sortBy}
            searchQuery={searchQuery}
          />
        </DragDropContext>
      </main>
      <Footer />
    </div>
  );
}

export default App;