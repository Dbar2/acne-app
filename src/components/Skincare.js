import React, { useState } from 'react';
import axios from 'axios';
import './Skincare.css';

const Skincare = () => {
  const [productName, setProductName] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const fetchSkinCareSuggestions = async (query) => {
    if (query.length > 2) {
      try {
        const options = {
          method: 'GET',
          url: 'https://sephora.p.rapidapi.com/us/products/v2/search',
          params: { query },
          headers: {
            'x-rapidapi-key': '5ff215a8a7mshac7e90f767e3809p1335f3jsnfebf4a5aa1e2',
            'x-rapidapi-host': 'sephora.p.rapidapi.com',
          },
        };
        const response = await axios.request(options);
        setSuggestions(response.data);
      } catch (error) {
        alert('Failed to fetch product suggestions');
      }
    } else {
      setSuggestions([]);
    }
  };

  const handleProductSelect = (product) => {
    setProductName(product.name);
    setSuggestions([]);
    fetchProductDetails(product.id);
  };

  const fetchProductDetails = async (productId) => {
    try {
      const options = {
        method: 'GET',
        url: 'https://sephora.p.rapidapi.com/us/products/v2/detail',
        params: { productId },
        headers: {
          'x-rapidapi-key': '5ff215a8a7mshac7e90f767e3809p1335f3jsnfebf4a5aa1e2',
          'x-rapidapi-host': 'sephora.p.rapidapi.com',
        },
      };
      const response = await axios.request(options);
      if (response.data) {
        setSelectedProduct(response.data);
      } else {
        alert('No product found');
      }
    } catch (error) {
      alert('Failed to fetch product details');
    }
  };

  return (
    <div className="skincare">
      <h1>Search Skincare Products</h1>
      <input
        type="text"
        value={productName}
        onChange={(e) => {
          setProductName(e.target.value);
          fetchSkinCareSuggestions(e.target.value);
        }}
        placeholder="Enter product name"
        className="form-control"
      />
      {suggestions.length > 0 && (
        <div className="suggestions">
          <ul>
            {suggestions.map((product) => (
              <li key={product.id} onClick={() => handleProductSelect(product)}>
                {product.name} - {product.brand}
              </li>
            ))}
          </ul>
        </div>
      )}
      {selectedProduct && (
        <div className="product-details">
          <h3>{selectedProduct.brand} - {selectedProduct.name}</h3>
          <p><strong>Ingredients:</strong> {selectedProduct.ingredient_list.join(', ')}</p>
          <p><strong>Description:</strong> {selectedProduct.description}</p>
        </div>
      )}
    </div>
  );
};

export default Skincare;
