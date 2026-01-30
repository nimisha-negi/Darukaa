const BASE_URL = "http://127.0.0.1:8000/projects/";

const getAuthHeader = () => {
  const token = localStorage.getItem("access_token");
  if (!token) throw new Error("No token found, please login");
  return { Authorization: `Bearer ${token}` };
};

export const getProjects = async () => {
  const res = await fetch(BASE_URL, { headers: getAuthHeader() });
  if (!res.ok) {
    if (res.status === 401) {
      localStorage.removeItem("access_token");
      window.location.href = "/";
    }
    throw new Error("Failed to fetch projects");
  }
  return await res.json();
};

export const createProject = async (project) => {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeader(),
    },
    body: JSON.stringify(project),
  });

  if (!res.ok) {
    if (res.status === 401) {
      localStorage.removeItem("access_token");
      window.location.href = "/";
    }
    throw new Error("Failed to create project");
  }

  return await res.json();
};
export const deleteProject = async (id) => {
  const res = await fetch(`${BASE_URL}${id}/`, {
    method: "DELETE",
    headers: {
      ...getAuthHeader(),
    },
  });

  if (!res.ok) {
    if (res.status === 401) {
      localStorage.removeItem("access_token");
      window.location.href = "/";
    }
    throw new Error("Failed to delete project");
  }

  return true;
};
