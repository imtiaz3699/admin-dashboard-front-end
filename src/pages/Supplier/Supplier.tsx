import React from 'react'
import PageMeta from '../../components/common/PageMeta'
import PageBreadcrumb from '../../components/common/PageBreadCrumb'
import ComponentCard from '../../components/common/ComponentCard'
import { useNavigate } from 'react-router'
import { Table, TableBody, TableCell, TableHeader, TableRow } from '../../components/ui/table'
import { formatDate } from '../../components/common/helperFunctions'
import { MoreDotIcon } from '../../icons'
import { Dropdown } from "../../components/ui/dropdown/Dropdown";
import { DropdownItem } from '../../components/ui/dropdown/DropdownItem'
import Pagination from '../../components/common/Pagination'
import SupplierTable from '../Tables/SupplierTable'
import { useApi } from '../../context/apiFuncContext'
import { useQuery } from '@tanstack/react-query'
const tableHeadStyles = "px-5 py-3 font-bold text-nowrap text-gray-500 text-start text-theme-xs dark:text-gray-400"
function Supplier() {
    const [page, setPage] = React.useState(1);
    const [limit, setLimit] = React.useState(10);
    const navigate = useNavigate();
    const { getRequest } = useApi();
    const fetchLists = async () => {
        try {
            const res = await getRequest(`/api/supplier/get-all-suppliers?page=${page}&limit=${limit}`)
            return res;
        } catch (e) {
            console.log(e);
        }
    }
    const { data, refetch } = useQuery({
        queryKey: ['suppliers', page, limit],
        queryFn: fetchLists
    });
    console.log(data?.data, 'faldjfhaldskfjhalskdjfhlajksd')
    return (
        <div>
            <PageMeta
                title="Supplier List"
                description="Supplier List"
            />
            <PageBreadcrumb
                pageTitle='Supplier'
            />
            <div className='space-y-6'>
                <SupplierTable data={data?.data} handleDelete={() => { }} handlePageChange={() => { }} />
            </div>
        </div>
    )
}

export default Supplier
