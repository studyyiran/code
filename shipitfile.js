module.exports = shipit => {

    require('shipit-deploy')(shipit);
    require('shipit-shared-copy')(shipit);

    shipit.initConfig({
        default: {
            branch: 'master',
            deployTo: '/var/www/avril',
            dirToCopy: '/tmp/avril/build',
            ignores: ['.DS_Store', '.git', 'node_modules'],
            keepReleases: 2,
            // key: '~/.ssh/id_rsa_production',
            repositoryUrl: 'git@lab.aihuishou.com:uptradeit/avril.git',
            rsync: ['--del'],
            shallowClone: false,
            workspace: '/tmp/avril'
        },
        prod: {
            servers: 'root@47.56.40.75'
        },
    });

    shipit.on('init', () => {
        return shipit.local('mkdir -p /tmp/avril');
    });
    shipit.blTask('git-init', () => {
        shipit.log('git-init.');
        return shipit.local('git init', {
            cwd: '/tmp/avril'
        });
    });

    // npm install & build
    shipit.blTask('npm-install', () => {
        shipit.log('npm install.');
        return shipit.local('yarn', {
            cwd: '/tmp/avril'
        });
    });

    shipit.blTask('npm-build', () => {
        shipit.log('npm build start.');
        return shipit.local('yarn run pub', {
            cwd: '/tmp/avril'
        });
    });

    shipit.blTask('pm2', async () => {
        shipit.log('pm2');
        await shipit.local('cd /var/www/avril', {
            cwd: '/tmp/avril'
        });
        await shipit.local('pm2 stop uptradeit', {
            cwd: '/var/www/avril'
        });

        shipit.local('pm2 start ecosystem.config.js --env=production', {
            cwd: '/var/www/avril'
        });
    });

    shipit.on('fetched', () => {
        shipit.log('run npm build');
        shipit.start(['git-init', 'npm-install', 'npm-build']);
    });

    shipit.on('published', () => {
        shipit.log('run pm2');
        shipit.start(['pm2']);
    });

};