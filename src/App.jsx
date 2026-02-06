import { useState, useEffect, use } from 'react'
import './App.css'

const url = "http://localhost:3001/products";

function App() {
  const [products, setProducts] = useState([])
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  useEffect(() => {
    //jeito mais correto:
    async function fetchData() {
      const response = await fetch(url) // traz mas em texto puro.
      const data = await response.json()// aqui transforma em objeto, assim dando pra usar no javascript
      setProducts(data);
      console.log(data);
    }
    fetchData();
   }, []);

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
   }

  return (
    <>
      <h1>Lista de produtos</h1>
      <ul>
        {products.map((products) => (
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
