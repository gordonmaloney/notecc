import React, { useEffect, useRef, useState } from "react";
import logo from "../lr-ed-logo.png";
import { Link } from "react-router-dom";
import { PageList } from "../PageList";

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
              {PageList.map((page) => {
                return (
                  page.col == 1 && (
                    <li key={page.title}>
                      <Link
                        to={
                          page.path.includes("http")
                            ? page.path
                            : `../${page.path}`
                        }
                        target={page.path.includes("http") ? "_blank" : ""}
                        onClick={() => setOpen(false)}
                      >
                        {page.title}
                      </Link>
                    </li>
                  )
                );
              })}
            </ul>
            <ul>
              {PageList.map((page) => {
                return (
                  page.col == 2 && (
                    <li key={page.title}>
                      <Link
                        to={`../${page.path}`}
                        onClick={() => setOpen(false)}
                      >
                        {page.title}
                      </Link>
                    </li>
                  )
                );
              })}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
