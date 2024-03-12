const getState = ({ getStore, getActions, setStore }) => {
	return {
	  store: {
		userId: null,
	  },
	  actions: {
		signup: async (email, password) => {
		  let opts = {
			method: "POST",
			headers: {
			  "Content-Type": "application/json",
			},
			body: JSON.stringify({ email: email, password: password }),
		  };
		  try {
			let rsp = await fetch(process.env.BACKEND_URL + "/api/signup", opts);
			if (!rsp.ok) {
			  return false;
			} else {
			  let data = await rsp.json();
			  console.log(data);
			  return true;
			}
		  } catch (error) {
			console.log(error);
		  }
		},
		login: async (email, password) => {
		  let opts = {
			method: "POST",
			headers: {
			  "Content-Type": "application/json",
			},
			body: JSON.stringify({ email: email, password: password }),
		  };
		  try {
			let rsp = await fetch(process.env.BACKEND_URL + "/api/login", opts);
			if (!rsp.ok) {
			  return false;
			} else {
			  let data = await rsp.json();
			  sessionStorage.setItem("token", data.token);
			  setStore({ userId: data.user_id });
			  console.log(data);
			  return true;
			}
		  } catch (error) {
			console.log(error);
		  }
		},
		authenticatePrivate: async () => {
		  try {
			const token = sessionStorage.getItem("token");
			if (!token) {
			  throw new Error("No access token found");
			}
  
			const response = await fetch(process.env.BACKEND_URL + "api/private", {
			  method: "GET",
			  headers: {
				Authorization: `Bearer ${token}`,
			  },
			});
  
			if (!response.ok) {
			  throw new Error("Authentication failed");
			}
  
			const data = await response.json();
			setStore({ userId: data.user_id });
			return true;
		  } catch (error) {
			console.error("Authentication failed:", error);
			sessionStorage.removeItem("token");
			setStore({ userId: null });
			return false;
		  }
		},
	  },
	};
  };
  
  export default getState;
  
