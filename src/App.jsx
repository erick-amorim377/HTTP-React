import { useState, useEffect } from 'react'
import './App.css'

const url = "http://localhost:3001/products";

function App() {
  const [products, setProducts] = useState([])

  useEffect(() => {
    //jeito mais correto:
    async function fetchData() {
      const response = await fetch(url) // traz mas em texto puro.
      const data = await response.json()// aqui transforma em objeto, assim dando pra usar no javascript
      setProducts(data);
      console.log(data);
    }
    fetchData();

    //jeito errado de se fazer:
    // const response = await fetch(url) 
    // const data = await response.json();
    // setProducts(data);
   }, []);

  return (
    <>
      <h1>Lista de produtos</h1>
      <ul>
        {products.map((products) => (
          <li key={products.id}>{products.name} = R$ {products.price}</li>
        ))}
      </ul>
    </>
  )
}

export default App
