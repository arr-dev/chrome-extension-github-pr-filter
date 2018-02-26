// jshint esversion: 6


let fn = function() {
  let list = document.querySelectorAll('div#notification-center ul.filter-list');
  if (list.length === 0) { return true; }

  const MERGED_SELECTOR = 'span.type-icon-state-merged';
  const PR_SELECTOR = 'svg.octicon-git-pull-request';

  merged = addFilterLink('Merged', MERGED_SELECTOR);
  all = addFilterLink('All PRs', PR_SELECTOR);
  markRead = addMarkAsReadLink('Mark visible as read');

  list[0].appendChild(all);
  list[0].appendChild(merged);
  list[0].appendChild(markRead);
};

let iterateIssues = function(callback) {
  document.
    querySelectorAll('div.notifications-list li.list-group-item').
    forEach(function(item, i) {
        callback(item);
    });
};

let addMarkAsReadLink = function(title) {
  let link = document.createElement('a');
  link.className = 'filter-item';
  link.innerHTML = title;

  let el = document.createElement('li');
  el.appendChild(link);

  el.addEventListener('click', function() {
    iterateIssues(function(item) {
      if (item.style.display !== 'none') {
        button = item.querySelector('button.delete-note');

        if (button !== null) {
          button.click();
        }
      }
    });
  });

  return el;
};

let addFilterLink = function(title, selector) {
  countMatched = 0;
  iterateIssues(function(item) {
    if (item.querySelector(selector) !== null) {
      countMatched++;
    }
  });
  let count = document.createElement('span');
  count.className = 'count';
  count.innerHTML = countMatched;

  let link = document.createElement('a');
  link.className = 'filter-item';
  link.innerHTML = title;
  link.appendChild(count);

  let el = document.createElement('li');
  el.appendChild(link);

  el.addEventListener('click', function() {
    iterateIssues(function(item) {
      item.style.display = '';
      if (item.querySelector(selector) === null) {
        item.style.display = 'none';
      }
    });
  });

  return el;
};

if (document.attachEvent ? document.readyState === "complete" : document.readyState !== "loading"){
  fn();
} else {
  document.addEventListener('DOMContentLoaded', fn);
}
