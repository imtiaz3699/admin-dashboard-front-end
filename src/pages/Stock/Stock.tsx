import React, { useState } from 'react'
import StockTable from '../Tables/StockTable'
import { useApi } from '../../context/apiFuncContext'
import { useQuery } from '@tanstack/react-query';

function Stock() {
  const { getRequest, deleteRequest } = useApi();
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
  })

  const fetchList = async () => {
    try {
      const res = await getRequest(`/api/stock/get-stocks?page=${page}&limit=${10}`)
      return res;
    } catch (e) {
      console.log(e);
    }
  }
  const stockData = useQuery({
    queryKey: ["stock", page],
    queryFn: fetchList
  })

  const handleDelete = async (id: string) => {
    try {
      const res = await deleteRequest(`/api/stock/delete-stock/${id}`);
      if (res) {
        stockData.refetch();
      }
    } catch (e) {
      console.log(e)
    }
  }
  console.log(stockData, 'fafdljahdlfjashldfkjshalkdfj')
  return (
    <div>
      <StockTable data={stockData} handleDelete={handleDelete} setPage={setPage} page={page} />
      {/* <BranchTable data={branchData} handleDelete={handleDelete} page={page} setPage={setPage} /> */}
    </div>
  )
}

export default Stock
