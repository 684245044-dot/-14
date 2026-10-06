import Database from 'better-sqlite3';
import { BookDAO } from './BookDAO';
import { BorrowRecordDAO } from './BorrowRecordDAO';

function main() {
    const db = new Database('library.db');

    const bookDao = new BookDAO(db);
    const borrowRecordDao = new BorrowRecordDAO(db);

    bookDao.addBook('ISBN-101', 'Clean Code', 'Robert C. Martin');
    bookDao.addBook('ISBN-102', 'Design Patterns', 'Erich Gamma');

    const book101 = bookDao.findBookByIsbn('ISBN-101');
    if (book101) {
        console.log(book101.getInfo());
    }

    borrowRecordDao.borrowBook('John Doe', 'ISBN-101');
    borrowRecordDao.borrowBook('Jane Smith', 'ISBN-101');

    const allBooks = bookDao.findAll();
    allBooks.forEach(b => console.log(b.getInfo()));

    db.close();
}

main();