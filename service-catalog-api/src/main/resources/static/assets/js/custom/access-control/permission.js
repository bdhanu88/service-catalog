$(document).ready(function () {
	//$('#empty').jstree();
	//$('#tree, #core').jstree();
});

function InitAccessJsTree(jArr) {

	//alert("chamil you are fucked"+$("#tree").length);
	$('#empty').jstree();
	$('#tree, #core').jstree();
	var selectedRoleId = 0;
	var accessLevelTree = $("#accessLevelTree");
	var accessArray = $.parseJSON(jArr);

	 var self = this;

	$("#addRole_control_btn").hide();
	$("#editRole_control_btn").hide();
	$("#deleteRole_control_btn").hide();
	//var categoryArray = $.parseJSON('[{"parent":"#","a_attr":{"class":"OrganizationClass"},"icon":"/careware/assets/img/unit/organization.png","id":0,"state":{"opened":true,"selected":true},"text":"Care Systems"},{"parent":"0","a_attr":{"class":"CategoryClass"},"id":2,"state":{"opened":true},"text":"Nurse"},{"parent":"0","a_attr":{"class":"CategoryClass"},"id":3,"state":{"opened":true},"text":"Pharmacy"},{"parent":"0","a_attr":{"class":"CategoryClass"},"id":12,"state":{"opened":true},"text":"Out Patient Department"},{"parent":2,"a_attr":{"class":"GradeClass"},"id":"1_g","state":{"opened":true},"text":"Nurse Manager"},{"parent":3,"a_attr":{"class":"GradeClass"},"id":"5_g","state":{"opened":true},"text":"Pharmacist"},{"parent":12,"a_attr":{"class":"GradeClass"},"id":"12_g","state":{"opened":true},"text":"Trainee Nurse"},{"parent":2,"a_attr":{"class":"GradeClass"},"id":"2_g","state":{"opened":true},"text":"RN"},{"parent":3,"a_attr":{"class":"GradeClass"},"id":"6_g","state":{"opened":true},"text":"Assistant Pharmacist"},{"parent":12,"a_attr":{"class":"GradeClass"},"id":"13_g","state":{"opened":true},"text":"Trainee Pharmacist"},{"parent":2,"a_attr":{"class":"GradeClass"},"id":"4_g","state":{"opened":true},"text":"Nurse Supervisor"},{"parent":3,"a_attr":{"class":"GradeClass"},"id":"8_g","state":{"opened":true},"text":"Supervisor"},{"parent":2,"a_attr":{"class":"GradeClass"},"id":"3_g","state":{"opened":true},"text":"AN"},{"parent":3,"a_attr":{"class":"GradeClass"},"id":"7_g","state":{"opened":true},"text":"Chief Pharmacister"}]');
	accessLevelTree.on("select_node.jstree", function (event, data) {
		selectedRoleId = data.node.id;
		//console.log('loadControlBtns');
	//angular.AccessControlComponent.opent();
		///angular.element($('#AccessControlComponent')).scope().get();

 //self.opent();
		// loadPermissionsForRole(selectedRoleId);	
		loadAccessControlBtns(data.node);


	}).jstree({
		core: {
			data: accessArray,
			check_callback: movementController,
		},
		types: {
			"#": {
				"valid_children": ["root"],

			},
			"root": {
				"valid_children": ["root", "default"],

			},
			"default": {
				"valid_children": []
			}
		},
		plugins: ['dnd', 'types' , 'ui'],
		contextmenu: {
			items: customMenu
		}

	});
}

function loadAccessControlBtns(node) {

	// each tree level has different control buttons
	console.log("inside");
	if (node.a_attr.class === "mainRoleClass") {
		console.log(node.a_attr.class);
		//$("#addGrade_control_btn").show();
		$("#addRole_control_btn").show();
		$("#editRole_control_btn").hide();
		$("#deleteRole_control_btn").hide();

		this.createTree();

	} else if (node.a_attr.class === "subRoleClass") {
		console.log("grade");
		//	$("#addGrade_control_btn").hide();
		$("#addRole_control_btn").hide();
		$("#editRole_control_btn").show();
		$("#deleteRole_control_btn").show();


	} else {
		console.log("else");
		//	$("#addGrade_control_btn").hide();
		$("#addRole_control_btn").hide();
		$("#editRole_control_btn").hide();
		$("#deleteRole_control_btn").hide();
		//$("#editGrade_control_btn").hide();

	}
}

function customMenu(node) {

	var elementType = "";

	var tree = $("#accessLevelTree").jstree(true);
	// The default set of all items

	var submenu = {};

	if (true/*permission.ctrlAddCategory*/) {

		submenu.AddCategory = {
			separator_before: false,
			separator_after: false,
			label: categorySpringMessageCodes.category,
			action: function (obj) {
				var type = obj.item.label;
				//addCategoryPopUpLaunch();
			}
		};
	}

	if (true /*permission.ctrlAddGrade*/) {

		submenu.AddGrade = {
			separator_before: false,
			separator_after: false,
			label: categorySpringMessageCodes.grade,
			action: function (obj) {
				var type = obj.item.label;
				//addGradePopUpLaunch();
			}
		};
	}

	var items = {};

	items.Add = {
		separator_before: false,
		separator_after: false,
		label: "Add",//categorySpringMessageCodes.add,
		action: false,
		submenu: submenu
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
			separator_before: false,
			separator_after: false,
			label: Edit,//categorySpringMessageCodes.edit,
			action: function (obj) {
				var type = obj.item.label;
				//editCategoryPopUpLaunch();				
			}
		}
	}

	if (node.a_attr.class === "GradeClass" /*&& permission.ctrlEditGrade*/) {
		items.Edit = {
			separator_before: false,
			separator_after: false,
			label: Edit,//categorySpringMessageCodes.edit,
			action: function (obj) {
				var type = obj.item.label;
				//editGradePopUpLaunch();
			}
		}
	}

	if (node.a_attr.class === "CategoryClass" /*&& permission.ctrlDeleteCategory*/) {
		items.Remove = {
			separator_before: false,
			separator_after: false,
			label: categorySpringMessageCodes.remove,
			action: function (obj) {

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

	if (node.a_attr.class === "GradeClass"/* && permission.ctrlDeleteGrade*/) {
		items.Remove = {
			separator_before: false,
			separator_after: false,
			label: categorySpringMessageCodes.remove,
			action: function (obj) {

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