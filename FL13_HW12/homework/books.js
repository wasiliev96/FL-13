const booksStore = [
  {
    name: 'Unlocking Android',
    authors: ['W. Frank Ableson', 'Charlie Collins', 'Robi Sen'],
    image:
      'https://s3.amazonaws.com/AKIAJC5RLADLUMVRPFDQ.book-thumb-images/ableson.jpg',
    plot: `Unlocking Android: A Developer's Guide provides concise, hands-on instruction
     for the Android operating system and development tools. This book teaches important
      architectural concepts in a straightforward writing style and builds on this with 
      practical and useful examples throughout.`
  },
  {
    name: 'Android in Action, Second Edition',
    authors: ['W. Frank Ableson', 'Robi Sen'],
    image:
      'https://s3.amazonaws.com/AKIAJC5RLADLUMVRPFDQ.book-thumb-images/ableson2.jpg',
    plot: `Android in Action, Second Edition is a comprehensive tutorial for Android 
    developers. Taking you far beyond "Hello Android," this fast-paced book puts you 
    in the driver's seat as you learn important architectural concepts and implementation
     strategies. You'll master the SDK, build WebKit apps using HTML 5, and even learn to 
     extend or replace Android's built-in features by building useful and intriguing examples. `
  },
  {
    name: 'Specification by Example',
    authors: ['Gojko Adzic'],
    image:
      'https://s3.amazonaws.com/AKIAJC5RLADLUMVRPFDQ.book-thumb-images/adzic.jpg'
  }
];
if (!localStorage.getItem('books')) {
  localStorage.setItem('books', JSON.stringify(booksStore));
}
