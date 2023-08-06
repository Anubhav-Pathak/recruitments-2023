import React from "react";

const TaskModal = ({
  id,
  title,
  onSubmit,
  taskTitle,
  onTaskTitleChange,
  taskDescription,
  onTaskDescriptionChange,
  taskDomain,
  onTaskDomainChange,
  actionButtonLabel,
}) => {
  const domains = ["technical", "creatives", "corporate"];
  return (
    <dialog id={id} className="modal">
      <form
        method="dialog"
        className="modal-box"
        onSubmit={(e) => {
          onSubmit();
        }}
      >
        <h3 className="font-bold text-lg">{title}</h3>
        <label className="flex flex-col mb-4">
          <span className="label-text text-lg mb-1 font-bold">Title</span>
          <input
            type="text"
            className="input input-bordered"
            value={taskTitle}
            onChange={onTaskTitleChange}
          />
        </label>
        <label className="flex flex-col mb-4">
          <span className="label-text text-lg mb-1 font-bold">Description</span>
          <textarea
            className="input input-bordered"
            value={taskDescription}
            onChange={onTaskDescriptionChange}
          />
        </label>
        <label className="flex flex-col mb-4">
          <span className="label-text text-lg mb-1 font-bold">
            Specify a domain
          </span>
          <select
            className="select select-bordered w-full"
            value={taskDomain}
            onChange={onTaskDomainChange}
          >
            <option disabled selected>
              Select a domain
            </option>
            {domains.map((domain, i) => (
              <option key={i} value={domain}>
                {domain}
              </option>
            ))}
          </select>
        </label>
        <label className="flex flex-row mb-4 border border-dsc border-dashed rounded-md p-4 items-center justify-between">
          <span className="label-text text-lg mb-1 font-bold">
            Add task to all groups in the same domain
          </span>
          <input type="checkbox" className="toggle" />
        </label>
        <div className="modal-action">
          <button type="submit" className="btn">
            {actionButtonLabel}
          </button>
          <button className="btn">Cancel</button>
        </div>
      </form>
    </dialog>
  );
};

export default TaskModal;
