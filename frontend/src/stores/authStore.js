import { create } from "zustand";
import axios from "axios";

const authStore = create((set) => ({
  errorMessage: "",

  setError: (msg) => set({ errorMessage: msg }),
  clearError: () => set({ errorMessage: "" }),

  loggedIn: null,
  userEmail: null,

  loginForm: {
    email: "",
    password: "",
  },

  signupForm: {
    email: "",
    password: "",
  },

  updateLoginForm: (e) => {
    const { name, value } = e.target;
    set((state) => ({
      loginForm: {
        ...state.loginForm,
        [name]: value,
      },
    }));
  },

  updateSignupForm: (e) => {
    const { name, value } = e.target;
    set((state) => ({
      signupForm: {
        ...state.signupForm,
        [name]: value,
      },
    }));
  },

  login: async () => {
    const { loginForm } = authStore.getState();
    try {
      const res = await axios.post("/login", loginForm);
      set({ loggedIn: true, userEmail: res.data.email });
      authStore.getState().clearError();
    } catch (error) {
      console.error("Login error:", error);
      set({ loggedIn: false, userEmail: null });
      authStore.getState().setError("Invalid email or password.");
    }
  },

  checkAuth: async () => {
    try {
      const res = await axios.get("/check-auth");
      set({ loggedIn: true, userEmail: res.data.email, loginForm: { email: "", password: "" } });
    } catch (error) {
      console.error("Unauthorised. couldn't log in: ", error);
      set({ loggedIn: false, userEmail: null });
    }
  },

  signup: async () => {
    const { signupForm } = authStore.getState();

    try {
      const res = await axios.post("/signup", signupForm, {
        withCredentials: true,
      });
      console.log(res);
      set({
        signupForm: {
          email: "",
          password: "",
        },
      });
      authStore.getState().clearError();
    } catch (error) {
      console.error("Signup error:", error);
      authStore.getState().setError("Email already in use or invalid input.");
    }
  },

  logout: async () => {
    await axios.get("/logout");
    set({ loggedIn: false, userEmail: null, loginForm: { email: "", password: "" } });
  },
}));

export default authStore;
