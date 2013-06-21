define([
        "underscore",
        "backbone",
        "jquery",
        'text!template/DesktopShowView.html',
        'config/config',
        'js/jquery.flot',
        'js/jquery.flot.pie',
], function(_, Backbone, $, DesktopShowViewHtml, Config, JQFlot, JQFlotPie) {

    var ChartShow = Backbone.View.extend({
        initialize: function(options) {
            this.render();
        },
        render: function() {

            //计算各航空的合同数目
            var partA = new Array(),
                partB = new Array();
            var NH = 0,
                SH = 0,
                HH = 0,
                GJS = 0,
                HT = 0,
                HTZ1 = 0,
                HTZ2 = 0,
                contractsCount = 0;

            $.get(Config.Server("contracts"), function(data, status) {
                _.each(data, function(contract) {
                    contractsCount++;
                });

                for (var i = 0; i < contractsCount; i++) {
                    partA[i] = data[i].partyA;
                    partB[i] = data[i].partyB;
                }
                for (var i in partA) {
                    if (partA[i] == "南航")
                        NH++;
                    else if (partA[i] == "海航")
                        HH++;
                    else if (partA[i] == "深航")
                        SH++;
                    else if (partA[i] == "港交所")
                        GJS++;
                }
                for (var i in partB) {
                    if (partB[i] == "恒拓")
                        HT++;
                    else if (partB[i] == "恒拓子公司A")
                        HTZ1++;
                    else if (partB[i] == "恒拓子公司B")
                        HTZ2++;
                }

                //根据统计的数据画出饼图
                var optionPie1 = {
                    series: {
                        pie: {
                            show: true,
                            radius: 'auto',
                            label: {
                                show: true,
                                radius: 1,
                                formatter: function(label, slice) {
                                    return '<div style="font-size:x-small;text-align:center;padding:2px;color:' + slice.color + ';">' + '<br/>' + Math.round(slice.percent) + '%</div>';
                                },
                                background: {
                                    opacity: 0,
                                    color: null
                                }
                            }
                        }
                    },
                    grid: {
                        hoverable: true,
                        clickable: true
                    }
                };
                var pieData1 = [{
                        label: "南航",
                        data: NH,
                        color: "#FF0033"
                    }, {
                        label: "深航",
                        data: SH,
                        color: "#0066FF"
                    }, {
                        label: "海航",
                        data: HH,
                        color: "#FFFF33"
                    }, {
                        label: "港交所",
                        data: GJS,
                        color: "#66CC00"
                    }
                ];
                //console.info($("#container1"),pieData1,optionPie1);
                $.plot($("#container1"), pieData1, optionPie1);
                $("#container1").bind("plotclick", function(event, pos, obj) {
                    window.location.hash = "#pieDetial" + '/' + obj.series.label;
                });

                var optionPie2 = {
                    series: {
                        pie: {
                            show: true,
                            radius: 'auto',
                            label: {
                                show: true,
                                radius: 1,
                                formatter: function(label, slice) {
                                    return '<div style="font-size:x-small;text-align:center;padding:2px;color:' + slice.color + ';">' + '<br/>' + Math.round(slice.percent) + '%</div>';
                                },
                                background: {
                                    opacity: 0,
                                    color: null
                                }
                            }
                        }
                    },
                    grid: {
                        hoverable: true,
                        clickable: true
                    }
                };
                var pieData2 = [{
                        label: "恒拓",
                        data: HT,
                        color: "#FF3300"
                    }, {
                        label: "恒拓子公司A",
                        data: HTZ1,
                        color: "#CCFF00"
                    }, {
                        label: "恒拓子公司B",
                        data: HTZ2,
                        color: "#66FF66"
                    }
                ];
                $.plot($("#container2"), pieData2, optionPie2);
                $("#container2").bind("plotclick", function(event, pos, obj) {
                    window.location.hash = "#pieDetial" + '/' + obj.series.label;
                });
                $("#content1").text("甲方公司");
                $("#content2").text("乙方公司");
            });
            return this;
        }
    });
    return ChartShow;
});