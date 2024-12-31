import React, { useEffect, useState } from 'react';
import { getAllProducts, createProduct, updateProduct } from '../api/api.tsx';
import './Control.css';
import { useNavigate } from 'react-router-dom';
import NavBar from '../components/NavBar.tsx';

const Control = () => {
    const [products, setProducts] = useState([]);
    const [newProduct, setNewProduct] = useState({
        name: '',
        description: '',
        price: '',
        is_active: true,
        image_url: ''
    });
    const [selectedFunction, setSelectedFunction] = useState('');
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const [selectedImage, setSelectedImage] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (user.role !== 'admin') {
            navigate('/home');
        } else {
            const fetchProducts = async () => {
                const response = await getAllProducts();
                setProducts(response.data.products);
            };
            fetchProducts();
        }
    }, [user, navigate]);

    const handleInputChange = (e, index) => {
        const { name, value } = e.target;
        const updatedProducts = [...products];
        updatedProducts[index][name] = value;
        setProducts(updatedProducts);
    };

    const handleUpdateProduct = async (index) => {
        const product = products[index];
        await updateProduct(product);
        alert('商品信息更新成功');
    };

    const handleNewProductChange = (e) => {
        const { name, value } = e.target;
        setNewProduct({ ...newProduct, [name]: value });
    };

    const handleImageChange = (e) => {
        setSelectedImage(e.target.files[0]);
    };

    const handleCreateProduct = async () => {
        const productData = { ...newProduct, image: selectedImage };
        await createProduct(productData);
        alert('商品创建成功');
        setNewProduct({
            name: '',
            description: '',
            price: '',
            is_active: true,
            image_url: ''
        });
        setSelectedImage(null);
        const response = await getAllProducts();
        setProducts(response.data.products);
    };

    return (
        <div className="control-page">
            <NavBar username={user.name || '用户'} />
            <h1>管理页面</h1>
            <div className="function-menu">
                <button onClick={() => setSelectedFunction('add')}>添加商品</button>
                <button onClick={() => setSelectedFunction('edit')}>编辑商品信息</button>
            </div>
            {selectedFunction === 'edit' && (
  <div>
    <h2>编辑商品信息</h2>
    <table className="product-table">
      <thead>
        <tr>
          <th>商品名称</th>
          <th>商品描述</th>
          <th>商品价格</th>
          <th>状态</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        {products.map((product, index) => (
          <tr key={product.id}>
            <td>
              <input
                type="text"
                name="name"
                value={product.name}
                onChange={(e) => handleInputChange(e, index)}
                placeholder="商品名称"
              />
            </td>
            <td>
              <input
                type="text"
                name="description"
                value={product.description}
                onChange={(e) => handleInputChange(e, index)}
                placeholder="商品描述"
              />
            </td>
            <td>
              <input
                type="text"
                name="price"
                value={product.price}
                onChange={(e) => handleInputChange(e, index)}
                placeholder="商品价格"
              />
            </td>
            <td>
              <select
                name="is_active"
                value={product.is_active ? 1 : 0}
                onChange={(e) => handleInputChange(e, index)}
              >
                <option value={1}>上架</option>
                <option value={0}>下架</option>
              </select>
            </td>
            <td>
              <button onClick={() => handleUpdateProduct(index)}>更新商品</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
)}
            {selectedFunction === 'add' && (
                <div>
                    <h2>添加新商品</h2>
                    <div className="product-form">
                        <input
                            type="text"
                            name="name"
                            value={newProduct.name}
                            onChange={handleNewProductChange}
                            placeholder="商品名称"
                        />
                        <input
                            type="text"
                            name="description"
                            value={newProduct.description}
                            onChange={handleNewProductChange}
                            placeholder="商品描述"
                        />
                        <input
                            type="text"
                            name="price"
                            value={newProduct.price}
                            onChange={handleNewProductChange}
                            placeholder="商品价格"
                        />
                        <input
                            type="file"
                            name="image"
                            onChange={handleImageChange}
                            placeholder="选择商品图片"
                        />
                        
                        <button onClick={handleCreateProduct}>添加商品</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Control;