sap.ui.jsview("mvk.view.Menu", {

    getControllerName: function() {
        return "mvk.view.Menu";
    },

    createContent: function(oController) {

        var oListTemplate = new sap.m.StandardListItem({
            title: "{title}",
            icon: "{icon}",
            description: "{description}",
            type: sap.m.ListType.Navigation,
            customData: new sap.ui.core.CustomData({
                key: "targetPage",
                value: "{targetPage}"
            })
        });

        var oList = new sap.m.List({
            selectionChange: [oController.doNavOnSelect, oController],
            mode: sap.m.ListMode.SingleSelectMaster
        });
        oList.bindAggregation("items", "/Menu", oListTemplate);


        return new sap.m.Page({
            customHeader: new sap.m.Bar({
                contentLeft: [new sap.m.Image("ui5Logo", {
                    src: "img/57_iPhone_Desktop_Launch.png",
                    width: "35px",
                    height: "35px"
                })],
                contentMiddle: [new sap.m.Text({
                    text: "{i18n>WELCOME_TITLE}"
                })]
            }),
            content: [oList],
            footer: new sap.m.Bar({
                contentMiddle: [new sap.m.Link("infos", {
                    text: "Infos",
                    href: "https://markusvankempen.wordpress.com/"
                }),
                new sap.m.Link("email", {
                    text: "mvk@ca.ibm.com",
                    href: "mailto:mvk@ca.ibm.com"
                }),
                new sap.m.Link("mvk", {
                    text: "twitter",
                    href: "https://twitter.com/intent/tweet?screen_name=markusvankempen"
                       })                
                ]
            })
        });
    }

});