import { useState, useEffect } from 'react';

import Chart from "react-google-charts";
import './style.scss'

const DrawChart = (props) =>{
    const [lastMonthCurrencies, setLastMonthCurrencies] = useState([])
    const [currenciesOldData, setcurrenciesOldData] = useState([])

    useEffect(()=>{
        let dateNow = props.getCurrentDate()
        let monthEalier = getMonthEalierDate()
        fetch(`https://api.nbp.pl/api/exchangerates/tables/a/${monthEalier}/${dateNow}/`)
        .then(res => {
          if(res.ok){
            return res.json()
          }else{
            return Promise.reject(res)
          }
        })
        .then(res=>{
          setLastMonthCurrencies(res)
        })    
        .catch(error => {
          console.error("Błąd pobrania API!")
        })
      }, []) // eslint-disable-line react-hooks/exhaustive-deps

      //obsługuje również rok wstecz.
      const getMonthEalierDate = () =>{
        let currentdate = props.getCurrentDate()
        let currentMonth = +currentdate.slice(5,7)
        let monthEalier = currentMonth === 1 ? 12 : --currentMonth < 10 ? '0' + currentMonth : currentMonth
        let year = monthEalier === 12 ? +currentdate.slice(0,4) -1 : +currentdate.slice(0,4)
        let monthEalierDate = year+'-'+monthEalier+currentdate.slice(7)
        return monthEalierDate
      }

      // Pobieram wszystkie elementy tablicy i zwracam obiekt, gdzie pierwszy element posiada tablice trzech
    // walut (EUR, USD, GBP), a drugi element datę.
    // dzięki temu w prosty sposób mogę zmieniac, które waluty mają być wyświetlane
    const convertLastMonthCurrencies = () =>{
        currenciesOldData.length = 0;
      //  currenciesOldData.push(['Dzień','USD','EUR','GBP'])
        lastMonthCurrencies.map(item=>{
        return {rates: item.rates.filter(currency =>{
            if(currency.code === 'EUR' || currency.code === 'USD' || currency.code === 'GBP'){
            return true;
            }else{
            return false;
            }
        }), date: item.effectiveDate}
        }).forEach((currency, index) =>{
          if(index === 0){
            currenciesOldData.push(['Dzień', currency.rates[0].code, currency.rates[1].code, currency.rates[2].code])
          }
          currenciesOldData.push([currency.date, currency.rates[0].mid, currency.rates[1].mid, currency.rates[2].mid])
        })
    }
    
    
    useEffect(()=>{
        convertLastMonthCurrencies()
    },[lastMonthCurrencies]) // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <div className="chart">
            <Chart
                width={'95%'}
                height={'400px'}
                chartType="Line"
                loader={<div>Loading Chart</div>}
                data={currenciesOldData}
                options={{
                    chart: {
                    title: 'Wykres średnich kursów walut',
                    subtitle: 'z ostatniego miesiąca',
                    },
                }}
                rootProps={{ 'data-testid': '3' }}
            />
        </div>
    )
}

export default DrawChart