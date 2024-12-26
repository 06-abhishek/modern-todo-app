export const filterTodos = (todos, filter, searchQuery) => {
  let filteredTodos = todos;

  // Apply status filter
  if (filter === 'active') {
    filteredTodos = filteredTodos.filter((todo) => !todo.completed);
  } else if (filter === 'completed') {
    filteredTodos = filteredTodos.filter((todo) => todo.completed);
  }

  // Apply search filter
  if (searchQuery) {
    const query = searchQuery.toLowerCase();
    filteredTodos = filteredTodos.filter(
      (todo) =>
        todo.title.toLowerCase().includes(query) ||
        todo.description.toLowerCase().includes(query)
    );
  }

  return filteredTodos;
};

export const sortTodos = (todos, sortBy) => {
  const priorityOrder = { high: 0, medium: 1, low: 2 };

  return [...todos].sort((a, b) => {
    switch (sortBy) {
      case 'date':
        return new Date(a.dueDate) - new Date(b.dueDate);
      case 'priority':
        return priorityOrder[a.priority] - priorityOrder[b.priority];
      case 'alphabetical':
        return a.title.localeCompare(b.title);
      default:
        return 0;
    }
  });
};