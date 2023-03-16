function TestComment(id, author, date, text, likes) {
  this.id = id;
  this.author = author;
  this.date = date;
  this.text = text;
  this.likes = likes;
}

export const testData = [
  new TestComment(
    1,
    'Имя',
    '2013-02-31T12:17:58.215Z',
    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio nemo veritatis dolorum maiores modi, facere, dicta quo earum soluta, assumenda incidunt! Beatae totam quidem, iusto',
    '',
  ),
  new TestComment(
    2,
    'Имя2',
    '2017-11-02',
    'Lorem2 ipsum dolor sit amet consectetur adipisicing elit. Odio nemo veritatis dolorum maiores modi, facere, dicta quo earum soluta, assumenda incidunt! Beatae totam quidem, iusto',
    '5',
  ),
];
