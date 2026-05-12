import React from 'react'
import StockTable from '../Tables/stockTable'

function Stock() {
  return (
    <div>
      <StockTable  />
      {/* <BranchTable data={branchData} handleDelete={handleDelete} page={page} setPage={setPage} /> */}
    </div>
  )
}

export default Stock
