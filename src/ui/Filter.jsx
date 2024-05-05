import React, { useEffect, useState, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import "./../styles/Filter.css";

function Filter({ filterField, options }) {
  const [searchParams, setSearchParams] = useSearchParams();
  // State to manage dropdown visibility
  const [isOpen, setIsOpen] = useState(false);
  // State to manage search term
  const [searchTerm, setSearchTerm] = useState("");
  const currentFilter = searchParams.get(filterField) || options?.[0]?.value;
  // Ref for dropdown container
  const dropdownRef = useRef(null);

  useEffect(() => {
    if (searchParams.get(filterField)) {
      setSearchTerm(searchParams.get(filterField));
    } else {
      setSearchTerm("");
    }
  }, [searchParams]);

  useEffect(() => {
    // Function to close dropdown when clicking outside of it
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  // Function to handle option selection
  const handleOptionSelect = (value) => {
    setSearchTerm(String(value));
    setSearchParams(searchParams);
    setIsOpen(false); // Close the dropdown after selection
    searchParams.set(filterField, value);
    if (searchParams.get("page")) searchParams.set("page", 1);
    setSearchParams(searchParams);
  };

  // Function to handle input change (search)
  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
    setIsOpen(true); // Open dropdown when typing
  };

  // Toggle dropdown visibility
  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  // Filter options based on search term
  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const placeholder = (filterField) => {
    const mapFilterField = {
      minExp: "min Experience",
      type: "Type",
      companyName: "Company Name",
      location: "Location",
      techStack: "Tech Stack",
      jobRole: "Job Role",
      minJdSalary: "Min Salary",
    };
    return mapFilterField[filterField];
  };

  return (
    <div className="filter-container">
      <div
        className={`select-wrapper ${isOpen ? "open" : ""}`}
        ref={dropdownRef}
      >
        {searchTerm && (
          <span className="placeholder">{placeholder(filterField)}</span>
        )}
        <input
          type="text"
          value={searchTerm}
          onChange={handleInputChange}
          onClick={() => setIsOpen(true)}
          placeholder={`${placeholder(filterField)}`}
        />
        {searchTerm && (
          <div
            className="clear-input"
            onClick={() => {
              setSearchTerm(""); // Clearing the search term
              searchParams.delete(filterField); // Removing the parameter from the URL
              setSearchParams(searchParams);
            }}
          >
            &#10005;
          </div>
        )}
        <div className="arrow-down" onClick={toggleDropdown}></div>{" "}
        <div className="divider"></div>
        {isOpen && (
          <ul className="options-list">
            {filteredOptions.map((option) => (
              <li
                key={option.value}
                onClick={() => handleOptionSelect(option.value)}
              >
                {option.label}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default Filter;
