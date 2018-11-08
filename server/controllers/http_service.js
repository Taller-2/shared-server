const fetch = require('node-fetch')

class HttpService {
  async get (url) {
    const rawResponse = await fetch(url, { method: 'GET', headers: this.getHeaders() })
    const content = await rawResponse.json()
    return content
  }

  async delete (url, id) {
    const rawResponse = await fetch(`${url}${id}/`, { method: 'DELETE', headers: this.getHeaders() })
    const content = await rawResponse.json()
    return content
  }

  async post (url, payload) {
    const rawResponse = await fetch(url, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify(payload)
    })
    const content = await rawResponse.json()
    return {
      content,
      status: rawResponse.status
    }
  }

  async put (url, payload) {
    const rawResponse = await fetch(url, {
      method: 'PUT',
      headers: this.getHeaders(),
      body: JSON.stringify(payload)
    })
    const content = await rawResponse.json()
    return {
      content,
      status: rawResponse.status
    }
  }

  getHeaders () {
    let headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
    return headers
  }
}
module.exports = new HttpService()
