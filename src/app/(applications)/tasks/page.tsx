import { ComponentHeader } from "@/components/Header";
import { ComponentShell } from "@/components/Shell";
import { authOptions } from "@/lib/auth";
import TaskForm from "@/components/forms/tasks";
import { getCurrentUser } from "@/lib/session";
import TasksLottie from "@/components/LottieComponents/TasksLottie";

export const metadata = {
  title: "Register",
  description: "Register for an account",
};

const getFormFields = async () => {
  const response = await fetch("http://localhost:3000/api/registration-form", {
    next: {
      tags: ["form"],
      revalidate: 60 * 30,
    },
  });
  const json = await response.json();
  return Object.values(json.registrationForm.tasks)?.at(0).tasks.technical;
};

export default async function SettingsPage() {
  const user = await getCurrentUser();
  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login");
  }

  return (
    <ComponentShell>
      <div className="bg-base-200 text-gray-500 rounded-3xl shadow-xl w-full overflow-hidden">
        <div className="md:flex w-full">
          <div className="w-full md:w-1/2 py-10 px-5 md:px-10">
            <div className="mb-10">
              <h1 className="font-bold text-6xl bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500">
                TASKS
              </h1>
              <p className="text-gray-500 text-lg">
                Complete the tasks below to apply to the club
              </p>
            </div>
            <div className="flex flex-col border border-gray-200 border-dashed rounded-lg px-8 py-10 bg-dsc">
              <TaskForm formFields={await getFormFields()} user={user} />
            </div>
          </div>
          <div className="hidden md:flex flex-col w-1/2 h-screen justify-around items-center bg-dsc py-10 px-10">
            <div className="rounded-md bg-base-200 bg-stripes md:bg-stripes-dsc border p-10">
              <h1 className="font-bold text-6xl bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500 mb-5">
                JOIN THE DATA SCIENCE CLUB
              </h1>
              <div className="text-gray-200 text-lg font-bold">
                Unleash your inner data racer and conquer the Data Science
                Tracks!{" "}
              </div>
            </div>
            <div className="rounded-full bg-base-200 bg-stripes md:bg-stripes-dsc border p-5">
              <TasksLottie />
            </div>
          </div>
        </div>
      </div>
    </ComponentShell>
  );
}
