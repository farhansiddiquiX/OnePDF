import React from 'react'
import './Header.css'
import { FiUser } from 'react-icons/fi'
const Header = () => {
  return (
    <>
      <nav className='nav'>
        <img src='/images/logo.png' />
        <a href='#contact' className='contact'>Contact</a>
      </nav>
    </>
  )
}

export default Header
