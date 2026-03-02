import { useState, useEffect } from 'react'
import { useFetch } from './hook/useFetch';
import './App.css'

const url = "http://localhost:3001/products";

function App() {
  const [products, setProducts] = useState([])
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  

  const { data:items, httpConfig, loading } = useFetch(url);




   const handleSubmit = async (e) => {
    e.preventDefault();

    const product = {
      name,
      price
    };

    httpConfig(product, "POST");
    setName("");
    setPrice("");
   }

  return (
    <>
      <h1>Lista de produtos</h1>
      {loading && <p>Carregando dados...</p>}
      {!loading && (      
      <ul>
        {items && items.map((products) => (
          <li key={products.id}>{products.name} = R$ {products.price}</li>
        ))}
      </ul>)}
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
          {loading && <input className="button" type="submit" value="Aguarde" disabled/>}
          {!loading && <input className="button" type="submit" value="Criar"/>}
        </form>
      </div>
    </>
  )
}

export default App
