const initialText = "你永远是bp50玩家";
const initialAudio = "bp.wav";
let currentState = {
    text: initialText,
    audio: initialAudio,
};

function updateOverlayText(seconds) {
    document.querySelector('.countdown').textContent = `正在初始化 还有${seconds}秒`;
}

function createImage() {
    const container = document.querySelector('.container');
    const img = document.createElement('img');
    img.src = 'O.png';
    img.className = 'image';
    container.appendChild(img);

    let height = 0;
    const increment = 10;
    const intervalTime = 1000;

    const interval = setInterval(() => {
        height += increment;
        img.style.height = height + '%';
        if (height >= 300) {
            clearInterval(interval);
            setTimeout(() => {
                img.style.opacity = '0';
                setTimeout(() => img.remove(), 1000);
            }, 1000);
        }
    }, intervalTime);
}

function startInitialization() {
    let countdown = 10;
    const overlay = document.querySelector('.overlay');
    const countdownInterval = setInterval(() => {
        updateOverlayText(countdown);
        countdown--;
        if (countdown < 0) {
            clearInterval(countdownInterval);
            overlay.querySelector('.countdown').textContent = '触碰任意位置以开始';
            overlay.classList.remove('initializing');
            enableUserInteraction(); // 启用用户交互
        }
    }, 1000);

    setInterval(createImage, 1000);
}

function enableUserInteraction() {
    const overlay = document.querySelector('.overlay');
    const buttonContainer = document.querySelector('.button-container');

    overlay.addEventListener('click', function() {
        if (!overlay.classList.contains('initializing')) {
            this.style.display = 'none';
            const audio = document.getElementById('bg-audio');
            audio.play().catch(error => {
                console.log('自动播放被阻止：', error);
            });
            document.querySelector('.center-text').style.display = 'block';
            buttonContainer.style.display = 'none'; // 初始化后隐藏按钮容器
        }
    });

    document.body.addEventListener('click', function(event) {
        if (!overlay.classList.contains('initializing') && overlay.style.display === 'none') {
            if (buttonContainer.style.display === 'none') {
                buttonContainer.style.display = 'flex';
            } else if (!event.target.closest('.button-container')) {
                buttonContainer.style.display = 'none';
            }
        }
    });
}

function updateState(newText, newAudio) {
    if (newText === currentState.text) {
        alert(`已经是${newText.split("你永远是")[1]}了`);
        return;
    }
    currentState.text = newText;
    currentState.audio = newAudio;

    document.querySelector('.center-text').textContent = newText;
    const audioElement = document.getElementById('bg-audio');
    audioElement.src = newAudio;
    audioElement.play().catch(error => {
        console.log('自动播放被阻止：', error);
    });

    document.querySelectorAll('.button-container button').forEach(button => {
        button.classList.remove('green');
    });
    document.getElementById(`button-${newText.split("你永远是")[1].toLowerCase()}`).classList.add('green');
}

document.getElementById('button-bp50').addEventListener('click', () => {
    updateState("你永远是bp50玩家", "bp.wav");
});

document.getElementById('button-mg42').addEventListener('click', () => {
    updateState("你永远是mg42玩家", "mg.wav");
});

document.getElementById('button-codm').addEventListener('click', () => {
    updateState("你永远是codm玩家", "codm.wav");
});

// 启动初始化过程
startInitialization();
