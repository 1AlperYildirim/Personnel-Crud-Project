import React, { useState } from "react";
import PersonnelForm from "../components/PersonnelForm";
import PersonnelList from "../components/PersonnelList";
import type { Personnel } from "../context/PersonnelContext";

const PersonnelPage: React.FC = () => {
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
      <PersonnelList
        search={{ name: searchName, registry: searchRegistry, email: searchEmail, department: searchDepartment }}
        onEdit={(p) => setEditData(p)}
      />
    </div>
  );
};

export default PersonnelPage;
