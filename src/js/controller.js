import { testData } from './test.js';
import * as view from './view.js';
import * as model from './model.js';

view.renderTestData(model.loadTestComments(testData));

view.DOMElements.form.addEventListener('submit', submitHandler);

view.DOMElements.form.addEventListener('input', view.removeMessage);

view.DOMElements.list.addEventListener('click', clickHandler);

function submitHandler(e) {
  e.preventDefault();
  view.removeMessages();
  const errors = model.validate(this);

  if (errors.length > 0) {
    view.showErrors(errors);
  } else {
    view.renderNewComment(model.addComment(this));
    view.clearForm(this);
  }
}

function clickHandler(e) {
  if (!e.target.hasAttribute('data-action')) return;

  const li = e.target.closest('li');

  if (!li) return;

  switch (e.target.getAttribute('data-action')) {
    case 'remove':
      model.removeComment(+li.dataset.key);
      view.removeCommentFromView(li);
      break;
    case 'like':
      view.renderLikes(li, model.countLike(+li.dataset.key, 'like'), 'like');
      break;
    case 'dislike':
      view.renderLikes(li, model.countLike(+li.dataset.key, 'dislike'), 'dislike');
      break;
  }
}
