import React, { useEffect, useState } from 'react';
import { getActiveProducts } from '../api/api.tsx';
import ProductsDetail from '../components/ProductsDetail.tsx';
import './Home.css';

const Home = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            const response = await getActiveProducts();
            setProducts(response.data.products);
        };
        fetchProducts();
    }, []);

    return (
        <div className="home-page">
            <div className="products-grid">
                {products.map((product) => (
                    <ProductsDetail product={product}  />
                ))}
            </div>
        </div>
    );
};

export default Home;