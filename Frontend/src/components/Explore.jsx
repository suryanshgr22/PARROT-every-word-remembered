import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
const Explore = () => {
  // Array of items that can be searched
  const items = [
    "Moby-Dick",
    "Pride and Prejudice",
    "1984",
    "To Kill a Mockingbird",
    "The Great Gatsby",
    "War and Peace",
    "The Catcher in the Rye",
    "Crime and Punishment",
    "Jane Eyre",
    "Wuthering Heights",
    "The Odyssey",
    "The Hobbit",
    "The Brothers Karamazov",
    "The Picture of Dorian Gray",
    "Frankenstein"
  ];

  const [searchQuery, setSearchQuery] = useState('');
  const userId = localStorage.getItem('user');
  const [filteredResults, setFilteredResults] = useState([]); // Store filtered results for suggestions

  // Handle search query change
  const handleSearchChange = (e) => {
    // console.log('11',jokes);
    const query = e.target.value;
    setSearchQuery(query);

    if (query) {
      // console.log('12',jokes);
      // Filter items based on the search query as the user types
      // jokes.map((joke)=>{
      //   console.log(joke.name);
      // })
      const results = jokes.filter((joke) =>
        joke['name'].toLowerCase().includes(query.toLowerCase())
      );
      // console.log(filteredResults);
      // console.log(results);
      setFilteredResults(results);
      // console.log(filteredResults);
    } else {
      setFilteredResults([]);
    }
  };

  const [jokes, setJokes] = useState([]);
  useEffect(()=>{
    console.log(userId);
    
    axios.get(`/api/projectsall/${userId}`)
    .then((res)=>{
        console.log(res.data)
        setJokes(res.data)
    })
    .catch((err)=>{
        console.log(err);  
    })
  },[])
  

  return (
    <>
    <div className="flex flex-col items-center justify-start min-h-screen bg-gray-100 p-6">
      {/* <div>
        <h1>Jokes : {jokes.length}</h1>
        { jokes.map((joke)=>(
          <div key={joke.id} >
            <h3>{joke.title}</h3>
            <p>{joke.content}</p>
          </div>
        )) }
      </div> */}
      {/* Search Bar Section */}
      <div className="w-full max-w-2xl mb-6">
        <div className="flex items-center space-x-4">
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search for Projects created by other people"
            className="w-full py-3 px-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-800"
          />
        </div>
      </div>

      {/* Suggestions Section */}
      {filteredResults.length > 0 && (
        <div className="w-full max-w-2xl mt-4 bg-white shadow-lg rounded-lg border border-gray-200 overflow-scroll max-h-60 ">
          <ul className="space-y-2">
            {filteredResults.map((result, index) => (
              <Link to={`/projectpage/${result._id}`} key={index}>
              <li key={index} className="p-4 hover:bg-indigo-100 cursor-pointer">
                {result.name} : {result.description}
              </li>
              </Link>
            ))}
          </ul>
        </div>
      )}

      {/* Optional: Results Section (can be added if you want a more refined search) */}
      {/* You can use this section to display final results if needed */}
      {/* <div className="w-full max-w-2xl mt-4">
        {filteredResults.length > 0 ? (
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-4">Search Results</h2>
            <ul className="space-y-2">
              {filteredResults.map((result, index) => (
                <li key={index} className="bg-white p-4 rounded-lg shadow-md">
                  {result}
                </li>
              ))}
            </ul>
          </div>
        ) : (
          searchQuery && (
            <div className="text-gray-600">
              <p>No results found for "{searchQuery}". Try a different search term.</p>
            </div>
          )
        )}
      </div> */}
    </div>
    <div className='h-auto'>

    </div>
    </>
  );
};

export default Explore;
