import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types';

interface TaskFormProps {
  addTask: (task: Task) => void;
  editTask: (task: Task) => void;
  isEditing: boolean;
  editingTask: Task | null;
  closeForm: () => void;
}

interface Task {
  id: number;
  name: string;
  description: string;
  completed: boolean;
  file?: File | null;
}

function TaskForm({
  addTask,
  editTask,
  isEditing,
  editingTask,
  closeForm,
}: TaskFormProps) {
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [completed, setCompleted] = useState<boolean>(false);
  const [file, setFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState("Choose file");

  useEffect(() => {
    if (isEditing && editingTask) {
      setName(editingTask.name);
      setDescription(editingTask.description);
      setCompleted(editingTask.completed);
      setFile(editingTask.file || null);
      setFileName(editingTask.file ? editingTask.file.name : "Choose file");
    } else {
      resetForm();
    }
  }, [isEditing, editingTask]);

  const resetForm = () => {
    setName("");
    setDescription("");
    setFile(null);
    setCompleted(false);
    setFileName("Choose file");
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setFileName(selectedFile.name);
    } else {
      deleteFile();
    }
  };

  const deleteFile = (e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    setFile(null);
    setFileName("Choose file");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const task = {
      // Date.now() -> quick solution
      id: editingTask ? editingTask.id : Date.now(),
      name,
      description,
      completed,
      file,
    };
    if (isEditing) {
      editTask(task);
    } else {
      addTask(task);
    }
    closeForm();
    resetForm();
  };

  return (
    <form onSubmit={handleSubmit} className="task-list-wrapper shadow">
      <div className="form-group">
        <h3 className="text-center">
          {isEditing ? "Edit Task" : "Create a New Task"}
        </h3>
        <hr />
        <label htmlFor="nameInput">Your name</label>
        <input
          type="text"
          className="form-control"
          id="nameInput"
          placeholder="Enter name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="descriptionInput">Description</label>
        <input
          type="text"
          className="form-control"
          id="descriptionInput"
          placeholder="Enter description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>
      <div className=" form-check">
        <input
          type="checkbox"
          className="form-check-input"
          id="completedCheck"
          checked={completed}
          onChange={(e) => setCompleted(e.target.checked)}
        />
        <label className="form-check-label" htmlFor="completedCheck">
          Completed / Not Completed
        </label>
      </div>
      <div className="form-group">
        <div className="custom-file">
          <input
            type="file"
            id="fileInput"
            onChange={handleFileChange}
            style={{ display: "none" }}
          />

          <label htmlFor="fileInput" className="custom-button">
            Upload File
          </label>
          <span className="file-name">{fileName}</span>
          <style>{`
                .custom-file, .custom-button {
                    border:1px solid black;
                    padding:5px;
                    border-radius:10px;
                    cursor:pointer;
                }
                    .file-name {
                    padding-left:5px;
                }
            `}</style>
          {isEditing && editingTask && file && (
            <button onClick={deleteFile} className="btn btn-danger">
              Delete
            </button>
          )}
        </div>
      </div>
      <button type="submit" className="btn btn-primary create-btn">
        {isEditing ? "Update Task" : "Create Task"}
      </button>
    </form>
  );
}

export default TaskForm;

TaskForm.propTypes = {
    closeForm: PropTypes.func,
    addTask: PropTypes.func,
    editTask: PropTypes.func,
    isEditing: PropTypes.bool,
    editingTask: PropTypes.object || null,
  };