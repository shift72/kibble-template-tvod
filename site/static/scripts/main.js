document.addEventListener('s72loaded', function(event){
  event.detail.app.classificationsService.load('/classifications.all.json');

  document.querySelectorAll('.btn-trailer').forEach(function(btn) {
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      window.location = btn.getAttribute('data-url');
    });
  });
});