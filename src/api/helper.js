import axios from 'axios';
import omit from 'lodash.omit';

export default {
	get(endpoint, data) {
		return createPromise('GET', endpoint, data);
	},
	getFile(endpoint) {
		return decodeURI(`/api/file?endpoint=${endpoint}`)
	},
	getMany(promisesList) {
		return axios.all(promisesList);
	},
	post(endpoint, data) {
		return createPromise('POST', endpoint, data);
	},
	postWithFiles(endpoint, data) {
		return createPromise('POST', endpoint, data, { hasFiles: true });
	},
	put(endpoint, data) {
		return createPromise('PUT', endpoint, data);
	},
	putMany(promisesList) {
		return axios.all(promisesList);
	},
	putWithFiles(endpoint, data) {
		return createPromise('PUT', endpoint, data, { hasFiles: true });
	},
	delete(endpoint, data) {
		return createPromise('DELETE', endpoint, data);
	},

	/**
	 * Method to get an API Token
	 */
	getToken() {
		return createPromise('GET', '/api/getToken', null, { ownEndpoint: true });
	}
}

/**
 * Create the promise to call the TMS API
 * @param {string} method The request method (GET, POST, PUT, DELETE, etc.)
 * @param {string} endpoint The TMS API endpoint to call
 * @param {object} data The data to send if it has
 * @param {boolean} hasFiles If the data has files
 * @param {boolean} ownEndpoint If the parameter endpoint needs to be called without the TMS API
 */
function createPromise(method, endpoint, data, options = { hasFiles: false, ownEndpoint: false } ) {
	if (options.hasFiles && method !== 'GET')
		data = createDataWithFiles(data);

	var requestOptions = {
		method,
		data,
		validateStatus: function (status) {
			return (status >= 200 && status < 300);
		},
        json: true
	}

	if (method === 'GET')
		requestOptions.headers['params'] = JSON.stringify(data);

	var requestObjectDebug = { 
		method,
		request: { 
			endpoint, ...requestOptions
		} 
	};

	return axios(endpoint, requestOptions)
	.then((res) => {
		requestObjectDebug.response = { ...res };
		
		if (process.env.NODE_ENV !== "production")
			console.info(endpoint, requestObjectDebug);
		
		if (res.data.status <= 300) 
			return res.data.data;
		else 
			throw res.data.error;
	})
	.catch((error) => {		
		if (process.env.NODE_ENV !== "production")
			console.info(endpoint, requestObjectDebug);
			
		console.error('Error', error);
		throw error;
	});
}

/**
 * Create the data with the files and returns a "FormData" type object
 * @param {object} data The data with the files
 */
function createDataWithFiles(data) {
	console.info('dataBeforeConvertToForm', data);
	var formData = new FormData();

	// Add all data to the object 'form' except the attached files object
	formData.append('form', JSON.stringify(omit(data, 'attachedFiles')));
    
	if (data.attachedFiles && data.attachedFiles.length > 0) {
		// Adding all attached files
		for (var i = 0; i < data.attachedFiles.length; i++) {
			formData.append(i, data.attachedFiles[i]);
		}
	}
	
	return formData;
}