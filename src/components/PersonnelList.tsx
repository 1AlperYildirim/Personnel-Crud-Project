import React, { useContext, useState } from "react";
import { PersonnelContext } from "../context/PersonnelContext";
import type { Personnel } from "../context/PersonnelContext";
import { deletePersonnel } from "../api/personnelApi";

type Props = {
  search: { name: string; registry: string; email: string; department: string };
  onEdit: (p: Personnel) => void;
};

const PersonnelList: React.FC<Props> = ({ search, onEdit }) => {
  const { personnel, setPersonnel } = useContext(PersonnelContext);
  const [sortConfig, setSortConfig] = useState<{ key: keyof Personnel; direction: "asc" | "desc" } | null>(null);

  const handleDelete = (id: number) => {
    deletePersonnel(id)
      .then(() => setPersonnel(prev => prev.filter(p => p.id !== id)))
      .catch(() => setPersonnel(prev => prev.filter(p => p.id !== id)));
  };

  const handleSort = (key: keyof Personnel) => {
    let direction: "asc" | "desc" = "asc";
    if (sortConfig && sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  let filtered = personnel.filter(p =>
    p.fullName.toLowerCase().includes(search.name.toLowerCase()) &&
    p.registryNumber.toLowerCase().includes(search.registry.toLowerCase()) &&
    p.email.toLowerCase().includes(search.email.toLowerCase()) &&
    p.department.toLowerCase().includes(search.department.toLowerCase())
  );

  if (sortConfig) {
    filtered = [...filtered].sort((a, b) => {
      const aValue = String(a[sortConfig.key]).toLowerCase();
      const bValue = String(b[sortConfig.key]).toLowerCase();
      if (aValue < bValue) return sortConfig.direction === "asc" ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === "asc" ? 1 : -1;
      return 0;
    });
  }

  const sortArrow = (key: keyof Personnel) => {
    if (!sortConfig || sortConfig.key !== key) return "↕";
    return sortConfig.direction === "asc" ? "▲" : "▼";
  };

  return (
    <div className="personnel-table">
      {/* Header */}
      <div className="personnel-header" role="row">
        <div className="col col-name">
          Name
          <button className="sort-btn" onClick={() => handleSort("fullName")}>{sortArrow("fullName")}</button>
        </div>
        <div className="col col-registry">
          Registry No
          <button className="sort-btn" onClick={() => handleSort("registryNumber")}>{sortArrow("registryNumber")}</button>
        </div>
        <div className="col col-email">
          Email
          <button className="sort-btn" onClick={() => handleSort("email")}>{sortArrow("email")}</button>
        </div>
        <div className="col col-department">
          Department
          <button className="sort-btn" onClick={() => handleSort("department")}>{sortArrow("department")}</button>
        </div>
        <div className="col col-update">Update</div>
        <div className="col col-delete">Delete</div>
      </div>

      {/* Body */}
      <div className="personnel-body">
        {filtered.map(p => (
          <div key={p.id} className="personnel-row" role="row">
            <div className="col col-name">{p.fullName}</div>
            <div className="col col-registry">{p.registryNumber}</div>
            <div className="col col-email">{p.email}</div>
            <div className="col col-department">{p.department}</div>
            <div className="col col-update">
              <div className="btn-wrap">
                <button className="edit-btn" onClick={() => onEdit(p)}>Edit</button>
              </div>
            </div>
            <div className="col col-delete">
              <div className="btn-wrap">
                <button className="delete-btn" onClick={() => handleDelete(p.id)}>Delete</button>
              </div>
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
          <div className="no-results">No personnel found.</div>
        )}
      </div>
    </div>
  );
};

export default PersonnelList;
