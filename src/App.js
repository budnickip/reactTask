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
      console.log(response[0].rates)
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
      <table>
        <thead className="table-header">
          <tr className="table-header__row">
            <th className="table-header__item" id="currency-code">Kod</th>
            <th className="table-header__item" id="currency-bid">Kupno</th>
            <th className="table-header__item" id="currency-ask">Sprzedaż</th>
          </tr>
        </thead>
        <tbody className="table-body">
          {currencies ? currencies.filter(curr => {
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
  );
}

export default App;
