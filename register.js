const showPswrdBtns = document.querySelectorAll(".toggle-show-pswrd");

const emailForm = document.getElementById("email-form");
const codeForm = document.getElementById("verif-code-form");
const userDataForm = document.getElementById("user-data-form");

const resendCodeLink = document.getElementById("resend-link");
const countdown = document.getElementById("resend-code-countdown");

emailForm.onsubmit = async (e) => {
  e.preventDefault();
  const data = new FormData(emailForm);

  if (data.get("email") === "") {
    return;
  }

  await fetch("./api/send_verification_code.php", {
    method: "POST",
    body: data,
  });

  emailForm.classList.add("hidden");
  codeForm.classList.remove("hidden");
  resendCodeLink.classList.remove('hidden')
};

codeForm.onsubmit = async (e) => {
  e.preventDefault();
  const data = new FormData(codeForm);

  const res = await fetch("./api/verify_code.php", {
    method: "POST",
    body: data,
  });
  const result = await res.text();

  if (result === "OK") {
    codeForm.classList.add("hidden");
    userDataForm.classList.remove("hidden");
  }
};


resendCodeLink.addEventListener("click", () => {
  const data = new FormData(emailForm);
  fetch("./api/send_verification_code.php", {
    method: "POST",
    data,
  });
  iniciarEspera();
});

function iniciarEspera() {
  let segundos = 60;

  resendCodeLink.disabled = true;
  countdown.textContent = ` (${segundos}s)`;

  const intervalo = setInterval(() => {
    segundos--;
    countdown.textContent = ` (${segundos}s)`;

    if (segundos === 0) {
      clearInterval(intervalo);
      resendCodeLink.disabled = false;
      countdown.textContent = "";
    }
  }, 1000);
}

userDataForm.onsubmit = async (e) => {
  e.preventDefault();
  const pswrdInput = document.getElementById("pswrd-input");
  const confirmPswrdInput = document.getElementById("confirm-pswrd-input");

  if (pswrdInput.value === confirmPswrdInput.value) {
    const data = new FormData(userDataForm);

    const res = await fetch("./front_api/register.php", {
      method: "POST",
      body: data,
    });
    const result = await res.text();

    if (result === "OK") {
      window.location.href = "./app.html";
    }
  } else {
    alert("Las contraseñas no coinciden");
  }
};

showPswrdBtns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    const passwordInputs = document.querySelectorAll("div.pswrd input");
    const showPswrdImgs = document.querySelectorAll(".toggle-show-pswrd img");

    passwordInputs.forEach((input) => {
      if (input.type === "password") {
        input.type = "text";
        showPswrdImgs.forEach((img) => {
          img.src = "assets/hide.png";
        });
      } else if (input.type === "text") {
        input.type = "password";
        showPswrdImgs.forEach((img) => {
          img.src = "assets/show.png";
        });
      }
    });
  });
});

/* registerForm.onsubmit = async (e) => {
  e.preventDefault();
  const datos = new FormData(registerForm); */

/*   await fetch("./front_api/register.php", {
    method: "POST",
    body: datos,
  }); */

/*   window.location.href = "./login.html"; */

/* showPswrdBtn.addEventListener('click', ()=>{
  const passwordInput = document.getElementById('register-psswrd');
  const showPswrdImg = document.getElementById('show-pswrd-img');
  
  if (passwordInput.type === "password"){
    passwordInput.type = "text";
    showPswrdImg.src = "assets/hide.png"
  } else if (passwordInput.type === "text"){
    passwordInput.type = "password";
    showPswrdImg.src = "assets/show.png"
  }
}) */
/* 
verifyEmailBtn.addEventListener("click", () => {
  const data = new FormData(registerForm);
  fetch("./api/send_verification_code.php", {
    method: "POST",
    body: data,
  });
  if (!document.getElementById("resend-code-link")) {
    createResendCode(data);
  }
});

function createResendCode(data) {
  const a = document.createElement("a");
  a.id = "resend-code-link";
  a.innerText = "Reenviar código";
  a.href = "#";
  a.addEventListener("click", () => {
    fetch("./api/send_verification_code.php", {
      method: "POST",
      body: data,
    });
  });
  const registerSection = document.querySelector(".register");
  registerSection.appendChild(a);
}

verifyCode.onsubmit = (e) => {
  e.preventDefault();

  const data = new FormData();
  data.append("email", document.getElementById("register-email").value);
  data.append("codigo", document.getElementById("verify-code").value);

  fetch("./api/verify_code.php", {
    method: "POST",
    body: data,
  });
};
 */
