import React, { useState } from "react";
import axios from "axios";
import BookCard from "./Components/BookCard";
import SearchBar from "./Components/SearchBar";
import Pagination from "./Components/Pagination";
import "./App.css";

const App = () => {
  const [books, setBooks] = useState([]);
  const [query, setQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  const fetchBooks = async (bookTitle, page = 1) => {
    try {
      const response = await axios.get(
        `https://openlibrary.org/search.json?title=${bookTitle}&page=${page}`
      );
      setBooks(response.data.docs);
      setTotalResults(response.data.numFound);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  const handleSearch = (searchQuery) => {
    setQuery(searchQuery);
    setCurrentPage(1);
    fetchBooks(searchQuery, 1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    fetchBooks(query, page);
  };

  return (
    <div className="app-container">
      <h1>Book Finder</h1>
      <SearchBar onSearch={handleSearch} />
      <div className="book-list">
        {books.map((book, index) => (
          <BookCard key={index} book={book} />
        ))}
      </div>
      <Pagination
        currentPage={currentPage}
        totalResults={totalResults}
        resultsPerPage={10}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default App;
