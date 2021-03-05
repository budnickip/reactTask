import Table from '../Table'
import './style.scss'

const Header = (props) =>{
    return(
        <div className="header">
            <p className="header__paragraph">{props.lastUpdate}</p>
            <Table currencies={props.currencies} />
        </div>
    )
}
export default Header