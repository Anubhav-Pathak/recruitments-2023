import React from "react";

export default function ResponseDetails({ response }) {
  console.log(response);
  return (
    <div>
      <h2 className="text-lg font-bold">{response.registrationNumber}</h2>
      <p className="text-muted-foreground">
        {new Date(response.createdAt).toLocaleString()}
      </p>
      {response.registrationForm && (
        <div>
          {Object.entries(response.registrationForm[0]).map(([key, value]) => {
            console.log({ key, value });
            return (
              <div key={key} className="flex flex-col gap-2">
                <span className="text-white font-bold">{key}</span>
                <span className="text-muted-foreground">{value}</span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
