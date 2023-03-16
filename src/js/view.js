export function ViewComments() {
  this.form = document.getElementsByName('commentform')[0];
  this.list = document.querySelector('.comments__list');
}

ViewComments.prototype.renderTestData = function (data) {
  this.list.innerHTML = '';
  const now = new Date();
  this.form.date.value =
    `${now.getFullYear()}-${(now.getMonth() + 1).toString().padStart(2, '0')}-${now.getDate().toString().padStart(2, '0')}`;
  for (const item of data) {
    this.renderNewComment(item);
  }
}

ViewComments.prototype.renderNewComment = function (comment) {
  const html = `
  <li class="comments__item comment" data-key="${comment.id}">
    <div class="comment__author">${comment.author}</div>
    <div class="comment__date"> <time datetime="${comment.date}">${this.renderDate(comment.date)}</time></div>
    <p class="comment__text">${comment.text}</p>
    <div class="comment__btn-row">
      <div class="like comment__like icofont-ui-love" title="Нравится" data-action="like"></div>
      <div class="like-count comment__like-count">${comment.likes || ''}</div>
      <div class="comment__remove icofont-ui-delete" title="удалить" data-action="remove"></div>
    </div>
  </li>`;
  this.list.insertAdjacentHTML('beforeend', html);
}

ViewComments.prototype.renderDate = function (timestamp) {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const yesterday = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1);
  const tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
  const date = new Date(timestamp);

  if (date >= today && date < tomorrow) {
    return `сегодня, ${now.toLocaleTimeString('ru-RU').slice(0, -3)}`;
  } else if (date >= yesterday && date < today) {
    return `вчера, ${now.toLocaleTimeString('ru-RU').slice(0, -3)}`;
    //return `вчера`;
  } else {
    return `${date.toLocaleDateString('ru-RU')}, ${now.toLocaleTimeString('ru-RU').slice(0, -3)}`;
    //return `${ date.toLocaleDateString('ru-RU') } `;
  }
}

ViewComments.prototype.showErrors = function (errors) {
  for (const item of errors) {
    const message = document.createElement('div');
    message.className = 'message-error';
    message.innerHTML = item.error;
    message.style.left = 0;
    message.style.top = '5px';
    item.elem.classList.add('invalid');
    item.elem.after(message);
  }

  errors[0].elem.focus();
}

ViewComments.prototype.removeMessages = function () {
  const messages = document.querySelectorAll('.message-error');

  for (const item of messages) {
    item.remove();
  }
}

ViewComments.prototype.removeMessage = function (e) {
  const target = e.target;

  if (target.nextElementSibling && (target.tagName == 'INPUT' || target.tagName == 'TEXTAREA')) {
    target.nextElementSibling.remove();
    target.classList.remove('invalid');
  }
}

ViewComments.prototype.clearForm = function (form) {
  form.reset();
  const now = new Date();
  form.date.value =
    `${now.getFullYear()}-${(now.getMonth() + 1).toString().padStart(2, '0')}-${now.getDate().toString().padStart(2, '0')}`;
}

ViewComments.prototype.removeCommentFromView = function (elem) {
  elem.remove();
}

ViewComments.prototype.renderLikes = function (elem, count, op) {
  const like = elem.querySelector('.like');
  elem.querySelector('.like-count').textContent = count || '';

  if (op === 'like') {
    like.setAttribute('title', 'Больше не нравится');
    like.setAttribute('data-action', 'dislike');
  } else if (op === 'dislike') {
    like.setAttribute('title', 'Нравится');
    like.setAttribute('data-action', 'like');
  }
}




