class Auth {
  setApp (app) {
    this.app = app
  }

  getToken () {
    if (!this.token) {
      this.token = sessionStorage.getItem('auth')
    }
    return this.token
  }

  isLogged () {
    return this.getToken() !== null
  }

  login (token) {
    sessionStorage.setItem('auth', token)
  }

  logout () {
    this.token = null
    sessionStorage.clear()
    if (this.app) {
      alert('Se ha cerrado su sesion')
      this.app.forceUpdate() // Hack para redirigir a login
    }
  }
}
const instance = new Auth()
export default instance
