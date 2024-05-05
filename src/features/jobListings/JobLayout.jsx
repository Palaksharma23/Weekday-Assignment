import React, { useState, useEffect, useMemo } from "react";
import CardItem from "./CardItem";
import Filter from "../../ui/Filter";
import "./../../styles/JobLayout.css";
import "./../../styles/Filter.css";
import { useSearchParams } from "react-router-dom";
import { getJobsData } from "../../services/fetchJobs";
import {
  generateFilterOptions,
  mergeFilterOptions,
} from "../../utils/filterUtils";

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

        const data = await getJobsData(page);
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
          const updatedFilterOptions = generateFilterOptions(options);
          setFilterOptions(updatedFilterOptions);
        } else {
          // Merging new options with existing ones in filterOptions
          const updatedFilterOptions = mergeFilterOptions(
            options,
            filterOptions
          );
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
