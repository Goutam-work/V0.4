import axios from "axios";
import qs from "qs";

export const API = axios.create({
  baseURL: "http://54.185.204.216/api/",
  headers: {
    "Content-Type": "application/x-www-form-urlencoded"
  }
});

export const userLogin = (email, password) => {
  const reqBody = {
    email: email,
    password: password
  };
  return API.post("authentication/login", qs.stringify(reqBody))
    .then(res => {
      return res.data;
    })
    .catch(err => console.log(err));
};

// For this function, password should contain uppercase, number and atleast 8 characters
export const userSignUp = (name, email, password) => {
  const reqBody = {
    name,
    email,
    password
  };
  return API.post("authentication/signup", qs.stringify(reqBody))
    .then(res => {
      return res.data;
    })
    .catch(err => console.log(err));
};

export const userIsLoggedIn = () => {
  return API.post("authentication/isLoggedIn")
    .then(res => {
      return res.data;
    })
    .catch(err => console.log(err));
};

export const userLogout = () => {
  return API.get("authentication/logout")
    .then(res => {
      return res.data;
    })
    .catch(err => console.log(err));
};

export const getArenaFromSportID = sport_id => {
  console.log("i got " + sport_id);
  const reqBody = {
    sport: sport_id
  };
  return API.post("sports/getArena", qs.stringify(reqBody))
    .then(res => {
      return res.data.data;
    })
    .catch(err => console.log(err));
};

export const getSportFromArenaID = arena_id => {
  const reqBody = {
    arena_id
  };
  return API.post("sports/getSportsArena", qs.stringify(reqBody))
    .then(res => {
      return res.data.data;
    })
    .catch(err => console.log(err));
};

export const getAvailableCourts = (sport_id, arena_id) => {
  const reqBody = {
    sport: sport_id,
    arena_id
  };
  return API.post("sports/getCourts", qs.stringify(reqBody))
    .then(res => {
      return res.data.data;
    })
    .catch(err => console.log(err));
};

export const getAvailableSlots = court_id => {
  const reqBody = {
    court_id
  };
  return API.post("sports/getCourtSlots", qs.stringify(reqBody))
    .then(res => {
      return res.data.data;
    })
    .catch(err => console.log(err));
};

// # THSI FETCH API IS DONE
export const getAllSports = () => {
  return API.post("ui/getAllSports")
    .then(res => {
      return res.data.data;
    })
    .catch(err => console.log(err));
};
