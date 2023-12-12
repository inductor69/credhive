import { FilterDetails } from "@/app/types";
import styles from "./filters.module.css";
import { ChangeEvent, Dispatch, SetStateAction } from "react";

type FiltersProps = {
  filters: FilterDetails;
  setFilters: Dispatch<SetStateAction<FilterDetails>>;
};

export default function Filters(props: FiltersProps) {
  function handleFilterChange(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.name === "accountStatus") {
      if (e.target.checked) {
        props.setFilters((prev: FilterDetails) => {
          return {
            ...prev,
            accountStatus: [...prev.accountStatus, e.target.value],
          };
        });
      } else {
        props.setFilters((prev: FilterDetails) => {
          return {
            ...prev,
            accountStatus: prev.accountStatus.filter(
              (status) => status !== e.target.value
            ),
          };
        });
      }
    } else if (!e.target.name.includes("Loan")) {
      let newDate = e.target.name === "dateStart" ? new Date(0) : new Date();
      if (e.target.valueAsDate !== undefined && e.target.valueAsDate !== null)
        newDate = e.target.valueAsDate;
      props.setFilters((prev: FilterDetails) => {
        return {
          ...prev,
          [e.target.name]: newDate,
        };
      });
    } else {
      let newLimit = e.target.name === "minimumLoan" ? 0 : 0;
      if (!Number.isNaN(parseInt(e.target.value))) {
        newLimit = e.target.valueAsNumber;
      }
      props.setFilters((prev: FilterDetails) => {
        return {
          ...prev,
          [e.target.name]: newLimit,
        };
      });
    }
  }
  return (
    <div className={styles.gridFilters}>
      <h4>Filters</h4>
      <div className={styles.filterOptions}>
        <div className={styles.loanAmountFilters}>
          <div className="form-group">
            <label htmlFor="set-minimum-loan-amount">Minimum Loan Amount</label>
            <input
              type="number"
              id="set-minimum-loan-amount"
              name="minimumLoan"
              step={100000}
              max={props.filters.maximumLoan}
              className="block w-full px-3 py-2 bg-white text-black border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              value={props.filters.minimumLoan}
              onChange={(e) => handleFilterChange(e)}
            />

          </div>
          <div className="form-group">
            <label htmlFor="set-maximum-loan-amount">Maximum Loan Amount</label>
            <input
              type="number"
              id="set-maximum-loan-amount"
              name="maximumLoan"
              step={100000}
              min={props.filters.minimumLoan}
              max={10_000_000}
              className="block w-full px-3 py-2 bg-white text-black border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              value={props.filters.maximumLoan}
              onChange={(e) => {
                handleFilterChange(e);
              }}
            />
          </div>
        </div>
        <div className="mb-4">
          <label className="">
            Account Status
          </label>
          <div className="flex items-center mb-2">
            <input
              className="form-checkbox h-5 w-5 text-gray-600"
              type="checkbox"
              value="ACTIVE"
              name="accountStatus"
              id="flag-active"
              checked={props.filters.accountStatus.includes("ACTIVE")}
              onChange={(e) => handleFilterChange(e)}
            />
            <label className="ml-2 " htmlFor="flag-active">
              Active
            </label>
          </div>
          <div className="flex items-center">
            <input
              className="form-checkbox h-5 w-5 text-gray-600"
              type="checkbox"
              name="accountStatus"
              value="CLOSED"
              id="flag-closed"
              checked={props.filters.accountStatus.includes("CLOSED")}
              onChange={(e) => handleFilterChange(e)}
            />
            <label className="ml-2 " htmlFor="flag-closed">
              Closed
            </label>
          </div>
        </div>

        <div className={styles.dateRangeFilters}>
          <div className="form-group">
            <label htmlFor="registered-after-picker">Registered After</label>
            <input
              type="date"
              id="registered-after-picker"
              name="dateStart"
              className="block w-full px-3 py-2 bg-white text-black border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              value={props.filters.dateStart.toISOString().split("T")[0]}
              onChange={(e) => {
                handleFilterChange(e);
              }}
            />
          </div>
          <div className="form-group">
            <label htmlFor="registered-before-picker">Registered Before</label>
            <input
              type="date"
              id="registered-before-picker"
              min={props.filters.dateStart.toISOString().split("T")[0]}
              name="dateEnd"
              className="block w-full px-3 py-2 bg-white text-black border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              value={props.filters.dateEnd.toISOString().split("T")[0]}
              onChange={(e) => {
                handleFilterChange(e);
              }}
            />
          </div>
        </div>
      </div>
      <div className={styles.resetFiltersButtonContainer}>
        <button
          type="button"
          className="btn btn-outline-primary btn-sm"
          onClick={() => {
            props.setFilters((prev: FilterDetails) => {
              return {
                ...prev,
                minimumLoan: 0,
                maximumLoan: 15_000_000,
                dateStart: new Date(0),
                dateEnd: new Date(),
                accountStatus: ["ACTIVE", "CLOSED"],
              };
            });
          }}
        >
          Reset Filters
        </button>
      </div>
    </div>
  );
}
