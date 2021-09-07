const storage = {
    get: (key) => {
      const data = JSON.parse(localStorage.getItem(key));
      return data;
    },
    post: (key, payload) => {
      localStorage.setItem(key, JSON.stringify(payload));
    },
    put: (key, payload) => {
      if (localStorage.hasOwnProperty(key)) {
        localStorage.setItem(key, JSON.stringify(payload));
      } else {
        alert(`Diretório: ${key} não existe!`);
      }
    },
    patch: (key, payload) => {
      if (localStorage.hasOwnProperty(key)) {
        const oldData = storage.get(key);
        const newData = { ...oldData, payload };
        storage.post(key, JSON.stringify(newData));
      } else {
        alert(`Diretório: ${key} não existe!`);
      }
    },
    delete: (key) => {
      localStorage.removeItem(key);
    },
  };
  
  function handleSubmit(e) {
    e.preventDefault();
  
    const signatureData = {
      firstName: e.target.elements.firstName.value,
      lastName: e.target.elements.lastName.value,
      address: e.target.elements.address.value,
      email: e.target.elements.email.value,
      phone1: e.target.elements.phone1.value,
      phone2: e.target.elements?.phone2.value
      
    };
  
    storage.post("@Energy/signature", signatureData);
    window.location.href = "./assinatura.html";
  }
  
  function getSignatureData() {
    let data;
  
    if (localStorage.hasOwnProperty("@Energy/signature")) {
      data = storage.get("@Energy/signature");
    } else {
      const urlParams = new URLSearchParams(location.search);
  
      data = {
        firstName: urlParams.get("firstName"),
        lastName: urlParams.get("lastName"),
        address: urlParams.get("address"),
        email: urlParams.get("email"),
        phone1: urlParams.get("phone1"),
        phone2: urlParams.get("phone2"),
      };
    }
    return data;
  }
  
  function hydrateSignatureData() {
    const data = getSignatureData();
    const fullName = data.firstName + " " + data.lastName
    document.getElementById("fullName").innerHTML = fullName;
    document.getElementById("address").innerHTML = data.address;
    document.getElementById("email").innerHTML = data.email;
    document.getElementById("phone1").innerHTML = data.phone1;
    document.getElementById("phone2").innerHTML = data.phone2;
  }