import { Navbar as NavBs, Nav, Container, Button } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import cartIcon from '../assets/cart.svg';
import { useShoppingCart } from '../store/cartCtx';

const Navbar = () => {
  const { openCart, cartQuantity } = useShoppingCart();
  return (
    <NavBs sticky='top' className='bg-white shadow-sm mb-3'>
      <Container>
        <Nav className='me-auto'>
          <Nav.Link to='/' as={NavLink}>
            Home
          </Nav.Link>{' '}
          <Nav.Link to='/store' as={NavLink}>
            Store
          </Nav.Link>{' '}
          <Nav.Link to='/about' as={NavLink}>
            About
          </Nav.Link>
        </Nav>
        {cartQuantity > 0 && (
          <Button
            variant='outline-primary'
            className='rounded-circle'
            onClick={openCart}
            style={{
              width: '3rem',
              height: '3rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
            }}
          >
            <img
              src={cartIcon}
              alt='cart'
              style={{ width: '1.75rem', height: '1.75rem', color: 'white' }}
            />
            <div
              className='rounded-circle bg-danger d-flex 
          justify-content-center align-items-center'
              style={{
                color: 'white',
                position: 'absolute',
                bottom: 0,
                right: 0,
                width: '1.5rem',
                height: '1.5rem',
                transform: 'translate(25%,25%)',
              }}
            >
              {cartQuantity}
            </div>
          </Button>
        )}
      </Container>
    </NavBs>
  );
};

export default Navbar;
