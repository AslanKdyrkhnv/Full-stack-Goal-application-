import IdeasApi from "../services/ideasApi";
import IdeaList from "./IdeaList";
class IdeaForm {
  constructor() {
    this._formModal = document.querySelector("#form-modal");
    this.newIdeaList = new IdeaList();
  }

  addEventLiseners() {
    this._form.addEventListener("submit", this.handleForm.bind(this));
  }
  async handleForm(e) {
    e.preventDefault();
    if (
      !this._form.elements.username.value ||
      !this._form.elements.text.value ||
      !this._form.elements.tag.value
    ) {
      alert("Enter please all fields");
      return;
    }

    const data = {
      username: this._form.elements.username.value,
      text: this._form.elements.text.value,
      tag: this._form.elements.tag.value,
    };

    localStorage.setItem("username", this._form.elements.username.value);
    // add to server
    const newIdeaForm = await IdeasApi.postIdeas(data);

    // add to form data and reload
    this.newIdeaList.addIdeatoList(newIdeaForm.data.data);

    this._form.elements.username.value = "";
    this._form.elements.text.value = "";
    this._form.elements.tag.value = "";

    this.render();

    document.dispatchEvent(new Event("closemodal"));
  }

  render() {
    this._formModal.innerHTML = `
    <form id="idea-form">
          <div class="form-control">
            <label for="idea-text">Enter a Username</label>
            <input type="text" name="username" id="username" value="${
              localStorage.getItem("username")
                ? localStorage.getItem("username")
                : ""
            }" />
          </div>
          <div class="form-control">
            <label for="idea-text">What's Your Idea?</label>
            <textarea name="text" id="idea-text"></textarea>
          </div>
          <div class="form-control">
            <label for="tag">Tag</label>
            <select name="tag" id="tag" class=>
              <option value="">--Please choose an option--</option>
              <option value="technology">technology</option>
              <option value="software">software</option>
              <option value="business">business</option>
              <option value="education">education</option>
              <option value="health">health</option>
              <option value="inventions">inventions</option>
            </select>
          </div>
          <button class="btn" type="submit" id="submit">Submit</button>
    </form>
    `;
    this._form = document.querySelector("#idea-form");
    this.addEventLiseners();
  }
}

export default IdeaForm;
