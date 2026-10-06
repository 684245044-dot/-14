import Database from 'better-sqlite3';

export abstract class BaseDAO {
    protected db: Database.Database;

    constructor(db: Database.Database) {
        this.db = db;
        this.initTable();
    }

    abstract initTable(): void;
}