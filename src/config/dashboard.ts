import { DashboardConfig } from "types";

export const dashboardConfig: DashboardConfig = {
  mainNav: [
    {
      title: "Apply Now!",
      href: "/register",
    },
    {
      title: "DSC\'s Website",
      href: "/support",
    },
  ],
  sidebarNav: {
    form: [
      {
        title: "Registration",
        href: "/dashboard/registration",
        icon: "post",
      },
      {
        title: "Tasks",
        href: "/dashboard/tasks",
        icon: "post",
      },
    ],
    responses: [
      {
        title: "Responses",
        href: "/dashboard/responses",
        icon: "post",
      },
    ],
    settings: [
      {
        title: "Settings",
        href: "/dashboard",
        icon: "post",
      },
    ],
  },
};
