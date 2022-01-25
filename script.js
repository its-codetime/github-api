import { getUserData } from "./js/api.js";
import { createUserPageDOM } from "./js/dom.js";

let state = {
  activeUserToken: "github-token", // github deletes the token if its committed
  activeUserDetails: {},
  userRepos: [],
  searchQuery: "",
  searchError: "",
  searchUser: {},
};

async function setUp(state) {
  // set up on load or home icon click
  const { userDetails, userRepos } = await getUserData(
    state.activeUserToken,
    "user"
  );
  const state_update = {
    activePage: "Home",
    activeUserDetails: userDetails,
    userRepos,
  };
  setState("setUp", state_update);
}

function setState(type, state_update) {
  // update state
  state = { ...state, ...state_update };
  render(type, state);
}

function render(type, state) {
  // takes care of dom manipulations
  switch (type) {
    case "setUp": {
      const homepage = createUserPageDOM(
        state.activeUserDetails,
        state.userRepos
      );
      document.querySelector(".data").innerHTML = homepage;
      break;
    }

    case "search": {
      const searchPage = createUserPageDOM(
        state.searchUser.userDetails,
        state.searchUser.userRepos
      );
      document.querySelector(".data").innerHTML = searchPage;
      document.querySelector("input[type=text]").value = "";
      break;
    }

    case "searchError": {
      document.querySelector(
        ".data"
      ).innerHTML = `<h1>${state.searchError}</h1>`;
      document.querySelector("input[type=text]").value = "";

      break;
    }

    default:
      break;
  }
}

function toggleSearch() {
  // toggle search input box
  document.querySelector(".search").classList.toggle("hidden");
  document.querySelector(".search_icon").classList.toggle("active");
}

async function searchFormSubmitted(event) {
  // on search form submit
  // set searchUser details or error if user not found
  event.preventDefault();
  try {
    const searchInput = document.querySelector("input[type=text]").value;
    const { userDetails, userRepos } = await getUserData(
      state.activeUserToken,
      searchInput
    );
    const stateUpdate = {
      activePage: "Search",
      searchUser: { userDetails, userRepos },
      searchError: "",
    };
    setState("search", stateUpdate);
  } catch (error) {
    // set user not found error
    setState("searchError", { searchError: "user not found" });
  }
}

setUp(state)
  .then(() => {
    document
      .querySelector(".search_icon")
      .addEventListener("click", toggleSearch);
    document.querySelector(".home_icon").addEventListener("click", () => {
      setState("setUp", { activePage: "Home" });
    });

    document.querySelector("form").onsubmit = searchFormSubmitted;
  })
  .catch((error) => {
    console.log(error);
  });
