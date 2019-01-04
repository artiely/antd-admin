module.exports = {
  apps: [
    {
      name: 'antd-admin',
      script: 'server.js',
      watch: false,
      instances: 1,
      max_memory_restart: '100M'
    },
  ],
  deploy: {
    // "production" is the environment name
    production: {
      // SSH key path, default to $HOME/.ssh
      key: 'C:/key/SSH-ubuntu.pem',
      // SSH user
      user: 'root',
      // SSH host
      host: ['120.78.174.212'],
      // SSH options with no command-line flag, see 'man ssh'
      // can be either a single string or an array of strings
      ssh_options: 'StrictHostKeyChecking=no',
      // GIT remote/branch
      ref: 'origin/master',
      // GIT remote
      repo: 'git@github.com:artiely/antd-admin.git',
      // path in the server
      path: '/www/antd-admin/production',
      // pre-deploy action
      'pre-deploy-local': 'git fetch --all',
      // post-deploy action
      'post-deploy':
        'npm install --ignore-scripts && pm2 startOrRestart ecosystem.config.js --env production',
    },
  },
}
