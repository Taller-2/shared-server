class Auth {
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
  }
}
const instance = new Auth()
export default instance
