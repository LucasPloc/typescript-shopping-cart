import { Offcanvas, Stack } from 'react-bootstrap';
import { useShoppingCart } from '../store/cartCtx';
import { CartItem } from '../components';
import { currencyFormatter } from '../helpers/currencyFormatter';
import products from '../data/products';

const Shoppingcart = () => {
  const { closeCart, isOpen, cartItems } = useShoppingCart();

  const totalPrice = cartItems.reduce((total, i) => {
    const item = products.find((cartItem) => i.id === cartItem.id);
    return total + (item?.price || 0) * i.quantity;
  }, 0);
  return (
    <Offcanvas show={isOpen} onHide={closeCart} placement='end'>
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Cart</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <Stack gap={3}>
          {cartItems.map((item) => (
            <CartItem key={item.id} {...item} />
          ))}
          <div className='ms-auto fw-bold fs-5'>
            Total {currencyFormatter(totalPrice)}
          </div>
        </Stack>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default Shoppingcart;
