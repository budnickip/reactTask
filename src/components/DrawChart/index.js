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

      const getMonthEalierDate = () =>{
        let currentdate = props.getCurrentDate()
        let currentMonth = +currentdate.slice(5,7)
        let monthEalier = --currentMonth < 10 ? '0' + currentMonth : currentMonth
        let monthEalierDate = `${currentdate.slice(0,5).concat(monthEalier).concat(currentdate.slice(7))}`
        return monthEalierDate
      }

      // Pobieram wszystkie elementy tablicy i zwracam tablice, gdzie pierwszy element posiada tablice trzech
    // walut (EUR, USD, GBP), a drugi element datę.
    // dzięki temu w prosty sposób mogę zmieniac, które waluty mają być wyświetlane
    const convertLastMonthCurrencies = () =>{
        currenciesOldData.length = 0;
        currenciesOldData.push(['Dzień','EUR','USD','GBP'])
        lastMonthCurrencies.map(item=>{
        return [item.rates.filter(currency =>{
            if(currency.code === 'EUR' || currency.code === 'USD' || currency.code === 'GBP'){
            return true;
            }else{
            return false;
            }
        }), item.effectiveDate]
        }).forEach(currency =>{
        currenciesOldData.push([currency[1], currency[0][0].mid, currency[0][1].mid, currency[0][2].mid])
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