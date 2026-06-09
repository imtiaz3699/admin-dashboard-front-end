import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { useApi } from '../../context/apiFuncContext';
import Select from '../../components/form/Select';
import InputWithLabel from '../../components/InputWithLabel/InputWithLabel';
import Button from '../../components/ui/button/Button';
import { useParams } from 'react-router';
function StockInOut() {
  const { getRequest } = useApi();
  const {id} = useParams();
  const [availableQuqntity,setAvailableQuantity] = React.useState(0);
  const formik = useFormik({
    initialValues: {
      productId: "",
      branchId: "",
      type: "",
      quantity: "",
      referenceType: "",
      referenceId: "",
      fromBranchId: "",
      toBranchId: "",
      costPrice: "",
      sellingPrice: "",
      userId: ""
    },
    onSubmit: (values) => {
      console.log(values);
    }
  })
  const getBranchesList = async () => {
    try {
      const res = await getRequest("/api/branch/get-branches");
      return res;
    } catch (e) {
      console.log(e);
    }
  }


  const getProductList = async () => {
    try {
      const res = await getRequest(`/api/product/all-product`);
      return res;
    } catch (e) {
      console.log(e);
    }
  }

  const productList = useQuery({
    queryKey: ['product-list'],
    queryFn: getProductList,
  });
  const branchesList = useQuery({
    queryKey: ['branches-list'],
    queryFn: getBranchesList
  });
  const branchOptions = branchesList?.data?.data?.map((branch: any) => {
    return {
      label: branch?.name,
      value: branch?._id
    }
  })
  const productOption = productList?.data?.data?.map((product: any) => {
    return {
      label: product?.name,
      value: product?._id
    }
  })
  const movementTypeOptions = [
    {
      label: "IN",
      value: "IN",
    },
    {
      label: "OUT",
      value: "OUT"
    },
    {
      label: "TRANSFER",
      value: "TRANSFER"
    },
    {
      label: "DAMAGE",
      value: "DAMAGE"
    }
  ]
  const referenceTypeOptions = [
    {
      label: "SALE",
      value: "SALE",
    },
    {
      label: "PURCHASE",
      value: "PURCHASE"
    },
    {
      label: "TRANSFER",
      value: "TRANSFER"
    },
    {
      label: "ADJUSTMENT",
      value: "ADJUSTMENT"
    }
  ]
  console.log(formik.values, 'fasdlfjhalsdjfhlasdjfhlasjkdh')
  return (
    <form onSubmit={formik.handleSubmit} className='w-full space-y-5' >
      <h1 className='flex cursor-pointer text-nowrap select-none items-center gap-3 text-2xl mb-5 font-medium ${disabled ? "text-gray-400" : "text-gray-700 dark:text-gray-400'>Add Stock Movement</h1>
      <div className='flex flex-row items-center gap-5'>
        <Select
          label="Select Branch"
          options={branchOptions}
          value={formik.values.branchId}
          onChange={(value) => formik.setFieldValue("branchId", value)}
          name='branchId'
          required={true}
          errors={formik.touched?.branchId && formik.errors?.branchId ? formik.errors?.branchId : ""}
        />
        <Select
          label="Select Product"
          options={productOption}
          value={formik.values.productId}
          onChange={(value) => formik.setFieldValue("productId", value)}
          name='productId'
          required={true}
          errors={formik.touched?.productId && formik.errors?.productId ? formik.errors?.productId : ""}
        />
      </div>
      <div className='flex flex-row items-center gap-5'>
        <Select
          label="Movement Type"
          options={movementTypeOptions}
          value={formik.values.type}
          onChange={(value) => formik.setFieldValue("type", value)}
          name='type'
          required={true}
          errors={formik.touched?.type && formik.errors?.type ? formik.errors?.type : ""}
        />
        <Select
          label="Reference Type"
          options={referenceTypeOptions}
          value={formik.values.referenceType}
          onChange={(value) => formik.setFieldValue("referenceType", value)}
          name='referenceType'
          required={true}
          errors={formik.touched?.referenceType && formik.errors?.referenceType ? formik.errors?.referenceType : ""}
        />
        <InputWithLabel label='Quantity' name='quantity'
          required={true}
          type="number"
          value={formik.values.quantity}
          onChange={formik.handleChange}
          disabled={formik.isSubmitting}
          error={formik.touched.quantity && formik.errors.quantity ? true : false}
          errorMessage={formik.touched.quantity && formik.errors.quantity ? formik.errors.quantity : ""}
        />
      </div>
      <div className='flex flex-row items-center gap-5'>
        <Select
          label="From Branch"
          options={branchOptions}
          value={formik.values.fromBranchId}
          onChange={(value) => formik.setFieldValue("fromBranchId", value)}
          name='fromBranchId'
          required={true}
          errors={formik.touched?.fromBranchId && formik.errors?.fromBranchId ? formik.errors?.fromBranchId : ""}
        />
        <Select
          label="To Branch"
          options={branchOptions}
          value={formik.values.toBranchId}
          onChange={(value) => formik.setFieldValue("toBranchId", value)}
          name='toBranchId'
          required={true}
          errors={formik.touched?.toBranchId && formik.errors?.toBranchId ? formik.errors?.toBranchId : ""}
        />
      </div>
      <div className='flex flex-row items-center gap-5'>
        <InputWithLabel label='Cost Price' name='costPrice'
          required={true}
          type="number"
          value={formik.values.costPrice}
          onChange={formik.handleChange}
          disabled={formik.isSubmitting}
          error={formik.touched.costPrice && formik.errors.costPrice ? true : false}
          errorMessage={formik.touched.costPrice && formik.errors.costPrice ? formik.errors.costPrice : ""}
        />
        <InputWithLabel label='Selling Price' name='sellingPrice'
          required={true}
          type="number"
          value={formik.values.sellingPrice}
          onChange={formik.handleChange}
          disabled={formik.isSubmitting}
          error={formik.touched.sellingPrice && formik.errors.sellingPrice ? true : false}
          errorMessage={formik.touched.sellingPrice && formik.errors.sellingPrice ? formik.errors.sellingPrice : ""}
        />
      </div>
      <div className='flex flex-row items-center justify-end gap-5'>
        <Button type='submit' size='md' variant='primary' >
          {id ? "Update" : "Submit"}
        </Button>
        <Button type='submit' size='md' variant='outline' >
          Cancel
        </Button>
      </div>
    </form>
  )
}

export default StockInOut
