const fetchUsers = async () =>
  await (await fetch("/.netlify/functions/getUsers")).json();

fetchUsers().then(data => {
  // console.log(data.items);

  const userList = document.querySelector("#users");
  const userCount = document.getElementById("user-count");
  userCount.appendChild(
    document.createTextNode(`Total SU Github Users: ${data.total_count} 🇸🇷`)
  );
  users = data.items;
  console.log(users);

  users.forEach(user => {
    const li = document.createElement("li");
    const image = document.createElement("img");
    image.className = "img-fluid rounded-circle mr-4";
    image.style.width = "10%";
    image.style.height = "10%";
    image.src = user.avatar_url;
    li.className = "list-group-item";
    const link = document.createElement("a");
    link.appendChild(document.createTextNode(user.login));
    link.href = user.html_url;
    link.target = "_blank";
    li.appendChild(image);
    li.appendChild(link);
    userList.appendChild(li);
  });

  // data.forEach(user => {
  //   console.log(user);

  //   // const li = document.createElement("li");
  //   // li.className = "list-group-item";
  //   // const link = document.createElement("a");
  //   // link.appendChild(document.createTextNode(user.login));
  //   // link.href = user.html_url;
  //   // link.target = "_blank";
  //   // li.appendChild(link);
  //   // userList.appendChild(li);
  // });
});
