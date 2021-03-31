import React, { useState } from 'react'
import "./NewHub.css"

function NewHub({setShowNewHub}) {
    const [hubName, setHubName] = useState("");

    const closeNewHub = () => {
        setShowNewHub(false);
      };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert(hubName);
        setHubName("");
        closeNewHub();
      };

    const handleChangeHubName = (e) => {
        setHubName(e.target.value);
      };
    

    return (
        <div className="NewHub">
            <form
        className="newhub-form"
        onClick={(e) => e.stopPropagation()}
        onSubmit={ e => handleSubmit(e) }
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
        
        <button className="btn btn-submit-newhub" type="submit">Done</button>
      </form>
        </div>
    )
}

export default NewHub
