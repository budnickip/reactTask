import { useState, useEffect } from 'react';
import './App.css';
import Loader from './components/Loader'

function App() {
  const [currencies, setCurrencies] = useState([])
  const [lastUpdate, setlastUpdate] = useState('')

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
    })
    .catch(error => {
      console.error("Błąd pobrania API!")
    })
  }

  const currentDateTime = () =>{
    let currentdate = new Date(); 
    let minutes = currentdate.getMinutes() < 10 ? '0' + currentdate.getMinutes() : currentdate.getMinutes()
    let seconds = currentdate.getSeconds() < 10 ? '0' + currentdate.getSeconds() : currentdate.getSeconds()
    let datetime = `Ostatnia aktualizacja: ${currentdate.getDate()}/${currentdate.getMonth()+1}/${currentdate.getFullYear()} @ ${currentdate.getHours()}:${minutes}:${seconds}`
    return datetime
  }

  return (
    <div className="App">
      {lastUpdate}
      <ul>
        {currencies ? currencies.map(curr => {
          return <li key={curr.code}>{curr.code}: {curr.bid}</li>
        }) : <Loader />}
      </ul>
    </div>
  );
}

export default App;
