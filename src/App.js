import { useState, useEffect } from 'react';
import './App.scss';
import DrawChart from './components/DrawChart'
import Header from './components/Header'

function App() {
  const [currencies, setCurrencies] = useState([])
  const [lastUpdate, setlastUpdate] = useState('')

  useEffect(() => {
    fetchData()
    
    let interval = setInterval(() => {
      fetchData()
    }, 10000);

    return () =>{
      clearInterval(interval)
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

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
    let day = currentdate.getDay() < 10 ? '0' + currentdate.getDay() : currentdate.getDay()
    let date = `${currentdate.getFullYear()}-${month}-${day}`
    return date
  }



  return (
    <div className="App">
      <Header lastUpdate={lastUpdate} currencies={currencies} />
      <DrawChart getCurrentDate={getCurrentDate} />
    </div>
  );
}

export default App;
