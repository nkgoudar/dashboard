import React, { useState, useEffect } from "react";
import styles from "../styles/Navbar.module.css";
import { useRouter } from "next/router";

const menuItems = [
  { name: "Dashboard", path: "/dashboard" },
  { name: "Products", path: "/products" },
  { name: "Users", path: "/users" },
  { name: "Profile", path: "/profile" },
  {
    name: "Settings",
    path: "/settings",
    submenu: [
      { name: "Profile", path: "/settings/profile" },
      { name: "Account", path: "/settings/account" },
    ],
  },
];

const Navbar: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleItemClick = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const handleNavigation = (path: string) => {
    router.push(path);
    setIsMenuOpen(false); // Close the menu after navigation
  };

  useEffect(() => {
    // Check the current route on mount
    const currentPath = router.pathname;

    // Find if any submenu matches the current path
    menuItems.forEach((item, index) => {
        if (item.submenu) {
            const isSubmenuActive = item.submenu.some(subItem => subItem.path === currentPath);
            if (isSubmenuActive) {
                setActiveIndex(index); // Set the active index to expand the corresponding menu
            }
        }
    });
}, [router.pathname]); // Run this effect when the pathname changes

  return (
    <>
      <div className={`${styles.navbar} ${isMenuOpen ? styles.active : ""}`}>
        <div className={styles.header} onClick={() => handleNavigation("/dashboard")}>
          <img src="/logo.jpeg" alt="E-Com DYI" className={styles.logo} />
          <h1 className={styles.companyName}>E-Com DYI</h1>
        </div>
        <ul className={styles.menuList}>
          {menuItems.map((item, index) => (
            <li key={index}>
              {
                <div
                  className={`${styles.menuItem} ${
                    router.pathname === item.path ? styles.active : ""
                  }`}
                  onClick={() => {
                    if (item.submenu) {
                      handleItemClick(index);
                    } else {
                        handleNavigation(item.path)
                    }
                  }}>
                    {/* {item.submenu ? item.name : (<Link href={item.path} />)} */}
                    {item.name}
                </div>
              }
              {item.submenu && activeIndex === index && (
                <ul className={styles.submenuList}>
                  {item.submenu.map((subItem, subIndex) => (
                    <li key={subIndex}>
                      <div
                        className={`${styles.submenuItem} ${
                          router.pathname === subItem.path ? styles.active : ""
                        }`}
                        onClick={() => handleNavigation(subItem.path)}>
                        {subItem.name}
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </div>
      <div className={styles.menuToggle} onClick={toggleMenu}>
        <div
          className={`${styles.bar} ${isMenuOpen ? styles.change1 : ""}`}></div>
        <div
          className={`${styles.bar} ${isMenuOpen ? styles.change2 : ""}`}></div>
        <div
          className={`${styles.bar} ${isMenuOpen ? styles.change3 : ""}`}></div>
      </div>
    </>
  );
};

export default Navbar;
