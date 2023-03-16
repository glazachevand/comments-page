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
    'Некрасов',
    '1861-11-02',
    'Однажды, в студеную зимнюю пору, я из лесу вышел. Был сильный мороз. Гляжу, поднимается медленно в гору лошадка, везущая хворосту воз.',
    '5',
  ),
  new TestComment(
    2,
    'Aikidoka',
    '2013-02-21T12:17:58.215Z',
    'I would like to invite you on my Birthday',
    '2',
  ),
];
