export async function getJobsData(page) {
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
  return data;
}
