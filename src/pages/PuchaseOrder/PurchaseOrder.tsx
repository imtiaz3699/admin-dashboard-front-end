import React from 'react'
import { useApi } from '../../context/apiFuncContext'
import { useQuery } from '@tanstack/react-query';
import PurchaseOrderTable from '../Tables/PurchaseOrderTable'
function PurchaseOrder() {
const { getRequest } = useApi();

  const getPurchaseList = async () => {
    try {
      const res = await getRequest("/api/purchase/get-all-purchase-orders")
      return res;
    }catch (e) {
      console.log(e);
    }
  }
  const purchaseData = useQuery({
    queryKey: ["purchase"],
    queryFn: getPurchaseList    
  })
  console.log(purchaseData?.data,'fasdljfhalsdjkfhlasjkdfhlakjshdfljkasd')
  return (
    <div>
      <PurchaseOrderTable data = {purchaseData?.data?.data} />
    </div>
  )
}

export default PurchaseOrder
