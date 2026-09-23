const qrText = document.getElementById("qrText");

const qrSize = document.getElementById("qrSize");

const errorLevel = document.getElementById("errorLevel");

const generateBtn = document.getElementById("generateBtn");

const clearBtn = document.getElementById("clearBtn");

const downloadBtn = document.getElementById("downloadBtn");

const qrContainer = document.getElementById("qrContainer");

const statusText = document.getElementById("status");


let currentQRCode = null;


// ===============================
// GENERATE QR CODE
// ===============================

function generateQR() {

    const text = qrText.value.trim();

    if (text === "") {

        alert("Please enter some text or URL.");

        qrText.focus();

        return;
    }


    // Clear old QR
    qrContainer.innerHTML = "";


    const size = parseInt(qrSize.value);


    // Get error correction level
    let correctionLevel;

    switch (errorLevel.value) {

        case "L":
            correctionLevel = QRCode.CorrectLevel.L;
            break;

        case "M":
            correctionLevel = QRCode.CorrectLevel.M;
            break;

        case "Q":
            correctionLevel = QRCode.CorrectLevel.Q;
            break;

        case "H":
            correctionLevel = QRCode.CorrectLevel.H;
            break;
    }


    // Create QR
    currentQRCode = new QRCode(qrContainer, {

        text: text,

        width: size,

        height: size,

        colorDark: "#000000",

        colorLight: "#ffffff",

        correctLevel: correctionLevel

    });


    statusText.textContent = "QR Code generated successfully!";

    downloadBtn.disabled = false;
}


// ===============================
// DOWNLOAD QR
// ===============================

function downloadQR() {

    if (!currentQRCode) {

        return;
    }


    // QRCode.js generates canvas/image
    const canvas = qrContainer.querySelector("canvas");

    const image = qrContainer.querySelector("img");


    let downloadURL;


    if (canvas) {

        downloadURL = canvas.toDataURL("image/png");

    } else if (image) {

        downloadURL = image.src;

    } else {

        alert("Unable to download QR code.");

        return;
    }


    const link = document.createElement("a");

    link.href = downloadURL;

    link.download = "my-qr-code.png";

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);
}


// ===============================
// CLEAR
// ===============================

function clearQR() {

    qrText.value = "";

    qrContainer.innerHTML = `

        <div class="empty-state">

            <div class="empty-icon">▦</div>

            <p>Your QR code will appear here</p>

        </div>

    `;

    statusText.textContent =
        "Enter something and generate your QR code.";

    downloadBtn.disabled = true;

    currentQRCode = null;
}


// ===============================
// EVENTS
// ===============================

generateBtn.addEventListener(
    "click",
    generateQR
);


clearBtn.addEventListener(
    "click",
    clearQR
);


downloadBtn.addEventListener(
    "click",
    downloadQR
);


// Generate using Ctrl + Enter
qrText.addEventListener(
    "keydown",
    function (event) {

        if (event.ctrlKey && event.key === "Enter") {

            generateQR();

        }

    }
);
