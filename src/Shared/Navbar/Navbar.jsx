import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../Provider/Provider';

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);

  // Sign out handler
  const handleOut = async () => {
    try {
      await logOut();
    } catch (error) {
      console.error("Sign Out Error:", error.message);
    }
  };

  return (
    <div className='w-11/12 mx-auto'>
      <div className="navbar">
        <div className="navbar-start">
          
          
          
          {/* <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16" />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
              <li><a>Item 1</a></li>
              <li>
                <a>Parent</a>
                <ul className="p-2">
                  <li><a>Submenu 1</a></li>
                  <li><a>Submenu 2</a></li>
                </ul>
              </li>
              <li><a>Item 3</a></li>
            </ul>

          </div> */}

          
           <Link to={"/"}><h1 className="font-bold text-xl">DevPlanner</h1></Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            {/* <li><a>Item 1</a></li>
            <li>
              <details>
                <summary>Parent</summary>
                <ul className="p-2">
                  <li><a>Submenu 1</a></li>
                  <li><a>Submenu 2</a></li>
                </ul>
              </details>
            </li>
            <li><a>Item 3</a></li> */}
          </ul>
        </div>
        <div className="navbar-end">
          {user 
            ? <h2 className='btn' onClick={handleOut}>Sign Out</h2>
            : <Link to={'/signIn'}><h2 className='btn'>Sign In</h2></Link>
          }
        </div>
      </div>
    </div>
  );
};

export default Navbar;
