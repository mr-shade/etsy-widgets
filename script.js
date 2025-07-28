// StreamElements Spinning Wheel Widget with Full Customization
let isSpinning = false;
let currentRotation = 0;
let fieldData = {};
let cooldownActive = false;
let segments = [];

// Default settings with fallbacks
const defaultSettings = {
    spinCommand: "!spin",
    spinDuration: 4,
    segmentCount: 8,
    wheelPrimaryColor: "#DDD6FE",
    wheelSecondaryColor: "#C4B5FD",
    textColor: "#000000",
    pointerColor: "#8B5CF6",
    fontFamily: "Bitcount Single",
    fontSize: 12,
    wheelSize: 300,
    marginTop: 0,
    marginLeft: 0,
    showPopup: true,
    hideWhenInactive: false,
    hideAfterSeconds: 10,
    cooldown: 30,
    userLevel: "everyone",
    triggerEvent: "command",
    prize1: "🎁 Amazing Prize 1",
    prize2: "🏆 Fantastic Prize 2",
    prize3: "⭐ Super Prize 3",
    prize4: "🎉 Awesome Prize 4",
    prize5: "💎 Epic Prize 5",
    prize6: "🌟 Great Prize 6",
    prize7: "🎊 Cool Prize 7",
    prize8: "🏅 Best Prize 8",
    prize9: "✨ Bonus Prize 9",
    prize10: "🎪 Special Prize 10",
    prize11: "🎭 Theater Prize 11",
    prize12: "🎨 Artist Prize 12"
};

// Current active settings
let settings = { ...defaultSettings };

// Initialize segments array
function initializeSegments() {
    segments = [];
    const segmentCount = parseInt(settings.segmentCount) || 8;
    
    for (let i = 1; i <= segmentCount; i++) {
        const prizeKey = `prize${i}`;
        const prizeText = settings[prizeKey] || `Prize ${i}`;
        segments.push({
            text: `Prize ${i}`,
            value: prizeText,
            color: i % 2 === 1 ? settings.wheelPrimaryColor : settings.wheelSecondaryColor
        });
    }
    console.log('Segments initialized:', segments);
}

// Generate wheel segments dynamically
function generateWheelSegments() {
    const segmentsContainer = document.getElementById('segments');
    if (!segmentsContainer) return;
    
    segmentsContainer.innerHTML = '';
    
    const segmentCount = segments.length;
    const segmentAngle = 360 / segmentCount;
    const radius = 100;
    const centerX = 150;
    const centerY = 150;
    
    segments.forEach((segment, index) => {
        const startAngle = (index * segmentAngle - 90) * (Math.PI / 180);
        const endAngle = ((index + 1) * segmentAngle - 90) * (Math.PI / 180);
        
        const x1 = centerX + radius * Math.cos(startAngle);
        const y1 = centerY + radius * Math.sin(startAngle);
        const x2 = centerX + radius * Math.cos(endAngle);
        const y2 = centerY + radius * Math.sin(endAngle);
        
        const largeArcFlag = segmentAngle > 180 ? 1 : 0;
        
        const pathData = [
            `M ${centerX} ${centerY}`,
            `L ${x1} ${y1}`,
            `A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2}`,
            'Z'
        ].join(' ');
        
        // Create path element
        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        path.setAttribute('d', pathData);
        path.setAttribute('fill', segment.color);
        path.setAttribute('stroke', '#000');
        path.setAttribute('stroke-width', '1');
        
        // Create text element
        const textAngle = (index * segmentAngle) + (segmentAngle / 2) + 1; // Position text in center of segment
        const textRadius = 70;
        const textX = centerX + textRadius * Math.cos((textAngle - 90) * (Math.PI / 180));
        const textY = centerY + textRadius * Math.sin((textAngle - 90) * (Math.PI / 180));
        
        const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        text.setAttribute('x', textX);
        text.setAttribute('y', textY);
        text.setAttribute('text-anchor', 'middle');
        text.setAttribute('class', 'segment-text');
        text.setAttribute('transform', `rotate(${textAngle}, ${textX}, ${textY})`);
        text.textContent = segment.text;
        
        segmentsContainer.appendChild(path);
        segmentsContainer.appendChild(text);
    });
}

// Apply dynamic styling
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
            font-family: '${settings.fontFamily}', monospace !important;
        }
        
        .container {
            margin-top: ${settings.marginTop}vh !important;
            margin-left: ${settings.marginLeft}vw !important;
            ${settings.hideWhenInactive ? 'opacity: 0; pointer-events: none;' : ''}
        }
        
        .wheel {
            width: ${settings.wheelSize}px !important;
            height: ${settings.wheelSize}px !important;
            transition: transform ${settings.spinDuration}s cubic-bezier(0.17, 0.67, 0.12, 0.99) !important;
        }
        
        .segment-text {
            font-family: '${settings.fontFamily}', monospace !important;
            font-size: ${settings.fontSize}px !important;
            fill: ${settings.textColor} !important;
        }
        
        .fixed-pointer path {
            fill: ${settings.pointerColor} !important;
        }
        
        .fixed-pointer circle {
            stroke: ${settings.pointerColor} !important;
        }
        
        .wheel-container {
            transform: scale(${settings.wheelSize / 300});
        }
    `;
    
    styleElement.textContent = css;
    document.head.appendChild(styleElement);
    console.log('Custom styling applied');
}

// Show result popup
function showResultPopup(prize) {
    if (!settings.showPopup) {
        // Fallback to old result display
        const result = document.getElementById('result');
        if (result) {
            result.innerHTML = prize;
            result.style.display = 'block';
            result.classList.add('celebrate');
            setTimeout(() => {
                result.classList.remove('celebrate');
                if (settings.hideAfterSeconds > 0) {
                    setTimeout(() => {
                        result.style.display = 'none';
                    }, settings.hideAfterSeconds * 1000);
                }
            }, 1000);
        }
        return;
    }
    
    const popup = document.getElementById('resultPopup');
    const prizeElement = document.getElementById('popupPrize');
    
    if (popup && prizeElement) {
        prizeElement.innerHTML = prize;
        popup.style.display = 'flex';
        popup.classList.add('show');
        
        // Auto-hide popup if configured
        if (settings.hideAfterSeconds > 0) {
            setTimeout(() => {
                closePopup();
            }, settings.hideAfterSeconds * 1000);
        }
    }
}

// Close popup
function closePopup() {
    const popup = document.getElementById('resultPopup');
    if (popup) {
        popup.classList.remove('show');
        setTimeout(() => {
            popup.style.display = 'none';
        }, 300);
    }
}

// Widget visibility management
function showWidget() {
    const container = document.getElementById('wheelContainer');
    if (container) {
        container.style.opacity = '1';
        container.style.pointerEvents = 'auto';
    }
}

function hideWidget() {
    if (settings.hideWhenInactive) {
        const container = document.getElementById('wheelContainer');
        if (container) {
            container.style.opacity = '0';
            container.style.pointerEvents = 'none';
        }
    }
}

// StreamElements integration
window.addEventListener('onWidgetLoad', function (obj) {
    console.log('Widget loading...');
    fieldData = obj.detail.fieldData || {};
    
    // Update settings with fieldData
    Object.keys(defaultSettings).forEach(key => {
        if (fieldData[key] !== undefined && fieldData[key] !== null) {
            settings[key] = fieldData[key];
        }
    });
    
    console.log('Settings updated:', settings);
    
    // Initialize everything
    initializeSegments();
    generateWheelSegments();
    applyCustomStyling();
    
    if (settings.hideWhenInactive) {
        hideWidget();
    }
    
    console.log('StreamElements Spinning Wheel Widget Loaded Successfully');
});

window.addEventListener('onEventReceived', function (obj) {
    if (!obj.detail.event) return;
    
    const event = obj.detail.event;
    
    // Show widget when event received
    if (settings.hideWhenInactive) {
        showWidget();
    }
    
    if (settings.triggerEvent === 'command' && event.type === 'message') {
        handleChatCommand(event);
    } else if (settings.triggerEvent === 'follow' && event.type === 'follow') {
        spinWheelWithDelay();
    } else if (settings.triggerEvent === 'donation' && event.type === 'donation') {
        spinWheelWithDelay();
    } else if (settings.triggerEvent === 'subscriber' && event.type === 'subscriber') {
        spinWheelWithDelay();
    } else if (settings.triggerEvent === 'cheer' && event.type === 'cheer') {
        spinWheelWithDelay();
    }
});

function handleChatCommand(event) {
    const message = event.data.text.toLowerCase().trim();
    const commandName = settings.spinCommand.toLowerCase();
    
    if (message === commandName || message.startsWith(commandName + ' ')) {
        if (cooldownActive) {
            console.log('Spin wheel on cooldown');
            return;
        }
        
        if (!checkPermissions(event.data, settings.userLevel)) {
            console.log('User does not have permission to use spin wheel');
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
    
    console.log('Spinning wheel...');
    isSpinning = true;
    const wheel = document.getElementById('wheel');
    
    if (!wheel) {
        console.error('Wheel element not found');
        isSpinning = false;
        return;
    }
    
    // Show widget if hidden
    if (settings.hideWhenInactive) {
        showWidget();
    }
    
    // Hide any existing popup/result
    closePopup();
    const result = document.getElementById('result');
    if (result) {
        result.style.display = 'none';
    }
    
    // Calculate random rotation
    const minSpins = 5;
    const maxSpins = 8;
    const spins = minSpins + Math.random() * (maxSpins - minSpins);
    const segmentAngle = 360 / segments.length;
    const randomSegment = Math.floor(Math.random() * segments.length);
    const finalAngle = (spins * 360) + (randomSegment * segmentAngle) + (Math.random() * segmentAngle);
    
    // Apply rotation with custom duration
    currentRotation += finalAngle;
    wheel.style.transition = `transform ${settings.spinDuration}s cubic-bezier(0.17, 0.67, 0.12, 0.99)`;
    wheel.style.transform = `rotate(${currentRotation}deg)`;
    
    // Calculate winning segment after spin completes
    setTimeout(() => {
        const normalizedRotation = currentRotation % 360;
        const adjustedRotation = (normalizedRotation + (360 / segments.length / 2)) % 360;
        const winningSegmentIndex = Math.floor(adjustedRotation / (360 / segments.length)) % segments.length;
        const winningSegment = segments[winningSegmentIndex];
        
        console.log('Winner:', winningSegment);
        
        // Show result
        showResultPopup(winningSegment.value);
        
        // Reset spinning state
        isSpinning = false;
        
        console.log('Spin completed');
    }, settings.spinDuration * 1000);
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing...');
    
    // Set initial wheel position
    const wheel = document.getElementById('wheel');
    if (wheel) {
        wheel.style.transform = `rotate(${currentRotation}deg)`;
    }
    
    // Initialize with defaults if no StreamElements data
    if (Object.keys(fieldData).length === 0) {
        initializeSegments();
        generateWheelSegments();
        applyCustomStyling();
        console.log('Initialized with default settings');
    }
});

// Make functions globally available
window.spinWheel = spinWheel;
window.closePopup = closePopup;
