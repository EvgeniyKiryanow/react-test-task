import PropTypes from "prop-types";
function TaskList({ tasks, deleteTask, handleEdit }) {
  return (
    <ul className="list-group">
      {tasks.map((task) => (
        <li
          className="list-group-item d-flex align-items-center justify-content-between shadow p-3 mb-3 bg-white rounded"
          key={task.id}
        >
          <span className="list-group-info d-flex flex-column">
            <strong>Name:</strong> {task.name}
            <strong>Description: </strong> {task.description}
            <strong>File name:</strong> {task.file && task.file.name || "No file"}
          </span>
          <div className="control-panel">
            <button
              className="btn btn-danger"
              onClick={() => deleteTask(task.id)}
            >
              Delete
            </button>
            <button className="btn btn-info" onClick={() => handleEdit(task)}>
              Edit
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
export default TaskList;

TaskList.propTypes = {
  tasks: PropTypes.array,
  deleteTask: PropTypes.func,
  handleEdit: PropTypes.func,
};
