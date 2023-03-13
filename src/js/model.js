let comments = [];

class Comment {
  constructor(id, author, date, text, likes) {
    (this.id = id), (this.author = author), (this.date = date), (this.text = text), (this.likes = likes);
  }
}

function loadTestComments(data) {
  for (const item of data) {
    const newComment = new Comment(item.id, item.author, formatDate(item.date), item.text, +item.likes || 0);
    comments.push(newComment);
  }
  return comments;
}

function formatDate(date) {
  const timestamp = Date.parse(date);
  return isNaN(timestamp) == false ? new Date(timestamp).toISOString() : new Date().toISOString();
}

function addComment(form) {
  const id = comments.length > 0 ? +comments.at(-1).id + 1 : 1;
  const newComment = new Comment(id, form.author.value, formatDate(form.date.value), form.text.value, 0);
  comments.push(newComment);
  return newComment;
}

function validate(form) {
  const errors = [];
  const formReq = document.querySelectorAll('._req');

  for (const item of formReq) {
    if (!item.value.trim()) {
      errors.push({ elem: item, error: 'Заполните, пожалуйста, обязательное поле' });
    }
  }

  if (!/\d{4}-\d{2}-\d{2}/.test(form.date.value)) {
    errors.push({ elem: form.date, error: 'Введите, пожалуйста, правильную дату' });
  }

  return errors;
}

function removeComment(id) {
  comments = comments.filter((item) => item.id !== id);
}

function countLike(id, op) {
  const item = comments.find((item) => item.id === id);

  if (op === 'like') {
    item.likes++;
  } else if (op === 'dislike') {
    item.likes = item.likes <= 1 ? 0 : --item.likes;
  }
  return item.likes;
}

export { loadTestComments, addComment, validate, removeComment, countLike };
