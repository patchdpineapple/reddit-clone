import React, { useState } from "react";
import "./NewHub.css";
import { db } from "../firebase/config";

function NewHub({ setShowNewHub, allCategories, setAllCategories }) {
  const [hubName, setHubName] = useState("");

  //functions
  const addHubToFirestore = async (newHub) => {
    //check if hub already exists in database
    try {
      let hubExist = false;
      let snapshot = await db.collection("hubs").get();
      snapshot.forEach((doc) => {
        if (doc.data().name.toUpperCase() === hubName.toUpperCase()) {
          hubExist = true;
        }
      });

      if (hubExist) {
        //if hub exists alert user, else add new hub to database and state
        alert(`${newHub.name} hub already exists`);
      } else {
        await db.collection("hubs").doc(newHub.id).set(newHub);
        setAllCategories([...allCategories, newHub]);
      }
    } catch (err) {
      alert(err.message);
    }
  };

  //handlers
  const handleSubmit = (e) => {
    //add a new category
    e.preventDefault();

    let newCategory = {
      id: hubName,
      name: hubName,
      members: 1,
      image: "",
      posts: [],
    };
    addHubToFirestore(newCategory);

    setHubName("");
    closeNewHub();
  };

  const closeNewHub = () => {
    setShowNewHub(false);
  };

  const handleChangeHubName = (e) => {
    //update input state
    setHubName(e.target.value);
  };

  return (
    <div className="NewHub" onClick={closeNewHub}>
      <form
        className="newhub-form"
        onClick={(e) => e.stopPropagation()}
        onSubmit={(e) => handleSubmit(e)}
      >
        <label htmlFor="newhub-name">Enter Hub Name:</label>
        <input
          className="input-newhub"
          type="text"
          id="newhub-name"
          name="newhub-name"
          placeholder="Hub"
          value={hubName}
          onChange={handleChangeHubName}
          maxLength="40"
          required
        />

        <button className="btn btn-submit-newhub" type="submit">
          Done
        </button>
      </form>
    </div>
  );
}

export default NewHub;
