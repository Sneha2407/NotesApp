import logo from "./logo.svg";
import "./App.css";
import { Component } from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { toast } from "react-toastify";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: [],
    };
  }

  API_URL = "http://localhost:5038/";

  componentDidMount() {
    this.refreshNotes();
  }

  async refreshNotes() {
    fetch(this.API_URL + "api/todoapp/getNotes")
      .then((response) => response.json())
      .then((data) => {
        this.setState({ notes: data });
        console.log(data);
      })
      .catch((error) => {
        console.error("Error fetching notes:", error);
      });
  }

  async addClick() {
    var newNotes = document.getElementById("newNotes").value;
    const data = new FormData();
    data.append("newNotes", newNotes);

    fetch(this.API_URL + "api/todoapp/addNotes", {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((result) => {
        // alert(result);
        toast.info(result);
        this.refreshNotes();
      })
      .catch((error) => {
        console.error("Error adding note:", error);
      });
  }

  async deleteClick(id) {
    fetch(this.API_URL + "api/todoapp/deleteNotes?id=" + id, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((result) => {
        toast.info(result);
        this.refreshNotes();
      })
      .catch((error) => {
        console.error("Error deleting note:", error);
      });
  }

  render() {
    const { notes } = this.state;
    return (
      <div className="App">
        <div className="todo-container">
          <h2 className="app-title">Todo App</h2>
          <div className="input-container">
            <input
              id="newNotes"
              className="input-field"
              placeholder="Enter a new note"
            />
            <button className="add-button" onClick={() => this.addClick()}>
              Add
            </button>
          </div>
          <div className="notes-list">
            {notes && notes.length > 0 ? (
              notes.map((note) => (
                <div className="note-item" key={note.id}>
                  <span className="note-description">{note.description}</span>
                  <button
                    className="delete-button"
                    onClick={() => this.deleteClick(note.id)}
                  >
                    <i className="fas fa-trash"></i>
                  </button>
                </div>
              ))
            ) : (
              <p className="no-notes-message">No notes available</p>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
