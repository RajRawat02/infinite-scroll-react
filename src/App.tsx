import React, { useState, useEffect } from 'react';

const App = () => {
  const [data, setData] = useState([
    { column1: 'Data 1', column2: 'Data 2' },
    { column1: 'Data 3', column2: 'Data 4' },
    { column1: 'Data 1', column2: 'Data 2' },
    { column1: 'Data 3', column2: 'Data 4' },
  ]); // Holds the data for the table
  const [loading, setLoading] = useState(true); // Indicates whether data is being loaded
  const [hasMore, setHasMore] = useState(true); // Indicates whether there is more data to load
  const [page, setPage] = useState(1); // Tracks the current page number

  // Function to fetch more data and append to the table
  const fetchMoreData = () => {
    // Replace this with your data fetching logic, using your preferred method (e.g., API call)
    // For demonstration purposes, we're just adding mock data here.
    console.log('fetchmore');
    const newData = [
      { column1: 'Data 1', column2: 'Data 2' },
      { column1: 'Data 3', column2: 'Data 4' },

      // Add more data objects as needed
    ];

    // If the fetched data is empty, there is no more data to load
    if (newData.length === 0) {
      setHasMore(false);
    } else {
      // Update the data state with the new data
      setData([...data, ...newData]);
      // Increment the page number for the next fetch
      setPage(page + 1);
    }

    // Data loading is complete
    setLoading(false);
  };

  // Function to handle the scroll event
  const handleScroll = (event) => {
    const target = event.target;
    // Check if the user has scrolled to the bottom of the table
    if (target.scrollHeight - target.scrollTop === target.clientHeight) {
      // If there is more data to load and no loading process is ongoing, fetch more data
      if (hasMore && loading) {
        setLoading(true);
        fetchMoreData();
      }
    }
  };

  // Attach the scroll event listener on component mount
  useEffect(() => {
    const tableContainer = document.getElementById('tableContainer');
    tableContainer.addEventListener('scroll', handleScroll);

    // Clean up the event listener on component unmount
    return () => {
      tableContainer.removeEventListener('scroll', handleScroll);
    };
  }, [hasMore, loading]);

  return (
    <div
      id="tableContainer"
      style={{ height: '100px', overflow: 'auto', border: '1px solid black' }}
    >
      <table>
        <thead>
          <tr>
            <th>Column 1</th>
            <th>Column 2</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index}>
              <td>{row.column1}</td>
              <td>{row.column2}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {loading && <p>Loading...</p>}
      {!hasMore && !loading && <p>No more data to load.</p>}
    </div>
  );
};

export default App;
