import './style.scss';
import Loader from '../Loader'

const Table = (props) =>{
    return (
        <div className="table">
             <table>
            <thead className="table-header">
            <tr className="table-header__row">
                <th className="table-header__item" id="currency-code">Kod</th>
                <th className="table-header__item" id="currency-bid">Kupno</th>
                <th className="table-header__item" id="currency-ask">Sprzedaż</th>
            </tr>
            </thead>
            <tbody className="table-body">
            {props.currencies ? props.currencies.filter(curr => {
                if(curr.code === 'USD' || curr.code === 'EUR' || curr.code === 'GBP'){
                    return true
                }else{
                    return false
                }}).map(curr => {
                    return <tr key={curr.code} className="table-body__row">
                    <td className="table-body__item">{curr.code}</td>
                    <td className="table-body__item">{curr.bid}</td>
                    <td className="table-body__item">{curr.ask}</td>
                    </tr>
                }) : <Loader />}
            </tbody>
        </table>
        </div>
    )
}

export default Table