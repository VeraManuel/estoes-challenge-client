import http from "../http-common";

const getAll = () => {
  return http.get("/users");
};

const get = (id) => {
  return http.get(`/users/${id}`);
};

export default {
  getAll,
  get,
};
