window.onload = async function loadData() {
    try {
        const response = await fetch('/data.json');
        const jsonData = await response.json();
        const container = document.getElementById('container');
        const template = container.innerHTML;
        container.innerHTML = '';
        jsonData.personal_data.forEach(item => {
            const newElement = document.createElement('div');
            newElement.innerHTML = template.replace(/{{(.*?)}}/g, (_, keyToReplace) => {
                return item[keyToReplace.trim()];
            });

            container.appendChild(newElement);
        });
        if (document.getElementById("smallProfileImage")) {
            document.getElementById("smallProfileImage").src = jsonData.profileImage;
        }
    } catch (erro) {
        console.error('Erro ao carregar o JSON:', erro);
    }
    showLeftManelIfDesktop();
}

function isMobile() {
    return /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
}

function showLeftManelIfDesktop() {
    const leftPanel = document.getElementById("leftPanel");
    if (isMobile()) {
        leftPanel.style.display = "none";
    } else {
        leftPanel.style.display = "block";
    }
}