import Chart from "react-google-charts";
import './style.scss'

const DrawChart = (props) =>{
    return (
        <div className="chart">
            <Chart
                width={'95%'}
                height={'400px'}
                chartType="Line"
                loader={<div>Loading Chart</div>}
                data={props.currenciesOldData}
                options={{
                    chart: {
                    title: 'Tabela średnich kursów walut',
                    subtitle: 'z ostatniego miesiąca',
                    },
                }}
                rootProps={{ 'data-testid': '3' }}
            />
        </div>
    )
}

export default DrawChart