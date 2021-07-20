(function (s72$1, s72_ui) {
    'use strict';

    (function() {
        const env = {"AUTH0_DOMAIN":"dev-z8neenst.au.auth0.com","AUTH0_CLIENTID":"URH6yst3oqWGEGw0I1VzgrSxWqtbRwMi","AUTH0_CALLBACK":"http://localhost:8080/callback.html","AUTH0_AUDIENCE":""};
        try {
            if (process) {
                process.env = Object.assign({}, process.env);
                Object.assign(process.env, env);
                return;
            }
        } catch (e) {} // avoid ReferenceError: process is not defined
        globalThis.process = { env:env };
    })();

    var OAuthCallback = /*@__PURE__*/(function (AppComponent) {
      function OAuthCallback(props, context) {
        AppComponent.call(this, props, context);
      }

      if ( AppComponent ) OAuthCallback.__proto__ = AppComponent;
      OAuthCallback.prototype = Object.create( AppComponent && AppComponent.prototype );
      OAuthCallback.prototype.constructor = OAuthCallback;

      OAuthCallback.prototype.componentDidMount = function componentDidMount () {
        // If not logged in @todo

        var params = new URLSearchParams(window.location.hash.substr(1));
        var token = params.get('id_token');
        if(token) {
          return this.app.oauthService.verifyToken(token);
        }
      };

      OAuthCallback.prototype.render = function render (props) {
        return s72.ui.h( 'i', { class: "s72-icon s72-icon-loading" })
      };

      return OAuthCallback;
    }(s72_ui.AppComponent));

    s72_ui.bindEachComponent('s72-oauth-callback', function (e) {
      var ats = s72_ui.attrs(e);
      e.className = ats.class;
      return s72_ui.render(s72.ui.h( OAuthCallback, ats), e);
    });

    var OAuthLoggedOut = /*@__PURE__*/(function (AppComponent) {
      function OAuthLoggedOut(props, context) {
        AppComponent.call(this, props, context);
      }

      if ( AppComponent ) OAuthLoggedOut.__proto__ = AppComponent;
      OAuthLoggedOut.prototype = Object.create( AppComponent && AppComponent.prototype );
      OAuthLoggedOut.prototype.constructor = OAuthLoggedOut;

      OAuthLoggedOut.prototype.componentDidMount = function componentDidMount () {
        // Empty out provider and redirect accordingly
        this.app.oauthService.loggedOut();
      };

      OAuthLoggedOut.prototype.render = function render (props) {
        return s72.ui.h( 'i', { class: "s72-icon s72-icon-loading" })
      };

      return OAuthLoggedOut;
    }(s72_ui.AppComponent));

    s72_ui.bindEachComponent('s72-oauth-logged-out', function (e) {
      var ats = s72_ui.attrs(e);
      e.className = ats.class;
      return s72_ui.render(s72.ui.h( OAuthLoggedOut, ats), e);
    });

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

}(s72, s72.ui));
//# sourceMappingURL=main.js.map
