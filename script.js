// Prize Wheel with Spinning Functionality for StreamElements
let isSpinning = false;
let currentRotation = 0;

// Segments data with different prizes
const segments = [
    { text: "Prize A", value: "🎁 Congratulations! You won Prize A!" },
    { text: "Prize B", value: "🏆 Amazing! You won Prize B!" },
    { text: "Prize C", value: "⭐ Fantastic! You won Prize C!" },
    { text: "Prize D", value: "🎉 Excellent! You won Prize D!" },
    { text: "Prize E", value: "💎 Wonderful! You won Prize E!" },
    { text: "Prize F", value: "🌟 Great job! You won Prize F!" },
    { text: "Prize G", value: "🎊 Superb! You won Prize G!" },
    { text: "Prize H", value: "🏅 Outstanding! You won Prize H!" }
];

// StreamElements Widget API Integration
let fieldData = {};
let cooldownActive = false;

window.addEventListener('onWidgetLoad', function (obj) {
    // Store field data from StreamElements settings
    fieldData = obj.detail.fieldData;
    
    // Update segments with custom prizes if configured
    if (fieldData) {
        if (fieldData.prizeA) segments[0].value = `🎁 ${fieldData.prizeA}`;
        if (fieldData.prizeB) segments[1].value = `🏆 ${fieldData.prizeB}`;
        if (fieldData.prizeC) segments[2].value = `⭐ ${fieldData.prizeC}`;
        if (fieldData.prizeD) segments[3].value = `🎉 ${fieldData.prizeD}`;
        if (fieldData.prizeE) segments[4].value = `💎 ${fieldData.prizeE}`;
        if (fieldData.prizeF) segments[5].value = `🌟 ${fieldData.prizeF}`;
        if (fieldData.prizeG) segments[6].value = `🎊 ${fieldData.prizeG}`;
        if (fieldData.prizeH) segments[7].value = `🏅 ${fieldData.prizeH}`;
    }
    
    console.log('StreamElements Spin Wheel Widget Loaded');
});

// Listen for StreamElements events (chat commands, follows, donations, etc.)
window.addEventListener('onEventReceived', function (obj) {
    if (!obj.detail.event) return;
    
    const event = obj.detail.event;
    const data = obj.detail;
    
    // Handle different event types based on configuration
    const triggerEvent = fieldData.triggerEvent || 'command';
    
    if (triggerEvent === 'command' && event.type === 'message') {
        handleChatCommand(event);
    } else if (triggerEvent === 'follow' && event.type === 'follow') {
        spinWheelWithDelay();
    } else if (triggerEvent === 'donation' && event.type === 'donation') {
        spinWheelWithDelay();
    } else if (triggerEvent === 'subscriber' && event.type === 'subscriber') {
        spinWheelWithDelay();
    } else if (triggerEvent === 'cheer' && event.type === 'cheer') {
        spinWheelWithDelay();
    }
});

function handleChatCommand(event) {
    const message = event.data.text.toLowerCase().trim();
    const commandName = (fieldData.commandName || '!spin').toLowerCase();
    
    // Check if message matches the command
    if (message === commandName || message.startsWith(commandName + ' ')) {
        // Check cooldown
        if (cooldownActive) {
            console.log('Spin wheel on cooldown');
            return;
        }
        
        // Check user level permissions
        const userLevel = fieldData.userLevel || 'everyone';
        const userData = event.data;
        
        if (!checkPermissions(userData, userLevel)) {
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
    const cooldownTime = (fieldData.cooldown || 30) * 1000; // Convert to milliseconds
    cooldownActive = true;
    
    setTimeout(() => {
        cooldownActive = false;
    }, cooldownTime);
}

function spinWheelWithDelay() {
    // Add a small delay to make it feel more natural
    setTimeout(() => {
        spinWheel();
    }, 500);
}

function spinWheel() {
    if (isSpinning) return;
    
    isSpinning = true;
    const wheel = document.getElementById('wheel');
    const result = document.getElementById('result');
    
    // Hide previous result
    result.textContent = '';
    result.style.display = 'none';
    
    // Calculate random rotation
    const minSpins = 5; // Minimum number of full rotations
    const maxSpins = 8; // Maximum number of full rotations
    const spins = minSpins + Math.random() * (maxSpins - minSpins);
    const segmentAngle = 360 / 8; // 45 degrees per segment
    const randomSegment = Math.floor(Math.random() * 8);
    const finalAngle = (spins * 360) + (randomSegment * segmentAngle) + (Math.random() * segmentAngle);
    
    // Apply rotation
    currentRotation += finalAngle;
    wheel.style.transition = 'transform 4s cubic-bezier(0.17, 0.67, 0.12, 0.99)';
    wheel.style.transform = `rotate(${currentRotation}deg)`;
    
    // Calculate winning segment after spin completes
    setTimeout(() => {
        // The pointer is fixed at the top, so we calculate which segment is under it
        const normalizedRotation = currentRotation % 360;
        // Since the pointer is at the top (0 degrees) and segments are 45 degrees each
        // We need to determine which segment the top pointer is pointing to
        const segmentAngle = 45; // 360 / 8 = 45 degrees per segment
        
        // Calculate which segment is at the top (where the pointer points)
        // Add 22.5 degrees to center the detection on each segment
        const adjustedRotation = (normalizedRotation + 22.5) % 360;
        const winningSegmentIndex = Math.floor(adjustedRotation / segmentAngle) % 8;
        const winningSegment = segments[winningSegmentIndex];
        
        // Show result with celebration
        result.innerHTML = winningSegment.value;
        result.style.display = 'block';
        
        // Add celebration effect
        result.classList.add('celebrate');
        setTimeout(() => {
            result.classList.remove('celebrate');
        }, 1000);
        
        // Reset spinning state
        isSpinning = false;
    }, 4000); // Wait for animation to complete
}

// Initialize wheel position
document.addEventListener('DOMContentLoaded', function() {
    const wheel = document.getElementById('wheel');
    wheel.style.transform = `rotate(${currentRotation}deg)`;
});