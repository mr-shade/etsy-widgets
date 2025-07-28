// Prize Wheel with Spinning Functionality
let isSpinning = false;
let currentRotation = 0;

// Segments data
const segments = [
    { text: "ABCD", value: "Segment 1" },
    { text: "ABCD", value: "Segment 2" },
    { text: "ABCD", value: "Segment 3" },
    { text: "ABCD", value: "Segment 4" },
    { text: "ABCD", value: "Segment 5" },
    { text: "ABCD", value: "Segment 6" },
    { text: "ABCD", value: "Segment 7" },
    { text: "ABCD", value: "Segment 8" }
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
        const normalizedRotation = currentRotation % 360;
        const adjustedRotation = (360 - normalizedRotation + 90) % 360; // Adjust for pointer position
        const winningSegmentIndex = Math.floor(adjustedRotation / segmentAngle) % 8;
        const winningSegment = segments[winningSegmentIndex];
        
        // Show result
        result.textContent = `You landed on: ${winningSegment.value}!`;
        result.style.display = 'block';
        
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