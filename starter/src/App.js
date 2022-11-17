import { useEffect, useState } from "react";
import "./App.css";
import { get, getAll, search, update } from "./BooksAPI";

import CurrentlyReadingShelf from "./components/CurrentlyReadingShelf";
import ReadBooksShelf from "./components/ReadBooksShelf";
import WantToReadShelf from "./components/WantToReadShelf";

import SearchButton from "./components/SearchButton";
import SearchMenu from "./components/SearchMenu";
import Title from "./components/Title";

function App() {
  const [showSearchPage, setShowSearchpage] = useState(false);
  const [readBooks, setReadbooks] = useState([]);
  const [wantToReadBooks, setWantToReadBooks] = useState([]);
  const [currentlyReadingBooks, setcurrentlyReadingBooks] = useState([]);

  const sortBookstoShelfs = () => {
    getAll().then(data => {
      data.forEach(book => {
        if (book.shelf === 'read') {
          setReadbooks(prev => [...prev, book]);
        }
        else if (book.shelf === 'wantToRead') {
          setWantToReadBooks(prev => [...prev, book]);
        }
        else {
          setcurrentlyReadingBooks(prev => [...prev, book]);
        }
      })
    })
  }

  // console.log(readBooks, currentlyReadingBooks, wantToReadBooks)

  useEffect(() => {
    sortBookstoShelfs()
  }, [])

  return (
    <div className="app">
      {showSearchPage ? (
        <SearchMenu showSearchPage={showSearchPage} setShowSearchpage={setShowSearchpage} />
      ) : (
        <div className="list-books">
          <Title />
          <div className="list-books-content">
            <CurrentlyReadingShelf currentlyReadingBooks={currentlyReadingBooks} />
            <WantToReadShelf wantToReadBooks={wantToReadBooks} />
            <ReadBooksShelf readBooks={readBooks} />
          </div>
          <SearchButton setShowSearchpage={setShowSearchpage} showSearchPag={showSearchPage} />
        </div>
      )}
    </div>
  );
}

export default App;
