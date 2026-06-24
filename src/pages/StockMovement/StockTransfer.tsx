import React, { useState } from 'react'
import StockTransferTable from '../Tables/StockTransferTable'
import { useApi } from '../../context/apiFuncContext';
import { useQuery } from '@tanstack/react-query';
function StockTransfer() {
    const { getRequest } = useApi();
    const [pagination, setPagination] = useState({ page: 1, limit: 10 });

    const fetchData = async () => {
        try {
            const res = await getRequest(`/api/transfer/get-all-transfers?page=${pagination.page}&limit=${pagination.limit}`,)
            console.log(res?.data,'fasdfjhasldjhImportantResponse')
            return res?.data;

        } catch (e: any) {
            console.log(e);
        }
    }
    const transferData = useQuery({
        queryKey: ['transfer', pagination.page, pagination.limit],
        queryFn: fetchData,
        refetchOnMount: true
    })
    console.log(transferData?.data, 'fasdlfjashdlfjhasldfjhsladjk')
    return (
        <div>
            <StockTransferTable data={transferData?.data} page={pagination.page}
                setPage={(newPage) =>
                    setPagination((prev: any) => ({
                        ...prev,
                        page: newPage,
                    }))
                } />
        </div>
    )
}

export default StockTransfer
