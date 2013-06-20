define(["backbone", "jquery", 'text!template/DesktopShowView.html', 'js/jquery.flot', 'js/jquery.flot.pie'], 
    function(Backbone, $, DesktopShowViewHtml, JQFlot, JQFlotPie) {

    var DesktopShowView = Backbone.View.extend({
        tagName: 'div',
        template: _.template(DesktopShowViewHtml),
        initialize: function(options) {
            $(".active").removeClass();
            $("#desktop").addClass("active");
            this.render();
        },

        events: {
            'click .BusinessInfo': 'BusinessInfo',
            'click .BusinessTrend': 'BusinessTrend'
        },
        render: function() {
            this.$el.html(this.template());
            return this;
        },
        BusinessInfo: function() {
            $("#BTrend").removeClass("active");
            $("#BInfo").addClass("active");
        },
        BusinessTrend: function() {
            $("#BInfo").removeClass("active");
            $("#BTrend").addClass("active");
        }
    });
    return DesktopShowView;
});