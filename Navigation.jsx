import React, { useState, useEffect, useRef } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  FileText, 
  BarChart3, 
  FileDown, 
  Database,
  ChevronDown,
  Menu,
  X,
  Home,
  Layers,
  BookOpen
} from 'lucide-react';
import './Navigation.css';

const Navigation = () => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenDropdown(null);
      }
    };

    if (openDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [openDropdown]);

  const navItems = [
    { path: '/', icon: Home, label: 'Home' },
    { path: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { 
      type: 'dropdown',
      label: 'Risk Assessment',
      icon: Layers,
      items: [
        { path: '/assessments', label: 'VendorIQ' },
        { path: '/dashboard', label: 'Risk Radar' },
        { path: '/dashboard', label: 'Risk Calculator' }
      ]
    },
    { 
      type: 'dropdown',
      label: 'Vendor Management',
      icon: Users,
      items: [
        { path: '/vendors', label: 'Vendor Dashboard' }
      ]
    },
    { path: '/analytics', icon: BarChart3, label: 'Analytics' },
    { path: '/reports', icon: FileDown, label: 'Reports' },
    { 
      type: 'dropdown',
      label: 'Resources',
      icon: BookOpen,
      items: [
        { path: '/dashboard', label: 'How It Works' },
        { path: '/dashboard', label: 'Templates' },
        { path: '/dashboard', label: 'API Docs' },
        { path: '/dashboard', label: 'Integration Guides' },
        { path: '/dashboard', label: 'About' },
        { path: '/dashboard', label: 'Contact' }
      ]
    },
    { path: '/data', icon: Database, label: 'Data' }
  ];

  const isActiveLink = (path) => {
    return location.pathname === path;
  };

  const isDropdownActive = (items) => {
    return items.some(item => location.pathname === item.path);
  };

  const toggleDropdown = (label, e) => {
    if (e) {
      e.stopPropagation();
    }
    setOpenDropdown(openDropdown === label ? null : label);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    setOpenDropdown(null);
  };

  return (
    <nav className="app-nav">
      <div className="container">
        <div className="nav-content">
          {/* Desktop Navigation */}
          <div className="nav-desktop">
            {navItems.map((item, index) => {
              if (item.type === 'dropdown') {
                const isActive = isDropdownActive(item.items);
                return (
                  <div key={index} className="nav-dropdown-wrapper" ref={openDropdown === item.label ? dropdownRef : null}>
                    <button
                      className={`nav-dropdown-toggle ${isActive ? 'active' : ''}`}
                      onClick={(e) => toggleDropdown(item.label, e)}
                      type="button"
                    >
                      <item.icon size={18} />
                      <span>{item.label}</span>
                      <ChevronDown size={16} className={`nav-dropdown-arrow ${openDropdown === item.label ? 'open' : ''}`} />
                    </button>
                    {openDropdown === item.label && (
                      <div className="nav-dropdown-menu" onClick={(e) => e.stopPropagation()}>
                        {item.items.map((subItem, subIndex) => (
                          <NavLink
                            key={subIndex}
                            to={subItem.path}
                            className={({ isActive }) => `nav-dropdown-item ${isActive ? 'active' : ''}`}
                            onClick={(e) => {
                              setOpenDropdown(null);
                              // Ensure navigation happens even if something tries to prevent it
                              if (e.defaultPrevented) {
                                window.location.href = subItem.path;
                              }
                            }}
                          >
                            {subItem.label}
                          </NavLink>
                        ))}
                      </div>
                    )}
                  </div>
                );
              } else {
                return (
                  <NavLink
                    key={index}
                    to={item.path}
                    className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                  >
                    <item.icon size={18} />
                    <span>{item.label}</span>
                  </NavLink>
                );
              }
            })}
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="nav-mobile-toggle"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="nav-mobile">
            {navItems.map((item, index) => {
              if (item.type === 'dropdown') {
                const isActive = isDropdownActive(item.items);
                return (
                  <div key={index} className="nav-mobile-dropdown">
                    <button
                      className={`nav-mobile-dropdown-toggle ${isActive ? 'active' : ''}`}
                      onClick={(e) => toggleDropdown(item.label, e)}
                      type="button"
                    >
                      <item.icon size={18} />
                      <span>{item.label}</span>
                      <ChevronDown size={16} className={`nav-dropdown-arrow ${openDropdown === item.label ? 'open' : ''}`} />
                    </button>
                    {openDropdown === item.label && (
                      <div className="nav-mobile-dropdown-menu" onClick={(e) => e.stopPropagation()}>
                        {item.items.map((subItem, subIndex) => (
                          <NavLink
                            key={subIndex}
                            to={subItem.path}
                            className={({ isActive }) => `nav-mobile-dropdown-item ${isActive ? 'active' : ''}`}
                            onClick={(e) => {
                              closeMobileMenu();
                              // Ensure navigation happens even if something tries to prevent it
                              if (e.defaultPrevented) {
                                window.location.href = subItem.path;
                              }
                            }}
                          >
                            {subItem.label}
                          </NavLink>
                        ))}
                      </div>
                    )}
                  </div>
                );
              } else {
                return (
                  <NavLink
                    key={index}
                    to={item.path}
                    className={({ isActive }) => `nav-mobile-link ${isActive ? 'active' : ''}`}
                    onClick={closeMobileMenu}
                  >
                    <item.icon size={18} />
                    <span>{item.label}</span>
                  </NavLink>
                );
              }
            })}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
