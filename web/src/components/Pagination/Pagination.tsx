export type PaginationProps = {
  handlePageChange: (newPage: number) => void
  currentPage: number
  totalPages: number
}

export const Pagination = ({
  handlePageChange,
  currentPage,
  totalPages,
}: PaginationProps) => {
  const renderPageButtons = () => {
    const buttons = []
    const maxVisiblePages = 5 // Total number of page buttons to show

    let startPage = Math.max(1, currentPage - 2)
    const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1)

    // Adjust start page if end page is at the limit
    if (endPage === totalPages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1)
    }

    // Add pages
    for (let i = startPage; i <= endPage; i++) {
      buttons.push(renderPageButton(i))
    }

    return buttons
  }

  const renderPageButton = (pageNumber: number) => (
    <button
      key={pageNumber}
      onClick={() => handlePageChange(pageNumber)}
      className={`rounded-md border px-4 py-2 ${
        currentPage === pageNumber
          ? 'bg-orange-500 text-white'
          : 'bg-gray-100 text-gray-800'
      }`}
    >
      {pageNumber}
    </button>
  )

  return (
    <div className="my-4 flex items-center justify-center space-x-2">
      <button
        onClick={() => handlePageChange(1)}
        disabled={currentPage === 1}
        className="rounded-md border bg-gray-100 px-4 py-2 text-gray-800 disabled:opacity-50"
      >
        First
      </button>
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="rounded-md border bg-gray-100 px-4 py-2 text-gray-800 disabled:opacity-50"
      >
        Previous
      </button>
      {renderPageButtons()}
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="rounded-md border bg-gray-100 px-4 py-2 text-gray-800 disabled:opacity-50"
      >
        Next
      </button>
      <button
        onClick={() => handlePageChange(totalPages)}
        disabled={currentPage === totalPages}
        className="rounded-md border bg-gray-100 px-4 py-2 text-gray-800 disabled:opacity-50"
      >
        Last
      </button>
    </div>
  )
}
