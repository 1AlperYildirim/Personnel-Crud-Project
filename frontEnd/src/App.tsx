import React from "react";
import { PersonnelProvider } from "./context/PersonnelContext";
import PersonnelPage from "./pages/PersonnelPage";

const App: React.FC = () => {
  return (
    <PersonnelProvider>
      <PersonnelPage />
    </PersonnelProvider>
  );
};

export default App;
