import BookInSearch from './BookInSearch';

const SearchMenu = ({ setShowSearchpage, showSearchPage, searchBooks, searchedBooks, setSearchedBooks, findBookShelf, changeShelf }) => {

  return (
    <div className="search-books">
      <div className="search-books-bar">
        <a
          className="close-search"
          onClick={() => {
            setShowSearchpage(!showSearchPage)
            setSearchedBooks([])
          }}
        >
          Close
        </a>
        <div className="search-books-input-wrapper">
          <input
            type="text"
            placeholder="Search by title, author, or ISBN"
            onChange={(e) => searchBooks(e)}
          />

        </div>
      </div>
      <div className="search-books-results">
        <ol className="books-grid">
          {searchedBooks.map(book => {
            return <BookInSearch book={book} key={book.id} findBookShelf={findBookShelf} changeShelf={changeShelf}/>
          })}
        </ol>
      </div>
    </div>
  );
}

export default SearchMenu;