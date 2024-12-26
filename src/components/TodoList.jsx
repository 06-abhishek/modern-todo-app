import { memo } from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import TodoItem from './TodoItem';
import { sortTodos, filterTodos } from '../utils/todoHelpers';

const TodoList = ({ todos, setTodos, filter, sortBy, searchQuery }) => {
  const filteredAndSortedTodos = sortTodos(
    filterTodos(todos, filter, searchQuery),
    sortBy
  );

  if (filteredAndSortedTodos.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500 dark:text-gray-400">
        No todos found
      </div>
    );
  }

  return (
    <Droppable droppableId="todos">
      {(provided) => (
        <div
          {...provided.droppableProps}
          ref={provided.innerRef}
          className="space-y-4"
        >
          {filteredAndSortedTodos.map((todo, index) => (
            <Draggable key={todo.id} draggableId={todo.id} index={index}>
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                  style={{
                    ...provided.draggableProps.style,
                    opacity: snapshot.isDragging ? 0.8 : 1,
                  }}
                >
                  <TodoItem todo={todo} setTodos={setTodos} />
                </div>
              )}
            </Draggable>
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};

export default memo(TodoList);