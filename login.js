let loginForm = document.getElementById("login-form");
let showPswrdBtn = document.getElementById('show-pswrd-btn')

loginForm.onsubmit = async (e) => {
  e.preventDefault();
  const data = new FormData(loginForm);

  try {
    const res = await fetch("./front_api/login.php", {
      method: "POST",
      body: data,
    });

    console.log(res);
    const mensaje = await res.text();

    if (mensaje === "OK") {
      window.location.href = "./app.html";
    } else {
      alert(mensaje);
    }
  } catch (error) {
    console.log(error);
  }
};

showPswrdBtn.addEventListener('click', ()=>{
  const passwordInput = document.getElementById('login-psswrd');
  const showPswrdImg = document.getElementById('show-pswrd-img');
  
  if (passwordInput.type === "password"){
    passwordInput.type = "text";
    showPswrdImg.src = "assets/hide.png"
  } else if (passwordInput.type === "text"){
    passwordInput.type = "password";
    showPswrdImg.src = "assets/show.png"
  }
})