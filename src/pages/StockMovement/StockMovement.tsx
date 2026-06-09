import React from 'react'
import { useNavigate } from 'react-router'
import StockMovementTable from '../Tables/StockMovementTable'
import ComponentCard from '../../components/common/ComponentCard'

function StockMovement() {
    const navigate = useNavigate();
    return (
        <div>
            <StockMovementTable />

            <div className='space-y-4'>
                <ComponentCard
                    title="Stock Movement"
                    handleAddRecord={() => navigate("/dashboard/move-stock")}
                    addText="Move Stock"
                >
                    <div className='overflow-hidden rounded-xl border border-gray-200 bg-white dark:border'>

                    </div>
                </ComponentCard>
            </div>
        </div>
    )
}

export default StockMovement
