const searchUser = document.getElementById("searchUser");

searchUser.addEventListener("keyup", e => {
  // get input text
  userText = e.target.value;

  if (userText != "") {
    const fetchUser = async () =>
      await (await fetch("/./netlify/functions/getuser", {
        method: "POST",
        body: JSON.stringify({ user: userText })
      })).json();

    fetchUser()
      .then(data => {
        console.log(data);
        showProfile(data);
      })
      .catch(err => {
        console.log(err);
      });
  } else {
    // clear profile
    clearProfile();
  }
});

const showProfile = user => {
  const profile = document.querySelector("#profile");
  const profileHtml = ` <div class="card card-body mb-3">
    <div class="row">
        <div class="col-md-3">
            <img src="${user.avatar_url}" alt="" class="img-fluid mb-2">
            <a href="${
              user.html_url
            }" target="_blank" class="btn btn-primary btn-block mb-4">View Profile</a>
        </div>
        <div class="col-md-9">
            <span class="badge badge-primary">Public Repos: ${
              user.public_repos
            }</span>
            <span class="badge badge-secondary">Public GISTs: ${
              user.public_gists
            }</span>
            <span class="badge badge-success">Followers: ${
              user.followers
            }</span>
            <span class="badge badge-info">Following: ${user.following}</span>
            <br>
            <br>
            <ul class="list-group">
                <li class="list-group-item">Company: ${user.company}</li>
                <li class="list-group-item">Website: ${user.blog}</li>
                <li class="list-group-item">Location: ${user.location}</li>
                <li class="list-group-item">Member Since: ${
                  user.created_at
                }</li>
            </ul>
        </div>
        </div>
    </div>
</div>
</div>
`;

  profile.innerHTML = profileHtml;
};

const clearProfile = () => {
  const profile = document.querySelector("#profile");
  profile.innerHTML = "";
};
