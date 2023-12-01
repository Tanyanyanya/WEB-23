// Submit event listener
const form = document.getElementById("form");
form.addEventListener("submit", handleSubmit)

// Regex
const nameRegex = /[a-zA-Zа-яА-Я]+\s[A-ZА-Я][.][A-ZА-Я]$/;
const groupRegex = /[A-Z]{2}[-][0-9]{2}$/;
const phoneRegex = /[(]\d{3}[)]\d{3}[-]\d{2}[-]\d{2}/;
const addressRegex = /(м.)\s[А-Я][а-я]+/
const emailRegex = /[\w]{3,}[@][\w]{2,}(.com)$/

// Alerts
const alerts = {
    name: "ПІБ має бути представлений як прізвище та ініціали. Приклад - Луговець Т.І.",
    group: "Зазанчте коректну назву групи. Приклад - ІТ-02",
    phone: "Зазначте коректний номер телефону. Приклад - (050)-000-00-00",
    address: "Зазначте місто вашого проживання. Приклад - м. Київ",
    email: "Зазнчте коректну адресу електронної пошти. Приклад - asdfgh@gmail.com"
}

function handleSubmit() {
    const data = {
        name: document.querySelector("#name").value,
        group: document.querySelector("#group").value,
        phone: document.querySelector("#phone").value,
        address: document.querySelector("#address").value,
        email: document.querySelector("#email").value
    }
    if(!isValid(data)) showErrors(findInvalidFields(findFieldsState(data)))
}

// Validation
const nameIsValid = name => nameRegex.test(name)

const groupIsValid = group => groupRegex.test(group)

const phoneIsValid = phone => phoneRegex.test(phone)

const addressIsValid = address => addressRegex.test(address)

const emailIsValid = email => emailRegex.test(email)

function isValid(data) {
    return data != null
            && nameIsValid(data.name)
            && groupIsValid(data.group)
            && phoneIsValid(data.phone)
            && addressIsValid(data.address)
            && emailIsValid(data.email)
}

function findFieldsState(data) {
    return {
        name: nameIsValid(data.name),
        group: groupIsValid(data.group),
        phone: phoneIsValid(data.phone),
        address: addressIsValid(data.address),
        email: emailIsValid(data.email)
    }
}

function findInvalidFields(state) {
    const invalidFields = []
    for (key in state) {
        if (!state[key]) invalidFields.push(key)
    }
    return invalidFields
}

// Errors on UI
showErrors = fieldsId => {
    for (let i in fieldsId) {
        let id = fieldsId[i]
        setStyleForInvalidFields(id)
        showAlert(id)
    }
}

setStyleForInvalidFields = id => {
    field = document.querySelector(`#${id}`)
    field.style.setProperty('color', 'rgb(145, 16, 16)', 'important')
    const text = field.value
    field.value = text
}

showAlert = id => alert(alerts[`${id}`])


// colorful table code

const randomColor = () => {
    const random = () => Math.floor(Math.random() * 255);
  
    return {
      r: random(),
      g: random(),
      b: random(),
    };
  };
  
  const blackOrWhiteHex = (color) => {
    return color.r * 0.299 + color.g * 0.587 + color.b * 0.114 > 186
      ? "#000000"
      : "#FFFFFF";
  };
  
  const hexToRGBColor = (hex) => {
    if (hex.indexOf("#") === 0) {
      hex = hex.slice(1);
    }
  
    if (hex.length !== 6) {
      throw new Error("Invalid HEX color.");
    }
  
    let r = parseInt(hex.slice(0, 2), 16),
      g = parseInt(hex.slice(2, 4), 16),
      b = parseInt(hex.slice(4, 6), 16);
  
    return {
      r,
      g,
      b,
    };
  };
  
  const addTableEventHandlers = () => {
    const special = document.getElementById("special");
    const initialBckgColor = special.style.backgroundColor;
    const initialTextColor = special.style.color;
  
    const colorPicker = document.getElementById("color-picker");
  
    special.addEventListener("mouseover", (e) => {
      const color = randomColor();
      e.target.style.backgroundColor = `rgb(${color.r}, ${color.g}, ${color.b})`;
      e.target.style.color = blackOrWhiteHex(color);
    });
  
    special.addEventListener("mouseout", (e) => {
      e.target.style.backgroundColor = initialBckgColor;
      e.target.style.color = initialTextColor;
    });
  
    special.addEventListener("click", (e) => {
      e.target.style.backgroundColor = colorPicker.value;
      e.target.style.color = blackOrWhiteHex(hexToRGBColor(colorPicker.value));
    });
  
    special.addEventListener("dblclick", (e) => {
      for (let cell of document.querySelectorAll("#table6x6 td")) {
        cell.style.backgroundColor = colorPicker.value;
        cell.style.color = blackOrWhiteHex(hexToRGBColor(colorPicker.value));
      }
  
      e.target.style.backgroundColor = initialBckgColor;
      e.target.style.color = initialTextColor;
    });
  };
  
  // adding event handlers
  
  addTableEventHandlers();