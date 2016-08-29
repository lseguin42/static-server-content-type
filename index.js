#!/usr/bin/env node

const express = require('express');
const fs = require('fs');

let app = express();

app.use(function(req, res) {
    var path = req.path.replace(/\//, '');
    try {
        let contentType = fs.readFileSync(path + '.content-type').toString();
        res.setHeader('Content-Type', contentType);
        fs.createReadStream(path).pipe(res);
	console.log('[200] success: ' + path);
    } catch (e) {
        console.log('[404] notFound: ' + path);
        res.status(404).end('[404] notFound: ' + path);
    }
});

app.listen(8089, function () {
	console.log('Static-Server-Content-Type listen on 8089');
});
