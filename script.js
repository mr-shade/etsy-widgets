// Prize Wheel with Spinning Functionality
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

function spinWheel() {
    if (isSpinning) return;
    
    isSpinning = true;
    const wheel = document.getElementById('wheel');
    const button = document.getElementById('spinButton');
    const result = document.getElementById('result');
    
    // Disable button and show spinning state
    button.disabled = true;
    button.textContent = 'SPINNING...';
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
        // The pointer is at the top (0 degrees), so we need to calculate which segment is under it
        const normalizedRotation = currentRotation % 360;
        // Adjust for the fact that our segments start from the top and the pointer points down
        const adjustedRotation = (360 - normalizedRotation) % 360;
        // Each segment is 45 degrees, starting from top (0 degrees)
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
        
        // Reset button
        button.disabled = false;
        button.textContent = 'SPIN THE WHEEL';
        isSpinning = false;
    }, 4000); // Wait for animation to complete
}

// Initialize wheel position
document.addEventListener('DOMContentLoaded', function() {
    const wheel = document.getElementById('wheel');
    wheel.style.transform = `rotate(${currentRotation}deg)`;
});