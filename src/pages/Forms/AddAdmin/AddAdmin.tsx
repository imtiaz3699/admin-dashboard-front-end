import InputWithLabel from '../../../components/InputWithLabel/InputWithLabel'
import Button from '../../../components/ui/button/Button'

function AddAdmin({ formik, onClose }: { formik: any, onClose: () => void }) {
    return (
        <form className='w-full' onSubmit={formik.handleSubmit}>
            <div className=' w-full flex flex-col gap-5'>
                <div className='flex flex-row items-center gap-5'>
                    <InputWithLabel
                        label='Name'
                        name='name'
                        required={true}
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        disabled={formik.isSubmitting}
                        error={formik.touched.name && formik.errors.name ? true : false}
                        errorMessage={formik.touched.name && formik.errors.name ? formik.errors.name : ""}
                    />
                    <InputWithLabel label='Email' name='email'
                        required={true}
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        disabled={formik.isSubmitting}
                        error={formik.touched.email && formik.errors.email ? true : false}
                        errorMessage={formik.touched.email && formik.errors.email ? formik.errors.email : ""}
                    />
                </div>
                <div className='w-full'>
                    <InputWithLabel
                        label='Password'
                        name='password'
                        required={true}
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        disabled={formik.isSubmitting || formik.values._id ? true : false}
                        error={formik.touched.password && formik.errors.password ? true : false}
                        errorMessage={formik.touched.password && formik.errors.password ? formik.errors.password : ""} />
                </div>
                <div className='w-full'>
                    <div className='text-red-500'>{formik.values.error}</div>
                    <div className='flex flex-row items-end gap-5 justify-end '>
                        <Button type="submit" size="sm" variant="primary" disabled={formik.isSubmitting}>
                            Submit
                        </Button>
                        <Button onClick={onClose} size="sm" variant="outline">
                            Cancel
                        </Button>
                    </div>
                </div>
            </div>
        </form>
    )
}

export default AddAdmin
