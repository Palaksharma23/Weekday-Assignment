export function generateFilterOptions(options) {
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

  return updatedFilterOptions;
}

export function mergeFilterOptions(options, filterOptions) {
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
        const maxMinExp = Math.max(...Array.from(options[filterOption.value]));
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

  return updatedFilterOptions;
}
