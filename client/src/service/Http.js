

class Http {
	// TODO: Agregar JWT
	async get(url) {
		const rawResponse = await fetch(url, {
			method: 'GET',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			}
		})
		const content = await rawResponse.json()

		return content
	}

	async post(url, payload) {
		const rawResponse = await fetch(url, {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(payload)
		})
		const content = await rawResponse.json()

		return {
			content,
			status: rawResponse.status
		}
	}

}
const instance = new Http()
export default instance 