import React, { useState } from "react";
import "../style/Task.scss";
import TaskForm from "./TaskForm";
import TaskList from "./TaskList";

interface Task {
  id: number;
  name: string;
  description: string;
  completed: boolean;
  file?: File | null;
}

function TaskManager() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [isShowForm, setShowForm] = useState<boolean>(false);

  const addTask = (task: Task) => {
    setTasks([...tasks, { ...task, id: Date.now() }]);
  };

  const deleteTask = (id: number) => {
    setTasks(tasks.filter((task) => task.id !== id));
    setShowForm(false);
  };

  const editTask = (task: Task) => {
    setTasks(tasks.map((t) => (t.id === task.id ? task : t)));
    setIsEditing(false);
    setEditingTask(null);
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
  };

  const handleEdit = (task: Task) => {
    setShowForm(true);
    setIsEditing(true);
    setEditingTask(task);
  };

  return (
    <section>
      <button
        type="button"
        className="btn btn-primary"
        onClick={() => {
          setIsEditing(false);
          setShowForm(true);
        }}
      >
        Add Task +
      </button>
      {tasks.length === 0 ? (
        <p>No task available now</p>
      ) : (
        <TaskList
          tasks={tasks}
          deleteTask={deleteTask}
          handleEdit={handleEdit}
        />
      )}
      {isShowForm && (
        <TaskForm
          addTask={addTask}
          editTask={editTask}
          isEditing={isEditing}
          editingTask={editingTask}
          closeForm={closeForm}
        />
      )}
    </section>
  );
}

export default TaskManager;
