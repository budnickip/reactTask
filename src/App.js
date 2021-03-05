import { useState, useEffect } from 'react';
import './App.scss';
import Table from './components/Table'
import Chart from "react-google-charts";

function App() {
  const [currencies, setCurrencies] = useState([])
  const [lastUpdate, setlastUpdate] = useState('')
  const [lastMonthCurrencies, setLastMonthCurrencies] = useState([])
  const [currenciesChart, setCurrenciesChart] = useState([])
  //2012-01-31
  useEffect(()=>{
    let dateNow = getCurrentDate()
    let monthEalier = getMonthEalierDate()
    fetch(`http://api.nbp.pl/api/exchangerates/tables/a/${monthEalier}/${dateNow}/`)
    .then(res => {
      if(res.ok){
        return res.json()
      }else{
        return Promise.reject(res)
      }
    })
    .then(res=>{
     // console.log(res)
      setLastMonthCurrencies(res)
      
    })    
    .catch(error => {
      console.error("Błąd pobrania API!")
    })
  }, [])

  useEffect(() => {
    fetchData()
    setInterval(() => {
      fetchData()
    }, 10000);
  }, []);

  const fetchData = () =>{
    //fetch('http://data.fixer.io/api/latest?access_key=9518d1ec1bfd7aed7c6c23cdc048afbe')
       // fetch(`http://api.nbp.pl/api/exchangerates/rates/c/eur/`)
    fetch(`http://api.nbp.pl/api/exchangerates/tables/c/`)
    .then(response =>{
      if(response.ok){
          return response.json()
      } else {
          return Promise.reject(response)
      }
     })
    .then((response) => {
     // console.log(response.rates)
      // setCurrencies(response.rates)
      setlastUpdate(currentDateTime)
      setCurrencies(response[0].rates)
     // console.log(response[0].rates)
    })
    .catch(error => {
      console.error("Błąd pobrania API!")
    })
  }

  const currentDateTime = () =>{
    let currentdate = new Date(); 
    let minutes = currentdate.getMinutes() < 10 ? '0' + currentdate.getMinutes() : currentdate.getMinutes()
    let seconds = currentdate.getSeconds() < 10 ? '0' + currentdate.getSeconds() : currentdate.getSeconds()
    let datetime = `Ostatnia aktualizacja: ${getCurrentDate()} @ ${currentdate.getHours()}:${minutes}:${seconds}`
    return datetime
  }

  const getCurrentDate = () =>{
    let currentdate = new Date()
    let convertMonth = new Number(currentdate.getMonth()) + 1
    let month = currentdate.getMonth() + 1 < 10 ? '0' + convertMonth : convertMonth
    let day = currentdate.getDate() < 10 ? '0' + currentdate.getDay() : currentdate.getDay()
    let date = `${currentdate.getFullYear()}-${month}-${day}`
    return date
  }

  const getMonthEalierDate = () =>{
    let currentdate = getCurrentDate()
    let currentMonth = new Number(currentdate.slice(5,7))
    let monthEalier = --currentMonth < 10 ? '0' + currentMonth : currentMonth
    let monthEalierDate = `${currentdate.slice(0,5).concat(monthEalier).concat(currentdate.slice(7))}`
    return monthEalierDate
  }

  const convertLastMonthCurrencies = () =>{
    currenciesChart.length = 0;
    currenciesChart.push(['Dzień','EUR','USD','GBP'])
    lastMonthCurrencies.forEach(currency =>{
      currenciesChart.push([currency.effectiveDate, currency.rates[7].mid, currency.rates[1].mid, currency.rates[10].mid])
    })
  }

  useEffect(()=>{
    convertLastMonthCurrencies()
  },[lastMonthCurrencies])


  return (
    <div className="App">
      <p className="App__paragraph">{lastUpdate}</p>
      <Table currencies={currencies} />
      <div style={{ display: 'flex', maxWidth: 900 }}>
        <Chart
          width={'600px'}
          height={'400px'}
          chartType="Line"
          loader={<div>Loading Chart</div>}
          data={currenciesChart}
          options={{
            chart: {
              title: 'Tabela średnich kursów walut',
              subtitle: 'z ostatniego miesiąca',
            },
          }}
          rootProps={{ 'data-testid': '3' }}
        />
       
      </div>
    </div>
  );
}

export default App;
