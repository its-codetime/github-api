export function createUserPageDOM(user, repos) {
  const userPage = createUserCardDOM(user);
  const repoList = createRepoListDOM(repos);
  return `
		<section class='homepage'>
			${userPage + repoList}
		</section>
	`;
}

function createUserCardDOM(user) {
  const userDetails = `
		<article class="user-details">
			<div class="user-details-avatar">
				<img src="${user.avatar_url}" alt="${user.login}" />
			</div>
			<div class="user-details-info">
				<h2 class="user-details-name">${user.login}</h2>
				${user.bio ? `<p class="user-details-bio">${user.bio}</p>` : ``}
				<span>
					followers : ${user.followers}
				</span>
				<span>
					following : ${user.following}
				</span>
				<a href="${
          user.html_url
        }" target="_blank" class="user-details-url">link to github</a>
			</div>					
		</article>
	`;

  return userDetails;
}

function createRepoListDOM(repos) {
  const repoList = `
	<section class="repo-list">
		<h2>Public Repos</h2>
		<ul>
			${repos.map((repo) => createRepoCardDOM(repo)).join("")}
		</ul>
	</section>
	`;
  return repoList;
}

function createRepoCardDOM(repo) {
  const repoCard = `
		
	<li class="repo-item">
		<h3>${repo.name}</h3>
		<div class="repo-details">
			<span>forks: ${repo.forks}</span>
			<span>stars: ${repo.stargazers_count}</span>
			${
        repo.html_url
          ? `<a href="${repo.html_url}" target="_blank">github link</a>`
          : ``
      }
			${
        repo.homepage
          ? `<a href="${repo.homepage}" target="_blank">deployed url</a>`
          : ``
      }
		</div>
	</li>

	`;

  return repoCard;
}
