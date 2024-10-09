import { Link, useNavigate } from 'react-router-dom';
import logo from "../../public/logo-icon.png";

const Nav = () => {

  const auth = localStorage.getItem('user');
  const navigate = useNavigate();
  const logout = () => {
    if (window.confirm("Are you sure to Logout")) {
      localStorage.clear();
      navigate('/signup');
    }
  }

  return (
    <div>
      <img
        className='app-logo'
        alt='app-logo'
        src={logo}
      />
      {auth ?
        <ul className="nav-ul">
          <li><Link to="/" >Products</Link></li>
          <li><Link to="/add" >Add Product</Link></li>
          <li><Link to="/update" >Update Product</Link></li>
          <li><Link to="/profile" >Profile</Link></li>
          <li><Link to="/signup" onClick={logout} >Logout({JSON.parse(auth).name})</Link></li>
        </ul>
        :
        <ul className="nav-ul nav-right">
          <li><Link to="/signup" >Sign Up</Link></li>
          <li><Link to="/login" >Login</Link></li>
        </ul>

      }
    </div>
  )
}

export default Nav;