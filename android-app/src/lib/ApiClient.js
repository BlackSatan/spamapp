export default (url, config = {}) => {
  return fetch(`http://10.0.2.2:8000${url}`, Object.assign({}, config, {
    headers: Object.assign({}, config.headers || {}, {
      'Content-Type': 'application/json'
    })
  })).then(response => response.json())
}
