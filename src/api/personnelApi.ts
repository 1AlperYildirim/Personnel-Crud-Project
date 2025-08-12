import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080/api/personnel"
});

export const getPersonnel = () => api.get("/");
export const createPersonnel = (data: any) => api.post("/", data);
export const updatePersonnel = (id: number, data: any) => api.put(`/${id}`, data);
export const deletePersonnel = (id: number) => api.delete(`/${id}`);
