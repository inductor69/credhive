"use client";

import React, { useEffect, useState } from 'react';
import Graphs from "@/app/components/graphs";
import styles from "../../components/graphs/graphs.module.css";
import { useGlobalContext } from '@/app/context/globalcontext';
import { usePathname } from 'next/navigation';
import { createNewCompany } from '@/app/services/dataGenerator';
import Header from '@/app/components/header';

export default function Graph() {
  const { allCompaniesInformation, setAllCompaniesInformation } = useGlobalContext();
  const numCompanies = parseInt(process.env.NEXT_PUBLIC_NUMBER_OF_COMPANIES ?? "50", 10) || 50;
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    if (allCompaniesInformation.length === 0) {
      setIsLoading(true);
      let mockData = [];
      for (let index = 0; index < numCompanies; index++) {
        let newCompany = createNewCompany();
        mockData.push(newCompany);
      }
      setAllCompaniesInformation(mockData);
      setIsLoading(false);
    }
  }, [allCompaniesInformation.length, setAllCompaniesInformation, setIsLoading, numCompanies]);
;
 
  return (
    <>
    <Header/>
    <div>
      {allCompaniesInformation.length > 0 ? (
        <Graphs companies={allCompaniesInformation}></Graphs>
      ) : (
        <div className={styles.graphGridLoadingContainer}>
          <div className="spinner-border text-light" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}
      
    </div>
    </>
  );
}
