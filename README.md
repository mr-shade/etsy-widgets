# Spinning Wheel Stream Widget

# StreamElements Spinning Wheel Widget

A fully customizable spinning prize wheel widget for StreamElements with comprehensive buyer customization options and chat command integration.

## 🎨 **Complete Customization Panel (No Coding Required)**

Your buyers get a user-friendly settings panel inside StreamElements with these options:

### **🎯 Trigger & Command Settings**
- **Trigger Event**: Chat Command, New Follower, Donation, Subscriber, Bits/Cheer, Manual Only
- **Spin Command**: Customize command (default: `!spin`)
- **Cooldown**: 0-300 seconds
- **User Level**: Everyone, Subscribers, Moderators, Broadcaster only
- **Spin Duration**: 2-10 seconds (adjustable)

### **🎨 Visual Customization**
- **Wheel Colors**: Primary & Secondary color pickers
- **Text Color**: Full color customization
- **Pointer Color**: Custom pointer/pin color
- **Star Color**: Animated star color control
- **Font Family**: 6 font options (Bitcount Single, Inter, Arial, etc.)
- **Font Size**: 8-20px adjustable
- **Wheel Size**: 200-500px responsive sizing

### **📐 Layout & Positioning**
- **Margin Top**: -50% to +50% vertical positioning
- **Margin Left**: -50% to +50% horizontal positioning  
- **Text Alignment**: Center, Start, End
- **Long Text Handling**: Truncate, Wrap, or Shrink font

### **🎯 Point System & Infinite Entries**
- **Point Values**: Customizable points for follows, subs, donations, bits
- **Infinite Entries Mode**: Users earn points to spin
- **Manual Spin Only**: Disable auto-triggers

### **✨ Effects & Animations**
- **Confetti Effects**: Enable/disable with color customization
- **Animated Stars**: Show/hide random stars
- **Hide When Inactive**: Auto-hide widget option
- **Auto-Hide Timer**: 0-60 seconds

### **🏆 Prize Customization**
- **Custom Prizes**: Easy textarea for up to 8 prizes (one per line)
- **Emoji Support**: Full Unicode emoji support

## 🚀 **Key Features for Buyers**

✅ **Zero Coding Required** - Complete visual customization panel  
✅ **Point System** - Followers, subs, donations, and bits earn points  
✅ **Infinite Entries** - Users can spin multiple times with earned points  
✅ **Manual Spin Mode** - Click-to-spin only option  
✅ **Smart Positioning** - Margin & alignment controls  
✅ **Text Overflow Handling** - Automatic text adjustment for long prizes  
✅ **Font Customization** - Multiple font options and sizes  
✅ **Hide When Inactive** - Auto-hide widget when not in use  
✅ **Confetti Effects** - Celebration animations with custom colors  
✅ **Responsive Design** - Works perfectly on all screen sizes  

## 💻 **Developer Implementation**

The widget uses StreamElements' `fieldData` system for buyer customization:

```javascript
const settings = {
  spinCommand: fieldData.spinCommand || "!spin",
  spinDuration: fieldData.spinDuration || 4,
  wheelPrimaryColor: fieldData.wheelPrimaryColor || "#DDD6FE",
  textColor: fieldData.textColor || "#000000",
  // ... all 25+ customizable options
};
```

Dynamic styling is applied automatically:
```css
.wheel {
  width: ${settings.wheelSize}px;
  height: ${settings.wheelSize}px;
}

.segment-text {
  fill: ${settings.textColor};
  font-size: ${settings.fontSize}px;
}
```

## 📥 **Installation Instructions**

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

### Step 3: Buyer Customization Panel

After adding the code, buyers will see 25+ customization options including:

- **🎨 Colors**: Wheel colors, text color, pointer color, star color, confetti color
- **⚙️ Behavior**: Trigger events, commands, cooldowns, permissions, spin duration
- **📐 Layout**: Positioning, margins, alignment, wheel size, font selection
- **🎯 Point System**: Custom point values for followers, subs, donations, bits
- **✨ Effects**: Confetti, stars, auto-hide, infinite entries
- **🏆 Prizes**: Easy custom prize setup (up to 8 prizes)

### Step 4: Position and Save

1. Position the widget on your overlay where you want it to appear
2. Buyers can adjust margins and positioning through the settings panel
3. Click **Save** to apply changes

## 🎮 **Usage Examples**

### Basic Chat Command
- Viewer types: `!spin`
- Widget spins automatically
- Shows winning prize with confetti

### Point System Mode
- Enable "Infinite Entries"
- Followers get 10 points, Subs get 25 points
- Users spend 1 point per spin
- Viewers build up points to spin multiple times

### Event-Triggered Mode
- Set trigger to "New Follower" or "Donation"
- Wheel spins automatically on events
- No chat command needed

### Manual Only Mode
- Enable "Manual Spin Only"
- Only broadcaster can click center star to spin
- Perfect for giveaways and special events

## 🛠️ **Advanced Features**

### Point System Details
The widget includes a sophisticated point system:
- **Followers**: Customizable points (default: 10)
- **Subscribers**: Higher point value (default: 25)
- **Donations**: Scales with amount (default: 50 per $1)
- **Bits**: Scales with amount (default: 30 per 100 bits)
- **Point Deduction**: Users spend 1 point per spin

### Smart Text Handling
Three options for long prize text:
- **Truncate**: Adds "..." for long text
- **Wrap**: Breaks text into multiple lines
- **Shrink**: Automatically reduces font size

### Auto-Hide System
- **Hide When Inactive**: Widget disappears when not in use
- **Show on Events**: Automatically appears when triggered
- **Timer-Based**: Auto-hide after X seconds (0-60)

### Dynamic Styling
All visual elements update in real-time:
- Colors change instantly via CSS variables
- Font sizes scale responsively
- Margins and positioning adjust dynamically
- Wheel size adapts while maintaining proportions

## 🎯 **Business Benefits**

### For Streamers/Buyers
- **Zero Technical Knowledge Required**: Complete visual customization
- **Brand Matching**: Colors, fonts, and positioning match their stream
- **Engagement Boost**: Point system encourages follows, subs, donations
- **Flexible Usage**: Works for giveaways, games, or regular interaction

### For Developers/Sellers
- **Easy Customization**: Comprehensive fieldData implementation
- **Professional UI**: Clean settings panel with all modern controls
- **Scalable**: Easy to add more customization options
- **StreamElements Compatible**: Follows all SE widget best practices

## 📊 **Technical Specifications**

### Performance
- **Lightweight**: Optimized JavaScript and CSS
- **Responsive**: Works on all devices and screen sizes
- **Smooth Animations**: 60fps CSS3 animations
- **Memory Efficient**: Automatic cleanup of confetti and effects

### Browser Support
- ✅ Chrome/Chromium (OBS recommended)
- ✅ Firefox
- ✅ Safari
- ✅ Edge
- ✅ Mobile browsers

### StreamElements Integration
- **Full API Support**: Uses onWidgetLoad and onEventReceived
- **Field Validation**: All inputs validated and sanitized
- **Error Handling**: Graceful fallbacks for missing data
- **Debug Logging**: Console logs for troubleshooting

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
