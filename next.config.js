module.exports = {
    async rewrites() {
        return [
          {
            source: '/test/:path*',
            destination: 'http://localhost:5000/ethlas-demo/us-central1/api/:path*',
          },
        ]
      },
    env: {
      apiUrl: 'API_URL',
    },
}