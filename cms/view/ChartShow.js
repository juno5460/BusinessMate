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
            render: function(){

            //计算各航空的合同数目
            // var part = new Array();
            // part.add("111");
            // console.info(part.length());
            console.info("test.....");
             $.get(Config.Server("contracts"), function(data, status) {
                //console.info(data);
                 _.each(data, function(contract) {
                    
                });
            });   


            var optionPie1 = {
                series: {
                    pie: {
                        show: true,
                        radius: 'auto',
                        label: {
                            show: true,
                            radius: 0.9,
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
                    data: 5,
                    color: "#005CDE"
                }, {
                    label: "深航",
                    data: 2,
                    color: "#00A36A"
                }, {
                    label: "海航",
                    data: 2,
                    color: "#7D0096"
                }, {
                    label: "港交所",
                    data: 2,
                    color: "#992B00"
                }
            ];
            $("#title1").text("合同进展情况");
            $.plot($("#container1"), pieData1, optionPie1);
            $("#container1").bind("plotclick", function(event, pos, obj) {
                window.location.hash="#pieDetial"+'/'+obj.series.label;
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
                }
            };
            var pieData2 = [{
                    label: "恒拓",
                    data: 10,
                    color: "#932B00"
                }
            ];
            $.plot($("#container2"), pieData2, optionPie2);
            $("#content1").text("甲方公司");
            $("#content2").text("乙方公司");

            return this;
        }
    });
    return ChartShow;
});