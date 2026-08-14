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

  await fetch("./../../../api/auth/send_verification_code.php", {
    method: "POST",
    body: data,
  });

  emailForm.classList.add("hidden");
  codeForm.classList.remove("hidden");
  resendCodeLink.classList.remove("hidden");
};

codeForm.onsubmit = async (e) => {
  e.preventDefault();
  const data = new FormData(codeForm);

  const res = await fetch("./../../../api/auth/verify_code.php", {
    method: "POST",
    body: data,
  });
  const result = await res.text();

  if (result === "OK") {
    codeForm.classList.add("hidden");
    userDataForm.classList.remove("hidden");
  }
};

resendCodeLink.addEventListener("click", async () => {
  const data = new FormData(emailForm);
  const res = await fetch("./../../../api/auth/send_verification_code.php", {
    method: "POST",
    body: data
  });
  const text = await res.text();
  console.log(text);
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

    const res = await fetch("./../../../api/auth/register.php", {
      method: "POST",
      body: data,
    });
    const result = await res.text();

    if (result === "OK") {
      window.location.href = "./../app.html";
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
          img.src = "assets/images/hide.png";
        });
      } else if (input.type === "text") {
        input.type = "password";
        showPswrdImgs.forEach((img) => {
          img.src = "assets/images/show.png";
        });
      }
    });
  });
});
