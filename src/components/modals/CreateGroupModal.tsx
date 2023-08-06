"use client";
import React, { useState } from "react";

const CreateGroupModal = ({ onCreate }) => {
  const [newGroupName, setNewGroupName] = useState("");
  const [newGroupRegex, setNewGroupRegex] = useState("");

  const handleCreateGroup = () => {
    onCreate(newGroupName, newGroupRegex);
    setNewGroupName("");
    setNewGroupRegex("");
  };

  return (
    <dialog id="group_add_modal" className="modal">
      <form
        method="dialog"
        className="modal-box"
        onSubmit={(e) => {
          handleCreateGroup();
        }}
      >
        <h3 className="font-bold text-lg">Create New Group</h3>
        <label className="flex flex-col mb-4">
          <span className="label-text text-lg mb-1 font-bold">Group Name</span>
          <input
            type="text"
            className="input input-bordered"
            value={newGroupName}
            onChange={(e) => setNewGroupName(e.target.value)}
          />
        </label>
        <label className="flex flex-col mb-4 gap-1">
          <span className="label-text text-lg mb-1 font-bold">Group Regex</span>
          <img src="/tasks.svg" className="rounded-md" />
          <input
            type="text"
            className="input input-bordered"
            value={newGroupRegex}
            onChange={(e) => {
              e.target.value = e.target.value
                .replace(/[^0-9]/g, "")
                .slice(0, 2);
              setNewGroupRegex(e.target.value);
            }}
            maxLength={2}
          />
          {newGroupRegex && (
            <div className="items-center gap-2 mt-2">
              <span className="font-bold">Register numbers that match</span>
              <span className="badge badge-outline badge-accent gap-1 h-auto rounded-md ml-1">
                <span className="font-bold">RA</span>
                <span className="font-bold badge-secondary p-1">
                  {newGroupRegex}
                </span>
                <span className="font-bold lowercase">xxxxxx</span>
              </span>
              <span className="font-bold">
                {" "}
                will be assigned {newGroupName}'s tasks
              </span>
            </div>
          )}
        </label>
        <div className="modal-action">
          <button type="submit" className="btn">
            Create Group
          </button>
        </div>
      </form>
    </dialog>
  );
};

export default CreateGroupModal;
