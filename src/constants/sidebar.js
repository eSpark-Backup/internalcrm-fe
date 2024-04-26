import Dashboard from "../assets/logos/dashboard.svg?react";
import DashboardActive from "../assets/logos/dashboard-active.svg?react";

import Members from "../assets/logos/members.svg?react";
import MembersActive from "../assets/logos/members-active.svg?react";

import Teams from "../assets/logos/teams.svg?react";
import TeamsActive from "../assets/logos/teams-active.svg?react";

import Projects from "../assets/logos/projects.svg?react";
import ProjectsActive from "../assets/logos/projects-active.svg?react";

import Leads from "../assets/logos/lead.svg?react";
import LeadsActive from "../assets/logos/lead-active.svg"


export const sidebar_links = [
  {
    id: 1,
    heading: "Dashboard",
    icon: Dashboard,
    iconActive: DashboardActive,
    route: "/dashboard",
  },
  {
    id: 2,
    heading: "Members",
    icon: Members,
    iconActive: MembersActive,
    route: "/members",
  },
  {
    id: 3,
    heading: "Teams",
    icon: Teams,
    iconActive: TeamsActive,
    route: "/teams",
  },
  {
    id: 4,
    heading: "Projects",
    icon: Projects,
    iconActive: ProjectsActive,
    route: "/projects",
  },
  {
    id: 5,
    heading: "Lead Sources",
    icon: Leads,
    iconActive: LeadsActive,
    route: "/lead-sources",
  },

];
