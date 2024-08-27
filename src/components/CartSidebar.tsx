import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { removeItemFromCart } from '../features/cartSlice';
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

  // const handleClearCart = () => {
  //   dispatch(clearCart());
  // };

  const handleGoToCart = () => {
    onClose();
    navigate('/cart');
  };

  const handleContinueShopping = () => {
    onClose();
    navigate('/products'); 
  };

  const handleGoToCheckout = () => {
    onClose();
    navigate('/checkout');
  }

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
            {items.map(item => (
              <div key={item.id} className='cart-sidebar-content'>
                <p><img src={item.image}/></p>
                <p>
                  <p className='sidebar-content-middle'>{item.name}</p>
                  <p className='sidebar-content-middle'>{item.quantity} x  Rp. {(item.price * item.quantity).toFixed(2)}</p>
                </p>
                <p><button onClick={() => handleRemoveItem(item.id)}><img src="../src/assets/remove-product-icon.png" alt="Remove Button" /></button></p>
              </div>
            ))}
          <div>
            <p>Total Quantity: {totalQuantity}</p>
            <p>Total Price: Rp. {totalPrice}</p>
            <div className='cart-sidebar-buttons'>
              {/* <button onClick={handleClearCart}>Clear Cart</button> */}
              <button onClick={handleGoToCart}>Cart</button>
              <button onClick={handleGoToCheckout}>Checkout</button>
            <button onClick={handleContinueShopping}>Continue Shopping</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartSidebar;
