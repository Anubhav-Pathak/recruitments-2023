import React from "react";
import { EmptyPlaceholder } from "@/components/EmptyPlaceholder";
import { ComponentHeader } from "@/components/Header";
import { ComponentShell } from "@/components/Shell";
import ResponseDetails from "@/components/ResponseDetails";

export const metadata = {
  title: "Dashboard",
};

const getResponse = async (id) => {
  const response = await fetch(`http://localhost:3000/api/applications/${id}`, {
    next: {
      tags: ["response", "responses"],
      revalidate: 60 * 30,
    },
  });
  const { application } = await response.json();
  return application?.at(0);
};

export default async function DashboardPage({ params }) {
  const { id } = params;

  const response = await getResponse(id);

  if (!response) {
    return (
      <ComponentShell>
        <ComponentHeader
          heading="Responses"
          text="Manage application response."
        ></ComponentHeader>
        <EmptyPlaceholder>
          <EmptyPlaceholder.Icon name="response" />
          <EmptyPlaceholder.Title>Responses not found</EmptyPlaceholder.Title>
          <EmptyPlaceholder.Description>
            The response you are looking for does not exist.
          </EmptyPlaceholder.Description>
        </EmptyPlaceholder>
      </ComponentShell>
    );
  }

  return (
    <ComponentShell>
      <ComponentHeader
        heading={`Response #${response.registrationNumber}`}
        text={`Manage response #${response.registrationNumber}`}
      ></ComponentHeader>
      <div>
        <ResponseDetails response={response} />
      </div>
    </ComponentShell>
  );
}
