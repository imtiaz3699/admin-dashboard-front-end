import React, { useState } from 'react'
import BranchTable from '../Tables/BranchTable'
import { useApi } from '../../context/apiFuncContext'
import { useQuery } from '@tanstack/react-query';

function Branch() {
    const { getRequest,deleteRequest } = useApi();
    const [page, setPage] = useState(1);
    const [pagination, setPagination] = useState({
        page: 1,
        limit: 10
    })

    const fetchList = async () => {
        try {
            const res = await getRequest(`/api/branch/get-branches?page=${page}&limit=${10}`);
            return res;
        } catch (e) {
            console.log(e);
        }
    }
    const branchData = useQuery({
        queryKey: ["branches", pagination.page, pagination.limit],
        queryFn: fetchList
    })
        const handleDelete = async(id: string) => {
        try {
            const res = await deleteRequest(`/api/branch/delete-branch/${id}`);
            console.log(res,'fasdlfjhaskldhfIamResponsible')
            if(res){
                branchData.refetch();
            }
        }catch (e) {
            console.log(e)
        }
    }
    return (
        <div>
            <BranchTable data={branchData}  handleDelete={handleDelete} page={page} setPage={setPage} />
        </div>
    )
}

export default Branch
