import './style.scss'

const TableHeader = () =>{
    return (
        <thead className="table-header">
            <tr className="table-header__row">
                <th className="table-header__item" id="currency-code">Kod</th>
                <th className="table-header__item" id="currency-bid">Kupno</th>
                <th className="table-header__item" id="currency-ask">Sprzedaż</th>
            </tr>
        </thead>
    )
}

export default TableHeader