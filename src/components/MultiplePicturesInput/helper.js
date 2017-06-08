import parser from 'exif-parser';

export default {
    /**
	Change the image quality reducing pixels
	@author Rafael Grilli
	@method changeImageQuality
    @description Change the quality of the image converting it to JPEG
	@param {object} file Image File  object
    @param {number} quality Result quality 0 to 1 (Default: 0.8).
    @param {Function} callback Callback function
	@return {object} Returns a file object
	*/
    changeImageQuality: (file, quality = 0.8, callback) => {
        let reader = new FileReader();
        reader.readAsArrayBuffer(file);
        reader.onloadend = () => {
            var orientation = parser.create(reader.result).parse().tags.Orientation;
            
            reader.readAsDataURL(file)
            reader.onloadend = function() {
                let resultFile = this.result;
                let img = document.createElement('img');
                img.src = resultFile; 
                img.onload = () => {
                    let canvas = document.createElement('canvas');
                    let ctx = canvas.getContext("2d");
                    canvas.width = img.width;
                    canvas.height = img.height;

                    if (orientation === 6 || orientation === 8) {
                        canvas.width = img.height;
                        canvas.height = img.width;
                    }

                    switch(orientation){
                        case 3:
                            // 180° rotate left
                            ctx.translate(canvas.width, canvas.height);
                            ctx.rotate(Math.PI);
                            ctx.drawImage(img, 0, 0);
                            break;
                        case 6:
                            // 90° rotate right
                            ctx.rotate(0.5 * Math.PI);
                            ctx.translate(0, -canvas.height);
                            ctx.drawImage(img, 0, img.width - img.height);
                            break;
                        case 8:
                            // 90° rotate left
                            ctx.rotate(-0.5 * Math.PI);
                            ctx.translate(-canvas.width, 0);
                            ctx.drawImage(img, img.height - img.width, 0);
                            break;
                        default:
                            ctx.drawImage(img, 0, 0);
                    }

                    return canvas.toBlob(callback, 'image/jpeg', quality);  
                }
            };
        }
    }
}