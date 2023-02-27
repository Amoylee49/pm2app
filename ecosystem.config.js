module.exports = {
    apps: [
        //First Application
        {
            name: 'pm2app',
            script: 'index.js',
            env: {
                COMMON_VARIABLE: "true"
            },
            env_production: {
                NODE_ENV: "production"
            }
        }],

    deploy: {
        production: {
            user: 'root',
            host: '192.168.195.5',
            ref: 'origin/master',
            repo: 'GIT_REPOSITORY',
            path: 'DESTINATION_PATH',
            'pre-deploy-local': '',
            'post-deploy': 'npm install && pm2 reload ecosystem.config.js --env production',
            'pre-setup': ''
        },
        dev: {}
    }
};