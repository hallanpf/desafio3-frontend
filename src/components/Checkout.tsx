// import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';

const Checkout = () => {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const totalPrice = useSelector((state: RootState) => state.cart.totalPrice);

  return (
    <div className='checkout-content'>
      <div className='left'>
        <h1>Billing details</h1>
        <form>
          <div>
            <label htmlFor='first-name'>First Name</label>
            <input type='text' id='first-name' name='first-name' required />
          </div>
          <div>
            <label htmlFor='last-name'>Last Name</label>
            <input type='text' id='last-name' name='last-name' required />
          </div>
          <div>
            <label htmlFor='company-name'>Company Name (optional)</label>
            <input type='text' id='company-name' name='company-name' />
          </div>
          <div>
            <label htmlFor='postcode-zip'>ZIP code</label>
            <input type='text' id='postcode-zip' name='postcode-zip' required />
          </div>
          <div>
            <label htmlFor='country-region'>Country / Region</label>
            <input type='text' id='country-region' name='country-region' required />
          </div>
          <div>
            <label htmlFor='street-address'>Street Address</label>
            <input type='text' id='street-address' name='street-address' required />
          </div>
          <div>
            <label htmlFor='town-city'>Town / City</label>
            <input type='text' id='town-city' name='town-city' required />
          </div>
          <div>
            <label htmlFor='province'>Province</label>
            <input type='text' id='province' name='province' required />
          </div>
          <div>
            <label htmlFor='add-on-address'>Add-on address</label>
            <input type='text' id='add-on-address' name='add-on-address' required />
          </div>
          <div>
            <label htmlFor='email'>Email address</label>
            <input type='email' id='email' name='email' required />
          </div>
          <div className='add-info'>
            <input type='text' id='add-information' name='add-information' placeholder='Additional information' />
          </div>
        </form>
      </div>
      <div className='right'>
        <div className='right-content'>
          <div className='product-info'>
            <h2>Product</h2><h2>Subtotal</h2>
          </div>
          {cartItems.map(item => (
            <div key={item.id} className='product-info'>
            <p>{item.name} x {item.quantity}</p>
            <p>Rp. {(item.quantity*totalPrice)}</p>
            </div>
          ))}
          <div className='product-info'>
            <h4>Subtotal</h4>
            <p>Rp. {totalPrice}</p>
          </div>
          <div className='product-info'>
            <h4>Total</h4>
            <p>Rp. {totalPrice}</p>
          </div>
          <div>
          <div className='payment-method'>
            <div className='payment-method-content'>
              <p>
                <input type='radio' name='payment' value='direct-bank-transfer'/>
                <label htmlFor='direct-bank-transfer'> Direct Bank Transfer</label>
                <p>Make your payment directly into our bank account. Please use your Order ID as the payment reference. Your order will not be shipped until the funds have cleared in our account.</p>
              </p>
              <p>
                <input type='radio' name='payment' value='cash-on-delivery'/>
                <label htmlFor='cash-on-delivery'> Cash on Delivery</label>
                <p>Pay for your order in cash at the time of delivery. Please have the exact amount ready, as our delivery agents may not carry change. Your order will be handed over once payment is made.</p>
              </p>
              <div className='order'>
                <p>Your personal data will be used to support your experience throughout this website, to manage access to your account, and for other purposes described in our <strong>privacy policy.</strong></p>
                <p className='button'><button className='place-order'>Place Order</button></p>
              </div>
            </div>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
