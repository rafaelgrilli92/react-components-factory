export default {
    /**
	Change the image quality reducing pixels
	@author Rafael Grilli
	@method resizeImage
	@param {Object} img File object.
    @param {number|null} quality Result quality 0 to 1 (Default: 0.9).
    @param {Function} callback Callback function.
	@return {object} File object
	*/
    resizeImage : (imgFile, quality = 0.8, callback) => {
        let reader = new FileReader();
        reader.readAsDataURL(imgFile)
        reader.onloadend = () => {
            let img = document.createElement('img');
            img.src = reader.result;
            let canvas = document.createElement('canvas');
            canvas.width = img.width;
            canvas.height = img.height;
            let ctx = canvas.getContext("2d");
            ctx.drawImage(img, 0, 0);
            var dataURL = canvas.toDataURL('image/jpg', quality);
            return callback(null, dataURLtoFile(dataURL), reader.result);
        }

        function dataURLtoFile(dataURL) {
            var byteString;
            if (dataURL.split(',')[0].indexOf('base64') >= 0)
                byteString = atob(dataURL.split(',')[1]);
            else
                byteString = unescape(dataURL.split(',')[1]);

            var mimeString = dataURL.split(',')[0].split(':')[1].split(';')[0];

            var ia = new Uint8Array(byteString.length);
            for (var i = 0; i < byteString.length; i++) {
                ia[i] = byteString.charCodeAt(i);
            }
            
            return new File([ia], 'image.jpg', {type: mimeString, lastModified: Date.now()});
        }
    }
}