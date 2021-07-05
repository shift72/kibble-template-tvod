import { render, bindEachComponent, attrs, AppComponent} from 's72.ui';

export class OAuthCallback extends AppComponent {
  constructor(props, context) {
    super(props, context);
  }

  componentDidMount() {
    // If not logged in @todo

    const params = new URLSearchParams(window.location.hash.substr(1));
    let token = params.get('id_token');
    if(token) {
      return this.app.oauthService.verifyToken(token);
    }
  }

  render(props) {
    return <i class="s72-icon s72-icon-loading"></i>
  }
}

bindEachComponent('s72-oauth-callback', e => {
  var ats = attrs(e);
  e.className = ats.class;
  return render(<OAuthCallback {...ats} />, e);
});