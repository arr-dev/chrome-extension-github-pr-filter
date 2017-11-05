// jshint esversion: 6


let fn = function() {
  let list = document.querySelectorAll('div#notification-center ul.filter-list');
  if (list.length === 0) { return true; }

  const MERGED_SELECTOR = 'svg.type-icon-state-merged';
  const PR_SELECTOR = 'svg.octicon-git-pull-request';

  merged = addLink('Merged', MERGED_SELECTOR);
  all = addLink('All PRs', PR_SELECTOR);

  list[0].appendChild(all);
  list[0].appendChild(merged);
};

let iterateIssues = function(callback) {
  document.
    querySelectorAll('div.notifications-list li.list-group-item').
    forEach(function(item, i) {
        callback(item);
    });
};

let addLink = function(title, selector) {
  countMerged = 0;
  iterateIssues(function(item) {
    if (item.querySelector(selector) !== null) {
      countMerged++;
    }
  });
  let count = document.createElement('span');
  count.className = 'count';
  count.innerHTML = countMerged;

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
