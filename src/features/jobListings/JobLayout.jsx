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
  const [dataCompleted, setDataCompleted] = useState(false);
  const [totalCount, setTotalCount] = useState(null);

  const handleScroll = () => {
    const scrollThreshold = 100;
    const scrolledToBottom =
      window.innerHeight + window.pageYOffset >=
      document.body.offsetHeight - scrollThreshold;

    if (scrolledToBottom) {
      setPage((page) => page + 1);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        if (totalCount !== null && page * 10 > totalCount) {
          setIsLoading(false);
          setDataCompleted(true);
          return;
        }
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const body = JSON.stringify({
          limit: 10,
          offset: page * 10, // Adjusting offset based on page
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
        // Appending new jobs to existing jobs
        setJobs((prevJobs) => [...prevJobs, ...newJobs]);
        // Setting loading state to false
        setIsLoading(false);

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

        // Initializing filterOptions if it's empty
        if (filterOptions.length === 0) {
          const updatedFilterOptions = Object.keys(options).map((key) => {
            if (key === "minExp") {
              // Finding the maximum value in the minExp options
              const maxMinExp = Math.max(...Array.from(options[key]));
              // Generating an array from 1 to the maximum value
              const minExpOptions = Array.from(
                { length: maxMinExp + 1 },
                (_, index) => index
              );
              return {
                value: key,
                label: key.charAt(0).toUpperCase() + key.slice(1),
                options: minExpOptions.map((option) => ({
                  value: option,
                  label: option.toString(),
                })),
              };
            } else if (key === "minJdSalary") {
              // Finding the maximum value in the minJdSalary options
              const maxMinJdSalary = Math.floor(
                Math.max(...Array.from(options[key])) / 10
              );
              // Generating an array with steps of 10
              const minJdSalaryOptions = Array.from(
                { length: maxMinJdSalary + 1 },
                (_, index) => index * 10
              );
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

          // Adding static filter options as they don't exist initially
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
          // Merging new options with existing ones in filterOptions
          const updatedFilterOptions = filterOptions.map((filterOption) => {
            if (options[filterOption.value]) {
              // Converting the existing options to a set for easy filtering of duplicates
              const existingOptionsSet = new Set(
                filterOption.options.map((option) => option.value)
              );

              // Filtering out duplicates and converting them to objects with the required structure
              const uniqueOptions = Array.from(options[filterOption.value])
                .filter((option) => !existingOptionsSet.has(option))
                .map((option) => ({ value: option, label: option }));

              // If the filter option is "minExp", generating an array from 1 to the maximum value
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
              // If the filter option is "minJdSalary", generating an array with steps of 10
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

        // Updating totalCount using the response
        if (data.totalCount) {
          setTotalCount(data.totalCount);
        }
      } catch (error) {
        console.error(error);
        // Setting loading state to false in case of error
        setIsLoading(false);
      }
    };

    fetchData();
  }, [page, totalCount]); // Fetching data whenever page state changes

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

  const [searchParams] = useSearchParams(); // Accessing the URL search params

  const filteredJobs = useMemo(() => {
    const params = new URLSearchParams(location.search);
    const tempJobs = jobs.filter((job) => {
      let includeJob = true;
      filterOrder.forEach((filterField) => {
        if (filterField === "techStack") return;
        const filterValue = params.get(filterField);
        if (filterField === "type" && filterValue === "Remote") {
          if (job.location === "remote") {
            includeJob = includeJob & true;
            return;
          }
        } else if (filterField === "type" && filterValue === "Onsite") {
          return;
        }
        if (filterField === "minExp") {
          if (job.minExp && job.minExp >= +filterValue) {
            includeJob = includeJob & true;
            return;
          }
        }
        if (filterField === "minExp") {
          if (job.minExp && job.minExp >= +filterValue) {
            includeJob = includeJob & true;
            return;
          }
        }
        if (filterField === "minJdSalary") {
          if (job.minExp && job.minJdSalary >= +filterValue) {
            includeJob = includeJob & true;
            return;
          }
        }
        if (filterValue && job[filterField] !== filterValue) {
          includeJob = includeJob & false;
        }
      });
      return includeJob;
    });

    if (!tempJobs.length) {
      setPage((page) => page + 1);
    }

    return tempJobs;
  }, [jobs, searchParams]);

  return (
    <>
      <div className="filters">
        {filterOrder.map((filterField, index) => {
          const filter = filterOptions.find(
            (option) => option.value === filterField
          );
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
        {dataCompleted && filteredJobs.length !== 0 && (
          <div>Data Loaded Completely</div>
        )}
        {dataCompleted && filteredJobs.length === 0 && (
          <div>No Jobs available for this category at the moment</div>
        )}
      </div>
    </>
  );
}

export default JobLayout;
