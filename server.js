'use strict'

const express = require('express'),
http = require('http'),
request = require('request'),
fs = require('fs'),
path = require('path'),
uuid = require('uuid'),
bodyParser = require('body-parser'),
cors = require('cors'),
fileUpload = require('express-fileupload');

// app Setup
const app = express();
app.use(cors());
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json({ type: '*/*' }));
app.use(fileUpload());

app.post('/', function(req, res) {
    saveTempFiles(req.files, function(err, uploadedFilesPathList) {
        if (err) return res.status(500).send(err);

        var attachments = [];
        for (var i = 0; i < uploadedFilesPathList.length; i++) {
            attachments.push(fs.createReadStream(uploadedFilesPathList[i]));
        }

        var formData = {};
        if (attachments.length > 0) {
            formData.attachments = attachments;
            if (req.body.newFilesData)
                formData.newFilesData = req.body.newFilesData;
        }

        res.send(formData);
    });
});

app.get('/', function(req, res) {
    res.send('Hi!');
})

// server setup
const port = 3001;
const server = http.createServer(app);
server.listen(port, function() {
    console.log('sv', 'listening on port:', port);
})


function saveTempFiles (filesList, cb) {
    if (!filesList || typeof filesList == 'undefined')
        return cb(null, []);
    
    var filesLength = Object.keys(filesList).length;
    var totalUploaded = 0;
    var uploadedFilesPathList = [];
    for (var i in filesList) {
        var file = filesList[i];
        var filename = uuid() + path.extname(file.name);
        var fullPath = path.join(__dirname, 'tempUploadedFiles' , filename);

        uploadedFilesPathList.push(fullPath);
        
        file.mv(fullPath, function(err) {
            if (err) {
                console.error(err)
                return cb(err, null);
            }

            totalUploaded++;

            if (filesLength == totalUploaded)
                return cb(null, uploadedFilesPathList);
        });
    }
}