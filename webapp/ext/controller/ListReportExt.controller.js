/*global XLSX*/
sap.ui.define("com.fiorielementso.ext.controller.ListReportExt", [],
    function () {
        "use strict";
        return {
            onUpload: function (oEvent) {
                const newLocal = "com.fiorielementso.ext.Fragments.uploadExcel";
                // alert('onUpload');
               var that=this
               
               
                if(!that._Dialog ){
                that._Dialog = sap.ui.xmlfragment(newLocal,
                    that);
                    that.getView().addDependent(that._Dialog,that);
                }
                that._Dialog.open();

            },
            onCancel:function(oEvent){
                 this._Dialog.close();   
                  

            },
            handleUploadPress:function(oEvent){


            },
            onTest:function(oEvent){
    

            },
            onhandleUpload: function (oEvent) {
			var that = this;
			var oFileUploader = sap.ui.getCore().byId("FileUploaderid");
			var oFile = oFileUploader.getFocusDomRef().files[0];
			//To check the File type of uploaded File.
			if (oFile.type === "application/vnd.ms-excel") {
				//To call the CSV File Function
				that.typeCsv();
			} else {
				//To call the XLSX File Function
				that.typeXLSX();
			}
        },
        typeXLSX: function () {
			var that = this;
			var oFileUploader = sap.ui.getCore().byId("FileUploaderid");
			var file = oFileUploader.getFocusDomRef().files[0];
			var excelData = {};
			if (file && window.FileReader) {
				var reader = new FileReader();
				reader.onload = function (evt) {
					var data = evt.target.result;
					var workbook = XLSX.read(data, {
						type: 'binary'
					});
					workbook.SheetNames.forEach(function (sheetName) {
						excelData = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);
					});
					
					that.getView().getModel("localModel").setProperty("/DataEx", "");
					that.getView().getModel("localModel").setProperty("/DataEx", excelData);

					//that.generateTablexlsx();
				};
				reader.onerror = function (ex) {
					console.log(ex);
				};
				reader.readAsBinaryString(file);
			}
		}


        };
    });
