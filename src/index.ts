const _defaultStorage = new IndexedDBStorage('_defaultDB_', '_defaultStore_');

const db = indexedDB as any;

db.getItem = _defaultStorage.getItem;
db.setItem = _defaultStorage.setItem;
db.removeItem = _defaultStorage.removeItem;
db.clear = _defaultStorage.clear;