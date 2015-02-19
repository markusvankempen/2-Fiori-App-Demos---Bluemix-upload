jQuery.sap.require("mvk.app.config");

sap.ui.controller("mvk.view.Info", {

    onInit: function() {
        this.bus = sap.ui.getCore().getEventBus();
    },

    doNavBackLaunchpad: function(event) {
        this.bus.publish("nav", "backToPage", {id : "Launchpad"});
    },

    doNavBack: function(event) {
        this.bus.publish("nav", "back");
    } 
});