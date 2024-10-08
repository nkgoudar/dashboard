import React, { useState } from "react";
import styles from "../styles/Header.module.css";
import Gif from "./Gif";
import Link from 'next/link';


const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const handleSearch = () => {
    if (searchValue.length > 2) {
      console.log("Enter key pressed!", searchValue);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className={styles.header} style={{width: "-webkit-fill-available"}}>
      {/* <div className={styles.logo}>
                <img src="/logo.png" alt="Company Logo" className={styles.logoImage} />
                <span className={styles.companyName}>Company Name</span>
            </div> */}
      <div className={styles.searchImg} onClick={handleSearch}>
        <img src="/search.svg" alt="search" />
      </div>
      <div>
        <input
          type="text"
          placeholder="Type to search here"
          className={styles.searchInput}
          value={searchValue}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setSearchValue(e.target.value)
          } // Type the change event
          onKeyDown={handleKeyDown} // Detect key down event
        />
      </div>
      {/* <div className={styles.menuToggle} onClick={toggleMenu}>
        <div className={`${styles.bar} ${isMenuOpen ? styles.change1 : ''}`}></div>
                <div className={`${styles.bar} ${isMenuOpen ? styles.change2 : ''}`}></div>
                <div className={`${styles.bar} ${isMenuOpen ? styles.change3 : ''}`}></div>
      </div> */}
      <div className={styles.profile}>
      <Link href="/profile">
        {/* <img src="/profile.gif" alt="" /> */}
        <Gif
        staticSrc="/profile.png"
        gifSrc="/profile.gif"
        gifDuration={1000}
        alt="Profile"
        />
      </Link>
      </div>
    </header>
  );
};

export default Header;
