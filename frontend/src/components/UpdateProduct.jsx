import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';


const UpdateProduct = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCotegory] = useState('');
  const [company, setCompany] = useState('');
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    getProductDetails();
  }, [])

  const getProductDetails = async () => {
    let result = await fetch(`http://localhost:5000/product/${params.id}`, {
      headers: {
        authorization:`bearer ${JSON.parse(localStorage.getItem("token"))}`
      }
    });
    result = await result.json();
    setName(result.name);
    setPrice(result.price);
    setCotegory(result.category);
    setCompany(result.company);
  }

  const updateProduct = async () => {
    let result = await fetch(`http://localhost:5000/product/${params.id}`, {
      method: "Put",
      body: JSON.stringify({name, price, category, company}),
      headers: {
        "Content-Type": "application/json",
        authorization:`bearer ${JSON.parse(localStorage.getItem("token"))}`
      }
    });
    result = await result.json()
    navigate('/')
  }
  
  return (
    <div className='product'>
      <h1>Update Product</h1>
      <input   
        className='input-box'
        type='text'
        placeholder='Enter Product Name'
        onChange={(e) => setName(e.target.value)}
        value={name}
      />

      <input 
        className='input-box' 
        type='text' 
        placeholder='Enter Product Price'
        onChange={(e) => setPrice(e.target.value)}
        value={price}
      />

      <input
        className='input-box'
        type='text'
        placeholder='Enter Product Category'
        onChange={(e)=>setCotegory(e.target.value)}
        value={category}
      />

      <input 
        className='input-box'
        type='text'
        placeholder='Enter Product Company' 
        onChange={(e) => setCompany(e.target.value)}
        value={company}
      />

      <button 
        className='app-button'
        onClick={updateProduct}
      >
        Update Product
      </button>
    </div>
  )
}

export default UpdateProduct;