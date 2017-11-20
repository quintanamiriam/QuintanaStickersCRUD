// Update with your config settings.

module.exports = {

  development: {
    client: 'pg',
    connection: 'postgres://localhost/quintanas-web-store'
  },
  test: {
    client: 'pg',
    connection: 'postgres://localhost/test-quintanas-web-store'
  },
};
