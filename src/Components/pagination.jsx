// eslint-disable-next-line react-hooks/exhaustive-deps
import React, { useState, useEffect } from "react";

const LEFT_PAGE = "LEFT";
const RIGHT_PAGE = "RIGHT";

const range = (from, to, step = 1) => {
    let i = from;
    const range = [];

    while (i <= to) {
        range.push(i);
        i += step;
    }

    return range;
};

const Pagination = ({
    totalRecords = null,
    pageLimit = 30,
    pageNeighbors = 0,
    onPageChanged
}) => {
    const [currentPage, setCurrentPage] = useState(1)

    pageLimit = typeof pageLimit === "number" ? pageLimit : 30;
    totalRecords = typeof totalRecords === "number" ? totalRecords : 0;
    pageNeighbors =
        typeof pageNeighbors === "number"
            ? Math.max(0, Math.min(pageNeighbors, 2))
            : 0;

    const totalPages = Math.ceil(totalRecords / pageLimit);

    useEffect(() => {
        onPageChanged(currentPage);
    }, [currentPage]) // eslint-disable-line react-hooks/exhaustive-deps

    const gotoPage = page => {
        const currentPage = Math.max(0, Math.min(page, totalPages));
        setCurrentPage(currentPage);
    };

    const handleClick = (page, e) => {
        e.preventDefault();
        gotoPage(page);
    };

    const handleMoveLeft = e => {
        e.preventDefault();
        gotoPage(currentPage - pageNeighbors * 2 - 1);
    };

    const handleMoveRight = e => {
        e.preventDefault();
        gotoPage(currentPage + pageNeighbors * 2 + 1);
    };

    const fetchPageNumbers = () => {
        const totalPages = Math.ceil(totalRecords / pageLimit);
        const totalNumbers = pageNeighbors * 2 + 3;
        const totalBlocks = totalNumbers + 2;

        if (totalPages > totalBlocks) {
            const startPage = Math.max(2, currentPage - pageNeighbors);
            const endPage = Math.min(totalPages - 1, currentPage + pageNeighbors);
            let pages = range(startPage, endPage);

            /**
             * hasLeftSpill: has hidden pages to the left
             * hasRightSpill: has hidden pages to the right
             * spillOffset: number of hidden pages either to the left or to the right
             */
            const hasLeftSpill = startPage > 2;
            const hasRightSpill = totalPages - endPage > 1;
            const spillOffset = totalNumbers - (pages.length + 1);

            switch (true) {
                // handle: (1) < {5 6} [7] {8 9} (10)
                case hasLeftSpill && !hasRightSpill: {
                    const extraPages = range(startPage - spillOffset, startPage - 1);
                    pages = [LEFT_PAGE, ...extraPages, ...pages];
                    break;
                }

                // handle: (1) {2 3} [4] {5 6} > (10)
                case !hasLeftSpill && hasRightSpill: {
                    const extraPages = range(endPage + 1, endPage + spillOffset);
                    pages = [...pages, ...extraPages, RIGHT_PAGE];
                    break;
                }

                // handle: (1) < {4 5} [6] {7 8} > (10)
                case hasLeftSpill && hasRightSpill:
                default: {
                    pages = [LEFT_PAGE, ...pages, RIGHT_PAGE];
                    break;
                }
            }

            return [1, ...pages, totalPages];
        }

        return range(1, totalPages);
    };


    if (!totalRecords || totalPages === 1) return null;

    const pages = fetchPageNumbers();

    return (
        <ul className="pagination">
            {pages.map((page, index) => {
                if (page === LEFT_PAGE)
                    return (
                        <li key={index} className="page-item">
                            <button
                                className="page-link"
                                href="#"
                                aria-label="Previous"
                                onClick={handleMoveLeft}
                            >
                                <i className="fas fa-arrow-left"></i>
                            </button>
                        </li>
                    );

                if (page === RIGHT_PAGE)
                    return (
                        <li key={index} className="page-item">
                            <button
                                className="page-link"
                                href="#"
                                aria-label="Next"
                                onClick={handleMoveRight}
                            >
                                <i className="fas fa-arrow-right"></i>
                            </button>
                        </li>
                    );
                return (
                    <li
                        key={index}
                        className={`page-item${currentPage === page ? ' active' : ''}`}
                    >
                        <button
                            className="page-link"
                            href="#"
                            onClick={(e) => handleClick(page, e)}
                        >
                            {page}
                        </button>
                    </li>
                );
            })}
        </ul>
    );
};

export default Pagination;
