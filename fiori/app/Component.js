jQuery.sap.declare("mvk.app.Component");

jQuery.sap.require("sap.ui.model.resource.ResourceModel");

sap.ui.core.UIComponent.extend("mvk.app.Component", {

    createContent: function() {

        // since v0.7.0 the Component is not needed anymore
        // we keep it for your project specific usage

    },

	init : function() {
		sap.ui.core.UIComponent.prototype.init.apply(this, arguments);
		
		// remove full page Pace loading indicator
		// if you will not use different animations
		// you can skip the next two lines
		//jQuery("#paceCss").remove();
		//jQuery.sap.includeStyleSheet("pace/ui5.css");
	}
});