import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080/api/personnel"
});

export type PersonnelPayload = {
  fullName: string;
  registryNumber: string;
  email: string;
  department: string;
};

export const getPersonnel = () => api.get(""); 
export const searchPersonnel = (params: Partial<PersonnelPayload>) =>
  api.get("/search", { params });

export const createPersonnel = (data: PersonnelPayload) => api.post("", data);
export const updatePersonnel = (id: number, data: PersonnelPayload) =>
  api.put(`/${id}`, data);
export const deletePersonnel = (id: number) => api.delete(`/${id}`);
