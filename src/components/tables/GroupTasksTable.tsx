import React from "react";

const GroupTasksTable = ({
  title,
  tasks,
  onEditTask,
  onDeleteTask,
  domain,
}) => {
  return (
    <div className="container mx-auto px-4 rounded-xl shadow-lg p-5">
      <h1 className="text-3xl font-bold text-dsc btn btn-ghost mb-3">{title} domain tasks</h1>
      <div className="overflow-x-auto rounded-md">
        <table className="table rounded-xl">
          <thead className="bg-dsc p-10">
            <tr className="text-center text-white font-bold text-xl uppercase">
              <th>Title</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody className="text-center text-white font-semibold text-lg bg-dsc/20">
            {tasks.map((task, taskIndex) => (
              <tr key={taskIndex}>
                <td className="px-4 py-2">{task.title}</td>
                <td className="px-4 py-2">{task.description}</td>
                <td className="px-4 py-2">
                  <div>
                    <button
                      className="btn btn-warning btn-xs mr-2"
                      onClick={() =>
                        onEditTask(
                          taskIndex,
                          Object.assign(task, { domain: domain })
                        )
                      }
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-error btn-xs"
                      onClick={() => onDeleteTask(taskIndex, domain)}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default GroupTasksTable;
