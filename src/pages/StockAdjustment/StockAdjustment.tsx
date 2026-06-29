import React from 'react'
import StockAdjustmentTable from '../Tables/StockAdjustmentTable'
import { useApi } from '../../context/apiFuncContext';
import { useQuery } from '@tanstack/react-query';

function StockAdjustment() {
  const { getRequest } = useApi();

  const fetchAdjustmentList = async () => {
    try {
      const res = await getRequest("/api/adjustment/get-all-adjustments");
      return res;
    } catch (e) {
      console.log(e);
    }
  }
  const adjustmentList = useQuery({
    queryKey: ['adjustment-list'],
    queryFn: fetchAdjustmentList
  });
  console.log(adjustmentList, 'fasdflasjhdlfjkashldfshaldkfj')
  return (
    <div >
      <StockAdjustmentTable refetch={adjustmentList.refetch} data={adjustmentList?.data} setPage={() => console.log("wow")} />
    </div>
  )
}

export default StockAdjustment
