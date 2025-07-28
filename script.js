let isSpinning = false;
let segments = [
    "Content 1",
    "Content 2", 
    "Content 3",
    "Content 4",
    "Content 5",
    "Content 6",
    "Content 7",
    "Content 8"
];

function spinWheel() {
    if (isSpinning) return;
    
    isSpinning = true;
    const wheel = document.getElementById('wheel');
    const button = document.querySelector('.spin-button');
    
    // Disable button during spin
    button.disabled = true;
    button.textContent = 'SPINNING...';
    
    // Calculate random rotation (multiple full rotations + random segment)
    const minSpins = 5; // Minimum number of full rotations
    const maxSpins = 8; // Maximum number of full rotations
    const spins = minSpins + Math.random() * (maxSpins - minSpins);
    const segmentAngle = 360 / 8; // 45 degrees per segment
    const randomSegment = Math.floor(Math.random() * 8);
    const finalAngle = (spins * 360) + (randomSegment * segmentAngle) + (Math.random() * segmentAngle);
    
    // Set CSS custom property for animation
    wheel.style.setProperty('--spin-degrees', finalAngle + 'deg');
    
    // Add spinning class to trigger animation
    wheel.classList.add('spinning');
    
    // Handle animation end
    setTimeout(() => {
        wheel.classList.remove('spinning');
        
        // Calculate which segment won (accounting for the pointer at top)
        const normalizedAngle = (360 - (finalAngle % 360)) % 360;
        const winningSegmentIndex = Math.floor(normalizedAngle / segmentAngle);
        const winningSegment = segments[winningSegmentIndex];
        
        // Show result
        setTimeout(() => {
            showResult(winningSegment, winningSegmentIndex + 1);
            
            // Re-enable button
            button.disabled = false;
            button.textContent = 'SPIN AGAIN';
            isSpinning = false;
        }, 500);
        
    }, 4000); // Match the CSS animation duration
}

function showResult(segment, segmentNumber) {
    // Create result popup
    const resultDiv = document.createElement('div');
    resultDiv.className = 'result-popup';
    resultDiv.innerHTML = `
        <div class="result-content">
            <h2>🎉 Winner! 🎉</h2>
            <p>You landed on:</p>
            <h3>${segment}</h3>
            <p>Segment ${segmentNumber}</p>
            <button onclick="closeResult()" class="close-result">Continue</button>
        </div>
    `;
    
    document.body.appendChild(resultDiv);
    
    // Animate in
    setTimeout(() => {
        resultDiv.classList.add('show');
    }, 10);
}

function closeResult() {
    const resultPopup = document.querySelector('.result-popup');
    if (resultPopup) {
        resultPopup.classList.remove('show');
        setTimeout(() => {
            resultPopup.remove();
        }, 300);
    }
}

// Add CSS for result popup
const resultStyles = `
.result-popup {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.8);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
    opacity: 0;
    transition: opacity 0.3s ease;
}

.result-popup.show {
    opacity: 1;
}

.result-content {
    background: linear-gradient(135deg, #9b59b6, #8e44ad);
    color: white;
    padding: 40px;
    border-radius: 20px;
    text-align: center;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5);
    transform: scale(0.8);
    transition: transform 0.3s ease;
    border: 3px solid #fff;
}

.result-popup.show .result-content {
    transform: scale(1);
}

.result-content h2 {
    font-size: 28px;
    margin-bottom: 20px;
}

.result-content h3 {
    font-size: 24px;
    color: #ffd700;
    margin: 15px 0;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
}

.result-content p {
    font-size: 16px;
    margin: 10px 0;
}

.close-result {
    background: linear-gradient(135deg, #e74c3c, #c0392b);
    color: white;
    border: none;
    padding: 12px 25px;
    font-size: 16px;
    font-weight: bold;
    border-radius: 25px;
    cursor: pointer;
    margin-top: 20px;
    transition: all 0.3s ease;
}

.close-result:hover {
    background: linear-gradient(135deg, #c0392b, #a93226);
    transform: translateY(-2px);
}
`;

// Inject result styles
const styleSheet = document.createElement('style');
styleSheet.textContent = resultStyles;
document.head.appendChild(styleSheet);

// Add some fun interactions
document.addEventListener('DOMContentLoaded', function() {
    // Add hover effect to segments
    const segments = document.querySelectorAll('.segment');
    segments.forEach(segment => {
        segment.addEventListener('mouseenter', function() {
            if (!isSpinning) {
                this.style.transform += ' scale(1.05)';
                this.style.filter = 'brightness(1.1)';
            }
        });
        
        segment.addEventListener('mouseleave', function() {
            if (!isSpinning) {
                this.style.transform = this.style.transform.replace(' scale(1.05)', '');
                this.style.filter = 'brightness(1)';
            }
        });
    });
    
    // Add click sound effect (optional - you can add actual audio)
    document.querySelector('.spin-button').addEventListener('click', function() {
        // You can add audio here: new Audio('click.mp3').play();
        console.log('🎵 Wheel spinning sound effect!');
    });
});

// Keyboard support
document.addEventListener('keydown', function(event) {
    if (event.code === 'Space' && !isSpinning) {
        event.preventDefault();
        spinWheel();
    }
});
