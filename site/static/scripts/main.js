function documentReady() {
  document.querySelectorAll('.btn-trailer').forEach(function(btn) {
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      window.location = btn.getAttribute('data-url');
    });
  });
}

s72('run', function(app) {
  documentReady();
});