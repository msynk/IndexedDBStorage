(function () {
    const _defaultStorage = new IndexedDBStorage('_defaultDB_', '_defaultStore_');

    const db = indexedDB as any;

    db.getItem = _defaultStorage.getItem.bind(_defaultStorage);
    db.setItem = _defaultStorage.setItem.bind(_defaultStorage);
    db.removeItem = _defaultStorage.removeItem.bind(_defaultStorage);
    db.clear = _defaultStorage.clear.bind(_defaultStorage);
}());