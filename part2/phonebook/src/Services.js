import axios from 'axios';
const baseUrl = 'http://localhost:3030/persons';

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then(response => response.data);
}

const addPerson = (formData) => {
  const request = axios.post(baseUrl, formData)
  return request.then(response => response.data);
}

const deleteEntry = (id) => {
  const request = axios.delete(`${baseUrl}/${id}`)
  return request.then(response => response);
}

export default { getAll, addPerson, deleteEntry }
