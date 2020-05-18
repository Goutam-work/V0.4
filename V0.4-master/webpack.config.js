const Dotenv = require('dotenv-webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    context: __dirname ,
    mode: 'development',
    devtool: 'inline-source-map',
    watch : true,
    entry: './src/index.js'  ,
    output: {
        publicPath : '/',
        path: __dirname + "/public/dist/",
        filename: "[name].js",
    },
    module: {
        rules: [{
                test: /\.js$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        "presets": [ "@babel/preset-env","@babel/preset-react"],
                         "plugins" : ["@babel/plugin-proposal-class-properties"]
                    }
                }
            },
            {
                test: /\.(png?|jpe?g|gif|ttf)$/i,
                use: [
                  {
                    loader: 'file-loader',
                  },
                ],
            },
            {
            test: /\.css$/,
            use: [
              'style-loader',
              {
                loader: 'css-loader',
                options: {
                  sourceMap: true
                }
              }
            ]
          },
          {
            test: /\.(scss)$/,
            use: [
              {
                // Adds CSS to the DOM by injecting a `<style>` tag
                loader: 'style-loader'
              },
              {
                // Interprets `@import` and `url()` like `import/require()` and will resolve them
                loader: 'css-loader'
              },
              {
                // Loader for webpack to process CSS with PostCSS
                loader: 'postcss-loader',
                options: {
                  plugins() {
                    return [
                      require('autoprefixer')
                    ];
                  }
                }
              },
              {
                loader: "resolve-url-loader", //resolve-url-loader needs to come *BEFORE* sass-loader
                options: {
                  sourceMap: true
                }
              },
              {
                // Loads a SASS/SCSS file and compiles it to CSS
                loader: 'sass-loader'
              }
            ]
          }
        ]
    },
    resolve: {
        extensions: ['.js']
    },
  /*  devServer: {
        contentBase: `./public/javascripts/react-bundles`,
        port: 8000,
        hot: true,
        clientLogLevel : 'error',
        compress: true
    },*/
    plugins : [
        new Dotenv({
            path: './.env'
        }),

    ]
}
