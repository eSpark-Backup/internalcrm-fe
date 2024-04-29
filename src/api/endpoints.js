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
  },
};

export default API_ENDPOINTS;
