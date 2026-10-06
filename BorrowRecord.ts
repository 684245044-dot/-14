export class BorrowRecord {
    private _id: number;
    private _borrowerName: string;
    private _bookIsbn: string;
    private _borrowDate: string;

    constructor(id: number, borrowerName: string, bookIsbn: string, borrowDate: string) {
        this._id = id;
        this._borrowerName = borrowerName;
        this._bookIsbn = bookIsbn;
        this._borrowDate = borrowDate;
    }

    public get id(): number { return this._id; }
    public get borrowerName(): string { return this._borrowerName; }
    public get bookIsbn(): string { return this._bookIsbn; }
    public get borrowDate(): string { return this._borrowDate; }

    public set id(value: number) { this._id = value; }
    public set borrowerName(value: string) { this._borrowerName = value; }
    public set bookIsbn(value: string) { this._bookIsbn = value; }
    public set borrowDate(value: string) { this._borrowDate = value; }
}