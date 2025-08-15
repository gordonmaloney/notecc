import React, { useEffect, useRef, useState } from "react";
import logo from "../lr-ed-logo.png";
import { Link } from "react-router-dom";

const Header = () => {
  const [open, setOpen] = useState(false);
  const panelRef = useRef(null);
  const btnRef = useRef(null);

  // close on ESC or click outside
  useEffect(() => {
    function onKey(e) {
      if (e.key === "Escape") setOpen(false);
    }
    function onClick(e) {
      if (!panelRef.current) return;
      if (
        !panelRef.current.contains(e.target) &&
        !btnRef.current.contains(e.target)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, []);

  return (
    <>
      <header className="header">
        <Link to="../">
          <img
            src={logo}
            alt="Not the City of Edinburgh Council"
            className="logo"
          />
        </Link>

        <button
          ref={btnRef}
          className={`menu-toggle ${open ? "open" : ""}`}
          aria-expanded={open}
          aria-controls="site-mega"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="icon" aria-hidden="true" />
          <span className="label">{open ? "CLOSE" : "MENU"}</span>
        </button>
      </header>

      {/* Mega panel */}
      <nav
        id="site-mega"
        className={`mega ${open ? "show" : ""}`}
        aria-hidden={!open}
        ref={panelRef}
      >
        <div className="mega-inner">
          <h2 className="mega-title">Tenant Complaints Portal</h2>
          <div className="cols">
            <ul>
              <li>
                <Link to="../repairs" onClick={() => setOpen(false)}>
                  Get help with repairs
                </Link>
              </li>
              <li>
                <Link to="../report" onClick={() => setOpen(false)}>
                  Report your landlord
                </Link>
              </li>
              <li>
                <a
                  href="https://www.livingrent.org/join"
                  target="_blank"
                  onClick={() => setOpen(false)}
                >
                  Join Living Rent
                </a>
              </li>
            </ul>
            <ul>
              <li>
                <Link to="../tolerable" onClick={() => setOpen(false)}>
                  The Tolerable Standard
                </Link>
              </li>
              <li>
                <Link to="../fpp" onClick={() => setOpen(false)}>
                  The 'Fit and Proper Person' Test
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
