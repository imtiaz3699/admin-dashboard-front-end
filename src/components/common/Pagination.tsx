import React from "react";

function Pagination({
    currentPage = 1,
    totalPages = 1,
    totalRecords = 0,
    limit = 10,
    onPageChange: onPageChange = (page: number) => { },
}) {

    const start = (currentPage - 1) * limit + 1;
    const end = Math.min(currentPage * limit, totalRecords);

    const handlePageChange = (page: number) => {
        if (page < 1 || page > totalPages) return;
        onPageChange(page);
    };

    const renderPages = () => {
        return Array.from({ length: totalPages }, (_, index) => {
            const page = index + 1;
            console.log(typeof (currentPage), page, 'CurrentPageIndex')
            return (
                <button
                    key={page}
                    type="button"
                    onClick={() => handlePageChange(page)}
                    className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold focus:z-20 focus:outline-none
                    ${Number(currentPage) === page
                            ? "z-10 bg-indigo-500 text-white"
                            : "text-gray-200 hover:bg-white/5"
                        }`}
                >
                    {page}
                </button>
            );
        });
    };

    return (
        <div className="flex items-center justify-between border-t border-white/10 px-4 py-3 sm:px-6">

            {/* Mobile */}
            <div className="flex flex-1 justify-between sm:hidden">

                <button
                    disabled={currentPage === 1}
                    onClick={() => handlePageChange(currentPage - 1)}
                    className="relative inline-flex items-center rounded-md border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-gray-200 hover:bg-white/10 disabled:opacity-50"
                >
                    Previous
                </button>

                <button
                    disabled={currentPage === totalPages}
                    onClick={() => handlePageChange(currentPage + 1)}
                    className="relative ml-3 inline-flex items-center rounded-md border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-gray-200 hover:bg-white/10 disabled:opacity-50"
                >
                    Next
                </button>
            </div>

            {/* Desktop */}
            <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">

                {/* Results Info */}
                <div>
                    <p className="text-sm text-gray-300">
                        Showing
                        <span className="font-medium mx-1">
                            {totalRecords === 0 ? 0 : start}
                        </span>
                        to
                        <span className="font-medium mx-1">
                            {end}
                        </span>
                        of
                        <span className="font-medium mx-1">
                            {totalRecords}
                        </span>
                        results
                    </p>
                </div>

                {/* Pagination */}
                <div>
                    <nav
                        aria-label="Pagination"
                        className="isolate inline-flex -space-x-px rounded-md"
                    >

                        {/* Previous */}
                        <button
                            disabled={currentPage === 1}
                            onClick={() => handlePageChange(currentPage - 1)}
                            className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 inset-ring inset-ring-gray-700 hover:bg-white/5 disabled:opacity-50"
                        >
                            <span className="sr-only">Previous</span>

                            <svg
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                className="size-5"
                            >
                                <path
                                    d="M11.78 5.22a.75.75 0 0 1 0 1.06L8.06 10l3.72 3.72a.75.75 0 1 1-1.06 1.06l-4.25-4.25a.75.75 0 0 1 0-1.06l4.25-4.25a.75.75 0 0 1 1.06 0Z"
                                    clipRule="evenodd"
                                    fillRule="evenodd"
                                />
                            </svg>
                        </button>

                        {/* Dynamic Pages */}
                        {renderPages()}

                        {/* Next */}
                        <button
                            disabled={currentPage === totalPages}
                            onClick={() => handlePageChange(currentPage + 1)}
                            className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 inset-ring inset-ring-gray-700 hover:bg-white/5 disabled:opacity-50"
                        >
                            <span className="sr-only">Next</span>

                            <svg
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                className="size-5"
                            >
                                <path
                                    d="M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z"
                                    clipRule="evenodd"
                                    fillRule="evenodd"
                                />
                            </svg>
                        </button>

                    </nav>
                </div>
            </div>
        </div>
    );
}

export default Pagination;