module.exports = {
    entry : "./demo/entry.jsx",
    output : {
        path : __dirname + "/demo/",
        filename : "bundle.js"
    },
    module : {
        loaders : [
            { test : /\.css/, loader : "style!css" },
            { test : /\.jsx/, loader : "jsx" }
        ]
    },
    externals : [
        {
            'react' : 'React'
        }
    ]
}
