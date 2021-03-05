import { useState, useEffect } from 'react';
import './App.scss';
import DrawChart from './components/DrawChart'
import Header from './components/Header'

function App() {
  const [currencies, setCurrencies] = useState([])
  const [lastUpdate, setlastUpdate] = useState('')
  const [lastMonthCurrencies, setLastMonthCurrencies] = useState([])
  const [currenciesOldData, setcurrenciesOldData] = useState([])

  useEffect(()=>{
    let dateNow = getCurrentDate()
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
  }, [])

  useEffect(() => {
    fetchData()
    setInterval(() => {
      fetchData()
    }, 10000);
  }, []);

  const fetchData = () =>{
    fetch(`https://api.nbp.pl/api/exchangerates/tables/c/`)
    .then(response =>{
      if(response.ok){
          return response.json()
      } else {
          return Promise.reject(response)
      }
     })
    .then((response) => {
      setlastUpdate(currentDateTime)
      setCurrencies(response[0].rates)
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
    let convertMonth = +currentdate.getMonth() + 1
    let month = currentdate.getMonth() + 1 < 10 ? '0' + convertMonth : convertMonth
    let day = currentdate.getDate() < 10 ? '0' + currentdate.getDay() : currentdate.getDay()
    let date = `${currentdate.getFullYear()}-${month}-${day}`
    return date
  }

  const getMonthEalierDate = () =>{
    let currentdate = getCurrentDate()
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
  },[lastMonthCurrencies])


  return (
    <div className="App">
      <Header lastUpdate={lastUpdate} currencies={currencies} />
      <DrawChart currenciesOldData={currenciesOldData} />
    </div>
  );
}

export default App;
