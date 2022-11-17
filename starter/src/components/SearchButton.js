const SearchButton = ({showSearchPage, setShowSearchpage}) => {
    return (
        <div className="open-search">
            <a onClick={() => setShowSearchpage(!showSearchPage)}>Add a book</a>
          </div>
    );
}
 
export default SearchButton;