function Comment(id, author, date, text, likes) {
  this.id = +id;
  this.author = author;
  this.text = text;
  this.likes = +likes;
  const timestamp = Date.parse(date);
  this.date = (isNaN(timestamp) == false) ? new Date(timestamp).toISOString() : new Date().toISOString();
}
export function Comments(data) {
  this.comments = data;
}

Comments.prototype.addComment = function (form) {
  const id = this.comments.length > 0 ? +this.comments.at(-1).id + 1 : 1;
  const newComment = new Comment(id, form.author.value, form.date.value, form.text.value, 0);
  this.comments.push(newComment);
  return newComment;
}

Comments.prototype.removeComment = function (id) {
  this.comments = this.comments.filter((item) => item.id !== id);
}

Comments.prototype.countLike = function (id, op) {
  const item = this.comments.find((item) => item.id === id);

  if (op === 'like') {
    item.likes++;
  } else if (op === 'dislike') {
    item.likes = item.likes <= 1 ? 0 : --item.likes;
  }
  return item.likes;
}

export function validate(form) {
  const errors = [];
  const formReq = Array.from(form.elements).filter(item => item.required == true);

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


