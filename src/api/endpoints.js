const API_ENDPOINTS = {
  AUTH: "auth/login",
  USERS: "user/roles",
  TEAMS: "teams",
  PROJECTS: {
    PROJECTS: "projects",
    UPLOAD_ASSETS: "projects/asset",
    ADD_PROJECT_MEMBERS: "projects/members",
    GET_PROJECT_MEMBERS: "projects",
    GET_PROJECT_ASSETS: "projects",
    DOWNLOAD_PROJECT_ASSET: "projects/asset",
    DELETE_PROJECT_ASSET: "projects/asset",
    DELETE_PROJECT_MEMBER: "projects",
    CARDS: "cards",
    TASKS: "tasks",
    ADD_TASKS_COMMENTS: "tasks/comments",
    GET_TASKS_BY_CARD: "tasks/card",
  },
  LEAD_SOURCES: "lead-sources",
  LEADS: "leads",
};

export default API_ENDPOINTS;
