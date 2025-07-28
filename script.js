// Prize Wheel with Spinning Functionality for StreamElements
let isSpinning = false;
let currentRotation = 0;
let fieldData = {};
let cooldownActive = false;
let userPoints = {};
let isVisible = true;
let hideTimeout = null;

// Default segments - will be overridden by custom prizes
let segments = [
    { text: "Prize A", value: "🎁 Congratulations! You won Prize A!" },
    { text: "Prize B", value: "🏆 Amazing! You won Prize B!" },
    { text: "Prize C", value: "⭐ Fantastic! You won Prize C!" },
    { text: "Prize D", value: "🎉 Excellent! You won Prize D!" },
    { text: "Prize E", value: "💎 Wonderful! You won Prize E!" },
    { text: "Prize F", value: "🌟 Great job! You won Prize F!" },
    { text: "Prize G", value: "🎊 Superb! You won Prize G!" },
    { text: "Prize H", value: "🏅 Outstanding! You won Prize H!" }
];

// Settings with defaults
const settings = {
    spinCommand: "!spin",
    spinDuration: 4,
    wheelPrimaryColor: "#DDD6FE",
    wheelSecondaryColor: "#C4B5FD", 
    textColor: "#000000",
    pointerColor: "#8B5CF6",
    starColor: "#FFD700",
    confettiColor: "#FFD700",
    fontFamily: "Bitcount Single",
    fontSize: 12,
    wheelSize: 300,
    marginTop: 0,
    marginLeft: 0,
    textAlignment: "center",
    longTextHandling: "truncate",
    pointsFollower: 10,
    pointsSubscriber: 25,
    pointsDonation: 50,
    pointsBits: 30,
    hideWhenInactive: false,
    showStars: true,
    enableConfetti: true,
    hideAfterSeconds: 10,
    infiniteEntries: false,
    manualSpinOnly: false,
    cooldown: 30,
    userLevel: "everyone",
    triggerEvent: "command"
};

// Update settings from fieldData
function updateSettings() {
    Object.keys(settings).forEach(key => {
        if (fieldData[key] !== undefined) {
            settings[key] = fieldData[key];
        }
    });
    
    // Handle custom prizes
    if (fieldData.customPrizes) {
        const customPrizesList = fieldData.customPrizes.split('\n').filter(p => p.trim());
        customPrizesList.forEach((prize, index) => {
            if (index < 8 && segments[index]) {
                segments[index].value = prize.trim();
                segments[index].text = `Prize ${String.fromCharCode(65 + index)}`;
            }
        });
    }
    
    console.log('Settings updated:', settings);
}

// Apply dynamic styling based on settings
function applyCustomStyling() {
    const styleElement = document.createElement('style');
    styleElement.id = 'dynamic-styles';
    
    // Remove existing dynamic styles
    const existingStyle = document.getElementById('dynamic-styles');
    if (existingStyle) {
        existingStyle.remove();
    }
    
    const css = `
        body {
            font-family: '${settings.fontFamily}', monospace;
        }
        
        .container {
            margin-top: ${settings.marginTop}vh;
            margin-left: ${settings.marginLeft}vw;
            ${settings.hideWhenInactive && !isVisible ? 'opacity: 0; pointer-events: none;' : ''}
        }
        
        .wheel {
            width: ${settings.wheelSize}px;
            height: ${settings.wheelSize}px;
            transition: transform ${settings.spinDuration}s cubic-bezier(0.17, 0.67, 0.12, 0.99);
        }
        
        .segment-text {
            font-family: '${settings.fontFamily}', monospace;
            font-size: ${settings.fontSize}px;
            fill: ${settings.textColor};
            text-anchor: ${settings.textAlignment};
        }
        
        .random-star {
            color: ${settings.starColor};
            ${!settings.showStars ? 'display: none;' : ''}
        }
        
        .fixed-pointer path {
            fill: ${settings.pointerColor};
        }
        
        .fixed-pointer circle {
            fill: ${settings.pointerColor};
        }
        
        /* Dynamic segment colors */
        svg path[fill="#DDD6FE"] {
            fill: ${settings.wheelPrimaryColor};
        }
        
        svg path[fill="#C4B5FD"] {
            fill: ${settings.wheelSecondaryColor};
        }
        
        .confetti {
            color: ${settings.confettiColor};
        }
    `;
    
    styleElement.textContent = css;
    document.head.appendChild(styleElement);
}

// Confetti effect
function createConfetti() {
    if (!settings.enableConfetti) return;
    
    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.position = 'absolute';
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.top = '-10px';
        confetti.style.fontSize = Math.random() * 10 + 10 + 'px';
        confetti.style.color = settings.confettiColor;
        confetti.style.pointerEvents = 'none';
        confetti.style.zIndex = '1000';
        confetti.textContent = ['🎉', '🎊', '⭐', '✨', '🌟'][Math.floor(Math.random() * 5)];
        
        document.body.appendChild(confetti);
        
        const fall = confetti.animate([
            { transform: 'translateY(-10px) rotate(0deg)', opacity: 1 },
            { transform: `translateY(${window.innerHeight + 10}px) rotate(360deg)`, opacity: 0 }
        ], {
            duration: Math.random() * 2000 + 1000,
            easing: 'linear'
        });
        
        fall.onfinish = () => confetti.remove();
    }
}

// Point system management
function updateUserPoints(username, eventType, amount = null) {
    if (!settings.infiniteEntries) return true;
    
    if (!userPoints[username]) {
        userPoints[username] = 0;
    }
    
    let pointsToAdd = 0;
    
    switch (eventType) {
        case 'follow':
            pointsToAdd = settings.pointsFollower;
            break;
        case 'subscriber':
            pointsToAdd = settings.pointsSubscriber;
            break;
        case 'donation':
            pointsToAdd = Math.floor((amount || 1) * settings.pointsDonation);
            break;
        case 'cheer':
            pointsToAdd = Math.floor(((amount || 100) / 100) * settings.pointsBits);
            break;
    }
    
    userPoints[username] += pointsToAdd;
    return userPoints[username] > 0;
}

function deductPoints(username) {
    if (!settings.infiniteEntries) return true;
    
    if (userPoints[username] && userPoints[username] > 0) {
        userPoints[username]--;
        return true;
    }
    return false;
}

// Handle text overflow based on settings
function handleTextOverflow(textElement, maxLength = 10) {
    const text = textElement.textContent;
    
    switch (settings.longTextHandling) {
        case 'truncate':
            if (text.length > maxLength) {
                textElement.textContent = text.substring(0, maxLength - 3) + '...';
            }
            break;
        case 'wrap':
            // For SVG text wrapping would need tspan elements - simplified here
            break;
        case 'shrink':
            if (text.length > maxLength) {
                const scale = maxLength / text.length;
                textElement.style.fontSize = (settings.fontSize * scale) + 'px';
            }
            break;
    }
}

// Widget visibility management
function showWidget() {
    isVisible = true;
    document.querySelector('.container').style.opacity = '1';
    document.querySelector('.container').style.pointerEvents = 'auto';
    
    if (hideTimeout) {
        clearTimeout(hideTimeout);
    }
    
    if (settings.hideAfterSeconds > 0) {
        hideTimeout = setTimeout(hideWidget, settings.hideAfterSeconds * 1000);
    }
}

function hideWidget() {
    if (settings.hideWhenInactive) {
        isVisible = false;
        document.querySelector('.container').style.opacity = '0';
        document.querySelector('.container').style.pointerEvents = 'none';
    }
}

// StreamElements Widget API Integration
window.addEventListener('onWidgetLoad', function (obj) {
    fieldData = obj.detail.fieldData || {};
    updateSettings();
    applyCustomStyling();
    
    // Apply text overflow handling to existing text elements
    document.querySelectorAll('.segment-text').forEach(textElement => {
        handleTextOverflow(textElement);
    });
    
    console.log('StreamElements Spin Wheel Widget Loaded');
    
    if (settings.hideWhenInactive) {
        hideWidget();
    }
});

window.addEventListener('onEventReceived', function (obj) {
    if (!obj.detail.event) return;
    
    const event = obj.detail.event;
    const data = obj.detail;
    
    // Show widget when event received
    if (settings.hideWhenInactive) {
        showWidget();
    }
    
    // Handle different event types based on configuration
    const triggerEvent = settings.triggerEvent;
    
    if (triggerEvent === 'command' && event.type === 'message') {
        handleChatCommand(event);
    } else if (triggerEvent === 'follow' && event.type === 'follow') {
        updateUserPoints(event.data.displayName, 'follow');
        if (!settings.manualSpinOnly) {
            spinWheelWithDelay();
        }
    } else if (triggerEvent === 'donation' && event.type === 'donation') {
        updateUserPoints(event.data.displayName, 'donation', event.data.amount);
        if (!settings.manualSpinOnly) {
            spinWheelWithDelay();
        }
    } else if (triggerEvent === 'subscriber' && event.type === 'subscriber') {
        updateUserPoints(event.data.displayName, 'subscriber');
        if (!settings.manualSpinOnly) {
            spinWheelWithDelay();
        }
    } else if (triggerEvent === 'cheer' && event.type === 'cheer') {
        updateUserPoints(event.data.displayName, 'cheer', event.data.amount);
        if (!settings.manualSpinOnly) {
            spinWheelWithDelay();
        }
    }
});

function handleChatCommand(event) {
    const message = event.data.text.toLowerCase().trim();
    const commandName = settings.spinCommand.toLowerCase();
    
    if (message === commandName || message.startsWith(commandName + ' ')) {
        // Check cooldown
        if (cooldownActive) {
            console.log('Spin wheel on cooldown');
            return;
        }
        
        // Check user level permissions
        if (!checkPermissions(event.data, settings.userLevel)) {
            console.log('User does not have permission to use spin wheel');
            return;
        }
        
        // Check points if infinite entries is enabled
        if (settings.infiniteEntries && !deductPoints(event.data.displayName)) {
            console.log('User does not have enough points');
            return;
        }
        
        spinWheelWithDelay();
        applyCooldown();
    }
}

function checkPermissions(userData, requiredLevel) {
    switch (requiredLevel) {
        case 'broadcaster':
            return userData.badges && userData.badges.broadcaster;
        case 'moderator':
            return (userData.badges && userData.badges.broadcaster) || 
                   (userData.badges && userData.badges.moderator);
        case 'subscriber':
            return (userData.badges && userData.badges.broadcaster) || 
                   (userData.badges && userData.badges.moderator) ||
                   (userData.badges && userData.badges.subscriber);
        case 'everyone':
        default:
            return true;
    }
}

function applyCooldown() {
    const cooldownTime = settings.cooldown * 1000;
    cooldownActive = true;
    
    setTimeout(() => {
        cooldownActive = false;
    }, cooldownTime);
}

function spinWheelWithDelay() {
    setTimeout(() => {
        spinWheel();
    }, 500);
}

function spinWheel() {
    if (isSpinning) return;
    
    isSpinning = true;
    const wheel = document.getElementById('wheel');
    const result = document.getElementById('result');
    
    // Show widget if hidden
    if (settings.hideWhenInactive) {
        showWidget();
    }
    
    // Hide previous result
    result.textContent = '';
    result.style.display = 'none';
    
    // Calculate random rotation
    const minSpins = 5;
    const maxSpins = 8;
    const spins = minSpins + Math.random() * (maxSpins - minSpins);
    const segmentAngle = 360 / 8;
    const randomSegment = Math.floor(Math.random() * 8);
    const finalAngle = (spins * 360) + (randomSegment * segmentAngle) + (Math.random() * segmentAngle);
    
    // Apply rotation with custom duration
    currentRotation += finalAngle;
    wheel.style.transition = `transform ${settings.spinDuration}s cubic-bezier(0.17, 0.67, 0.12, 0.99)`;
    wheel.style.transform = `rotate(${currentRotation}deg)`;
    
    // Calculate winning segment after spin completes
    setTimeout(() => {
        const normalizedRotation = currentRotation % 360;
        const segmentAngle = 45;
        const adjustedRotation = (normalizedRotation + 22.5) % 360;
        const winningSegmentIndex = Math.floor(adjustedRotation / segmentAngle) % 8;
        const winningSegment = segments[winningSegmentIndex];
        
        // Show result with celebration
        result.innerHTML = winningSegment.value;
        result.style.display = 'block';
        
        // Add celebration effect
        result.classList.add('celebrate');
        createConfetti();
        
        setTimeout(() => {
            result.classList.remove('celebrate');
        }, 1000);
        
        // Reset spinning state
        isSpinning = false;
        
        // Auto-hide if configured
        if (settings.hideAfterSeconds > 0) {
            setTimeout(() => {
                if (settings.hideWhenInactive) {
                    hideWidget();
                }
            }, settings.hideAfterSeconds * 1000);
        }
    }, settings.spinDuration * 1000);
}

// Initialize wheel position
document.addEventListener('DOMContentLoaded', function() {
    const wheel = document.getElementById('wheel');
    if (wheel) {
        wheel.style.transform = `rotate(${currentRotation}deg)`;
    }
    
    // Apply initial styling if fieldData is available
    if (Object.keys(fieldData).length > 0) {
        updateSettings();
        applyCustomStyling();
    }
});