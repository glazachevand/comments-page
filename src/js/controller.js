import { testData } from './test.js';
import { ViewComments } from './view.js';
import { Comments, validate } from './model.js';

const model = new Comments(testData);
const view = new ViewComments(testData);

view.renderTestData(model.comments);

view.form.addEventListener('submit', function (e) {
  e.preventDefault();
  submitHandler(this);
});

view.form.addEventListener('input', view.removeMessage);

view.list.addEventListener('click', clickHandler);

function submitHandler(form) {
  view.removeMessages();
  const errors = validate(form);

  if (errors.length > 0) {
    view.showErrors(errors);
  } else {
    view.renderNewComment(model.addComment(form));
    view.clearForm(form);
  }
}

function clickHandler(e) {
  if (!e.target.hasAttribute('data-action')) return;

  const li = e.target.closest('li');

  if (!li) return;

  switch (e.target.getAttribute('data-action')) {
    case 'remove':
      const answer = confirm('Удалить комментарий?');
      if (answer) {
        model.removeComment(+li.dataset.key);
        view.removeCommentFromView(li);
      }
      break;
    case 'like':
      view.renderLikes(li, model.countLike(+li.dataset.key, 'like'), 'like');
      break;
    case 'dislike':
      view.renderLikes(li, model.countLike(+li.dataset.key, 'dislike'), 'dislike');
      break;
  }
}
