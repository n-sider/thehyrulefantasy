const root = `${window.location.href.match(/^https?:\/\/[^\/?#]*/)[0]}/`;
const useHash = false;
const hash = '#!';
const router = new Navigo(root, useHash, hash);

function loadFragment(slug) {
  const req = new XMLHttpRequest();
  req.open('GET', `/timeline-fragments/${slug}.html`);
  req.send();
  req.onload = function () {
    document.getElementById('content').innerHTML = req.responseText;
  };
}

router
  .on(() => {
    loadFragment('home');
  })
  .on({
    timeline: () => {
      loadFragment('timeline');
    }
  })
  .notFound(() => {
    loadFragment('404');
  })
  .resolve();
