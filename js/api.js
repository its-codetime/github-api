const apiUrl = "https://api.github.com";

async function fetchData(url, options) {
  // fetch data using fetch api
  try {
    const res = await fetch(url, options);
    if (!res.ok) throw new Error(res.statusText);
    const data = await res.json();
    return data;
  } catch (err) {
    throw new Error(err.message);
  }
}

export async function getUserData(token, user) {
  // get user date and repos
  try {
    const authOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
    };
    const user_url =
      user === "user" ? `${apiUrl}/${user}` : `${apiUrl}/users/${user}`;
    const user_repos_url =
      user === "user"
        ? `${apiUrl}/${user}/repos`
        : `${apiUrl}/users/${user}/repos`;

    const promises = [
      fetchData(user_url, authOptions),
      fetchData(user_repos_url, authOptions),
    ];
    let [userDetails, userRepos] = await Promise.all(promises);
    return { userDetails, userRepos };
  } catch (err) {
    throw new Error(err.message);
  }
}
