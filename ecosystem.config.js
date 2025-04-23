module.exports = {
  apps: [
    {
      name: "seneca",
      script: "dist/server.js",
      instances: "max",
      autorestart: true,
      watch: false,
      max_memory_restart: "2G",
      env: {
        NODE_ENV: "production",
      },
    },
  ],
};
