import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import '@fortawesome/fontawesome-free/css/all.min.css';

// import { useCart } from "../Components/contextapi/contex";
import dd from "../images/newimages.png";
import { useCart } from "../Components/contextapi/contex";
import "../navbar/navbars.css";

export default function Nav() {
  const [image, setImage] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { count } = useCart();
  useEffect(() => {
    const token = localStorage.getItem("token");
    const auth = Cookies.get("auth");

    if (auth && token) {
      setIsAuthenticated(true);
    }
  }, []);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get("http://localhost:5000/user_details");
        setImage(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    if (isAuthenticated) {
      fetchImages();
    }
  }, [isAuthenticated]);

  return (
    <nav>
      <div className="wrapper">
        <div className="logo"><Link to='/'><a className>NLSF</a></Link></div>
        <input type="radio" name="slider" id="menu-btn" />
        <input type="radio" name="slider" id="close-btn" />
        <ul className="nav-links">
          <label htmlFor="close-btn" className="btn close-btn"><i className="fas fa-times"></i></label>



          <li>
            <a className="desktop-item">SOFAS</a>
            <input type="checkbox" id="showMega" />
            <label htmlFor="showMega" className="mobile-item">SOFAS</label>
            <div className="mega-box">
              <div className="content">
                <div className="row">
                  <img src="https://www.furniturehub.com.np/_next/image?url=https%3A%2F%2Fbackend.furniturehub.com.np%2Fuploads%2Fcategory%2Fsofa_menu.jpg&w=1200&q=75" alt="" />
                </div>
                <div className="row">
                  <header>SECTIONAL SOFAS</header>
                  <ul className="mega-links">
                    <li><a className>Bed Design Sofa</a></li>
                    <li><Link to='/sofas'><a className>L Shaped Sofas</a></Link></li>
                    <li><a className>2 Seater Sofas</a></li>
                    <li><a className>3 Seater Sofas</a></li>
                    <li><a className>3+2 Sofa Sets</a></li>
                    <li><a className>2+2+1 Sofa</a></li>
                    <li><a className>2+2 Sofa</a></li>
                  </ul>
                </div>
                <div className="row">
                  <header>SOFA SETS</header>
                  <ul className="mega-links">
                    <li><a className>Diwan Sofa</a></li>
                    <li><a className>Outdoor Sofas</a></li>
                    <li><a className>Office Sofas</a></li>
                    <li><a className>Rexine Sofas</a></li>
                    <li><a className>Chesterfield Sofas</a></li>
                    <li><a className>Wooden Sofas</a></li>
                    <li><a className>Fabric Sofas</a></li>
                  </ul>
                </div>
                <div className="row">
                  <header>CARVED SOFA</header>
                  <ul className="mega-links">
                    <li><a className>Carved Diwan Sofa</a></li>
                    <li><a className>Single Carved Sofa</a></li>
                    <li><a className>Royal Carved Sofa</a></li>
                    <li><a className>Carved Sofa Sets</a></li>
                  </ul>
                </div>
              </div>
            </div>
          </li>

          <li>
            <a className="desktop-item">MATTRESS</a>
            <input type="checkbox" id="showMega" />
            <label htmlFor="showMega" className="mobile-item">SOFAS</label>
            <div className="mega-box">
              <div className="content">
                <div className="row">
                  <img src="https://www.furniturehub.com.np/_next/image?url=https%3A%2F%2Fbackend.furniturehub.com.np%2Fuploads%2Fcategory%2Fmattress_IrRmELi.jpg&w=1200&q=75" alt="" />
                </div>
                <div className="row">
                  <header>KING KOIL MATTRESS</header>
                  <ul className="mega-links">
                    <li><a className>World Luxury</a></li>
                    <li><a className>Ortho</a></li>
                    <li><a className>Chiropedic</a></li>
                    <li><a className>Gravity</a></li>
                  </ul>
                </div>
                <div className="row">
                  <header>KING KOIL MATTRESS</header>
                  <ul className="mega-links">
                    <li><a className>Signature</a></li>
                    <li><a className>Physio Pedic</a></li>
                    <li><a className>Naturalle 1.0</a></li>
                    <li><a className>Revital</a></li>
                  </ul>
                </div>
                <div className="row">
                  <header>SLEEPWELL MATTRESS</header>
                  <ul className="mega-links">
                    <li><a className>Spine Tech Luxury</a></li>
                    <li><a className>Spine Tech Air</a></li>
                    <li><a className>Ultra Eurotop</a></li>
                    <li><a className>Durafirm</a></li>
                  </ul>
                </div>
              </div>
            </div>
          </li>
          <li>
            <a className="desktop-item">BEDROOM</a>
            <input type="checkbox" id="showMega" />
            <label htmlFor="showMega" className="mobile-item">BEDROOM</label>
            <div className="mega-box">
              <div className="content">
                <div className="row">
                  <img src="https://www.furniturehub.com.np/_next/image?url=https%3A%2F%2Fbackend.furniturehub.com.np%2Fuploads%2Fcategory%2Fbedroom_menu.jpg&w=1200&q=75" alt="" />
                </div>
                <div className="row">
                  <header>BEDS</header>
                  <ul className="mega-links">
                    <li><a className>Carved Royal Bed</a></li>
                    <li><a className>Hydraulic Storage Beds</a></li>
                    <li><a className>Single Beds</a></li>
                    <li><a className>Queen Size Beds</a></li>
                    <li><a className>King Size Beds</a></li>
                    <li><a className>Dressing Table</a></li>
                  </ul>
                </div>
                <div className="row">
                  <header>COMBO SETS</header>
                  <ul className="mega-links">
                    <li><a className>Below 150 thousand</a></li>
                    <li><a className>Below 1 lakh</a></li>
                    <li><a className>Below 80 thousand</a></li>
                    <li><a className>Below 50 thousand</a></li>
                    <li><a className>Tea Tables</a></li>
                    <li><a className>Beside Tables</a></li>
                  </ul>
                </div>
                <div className="row">
                  <header>STORAGE</header>
                  <ul className="mega-links">
                    <li><a className>Bookshelves</a></li>
                    <li><a className>Cabinets & Sideboards</a></li>
                    <li><a className>TV units</a></li>
                    <li><a className>Cupboards</a></li>
                    <li><a className>Wardrobes</a></li>
                   

                   
                
                


                  </ul>
                </div>



              </div>
            </div>
          </li>
          <li>
            <a className="desktop-item">DINING AND KITCHEN</a>
            <input type="checkbox" id="showMega" />
            <label htmlFor="showMega" className="mobile-item">DINING AND KITCHEN</label>
            <div className="mega-box">
              <div className="content">
                <div className="row">
                  <img src="https://www.furniturehub.com.np/_next/image?url=https%3A%2F%2Fbackend.furniturehub.com.np%2Fuploads%2Fcategory%2Fkitchen_and_dining_zTHJF0q.jpg&w=1200&q=75" alt="" />
                </div>
                <div className="row">
                  <header>DINING FURNITURE</header>
                  <ul className="mega-links">
                    <li><a className>Dining Sets</a></li>
                    <li><a className>2 Seater Dining Sets</a></li>
                    <li><a className>4 Seater Dining Sets</a></li>
                    <li><a className>6 Seater Dining Sets</a></li>
                    <li><a className>8 Seater Dining Sets</a></li>
                    <li><a className>Dining Tables</a></li>
                    <li><a className>Dining Chairs</a></li>
                  </ul>
                </div>
                <div className="row">
                  <header>KITCHEN FURNITURE</header>
                  <ul className="mega-links">
                    <li><a className>Cabinets & Sideboards</a></li>
                    <li><a className>Kitchen Cabinets</a></li>
                    <li><a className>Kitchen Island</a></li>
                    <li><a className>Kitchen Racks</a></li>
                    <li><a className>Kitchen Shelves</a></li>
                  </ul>
                </div>
                <div className="row">
                  <header>MODULAR KITCHEN</header>
                  <ul className="mega-links">
                    <li><a className>L Shape Modular Kitchen</a></li>
                    <li><a className>U Shape Modular Kitchen</a></li>
                    <li><a className>Parallel Shape Modular Kitchen</a></li>
                    <li><a className>Straight Shape Modular Kitchen</a></li>
                  </ul>
                </div>
              </div>
            </div>
          </li>
          <li>
            <a className="desktop-item">LIVING</a>
            <input type="checkbox" id="showMega" />
            <label htmlFor="showMega" className="mobile-item">LIVING</label>
            <div className="mega-box">
              <div className="content">
                <div className="row">
                  <img src="https://www.furniturehub.com.np/_next/image?url=https%3A%2F%2Fbackend.furniturehub.com.np%2Fuploads%2Fcategory%2Ffurnishing_8NQWGTu.jpg&w=1200&q=75" alt="" />
                </div>
                <div className="row">
                  <header>TABLES</header>
                  <ul className="mega-links">
                    <li><a className>Table</a></li>
                    <li><a className>Tea/Coffee Tables</a></li>
                    <li><a className>Side & End Tables</a></li>
                    <li><a className>Console Table</a></li>
                    <li><a className>Laptop Tables</a></li>
                  </ul>
                </div>
                <div className="row">
                  <header>LIVING STORAGE</header>
                  <ul className="mega-links">
                    <li><a className>Wall Shelves</a></li>
                    <li><a className>Magazine Racks</a></li>
                    <li><a className>Cabinet & Sideboard</a></li>
                    <li><a className>Chest drawers</a></li>
                    <li><a className>Religious Units</a></li>
                    <li><a className>Carved Mirror</a></li>
                    <li><a className>Table Runners</a></li>
                  </ul>
                </div>
                <div className="row">
                  <header>SEATING & CHAIRS</header>
                  <ul className="mega-links">
                    <li><a className>Lounge Chairs</a></li>
                    <li><a className>Wing Chairs</a></li>
                    <li><a className>Rocking Chairs</a></li>
                    <li><a className>Arm Chairs</a></li>
                    <li><a className>Metal Chairs</a></li>
                    <li><a className>Office Chairs</a></li>
                    <li><a className>Ottomans & Pouffes</a></li>
                    <li><a className>Tools</a></li>
                  </ul>
                </div>
              </div>
            </div>
          </li>
          <li>
            <a className="desktop-item">STUDY AND OFFICE</a>
            <input type="checkbox" id="showMega" />
            <label htmlFor="showMega" className="mobile-item">STUDY AND OFFICE</label>
            <div className="mega-box">
              <div className="content">
                <div className="row">
                  <img src="https://www.furniturehub.com.np/_next/image?url=https%3A%2F%2Fbackend.furniturehub.com.np%2Fuploads%2Fcategory%2Fstudy__office_bZnq1Ps.jpg&w=1200&q=75" alt="" />
                </div>
                <div className="row">
                  <header>STORAGE</header>
                  <ul className="mega-links">
                    <li><a className>Bookshelves</a></li>
                    <li><a className>Wall Shelves</a></li>
                    <li><a className>Magazine Racks</a></li>
                    <li><a className>File Cabinets</a></li>
                    <li><a className>Shoe Racks</a></li>
                  </ul>
                </div>
                <div className="row">
                  <header>TABLES</header>
                  <ul className="mega-links">
                    <li><a className>Portable Table</a></li>
                    <li><a className>Wall Mounted Table</a></li>
                    <li><a className>Corner Study Table</a></li>
                    <li><a className>Executive Tables</a></li>
                    <li><a className>Computer Tables</a></li>
                    <li><a className>Study Tables</a></li>
                  </ul>
                </div>
                <div className="row">
                  <header>OFFICE FURNITURE</header>
                  <ul className="mega-links">
                    <li><a className>Executive Tables</a></li>
                    <li><a className>Office Sofas</a></li>
                    <li><a className>Office Chairs</a></li>
                    <li><a className>Office Tables</a></li>
                    <li><a className>Work Stations</a></li>
                  </ul>
                </div>
              </div>
            </div>
          </li>
          <li>
            <a className="desktop-item">OUTDOOR</a>
            <input type="checkbox" id="showMega" />
            <label htmlFor="showMega" className="mobile-item">OUTDOOR</label>
            <div className="mega-box">
              <div className="content">
                <div className="row">
                  <img src="https://www.furniturehub.com.np/_next/image?url=https%3A%2F%2Fbackend.furniturehub.com.np%2Fuploads%2Fcategory%2FOUTDOOR.jpg&w=1200&q=75" alt="" />
                </div>
                <div className="row">
                  <header>GARDEN FURNITURE</header>
                  <ul className="mega-links">
                    <li><a className>Garden Swing</a></li>
                    <li><a className>Garden Sets</a></li>
                    <li><a className>Garden Table</a></li>
                    <li><a className>Garden Chair</a></li>
                  </ul>
                </div>
                <div className="row">
                  <header>OUTDOOR ITEMS</header>
                  <ul className="mega-links">
                    <li><a className>Outdoor Decor</a></li>
                    <li><a className>Outdoor Sofas</a></li>
                    <li><a className>Outdoor Swing</a></li>
                    <li><a className>Pet Houses</a></li>
                  </ul>
                </div>
                <div className="row">
                  <header>BALCONY FURNITURE</header>
                  <ul className="mega-links">
                    <li><a className>Balcony Swings</a></li>
                    <li><a className>Balcony Sets</a></li>
                    <li><a className>Balcony Sets</a></li>
                    <li><a className>Balcony Chairs</a></li>
                  </ul>
                </div>
              </div>
            </div>
          </li>

          <li>
            <a href="#" class="desktop-item">User Account</a>
            <input type="checkbox" id="showDrop" />
            <label for="showDrop" class="mobile-item">User Account</label>
            <ul class="drop-menu">
              <li><Link to='login'><a >Login</a></Link></li>
              <li> <Link to='register'><a >Sign up</a></Link></li>
              <li><Link to='/Userprofile'><a >Your profile</a></Link></li>
              <li> <Link to='/userorderproducts'><a >My orders      </a></Link></li>
            </ul>
          </li>
          <Link to='/cart'><li><svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-bag" viewBox="0 0 16 16" id="carts">
            <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1m3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1z" />
          </svg></li></Link>
          <p className="increase_couting">{count}</p>




        </ul>
        <label htmlFor="menu-btn" className="btn menu-btn"><i className="fas fa-bars"></i></label>
      </div>
    </nav>
  );
}
