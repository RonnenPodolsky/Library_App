import Book from './Book';

const WantToReadShelf = ({ wantToReadBooks, removeFromWantToReadBooks }) => {
    return (
        <div className="bookshelf">
            <h2 className="bookshelf-title">Want To Read</h2>
            <div className="bookshelf-books">
                <ol className="books-grid">
                    {wantToReadBooks.map(book => {
                        return <Book book={book} changeFunc={removeFromWantToReadBooks} key={book.id} />
                    })}
                </ol>
            </div>
        </div>)
}

export default WantToReadShelf;