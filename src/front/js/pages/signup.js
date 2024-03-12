import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";

export const Signup = () => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmmit = async (e) => {
    e.preventDefault()
    let result = await actions.signup(email, password);
    if (result == false) {
      alert("An error occured while trying to sign you up");
    } else {
      navigate("/login");
    }
  };

  return (
     <div class="container-fluid ">
      <div class="row">
        <div class="col-6 mx-auto">
          <div>
            <form onSubmit={handleSubmmit}>
              <div class="ms-5 me-5">
                <label for="exampleInputEmail1" class="form-label mt-4">
                  Email address
                </label>
                <input
                  type="email"
                  class="form-control"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                />
              </div>
              <div class="ms-5 me-5">
                <label for="exampleInputPassword1" class="form-label">
                  Password
                </label>
                <input
                  type="password"
                  class="form-control"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  id="exampleInputPassword1"
                />
              </div>
              <button type="submit" class="btn btn-primary mt-3 ms-5">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
