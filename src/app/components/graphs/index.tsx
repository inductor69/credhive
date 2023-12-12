"use-client";
import React, { useEffect, useState } from 'react';
//@ts-ignore
// import HeatMap from 'react-heatmap-grid';
import styles from './graphs.module.css';
import { CompanyInformation } from "@/app/types";

type GraphsComponentProps = {
  companies: CompanyInformation[];
};

export default function Graphs(props: GraphsComponentProps) {
  const [HeatMap, setHeatMap] = useState<any>(null); // State to store the dynamically imported HeatMap

  useEffect(() => {
    const loadHeatMap = async () => {
      //@ts-ignore
      const HeatMapModule = await import('react-heatmap-grid');
      setHeatMap(() => HeatMapModule.default); // Set the imported HeatMap component
    };
    loadHeatMap();
  }, []);
  // Sort companies by net profit in descending order
  const sortedCompanies = [...props.companies].sort((a, b) => b.netProfit - a.netProfit);

  // Splitting companies into groups of 12
  const groupSize = 12;
  const groupedCompanies = [];
  for (let i = 0; i < sortedCompanies.length; i += groupSize) {
    groupedCompanies.push(sortedCompanies.slice(i, i + groupSize));
  }

  // Function to format the net profit value
  const formatNetProfit = (value: { toLocaleString: () => any; }) => {
    return `₹${value.toLocaleString()}`;
  };

  // Function to determine color based on value
  const getColor = (value: number) => {
    const maxNetProfit = Math.max(...sortedCompanies.map(c => c.netProfit));
    const minNetProfit = Math.min(...sortedCompanies.map(c => c.netProfit));
    const ratio = (value - minNetProfit) / (maxNetProfit - minNetProfit);
    return `rgb(${255 * (1 - ratio)}, ${255 * ratio}, 0)`; // Red to Green
  };
  const HeatMapComponent = HeatMap ? (
    groupedCompanies.map((group, index) => (
      <div key={index} className={styles.heatmapRow}>
        <HeatMap
              xLabels={group.map(company => company.companyName)}
              yLabels={['Net Profit']}
              data={[group.map(company => company.netProfit)]}
              squares
              height={100}
              xLabelWidth={100}
              cellStyle={(background: any, value: number, min: any, max: any, data: any, x: any, y: any) => ({
                background: getColor(value),
                fontSize: "11px",
                color: "#444"
              })}
              cellRender={(value: { toLocaleString: () => any; }) => <b>{formatNetProfit(value)}</b>}
            />
      </div>
    ))
  ) : (
    <div>Loading HeatMap...</div>
  );

  return (
    <>
      <div className="flex justify-center items-center ">
        <div className="text-center text-xl mt-4">Heat Map</div>
      </div>

      <div className={styles.graphGridContainer}>
        {HeatMapComponent}
      </div>
    </>
  );
}
