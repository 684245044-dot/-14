export class Book {
    private _id: number;
    private _isbn: string;
    private _title: string;
    private _author: string;
    private _isAvailable: boolean;

    constructor(id: number, isbn: string, title: string, author: string, isAvailable: boolean = true) {
        this._id = id;
        this._isbn = isbn;
        this._title = title;
        this._author = author;
        this._isAvailable = isAvailable;
    }

    public get id(): number { return this._id; }
    public get isbn(): string { return this._isbn; }
    public get title(): string { return this._title; }
    public get author(): string { return this._author; }
    public get isAvailable(): boolean { return this._isAvailable; }

    public set id(value: number) { this._id = value; }
    public set isbn(value: string) { this._isbn = value; }
    public set title(value: string) { this._title = value; }
    public set author(value: string) { this._author = value; }
    public set isAvailable(value: boolean) { this._isAvailable = value; }

    public getInfo(): string {
        const status = this._isAvailable ? 'Available' : 'Borrowed';
        return `[${this._isbn}] ${this._title} by ${this._author} - Status: ${status}`;
    }
}