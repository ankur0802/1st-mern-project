import React from 'react'
import icon from '../../icon.png'
import './Footer.css'

const Footer = () => {
  return (
    <footer id='footer' >
        <div className='leftfooter' >
            <h4>Download Our App</h4>
            <p>Download Our app for Android and IOS mobile phones</p>
            <img src={icon} alt="Download" />
        </div>

<div className="midfooter">
    <h1>ECOMMERCE.</h1>
    <p>High quality is our first priority</p>
    <p>Copyrights 2023 &copy; ankursingh </p>

</div>

<div className="rightfooter">
    <h4>Follow Us</h4>
    <a href="http://instagram.com">Instagram</a>
    <a href="http://instagram.com">Facebook</a>
    <a href="http://instagram.com">Twitter</a>

</div>

    </footer>
  )
}

export default Footer