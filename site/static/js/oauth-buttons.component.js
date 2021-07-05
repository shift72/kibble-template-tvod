import { i18n } from 's72';
import { render, bindEachComponent, attrs, AppComponent } from 's72.ui';

export class OAuthButtons extends AppComponent {
  constructor(props, context) {
    super(props, context);
    this.state = {
      providers: false
    }

    console.log("FOO");
  }

  componentDidMount() {
    this.app.oauthService.getProviders().then((p) => {
      this.setState({
        providers: p
      });
    })
  }

  render(props) {
    if (!this.state.providers || this.state.providers.length == 0) { return; }
    return(
      <span class="s72-oauth-buttons">
        { this.state.providers.map((provider, index) => {
          return <OauthButton provider={provider} />
        })}
      </span>
    )
  }
}

bindEachComponent('s72-oauth-buttons', e => {
  var ats = attrs(e);
  e.className = ats.class;
  return render(<OAuthButtons {...ats} />, e);
});

class OauthButton extends AppComponent {
  constructor(props, context) {
    super(props, context);

    this.state = {
      provider: props.provider
    }

    console.log(window.location);
  }

  login() {
    // Get the URL and go there
    return this.app.oauthService.authorize(this.state.provider, 'http://localhost:8081/callback.html');
  }

  componentDidMount() {
    this.setState({
      isLoggedIn: this.app.userService.isAuthenticated()
    });
  }

  render(props) {
    if(!this.state.isLoggedIn) {
      return <a class={ `btn btn-signin btn-sso btn-sso-${this.state.provider.name}` } href="#" onClick={()=>{ this.login()}}>
        <i class={ `s72-oauth-icon s72-oauth-icon-${this.state.provider.name}` }></i>
        { i18n(`nav_signin_sso_${this.state.provider.name}`) }
      </a>
    }
  }
}