import axios from "axios";
class IdeasApi {
  constructor() {
    this._apiUri = "/api/ideas";
  }

  getIdeas() {
    return axios.get(this._apiUri);
  }

  postIdeas(data) {
    return axios.post(this._apiUri, data);
  }

  updateIdeas(data, id) {
    return axios.put(`${this._apiUri}/${id}`, data);
  }

  deleteIdeas(id) {
    const username = localStorage.getItem("username")
      ? localStorage.getItem("username")
      : "";
    return axios.delete(`${this._apiUri}/${id}/`, {
      data: {
        username,
      },
    });
  }
}

export default new IdeasApi();
