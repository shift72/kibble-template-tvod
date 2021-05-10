import {render} from 's72';

import Auth0 from "./auth0.component";

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