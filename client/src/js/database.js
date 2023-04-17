import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {console.log("PUT to the database");
const markupDB = await openDB("markupDB", 1);
const tx = markupDB.transaction("markup", "readwrite");
const store = tx.objectStore("markup");
const request = store.put({ id: 1, content });
const result = await request;
console.log("data saved to the database", result);
};


// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {console.log("GET from the database");
const markupDB = await openDB("markupDB", 1);
const tx = markupDB.transaction("markup", "readonly");
const store = tx.objectStore("markup");
const request = store.get(1);
const result = await request;
console.log("data received from the database");
return result;
};
initdb();
