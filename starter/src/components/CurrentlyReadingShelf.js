import Book from './Book'

const CurrentlyReadingShelf = ({ currentlyReadingBooks, removeFromCurrentBooks }) => {
    return (
        <div className="bookshelf">
            <h2 className="bookshelf-title">Currently Reading</h2>
            <div className="bookshelf-books">
                <ol className="books-grid">
                    {currentlyReadingBooks.map(book => {
                        return <Book book={book} changeFunc={removeFromCurrentBooks} key={book.id}/>
                    })}
                </ol>
            </div>
        </div>)
}

export default CurrentlyReadingShelf;