import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import "./../styles/Filter.css"; // Import CSS file for styling

function Filter({ filterField, options }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isOpen, setIsOpen] = useState(false); // State to manage dropdown visibility
  const [searchTerm, setSearchTerm] = useState(""); // State to manage search term
  const currentFilter = searchParams.get(filterField) || options?.[0]?.value;

  // Function to handle option selection
  const handleOptionSelect = (value) => {
    searchParams.set(filterField, value);
    if (searchParams.get("page")) searchParams.set("page", 1);
    setSearchParams(searchParams);
    setIsOpen(false); // Close the dropdown after selection
  };

  // Function to handle input change (search)
  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
    setIsOpen(true); // Open dropdown when typing
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
      <div className={`select-wrapper ${isOpen ? "open" : ""}`}>
        <input
          type="text"
          value={searchTerm}
          onChange={handleInputChange}
          onClick={() => setIsOpen(true)}
          placeholder={`${placeholder(filterField)}`}
        />
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
