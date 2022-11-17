import { useEffect, useState } from "react";
import "./App.css";
import { getAll, search, update } from "./BooksAPI";

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
  const [searchedBooks, setSearchedBooks] = useState([])

  const sortBookstoShelfs = async () => {
    getAll().then(data => {
      setReadbooks([]);
      setWantToReadBooks([])
      setcurrentlyReadingBooks([]);

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

  useEffect(() => {
    sortBookstoShelfs()
  }, [])

  const removeBookFromShelves = async (book) => {
    await update(book, "none");
    sortBookstoShelfs();
  }

  const removeFromCurrentBooks = async (e, selectedBook) => {
    if (e.target.value === "none") {
      await removeBookFromShelves(selectedBook);
      return;
    }
    await update(selectedBook, e.target.value);
    let updatedCurrentlyReadingBooks = currentlyReadingBooks.filter((book) => book.id !== selectedBook.id)
    setcurrentlyReadingBooks(updatedCurrentlyReadingBooks);
    sortBookstoShelfs();
  }

  const removeFromWantToReadBooks = async (e, selectedBook) => {
    if (e.target.value === "none") {
      await removeBookFromShelves(selectedBook);
      return;
    }
    await update(selectedBook, e.target.value);
    let updatedWantToReadBooks = wantToReadBooks.filter((book) => book.id !== selectedBook.id)
    setWantToReadBooks(updatedWantToReadBooks);
    sortBookstoShelfs();
  }

  const removeFromReadBooks = async (e, selectedBook) => {
    if (e.target.value === "none") {
      await removeBookFromShelves(selectedBook);
      return;
    }
    await update(selectedBook, e.target.value);
    let updatedReadBooks = readBooks.filter((book) => book.id !== selectedBook.id)
    setReadbooks(updatedReadBooks);
    sortBookstoShelfs();
  }

  const searchBooks = async (e) => {
    try {
      let books = await search(e.target.value);
      if (!books || books.error === "empty query") {
        setSearchedBooks([])
        return;
      }
      setSearchedBooks(books)
    }
    catch (e) {
      console.log(e);
    }
  }

  const findBookShelf = (book) => {
    if (currentlyReadingBooks.find(bookInShelf => book.id === bookInShelf.id)) {
      return "currentlyReading"
    };
    if (readBooks.find(bookInShelf => book.id === bookInShelf.id)) {
      return "read"
    };
    if (wantToReadBooks.find(bookInShelf => book.id === bookInShelf.id)) {
      return "wantToRead"
    };

    return "none";
  }

  const changeShelf = async (e, book) => {
    if (currentlyReadingBooks.find(bookInShelf => book.id === bookInShelf.id)) {
      await removeFromCurrentBooks(e, book)
      return;
    }
    if (readBooks.find(bookInShelf => book.id === bookInShelf.id)) {
      await removeFromReadBooks(e, book)
      return;
    };
    if (wantToReadBooks.find(bookInShelf => book.id === bookInShelf.id)) {
      await removeFromWantToReadBooks(e, book)
      return;
    };

    await update(book, e.target.value);
    
    switch (e.target.value) {
      case ('read'):
        let updatedReadBooks = readBooks.filter((randomBook) => randomBook.id !== book.id)
        setReadbooks(updatedReadBooks);
        break;
      case ('currentlyReading'):
        let updatedCurrentlyReadingBooks = currentlyReadingBooks.filter((randomBook) => randomBook.id !== book.id)
        setcurrentlyReadingBooks(updatedCurrentlyReadingBooks);
        break;
      case ('wantToRead'):
        let updateWantToRead = wantToReadBooks.filter((randomBook) => randomBook.id !== book.id)
        setWantToReadBooks(updateWantToRead);
        break;
      default:
    }

    sortBookstoShelfs();
  }

  return (
    <div className="app">
      {showSearchPage ? (
        <SearchMenu showSearchPage={showSearchPage} setShowSearchpage={setShowSearchpage} searchBooks={searchBooks} searchedBooks={searchedBooks} setSearchedBooks={setSearchedBooks} findBookShelf={findBookShelf} changeShelf={changeShelf} />
      ) : (
        <div className="list-books">
          <Title />
          <div className="list-books-content">
            <CurrentlyReadingShelf currentlyReadingBooks={currentlyReadingBooks} removeFromCurrentBooks={removeFromCurrentBooks} />
            <WantToReadShelf wantToReadBooks={wantToReadBooks} removeFromWantToReadBooks={removeFromWantToReadBooks} />
            <ReadBooksShelf readBooks={readBooks} removeFromReadBooks={removeFromReadBooks} />
          </div>
          <SearchButton setShowSearchpage={setShowSearchpage} showSearchPag={showSearchPage} />
        </div>
      )}
    </div>
  );
}

export default App;
