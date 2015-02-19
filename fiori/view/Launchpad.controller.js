sap.ui.controller("mvk.view.Launchpad", {
	
    onInit: function() {
        this.bus = sap.ui.getCore().getEventBus();
    },

	doNavOnSelect : function (event) {
		this.bus.publish("nav", "to", {
			id : event
		});
	}	

});