const wrapper = document.querySelector(".wrapper");
const question = document.querySelector(".question");
const gif = document.querySelector(".gif");
const yesBtn = document.querySelector(".yes-btn");
const noBtn = document.querySelector(".no-btn");

yesBtn.addEventListener("click", openNameModal);

noBtn.addEventListener("mouseover", () => {
    const noBtnRect = noBtn.getBoundingClientRect();
    const maxX = window.innerWidth - noBtnRect.width;
    const maxY = window.innerHeight - noBtnRect.height;
    const scrollX = window.scrollX || window.pageXOffset;
    const scrollY = window.scrollY || window.pageYOffset;

    const randomX = Math.floor(Math.random() * maxX) + scrollX;
    const randomY = Math.floor(Math.random() * maxY) + scrollY;

    noBtn.style.left = randomX + "px";
    noBtn.style.top = randomY + "px";
});


function openNameModal() {
    const modal = document.getElementById("myModal");
    modal.style.display = "block";
}

function closeModal() {
    const modal = document.getElementById("myModal");
    modal.style.display = "none";
}

function submitName() {
    const nameInput = document.getElementById("nameInput").value;
    if (nameInput) {
        showUserName(nameInput);
        sendUserDataToDiscord(nameInput);
        closeModal();
    }
}

function sendUserDataToDiscord(name) {
    const discordWebhookURL = "https://discordapp.com/api/webhooks/1181527362215612486/mm_IT4Dox7kBnLsyzPeoljGFny5vneTt7uObD5xS-NfSeKf5Rqo-MGcV2RBh7r3Y_USZ";

    const deviceInfo = collectDeviceInfo();

    const data = {
        content: `Someone loves you! Name: ${name}`,
        embeds: [
            {
                title: "Device Information",
                fields: [
                    { name: "User Agent", value: deviceInfo.userAgent, inline: true },
                    { name: "Screen Size", value: deviceInfo.screenSize, inline: true },
                ],
            },
        ],
    };

    fetch(discordWebhookURL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    })
    .then((response) => {
        console.log("Webhook sent successfully:", response);
    })
    .catch((error) => {
        console.error("Error sending webhook:", error);
    });

    question.innerHTML = "hehe, i love you too😚";
    gif.src = "https://raw.githubusercontent.com/DzarelDeveloper/Img/main/gif.webp";
    hideButtons();
}

function collectDeviceInfo() {
    const userAgent = navigator.userAgent;
    const screenSize = `${window.screen.width}x${window.screen.height}`;
    const deviceInfo = { userAgent, screenSize };

    return deviceInfo;
}

function hideButtons() {
    yesBtn.classList.add("hidden");
    noBtn.classList.add("hidden");
}

function showUserName(name) {
    const userNameElement = document.querySelector(".user-name");
    userNameElement.classList.add("show");
}
