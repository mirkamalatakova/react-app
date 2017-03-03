import 'whatwg-fetch';

function parseXML(val) {
  return val.then((value) => {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(value, 'text/xml');
    return xmlDoc;
  });
}

function handleResponse(response, type) {
  if (type === 'json') {
    return response.json();
  } else if (type === 'xml') {
    return parseXML(response.text());
  } // else {
  return response.text();
  // }
}

function request(method, url, options = {}) {
  const o = Object.assign(options, {
    method,
  });

  return fetch(url, options)
    // ignoring status will allow us to process responses with non 2xx response status
    // .then(status)
    .then(response => handleResponse(response, o.dataType));
}

export default {
  get: (url, options) => request('GET', url, options),
  post: (url, options) => request('POST', url, options),
  put: (url, options) => request('PUT', url, options),
  patch: (url, options) => request('PATCH', url, options),
  delete: (url, options) => request('DELETE', url, options),
};