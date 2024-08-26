import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { removeItemFromCart, clearCart } from '../features/cartSlice';
import { useNavigate } from 'react-router-dom';

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const CartSidebar: React.FC<CartSidebarProps> = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items, totalQuantity, totalPrice } = useSelector((state: RootState) => state.cart);

  const handleRemoveItem = (id: string) => {
    dispatch(removeItemFromCart(id));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const handleGoToCart = () => {
    onClose();
    navigate('/cart');
  };

  const handleContinueShopping = () => {
    onClose();
    navigate('/products'); 
  };

  if (!isOpen) return null;

  return (
    <div className="cart-sidebar">
      <div className="cart-sidebar-header">
        <h2>Shopping Cart</h2>
        <button onClick={onClose}>Close</button>
      </div>
      {items.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          <ul>
            {items.map(item => (
              <li key={item.id}>
                <p>{item.name}</p>
                <p>Quantity: {item.quantity}</p>
                <p>Price: ${(item.price * item.quantity).toFixed(2)}</p>
                <button onClick={() => handleRemoveItem(item.id)}>Remove</button>
              </li>
            ))}
          </ul>
          <div>
            <p>Total Quantity: {totalQuantity}</p>
            <p>Total Price: ${totalPrice.toFixed(2)}</p>
            <div className='buttons'>
              <button onClick={handleClearCart}>Clear Cart</button>
              <button onClick={handleGoToCart}>Cart</button>
              <button onClick={handleContinueShopping}>Continue Shopping</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartSidebar;
