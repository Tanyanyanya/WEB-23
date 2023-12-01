const fetchUsers = (count = 5) => {
  fetch(`https://randomuser.me/api?results=${count}`)
    .then((resp) => resp.json())
    .then((data) => {
      let users = [];

      for (let item of data.results) {
        users.push(mapUser(item));
      }

      return users;
    })
    .then((data) => {
      const container = document.getElementById("info");
      container.innerHTML = "";

      document.querySelector(".warning").innerHTML = "";

      for (let user of data) {
        let elem = createUserElement(user);
        container.appendChild(elem);
      }
    })
    .catch((err) => {
      document.querySelector(".warning").innerHTML = err;
    });
};

const mapUser = (data) => {
  return {
    picture: data.picture.large,
    location: `${data.location.city}, ${data.location.street.name} ${data.location.street.number}`,
    country: data.location.country,
    email: data.email, 
    coordinates: `${data.location.coordinates.latitude}, ${data.location.coordinates.longitude}`,
  };
};

const createUserElement = (user) => {
  const elem = document.createElement("div");

  appendPhoto(elem, user.picture);

  const text = document.createElement("div");
  elem.appendChild(text);

  elem.classList.add("user");
  text.classList.add("user-info");

  appendText(text, `Location: ${user.location}`);
  appendText(text, `Country: ${user.country}`);
  appendText(text, `Email: ${user.email}`);
  appendText(text, `Coordinates: ${user.coordinates}`);

  return elem;
};

const appendPhoto = (parent, url) => {
  const img = document.createElement("img");
  img.src = url;
  img.classList.add("photo");

  parent.appendChild(img);
};

const appendText = (parent, text) => {
  const p = document.createElement("p");
  p.textContent = text;

  parent.appendChild(p);
};

const handleDownload = () => {
  fetchUsers(5);
};

const addEventHandlers = () => {
  const btn = document.getElementById("download-btn");
  btn.addEventListener("click", handleDownload);
};

addEventHandlers();
