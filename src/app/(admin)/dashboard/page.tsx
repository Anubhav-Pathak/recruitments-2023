"use client";
import React, { useState, useEffect } from "react";
import { ComponentHeader } from "@/components/Header";
import { ComponentShell } from "@/components/Shell";

interface ApplicantSettings {
  status: boolean;
  value: number;
}

interface Settings {
  recruitmentStatus: boolean;
  maxApplicants: ApplicantSettings;
  validGmailDomains: string[];
  domains: string[];
}

const RoundedDiv: React.FC<{ title: string; children: React.ReactNode }> = ({
  title,
  children,
}) => (
  <div className="flex-grow w-full h-auto m-4">
    <div className="px-4 py-2 rounded-md shadow-md bg-base-200">
      <h4 className="headings uppercase font-bold text-lg mb-1 md:mb-3">
        {title}
      </h4>
      {children}
    </div>
  </div>
);

const RecruitmentSettings: React.FC = () => {
  const [settings, setSettings] = useState<Settings | undefined>();
  const [hasChanges, setHasChanges] = useState(false);
  const [newDomain, setNewDomain] = useState("");

  useEffect(() => {
    console.log("Settings changed", { settings });
    setHasChanges(true);
  }, [settings]);

  useEffect(() => {
    const fetchSettings = () => {
      fetch("/api/settings")
        .then((res) => res.json())
        .then(({ settings }) => setSettings(settings));
    };
    fetchSettings();
  }, []);

  if (!settings) return <div>Loading...</div>;

  const handleRecruitmentStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSettings({ ...settings, recruitmentStatus: e.target.checked });
  };

  const handleMaxApplicantsChange = (status: boolean, value: number) => {
    setSettings({
      ...settings,
      maxApplicants: { status, value: status ? value : 100 },
    });
  };

  const handleFormSubmit = () => {
    fetch("/api/settings", {
      method: "POST",
      body: JSON.stringify(settings),
    });
    setHasChanges(false);
  };

  return (
    <ComponentShell>
      <ComponentHeader
        heading="Recruitment Settings"
        text="Manage recruitment settings."
      ></ComponentHeader>
      <div className="w-full flex justify-evenly flex-wrap select-none">
        <RoundedDiv title="Recruitment Status">
          <div className="px-2 pb-4 w-full">
            <div className="font-bold">Recruitment Status:</div>
            <div className="w-full">
              <div className="justify-start inline-flex w-full">
                <div className="min-h-12 px-2 flex items-center">
                  <input
                    type="checkbox"
                    className={`toggle ${
                      settings.recruitmentStatus
                        ? "toggle-success"
                        : "toggle-error"
                    }`}
                    checked={settings.recruitmentStatus}
                    onChange={handleRecruitmentStatusChange}
                  />
                </div>{" "}
                <div className="min-h-12 flex justify-center items-center">
                  Enable Recruitments
                </div>
              </div>
            </div>
          </div>
        </RoundedDiv>

        <RoundedDiv title="Maximum Applicants">
          <div className="px-2 pb-4 w-full">
            <div className="font-bold">Specify Maximum Applicants:</div>
            <div className="w-full">
              <div className="justify-start inline-flex w-full">
                <div className="min-h-12 px-2 flex items-center">
                  <input
                    type="checkbox"
                    className={`toggle ${
                      settings.maxApplicants.status
                        ? "toggle-success"
                        : "toggle-error"
                    }`}
                    checked={settings.maxApplicants.status}
                    onChange={(e) => {
                      handleMaxApplicantsChange(
                        e.target.checked,
                        settings.maxApplicants.value
                      );
                    }}
                  />
                </div>
                <div className="min-h-12 flex justify-center items-center">
                  Add a limit to the number of applicants
                </div>
              </div>
              {settings.maxApplicants.status && (
                <div>
                  <div className="font-bold mb-2">
                    Specify Maximum Applicants:
                  </div>
                  <div className="justify-start inline-flex w-full">
                    <div className="min-h-12 px-2 flex items-center">
                      <input
                        type="number"
                        placeholder="Provide a number"
                        className="input input-bordered w-full max-w-xs"
                        value={settings.maxApplicants.value}
                        onChange={(e) =>
                          handleMaxApplicantsChange(
                            true,
                            parseInt(e.target.value, 10)
                          )
                        }
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </RoundedDiv>
        <RoundedDiv title="Club Domains">
          <div className="px-2 pb-4 w-full gap-5 flex flex-col">
            <label className="font-bold">
              Add domains that the candidates are allowed to apply to:
            </label>
            <ul className="flex flex-col flex-wrap max-w-md">
              {settings.domains?.map((domain: string, index: number) => (
                <div key={index} className="flex flex-row gap-2 items-center">
                  <div className="flex items-center rounded-md px-2 py-1 my-1 bg-dsc">
                    <span className="font-bold mr-2 btn btn-ghost btn-sm">
                      {domain}
                    </span>
                  </div>
                  <button
                    className="btn btn-error btn-circle btn-xs"
                    onClick={() => {
                      const updatedDomains = settings.domains.filter(
                        (_, i) => i !== index
                      );
                      setSettings({
                        ...settings,
                        domains: updatedDomains,
                      });
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
              ))}
            </ul>
            <div className="flex items-center gap-2">
              <input
                type="text"
                placeholder="Add a valid club domain"
                className="input input-bordered w-full max-w-xs input-sm"
                value={newDomain}
                onChange={(e) => setNewDomain(e.target.value)}
              />
              <button
                className="btn btn-primary btn-sm"
                onClick={() => {
                  setSettings({
                    ...settings,
                    domains: [...settings.domains, newDomain.toLowerCase()],
                  });
                }}
              >
                Add
              </button>
            </div>
          </div>
        </RoundedDiv>
        <RoundedDiv title="Valid Gmail Domains">
          <div className="px-2 pb-4 w-full gap-5 flex flex-col">
            <label className="font-bold">
              Valid Gmail Domains (case-insensitive)
            </label>
            <ul className="flex flex-wrap max-w-md">
              {settings.validGmailDomains.map((domain, index) => (
                <div
                  className="flex items-center rounded-md px-2 py-1 my-1 bg-dsc"
                  key={index}
                >
                  <span className="font-bold mr-2 btn btn-ghost btn-sm">
                    @{domain}
                  </span>
                  <button
                    className="btn btn-error btn-xs"
                    onClick={() => {
                      const updatedDomains = settings.validGmailDomains.filter(
                        (_, i) => i !== index
                      );
                      setSettings({
                        ...settings,
                        validGmailDomains: updatedDomains,
                      });
                    }}
                  >
                    Remove
                  </button>
                </div>
              ))}
            </ul>
            <div className="flex items-center gap-2">
              <input
                type="text"
                placeholder="Add a valid gmail domain"
                className="input input-bordered w-full max-w-xs input-sm"
                value={newDomain}
                onChange={(e) => setNewDomain(e.target.value)}
              />
              <button
                className="btn btn-primary btn-sm"
                onClick={() => {
                  setSettings({
                    ...settings,
                    validGmailDomains: [
                      ...settings.validGmailDomains,
                      newDomain.toLowerCase(),
                    ],
                  });
                }}
              >
                Add
              </button>
            </div>
          </div>
        </RoundedDiv>
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
      </div>
    </ComponentShell>
  );
};

export default RecruitmentSettings;
