import { EmptyPlaceholder } from "@/components/EmptyPlaceholder";
import { ComponentHeader } from "@/components/Header";
import { ComponentShell } from "@/components/Shell";
import Link from "next/link";
import ResponseGraph from "@/components/ResponseGraph";

export const metadata = {
  title: "Dashboard",
};

const getResponses = async () => {
  const response = await fetch("http://localhost:3000/api/applications", {
    next: {
      tags: ["responses"],
      revalidate: 60 * 30,
    },
  });
  const { applications } = await response.json();
  return applications;
};

export default async function DashboardPage() {
  const responses = await getResponses();
  console.log({ responses });

  return (
    <ComponentShell>
      <ComponentHeader
        heading="Responses"
        text="Manage application responses."
      ></ComponentHeader>
      <div>
        {responses?.length ? (
          <div className="grid gap-10">
            <div className="border border-white border-dashed rounded-md p-4 mb-4">
              <ResponseGraph responses={responses} />
            </div>
            <div className="divide-y divide-border rounded-md border border-dsc">
              {responses.sort((a, b) => Date.now(a.createdAt) - Date.now(b.createdAt)).map((response) => (
                <div
                  key={response.registrationNumber}
                  className="flex items-center justify-between p-4"
                >
                  <div className="flex flex-col gap-5">
                    <Link
                      href={`/dashboard/responses/${response.registrationNumber}`}
                    >
                      {new Date() - new Date(response.createdAt) <= 1800000 && (
                        <p className="badge badge-success rounded-md p-1 font-bold">
                          NEW
                        </p>
                      )}
                      <h2 className="text-xl font-bold hover:underline">
                        <span className="text-white">
                          Response by {response.registrationNumber}
                        </span>{" "}
                      </h2>
                    </Link>
                    <div className="flex items-center space-x-2">
                      <p
                        className="text-sm text-muted-foreground bg-neutral-700 p-1 rounded-sm font-bold tooltip"
                        data-tip="Date of response creation"
                      >
                        {new Date(response.createdAt).toLocaleDateString()}
                      </p>
                      <span className="text-sm text-muted-foreground">•</span>
                      <p
                        className="text-sm text-muted-foreground bg-neutral-700 p-1 rounded-sm font-bold tooltip"
                        data-tip="Time of response creation"
                      >
                        {new Date(response.createdAt).toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Link
                      href={`/dashboard/responses/${response.registrationNumber}`}
                    >
                      <button className="btn btn-outline btn-sm">
                        View Response
                      </button>
                    </Link>
                    <button className="btn btn-error btn-outline btn-sm">
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <EmptyPlaceholder>
            <EmptyPlaceholder.Icon name="response" />
            <EmptyPlaceholder.Title>
              No responses created
            </EmptyPlaceholder.Title>
            <EmptyPlaceholder.Description>
              You don&apos;t have any responses yet. Start creating content.
            </EmptyPlaceholder.Description>
          </EmptyPlaceholder>
        )}
      </div>
    </ComponentShell>
  );
}
