process.stdin.on('data', function (chunk) {
    console.log('stream by stdin', chunk)
});