import React from 'react';
import './styles.css';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const handlePageClick = (page: number): void => {
    onPageChange(page);
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    const range = 1;

    if (currentPage > 1) {
      pageNumbers.push(
        <li key="first" onClick={() => handlePageClick(1)}>
          &laquo;
        </li>
      );
    }

    if (currentPage > 1) {
      pageNumbers.push(
        <li key="previous" onClick={() => handlePageClick(currentPage - 1)}>
          &lt;
        </li>
      );
    }

    for (let i = Math.max(1, currentPage - range); i <= Math.min(currentPage + range, totalPages); i++) {
      pageNumbers.push(
        <li
          key={i}
          className={currentPage === i ? 'active' : ''}
          onClick={() => handlePageClick(i)}
        >
          {i}
        </li>
      );
    }

    if (currentPage < totalPages) {
      pageNumbers.push(
        <li key="next" onClick={() => handlePageClick(currentPage + 1)}>
          &gt;
        </li>
      );
    }

    if (currentPage < totalPages) {
      pageNumbers.push(
        <li key="last" onClick={() => handlePageClick(totalPages)}>
          &raquo;
        </li>
      );
    }

    return pageNumbers;
  };

  return (
    <ul className="pagination">
      {renderPageNumbers()}
    </ul>
  );
};

export default Pagination;
