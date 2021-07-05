import { render, bindEachComponent, attrs, AppComponent} from 's72.ui';

export class OAuthLoggedOut extends AppComponent {
  constructor(props, context) {
    super(props, context);
  }

  componentDidMount() {
    // Empty out provider and redirect accordingly
    this.app.oauthService.loggedOut();
  }

  render(props) {
    return <i class="s72-icon s72-icon-loading"></i>
  }
}

bindEachComponent('s72-oauth-logged-out', e => {
  var ats = attrs(e);
  e.className = ats.class;
  return render(<OAuthLoggedOut {...ats} />, e);
});