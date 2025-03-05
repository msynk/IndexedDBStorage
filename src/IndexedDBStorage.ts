class IndexedDBStorage {
    private _dbName: string;
    private _storeName: string;

    constructor(db: string, store: string) {
        this._dbName = db;
        this._storeName = store;
    }

    private async _init_() {
        return new Promise<IDBDatabase>((resolve, reject) => {
            const request = indexedDB.open(this._dbName, 1);

            request.onupgradeneeded = (event: IDBVersionChangeEvent) => {
                const db = (event.target as any).result as IDBDatabase;
                db.createObjectStore(this._storeName, { keyPath: 'id' });
            };

            request.onsuccess = (event) => {
                resolve((event.target as any).result as IDBDatabase);
            };

            request.onerror = (event) => {
                reject('Error opening database: ' + (event.target as any).error as string);
            };
        });
    }

    public async setItem(key: string, value: any) {
        if (arguments.length < 2)
            throw new TypeError("Failed to execute 'setItem' on 'IndexedDBStorage': 2 argument required, but only 0 present.");

        const db = await this._init_();

        return new Promise<void>((resolve, reject) => {
            const transaction = db.transaction(this._storeName, 'readwrite');
            const store = transaction.objectStore(this._storeName);
            const request = store.put({ id: key, value: value });

            request.onsuccess = () => resolve();

            request.onerror = (event) => {
                reject('Error saving data: ' + (event.target as any).error as string);
            };
        });
    }

    public async getItem(key: string) {
        if (arguments.length < 1)
            throw new TypeError("Failed to execute 'getItem' on 'IndexedDBStorage': 1 argument required, but only 0 present.");

        const db = await this._init_();

        return new Promise((resolve, reject) => {
            const transaction = db.transaction(this._storeName, 'readonly');
            const store = transaction.objectStore(this._storeName);
            const request = store.get(key);

            request.onsuccess = (event) => {
                const result = (event.target as any).result;
                return result ? resolve(result.value) : resolve(null);
            };

            request.onerror = (event) => {
                reject('Error loading data: ' + (event.target as any).error as string);
            };
        });
    }

    public async removeItem(key: string) {
        const db = await this._init_();

        return new Promise<void>((resolve, reject) => {
            const transaction = db.transaction(this._storeName, 'readwrite');
            const store = transaction.objectStore(this._storeName);
            const request = store.delete(key);

            request.onsuccess = () => resolve();

            request.onerror = (event) => {
                reject('Error removing data: ' + (event.target as any).error as string);
            };
        });
    }

    public async clear() {
        const db = await this._init_();
        return new Promise<void>((resolve, reject) => {
            const transaction = db.transaction(this._storeName, 'readwrite');
            const store = transaction.objectStore(this._storeName);
            const request = store.clear();

            request.onsuccess = () => resolve();

            request.onerror = (event) => {
                reject('Error clearing data: ' + (event.target as any).error as string);
            };
        });
    }
}
