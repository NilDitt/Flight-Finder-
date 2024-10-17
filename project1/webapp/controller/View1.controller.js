sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/odata/v2/ODataModel",
    "sap/m/MessageToast",
    "sap/m/Dialog",
    "sap/m/Button",
    "sap/m/Input",
    "sap/m/Text",
    "sap/m/VBox",
    "sap/m/DatePicker"
], function (Controller, ODataModel, MessageToast, Dialog, Button, Input, Text, VBox, DatePicker) {
    "use strict";

    return Controller.extend("project1.controller.View1", {
        onInit: function () {
            // Initialize the OData model
            var oModel = new ODataModel("/sap/opu/odata/dmo/UI_TRAVEL_U_V2/");
            this.getView().setModel(oModel);
            console.log("This is the Model: " + oModel)
        },

        onCreatePress: function () {
            var oModel = this.getView().getModel();
            var oView = this.getView();
            console.log("Model: " + this.getView().getModel())
            
            // Create a dialog for user input to create a new travel record
            var oDialog = new Dialog({
                title: 'Create New Travel',
                content: new VBox({
                    items: [
                        new Input({ placeholder: 'TravelID', id: oView.createId("travelID") }),
                        new Input({ placeholder: 'AgencyID', id: oView.createId("agencyID") }),
                        new Input({ placeholder: 'AgencyName', id: oView.createId("agencyName") }),
                        new Input({ placeholder: 'CustomerID', id: oView.createId("customerID") }),
                        new Input({ placeholder: 'CustomerName', id: oView.createId("customerName") }),
                        new DatePicker({ placeholder: 'Begin Date (yyyy-MM-dd)', id: oView.createId("beginDate") }),
                        new DatePicker({ placeholder: 'End Date (yyyy-MM-dd)', id: oView.createId("endDate") }),
                        new Input({ placeholder: 'StatusText', id: oView.createId("statusText") })
                    ]
                }),
                beginButton: new Button({
                    text: 'Create',
                    press: function () {
                        var oData = {
                            TravelID: oView.byId("travelID").getValue(),
                            AgencyID: oView.byId("agencyID").getValue(),
                            AgencyName: oView.byId("agencyName").getValue(),
                            CustomerID: oView.byId("customerID").getValue(),
                            CustomerName: oView.byId("customerName").getValue(),
                            BeginDate: oView.byId("beginDate").getDateValue(), // Get selected date
                            EndDate: oView.byId("endDate").getDateValue(), // Get selected date
                            StatusText: oView.byId("statusText").getValue()
                        };
                        
                        //Create a new record in the OData model
                        
                        oModel.create("/Travel", oData, {
                           success: function () {
                               MessageToast.show("Creation successful");
                               oDialog.close();
                               oDialog.destroy();
                           },
                           error: function () {
                               MessageToast.show("Creation failed");
                           }
                       });
            //var oContext = oModel.createEntry("/Travel", {properties : })
                    }
                }),
                endButton: new Button({
                    text: 'Cancel',
                    press: function () {

                        oDialog.close();
                        oDialog.destroy();
                    }
                })
            });

            oView.addDependent(oDialog);
            oDialog.open();
        },


        onUpdatePress: function () {
            var oModel = this.getView().getModel();
            var oView = this.getView();
            var oTable = this.byId("travelListTable");
            var aSelectedIndices = oTable.getSelectedIndices();

            if (aSelectedIndices.length !== 1) {
                MessageToast.show("Please select one row to update.");
                return;
            }

            var travelID = oTable.getContextByIndex(aSelectedIndices[0]).getPath();
            var sPath = "/Travel('" + travelID + "')";


            var oDialog = new Dialog({
                title: 'Update Travel',
                content: new VBox({
                    items: [
                        //new Input({ value: "{TravelID}", enabled: false }),
                        // new Input({ value: "{AgencyID}", enabled: false }),
                        // new Input({ value: "{AgencyName}", id: this.createId("updateAgencyName") }),
                        //new Input({ value: "{CustomerID}", enabled: false }),
                        new Input({ value: "{CustomerName}", id: this.createId("updateCustomerName") }),
                        new DatePicker({ placeholder: 'Begin Date (yyyy-MM-dd)', id: oView.createId("beginDate") }),
                        new DatePicker({ placeholder: 'End Date (yyyy-MM-dd)', id: oView.createId("endDate") })
                         //new Input({ value: "{StatusText}", id: this.createId("updateStatusText") })
                    ]
                }),
                beforeOpen: function () {
                    oDialog.bindElement(sPath);
                },
                beginButton: new Button({
                    text: 'Update',
                    press: function () {
                             var oData = {
                            // AgencyName: oDialog.byId("updateAgencyName").getValue(),
        
                            CustomerName: oView.byId("updateCustomerName").getValue(),
                            
                            // BeginDate: oDialog.byId("updateBeginDate").getValue(),
                            // EndDate: oDialog.byId("updateEndDate").getValue(),
                            //         // StatusText: oDialog.byId("updateStatusText").getValue()
                            };

                        // Update the selected record
                        //oModel.setproperty("/Travel/TravelID", TravelID);
                        
                        // CustomerName: oView.byId("updateCustomerName").getValue();
                        console.log("New Name: " + oData.CustomerName);
                        console.log("Path: " + sPath);
                        oModel.setProperty(sPath, oData.CustomerName);

                        // oModel.update(sPath, oData, {
                        //     success: function () {
                        //         MessageToast.show("Update successful");
                        //         oDialog.close();
                        //     },
                        //     error: function () {
                        //         MessageToast.show("Update failed");
                        //     }
                        // });
                    }
                }),
                endButton: new Button({
                    text: 'Cancel',
                    press: function () {
                        oDialog.close();
                        oDialog.destroy();
                    }
                })
            });

            this.getView().addDependent(oDialog);
            oDialog.open();
        },






        onDeletePress: function () {
        //     var oTable = this.byId("travelListTable");
        //     var aSelectedIndices = oTable.getSelectedIndices();

        //     var sPath = oTable.getContextByIndex(aSelectedIndices[0]).getPath();
        //     var oModel = this.getView().getModel();

        //     if (aSelectedIndices.length === 0) {
        //         MessageToast.show("Please select a row to delete.");
        //         return;
        //     }
        //     var oDialog = new Dialog({
        //         title: 'Delete selected travel',
        //             content: new VBox({
        //                 items: [
        //                   new Text({ text: 'Are you shure', id: this.createId("deleteTravelText") })
        //                 ]
        //             }),
        //             confirmButton: new Button({
        //                text: 'Confirm',
        //                 press: function () {}
        // }),
        //             endButton: new Button({
        //                 text: 'Cancel',
        //                 press: function () {
        //                     oDialog.close();
        //                 }
                
          //  })
         //   });
         var oTable = this.byId("travelListTable");
            var aSelectedIndices = oTable.getSelectedIndices();

            if (aSelectedIndices.length === 0) {
                MessageToast.show("Please select a row to update.");
                return;
            }

            var sPath = oTable.getContextByIndex(aSelectedIndices[0]).getPath();
            var oModel = this.getView().getModel();

            var oDialog = new Dialog({
                title: 'Delete Travel',
                content: new VBox({
                    items: [

                        new Text({ text: 'Are you shure', id: this.createId("deleteTravelText") })
                    ]
                }),
                beforeOpen: function () {
                    oDialog.bindElement(sPath);
                },
                confirmButton: new Button({
                    text: 'Confirm deletion',
                    press: function () {


                       // oModel.setproperty("/Travel/AgencyName", oDialog.byId("updateCustomerName").getValue());

                        console.log("delete" + sPath)
            //            oModel.remove(sPath, oData, {
            //                success: function () {
            //                    MessageToast.show("Update successful");
            //                    oDialog.close();
            //                },
            //                error: function () {
            //                    MessageToast.show("Update failed");
            //                }
            //            });
            //        }
                }
                }),

                endButton: new Button({
                    text: 'Canceling',
                    press: function () {
                        console.log("delete" + sPath)
                        oDialog.close();
                        oDialog.destroy();
                    }
                })
                
            });

            this.getView().addDependent(oDialog);
            oDialog.open();
        }
    });
});