import './style.scss';
import TableHeader from '../TableHeader'
import TableBody from '../TableBody'

const Table = (props) =>{
    return (
        <div className="table">
             <table>
                <TableHeader />
                <TableBody currencies={props.currencies} />
            </table>
        </div>
    )
}

export default Table