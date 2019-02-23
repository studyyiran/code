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
            repositoryUrl: 'git@lab.aihuishou.com:uptradeit/avril.git',
            rsync: ['--del'],
            shallowClone: false,
            workspace: '/tmp/avril'
        },
        prod: {
            servers: 'root@47.56.40.75',
            key: '~/.ssh/id_rsa_production',
        },
    });

    shipit.on('init', () => {
        return shipit.local('mkdir -p /tmp/avril');
    });

    // npm install & build
    shipit.blTask('npm-install', () => {
        shipit.log('npm install.');
        return shipit.local('npm install', {
            cwd: '/tmp/avril'
        });
    });

    shipit.blTask('npm-build', () => {
        shipit.log('npm build start.');
        return shipit.local('npm run pub', {
            cwd: '/tmp/avril'
        });
    });

    shipit.on('fetched', () => {
        shipit.log('run npm build');
        shipit.start(['npm-install', 'npm-build']);
    });

};