import React from "react";
import { NavLink } from "react-router-dom";
import "./../styles/Header.css";

function HeaderComp({ jobCount }) {
  return (
    <>
      <nav>
        <ul className="header-container">
          <li className="header-list">
            <NavLink to="/applied-jobs">Applied jobs</NavLink>
          </li>
          <li className="header-list">
            <NavLink to="/search-jobs">Search jobs</NavLink>
            {jobCount > 0 && (
              <>
                <div className="job-count-indicator">
                  <span>{jobCount}</span>
                </div>
              </>
            )}
          </li>
        </ul>
      </nav>
    </>
  );
}

export default HeaderComp;
