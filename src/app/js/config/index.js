function init(){

    var environment = {
        name : 'dev',
        url  : window.location.origin
    },
    baseUrls = {
        services  : environment.url + '/services',
        fallBacks : environment.url + '/data/fallbacks',
        templates : environment.url + '/templates'
    },
    services = {},
    templates = {}
    config = {
        environment : environment,
        baseUrls    : baseUrls,
        services    : services,
        templates   : templates
    }

    return config;
}

module.exports = init();