import axios from 'axios';

export default axios.create({
  baseURL: `https://penpaper.cyclic.app/api/v1`
});