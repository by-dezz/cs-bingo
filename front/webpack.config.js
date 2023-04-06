const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = (env, argv) => {
    return {
        entry: ['babel-polyfill', path.resolve(__dirname, 'src', 'index.js')],
        output: {
            path: path.resolve(__dirname, 'build'),
            publicPath: '/',
            filename: "index.js"
        },

        devServer: {
            port: 4200,
            static: {
                publicPath: "/",
                directory: path.join(__dirname, 'build'),
            },
            historyApiFallback: true,
            hot: true
        },

        resolve: {
            extensions: ['', '.js', '.jsx'],
        },

        plugins: [
            new HtmlWebpackPlugin({template: path.resolve(__dirname, 'public', 'index.html'),})
        ],

        module: {
            rules: [
                {
                    test: /\.html$/i,
                    loader: "html-loader",
                },
                {
                    test: /\.?js$/,
                    exclude: /node_modules/,
                    use: {
                        loader: "babel-loader",
                        options: {
                            presets: ['@babel/preset-env', '@babel/preset-react']
                        }
                    }
                },
                {
                    test: /\.css$/i,
                    use: ["style-loader", "css-loader"],
                },
                {
                    test: /\.(png|jpe?g|gif)$/i,
                    use: [
                        {
                            loader: 'file-loader',
                        },
                    ],
                },
            ]
        }
    }
}