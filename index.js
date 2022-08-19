const { createCanvas, loadImage } = require('canvas');
var fs = require('fs');

async function init(){
    try{
        // Get image from cloudFront
        const mainImage = await loadImage('https://dc0cbc1l9lhym.cloudfront.net/AngusMartin_AcrylicOnPaper_73_1000x640mm_HR-FLAT.jpg');
        // Create Canvas
        const canvas = createCanvas(mainImage.width, mainImage.height);
        // Get context
        const ctx = canvas.getContext('2d')
        // Insert main image to canvas
        ctx.drawImage(mainImage, 0,0)
        // Write Awesome on canvas
        ctx.font = '100px Impact'
        ctx.fillText('Awesome!', mainImage.width - mainImage.width * 0.1, mainImage.height - mainImage.height * 0.1)
        // Get logo
        const logo = await loadImage('https://dc0cbc1l9lhym.cloudfront.net/Look_Stack_RGB_300.png');
        // Insert logo in canvas
        // TODO find proper location to insert logo
        ctx.drawImage(logo, mainImage.width - mainImage.width * 0.1, mainImage.height - mainImage.height * 0.1, 800, 800)
        // Create Strem to save files
        const stream = canvas.createJPEGStream()
        // Where file is getting saved
        const out = fs.createWriteStream(__dirname + '/test.png')
        // Save files
        stream.pipe(out);
        // On finish console log file was created
        out.on('finish', () =>  console.log('The PNG file was created.'))

    }catch(err){
        console.log(err)
    }

}
init()
