import React, { useState } from "react";
import "./NewHub.css";
import arrCategories from "../data/categories";
import accounts from "../data/accounts";

function NewHub({ setShowNewHub }) {
  const [hubName, setHubName] = useState("");

  const closeNewHub = () => {
    setShowNewHub(false);
  };

  const handleSubmit = (e) => {
    //add a new category
    e.preventDefault();

    //check if category exist
    let categoryChecker = arrCategories.findIndex(
      (category) => category.name.toUpperCase() === hubName.toUpperCase()
    );

    //if new category does not exist yet, add to database
    if (categoryChecker === -1) {
        //create new category object
      let newCategory = {
        id: hubName,
        name: hubName,
        members: 1,
        image: "",
        posts: [],
      };

      //add new category to array 
      arrCategories.push(newCategory);
    } else {
        //alert user that the hub name already exists
        alert(`${hubName} hub already exists.`);
    }

    setHubName("");
    closeNewHub();
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
