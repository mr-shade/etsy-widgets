# Spinning Wheel Stream Widget

A beautiful, interactive spinning wheel widget perfect for Twitch streams, matching the purple gradient design with decorative stars and a location pin pointer.

## Features

- 🎨 Beautiful purple gradient design matching the reference image
- ⭐ Animated decorative stars
- 📍 Location pin pointer at the top
- 🎡 Smooth spinning animation with realistic physics
- 🎉 Winner announcement popup
- 📱 Responsive design for different screen sizes
- ⌨️ Keyboard support (Spacebar to spin)
- 🖱️ Interactive hover effects

## Files Structure

```
spin-wheel/
├── index.html      # Main HTML structure
├── style.css       # All styling and animations
├── script.js       # JavaScript functionality
└── README.md       # This file
```

## How to Use as a Twitch Stream Widget

### Method 1: Local File (Browser Source)
1. Open OBS Studio or your streaming software
2. Add a "Browser Source"
3. Set the URL to: `file:///path/to/your/spin-wheel/index.html`
4. Set Width: 800, Height: 600
5. Check "Shutdown source when not visible" and "Refresh browser when scene becomes active"

### Method 2: Web Server (Recommended)
1. Host these files on a web server (GitHub Pages, Netlify, etc.)
2. Use the hosted URL as your Browser Source
3. This allows for easier updates and sharing

### OBS Studio Setup
- **Width**: 800px
- **Height**: 600px
- **CSS**: Add custom CSS if needed to adjust positioning
- **Refresh Rate**: 30 FPS is sufficient

## Customization

### Changing Segment Content
Edit the `segments` array in `script.js`:
```javascript
let segments = [
    "Your Content 1",
    "Your Content 2", 
    // ... up to 8 segments
];
```

### Changing Colors
Modify the gradient colors in `style.css`:
```css
.segment-1 {
    background: linear-gradient(45deg, #your-color-1, #your-color-2);
}
```

### Adjusting Wheel Size
Change the `.wheel-container` and `.wheel` dimensions in `style.css`:
```css
.wheel-container {
    width: 400px;  /* Adjust as needed */
    height: 400px;
}
```

## Twitch Integration Ideas

### Chat Commands
You can integrate this with:
- **Streamlabs Chatbot**: Create custom commands to trigger spins
- **StreamElements**: Use custom widgets and overlays
- **Nightbot**: Set up viewer commands

### Stream Interactions
- **Subscriber Benefits**: Only subs can spin
- **Bit Rewards**: Viewers spend bits to spin
- **Follow Goals**: Spin when reaching follower milestones
- **Donation Alerts**: Automatic spins for donations

## Browser Compatibility

- ✅ Chrome/Chromium (Recommended for OBS)
- ✅ Firefox
- ✅ Safari
- ✅ Edge

## Performance Tips

1. **Close unused browser tabs** in OBS to save resources
2. **Use Hardware Acceleration** if available
3. **Set appropriate FPS** (30 FPS is usually sufficient)
4. **Monitor CPU usage** during streams

## Troubleshooting

### Wheel Not Spinning
- Check JavaScript console for errors
- Ensure all files are in the same directory
- Verify file paths are correct

### Poor Performance
- Reduce wheel size in CSS
- Lower the number of decorative elements
- Use a simpler gradient

### Not Showing in OBS
- Check file path is absolute
- Ensure browser source dimensions are correct
- Try refreshing the browser source

## Advanced Features

### Adding Sound Effects
Uncomment and modify the audio line in `script.js`:
```javascript
// Add actual audio file
new Audio('spin-sound.mp3').play();
```

### Adding More Segments
To add more than 8 segments, modify:
1. Add more `.segment` divs in HTML
2. Update CSS with new segment classes
3. Change `segmentAngle` calculation in JavaScript

### Custom Animations
Modify the CSS animations:
- Change spin duration
- Adjust easing functions
- Add bounce effects

## License

Free to use for personal and commercial streaming purposes.

## Support

For issues or customization requests, please create an issue in the repository.

---

Happy Streaming! 🎮✨
