import React from 'react'
import { useApi } from '../../context/apiFuncContext';
import { useQuery } from '@tanstack/react-query';

function ViewProduct({ transferId }: { transferId: string }) {
  console.log(transferId, 'fadlfjahsldfjhalsdjh')
  const { getRequest } = useApi();
  const getTransfer = async () => {
    try {
      const res = await getRequest(`/api/transfer/get-transfer/${transferId}`)
      // console.log(res,'fasdlfjhasldfhlasjdfhlkasjd')
      return res?.data;
    } catch (e) {
      console.log(e);
    }
  }
  const transferData = useQuery({ queryKey: ['transfer'], queryFn: getTransfer, refetchOnMount: true })

  const data = transferData?.data
  console.log(data, 'fadlfjashdlfjashdlkfjsklda')
  return (
    <>
      <div className='flex flex-row items-center justify-between w-full'>
        <div className='flex flex-col'>
          <p className='block text-sm font-bold text-black dark:text-gray-400 underline mb-3'>Sending Branch</p>
          <p className='block text-sm font-medium text-gray-700 dark:text-gray-400'>{data?.fromBranchId?.name}</p>
          <p className='block text-sm font-medium text-gray-700 dark:text-gray-400'>{data?.fromBranchId?.branchCode}</p>
        </div>
        <div className='flex flex-col'>
          <p className='block text-sm font-bold text-black dark:text-gray-400 underline mb-3'>Receiving Branch</p>
          <p className='block text-sm font-medium text-gray-700 dark:text-gray-400'>{data?.toBranchId?.name}</p>
          <p className='block text-sm font-medium text-gray-700 dark:text-gray-400'>{data?.toBranchId?.branchCode}</p>
        </div>
      </div>
      <div className='mt-5 border-t-2 border-gray-200 pt-2'>
        <p className='font-bold text-block text-black dark:text-gray-400'>Products</p>
        {
          data?.items?.map((element: any, idx: number) => {
            return <div className='flex flex-col gap-2'>
              <div className='flex flex-row items-center justify-between'>
                <p className='block text-sm font-medium text-gray-700 dark:text-gray-400'>Product Name</p>
                <p className='block text-sm font-medium text-gray-700 dark:text-gray-400'>Quantity</p>
              </div>
              <div className='flex flex-row items-center justify-between'>
                <p className='block text-sm font-medium text-gray-700 dark:text-gray-400'>{element?.productId?.name}</p>
                <p className='block text-sm font-medium text-gray-700 dark:text-gray-400'>{element?.quantity}</p>
              </div>
            </div>
          })
        }
      </div>
    </>
  )
}

export default ViewProduct
