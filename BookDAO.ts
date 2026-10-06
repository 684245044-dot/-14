import { BaseDAO } from './BaseDAO';
import { Book } from './Book';

export class BookDAO extends BaseDAO {

    public initTable(): void {
        const sql = `
            CREATE TABLE IF NOT EXISTS books (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                isbn TEXT UNIQUE NOT NULL,
                title TEXT NOT NULL,
                author TEXT NOT NULL,
                isAvailable INTEGER NOT NULL DEFAULT 1
            );
        `;
        this.db.exec(sql);
    }

    public addBook(isbn: string, title: string, author: string): boolean {
        try {
            const stmt = this.db.prepare(
                'INSERT INTO books (isbn, title, author, isAvailable) VALUES (?, ?, ?, 1)'
            );
            const result = stmt.run(isbn, title, author);
            return result.changes > 0;
        } catch (error) {
            return false;
        }
    }

    public findBookByIsbn(isbn: string): Book | null {
        const stmt = this.db.prepare('SELECT * FROM books WHERE isbn = ?');
        const row = stmt.get(isbn) as any;

        if (!row) return null;

        const isAvailableBool = row.isAvailable === 1;
        return new Book(row.id, row.isbn, row.title, row.author, isAvailableBool);
    }

    public updateAvailability(isbn: string, isAvailable: boolean): boolean {
        const intVal = isAvailable ? 1 : 0;
        const stmt = this.db.prepare('UPDATE books SET isAvailable = ? WHERE isbn = ?');
        const result = stmt.run(intVal, isbn);
        return result.changes > 0;
    }

    public findAll(): Book[] {
        const stmt = this.db.prepare('SELECT * FROM books');
        const rows = stmt.all() as any[];

        return rows.map(row => new Book(
            row.id,
            row.isbn,
            row.title,
            row.author,
            row.isAvailable === 1
        ));
    }
}