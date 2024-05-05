import React, { useState, useEffect, useMemo } from "react";
import CardItem from "./CardItem";
import Filter from "../../ui/Filter";
import "./../../styles/JobLayout.css";
import "./../../styles/Filter.css";
import { useSearchParams } from "react-router-dom";

function JobLayout() {
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [filterOptions, setFilterOptions] = useState([]);
  const [totalCount, setTotalCount] = useState(null); // New state for totalCount

  const handleScroll = () => {
    const scrollThreshold = 100; // Adjust as needed
    const scrolledToBottom =
      window.innerHeight + window.pageYOffset >=
      document.body.offsetHeight - scrollThreshold;

    if (scrolledToBottom) {
      console.log("Reached bottom of page");
      setPage((page) => page + 1);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (totalCount !== null && page * 10 > totalCount) {
          console.log("Data Completed");
          return;
        }
        console.log("running....");
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const body = JSON.stringify({
          limit: 10,
          offset: page * 10, // Adjust offset based on page
        });

        const requestOptions = {
          method: "POST",
          headers: myHeaders,
          body,
        };

        const response = await fetch(
          "https://api.weekday.technology/adhoc/getSampleJdJSON",
          requestOptions
        );
        if (!response.ok) {
          throw new Error("Failed to fetch jobs");
        }

        const data = await response.json();
        const newJobs = data.jdList;
        console.log("hi", newJobs);
        setJobs((prevJobs) => [...prevJobs, ...newJobs]); // Append new jobs to existing jobs
        setIsLoading(false); // Set loading state to false

        // Extract unique filter options from the data
        const options = {};
        newJobs.forEach((job) => {
          Object.keys(job).forEach((key) => {
            if (
              key !== "jdUid" &&
              key !== "jdLink" &&
              key !== "logoUrl" &&
              key !== "jobDetailsFromCompany" &&
              key !== "salaryCurrencyCode" &&
              key !== "maxJdSalary" &&
              key !== "maxExp"
            ) {
              if (!options[key]) {
                options[key] = new Set();
              }
              if (job[key]) options[key].add(job[key]);
            }
          });
        });

        // Initialize filterOptions if it's empty
        if (filterOptions.length === 0) {
          const updatedFilterOptions = Object.keys(options).map((key) => {
            if (key === "minExp") {
              // Find the maximum value in the minExp options
              const maxMinExp = Math.max(...Array.from(options[key]));
              // Generate an array from 1 to the maximum value
              const minExpOptions = Array.from(
                { length: maxMinExp + 1 },
                (_, index) => index
              );
              // Create the filter option for minExp with the sorted array
              return {
                value: key,
                label: key.charAt(0).toUpperCase() + key.slice(1),
                options: minExpOptions.map((option) => ({
                  value: option,
                  label: option.toString(),
                })),
              };
            } else if (key === "minJdSalary") {
              // Find the maximum value in the minJdSalary options
              const maxMinJdSalary = Math.floor(
                Math.max(...Array.from(options[key])) / 10
              );
              // Generate an array with steps of 10
              const minJdSalaryOptions = Array.from(
                { length: maxMinJdSalary + 1 },
                (_, index) => index * 10
              );
              // Create the filter option for minJdSalary with the sorted array
              return {
                value: key,
                label: key.charAt(0).toUpperCase() + key.slice(1),
                options: minJdSalaryOptions.map((option) => ({
                  value: option,
                  label: option.toString(),
                })),
              };
            } else {
              return {
                value: key,
                label: key.charAt(0).toUpperCase() + key.slice(1),
                options: Array.from(options[key]).map((option) => ({
                  value: option,
                  label: option,
                })),
              };
            }
          });

          // Add static filter options if they don't exist
          updatedFilterOptions.push({
            value: "type",
            label: "Type",
            options: ["Remote", "Onsite"].map((option) => ({
              value: option,
              label: option,
            })),
          });
          updatedFilterOptions.push({
            value: "techStack",
            label: "Tech Stack",
            options: ["React", "Vue", "Angular"].map((option) => ({
              value: option,
              label: option,
            })),
          });

          setFilterOptions(updatedFilterOptions);
        } else {
          // Merge new options with existing ones in filterOptions
          const updatedFilterOptions = filterOptions.map((filterOption) => {
            if (options[filterOption.value]) {
              // Convert the existing options to a set for easy filtering of duplicates
              const existingOptionsSet = new Set(
                filterOption.options.map((option) => option.value)
              );

              // Filter out duplicates and convert them to objects with the required structure
              const uniqueOptions = Array.from(options[filterOption.value])
                .filter((option) => !existingOptionsSet.has(option))
                .map((option) => ({ value: option, label: option }));

              // If the filter option is "minExp", generate an array from 1 to the maximum value
              if (filterOption.value === "minExp") {
                const maxMinExp = Math.max(
                  ...Array.from(options[filterOption.value])
                );
                const minExpOptions = Array.from(
                  { length: maxMinExp + 1 },
                  (_, index) => index
                );
                return {
                  ...filterOption,
                  options: minExpOptions.map((option) => ({
                    value: option,
                    label: option.toString(),
                  })),
                };
              }
              // If the filter option is "minJdSalary", generate an array with steps of 10
              else if (filterOption.value === "minJdSalary") {
                const maxMinJdSalary = Math.floor(
                  Math.max(...Array.from(options[filterOption.value])) / 10
                );
                const minJdSalaryOptions = Array.from(
                  { length: maxMinJdSalary + 1 },
                  (_, index) => index * 10
                );
                return {
                  ...filterOption,
                  options: minJdSalaryOptions.map((option) => ({
                    value: option,
                    label: option.toString(),
                  })),
                };
              }

              return {
                ...filterOption,
                options: [...filterOption.options, ...uniqueOptions],
              };
            }
            return filterOption;
          });

          setFilterOptions(updatedFilterOptions);
        }

        // Update totalCount if available in the response
        if (data.totalCount) {
          setTotalCount(data.totalCount);
        }
      } catch (error) {
        console.error(error);
        setIsLoading(false); // Set loading state to false in case of error
      }
    };

    fetchData();
  }, [page, totalCount]); // Fetch data whenever page state changes

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Array to define the order of filters
  const filterOrder = [
    "minExp",
    "companyName",
    "location",
    "type",
    "techStack",
    "jobRole",
    "minJdSalary",
  ];

  const [searchParams] = useSearchParams(); // Access URL search params

  const filteredJobs = useMemo(() => {
    const params = new URLSearchParams(location.search);
    const tempJobs = jobs.filter((job) => {
      let includeJob = true;
      filterOrder.forEach((filterField) => {
        const filterValue = params.get(filterField);
        if (filterValue && job[filterField] !== filterValue) {
          includeJob = false;
        }
      });
      return includeJob;
    });

    if (!tempJobs.length) {
      setPage((page) => page + 1);
    }

    return tempJobs;
  }, [jobs, searchParams]);

  console.log("pi", filterOptions);
  return (
    <>
      <div className="filter-container">
        {filterOrder.map((filterField, index) => {
          const filter = filterOptions.find(
            (option) => option.value === filterField
          );
          console.log("filter", filter);
          return filter ? (
            <Filter
              key={index}
              filterField={filter.value}
              options={filter.options}
            />
          ) : null;
        })}
      </div>
      <div className="jobs-container">
        {filteredJobs.map((job, index) => (
          <CardItem key={index} job={job} />
        ))}
        {isLoading && <div>Loading...</div>}
      </div>
    </>
  );
}

export default JobLayout;
