# IndexedDBStorage
A wrapper class over the non-easy api of the Indexeddb to make it like the LocalStorage api

# Usage

```js
import "@saleh_kebria/idbstorage";

await indexedDb.setItem('myKey', 'myValue');

const value = await indexedDb.getItem('myKey');
```

# Installation

```
$ npm i @saleh_kebria/idbstorage
```