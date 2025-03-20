

const NavBar = () => {
  return (
    <nav className="navbar">
      <ul className="navbar-list">
        <li className="navbar-item">
          <a href="#home" className="navbar-link">
            Home
          </a>
        </li>
        <li className="navbar-item">
          <a href="#category" className="navbar-link">
            Category
          </a>
        </li>
        <li className="navbar-item">
          <a href="#cart" className="navbar-link">
            Cart
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;