import Loader from '../Loader'
import TableItem from '../TableItem'
import './style.scss'

const TableBody = (props) =>{
    return (
        <tbody className="table-body">
        {props.currencies ? props.currencies.filter(curr => {
            if(curr.code === 'USD' || curr.code === 'EUR' || curr.code === 'GBP'){
                return true
            }else{
                return false
            }}).map(curr => {
                return <TableItem curr={curr} />
            }) : <Loader />}
        </tbody>
    )
}

export default TableBody