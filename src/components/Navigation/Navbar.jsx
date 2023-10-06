import React from 'react'
import './style.css';
import logo from "../../assets/wealthvue-coloured-logo.png";
// import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Link } from '@mui/material';

const Navbar = () => {

  const pages = [
    {
      name: 'Dashboard',
      href: '/dashboard',
    },
    {
      name: 'Transactions',
      href: '/transactions',
    },
    {
      name: 'Portfolio',
      href: '/portfolio',
    },
    {
      name: 'Budget',
      href: '/budget'
    },
    {
      name: 'Learn',
      href: '/learn',
    }
  ];

  return (
    <nav>
        <div className='left-section'>
          {/* <MenuIcon className='menu-icon'/> */}
          <div className='brand-logo'>
            <div className='icon'><img src={logo} alt="logo" width="30"/></div>
            <div className='name'>WealthVue</div>
          </div>
        </div>
        <div className='middle-section'>
          <div className='tabs'>
            {pages.map((page) => (
              <div className='tab' key={page.name}>
                <Link href={page.href} underline='none' color={"inherit"}>{page.name}</Link>
              </div>
            ))}
          </div>
        </div>
        <div className='right-section'>
          <AccountCircleIcon fontSize='medium'/>
          <div className='profile-details'>
            <div className='user-name'>User Name</div>
            <div className='user-caption'>
              <Link to='/profile' underline='none' color={"inherit"}>View Profile</Link>
            </div>
          </div>
        </div>
    </nav>
  )
}

export default Navbar