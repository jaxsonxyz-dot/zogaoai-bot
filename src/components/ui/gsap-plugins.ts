
import { gsap } from 'gsap';

// Simple version of DrawSVG plugin that won't cause errors
gsap.registerPlugin({
  name: "drawSVG",
  init(target, value) {
    // Safety check to prevent errors with undefined targets
    if (!target || !target.getBBox) return false;
    
    try {
      const length = target.getTotalLength ? target.getTotalLength() : 100;
      this.length = length;
      this.target = target;
      
      if (typeof value !== "object") {
        value = { end: value };
      }
      
      this.start = value.start || 0;
      this.end = value.end || 100;
      
      // Store the current values to apply later
      this.startLength = length * this.start / 100;
      this.endLength = length * this.end / 100;
      
      // Set initial values
      if (target.style) {
        target.style.strokeDasharray = `${length} ${length}`;
        target.style.strokeDashoffset = length - this.startLength;
      }
    } catch (error) {
      console.error("DrawSVG error:", error);
      return false;
    }
  },
  render(progress) {
    if (!this.target || !this.target.style) return;
    
    try {
      const currentLength = this.startLength + ((this.endLength - this.startLength) * progress);
      this.target.style.strokeDashoffset = this.length - currentLength;
    } catch (error) {
      console.error("DrawSVG render error:", error);
    }
  }
});
