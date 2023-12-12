import { ChangeEvent, Dispatch, SetStateAction } from "react";
import styles from "./pagination.module.css";

export type PaginationDetails = {
  currentPage: number;
  totalPages: number;
  itemsPerPage: number;
};

type PaginationProps = {
  pagination: PaginationDetails;
  setPagination: Dispatch<SetStateAction<PaginationDetails>>;
};

export default function Pagination(props: PaginationProps) {
  function handlePaginationChange(e: ChangeEvent<HTMLInputElement>) {
    // e.preventDefault();
    let newPage: number = parseInt(e.currentTarget.value);
    if (newPage !== props.pagination.currentPage) {
      props.setPagination((prev) => {
        return {
          ...prev,
          currentPage: newPage,
        };
      });
    }
  }
  function handleGotoFirstPage() {
    if (props.pagination.currentPage !== 1) {
      props.setPagination((prev) => {
        return {
          ...prev,
          currentPage: 1,
        };
      });
    }
  }
  function handleGotoLastPage() {
    if (props.pagination.currentPage !== props.pagination.totalPages) {
      props.setPagination((prev) => {
        return {
          ...prev,
          currentPage: prev.totalPages,
        };
      });
    }
  }
  function handleNextPage() {
    if (props.pagination.currentPage !== props.pagination.totalPages) {
      props.setPagination((prev) => {
        return {
          ...prev,
          currentPage: prev.currentPage + 1,
        };
      });
    }
  }
  function handlePreviousPage() {
    if (props.pagination.currentPage !== 1) {
      props.setPagination((prev) => {
        return {
          ...prev,
          currentPage: prev.currentPage - 1,
        };
      });
    }
  }
  function handlePageSizeChange(e: ChangeEvent<HTMLSelectElement>) {
    props.setPagination((prev) => {
      return {
        ...prev,
        itemsPerPage: parseInt(e.target.value),
      };
    });
  }
  return (
    <div className="flex justify-center items-center space-x-1">
    <nav aria-label="Page navigation" className="flex space-x-1">
      <button
        className="px-2 py-1 bg-gray-800 text-white rounded"
        onClick={handleGotoFirstPage}
        aria-label="First"
      >
        ««
      </button>
      <button
        className="px-2 py-1 bg-gray-800 text-white rounded"
        onClick={handlePreviousPage}
        aria-label="Previous"
      >
        «
      </button>
      <input
        aria-label="Current Page Number"
        type="text"
        value={props.pagination.currentPage}
        className="px-2 py-1 text-black border border-gray-300 rounded"
        onChange={(e) => handlePaginationChange(e)}
      />
      <span className="px-2 py-1 text-white">/</span>
      <input
        aria-label="Total Pages"
        type="text"
        value={props.pagination.totalPages}
        className="px-2 py-1 text-black border border-gray-300 rounded"
        readOnly
      />
      <button
        className="px-2 py-1 bg-gray-800 text-white rounded"
        onClick={handleNextPage}
        aria-label="Next"
      >
        »
      </button>
      <button
        className="px-2 py-1 bg-gray-800 text-white rounded"
        onClick={handleGotoLastPage}
        aria-label="Last"
      >
        »»
      </button>
    </nav>
    <div className="flex items-center space-x-1">
      <label htmlFor="items-per-page" className="text-white">
        Items Per Page
      </label>
      <select
        id="items-per-page"
        className="px-2 py-1 border border-gray-300 rounded text-black"
        aria-label="Items per page"
        value={props.pagination.itemsPerPage}
        onChange={(e) => handlePageSizeChange(e)}
      >
        <option value={10}>10</option>
        <option value={20}>20</option>
        <option value={40}>40</option>
        <option value={70}>70</option>
      </select>
    </div>
  </div>
  );
}
