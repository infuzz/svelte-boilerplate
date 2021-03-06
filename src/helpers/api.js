
import ls from 'local-storage';
import jwt_decode from 'jwt-decode'
const base = 'http://localhost:8000/api/v1';

function send({ method, path, data, token }) {

	if(ls.get('jwt')){
		const decoded = jwt_decode(ls.get('jwt'))
		if (Date.now() >= decoded.exp * 1000) {
			ls.remove('jwt')
			return window.location.replace('/')
		}
	}
	
	const fetch = process.browser ? window.fetch : require('node-fetch').default;
	const opts = { method, headers: {} };

	if (data) {
		opts.headers['Content-Type'] = 'application/json';
		opts.body = JSON.stringify(data);
	}

	if (token) {
		opts.headers['Authorization'] = `Bearer ${token}`;
	}

	return fetch(`${base}/${path}`, opts)
		.then(r => r.text())
		.then(json => {
			try {
				return JSON.parse(json);
			} catch (err) {
				return json;
			}
		});
}

export function get(path, token) {
	return send({ method: 'GET', path, token });
}

export function del(path, token) {
	return send({ method: 'DELETE', path, token });
}

export function post(path, data, token) {
	return send({ method: 'POST', path, data, token });
}

export function patch(path, data, token) {
	return send({ method: 'PATCH', path, data, token });
}

export function put(path, data, token) {
	return send({ method: 'PUT', path, data, token });
}
