import { BaseDAO } from './BaseDAO';

export class BorrowRecordDAO extends BaseDAO {

    public initTable(): void {
        const sql = `
            CREATE TABLE IF NOT EXISTS borrow_records (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                borrowerName TEXT NOT NULL,
                bookIsbn TEXT NOT NULL,
                borrowDate TEXT NOT NULL
            );
        `;
        this.db.exec(sql);
    }

    public borrowBook(borrowerName: string, isbn: string): boolean {
        const bookStmt = this.db.prepare('SELECT * FROM books WHERE isbn = ?');
        const bookRow = bookStmt.get(isbn) as any;

        if (!bookRow) {
            return false;
        }

        if (bookRow.isAvailable !== 1) {
            return false;
        }

        const executeTransaction = this.db.transaction(() => {
            const currentDate = new Date().toISOString().split('T')[0];
            const insertRecord = this.db.prepare(
                'INSERT INTO borrow_records (borrowerName, bookIsbn, borrowDate) VALUES (?, ?, ?)'
            );
            insertRecord.run(borrowerName, isbn, currentDate);

            const updateBook = this.db.prepare('UPDATE books SET isAvailable = 0 WHERE isbn = ?');
            updateBook.run(isbn);
        });

        try {
            executeTransaction();
            return true;
        } catch (error) {
            return false;
        }
    }
}