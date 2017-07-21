const rest = require('restling');
const when = require('when');

const apiPostJson = (endpoint, data, options) => (
	when(
		rest.postJson(
			endpoint,
			data,
			options
		)
	)
		.then((response) => (response.data), (error) => ({ error: error.data }))
		.catch((err) => { throw new Error(err); })
);

const apiPost = (endpoint, data) => (
	when(
		rest.post(
			endpoint,
			data
		)
	)
		.then((response) => (response.data), (error) => ({ error: error.data }))
		.catch((err) => { throw new Error(err); })
);

const apiGet = (endpoint) => (
	when(rest.get(endpoint), (result) => {
		return result
	})
)

module.exports = {
	apiPost,
	apiGet,
}
