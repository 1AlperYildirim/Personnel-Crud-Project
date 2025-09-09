import React, { useState, useContext, useEffect } from "react";
import PersonnelForm from "../components/PersonnelForm";
import PersonnelList from "../components/PersonnelList";
import type { Personnel } from "../context/PersonnelContext";
import { PersonnelContext } from "../context/PersonnelContext";
import { getPersonnel, searchPersonnel } from "../api/personnelApi";

const PersonnelPage: React.FC = () => {
  const { setPersonnel } = useContext(PersonnelContext);

  const [editData, setEditData] = useState<Personnel>({
    id: null as unknown as number,
    fullName: "",
    registryNumber: "",
    email: "",
    department: ""
  });

  const [searchName, setSearchName] = useState("");
  const [searchRegistry, setSearchRegistry] = useState("");
  const [searchEmail, setSearchEmail] = useState("");
  const [searchDepartment, setSearchDepartment] = useState("");

  
  useEffect(() => {
    getPersonnel()
      .then(res => setPersonnel(res.data))
      .catch(err => {
        console.error("Initial load failed:", err);
        setPersonnel([]);
      });
  }, [setPersonnel]);

  useEffect(() => {
    const handler = setTimeout(() => {
      const params = {
        fullName: searchName || undefined,
        registryNumber: searchRegistry || undefined,
        email: searchEmail || undefined,
        department: searchDepartment || undefined
      };
      const any = Object.values(params).some(Boolean);

      const action = any ? searchPersonnel(params) : getPersonnel();
      action
        .then(res => setPersonnel(res.data))
        .catch(err => {
          console.error("Search/load failed:", err);
          setPersonnel([]);
        });
    }, 400);

    return () => clearTimeout(handler);
  }, [searchName, searchRegistry, searchEmail, searchDepartment, setPersonnel]);

  return (
    <div className="container">
      <h1>Personnel Management</h1>

      <div className="search-row">
        <input
          type="text"
          placeholder="Search by Name..."
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Search by Registry..."
          value={searchRegistry}
          onChange={(e) => setSearchRegistry(e.target.value)}
        />
        <input
          type="text"
          placeholder="Search by Email..."
          value={searchEmail}
          onChange={(e) => setSearchEmail(e.target.value)}
        />
        <input
          type="text"
          placeholder="Search by Department..."
          value={searchDepartment}
          onChange={(e) => setSearchDepartment(e.target.value)}
        />
      </div>

      <PersonnelForm editData={editData} setEditData={setEditData} />
      <PersonnelList onEdit={(p) => setEditData(p)} />
    </div>
  );
};

export default PersonnelPage;
