import './style.scss'

const TableItem = (props) =>{
    return (
        <tr key={props.curr.code} className="table-body__row">
            <td className="table-body__item">{props.curr.code}</td>
            <td className="table-body__item">{props.curr.bid}</td>
            <td className="table-body__item">{props.curr.ask}</td>
        </tr>
    )
}

export default TableItem