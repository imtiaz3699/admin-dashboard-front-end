import { AlertIcon } from '../../icons'
import Typography from '../../components/form/Typography/Typography'
import Button from '../../components/ui/button/Button'


function DeleteDialogue({ heading, description, onClose, handleDelete }: { heading: string, description: string, onClose: any, handleDelete: any }) {
    return (
        <div className='items-center justify-center text-white flex flex-col '>
            <div> <AlertIcon className='text-[100px]' /> </div>
            <Typography tag="p" className='text-[35px] font-bold' text={heading} />
            <Typography tag="p" className='text-[20px]' text={description} />
            <div className='flex flex-row items-end gap-5 justify-end mt-5'>
                <Button type="submit" size="sm" variant="primary" onClick={handleDelete} >
                    Submit
                </Button>
                <Button onClick={onClose} size="sm" variant="outline" >
                    Cancel
                </Button>
            </div>
        </div>
    )
}

export default DeleteDialogue
