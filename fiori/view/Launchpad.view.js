// ======= HECQTA ========
sap.ui.jsview("mvk.view.Launchpad", {

    getControllerName: function() {
        return "mvk.view.Launchpad";
    },

    createContent: function(oController) {

        var tc = new sap.m.TileContainer("tc", {});

        var model = new sap.ui.model.json.JSONModel("model/menu.json");
        model.attachRequestCompleted(null, function() {
            function navFn(target) {
                return function() {
                    oController.doNavOnSelect(target);
                }
            }

            var data = null,
                m = 0,
                menu = null;
            data = model.getData();
            if (data && data.Menu) {
                for (m = 0; m < data.Menu.length; m++) {
                    menu = data.Menu[m];
                    tc.addTile(new sap.m.StandardTile({
                        icon: menu.icon,
                        title: menu.title,
                        info: menu.description,
                        press: navFn(menu.targetPage)
                    }));
                }
            }

        });

        var page = new sap.m.Page({
            setShowHeader: true,
            title: "MVK's UI5 and Fiori Playground",
            footer: new sap.m.Bar({
                contentMiddle: [new sap.m.Link("infosl", {
                    text: "Infos",
                    href: "https://markusvankempen.wordpress.com/"
                }),
                new sap.m.Link("emaill", {
                    text: "mvk@ca.ibm.com",
                    href: "mailto:mvk@ca.ibm.com"
                }),
                new sap.m.Link("mvkl", {
                    text: "@markusvankempen",
                    href: "https://twitter.com/intent/tweet?screen_name=markusvankempen"
                       })                
                ]
            })
        });

        page.setEnableScrolling(false);
        page.setShowHeader(true);
        page.addContent(tc);

        return page;
    }

});