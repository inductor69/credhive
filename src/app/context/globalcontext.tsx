"use client"
import React, { createContext, useState, useContext, Dispatch, SetStateAction } from 'react';

import { CompanyInformation } from "@/app/types"; // Import your type

interface GlobalContextType {
  allCompaniesInformation: CompanyInformation[];
  setAllCompaniesInformation: Dispatch<SetStateAction<CompanyInformation[]>>;
}

const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

export const useGlobalContext = () => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error('useGlobalContext must be used within a GlobalProvider');
  }
  return context;
};

export const GlobalProvider: React.FC = ({ children }) => {
  const [allCompaniesInformation, setAllCompaniesInformation] = useState<CompanyInformation[]>([]);

  return (
    <GlobalContext.Provider value={{ allCompaniesInformation, setAllCompaniesInformation }}>
      {children}
    </GlobalContext.Provider>
  );
};
