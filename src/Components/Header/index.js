import { useHistory } from 'react-router-dom';
import './style.css';
import Logo from '../../Assets/pizarria.png';


function Header() {
    const history = useHistory();

    function logout(){
        localStorage.clear();
        history.push('/');
    }

    return(
        <div className='flex-row items-flex-end headerProducts'>
            <img className='imgProfile' src={Logo} alt='background pizzaria' />
            <h1 className='font-baloo font-color-white title-header'>Pizza Pizzaria & Delivery</h1>
            <button className='font-montserrat font-color-white btn-logout' onClick={() => logout()}>Logout</button>
        </div>
    )
}

export default Header;