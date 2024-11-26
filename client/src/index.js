// import "@fortawesome/fontawesome-free/css/all.css";
import Modal from "./components/Modal";
import IdeaForm from "./components/IdeaForm";

import "./css/style.css";
import IdeaList from "./components/IdeaList";

new Modal();
const ideaForm = new IdeaForm();
ideaForm.render();
const ideaList = new IdeaList();

new IdeaList().getIdeas();
