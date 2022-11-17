import Book from './Book'

const ReadBooksShelf = ({ readBooks, removeFromReadBooks }) => {
    return (
        <div className="bookshelf">
            <h2 className="bookshelf-title">Read Books</h2>
            <div className="bookshelf-books">
                <ol className="books-grid">
                    {readBooks.map(book => {
                        return <Book book={book} changeFunc={removeFromReadBooks} key={book.id}/>
                    })}
                </ol>
            </div>
        </div>)
}

export default ReadBooksShelf;