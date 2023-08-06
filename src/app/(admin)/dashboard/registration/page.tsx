"use client";
import React, { useState, useEffect } from "react";
import { ComponentHeader } from "@/components/Header";
import { ComponentShell } from "@/components/Shell";

export const metadata = {
  title: "Dashboard",
};

function FormFieldsTable({ formFields, handleEditField, handleDeleteField }) {
  return (
    <div className="overflow-x-auto rounded-md">
      <table className="table rounded-md">
        <thead className="bg-dsc p-10">
          <tr className="text-center text-white font-bold text-xl uppercase">
            <th>Name</th>
            <th>Description</th>
            <th>Type</th>
            <th>Required</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody className="text-center text-white font-semibold text-lg bg-dsc/20">
          {formFields.map((field, index) => (
            <tr key={field.name}>
              <td className="px-4 py-2">{field.name}</td>
              <td className="px-4 py-2">{field.description}</td>
              <td className="px-4 py-2">{field.type.replace("_", " ")}</td>
              <td className="px-4 py-2 ">{field.required ? "Yes" : "No"}</td>
              <td className="px-4 py-2">
                {field.default ? (
                  <span className="badge uppercase font-bold h-auto p-1">
                    This is the default field
                  </span>
                ) : (
                  <div>
                    <button
                      className="btn btn-warning btn-xs mr-2"
                      onClick={() => handleEditField(index)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-error btn-xs"
                      onClick={() => handleDeleteField(field.name)}
                    >
                      Delete
                    </button>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function DashboardPage() {
  useEffect(() => {
    function getFormFields() {
      fetch("http://localhost:3000/api/registration-form").then((response) => {
        response.json().then((data) => {
          setFormFields(data.registrationForm.fields);
        });
      });
    }
    getFormFields()
  }, []);
  const [formFields, setFormFields] = useState([
    {
      name: "name",
      description: "Please provide your name",
      type: "text_area",
      minLength: 3,
      maxLength: 50,
      required: true,
      default: true,
    },
    {
      name: "description",
      type: "text_area",
      description:
        "Please give a brief explanation about yourself and your interests",
      required: true,
    },
  ]);

  const [newField, setNewField] = useState({
    name: "",
    description: "",
    type: "text_area",
    required: false,
    options: [],
  });

  const [showPopup, setShowPopup] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const [editIndex, setEditIndex] = useState(-1);

  useEffect(() => {
    if (hasChanges) {
      setShowPopup(true);
    }
  }, [hasChanges]);

  const handleAddField = () => {
    setFormFields([...formFields, newField]);
    setNewField({
      name: "",
      description: "",
      type: "text_area",
      required: false,
      options: [],
    });
    setHasChanges(true);
    window.my_modal_1.close();
  };

  const handleFormSubmit = () => {
    fetch("/api/registration-form", {
      method: "POST",
      body: JSON.stringify({ fields: formFields }),
    })
      .then((res) => res.json())
      .then((data) => {
        setHasChanges(false);
        setShowPopup(false);
      });
  };

  const openModal = () => {
    window.my_modal_1.showModal();
  };

  const handleAddOption = () => {
    setNewField({ ...newField, options: [...newField.options, { name: "" }] });
  };

  const handleEditField = (index) => {
    setEditIndex(index);
    setNewField(formFields[index]);
    openModal();
  };

  const handleCancelEdit = () => {
    setEditIndex(-1);
    setNewField({
      name: "",
      description: "",
      type: "text_area",
      required: false,
      options: [],
    });
    window.my_modal_1.close();
  };

  const handleUpdateField = () => {
    const updatedFields = [...formFields];
    updatedFields[editIndex] = newField;
    setFormFields(updatedFields);
    handleCancelEdit();
    setHasChanges(true);
  };

  const handleDeleteField = (fieldName) => {
    setFormFields(formFields.filter((field) => field.name !== fieldName));
    setHasChanges(true);
  };

  const handleDeleteOption = (optionIndex) => {
    const updatedOptions = newField.options.filter(
      (option, index) => index !== optionIndex
    );
    setNewField({ ...newField, options: updatedOptions });
  };

  const handleEditOption = (optionIndex, updatedOption) => {
    setNewField((prevField) => {
      const updatedOptions = prevField.options.map((option, index) =>
        index === optionIndex ? { ...option, ...updatedOption } : option
      );
      return { ...prevField, options: updatedOptions };
    });
  };

  return (
    <ComponentShell>
      <ComponentHeader
        heading="Registration Form Management"
        text="This is where you can manage the registration form."
      />
      <div className="grid gap-10 border border-dsc rounded-md p-4">
        <h3 className="font-bold text-lg">Form Fields</h3>
        <FormFieldsTable
          formFields={formFields}
          handleEditField={handleEditField}
          handleDeleteField={handleDeleteField}
        />
        <button className="btn btn-success mr-2" onClick={openModal}>
          Add Fields
        </button>
      </div>

      <dialog id="my_modal_1" className="modal">
        <form
          method="dialog"
          className="modal-box"
          onSubmit={(e) => {
            e.preventDefault();
            editIndex >= 0 ? handleUpdateField() : handleAddField();
          }}
        >
          <h3 className="font-bold text-lg">
            {editIndex >= 0 ? "Edit Field" : "Add Field"}
          </h3>
          <div className="py-4">
            <label className="flex flex-col mb-4">
              <span className="label-text text-lg mb-1 font-bold">
                Question/Title
              </span>
              <input
                type="text"
                className="input input-bordered"
                value={newField.name}
                onChange={(e) =>
                  setNewField({ ...newField, name: e.target.value })
                }
              />
            </label>
            <label className="flex flex-col mb-4">
              <span className="label-text text-lg mb-1 font-bold">
                Description
              </span>
              <input
                type="text"
                className="textarea textarea-bordered"
                value={newField.description}
                onChange={(e) =>
                  setNewField({ ...newField, description: e.target.value })
                }
              />
            </label>
            <label className="flex flex-col mb-4">
              <span className="label-text text-lg mb-1 font-bold">
                Field Type
              </span>
              <div className="flex flex-wrap gap-y-2">
                {["text_area", "single_choice", "multiple_choice"].map(
                  (type) => (
                    <div
                      className={`btn btn-sm mr-2 ${
                        newField.type === type ? "btn-success" : "btn"
                      }`}
                      onClick={() => setNewField({ ...newField, type })}
                    >
                      {newField.type === type ? (
                        <div className="w-2 h-2 flex items-center justify-center">
                          <div className="w-2 h-2 bg-current rounded-full"></div>
                        </div>
                      ) : null}
                      {type.replace("_", " ").toUpperCase()}
                    </div>
                  )
                )}
              </div>
            </label>
            <label className="flex flex-col mb-4">
              <span className="label-text text-lg mb-1 font-bold">
                Required?
              </span>
              <div className="flex flex-wrap gap-4 items-center">
                <input
                  type="checkbox"
                  className={`
                  toggle toggle-lg ${
                    newField.required ? "toggle-success" : "toggle-error"
                  }
                  `}
                  checked={newField.required}
                  onChange={(e) =>
                    setNewField({ ...newField, required: e.target.checked })
                  }
                />
                <span className="label-text mb-1 font-bold">
                  This field must be filled by the applicant
                </span>
              </div>
            </label>
            {}
            {newField.type === "text_area" && (
              <div className="flex flex-col mb-4">
                <span className="label-text text-lg mb-1 font-bold">
                  Limits
                </span>
                <div className="join">
                  <input
                    className="input focus:outline-none bg-base-200 w-16 rounded-r-none join-item"
                    placeholder="0"
                    value={newField.minLength || ""}
                    onChange={(e) =>
                      setNewField({
                        ...newField,
                        minLength: e.target.value,
                      })
                    }
                  />
                  <div className="grow h-12 bg-base-300 px-2 py-1 flex flex-row flex-nowrap items-center justify-center join-item">
                    <svg
                      className="w-4 h-4 lg:w-8 lg:h-8"
                      fill="currentColor"
                      viewBox="0 0 512 512"
                    >
                      <path
                        fill="none"
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="48"
                        d="M328 112 184 256l144 144"
                      ></path>
                    </svg>{" "}
                    <div className="font-semibold text-sm">Content</div>{" "}
                    <svg
                      className="w-4 h-4 lg:w-8 lg:h-8"
                      fill="currentColor"
                      viewBox="0 0 512 512"
                    >
                      <path
                        fill="none"
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="48"
                        d="M328 112 184 256l144 144"
                      ></path>
                    </svg>
                  </div>
                  <input
                    className="input focus:outline-none bg-base-200 w-16 rounded-r-none join-item"
                    placeholder="100"
                    value={newField.maxLength || ""}
                    onChange={(e) =>
                      setNewField({
                        ...newField,
                        maxLength: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
            )}

            {["single_choice", "multiple_choice"].includes(newField.type) && (
              <div className="flex flex-col mb-4">
                <div className="w-full flex flex-row gap-1 items-start justify-between">
                  <span className="label-text text-lg mb-1 font-bold">
                    Options
                  </span>
                  <div
                    onClick={handleAddOption}
                    className="btn btn-success btn-xs"
                  >
                    +
                  </div>
                </div>
                {newField.options.map((option, optionIndex) => (
                  <div key={optionIndex}>
                    <div className="w-full flex flex-col gap-1 items-start justify-between">
                      <div className="w-full flex flex-col gap-1 items-start justify-start py-1 px-2 rounded-md ">
                        <div className="w-full flex flex-row flex-nowrap gap-2 items-center justify-start">
                          {newField.type === "single_choice" ? (
                            <input
                              type="radio"
                              className="radio checked:bg-success checked:border-success border-neutral"
                              checked
                            />
                          ) : (
                            <input
                              type="checkbox"
                              className="checkbox checked:checkbox-success"
                            />
                          )}
                          <input
                            type="text"
                            className="input input-bordered input-sm w-full max-w-md"
                            minlength="2"
                            maxlength="150"
                            value={option.name}
                            onChange={(e) =>
                              handleEditOption(optionIndex, {
                                name: e.target.value,
                              })
                            }
                          ></input>
                          <div
                            className="btn btn-xs btn-error"
                            onClick={() => handleDeleteOption(optionIndex)}
                          >
                            delete
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="modal-action">
            <button type="submit" className="btn">
              {editIndex >= 0 ? "Update Field" : "Add Field"}
            </button>
            {editIndex >= 0 && (
              <div className="btn" onClick={() => window.my_modal_1.close()}>
                Cancel Edit
              </div>
            )}
            <div className="btn" onClick={() => window.my_modal_1.close()}>
              Cancel
            </div>
          </div>
        </form>
      </dialog>
      {hasChanges && showPopup && (
        <div className="fixed bottom-4 right-4 bg-white p-4 shadow-lg rounded-lg">
          <p>There are unsaved changes. Do you want to save them?</p>
          <div className="mt-4 flex space-x-4">
            <button className="btn btn-primary" onClick={handleFormSubmit}>
              Save Changes
            </button>
            <button className="btn" onClick={() => setShowPopup(false)}>
              Cancel
            </button>
          </div>
        </div>
      )}
    </ComponentShell>
  );
}
