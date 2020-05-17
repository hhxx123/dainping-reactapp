const headers = new Headers({
  Accept: "application-json",
  "Content-type": "application-type",
});
function get(url) {
  return fetch(url, {
    method: "GET",
    headers: headers,
  })
    .then((response) => {
      handleResponse(url, response);
    })
    .catch((err) => {
      console.error(`request failed.URL = ${url}.Message = ${err}`);
      return Promise.reject({ error: { message: "Request failed " } });
    });
}

function post(url, data) {
  return fetch(url, {
    method: "POST",
    headers: headers,
    body: data,
  })
    .then((response) => {
      handleResponse(url, response);
    })
    .catch((err) => {
      console.error(`request failed.URL = ${url}.Message = ${err}`);
      return Promise.reject({ error: { message: "Request failed " } });
    });
}

function handleResponse(url, response) {
  if (response.status === 200) {
    return response.json();
  } else {
    console.error(`request failed.URL = ${url}`);
    return Promise.reject({
      error: { message: "Request failed due to server error" },
    });
  }
}

export { get, post };
