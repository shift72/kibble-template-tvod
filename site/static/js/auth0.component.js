import React from 'react'

import {  bindAllComponents, AppComponent, render, h, attrs } from 's72.ui';
import  auth0 from 'auth0-js';



export default class Auth0 extends AppComponent {
    constructor(props, context) {
      super(props, context);
      this.state = {
        idToken: false,
        accessToken: false
      }
    }

    componentDidMount(){
      if (!this.state.idToken && !this.state.accessToken) {
        if (window.location.href.indexOf('#access_token=') > 0) {
          this.webAuth.parseHash((err,authResult)=>{
            if (err) return console.error(err)
            console.log('authenticated via auth0.parseHash() on callback page:');
            this.setSession(authResult);
          })
        } else {
          this.checkSession();
        }
      }
    }

    componentWillMount(){
      this.webAuth = new auth0.WebAuth({
        domain: process.env.AUTH0_DOMAIN,
        clientID: process.env.AUTH0_CLIENTID,
        redirectUri: process.env.AUTH0_CALLBACK,
        audience: process.env.AUTH0_AUDIENCE,
        responseType: 'token id_token',
        scope: 'openid profile email'
      });
    }

    login(){
      this.webAuth.authorize();
    }

    logout(){
      this.webAuth.logout();
    }

    setSession(authResult){
      // we would call our api here
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.setState({idToken: authResult.idToken, accessToken: authResult.accessToken})
      }
    }

    getProfile(){
      this.webAuth.client.userInfo(this.state.accessToken, (err,info)=>{
        console.log(info);
      })
    }

    checkSession(){
      // if this returns "login_required" when you're clearly logged in, it's because you used a social login, bututyfc x no Client ID/Secret is setup for that integration in Auth0 dashboard
      this.webAuth.checkSession({
      }, (err,authResult)=>{
        if (err) return console.log("Not logged in to auth0")
        console.log('authenticated via auth0.checkSession():');
        this.setSession(authResult);
      })
    }

    render(props, state){
      return (
        <div>
          <button class="btn btn-success" onClick={()=>{ state.idToken ? this.logout() : this.login()}}>Auth0 Sign {state.idToken ? "Out" : "In"}</button>
          {state.idToken && <button class="btn btn-info" onClick={()=>{ this.getProfile()}}>console.log getProfile</button>}
        </div>
      )
    }
  }
  
  bindAllComponents('s72-auth0', (elements) => {
    return elements.map(e => render(h(Auth0, attrs(e)), e));
  });