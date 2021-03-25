import React from 'react'
import "./Signup.css"

function Signup({setShowSignup}) {
    const closeSignup = () => {
        setShowSignup(false);
    }

    return (
        <div className="Signup" onClick={closeSignup}>
            <div className="signup-form">
            <h1>Signup</h1>

            </div>

        </div>
    )
}

export default Signup;
