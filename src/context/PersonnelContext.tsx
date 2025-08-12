import React, { createContext, useState, useEffect } from "react";
import { getPersonnel } from "../api/personnelApi";

export type Personnel = {
  id: number;
  fullName: string;
  registryNumber: string;
  email: string;
  department: string;
};

type PersonnelContextType = {
  personnel: Personnel[];
  setPersonnel: React.Dispatch<React.SetStateAction<Personnel[]>>;
};

export const PersonnelContext = createContext<PersonnelContextType>({
  personnel: [],
  setPersonnel: () => {}
});

export const PersonnelProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [personnel, setPersonnel] = useState<Personnel[]>([]);

  useEffect(() => {
    getPersonnel()
      .then(res => setPersonnel(res.data))
      .catch(() =>
        setPersonnel([
          {
            id: 1,
            fullName: "John Doe",
            registryNumber: "12345",
            email: "john@example.com",
            department: "IT"
          }
        ])
      );
  }, []);

  return (
    <PersonnelContext.Provider value={{ personnel, setPersonnel }}>
      {children}
    </PersonnelContext.Provider>
  );
};
