$(document).ready(function(){
	//$('#empty').jstree();
	//$('#tree, #core').jstree();
	$("#addCategory").bind('click', addCategoryPopUpLaunch);
});

function InitJsTree(jArr){
	//alert("chamil you are fucked"+$("#tree").length);
	$('#empty').jstree();
	$('#tree, #core').jstree();
	var selectedCategoryId = 0;
	var categoryTree = $("#categoryTree");
	var jArray ='';
	var roleAraay = $.parseJSON(jArr);
		
	categoryTree.on("select_node.jstree", function(event, data) {
		selectedCategoryId = data.node.id;
		
		// loadPermissionsForRole(selectedRoleId);
		loadControlBtns(data.node);
	}).jstree({
		core : {
			data : roleAraay,
			check_callback : movementController,   
		},
		types : {
		      "#" : {
		        "valid_children" : ["root"],

		      },
		      "root" : {
		        "valid_children" : ["root", "default"],

		      },
		      "default" : {
		        "valid_children" : []
		      }
		    },
		plugins : [ 'dnd', 'types'],
		contextmenu : {
			items : customMenu
		}

	});
}

function loadControlBtns(node){
	// each tree level has different control buttons
	console.log("inside");
		if(node.a_attr.class === "CategoryClass"){
			console.log("cat");
			$("#addGrade_control_btn").show();
			$("#addCategory_control_btn").hide();
			$("#editGrade_control_btn").hide();
				
		}else if (node.a_attr.class === "GradeClass") {
			console.log("grade");
			$("#addGrade_control_btn").hide();
			$("#addCategory_control_btn").hide();
			$("#editGrade_control_btn").show();
			
		}else {
			console.log("else");
			$("#addGrade_control_btn").hide();
			$("#addCategory_control_btn").show();
			$("#editGrade_control_btn").hide();
			
		}
}

function customMenu(node) {

	var elementType = "";

	var tree = $("#categoryTree").jstree(true);
	// The default set of all items
	
	var submenu = {};
	
	if(true/*permission.ctrlAddCategory*/){

		submenu.AddCategory = {
				separator_before : false,
				separator_after : false,
				label : categorySpringMessageCodes.category,
				action : function(obj) {
					var type = obj.item.label;
					//addCategoryPopUpLaunch();
				}
			};
		}
	
	if(true /*permission.ctrlAddGrade*/){

		submenu.AddGrade = {
				separator_before : false,
				separator_after : false,
				label : categorySpringMessageCodes.grade,
				action : function(obj) {
					var type = obj.item.label;
					//addGradePopUpLaunch();
				}
			};
		}
	
	var items ={};
	
	items.Add = {
			separator_before : false,
			separator_after : false,
			label : "Add",//categorySpringMessageCodes.add,
			action : false,
			submenu : submenu
		};
	
	/*if ((node.a_attr.class === "CategoryClass" && permission.ctrlEditCategory) || (node.a_attr.class === "GradeClass" && permission.ctrlEditGrade)) {
		items.Edit = {
				separator_before : false,
				separator_after : false,
				label : categorySpringMessageCodes.edit,
				action : function(obj) {
						var type = obj.item.label;
						if(node.a_attr.class === "CategoryClass" && permission.ctrlEditCategory){
							editCategoryPopUpLaunch();
						}else if(node.a_attr.class === "GradeClass" && permission.ctrlEditGrade){
							editGradePopUpLaunch();
						}
										
				}
			}
		}*/
	
	if (node.a_attr.class === "CategoryClass" /*&& permission.ctrlEditCategory*/) {
		items.Edit = {
				separator_before : false,
				separator_after : false,
				label : Edit,//categorySpringMessageCodes.edit,
				action : function(obj) {
						var type = obj.item.label;
						//editCategoryPopUpLaunch();				
				}
			}
		}
	
	if (node.a_attr.class === "GradeClass" /*&& permission.ctrlEditGrade*/){
		items.Edit = {
				separator_before : false,
				separator_after : false,
				label : Edit,//categorySpringMessageCodes.edit,
				action : function(obj) {
						var type = obj.item.label;
						//editGradePopUpLaunch();
				}
			}
		}
	
	if (node.a_attr.class === "CategoryClass" /*&& permission.ctrlDeleteCategory*/) {
		items.Remove = {
				separator_before : false,
				separator_after : false,
				label : categorySpringMessageCodes.remove,
				action : function(obj) {

					if (node.parent !== "#") {
						if (node.children.length === 0) {
							var elementId = node.id;
							var type = obj.item.label;
							//deleteCategory();							
						} else {
							//displayMessageDialog(categorySpringMessageCodes.removeCategory, messageTypeEnum.error);
						}
					} else {
						//displayMessageDialog(categorySpringMessageCodes.removeOrg, messageTypeEnum.error);
					}
				}
			}
		}
	
	if (node.a_attr.class === "GradeClass"/* && permission.ctrlDeleteGrade*/){
		items.Remove = {
				separator_before : false,
				separator_after : false,
				label : categorySpringMessageCodes.remove,
				action : function(obj) {

					if (node.parent !== "#") {
						if (node.children.length === 0) {
							var elementId = node.id;
							var type = obj.item.label;	
							//	deleteGrade();					
						} else {
							//displayMessageDialog(categorySpringMessageCodes.removeCategory, messageTypeEnum.error);
						}
					} else {
						//displayMessageDialog(categorySpringMessageCodes.removeOrg, messageTypeEnum.error);
					}
				}
			}
		}
	
	if (node.a_attr.class === "CategoryClass") {
		delete items.Add.submenu.AddCategory;
	} else if (node.a_attr.class === "GradeClass") {
		delete items.Add
	} else {
		delete items.Rename;
		delete items.Remove;
		delete items.Add.submenu.AddGrade;
		delete items.Edit;
	}
	
	return items;
}

function movementController(operation, node, node_parent, node_position, more) {
	if (operation == 'move_node') {
		
		if (node.a_attr.class !== 'OrganizationClass')
			return true;
		else
			return false;		
	}
}

function addCategoryPopUpLaunch() {
	// because add category and edit category using same pop up
	$("#modalHeader").text("Add New Category");
	$("#popUpForm").prop("action","");
	$("#submit").prop("value","Add Category");
	$("#name").val("");
	$("#abbreviation").val("");
	//resetErrorFields();
	$("#CategoryModel").modal('show');
}