import { useQuery } from '@tanstack/react-query';
import React from 'react'
import { useApi } from '../../context/apiFuncContext';
import SalesTable from '../Tables/SalesTable';

function Sale() {
    const { getRequest } = useApi()

    const fetchData = async () => {
        try {
            const res = await getRequest(`/api/sale/get-all-sales`);
            console.log(res);
            return res?.data;
        } catch (e) {
            console.log(e);
        }
    }
    const salesData = useQuery({
        queryKey: ['sales'],
        queryFn: fetchData,
        refetchOnMount: true
    })
    console.log(salesData, 'fasdlfjashldfkjhasldkfjhalsjkd')
    return (
        <div>
            <SalesTable data={salesData?.data}
                handleDelete={() => { }}
                handlePageChange={(str: string) => { console.log(str) }}
                page={1}
                setPage={() => { }} />
        </div>
    )
}

export default Sale
