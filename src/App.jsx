import { useState, useEffect } from 'react'
import { useFetch } from './hook/useFetch';
import './App.css'

const url = "http://localhost:3001/products";

function App() {
  const [products, setProducts] = useState([])
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  

  const { data:items } = useFetch(url);




   const handleSubmit = async (e) => {
    e.preventDefault();

    const product = {
      name,
      price
    };

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(product),
    });
    const addedProduct = await response.json()

    setProducts((prevProducts) => [...prevProducts, addedProduct]);
    setName("");
    setPrice("");
   }

  return (
    <>
      <h1>Lista de produtos</h1>
      <ul>
        {items && items.map((products) => (
          <li key={products.id}>{products.name} = R$ {products.price}</li>
        ))}
      </ul>
      <div className="addProduct">
        <form onSubmit={handleSubmit}>
          <label>
            Nome:
            <input type='text' value={name} name="name" onChange={(e)=> setName(e.target.value)}/>
          </label> 
          <label>
            preço:
            <input type='text' value={price} name="price" onChange={(e)=> setPrice(e.target.value)}/>
          </label> 
          <input type="submit" value="Criar"/>
        </form>
      </div>
    </>
  )
}

export default App
