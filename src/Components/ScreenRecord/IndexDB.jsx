import { openDB } from 'idb/with-async-ittr.js';

export default async function IndexDB() {
  const db =  openDB('Videos', 1, {
    upgrade(db) {
      // Create a store of objects
      const store = db.createObjectStore('videoData', {
        // The 'id' property of the object will be the key.
        keyPath: 'id',
        // If it isn't explicitly set, create a value by auto incrementing.
        autoIncrement: true,
      });
      // Create an index on the 'date' property of the objects.
      store.createIndex('date', 'date');
    },
  });

  // Add an article:
  await db.add('videoData', {
    date: new Date(),
    body: 'asdasd',
  });

  // Get all the articles in date order:
  // const videoData = await db.getAllFromIndex('videoData', 'date')

  // Add 'And, happy new year!' to all articles on 2019-01-01:
  {
    const tx = db.transaction('articles', 'readwrite');
    const index = tx.store.index('date');

    for await (const cursor of index.iterate(new Date('2019-01-01'))) {
      const article = { ...cursor.value };
      article.body += ' And, happy new year!';
      cursor.update(article);
    }

    await tx.done;
  }

}