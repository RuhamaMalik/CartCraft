import { useDispatch } from 'react-redux';
import { addItem } from '../redux/cartSlice';
import Image from 'next/image';


export default function ProductCard({ product }) {
  const dispatch = useDispatch();

  const addToCart = () => {
    dispatch(addItem(product));
  };

  return (
  


    <div className="container">
    <div className="card">
      <div className="imgBx">
        <img 
        src={product.image}
          alt={product.name} 
         
        />
      </div>
      <div className="contentBx">
        <h2>{product.name}</h2>
        <div className="size">
        <h3>Price :</h3> <p className="text-gray-200">${product.price}</p>
          {/* 
          <h3>Size :</h3>
          <span>7</span>
          <span>8</span>
          <span>9</span>
          <span>10</span> */}
        </div>
        <div className="color">
         <p className="text-gray-200">{product.description}</p>

          {/* <h3>Color :</h3>
          <span></span>
          <span></span>
          <span></span> */}
        </div>
        <button  onClick={addToCart}>Add To Cart</button>
      </div>
    </div>
  </div>
  );
}
