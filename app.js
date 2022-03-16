// from data.js
const tableData = data;

// get table references
var tbody = d3.select("tbody");

function buildTable(data) {
  // First, clear out any existing data
  tbody.html("");

  // Next, loop through each object in the data
  // and append a row and cells for each value in the row
  data.forEach((dataRow) => {
    // Append a row to the table body
    let row = tbody.append("tr");

    // Loop through each field in the dataRow and add
    // each value as a table cell (td)
    Object.values(dataRow).forEach((val) => {
      let cell = row.append("td");
      cell.text(val);
    });
  });
}

// 1. Create a variable to keep track of all the filters as an object.
var filters = new Map();

// 3. Use this function to update the filters. 
function updateFilters() {

    // 4b. Save the value that was changed as a variable.
    let date = d3.select("#datetime").property("value");
    let city = d3.select("#city").property("value");
    let state = d3.select("#state").property("value");
    let country = d3.select("#country").property("value");
    let shape = d3.select("#shape").property("value");
    // 4c. Save the id of the filter that was changed as a variable.
    if (date) {
      filters.set('date',date);
    } else {
      filters.set('date','');
    }

    if (city) {
      filters.set('city',city);
    } else {
      filters.set('city','');
    }

    if (state) {
      filters.set('state',state);
    } else {
      filters.set('state','');
    }

    if (country) {
      filters.set('country',country);
    } else {
      filters.set('country','');
    }

    if (shape) {
      filters.set('shape',shape);
    } else {
      filters.set('shape','');
    }
  
    // 6. Call function to apply all filters and rebuild the table
    filterTable();
}


  
  // 7. Use this function to filter the table when data is entered.
  function filterTable(){
    let date = filters.get('date');
    let city = filters.get('city');
    let state = filters.get('state');
    let country = filters.get('country');
    let shape = filters.get('shape');
    let filteredData = tableData;

    if (date!=='') {
      // Apply `filter` to the table data to only keep the
      filteredData = filteredData.filter(row => row.datetime === date);
    }

    if (city!=='') {
      // Apply `filter` to the table data to only keep the
      filteredData = filteredData.filter(row => row.city === city);
    }

    if (state!=='') {
      // Apply `filter` to the table data to only keep the
      filteredData = filteredData.filter(row => row.state === state);
    }

    if (country!=='') {
      // Apply `filter` to the table data to only keep the
      filteredData = filteredData.filter(row => row.country === country);
    }

    if (shape!=='') {
      // Apply `filter` to the table data to only keep the
      filteredData = filteredData.filter(row => row.shape === shape);
    }

    buildTable(filteredData);
  }
  
  // 2. Attach an event to listen for changes to each filter
  d3.selectAll("input").on("change", updateFilters);

  
  // Build the table when the page loads
  buildTable(tableData);
