"use client";
import React, { useState, useEffect } from "react";
import GroupTasksTable from "@/components/tables/GroupTasksTable";
import TaskModal from "@/components/modals/TaskModal";
import CreateGroupModal from "@/components/modals/CreateGroupModal";
import { EmptyPlaceholder } from "@/components/EmptyPlaceholder";
import { ComponentHeader } from "@/components/Header";
import { ComponentShell } from "@/components/Shell";

export default function GroupsPage() {
  const [groups, setGroups] = useState({});

  useEffect(() => {
    setHasChanges(true);
  }, [groups]);

  useEffect(() => {
    const fetchSettings = () => {
      fetch("/api/registration-form")
        .then((res) => res.json())
        .then(({ registrationForm }) => setGroups(registrationForm.tasks));
    };
    fetchSettings();
  }, []);

  const [activeGroupName, setActiveGroupName] = useState("");
  const [hasChanges, setHasChanges] = useState(false);

  const [newTask, setNewTask] = useState({});
  const [editedTask, setEditedTask] = useState({});

  console.log({ groups });
  const handleFormSubmit = () => {
    fetch("/api/registration-form/task", {
      method: "POST",
      body: JSON.stringify({ tasks: groups }),
    });
    setHasChanges(false);
  };
  const handleCreateGroup = (groupName, groupRegex) => {
    const newGroup = {
      regex: groupRegex,
      tasks: {
        creatives: [],
        technical: [],
        corporate: [],
      },
    };
    setGroups({ ...groups, [groupName]: newGroup });
    setActiveGroupName(groupName);
  };

  const openAddTaskModal = () => {
    setNewTask({
      title: "",
      description: "",
      domain: "",
    });
    window.task_add_modal.showModal();
  };

  const openEditTaskModal = (taskIndex, task) => {
    setEditedTask({
      index: taskIndex,
      title: task.title,
      description: task.description,
      domain: task.domain,
    });
    window.task_edit_modal.showModal();
  };

  const handleSaveEditedTask = () => {
    if (editedTask.index !== null) {
      handleEditTaskInGroup();
      closeEditTaskModal();
    }
  };

  const handleEditTaskInGroup = () => {
    const updatedGroup = { ...groups[activeGroupName] };
    updatedGroup.tasks[editedTask.domain].splice(editedTask.index, 1, {
      title: editedTask.title,
      description: editedTask.description,
    });
    setGroups({ ...groups, [activeGroupName]: updatedGroup });
  };

  const closeEditTaskModal = () => {
    setEditedTask({});
    window.task_edit_modal.close();
  };

  const handleAddTaskToGroup = () => {
    const updatedGroup = { ...groups[activeGroupName] };

    if (newTask.domain) {
      if (!updatedGroup.tasks[newTask.domain]) {
        updatedGroup.tasks[newTask.domain] = [];
      }

      updatedGroup.tasks[newTask.domain].push({
        title: newTask.title,
        description: newTask.description,
      });
      setGroups({ ...groups, [activeGroupName]: updatedGroup });
      setNewTask({});
      window.task_add_modal.close();
    }
  };

  const handleDeleteTaskFromGroup = (taskIndex, domain) => {
    const updatedGroup = { ...groups[activeGroupName] };
    updatedGroup.tasks[domain].splice(taskIndex, 1);
    setGroups({ ...groups, [activeGroupName]: updatedGroup });
  };

  if (Object.keys(groups || []).length === 0) {
    return (
      <ComponentShell>
        <ComponentHeader
          heading="Tasks"
          text="Manage Tasks for each Group"
        ></ComponentHeader>
        <EmptyPlaceholder>
          <EmptyPlaceholder.Icon name="response" />
          <EmptyPlaceholder.Title>
            There are no groups available!
          </EmptyPlaceholder.Title>
          <EmptyPlaceholder.Description>
            Create a group to get started.
          </EmptyPlaceholder.Description>
          <div className="mt-4">
            <button
              className="btn"
              onClick={() => window.group_add_modal.showModal()}
            >
              Create New Group
            </button>
          </div>
        </EmptyPlaceholder>
        <CreateGroupModal onCreate={handleCreateGroup} />
      </ComponentShell>
    );
  }

  return (
    <ComponentShell>
      <div className="grid gap-10 border border-dsc rounded-md p-4">
        <h3 className="font-bold text-lg">Groups</h3>
        <div className="mt-4">
          <button
            className="btn"
            onClick={() => window.group_add_modal.showModal()}
          >
            Create New Group
          </button>
        </div>
        <div className="tabs justify-center transition-colors duration-700 mb-8">
          {Object.entries(groups).map(([groupName, groupInfo]) => (
            <div
              className={`tab tab-bordered tab-sm lg:tab-lg uppercase ${
                activeGroupName === groupName ? "tab-active" : ""
              }`}
              key={groupName}
              onClick={() => setActiveGroupName(groupName)}
            >
              <div className="w-full flex flex-row flex-nowrap items-center gap-2">
                <div className="inline-flex items-center gap-2">
                  <span className="font-bold">{groupName}</span>
                  <span className="badge badge-outline badge-accent gap-1 h-auto rounded-md">
                    <span className="font-bold">RA</span>
                    <span className="font-bold badge-secondary p-1">
                      {groupInfo.regex}
                    </span>
                    <span className="font-bold lowercase">xxxxxx</span>
                  </span>
                </div>
              </div>{" "}
            </div>
          ))}
        </div>
        {activeGroupName && (
          <div className="mt-4 border border-dsc border-dashed rounded-md p-4 flex gap-4 flex-col">
            <div className="flex flex-row flex-wrap justify-between items-center">
              <h4 className="btn btn-ghost text-xl font-bold">
                {activeGroupName} Tasks
              </h4>
              <button
                className="btn btn-success text-xl text-bold"
                onClick={openAddTaskModal}
              >
                + Add Task
              </button>
            </div>
            <div className="divider"></div>

            <GroupTasksTable
              title="Creative"
              tasks={groups[activeGroupName].tasks.creatives}
              onEditTask={openEditTaskModal}
              onDeleteTask={handleDeleteTaskFromGroup}
              domain="creatives"
            />
            <GroupTasksTable
              title="Technical"
              tasks={groups[activeGroupName].tasks.technical}
              onEditTask={openEditTaskModal}
              onDeleteTask={handleDeleteTaskFromGroup}
              domain="technical"
            />
            <GroupTasksTable
              title="corporate"
              tasks={groups[activeGroupName].tasks.corporate}
              onEditTask={openEditTaskModal}
              onDeleteTask={handleDeleteTaskFromGroup}
              domain="corporate"
            />
          </div>
        )}
      </div>

      <TaskModal
        id="task_edit_modal"
        title={`Edit Task in ${activeGroupName}`}
        onSubmit={handleSaveEditedTask}
        taskTitle={editedTask.title}
        onTaskTitleChange={(e) =>
          setEditedTask({
            ...editedTask,
            title: e.target.value,
          })
        }
        taskDescription={editedTask.description}
        onTaskDescriptionChange={(e) =>
          setEditedTask({
            ...editedTask,
            description: e.target.value,
          })
        }
        taskDomain={editedTask.domain}
        onTaskDomainChange={(e) => {
          setEditedTask({
            ...editedTask,
            domain: e.target.value,
          });
        }}
        actionButtonLabel="Save Changes"
      />

      <TaskModal
        id="task_add_modal"
        title={`Add Task to ${activeGroupName}`}
        onSubmit={handleAddTaskToGroup}
        taskTitle={newTask.title}
        onTaskTitleChange={(e) => {
          setNewTask({
            ...newTask,
            title: e.target.value,
          });
        }}
        taskDescription={newTask.description}
        onTaskDescriptionChange={(e) =>
          setNewTask({
            ...newTask,
            description: e.target.value,
          })
        }
        onTaskDomainChange={(e) => {
          setNewTask({
            ...newTask,
            domain: e.target.value,
          });
        }}
        actionButtonLabel="Add Task"
      />
      <CreateGroupModal onCreate={handleCreateGroup} />
      {hasChanges && (
        <div className="fixed bottom-4 right-4 bg-white p-4 shadow-lg rounded-lg bg-base-300 z-50 outline outline-offset-2 outline-dsc outline-dashed">
          <div className="font-bold text-lg">
            There are unsaved changes. Do you want to save them?
          </div>
          <div className="mt-4 flex space-x-4">
            <button className="btn btn-primary" onClick={handleFormSubmit}>
              Save Changes
            </button>
            <button className="btn" onClick={() => setHasChanges(false)}>
              Cancel
            </button>
          </div>
        </div>
      )}
    </ComponentShell>
  );
}
