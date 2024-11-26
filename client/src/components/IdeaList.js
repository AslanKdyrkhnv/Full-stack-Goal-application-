import ideasApi from "../services/ideasApi";
import IdeaApi from "../services/ideasApi";
class IdeaList {
  constructor() {
    this._ideaList = document.querySelector("#idea-list");
    this._ideas = [];

    this._tags = new Set();
    this._tags.add("technology");
    this._tags.add("software");
    this._tags.add("business");
    this._tags.add("education");
    this._tags.add("health");
    this._tags.add("inventions");
  }

  addEventListener() {
    this._ideaList.addEventListener("click", async (e) => {
      e.stopImmediatePropagation();
      if (e.target.classList.contains("fa-times")) {
        const data = e.target.parentElement.parentElement.dataset.id;
        this.deleteIdea(data);
      }
    });
  }

  async deleteIdea(id) {
    try {
      const res = await ideasApi.deleteIdeas(id);
      this._ideas.filter((idea) => idea._id !== id);
      this.getIdeas();
    } catch (error) {
      console.log(error);
    }
  }

  async getIdeas() {
    try {
      const res = await IdeaApi.getIdeas();
      const data = res.data.data;
      this._ideas = data;
      this.render();
    } catch (error) {
      console.log(error);
    }
  }

  addIdeatoList(data) {
    this._ideas.push(data);
    this.getIdeas();
  }

  getTagClass(tag) {
    tag = tag.toLowerCase();
    let tagClass = "";
    if (this._tags.has(tag)) {
      tagClass = `tag-${tag}`;
    } else {
      tagClass = "";
    }
    return tagClass;
  }

  render() {
    this._ideaList.innerHTML = this._ideas
      .map((idea) => {
        const tagClass = this.getTagClass(idea.tag);
        const btn =
          idea.username.trim() === localStorage.getItem("username").trim();
        return `
        <div class="card" data-id=${idea._id}>
          ${
            btn
              ? `<button class="delete"><i class="fas fa-times"></i></button>`
              : ""
          }
          <h3>
            ${idea.text}
          </h3>
          <p class="tag ${tagClass}">${idea.tag.toUpperCase()}</p>
          <p>
            Posted on <span class="date">${idea.data}</span> by
            <span class="author">${idea.username}</span>
          </p>
        </div>
        `;
      })
      .join("");
    this.addEventListener();
  }
}

export default IdeaList;
