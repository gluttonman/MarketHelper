// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
//houseid=localStorage.getItem("salesHouseID");
angular.module('starter', ['ionic', 'starter.controllers'])

    .run(function ($ionicPlatform) {

        $ionicPlatform.ready(function () {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            if (window.cordova && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                cordova.plugins.Keyboard.disableScroll(true);

            }
            if (window.StatusBar) {
                // org.apache.cordova.statusbar required
                StatusBar.styleDefault();
            }
        });
    })

    .config(function ($stateProvider, $urlRouterProvider) {
        $stateProvider

            .state('app', {
                url: '',
                abstract: true,
                templateUrl: 'templates/menu.html',
                controller: 'AppCtrl'
            })

            .state('app.default', {
                url: '/default',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/default.html',
                        controller: 'defaultCtrl'
                    },
                    'menulistContent': {
                        templateUrl: 'templates/menu-list.html',
                        controller: 'menulistContent'
                    }
                }
            })

            .state('boot', {
                url: '/boot',
                templateUrl: 'templates/boot.html',
                controller: 'bootContent'
            })

            .state('app.explain', {
                url: '/explain',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/explain.html',
                    },
                    'menulistContent': {
                        templateUrl: 'templates/menu-list.html',
                        controller: 'menulistContent'
                    }
                }
            })


            .state('login', {
                url: '/login',
                templateUrl: 'templates/login.html',
                controller: 'loginContent'
            })

            .state('app.house', {
                url: '/selecthouse',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/selecthouse.html',
                        controller: 'selecthouseCtrl'
                    },
                    'menulistContent': {
                        templateUrl: 'templates/menu-list.html',
                        controller: 'menulistContent'
                    }
                }
            })

            .state('app.xmzl', {
                url: '/xmzl',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/xmzl.html',
                        controller: 'xmzlCtrl'
                    },
                    'menulistContent': {
                        templateUrl: 'templates/menu-list.html',
                        controller: 'menulistContent'
                    }
                }
            })
            .state('app.distributeHouses', {//楼盘分配
                url: '/distributeHouses/:saleid',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/distributeHouses.html',
                        controller: 'distributeHousesCtrl'
                    },
                    'menulistContent': {
                        templateUrl: 'templates/menu-list.html',
                        controller: 'menulistContent'
                    }
                }
            })

            .state('app.dynamics', {
                url: '/dynamics',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/dynamics.html',
                        controller: 'dynamicsCtrl'
                    },
                    'menulistContent': {
                        templateUrl: 'templates/menu-list.html',
                        controller: 'menulistContent'
                    }
                }
            })

            .state('app.affirm', {
                url: '/affirm',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/affirm.html',
                        controller: 'affirmCtrl'
                    },
                    'menulistContent': {
                        templateUrl: 'templates/menu-list.html',
                        controller: 'menulistContent'
                    }
                }
            })

            .state('house', {
                url: '',
                abstract: true,
                templateUrl: 'templates/tabs.html',
                controller: 'houseCtrl',
            })


            .state('house.houselist', {
                url: '/houselist/:houseid',
                views: {
                    'houselist-all': {
                        templateUrl: 'templates/houselist-all.html',
                        controller: 'houselistCtrl'
                    },
                    'menulistContent': {
                        templateUrl: 'templates/menu-list.html',
                        controller: 'menulistContent'
                    }
                }
            })

            .state('house.houselistbb', {
                url: '/houselist/bb/:houseid',
                views: {
                    'houselist-bb': {
                        templateUrl: 'templates/houselist-bb.html',
                        controller: 'houselistBBCtrl'
                    },
                    'menulistContent': {
                        templateUrl: 'templates/menu-list.html',
                        controller: 'menulistContent'
                    }
                }
            })

            .state('house.houselistdk', {
                url: '/houselist/dk/:houseid',
                views: {
                    'houselist-dk': {
                        templateUrl: 'templates/houselist-dk.html',
                        controller: 'houselistDKCtrl'
                    },
                    'menulistContent': {
                        templateUrl: 'templates/menu-list.html',
                        controller: 'menulistContent'
                    }
                }
            });
        // if none of the above states are matched, use this as the fallback
//if(houseid){$urlRouterProvider.otherwise('/houselist/'+houseid);}else{$urlRouterProvider.otherwise('/house');}
        $urlRouterProvider.otherwise('/boot');
    });
