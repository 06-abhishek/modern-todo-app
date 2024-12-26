import { useState } from 'react';
import { format } from 'date-fns';
import { toast } from 'react-hot-toast';
import {
  PencilIcon,
  TrashIcon,
  CheckIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';

export default function TodoItem({ todo, setTodos }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(todo.title);
  const [editedDescription, setEditedDescription] = useState(todo.description);
  const [editedDueDate, setEditedDueDate] = useState(todo.dueDate);
  const [editedPriority, setEditedPriority] = useState(todo.priority);

  const handleComplete = () => {
    setTodos((prev) =>
      prev.map((t) =>
        t.id === todo.id ? { ...t, completed: !t.completed } : t
      )
    );
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this todo?')) {
      setTodos((prev) => prev.filter((t) => t.id !== todo.id));
      toast.success('Todo deleted successfully');
    }
  };

  const handleSave = () => {
    if (!editedTitle.trim()) {
      toast.error('Title cannot be empty');
      return;
    }

    setTodos((prev) =>
      prev.map((t) =>
        t.id === todo.id
          ? {
              ...t,
              title: editedTitle,
              description: editedDescription,
              dueDate: editedDueDate,
              priority: editedPriority,
            }
          : t
      )
    );
    setIsEditing(false);
    toast.success('Todo updated successfully');
  };

  const priorityColors = {
    high: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
    medium: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
    low: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
  };

  if (isEditing) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 animate-slide-in">
        <input
          type="text"
          value={editedTitle}
          onChange={(e) => setEditedTitle(e.target.value)}
          className="input mb-2"
          placeholder="Todo title"
        />
        <textarea
          value={editedDescription}
          onChange={(e) => setEditedDescription(e.target.value)}
          className="input mb-2"
          placeholder="Description"
        />
        <div className="flex gap-4 mb-4">
          <input
            type="date"
            value={editedDueDate}
            onChange={(e) => setEditedDueDate(e.target.value)}
            className="input"
          />
          <select
            value={editedPriority}
            onChange={(e) => setEditedPriority(e.target.value)}
            className="input"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
        <div className="flex justify-end gap-2">
          <button
            onClick={() => setIsEditing(false)}
            className="btn bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600"
          >
            <XMarkIcon className="h-5 w-5" />
          </button>
          <button onClick={handleSave} className="btn btn-primary">
            <CheckIcon className="h-5 w-5" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`bg-white dark:bg-gray-800 rounded-lg shadow p-4 transition-opacity ${
        todo.completed ? 'opacity-75' : ''
      } animate-slide-in`}
    >
      <div className="flex items-start gap-4">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={handleComplete}
          className="mt-1.5 h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
        />
        <div className="flex-1">
          <h3
            className={`text-lg font-medium ${
              todo.completed ? 'line-through text-gray-500' : ''
            }`}
          >
            {todo.title}
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            {todo.description}
          </p>
          <div className="flex items-center gap-4 mt-2">
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Due: {format(new Date(todo.dueDate), 'MMM d, yyyy')}
            </span>
            <span
              className={`text-sm px-2 py-1 rounded-full ${
                priorityColors[todo.priority]
              }`}
            >
              {todo.priority.charAt(0).toUpperCase() + todo.priority.slice(1)}
            </span>
          </div>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setIsEditing(true)}
            className="p-2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
          >
            <PencilIcon className="h-5 w-5" />
          </button>
          <button
            onClick={handleDelete}
            className="p-2 text-red-500 hover:text-red-700 dark:hover:text-red-300"
          >
            <TrashIcon className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}