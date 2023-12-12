import React, { useState } from "react";
import styles from "./card.module.css";

import { CompanyInformation } from "@/app/types";

type CompanyInformationCardProps = {
  company: CompanyInformation;
};

export default function CompanyInformationCard(props: CompanyInformationCardProps) {
  const [isModalOpen, setModalOpen] = useState(false);

  const toggleModal = () => setModalOpen(!isModalOpen);

  const renderFinancialRow = (label, value) => (
    <tr>
      <td className="px-4 py-2 border">{label}</td>
      <td className="px-4 py-2 border">{value}</td>
    </tr>
  );

  return (
    <div className={`${props.company.netProfit > 0 ? 'bg-green-500' : 'bg-[#FF6585]'
      } text-white p-4 rounded-lg shadow-md border border-gray-700 mb-3 h-68`}>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
            <h1 className="text-xl font-semibold mb-4">Company Details</h1>
            <table className="min-w-full">
              <tbody>
                {renderFinancialRow("Company Name", props.company.companyName)}
                {renderFinancialRow("Account Status", props.company.accountStatus)}
                {renderFinancialRow("Net Profit", props.company.netProfit.toLocaleString("en-in", { style: "currency", currency: "INR" }))}
                {renderFinancialRow("Turnover", props.company.turnover.toLocaleString("en-in", { style: "currency", currency: "INR" }))}
                {renderFinancialRow("Raised Capital", props.company.raisedCapital.toLocaleString("en-in", { style: "currency", currency: "INR" }))}
                {renderFinancialRow("Loan Amount", props.company.loanAmount.toLocaleString("en-in", { style: "currency", currency: "INR" }))}
                {renderFinancialRow("Loan Interest", `${props.company.loanInterestPercentage}%`)}
                {renderFinancialRow("Employee Count", props.company.numberOfEmployees.toLocaleString())}
                {renderFinancialRow("Registration Date", props.company.registrationDate.toDateString())}
                {renderFinancialRow("Company Website", props.company.companyWebsite)}
                {renderFinancialRow("Contact Email", props.company.contactEmail)}
                {renderFinancialRow("Contact Number", props.company.contactNumber)}
                {renderFinancialRow("Company Address", props.company.address)}
              </tbody>
            </table>
            <div className="container flex flex-col justify-end ">
              <button onClick={toggleModal} className="bg-white text-black mt-5 hover:bg-black hover:text-white font-bold py-2 px-4 rounded">
                Close
              </button>
            </div>
          </div>
        </div>
      )}

   
      <h5 className="text-xl font-bold text-black">{props.company.companyName}</h5>
      <div className={styles.companyFinancials}>
        <table className="min-w-full border-collapse text-black">
          <tbody>
            <tr>
              <td className="pr-2 align-top font-medium">Net Profit:</td>
              <td className="border-l verticalLineBlack pl-4 align-top font-medium">
                {props.company.netProfit.toLocaleString("en-in", {
                  style: "currency",
                  currency: "INR",
                  maximumFractionDigits: 0,
                })}
              </td>
            </tr>
            <tr>
              <td className="pr-2 align-top">Turnover:</td>
              <td className="border-l verticalLineBlack pl-4 align-top">
                {props.company.turnover.toLocaleString("en-in", {
                  style: "currency",
                  currency: "INR",
                  maximumFractionDigits: 0,
                })}
              </td>
            </tr>
            <tr>
              <td className="pr-2 align-top">Raised Capital:</td>
              <td className="border-l  verticalLineBlack pl-4 align-top">
                {props.company.raisedCapital.toLocaleString("en-in", {
                  style: "currency",
                  currency: "INR",
                  maximumFractionDigits: 0,
                })}
              </td>
            </tr>
            <tr>
              <td className="pr-2 align-top">Loan Amount:</td>
              <td className="border-l verticalLineBlack pl-4 align-top">
                {props.company.loanAmount.toLocaleString("en-in", {
                  style: "currency",
                  currency: "INR",
                  maximumFractionDigits: 0,
                })}
              </td>
            </tr>
            <tr>
              <td className="pr-2 align-top">Loan Interest:</td>
              <td className="border-l verticalLineBlack pl-4 align-top">
                {`${props.company.loanInterestPercentage}%`}
              </td>
            </tr>
            <tr>
              <td className="pr-2 align-top">Account Status:</td>
              <td className="border-l verticalLineBlack pl-4 align-top">
                {`${props.company.accountStatus}`}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="container flex flex-col justify-end ">
        <button onClick={toggleModal} className="bg-black mt-5 hover:bg-purple-300 text-white hover:text-black   font-bold py-2 px-4 rounded">
          View Details
        </button>
      </div>
    </div>
  );
}
