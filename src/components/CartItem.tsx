import { useShoppingCart } from '../store/cartCtx';
import { Stack, Button } from 'react-bootstrap';
import products from '../data/products';
import { currencyFormatter } from '../helpers/currencyFormatter';

type CartItemProps = {
  id: number;
  quantity: number;
};

const CartItem = ({ id, quantity }: CartItemProps) => {
  const { removeFromCart } = useShoppingCart();
  const item = products.find((product) => product.id === id);
  if (!item) return null;
  return (
    <Stack
      direction='horizontal'
      gap={2}
      className='d-flex 
    align-items-center'
    >
      <img
        src={item.img}
        style={{ width: '125px', height: '75px', objectFit: 'cover' }}
        alt={item.name}
      />
      <div className='me-auto'>
        <div>
          {item.name}{' '}
          {quantity > 1 && (
            <span className='text-muted' style={{ fontSize: '.75rem' }}>
              x{quantity}
            </span>
          )}
        </div>
        <div className='text-muted' style={{ fontSize: '.75rem' }}>
          {currencyFormatter(item.price)}
        </div>
        <div> {currencyFormatter(item.price * quantity)}</div>
        <Button
          variant='outline-danger'
          size='sm'
          onClick={() => removeFromCart(item.id)}
        >
          &times;
        </Button>
      </div>
    </Stack>
  );
};

export default CartItem;
