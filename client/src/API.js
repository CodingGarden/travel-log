const API_URL = process.env.REACT_APP_API_URL;

export async function listLogEntries(id) {
  let response;
  if(id === null){
    response = await fetch(`${API_URL}/api/logs`);
  }
  else {
    response = await fetch(`${API_URL}/api/logs/${id}`);
  }
  return response.json();
}

export async function createLogEntry(entry) {  
  const token = window.localStorage.getItem("jwt");  
  const response = await fetch(`${API_URL}/api/logs`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(entry),
  });
  let json;
  if (response.headers.get('content-type').includes('text/html')) {
    const message = await response.text();
    json = {
      message,
    };
  } else {
    json = await response.json();
  }
  if (response.ok) {
    return json;
  }
  const error = new Error(json.message);
  error.response = json;
  throw error;
}