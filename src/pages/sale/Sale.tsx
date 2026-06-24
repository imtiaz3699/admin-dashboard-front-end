import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react'
import { useApi } from '../../context/apiFuncContext';
import SalesTable from '../Tables/SalesTable';

function Sale() {
    const { getRequest } = useApi()
    const [pagination, setPagination] = useState({
        page: 1,
        limit: 10,
    });
    const fetchData = async () => {
        try {
            const res = await getRequest(`/api/sale/get-all-sales?page=${pagination.page}&limit=${pagination.limit}`);
            console.log(res);
            return res?.data;
        } catch (e) {
            console.log(e);
        }
    }
    const salesData = useQuery({
        queryKey: ['sales', pagination.page, pagination.limit],
        queryFn: fetchData,
        refetchOnMount: true
    })
    console.log(salesData, 'fasdlfjashldfkjhasldkfjhalsjkd')
    return (
        <div>
            <SalesTable data={salesData?.data}
                handleDelete={() => { }}
                page={pagination.page}
                setPage={(newPage) =>
                    setPagination((prev: any) => ({
                        ...prev,
                        page: newPage,
                    }))
                }
            />
        </div>
    )
}

export default Sale
