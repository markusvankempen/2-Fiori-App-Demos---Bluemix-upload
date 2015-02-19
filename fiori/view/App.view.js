jQuery.sap.require("mvk.app.config");


function mvk(txt)
{
//    alert("debug: "+txt);
jQuery.sap.log.debug("debug: "+txt);

}


sap.ui.jsview("mvk.view.App", {

    getControllerName: function() {
        return "mvk.view.App";
    },

    createContent: function(oController) {

        if(jQuery.sap.getUriParameters().get("mode") === "LeftMenuNavi"){
            mvk.app.config.LaunchpadMode = false;
        }

        // set i18n model
        var oI18nModel = new sap.ui.model.resource.ResourceModel({
            bundleUrl: "i18n/i18n.properties"
        });
        sap.ui.getCore().setModel(oI18nModel, "i18n");
        this.setModel(oI18nModel, "i18n");

        // set device model
        var oDeviceModel = new sap.ui.model.json.JSONModel({
            isTouch: sap.ui.Device.support.touch,
            isNoTouch: !sap.ui.Device.support.touch,
            isPhone: sap.ui.Device.system.phone && !mvk.app.config.LaunchpadMode,
            isNoPhone: !sap.ui.Device.system.phone,
            listMode: (sap.ui.Device.system.phone) ? "None" : "SingleSelectMaster",
            listItemType: (sap.ui.Device.system.phone) ? "Active" : "Inactive",
            launchpadMode: mvk.app.config.LaunchpadMode
        });
        oDeviceModel.setDefaultBindingMode("OneWay");
        sap.ui.getCore().setModel(oDeviceModel, "device");
        this.setModel(oDeviceModel, "device");

        // to avoid scrollbars on desktop the root view must be set to block display
        this.setDisplayBlock(true);

        this.app = new sap.m.SplitApp({
            afterDetailNavigate: function() {
                if (sap.ui.Device.system.phone || mvk.app.config.LaunchpadMode) {
                    this.hideMaster();
                }
            },
            homeIcon: {
                'phone': 'img/57_iPhone_Desktop_Launch.png',
                'phone@2': 'img/114_iPhone-Retina_Web_Clip.png',
                'tablet': 'img/72_iPad_Desktop_Launch.png',
                'tablet@2': 'img/144_iPad_Retina_Web_Clip.png',
                'favicon': 'img/favicon.ico',
                'precomposed': false
            }
        });
        if(mvk.app.config.LaunchpadMode){
            this.app.setMode(sap.m.SplitAppMode.HideMode);
        }


        this.app.addMasterPage(sap.ui.jsview("Menu", "mvk.view.Menu"));

        if(mvk.app.config.LaunchpadMode){
            this.app.addDetailPage(sap.ui.jsview("Launchpad", "mvk.view.Launchpad"));
        }

        this.app.addDetailPage(sap.ui.xmlview("Info", "mvk.view.Info"));
        
        // navigate to the first page in both master and detail areas.
        // the toMaster must be called after calling the toDetail, because both of them point to the same reference in phone and 
        // the real first page that will be shown in phone is the page in master area. 
        if(mvk.app.config.LaunchpadMode){
            this.app.toDetail("Launchpad");
			this.app.setBackgroundImage("img/bg.jpg");
			sap.ui.core.BusyIndicator.hide();

        } else {
            this.app.toMaster("Menu"); 
            this.app.setBackgroundImage("img/bg.jpg");
        }
        return this.app;
    }
});