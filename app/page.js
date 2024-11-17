'use client';

import { useState, useEffect } from 'react';

const Home = () => {
  const [cachedData, setCachedData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch products data
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://fakestoreapi.com/products');
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await response.json();
        
        // Cache products in localStorage
        localStorage.setItem('products', JSON.stringify(data));

        // Set data to state
        setCachedData(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching products:', error);
        setLoading(false);
      }
    };

    // Check if products are already in localStorage
    const cached = localStorage.getItem('products');
    if (cached) {
      try {
        const parsedData = JSON.parse(cached);
        setCachedData(parsedData);
        setLoading(false);
      } catch (error) {
        console.error('Error parsing cached data, fetching again:', error);
        fetchProducts();  
      }
    } else {
      fetchProducts();  
    }
  }, []);

  return (
    <div>
      <h1 className='fntpd'>Product List</h1>
      <div className="product-grid">
        {loading ? (
          <p>Loading products...</p>
        ) : (
          cachedData.length > 0 ? (
            cachedData.map((product) => (
              <div key={product.id} className="product-card">
                <img
                  src={product.image || 'https://via.placeholder.com/150'}
                  alt={product.title || 'Product Image'}
                  loading="lazy"
                />
                <h3 className='pdtlength' data-title={product.title}>{product.title}</h3>
                
                <p className='txtct'>${product.price}</p>
              </div>
            ))
          ) : (
            <p>No products found</p>
          )
        )}
      </div>
    </div>
  );
};

export default Home;
