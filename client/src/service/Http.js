import Auth from '../service/Auth'
class Http {
  async get (url) {
    const rawResponse = await fetch(url, { method: 'GET', headers: this.getHeaders() })
    this.checkIfUnauthorized(rawResponse.status)
    const content = await rawResponse.json()
    return content
  }

  async delete (url, id) {
    const rawResponse = await fetch(`${url}${id}/`, { method: 'DELETE', headers: this.getHeaders() })
    this.checkIfUnauthorized(rawResponse.status)
    const content = await rawResponse.json()
    return content
  }

  async post (url, payload) {
    const rawResponse = await fetch(url, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify(payload)
    })
    this.checkIfUnauthorized(rawResponse.status)
    const content = await rawResponse.json()
    return {
      content,
      status: rawResponse.status
    }
  }

  checkIfUnauthorized (status) {
    if (status === 401) {
      Auth.logout()
    }
  }

  getHeaders () {
    let headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
    if (Auth.isLogged()) {
      headers['Authorization'] = 'Bearer ' + Auth.getToken()
    }
    return headers
  }
}
const instance = new Http()
export default instance
