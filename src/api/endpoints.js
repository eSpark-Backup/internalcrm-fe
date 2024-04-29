const API_ENDPOINTS = {
  AUTH: "auth/login",
  USERS: "user/roles",
  TEAMS: "teams",
  PROJECTS: {
    PROJECTS: "projects",
    UPLOAD_ASSETS: "projects/asset",
    ADD_PROJECT_MEMBERS: "projects/members",
    GET_PROJECT_MEMBERS: "projects/:id",
    GET_PROJECT_ASSETS: "projects/:id",
    DOWNLOAD_PROJECT_ASSET: "projects/asset/:id",
    DELETE_PROJECT_ASSET: "projects/asset/:id",
    DELETE_PROJECT_MEMBER: "projects/:id",
  },
};

export default API_ENDPOINTS;
