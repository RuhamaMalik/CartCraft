import { useState, useEffect } from "react";
import ProductList from "../components/ProductList";
import Cart from "../components/Cart";
import { useDispatch } from "react-redux";
import { loadCartFromStorage } from "../redux/cartSlice";
import { useSelector } from "react-redux";

export default function Home() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart);
  const cartItemCount = cartItems.length;

  const toggleCart = () => setIsCartOpen(!isCartOpen);

  useEffect(() => {
    dispatch(loadCartFromStorage());
  }, [dispatch]);

  return (
    <div className="min-h-screen  bg-[#131313]">
      <header className="bg-[#e9e61b] p-4 text-white flex justify-between">
      <h1 className="text-4xl font-bold italic bg-gradient-to-r from-black to-stone-400 via-stone-500  text-transparent bg-clip-text drop-shadow-lg transform hover:scale-105 transition-transform duration-300">
  CartCraft
</h1>
        <button
          onClick={toggleCart}
          className=" text-[#e9e61b] py-2 px-4 rounded shadow bg-gray-800 hover:bg-gray-700 transition relative"
        >
          Cart 🛒
          <span
            className={`absolute top-0 right-0 mt-[-10px] mr-[-10px] border border-white text-white rounded-full w-6 h-6 flex items-center justify-center text-xs ${
              cartItemCount === 0 ? "bg-[#131313] " : "bg-green-600"
            }`}
          >
            {cartItemCount}
          </span>
        </button>
      </header>
      <main className="py-8">
        <ProductList />
      </main>
      <Cart isOpen={isCartOpen} toggleCart={toggleCart} />
    </div>
  );
}
