module.exports = {
    async rewrites() {
        return [
          {
            source: '/test/:path*',
            destination: 'https://us-central1-ethlas-demo.cloudfunctions.net/api/:path*',
          },
        ]
      },
    env: {
      apiUrl: 'API_URL',
    },
}