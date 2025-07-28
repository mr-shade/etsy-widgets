# Spinning Wheel Stream Widget

# StreamElements Spinning Wheel Widget

A customizable spinning prize wheel widget for StreamElements with chat command integration.

## Features

- 8-segment spinning wheel with customizable prizes
- Chat command trigger (`!spin` by default)
- Configurable cooldowns and user permissions
- Multiple trigger options (chat commands, follows, donations, etc.)
- Responsive design with random animated stars
- Bitcount Single font for a modern look

## Installation Instructions

### Step 1: Create Custom Widget in StreamElements

1. Go to [StreamElements Dashboard](https://streamelements.com/dashboard)
2. Navigate to **Overlays** in the left sidebar
3. Select your overlay or create a new one
4. Click **Add Widget** → **Custom** → **Custom Widget**

### Step 2: Add Your Code

#### HTML Tab
Copy and paste the contents of `index.html` into the HTML tab in StreamElements.

#### CSS Tab  
Copy and paste the contents of `style.css` into the CSS tab in StreamElements.

#### JS Tab
Copy and paste the contents of `script.js` into the JS tab in StreamElements.

#### Fields Tab
Copy and paste the contents of `fields.json` into the Fields tab in StreamElements.

### Step 3: Configure Widget Settings

After adding the code, you'll see configuration options in the widget settings:

- **Trigger Event**: Choose what triggers the spin (Chat Command, New Follower, Donation, etc.)
- **Command Name**: Set your chat command (default: `!spin`)
- **Cooldown**: Set cooldown time in seconds (default: 30 seconds)
- **User Level Required**: Set who can use the command (Everyone, Subscribers, Mods, Broadcaster)
- **Prize A-H**: Customize your 8 prizes

### Step 4: Position and Save

1. Position the widget on your overlay where you want it to appear
2. Resize if needed (the widget is responsive)
3. Click **Save** to apply changes

## Usage

### Chat Commands
- Default command: `!spin`
- Users type the command in chat to trigger the wheel
- Respects cooldown and permission settings

### Other Triggers
You can configure the widget to spin automatically on:
- New followers
- Donations
- New subscribers  
- Bits/Cheers

## Customization

### Changing Prizes
Update the prize text in the widget settings or modify the `segments` array in the JavaScript.

### Styling
Modify the CSS to change colors, fonts, animations, or layout.

### Adding More Segments
To add more than 8 segments, you'll need to:
1. Update the SVG paths in HTML
2. Modify the `segments` array in JavaScript
3. Adjust the `segmentAngle` calculation (360 / number_of_segments)

## Troubleshooting

### Widget Not Loading
- Check browser console for errors
- Ensure all code is copied correctly
- Verify StreamElements overlay is active

### Command Not Working
- Check command spelling in chat
- Verify user has required permissions
- Check if cooldown is active
- Ensure StreamElements bot is active in your channel

### Wheel Not Spinning
- Check browser console for JavaScript errors
- Verify the `onEventReceived` function is receiving events
- Test by clicking the center star manually

## Technical Details

- **Font**: Bitcount Single (Google Fonts)
- **Framework**: Vanilla JavaScript with StreamElements API
- **Responsive**: Works on all screen sizes
- **Browser Support**: Modern browsers (Chrome, Firefox, Safari, Edge)

## Files Structure

```
spin-wheel/
├── index.html          # Widget HTML structure
├── style.css           # Styling and animations  
├── script.js           # Spinning logic and StreamElements integration
├── fields.json         # StreamElements configuration fields
└── README.md           # This file
```

## Support

If you encounter issues:
1. Check the browser console for errors
2. Verify all code is copied correctly
3. Test the widget in StreamElements preview mode
4. Check StreamElements documentation for widget development

## License

Free to use and modify for personal and commercial purposes.

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
