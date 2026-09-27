// 1. FIXED: Changed to named destructuring import to support Jimp v1.x
import { Jimp } from 'jimp';

async function convertToTransparent() {
  try {
    console.log('Reading raw logo file...');
    // Make sure this path points correctly to where your downloaded raw image is stored
    const image = await Jimp.read('public/images/test-raw.png');
    
    console.log('Replacing black background with transparency...');
    // This scans the image canvas grid and changes pure black to 100% alpha transparency
    image.scan((x, y, idx) => {
      const red = image.bitmap.data[idx];
      const green = image.bitmap.data[idx + 1];
      const blue = image.bitmap.data[idx + 2];
      
      // If the pixel is pure black or very close to it (dark background padding)
      if (red <= 10 && green <= 10 && blue <= 10) {
        image.bitmap.data[idx + 3] = 0; // Set Alpha transparency layer channel to 0
      }
    });

    // Save the newly polished asset out to your primary images directory
    await image.write('public/images/test-logo.png');
    console.log('✨ Success! Transparent PNG created at public/images/driveflow-logo.png');
  } catch (err) {
    console.error('❌ Error processing image:', err);
  }
}

convertToTransparent();
