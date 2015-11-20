angular.module('starter.controllers', [])

    .controller('AppCtrl', function ($scope, $ionicModal, $timeout, $location, $state) {

        // With the new view caching in Ionic, Controllers are only called
        // when they are recreated or on app start, instead of every page change.
        // To listen for when this page is active (for example, to refresh data),
        // listen for the $ionicView.enter event:
        //$scope.$on('$ionicView.enter', function(e) {
        //});

        // Form data for the login modal
        //	$scope.loginData = {};

        // Create the login modal that we will use later
        //	$ionicModal.fromTemplateUrl('templates/login.html', {
        //		scope: $scope
        //	}).then(function(modal) {
        //		$scope.modal = modal;
        //		//$scope.modal.show();
        //	});

        // Triggered in the login modal to close it
        //	$scope.closeLogin = function() {
        //		$scope.modal.hide();
        //	};
        //
        //	// Open the login modal
        //	$scope.login = function() {
        //		$scope.modal.show();
        //	};

        $scope.logout = function () {
            window.localStorage.removeItem("fdd_ustel");
            window.localStorage.removeItem("fdd_usid");
            window.localStorage.removeItem("fdd_usname");
            window.localStorage.removeItem("fdd_uscity");
            window.localStorage.removeItem("fdd_uslogindate");
            /*	window.localStorage.removeItem("fdd_uslogindate");
             window.localStorage.removeItem("fdd_uslogindate");*/
            $state.go('login');
            //		$scope.modal.show();
        };

        // Perform the login action when the user submits the login form
        //	$scope.doLogin = function() {
        //		console.log('Doing login', $scope.loginData);
        //
        //		// Simulate a login delay. Remove this and replace with your login
        //		// code if using a login system
        //		$timeout(function() {
        //			$scope.closeLogin();
        //		}, 1000);
        //	};


    })

    .controller('bootContent', function ($scope, $state) {

        $scope.goDefault = function () {
            window.localStorage.setItem("fdd_boot", "1");
            $state.go('login');
        };

        $scope.boot = localStorage.getItem("fdd_boot");

        if ($scope.boot) {
            //		$state.go('login');
            $state.go('boot');
        } else {
            $state.go('boot');
        }
    })

    .controller('menulistContent', function ($scope, $stateParams, $location, $state, $timeout) {
        $scope.usname = localStorage.getItem("fdd_usname");
        $scope.tel = localStorage.getItem("fdd_ustel");
        if (localStorage.getItem("fdd_usid") == 20 || localStorage.getItem("fdd_usid") == 29) {
            $scope.visible = true;
        }
        if (!$scope.tel) {
            $state.go('login');
        }

    })
    .controller('houseCtrl', function ($scope, $stateParams, $location, $state, $timeout) {
        //	$scope.titlename = localStorage.getItem("salesHouseName");
        //	$scope.houseid = localStorage.getItem("salesHouseID");

        $scope.logout = function () {
            window.localStorage.setItem("fdd_ustel", "");
            window.localStorage.setItem("fdd_usid", "");
            window.localStorage.setItem("fdd_usname", "");
            window.localStorage.setItem("fdd_uscity", "");
            window.localStorage.setItem("fdd_uslogindate", "");
            $state.go('login');
            //		$scope.modal.show();
        };

        $scope.$watch(function () {
            houseid = localStorage.getItem("salesHouseID");
        });

        $scope.toProducerAll = function () {
            $state.go('house.houselist', {
                houseid: houseid
            })
        };
        $scope.toProducerBB = function () {
            $state.go('house.houselistbb', {
                houseid: houseid
            })
        };
        $scope.toProducerDK = function () {
            $state.go('house.houselistdk', {
                houseid: houseid
            })
        };
    })

    .controller('loginContent', function ($scope, $state, $ionicPopup) {
        $scope.loginData = {};
        $scope.doLogin = function () {
            //if (len($scope.loginData.tel))
            if (!$scope.loginData.tel || !$scope.loginData.password) {
                var alertPopup = $ionicPopup.alert({
                    title: '<i class=\'icon ion-close-circled\'></i>　出错了！',
                    template: '手机号或密码输入错误！'
                });
            } else {
                $.getJSON(fdd_serverpath + "sales/saleslogin/?jsoncallback=?&tel=" + $scope.loginData.tel + "&pwd=" + $scope.loginData.password, function (json) {
                    if (json.code == "1") {
                        //登录成功，记录cookie  30天
                        var logindate = new Date()
                        window.localStorage.setItem("fdd_ustel", $scope.loginData.tel);
                        window.localStorage.setItem("fdd_usid", json.data.id);
                        window.localStorage.setItem("fdd_usname", json.data.name);
                        window.localStorage.setItem("fdd_uscity", json.data.city);
                        window.localStorage.setItem("fdd_uslogindate", logindate);
                        //跳转页面地址
                        $state.go('app.default');
                    } else {
                        var alertPopup = $ionicPopup.alert({
                            title: '<i class=\'icon ion-close-circled\'></i>　出错了！',
                            template: '手机号或密码输入错误！'
                        });

                    }
                });

                //console.log('Doing login', $scope.loginData);
            }
            ;
        };
    })

    .controller('defaultCtrl', function ($scope, $stateParams, $state, $ionicPopup, $timeout) {
        $scope.usname = localStorage.getItem("fdd_usname");
        $scope.titlename = "选择楼盘";
        $scope.$watch(function () {
            $scope.houseid = localStorage.getItem("salesHouseID");
            $scope.housename = localStorage.getItem("salesHouseName");
        });

        $scope.doRefresh = function (time) {
//		console.log('Refreshing!3');
            $timeout(function () {
                //	type [Today,Week,Month,LastMonth,All]
                $.ajax({
                    type: "POST",
                    url: fdd_serverpath + "ngSales/houseStat",
                    success: function (res) {
                        $scope.$apply(function () {
                            $scope.bbc = res.data[0].bbc;
                            $scope.rzc = res.data[0].rzc;
                            $scope.dkc = res.data[0].dkc;
                            $scope.qrc = res.data[0].qrc;
                            $scope.rgc = res.data[0].rgc;
                        });
                    },
                    data: {
                        hid: localStorage.getItem("salesHouseID"),
                        type: "Today"
                    },
                    dataType: "jsonp"
                })
                $.ajax({
                    type: "POST",
                    url: fdd_serverpath + "ngSales/houseStat",
                    success: function (res) {
                        $scope.$apply(function () {
                            $scope.wbbc = res.data[0].bbc;
                            $scope.wrzc = res.data[0].rzc;
                            $scope.wdkc = res.data[0].dkc;
                            $scope.wqrc = res.data[0].qrc;
                            $scope.wrgc = res.data[0].rgc;
                        });
                    },
                    data: {
                        hid: localStorage.getItem("salesHouseID"),
                        type: "Week"
                    },
                    dataType: "jsonp"
                })

                $scope.$broadcast('scroll.refreshComplete');
            }, time);

        };
        if (!localStorage.getItem("salesHouseID")) {
            $state.go('app.house');
        } else {
            $scope.doRefresh(0);
        }


    })

    .controller('houselistCtrl', function ($scope, $stateParams, $ionicPopup, $timeout) {
        $scope.housename = localStorage.getItem("salesHouseName");
        $scope.houseid = localStorage.getItem("salesHouseID");

        $scope.doRefresh = function (time) {
//		console.log('Refreshing!');
            $timeout(function () {
                //simulate async response
                //$scope.items.push('New Item ' + Math.floor(Math.random() * 1000) + 4);
                $.ajax({
                    type: "POST",
                    url: fdd_serverpath + "ngSales/userList",
                    success: function (res) {
                        $scope.$apply(function () {
                            $scope.usr2listarry = res.data;
                        });
                    },
                    data: {
                        sid: localStorage.getItem("fdd_usid"),
                        hid: localStorage.getItem("salesHouseID")
                    },
                    dataType: "jsonp"
                })

                //Stop the ion-refresher from spinning
                $scope.$broadcast('scroll.refreshComplete');

            }, time);

        };
        $scope.doRefresh(0);


        $scope.renzheng = function (fuid, faid, fhid, fshid) {
            var confirmPopup = $ionicPopup.confirm({
                title: '房大大提示',
                template: '确认要“认证”客户吗?'
            });
            confirmPopup.then(function (res) {
                if (res) {
                    uid = fuid;
                    aid = faid;
                    hid = fhid;
                    shid = fshid;

                    $.getJSON(fdd_serverpath + "sales/renzheng/?jsoncallback=?&aid=" + aid + "&hid=" + hid + "&uid=" + uid + "&shid=" + shid, function (json) {
                        if (json.code == "1") {

                            console.log('成功');
                            $scope.doRefresh(0);
                            $scope.$watch(function () {
                                $scope.usr2listarry;
                            })

                        } else {
                            console.log('失败');
                        }
                    });

                } else {
                    console.log('取消');
                }
            });
        };

        $scope.querren = function (fuid, faid, fhid, fshid) {
            var confirmPopup = $ionicPopup.confirm({
                title: '房大大提示',
                template: '确认要通过客户“带看”吗?'
            });
            confirmPopup.then(function (res) {
                if (res) {
                    uid = fuid;
                    aid = faid;
                    hid = fhid;
                    shid = fshid;

                    $.getJSON(fdd_serverpath + "sales/daikandone/?jsoncallback=?&aid=" + aid + "&hid=" + hid + "&uid=" + uid + "&shid=" + shid, function (json) {
                        if (json.code == "1") {

                            console.log('成功');
                            $scope.doRefresh(0);
                        } else {
                            console.log('失败');
                        }
                    });
                } else {
                    console.log('取消');
                }
            });
        };


        //需要处理if houseid == ""的情况。


    })

    .controller('houselistBBCtrl', function ($scope, $stateParams, $ionicPopup, $timeout) {


        $scope.housename = localStorage.getItem("salesHouseName");
        $scope.houseid = localStorage.getItem("salesHouseID");

        $scope.renzheng = function (fuid, faid, fhid, fshid) {
            var confirmPopup = $ionicPopup.confirm({
                title: '房大大提示',
                template: '确认要“认证”客户吗?'
            });
            confirmPopup.then(function (res) {
                if (res) {
                    uid = fuid;
                    aid = faid;
                    hid = fhid;
                    shid = fshid;

                    $.getJSON(fdd_serverpath + "sales/renzheng/?jsoncallback=?&aid=" + aid + "&hid=" + hid + "&uid=" + uid + "&shid=" + shid, function (json) {
                        if (json.code == "1") {

                            console.log('成功');
                            $scope.doRefresh(0);
                            $scope.$watch(function () {
                                $scope.usr2listarry;
                            })

                        } else {
                            console.log('失败');
                        }
                    });

                } else {
                    console.log('取消');
                }
            });
        };

        $scope.doRefresh = function (time) {
//		console.log('Refreshing!');
            $timeout(function () {
                //simulate async response
                //$scope.items.push('New Item ' + Math.floor(Math.random() * 1000) + 4);
                $.ajax({
                    type: "POST",
                    url: fdd_serverpath + "ngSales/userList",
                    success: function (res) {
                        $scope.$apply(function () {
                            $scope.usr2listarry = res.data;
                        });
                    },
                    data: {
                        sid: localStorage.getItem("fdd_usid"),
                        hid: localStorage.getItem("salesHouseID"),
                        type: "BB"
                    },
                    dataType: "jsonp"
                })

                //Stop the ion-refresher from spinning
                $scope.$broadcast('scroll.refreshComplete');

            }, time);

        };
        $scope.doRefresh(0);
    })

    .controller('houselistDKCtrl', function ($scope, $stateParams, $ionicPopup, $timeout) {

        $scope.housename = localStorage.getItem("salesHouseName");
        $scope.houseid = localStorage.getItem("salesHouseID");

        $scope.querren = function (fuid, faid, fhid, fshid) {
            var confirmPopup = $ionicPopup.confirm({
                title: '房大大提示',
                template: '确认要通过客户“带看”吗?'
            });
            confirmPopup.then(function (res) {
                if (res) {
                    uid = fuid;
                    aid = faid;
                    hid = fhid;
                    shid = fshid;

                    $.getJSON(fdd_serverpath + "sales/daikandone/?jsoncallback=?&aid=" + aid + "&hid=" + hid + "&uid=" + uid + "&shid=" + shid, function (json) {
                        if (json.code == "1") {

                            console.log('成功');
                            $scope.doRefresh(0);
                        } else {
                            console.log('失败');
                        }
                    });
                } else {
                    console.log('取消');
                }
            });
        };

        $scope.doRefresh = function (time) {
//		console.log('Refreshing!');
            $timeout(function () {
                //simulate async response
                //$scope.items.push('New Item ' + Math.floor(Math.random() * 1000) + 4);
                $.ajax({
                    type: "POST",
                    url: fdd_serverpath + "ngSales/userList",
                    success: function (res) {
                        $scope.$apply(function () {
                            $scope.usr2listarry = res.data;
                        });
                    },
                    data: {
                        sid: localStorage.getItem("fdd_usid"),
                        hid: localStorage.getItem("salesHouseID"),
                        type: "DK"
                    },
                    dataType: "jsonp"
                })

                //Stop the ion-refresher from spinning
                $scope.$broadcast('scroll.refreshComplete');

            }, time);

        };
        $scope.doRefresh(0);
    })

    .controller('dynamicsCtrl', function ($scope, $stateParams) {
        $.getJSON(fdd_serverpath + "sales/articlelist/?jsoncallback=?&sid=", function (json) {
            $scope.dynamicsarry = json.data
            $scope.imgurl = "http://123.57.230.82:8001/"
//		console.log('ok!');
        });
    })

    .controller('affirmCtrl', function ($scope, $stateParams) {

    })


    .controller('xmzlCtrl', function ($scope, $state, $stateParams) {
        $.ajax({
            type: "POST",
            url: fdd_serverpath + "ngSales/salesList",
            success: function (res) {
                $scope.sales = res.data;
            },
            data: {managerID: window.localStorage.getItem("fdd_usid")},
            dataType: "jsonp"
        });
        $scope.distributeHouses = function (saleid) {
            $state.go("app.distributeHouses",{
                saleid : saleid
            });
        }
    })
    .controller('distributeHousesCtrl', function ($scope, $stateParams, $ionicHistory) {
        var ownHouses = [], newHouses = [];
        var saleid = $stateParams.saleid;
        $.ajax({
            type: "POST",
            url: fdd_serverpath + "ngSales/houseList",
            success: function (res) {
                var houses = res.data;

                for(var house of houses){
                    if(house.sid == saleid){
                        ownHouses.push(house.id);
                        newHouses.push(house.id);
                        house.clazz = "button button-positive";
                    }else{
                        house.clazz = "button";
                    }
                }
                $scope.saleid = saleid;
                $scope.houses = houses;
            },
            data: {managerID: window.localStorage.getItem("fdd_usid")},
            dataType: "jsonp"
        });

        $scope.distributeHouse = function (house) {
           if(house.clazz.indexOf("button-positive")!=-1){
               //在楼盘数组中删除已经选择的楼盘
               newHouses.splice($.inArray(house.id),1);
               house.clazz = "button";
           }else{
               //在楼盘数组中添加选择楼盘
               newHouses.push(house.id);
               house.clazz = "button button-positive"
           }
        }

        $scope.saveHoues = function () {
            var delHouses = [];
            for(var ownHouse of ownHouses){
                if($.inArray(ownHouse,newHouses)==-1){
                    delHouses.push(ownHouse);
                }
            }
            if(delHouses.length<=0 && newHouses.length<=0){
                $ionicHistory.goBack();
                return;
            }
            $.ajax({
                type:"POST",
                url:fdd_serverpath+"ngSales/distributeHouse",
                success:function(res){
                    console.info(res);
                    if(res.code === 1){
                        $ionicHistory.goBack();
                    }else{
                        alert(res.msg);
                    }
                },
                data:{saleID : saleid, managerID : window.localStorage.getItem("fdd_usid"),delHouseIDs : delHouses, addHouseIDs : newHouses },
                dataType:"jsonp"
            });
        }
    })
    .controller('selecthouseCtrl', function ($scope, $state, $timeout) {
        $scope.chkHouse = function (houseid, housename) {
            window.localStorage.setItem("salesHouseID", houseid);
            window.localStorage.setItem("salesHouseName", housename);
            //window.location.href="#/houselist/"+houseid;
            //		return $location.path("/houselist/all/" + houseid);
            $state.go('house.houselist', {
                houseid: houseid
            })
        };

        $scope.$watch(function () {
            $scope.houseid = localStorage.getItem("salesHouseID");
        });
        $scope.doRefresh = function (time) {
            $timeout(function () {
                $.getJSON(fdd_serverpath + "sales/houselistofsale?callback=?&sid=" + localStorage.getItem("fdd_usid"), function (json) {
                    $scope.$apply(function () {
                        $scope.houselistarry = json.data
                    })
                });

                $scope.$broadcast('scroll.refreshComplete');
            }, time);

        };
        $scope.doRefresh(0);
    });