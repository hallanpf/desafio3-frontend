import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';
import { RootState } from '../store/store';
import { removeItemFromCart, updateItemQuantity  } from '../features/cartSlice';
import { toast } from 'react-toastify';

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items, totalPrice } = useSelector((state: RootState) => state.cart);

  const handleRemoveItem = (id: string) => {
    dispatch(removeItemFromCart(id));
  };

  // const handleClearCart = () => {
  //   dispatch(clearCart());
  // };

  const handleAddOtherProducts = () => {
    navigate('/products');
  };

  const handleGoToCheckout = () => {
    navigate('/checkout');
  }

  const handleQuantityChange = (id: string, quantity: number) => {
    if (quantity > 0) {
      dispatch(updateItemQuantity({ id, quantity }));
    }
  };

  return (
    <>
    
    <section className="image-content-section">
        <div className="image">
          <img src="../src/assets/Rectangle_1.png" alt="" />
          <div className="shop-navigation">
            <h3>Cart</h3>
            <p><span>Home {'>'} </span> Cart</p>
          </div>
        </div>
      </section>
      
      
    <div className="cart-content">
      {items.length === 0 ? (
        <>
        {toast.error('Your cart is empty. Please add some products to cart.')}
        <Navigate to="/products" />
        </>
      ) : (
        <div className='cart-items'>
          <table>
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Subtotal</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
            {items.map(item => (
              <tr key={item.id}>
                <td><img src={item.image} /> {item.name}</td>
                <td>Rp. {(item.price)}</td>
                <td><input
                        type="number"
                        value={item.quantity}
                        min="1"
                        onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value))}
                      /></td>
                <td>Rp. {(item.price * item.quantity)}</td>
                <td><button onClick={() => handleRemoveItem(item.id)}><img src="../src/assets/remove-icon.png" alt="Remove Button" /></button></td>
              </tr>
            ))}
          </tbody>
        </table>
          <div className="cart-summary">
              <h2>Cart Totals</h2>
              <div className="summary-details">
                <p>Subtotal: <span>Rp {totalPrice}</span></p>
                <p>Total: <span>Rp {totalPrice}</span></p>
              </div>
              <div className="checkout-button">
              <button onClick={handleGoToCheckout}>Checkout</button>
              <button onClick={handleAddOtherProducts}>Continue Shopping</button>
              </div>
            </div>
          </div>

        
      )}
    </div>
  </>
  );
};

export default Cart;
