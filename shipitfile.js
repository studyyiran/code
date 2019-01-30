module.exports = shipit => {

    require('shipit-deploy')(shipit);
    require('shipit-shared-copy')(shipit);

    shipit.initConfig({
        default: {
            branch: 'master',
            deployTo: '/var/bmb/',
            dirToCopy: '/tmp/bmb/build',
            ignores: ['.DS_Store', '.git', 'node_modules'],
            keepReleases: 2,
            repositoryUrl: 'git@code.aihuishou.com:cooperation/bdbm.git',
            rsync: ['--del'],
            shallowClone: false,
            workspace: '/tmp/bmb'
        },
        prod: {
            servers: 'deploy@10.80.221.155',
        },
    });

    shipit.on('init', () => {
        return shipit.local('mkdir -p /tmp/bmb');
    });

    // npm install & build
    shipit.blTask('npm-install', () => {
        shipit.log('npm install.');
        return shipit.local('npm install', { cwd: '/tmp/bmb' });
    });

    shipit.blTask('npm-build', () => {
        shipit.log('npm build start.');
        return shipit.local('npm run pub', { cwd: '/tmp/bmb' });
    });

    shipit.on('fetched', () => {
        shipit.log('run npm build');
        shipit.start(['npm-install', 'npm-build']);
    });

};
