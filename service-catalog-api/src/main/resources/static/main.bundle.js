webpackJsonp([0,5],{

/***/ 115:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by CSI on 8/15/2017.
 */
var core_1 = __webpack_require__(1);
var http_1 = __webpack_require__(35);
var authentication_service_1 = __webpack_require__(40);
var common_http_service_1 = __webpack_require__(22);
var EmployeeProfileService = (function () {
    function EmployeeProfileService(httpCustomService, authenticationService) {
        this.httpCustomService = httpCustomService;
        this.authenticationService = authenticationService;
        this.skills = [];
        this.selectedSkillNodes = [];
        this.headers = new http_1.Headers({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + this.authenticationService.getToken()
        });
    }
    EmployeeProfileService.prototype.setProfileId = function (id) {
        this.profileId = id;
    };
    EmployeeProfileService.prototype.getProfileId = function () {
        return this.profileId;
    };
    EmployeeProfileService.prototype.setSkills = function (skillArray) {
        // const arr = _.uniqBy([skillArray, this.skills], 'id')
        this.skills = skillArray;
    };
    EmployeeProfileService.prototype.getSkills = function () {
        return this.skills;
    };
    EmployeeProfileService.prototype.setSkillNodeArray = function (array) {
        var list = [].concat(array);
        this.selectedSkillNodes = list;
    };
    EmployeeProfileService.prototype.getSkillNodeArray = function () {
        return this.selectedSkillNodes;
    };
    return EmployeeProfileService;
}());
EmployeeProfileService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [typeof (_a = typeof common_http_service_1.HttpCustomService !== "undefined" && common_http_service_1.HttpCustomService) === "function" && _a || Object, typeof (_b = typeof authentication_service_1.AuthenticationService !== "undefined" && authentication_service_1.AuthenticationService) === "function" && _b || Object])
], EmployeeProfileService);
exports.EmployeeProfileService = EmployeeProfileService;
var _a, _b;
//# sourceMappingURL=emp-profile.service.js.map

/***/ }),

/***/ 116:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(1);
var common_1 = __webpack_require__(15);
var category_grade_service_1 = __webpack_require__(262);
var material_1 = __webpack_require__(16);
var forms_1 = __webpack_require__(12);
var Rx_1 = __webpack_require__(84);
var confirmation_dialog_1 = __webpack_require__(41);
var angular_tree_component_1 = __webpack_require__(93);
var custom_validation_service_1 = __webpack_require__(17);
var CategoryComponent = (function () {
    function CategoryComponent(location, el, categoryGradeService, dialog, customValid) {
        this.el = el;
        this.categoryGradeService = categoryGradeService;
        this.dialog = dialog;
        this.customValid = customValid;
        this.isCategorySelected = false;
        this.selectedId = 0;
        this.parentId = 0;
        this.isLeaf = false;
        this.categories = [];
        this.options = {
            allowDrag: true,
            allowDrop: function (element, _a) {
                var parent = _a.parent, index = _a.index;
                // return true / false based on element, to.parent, to.index. e.g.
                if (element.parent.id == parent.id) {
                    return true;
                }
                else {
                    return false;
                }
            },
            nodeClass: function (node) {
                if (node.data.icon) {
                    return 'tree-' + node.data.icon;
                }
                return 'tree-node-default';
            }
        };
        this.nodes = [{
                name: '',
                children: []
            }];
        this.location = location;
    }
    CategoryComponent.prototype.addCategory = function () {
        this.openCategoryDialogDialog("add", null);
    };
    CategoryComponent.prototype.editCategory = function () {
        var _this = this;
        this.categoryGradeService.getCategoryFromId(this.selectedId).subscribe(function (data) {
            if (data.success) {
                _this.openCategoryDialogDialog("edit", data.category);
            }
        });
    };
    CategoryComponent.prototype.removeCategory = function () {
        var _this = this;
        var dialogRef = this.dialog.open(confirmation_dialog_1.ConfirmationDialog);
        dialogRef.disableClose = true;
        if (!this.isLeaf) {
            dialogRef.componentInstance.title = "Remove Category";
            dialogRef.componentInstance.message = "Cannot remove a parent category please remove grades first";
        }
        else {
            dialogRef.componentInstance.title = "Remove Category";
            dialogRef.componentInstance.message = "Are you sure you want to remove category?";
            dialogRef.afterClosed().subscribe(function (result) {
                if (result == true) {
                    _this.categoryGradeService.removeCategory(_this.selectedId).subscribe(function (data) {
                        if (data.success) {
                            _this.nodes = data.categoryTree;
                            _this.selectedId = -1;
                        }
                    });
                }
            });
        }
    };
    CategoryComponent.prototype.openCategoryDialogDialog = function (action, category) {
        var _this = this;
        var dialogRef = this.dialog.open(DialogResultExampleDialog);
        dialogRef.disableClose = true;
        this.setCategoryActionButtonAndHeader(dialogRef, action);
        if (category != null) {
            dialogRef.componentInstance.setDialogDetails(category);
        }
        dialogRef.afterClosed().subscribe(function (result) {
            if (result) {
                var category_1 = {};
                var comapny = {
                    id: 1,
                    name: 'sdsdsd'
                };
                result['company'] = comapny;
                _this.categoryGradeService.addCategory(result).subscribe(function (data) {
                    if (data.success) {
                        _this.nodes = data.categoryTree;
                        _this.categories = data.categories;
                    }
                });
            }
        });
    };
    CategoryComponent.prototype.setCategoryActionButtonAndHeader = function (dialogRef, action) {
        if (action == "add") {
            dialogRef.componentInstance.setTitle("Add Category");
            dialogRef.componentInstance.setActionButtonString("Add");
            dialogRef.componentInstance.setIsEdit(false);
        }
        else if (action == "edit") {
            dialogRef.componentInstance.setTitle("Edit Category");
            dialogRef.componentInstance.setActionButtonString("Edit");
            dialogRef.componentInstance.setIsEdit(true);
        }
        else {
            dialogRef.componentInstance.setTitle("Remove Category");
            dialogRef.componentInstance.setActionButtonString("Remove");
        }
    };
    /////// functions related to grade /////
    CategoryComponent.prototype.addGrade = function () {
        this.openGradeDialog("add", null, this.categories);
    };
    //TODO put this to ngOnInit
    CategoryComponent.prototype.editGrade = function () {
        var _this = this;
        this.categoryGradeService.getGradeFromId(this.selectedId).subscribe(function (data) {
            if (data.success) {
                _this.openGradeDialog("edit", data.grade, _this.categories);
            }
        });
    };
    CategoryComponent.prototype.removeGrade = function () {
        var _this = this;
        var dialogRef = this.dialog.open(confirmation_dialog_1.ConfirmationDialog);
        dialogRef.disableClose = true;
        dialogRef.componentInstance.title = "Remove Grade";
        dialogRef.componentInstance.message = "Are you sure you want to remove Grade";
        dialogRef.afterClosed().subscribe(function (result) {
            if (result == true) {
                _this.categoryGradeService.removeGrade(_this.selectedId).subscribe(function (data) {
                    if (data.success) {
                        _this.nodes = data.categoryTree;
                        _this.selectedId = -1;
                        var parentNode = _this.tree.treeModel.getNodeById(_this.parentId);
                        var children = parentNode.children;
                        /// colapse if deleted node is the last child
                        if (children.length == 1) {
                            parentNode.collapse();
                        }
                    }
                });
            }
        });
    };
    CategoryComponent.prototype.getCategories = function () {
        var _this = this;
        this.categoryGradeService.getCategories().subscribe(function (data) {
            if (data.success) {
                _this.categories = data.categories;
            }
        });
    };
    CategoryComponent.prototype.openGradeDialog = function (action, grade, categories) {
        var _this = this;
        var dialogRef = this.dialog.open(GradeDialog);
        dialogRef.disableClose = true;
        this.setGradeActionButtonAndHeader(dialogRef, action);
        if (grade != null) {
            dialogRef.componentInstance.setDialogDetails(grade);
            dialogRef.componentInstance.setCategoryId(this.parentId);
        }
        else {
            dialogRef.componentInstance.setCategoryId(this.selectedId);
        }
        dialogRef.componentInstance.setCategories(categories);
        dialogRef.afterClosed().subscribe(function (result) {
            if (result) {
                var comapny = {
                    id: 1,
                    name: 'sdsdsd'
                };
                var cat = {
                    id: result.category,
                    name: '',
                    abbreviation: '',
                    orderId: 0,
                    company: comapny,
                };
                cat.id = result.category;
                result.category = cat;
                _this.categoryGradeService.addGrade(result).subscribe(function (data) {
                    if (data.success) {
                        _this.nodes = data.categoryTree;
                    }
                });
            }
        });
    };
    CategoryComponent.prototype.setGradeActionButtonAndHeader = function (dialogRef, action) {
        if (action == "add") {
            dialogRef.componentInstance.setTitle("Add Grade");
            dialogRef.componentInstance.setActionButtonString("Add");
            dialogRef.componentInstance.setIsEdit(false);
        }
        else if (action == "edit") {
            dialogRef.componentInstance.setTitle("Edit Grade");
            dialogRef.componentInstance.setActionButtonString("Edit");
            dialogRef.componentInstance.setIsEdit(true);
        }
        else {
            dialogRef.componentInstance.setTitle("Remove Grade");
            dialogRef.componentInstance.setActionButtonString("Remove");
        }
    };
    CategoryComponent.prototype.ngOnInit = function () {
        // $.getScript('/assets/js/custom/category-grade/category-grade.js');
        //$('.tree').jstree();
        var _this = this;
        var companyId = 1;
        this.categoryArray = this.categoryGradeService.getCategoryGradeArray(companyId).subscribe(function (data) { return _this.createTree(data); });
        this.getCategories();
        // this.createTree();
    }; // load script file here with base href
    CategoryComponent.prototype.createTree = function (data) {
        // InitJsTree(data);
        this.nodes = data;
    };
    /*
    * Category Grade tree click event
    **/
    CategoryComponent.prototype.treeclickEvent = function (event) {
        //debugger;
        this.selectedId = event.node.id;
        this.parentId = event.node.parent.id;
        this.isLeaf = event.node.isLeaf;
        if (this.parentId == 0) {
            var r = event.node.data.id;
            this.isCategorySelected = true;
        }
        else {
            this.isCategorySelected = false;
        }
    };
    CategoryComponent.prototype.moveNode = function ($event) {
        var orgNodes = this.tree.treeModel.nodes;
        var categoryArray = [];
        var gradeArray = [];
        for (var _i = 0, orgNodes_1 = orgNodes; _i < orgNodes_1.length; _i++) {
            var orgNode = orgNodes_1[_i];
            var categoryNodes = orgNode.children;
            for (var _a = 0, categoryNodes_1 = categoryNodes; _a < categoryNodes_1.length; _a++) {
                var catNode = categoryNodes_1[_a];
                categoryArray.push(catNode.id);
                var gradeNodes = catNode.children;
                if (gradeNodes != null) {
                    for (var _b = 0, gradeNodes_1 = gradeNodes; _b < gradeNodes_1.length; _b++) {
                        var grdNode = gradeNodes_1[_b];
                        gradeArray.push(grdNode.id);
                    }
                }
            }
        }
        this.categoryGradeService.orderCategoryAndGrades(gradeArray, categoryArray).subscribe(function (data) { });
    };
    return CategoryComponent;
}());
__decorate([
    core_1.ViewChild(angular_tree_component_1.TreeComponent),
    __metadata("design:type", typeof (_a = typeof angular_tree_component_1.TreeComponent !== "undefined" && angular_tree_component_1.TreeComponent) === "function" && _a || Object)
], CategoryComponent.prototype, "tree", void 0);
CategoryComponent = __decorate([
    core_1.Injectable(),
    core_1.Component({
        selector: 'category-cmp',
        template: __webpack_require__(699),
        encapsulation: core_1.ViewEncapsulation.None,
        styles: [__webpack_require__(644), __webpack_require__(643)]
    }),
    __metadata("design:paramtypes", [typeof (_b = typeof common_1.Location !== "undefined" && common_1.Location) === "function" && _b || Object, typeof (_c = typeof core_1.ElementRef !== "undefined" && core_1.ElementRef) === "function" && _c || Object, typeof (_d = typeof category_grade_service_1.CategoryGradeService !== "undefined" && category_grade_service_1.CategoryGradeService) === "function" && _d || Object, typeof (_e = typeof material_1.MdDialog !== "undefined" && material_1.MdDialog) === "function" && _e || Object, typeof (_f = typeof custom_validation_service_1.CustomValidationService !== "undefined" && custom_validation_service_1.CustomValidationService) === "function" && _f || Object])
], CategoryComponent);
exports.CategoryComponent = CategoryComponent;
var DialogResultExampleDialog = (function () {
    function DialogResultExampleDialog(dialogRef, categoryGradeService, _fb) {
        this.dialogRef = dialogRef;
        this._fb = _fb;
        this.events = []; // use later to display form changes
        this.actionButton = "Add Category";
        this.isEdit = false;
        this.companyId = 1;
        this.categoryGradeService = categoryGradeService;
    }
    DialogResultExampleDialog.prototype.ngOnInit = function () {
        this.categoryForm = this._fb.group({
            id: [this.selectedId],
            name: [this.categoryName, [forms_1.Validators.required], this.categoryValidator.bind(this)],
            abbreviation: [this.abbreviation, [], this.abbreviationValidator.bind(this)],
            orderId: [this.orderId],
            companyId: [this.companyId],
        });
    };
    DialogResultExampleDialog.prototype.setActionButtonString = function (actionButtionValue) {
        this.actionButton = actionButtionValue;
    };
    DialogResultExampleDialog.prototype.setTitle = function (title) {
        this.title = title;
    };
    DialogResultExampleDialog.prototype.setIsEdit = function (isEdit) {
        this.isEdit = isEdit;
    };
    DialogResultExampleDialog.prototype.setDialogDetails = function (category) {
        this.selectedId = category.id;
        this.categoryName = category.name;
        this.abbreviation = category.abbreviation;
        this.orderId = category.orderId;
        this.companyId = category.company.id;
    };
    DialogResultExampleDialog.prototype.categorySave = function (model, isValid) {
        // check if model is valid
        // if valid, call API to save customer
        if (isValid) {
        }
    };
    DialogResultExampleDialog.prototype.categoryAddSuccess = function (data) {
    };
    DialogResultExampleDialog.prototype.abbreviationValidator = function (control) {
        var _this = this;
        return new Rx_1.Observable(function (observer) {
            _this.categoryGradeService.checkAbbreviationExistence(control.value, true, _this.selectedId, _this.isEdit).subscribe(function (data) {
                if (data.success) {
                    observer.next({ abbreviationAvailable: true });
                }
                else {
                    observer.next(null);
                }
                observer.complete();
            });
        });
    };
    DialogResultExampleDialog.prototype.categoryValidator = function (control) {
        return this.categoryValidator2(control.value).first();
    };
    DialogResultExampleDialog.prototype.categoryValidator2 = function (value) {
        /*    return new Promise((resolve, reject) => {
                    this.categoryGradeService.checkCategoryExistence(value).subscribe(
   
                        data => resolve({uniqueCategory:true}),
                        error => resolve({uniqueCategory:true})
                    );
            }) */
        var _this = this;
        return new Rx_1.Observable(function (observer) {
            _this.categoryGradeService.checkCategoryExistence(value, _this.selectedId, _this.isEdit, _this.companyId).subscribe(function (data) {
                if (data.success) {
                    observer.next({ categoryAvailable: true });
                }
                else {
                    observer.next(null);
                }
            });
        });
    };
    return DialogResultExampleDialog;
}());
DialogResultExampleDialog = __decorate([
    core_1.Component({
        selector: 'category-cmp',
        template: __webpack_require__(698),
        providers: [CategoryComponent]
    }),
    __metadata("design:paramtypes", [typeof (_g = typeof material_1.MdDialogRef !== "undefined" && material_1.MdDialogRef) === "function" && _g || Object, typeof (_h = typeof category_grade_service_1.CategoryGradeService !== "undefined" && category_grade_service_1.CategoryGradeService) === "function" && _h || Object, typeof (_j = typeof forms_1.FormBuilder !== "undefined" && forms_1.FormBuilder) === "function" && _j || Object])
], DialogResultExampleDialog);
exports.DialogResultExampleDialog = DialogResultExampleDialog;
var GradeDialog = (function () {
    function GradeDialog(dialogRef, categoryGradeService, _fb) {
        this.dialogRef = dialogRef;
        this._fb = _fb;
        this.events = []; // use later to display form changes
        this.actionButton = "Add Grade";
        this.isEdit = false;
        this.categoryGradeService = categoryGradeService;
    }
    GradeDialog.prototype.ngOnInit = function () {
        this.gradeForm = this._fb.group({
            id: [this.selectedId],
            name: [this.gradeName, [forms_1.Validators.required], this.gradeNameValidator1.bind(this)],
            abbreviation: [this.abbreviation, [], this.abbreviationValidator.bind(this)],
            category: [this.categories],
            orderId: [this.orderId]
        });
    };
    GradeDialog.prototype.setActionButtonString = function (actionButtionValue) {
        this.actionButton = actionButtionValue;
    };
    GradeDialog.prototype.setTitle = function (title) {
        this.title = title;
    };
    GradeDialog.prototype.setIsEdit = function (isEdit) {
        this.isEdit = isEdit;
    };
    GradeDialog.prototype.setDialogDetails = function (grade) {
        this.selectedId = grade.id;
        this.gradeName = grade.name;
        this.abbreviation = grade.abbreviation;
        this.orderId = grade.orderId;
        this.categoryId = grade.category.id;
    };
    GradeDialog.prototype.setCategories = function (categories) {
        this.categories = categories;
    };
    GradeDialog.prototype.setCategoryId = function (categoryId) {
        this.categoryId = categoryId;
    };
    GradeDialog.prototype.categorySave = function (model, isValid) {
        // check if model is valid
        // if valid, call API to save customer
        if (isValid) {
        }
    };
    GradeDialog.prototype.categoryAddSuccess = function (data) {
    };
    GradeDialog.prototype.abbreviationValidator = function (control) {
        var _this = this;
        return new Rx_1.Observable(function (observer) {
            _this.categoryGradeService.checkAbbreviationExistence(control.value, false, _this.selectedId, _this.isEdit).subscribe(function (data) {
                if (data.success) {
                    observer.next({ abbreviationAvailable: true });
                }
                else {
                    observer.next(null);
                }
                observer.complete();
            });
        });
    };
    GradeDialog.prototype.gradeNameValidator1 = function (control) {
        return this.gradeNameValidator2(control.value).first();
    };
    GradeDialog.prototype.gradeNameValidator2 = function (value) {
        /*    return new Promise((resolve, reject) => {
                    this.categoryGradeService.checkCategoryExistence(value).subscribe(
   
                        data => resolve({uniqueCategory:true}),
                        error => resolve({uniqueCategory:true})
                    );
            }) */
        var _this = this;
        return new Rx_1.Observable(function (observer) {
            _this.categoryGradeService.checkGradeExistence(value, _this.selectedId, _this.isEdit).subscribe(function (data) {
                if (data.success) {
                    observer.next({ gradeAvailable: true });
                }
                else {
                    observer.next(null);
                }
            });
        });
    };
    return GradeDialog;
}());
GradeDialog = __decorate([
    core_1.Component({
        selector: 'category-cmp',
        template: __webpack_require__(700),
        providers: [CategoryComponent]
    }),
    __metadata("design:paramtypes", [typeof (_k = typeof material_1.MdDialogRef !== "undefined" && material_1.MdDialogRef) === "function" && _k || Object, typeof (_l = typeof category_grade_service_1.CategoryGradeService !== "undefined" && category_grade_service_1.CategoryGradeService) === "function" && _l || Object, typeof (_m = typeof forms_1.FormBuilder !== "undefined" && forms_1.FormBuilder) === "function" && _m || Object])
], GradeDialog);
exports.GradeDialog = GradeDialog;
var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
//# sourceMappingURL=category-grade.component.js.map

/***/ }),

/***/ 117:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var LevelType;
(function (LevelType) {
    LevelType[LevelType["UnitLevel"] = 0] = "UnitLevel";
    LevelType[LevelType["LocationLevel"] = 1] = "LocationLevel";
})(LevelType = exports.LevelType || (exports.LevelType = {}));
//# sourceMappingURL=hierarchy-type.component.js.map

/***/ }),

/***/ 118:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(1);
var ActionRendererComponent = (function () {
    function ActionRendererComponent() {
    }
    ActionRendererComponent.prototype.agInit = function (params) {
        this.params = params;
        this.action = params.data.action;
    };
    return ActionRendererComponent;
}());
ActionRendererComponent = __decorate([
    core_1.Component({
        selector: 'full-width-cell',
        template: "<td class=\"text-right table-action\">\n               <a [href]=\"action?'#/'+ action.url : ''\"><i class=\"material-icons\">dvr</i><div class=\"ripple-container\"></div></a>\n               <a [href]=\"action?'#/'+ action.url : ''\"><i class=\"material-icons\">close</i></a>\n               </td>"
    })
], ActionRendererComponent);
exports.ActionRendererComponent = ActionRendererComponent;
//# sourceMappingURL=action-renderer.component.js.map

/***/ }),

/***/ 119:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(1);
var StatusRendererComponent = (function () {
    function StatusRendererComponent() {
    }
    StatusRendererComponent.prototype.agInit = function (params) {
        this.params = params;
        this.values = "" + params.data.status.value;
        this.className = "" + params.data.status.className;
    };
    return StatusRendererComponent;
}());
StatusRendererComponent = __decorate([
    core_1.Component({
        selector: 'full-width-cell',
        template: "<div class=\"col-sm-9 employee-status\"><button type=\"button\" class=\"btn btn-{{ className }} btn-block\">{{ values }}<div class=\"ripple-container\"></div></button></div>"
    })
], StatusRendererComponent);
exports.StatusRendererComponent = StatusRendererComponent;
//# sourceMappingURL=status-renderer.component.js.map

/***/ }),

/***/ 120:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(539));
__export(__webpack_require__(279));
__export(__webpack_require__(538));
//# sourceMappingURL=index.js.map

/***/ }),

/***/ 164:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(1);
var router_1 = __webpack_require__(36);
var authentication_service_1 = __webpack_require__(40);
var CanActivateAuthGuard = (function () {
    function CanActivateAuthGuard(router, authService) {
        this.router = router;
        this.authService = authService;
    }
    CanActivateAuthGuard.prototype.canActivate = function (route, state) {
        if (this.authService.isLoggedIn()) {
            // logged in so return true
            return true;
        }
        else {
            // not logged in so redirect to login page with the return url and return false
            this.router.navigate(['/login']);
        }
        return false;
    };
    return CanActivateAuthGuard;
}());
CanActivateAuthGuard = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [typeof (_a = typeof router_1.Router !== "undefined" && router_1.Router) === "function" && _a || Object, typeof (_b = typeof authentication_service_1.AuthenticationService !== "undefined" && authentication_service_1.AuthenticationService) === "function" && _b || Object])
], CanActivateAuthGuard);
exports.CanActivateAuthGuard = CanActivateAuthGuard;
var _a, _b;
//# sourceMappingURL=can-activate.authguard.js.map

/***/ }),

/***/ 165:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(1);
var custom_validation_service_1 = __webpack_require__(17);
/**
 * Created by CSI on 8/14/2017.
 */
var EmployeeProfileActionRendererComponent = (function () {
    function EmployeeProfileActionRendererComponent(customValidation) {
        this.customValidation = customValidation;
    }
    EmployeeProfileActionRendererComponent.prototype.agInit = function (params) {
        this.params = params;
        this.action = params.data.action;
        debugger;
        this.id = params.data.id;
        this.parentComponent = params.context.parentComponent;
    };
    EmployeeProfileActionRendererComponent.prototype.editEmpProfile = function () {
        this.parentComponent.setEmployeeDetails(this.id);
    };
    EmployeeProfileActionRendererComponent.prototype.deactivateEmpProfile = function () {
        this.parentComponent.deactivateEmployee(this.id);
    };
    return EmployeeProfileActionRendererComponent;
}());
EmployeeProfileActionRendererComponent = __decorate([
    core_1.Component({
        selector: 'full-width-cell',
        template: "<td class=\"text-right table-action\" *ngIf=\"customValidation.isPermissionAvailable('EMPLOYEE_PROFILE_EDIT')\">\n               <a  [href]=\"action?'#/'+ action.url : ''\" ><i class=\"material-icons\">dvr</i><div class=\"ripple-container\"></div></a>\n               <a (click)=\"deactivateEmpProfile()\"><i class=\"material-icons\">close</i><div class=\"ripple-container\"></div></a>\n               </td>"
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof custom_validation_service_1.CustomValidationService !== "undefined" && custom_validation_service_1.CustomValidationService) === "function" && _a || Object])
], EmployeeProfileActionRendererComponent);
exports.EmployeeProfileActionRendererComponent = EmployeeProfileActionRendererComponent;
var _a;
//# sourceMappingURL=employee-action.component.js.map

/***/ }),

/***/ 166:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var material_1 = __webpack_require__(16);
var forms_1 = __webpack_require__(12);
var common_http_service_1 = __webpack_require__(22);
var table_component_1 = __webpack_require__(31);
var core_1 = __webpack_require__(1);
var emp_type_dialog_1 = __webpack_require__(253);
var http_request_metadata_1 = __webpack_require__(27);
var custom_validation_service_1 = __webpack_require__(17);
/**
 * Created by CSI on 8/11/2017.
 */
var EmployeeTypesComponent = (function () {
    function EmployeeTypesComponent(dialog, _fb, httpCustomService, customValidation) {
        this.dialog = dialog;
        this._fb = _fb;
        this.httpCustomService = httpCustomService;
        this.customValidation = customValidation;
        this.rowData = [];
        this.agPaginationAuto = false;
        this.httpCustomService.commonHttpRequest("getallemptypes", "employee/getallemptypes", null, this.generateEmpTypeTable.bind(this), null, http_request_metadata_1.HttpType.GET);
    }
    EmployeeTypesComponent.prototype.ngOnInit = function () {
        var columnDef = [
            { headerName: "Name",
                field: "name",
                width: 100 },
            { headerName: "Abbreviation",
                field: "abbreviation",
                width: 100 },
            {
                headerName: "Action",
                field: "action",
                cellRendererFramework: EmpTypeCellActionRenderer,
                width: 40
            },
        ];
        this.empTypeTableComponent.agPaginationAuto = this.agPaginationAuto;
        this.empTypeTableComponent.setColumnDef(columnDef);
        this.empTypeTableComponent.setData(this.rowData);
        this.empTypeTableComponent.setGridOptionContext({ parentComponent: this });
    };
    EmployeeTypesComponent.prototype.openEmpTypeDialog = function (entity) {
        var _this = this;
        var dialogRef = this.dialog.open(emp_type_dialog_1.EmpTypeDialog);
        dialogRef.disableClose = true;
        dialogRef.componentInstance.setDialogDetails(entity);
        if (entity == null) {
            this.setEmpTypeActionButtonAndHeader(dialogRef, "add");
        }
        else {
            this.setEmpTypeActionButtonAndHeader(dialogRef, "edit");
        }
        dialogRef.afterClosed().subscribe(function (data) {
            if (data) {
                var empType = {
                    id: data.id,
                    name: data.name,
                    abbreviation: data.abbreviation
                };
                _this.httpCustomService.commonHttpRequest("addemptype", "employee/addemptype", empType, _this.generateEmpTypeTable.bind(_this), null, http_request_metadata_1.HttpType.POST);
            }
        });
    };
    EmployeeTypesComponent.prototype.setEmpTypeActionButtonAndHeader = function (dialogRef, type) {
        if (type == "add") {
            dialogRef.componentInstance.setTitle("Add Employee Type");
            dialogRef.componentInstance.setActionButtonString("Add");
        }
        else if (type == "edit") {
            dialogRef.componentInstance.setTitle("Edit Employee Type");
            dialogRef.componentInstance.setActionButtonString("Edit");
        }
    };
    EmployeeTypesComponent.prototype.generateEmpTypeTable = function (result) {
        this.rowData = [];
        var empTypes = result.empTypes;
        for (var _i = 0, empTypes_1 = empTypes; _i < empTypes_1.length; _i++) {
            var item = empTypes_1[_i];
            var obj = {
                name: item.name,
                abbreviation: item.abbreviation,
                id: item.id
            };
            this.rowData.push(obj);
        }
        this.empTypeTableComponent.updateData(this.rowData);
    };
    return EmployeeTypesComponent;
}());
__decorate([
    core_1.ViewChild(table_component_1.AgGridTableCustomComponent),
    __metadata("design:type", typeof (_a = typeof table_component_1.AgGridTableCustomComponent !== "undefined" && table_component_1.AgGridTableCustomComponent) === "function" && _a || Object)
], EmployeeTypesComponent.prototype, "empTypeTableComponent", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], EmployeeTypesComponent.prototype, "agPaginationAuto", void 0);
EmployeeTypesComponent = __decorate([
    core_1.Component({
        selector: "emp-type-cmp",
        template: __webpack_require__(683),
    }),
    __metadata("design:paramtypes", [typeof (_b = typeof material_1.MdDialog !== "undefined" && material_1.MdDialog) === "function" && _b || Object, typeof (_c = typeof forms_1.FormBuilder !== "undefined" && forms_1.FormBuilder) === "function" && _c || Object, typeof (_d = typeof common_http_service_1.HttpCustomService !== "undefined" && common_http_service_1.HttpCustomService) === "function" && _d || Object, typeof (_e = typeof custom_validation_service_1.CustomValidationService !== "undefined" && custom_validation_service_1.CustomValidationService) === "function" && _e || Object])
], EmployeeTypesComponent);
exports.EmployeeTypesComponent = EmployeeTypesComponent;
var EmpTypeCellActionRenderer = (function () {
    function EmpTypeCellActionRenderer(customValidation) {
        this.customValidation = customValidation;
    }
    EmpTypeCellActionRenderer.prototype.agInit = function (params) {
        this.params = params;
        this.empType = params.data;
        this.empTypeComponent = params.context.parentComponent;
    };
    EmpTypeCellActionRenderer.prototype.editEmpType = function () {
        this.empTypeComponent.openEmpTypeDialog(this.empType);
    };
    EmpTypeCellActionRenderer.prototype.removeEmpType = function () { };
    return EmpTypeCellActionRenderer;
}());
EmpTypeCellActionRenderer = __decorate([
    core_1.Component({
        selector: 'full-width-cell',
        template: "<td class=\"text-right table-action\" *ngIf=\"customValidation.isPermissionAvailable('EMPLOYEE_TYPE_EDIT')\">\n               <button type=\"button\" rel=\"tooltip\" title=\"\" class=\"btn btn-primary btn-simple btn-xs\"\n\t\t\t\tdata-original-title=\"Edit Level\" (click)=\"editEmpType()\"><i class=\"material-icons\">dvr</i><div class=\"ripple-container\"></div></button>\n               <button type=\"button\" rel=\"tooltip\" title=\"\" class=\"btn btn-primary btn-simple btn-xs\"\n\t\t\t\tdata-original-title=\"Remove Level\" (click)=\"removeEmpType()\"><i class=\"material-icons\">delete</i></button>\n               </td>"
    }),
    __metadata("design:paramtypes", [typeof (_f = typeof custom_validation_service_1.CustomValidationService !== "undefined" && custom_validation_service_1.CustomValidationService) === "function" && _f || Object])
], EmpTypeCellActionRenderer);
exports.EmpTypeCellActionRenderer = EmpTypeCellActionRenderer;
var _a, _b, _c, _d, _e, _f;
//# sourceMappingURL=employee-type.component.js.map

/***/ }),

/***/ 167:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(1);
var http_1 = __webpack_require__(35);
var authentication_service_1 = __webpack_require__(40);
var UnitHierarchyService = (function () {
    function UnitHierarchyService(http, authenticationService) {
        this.http = http;
        this.authenticationService = authenticationService;
        this.headers = new http_1.Headers({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + this.authenticationService.getToken()
        });
    }
    UnitHierarchyService.prototype.getUnitHierarchyList = function (companyId) {
        return this.http.get('unit/unitHierarchy?companyId=' + companyId, { headers: this.headers }).map(function (response) {
            // login successful if there's a jwt token in the response
            return response.json();
        });
    };
    UnitHierarchyService.prototype.checkAbbreviationExistence = function (abbreviation, selectedId, isEdit, companyId) {
        if (selectedId == null) {
            selectedId = 0;
        }
        return this.http.get('unit/level/abbreviation/checkExist?abbreviation=' + abbreviation + '&id=' + selectedId + '&isEdit=' + isEdit + '&companyId=' + companyId, { headers: this.headers }).map(function (response) {
            // login successful if there's a jwt token in the response
            return response.json();
        });
    };
    UnitHierarchyService.prototype.checkLevelExistence = function (levelName, selectedId, isEdit, companyId) {
        if (selectedId == null) {
            selectedId = 0;
        }
        return this.http.get('unit/level/checkExist?levelName=' + levelName + '&levelId=' + selectedId + '&isEdit=' + isEdit + '&companyId=' + companyId, { headers: this.headers }).map(function (response) {
            // login successful if there's a jwt token in the response
            return response.json();
        });
    };
    UnitHierarchyService.prototype.addUnitLevel = function (unitLevelForm) {
        return this.http.post('unit/level/add', JSON.stringify(unitLevelForm), { headers: this.headers }).map(function (response) {
            // login successful if there's a jwt token in the response
            return response.json();
        });
    };
    UnitHierarchyService.prototype.deleteUnitLevel = function (selectedId) {
        return this.http.get('unit/level/delete?id=' + selectedId, { headers: this.headers }).map(function (response) {
            // login successful if there's a jwt token in the response
            return response.json();
        });
    };
    return UnitHierarchyService;
}());
UnitHierarchyService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [typeof (_a = typeof http_1.Http !== "undefined" && http_1.Http) === "function" && _a || Object, typeof (_b = typeof authentication_service_1.AuthenticationService !== "undefined" && authentication_service_1.AuthenticationService) === "function" && _b || Object])
], UnitHierarchyService);
exports.UnitHierarchyService = UnitHierarchyService;
var _a, _b;
//# sourceMappingURL=unit-hierarchy.service.js.map

/***/ }),

/***/ 168:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var forms_1 = __webpack_require__(12);
var material_1 = __webpack_require__(16);
var core_1 = __webpack_require__(1);
var Rx_1 = __webpack_require__(84);
var unit_hierarchy_service_1 = __webpack_require__(167);
var custom_validation_service_1 = __webpack_require__(17);
var hierarchy_type_component_1 = __webpack_require__(117);
var UnitLevelDialog = (function () {
    function UnitLevelDialog(_fb, unitHierarchyService, dialogRef, customValidationService) {
        this._fb = _fb;
        this.unitHierarchyService = unitHierarchyService;
        this.dialogRef = dialogRef;
        this.customValidationService = customValidationService;
        this.events = []; // use later to display form changes
        this.actionButton = "Add Level";
        this.isEdit = false;
        this.levelType = hierarchy_type_component_1.LevelType.UnitLevel;
        this.companyId = 1;
    }
    UnitLevelDialog.prototype.ngOnInit = function () {
        this.unitLevelForm = this._fb.group({
            id: [this.id],
            name: [this.levelName, [forms_1.Validators.required], this.generateDataForCustomValidation.bind(this, true, "unit/level/checkExist", this.levelName, this.isEdit)],
            abbreviation: [this.abbreviation, [], this.generateDataForCustomValidation.bind(this, false, "unit/level/abbreviation/checkExist", this.abbreviation, this.isEdit)]
        });
    };
    UnitLevelDialog.prototype.abbreviationValidator = function (control) {
        var _this = this;
        return new Rx_1.Observable(function (observer) {
            _this.unitHierarchyService.checkAbbreviationExistence(control.value, _this.id, _this.isEdit, _this.companyId).subscribe(function (data) {
                if (data.success) {
                    observer.next({ abbreviationAvailable: true });
                }
                else {
                    observer.next(null);
                }
                observer.complete();
            });
        });
    };
    UnitLevelDialog.prototype.setTitle = function (title) {
        this.title = title;
    };
    UnitLevelDialog.prototype.setActionButton = function (buttonValue) {
        this.actionButton = buttonValue;
    };
    UnitLevelDialog.prototype.setIsEdit = function (isEdit) {
        this.isEdit = isEdit;
    };
    UnitLevelDialog.prototype.setFormValues = function (unitLevel) {
        this.id = unitLevel.id;
        this.levelName = unitLevel.name;
        this.abbreviation = unitLevel.abbreviation;
    };
    UnitLevelDialog.prototype.generateDataForCustomValidation = function (isName, requestPath, prvValue, isEdit, control) {
        var value = control.value;
        if (this.levelType == hierarchy_type_component_1.LevelType.LocationLevel && isName) {
            requestPath = "location/level/checkExist";
        }
        else if (this.levelType == hierarchy_type_component_1.LevelType.LocationLevel && !isName) {
            requestPath = "location/level/abbreviation/checkExist";
        }
        var data = {
            value: value
        };
        return this.customValidationService.isExistValidator(data, requestPath, prvValue, isEdit, control);
    };
    UnitLevelDialog.prototype.setLevelType = function (levelType) {
        this.levelType = levelType;
    };
    return UnitLevelDialog;
}());
UnitLevelDialog = __decorate([
    core_1.Component({
        selector: 'unit-level-dialog-cmp',
        template: __webpack_require__(706),
        providers: [unit_hierarchy_service_1.UnitHierarchyService, custom_validation_service_1.CustomValidationService]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof forms_1.FormBuilder !== "undefined" && forms_1.FormBuilder) === "function" && _a || Object, typeof (_b = typeof unit_hierarchy_service_1.UnitHierarchyService !== "undefined" && unit_hierarchy_service_1.UnitHierarchyService) === "function" && _b || Object, typeof (_c = typeof material_1.MdDialogRef !== "undefined" && material_1.MdDialogRef) === "function" && _c || Object, typeof (_d = typeof custom_validation_service_1.CustomValidationService !== "undefined" && custom_validation_service_1.CustomValidationService) === "function" && _d || Object])
], UnitLevelDialog);
exports.UnitLevelDialog = UnitLevelDialog;
var _a, _b, _c, _d;
//# sourceMappingURL=unit-level.dialog.js.map

/***/ }),

/***/ 169:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(1);
var forms_1 = __webpack_require__(12);
var material_1 = __webpack_require__(16);
var JobStatusDialog = (function () {
    //  private active:JOB_STATUS_TYPES;
    function JobStatusDialog(_fb, dialogRef) {
        this._fb = _fb;
        this.dialogRef = dialogRef;
        this.events = []; // use later to display form changes
        this.actionButton = "Add Job Status";
        this.isEdit = false;
        this.jobStatus = JOB_STATUS_TYPES;
        this.JOB_STATUS_TYPES = JOB_STATUS_TYPES;
        this.keys = Object.keys(this.jobStatus).filter(Number);
    }
    JobStatusDialog.prototype.ngOnInit = function () {
        this.jobStatusForm = this._fb.group({
            id: [this.id],
            jobStatusName: [this.jobStatusName, [forms_1.Validators.required]],
            abbreviation: [this.abbreviation, [forms_1.Validators.required]],
            jobStatusType: [this.jobStatusKey, [forms_1.Validators.required]]
            // this.levelValidator.bind(this)],
            // abbreviation: [this.abbreviation, [], this.abbreviationValidator.bind(this)]
        });
    };
    // abbreviationValidator(control:FormControl):{[key:string]: any}{
    //      return new Observable(observer => {
    //          this.unitHierarchyService.checkAbbreviationExistence(control.value, this.id, this.isEdit).subscribe(
    //                  data => {
    //                             if(data.success){
    //                                 observer.next({abbreviationAvailable:true});
    //                             }else{
    //                                 observer.next(null);
    //                             }
    //                             observer.complete();
    //                          },
    //              );
    //      });
    // }
    JobStatusDialog.prototype.setTitle = function (title) {
        this.title = title;
    };
    JobStatusDialog.prototype.setActionButton = function (buttonValue) {
        this.actionButton = buttonValue;
    };
    JobStatusDialog.prototype.setIsEdit = function (isEdit) {
        this.isEdit = isEdit;
    };
    JobStatusDialog.prototype.setFormValues = function (jobStatus) {
        this.id = jobStatus.id;
        this.jobStatusName = jobStatus.jobStatusName;
        this.abbreviation = jobStatus.abbreviation;
        this.jobStatusKey = jobStatus.jobStatusType;
        debugger;
        //Color[green];
        // JOB_STATUS_TYPES.values()[1]
    };
    return JobStatusDialog;
}());
JobStatusDialog = __decorate([
    core_1.Component({
        selector: 'job-status-dialog-cmp',
        template: __webpack_require__(708),
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof forms_1.FormBuilder !== "undefined" && forms_1.FormBuilder) === "function" && _a || Object, typeof (_b = typeof material_1.MdDialogRef !== "undefined" && material_1.MdDialogRef) === "function" && _b || Object])
], JobStatusDialog);
exports.JobStatusDialog = JobStatusDialog;
var JOB_STATUS_TYPES;
(function (JOB_STATUS_TYPES) {
    JOB_STATUS_TYPES[JOB_STATUS_TYPES["ON_ROUTE"] = 1] = "ON_ROUTE";
    JOB_STATUS_TYPES[JOB_STATUS_TYPES["ONE"] = 2] = "ONE";
    JOB_STATUS_TYPES[JOB_STATUS_TYPES["TWO"] = 3] = "TWO";
})(JOB_STATUS_TYPES = exports.JOB_STATUS_TYPES || (exports.JOB_STATUS_TYPES = {}));
var _a, _b;
//# sourceMappingURL=job-status.dialog.js.map

/***/ }),

/***/ 17:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(1);
var Rx_1 = __webpack_require__(84);
var common_http_service_1 = __webpack_require__(22);
var httpRequestId = new Object();
var CustomValidationService = (function () {
    function CustomValidationService(httpCustomService) {
        this.httpCustomService = httpCustomService;
    }
    CustomValidationService.prototype.isExistValidator = function (data, requestPath, prvValue, isEdit, control) {
        var value = control.value;
        if (control.dirty && !(isEdit && prvValue === value.trim())) {
            return this.formCustomApiIsExitValidator(requestPath, data);
        }
        else {
            return new Rx_1.Observable(function (observer) {
                observer.next(null);
                observer.complete();
            });
        }
    };
    CustomValidationService.prototype.formCustomApiIsExitValidator = function (requestPath, dataParam) {
        var _this = this;
        return new Rx_1.Observable(function (observer) {
            _this.httpCustomService.commonHttpRequestWithoutCallBacks(requestPath, dataParam).subscribe(function (data) {
                if (data.success) {
                    observer.next({ exist: true });
                }
                else {
                    observer.next(null);
                }
                observer.complete();
            });
        });
    };
    CustomValidationService.prototype.check = function (array) {
        if (localStorage.getItem("permissionList") != "undefined") {
            var permissions = JSON.parse(localStorage.getItem("permissionList"));
            if (permissions != null) {
                var i = 0;
                var _loop_1 = function (route) {
                    // permissions=JSON.parse(permissions);
                    var pos = permissions.findIndex(function (x) { return x.permissionName == route.permission; });
                    if (pos == -1) {
                        array.splice(i, 1);
                    }
                    i++;
                };
                for (var _i = 0, array_1 = array; _i < array_1.length; _i++) {
                    var route = array_1[_i];
                    _loop_1(route);
                }
            }
        }
    };
    CustomValidationService.prototype.filterCheck = function (element, index, array) {
        if (localStorage.getItem("permissionList") != "undefined") {
            var permissions = JSON.parse(localStorage.getItem("permissionList"));
            // permissions=JSON.parse(permissions);
            if (permissions != null) {
                var pos = permissions.findIndex(function (x) { return x.permissionName == element.permission; });
                if (pos > -1) {
                    return true;
                }
                else {
                    return false;
                }
            }
        }
    };
    CustomValidationService.prototype.isPermissionAvailable = function (permission) {
        if (localStorage.getItem("permissionList") != "undefined") {
            var permissions = JSON.parse(localStorage.getItem("permissionList"));
            // permissions=JSON.parse(permissions);
            if (permissions != null) {
                var pos = permissions.findIndex(function (x) { return x.permissionName == permission; });
                if (pos > -1) {
                    return true;
                }
                else {
                    return false;
                }
            }
        }
    };
    CustomValidationService.prototype.checkExists = function (requestPath, prvValue, isEdit, control) {
        var value = control.value;
        var data = {};
        data["value"] = value;
        return this.isExistValidator(data, requestPath, prvValue, isEdit, control);
    };
    return CustomValidationService;
}());
CustomValidationService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [typeof (_a = typeof common_http_service_1.HttpCustomService !== "undefined" && common_http_service_1.HttpCustomService) === "function" && _a || Object])
], CustomValidationService);
exports.CustomValidationService = CustomValidationService;
var _a;
//# sourceMappingURL=custom-validation.service.js.map

/***/ }),

/***/ 170:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.SETTING_ROUTS = [
    { path: 'generalsetting', title: 'General Setting', class: '', permission: 'GENERAL_SETTINGS_VIEW' },
    { path: 'jobTypes', title: 'Job Types', class: '', permission: 'JOB_TYPE_VIEW' },
    { path: 'customer', title: 'Cutomer Profile', class: '', permission: 'CUSTOMER_PROFILE_VIEW' },
    { path: 'location', title: 'Location Setting', class: '', permission: 'LOCATION_SETTINGS_VIEW' },
    { path: 'contact', title: 'Contact Support', class: '', permission: 'CONTACT_SUPPORT' }
];
//# sourceMappingURL=setting-routes.config.js.map

/***/ }),

/***/ 171:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(1);
var dist_1 = __webpack_require__(321);
/**
 * Created by sachithra on 8/31/2017.
 */
var CommonNotificationService = (function () {
    function CommonNotificationService(notificationService, _pushNotifications) {
        this.notificationService = notificationService;
        this._pushNotifications = _pushNotifications;
    }
    CommonNotificationService.prototype.createSuccessNotification = function (title, content) {
        this.notificationService.success(title, content, { timeOut: 3000,
            showProgressBar: false,
            pauseOnHover: true,
            clickToClose: true,
            position: ["top", "right"],
        });
    };
    CommonNotificationService.prototype.createErrorNotification = function (title, content) {
        this.notificationService.error(title, content, { timeOut: 3000,
            showProgressBar: false,
            pauseOnHover: true,
            clickToClose: true,
            position: ["top", "right"],
        });
    };
    CommonNotificationService.prototype.createPushNotification = function (title, content) {
        this._pushNotifications.requestPermission();
        this._pushNotifications.create(title, {
            body: content,
            icon: "assets/img/carewarelogo.png",
            sticky: false
        }).subscribe();
    };
    return CommonNotificationService;
}());
CommonNotificationService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [typeof (_a = typeof dist_1.NotificationsService !== "undefined" && dist_1.NotificationsService) === "function" && _a || Object, typeof (_b = typeof dist_1.PushNotificationsService !== "undefined" && dist_1.PushNotificationsService) === "function" && _b || Object])
], CommonNotificationService);
exports.CommonNotificationService = CommonNotificationService;
var _a, _b;
//# sourceMappingURL=common-notification.service.js.map

/***/ }),

/***/ 172:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var TreeType;
(function (TreeType) {
    TreeType[TreeType["UnitTree"] = 0] = "UnitTree";
    TreeType[TreeType["LocationTree"] = 1] = "LocationTree";
})(TreeType = exports.TreeType || (exports.TreeType = {}));
//# sourceMappingURL=data.component.js.map

/***/ }),

/***/ 173:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(1);
var DurationRendererComponent = (function () {
    function DurationRendererComponent() {
    }
    DurationRendererComponent.prototype.agInit = function (params) {
        this.params = params;
        this.values = "" + params.data.duration.value;
        this.className = "" + params.data.duration.className;
    };
    return DurationRendererComponent;
}());
DurationRendererComponent = __decorate([
    core_1.Component({
        selector: 'full-width-cell',
        template: "<div class=\"text-{{ className }}\">{{ values }}</div>"
    })
], DurationRendererComponent);
exports.DurationRendererComponent = DurationRendererComponent;
//# sourceMappingURL=duration-renderer.component.js.map

/***/ }),

/***/ 174:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var translate_1 = __webpack_require__(120);
var common_1 = __webpack_require__(15);
var core_1 = __webpack_require__(1);
var TranslateModule = (function () {
    function TranslateModule() {
    }
    return TranslateModule;
}());
TranslateModule = __decorate([
    core_1.NgModule({
        imports: [common_1.CommonModule],
        declarations: [
            translate_1.TranslatePipe
        ],
        exports: [
            translate_1.TranslatePipe
        ]
    })
], TranslateModule);
exports.TranslateModule = TranslateModule;
//# sourceMappingURL=translate.module.js.map

/***/ }),

/***/ 22:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var http_1 = __webpack_require__(35);
var core_1 = __webpack_require__(1);
__webpack_require__(84);
__webpack_require__(153);
var authentication_service_1 = __webpack_require__(40);
var http_request_metadata_1 = __webpack_require__(27);
var httpRequestId = new Object();
var HttpCustomService = (function () {
    function HttpCustomService(http, authService, returnType) {
        this.http = http;
        this.authService = authService;
        this.returnType = returnType;
    }
    /*
   * Common Ajax request function.
   *
   * @param requestId  Http Request ID
   * @param requestPathParam  URL of HTTP request.
   * @param dataParams  Data Set Send through HTTP request.
   * @param successCallBack  Function pointer for the function to be called on HTTP request success
   * @param errorCallBack Function pointer for the function to be called on HTTP request Error
   * @param httpTypeParam Request type Get Or POST
   * @param returnTypeParam  Return type (Ex :- json , html , text);
   * @param isAuthRequriedParam  Authorization required or not;
   * @param additionalDataParam  If the success function needs additional data, passes the additional data to the success function.
   *
   */
    HttpCustomService.prototype.commonHttpRequest = function (requestId, requestPathParam, dataParams, successCallBack, errorCallBack, httpTypeParam, returnTypeParam, isAuthRequriedParam) {
        if (successCallBack === void 0) { successCallBack = this.commonSuccessCallBack; }
        if (errorCallBack === void 0) { errorCallBack = this.commonErrorCallBack; }
        if (httpTypeParam === void 0) { httpTypeParam = http_request_metadata_1.HttpType.GET; }
        if (returnTypeParam === void 0) { returnTypeParam = this.returnType.APPLICATION_JSON; }
        if (isAuthRequriedParam === void 0) { isAuthRequriedParam = true; }
        if (httpRequestId[requestId]) {
            console.log("There is an active HTTP request for " + requestId + ". Ignoring current http request");
            return;
        }
        httpRequestId[requestId] = true;
        var response = this.commonHttpRequestWithoutCallBacks(requestPathParam, dataParams, httpTypeParam, returnTypeParam, isAuthRequriedParam);
        response.subscribe(successCallBack, errorCallBack, function () { delete httpRequestId[requestId]; });
    };
    HttpCustomService.prototype.commonHttpRequestWithoutCallBacks = function (requestPathParam, dataParams, httpTypeParam, returnTypeParam, isAuthRequriedParam) {
        if (httpTypeParam === void 0) { httpTypeParam = http_request_metadata_1.HttpType.GET; }
        if (returnTypeParam === void 0) { returnTypeParam = this.returnType.APPLICATION_JSON; }
        if (isAuthRequriedParam === void 0) { isAuthRequriedParam = true; }
        var headers = this.getHeaders(returnTypeParam, isAuthRequriedParam);
        var params = new http_1.URLSearchParams();
        for (var key in dataParams) {
            params.append(key, dataParams[key]);
        }
        var options = new http_1.RequestOptions({ headers: headers, params: params, withCredentials: isAuthRequriedParam });
        if (httpTypeParam === http_request_metadata_1.HttpType.GET) {
            return this.getRequest(requestPathParam, options);
        }
        else {
            var method = http_1.RequestMethod.Post;
            if (httpTypeParam === http_request_metadata_1.HttpType.PUT) {
                method = http_1.RequestMethod.Put;
            }
            options = new http_1.RequestOptions({ method: method, body: dataParams, headers: headers, withCredentials: isAuthRequriedParam });
            return this.postRequest(requestPathParam, options);
        }
    };
    /*
    * Prepare HTTP header for HTTP request
    *
    * @param returnTypeParam  Return type (Ex :- json , html , text);
    * @param isAuthRequriedParam  Authorization required or not;
    */
    HttpCustomService.prototype.getHeaders = function (returnTypeParam, isAuthRequriedParam) {
        var headers = new http_1.Headers();
        headers.append('Accept', returnTypeParam);
        headers.append('Content-Type', returnTypeParam);
        if (isAuthRequriedParam) {
            headers.append('Authorization', 'Bearer ' + this.authService.getToken());
        }
        return headers;
    };
    /*
    * Http get request
    */
    HttpCustomService.prototype.getRequest = function (requestPathParam, options) {
        return this.http.get(requestPathParam, options)
            .map(this.extractData)
            .catch(this.checkAuth.bind(this));
    };
    /*
    * Http post request
    */
    HttpCustomService.prototype.postRequest = function (requestPathParam, options) {
        return this.http.request(requestPathParam, options)
            .map(this.extractData)
            .catch(this.checkAuth.bind(this));
    };
    HttpCustomService.prototype.extractData = function (res) {
        //delete httpRequestId[id];
        var body = res.json();
        return body || {};
    };
    // Display error if logged in, otherwise redirect to IDP
    HttpCustomService.prototype.checkAuth = function (error) {
        if (error && error.status === 401) {
            // this.redirectIfUnauth(error);
        }
        else {
            // this.displayError(error);
        }
        throw error;
    };
    /*
    * Default success handler function.
    */
    HttpCustomService.prototype.commonSuccessCallBack = function (response) {
        console.log("Response " + response);
    };
    /*
    * Default error handler function.
    */
    HttpCustomService.prototype.commonErrorCallBack = function (error) {
        console.log("There is an error " + error);
    };
    return HttpCustomService;
}());
HttpCustomService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [typeof (_a = typeof http_1.Http !== "undefined" && http_1.Http) === "function" && _a || Object, typeof (_b = typeof authentication_service_1.AuthenticationService !== "undefined" && authentication_service_1.AuthenticationService) === "function" && _b || Object, typeof (_c = typeof http_request_metadata_1.ReturnType !== "undefined" && http_request_metadata_1.ReturnType) === "function" && _c || Object])
], HttpCustomService);
exports.HttpCustomService = HttpCustomService;
var _a, _b, _c;
//# sourceMappingURL=common-http.service.js.map

/***/ }),

/***/ 248:
/***/ (function(module, exports) {

module.exports = "data:image/gif;base64,R0lGODlhEAAQAPMAADMzMzk5OWhoaEBAQImJiXBwcKqqqoCAgJiYmFhYWFBQUKCgoGBgYKenp4+Pj3h4eCH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAAEcRBIEOg7dWow0AiGMVCbNBhI0IjBqA2jYAgrnEkBMYPNcXymzEDXULhwQFwg4TjiNAKCj1GiBK5RAoFaul6tisItqAkIFgRnyzgpIBhmAWyQoLA5o4FDkWAM5E8TAQcFAAxUA3AlAwUjhxIKYyUKClURACH5BAkKAAAALAAAAAAQABAAAARwEEgQaHm1zjnICIgxDEuySYPhgM0QKtsICAaDLIxBbMGBBwvHxWDIaAYHlQyg+HwmgUDCc9JIEo9CAXaiRAOMw+PBrX69A4ZVEuVNDwNe4CkREBLgxEg2P8YHDwMKeE1sPAUMTCaCa2xqiiiNJ0snEQAh+QQJCgAAACwAAAAAEAAQAAAEchBIECgTtc453ggEEgROsklDc4DiYSjbBzBGEiYGAQxwUJQkgkDgMAwEBuPusTgMBihaEkYJKB4aicIgmCiGDOhpRE4UztQxuTpIZCWjTSDxwMgDMgmjoLD213gaMkdPH3lvAQwwTxR5cm47YnEnMWInEQAh+QQJCgAAACwAAAAAEAAQAAAEcBBIEChjtc45SggH8R3KJg2OFwaPUU4fwCxKqBgPNVDCMwSEwoVgCDAMi0on9TspEAaX5KPwbAa4X0DBSCR2psdi0SBdGOBNK+qgBAYKDWdAzwwEmM2nKeH+6h92GjFbgW+Dego7hHx6TTFuJiaQJhEAIfkECQoAAAAsAAAAABAAEAAABGYQSBBoKbXOOU4IhvEZyiYNhhcGC7l9QEGGjLFQA3UsCuhcK5kI0EkNNANFyMCQfBSeDcpxDAwY2JzJseRdCtpNa0mxHjdK6tmK1UiUIe31OKjCyGXc53OGvup5Vm4TgnmGJoSDExEAIfkECQoAAAAsAAAAABAAEAAABHgQSBCoUrXOGVIIQvEVwyYFhScIIFJy1fAM67AIVBkoyQAyl4JjhyBkFAKMJjA4GByvz8CzCRAYH+nAZwIwDgeCYLvVbBgIxOJBYX42Awej3KZLpgYDIerLfhYGTQYLGRl9HQYHADxVXG8IBgpdWW0AAwYMXVVLGxEAIfkECQoAAAAsAAAAABAAEAAABHMQSBDoGLXOGVQIDPMxwyaBWCIyRMlVgxCoA5FYFjYrF/N0hJ+F9zkNHouD6xPAbAKPBHOq2SQej4NsagIkCA5HgdIsTgYHafFzqQ4UBoPQMi08EAaowZHJYBYGAgZjb086gAN4Lk9MDQYXDTddJwd8FBsRACH5BAkKAAAALAAAAAAQABAAAARxEEgQ6Bi1zhlwUEoQJMMmfRj4PSVXDSE4PAqVdeJ1JUV3CDePplNwFFqi5CYgCCWfJoCiQE08NRvF4/CzeZY0Za6DHCAMvZPHYBAICAimgXADCNAIBKMNgG0GbAMLCwEOBi0bCQYhgx0INVElAVwZGxEAIfkECQoAAAAsAAAAABAAEAAABHMQSBBouHTqe8e4SqVRX+CZjChhpvkJg2VxtJKYQmqV4sU8jNgMMwkEabQRYCBo3pKjQWGasCgQig2MsyQYDMHVgLAQVAINg2NgQDASD4IR8agwsgKDwOFIgJdCEmwIAXwBBw2BEwmJAQgOJgRZSmdTZxoRACH5BAkKAAAALAAAAAAQABAAAARzEEgQaLh06sv5qBr1dYMCSlgwXspgWav3DYwJc2iQCLalnpQW57EoPkKAQWKpcBieBCSNwVPRFq5JgLFKEp69y8PBqAQQhseZsBQcAopDoZJwCQyMA0GxSIg0AwYOAXoBBQ5ZGgoIHwQEKg+JGxQCAmYaEQAh+QQJCgAAACwAAAAAEAAQAAAEbxBIEGi4dOrLe9XU4AWiNgxhV2KBYQijGCil4hqlNdDfVRiJjezyQBgfIMBOQTs0FotCcpkQiRIE1CRQ5SgPrtxF8EhUAg5DIUA4MBmPWYFRoQEYwMJj4AiSTAsEAXoBDFlTWQEPBz5aIGcMdBkTEQAh+QQJCgAAACwAAAAAEAAQAAAEcxBIEGi4dGq1xv2YBigGAgaeNgzAYSRfigWIIQyGEV9eNdQGRkKyq1gYDYXmFBA4CASBiLJaFRBYqQhV/SgOrElA0asECoaO8ZIQKMwuQeBRWCUYKKGPxVEI6g8sIUQOD00FAQmIUwOBhxcMYVsUCTAZExEAOw=="

/***/ }),

/***/ 249:
/***/ (function(module, exports) {

module.exports = "data:image/gif;base64,R0lGODlhEAAQAPMAAP////Dw8IqKiuDg4EZGRnp6egAAAFhYWCQkJKysrL6+vhQUFJycnAQEBDY2NmhoaCH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAAEcRBIEOg7dWow0AiGMVCbNBhI0IjBqA2jYAgrnEkBMYPNcXymzEDXULhwQFwg4TjiNAKCj1GiBK5RAoFaul6tisItqAkIFgRnyzgpIBhmAWyQoLA5o4FDkWAM5E8TAQcFAAxUA3AlAwUjhxIKYyUKClURACH5BAkKAAAALAAAAAAQABAAAARwEEgQaHm1zjnICIgxDEuySYPhgM0QKtsICAaDLIxBbMGBBwvHxWDIaAYHlQyg+HwmgUDCc9JIEo9CAXaiRAOMw+PBrX69A4ZVEuVNDwNe4CkREBLgxEg2P8YHDwMKeE1sPAUMTCaCa2xqiiiNJ0snEQAh+QQJCgAAACwAAAAAEAAQAAAEchBIECgTtc453ggEEgROsklDc4DiYSjbBzBGEiYGAQxwUJQkgkDgMAwEBuPusTgMBihaEkYJKB4aicIgmCiGDOhpRE4UztQxuTpIZCWjTSDxwMgDMgmjoLD213gaMkdPH3lvAQwwTxR5cm47YnEnMWInEQAh+QQJCgAAACwAAAAAEAAQAAAEcBBIEChjtc45SggH8R3KJg2OFwaPUU4fwCxKqBgPNVDCMwSEwoVgCDAMi0on9TspEAaX5KPwbAa4X0DBSCR2psdi0SBdGOBNK+qgBAYKDWdAzwwEmM2nKeH+6h92GjFbgW+Dego7hHx6TTFuJiaQJhEAIfkECQoAAAAsAAAAABAAEAAABGYQSBBoKbXOOU4IhvEZyiYNhhcGC7l9QEGGjLFQA3UsCuhcK5kI0EkNNANFyMCQfBSeDcpxDAwY2JzJseRdCtpNa0mxHjdK6tmK1UiUIe31OKjCyGXc53OGvup5Vm4TgnmGJoSDExEAIfkECQoAAAAsAAAAABAAEAAABHgQSBCoUrXOGVIIQvEVwyYFhScIIFJy1fAM67AIVBkoyQAyl4JjhyBkFAKMJjA4GByvz8CzCRAYH+nAZwIwDgeCYLvVbBgIxOJBYX42Awej3KZLpgYDIerLfhYGTQYLGRl9HQYHADxVXG8IBgpdWW0AAwYMXVVLGxEAIfkECQoAAAAsAAAAABAAEAAABHMQSBDoGLXOGVQIDPMxwyaBWCIyRMlVgxCoA5FYFjYrF/N0hJ+F9zkNHouD6xPAbAKPBHOq2SQej4NsagIkCA5HgdIsTgYHafFzqQ4UBoPQMi08EAaowZHJYBYGAgZjb086gAN4Lk9MDQYXDTddJwd8FBsRACH5BAkKAAAALAAAAAAQABAAAARxEEgQ6Bi1zhlwUEoQJMMmfRj4PSVXDSE4PAqVdeJ1JUV3CDePplNwFFqi5CYgCCWfJoCiQE08NRvF4/CzeZY0Za6DHCAMvZPHYBAICAimgXADCNAIBKMNgG0GbAMLCwEOBi0bCQYhgx0INVElAVwZGxEAIfkECQoAAAAsAAAAABAAEAAABHMQSBBouHTqe8e4SqVRX+CZjChhpvkJg2VxtJKYQmqV4sU8jNgMMwkEabQRYCBo3pKjQWGasCgQig2MsyQYDMHVgLAQVAINg2NgQDASD4IR8agwsgKDwOFIgJdCEmwIAXwBBw2BEwmJAQgOJgRZSmdTZxoRACH5BAkKAAAALAAAAAAQABAAAARzEEgQaLh06sv5qBr1dYMCSlgwXspgWav3DYwJc2iQCLalnpQW57EoPkKAQWKpcBieBCSNwVPRFq5JgLFKEp69y8PBqAQQhseZsBQcAopDoZJwCQyMA0GxSIg0AwYOAXoBBQ5ZGgoIHwQEKg+JGxQCAmYaEQAh+QQJCgAAACwAAAAAEAAQAAAEbxBIEGi4dOrLe9XU4AWiNgxhV2KBYQijGCil4hqlNdDfVRiJjezyQBgfIMBOQTs0FotCcpkQiRIE1CRQ5SgPrtxF8EhUAg5DIUA4MBmPWYFRoQEYwMJj4AiSTAsEAXoBDFlTWQEPBz5aIGcMdBkTEQAh+QQJCgAAACwAAAAAEAAQAAAEcxBIEGi4dGq1xv2YBigGAgaeNgzAYSRfigWIIQyGEV9eNdQGRkKyq1gYDYXmFBA4CASBiLJaFRBYqQhV/SgOrElA0asECoaO8ZIQKMwuQeBRWCUYKKGPxVEI6g8sIUQOD00FAQmIUwOBhxcMYVsUCTAZExEAOw=="

/***/ }),

/***/ 251:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by CSI on 8/18/2017.
 */
var core_1 = __webpack_require__(1);
var material_1 = __webpack_require__(16);
var forms_1 = __webpack_require__(12);
var common_http_service_1 = __webpack_require__(22);
var emp_profile_service_1 = __webpack_require__(115);
var SkillTreeDialog = (function () {
    function SkillTreeDialog(dialogRef, httpCustomService, _fb, empProfService) {
        // this.httpCustomService.commonHttpRequest("getAllSkillTree" , "skill/getTree" , null  , this.generateSkillTree.bind(this, true));
        this.dialogRef = dialogRef;
        this.httpCustomService = httpCustomService;
        this._fb = _fb;
        this.empProfService = empProfService;
        this.nodes = [{
                name: '',
                children: []
            }];
        this.skillGroups = [];
        this.selectedId = 0;
        this.selectedSkills = [];
        this.treenodes = [{
                name: '',
                children: []
            }];
    }
    /*private generateSkillTree(isSetSelectedId:boolean,data:any) : void{
      this.nodes = data.tree;
      let skillGroups = data.skillGroups;
      this.skillGroups = skillGroups;
  
  
      if(isSetSelectedId){
        if(skillGroups.length > 0){
          this.selectedId = skillGroups[0].id;
        }else{
          this.selectedId = -1;
        }
      }
      let selected= this.selectedSkills;
  
      if(selected.length>0){
        for(let skill of selected){
          for(let skillGroup of skillGroups){
            let index = skillGroup.skills.findIndex(x => x.id==skill.id);
            if(index>-1){
              let node={name:skillGroup.name,children:[skill]};
              let pos = this.treenodes.findIndex(x => x.name == skillGroup.name);
              if(pos>-1){
                let childArray=this.treenodes[pos].children;
                childArray.push(skill);
              }
              else {
                this.treenodes.push(node);
              }
              skillGroup.skills[index].selected=true;
            }
          }
        }
      }
      this.empProfService.setSkillNodeArray(this.treenodes);
    }*/
    SkillTreeDialog.prototype.ngOnInit = function () {
        this.skillForm = this._fb.group({
            selectedSkills: this._fb.array([])
        });
    };
    SkillTreeDialog.prototype.onChange = function (skillGroup, skill, isChecked) {
        var skillFormArray = this.selectedSkills;
        // skill.skillGroup=skillGroup;
        var node = { name: skillGroup.name, children: [skill] };
        var pos = this.treenodes.findIndex(function (x) { return x.name == skillGroup.name; });
        if (isChecked) {
            skill.selected = true;
            if (pos > -1) {
                var childArray = this.treenodes[pos].children;
                childArray.push(skill);
            }
            else {
                this.treenodes.push(node);
            }
            skillFormArray.push(skill);
        }
        else {
            skill.selected = false;
            var chlidArray = this.treenodes[pos].children;
            var childPos = chlidArray.findIndex(function (x) { return x.value == skill; });
            chlidArray.splice(childPos);
            if (chlidArray.length == 0) {
                this.treenodes.splice(pos);
            }
            var index = skillFormArray.findIndex(function (x) { return x.value == skill; });
            skillFormArray.splice(index);
        }
        this.empProfService.setSkills(skillFormArray);
        this.empProfService.setSkillNodeArray(this.treenodes);
    };
    return SkillTreeDialog;
}());
SkillTreeDialog = __decorate([
    core_1.Component({
        selector: "skill-tree-dialog",
        template: __webpack_require__(678),
        providers: []
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof material_1.MdDialogRef !== "undefined" && material_1.MdDialogRef) === "function" && _a || Object, typeof (_b = typeof common_http_service_1.HttpCustomService !== "undefined" && common_http_service_1.HttpCustomService) === "function" && _b || Object, typeof (_c = typeof forms_1.FormBuilder !== "undefined" && forms_1.FormBuilder) === "function" && _c || Object, typeof (_d = typeof emp_profile_service_1.EmployeeProfileService !== "undefined" && emp_profile_service_1.EmployeeProfileService) === "function" && _d || Object])
], SkillTreeDialog);
exports.SkillTreeDialog = SkillTreeDialog;
var _a, _b, _c, _d;
//# sourceMappingURL=emp-skills.dialog.component.js.map

/***/ }),

/***/ 252:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(1);
var table_component_1 = __webpack_require__(31);
var forms_1 = __webpack_require__(12);
var common_http_service_1 = __webpack_require__(22);
var http_request_metadata_1 = __webpack_require__(27);
var emp_profile_service_1 = __webpack_require__(115);
var util_1 = __webpack_require__(471);
var emp_skills_dialog_component_1 = __webpack_require__(251);
var material_1 = __webpack_require__(16);
var custom_validation_service_1 = __webpack_require__(17);
var router_1 = __webpack_require__(36);
var common_notification_service_1 = __webpack_require__(171);
var EmployeeProfileComponent = (function () {
    function EmployeeProfileComponent(route, httpCustomService, _fb, empProfileService, dialog, customValidationService, router, notificationService) {
        this.route = route;
        this.httpCustomService = httpCustomService;
        this._fb = _fb;
        this.empProfileService = empProfileService;
        this.dialog = dialog;
        this.customValidationService = customValidationService;
        this.router = router;
        this.notificationService = notificationService;
        this.unitAccess = [];
        this.unitList = [];
        this.gradeList = [];
        this.genderLst = [];
        this.statusList = [];
        this.empTypes = [];
        this.roleList = [];
        this.retList = [];
        this.skillList = [];
        this.systemAccessTypes = [];
        this.selectedUnitList = [];
        this.skillGroups = [];
        this.isEdit = false;
        this.systemAccess = [];
        this.nodes = [{
                name: '',
                children: [],
                icon: "done"
            }];
        this.fullTree = [{
                name: '',
                children: [],
                icon: "done"
            }];
        this.treeoptions = {
            nodeClass: function (node) {
                if (node.data.icon) {
                    return 'tree-' + node.data.icon;
                }
                return 'tree-node-folder';
            },
            allowDrag: function (node) { return node.isLeaf; },
            allowDrop: function (element, _a) {
                var parent = _a.parent, index = _a.index;
                return index > 0;
            },
        };
        this.httpCustomService.commonHttpRequest("getGrades", "category/getgrades", null, this.generateGradeDropDown.bind(this), null, http_request_metadata_1.HttpType.GET);
        this.httpCustomService.commonHttpRequest("getValues", "employee/getdetails", null, this.generateDropDowns.bind(this), null, http_request_metadata_1.HttpType.GET);
        this.id = route.snapshot.queryParams['id'];
        this.setEmployeeDetails(this.id);
    }
    EmployeeProfileComponent.prototype.ngOnInit = function () {
        this.empProfileForm = this._fb.group({
            name: this.name,
            employeeId: [this.empid, [forms_1.Validators.required], this.checkExists.bind(this, "employee/checkempid", this.empid, this.isEdit)],
            id: this.id,
            address: this.address,
            nationality: this.nationality,
            email: this.email,
            phoneNo: this.phoneNo,
            mobileNo: this.mobileNo,
            gender: this.gender,
            maritalStatus: this.maritalStatus,
            dob: this.dob,
            employeeType: this.employeeType,
            joinedDate: this.joinedDate,
            contractEndDate: this.contractEndDate,
            unit: this.unit,
            grade: this.grade,
            unitAccess: this.unitAccess,
            role: this.role,
            username: [this.username, [forms_1.Validators.required], this.checkExists.bind(this, "employee/checkusername", this.username, this.isEdit)],
            password: this.password,
            systemAccess: this.systemAccess
        });
    };
    EmployeeProfileComponent.prototype.generateGradeDropDown = function (result) {
        this.gradeList = result;
    };
    EmployeeProfileComponent.prototype.generateDropDowns = function (result) {
        this.genderLst = result.genders;
        this.statusList = result.maritalStatus;
        this.empTypes = result.empTypes;
        this.unitList = result.unitList;
        var roleObject = result.roleList;
        this.systemAccessTypes = result.sysAccess;
        this.retList.push(roleObject);
        this.hasChildren(roleObject);
    };
    EmployeeProfileComponent.prototype.setEmployeeDetails = function (profileId) {
        if (!util_1.isUndefined(profileId) && profileId != null) {
            var data = { id: profileId };
            this.httpCustomService.commonHttpRequest("getempprofiledetail", "employee/getempprofiledetail", data, this.fillData.bind(this), null, http_request_metadata_1.HttpType.GET);
        }
        else {
            this.fillData(null);
        }
    };
    EmployeeProfileComponent.prototype.fillData = function (result) {
        if (result == null) {
            this.isEdit = false;
            this.skillList = [];
            this.empProfileForm = this._fb.group({
                id: 0,
                name: "",
                employeeId: ["", [forms_1.Validators.required], this.checkExists.bind(this, "employee/checkempid", this.empid, this.isEdit)],
                address: "",
                nationality: "",
                email: "",
                phoneNo: "",
                mobileNo: "",
                gender: "",
                maritalStatus: "",
                dob: "",
                employeeType: "",
                joinedDate: "",
                contractEndDate: "",
                unit: "",
                grade: "",
                unitAccess: "",
                role: "",
                username: ["", [forms_1.Validators.required], this.checkExists.bind(this, "employee/checkusername", this.username, this.isEdit)],
                password: "",
            });
        }
        else {
            this.isEdit = true;
            var obj = result.profile;
            this.skillList = obj.skills;
            this.empProfileForm = this._fb.group({
                id: obj.id,
                name: obj.name,
                employeeId: [obj.employeeId, [forms_1.Validators.required], this.checkExists.bind(this, "employee/checkempid", obj.employeeId, this.isEdit)],
                address: obj.address,
                nationality: obj.nationality,
                email: obj.email,
                phoneNo: obj.phoneNo,
                mobileNo: obj.mobileNo,
                gender: obj.gender,
                maritalStatus: obj.maritalStatus,
                dob: obj.dob,
                employeeType: obj.employeeType.id,
                joinedDate: obj.joinedDate,
                contractEndDate: obj.contractEndDate,
                unit: obj.unit.id,
                grade: obj.grade.id,
                unitAccess: [obj.unitAccess, ""],
                role: obj.role.id,
                systemAccess: [obj.systemAccess, ""]
            });
        }
        this.httpCustomService.commonHttpRequest("getAllSkillTree", "skill/getTree", null, this.generateSkillTree.bind(this, true));
        this.empProfileService.setProfileId(null);
    };
    EmployeeProfileComponent.prototype.saveEmpProfile = function (entity) {
        entity.role = { id: entity.role };
        entity["skills"] = this.skillList;
        entity.unit = { id: entity.unit };
        entity.grade = { id: entity.grade };
        entity.employeeType = { id: entity.employeeType };
        this.httpCustomService.commonHttpRequest("addEmpProfile", "employee/addempprofile", entity, this.addEmpProfileSuccess.bind(this), null, http_request_metadata_1.HttpType.POST);
        entity = null;
    };
    EmployeeProfileComponent.prototype.addEmpProfileSuccess = function () {
        this.notificationService.createSuccessNotification('Employee Profile', 'Employee Added Successfully');
        this.router.navigate(['/employeeProfiles']);
    };
    EmployeeProfileComponent.prototype.hasChildren = function (role) {
        var returnVal = true;
        var childRoleList = role.childrenRoles;
        if (childRoleList.length > 0) {
            this.retList = this.retList.concat(childRoleList);
            for (var _i = 0, childRoleList_1 = childRoleList; _i < childRoleList_1.length; _i++) {
                var roleObj = childRoleList_1[_i];
                this.hasChildren(roleObj);
            }
        }
        return this.retList;
    };
    EmployeeProfileComponent.prototype.openSkillDialog = function () {
        var _this = this;
        var dialogRef = this.dialog.open(emp_skills_dialog_component_1.SkillTreeDialog);
        dialogRef.disableClose;
        dialogRef.componentInstance.selectedSkills = this.skillList;
        dialogRef.componentInstance.nodes = this.fullTree;
        dialogRef.componentInstance.skillGroups = this.skillGroups;
        dialogRef.componentInstance.treenodes = this.nodes;
        dialogRef.afterClosed().subscribe(function (data) {
            if (data) {
                _this.skillList = _this.empProfileService.getSkills();
                _this.nodes = _this.empProfileService.getSkillNodeArray();
            }
            else {
                _this.empProfileService.setSkillNodeArray(_this.nodes);
                _this.empProfileService.setSkills(_this.skillList);
            }
        });
    };
    EmployeeProfileComponent.prototype.generateSkillTree = function (isSetSelectedId, data) {
        var skillGroups = data.skillGroups;
        this.skillGroups = skillGroups;
        this.fullTree = data.tree;
        var selected = this.skillList;
        var treeNodes = [{
                name: 'Selected Skills',
                children: [],
                icon: "done"
            }];
        if (selected.length > 0) {
            var _loop_1 = function (skill) {
                var _loop_2 = function (skillGroup) {
                    var index = skillGroup.skills.findIndex(function (x) { return x.id == skill.id; });
                    if (index > -1) {
                        var node = { name: skillGroup.name, children: [skill], icon: "" };
                        var pos = treeNodes.findIndex(function (x) { return x.name == skillGroup.name; });
                        if (pos > -1) {
                            var childArray = treeNodes[pos].children;
                            childArray.push(skill);
                        }
                        else {
                            treeNodes.push(node);
                        }
                        skillGroup.skills[index].selected = true;
                    }
                };
                for (var _i = 0, skillGroups_1 = skillGroups; _i < skillGroups_1.length; _i++) {
                    var skillGroup = skillGroups_1[_i];
                    _loop_2(skillGroup);
                }
            };
            for (var _i = 0, selected_1 = selected; _i < selected_1.length; _i++) {
                var skill = selected_1[_i];
                _loop_1(skill);
            }
        }
        this.nodes = treeNodes;
        // this.nodes.shift();
    };
    EmployeeProfileComponent.prototype.moveNode = function (result) {
        var nodes = result.treeModel.nodes;
        this.skillList = [];
        for (var _i = 0, nodes_1 = nodes; _i < nodes_1.length; _i++) {
            var node = nodes_1[_i];
            this.skillList = this.skillList.concat(node.children);
        }
    };
    EmployeeProfileComponent.prototype.treeclickEvent = function (event) {
    };
    EmployeeProfileComponent.prototype.treeExpanded = function (event) {
    };
    EmployeeProfileComponent.prototype.checkExists = function (requestPath, prvValue, isEdit, control) {
        var value = control.value;
        var data = {};
        data["value"] = value;
        return this.customValidationService.isExistValidator(data, requestPath, prvValue, isEdit, control);
    };
    return EmployeeProfileComponent;
}());
__decorate([
    core_1.ViewChild(table_component_1.AgGridTableCustomComponent),
    __metadata("design:type", typeof (_a = typeof forms_1.FormGroup !== "undefined" && forms_1.FormGroup) === "function" && _a || Object)
], EmployeeProfileComponent.prototype, "empProfileForm", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Number)
], EmployeeProfileComponent.prototype, "profileId", void 0);
EmployeeProfileComponent = __decorate([
    core_1.Component({
        selector: 'employee-profile-cmp',
        template: __webpack_require__(679)
    }),
    __metadata("design:paramtypes", [typeof (_b = typeof router_1.ActivatedRoute !== "undefined" && router_1.ActivatedRoute) === "function" && _b || Object, typeof (_c = typeof common_http_service_1.HttpCustomService !== "undefined" && common_http_service_1.HttpCustomService) === "function" && _c || Object, typeof (_d = typeof forms_1.FormBuilder !== "undefined" && forms_1.FormBuilder) === "function" && _d || Object, typeof (_e = typeof emp_profile_service_1.EmployeeProfileService !== "undefined" && emp_profile_service_1.EmployeeProfileService) === "function" && _e || Object, typeof (_f = typeof material_1.MdDialog !== "undefined" && material_1.MdDialog) === "function" && _f || Object, typeof (_g = typeof custom_validation_service_1.CustomValidationService !== "undefined" && custom_validation_service_1.CustomValidationService) === "function" && _g || Object, typeof (_h = typeof router_1.Router !== "undefined" && router_1.Router) === "function" && _h || Object, typeof (_j = typeof common_notification_service_1.CommonNotificationService !== "undefined" && common_notification_service_1.CommonNotificationService) === "function" && _j || Object])
], EmployeeProfileComponent);
exports.EmployeeProfileComponent = EmployeeProfileComponent;
var _a, _b, _c, _d, _e, _f, _g, _h, _j;
//# sourceMappingURL=employee-profile.component.js.map

/***/ }),

/***/ 253:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(1);
var forms_1 = __webpack_require__(12);
var common_http_service_1 = __webpack_require__(22);
var material_1 = __webpack_require__(16);
var custom_validation_service_1 = __webpack_require__(17);
/**
 * Created by CSI on 8/11/2017.
 */
var EmpTypeDialog = (function () {
    function EmpTypeDialog(dialogRef, httpCustomService, _fb, customValidationService) {
        this.dialogRef = dialogRef;
        this.httpCustomService = httpCustomService;
        this._fb = _fb;
        this.customValidationService = customValidationService;
        this.isEdit = false;
    }
    EmpTypeDialog.prototype.ngOnInit = function () {
        this.empTypeForm = this._fb.group({
            id: this.id,
            name: [this.name, [forms_1.Validators.required], this.checkExists.bind(this, "employee/checkemptypename", this.name, this.isEdit)],
            abbreviation: this.abbreviation
        });
    };
    EmpTypeDialog.prototype.setTitle = function (title) {
        this.title = title;
    };
    EmpTypeDialog.prototype.setActionButtonString = function (actionButtionValue) {
        this.actionButton = actionButtionValue;
    };
    EmpTypeDialog.prototype.setDialogDetails = function (object) {
        if (object != null) {
            this.isEdit = true;
            this.id = object.id;
            this.name = object.name;
            this.abbreviation = object.abbreviation;
        }
        else {
            this.isEdit = false;
            this.id = 0;
        }
    };
    EmpTypeDialog.prototype.checkExists = function (requestPath, prvValue, isEdit, control) {
        var value = control.value;
        var data = {};
        data["value"] = value;
        return this.customValidationService.isExistValidator(data, requestPath, prvValue, isEdit, control);
    };
    return EmpTypeDialog;
}());
EmpTypeDialog = __decorate([
    core_1.Component({
        selector: "emp-type-dialog",
        template: __webpack_require__(682)
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof material_1.MdDialogRef !== "undefined" && material_1.MdDialogRef) === "function" && _a || Object, typeof (_b = typeof common_http_service_1.HttpCustomService !== "undefined" && common_http_service_1.HttpCustomService) === "function" && _b || Object, typeof (_c = typeof forms_1.FormBuilder !== "undefined" && forms_1.FormBuilder) === "function" && _c || Object, typeof (_d = typeof custom_validation_service_1.CustomValidationService !== "undefined" && custom_validation_service_1.CustomValidationService) === "function" && _d || Object])
], EmpTypeDialog);
exports.EmpTypeDialog = EmpTypeDialog;
var _a, _b, _c, _d;
//# sourceMappingURL=emp-type.dialog.js.map

/***/ }),

/***/ 254:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by Sachithra on 2/27/2018.
 */
var core_1 = __webpack_require__(1);
var CustomGrid = (function () {
    function CustomGrid() {
    }
    CustomGrid.prototype.setGridList = function (gridLst) {
        this.jobList = gridLst;
    };
    return CustomGrid;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Array)
], CustomGrid.prototype, "jobList", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], CustomGrid.prototype, "isToolTipRequired", void 0);
CustomGrid = __decorate([
    core_1.Component({
        selector: "custom-grid-comp",
        template: __webpack_require__(687)
    })
], CustomGrid);
exports.CustomGrid = CustomGrid;
//# sourceMappingURL=gridCustom.component.js.map

/***/ }),

/***/ 255:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(1);
var custom_validation_service_1 = __webpack_require__(17);
/**
 * Created by CSI on 8/9/2017.
 */
var JobTypeActionRendererComponent = (function () {
    function JobTypeActionRendererComponent(customValidation) {
        this.customValidation = customValidation;
    }
    JobTypeActionRendererComponent.prototype.agInit = function (params) {
        this.params = params;
        this.jobType = params.data;
        this.jobTypeComponent = params.context.parentComponent;
    };
    JobTypeActionRendererComponent.prototype.editJobType = function () {
        this.jobTypeComponent.setEntityDetails(this.jobType);
    };
    JobTypeActionRendererComponent.prototype.removeJobType = function () {
        this.jobTypeComponent.removeJobType(this.jobType.id);
    };
    return JobTypeActionRendererComponent;
}());
JobTypeActionRendererComponent = __decorate([
    core_1.Component({
        selector: 'full-width-cell',
        template: "<td class=\"text-right table-action\" *ngIf=\"customValidation.isPermissionAvailable('JOB_TYPES_EDIT')\">\n               <button type=\"button\" rel=\"tooltip\" title=\"\" class=\"btn btn-primary btn-simple btn-xs\"\n\t\t\t\tdata-original-title=\"Edit Level\" (click)=\"editJobType()\"><i class=\"material-icons\">dvr</i><div class=\"ripple-container\"></div></button>\n               <button type=\"button\" rel=\"tooltip\" title=\"\" class=\"btn btn-primary btn-simple btn-xs\"\n\t\t\t\tdata-original-title=\"Remove Level\" (click)=\"removeJobType()\"><i class=\"material-icons\">delete</i></button>\n               </td>"
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof custom_validation_service_1.CustomValidationService !== "undefined" && custom_validation_service_1.CustomValidationService) === "function" && _a || Object])
], JobTypeActionRendererComponent);
exports.JobTypeActionRendererComponent = JobTypeActionRendererComponent;
var _a;
//# sourceMappingURL=jobType-actionRenderer.js.map

/***/ }),

/***/ 256:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Created by CSI on 8/1/2017.
 */

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(1);
var jobType_service_1 = __webpack_require__(258);
var forms_1 = __webpack_require__(12);
var common_http_service_1 = __webpack_require__(22);
var http_request_metadata_1 = __webpack_require__(27);
var material_1 = __webpack_require__(16);
var custom_validation_service_1 = __webpack_require__(17);
var JobTypeDialog = (function () {
    function JobTypeDialog(dialogRef, httpCustomService, _fb, customValidationService) {
        this.dialogRef = dialogRef;
        this.httpCustomService = httpCustomService;
        this._fb = _fb;
        this.customValidationService = customValidationService;
        this.optionalSkills = [];
        this.requiredSkills = [];
        this.isEdit = false;
    }
    JobTypeDialog.prototype.ngOnInit = function () {
        var data = { companyId: 1 };
        this.httpCustomService.commonHttpRequest("getSkillGroup", "skill/getskillgroup", data, this.generateSkillDropDowns.bind(this), null, http_request_metadata_1.HttpType.GET);
        this.httpCustomService.commonHttpRequest("getCategories", "category/getAllCategories", null, this.generateCategoryDropDown.bind(this), null, http_request_metadata_1.HttpType.GET);
        this.jobTypeForm = this._fb.group({
            id: [this.id],
            name: [this.name, [forms_1.Validators.required], this.checkExists.bind(this, "jobtype/checkjobtypeexists", this.name, this.isEdit)],
            requiredSkills: [this.requiredSkills],
            optionalSkills: [this.optionalSkills],
            category: [this.category]
        });
    };
    JobTypeDialog.prototype.generateSkillDropDowns = function (result) {
        this.skills = result.skillGroup;
        debugger;
    };
    JobTypeDialog.prototype.generateCategoryDropDown = function (retval) {
        this.categoryList = retval.categories;
    };
    JobTypeDialog.prototype.setTitle = function (title) {
        this.title = title;
    };
    JobTypeDialog.prototype.setActionButtonString = function (actionButtionValue) {
        this.actionButton = actionButtionValue;
    };
    JobTypeDialog.prototype.setDialogDetails = function (object) {
        if (object != null) {
            this.isEdit = true;
            var reqList = [];
            var optList = [];
            for (var _i = 0, _a = object.requiredSkills; _i < _a.length; _i++) {
                var req = _a[_i];
                reqList.push(req.id);
            }
            for (var _b = 0, _c = object.optionalSkills; _b < _c.length; _b++) {
                var opt = _c[_b];
                optList.push(opt.id);
            }
            this.id = object.id;
            this.name = object.name;
            this.requiredSkills = reqList;
            this.optionalSkills = optList;
            this.category = object.category.id;
        }
        else {
            this.isEdit = false;
            this.id = 0;
        }
    };
    JobTypeDialog.prototype.checkExists = function (requestPath, prvValue, isEdit, control) {
        var value = control.value;
        var data = {};
        data["value"] = value;
        return this.customValidationService.isExistValidator(data, requestPath, prvValue, isEdit, control);
    };
    return JobTypeDialog;
}());
JobTypeDialog = __decorate([
    core_1.Component({
        selector: 'jobtype-dialog-cmp',
        template: __webpack_require__(691),
        providers: [jobType_service_1.JobTypeService]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof material_1.MdDialogRef !== "undefined" && material_1.MdDialogRef) === "function" && _a || Object, typeof (_b = typeof common_http_service_1.HttpCustomService !== "undefined" && common_http_service_1.HttpCustomService) === "function" && _b || Object, typeof (_c = typeof forms_1.FormBuilder !== "undefined" && forms_1.FormBuilder) === "function" && _c || Object, typeof (_d = typeof custom_validation_service_1.CustomValidationService !== "undefined" && custom_validation_service_1.CustomValidationService) === "function" && _d || Object])
], JobTypeDialog);
exports.JobTypeDialog = JobTypeDialog;
var _a, _b, _c, _d;
//# sourceMappingURL=jobType-dialog.component.js.map

/***/ }),

/***/ 257:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by CSI on 7/31/2017.
 */
var core_1 = __webpack_require__(1);
var jobType_service_1 = __webpack_require__(258);
var forms_1 = __webpack_require__(12);
var table_component_1 = __webpack_require__(31);
var common_http_service_1 = __webpack_require__(22);
var jobType_dialog_component_1 = __webpack_require__(256);
var material_1 = __webpack_require__(16);
var http_request_metadata_1 = __webpack_require__(27);
var jobType_actionRenderer_1 = __webpack_require__(255);
var confirmation_dialog_1 = __webpack_require__(41);
var custom_validation_service_1 = __webpack_require__(17);
var JobTypeComponent = (function () {
    function JobTypeComponent(httpCustomService, _fb, dialog, customValidation) {
        this.httpCustomService = httpCustomService;
        this._fb = _fb;
        this.dialog = dialog;
        this.customValidation = customValidation;
        this.rowData = [];
        this.agPaginationAuto = false;
        this.httpCustomService.commonHttpRequest("getalljobtype", "jobtype/getalljobtypes", null, this.generateJobtypeTable.bind(this), null, http_request_metadata_1.HttpType.GET);
    }
    JobTypeComponent.prototype.ngOnInit = function () {
        var columnDefs = [
            {
                headerName: "Name",
                field: "name",
                width: 100
            },
            {
                headerName: "Category",
                field: "category",
                width: 100
            },
            {
                headerName: "Required Skills",
                field: "requiredSkills",
                width: 100
            },
            {
                headerName: "Optional Skills",
                field: "optionalSkills",
                width: 100
            },
            {
                headerName: "Action",
                field: "action",
                cellRendererFramework: jobType_actionRenderer_1.JobTypeActionRendererComponent,
                width: 40
            },
        ];
        this.jobTypeTableComponent.agPaginationAuto = this.agPaginationAuto;
        this.jobTypeTableComponent.setColumnDef(columnDefs);
        this.jobTypeTableComponent.setData(this.rowData);
        this.jobTypeTableComponent.setGridOptionContext({ parentComponent: this });
    };
    JobTypeComponent.prototype.openJobTypeDialog = function (entity) {
        var _this = this;
        var dialogRef = this.dialog.open(jobType_dialog_component_1.JobTypeDialog);
        dialogRef.disableClose = true;
        dialogRef.componentInstance.setDialogDetails(entity);
        if (entity == null) {
            this.setJobTypeActionButtonAndHeader(dialogRef, "add");
        }
        else {
            this.setJobTypeActionButtonAndHeader(dialogRef, "edit");
        }
        dialogRef.afterClosed().subscribe(function (data) {
            if (data) {
                var jobType = {
                    id: data.id,
                    name: data.name,
                    requiredSkills: data.requiredSkills,
                    optionalSkills: data.optionalSkills,
                    category: data.category
                };
                var param = { jobtype: jobType };
                _this.httpCustomService.commonHttpRequest("addjobtype", "jobtype/add/jobtype", jobType, _this.generateJobtypeTable.bind(_this), null, http_request_metadata_1.HttpType.POST);
            }
        });
    };
    JobTypeComponent.prototype.setJobTypeActionButtonAndHeader = function (dialogRef, type) {
        if (type == "add") {
            dialogRef.componentInstance.setTitle("Add Job Type");
            dialogRef.componentInstance.setActionButtonString("Add");
        }
        else if (type == "edit") {
            dialogRef.componentInstance.setTitle("Edit Job Type");
            dialogRef.componentInstance.setActionButtonString("Edit");
        }
    };
    JobTypeComponent.prototype.generateJobtypeTable = function (result) {
        this.rowData = [];
        var jobTypes = result.jobTypes;
        for (var _i = 0, jobTypes_1 = jobTypes; _i < jobTypes_1.length; _i++) {
            var item = jobTypes_1[_i];
            var reqList = [];
            var optList = [];
            for (var _a = 0, _b = item.requiredSkills; _a < _b.length; _a++) {
                var req = _b[_a];
                reqList.push(req.name);
            }
            for (var _c = 0, _d = item.optionalSkills; _c < _d.length; _c++) {
                var opt = _d[_c];
                optList.push(opt.name);
            }
            var obj = {
                category: item.category.name,
                name: item.name,
                requiredSkills: reqList,
                optionalSkills: optList,
                action: { url: "" },
                id: item.id
            };
            this.rowData.push(obj);
        }
        this.jobTypeTableComponent.updateData(this.rowData);
    };
    JobTypeComponent.prototype.setEntityDetails = function (entity) {
        var data = { id: entity.id };
        this.httpCustomService.commonHttpRequest("getjobtype:" + entity.id, "jobtype/getjobtypebyid", data, this.openJobTypeDialog.bind(this), null, http_request_metadata_1.HttpType.GET);
        // this.openJobTypeDialog(entity);
    };
    JobTypeComponent.prototype.removeJobType = function (id) {
        var _this = this;
        var dialogRef = this.dialog.open(confirmation_dialog_1.ConfirmationDialog);
        dialogRef.disableClose = true;
        dialogRef.componentInstance.title = "Remove Job Type";
        dialogRef.componentInstance.message = "Are you sure you want to remove Jobtype?";
        dialogRef.afterClosed().subscribe(function (result) {
            if (result == true) {
                var data = { id: id };
                _this.httpCustomService.commonHttpRequest("deleteJobType:ID_" + id, "jobtype/removejobtype", data, _this.generateJobtypeTable.bind(_this), null, http_request_metadata_1.HttpType.GET);
            }
        });
    };
    return JobTypeComponent;
}());
__decorate([
    core_1.ViewChild(table_component_1.AgGridTableCustomComponent),
    __metadata("design:type", typeof (_a = typeof table_component_1.AgGridTableCustomComponent !== "undefined" && table_component_1.AgGridTableCustomComponent) === "function" && _a || Object)
], JobTypeComponent.prototype, "jobTypeTableComponent", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], JobTypeComponent.prototype, "agPaginationAuto", void 0);
JobTypeComponent = __decorate([
    core_1.Component({
        selector: 'jobtype-cmp',
        template: __webpack_require__(692),
        providers: [jobType_service_1.JobTypeService]
    }),
    __metadata("design:paramtypes", [typeof (_b = typeof common_http_service_1.HttpCustomService !== "undefined" && common_http_service_1.HttpCustomService) === "function" && _b || Object, typeof (_c = typeof forms_1.FormBuilder !== "undefined" && forms_1.FormBuilder) === "function" && _c || Object, typeof (_d = typeof material_1.MdDialog !== "undefined" && material_1.MdDialog) === "function" && _d || Object, typeof (_e = typeof custom_validation_service_1.CustomValidationService !== "undefined" && custom_validation_service_1.CustomValidationService) === "function" && _e || Object])
], JobTypeComponent);
exports.JobTypeComponent = JobTypeComponent;
var _a, _b, _c, _d, _e;
//# sourceMappingURL=jobType.component.js.map

/***/ }),

/***/ 258:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var http_1 = __webpack_require__(35);
var authentication_service_1 = __webpack_require__(40);
var core_1 = __webpack_require__(1);
/**
 * Created by CSI on 7/31/2017.
 */
var JobTypeService = (function () {
    function JobTypeService(http, authService) {
        this.http = http;
        this.authService = authService;
        this.headers = new http_1.Headers({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + this.authService.getToken()
        });
    }
    return JobTypeService;
}());
JobTypeService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [typeof (_a = typeof http_1.Http !== "undefined" && http_1.Http) === "function" && _a || Object, typeof (_b = typeof authentication_service_1.AuthenticationService !== "undefined" && authentication_service_1.AuthenticationService) === "function" && _b || Object])
], JobTypeService);
exports.JobTypeService = JobTypeService;
var _a, _b;
//# sourceMappingURL=jobType.service.js.map

/***/ }),

/***/ 259:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(1);
var router_1 = __webpack_require__(36);
var authentication_service_1 = __webpack_require__(40);
var http_1 = __webpack_require__(35);
var setting_routes_config_1 = __webpack_require__(170);
var custom_validation_service_1 = __webpack_require__(17);
var LoginComponent = (function () {
    function LoginComponent(router, authenticationService, http, customeValidation) {
        this.router = router;
        this.authenticationService = authenticationService;
        this.http = http;
        this.customeValidation = customeValidation;
        this.model = {};
        this.loading = false;
        this.error = '';
        this.loginImageWidth = 300;
        this.loginImageMarginTop = 40;
        this.happyImageWidth = 30;
        this.happyImageMargin = 0;
    }
    LoginComponent.prototype.ngOnInit = function () {
        // reset login status
        this.authenticationService.logout();
    };
    LoginComponent.prototype.login = function () {
        var _this = this;
        this.loading = true;
        this.authenticationService.login(this.model.username, this.model.password)
            .subscribe(function (result) {
            if (result === true) {
                // login successful
                _this.customeValidation.check(setting_routes_config_1.SETTING_ROUTS);
                _this.router.navigate(['dashboard']);
                // console.log('goda');
            }
            else {
                // login failed
                _this.error = 'Username or password is incorrect';
                _this.loading = false;
            }
        }, function (error) {
            _this.loading = false;
            _this.error = 'Invalid Username or Password';
        });
    };
    return LoginComponent;
}());
LoginComponent = __decorate([
    core_1.Component({
        template: __webpack_require__(693),
        styles: [__webpack_require__(642)]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof router_1.Router !== "undefined" && router_1.Router) === "function" && _a || Object, typeof (_b = typeof authentication_service_1.AuthenticationService !== "undefined" && authentication_service_1.AuthenticationService) === "function" && _b || Object, typeof (_c = typeof http_1.Http !== "undefined" && http_1.Http) === "function" && _c || Object, typeof (_d = typeof custom_validation_service_1.CustomValidationService !== "undefined" && custom_validation_service_1.CustomValidationService) === "function" && _d || Object])
], LoginComponent);
exports.LoginComponent = LoginComponent;
var _a, _b, _c, _d;
//# sourceMappingURL=login.component.js.map

/***/ }),

/***/ 260:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(1);
var forms_1 = __webpack_require__(12);
var table_component_1 = __webpack_require__(31);
var ReportsComponent = (function () {
    function ReportsComponent(_fb) {
        this._fb = _fb;
        this.time = { hour: 13, minute: 30 };
        this.agPaginationAuto = false;
    }
    ReportsComponent.prototype.ngOnInit = function () {
        this.generalReportForm = this._fb.group({
            name: this.name
        });
        var columnDefs = [
            {
                headerName: "Employee",
                field: "name",
                width: 120
            },
            {
                headerName: "Employee ID",
                field: "empId",
                width: 120
            },
            {
                headerName: "Department",
                field: "department",
                width: 120
            },
            {
                headerName: "Event",
                field: "event",
                width: 80
            },
            {
                headerName: "Modified Entity",
                field: "modifiedEvent",
                width: 100
            },
            {
                headerName: "Action",
                cellRendererFramework: ViewActionRendererComponent,
                width: 80
            },
        ];
        var data = [
            { "time": "12", "name": "James", "event": "", "modifiedEvent": "", "department": "Porters Unit", "empId": "BIH-0060E", "status": "1" },
            { "time": "10", "name": "Johnathan", "event": "", "modifiedEvent": "", "department": "Porters Unit", "empId": "BIH-0061E", "status": "1" },
            { "time": "9", "name": "Abraham", "event": "", "modifiedEvent": "", "department": "Porters Unit", "empId": "BIH-0062E", "status": "1" },
            { "time": "5", "name": "Ethan", "event": "", "modifiedEvent": "", "department": "Porters Unit", "empId": "BIH-0063E", "status": "1" },
            { "time": "5", "name": "Cortez", "event": "", "modifiedEvent": "", "department": "Porters Unit", "empId": "BIH-0063E", "status": "1" },
            { "time": "5", "name": "Eldridge", "event": "", "modifiedEvent": "", "department": "Porters Unit", "empId": "BIH-0063E", "status": "1" },
            { "time": "12", "name": "Bert", "event": "", "modifiedEvent": "", "department": "Porters Unit", "empId": "BIH-0064E", "status": "1" },
            { "time": "10", "name": "Augustus", "event": "", "modifiedEvent": "", "department": "Interpreters", "empId": "BIH-0065E", "status": "2" },
            { "time": "10", "name": "Andrew", "event": "", "modifiedEvent": "", "department": "Interpreters", "empId": "BIH-0066E", "status": "3" },
            { "time": "15", "name": "Timothy", "event": "", "modifiedEvent": "", "department": "Interpreters", "empId": "BIH-0067E", "status": "2" },
            { "time": "12", "name": "Milton", "event": "", "modifiedEvent": "", "department": "Porters Unit", "empId": "BIH-0068E", "status": "4" },
            { "time": "10", "name": "Buford", "event": "", "modifiedEvent": "", "department": "Porters Unit", "empId": "BIH-0069E", "status": "1" },
            { "time": "10", "name": "Elliott", "event": "", "modifiedEvent": "", "department": "Interpreters", "empId": "BIH-0070E", "status": "2" },
            { "time": "12", "name": "Luther", "event": "", "modifiedEvent": "", "department": "Porters Unit", "empId": "BIH-0071E", "status": "1" },
            { "time": "10", "name": "Larry", "event": "", "modifiedEvent": "", "department": "Porters Unit", "empId": "BIH-0072E", "status": "1" },
            { "time": "10", "name": "Mose", "event": "", "modifiedEvent": "", "department": "Interpreters", "empId": "BIH-0073E", "status": "3" },
            { "time": "12", "name": "Jewel", "event": "", "modifiedEvent": "", "department": "Interpreters", "empId": "BIH-0074E", "status": "2" },
            { "time": "10", "name": "Kennith", "event": "", "modifiedEvent": "", "department": "Porters Unit", "empId": "BIH-0075E", "status": "1" },
            { "time": "10", "name": "Amos", "event": "", "modifiedEvent": "", "department": "Interpreters", "empId": "BIH-0076E", "status": "3" }
        ];
        this.tableComponent.agPaginationAuto = this.agPaginationAuto;
        this.tableComponent.setColumnDef(columnDefs);
        this.tableComponent.agHeader = false;
        this.tableComponent.setData(data);
    };
    ReportsComponent.prototype.tabChangeFunction = function (tabDiv) {
        var elementArr = document.getElementsByClassName("content-div");
        for (var i = 0; i < elementArr.length; i++) {
            var contentDiv = elementArr[i];
            if (contentDiv.id == tabDiv.currentTarget.id + "Div") {
                document.getElementById(contentDiv.id).classList.remove("hide");
            }
            else {
                document.getElementById(contentDiv.id).classList.add("hide");
                ;
            }
        }
    };
    return ReportsComponent;
}());
__decorate([
    core_1.ViewChild(table_component_1.AgGridTableCustomComponent),
    __metadata("design:type", typeof (_a = typeof table_component_1.AgGridTableCustomComponent !== "undefined" && table_component_1.AgGridTableCustomComponent) === "function" && _a || Object)
], ReportsComponent.prototype, "tableComponent", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], ReportsComponent.prototype, "agPaginationAuto", void 0);
ReportsComponent = __decorate([
    core_1.Component({
        selector: 'reports-cmp',
        template: __webpack_require__(695)
    }),
    __metadata("design:paramtypes", [typeof (_b = typeof forms_1.FormBuilder !== "undefined" && forms_1.FormBuilder) === "function" && _b || Object])
], ReportsComponent);
exports.ReportsComponent = ReportsComponent;
var ViewActionRendererComponent = (function () {
    function ViewActionRendererComponent() {
    }
    ViewActionRendererComponent.prototype.agInit = function (params) {
        this.params = params;
        this.action = params.data.action;
    };
    return ViewActionRendererComponent;
}());
ViewActionRendererComponent = __decorate([
    core_1.Component({
        selector: 'full-width-cell',
        template: "<td class=\"text-right table-action\">\n               <a [href]=\"action?'#/'+ action.url : ''\"><i class=\"material-icons\">dvr</i><div class=\"ripple-container\"></div></a>\n               \n               </td>"
    })
], ViewActionRendererComponent);
exports.ViewActionRendererComponent = ViewActionRendererComponent;
var _a, _b;
//# sourceMappingURL=reports.component.js.map

/***/ }),

/***/ 261:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(1);
var accessControl_service_1 = __webpack_require__(514);
var ngx_treeview_1 = __webpack_require__(220);
var angular_tree_component_1 = __webpack_require__(93);
var material_1 = __webpack_require__(16);
var forms_1 = __webpack_require__(12);
var Observable_1 = __webpack_require__(0);
var confirmation_dialog_1 = __webpack_require__(41);
var common_1 = __webpack_require__(61);
var custom_validation_service_1 = __webpack_require__(17);
var AccessControlComponent = (function () {
    function AccessControlComponent(accessService, dialog, httpCustomService, elRef, renderer, customValidationService) {
        this.accessService = accessService;
        this.dialog = dialog;
        this.httpCustomService = httpCustomService;
        this.elRef = elRef;
        this.renderer = renderer;
        this.customValidationService = customValidationService;
        this.roleTreeClicked = false;
        this.roleNodes = [];
        this.savePermStatus = false;
        this.selectedRoleId = 0;
        // selectedRoleObject = null;
        this.enableButton = true;
        this.showAddRoleButton = false;
        this.showEditButton = false;
        this.showDeleteButton = false;
        this.checkedPermSize = 0;
        //role tree opotions
        this.options = {
            nodeClass: function (node) {
                if (node.data.icon) {
                    return 'tree-' + node.data.icon;
                }
                return 'tree-node-folder';
            }
        };
        this.config = {
            hasAllCheckBox: true,
            hasFilter: true,
            hasCollapseExpand: true,
            maxHeight: 500,
            decoupleChildFromParent: false,
            hasDivider: true
        };
    }
    //here get all the roles and Parent r
    AccessControlComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.accessService.getAllRolesForLoginUser().subscribe(function (roles) {
            _this.roleNodes = roles.relatedRoles; // for the tree
            _this.allParentRoles = roles.parentRoles; // for the drop down
        });
    };
    AccessControlComponent.prototype.treeclickEvent = function (event) {
        var _this = this;
        debugger;
        //console.log(this.allParentRoles);
        if (event.node.isRoot == undefined) {
            this.showAddRoleButton = true;
            this.showEditButton = true;
            this.showDeleteButton = true;
        }
        else if (event.node.position == 0) {
            this.showAddRoleButton = true;
            this.showEditButton = false;
            this.showDeleteButton = false;
        }
        else {
            this.showAddRoleButton = true;
            this.showEditButton = true;
            this.showDeleteButton = false;
        }
        this.roleTreeClicked = true;
        this.selectedRoleId = event.node.data.id;
        this.items = [];
        var parentId = 0;
        //clicked on the root
        if (event.node.realParent == null) {
            parentId = event.node.data.id;
        }
        else {
            parentId = this.tree.treeModel.getActiveNode().parent.data.id;
        }
        this.accessService.getPermissionForRole(event.node.data.id, parentId)
            .subscribe(function (items) {
            _this.checkedPermSize = items.treeSize;
            _this.treeItems = items.tree;
            _this.items = [];
            for (var _i = 0, _a = _this.treeItems; _i < _a.length; _i++) {
                var entry = _a[_i];
                var tree = new ngx_treeview_1.TreeviewItem({
                    text: entry.text, value: entry.value, children: entry.children,
                    disabled: entry.disabled
                });
                debugger;
                // this.items = [];
                _this.items.push(tree);
                debugger;
            }
        }, //Bind to view
        function (//Bind to view
            err) {
            // Log errors if any
            console.log(err);
        });
        // }
    };
    AccessControlComponent.prototype.selectedChange = function (event) {
        // if(this.checkedPermSize > 0){
        //     debugger;
        //    this.checkedPermSize -= 1;
        //    return;
        // }
        var _this = this;
        if (!this.roleTreeClicked) {
            var stauus = false;
            console.log(this.selectedRoleId);
            debugger;
            console.log(event);
            this.accessService.savePermissionsForRole(event, this.selectedRoleId).subscribe(function (outPut) {
                _this.savePermStatus = outPut;
            });
        }
        this.roleTreeClicked = false;
    };
    AccessControlComponent.prototype.addRole = function () {
        //  console.log(  this.allParentRoles);
        this.openRoleDialog("add", null);
    };
    AccessControlComponent.prototype.roleMoveNode = function (event) {
        var movingNode = event.node.id;
        var toParent = event.to.parent.id;
        this.accessService.moveChildRole(movingNode, toParent).subscribe(function (data) {
            console.log(data.success);
        });
    };
    AccessControlComponent.prototype.editRole = function () {
        var _this = this;
        //remove the editing elemet from the array
        var parentArrayCopy = this.allParentRoles.filter(function (item) { return item.id !== _this.tree.treeModel.getActiveNode().data.id; });
        this.openRoleDialog("edit", parentArrayCopy);
    };
    AccessControlComponent.prototype.deleteRole = function () {
        var _this = this;
        if (this.tree.treeModel.getActiveNode().hasChildren) {
            var dialogRef = this.dialog.open(confirmation_dialog_1.ConfirmationDialog);
            dialogRef.disableClose = true;
            dialogRef.componentInstance.title = "Unable to Delete";
            dialogRef.componentInstance.message = "Role Contains Children";
            dialogRef.componentInstance.isCancelButtonVisible = false;
        }
        else {
            var dialogRef = this.dialog.open(confirmation_dialog_1.ConfirmationDialog);
            dialogRef.disableClose = true;
            dialogRef.componentInstance.title = "Remove Role";
            dialogRef.componentInstance.message = "Are you sure you want to remove role";
            var parent_1 = this.tree.treeModel.getActiveNode().parent;
            dialogRef.afterClosed().subscribe(function (result) {
                if (result == true) {
                    _this.accessService.removeRole(_this.selectedRoleId, parent_1.data.id).subscribe(function (data) {
                        if (data.success) {
                            _this.roleNodes = data.roleTree;
                            if (parent_1.data.children.length == 1) {
                                parent_1.collapse();
                            }
                            _this.showAddRoleButton = false;
                            _this.showEditButton = false;
                            _this.showDeleteButton = false;
                        }
                        else {
                            var dialogRef_1 = _this.dialog.open(confirmation_dialog_1.ConfirmationDialog);
                            dialogRef_1.disableClose = true;
                            dialogRef_1.componentInstance.title = "Unable to delete";
                            dialogRef_1.componentInstance.message = "Error Occured";
                            dialogRef_1.componentInstance.isCancelButtonVisible = false;
                        }
                    });
                }
            });
        }
    };
    AccessControlComponent.prototype.openRoleDialog = function (action, roleDropDownList) {
        var _this = this;
        var dialogRef = this.dialog.open(RoleDialog);
        dialogRef.disableClose = true;
        dialogRef.componentInstance.parentRoles = this.allParentRoles;
        this.setRoleActionButtonAndHeader(dialogRef, action);
        if (action == "edit") {
            dialogRef.componentInstance.parentRoles = roleDropDownList;
            dialogRef.componentInstance.setDialogDetails(this.tree.treeModel.activeNodes[0].data);
            dialogRef.componentInstance.parentRoleId = this.tree.treeModel.getActiveNode().parent.data.id;
        }
        else {
            dialogRef.componentInstance.parentRoleId = this.tree.treeModel.getActiveNode().data.id;
        }
        dialogRef.afterClosed().subscribe(function (result) {
            var company = { id: 1 };
            result["company"] = company;
            if (result) {
                _this.accessService.addRole(result).subscribe(function (data) {
                    if (data.success) {
                        _this.roleNodes = data.roleTree;
                        _this.allParentRoles = data.parentRoles; // for the drop down
                    }
                });
            }
        });
    };
    AccessControlComponent.prototype.setRoleActionButtonAndHeader = function (dialogRef, action) {
        if (action == "add") {
            dialogRef.componentInstance.setTitle("Add Role");
            dialogRef.componentInstance.setActionButtonString("Add");
            dialogRef.componentInstance.setIsEdit(false);
        }
        else if (action == "edit") {
            dialogRef.componentInstance.setTitle("Edit Role");
            dialogRef.componentInstance.setActionButtonString("Edit");
            dialogRef.componentInstance.setIsEdit(true);
        }
        else {
            dialogRef.componentInstance.setTitle("Remove Role");
            dialogRef.componentInstance.setActionButtonString("Remove");
        }
    };
    AccessControlComponent.prototype.ngAfterViewInit = function () {
        this.renderer.setElementClass(this.elRef.nativeElement.querySelector('input'), 'form-control', false);
    };
    return AccessControlComponent;
}());
__decorate([
    core_1.ViewChild(angular_tree_component_1.TreeComponent),
    __metadata("design:type", typeof (_a = typeof angular_tree_component_1.TreeComponent !== "undefined" && angular_tree_component_1.TreeComponent) === "function" && _a || Object)
], AccessControlComponent.prototype, "tree", void 0);
AccessControlComponent = __decorate([
    core_1.Component({
        selector: 'app-basictree',
        template: __webpack_require__(697),
        //styleUrls: ['book.component.css'],
        styles: [],
        providers: [accessControl_service_1.AccessControlService]
    }),
    __metadata("design:paramtypes", [typeof (_b = typeof accessControl_service_1.AccessControlService !== "undefined" && accessControl_service_1.AccessControlService) === "function" && _b || Object, typeof (_c = typeof material_1.MdDialog !== "undefined" && material_1.MdDialog) === "function" && _c || Object, typeof (_d = typeof common_1.HttpCustomService !== "undefined" && common_1.HttpCustomService) === "function" && _d || Object, typeof (_e = typeof core_1.ElementRef !== "undefined" && core_1.ElementRef) === "function" && _e || Object, typeof (_f = typeof core_1.Renderer !== "undefined" && core_1.Renderer) === "function" && _f || Object, typeof (_g = typeof custom_validation_service_1.CustomValidationService !== "undefined" && custom_validation_service_1.CustomValidationService) === "function" && _g || Object])
], AccessControlComponent);
exports.AccessControlComponent = AccessControlComponent;
var RoleDialog = (function () {
    function RoleDialog(dialogRef, accessControlService, _fb) {
        this.dialogRef = dialogRef;
        this._fb = _fb;
        this.events = []; // use later to display form changes
        this.actionButton = "Add";
        this.isEdit = false;
        this.parentRoles = []; // keep parent roles
        this.parentRoleId = 0;
        this.oldParent = 0;
        this.companyId = 1;
        this.accessControlService = accessControlService;
    }
    RoleDialog.prototype.ngOnInit = function () {
        this.roleForm = this._fb.group({
            id: [this.selectedId],
            roleName: [this.roleName, [forms_1.Validators.required], this.roleValidator.bind(this)],
            parentRole: [this.parentRoles],
            oldParent: [this.parentRoleId],
            companyId: [this.companyId]
        });
    };
    RoleDialog.prototype.setActionButtonString = function (actionButtionValue) {
        this.actionButton = actionButtionValue;
    };
    RoleDialog.prototype.setTitle = function (title) {
        this.title = title;
    };
    RoleDialog.prototype.setIsEdit = function (isEdit) {
        this.isEdit = isEdit;
    };
    RoleDialog.prototype.setDialogDetails = function (role) {
        this.selectedId = role.id;
        this.roleName = role.name;
        this.parentRole = role.parentRole;
        this.oldParent = role.oldParent;
        this.companyId = role.company.id;
    };
    RoleDialog.prototype.roleValidator = function (control) {
        return this.roleValidator2(control.value).first();
    };
    RoleDialog.prototype.roleValidator2 = function (value) {
        var _this = this;
        return new Observable_1.Observable(function (observer) {
            _this.accessControlService.checkRoleExistence(value, _this.selectedId, _this.isEdit).subscribe(function (data) {
                if (data.success) {
                    observer.next({ roleAvailable: true });
                }
                else {
                    observer.next(null);
                }
            });
        });
    };
    return RoleDialog;
}());
RoleDialog = __decorate([
    core_1.Component({
        selector: 'role-cmp',
        template: __webpack_require__(696),
        providers: [accessControl_service_1.AccessControlService]
    }),
    __metadata("design:paramtypes", [typeof (_h = typeof material_1.MdDialogRef !== "undefined" && material_1.MdDialogRef) === "function" && _h || Object, typeof (_j = typeof accessControl_service_1.AccessControlService !== "undefined" && accessControl_service_1.AccessControlService) === "function" && _j || Object, typeof (_k = typeof forms_1.FormBuilder !== "undefined" && forms_1.FormBuilder) === "function" && _k || Object])
], RoleDialog);
exports.RoleDialog = RoleDialog;
var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
//# sourceMappingURL=accessControl.component.js.map

/***/ }),

/***/ 262:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(1);
var http_1 = __webpack_require__(35);
var authentication_service_1 = __webpack_require__(40);
var CategoryGradeService = (function () {
    function CategoryGradeService(http, authenticationService) {
        this.http = http;
        this.authenticationService = authenticationService;
        this.headers = new http_1.Headers({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + this.authenticationService.getToken()
        });
    }
    CategoryGradeService.prototype.getCategoryGradeArray = function (companyId) {
        var token;
        return this.http.get('category/category?companyId=' + companyId, { headers: this.headers }).map(function (response) {
            // login successful if there's a jwt token in the response
            return response.json().categoryTree;
        });
    };
    CategoryGradeService.prototype.addCategory = function (categoryForm) {
        return this.http.post('category/category/add', JSON.stringify(categoryForm), { headers: this.headers }).map(function (response) {
            // login successful if there's a jwt token in the response
            return response.json();
        });
    };
    CategoryGradeService.prototype.checkCategoryExistence = function (categoryName, selectedId, isEdit, companyId) {
        var params = new http_1.URLSearchParams();
        params.set('categoryName', categoryName);
        if (selectedId == null) {
            selectedId = 0;
        }
        var options = new http_1.RequestOptions({ headers: this.headers, params: params });
        return this.http.get('category/category/checkExist?categoryName=' + categoryName + '&categoryId=' + selectedId + '&isEdit=' + isEdit + '&companyId=' + companyId, options).map(function (response) {
            // login successful if there's a jwt token in the response
            return response.json();
        });
    };
    /**
     * service to check category and grade abbreviation existence
     *
     */
    CategoryGradeService.prototype.checkAbbreviationExistence = function (abbreviation, isCategory, selectedId, isEdit) {
        if (selectedId == null) {
            selectedId = 0;
        }
        return this.http.get('category/abbreviation/checkExist?abbreviation=' + abbreviation + '&isCategory=' + isCategory + '&id=' + selectedId + '&isEdit=' + isEdit, { headers: this.headers }).map(function (response) {
            // login successful if there's a jwt token in the response
            return response.json();
        });
    };
    CategoryGradeService.prototype.getCategoryFromId = function (categoryId) {
        return this.http.get('category/getCategory?categoryId=' + categoryId, { headers: this.headers }).map(function (response) {
            // login successful if there's a jwt token in the response
            return response.json();
        });
    };
    CategoryGradeService.prototype.removeCategory = function (categoryId) {
        return this.http.get('category/remove/category?categoryId=' + categoryId, { headers: this.headers }).map(function (response) {
            // login successful if there's a jwt token in the response
            return response.json();
        });
    };
    CategoryGradeService.prototype.getCategories = function () {
        return this.http.get('category/getAllCategories', { headers: this.headers }).map(function (response) {
            // login successful if there's a jwt token in the response
            return response.json();
        });
    };
    CategoryGradeService.prototype.addGrade = function (gradeForm) {
        return this.http.post('category/grade/add', JSON.stringify(gradeForm), { headers: this.headers }).map(function (response) {
            // login successful if there's a jwt token in the response
            return response.json();
        });
    };
    CategoryGradeService.prototype.checkGradeExistence = function (gradeName, selectedId, isEdit) {
        if (selectedId == null) {
            selectedId = 0;
        }
        return this.http.get('category/grade/checkExist?gradeName=' + gradeName + '&gradeId=' + selectedId + '&isEdit=' + isEdit, { headers: this.headers }).map(function (response) {
            // login successful if there's a jwt token in the response
            return response.json();
        });
    };
    CategoryGradeService.prototype.getGradeFromId = function (gradeId) {
        return this.http.get('category/getGrade?gradeId=' + gradeId, { headers: this.headers }).map(function (response) {
            // login successful if there's a jwt token in the response
            return response.json();
        });
    };
    CategoryGradeService.prototype.removeGrade = function (gradeId) {
        return this.http.get('category/remove/grade?gradeId=' + gradeId, { headers: this.headers }).map(function (response) {
            // login successful if there's a jwt token in the response
            return response.json();
        });
    };
    CategoryGradeService.prototype.orderCategoryAndGrades = function (gradeIds, categoryIds) {
        return this.http.get('category/order?gradeIds=' + gradeIds + '&categoryIds=' + categoryIds, { headers: this.headers }).map(function (response) {
            // login successful if there's a jwt token in the response
            return response.json();
        });
    };
    return CategoryGradeService;
}());
CategoryGradeService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [typeof (_a = typeof http_1.Http !== "undefined" && http_1.Http) === "function" && _a || Object, typeof (_b = typeof authentication_service_1.AuthenticationService !== "undefined" && authentication_service_1.AuthenticationService) === "function" && _b || Object])
], CategoryGradeService);
exports.CategoryGradeService = CategoryGradeService;
var _a, _b;
//# sourceMappingURL=category-grade.service.js.map

/***/ }),

/***/ 263:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(1);
var custom_validation_service_1 = __webpack_require__(17);
var EmployeeStatusActionRendererComponent = (function () {
    function EmployeeStatusActionRendererComponent(customValidation) {
        this.customValidation = customValidation;
        this.employeeStatusTypes = [];
    }
    EmployeeStatusActionRendererComponent.prototype.agInit = function (params) {
        this.params = params;
        this.employeeStatus = params.data;
        this.employeeStatusComponent = params.context.parentComponent;
    };
    EmployeeStatusActionRendererComponent.prototype.editEmployeeStatus = function () {
        this.employeeStatusComponent.editEmployeeStatus(this.employeeStatus);
    };
    EmployeeStatusActionRendererComponent.prototype.removeEmployeeStatus = function () {
        this.employeeStatusComponent.removeEmployeeStatus(this.employeeStatus.id);
    };
    return EmployeeStatusActionRendererComponent;
}());
EmployeeStatusActionRendererComponent = __decorate([
    core_1.Component({
        selector: 'full-width-cell',
        template: "<td class=\"text-right table-action\" *ngIf=\"customValidation.isPermissionAvailable('EMPLOYEE_STATUS_EDIT')\">\n               <button type=\"button\" rel=\"tooltip\" title=\"\" class=\"btn btn-primary btn-simple btn-xs\"\n\t\t\t\tdata-original-title=\"Edit Level\" (click)=\"editEmployeeStatus()\"><i class=\"material-icons\">dvr</i><div class=\"ripple-container\"></div></button>\n               <button type=\"button\" rel=\"tooltip\" title=\"\" class=\"btn btn-primary btn-simple btn-xs\"\n\t\t\t\tdata-original-title=\"Remove Level\" (click)=\"removeEmployeeStatus()\"><i class=\"material-icons\">delete</i></button>\n               </td>"
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof custom_validation_service_1.CustomValidationService !== "undefined" && custom_validation_service_1.CustomValidationService) === "function" && _a || Object])
], EmployeeStatusActionRendererComponent);
exports.EmployeeStatusActionRendererComponent = EmployeeStatusActionRendererComponent;
var _a;
//# sourceMappingURL=employee-status-action.component.js.map

/***/ }),

/***/ 264:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(1);
var material_1 = __webpack_require__(16);
var forms_1 = __webpack_require__(12);
var common_1 = __webpack_require__(61);
var EmployeeStatusDialog = (function () {
    function EmployeeStatusDialog(dialogRef, customValidationService, _fb) {
        this.dialogRef = dialogRef;
        this.customValidationService = customValidationService;
        this._fb = _fb;
        this.events = []; // use later to display form changes
        this.isEdit = false;
        this.employeeStatusTypes = [];
        this.employeeStatusTypeId = 0;
    }
    EmployeeStatusDialog.prototype.ngOnInit = function () {
        this.empStatusForm = this._fb.group({
            id: [this.entityId],
            name: [this.entityName, [forms_1.Validators.required], this.generateDataForCustomValidation.bind(this, true, "employeeStatusConfig/checkExist", this.entityName, this.isEdit)],
            abbreviation: [this.entityAbbreviation, [], this.generateDataForCustomValidation.bind(this, false, "employeeStatusConfig/checkExist", this.entityAbbreviation, this.isEdit)],
            employeeStatusType: [this.employeeStatusTypeId],
        });
    };
    EmployeeStatusDialog.prototype.setActionButton = function (actionButtionValue) {
        this.actionButton = actionButtionValue;
    };
    EmployeeStatusDialog.prototype.setTitle = function (title) {
        this.title = title;
    };
    EmployeeStatusDialog.prototype.setIsEdit = function (isEdit) {
        this.isEdit = isEdit;
    };
    EmployeeStatusDialog.prototype.setDialogDetails = function (entity) {
        this.entityId = entity.id;
        this.entityName = entity.name;
        this.entityAbbreviation = entity.abbreviation;
    };
    EmployeeStatusDialog.prototype.setEmployeeStatusTypes = function (employeeStatusTypesParam, selectedValue) {
        this.employeeStatusTypeId = selectedValue;
        this.employeeStatusTypes = employeeStatusTypesParam;
    };
    EmployeeStatusDialog.prototype.generateDataForCustomValidation = function (isName, requestPath, prvValue, isEdit, control) {
        var value = control.value;
        var data = {};
        data["value"] = value;
        data["isName"] = isName;
        return this.customValidationService.isExistValidator(data, requestPath, prvValue, isEdit, control);
    };
    return EmployeeStatusDialog;
}());
EmployeeStatusDialog = __decorate([
    core_1.Component({
        selector: 'employee-status-dialog-cmp',
        template: __webpack_require__(702)
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof material_1.MdDialogRef !== "undefined" && material_1.MdDialogRef) === "function" && _a || Object, typeof (_b = typeof common_1.CustomValidationService !== "undefined" && common_1.CustomValidationService) === "function" && _b || Object, typeof (_c = typeof forms_1.FormBuilder !== "undefined" && forms_1.FormBuilder) === "function" && _c || Object])
], EmployeeStatusDialog);
exports.EmployeeStatusDialog = EmployeeStatusDialog;
var _a, _b, _c;
//# sourceMappingURL=employee-status.dialog.js.map

/***/ }),

/***/ 265:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(1);
var unit_level_dialog_1 = __webpack_require__(168);
var material_1 = __webpack_require__(16);
var unit_hierarchy_service_1 = __webpack_require__(167);
var confirmation_dialog_1 = __webpack_require__(41);
var common_http_service_1 = __webpack_require__(22);
var http_request_metadata_1 = __webpack_require__(27);
var hierarchy_type_component_1 = __webpack_require__(117);
var UnitHierarchyAction = (function () {
    function UnitHierarchyAction(dialog, unitHierarchyService, httpCustomService) {
        this.dialog = dialog;
        this.unitHierarchyService = unitHierarchyService;
        this.httpCustomService = httpCustomService;
    }
    UnitHierarchyAction.prototype.agInit = function (params) {
        this.params = params;
        this.unitLevel = params.data;
        this.levelType = params.context.levelType;
        if (this.levelType == hierarchy_type_component_1.LevelType.UnitLevel) {
            this.httpAddUrl = "unit/level/add";
            this.httpDeleteUrl = "unit/level/delete";
            this.httpCheckValidity = "unit/checkForDeleteValidity";
        }
        else {
            this.httpAddUrl = "location/level/add";
            this.httpDeleteUrl = "location/level/delete";
            this.httpCheckValidity = "location/checkForDeleteValidity";
        }
    };
    UnitHierarchyAction.prototype.editHierarchy = function () {
        var _this = this;
        var dialogRef = this.dialog.open(unit_level_dialog_1.UnitLevelDialog);
        dialogRef.componentInstance.setTitle("Edit Level");
        dialogRef.componentInstance.setActionButton("Edit Level");
        dialogRef.componentInstance.setFormValues(this.unitLevel);
        dialogRef.componentInstance.setIsEdit(true);
        dialogRef.componentInstance.setLevelType(this.levelType);
        dialogRef.afterClosed().subscribe(function (result) {
            if (result) {
                _this.httpCustomService.commonHttpRequest("addLevel", _this.httpAddUrl, result, _this.addLevelSuccess(_this), null, http_request_metadata_1.HttpType.POST);
            }
        });
    };
    UnitHierarchyAction.prototype.addLevelSuccess = function (data) {
        if (data.success) {
            this.params.api.setRowData(data.hierarchy);
        }
    };
    UnitHierarchyAction.prototype.removeHierarchy = function () {
        this.httpCustomService.commonHttpRequest("checkForDeleteValidity", this.httpCheckValidity, this.unitLevel, this.checkForDeleteValidtiySuccess.bind(this), null, http_request_metadata_1.HttpType.POST);
    };
    UnitHierarchyAction.prototype.checkForDeleteValidtiySuccess = function (data) {
        var _this = this;
        var dialogRef = this.dialog.open(confirmation_dialog_1.ConfirmationDialog);
        if (data.success) {
            dialogRef.componentInstance.title = "Remove Unit Level";
            dialogRef.componentInstance.message = "Are you sure you want to remove " + this.unitLevel.name;
            //TODO first need to check whether its maps with any unit or not
            dialogRef.afterClosed().subscribe(function (result) {
                if (result == true) {
                    var data1 = {
                        id: _this.unitLevel.id
                    };
                    _this.httpCustomService.commonHttpRequestWithoutCallBacks(_this.httpDeleteUrl, data1).subscribe(function (data) {
                        if (data.success) {
                            _this.params.api.setRowData(data.hierarchy);
                        }
                    });
                    // this.httpCustomService.commonHttpRequest("deleteLevel",this.httpDeleteUrl, data1, this.deleteLevelSuccess(this));
                }
            });
        }
        else {
            if (data.isParentOrg) {
                if (this.levelType == hierarchy_type_component_1.LevelType.UnitLevel) {
                    dialogRef.componentInstance.title = "Remove Unit Level";
                    dialogRef.componentInstance.message = "You can not remove the oranazation level";
                    dialogRef.componentInstance.isCancelButtonVisible = false;
                }
                else {
                    dialogRef.componentInstance.title = "Remove Location Level";
                    dialogRef.componentInstance.message = "You can not remove the oranazation level";
                    dialogRef.componentInstance.isCancelButtonVisible = false;
                }
            }
            else {
                if (this.levelType == hierarchy_type_component_1.LevelType.UnitLevel) {
                    dialogRef.componentInstance.title = "Remove Unit Level";
                    dialogRef.componentInstance.message = "You can not remove a Unit Level which is mapped to a unit";
                    dialogRef.componentInstance.isCancelButtonVisible = false;
                }
                else {
                    dialogRef.componentInstance.title = "Remove Location Level";
                    dialogRef.componentInstance.message = "You can not remove a Location Level which is mapped to a location";
                    dialogRef.componentInstance.isCancelButtonVisible = false;
                }
            }
        }
    };
    UnitHierarchyAction.prototype.deleteLevelSuccess = function (data) {
        if (data.success) {
            this.params.api.setRowData(data.hierarchy);
        }
    };
    return UnitHierarchyAction;
}());
UnitHierarchyAction = __decorate([
    core_1.Component({
        selector: 'full-width-cell',
        template: "<td class=\"text-right table-action\">\n               <button type=\"button\" rel=\"tooltip\" title=\"\" class=\"btn btn-primary btn-simple btn-xs\"\n\t\t\t\tdata-original-title=\"Edit Level\" (click)=\"editHierarchy()\"><i class=\"material-icons\">dvr</i><div class=\"ripple-container\"></div></button>\n               <button type=\"button\" rel=\"tooltip\" title=\"\" class=\"btn btn-primary btn-simple btn-xs\"\n\t\t\t\tdata-original-title=\"Remove Level\" (click)=\"removeHierarchy()\"><i class=\"material-icons\">delete</i></button>\n               </td>",
        providers: [unit_hierarchy_service_1.UnitHierarchyService, common_http_service_1.HttpCustomService]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof material_1.MdDialog !== "undefined" && material_1.MdDialog) === "function" && _a || Object, typeof (_b = typeof unit_hierarchy_service_1.UnitHierarchyService !== "undefined" && unit_hierarchy_service_1.UnitHierarchyService) === "function" && _b || Object, typeof (_c = typeof common_http_service_1.HttpCustomService !== "undefined" && common_http_service_1.HttpCustomService) === "function" && _c || Object])
], UnitHierarchyAction);
exports.UnitHierarchyAction = UnitHierarchyAction;
var _a, _b, _c;
//# sourceMappingURL=unit-hierarchy-action.component.js.map

/***/ }),

/***/ 266:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(1);
var table_component_1 = __webpack_require__(31);
var unit_hierarchy_service_1 = __webpack_require__(167);
var unit_hierarchy_action_component_1 = __webpack_require__(265);
var material_1 = __webpack_require__(16);
var unit_level_dialog_1 = __webpack_require__(168);
var common_http_service_1 = __webpack_require__(22);
var hierarchy_type_component_1 = __webpack_require__(117);
var http_request_metadata_1 = __webpack_require__(27);
var UnitHierarchy = (function () {
    function UnitHierarchy(unitHierarchyService, dialog, httpCustomService) {
        this.dialog = dialog;
        this.httpCustomService = httpCustomService;
        this.agPaginationAuto = false;
        this.tableData = [{ abbreviation: "tan tan", name: "wataya", id: 1 }];
        this.levelType = hierarchy_type_component_1.LevelType.UnitLevel;
        this.unitHierarchyService = unitHierarchyService;
    }
    UnitHierarchy.prototype.ngOnInit = function () {
        if (this.levelType == hierarchy_type_component_1.LevelType.UnitLevel) {
            this.levelTitle = "Unit Hierarchy";
            this.tableComponent.setGridOptionContext({ levelType: hierarchy_type_component_1.LevelType.UnitLevel });
        }
        else {
            this.levelTitle = "Location Hierarchy";
            this.tableComponent.setGridOptionContext({ levelType: hierarchy_type_component_1.LevelType.LocationLevel });
        }
        var columnDefs = [
            {
                headerName: "Name",
                field: "name",
                width: 120
            },
            {
                headerName: "Abbreviation",
                field: "abbreviation",
                width: 60
            },
            {
                headerName: "Action",
                cellRendererFramework: unit_hierarchy_action_component_1.UnitHierarchyAction,
                width: 60
            }
        ];
        var data = {};
        if (this.levelType == hierarchy_type_component_1.LevelType.UnitLevel) {
            this.httpCustomService.commonHttpRequest("levelData", "unit/unitHierarchy", data, this.getLevelDataSuccess.bind(this));
        }
        else {
            this.httpCustomService.commonHttpRequest("levelData", "location/locationHierarchy", data, this.getLevelDataSuccess.bind(this));
        }
        this.tableComponent.agPaginationAuto = this.agPaginationAuto;
        this.tableComponent.setColumnDef(columnDefs);
        this.tableComponent.setData(this.tableData);
    };
    UnitHierarchy.prototype.getLevelDataSuccess = function (data) {
        if (data.success) {
            this.tableComponent.updateData(data.hierarchy);
        }
    };
    UnitHierarchy.prototype.addNewLevel = function () {
        var _this = this;
        var dialogRef = this.dialog.open(unit_level_dialog_1.UnitLevelDialog);
        dialogRef.componentInstance.setTitle("Add Level");
        dialogRef.componentInstance.setActionButton("Add Level");
        dialogRef.componentInstance.setLevelType(this.levelType);
        var httpUrl = "";
        if (this.levelType == hierarchy_type_component_1.LevelType.UnitLevel) {
            httpUrl = "unit/level/add";
        }
        else {
            httpUrl = "location/level/add";
        }
        dialogRef.afterClosed().subscribe(function (result) {
            var cmpnyObj = { id: result.companyId };
            result["company"] = cmpnyObj;
            if (result) {
                _this.httpCustomService.commonHttpRequest("addLevel", httpUrl, result, _this.addLevelSuccess.bind(_this), null, http_request_metadata_1.HttpType.POST);
            }
        });
    };
    UnitHierarchy.prototype.addLevelSuccess = function (data) {
        if (data.success) {
            this.tableComponent.updateData(data.hierarchy);
        }
    };
    UnitHierarchy.prototype.getTableComponent = function () {
        return this.tableComponent;
    };
    return UnitHierarchy;
}());
__decorate([
    core_1.ViewChild(table_component_1.AgGridTableCustomComponent),
    __metadata("design:type", typeof (_a = typeof table_component_1.AgGridTableCustomComponent !== "undefined" && table_component_1.AgGridTableCustomComponent) === "function" && _a || Object)
], UnitHierarchy.prototype, "tableComponent", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], UnitHierarchy.prototype, "levelType", void 0);
UnitHierarchy = __decorate([
    core_1.Component({
        selector: 'unitHierarchy-cmp',
        template: __webpack_require__(705),
        providers: [unit_hierarchy_service_1.UnitHierarchyService, common_http_service_1.HttpCustomService]
    }),
    __metadata("design:paramtypes", [typeof (_b = typeof unit_hierarchy_service_1.UnitHierarchyService !== "undefined" && unit_hierarchy_service_1.UnitHierarchyService) === "function" && _b || Object, typeof (_c = typeof material_1.MdDialog !== "undefined" && material_1.MdDialog) === "function" && _c || Object, typeof (_d = typeof common_http_service_1.HttpCustomService !== "undefined" && common_http_service_1.HttpCustomService) === "function" && _d || Object])
], UnitHierarchy);
exports.UnitHierarchy = UnitHierarchy;
var _a, _b, _c, _d;
//# sourceMappingURL=unit-hierarchy.component.js.map

/***/ }),

/***/ 267:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(1);
var material_1 = __webpack_require__(16);
var common_1 = __webpack_require__(61);
var job_status_dialog_1 = __webpack_require__(169);
var confirmation_dialog_1 = __webpack_require__(41);
var http_request_metadata_1 = __webpack_require__(27);
var custom_validation_service_1 = __webpack_require__(17);
var JobStatusAction = (function () {
    function JobStatusAction(dialog, httpCustomService, customValidation) {
        this.dialog = dialog;
        this.httpCustomService = httpCustomService;
        this.customValidation = customValidation;
    }
    JobStatusAction.prototype.agInit = function (params) {
        this.params = params;
        this.jobStatus = params.data;
    };
    JobStatusAction.prototype.editJobStatus = function () {
        var _this = this;
        var dialogRef = this.dialog.open(job_status_dialog_1.JobStatusDialog);
        dialogRef.componentInstance.setTitle("Edit Job Status");
        dialogRef.componentInstance.setActionButton("Edit Job Status");
        dialogRef.componentInstance.setFormValues(this.jobStatus);
        dialogRef.componentInstance.setIsEdit(true);
        dialogRef.afterClosed().subscribe(function (result) {
            if (result) {
                var URL = 'jobStatus/addJobState';
                _this.httpCustomService.commonHttpRequest("jobStatusEdit", URL, result, _this.deleteJobStatusSuccess.bind(_this), null, http_request_metadata_1.HttpType.POST);
            }
        });
    };
    JobStatusAction.prototype.removeJobStatus = function () {
        var _this = this;
        var dialogRef = this.dialog.open(confirmation_dialog_1.ConfirmationDialog);
        dialogRef.disableClose = true;
        dialogRef.componentInstance.title = "Remove Job Status";
        dialogRef.componentInstance.message = "Are you sure you want to remove Job Status?";
        dialogRef.afterClosed().subscribe(function (result) {
            if (result == true) {
                var URL = 'jobStatus/deleteJobStatus?jobStatusId=';
                URL += _this.jobStatus.id;
                _this.httpCustomService.commonHttpRequest("jobStatusDelete", URL, null, _this.deleteJobStatusSuccess.bind(_this), null, http_request_metadata_1.HttpType.GET);
            }
        });
    };
    JobStatusAction.prototype.deleteJobStatusSuccess = function (data) {
        this.params.api.setRowData(data);
    };
    return JobStatusAction;
}());
JobStatusAction = __decorate([
    core_1.Component({
        selector: 'full-width-cell',
        template: "<td class=\"text-right table-action\" *ngIf=\"customValidation.isPermissionAvailable('JOB_STATUS_EDIT')\">\n               <button type=\"button\" rel=\"tooltip\" title=\"\" class=\"btn btn-primary btn-simple btn-xs\"\n\t\t\t\tdata-original-title=\"Edit Level\" (click)=\"editJobStatus()\"><i class=\"material-icons\">dvr</i><div class=\"ripple-container\"></div></button>\n               <button type=\"button\" rel=\"tooltip\" title=\"\" class=\"btn btn-primary btn-simple btn-xs\"\n\t\t\t\tdata-original-title=\"Remove Level\" (click)=\"removeJobStatus()\"><i class=\"material-icons\">delete</i></button>\n               </td>",
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof material_1.MdDialog !== "undefined" && material_1.MdDialog) === "function" && _a || Object, typeof (_b = typeof common_1.HttpCustomService !== "undefined" && common_1.HttpCustomService) === "function" && _b || Object, typeof (_c = typeof custom_validation_service_1.CustomValidationService !== "undefined" && custom_validation_service_1.CustomValidationService) === "function" && _c || Object])
], JobStatusAction);
exports.JobStatusAction = JobStatusAction;
var _a, _b, _c;
//# sourceMappingURL=job-status-action.component.js.map

/***/ }),

/***/ 268:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(1);
var table_component_1 = __webpack_require__(31);
var job_status_action_component_1 = __webpack_require__(267);
var job_status_dialog_1 = __webpack_require__(169);
var material_1 = __webpack_require__(16);
var common_1 = __webpack_require__(61);
var http_request_metadata_1 = __webpack_require__(27);
var custom_validation_service_1 = __webpack_require__(17);
var JobStatusConfig = (function () {
    function JobStatusConfig(dialog, httpCustomService, customValidation) {
        this.dialog = dialog;
        this.httpCustomService = httpCustomService;
        this.customValidation = customValidation;
        this.agPaginationAuto = false;
        this.tableData = [{
                abbreviation: "TEST", jobStatusName: "TEST", id: 1,
                jobStatusType: job_status_dialog_1.JOB_STATUS_TYPES[job_status_dialog_1.JOB_STATUS_TYPES.ONE]
            }];
    }
    JobStatusConfig.prototype.ngOnInit = function () {
        var columnDefs = [
            {
                headerName: "Name",
                field: "jobStatusName",
                width: 120
            },
            {
                headerName: "Abbreviation",
                field: "abbreviation",
                width: 60
            },
            {
                headerName: "Type",
                field: "jobStatusType",
                width: 60
            },
            {
                headerName: "Action",
                cellRendererFramework: job_status_action_component_1.JobStatusAction,
                width: 60
            }
        ];
        var data = {};
        this.httpCustomService.commonHttpRequest("jobStatusData", "jobStatus/getAllJobStates", data, this.getAllJobStatusSuccess.bind(this));
        this.tableComponent.agPaginationAuto = this.agPaginationAuto;
        this.tableComponent.setColumnDef(columnDefs);
        this.tableComponent.setData(this.tableData);
    };
    JobStatusConfig.prototype.getAllJobStatusSuccess = function (data) {
        // debugger;
        this.tableComponent.updateData(data);
        //  console.log(data);
    };
    JobStatusConfig.prototype.addNewJobStatus = function () {
        var _this = this;
        var dialogRef = this.dialog.open(job_status_dialog_1.JobStatusDialog);
        dialogRef.componentInstance.setTitle("Add Job Status");
        dialogRef.componentInstance.setActionButton("Add Job Status");
        dialogRef.afterClosed().subscribe(function (result) {
            if (result) {
                _this.httpCustomService.commonHttpRequest("addJobState", "jobStatus/addJobState", result, _this.addJobStatusSuccess.bind(_this), null, http_request_metadata_1.HttpType.POST);
            }
        });
    };
    JobStatusConfig.prototype.addJobStatusSuccess = function (data) {
        this.tableComponent.updateData(data);
    };
    return JobStatusConfig;
}());
__decorate([
    core_1.ViewChild(table_component_1.AgGridTableCustomComponent),
    __metadata("design:type", typeof (_a = typeof table_component_1.AgGridTableCustomComponent !== "undefined" && table_component_1.AgGridTableCustomComponent) === "function" && _a || Object)
], JobStatusConfig.prototype, "tableComponent", void 0);
JobStatusConfig = __decorate([
    core_1.Component({
        selector: 'job-status',
        template: __webpack_require__(707),
        //styleUrls: ['book.component.css'],
        styles: [],
    }),
    __metadata("design:paramtypes", [typeof (_b = typeof material_1.MdDialog !== "undefined" && material_1.MdDialog) === "function" && _b || Object, typeof (_c = typeof common_1.HttpCustomService !== "undefined" && common_1.HttpCustomService) === "function" && _c || Object, typeof (_d = typeof custom_validation_service_1.CustomValidationService !== "undefined" && custom_validation_service_1.CustomValidationService) === "function" && _d || Object])
], JobStatusConfig);
exports.JobStatusConfig = JobStatusConfig;
var _a, _b, _c, _d;
//# sourceMappingURL=job-status-config.comoponent.js.map

/***/ }),

/***/ 269:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(1);
var material_1 = __webpack_require__(16);
var forms_1 = __webpack_require__(12);
var common_1 = __webpack_require__(61);
var SkillDialog = (function () {
    function SkillDialog(dialogRef, customValidationService, _fb) {
        this.dialogRef = dialogRef;
        this.customValidationService = customValidationService;
        this._fb = _fb;
        this.events = []; // use later to display form changes
        this.isSkillGroup = true;
        this.isEdit = false;
        this.skillGroups = [];
        this.skillGroupId = 0;
        this.companyId = 1;
    }
    SkillDialog.prototype.ngOnInit = function () {
        this.skillForm = this._fb.group({
            id: [this.entityId],
            name: [this.entityName, [forms_1.Validators.required], this.generateDataForCustomValidation.bind(this, true, "skill/checkExist", this.entityName, this.isEdit)],
            abbreviation: [this.entityAbbreviation, [], this.generateDataForCustomValidation.bind(this, false, "skill/checkExist", this.entityAbbreviation, this.isEdit)],
            skillGroup: [this.skillGroupId],
            companyId: [this.companyId]
        });
    };
    SkillDialog.prototype.setActionButtonString = function (actionButtionValue) {
        this.actionButton = actionButtionValue;
    };
    SkillDialog.prototype.setTitle = function (title) {
        this.title = title;
    };
    SkillDialog.prototype.setIsEdit = function (isEdit) {
        this.isEdit = isEdit;
    };
    SkillDialog.prototype.setDialogDetails = function (entity) {
        this.entityId = entity.id;
        this.entityName = entity.name;
        this.entityAbbreviation = entity.abbreviation;
    };
    SkillDialog.prototype.setSkillGroupDialogDetails = function (isSkillGroup, skillGroups, skillGroupId) {
        this.isSkillGroup = isSkillGroup;
        this.type = "Skill Group";
        if (!isSkillGroup) {
            this.type = "Skill";
            this.skillGroups = skillGroups;
            this.skillGroupId = parseInt(skillGroupId.replace('sg_', ''));
        }
    };
    SkillDialog.prototype.generateDataForCustomValidation = function (isName, requestPath, prvValue, isEdit, control) {
        var value = control.value;
        var data = {};
        data["value"] = value;
        data["isName"] = isName;
        data["isSkillGroup"] = this.isSkillGroup;
        return this.customValidationService.isExistValidator(data, requestPath, prvValue, isEdit, control);
    };
    return SkillDialog;
}());
SkillDialog = __decorate([
    core_1.Component({
        selector: 'skill-dialog-cmp',
        template: __webpack_require__(711)
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof material_1.MdDialogRef !== "undefined" && material_1.MdDialogRef) === "function" && _a || Object, typeof (_b = typeof common_1.CustomValidationService !== "undefined" && common_1.CustomValidationService) === "function" && _b || Object, typeof (_c = typeof forms_1.FormBuilder !== "undefined" && forms_1.FormBuilder) === "function" && _c || Object])
], SkillDialog);
exports.SkillDialog = SkillDialog;
var _a, _b, _c;
//# sourceMappingURL=skill-dialog.component.js.map

/***/ }),

/***/ 27:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(1);
var HttpType;
(function (HttpType) {
    HttpType[HttpType["GET"] = 0] = "GET";
    HttpType[HttpType["POST"] = 1] = "POST";
    HttpType[HttpType["PUT"] = 2] = "PUT";
})(HttpType = exports.HttpType || (exports.HttpType = {}));
var ReturnType = (function () {
    function ReturnType() {
        this.APPLICATION_JSON = "application/json";
    }
    return ReturnType;
}());
ReturnType = __decorate([
    core_1.Injectable()
], ReturnType);
exports.ReturnType = ReturnType;
//# sourceMappingURL=http-request.metadata.js.map

/***/ }),

/***/ 270:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var forms_1 = __webpack_require__(12);
var material_1 = __webpack_require__(16);
var core_1 = __webpack_require__(1);
var Rx_1 = __webpack_require__(84);
var common_http_service_1 = __webpack_require__(22);
var data_component_1 = __webpack_require__(172);
var UnitDialog = (function () {
    function UnitDialog(_fb, dialogRef, httpCustomService) {
        this._fb = _fb;
        this.dialogRef = dialogRef;
        this.httpCustomService = httpCustomService;
        this.events = []; // use later to display form changes
        this.id = "0";
        this.unitName = "";
        this.abbreviation = "";
        this.actionButton = "Add Level";
        this.isEdit = false;
        this.unitLevelId = 0;
        this.parentUnitId = "0";
        this.unit = {};
        this.treeType = data_component_1.TreeType.UnitTree;
    }
    UnitDialog.prototype.ngOnInit = function () {
        this.unitForm = this._fb.group({
            id: [this.id],
            name: [this.unitName, [forms_1.Validators.required], this.unitValidator.bind(this)],
            abbreviation: [this.abbreviation, [], this.abbreviationValidator.bind(this)],
            itemLevelId: [this.unitLevelId],
            parentItemId: [this.parentUnitId]
        });
    };
    UnitDialog.prototype.unitValidator = function (control) {
        var _this = this;
        return new Rx_1.Observable(function (observer) {
            if ((_this.isEdit && _this.unit.name == control.value) || control.value == "") {
                observer.next(null);
                observer.complete();
            }
            else {
                var data = {
                    value: control.value
                };
                _this.httpCustomService.commonHttpRequest("check" + control.value, _this.nameHttpUrl, data, _this.unitCheckExistSuccess.bind(_this, observer));
            }
        });
    };
    UnitDialog.prototype.unitCheckExistSuccess = function (observer, data) {
        if (data.success) {
            observer.next({ unitAvailable: true });
        }
        else {
            observer.next(null);
        }
        observer.complete();
    };
    UnitDialog.prototype.abbreviationValidator = function (control) {
        var _this = this;
        return new Rx_1.Observable(function (observer) {
            if ((_this.isEdit && _this.unit.abbreviation == control.value) || control.value == "") {
                observer.next(null);
                observer.complete();
            }
            else {
                var data = {
                    abbreviation: control.value
                };
                _this.httpCustomService.commonHttpRequest("check" + control.value, _this.abbreviationHttpUrl, data, _this.abbreviationExistSuccess.bind(_this, observer));
            }
        });
    };
    UnitDialog.prototype.abbreviationExistSuccess = function (observer, data) {
        if (data.success) {
            observer.next({ abbreviationAvailable: true });
        }
        else {
            observer.next(null);
        }
        observer.complete();
    };
    UnitDialog.prototype.setTitle = function (title) {
        this.title = title;
    };
    UnitDialog.prototype.setActionButton = function (buttonValue) {
        this.actionButton = buttonValue;
    };
    UnitDialog.prototype.setIsEdit = function (isEdit) {
        this.isEdit = isEdit;
    };
    UnitDialog.prototype.setFormValues = function (item) {
        this.id = item.id.toString();
        this.unitName = item.name;
        this.abbreviation = item.abbreviation;
        if (this.treeType == data_component_1.TreeType.UnitTree) {
            this.parentUnitId = item.parentUnit.id.toString();
            this.unitLevelId = item.unitLevel.id;
        }
        else {
            this.parentUnitId = item.parentLocation.id.toString();
            this.unitLevelId = item.locationLevel.id;
        }
        this.unit = item;
    };
    UnitDialog.prototype.setUnitLevelId = function (unitLevelId) {
        this.unitLevelId = unitLevelId;
    };
    UnitDialog.prototype.setParentUnitId = function (parentUnitId) {
        this.parentUnitId = parentUnitId;
    };
    UnitDialog.prototype.setTreeType = function (treeType) {
        this.treeType = treeType;
        if (this.treeType == data_component_1.TreeType.UnitTree) {
            this.abbreviationHttpUrl = "unit/checkAbbreviationExist";
            this.nameHttpUrl = "unit/checkUnitExist";
        }
        else {
            this.abbreviationHttpUrl = "location/checkAbbreviationExist";
            this.nameHttpUrl = "location/checkLocationExist";
        }
    };
    return UnitDialog;
}());
UnitDialog = __decorate([
    core_1.Component({
        selector: 'unit-dialog-cmp',
        template: __webpack_require__(714),
        providers: [common_http_service_1.HttpCustomService]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof forms_1.FormBuilder !== "undefined" && forms_1.FormBuilder) === "function" && _a || Object, typeof (_b = typeof material_1.MdDialogRef !== "undefined" && material_1.MdDialogRef) === "function" && _b || Object, typeof (_c = typeof common_http_service_1.HttpCustomService !== "undefined" && common_http_service_1.HttpCustomService) === "function" && _c || Object])
], UnitDialog);
exports.UnitDialog = UnitDialog;
var _a, _b, _c;
//# sourceMappingURL=unit-dialog.js.map

/***/ }),

/***/ 271:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(1);
//import { PaginationComponent } from '../pagination/pagination.component';
var GridHeaderComponent = (function () {
    function GridHeaderComponent() {
        this.selectOptions = [];
        this.searchRecord = '';
    }
    GridHeaderComponent.prototype.ngOnInit = function () {
    };
    GridHeaderComponent.prototype.setLengthArray = function () {
        var api = this.gridOptions.api;
        this.selectedValue = api.paginationGetPageSize();
        this.selectOptions = [
            { value: api.paginationGetPageSize(), viewValue: api.paginationGetPageSize() },
            { value: 20, viewValue: 20 },
            { value: 50, viewValue: 50 },
            { value: this.gridOptions.rowData.length, viewValue: 'All' }
        ];
    };
    GridHeaderComponent.prototype.filterValue = function (length) {
        var api = this.gridOptions.api;
        api.paginationSetPageSize(length);
        //this.paginationComponent.setPage(this.paginationComponent.pager.currentPage);
    };
    GridHeaderComponent.prototype.onSearchRecords = function () {
        this.gridOptions.api.setQuickFilter(this.searchRecord);
        //this.paginationComponent.setPage(this.paginationComponent.pager.currentPage);
    };
    return GridHeaderComponent;
}());
GridHeaderComponent = __decorate([
    core_1.Component({
        selector: 'ag-grid-header',
        template: __webpack_require__(716)
    }),
    __metadata("design:paramtypes", [])
], GridHeaderComponent);
exports.GridHeaderComponent = GridHeaderComponent;
//# sourceMappingURL=header.component.js.map

/***/ }),

/***/ 272:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(1);
var pagination_service_1 = __webpack_require__(528);
var PaginationComponent = (function () {
    function PaginationComponent(paginationService) {
        this.paginationService = paginationService;
        // pager object
        this.pager = {};
    }
    PaginationComponent.prototype.ngOnInit = function () {
    };
    PaginationComponent.prototype.setPage = function (page) {
        if (page < 1 || page > this.pager.totalPages) {
            return;
        }
        // get pager object from service
        this.pager = this.paginationService.getPager(this.gridOptions.rowData.length, page, this.gridOptions.api, this.gridOptions.api.paginationGetPageSize());
    };
    return PaginationComponent;
}());
PaginationComponent = __decorate([
    core_1.Component({
        selector: 'ag-grid-pagination',
        template: __webpack_require__(717),
        providers: [pagination_service_1.PaginationService]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof pagination_service_1.PaginationService !== "undefined" && pagination_service_1.PaginationService) === "function" && _a || Object])
], PaginationComponent);
exports.PaginationComponent = PaginationComponent;
var _a;
//# sourceMappingURL=pagination.component.js.map

/***/ }),

/***/ 273:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(1);
var animations_1 = __webpack_require__(250);
var material_1 = __webpack_require__(16);
var MaterialModule = (function () {
    function MaterialModule() {
    }
    return MaterialModule;
}());
MaterialModule = __decorate([
    core_1.NgModule({
        imports: [animations_1.BrowserAnimationsModule, material_1.MdButtonModule, material_1.MdCheckboxModule, material_1.MdInputModule, material_1.MdSelectModule, material_1.MdDialogModule, material_1.MdDatepickerModule, material_1.MdNativeDateModule],
        declarations: [],
        exports: [animations_1.BrowserAnimationsModule, material_1.MdButtonModule, material_1.MdCheckboxModule, material_1.MdInputModule, material_1.MdSelectModule, material_1.MdDialogModule, material_1.MdDatepickerModule, material_1.MdNativeDateModule]
    })
], MaterialModule);
exports.MaterialModule = MaterialModule;
//# sourceMappingURL=material.module.js.map

/***/ }),

/***/ 274:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(1);
var CheckBoxRendererComponent = (function () {
    function CheckBoxRendererComponent() {
    }
    CheckBoxRendererComponent.prototype.agInit = function (params) {
        this.params = params;
    };
    return CheckBoxRendererComponent;
}());
CheckBoxRendererComponent = __decorate([
    core_1.Component({
        selector: 'full-width-cell',
        template: "<div class=\"check-box-action\"><md-checkbox></md-checkbox></div>"
    })
], CheckBoxRendererComponent);
exports.CheckBoxRendererComponent = CheckBoxRendererComponent;
//# sourceMappingURL=checkbox-renderer.component.js.map

/***/ }),

/***/ 275:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(1);
var NotificationActionRendererComponent = (function () {
    function NotificationActionRendererComponent() {
    }
    NotificationActionRendererComponent.prototype.agInit = function (params) {
        this.params = params;
    };
    return NotificationActionRendererComponent;
}());
NotificationActionRendererComponent = __decorate([
    core_1.Component({
        selector: 'full-width-cell',
        template: "<td class=\"text-right table-action\">\n               <a href=\"#/employees\"><i class=\"material-icons\">forward</i></a>\n               <a href=\"#/employees\"><i class=\"material-icons\">reply</i></a>\n               <a href=\"#/employees\"><i class=\"material-icons\">close</i></a>\n               </td>"
    })
], NotificationActionRendererComponent);
exports.NotificationActionRendererComponent = NotificationActionRendererComponent;
//# sourceMappingURL=notification-action-renderer.component.js.map

/***/ }),

/***/ 276:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(1);
var UtilizationRendererComponent = (function () {
    function UtilizationRendererComponent() {
    }
    UtilizationRendererComponent.prototype.agInit = function (params) {
        //this.params = params.uti;
        this.utilization = params.value;
    };
    return UtilizationRendererComponent;
}());
UtilizationRendererComponent = __decorate([
    core_1.Component({
        selector: 'full-width-cell',
        template: "<td class=\"text-right table-action\">\n               <span class=\"utilization-span\">{{utilization}}%</span><a href=\"#/employees\"><i class=\"material-icons\">dvr</i></a>\n               </td>"
    })
], UtilizationRendererComponent);
exports.UtilizationRendererComponent = UtilizationRendererComponent;
//# sourceMappingURL=utilization-renderer.component.js.map

/***/ }),

/***/ 277:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(1);
var WorkTimeLineRendererComponent = (function () {
    function WorkTimeLineRendererComponent() {
    }
    WorkTimeLineRendererComponent.prototype.agInit = function (params) {
        this.params = params;
        this.values = params.value;
        this.width = 100 / this.values.length;
    };
    return WorkTimeLineRendererComponent;
}());
WorkTimeLineRendererComponent = __decorate([
    core_1.Component({
        selector: 'full-width-cell',
        template: "<div *ngFor=\"let value of values\" class=\"pull-left btn-{{value}}\"  [ngStyle]=\"{'width': '25%' , 'height': '100%'}\">&nbsp;</div>"
    })
], WorkTimeLineRendererComponent);
exports.WorkTimeLineRendererComponent = WorkTimeLineRendererComponent;
//# sourceMappingURL=work-time-line-renderer.component.js.map

/***/ }),

/***/ 278:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var common_1 = __webpack_require__(15);
var core_1 = __webpack_require__(1);
var translate_module_1 = __webpack_require__(174);
var material_module_1 = __webpack_require__(273);
var aggrid_custom_module_1 = __webpack_require__(527);
var SharedModule = (function () {
    function SharedModule() {
    }
    return SharedModule;
}());
SharedModule = __decorate([
    core_1.NgModule({
        imports: [
            common_1.CommonModule,
            translate_module_1.TranslateModule,
            material_module_1.MaterialModule,
            aggrid_custom_module_1.GridCustomModule
        ],
        declarations: [],
        exports: [translate_module_1.TranslateModule, material_module_1.MaterialModule, aggrid_custom_module_1.GridCustomModule]
    })
], SharedModule);
exports.SharedModule = SharedModule;
//# sourceMappingURL=shared.module.js.map

/***/ }),

/***/ 279:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(1);
// import translations
var lang_en_1 = __webpack_require__(535);
var lang_es_1 = __webpack_require__(536);
var lang_th_1 = __webpack_require__(537);
// translation token
exports.TRANSLATIONS = new core_1.OpaqueToken('translations');
// all translations
var dictionary = {
    'en': lang_en_1.LANG_EN_TRANS,
    'es': lang_es_1.LANG_ES_TRANS,
    'th': lang_th_1.LANG_TH_TRANS,
};
// providers
exports.TRANSLATION_PROVIDERS = [
    { provide: exports.TRANSLATIONS, useValue: dictionary },
];
//# sourceMappingURL=translations.js.map

/***/ }),

/***/ 280:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.ROUTES = [
    { path: 'dashboard', title: 'dashboard', icon: 'dashboard', class: '', children: [], permission: "DASHBOARD" },
    { path: 'joblist', title: 'jobList', icon: 'content_paste', class: '', children: [], permission: "JOB_LIST_VIEW" },
    { path: 'employee', title: 'employees', icon: 'person', class: '', children: [
            { path: 'employeeStatus', title: 'employeeStatus', icon: 'library_books', class: '', children: [], permission: "EMPLOYEE_STATUS_VIEW" },
            { path: 'employeeProfiles', title: 'employeeProfiles', icon: 'library_books', class: '', children: [], permission: "EMPLOYEE_PROFILE_VIEW" },
            { path: 'workTimeLine', title: 'workTimeLine', icon: 'library_books', class: '', children: [], permission: "EMPLOYEE_WORK_TIMELINE_VIEW" },
            { path: 'productivity', title: 'productivity', icon: 'library_books', class: '', children: [], permission: "EMPLOYEE_PRODUCTIVITY" }
        ], permission: "DASHBOARD" },
    { path: 'location', title: 'locations', icon: 'content_paste', class: '', children: [], permission: "NOTIFICATIONS" },
    { path: 'reports', title: 'reports', icon: 'library_books', class: '', children: [], permission: "REPORTS" },
    { path: 'notifications', title: 'notifications', icon: 'notifications_none', class: '', children: [], permission: "NOTIFICATIONS" },
    /*{ path: 'testPages', title: 'Units',  icon: 'person', class: '' , children : [
        { path: 'TEST', title: 'TEST',  icon: 'library_books', class: '' , children : [],permission:"" },
        { path: 'unit', title: 'Unit',  icon: 'library_books', class: '' , children : [] ,permission:""},
        { path: 'location', title: 'Location',  icon: 'location_on', class: '' , children : [],permission:"" }
     ],permission:"DASHBOARD"}*/
    { path: 'unit', title: 'Unit', icon: 'library_books', class: '', children: [], permission: "REPORTS" }
];
//# sourceMappingURL=sidebar-routes.config.js.map

/***/ }),

/***/ 31:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(1);
var pagination_component_1 = __webpack_require__(272);
var header_component_1 = __webpack_require__(271);
var AgGridTableCustomComponent = (function () {
    function AgGridTableCustomComponent() {
        this.agPaginationAuto = false;
        this.agHeader = true;
        this.agPagination = true;
        this.gridOptions = {};
    }
    AgGridTableCustomComponent.prototype.ngOnInit = function () {
        this.gridOptions.enableSorting = true;
        this.gridOptions.pagination = true;
        this.gridOptions.paginationPageSize = 10;
        this.gridOptions.paginationAutoPageSize = this.agPaginationAuto;
        this.gridOptions.suppressPaginationPanel = true;
        this.gridOptions.headerHeight = 40;
    };
    AgGridTableCustomComponent.prototype.ngAfterViewInit = function () {
        this.paginationSet(1);
        this.headerElementSet();
        this.refreshTableView();
    };
    AgGridTableCustomComponent.prototype.refreshTableView = function () {
        this.gridOptions.api.sizeColumnsToFit();
    };
    AgGridTableCustomComponent.prototype.headerElementSet = function () {
        if (this.agHeader) {
            this.gridHeaderComponent.gridOptions = this.gridOptions;
            this.gridHeaderComponent.setLengthArray();
        }
    };
    AgGridTableCustomComponent.prototype.paginationSet = function (pageNum) {
        if (this.agPagination) {
            this.paginationComponent.gridOptions = this.gridOptions;
            this.paginationComponent.setPage(pageNum);
        }
    };
    AgGridTableCustomComponent.prototype.setColumnDef = function (columnDefs) {
        this.gridOptions.columnDefs = columnDefs;
    };
    AgGridTableCustomComponent.prototype.setData = function (rowData) {
        this.gridOptions.rowData = rowData;
    };
    AgGridTableCustomComponent.prototype.updateData = function (rowData) {
        this.gridOptions.api.setRowData(rowData);
        this.gridOptions.api.sizeColumnsToFit();
    };
    AgGridTableCustomComponent.prototype.setGridOptionContext = function (context) {
        this.gridOptions.context = context;
    };
    return AgGridTableCustomComponent;
}());
__decorate([
    core_1.ViewChild(pagination_component_1.PaginationComponent),
    __metadata("design:type", typeof (_a = typeof pagination_component_1.PaginationComponent !== "undefined" && pagination_component_1.PaginationComponent) === "function" && _a || Object)
], AgGridTableCustomComponent.prototype, "paginationComponent", void 0);
__decorate([
    core_1.ViewChild(header_component_1.GridHeaderComponent),
    __metadata("design:type", typeof (_b = typeof header_component_1.GridHeaderComponent !== "undefined" && header_component_1.GridHeaderComponent) === "function" && _b || Object)
], AgGridTableCustomComponent.prototype, "gridHeaderComponent", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], AgGridTableCustomComponent.prototype, "agPaginationAuto", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], AgGridTableCustomComponent.prototype, "agHeader", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], AgGridTableCustomComponent.prototype, "agPagination", void 0);
AgGridTableCustomComponent = __decorate([
    core_1.Component({
        selector: 'ag-grid-table-cmp',
        template: __webpack_require__(718)
    }),
    __metadata("design:paramtypes", [])
], AgGridTableCustomComponent);
exports.AgGridTableCustomComponent = AgGridTableCustomComponent;
var _a, _b;
//# sourceMappingURL=table.component.js.map

/***/ }),

/***/ 38:
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAUAAAABgCAMAAABblVsaAAAAnFBMVEUAAAAEBAQDAwMAAAAAAAABAQEAAAAAAAAAAAAAAAAAAAAAAAAAAADHx8e1tbWnp6cAAAC+vr6wsLCSkpLf39/V1dU/Pz8AAADGxsaLi4sgICBoaGiGhobDw8P////o6OiZmZny8vL7+/vq6ur+/v7u7u729vbs7Oz4+Pj09PT19fXb29vf39/j4+PQ0NDY2NjMzMzIyMiPj494eHiFbpUZAAAAHnRSTlMAK09hGCUGMQw9EQM7paSTHrm1hN7bRHnMkDlGaZmYyHGMAAAFD0lEQVR42u2ci1riOhSFKTZNCiiXEQd1TmJaeuOiHn3/dzsJtQ49TS+TNOPQ2WsUP9nDKln9U5qyZTTqV0+W61+tP/35gYBAEBAIBAKBQOCfJ8918E85rtdzfUSQLCAyVALda3qua7fn+gjlBWc6UAIdOj4jaEwd/frMn1XrRYDI5EkSl5j+p6eWh7YTWOOPKa797eOefBKe5qGyXjwLn/qzSp3g8ZXQ2C8sdAhE1G9NUGxeeyeZ+HcIEH1OUNQQoNgApeNKHdGytAaJKZ2R1vFVtt15Dwn/9xb/tzr/DgHiz9Hj+gBP+SkCxP8LEOsQiGnQwshp81iXQBP/HgKUB4c8P8UU7hhgK4G0cYT55k0I1PY3D3Amjn1unp/yGNkLgc0jJP5WyoBAfX/zAMfC+kr6iyeALRJIqVs7vnTHeZY2E1j+p/J/q6kX/u+qOi7liispi3twEO8ynu3iAKvq4yBI0zgN5A5U1GWxUJoGegQGUnWEEJ/zhLGE6xNo4I9LQ8JBNQCMs4QdD0eWZFhVn/lZJvbPafOKesyjsFDEYz0C090urZ1hrrRm4lv7NMbEH5eGhONqABhH7LB/2R9YhJV14kdRlG9eUZcPLiQttAjknDccoVDzOWaHAA38cQlMXMFU3IMYEyEcxC1S1gXj7GPzinpyeHku9HJI9AhMEt/mYtrEH5eYwFGVoNJKRFU/W0Up6uH++fXfXK/P+1CLQMSs5mfk74SltW7o9FzHoSDwNZcgMNQisNNa2PZau+4IecPOdeP2XBfz/7h/ybU/iqMAXA/8tfrn/Dc90IMGej0QBASCQEAgCAgEffEuerrsXQwEAoFAIAgIBAGBQOCvynp/4NAJtN4fOHQCrfcH9qaGNy66vKfRSliLf93jbfcH9kZgU/9fl/4+W/62+wN742/W0FeDaXuCLbuIvLf4v+kHaNQf2BOBwj5oHKAhg/r+tvsDe+Kvuf+vtb+vbRcZ+NvuD+yFwHx8DQPcfrTXGe0fPX/b/YG9yG3pLcRpxnmlv6qxJbBUf1P6/6y/K/2LcO32B/ZE4KmBrz7AvH+P6zJo4m+7P7CvY6Ds4Kv1Rh8NfKH7+/1t9wf29irMeX0HqnmHoL6/7f7A/hhMElveRv62+wN7XIkwNLKaoJ6/7f7A37IW/kp/2/2BcD1wKNcDB64niAAEBIKAQBAICAQBgSAQEAgCAkEgIBDURed/0nyxf8/cicDpZDFRfQyhN5nI67ieO9G6nIuMPxztQjR158kPt5qgh643jjcieD13pxq+2PiTlS6DwKn7LaDZt0k1vzmlSzR5uKVBtdotwO9XJ32/3AA75bcVhNxW3rUic0nOaryWPxZAoCI6QjyZnxzf7V3lKO89LmUllDdz928NsPGl4/EfROT8VeYnEHSW+eC384X3t07hBgLJ3YEuZ/n8vVOeZXj4lGBwr5Xf4AlchEEQbCJxc/ugPksjeHNqT1s5egFuzzRAAt1NuuNRxLMa/qbkYR1nnPNdvNRKEAdpMYXTYIAEes4qYoyF67sa/n6sd1Fy3CQRj5daLyKx2D+5eDzEV2EPrULG1jXzdzS55jxK7v2VSJDrLCQwD9nxyOR3yAd5HigSZHX8SULnSXK/IGglfmgRGLFiCrNomCsRsdh4JA3VG3n+4qHlfKG1lAvD4/Fw+grDga5EPOI1RFNcTJhoXkw4789DgyTQrgZxOQt0wQSCQEAgCAgEAYGgPvUfpTvkZYU96i8AAAAASUVORK5CYII="

/***/ }),

/***/ 39:
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAUAAAABgCAMAAABblVsaAAADAFBMVEUAAABaoVUEYBipAAA5OTkEBAQAAACFZUcJAAAECgLirGt+fn6lpaalpaW5GBhbolUGYhmqAACop6n5+fnBAgKmAQEAWxrfn2UCXhkIDQZ1d3wWhwSlAAAPcRu+EhL3qamnBQWlpaVYuC6xEBD//f+yCQl2d3wvkCQVhQbJLS3BISEqhyxVrz10x00fjwarBQUAWRMrmgyoAgLng4OtCAjvk5MPfAelBwf18/VhuUHLDAz1k5NmukkHYRaKz2t0wVmb23pesUqP1W+P0nDsZ2fUSUm1FxfnWVnqY2O0BASNAADq2p2+GxuwVzj8+PIdHRukpKThq2n////s7O0mJib+/P3enWP67uFVV1uop6kkmwD459b99tVcY3D29fb9+O3x8vHf3+Dp6Oj78ungyI337caYmZihjFU1rwACNrDx8vHT09Tw0rfz3Lv03cbp157Js3u3oWfOwJLdzKdGbUOAgonw8O82rgb35dSluaX67uDq6+ua5mfO48Ph4uJ0dnstowAyqwD78uhdxCovpgB910i38YzP9q9arkL8+/vSAADoAADr7O3S58Y5sAbn5+f249DjAADtAQGpy6JAtwU1lxuC2E2z74hPvxbV1NX99+uvr+NKvQ/36tmy6JHFwJ0ilgR41ELl5eXy9PLd3t7U1dbKAQHC1Meg3oCR1nBozDFerUYnngBgxywjihLV09X/mJjZBQX24MrxAAD+Zmb9+Oz7i4sqiR1uwku4zL2c427W+Lrs7+x7x1r58+Sv3JmOy213vlpxu1d/f7iwxbXW1tn/tLTdAAD9d3f4Jibx1rrwPT3rEBBRxBRlxDeH0mGI02KJ1WCo34qs8HhvzjjJz7iwza337d62FBRiuUP2MTHezKn/q6uDloeguqRRozrM1b6Lz2yi2IeGvm4/ohyrmVWV416c1Xui6W+/0bU7jjS98ZUxjSm5vJaXsZ8slBFSvh7/3t7/ycn/fHzdzqmww7bL2cO3nFnodXV1mHacnFB4kX+kvKuq7HuwuY6orohs99ZiAAAA7XRSTlMA/S4cWkEmAQkW/YD+/1v+NSL+/v5cR/k5F/3prEVM9qH9+27//fzZ2ayEYN3t2LQZ6avdnPrZg/ro8/rVIunV66/o0PLQV/v50hJqkwX9/////////v////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////m1ZoxUAAAH80lEQVR42u2ceVjTZhzHCwXaeiAoc865TSbqDq8d7r7v4w9bwmjLUZ6uUFlKW8BRIqgoOEZBiYgKniBT0LlNcYrXnAdem+50uts5dzvdfd/vm7RMHn5JWUInxvcDNDzPm7xpPnyTvG/4gUrVtYwLcvvppru/PwJJIIEkkCSQJJAkkKDEBGq4z4BoJL/5CRy5ubnZDyowgXZ9716xsb166WN76/V2qB0Ti9YRa/dhB/2l+UhJyVFgAvVWDwftoWlWD7TTFo/nOYTHY6HBdq+PpmOH9bBAozGNT2B2jvISqC+kKQrJs1gsXgsoaPK2yTNnzpyMgAVSGNpSvWLLkl9BgSkpxglcACVHUN+JdRJkJEzfiQQK9K+JbZjBsjOwQhpMWF/qs5rSxxFfPr5thhnY96aPDrNIYPXKJSteX3kBsItcJG4Cpy8jQ2IC9ebA/hLkpEhG/7EN7JQpbCEXIlBg4fZJn9eUlpbW1GwvBPbz/taDW49QVPWHm1975dVVoaDAjJTcNKxPWGCgA6QCZTDBJCuBMvqPbbBarVMaHkYKaQ8ocMe8TychNs/bUdi3Q3PUxUvfmLfxSPXGJ0tKXv7gfRUsMAOnMENGAr2UPcDxmWQlUEb/WOAyZBCFkIYSaC7c+Rhm6ZPfrAIEDvi4dtGcl8reXpSZmTm3Cfw5ZiNx2XwAM8ZLPUAvmyd+fAET2P4D6l+4ne8fbkcCl+9GBqewLOWBBdaWPF1SUjunchV0Cv8+F6mbUzlt2rS5TTQsMMPJCXQixgclgQkcwUugaP961upw7F6GFLIUnMCy/PzKysr8/Pwy8Cay6+vp06dPnTp1QxO4PfLnznJmY39ut3t8sK6BMociMvrXsw6HY/5qFEIrCwqk+iQlJT2FvpLKKEgg/dUzuHXDJnB7rSonA4lzZ6e43enp6VITaFYFV6CM/jmB2CG6l8ACQ5J8hMACHV89U1+/4Ud4e50ux4nEuXPEBXbBOFCWQJVcgauXr57vsMID5YkhIX3QR0jILnCgbXE4/jhxfBPyxwLtuvAcd3ZubnpOSnq69AR265kIZeFBkzFQEMtPNfBAEZzqWVm2YVMTi7ECpzAWiAgg8AzGrjdj+uIXgYcFZh+SHiZoI8ZzKDaB/xe8RuLhND1tIhBIAgkkgQQCSSD5EQWpnSSQQBJIIAkkCSSQBBJIAjug4SAJBElsB9BuMBh6cKBvBNrbSBTeT5E5LzUvz6S8BCa6bG0wgACDbX3B84jiBcVpNgPU7q8PPHqs2iD8BuypeQ6TKVWBCSwwImy4gtSbBgks5usDcYFgMSjQyHeA6wN/g/aQymEyIYFoKf2div3yNqELEijev3ACGWMyk1zAOVwPCSzw1wdu2VYACfzio5MMMihcH5gaj/FSeQtN8UIR7EQCzaIHmCA7SRL71yQyyQzjMwgKfNNXH1hasx0S+MnWg1vrjMY64frA1PhHMPFiAjuRP9HylYSA1W3jgtS/5txZzFokMLmgwGgrBgT2WOyrD/xz3k5AIF8fWFfH1wf+rJIoMGAC7ZRX/ABN8jIouX8s0OWahRUajQICl/L1gbVlxo4C29UH/mRQBSmBeaw30AF2OELxksD27VD/p7YLFyBqzl3retHpWjsLGwQEanos3vnN04jaykxIoOqTf+sDj6YZTlsC5VYISu4fJdCV5TNYACbwzVX5HJmwQMNhX33g3ENGW9AS2H1LBJFAZ1ZWltPpcjFMMXgT6eMvb4MF2v7i6wMPMYyQQJ6iIN6FuwCJ/aO7cBYHNmgDhzFtAkNggVl/4/rAOrw9PJDmB4KpRQsT0EtwxoFdkkGJA2km6913f+AcukCBtolccSCuD4SucYY0p/PkieN1aCzEwNdAlRWD/C1sNdkpBc5E0hasX4BAkzFwJsIY/dgYSCA69ZkvDmF/jEtkKmdqbS1qbTWZVUoj8ZSnAYkSHhZ09mHCLnwSm1Lt5HkgoTtCEkggCSSQBBIIJIEEkkACgSSQQBJIIJAEnjU8wC+0JIHSGHJVJF5EXnWhwApahMj2up4cYYq3HHXn5aC/X94biwxGXvTtRbBBrS4iQidiMIz7rauF7anwBIbetmUJYHBI+YH9LWMjI2/cs+c72KA2gqLCI7TiAr2UI76nMoN3we03c/m7A66fu7q8quLAupaWljVr3ttzGXiKhlMTxQzyCaQdtLenEhM4YOTBW8eg/N2C6+dGdKif06gHlVdUPLt/377vW9ZcqhYQ+KiYQV6gl3Y4HOEKvPDh+rmbxoSOxPVzw4H6Q436yvKK2c++sG7dvkvVGiGB2KDQdZAXGOelKTpMeQkccAWunxtxPa6fGxUFrqK+v4ozeLda4C6LBSKDEaICcQi9SrwT97/CXz83KhRe45wb9nIG74qUKPAhv8E4BSYQGTyfr5+7JErAX0x5MzY4+537IlWSTmFOYFwcelHmWLD/+bh+7hKh/A1tbCxvbt5bUTH7nXvvkXQT8cY95PWizzNY4LgABuvrrxHIn+rat2IayxtHjy6vqjqwX8owRhPWz/+nLvFKnY30PzE8VOjw1YPfiom5Mjp6UGNV89VqSQPp6yz+/2Cn0ASqNAOihNvUg4cOQuLUg2IGw8OYgFM5zxMY/J+0lT8fhgxGnxOtaVtIeJgQ1q8fSl+/M/oUlvvHpKcs/jvhRQMHDhs2sAgRriL8d7Q6ne48BFpoz8oEEggkgQSSQAKBJLAb8Q85csYKBm7vjAAAAABJRU5ErkJggg=="

/***/ }),

/***/ 40:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(1);
var http_1 = __webpack_require__(35);
var Rx_1 = __webpack_require__(84);
__webpack_require__(226);
__webpack_require__(225);
__webpack_require__(153);
var util_1 = __webpack_require__(471);
var AuthenticationService = (function () {
    function AuthenticationService(http) {
        this.http = http;
        this.authUrl = 'auth';
        this.headers = new http_1.Headers({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + this.getToken()
        });
    }
    AuthenticationService.prototype.login = function (username, password) {
        return this.http.post(this.authUrl, JSON.stringify({
            username: username,
            password: password
        }), { headers: this.headers })
            .map(function (response) {
            // login successful if there's a jwt token in the response
            var token = response.json() && response.json().token;
            if (token) {
                var permissionList = [];
                permissionList = response.json().permissions;
                localStorage.setItem("permissionList", JSON.stringify(permissionList));
                // store username and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('currentUser', JSON.stringify({ username: username, token: response.json().token.token }));
                // return true to indicate successful login
                return true;
            }
            else {
                // return false to indicate failed login
                return false;
            }
        }).catch(function (error) { return Rx_1.Observable.throw(error.json().error || 'Server error'); });
    };
    AuthenticationService.prototype.getToken = function () {
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        var token = currentUser && currentUser.token;
        return token ? token : "";
    };
    AuthenticationService.prototype.logout = function () {
        // clear token remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        localStorage.setItem("token", "");
    };
    AuthenticationService.prototype.isLoggedIn = function () {
        var token = this.getToken();
        return token && token.length > 0;
    };
    AuthenticationService.prototype.hasAccess = function (id) {
        var data = {};
        var retVal = true;
        if (!util_1.isUndefined(id)) {
            this.http.get('accessLevel/checkPermission?id=' + id, { headers: this.headers }).subscribe(function (response) {
                data = response.json();
            });
            retVal = data["success"];
        }
        return retVal;
    };
    AuthenticationService.prototype.checkPermission = function (id) {
        if (util_1.isUndefined(id)) {
            id = 0;
        }
        return this.http.get('accessLevel/checkPermission?id=' + id, { headers: this.headers }).map(function (response) {
            // login successful if there's a jwt token in the response
            return response.json();
        });
    };
    AuthenticationService.prototype.getPermissions = function () {
        var permissionList;
        this.http.get("accessLevel/getpermissionforloggeduser", { headers: this.headers }).subscribe(function (data) {
            permissionList = data.json();
        });
        return JSON.stringify(permissionList);
    };
    return AuthenticationService;
}());
AuthenticationService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [typeof (_a = typeof http_1.Http !== "undefined" && http_1.Http) === "function" && _a || Object])
], AuthenticationService);
exports.AuthenticationService = AuthenticationService;
var _a;
//# sourceMappingURL=authentication.service.js.map

/***/ }),

/***/ 41:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var material_1 = __webpack_require__(16);
var core_1 = __webpack_require__(1);
var ConfirmationDialog = (function () {
    function ConfirmationDialog(dialogRef) {
        this.dialogRef = dialogRef;
        this.isCancelButtonVisible = true;
    }
    return ConfirmationDialog;
}());
ConfirmationDialog = __decorate([
    core_1.Component({
        selector: 'confirm-dialog',
        template: "\n        <h2 md-dialog-title>{{title}}</h2>\n        <div md-dialog-content>\n            <p>{{message}}</p>\n        </div>\n        <div md-dialog-action>       \n            <button type=\"button\" md-button \n            (click)=\"dialogRef.close(true)\">OK</button>            \n             <button *ngIf=\"isCancelButtonVisible\" type=\"button\" md-button \n            (click)=\"dialogRef.close(false)\">Cancel</button>            \n        </div>\n    ",
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof material_1.MdDialogRef !== "undefined" && material_1.MdDialogRef) === "function" && _a || Object])
], ConfirmationDialog);
exports.ConfirmationDialog = ConfirmationDialog;
var _a;
//# sourceMappingURL=confirmation-dialog.js.map

/***/ }),

/***/ 473:
/***/ (function(module, exports) {

function webpackEmptyContext(req) {
	throw new Error("Cannot find module '" + req + "'.");
}
webpackEmptyContext.keys = function() { return []; };
webpackEmptyContext.resolve = webpackEmptyContext;
module.exports = webpackEmptyContext;
webpackEmptyContext.id = 473;


/***/ }),

/***/ 474:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(1);
var platform_browser_dynamic_1 = __webpack_require__(493);
var app_module_1 = __webpack_require__(496);
var environment_1 = __webpack_require__(542);
if (environment_1.environment.production) {
    core_1.enableProdMode();
}
platform_browser_dynamic_1.platformBrowserDynamic().bootstrapModule(app_module_1.AppModule);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 495:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(1);
var common_1 = __webpack_require__(15);
var AppComponent = (function () {
    function AppComponent(location) {
        this.location = location;
    }
    AppComponent.prototype.ngOnInit = function () {
    };
    AppComponent.prototype.isMaps = function (path) {
        var titlee = this.location.prepareExternalUrl(this.location.path());
        var splitedTitle = titlee.split('/', 2);
        if (path === splitedTitle[1]) {
            return false;
        }
        else {
            return true;
        }
    };
    return AppComponent;
}());
AppComponent = __decorate([
    core_1.Component({
        selector: 'my-app',
        template: __webpack_require__(672)
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof common_1.Location !== "undefined" && common_1.Location) === "function" && _a || Object])
], AppComponent);
exports.AppComponent = AppComponent;
var _a;
//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 496:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(1);
var platform_browser_1 = __webpack_require__(51);
var router_1 = __webpack_require__(36);
var http_1 = __webpack_require__(35);
var forms_1 = __webpack_require__(12);
var common_1 = __webpack_require__(15);
var app_component_1 = __webpack_require__(495);
var dashboard_component_1 = __webpack_require__(502);
var dashboard_module_1 = __webpack_require__(503);
var sidebar_module_1 = __webpack_require__(541);
var footer_module_1 = __webpack_require__(530);
var navbar_module_1 = __webpack_require__(533);
var login_component_1 = __webpack_require__(259);
var translate_1 = __webpack_require__(120);
var authentication_service_1 = __webpack_require__(40);
var can_activate_authguard_1 = __webpack_require__(164);
var setting_module_1 = __webpack_require__(525);
var category_grade_service_1 = __webpack_require__(262);
var category_grade_component_1 = __webpack_require__(116);
var common_2 = __webpack_require__(61);
var emp_profile_service_1 = __webpack_require__(115);
var animations_1 = __webpack_require__(250);
var angular2_notifications_1 = __webpack_require__(321);
var common_notification_service_1 = __webpack_require__(171);
var ng2_accordion_1 = __webpack_require__(649);
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    core_1.NgModule({
        imports: [
            platform_browser_1.BrowserModule,
            dashboard_module_1.DashboardModule,
            sidebar_module_1.SidebarModule,
            navbar_module_1.NavbarModule,
            footer_module_1.FooterModule,
            router_1.RouterModule.forRoot([]),
            forms_1.FormsModule,
            http_1.HttpModule,
            setting_module_1.SettingModule,
            //DataTableModule,
            // SharedModule,
            forms_1.ReactiveFormsModule,
            angular2_notifications_1.SimpleNotificationsModule.forRoot(),
            animations_1.BrowserAnimationsModule,
            angular2_notifications_1.PushNotificationsModule,
            ng2_accordion_1.AccordionModule
        ],
        declarations: [app_component_1.AppComponent, dashboard_component_1.DashboardComponent, login_component_1.LoginComponent, category_grade_component_1.DialogResultExampleDialog],
        entryComponents: [
            category_grade_component_1.DialogResultExampleDialog
        ],
        exports: [],
        providers: [{ provide: common_1.LocationStrategy, useClass: common_1.HashLocationStrategy }, translate_1.TRANSLATION_PROVIDERS, translate_1.TranslateService, authentication_service_1.AuthenticationService, can_activate_authguard_1.CanActivateAuthGuard, category_grade_service_1.CategoryGradeService, common_2.HttpCustomService, common_2.ReturnType, common_2.CustomValidationService, emp_profile_service_1.EmployeeProfileService, common_notification_service_1.CommonNotificationService],
        bootstrap: [app_component_1.AppComponent]
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 497:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(1);
var BasicTreeComponent = (function () {
    function BasicTreeComponent() {
        this.nodes = [
            {
                name: 'root1',
                children: [
                    { name: 'child1', id: 1 },
                    { name: 'child2', id: 2 }
                ]
            },
            {
                name: 'root2',
                children: [
                    { name: 'child3', id: 3 },
                    { name: 'child4', id: 4 }
                ]
            },
            { name: 'root3' },
            { name: 'root5', children: null }
        ];
    }
    BasicTreeComponent.prototype.treeclickEvent = function (event) {
        debugger;
        if (event.node.isLeaf) {
            var r = event.node.data.id;
            console.log(r);
        }
    };
    return BasicTreeComponent;
}());
BasicTreeComponent = __decorate([
    core_1.Component({
        selector: 'app-basictree',
        template: __webpack_require__(673),
        //styleUrls: ['book.component.css'],
        styles: []
    })
], BasicTreeComponent);
exports.BasicTreeComponent = BasicTreeComponent;
//# sourceMappingURL=basictree.component.js.map

/***/ }),

/***/ 498:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(1);
var book_service_1 = __webpack_require__(499);
var BookComponent = (function () {
    function BookComponent(service) {
        this.service = service;
        this.enableButton = true;
        this.config = {
            hasAllCheckBox: true,
            hasFilter: true,
            hasCollapseExpand: true,
            maxHeight: 500,
            decoupleChildFromParent: false,
            hasDivider: true
        };
    }
    BookComponent.prototype.ngOnInit = function () {
        debugger;
        this.items = this.service.getBooks();
        //  console.log(this.items);
    };
    return BookComponent;
}());
BookComponent = __decorate([
    core_1.Component({
        selector: 'ngx-book',
        template: __webpack_require__(674),
        styles: [__webpack_require__(641)],
        providers: [
            book_service_1.BookService
        ]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof book_service_1.BookService !== "undefined" && book_service_1.BookService) === "function" && _a || Object])
], BookComponent);
exports.BookComponent = BookComponent;
var _a;
//# sourceMappingURL=book.component.js.map

/***/ }),

/***/ 499:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var ngx_treeview_1 = __webpack_require__(220);
var BookService = (function () {
    function BookService() {
    }
    BookService.prototype.getBooks = function () {
        var childrenCategory = new ngx_treeview_1.TreeviewItem({
            text: 'Children', value: 1, children: [
                { text: 'Baby 3-5', value: 11, checked: false },
                { text: 'Baby 9-12', value: 13, checked: false }
            ]
        });
        var itCategory = new ngx_treeview_1.TreeviewItem({
            text: 'IT', value: 9, children: [
                {
                    text: 'Programming', value: 91, disabled: true
                },
                {
                    text: 'Networking', value: 92, checked: false
                }
            ]
        });
        return [childrenCategory, itCategory];
    };
    return BookService;
}());
exports.BookService = BookService;
//# sourceMappingURL=book.service.js.map

/***/ }),

/***/ 500:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by sachithra on 8/28/2017.
 */
var core_1 = __webpack_require__(1);
var forms_1 = __webpack_require__(12);
var http_request_metadata_1 = __webpack_require__(27);
var common_http_service_1 = __webpack_require__(22);
var custom_validation_service_1 = __webpack_require__(17);
var router_1 = __webpack_require__(36);
var common_notification_service_1 = __webpack_require__(171);
var CustomerProfile = (function () {
    function CustomerProfile(route, _fb, httpCustomService, customValidationService, notificationService, router) {
        this._fb = _fb;
        this.httpCustomService = httpCustomService;
        this.customValidationService = customValidationService;
        this.notificationService = notificationService;
        this.router = router;
        this.genderLst = [];
        this.statusList = [];
        this.retList = [];
        this.isEdit = false;
        this.httpCustomService.commonHttpRequest("getValues", "employee/getdetails", null, this.getValuesuccess.bind(this), null, http_request_metadata_1.HttpType.GET);
        this.id = route.snapshot.queryParams['id'];
        var data = {};
        data["id"] = this.id;
        if (this.id > 0) {
            this.isEdit = true;
        }
        this.httpCustomService.commonHttpRequest("getCustomerdetails" + this.id, "employee/getempprofiledetail", data, this.fillData.bind(this), null, http_request_metadata_1.HttpType.GET);
    }
    CustomerProfile.prototype.ngOnInit = function () {
        this.customerForm = this._fb.group({
            name: this.name,
            employeeId: [this.empid, [forms_1.Validators.required], this.checkExists.bind(this, "employee/checkempid", this.empid, this.isEdit)],
            id: this.id,
            address: this.address,
            nationality: this.nationality,
            email: this.email,
            phoneNo: this.phoneNo,
            mobileNo: this.mobileNo,
            gender: this.gender,
            maritalStatus: this.maritalStatus,
            dob: this.dob,
            username: [this.userName, [forms_1.Validators.required], this.checkExists.bind(this, "employee/checkusername", this.userName, this.isEdit)],
            password: this.password,
            joinedDate: this.joinedDate
        });
    };
    CustomerProfile.prototype.getValuesuccess = function (result) {
        this.genderLst = result.genders;
        this.statusList = result.maritalStatus;
    };
    CustomerProfile.prototype.saveCustomerProfile = function (entity) {
        this.httpCustomService.commonHttpRequest("addcustomer", "employee/addcustomer", entity, this.addCustomerSuccess.bind(this), null, http_request_metadata_1.HttpType.POST);
        entity = null;
    };
    CustomerProfile.prototype.addCustomerSuccess = function () {
        this.notificationService.createSuccessNotification("Customer Profile", "Customer Added Successfully");
        this.router.navigate(['/customer']);
    };
    CustomerProfile.prototype.checkExists = function (requestPath, prvValue, isEdit, control) {
        var value = control.value;
        var data = {};
        data["value"] = value;
        return this.customValidationService.isExistValidator(data, requestPath, prvValue, isEdit, control);
    };
    CustomerProfile.prototype.fillData = function (result) {
        if (result.profile != null) {
            this.isEdit = true;
            var profile = result.profile;
            this.customerForm = this._fb.group({
                name: profile.name,
                employeeId: profile.employeeId,
                id: profile.id,
                address: profile.address,
                nationality: profile.nationality,
                email: profile.email,
                phoneNo: profile.phoneNo,
                mobileNo: profile.mobileNo,
                gender: profile.gender,
                maritalStatus: profile.maritalStatus,
                dob: profile.dob,
                joinedDate: profile.joinedDate
            });
        }
        else {
            this.isEdit = false;
        }
    };
    return CustomerProfile;
}());
CustomerProfile = __decorate([
    core_1.Component({
        selector: "customer-profile",
        template: __webpack_require__(675),
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof router_1.ActivatedRoute !== "undefined" && router_1.ActivatedRoute) === "function" && _a || Object, typeof (_b = typeof forms_1.FormBuilder !== "undefined" && forms_1.FormBuilder) === "function" && _b || Object, typeof (_c = typeof common_http_service_1.HttpCustomService !== "undefined" && common_http_service_1.HttpCustomService) === "function" && _c || Object, typeof (_d = typeof custom_validation_service_1.CustomValidationService !== "undefined" && custom_validation_service_1.CustomValidationService) === "function" && _d || Object, typeof (_e = typeof common_notification_service_1.CommonNotificationService !== "undefined" && common_notification_service_1.CommonNotificationService) === "function" && _e || Object, typeof (_f = typeof router_1.Router !== "undefined" && router_1.Router) === "function" && _f || Object])
], CustomerProfile);
exports.CustomerProfile = CustomerProfile;
var _a, _b, _c, _d, _e, _f;
//# sourceMappingURL=customer-profile.component.js.map

/***/ }),

/***/ 501:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by sachithra on 8/28/2017.
 */
var core_1 = __webpack_require__(1);
var name_renderer_component_1 = __webpack_require__(88);
var table_component_1 = __webpack_require__(31);
var common_http_service_1 = __webpack_require__(22);
var http_request_metadata_1 = __webpack_require__(27);
var employee_action_component_1 = __webpack_require__(165);
var confirmation_dialog_1 = __webpack_require__(41);
var material_1 = __webpack_require__(16);
var custom_validation_service_1 = __webpack_require__(17);
var CustomerProfiles = (function () {
    function CustomerProfiles(httpCustomService, dialog, customValidation) {
        this.httpCustomService = httpCustomService;
        this.dialog = dialog;
        this.customValidation = customValidation;
        this.agPaginationAuto = false;
    }
    CustomerProfiles.prototype.ngOnInit = function () {
        this.httpCustomService.commonHttpRequest("getAllCustomers", "employee/getallcustomers", null, this.createTable.bind(this), null, http_request_metadata_1.HttpType.GET);
        var columnDefs = [
            {
                headerName: "Employee",
                field: "name",
                cellRendererFramework: name_renderer_component_1.NameRendererComponent,
                width: 120
            },
            {
                headerName: "Address",
                field: "address",
                width: 100
            },
            {
                headerName: "Nationality",
                field: "nationality",
                width: 100
            },
            {
                headerName: "Mobile",
                field: "mobile",
                width: 100
            },
            {
                headerName: "Action",
                width: 40,
                cellRendererFramework: employee_action_component_1.EmployeeProfileActionRendererComponent
            },
        ];
        var data = [];
        this.tableComponent.agPaginationAuto = this.agPaginationAuto;
        this.tableComponent.setColumnDef(columnDefs);
        this.tableComponent.setGridOptionContext({ parentComponent: this });
        this.tableComponent.setData(data);
    };
    CustomerProfiles.prototype.createTable = function (result) {
        var data = [];
        var profileList = result.profileList;
        for (var _i = 0, profileList_1 = profileList; _i < profileList_1.length; _i++) {
            var obj = profileList_1[_i];
            var profile = { name: obj.name, id: obj.id, address: obj.address, mobile: obj.mobileNo, nationality: obj.nationality, action: { url: "customerprofile?id=" + obj.id } };
            data.push(profile);
        }
        this.tableComponent.updateData(data);
    };
    CustomerProfiles.prototype.deactivateEmployee = function (profileId) {
        var _this = this;
        var dialogRef = this.dialog.open(confirmation_dialog_1.ConfirmationDialog);
        dialogRef.disableClose = true;
        dialogRef.componentInstance.title = "Remove Customer";
        dialogRef.componentInstance.message = "Are you sure you want to remove this Customer?";
        dialogRef.afterClosed().subscribe(function (data) {
            if (data) {
                var param = {};
                param["id"] = profileId;
                param["isCustomer"] = true;
                _this.httpCustomService.commonHttpRequest("removeEmployee_" + profileId, "employee/deactivateEmployee", param, _this.createTable.bind(_this), null, http_request_metadata_1.HttpType.GET);
            }
        });
    };
    return CustomerProfiles;
}());
__decorate([
    core_1.ViewChild(table_component_1.AgGridTableCustomComponent),
    __metadata("design:type", typeof (_a = typeof table_component_1.AgGridTableCustomComponent !== "undefined" && table_component_1.AgGridTableCustomComponent) === "function" && _a || Object)
], CustomerProfiles.prototype, "tableComponent", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], CustomerProfiles.prototype, "agPaginationAuto", void 0);
CustomerProfiles = __decorate([
    core_1.Component({
        selector: "customer-profiles",
        template: __webpack_require__(676)
    }),
    __metadata("design:paramtypes", [typeof (_b = typeof common_http_service_1.HttpCustomService !== "undefined" && common_http_service_1.HttpCustomService) === "function" && _b || Object, typeof (_c = typeof material_1.MdDialog !== "undefined" && material_1.MdDialog) === "function" && _c || Object, typeof (_d = typeof custom_validation_service_1.CustomValidationService !== "undefined" && custom_validation_service_1.CustomValidationService) === "function" && _d || Object])
], CustomerProfiles);
exports.CustomerProfiles = CustomerProfiles;
var _a, _b, _c, _d;
//# sourceMappingURL=customer-profiles.component.js.map

/***/ }),

/***/ 502:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(1);
var DashboardComponent = (function () {
    function DashboardComponent() {
    }
    return DashboardComponent;
}());
DashboardComponent = __decorate([
    core_1.Component({
        selector: 'dashboard-cmp',
        template: __webpack_require__(677)
    })
], DashboardComponent);
exports.DashboardComponent = DashboardComponent;
//# sourceMappingURL=dashboard.component.js.map

/***/ }),

/***/ 503:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var translate_module_1 = __webpack_require__(174);
var shared_module_1 = __webpack_require__(278);
var core_1 = __webpack_require__(1);
var router_1 = __webpack_require__(36);
var dashboard_routes_1 = __webpack_require__(504);
var forms_1 = __webpack_require__(12);
var http_1 = __webpack_require__(35);
var common_1 = __webpack_require__(15);
var ngx_treeview_1 = __webpack_require__(220);
var angular_tree_component_1 = __webpack_require__(93);
var angular2_datetimepicker_1 = __webpack_require__(577);
var ngx_tooltip_1 = __webpack_require__(652);
var ngx_countdown_timer_1 = __webpack_require__(651);
var ngx_accordion_1 = __webpack_require__(650);
var DashboardModule = (function () {
    function DashboardModule() {
    }
    return DashboardModule;
}());
DashboardModule = __decorate([
    core_1.NgModule({
        imports: [
            router_1.RouterModule.forChild(dashboard_routes_1.MODULE_ROUTES),
            translate_module_1.TranslateModule,
            forms_1.FormsModule,
            http_1.HttpModule,
            common_1.CommonModule,
            shared_module_1.SharedModule,
            angular_tree_component_1.TreeModule,
            ngx_treeview_1.TreeviewModule.forRoot(),
            forms_1.ReactiveFormsModule,
            angular2_datetimepicker_1.AngularDateTimePickerModule,
            ngx_tooltip_1.TooltipModule,
            ngx_countdown_timer_1.CountdownTimerModule.forRoot(),
            ngx_accordion_1.AccordionModule
        ],
        declarations: [dashboard_routes_1.MODULE_COMPONENTS, dashboard_routes_1.DIALOG_COMPONENTS],
        exports: [shared_module_1.SharedModule, dashboard_routes_1.MODULE_COMPONENTS],
        entryComponents: [dashboard_routes_1.DIALOG_COMPONENTS],
        schemas: [core_1.CUSTOM_ELEMENTS_SCHEMA]
    })
], DashboardModule);
exports.DashboardModule = DashboardModule;
//# sourceMappingURL=dashboard.module.js.map

/***/ }),

/***/ 504:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var employees_component_1 = __webpack_require__(506);
var work_time_line_component_1 = __webpack_require__(507);
var joblist_component_1 = __webpack_require__(511);
var notifications_component_1 = __webpack_require__(513);
var reports_component_1 = __webpack_require__(260);
var home_component_1 = __webpack_require__(508);
var login_component_1 = __webpack_require__(259);
var can_activate_authguard_1 = __webpack_require__(164);
var category_grade_component_1 = __webpack_require__(116);
var accessControl_component_1 = __webpack_require__(261);
var book_component_1 = __webpack_require__(498);
var basictree_component_1 = __webpack_require__(497);
var job_status_component_1 = __webpack_require__(512);
var employee_profiles_component_1 = __webpack_require__(505);
var employee_profile_component_1 = __webpack_require__(252);
var skill_component_1 = __webpack_require__(522);
var unit_component_1 = __webpack_require__(523);
var location_component_1 = __webpack_require__(521);
var employee_status_config_component_1 = __webpack_require__(515);
var confirmation_dialog_1 = __webpack_require__(41);
var category_grade_component_2 = __webpack_require__(116);
var accessControl_component_2 = __webpack_require__(261);
var skill_dialog_component_1 = __webpack_require__(269);
var employee_status_dialog_1 = __webpack_require__(264);
var jobType_dialog_component_1 = __webpack_require__(256);
var employee_type_component_1 = __webpack_require__(166);
var emp_type_dialog_1 = __webpack_require__(253);
var emp_skills_dialog_component_1 = __webpack_require__(251);
var job_component_1 = __webpack_require__(510);
var emergencyJob_component_1 = __webpack_require__(509);
var gridCustom_component_1 = __webpack_require__(254);
var location_detail_view_component_1 = __webpack_require__(520);
exports.MODULE_ROUTES = [
    { path: 'dashboard', component: home_component_1.HomeComponent, canActivate: [can_activate_authguard_1.CanActivateAuthGuard] },
    { path: 'joblist', component: joblist_component_1.JobListComponent, canActivate: [can_activate_authguard_1.CanActivateAuthGuard] },
    { path: 'employeeStatus', component: employees_component_1.EmployeesComponent, canActivate: [can_activate_authguard_1.CanActivateAuthGuard] },
    { path: 'workTimeLine', component: work_time_line_component_1.EmployeesWorkTimeLineComponent, canActivate: [can_activate_authguard_1.CanActivateAuthGuard] },
    { path: 'reports', component: reports_component_1.ReportsComponent, canActivate: [can_activate_authguard_1.CanActivateAuthGuard] },
    { path: 'notifications', component: notifications_component_1.NotificationsComponent, canActivate: [can_activate_authguard_1.CanActivateAuthGuard] },
    { path: '', redirectTo: 'dashboard', pathMatch: 'full', canActivate: [can_activate_authguard_1.CanActivateAuthGuard] },
    { path: 'login', component: login_component_1.LoginComponent },
    { path: 'category', component: category_grade_component_1.CategoryComponent },
    { path: 'basicTree', component: basictree_component_1.BasicTreeComponent, canActivate: [can_activate_authguard_1.CanActivateAuthGuard] },
    { path: 'accessControl', component: accessControl_component_1.AccessControlComponent, canActivate: [can_activate_authguard_1.CanActivateAuthGuard] },
    { path: 'jsTree', component: book_component_1.BookComponent, canActivate: [can_activate_authguard_1.CanActivateAuthGuard] },
    { path: 'jobStatus', component: job_status_component_1.JobStatusComponent, canActivate: [can_activate_authguard_1.CanActivateAuthGuard] },
    { path: 'employeeProfiles', component: employee_profiles_component_1.EmployeeProfilesComponent, canActivate: [can_activate_authguard_1.CanActivateAuthGuard] },
    { path: 'employeeProfile', component: employee_profile_component_1.EmployeeProfileComponent, canActivate: [can_activate_authguard_1.CanActivateAuthGuard] },
    { path: 'skill', component: skill_component_1.SkillComponent, canActivate: [can_activate_authguard_1.CanActivateAuthGuard] },
    { path: 'unit', component: unit_component_1.UnitComponent, canActivate: [can_activate_authguard_1.CanActivateAuthGuard] },
    { path: 'employeeStatusConfig', component: employee_status_config_component_1.EmployeeStatusConfigComponent, canActivate: [can_activate_authguard_1.CanActivateAuthGuard] },
    { path: 'location', component: location_component_1.LocationComponent, canActivate: [can_activate_authguard_1.CanActivateAuthGuard] },
    { path: 'emptypeconfig', component: employee_type_component_1.EmployeeTypesComponent, canActivate: [can_activate_authguard_1.CanActivateAuthGuard] },
    { path: 'addjob', component: job_component_1.JobComponent, canActivate: [can_activate_authguard_1.CanActivateAuthGuard] },
    { path: 'emergency', component: emergencyJob_component_1.EmergencyJobComponent, canActivate: [can_activate_authguard_1.CanActivateAuthGuard] },
    { path: 'locationDetailView', component: location_detail_view_component_1.LocationDetailView, canActivate: [can_activate_authguard_1.CanActivateAuthGuard] }
];
exports.MODULE_COMPONENTS = [
    home_component_1.HomeComponent,
    reports_component_1.ReportsComponent,
    employees_component_1.EmployeesComponent,
    joblist_component_1.JobListComponent,
    notifications_component_1.NotificationsComponent,
    category_grade_component_1.CategoryComponent,
    accessControl_component_1.AccessControlComponent,
    book_component_1.BookComponent,
    basictree_component_1.BasicTreeComponent,
    work_time_line_component_1.EmployeesWorkTimeLineComponent,
    job_status_component_1.JobStatusComponent,
    employee_profiles_component_1.EmployeeProfilesComponent,
    employee_profile_component_1.EmployeeProfileComponent,
    skill_component_1.SkillComponent,
    unit_component_1.UnitComponent,
    location_component_1.LocationComponent,
    employee_status_config_component_1.EmployeeStatusConfigComponent,
    job_component_1.JobComponent,
    emergencyJob_component_1.EmergencyJobComponent,
    gridCustom_component_1.CustomGrid,
    location_detail_view_component_1.LocationDetailView
];
exports.DIALOG_COMPONENTS = [
    confirmation_dialog_1.ConfirmationDialog,
    category_grade_component_2.GradeDialog,
    accessControl_component_2.RoleDialog,
    accessControl_component_2.RoleDialog,
    skill_dialog_component_1.SkillDialog,
    employee_status_dialog_1.EmployeeStatusDialog,
    jobType_dialog_component_1.JobTypeDialog,
    emp_type_dialog_1.EmpTypeDialog,
    emp_skills_dialog_component_1.SkillTreeDialog
];
//# sourceMappingURL=dashboard.routes.js.map

/***/ }),

/***/ 505:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(1);
var name_renderer_component_1 = __webpack_require__(88);
var table_component_1 = __webpack_require__(31);
var employee_action_component_1 = __webpack_require__(165);
var employee_profile_component_1 = __webpack_require__(252);
var emp_profile_service_1 = __webpack_require__(115);
var common_http_service_1 = __webpack_require__(22);
var http_request_metadata_1 = __webpack_require__(27);
var confirmation_dialog_1 = __webpack_require__(41);
var material_1 = __webpack_require__(16);
var custom_validation_service_1 = __webpack_require__(17);
var EmployeeProfilesComponent = (function () {
    function EmployeeProfilesComponent(empProfileService, httpCustomService, dialog, customValidation) {
        this.empProfileService = empProfileService;
        this.httpCustomService = httpCustomService;
        this.dialog = dialog;
        this.customValidation = customValidation;
        this.agPaginationAuto = false;
    }
    EmployeeProfilesComponent.prototype.ngOnInit = function () {
        this.httpCustomService.commonHttpRequest("getAllEmpProfiles", "employee/getallempprofiles", null, this.createTable.bind(this), null, http_request_metadata_1.HttpType.GET);
        var columnDefs = [
            {
                headerName: "Employee",
                field: "name",
                cellRendererFramework: name_renderer_component_1.NameRendererComponent,
                width: 120
            },
            {
                headerName: "Emp ID",
                field: "empId",
                width: 60
            },
            {
                headerName: "Type",
                field: "type",
                width: 60
            },
            {
                headerName: "Unit",
                field: "unit",
                width: 80
            },
            {
                headerName: "Grade",
                field: "grade",
                width: 80
            },
            {
                headerName: "Role",
                field: "role",
                width: 80
            },
            {
                headerName: "Mobile",
                field: "mobile",
                width: 100
            },
            {
                headerName: "Action",
                cellRendererFramework: employee_action_component_1.EmployeeProfileActionRendererComponent,
                width: 40
            },
        ];
        var data = [];
        this.tableComponent.agPaginationAuto = this.agPaginationAuto;
        this.tableComponent.setColumnDef(columnDefs);
        this.tableComponent.setGridOptionContext({ parentComponent: this });
        this.tableComponent.setData(data);
    };
    EmployeeProfilesComponent.prototype.setEmployeeDetails = function (profileId) {
        this.empProfileService.setProfileId(profileId);
        // this.httpCustomService.commonHttpRequest("getempprofiledetail_1", "employee/getempprofiledetail", data, this.fillData.bind(this), null, HttpType.GET);
    };
    EmployeeProfilesComponent.prototype.createTable = function (result) {
        var data = [];
        var profileList = result.profileList;
        for (var _i = 0, profileList_1 = profileList; _i < profileList_1.length; _i++) {
            var obj = profileList_1[_i];
            var profile = { name: obj.name, id: obj.id, empId: obj.employeeId, type: obj.employeeType.name, unit: obj.unit.name, grade: obj.grade.name, role: obj.role.roleName, mobile: obj.mobileNo, action: { url: "employeeProfile?id=" + obj.id } };
            data.push(profile);
        }
        this.tableComponent.updateData(data);
    };
    EmployeeProfilesComponent.prototype.deactivateEmployee = function (profileId) {
        var _this = this;
        var dialogRef = this.dialog.open(confirmation_dialog_1.ConfirmationDialog);
        dialogRef.disableClose = true;
        dialogRef.componentInstance.title = "Remove Employee";
        dialogRef.componentInstance.message = "Are you sure you want to remove this employee?";
        dialogRef.afterClosed().subscribe(function (data) {
            if (data) {
                var param = {};
                param["id"] = profileId;
                param["isCustomer"] = false;
                _this.httpCustomService.commonHttpRequest("removeEmployee_" + profileId, "employee/deactivateEmployee", param, _this.deactivesuccess.bind(_this), null, http_request_metadata_1.HttpType.GET);
            }
        });
    };
    EmployeeProfilesComponent.prototype.deactivesuccess = function (result) {
        // this.tableComponent();
    };
    return EmployeeProfilesComponent;
}());
__decorate([
    core_1.ViewChild(table_component_1.AgGridTableCustomComponent),
    __metadata("design:type", typeof (_a = typeof table_component_1.AgGridTableCustomComponent !== "undefined" && table_component_1.AgGridTableCustomComponent) === "function" && _a || Object)
], EmployeeProfilesComponent.prototype, "tableComponent", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], EmployeeProfilesComponent.prototype, "agPaginationAuto", void 0);
__decorate([
    core_1.ViewChild(employee_profile_component_1.EmployeeProfileComponent),
    __metadata("design:type", typeof (_b = typeof employee_profile_component_1.EmployeeProfileComponent !== "undefined" && employee_profile_component_1.EmployeeProfileComponent) === "function" && _b || Object)
], EmployeeProfilesComponent.prototype, "empComponent", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Number)
], EmployeeProfilesComponent.prototype, "profileId", void 0);
EmployeeProfilesComponent = __decorate([
    core_1.Component({
        selector: 'employee-profiles-cmp',
        template: __webpack_require__(680)
    }),
    __metadata("design:paramtypes", [typeof (_c = typeof emp_profile_service_1.EmployeeProfileService !== "undefined" && emp_profile_service_1.EmployeeProfileService) === "function" && _c || Object, typeof (_d = typeof common_http_service_1.HttpCustomService !== "undefined" && common_http_service_1.HttpCustomService) === "function" && _d || Object, typeof (_e = typeof material_1.MdDialog !== "undefined" && material_1.MdDialog) === "function" && _e || Object, typeof (_f = typeof custom_validation_service_1.CustomValidationService !== "undefined" && custom_validation_service_1.CustomValidationService) === "function" && _f || Object])
], EmployeeProfilesComponent);
exports.EmployeeProfilesComponent = EmployeeProfilesComponent;
var _a, _b, _c, _d, _e, _f;
//# sourceMappingURL=employee-profiles.component.js.map

/***/ }),

/***/ 506:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(1);
var name_renderer_component_1 = __webpack_require__(88);
var status_renderer_component_1 = __webpack_require__(119);
var action_renderer_component_1 = __webpack_require__(118);
var table_component_1 = __webpack_require__(31);
var router_1 = __webpack_require__(36);
var EmployeesComponent = (function () {
    function EmployeesComponent(route) {
        this.route = route;
        this.agPaginationAuto = false;
        this.isSummaryAvailable = "true";
        if (route.snapshot.url[0].path == "employeeStatus") {
            this.isSummaryAvailable = "true";
        }
        else {
            this.isSummaryAvailable = "false";
        }
    }
    EmployeesComponent.prototype.sucess = function (response) {
        console.log("Success Response : " + response);
    };
    EmployeesComponent.prototype.ngOnInit = function () {
        var columnDefs = [
            {
                headerName: "Employee",
                field: "name",
                cellRendererFramework: name_renderer_component_1.NameRendererComponent,
                width: 120
            },
            {
                headerName: "Status",
                field: "status",
                cellRendererFramework: status_renderer_component_1.StatusRendererComponent,
                width: 120
            },
            {
                headerName: "Duration",
                field: "duration",
                width: 40,
                cellStyle: { 'text-align': 'center' }
            },
            {
                headerName: "Location",
                field: "location",
                width: 80
            },
            {
                headerName: "Job Type",
                field: "jobType",
                width: 100
            },
            {
                headerName: "Destination",
                field: "destination",
                width: 100
            },
            {
                headerName: "Action",
                cellRendererFramework: action_renderer_component_1.ActionRendererComponent,
                width: 40
            },
        ];
        var data = [
            { name: 'Boontung Pongchandaj', status: { className: 'success', value: 'AVAILABLE' }, duration: '15:23', location: '2nd Floor', jobType: '', destination: '' },
            { name: 'Suda Tomson', status: { className: 'success', value: 'AVAILABLE' }, duration: '10:58', location: 'Inpatient', jobType: '', destination: '' },
            { name: 'Krit Bunnag', status: { className: 'danger', value: 'ON ROUTE' }, duration: '4:48', location: 'NICU', jobType: 'Waste Collection', destination: 'Ground Floor' },
            { name: 'Kacha Poonlarp', status: { className: 'danger', value: 'ON ROUTE' }, duration: '12:23', location: 'Outpatient', jobType: 'Patient Transfer', destination: 'Inpatient' },
            { name: 'Panthorn Montri', status: { className: 'danger', value: 'ON ROUTE' }, duration: '8:34', location: 'Emergency', jobType: 'Moving Equipment', destination: 'ICU' },
            { name: 'Brielle Williamson', status: { className: 'danger', value: 'ON ROUTE' }, duration: '7:24', location: 'ICU', jobType: 'Deceased Patient', destination: 'Inpatient' },
            { name: 'Charoen Chansiri', status: { className: 'danger', value: 'ON ROUTE' }, duration: '12:28', location: 'Ground Floor', jobType: 'Patient Transfer', destination: 'DTU' },
            { name: 'Thanat Hitapot', status: { className: 'default', value: 'BREAK' }, duration: '1:12', location: 'Rest Room', jobType: '', destination: '' },
            { name: 'Kraisee Thanom', status: { className: 'default', value: 'BREAK' }, duration: '2:23', location: 'Rest Room', jobType: '', destination: '' },
            { name: 'Kantsom Kwaigno', status: { className: 'default', value: 'BREAK' }, duration: '11:23', location: 'Rest Room', jobType: '', destination: '' },
            { name: 'Nirawit Santisakul', status: { className: 'default', value: 'BREAK' }, duration: '23:29', location: 'Rest Room', jobType: '', destination: '' },
            { name: 'Barinot Charoenkul', status: { className: 'default', value: 'BREAK' }, duration: '11:11', location: 'Rest Room', jobType: '', destination: '' },
            { name: 'Thipok Prinya', status: { className: 'default', value: 'BREAK' }, duration: '12:12', location: 'Rest Room', jobType: '', destination: '' },
            { name: 'Praman Sangwit', status: { className: 'default', value: 'BREAK' }, duration: '2:23', location: 'Rest Room', jobType: '', destination: '' },
            { name: 'Pawornruj Lam', status: { className: 'default', value: 'BREAK' }, duration: '4:34', location: 'Rest Room', jobType: '', destination: '' },
            { name: 'Mahidol Shimma', status: { className: 'default', value: 'BREAK' }, duration: '5:34', location: 'Rest Room', jobType: '', destination: '' },
            { name: 'Airi Satou', status: { className: 'default', value: 'BREAK' }, duration: '6:35', location: 'Tokiyo', jobType: '', destination: '' },
            { name: 'Airi Satou', status: { className: 'default', value: 'BREAK' }, duration: '21:23', location: 'Tokiyo', jobType: '', destination: '' },
            { name: 'Airi Satou', status: { className: 'default', value: 'BREAK' }, duration: '14:56', location: 'Tokiyo', jobType: '', destination: '' },
            { name: 'Airi Satou', status: { className: 'default', value: 'BREAK' }, duration: '1:23', location: 'Tokiyo', jobType: '', destination: '' },
            { name: 'Airi Satou', status: { className: 'default', value: 'BREAK' }, duration: '2:34', location: 'Tokiyo', jobType: '', destination: '' },
            { name: 'Airi Satou', status: { className: 'default', value: 'BREAK' }, duration: '1:23', location: 'Tokiyo', jobType: '', destination: '' },
            { name: 'Airi Satou', status: { className: 'default', value: 'BREAK' }, duration: '2:23', location: 'Tokiyo', jobType: '', destination: '' },
            { name: 'Airi Satou', status: { className: 'default', value: 'BREAK' }, duration: '2:23', location: 'Tokiyo', jobType: '', destination: '' },
            { name: 'Airi Satou', status: { className: 'default', value: 'BREAK' }, duration: '2:23', location: 'Tokiyo', jobType: '', destination: '' },
            { name: 'Airi Satou', status: { className: 'default', value: 'BREAK' }, duration: '2:23', location: 'Tokiyo', jobType: '', destination: '' },
            { name: 'Airi Satou Last', status: { className: 'default', value: 'BREAK' }, duration: '2:23', location: 'Tokiyo', jobType: '', destination: '' },
            { name: 'Airi Satou', status: { className: 'default', value: 'BREAK' }, duration: '2:23', location: 'Tokiyo', jobType: '', destination: '' },
            { name: 'Airi Satou', status: { className: 'default', value: 'BREAK' }, duration: '2:23', location: 'Tokiyo', jobType: '', destination: '' },
            { name: 'Airi Satou 31', status: { className: 'default', value: 'BREAK' }, duration: '2:23', location: 'Tokiyo', jobType: '', destination: '' }
        ];
        this.tableComponent.agPaginationAuto = this.agPaginationAuto;
        this.tableComponent.setColumnDef(columnDefs);
        this.tableComponent.agHeader = false;
        this.tableComponent.setData(data);
    };
    return EmployeesComponent;
}());
__decorate([
    core_1.ViewChild(table_component_1.AgGridTableCustomComponent),
    __metadata("design:type", typeof (_a = typeof table_component_1.AgGridTableCustomComponent !== "undefined" && table_component_1.AgGridTableCustomComponent) === "function" && _a || Object)
], EmployeesComponent.prototype, "tableComponent", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], EmployeesComponent.prototype, "agPaginationAuto", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], EmployeesComponent.prototype, "isSummaryAvailable", void 0);
EmployeesComponent = __decorate([
    core_1.Component({
        selector: 'employees-cmp',
        template: __webpack_require__(681)
    }),
    __metadata("design:paramtypes", [typeof (_b = typeof router_1.ActivatedRoute !== "undefined" && router_1.ActivatedRoute) === "function" && _b || Object])
], EmployeesComponent);
exports.EmployeesComponent = EmployeesComponent;
var _a, _b;
//# sourceMappingURL=employees.component.js.map

/***/ }),

/***/ 507:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(1);
var name_renderer_component_1 = __webpack_require__(88);
var work_time_line_renderer_component_1 = __webpack_require__(277);
var utilization_renderer_component_1 = __webpack_require__(276);
var table_component_1 = __webpack_require__(31);
var EmployeesWorkTimeLineComponent = (function () {
    function EmployeesWorkTimeLineComponent() {
        this.agPaginationAuto = false;
    }
    EmployeesWorkTimeLineComponent.prototype.ngOnInit = function () {
        var columnDefs = [
            {
                headerName: "Employee",
                field: "name",
                cellRendererFramework: name_renderer_component_1.NameRendererComponent,
                width: 120
            },
            {
                headerName: "0",
                field: "hours.0",
                cellRendererFramework: work_time_line_renderer_component_1.WorkTimeLineRendererComponent,
                width: 20,
                cellClass: ['cellRender']
            },
            {
                headerName: "1",
                field: "hours.1",
                cellRendererFramework: work_time_line_renderer_component_1.WorkTimeLineRendererComponent,
                width: 20,
                cellClass: ['cellRender']
            },
            {
                headerName: "2",
                field: "hours.2",
                cellRendererFramework: work_time_line_renderer_component_1.WorkTimeLineRendererComponent,
                width: 20,
                cellClass: ['cellRender']
            },
            {
                headerName: "3",
                field: "hours.3",
                cellRendererFramework: work_time_line_renderer_component_1.WorkTimeLineRendererComponent,
                width: 20,
                cellClass: ['cellRender']
            },
            {
                headerName: "4",
                field: "hours.4",
                cellRendererFramework: work_time_line_renderer_component_1.WorkTimeLineRendererComponent,
                width: 20,
                cellClass: ['cellRender']
            },
            {
                headerName: "5",
                field: "hours.5",
                cellRendererFramework: work_time_line_renderer_component_1.WorkTimeLineRendererComponent,
                width: 20,
                cellClass: ['cellRender']
            },
            {
                headerName: "6",
                field: "hours.6",
                cellRendererFramework: work_time_line_renderer_component_1.WorkTimeLineRendererComponent,
                width: 20,
                cellClass: ['cellRender']
            },
            {
                headerName: "7",
                field: "hours.7",
                cellRendererFramework: work_time_line_renderer_component_1.WorkTimeLineRendererComponent,
                width: 20,
                cellClass: ['cellRender']
            },
            {
                headerName: "8",
                field: "hours.8",
                cellRendererFramework: work_time_line_renderer_component_1.WorkTimeLineRendererComponent,
                width: 20,
                cellClass: ['cellRender']
            },
            {
                headerName: "9",
                field: "hours.9",
                cellRendererFramework: work_time_line_renderer_component_1.WorkTimeLineRendererComponent,
                width: 20,
                cellClass: ['cellRender']
            },
            {
                headerName: "10",
                field: "hours.10",
                cellRendererFramework: work_time_line_renderer_component_1.WorkTimeLineRendererComponent,
                width: 20,
                cellClass: ['cellRender']
            },
            {
                headerName: "11",
                field: "hours.11",
                cellRendererFramework: work_time_line_renderer_component_1.WorkTimeLineRendererComponent,
                width: 20,
                cellClass: ['cellRender']
            },
            {
                headerName: "12",
                field: "hours.12",
                cellRendererFramework: work_time_line_renderer_component_1.WorkTimeLineRendererComponent,
                width: 20,
                cellClass: ['cellRender']
            },
            {
                headerName: "13",
                field: "hours.13",
                cellRendererFramework: work_time_line_renderer_component_1.WorkTimeLineRendererComponent,
                width: 20,
                cellClass: ['cellRender']
            },
            {
                headerName: "14",
                field: "hours.14",
                cellRendererFramework: work_time_line_renderer_component_1.WorkTimeLineRendererComponent,
                width: 20,
                cellClass: ['cellRender']
            },
            {
                headerName: "15",
                field: "hours.15",
                cellRendererFramework: work_time_line_renderer_component_1.WorkTimeLineRendererComponent,
                width: 20,
                cellClass: ['cellRender']
            },
            {
                headerName: "16",
                field: "hours.16",
                cellRendererFramework: work_time_line_renderer_component_1.WorkTimeLineRendererComponent,
                width: 20,
                cellClass: ['cellRender']
            },
            {
                headerName: "17",
                field: "hours.17",
                cellRendererFramework: work_time_line_renderer_component_1.WorkTimeLineRendererComponent,
                width: 20,
                cellClass: ['cellRender']
            },
            {
                headerName: "18",
                field: "hours.18",
                cellRendererFramework: work_time_line_renderer_component_1.WorkTimeLineRendererComponent,
                width: 20,
                cellClass: ['cellRender']
            },
            {
                headerName: "19",
                field: "hours.19",
                cellRendererFramework: work_time_line_renderer_component_1.WorkTimeLineRendererComponent,
                width: 20,
                cellClass: ['cellRender']
            },
            {
                headerName: "20",
                field: "hours.20",
                cellRendererFramework: work_time_line_renderer_component_1.WorkTimeLineRendererComponent,
                width: 20,
                cellClass: ['cellRender']
            },
            {
                headerName: "21",
                field: "hours.21",
                cellRendererFramework: work_time_line_renderer_component_1.WorkTimeLineRendererComponent,
                width: 20,
                cellClass: ['cellRender']
            },
            {
                headerName: "22",
                field: "hours.22",
                cellRendererFramework: work_time_line_renderer_component_1.WorkTimeLineRendererComponent,
                width: 20,
                cellClass: ['cellRender']
            },
            {
                headerName: "23",
                field: "hours.23",
                cellRendererFramework: work_time_line_renderer_component_1.WorkTimeLineRendererComponent,
                width: 20,
                cellClass: ['cellRender']
            },
            {
                headerName: "",
                field: "",
                width: 20
            },
            {
                headerName: "Utilization",
                field: "utilization",
                cellRendererFramework: utilization_renderer_component_1.UtilizationRendererComponent,
                width: 60
            },
        ];
        var data = [
            { name: 'Boontung Pongchandaj', hours: { 0: ['danger', 'danger', 'danger', 'success'], 1: ['success', 'success', 'success', 'success'], 2: ['success', 'success', 'danger', 'danger'], 3: ['success', 'success', 'danger', 'danger'], 4: ['danger', 'danger', 'danger', 'success'], 5: ['none', 'none', 'none', 'none'], 6: ['none', 'none', 'none', 'none'], 7: ['none', 'none', 'none', 'none'], 8: ['none', 'none', 'none', 'none'], 9: ['none', 'none', 'none', 'none'], 10: ['none', 'none', 'none', 'none'], 11: ['none', 'none', 'none', 'none'], 12: ['none', 'none', 'none', 'none'], 13: ['none', 'none', 'none', 'none'], 14: ['none', 'none', 'none', 'none'], 15: ['none', 'none', 'none', 'none'], 16: ['none', 'none', 'none', 'none'], 17: ['none', 'none', 'none', 'none'], 18: ['none', 'none', 'none', 'none'], 19: ['none', 'none', 'none', 'none'], 20: ['none', 'none', 'none', 'none'], 21: ['none', 'none', 'none', 'none'], 22: ['none', 'none', 'none', 'none'], 23: ['none', 'none', 'none', 'none'] }, utilization: '79' },
            { name: 'Suda Tomson', hours: { 0: ['none', 'none', 'none', 'none'], 1: ['none', 'none', 'none', 'none'], 2: ['success', 'success', 'danger', 'danger'], 3: ['success', 'success', 'danger', 'danger'], 4: ['danger', 'danger', 'danger', 'success'], 5: ['success', 'success', 'danger', 'danger'], 6: ['danger', 'danger', 'danger', 'success'], 7: ['success', 'success', 'danger', 'danger'], 8: ['danger', 'danger', 'danger', 'success'], 9: ['success', 'success', 'danger', 'danger'], 10: ['danger', 'danger', 'danger', 'success'], 11: ['none', 'none', 'none', 'none'], 12: ['none', 'none', 'none', 'none'], 13: ['none', 'none', 'none', 'none'], 14: ['none', 'none', 'none', 'none'], 15: ['none', 'none', 'none', 'none'], 16: ['none', 'none', 'none', 'none'], 17: ['none', 'none', 'none', 'none'], 18: ['none', 'none', 'none', 'none'], 19: ['none', 'none', 'none', 'none'], 20: ['none', 'none', 'none', 'none'], 21: ['none', 'none', 'none', 'none'], 22: ['none', 'none', 'none', 'none'], 23: ['none', 'none', 'none', 'none'] }, utilization: '68' },
            { name: 'Krit Bunnag', hours: { 0: ['none', 'none', 'none', 'none'], 1: ['none', 'none', 'none', 'none'], 2: ['none', 'none', 'none', 'none'], 3: ['none', 'none', 'none', 'none'], 4: ['danger', 'danger', 'danger', 'success'], 5: ['success', 'success', 'danger', 'danger'], 6: ['danger', 'danger', 'danger', 'success'], 7: ['success', 'success', 'danger', 'danger'], 8: ['danger', 'danger', 'danger', 'success'], 9: ['success', 'success', 'danger', 'danger'], 10: ['danger', 'danger', 'danger', 'success'], 11: ['success', 'success', 'danger', 'danger'], 12: ['danger', 'danger', 'danger', 'success'], 13: ['none', 'none', 'none', 'none'], 14: ['none', 'none', 'none', 'none'], 15: ['none', 'none', 'none', 'none'], 16: ['none', 'none', 'none', 'none'], 17: ['none', 'none', 'none', 'none'], 18: ['none', 'none', 'none', 'none'], 19: ['none', 'none', 'none', 'none'], 20: ['none', 'none', 'none', 'none'], 21: ['none', 'none', 'none', 'none'], 22: ['none', 'none', 'none', 'none'], 23: ['none', 'none', 'none', 'none'] }, utilization: '88' },
            { name: 'Kacha Poonlarp', hours: { 0: ['none', 'none', 'none', 'none'], 1: ['none', 'none', 'none', 'none'], 2: ['none', 'none', 'none', 'none'], 3: ['success', 'success', 'danger', 'danger'], 4: ['danger', 'danger', 'danger', 'success'], 5: ['success', 'success', 'danger', 'danger'], 6: ['danger', 'danger', 'danger', 'success'], 7: ['success', 'success', 'danger', 'danger'], 8: ['danger', 'danger', 'danger', 'success'], 9: ['success', 'success', 'danger', 'danger'], 10: ['danger', 'danger', 'danger', 'success'], 11: ['success', 'success', 'danger', 'danger'], 12: ['danger', 'danger', 'danger', 'success'], 13: ['none', 'none', 'none', 'none'], 14: ['none', 'none', 'none', 'none'], 15: ['none', 'none', 'none', 'none'], 16: ['none', 'none', 'none', 'none'], 17: ['none', 'none', 'none', 'none'], 18: ['none', 'none', 'none', 'none'], 19: ['none', 'none', 'none', 'none'], 20: ['none', 'none', 'none', 'none'], 21: ['none', 'none', 'none', 'none'], 22: ['none', 'none', 'none', 'none'], 23: ['none', 'none', 'none', 'none'] }, utilization: '34' },
            { name: 'Panthorn Montri', hours: { 0: ['none', 'none', 'none', 'none'], 1: ['none', 'none', 'none', 'none'], 2: ['none', 'none', 'none', 'none'], 3: ['success', 'success', 'danger', 'danger'], 4: ['danger', 'danger', 'danger', 'success'], 5: ['success', 'success', 'danger', 'danger'], 6: ['danger', 'danger', 'danger', 'success'], 7: ['success', 'success', 'danger', 'danger'], 8: ['danger', 'danger', 'danger', 'success'], 9: ['success', 'success', 'danger', 'danger'], 10: ['danger', 'danger', 'danger', 'success'], 11: ['success', 'success', 'danger', 'danger'], 12: ['danger', 'danger', 'danger', 'success'], 13: ['none', 'none', 'none', 'none'], 14: ['none', 'none', 'none', 'none'], 15: ['none', 'none', 'none', 'none'], 16: ['none', 'none', 'none', 'none'], 17: ['none', 'none', 'none', 'none'], 18: ['none', 'none', 'none', 'none'], 19: ['none', 'none', 'none', 'none'], 20: ['none', 'none', 'none', 'none'], 21: ['none', 'none', 'none', 'none'], 22: ['none', 'none', 'none', 'none'], 23: ['none', 'none', 'none', 'none'] }, utilization: '56' },
            { name: 'Brielle Williamson', hours: { 0: ['none', 'none', 'none', 'none'], 1: ['none', 'none', 'none', 'none'], 2: ['none', 'none', 'none', 'none'], 3: ['none', 'none', 'none', 'none'], 4: ['none', 'none', 'none', 'none'], 5: ['none', 'none', 'none', 'none'], 6: ['none', 'none', 'none', 'none'], 7: ['none', 'none', 'none', 'none'], 8: ['danger', 'danger', 'danger', 'success'], 9: ['success', 'success', 'danger', 'danger'], 10: ['danger', 'danger', 'danger', 'success'], 11: ['success', 'success', 'danger', 'danger'], 12: ['danger', 'danger', 'danger', 'success'], 13: ['success', 'success', 'danger', 'danger'], 14: ['none', 'none', 'none', 'none'], 15: ['none', 'none', 'none', 'none'], 16: ['none', 'none', 'none', 'none'], 17: ['none', 'none', 'none', 'none'], 18: ['none', 'none', 'none', 'none'], 19: ['none', 'none', 'none', 'none'], 20: ['none', 'none', 'none', 'none'], 21: ['none', 'none', 'none', 'none'], 22: ['none', 'none', 'none', 'none'], 23: ['none', 'none', 'none', 'none'] }, utilization: '34' },
            { name: 'Charoen Chansiri', hours: { 0: ['none', 'none', 'none', 'none'], 1: ['none', 'none', 'none', 'none'], 2: ['none', 'none', 'none', 'none'], 3: ['none', 'none', 'none', 'none'], 4: ['none', 'none', 'none', 'none'], 5: ['none', 'none', 'none', 'none'], 6: ['danger', 'danger', 'danger', 'success'], 7: ['success', 'success', 'danger', 'danger'], 8: ['danger', 'danger', 'danger', 'success'], 9: ['success', 'success', 'danger', 'danger'], 10: ['danger', 'danger', 'danger', 'success'], 11: ['success', 'success', 'danger', 'danger'], 12: ['danger', 'danger', 'danger', 'success'], 13: ['success', 'success', 'danger', 'danger'], 14: ['none', 'none', 'none', 'none'], 15: ['none', 'none', 'none', 'none'], 16: ['none', 'none', 'none', 'none'], 17: ['none', 'none', 'none', 'none'], 18: ['none', 'none', 'none', 'none'], 19: ['none', 'none', 'none', 'none'], 20: ['none', 'none', 'none', 'none'], 21: ['none', 'none', 'none', 'none'], 22: ['none', 'none', 'none', 'none'], 23: ['none', 'none', 'none', 'none'] }, utilization: '56' },
            { name: 'Thanat Hitapot', hours: { 0: ['none', 'none', 'none', 'none'], 1: ['none', 'none', 'none', 'none'], 2: ['none', 'none', 'none', 'none'], 3: ['none', 'none', 'none', 'none'], 4: ['none', 'none', 'none', 'none'], 5: ['none', 'none', 'none', 'none'], 6: ['danger', 'danger', 'danger', 'success'], 7: ['success', 'success', 'danger', 'danger'], 8: ['danger', 'danger', 'danger', 'success'], 9: ['success', 'success', 'danger', 'danger'], 10: ['danger', 'danger', 'danger', 'success'], 11: ['success', 'success', 'danger', 'danger'], 12: ['danger', 'danger', 'danger', 'success'], 13: ['success', 'success', 'danger', 'danger'], 14: ['none', 'none', 'none', 'none'], 15: ['none', 'none', 'none', 'none'], 16: ['none', 'none', 'none', 'none'], 17: ['none', 'none', 'none', 'none'], 18: ['none', 'none', 'none', 'none'], 19: ['none', 'none', 'none', 'none'], 20: ['none', 'none', 'none', 'none'], 21: ['none', 'none', 'none', 'none'], 22: ['none', 'none', 'none', 'none'], 23: ['none', 'none', 'none', 'none'] }, utilization: '67' },
            { name: 'Kraisee Thanom', hours: { 0: ['none', 'none', 'none', 'none'], 1: ['none', 'none', 'none', 'none'], 2: ['none', 'none', 'none', 'none'], 3: ['none', 'none', 'none', 'none'], 4: ['none', 'none', 'none', 'none'], 5: ['none', 'none', 'none', 'none'], 6: ['none', 'none', 'none', 'none'], 7: ['none', 'none', 'none', 'none'], 8: ['danger', 'danger', 'danger', 'success'], 9: ['success', 'success', 'danger', 'danger'], 10: ['danger', 'danger', 'danger', 'success'], 11: ['success', 'success', 'danger', 'danger'], 12: ['danger', 'danger', 'danger', 'success'], 13: ['success', 'success', 'danger', 'danger'], 14: ['danger', 'danger', 'danger', 'success'], 15: ['none', 'none', 'none', 'none'], 16: ['none', 'none', 'none', 'none'], 17: ['none', 'none', 'none', 'none'], 18: ['none', 'none', 'none', 'none'], 19: ['none', 'none', 'none', 'none'], 20: ['none', 'none', 'none', 'none'], 21: ['none', 'none', 'none', 'none'], 22: ['none', 'none', 'none', 'none'], 23: ['none', 'none', 'none', 'none'] }, utilization: '77' },
            { name: 'Kantsom Kwaigno', hours: { 0: ['none', 'none', 'none', 'none'], 1: ['none', 'none', 'none', 'none'], 2: ['none', 'none', 'none', 'none'], 3: ['none', 'none', 'none', 'none'], 4: ['none', 'none', 'none', 'none'], 5: ['none', 'none', 'none', 'none'], 6: ['danger', 'danger', 'danger', 'success'], 7: ['success', 'success', 'danger', 'danger'], 8: ['danger', 'danger', 'danger', 'success'], 9: ['success', 'success', 'danger', 'danger'], 10: ['danger', 'danger', 'danger', 'success'], 11: ['success', 'success', 'danger', 'danger'], 12: ['danger', 'danger', 'danger', 'success'], 13: ['success', 'success', 'danger', 'danger'], 14: ['danger', 'danger', 'danger', 'success'], 15: ['none', 'none', 'none', 'none'], 16: ['none', 'none', 'none', 'none'], 17: ['none', 'none', 'none', 'none'], 18: ['none', 'none', 'none', 'none'], 19: ['none', 'none', 'none', 'none'], 20: ['none', 'none', 'none', 'none'], 21: ['none', 'none', 'none', 'none'], 22: ['none', 'none', 'none', 'none'], 23: ['none', 'none', 'none', 'none'] }, utilization: '80' },
            { name: 'Nirawit Santisakul', hours: { 0: ['danger', 'danger', 'danger', 'success'], 1: ['danger', 'danger', 'danger', 'success'], 2: ['success', 'success', 'danger', 'danger'], 3: ['success', 'success', 'danger', 'danger'], 4: ['danger', 'danger', 'danger', 'success'], 5: ['success', 'success', 'danger', 'danger'], 6: ['danger', 'danger', 'danger', 'success'], 7: ['success', 'success', 'danger', 'danger'], 8: ['danger', 'danger', 'danger', 'success'], 9: ['success', 'success', 'danger', 'danger'], 10: ['danger', 'danger', 'danger', 'success'], 11: ['success', 'success', 'danger', 'danger'], 12: ['danger', 'danger', 'danger', 'success'], 13: ['success', 'success', 'danger', 'danger'], 14: ['danger', 'danger', 'danger', 'success'], 15: ['none', 'none', 'none', 'none'], 16: ['none', 'none', 'none', 'none'], 17: ['none', 'none', 'none', 'none'], 18: ['none', 'none', 'none', 'none'], 19: ['none', 'none', 'none', 'none'], 20: ['none', 'none', 'none', 'none'], 21: ['none', 'none', 'none', 'none'], 22: ['none', 'none', 'none', 'none'], 23: ['none', 'none', 'none', 'none'] }, utilization: '56' },
            { name: 'Barinot Charoenkul', hours: { 0: ['danger', 'danger', 'danger', 'success'], 1: ['danger', 'danger', 'danger', 'success'], 2: ['success', 'success', 'danger', 'danger'], 3: ['success', 'success', 'danger', 'danger'], 4: ['danger', 'danger', 'danger', 'success'], 5: ['success', 'success', 'danger', 'danger'], 6: ['danger', 'danger', 'danger', 'success'], 7: ['success', 'success', 'danger', 'danger'], 8: ['danger', 'danger', 'danger', 'success'], 9: ['success', 'success', 'danger', 'danger'], 10: ['danger', 'danger', 'danger', 'success'], 11: ['success', 'success', 'danger', 'danger'], 12: ['danger', 'danger', 'danger', 'success'], 13: ['success', 'success', 'danger', 'danger'], 14: ['danger', 'danger', 'danger', 'success'], 15: ['none', 'none', 'none', 'none'], 16: ['none', 'none', 'none', 'none'], 17: ['none', 'none', 'none', 'none'], 18: ['none', 'none', 'none', 'none'], 19: ['none', 'none', 'none', 'none'], 20: ['none', 'none', 'none', 'none'], 21: ['none', 'none', 'none', 'none'], 22: ['none', 'none', 'none', 'none'], 23: ['none', 'none', 'none', 'none'] }, utilization: '67' },
            { name: 'Thipok Prinya', hours: { 0: ['danger', 'danger', 'danger', 'success'], 1: ['danger', 'danger', 'danger', 'success'], 2: ['success', 'success', 'danger', 'danger'], 3: ['success', 'success', 'danger', 'danger'], 4: ['danger', 'danger', 'danger', 'success'], 5: ['success', 'success', 'danger', 'danger'], 6: ['danger', 'danger', 'danger', 'success'], 7: ['success', 'success', 'danger', 'danger'], 8: ['danger', 'danger', 'danger', 'success'], 9: ['success', 'success', 'danger', 'danger'], 10: ['danger', 'danger', 'danger', 'success'], 11: ['success', 'success', 'danger', 'danger'], 12: ['danger', 'danger', 'danger', 'success'], 13: ['success', 'success', 'danger', 'danger'], 14: ['danger', 'danger', 'danger', 'success'], 15: ['none', 'none', 'none', 'none'], 16: ['none', 'none', 'none', 'none'], 17: ['none', 'none', 'none', 'none'], 18: ['none', 'none', 'none', 'none'], 19: ['none', 'none', 'none', 'none'], 20: ['none', 'none', 'none', 'none'], 21: ['none', 'none', 'none', 'none'], 22: ['none', 'none', 'none', 'none'], 23: ['none', 'none', 'none', 'none'] }, utilization: '67' },
            { name: 'Airi Satou', hours: { 0: ['danger', 'danger', 'danger', 'success'], 1: ['danger', 'danger', 'danger', 'success'], 2: ['success', 'success', 'danger', 'danger'], 3: ['success', 'success', 'danger', 'danger'], 4: ['danger', 'danger', 'danger', 'success'], 5: ['success', 'success', 'danger', 'danger'], 6: ['danger', 'danger', 'danger', 'success'], 7: ['success', 'success', 'danger', 'danger'], 8: ['danger', 'danger', 'danger', 'success'], 9: ['success', 'success', 'danger', 'danger'], 10: ['danger', 'danger', 'danger', 'success'], 11: ['success', 'success', 'danger', 'danger'], 12: ['danger', 'danger', 'danger', 'success'], 13: ['success', 'success', 'danger', 'danger'], 14: ['danger', 'danger', 'danger', 'success'], 15: ['none', 'none', 'none', 'none'], 16: ['none', 'none', 'none', 'none'], 17: ['none', 'none', 'none', 'none'], 18: ['none', 'none', 'none', 'none'], 19: ['none', 'none', 'none', 'none'], 20: ['none', 'none', 'none', 'none'], 21: ['none', 'none', 'none', 'none'], 22: ['none', 'none', 'none', 'none'], 23: ['none', 'none', 'none', 'none'] }, utilization: '67' },
            { name: 'Airi Satou', hours: { 0: ['danger', 'danger', 'danger', 'success'], 1: ['danger', 'danger', 'danger', 'success'], 2: ['success', 'success', 'danger', 'danger'], 3: ['success', 'success', 'danger', 'danger'], 4: ['danger', 'danger', 'danger', 'success'], 5: ['success', 'success', 'danger', 'danger'], 6: ['danger', 'danger', 'danger', 'success'], 7: ['success', 'success', 'danger', 'danger'], 8: ['danger', 'danger', 'danger', 'success'], 9: ['success', 'success', 'danger', 'danger'], 10: ['danger', 'danger', 'danger', 'success'], 11: ['success', 'success', 'danger', 'danger'], 12: ['danger', 'danger', 'danger', 'success'], 13: ['success', 'success', 'danger', 'danger'], 14: ['danger', 'danger', 'danger', 'success'], 15: ['none', 'none', 'none', 'none'], 16: ['none', 'none', 'none', 'none'], 17: ['none', 'none', 'none', 'none'], 18: ['none', 'none', 'none', 'none'], 19: ['none', 'none', 'none', 'none'], 20: ['none', 'none', 'none', 'none'], 21: ['none', 'none', 'none', 'none'], 22: ['none', 'none', 'none', 'none'], 23: ['none', 'none', 'none', 'none'] }, utilization: '67' },
            { name: 'Airi Satou', hours: { 0: ['danger', 'danger', 'danger', 'success'], 1: ['danger', 'danger', 'danger', 'success'], 2: ['success', 'success', 'danger', 'danger'], 3: ['success', 'success', 'danger', 'danger'], 4: ['danger', 'danger', 'danger', 'success'], 5: ['success', 'success', 'danger', 'danger'], 6: ['danger', 'danger', 'danger', 'success'], 7: ['success', 'success', 'danger', 'danger'], 8: ['danger', 'danger', 'danger', 'success'], 9: ['success', 'success', 'danger', 'danger'], 10: ['danger', 'danger', 'danger', 'success'], 11: ['success', 'success', 'danger', 'danger'], 12: ['danger', 'danger', 'danger', 'success'], 13: ['success', 'success', 'danger', 'danger'], 14: ['danger', 'danger', 'danger', 'success'], 15: ['none', 'none', 'none', 'none'], 16: ['none', 'none', 'none', 'none'], 17: ['none', 'none', 'none', 'none'], 18: ['none', 'none', 'none', 'none'], 19: ['none', 'none', 'none', 'none'], 20: ['none', 'none', 'none', 'none'], 21: ['none', 'none', 'none', 'none'], 22: ['none', 'none', 'none', 'none'], 23: ['none', 'none', 'none', 'none'] }, utilization: '67' },
            { name: 'Airi Satou', hours: { 0: ['danger', 'danger', 'danger', 'success'], 1: ['danger', 'danger', 'danger', 'success'], 2: ['success', 'success', 'danger', 'danger'], 3: ['success', 'success', 'danger', 'danger'], 4: ['danger', 'danger', 'danger', 'success'], 5: ['success', 'success', 'danger', 'danger'], 6: ['danger', 'danger', 'danger', 'success'], 7: ['success', 'success', 'danger', 'danger'], 8: ['danger', 'danger', 'danger', 'success'], 9: ['success', 'success', 'danger', 'danger'], 10: ['danger', 'danger', 'danger', 'success'], 11: ['success', 'success', 'danger', 'danger'], 12: ['danger', 'danger', 'danger', 'success'], 13: ['success', 'success', 'danger', 'danger'], 14: ['danger', 'danger', 'danger', 'success'], 15: ['none', 'none', 'none', 'none'], 16: ['none', 'none', 'none', 'none'], 17: ['none', 'none', 'none', 'none'], 18: ['none', 'none', 'none', 'none'], 19: ['none', 'none', 'none', 'none'], 20: ['none', 'none', 'none', 'none'], 21: ['none', 'none', 'none', 'none'], 22: ['none', 'none', 'none', 'none'], 23: ['none', 'none', 'none', 'none'] }, utilization: '67' },
            { name: 'Airi Satou', hours: { 0: ['danger', 'danger', 'danger', 'success'], 1: ['danger', 'danger', 'danger', 'success'], 2: ['success', 'success', 'danger', 'danger'], 3: ['success', 'success', 'danger', 'danger'], 4: ['danger', 'danger', 'danger', 'success'], 5: ['success', 'success', 'danger', 'danger'], 6: ['danger', 'danger', 'danger', 'success'], 7: ['success', 'success', 'danger', 'danger'], 8: ['danger', 'danger', 'danger', 'success'], 9: ['success', 'success', 'danger', 'danger'], 10: ['danger', 'danger', 'danger', 'success'], 11: ['success', 'success', 'danger', 'danger'], 12: ['danger', 'danger', 'danger', 'success'], 13: ['success', 'success', 'danger', 'danger'], 14: ['danger', 'danger', 'danger', 'success'], 15: ['none', 'none', 'none', 'none'], 16: ['none', 'none', 'none', 'none'], 17: ['none', 'none', 'none', 'none'], 18: ['none', 'none', 'none', 'none'], 19: ['none', 'none', 'none', 'none'], 20: ['none', 'none', 'none', 'none'], 21: ['none', 'none', 'none', 'none'], 22: ['none', 'none', 'none', 'none'], 23: ['none', 'none', 'none', 'none'] }, utilization: '67' },
            { name: 'Airi Satou', hours: { 0: ['danger', 'danger', 'danger', 'success'], 1: ['danger', 'danger', 'danger', 'success'], 2: ['success', 'success', 'danger', 'danger'], 3: ['success', 'success', 'danger', 'danger'], 4: ['danger', 'danger', 'danger', 'success'], 5: ['success', 'success', 'danger', 'danger'], 6: ['danger', 'danger', 'danger', 'success'], 7: ['success', 'success', 'danger', 'danger'], 8: ['danger', 'danger', 'danger', 'success'], 9: ['success', 'success', 'danger', 'danger'], 10: ['danger', 'danger', 'danger', 'success'], 11: ['success', 'success', 'danger', 'danger'], 12: ['danger', 'danger', 'danger', 'success'], 13: ['success', 'success', 'danger', 'danger'], 14: ['danger', 'danger', 'danger', 'success'], 15: ['none', 'none', 'none', 'none'], 16: ['none', 'none', 'none', 'none'], 17: ['none', 'none', 'none', 'none'], 18: ['none', 'none', 'none', 'none'], 19: ['none', 'none', 'none', 'none'], 20: ['none', 'none', 'none', 'none'], 21: ['none', 'none', 'none', 'none'], 22: ['none', 'none', 'none', 'none'], 23: ['none', 'none', 'none', 'none'] }, utilization: '67' },
            { name: 'Airi Satou', hours: { 0: ['danger', 'danger', 'danger', 'success'], 1: ['danger', 'danger', 'danger', 'success'], 2: ['success', 'success', 'danger', 'danger'], 3: ['success', 'success', 'danger', 'danger'], 4: ['danger', 'danger', 'danger', 'success'], 5: ['success', 'success', 'danger', 'danger'], 6: ['danger', 'danger', 'danger', 'success'], 7: ['success', 'success', 'danger', 'danger'], 8: ['danger', 'danger', 'danger', 'success'], 9: ['success', 'success', 'danger', 'danger'], 10: ['danger', 'danger', 'danger', 'success'], 11: ['success', 'success', 'danger', 'danger'], 12: ['danger', 'danger', 'danger', 'success'], 13: ['success', 'success', 'danger', 'danger'], 14: ['danger', 'danger', 'danger', 'success'], 15: ['none', 'none', 'none', 'none'], 16: ['none', 'none', 'none', 'none'], 17: ['none', 'none', 'none', 'none'], 18: ['none', 'none', 'none', 'none'], 19: ['none', 'none', 'none', 'none'], 20: ['none', 'none', 'none', 'none'], 21: ['none', 'none', 'none', 'none'], 22: ['none', 'none', 'none', 'none'], 23: ['none', 'none', 'none', 'none'] }, utilization: '67' },
            { name: 'Airi Satou', hours: { 0: ['danger', 'danger', 'danger', 'success'], 1: ['danger', 'danger', 'danger', 'success'], 2: ['success', 'success', 'danger', 'danger'], 3: ['success', 'success', 'danger', 'danger'], 4: ['danger', 'danger', 'danger', 'success'], 5: ['success', 'success', 'danger', 'danger'], 6: ['danger', 'danger', 'danger', 'success'], 7: ['success', 'success', 'danger', 'danger'], 8: ['danger', 'danger', 'danger', 'success'], 9: ['success', 'success', 'danger', 'danger'], 10: ['danger', 'danger', 'danger', 'success'], 11: ['success', 'success', 'danger', 'danger'], 12: ['danger', 'danger', 'danger', 'success'], 13: ['success', 'success', 'danger', 'danger'], 14: ['danger', 'danger', 'danger', 'success'], 15: ['none', 'none', 'none', 'none'], 16: ['none', 'none', 'none', 'none'], 17: ['none', 'none', 'none', 'none'], 18: ['none', 'none', 'none', 'none'], 19: ['none', 'none', 'none', 'none'], 20: ['none', 'none', 'none', 'none'], 21: ['none', 'none', 'none', 'none'], 22: ['none', 'none', 'none', 'none'], 23: ['none', 'none', 'none', 'none'] }, utilization: '67' },
            { name: 'Airi Satou', hours: { 0: ['danger', 'danger', 'danger', 'success'], 1: ['danger', 'danger', 'danger', 'success'], 2: ['success', 'success', 'danger', 'danger'], 3: ['success', 'success', 'danger', 'danger'], 4: ['danger', 'danger', 'danger', 'success'], 5: ['success', 'success', 'danger', 'danger'], 6: ['danger', 'danger', 'danger', 'success'], 7: ['success', 'success', 'danger', 'danger'], 8: ['danger', 'danger', 'danger', 'success'], 9: ['success', 'success', 'danger', 'danger'], 10: ['danger', 'danger', 'danger', 'success'], 11: ['success', 'success', 'danger', 'danger'], 12: ['danger', 'danger', 'danger', 'success'], 13: ['success', 'success', 'danger', 'danger'], 14: ['danger', 'danger', 'danger', 'success'], 15: ['none', 'none', 'none', 'none'], 16: ['none', 'none', 'none', 'none'], 17: ['none', 'none', 'none', 'none'], 18: ['none', 'none', 'none', 'none'], 19: ['none', 'none', 'none', 'none'], 20: ['none', 'none', 'none', 'none'], 21: ['none', 'none', 'none', 'none'], 22: ['none', 'none', 'none', 'none'], 23: ['none', 'none', 'none', 'none'] }, utilization: '67' },
            { name: 'Airi Satou', hours: { 0: ['danger', 'danger', 'danger', 'success'], 1: ['danger', 'danger', 'danger', 'success'], 2: ['success', 'success', 'danger', 'danger'], 3: ['success', 'success', 'danger', 'danger'], 4: ['danger', 'danger', 'danger', 'success'], 5: ['success', 'success', 'danger', 'danger'], 6: ['danger', 'danger', 'danger', 'success'], 7: ['success', 'success', 'danger', 'danger'], 8: ['danger', 'danger', 'danger', 'success'], 9: ['success', 'success', 'danger', 'danger'], 10: ['danger', 'danger', 'danger', 'success'], 11: ['success', 'success', 'danger', 'danger'], 12: ['danger', 'danger', 'danger', 'success'], 13: ['success', 'success', 'danger', 'danger'], 14: ['danger', 'danger', 'danger', 'success'], 15: ['none', 'none', 'none', 'none'], 16: ['none', 'none', 'none', 'none'], 17: ['none', 'none', 'none', 'none'], 18: ['none', 'none', 'none', 'none'], 19: ['none', 'none', 'none', 'none'], 20: ['none', 'none', 'none', 'none'], 21: ['none', 'none', 'none', 'none'], 22: ['none', 'none', 'none', 'none'], 23: ['none', 'none', 'none', 'none'] }, utilization: '67' },
            { name: 'Airi Satou', hours: { 0: ['danger', 'danger', 'danger', 'success'], 1: ['danger', 'danger', 'danger', 'success'], 2: ['success', 'success', 'danger', 'danger'], 3: ['success', 'success', 'danger', 'danger'], 4: ['danger', 'danger', 'danger', 'success'], 5: ['success', 'success', 'danger', 'danger'], 6: ['danger', 'danger', 'danger', 'success'], 7: ['success', 'success', 'danger', 'danger'], 8: ['danger', 'danger', 'danger', 'success'], 9: ['success', 'success', 'danger', 'danger'], 10: ['danger', 'danger', 'danger', 'success'], 11: ['success', 'success', 'danger', 'danger'], 12: ['danger', 'danger', 'danger', 'success'], 13: ['success', 'success', 'danger', 'danger'], 14: ['danger', 'danger', 'danger', 'success'], 15: ['none', 'none', 'none', 'none'], 16: ['none', 'none', 'none', 'none'], 17: ['none', 'none', 'none', 'none'], 18: ['none', 'none', 'none', 'none'], 19: ['none', 'none', 'none', 'none'], 20: ['none', 'none', 'none', 'none'], 21: ['none', 'none', 'none', 'none'], 22: ['none', 'none', 'none', 'none'], 23: ['none', 'none', 'none', 'none'] }, utilization: '67' },
            { name: 'Airi Satou', hours: { 0: ['danger', 'danger', 'danger', 'success'], 1: ['danger', 'danger', 'danger', 'success'], 2: ['success', 'success', 'danger', 'danger'], 3: ['success', 'success', 'danger', 'danger'], 4: ['danger', 'danger', 'danger', 'success'], 5: ['success', 'success', 'danger', 'danger'], 6: ['danger', 'danger', 'danger', 'success'], 7: ['success', 'success', 'danger', 'danger'], 8: ['danger', 'danger', 'danger', 'success'], 9: ['success', 'success', 'danger', 'danger'], 10: ['danger', 'danger', 'danger', 'success'], 11: ['success', 'success', 'danger', 'danger'], 12: ['danger', 'danger', 'danger', 'success'], 13: ['success', 'success', 'danger', 'danger'], 14: ['danger', 'danger', 'danger', 'success'], 15: ['none', 'none', 'none', 'none'], 16: ['none', 'none', 'none', 'none'], 17: ['none', 'none', 'none', 'none'], 18: ['none', 'none', 'none', 'none'], 19: ['none', 'none', 'none', 'none'], 20: ['none', 'none', 'none', 'none'], 21: ['none', 'none', 'none', 'none'], 22: ['none', 'none', 'none', 'none'], 23: ['none', 'none', 'none', 'none'] }, utilization: '67' },
            { name: 'Airi Satou', hours: { 0: ['danger', 'danger', 'danger', 'success'], 1: ['danger', 'danger', 'danger', 'success'], 2: ['success', 'success', 'danger', 'danger'], 3: ['success', 'success', 'danger', 'danger'], 4: ['danger', 'danger', 'danger', 'success'], 5: ['success', 'success', 'danger', 'danger'], 6: ['danger', 'danger', 'danger', 'success'], 7: ['success', 'success', 'danger', 'danger'], 8: ['danger', 'danger', 'danger', 'success'], 9: ['success', 'success', 'danger', 'danger'], 10: ['danger', 'danger', 'danger', 'success'], 11: ['success', 'success', 'danger', 'danger'], 12: ['danger', 'danger', 'danger', 'success'], 13: ['success', 'success', 'danger', 'danger'], 14: ['danger', 'danger', 'danger', 'success'], 15: ['none', 'none', 'none', 'none'], 16: ['none', 'none', 'none', 'none'], 17: ['none', 'none', 'none', 'none'], 18: ['none', 'none', 'none', 'none'], 19: ['none', 'none', 'none', 'none'], 20: ['none', 'none', 'none', 'none'], 21: ['none', 'none', 'none', 'none'], 22: ['none', 'none', 'none', 'none'], 23: ['none', 'none', 'none', 'none'] }, utilization: '67' },
            { name: 'Airi Satou', hours: { 0: ['danger', 'danger', 'danger', 'success'], 1: ['danger', 'danger', 'danger', 'success'], 2: ['success', 'success', 'danger', 'danger'], 3: ['success', 'success', 'danger', 'danger'], 4: ['danger', 'danger', 'danger', 'success'], 5: ['success', 'success', 'danger', 'danger'], 6: ['danger', 'danger', 'danger', 'success'], 7: ['success', 'success', 'danger', 'danger'], 8: ['danger', 'danger', 'danger', 'success'], 9: ['success', 'success', 'danger', 'danger'], 10: ['danger', 'danger', 'danger', 'success'], 11: ['success', 'success', 'danger', 'danger'], 12: ['danger', 'danger', 'danger', 'success'], 13: ['success', 'success', 'danger', 'danger'], 14: ['danger', 'danger', 'danger', 'success'], 15: ['none', 'none', 'none', 'none'], 16: ['none', 'none', 'none', 'none'], 17: ['none', 'none', 'none', 'none'], 18: ['none', 'none', 'none', 'none'], 19: ['none', 'none', 'none', 'none'], 20: ['none', 'none', 'none', 'none'], 21: ['none', 'none', 'none', 'none'], 22: ['none', 'none', 'none', 'none'], 23: ['none', 'none', 'none', 'none'] }, utilization: '67' },
            { name: 'Airi Satou', hours: { 0: ['danger', 'danger', 'danger', 'success'], 1: ['danger', 'danger', 'danger', 'success'], 2: ['success', 'success', 'danger', 'danger'], 3: ['success', 'success', 'danger', 'danger'], 4: ['danger', 'danger', 'danger', 'success'], 5: ['success', 'success', 'danger', 'danger'], 6: ['danger', 'danger', 'danger', 'success'], 7: ['success', 'success', 'danger', 'danger'], 8: ['danger', 'danger', 'danger', 'success'], 9: ['success', 'success', 'danger', 'danger'], 10: ['danger', 'danger', 'danger', 'success'], 11: ['success', 'success', 'danger', 'danger'], 12: ['danger', 'danger', 'danger', 'success'], 13: ['success', 'success', 'danger', 'danger'], 14: ['danger', 'danger', 'danger', 'success'], 15: ['none', 'none', 'none', 'none'], 16: ['none', 'none', 'none', 'none'], 17: ['none', 'none', 'none', 'none'], 18: ['none', 'none', 'none', 'none'], 19: ['none', 'none', 'none', 'none'], 20: ['none', 'none', 'none', 'none'], 21: ['none', 'none', 'none', 'none'], 22: ['none', 'none', 'none', 'none'], 23: ['none', 'none', 'none', 'none'] }, utilization: '67' },
            { name: 'Airi Satou', hours: { 0: ['danger', 'danger', 'danger', 'success'], 1: ['danger', 'danger', 'danger', 'success'], 2: ['success', 'success', 'danger', 'danger'], 3: ['success', 'success', 'danger', 'danger'], 4: ['danger', 'danger', 'danger', 'success'], 5: ['success', 'success', 'danger', 'danger'], 6: ['danger', 'danger', 'danger', 'success'], 7: ['success', 'success', 'danger', 'danger'], 8: ['danger', 'danger', 'danger', 'success'], 9: ['success', 'success', 'danger', 'danger'], 10: ['danger', 'danger', 'danger', 'success'], 11: ['success', 'success', 'danger', 'danger'], 12: ['danger', 'danger', 'danger', 'success'], 13: ['success', 'success', 'danger', 'danger'], 14: ['danger', 'danger', 'danger', 'success'], 15: ['none', 'none', 'none', 'none'], 16: ['none', 'none', 'none', 'none'], 17: ['none', 'none', 'none', 'none'], 18: ['none', 'none', 'none', 'none'], 19: ['none', 'none', 'none', 'none'], 20: ['none', 'none', 'none', 'none'], 21: ['none', 'none', 'none', 'none'], 22: ['none', 'none', 'none', 'none'], 23: ['none', 'none', 'none', 'none'] }, utilization: '67' },
            { name: 'Airi Satou', hours: { 0: ['danger', 'danger', 'danger', 'success'], 1: ['danger', 'danger', 'danger', 'success'], 2: ['success', 'success', 'danger', 'danger'], 3: ['success', 'success', 'danger', 'danger'], 4: ['danger', 'danger', 'danger', 'success'], 5: ['success', 'success', 'danger', 'danger'], 6: ['danger', 'danger', 'danger', 'success'], 7: ['success', 'success', 'danger', 'danger'], 8: ['danger', 'danger', 'danger', 'success'], 9: ['success', 'success', 'danger', 'danger'], 10: ['danger', 'danger', 'danger', 'success'], 11: ['success', 'success', 'danger', 'danger'], 12: ['danger', 'danger', 'danger', 'success'], 13: ['success', 'success', 'danger', 'danger'], 14: ['danger', 'danger', 'danger', 'success'], 15: ['none', 'none', 'none', 'none'], 16: ['none', 'none', 'none', 'none'], 17: ['none', 'none', 'none', 'none'], 18: ['none', 'none', 'none', 'none'], 19: ['none', 'none', 'none', 'none'], 20: ['none', 'none', 'none', 'none'], 21: ['none', 'none', 'none', 'none'], 22: ['none', 'none', 'none', 'none'], 23: ['none', 'none', 'none', 'none'] }, utilization: '67' }
        ];
        this.tableComponent.agPaginationAuto = this.agPaginationAuto;
        this.tableComponent.setColumnDef(columnDefs);
        this.tableComponent.setData(data);
    };
    return EmployeesWorkTimeLineComponent;
}());
__decorate([
    core_1.ViewChild(table_component_1.AgGridTableCustomComponent),
    __metadata("design:type", typeof (_a = typeof table_component_1.AgGridTableCustomComponent !== "undefined" && table_component_1.AgGridTableCustomComponent) === "function" && _a || Object)
], EmployeesWorkTimeLineComponent.prototype, "tableComponent", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], EmployeesWorkTimeLineComponent.prototype, "agPaginationAuto", void 0);
EmployeesWorkTimeLineComponent = __decorate([
    core_1.Component({
        selector: 'work-time-line-cmp',
        template: __webpack_require__(684)
    }),
    __metadata("design:paramtypes", [])
], EmployeesWorkTimeLineComponent);
exports.EmployeesWorkTimeLineComponent = EmployeesWorkTimeLineComponent;
var _a;
//# sourceMappingURL=work-time-line.component.js.map

/***/ }),

/***/ 508:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(1);
var HomeComponent = (function () {
    function HomeComponent() {
    }
    HomeComponent.prototype.ngOnInit = function () {
        return;
    };
    return HomeComponent;
}());
HomeComponent = __decorate([
    core_1.Component({
        selector: 'home-cmp',
        template: __webpack_require__(685)
    })
], HomeComponent);
exports.HomeComponent = HomeComponent;
//# sourceMappingURL=home.component.js.map

/***/ }),

/***/ 509:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(1);
var forms_1 = __webpack_require__(12);
var gridCustom_component_1 = __webpack_require__(254);
/**
 * Created by Sachithra on 2/27/2018.
 */
var EmergencyJobComponent = (function () {
    function EmergencyJobComponent(_fb) {
        this._fb = _fb;
        this.emergencyJobForm = this._fb.group({
            type: this.type,
            id: this.id,
            location: this.location,
            comment: this.comment,
            alertType: this.alertType,
            numOfStaff: this.numOfStaff
        });
    }
    EmergencyJobComponent.prototype.ngOnInit = function () {
        document.getElementById("customGrid").classList.add("hide");
        this.list = [
            { "time": "12", "name": "James", "currArea": { "area": "Cafetaria", "location": "Main Building" }, "destArea": { "area": "Operation Theatre", "location": "Main Building" }, "isJobAssigned": "false", "jobId": "123-4560E", "status": "1" },
            { "time": "10", "name": "Johnathan", "currArea": { "area": "Dispensary", "location": "Building A" }, "destArea": { "area": "Emergency Room", "location": "Clinic A" }, "isJobAssigned": "true", "jobId": "123-4561E", "status": "2" },
            { "time": "9", "name": "Andrew", "currArea": { "area": "Emergency Room", "location": "Main Building" }, "destArea": { "area": "ICU", "location": "Clinic B" }, "isJobAssigned": "true", "jobId": "123-4562E", "status": "3" },
            { "time": "5", "name": "Abraham", "currArea": { "area": "Cafetaria", "location": "Main Building" }, "destArea": { "area": "Dispensary", "location": "Building A" }, "isJobAssigned": "false", "jobId": "123-4563E", "status": "4" },
            { "time": "12", "name": "Ethan", "currArea": { "area": "Cafetaria", "location": "Main Building" }, "destArea": { "area": "Ward 10", "location": "Clinic A" }, "isJobAssigned": "true", "jobId": "123-4564E", "status": "2" },
            { "time": "10", "name": "Cortez", "currArea": { "area": "ICU", "location": "Building A" }, "destArea": { "area": "Ward 11", "location": "Clinic B" }, "isJobAssigned": "true", "jobId": "123-4565E", "status": "3" },
            { "time": "10", "name": "Eldrige", "currArea": { "area": "Dispensary", "location": "Building A" }, "destArea": { "area": "ICU", "location": "Building A" }, "isJobAssigned": "false", "jobId": "123-4566E", "status": "1" },
            { "time": "15", "name": "Bert", "currArea": { "area": "Pharmacy", "location": "" }, "destArea": { "area": "Emergency Room", "location": "Main Building" }, "isJobAssigned": "true", "jobId": "123-4567E", "status": "3" },
            { "time": "12", "name": "Augustus", "currArea": { "area": "ICU", "location": "Building A" }, "destArea": { "area": "Operation Theatre", "location": "Main Building" }, "isJobAssigned": "true", "jobId": "123-4568E", "status": "2" },
            { "time": "10", "name": "Timothy", "currArea": { "area": "Dispensary", "location": "Building A" }, "destArea": { "area": "Emergency Room", "location": "Clinic B" }, "isJobAssigned": "false", "jobId": "123-4569E", "status": "1" },
            { "time": "10", "name": "Milton", "currArea": { "area": "Cafetaria", "location": "Main Building" }, "destArea": { "area": "Dispensary", "location": "Clinic B" }, "isJobAssigned": "true", "jobId": "123-4570E", "status": "3" },
            { "time": "12", "name": "Buford", "currArea": { "area": "Cafetaria", "location": "Main Building" }, "destArea": { "area": "Ward 12", "location": "Main Building" }, "isJobAssigned": "false", "jobId": "123-4571E", "status": "4" },
            { "time": "10", "name": "Elliott", "currArea": { "area": "Dispensary", "location": "Building A" }, "destArea": { "area": "Ward 11", "location": "Clinic A" }, "isJobAssigned": "false", "jobId": "123-4572E", "status": "1" },
            { "time": "10", "name": "Luther", "currArea": { "area": "Emergency Room", "location": "Main Building" }, "destArea": { "area": "ICU", "location": "Building A" }, "isJobAssigned": "true", "jobId": "123-4573E", "status": "2" }
        ];
        //this.customGrid.setGridList(list);
    };
    EmergencyJobComponent.prototype.changeBtn = function () {
        var btn = document.getElementsByName("btn");
        var headerDiv = document.getElementById("responseDivHeader");
        var customGrid = document.getElementById("customGrid");
        var element = btn[0];
        var type = element.getAttribute("data-type");
        if (type == "send") {
            element.innerHTML = "Stop The Alert";
            headerDiv.innerHTML = "Responded Staff";
            element.setAttribute("data-type", "cancel");
            document.getElementById("noGrid").classList.add("hide");
            document.getElementById("customGrid").classList.remove("hide");
        }
        else {
            element.innerHTML = "Send Alert";
            headerDiv.innerHTML = "Staff Responses";
            element.setAttribute("data-type", "send");
            document.getElementById("noGrid").classList.remove("hide");
            document.getElementById("customGrid").classList.add("hide");
        }
    };
    return EmergencyJobComponent;
}());
__decorate([
    core_1.ViewChild(gridCustom_component_1.CustomGrid),
    __metadata("design:type", typeof (_a = typeof gridCustom_component_1.CustomGrid !== "undefined" && gridCustom_component_1.CustomGrid) === "function" && _a || Object)
], EmergencyJobComponent.prototype, "customGrid", void 0);
EmergencyJobComponent = __decorate([
    core_1.Component({
        selector: "emergency-Job-cmp",
        template: __webpack_require__(686)
    }),
    __metadata("design:paramtypes", [typeof (_b = typeof forms_1.FormBuilder !== "undefined" && forms_1.FormBuilder) === "function" && _b || Object])
], EmergencyJobComponent);
exports.EmergencyJobComponent = EmergencyJobComponent;
var JobDetail = (function () {
    function JobDetail() {
    }
    return JobDetail;
}());
exports.JobDetail = JobDetail;
var Location = (function () {
    function Location() {
    }
    return Location;
}());
exports.Location = Location;
var _a, _b;
//# sourceMappingURL=emergencyJob.component.js.map

/***/ }),

/***/ 510:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Created by CSI on 2/19/2018.
 */

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(1);
var forms_1 = __webpack_require__(12);
var common_http_service_1 = __webpack_require__(22);
var http_request_metadata_1 = __webpack_require__(27);
var JobComponent = (function () {
    function JobComponent(_fb, httpCustomService) {
        this._fb = _fb;
        this.httpCustomService = httpCustomService;
        this.date = new Date();
        this.settings = {
            bigBanner: true,
            timePicker: true,
            format: 'dd-MM-yyyy h:mm a',
            defaultOpen: false
        };
        this.httpCustomService.commonHttpRequest("getCategoryDropDownData", "employee/getallemptypes", null, this.generateCategoryDropDown.bind(this), null, http_request_metadata_1.HttpType.GET);
        this.httpCustomService.commonHttpRequest("getJobTypeDropDownData", "jobtype/getalljobtypes", null, this.generateJobTypeDropDown.bind(this), null, http_request_metadata_1.HttpType.GET);
    }
    JobComponent.prototype.ngOnInit = function () {
        this.addJobForm = this._fb.group({
            id: [this.id],
            category: this.category,
            jobType: this.jobType,
            numOfStaff: this.numOfStaff,
            currLocation: this.currLocation,
            currFloor: this.currFloor,
            currArea: this.currArea,
            destLocation: this.destLocation,
            destFloor: this.destFloor,
            destArea: this.destArea,
            isPreSchedule: this.isPreSchedule,
            date: this.date,
            remark: this.remark,
            patientName: this.patientName,
            patientId: this.patientId,
            gender: this.gender,
            age: this.age,
            requestorName: this.requestorName,
            requestorContact: this.requestorContact,
        });
    };
    JobComponent.prototype.generateCategoryDropDown = function (result) {
        this.empTypeList = result.empTypes;
    };
    JobComponent.prototype.generateJobTypeDropDown = function (result) {
        this.jobTypeList = result.jobTypes;
    };
    return JobComponent;
}());
JobComponent = __decorate([
    core_1.Component({
        selector: 'addjob-cmp',
        template: __webpack_require__(688)
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof forms_1.FormBuilder !== "undefined" && forms_1.FormBuilder) === "function" && _a || Object, typeof (_b = typeof common_http_service_1.HttpCustomService !== "undefined" && common_http_service_1.HttpCustomService) === "function" && _b || Object])
], JobComponent);
exports.JobComponent = JobComponent;
var _a, _b;
//# sourceMappingURL=job.component.js.map

/***/ }),

/***/ 511:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(1);
var status_renderer_component_1 = __webpack_require__(119);
var action_renderer_component_1 = __webpack_require__(118);
var duration_renderer_component_1 = __webpack_require__(173);
var table_component_1 = __webpack_require__(31);
var custom_validation_service_1 = __webpack_require__(17);
var router_1 = __webpack_require__(36);
var JobListComponent = (function () {
    function JobListComponent(customValidation, route) {
        this.customValidation = customValidation;
        this.route = route;
        this.agPaginationAuto = false;
        this.isSummaryAvailable = "true";
        //this.jobListTableComponent.agPaginationAuto = this.agPaginationAuto;
        var i = 0;
        if (route.snapshot.url[0].path == "joblist") {
            this.isSummaryAvailable = "true";
        }
        else {
            this.isSummaryAvailable = "false";
        }
    }
    JobListComponent.prototype.ngOnInit = function () {
        var columnDefs = [
            {
                headerName: "Job ID",
                field: "jobId",
                width: 80
            },
            {
                headerName: "Job Type",
                field: "jobType",
                width: 100
            },
            {
                headerName: "Porter Name",
                field: "porterName",
                width: 80
            },
            {
                headerName: "From",
                field: "location",
                width: 80
            },
            {
                headerName: "Destination",
                field: "destination",
                width: 80
            },
            {
                headerName: "Req.Time",
                field: "reqTime",
                width: 60
            },
            {
                headerName: "Status",
                field: "status",
                cellRendererFramework: status_renderer_component_1.StatusRendererComponent,
                width: 190
            },
            {
                headerName: "Started Time",
                field: "startTime",
                width: 50
            },
            {
                headerName: "Priority",
                field: "priority",
                width: 60
            },
            {
                headerName: "Duration",
                field: "duration",
                cellRendererFramework: duration_renderer_component_1.DurationRendererComponent,
                width: 40,
                cellStyle: { 'text-align': 'center' }
            },
            {
                headerName: "Action",
                field: "action",
                cellRendererFramework: action_renderer_component_1.ActionRendererComponent,
                width: 40
            },
        ];
        var rowData = [
            {
                jobId: '0000048',
                status: { className: 'danger', value: 'PENDING' },
                duration: { className: 'default', value: '12:35' },
                location: 'NICU',
                jobType: 'Waste Collection',
                destination: 'GARBAGE ROOM',
                reqTime: '12:50:00',
                action: { url: "jobStatus" },
                porterName: "Abraham",
                startTime: "",
                priority: "Urgent"
            },
            {
                jobId: '0000054',
                status: { className: 'danger', value: 'PENDING' },
                duration: { className: 'danger', value: '16:28' },
                location: 'NICU',
                jobType: 'Patient Transfer',
                destination: 'GROUND FLOOR',
                reqTime: '12:53:00',
                action: { url: "jobStatus" },
                porterName: "Ethan",
                startTime: "",
                priority: "Urgent"
            },
            {
                jobId: '0000055',
                status: { className: 'danger', value: 'PENDING' },
                duration: { className: 'danger', value: '20:23' },
                location: 'CCU',
                jobType: 'Moving Equipment',
                destination: 'ICU',
                reqTime: '12:58:00',
                action: { url: "jobStatus" },
                porterName: "Cortez",
                startTime: "",
                priority: "Urgent"
            },
            {
                jobId: '0000045',
                status: { className: 'success', value: 'IN PROGRESS' },
                duration: { className: 'danger', value: '15:45' },
                location: 'ICU',
                jobType: 'Patient Transfer',
                destination: 'INPATIENT',
                reqTime: '12:45:00',
                action: { url: "jobStatus" },
                porterName: "James",
                startTime: "12:48:00",
                priority: "Urgent"
            },
            {
                jobId: '0000046',
                status: { className: 'success', value: 'IN PROGRESS' },
                duration: { className: 'default', value: '10:15' },
                location: 'EMERGENCY',
                jobType: 'Patient Transfer',
                destination: 'INPATIENT',
                reqTime: '12:35:00',
                action: { url: "jobStatus" },
                porterName: "Johnathan",
                startTime: "12:37:00",
                priority: "Urgent"
            },
            {
                jobId: '0000056',
                status: { className: 'success', value: 'IN PROGRESS' },
                duration: { className: 'default', value: '10:00' },
                location: 'EMERGENCY',
                jobType: 'Deceased Patient',
                destination: 'DTU',
                reqTime: '13:10:00',
                action: { url: "jobStatus" },
                porterName: "Eldridge",
                startTime: "13:12:00",
                priority: "Urgent"
            },
            {
                jobId: '0000057',
                status: { className: 'success', value: 'IN PROGRESS' },
                duration: { className: 'danger', value: '19:15' },
                location: 'OUTPATIENT',
                jobType: 'Patient Transfer',
                destination: 'CCU',
                reqTime: '12:15:00',
                action: { url: "jobStatus" },
                porterName: "Bert",
                startTime: "12:18:00",
                priority: "Urgent"
            },
            {
                jobId: '0000058',
                status: { className: 'success', value: 'IN PROGRESS' },
                duration: { className: 'default', value: '13:40' },
                location: 'INPATIENT',
                jobType: 'Patient Transfer',
                destination: 'GROUND FLOOR',
                reqTime: '12:30:00',
                action: { url: "jobStatus" },
                porterName: "Augustus",
                startTime: "12:35:00",
                priority: "Urgent"
            },
            {
                jobId: '0000059',
                status: { className: 'default', value: 'PRE-SCHEDULED' },
                duration: { className: 'default', value: '00:00' },
                location: 'ICU',
                jobType: 'Patient Transfer',
                destination: 'NICU',
                reqTime: '16:45:00',
                action: { url: "jobStatus" },
                porterName: "Andrew",
                startTime: "",
                priority: "Urgent"
            },
            {
                jobId: '0000060',
                status: { className: 'default', value: 'PRE-SCHEDULED' },
                duration: { className: 'default', value: '00:00' },
                location: 'ICU',
                jobType: 'Patient Transfer',
                destination: 'INPATIENT',
                reqTime: '17:00:00',
                action: { url: "jobStatus" },
                porterName: "Timothy",
                startTime: "",
                priority: "Urgent"
            },
            {
                jobId: '0000061',
                status: { className: 'default', value: 'PRE-SCHEDULED' },
                duration: { className: 'default', value: '00.00' },
                location: 'Tokiyo',
                jobType: 'Patient Transfer',
                destination: 'San Francisco',
                reqTime: '12:45:00',
                action: { url: "jobStatus" },
                porterName: "Milton",
                startTime: "",
                priority: "Urgent"
            },
            {
                jobId: '0000062',
                status: { className: 'default', value: 'PRE-SCHEDULED' },
                duration: { className: 'default', value: '00.00' },
                location: 'Tokiyo',
                jobType: 'Patient Transfer',
                destination: 'San Francisco',
                reqTime: '12:45:00',
                action: { url: "jobStatus" },
                porterName: "Buford",
                startTime: "",
                priority: "Urgent"
            },
            {
                jobId: '0000063',
                status: { className: 'default', value: 'PRE-SCHEDULED' },
                duration: { className: 'default', value: '00.00' },
                location: 'Tokiyo',
                jobType: 'Patient Transfer',
                destination: 'San Francisco',
                reqTime: '12:45:00',
                action: { url: "jobStatus" },
                porterName: "Elliott",
                startTime: "",
                priority: "Urgent"
            },
            {
                jobId: '0000064',
                status: { className: 'default', value: 'PRE-SCHEDULED' },
                duration: { className: 'default', value: '00.00' },
                location: 'Tokiyo',
                jobType: 'Patient Transfer',
                destination: 'San Francisco',
                reqTime: '12:45:00',
                action: { url: "jobStatus" },
                porterName: "Luther",
                startTime: "",
                priority: "Urgent"
            },
            {
                jobId: '0000065',
                status: { className: 'default', value: 'PRE-SCHEDULED' },
                duration: { className: 'default', value: '00.00' },
                location: 'Tokiyo',
                jobType: 'Patient Transfer',
                destination: 'San Francisco',
                reqTime: '12:45:00',
                action: { url: "jobStatus" },
                porterName: "Larry",
                startTime: "",
                priority: "Urgent"
            },
            {
                jobId: '0000066',
                status: { className: 'default', value: 'PRE-SCHEDULED' },
                duration: { className: 'default', value: '00.00' },
                location: 'Tokiyo',
                jobType: 'Patient Transfer',
                destination: 'San Francisco',
                reqTime: '12:45:00',
                action: { url: "jobStatus" },
                porterName: "Mose",
                startTime: "",
                priority: "Urgent"
            },
            {
                jobId: '0000067',
                status: { className: 'default', value: 'PRE-SCHEDULED' },
                duration: { className: 'default', value: '00.00' },
                location: 'Tokiyo',
                jobType: 'Patient Transfer',
                destination: 'San Francisco',
                reqTime: '12:45:00',
                action: { url: "jobStatus" },
                porterName: "Jewel",
                startTime: "",
                priority: "Urgent"
            },
            {
                jobId: '0000068',
                status: { className: 'default', value: 'PRE-SCHEDULED' },
                duration: { className: 'default', value: '00.00' },
                location: 'Tokiyo',
                jobType: 'Patient Transfer',
                destination: 'San Francisco',
                reqTime: '12:45:00',
                action: { url: "jobStatus" },
                porterName: "Kennith",
                startTime: "",
                priority: "Urgent"
            },
            {
                jobId: '0000069',
                status: { className: 'default', value: 'PRE-SCHEDULED' },
                duration: { className: 'default', value: '00.00' },
                location: 'Tokiyo',
                jobType: 'Patient Transfer',
                destination: 'San Francisco',
                reqTime: '12:45:00',
                action: { url: "jobStatus" },
                porterName: "Amos",
                startTime: "",
                priority: "Urgent"
            },
            {
                jobId: '0000070',
                status: { className: 'default', value: 'PRE-SCHEDULED' },
                duration: { className: 'default', value: '00.00' },
                location: 'Tokiyo',
                jobType: 'Patient Transfer',
                destination: 'San Francisco',
                reqTime: '12:45:00',
                action: { url: "jobStatus" },
                porterName: "Dwayne",
                startTime: "",
                priority: "Urgent"
            },
            {
                jobId: '0000071',
                status: { className: 'default', value: 'PRE-SCHEDULED' },
                duration: { className: 'default', value: '00.00' },
                location: 'Tokiyo',
                jobType: 'Patient Transfer',
                destination: 'San Francisco',
                reqTime: '12:45:00',
                action: { url: "jobStatus" },
                porterName: "Dan",
                startTime: "",
                priority: "Urgent"
            },
            {
                jobId: '0000072',
                status: { className: 'default', value: 'PRE-SCHEDULED' },
                duration: { className: 'default', value: '00.00' },
                location: 'Tokiyo',
                jobType: 'Patient Transfer',
                destination: 'San Francisco',
                reqTime: '12:45:00',
                action: { url: "jobStatus" },
                porterName: "Marshall",
                startTime: "",
                priority: "Urgent"
            },
            {
                jobId: '0000073',
                status: { className: 'default', value: 'PRE-SCHEDULED' },
                duration: { className: 'default', value: '00.00' },
                location: 'Tokiyo',
                jobType: 'Patient Transfer',
                destination: 'San Francisco',
                reqTime: '12:45:00',
                action: { url: "jobStatus" },
                porterName: "Chester",
                startTime: "",
                priority: "Urgent"
            },
            {
                jobId: '0000074',
                status: { className: 'default', value: 'PRE-SCHEDULED' },
                duration: { className: 'default', value: '00.00' },
                location: 'Tokiyo',
                jobType: 'Patient Transfer',
                destination: 'San Francisco',
                reqTime: '12:45:00',
                action: { url: "jobStatus" },
                porterName: "Mike",
                startTime: "",
                priority: "Urgent"
            },
            {
                jobId: '0000075',
                status: { className: 'default', value: 'PRE-SCHEDULED' },
                duration: { className: 'default', value: '00.00' },
                location: 'Tokiyo',
                jobType: 'Patient Transfer',
                destination: 'San Francisco',
                reqTime: '12:45:00',
                action: { url: "jobStatus" },
                porterName: "Caleb",
                startTime: "",
                priority: "Urgent"
            },
            {
                jobId: '0000076',
                status: { className: 'default', value: 'PRE-SCHEDULED' },
                duration: { className: 'default', value: '00.00' },
                location: 'Tokiyo',
                jobType: 'Patient Transfer',
                destination: 'San Francisco',
                reqTime: '12:45:00',
                action: { url: "jobStatus" },
                porterName: "Lonnie",
                startTime: "",
                priority: "Urgent"
            },
            {
                jobId: '0000077',
                status: { className: 'default', value: 'PRE-SCHEDULED' },
                duration: { className: 'default', value: '00.00' },
                location: 'Tokiyo',
                jobType: 'Patient Transfer',
                destination: 'San Francisco',
                reqTime: '12:45:00',
                action: { url: "jobStatus" },
                porterName: "Adrian",
                startTime: "",
                priority: "Urgent"
            },
            {
                jobId: '0000078',
                status: { className: 'default', value: 'PRE-SCHEDULED' },
                duration: { className: 'default', value: '00.00' },
                location: 'Tokiyo',
                jobType: 'Patient Transfer',
                destination: 'San Francisco',
                reqTime: '12:45:00',
                action: { url: "jobStatus" },
                porterName: "Erin",
                startTime: "",
                priority: "Urgent"
            },
            {
                jobId: '0000079',
                status: { className: 'default', value: 'PRE-SCHEDULED' },
                duration: { className: 'default', value: '00.00' },
                location: 'Tokiyo',
                jobType: 'Patient Transfer',
                destination: 'San Francisco',
                reqTime: '12:45:00',
                action: { url: "jobStatus" },
                porterName: "Alan",
                startTime: "",
                priority: "Urgent"
            },
            {
                jobId: '0000080',
                status: { className: 'default', value: 'PRE-SCHEDULED' },
                duration: { className: 'default', value: '00.00' },
                location: 'Tokiyo',
                jobType: 'Patient Transfer',
                destination: 'San Francisco',
                reqTime: '12:45:00',
                action: { url: "jobStatus" },
                porterName: "Jerad",
                startTime: "",
                priority: "Urgent"
            }
        ];
        this.jobListTableComponent.agPaginationAuto = this.agPaginationAuto;
        this.jobListTableComponent.setColumnDef(columnDefs);
        this.jobListTableComponent.setData(rowData);
    };
    return JobListComponent;
}());
__decorate([
    core_1.ViewChild(table_component_1.AgGridTableCustomComponent),
    __metadata("design:type", typeof (_a = typeof table_component_1.AgGridTableCustomComponent !== "undefined" && table_component_1.AgGridTableCustomComponent) === "function" && _a || Object)
], JobListComponent.prototype, "jobListTableComponent", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], JobListComponent.prototype, "agPaginationAuto", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], JobListComponent.prototype, "isSummaryAvailable", void 0);
JobListComponent = __decorate([
    core_1.Component({
        selector: 'joblist-cmp',
        template: __webpack_require__(689)
    }),
    __metadata("design:paramtypes", [typeof (_b = typeof custom_validation_service_1.CustomValidationService !== "undefined" && custom_validation_service_1.CustomValidationService) === "function" && _b || Object, typeof (_c = typeof router_1.ActivatedRoute !== "undefined" && router_1.ActivatedRoute) === "function" && _c || Object])
], JobListComponent);
exports.JobListComponent = JobListComponent;
var _a, _b, _c;
//# sourceMappingURL=joblist.component.js.map

/***/ }),

/***/ 512:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(1);
var status_renderer_component_1 = __webpack_require__(119);
var action_renderer_component_1 = __webpack_require__(118);
var duration_renderer_component_1 = __webpack_require__(173);
var table_component_1 = __webpack_require__(31);
var JobStatusComponent = (function () {
    function JobStatusComponent() {
        this.agPaginationAuto = false;
        var i = 0;
    }
    JobStatusComponent.prototype.ngOnInit = function () {
        var columnDefs = [
            {
                headerName: "Job ID",
                field: "jobId",
                width: 80
            },
            {
                headerName: "Job Type",
                field: "jobType",
                width: 100
            },
            {
                headerName: "Start",
                field: "location",
                width: 80
            },
            {
                headerName: "End",
                field: "destination",
                width: 80
            },
            {
                headerName: "Req.Time",
                field: "reqTime",
                width: 60
            },
            {
                headerName: "Status",
                field: "status",
                cellRendererFramework: status_renderer_component_1.StatusRendererComponent,
                width: 120
            },
            {
                headerName: "Duration",
                field: "duration",
                cellRendererFramework: duration_renderer_component_1.DurationRendererComponent,
                width: 40,
                cellStyle: { 'text-align': 'center' }
            },
            {
                headerName: "Action",
                cellRendererFramework: action_renderer_component_1.ActionRendererComponent,
                width: 40
            },
        ];
        var rowData = [
            { jobId: 'OPD-6-23-145', status: { className: 'success', value: 'IN PROGRESS' }, duration: { className: 'danger', value: '15:23' }, location: 'Tokiyo', jobType: 'Patient Transfer', destination: 'San Francisco', reqTime: '12:45:02' },
            { jobId: 'OPD-6-23-145', status: { className: 'success', value: 'IN PROGRESS' }, duration: { className: 'danger', value: '15:23' }, location: 'London', jobType: 'Patient Transfer', destination: 'San Francisco', reqTime: '12:45:02' },
            { jobId: 'OPD-6-23-145', status: { className: 'danger', value: 'PENDING' }, duration: { className: 'default', value: '15:23' }, location: 'London', jobType: 'Waste Collection', destination: 'San Francisco', reqTime: '12:45:02' },
            { jobId: 'OPD-6-23-145', status: { className: 'danger', value: 'PENDING' }, duration: { className: 'default', value: '15:23' }, location: 'San Francisco', jobType: 'Patient Transfer', destination: 'London', reqTime: '12:45:02' },
            { jobId: 'OPD-6-23-145', status: { className: 'danger', value: 'PENDING' }, duration: { className: 'default', value: '15:23' }, location: 'New York', jobType: 'Moving Equipment', destination: 'San Francisco', reqTime: '12:45:02' },
            { jobId: 'OPD-6-23-145', status: { className: 'danger', value: 'PENDING' }, duration: { className: 'danger', value: '15:23' }, location: 'New York', jobType: 'Deceased Patient', destination: 'London', reqTime: '12:45:02' },
            { jobId: 'OPD-6-23-145', status: { className: 'default', value: 'SCHEDULE' }, duration: { className: 'danger', value: '15:23' }, location: 'Edinburgh', jobType: 'Patient Transfer', destination: 'San Francisco', reqTime: '12:45:02' },
            { jobId: 'OPD-6-23-145', status: { className: 'default', value: 'SCHEDULE' }, duration: { className: 'default', value: '15:23' }, location: 'Edinburgh', jobType: 'Patient Transfer', destination: 'San Francisco', reqTime: '12:45:02' },
            { jobId: 'OPD-6-23-145', status: { className: 'default', value: 'SCHEDULE' }, duration: { className: 'default', value: '15:23' }, location: 'Edinburgh', jobType: 'Patient Transfer', destination: 'San Francisco', reqTime: '12:45:02' },
            { jobId: 'OPD-6-23-145', status: { className: 'default', value: 'SCHEDULE' }, duration: { className: 'default', value: '15:23' }, location: 'Tokiyo', jobType: 'Patient Transfer', destination: 'San Francisco', reqTime: '12:45:02' },
            { jobId: 'OPD-6-23-145', status: { className: 'default', value: 'SCHEDULE' }, duration: { className: 'default', value: '15:23' }, location: 'Tokiyo', jobType: 'Patient Transfer', destination: 'San Francisco', reqTime: '12:45:02' },
            { jobId: 'OPD-6-23-145', status: { className: 'default', value: 'SCHEDULE' }, duration: { className: 'default', value: '15:23' }, location: 'Tokiyo', jobType: 'Patient Transfer', destination: 'San Francisco', reqTime: '12:45:02' },
            { jobId: 'OPD-6-23-145', status: { className: 'default', value: 'SCHEDULE' }, duration: { className: 'default', value: '15:23' }, location: 'Tokiyo', jobType: 'Patient Transfer', destination: 'San Francisco', reqTime: '12:45:02' },
            { jobId: 'OPD-6-23-145', status: { className: 'default', value: 'SCHEDULE' }, duration: { className: 'default', value: '15:23' }, location: 'Tokiyo', jobType: 'Patient Transfer', destination: 'San Francisco', reqTime: '12:45:02' },
            { jobId: 'OPD-6-23-145', status: { className: 'default', value: 'SCHEDULE' }, duration: { className: 'default', value: '15:23' }, location: 'Tokiyo', jobType: 'Patient Transfer', destination: 'San Francisco', reqTime: '12:45:02' },
            { jobId: 'OPD-6-23-145', status: { className: 'default', value: 'SCHEDULE' }, duration: { className: 'default', value: '15:23' }, location: 'Tokiyo', jobType: 'Patient Transfer', destination: 'San Francisco', reqTime: '12:45:02' },
            { jobId: 'OPD-6-23-145', status: { className: 'default', value: 'SCHEDULE' }, duration: { className: 'default', value: '15:23' }, location: 'Tokiyo', jobType: 'Patient Transfer', destination: 'San Francisco', reqTime: '12:45:02' },
            { jobId: 'OPD-6-23-145', status: { className: 'default', value: 'SCHEDULE' }, duration: { className: 'default', value: '15:23' }, location: 'Tokiyo', jobType: 'Patient Transfer', destination: 'San Francisco', reqTime: '12:45:02' },
            { jobId: 'OPD-6-23-145', status: { className: 'default', value: 'SCHEDULE' }, duration: { className: 'default', value: '15:23' }, location: 'Tokiyo', jobType: 'Patient Transfer', destination: 'San Francisco', reqTime: '12:45:02' },
            { jobId: 'OPD-6-23-145', status: { className: 'default', value: 'SCHEDULE' }, duration: { className: 'default', value: '15:23' }, location: 'Tokiyo', jobType: 'Patient Transfer', destination: 'San Francisco', reqTime: '12:45:02' },
            { jobId: 'OPD-6-23-145', status: { className: 'default', value: 'SCHEDULE' }, duration: { className: 'default', value: '15:23' }, location: 'Tokiyo', jobType: 'Patient Transfer', destination: 'San Francisco', reqTime: '12:45:02' },
            { jobId: 'OPD-6-23-145', status: { className: 'default', value: 'SCHEDULE' }, duration: { className: 'default', value: '15:23' }, location: 'Tokiyo', jobType: 'Patient Transfer', destination: 'San Francisco', reqTime: '12:45:02' },
            { jobId: 'OPD-6-23-145', status: { className: 'default', value: 'SCHEDULE' }, duration: { className: 'default', value: '15:23' }, location: 'Tokiyo', jobType: 'Patient Transfer', destination: 'San Francisco', reqTime: '12:45:02' },
            { jobId: 'OPD-6-23-145', status: { className: 'default', value: 'SCHEDULE' }, duration: { className: 'default', value: '15:23' }, location: 'Tokiyo', jobType: 'Patient Transfer', destination: 'San Francisco', reqTime: '12:45:02' },
            { jobId: 'OPD-6-23-145', status: { className: 'default', value: 'SCHEDULE' }, duration: { className: 'default', value: '15:23' }, location: 'Tokiyo', jobType: 'Patient Transfer', destination: 'San Francisco', reqTime: '12:45:02' },
            { jobId: 'OPD-6-23-145', status: { className: 'default', value: 'SCHEDULE' }, duration: { className: 'default', value: '15:23' }, location: 'Tokiyo', jobType: 'Patient Transfer', destination: 'San Francisco', reqTime: '12:45:02' },
            { jobId: 'OPD-6-23-145', status: { className: 'default', value: 'SCHEDULE' }, duration: { className: 'default', value: '15:23' }, location: 'Tokiyo', jobType: 'Patient Transfer', destination: 'San Francisco', reqTime: '12:45:02' },
            { jobId: 'OPD-6-23-145', status: { className: 'default', value: 'SCHEDULE' }, duration: { className: 'default', value: '15:23' }, location: 'Tokiyo', jobType: 'Patient Transfer', destination: 'San Francisco', reqTime: '12:45:02' },
            { jobId: 'OPD-6-23-145', status: { className: 'default', value: 'SCHEDULE' }, duration: { className: 'default', value: '15:23' }, location: 'Tokiyo', jobType: 'Patient Transfer', destination: 'San Francisco', reqTime: '12:45:02' },
            { jobId: 'OPD-6-23-145', status: { className: 'default', value: 'SCHEDULE' }, duration: { className: 'default', value: '15:23' }, location: 'Tokiyo', jobType: 'Patient Transfer', destination: 'San Francisco', reqTime: '12:45:02' }
        ];
        /*this.jobListTableComponent.setColumnDef(columnDefs);
      this.jobListTableComponent.setData(rowData);
      this.jobListTableComponent.agPaginationAuto = this.agPaginationAuto;*/
    };
    return JobStatusComponent;
}());
__decorate([
    core_1.ViewChild(table_component_1.AgGridTableCustomComponent),
    __metadata("design:type", typeof (_a = typeof table_component_1.AgGridTableCustomComponent !== "undefined" && table_component_1.AgGridTableCustomComponent) === "function" && _a || Object)
], JobStatusComponent.prototype, "jobListTableComponent", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], JobStatusComponent.prototype, "agPaginationAuto", void 0);
JobStatusComponent = __decorate([
    core_1.Component({
        selector: 'job-status-cmp',
        template: __webpack_require__(690)
    }),
    __metadata("design:paramtypes", [])
], JobStatusComponent);
exports.JobStatusComponent = JobStatusComponent;
var _a;
//# sourceMappingURL=job-status.component.js.map

/***/ }),

/***/ 513:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(1);
var notification_action_renderer_component_1 = __webpack_require__(275);
var checkbox_renderer_component_1 = __webpack_require__(274);
var NotificationsComponent = (function () {
    function NotificationsComponent() {
    }
    NotificationsComponent.prototype.ngOnInit = function () {
        var columnDefs = [
            {
                headerName: "",
                cellRendererFramework: checkbox_renderer_component_1.CheckBoxRendererComponent,
                width: 30,
            },
            {
                headerName: "From",
                field: "sender",
                width: 80
            },
            {
                headerName: "Subject",
                field: "subject",
                width: 220
            },
            {
                headerName: "Received",
                field: "receviedTime",
                width: 40
            },
            {
                headerName: "Action",
                cellRendererFramework: notification_action_renderer_component_1.NotificationActionRendererComponent,
                width: 40
            },
        ];
        var rowData = [
            { sender: ' OP D -6-23-145', subject: 'Patient Transfer', receviedTime: ' 12:45:02' },
            { sender: ' OP D -6-23-145', subject: 'Patient Transfer', receviedTime: ' 12:45:02' },
            { sender: ' OP D -6-23-145', subject: 'Waste Collection', receviedTime: ' 12:45:02' },
            { sender: ' OP D -6-23-145', subject: 'Patient Transfer', receviedTime: ' 12:45:02' },
            { sender: ' OP D -6-23-145', subject: 'Moving Equipment', receviedTime: ' 12:45:02' },
            { sender: ' OP D -6-23-145', subject: 'Deceased Patient', receviedTime: ' 12:45:02' },
            { sender: ' OP D -6-23-145', subject: 'Patient Transfer', receviedTime: ' 12:45:02' },
            { sender: ' OP D -6-23-145', subject: 'Patient Transfer', receviedTime: ' 12:45:02' },
            { sender: ' OP D -6-23-145', subject: 'Patient Transfer', receviedTime: ' 12:45:02' },
            { sender: ' OP D -6-23-145', subject: 'Patient Transfer', receviedTime: ' 12:45:02' },
            { sender: ' OP D -6-23-145', subject: 'Patient Transfer', receviedTime: ' 12:45:02' },
            { sender: ' OP D -6-23-145', subject: 'Patient Transfer', receviedTime: ' 12:45:02' },
            { sender: ' OP D -6-23-145', subject: 'Patient Transfer', receviedTime: ' 12:45:02' },
            { sender: ' OP D -6-23-145', subject: 'Patient Transfer', receviedTime: ' 12:45:02' },
            { sender: ' OP D -6-23-145', subject: 'Patient Transfer', receviedTime: ' 12:45:02' },
            { sender: ' OP D -6-23-145', subject: 'Patient Transfer', receviedTime: ' 12:45:02' },
            { sender: ' OP D -6-23-145', subject: 'Patient Transfer', receviedTime: ' 12:45:02' },
            { sender: ' OP D -6-23-145', subject: 'Patient Transfer', receviedTime: ' 12:45:02' },
            { sender: ' OP D -6-23-145', subject: 'Patient Transfer', receviedTime: ' 12:45:02' },
            { sender: ' OP D -6-23-145', subject: 'Patient Transfer', receviedTime: ' 12:45:02' },
            { sender: ' OP D -6-23-145', subject: 'Patient Transfer', receviedTime: ' 12:45:02' },
            { sender: ' OP D -6-23-145', subject: 'Patient Transfer', receviedTime: ' 12:45:02' },
            { sender: ' OP D -6-23-145', subject: 'Patient Transfer', receviedTime: ' 12:45:02' },
            { sender: ' OP D -6-23-145', subject: 'Patient Transfer', receviedTime: ' 12:45:02' },
            { sender: ' OP D -6-23-145', subject: 'Patient Transfer', receviedTime: ' 12:45:02' },
            { sender: ' OP D -6-23-145', subject: 'Patient Transfer', receviedTime: ' 12:45:02' },
            { sender: ' OP D -6-23-145', subject: 'Patient Transfer', receviedTime: ' 12:45:02' },
            { sender: ' OP D -6-23-145', subject: 'Patient Transfer', receviedTime: ' 12:45:02' },
            { sender: ' OP D -6-23-145', subject: 'Patient Transfer', receviedTime: ' 12:45:02' },
            { sender: ' OP D -6-23-145', subject: 'Patient Transfer', receviedTime: ' 12:45:02' }
        ];
        this.notificationTableComponent.setColumnDef(columnDefs);
        this.notificationTableComponent.setData(rowData);
        this.incomingMessageTableComponent.setColumnDef(columnDefs);
        this.incomingMessageTableComponent.setData(rowData);
        this.sentMessageTableComponent.setColumnDef(columnDefs);
        this.sentMessageTableComponent.setData(rowData);
    };
    NotificationsComponent.prototype.refreshTable = function (component) {
        if (component === 'notificationTable') {
            this.notificationTableComponent.refreshTableView();
        }
        else if (component === 'incomingMessageTable') {
            this.incomingMessageTableComponent.refreshTableView();
        }
        else if (component === 'sentMessageTable') {
            this.sentMessageTableComponent.refreshTableView();
        }
    };
    return NotificationsComponent;
}());
__decorate([
    core_1.ViewChild('notificationTable'),
    __metadata("design:type", Object)
], NotificationsComponent.prototype, "notificationTableComponent", void 0);
__decorate([
    core_1.ViewChild('incomingMessageTable'),
    __metadata("design:type", Object)
], NotificationsComponent.prototype, "incomingMessageTableComponent", void 0);
__decorate([
    core_1.ViewChild('sentMessageTable'),
    __metadata("design:type", Object)
], NotificationsComponent.prototype, "sentMessageTableComponent", void 0);
NotificationsComponent = __decorate([
    core_1.Component({
        selector: 'notifications-cmp',
        template: __webpack_require__(694)
    }),
    __metadata("design:paramtypes", [])
], NotificationsComponent);
exports.NotificationsComponent = NotificationsComponent;
//# sourceMappingURL=notifications.component.js.map

/***/ }),

/***/ 514:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(1);
var http_1 = __webpack_require__(35);
var Observable_1 = __webpack_require__(0);
var authentication_service_1 = __webpack_require__(40);
var AccessControlService = (function () {
    function AccessControlService(http, authService) {
        this.http = http;
        this.authService = authService;
        this.headers = new http_1.Headers({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + this.authService.getToken()
        });
        this.URL = "";
    }
    AccessControlService.prototype.getPermissionForRole = function (roleId, parentId) {
        this.URL = 'accessLevel/getPermissionsByRole?roleId=';
        this.URL += roleId;
        this.URL += '&parentId=';
        this.URL += parentId;
        return this.http.get(this.URL, { headers: this.headers })
            .map(function (response) { return response.json(); })
            .catch(function (error) { return Observable_1.Observable.throw(error.json().error || 'Server error'); });
    };
    AccessControlService.prototype.getAllRolesForLoginUser = function () {
        this.URL = 'accessLevel/getAllRolesForLoginUser';
        return this.http.get(this.URL, { headers: this.headers })
            .map(function (response) { return response.json(); })
            .catch(function (error) { return Observable_1.Observable.throw(error.json().error || 'Server error'); });
    };
    AccessControlService.prototype.savePermissionsForRole = function (permissions, roleId) {
        var options = new http_1.RequestOptions({ headers: this.headers });
        return this.http.get('accessLevel/saveRolePermissions?roleId=' + roleId + '&permissions=' + permissions, options).map(function (response) {
            return response.json();
        });
    };
    AccessControlService.prototype.checkRoleExistence = function (roleName, selectedId, isEdit) {
        if (selectedId == null) {
            selectedId = 0;
        }
        var options = new http_1.RequestOptions({ headers: this.headers });
        return this.http.get('accessLevel/checkRoleNameExist?roleName=' + roleName + '&roleId=' + selectedId + '&isEdit=' + isEdit, options).map(function (response) {
            return response.json();
        });
    };
    AccessControlService.prototype.addRole = function (roleForm) {
        debugger;
        return this.http.post('accessLevel/role/add', JSON.stringify(roleForm), { headers: this.headers }).map(function (response) {
            return response.json();
        });
    };
    AccessControlService.prototype.getAllRoles = function () {
        this.URL = 'accessLevel/getAllRolesList';
        return this.http.get(this.URL, { headers: this.headers })
            .map(function (response) { return response.json(); })
            .catch(function (error) { return Observable_1.Observable.throw(error.json().error || 'Server error'); });
    };
    AccessControlService.prototype.getRoleByID = function (selectedId) {
        if (selectedId == null) {
            selectedId = 0;
        }
        var options = new http_1.RequestOptions({ headers: this.headers });
        return this.http.get('accessLevel/getRoleById?roleId=' + selectedId, options).map(function (response) {
            return response.json();
        });
    };
    AccessControlService.prototype.removeRole = function (roleId, parentId) {
        return this.http.delete('accessLevel/deleteRoleById?roleId=' + roleId + '&parentId=' + parentId, { headers: this.headers }).map(function (response) {
            return response.json();
        });
    };
    AccessControlService.prototype.moveChildRole = function (roleId, parentId) {
        return this.http.get('accessLevel/moveChildRole?roleId=' + roleId + '&parentId=' + parentId, { headers: this.headers }).map(function (response) {
            return response.json();
        });
    };
    return AccessControlService;
}());
AccessControlService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [typeof (_a = typeof http_1.Http !== "undefined" && http_1.Http) === "function" && _a || Object, typeof (_b = typeof authentication_service_1.AuthenticationService !== "undefined" && authentication_service_1.AuthenticationService) === "function" && _b || Object])
], AccessControlService);
exports.AccessControlService = AccessControlService;
var _a, _b;
//# sourceMappingURL=accessControl.service.js.map

/***/ }),

/***/ 515:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(1);
var table_component_1 = __webpack_require__(31);
var material_1 = __webpack_require__(16);
var employee_status_dialog_1 = __webpack_require__(264);
var common_1 = __webpack_require__(61);
var employee_status_action_component_1 = __webpack_require__(263);
var confirmation_dialog_1 = __webpack_require__(41);
var custom_validation_service_1 = __webpack_require__(17);
var EmployeeStatusConfigComponent = (function () {
    function EmployeeStatusConfigComponent(httpCustomService, dialog, customValidation) {
        this.httpCustomService = httpCustomService;
        this.dialog = dialog;
        this.customValidation = customValidation;
        this.agPaginationAuto = false;
        this.tableData = [{ abbreviation: "tan tan", name: "wataya", id: 1 }];
        this.employeeStatusTypes = [];
        this.httpCustomService.commonHttpRequest("getEmployeeStatusType", "employeeStatusConfig/getEmployeeStatusType", null, this.getEmployeeStatusTypeSuccess.bind(this));
    }
    EmployeeStatusConfigComponent.prototype.ngOnInit = function () {
        var columnDefs = [
            {
                headerName: "Name",
                field: "name",
                width: 40
            },
            {
                headerName: "Abbreviation",
                field: "abbreviation",
                width: 25
            },
            {
                headerName: "Employee Status Type",
                field: "employeeStatusType",
                width: 25
            },
            {
                headerName: "Action",
                cellRendererFramework: employee_status_action_component_1.EmployeeStatusActionRendererComponent,
                width: 10
            }
        ];
        this.tableComponent.agPaginationAuto = this.agPaginationAuto;
        this.tableComponent.setColumnDef(columnDefs);
        this.tableComponent.setData(this.tableData);
        this.tableComponent.setGridOptionContext({ parentComponent: this });
        this.httpCustomService.commonHttpRequest("getAllEmployeeStatus", "employeeStatusConfig/getAllEmployeeStatus", null, this.updateTable.bind(this));
    };
    EmployeeStatusConfigComponent.prototype.addNewEmployeeStatus = function () {
        this.openEmployeeStatusGroupDialog(Action.ADD, null);
    };
    EmployeeStatusConfigComponent.prototype.editEmployeeStatus = function (employeeStatus) {
        this.openEmployeeStatusGroupDialog(Action.EDIT, employeeStatus);
    };
    EmployeeStatusConfigComponent.prototype.removeEmployeeStatus = function (employeeStatusId) {
        var _this = this;
        var dialogRef = this.dialog.open(confirmation_dialog_1.ConfirmationDialog);
        dialogRef.disableClose = true;
        dialogRef.componentInstance.title = "Remove Employee Status";
        dialogRef.componentInstance.message = "Are you sure you want to remove Employee Status";
        dialogRef.afterClosed().subscribe(function (result) {
            if (result == true) {
                var data = { id: employeeStatusId };
                _this.httpCustomService.commonHttpRequest("removeEmployeeStatus:ID_" + employeeStatusId, "employeeStatusConfig/removeEmployeeStatus", data, _this.updateTable.bind(_this));
            }
        });
    };
    EmployeeStatusConfigComponent.prototype.openEmployeeStatusGroupDialog = function (action, entity) {
        var _this = this;
        var dialogRef = this.dialog.open(employee_status_dialog_1.EmployeeStatusDialog);
        dialogRef.disableClose = true;
        var empStatusTypeId = 0;
        if (entity != null) {
            empStatusTypeId = this.employeeStatusTypes.indexOf(entity.employeeStatusType);
        }
        this.setActionButtonAndHeader(dialogRef, action, empStatusTypeId);
        if (entity != null) {
            dialogRef.componentInstance.setDialogDetails(entity);
        }
        dialogRef.afterClosed().subscribe(function (data) {
            if (data) {
                var employeeStatus = {
                    id: data.id,
                    name: data.name.trim(),
                    abbreviation: data.abbreviation.trim(),
                    employeeStatusType: data.employeeStatusType
                };
                _this.httpCustomService.commonHttpRequest("addEmployeeStatus:ID_" + employeeStatus.id, "employeeStatusConfig/add", employeeStatus, _this.updateTable.bind(_this), null, common_1.HttpType.POST);
            }
        });
    };
    EmployeeStatusConfigComponent.prototype.setActionButtonAndHeader = function (dialogRef, action, empStatusTypeId) {
        if (action === Action.ADD) {
            dialogRef.componentInstance.setTitle("Add Employee Status");
            dialogRef.componentInstance.setActionButton("Add");
            dialogRef.componentInstance.setIsEdit(false);
        }
        else if (action == Action.EDIT) {
            dialogRef.componentInstance.setTitle("Edit Employee Status");
            dialogRef.componentInstance.setActionButton("Edit");
            dialogRef.componentInstance.setIsEdit(true);
        }
        dialogRef.componentInstance.setEmployeeStatusTypes(this.employeeStatusTypes, empStatusTypeId);
    };
    EmployeeStatusConfigComponent.prototype.getEmployeeStatusTypeSuccess = function (data) {
        this.employeeStatusTypes = data;
    };
    EmployeeStatusConfigComponent.prototype.updateTable = function (data) {
        this.tableComponent.updateData(data.employeeStatus);
    };
    return EmployeeStatusConfigComponent;
}());
__decorate([
    core_1.ViewChild(table_component_1.AgGridTableCustomComponent),
    __metadata("design:type", typeof (_a = typeof table_component_1.AgGridTableCustomComponent !== "undefined" && table_component_1.AgGridTableCustomComponent) === "function" && _a || Object)
], EmployeeStatusConfigComponent.prototype, "tableComponent", void 0);
EmployeeStatusConfigComponent = __decorate([
    core_1.Component({
        selector: 'employee-status-config-cmp',
        template: __webpack_require__(701),
    }),
    __metadata("design:paramtypes", [typeof (_b = typeof common_1.HttpCustomService !== "undefined" && common_1.HttpCustomService) === "function" && _b || Object, typeof (_c = typeof material_1.MdDialog !== "undefined" && material_1.MdDialog) === "function" && _c || Object, typeof (_d = typeof custom_validation_service_1.CustomValidationService !== "undefined" && custom_validation_service_1.CustomValidationService) === "function" && _d || Object])
], EmployeeStatusConfigComponent);
exports.EmployeeStatusConfigComponent = EmployeeStatusConfigComponent;
var Action;
(function (Action) {
    Action[Action["ADD"] = 0] = "ADD";
    Action[Action["EDIT"] = 1] = "EDIT";
})(Action = exports.Action || (exports.Action = {}));
var _a, _b, _c, _d;
//# sourceMappingURL=employee-status-config.component.js.map

/***/ }),

/***/ 516:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Created by CSI on 7/17/2017.
 */

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(1);
var http_1 = __webpack_require__(35);
var authentication_service_1 = __webpack_require__(40);
var GeneralSettingService = (function () {
    function GeneralSettingService(http, authService) {
        this.http = http;
        this.authService = authService;
        this.headers = new http_1.Headers({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + this.authService.getToken()
        });
    }
    GeneralSettingService.prototype.addcompany = function (company) {
        debugger;
        return this.http.post('company/addCompany', JSON.stringify(company), { headers: this.headers }).map(function (response) {
            return response.json();
        });
    };
    GeneralSettingService.prototype.getCompany = function (id) {
        return this.http.get('company/getcompany?id=' + id, { headers: this.headers }).map(function (response) {
            return response.json();
        });
    };
    GeneralSettingService.prototype.getTimeZones = function () {
        return this.http.get('company/getalltimezone', { headers: this.headers }).map(function (response) {
            return response.json();
        });
    };
    return GeneralSettingService;
}());
GeneralSettingService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [typeof (_a = typeof http_1.Http !== "undefined" && http_1.Http) === "function" && _a || Object, typeof (_b = typeof authentication_service_1.AuthenticationService !== "undefined" && authentication_service_1.AuthenticationService) === "function" && _b || Object])
], GeneralSettingService);
exports.GeneralSettingService = GeneralSettingService;
var _a, _b;
//# sourceMappingURL=generalSetting.service.js.map

/***/ }),

/***/ 517:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by sachithra on 9/12/2017.
 */
exports.EMPLOEE_ATTRIBUTES = [
    { path: '', title: 'Departments', class: '', permission: 'DEPARTMENT_VIEW' },
    { path: 'category', title: 'Categories & Grade', class: '', permission: 'CATEGORY_VIEW' },
    { path: 'skill', title: 'Skills', class: '', permission: 'SKILL_VIEW' },
    { path: 'employeeStatusConfig', title: 'Status List', class: '', permission: 'EMPLOYEE_STATUS_VIEW' },
    { path: 'emptypeconfig', title: 'Employee Type List', class: '', permission: 'EMPLOYEE_TYPE_VIEW' },
    { path: 'employeeStatus', title: 'Employee Status List', class: '', permission: 'EMPLOYEE_STATUS_VIEW' }
];
exports.JOB_QUEUE = [
    { path: '', title: 'Queues', class: '', permission: 'DEPARTMENT_VIEW' },
    { path: '', title: 'Job Routing', class: '', permission: 'DEPARTMENT_VIEW' },
    { path: 'jobStatusConfig', title: 'Job Status List', class: '', permission: 'SKILL_VIEW' },
    { path: '', title: 'Escalations', class: '', permission: 'SKILL_VIEW' }
];
exports.SYSTEM_CONFIGURATION = [
    { path: 'accessControl', title: 'Access Control', class: '', permission: 'DEPARTMENT_VIEW' },
    { path: '', title: 'Interfaces and Data Uploads', class: '', permission: 'DEPARTMENT_VIEW' },
    { path: 'jobStatusConfig', title: 'Email Setting', class: '', permission: 'SKILL_VIEW' },
    { path: '', title: 'System Settings', class: '', permission: 'SKILL_VIEW' },
    { path: 'unitHierarchy', title: 'Unit Hierarchy', class: '', permission: 'SKILL_VIEW' },
    { path: 'locationHierarchy', title: 'Location Hierarchy', class: '', permission: 'SKILL_VIEW' }
];
//# sourceMappingURL=generalSettings-routes.config.js.map

/***/ }),

/***/ 518:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(1);
var generalSetting_service_1 = __webpack_require__(516);
var forms_1 = __webpack_require__(12);
var generalSettings_routes_config_1 = __webpack_require__(517);
var custom_validation_service_1 = __webpack_require__(17);
var GeneralSettingComponent = (function () {
    function GeneralSettingComponent(generalsettingsService, _fb, customValidationService) {
        this.generalsettingsService = generalsettingsService;
        this._fb = _fb;
        this.customValidationService = customValidationService;
    }
    GeneralSettingComponent.prototype.ngOnInit = function () {
        this.companyForm = this._fb.group({
            id: [this.id],
            name: [this.roleName],
            address: [this.address],
            country: [this.country],
            phoneNo: [this.phoneNo],
            timeZone: [this.timeZone],
            timeFormat: [this.timeFormat],
            operationalHours: [this.operationalHours],
            licenseNo: [this.licenseNo],
            validDate: [this.validdate],
            weekStartDay: [this.weekStartDay]
            // orderId:[this.orderId]
        });
        this.employeeAttributes = generalSettings_routes_config_1.EMPLOEE_ATTRIBUTES.filter(this.customValidationService.filterCheck);
        this.jobQueueAttributes = generalSettings_routes_config_1.JOB_QUEUE.filter(this.customValidationService.filterCheck);
        this.systemConfiguration = generalSettings_routes_config_1.SYSTEM_CONFIGURATION.filter(this.customValidationService.filterCheck);
        this.getAllTimeZones();
        var id = 1;
        this.getCompanyDetails(id);
    };
    GeneralSettingComponent.prototype.saveCompany = function (company) {
        this.generalsettingsService.addcompany(company).subscribe(function (data) { });
    };
    GeneralSettingComponent.prototype.getCompanyDetails = function (id) {
        var _this = this;
        this.generalsettingsService.getCompany(id).subscribe(function (data) {
            if (data.companyObj != null) {
                _this.setCompanyDetails(data.companyObj);
            }
            else {
                _this.companyForm = _this._fb.group({
                    id: [0],
                });
            }
        });
    };
    GeneralSettingComponent.prototype.setCompanyDetails = function (company) {
        if (company.id > 0) {
            this.id = company.id;
            this.roleName = company.name;
            this.address = company.address;
            this.country = company.country;
            this.phoneNo = company.phoneNo;
            this.timeZone = company.timeZone;
            this.timeFormat = company.timeFormat;
            this.operationalHours = company.operationalHours;
            this.licenseNo = company.licenseNo;
            this.validdate = company.validDate;
            this.weekStartDay = company.weekStartDay;
            this.companyForm = this._fb.group({
                id: [this.id],
                name: [this.roleName],
                address: [this.address],
                country: [this.country],
                phoneNo: [this.phoneNo],
                timeZone: [this.timeZone],
                timeFormat: [this.timeFormat],
                operationalHours: [this.operationalHours],
                licenseNo: [this.licenseNo],
                validDate: [this.validdate],
                weekStartDay: [this.weekStartDay]
                // orderId:[this.orderId]
            });
        }
    };
    GeneralSettingComponent.prototype.getAllTimeZones = function () {
        var _this = this;
        this.generalsettingsService.getTimeZones().subscribe(function (data) {
            _this.timeZones = data.zoneList;
            _this.weekDays = data.weekdays;
        });
    };
    return GeneralSettingComponent;
}());
GeneralSettingComponent = __decorate([
    core_1.Component({
        selector: 'generalsetting-cmp',
        template: __webpack_require__(703),
        providers: [generalSetting_service_1.GeneralSettingService]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof generalSetting_service_1.GeneralSettingService !== "undefined" && generalSetting_service_1.GeneralSettingService) === "function" && _a || Object, typeof (_b = typeof forms_1.FormBuilder !== "undefined" && forms_1.FormBuilder) === "function" && _b || Object, typeof (_c = typeof custom_validation_service_1.CustomValidationService !== "undefined" && custom_validation_service_1.CustomValidationService) === "function" && _c || Object])
], GeneralSettingComponent);
exports.GeneralSettingComponent = GeneralSettingComponent;
var _a, _b, _c;
//# sourceMappingURL=generalsetting.component.js.map

/***/ }),

/***/ 519:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(1);
var common_http_service_1 = __webpack_require__(22);
var unit_hierarchy_component_1 = __webpack_require__(266);
var hierarchy_type_component_1 = __webpack_require__(117);
var LocationHierarchy = (function () {
    function LocationHierarchy(httpCustomService) {
        this.httpCustomService = httpCustomService;
        this.levelType = hierarchy_type_component_1.LevelType.LocationLevel;
    }
    LocationHierarchy.prototype.ngOnInit = function () {
        this.getLocationData();
    };
    LocationHierarchy.prototype.getLocationData = function () {
        var data = {};
        this.httpCustomService.commonHttpRequest("locationData", "location/locationHierarchy", data, this.getLocationDataSuccess.bind(this));
    };
    LocationHierarchy.prototype.getLocationDataSuccess = function (data) {
        if (data.success) {
            this.unitHierarchy.getTableComponent().updateData(data.hierarchy);
        }
    };
    return LocationHierarchy;
}());
__decorate([
    core_1.ViewChild(unit_hierarchy_component_1.UnitHierarchy),
    __metadata("design:type", typeof (_a = typeof unit_hierarchy_component_1.UnitHierarchy !== "undefined" && unit_hierarchy_component_1.UnitHierarchy) === "function" && _a || Object)
], LocationHierarchy.prototype, "unitHierarchy", void 0);
LocationHierarchy = __decorate([
    core_1.Component({
        selector: 'locationHierarchy-cmp',
        template: __webpack_require__(704),
        providers: [common_http_service_1.HttpCustomService]
    }),
    __metadata("design:paramtypes", [typeof (_b = typeof common_http_service_1.HttpCustomService !== "undefined" && common_http_service_1.HttpCustomService) === "function" && _b || Object])
], LocationHierarchy);
exports.LocationHierarchy = LocationHierarchy;
var _a, _b;
//# sourceMappingURL=location-hierarchy.component.js.map

/***/ }),

/***/ 520:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by CSI on 3/7/2018.
 */
var core_1 = __webpack_require__(1);
var LocationDetailView = (function () {
    function LocationDetailView() {
    }
    LocationDetailView.prototype.ngOnInit = function () { };
    return LocationDetailView;
}());
LocationDetailView = __decorate([
    core_1.Component({
        selector: "location-detail-view",
        template: __webpack_require__(709)
    }),
    __metadata("design:paramtypes", [])
], LocationDetailView);
exports.LocationDetailView = LocationDetailView;
//# sourceMappingURL=location-detail-view.component.js.map

/***/ }),

/***/ 521:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(1);
var data_component_1 = __webpack_require__(172);
var LocationComponent = (function () {
    function LocationComponent() {
        this.list = [
            { "building": "Hospital Building", "floor": "Floor 01", "jobs": [{ "time": "12", "name": "James", "currArea": { "area": "Cafetaria", "location": "Hospital Building" }, "destArea": { "area": "Operation Theatre", "location": "Hospital Building" }, "isJobAssigned": "false", "jobId": "123-4560E", "status": "1" },
                    { "time": "10", "name": "Johnathan", "currArea": { "area": "Dispensary", "location": "Hospital Building" }, "destArea": { "area": "Emergency Room", "location": "Hospital Building" }, "isJobAssigned": "false", "jobId": "123-4561E", "status": "1" },
                    { "time": "9", "name": "Abraham", "currArea": { "area": "Emergency Room", "location": "Hospital Building" }, "destArea": { "area": "ICU", "location": "Hospital Building" }, "isJobAssigned": "false", "jobId": "123-4562E", "status": "1" },
                    { "time": "5", "name": "Ethan", "currArea": { "area": "Cafetaria", "location": "Hospital Building" }, "destArea": { "area": "Dispensary", "location": "Hospital Building" }, "isJobAssigned": "false", "jobId": "123-4563E", "status": "1" },
                    { "time": "5", "name": "Cortez", "currArea": { "area": "Cafetaria", "location": "Hospital Building" }, "destArea": { "area": "Dispensary", "location": "Hospital Building" }, "isJobAssigned": "false", "jobId": "123-4563E", "status": "1" },
                    { "time": "5", "name": "Eldridge", "currArea": { "area": "Cafetaria", "location": "Hospital Building" }, "destArea": { "area": "Dispensary", "location": "Hospital Building" }, "isJobAssigned": "false", "jobId": "123-4563E", "status": "1" }
                ] },
            { "building": "Hospital Building", "floor": "Floor 02", "jobs": [{ "time": "12", "name": "Bert", "currArea": { "area": "Cafetaria", "location": "Hospital Building" }, "destArea": { "area": "Ward 10", "location": "Hospital Building" }, "isJobAssigned": "false", "jobId": "123-4564E", "status": "1" },
                    { "time": "10", "name": "Augustus", "currArea": { "area": "ICU", "location": "Hospital Building " }, "destArea": { "area": "Ward 11", "location": "Clinic Building" }, "isJobAssigned": "true", "jobId": "123-4565E", "status": "2" },
                    { "time": "10", "name": "Andrew", "currArea": { "area": "Dispensary", "location": "Hospital Building" }, "destArea": { "area": "ICU", "location": "Clinics Building" }, "isJobAssigned": "true", "jobId": "123-4566E", "status": "3" },
                    { "time": "15", "name": "Timothy", "currArea": { "area": "Pharmacy", "location": "Hospital Building" }, "destArea": { "area": "Emergency Room", "location": "Clinics Building" }, "isJobAssigned": "true", "jobId": "123-4567E", "status": "2" }
                ] },
            { "building": "Hospital Building", "floor": "Floor 03", "jobs": [{ "time": "12", "name": "Milton", "currArea": { "area": "ICU", "location": "Hospital Building " }, "destArea": { "area": "Operation Theatre", "location": "Clinics Building" }, "isJobAssigned": "false", "jobId": "123-4568E", "status": "4" },
                    { "time": "10", "name": "Buford", "currArea": { "area": "Dispensary", "location": "Hospital Building" }, "destArea": { "area": "Emergency Room", "location": "Clinic Building" }, "isJobAssigned": "false", "jobId": "123-4569E", "status": "1" },
                    { "time": "10", "name": "Elliott", "currArea": { "area": "Cafetaria", "location": "Hospital Building" }, "destArea": { "area": "Dispensary", "location": "Clinic Building" }, "isJobAssigned": "true", "jobId": "123-4570E", "status": "2" }
                ] },
            { "building": "Hospital Building", "floor": "Floor 04", "jobs": [{ "time": "12", "name": "Luther", "currArea": { "area": "Cafetaria", "location": "Hospital Building" }, "destArea": { "area": "Ward 12", "location": "Clinics Building" }, "isJobAssigned": "false", "jobId": "123-4571E", "status": "1" },
                    { "time": "10", "name": "Larry", "currArea": { "area": "Dispensary", "location": "Hospital Building" }, "destArea": { "area": "Ward 11", "location": "Clinic building" }, "isJobAssigned": "false", "jobId": "123-4572E", "status": "1" },
                    { "time": "10", "name": "Mose", "currArea": { "area": "Emergency Room", "location": "Hospital Building" }, "destArea": { "area": "ICU", "location": "Clinics Building" }, "isJobAssigned": "true", "jobId": "123-4573E", "status": "3" }
                ] },
            { "building": "Clinics Building", "floor": "Floor 01", "jobs": [{ "time": "12", "name": "Jewel", "currArea": { "area": "Cafetaria", "location": "Clinics Building" }, "destArea": { "area": "Emergency Room", "location": "Clinics Building" }, "isJobAssigned": "true", "jobId": "123-4574E", "status": "2" },
                    { "time": "10", "name": "Kennith", "currArea": { "area": "Dispensary", "location": "Clinics Building" }, "destArea": { "area": "Ward 12", "location": "Hospital Building" }, "isJobAssigned": "false", "jobId": "123-4575E", "status": "1" },
                    { "time": "10", "name": "Amos", "currArea": { "area": "Emergency Room", "location": "Clinics Building" }, "destArea": { "area": "Ward 12", "location": "Clinics Building" }, "isJobAssigned": "true", "jobId": "123-4576E", "status": "3" }
                ] },
            { "building": "Clinics Building", "floor": "Floor 02", "jobs": [{ "time": "12", "name": "Roy", "currArea": { "area": "Emergency Room", "location": "Clinics Building" }, "destArea": { "area": "Pharmacy", "location": "Hospital Building" }, "isJobAssigned": "false", "jobId": "123-4577E", "status": "1" },
                    { "time": "10", "name": "Buster", "currArea": { "area": "Cafetaria", "location": "Clinics Building" }, "destArea": { "area": "Pharmacy", "location": "Hospital Building" }, "isJobAssigned": "true", "jobId": "123-4578E", "status": "2" },
                    { "time": "10", "name": "Fred", "currArea": { "area": "Dispensary", "location": "Clinics Building" }, "destArea": { "area": "Emergency Room", "location": "Hospital Building" }, "isJobAssigned": "true", "jobId": "123-4579E", "status": "3" }
                ] },
            { "building": "Clinics Building", "floor": "Floor 03", "jobs": [{ "time": "12", "name": "Eusebio", "currArea": { "area": "Dispensary", "location": "Clinics Building" }, "destArea": { "area": "Ward 12", "location": "Hospital Building" }, "isJobAssigned": "true", "jobId": "123-4580E", "status": "2" },
                    { "time": "10", "name": "Jude", "currArea": { "area": "Cafetaria", "location": "Clinics Building" }, "destArea": { "area": "Ward 11", "location": "Hospital Building" }, "isJobAssigned": "true", "jobId": "123-4581E", "status": "3" }
                ] },
            { "building": "Clinics Building", "floor": "Floor 04", "jobs": [{ "time": "12", "name": "Alton", "currArea": { "area": "Emergency Room", "location": "Clinics Building" }, "destArea": { "area": "ICU", "location": "Clinics Building" }, "isJobAssigned": "false", "jobId": "123-4582E", "status": "1" },
                    { "time": "10", "name": "Brock", "currArea": { "area": "Dispensary", "location": "Clinics Building" }, "destArea": { "area": "Ward 11", "location": "Clinics Building" }, "isJobAssigned": "true", "jobId": "123-4583E", "status": "2" }
                ] },
            { "building": "Clinics Building", "floor": "Floor 05", "jobs": [{ "time": "12", "name": "Marcel", "currArea": { "area": "Cafetaria", "location": "Clinics Building" }, "destArea": { "area": "ICU", "location": "Hospital Building" }, "isJobAssigned": "true", "jobId": "123-4584E", "status": "3" },
                    { "time": "10", "name": "Ellis", "currArea": { "area": "Dispensary", "location": "Clinics Building" }, "destArea": { "area": "Emergency Room", "location": "Hospital Building" }, "isJobAssigned": "false", "jobId": "123-4585E", "status": "1" }
                ] }
        ];
        this.treeType = data_component_1.TreeType.LocationTree;
        this.locationList = this.list;
    }
    LocationComponent.prototype.ngOnInit = function () {
    };
    return LocationComponent;
}());
LocationComponent = __decorate([
    core_1.Component({
        selector: 'location-cmp',
        template: __webpack_require__(710)
    }),
    __metadata("design:paramtypes", [])
], LocationComponent);
exports.LocationComponent = LocationComponent;
//# sourceMappingURL=location.component.js.map

/***/ }),

/***/ 522:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(1);
var angular_tree_component_1 = __webpack_require__(93);
var material_1 = __webpack_require__(16);
var common_1 = __webpack_require__(61);
var skill_dialog_component_1 = __webpack_require__(269);
var confirmation_dialog_1 = __webpack_require__(41);
var custom_validation_service_1 = __webpack_require__(17);
var SkillComponent = (function () {
    function SkillComponent(httpCustomService, dialog, customValidation) {
        this.httpCustomService = httpCustomService;
        this.dialog = dialog;
        this.customValidation = customValidation;
        this.selectedId = 0;
        this.isLeaf = false;
        this.isSkillGroupSelected = false;
        this.isSkillSelected = false;
        this.skillGroups = [];
        this.companyId = 1;
        this.options = {
            nodeClass: function (node) {
                if (node.data.icon) {
                    return 'tree-' + node.data.icon;
                }
                return 'tree-node-folder';
            }
        };
        this.nodes = [{
                name: '',
                children: []
            }];
        this.httpCustomService.commonHttpRequest("getAllSkillTree", "skill/getTree?companyId=" + this.companyId, null, this.generateSkillTree.bind(this, true));
    }
    SkillComponent.prototype.ngOnInit = function () {
    };
    SkillComponent.prototype.generateSkillTree = function (isSetSelectedId, data) {
        this.nodes = data.tree;
        var skillGroups = data.skillGroups;
        this.skillGroups = skillGroups;
        if (isSetSelectedId) {
            if (skillGroups.length > 0) {
                this.selectedId = skillGroups[0].id;
            }
            else {
                this.selectedId = -1;
            }
        }
    };
    SkillComponent.prototype.treeclickEvent = function (event) {
        this.selectedId = event.node.id;
        this.isLeaf = event.node.isLeaf;
        var parentId = event.node.parent.id;
        if (parentId == 0) {
            this.isSkillGroupSelected = true;
            this.isSkillSelected = false;
        }
        else {
            this.isSkillGroupSelected = false;
            if (this.isLeaf && this.selectedId !== 0) {
                this.isSkillSelected = true;
            }
            else {
                this.isSkillSelected = false;
            }
        }
    };
    SkillComponent.prototype.addEntity = function (isSkillGroup) {
        var headerName = "Skill";
        if (isSkillGroup) {
            headerName = "Skill Group";
        }
        this.openSkillGroupDialog(Action.ADD, null, headerName, isSkillGroup);
    };
    SkillComponent.prototype.editEntity = function (isSkillGroup) {
        var id = "sg_0";
        var url = '';
        var headerName = '';
        if (isSkillGroup) {
            id = this.selectedId.replace('sg_', '');
            url = "skill/getSkillGroupById";
            headerName = "Skill Group";
        }
        else {
            id = this.selectedId.replace('s_', '');
            url = "skill/getSkillById";
            headerName = "Skill";
        }
        var data = {};
        data["id"] = id;
        this.httpCustomService.commonHttpRequest("getEntity_ID_" + id, url, data, this.getEntitySuccess.bind(this, headerName, isSkillGroup));
    };
    SkillComponent.prototype.removeEntity = function (isSkillGroup) {
        var _this = this;
        var dialogRef = this.dialog.open(confirmation_dialog_1.ConfirmationDialog);
        dialogRef.disableClose = true;
        if (isSkillGroup) {
            dialogRef.componentInstance.title = "Remove Skill Group";
            if (!this.isLeaf) {
                dialogRef.componentInstance.message = "Cannot remove a Skill Group please remove skill's first";
            }
            else {
                dialogRef.componentInstance.message = "Are you sure you want to remove Skill Group";
                dialogRef.afterClosed().subscribe(function (result) {
                    if (result == true) {
                        var id = _this.selectedId.replace('sg_', '');
                        var data = { id: id, companyId: _this.companyId };
                        _this.httpCustomService.commonHttpRequest("removeSkillGroup_ID_" + id, "skill/removeSkillGroup", data, _this.generateSkillTree.bind(_this, false));
                    }
                });
            }
        }
        else {
            dialogRef.componentInstance.title = "Remove Skill";
            dialogRef.componentInstance.message = "Are you sure you want to remove Skill";
            dialogRef.afterClosed().subscribe(function (result) {
                if (result == true) {
                    var id = _this.selectedId.replace('s_', '');
                    var data = { id: id, companyId: _this.companyId };
                    _this.httpCustomService.commonHttpRequest("removeSkill_ID_" + id, "skill/removeSkill", data, _this.generateSkillTree.bind(_this, false));
                }
            });
        }
    };
    SkillComponent.prototype.openSkillGroupDialog = function (action, entity, entityType, isSkillGroup) {
        var _this = this;
        var dialogRef = this.dialog.open(skill_dialog_component_1.SkillDialog);
        dialogRef.disableClose = true;
        var skillGroupId = this.selectedId;
        if (action === Action.EDIT && !isSkillGroup) {
            skillGroupId = "sg_" + entity.skillGroup.id;
        }
        this.setSkillGroupActionButtonAndHeader(dialogRef, action, entityType, isSkillGroup, skillGroupId);
        if (entity != null) {
            dialogRef.componentInstance.setDialogDetails(entity);
        }
        dialogRef.afterClosed().subscribe(function (data) {
            if (data) {
                if (isSkillGroup) {
                    var companyObj = { id: data.companyId };
                    var skillGroup = {
                        id: data.id,
                        name: data.name.trim(),
                        abbreviation: data.abbreviation.trim(),
                        company: companyObj
                    };
                    _this.httpCustomService.commonHttpRequest("addSkillGroup", "skill/skillGroup/add", skillGroup, _this.generateSkillTree.bind(_this, false), null, common_1.HttpType.POST);
                }
                else {
                    var skill = {
                        id: data.id,
                        name: data.name.trim(),
                        abbreviation: data.abbreviation.trim(),
                        skillGroup: { id: data.skillGroup }
                    };
                    _this.httpCustomService.commonHttpRequest("addSkill", "skill/add", skill, _this.generateSkillTree.bind(_this, false), null, common_1.HttpType.POST);
                }
            }
        });
    };
    SkillComponent.prototype.setSkillGroupActionButtonAndHeader = function (dialogRef, action, entityType, isSkillGroup, skillGroupId) {
        if (action === Action.ADD) {
            dialogRef.componentInstance.setTitle("Add " + entityType);
            dialogRef.componentInstance.setActionButtonString("Add");
            dialogRef.componentInstance.setIsEdit(false);
        }
        else if (action == Action.EDIT) {
            dialogRef.componentInstance.setTitle("Edit " + entityType);
            dialogRef.componentInstance.setActionButtonString("Edit");
            dialogRef.componentInstance.setIsEdit(true);
        }
        dialogRef.componentInstance.setSkillGroupDialogDetails(isSkillGroup, this.skillGroups, skillGroupId);
    };
    SkillComponent.prototype.getEntitySuccess = function (headerName, isSkillGroup, data) {
        this.openSkillGroupDialog(Action.EDIT, data.entity, headerName, isSkillGroup);
    };
    return SkillComponent;
}());
__decorate([
    core_1.ViewChild(angular_tree_component_1.TreeComponent),
    __metadata("design:type", typeof (_a = typeof angular_tree_component_1.TreeComponent !== "undefined" && angular_tree_component_1.TreeComponent) === "function" && _a || Object)
], SkillComponent.prototype, "tree", void 0);
SkillComponent = __decorate([
    core_1.Component({
        selector: 'skill-cmp',
        template: __webpack_require__(712),
        providers: []
    }),
    __metadata("design:paramtypes", [typeof (_b = typeof common_1.HttpCustomService !== "undefined" && common_1.HttpCustomService) === "function" && _b || Object, typeof (_c = typeof material_1.MdDialog !== "undefined" && material_1.MdDialog) === "function" && _c || Object, typeof (_d = typeof custom_validation_service_1.CustomValidationService !== "undefined" && custom_validation_service_1.CustomValidationService) === "function" && _d || Object])
], SkillComponent);
exports.SkillComponent = SkillComponent;
var Action;
(function (Action) {
    Action[Action["ADD"] = 0] = "ADD";
    Action[Action["EDIT"] = 1] = "EDIT";
})(Action = exports.Action || (exports.Action = {}));
var _a, _b, _c, _d;
//# sourceMappingURL=skill.component.js.map

/***/ }),

/***/ 523:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(1);
var material_1 = __webpack_require__(16);
var angular_tree_component_1 = __webpack_require__(93);
var unit_dialog_1 = __webpack_require__(270);
var confirmation_dialog_1 = __webpack_require__(41);
var common_http_service_1 = __webpack_require__(22);
var http_request_metadata_1 = __webpack_require__(27);
var data_component_1 = __webpack_require__(172);
var UnitComponent = (function () {
    function UnitComponent(httpCustomService, dialog) {
        this.httpCustomService = httpCustomService;
        this.dialog = dialog;
        this.nodes = [{
                name: '',
                children: []
            }];
        this.addAction = "Add Level";
        this.editAction = "Add Level";
        this.removeAction = "Add Level";
        this.isAddShow = false;
        this.isEditShow = false;
        this.isRemoveShow = false;
        this.selectedId = "";
        this.parentId = "";
        this.itemLevels = [];
        this.treeTitle = "Units";
        this.isLeaf = false;
        this.treeType = data_component_1.TreeType.UnitTree;
    }
    UnitComponent.prototype.ngOnInit = function () {
        if (this.treeType == data_component_1.TreeType.LocationTree) {
            this.getUnitTree("location/locationTree");
            this.addItemHttpUrl = "location/addLocation";
            this.getItemHttpUrl = "location/getLocation";
            this.removeItemHttpUrl = "location/deleteLocation";
            this.treeTitle = "Locations";
        }
        else {
            this.getUnitTree("unit/unitTree");
            this.addItemHttpUrl = "unit/addUnit";
            this.getItemHttpUrl = "unit/getUnit";
            this.removeItemHttpUrl = "unit/deleteUnit";
        }
    };
    UnitComponent.prototype.getUnitTree = function (httpUrl) {
        var data = {};
        this.httpCustomService.commonHttpRequest("unitTree", httpUrl, data, this.getUnitTreeSuccess.bind(this));
    };
    UnitComponent.prototype.getUnitTreeSuccess = function (data) {
        if (data.success) {
            this.nodes = data.itemTree;
            this.itemLevels = data.itemLevel;
        }
    };
    UnitComponent.prototype.addUnit = function () {
        var _this = this;
        var dialogRef = this.dialog.open(unit_dialog_1.UnitDialog);
        dialogRef.componentInstance.setTitle(this.addAction);
        dialogRef.componentInstance.setActionButton("Add");
        var ids = this.selectedId.split("_");
        dialogRef.componentInstance.setParentUnitId(ids[1]);
        dialogRef.componentInstance.setUnitLevelId(this.getUnitLevel(ids[0]));
        dialogRef.afterClosed().subscribe(function (result) {
            if (result) {
                _this.httpCustomService.commonHttpRequest("addItem", _this.addItemHttpUrl, result, _this.addUnitSuccess.bind(_this), null, http_request_metadata_1.HttpType.POST);
            }
        });
    };
    UnitComponent.prototype.addUnitSuccess = function (data) {
        this.nodes = data.itemTree;
    };
    UnitComponent.prototype.editUnit = function () {
        var ids = this.selectedId.split("_");
        var data = {
            id: ids[1]
        };
        this.httpCustomService.commonHttpRequest("getItem", this.getItemHttpUrl, data, this.getUnitSuccess.bind(this));
    };
    UnitComponent.prototype.removeUnit = function () {
        var ids = this.selectedId.split("_");
        var data = {
            id: ids[1]
        };
        this.httpCustomService.commonHttpRequest("getItem", this.getItemHttpUrl, data, this.getUnitForRemoveSuccess.bind(this, ids[1]));
    };
    UnitComponent.prototype.getUnitForRemoveSuccess = function (nodeId, data) {
        var _this = this;
        if (data.success) {
            var dialogRef = this.dialog.open(confirmation_dialog_1.ConfirmationDialog);
            if (!this.isLeaf) {
                dialogRef.componentInstance.title = "Remove " + this.removeAction;
                dialogRef.componentInstance.message = "Cannot remove a parent " + data.item.name + " please remove childs first";
                dialogRef.componentInstance.isCancelButtonVisible = false;
            }
            else {
                dialogRef.componentInstance.title = "Remove " + this.removeAction;
                dialogRef.componentInstance.message = "Are you sure you want to remove " + data.item.name;
                dialogRef.afterClosed().subscribe(function (result) {
                    if (result == true) {
                        var data = {
                            id: nodeId
                        };
                        _this.httpCustomService.commonHttpRequest("deleteItem", _this.removeItemHttpUrl, data, _this.deleteUnitSuccess.bind(_this));
                    }
                });
            }
        }
    };
    UnitComponent.prototype.deleteUnitSuccess = function (data) {
        if (data.success) {
            this.nodes = data.itemTree;
            var parentNode = this.tree.treeModel.getNodeById(this.parentId);
            var children = parentNode.children;
            /// colapse if deleted node is the last child
            if (children.length == 1) {
                parentNode.collapse();
            }
        }
    };
    UnitComponent.prototype.getUnitSuccess = function (data) {
        var _this = this;
        if (data.success) {
            var dialogRef = this.dialog.open(unit_dialog_1.UnitDialog);
            dialogRef.componentInstance.setTitle(this.editAction);
            dialogRef.componentInstance.setActionButton("Edit");
            dialogRef.componentInstance.setTreeType(this.treeType);
            dialogRef.componentInstance.setFormValues(data.item);
            dialogRef.componentInstance.setIsEdit(true);
            dialogRef.afterClosed().subscribe(function (result) {
                if (result) {
                    _this.httpCustomService.commonHttpRequest("addUnit", _this.addItemHttpUrl, result, _this.addUnitSuccess.bind(_this), null, http_request_metadata_1.HttpType.POST);
                }
            });
        }
    };
    UnitComponent.prototype.getUnitLevel = function (id) {
        var index = 0;
        for (var _i = 0, _a = this.itemLevels; _i < _a.length; _i++) {
            var unitLevel = _a[_i];
            if (id == unitLevel.id) {
                return this.itemLevels[index + 1].id;
            }
            index++;
        }
        return 0;
    };
    UnitComponent.prototype.treeclickEvent = function (event) {
        //debugger;
        this.selectedId = event.node.id;
        this.parentId = event.node.parent.id;
        this.isLeaf = event.node.isLeaf;
        this.setActionButtons(this.selectedId);
    };
    UnitComponent.prototype.setActionButtons = function (id) {
        var ids = id.split("_");
        var index = 0;
        this.isAddShow = false;
        this.isEditShow = false;
        this.isRemoveShow = false;
        for (var _i = 0, _a = this.itemLevels; _i < _a.length; _i++) {
            var unitLevel = _a[_i];
            if (ids[0] == unitLevel.id) {
                this.editAction = unitLevel.name;
                this.removeAction = unitLevel.name;
                if ((index + 1) <= (this.itemLevels.length - 1)) {
                    this.isAddShow = true;
                    this.addAction = this.itemLevels[index + 1].name;
                    this.isAddShow = true;
                }
                if (index != 0) {
                    this.isEditShow = true;
                    this.isRemoveShow = true;
                }
                return false;
            }
            index++;
        }
    };
    return UnitComponent;
}());
__decorate([
    core_1.ViewChild(angular_tree_component_1.TreeComponent),
    __metadata("design:type", typeof (_a = typeof angular_tree_component_1.TreeComponent !== "undefined" && angular_tree_component_1.TreeComponent) === "function" && _a || Object)
], UnitComponent.prototype, "tree", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", typeof (_b = typeof data_component_1.TreeType !== "undefined" && data_component_1.TreeType) === "function" && _b || Object)
], UnitComponent.prototype, "treeType", void 0);
UnitComponent = __decorate([
    core_1.Component({
        selector: 'unit-cmp',
        template: __webpack_require__(713),
        providers: [common_http_service_1.HttpCustomService]
    }),
    __metadata("design:paramtypes", [typeof (_c = typeof common_http_service_1.HttpCustomService !== "undefined" && common_http_service_1.HttpCustomService) === "function" && _c || Object, typeof (_d = typeof material_1.MdDialog !== "undefined" && material_1.MdDialog) === "function" && _d || Object])
], UnitComponent);
exports.UnitComponent = UnitComponent;
var _a, _b, _c, _d;
//# sourceMappingURL=unit-component.js.map

/***/ }),

/***/ 524:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(1);
var setting_routes_config_1 = __webpack_require__(170);
var custom_validation_service_1 = __webpack_require__(17);
var SettingComponent = (function () {
    function SettingComponent(customeValidation) {
        this.customeValidation = customeValidation;
    }
    SettingComponent.prototype.ngOnInit = function () {
        this.customeValidation.check(setting_routes_config_1.SETTING_ROUTS);
    };
    ;
    return SettingComponent;
}());
SettingComponent = __decorate([
    core_1.Component({
        selector: 'setting-cmp',
        template: __webpack_require__(715)
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof custom_validation_service_1.CustomValidationService !== "undefined" && custom_validation_service_1.CustomValidationService) === "function" && _a || Object])
], SettingComponent);
exports.SettingComponent = SettingComponent;
var _a;
//# sourceMappingURL=setting.component.js.map

/***/ }),

/***/ 525:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var shared_module_1 = __webpack_require__(278);
var setting_routes_1 = __webpack_require__(526);
var core_1 = __webpack_require__(1);
var router_1 = __webpack_require__(36);
var setting_component_1 = __webpack_require__(524);
var unit_level_dialog_1 = __webpack_require__(168);
var forms_1 = __webpack_require__(12);
var common_1 = __webpack_require__(15);
var platform_browser_1 = __webpack_require__(51);
var unit_dialog_1 = __webpack_require__(270);
var jobType_component_1 = __webpack_require__(257);
var job_status_config_comoponent_1 = __webpack_require__(268);
var job_status_action_component_1 = __webpack_require__(267);
var job_status_dialog_1 = __webpack_require__(169);
var SettingModule = (function () {
    function SettingModule() {
    }
    return SettingModule;
}());
SettingModule = __decorate([
    core_1.NgModule({
        imports: [
            router_1.RouterModule.forChild(setting_routes_1.GENERAL_SETTING_MODULE_ROUTES), shared_module_1.SharedModule, forms_1.FormsModule, forms_1.ReactiveFormsModule,
            platform_browser_1.BrowserModule, common_1.CommonModule
        ],
        entryComponents: [unit_level_dialog_1.UnitLevelDialog, unit_dialog_1.UnitDialog, job_status_action_component_1.JobStatusAction, job_status_dialog_1.JobStatusDialog, jobType_component_1.JobTypeComponent],
        declarations: [setting_routes_1.GENERAL_SETTING_MODULE_COMPONENTS, setting_component_1.SettingComponent, unit_level_dialog_1.UnitLevelDialog, unit_dialog_1.UnitDialog,
            jobType_component_1.JobTypeComponent, job_status_config_comoponent_1.JobStatusConfig, job_status_action_component_1.JobStatusAction, job_status_dialog_1.JobStatusDialog],
        exports: [setting_routes_1.GENERAL_SETTING_MODULE_COMPONENTS, setting_component_1.SettingComponent, shared_module_1.SharedModule]
    })
], SettingModule);
exports.SettingModule = SettingModule;
//# sourceMappingURL=setting.module.js.map

/***/ }),

/***/ 526:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var can_activate_authguard_1 = __webpack_require__(164);
var generalsetting_component_1 = __webpack_require__(518);
var category_grade_component_1 = __webpack_require__(116);
var unit_hierarchy_component_1 = __webpack_require__(266);
var location_hierarchy_component_1 = __webpack_require__(519);
var jobType_component_1 = __webpack_require__(257);
var job_status_config_comoponent_1 = __webpack_require__(268);
var employee_type_component_1 = __webpack_require__(166);
var customer_profiles_component_1 = __webpack_require__(501);
var customer_profile_component_1 = __webpack_require__(500);
exports.GENERAL_SETTING_MODULE_ROUTES = [
    { path: 'generalsetting', component: generalsetting_component_1.GeneralSettingComponent, canActivate: [can_activate_authguard_1.CanActivateAuthGuard] },
    { path: 'jobTypes', component: jobType_component_1.JobTypeComponent, canActivate: [can_activate_authguard_1.CanActivateAuthGuard] },
    { path: 'employeeList', component: generalsetting_component_1.GeneralSettingComponent, canActivate: [can_activate_authguard_1.CanActivateAuthGuard] },
    { path: 'customer', component: customer_profiles_component_1.CustomerProfiles, canActivate: [can_activate_authguard_1.CanActivateAuthGuard] },
    { path: 'location', component: generalsetting_component_1.GeneralSettingComponent, canActivate: [can_activate_authguard_1.CanActivateAuthGuard] },
    { path: 'contact', component: generalsetting_component_1.GeneralSettingComponent, canActivate: [can_activate_authguard_1.CanActivateAuthGuard] },
    { path: 'categoryAndGrades', component: category_grade_component_1.CategoryComponent },
    { path: 'unitHierarchy', component: unit_hierarchy_component_1.UnitHierarchy, canActivate: [can_activate_authguard_1.CanActivateAuthGuard] },
    { path: 'locationHierarchy', component: location_hierarchy_component_1.LocationHierarchy, canActivate: [can_activate_authguard_1.CanActivateAuthGuard] },
    { path: 'jobStatusConfig', component: job_status_config_comoponent_1.JobStatusConfig },
    { path: 'customerprofile', component: customer_profile_component_1.CustomerProfile }
];
exports.GENERAL_SETTING_MODULE_COMPONENTS = [
    generalsetting_component_1.GeneralSettingComponent,
    unit_hierarchy_component_1.UnitHierarchy,
    location_hierarchy_component_1.LocationHierarchy,
    jobType_component_1.JobTypeComponent,
    employee_type_component_1.EmployeeTypesComponent,
    customer_profiles_component_1.CustomerProfiles,
    customer_profile_component_1.CustomerProfile
];
//# sourceMappingURL=setting.routes.js.map

/***/ }),

/***/ 527:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(1);
var common_1 = __webpack_require__(15);
var forms_1 = __webpack_require__(12);
var main_1 = __webpack_require__(494);
var pagination_component_1 = __webpack_require__(272);
var header_component_1 = __webpack_require__(271);
var table_component_1 = __webpack_require__(31);
var material_module_1 = __webpack_require__(273);
var name_renderer_component_1 = __webpack_require__(88);
var status_renderer_component_1 = __webpack_require__(119);
var action_renderer_component_1 = __webpack_require__(118);
var duration_renderer_component_1 = __webpack_require__(173);
var notification_action_renderer_component_1 = __webpack_require__(275);
var checkbox_renderer_component_1 = __webpack_require__(274);
var utilization_renderer_component_1 = __webpack_require__(276);
var work_time_line_renderer_component_1 = __webpack_require__(277);
var order_renderer_component_1 = __webpack_require__(534);
var unit_hierarchy_action_component_1 = __webpack_require__(265);
var employee_status_action_component_1 = __webpack_require__(263);
var jobType_actionRenderer_1 = __webpack_require__(255);
var employee_type_component_1 = __webpack_require__(166);
var employee_action_component_1 = __webpack_require__(165);
var reports_component_1 = __webpack_require__(260);
var GridCustomModule = (function () {
    function GridCustomModule() {
    }
    return GridCustomModule;
}());
GridCustomModule = __decorate([
    core_1.NgModule({
        imports: [
            common_1.CommonModule,
            material_module_1.MaterialModule,
            forms_1.FormsModule,
            main_1.AgGridModule.withComponents([name_renderer_component_1.NameRendererComponent, status_renderer_component_1.StatusRendererComponent, action_renderer_component_1.ActionRendererComponent, duration_renderer_component_1.DurationRendererComponent, notification_action_renderer_component_1.NotificationActionRendererComponent, checkbox_renderer_component_1.CheckBoxRendererComponent, utilization_renderer_component_1.UtilizationRendererComponent, work_time_line_renderer_component_1.WorkTimeLineRendererComponent, order_renderer_component_1.OrderRendererComponent, employee_status_action_component_1.EmployeeStatusActionRendererComponent, jobType_actionRenderer_1.JobTypeActionRendererComponent, employee_type_component_1.EmpTypeCellActionRenderer, employee_action_component_1.EmployeeProfileActionRendererComponent, reports_component_1.ViewActionRendererComponent])
        ],
        entryComponents: [unit_hierarchy_action_component_1.UnitHierarchyAction],
        declarations: [pagination_component_1.PaginationComponent, header_component_1.GridHeaderComponent, table_component_1.AgGridTableCustomComponent, name_renderer_component_1.NameRendererComponent, status_renderer_component_1.StatusRendererComponent, action_renderer_component_1.ActionRendererComponent, duration_renderer_component_1.DurationRendererComponent, notification_action_renderer_component_1.NotificationActionRendererComponent, checkbox_renderer_component_1.CheckBoxRendererComponent, utilization_renderer_component_1.UtilizationRendererComponent, work_time_line_renderer_component_1.WorkTimeLineRendererComponent, order_renderer_component_1.OrderRendererComponent, unit_hierarchy_action_component_1.UnitHierarchyAction, employee_status_action_component_1.EmployeeStatusActionRendererComponent, jobType_actionRenderer_1.JobTypeActionRendererComponent, employee_type_component_1.EmpTypeCellActionRenderer, employee_action_component_1.EmployeeProfileActionRendererComponent, reports_component_1.ViewActionRendererComponent],
        exports: [pagination_component_1.PaginationComponent, header_component_1.GridHeaderComponent, table_component_1.AgGridTableCustomComponent]
    })
], GridCustomModule);
exports.GridCustomModule = GridCustomModule;
//# sourceMappingURL=aggrid-custom.module.js.map

/***/ }),

/***/ 528:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(1);
var _ = __webpack_require__(985);
var PaginationService = (function () {
    function PaginationService() {
    }
    PaginationService.prototype.getPager = function (totalItems, currentPage, api, pageSize) {
        if (currentPage === void 0) { currentPage = 1; }
        if (pageSize === void 0) { pageSize = 10; }
        // calculate total pages
        var totalPages = Math.ceil(totalItems / pageSize);
        var startPage, endPage;
        if (totalPages <= 5) {
            // less than 10 total pages so show all
            startPage = 1;
            endPage = totalPages;
        }
        else {
            // more than 10 total pages so calculate start and end pages
            if (currentPage <= 2) {
                startPage = 1;
                endPage = 5;
            }
            else if (currentPage + 4 >= totalPages) {
                startPage = totalPages - 4;
                endPage = totalPages;
            }
            else {
                startPage = currentPage - 2;
                endPage = currentPage + 2;
            }
        }
        // calculate start and end item indexes
        var startIndex = (currentPage - 1) * pageSize;
        var endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);
        // create an array of pages to ng-repeat in the pager control
        // need to do
        var pages = _.range(startPage, endPage + 1);
        // return object with all pager properties required by the view
        //set ag grid
        api.paginationGoToPage(currentPage - 1);
        return {
            totalItems: totalItems,
            currentPage: currentPage,
            pageSize: pageSize,
            totalPages: totalPages,
            startPage: startPage,
            endPage: endPage,
            startIndex: startIndex,
            endIndex: endIndex,
            pages: pages
        };
    };
    return PaginationService;
}());
PaginationService = __decorate([
    core_1.Injectable()
], PaginationService);
exports.PaginationService = PaginationService;
//# sourceMappingURL=pagination.service.js.map

/***/ }),

/***/ 529:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(1);
var FooterComponent = (function () {
    function FooterComponent() {
        this.test = new Date();
    }
    return FooterComponent;
}());
FooterComponent = __decorate([
    core_1.Component({
        selector: 'footer-cmp',
        template: __webpack_require__(719)
    })
], FooterComponent);
exports.FooterComponent = FooterComponent;
//# sourceMappingURL=footer.component.js.map

/***/ }),

/***/ 530:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(1);
var common_1 = __webpack_require__(15);
var router_1 = __webpack_require__(36);
var footer_component_1 = __webpack_require__(529);
var FooterModule = (function () {
    function FooterModule() {
    }
    return FooterModule;
}());
FooterModule = __decorate([
    core_1.NgModule({
        imports: [router_1.RouterModule, common_1.CommonModule],
        declarations: [footer_component_1.FooterComponent],
        exports: [footer_component_1.FooterComponent]
    })
], FooterModule);
exports.FooterModule = FooterModule;
//# sourceMappingURL=footer.module.js.map

/***/ }),

/***/ 531:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.LANGUAGE_ROUTS = [
    { value: 'en', title: 'English' },
    { value: 'es', title: 'Español' },
    { value: 'th', title: 'ไทย' }
];
//# sourceMappingURL=language-routes.config.js.map

/***/ }),

/***/ 532:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(1);
var sidebar_routes_config_1 = __webpack_require__(280);
var setting_routes_config_1 = __webpack_require__(170);
var translate_1 = __webpack_require__(120);
var common_1 = __webpack_require__(15);
var language_routes_config_1 = __webpack_require__(531);
var authentication_service_1 = __webpack_require__(40);
var NavbarComponent = (function () {
    function NavbarComponent(location, _translate, authService) {
        this._translate = _translate;
        this.authService = authService;
        this.location = location;
    }
    NavbarComponent.prototype.ngOnInit = function () {
        this.listTitles = sidebar_routes_config_1.ROUTES.filter(function (listTitle) { return listTitle; });
        this.settingMenuItems = setting_routes_config_1.SETTING_ROUTS.filter(function (settingMenuItem) { return settingMenuItem; });
        this.languageMenuItems = language_routes_config_1.LANGUAGE_ROUTS.filter(function (languageMenuItem) { return languageMenuItem; });
        // set current langage
        this.selectLang('en');
        //componentHandler.upgradeAllRegistered();
    };
    NavbarComponent.prototype.getTitle = function () {
        var titlee = this.location.prepareExternalUrl(this.location.path());
        if (titlee.charAt(0) === '#') {
            titlee = titlee.slice(2);
        }
        for (var item = 0; item < this.listTitles.length; item++) {
            if (this.listTitles[item].path === titlee) {
                return this._translate.instant(this.listTitles[item].title);
            }
        }
        for (var item = 0; item < this.settingMenuItems.length; item++) {
            if (this.settingMenuItems[item].path === titlee) {
                return this._translate.instant(this.settingMenuItems[item].title);
            }
        }
        return this._translate.instant('dashboard');
    };
    NavbarComponent.prototype.isCurrentLang = function (lang) {
        // check if the selected lang is current lang
        return lang === this._translate.currentLang;
    };
    NavbarComponent.prototype.selectLang = function (lang) {
        // set current lang;
        this._translate.use(lang);
    };
    NavbarComponent.prototype.logout = function () {
        if (this.authService.isLoggedIn()) {
            this.authService.logout();
        }
    };
    return NavbarComponent;
}());
NavbarComponent = __decorate([
    core_1.Component({
        selector: 'navbar-cmp',
        template: __webpack_require__(720)
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof common_1.Location !== "undefined" && common_1.Location) === "function" && _a || Object, typeof (_b = typeof translate_1.TranslateService !== "undefined" && translate_1.TranslateService) === "function" && _b || Object, typeof (_c = typeof authentication_service_1.AuthenticationService !== "undefined" && authentication_service_1.AuthenticationService) === "function" && _c || Object])
], NavbarComponent);
exports.NavbarComponent = NavbarComponent;
var _a, _b, _c;
//# sourceMappingURL=navbar.component.js.map

/***/ }),

/***/ 533:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(1);
var common_1 = __webpack_require__(15);
var router_1 = __webpack_require__(36);
var navbar_component_1 = __webpack_require__(532);
var NavbarModule = (function () {
    function NavbarModule() {
    }
    return NavbarModule;
}());
NavbarModule = __decorate([
    core_1.NgModule({
        imports: [router_1.RouterModule, common_1.CommonModule],
        declarations: [navbar_component_1.NavbarComponent],
        exports: [navbar_component_1.NavbarComponent]
    })
], NavbarModule);
exports.NavbarModule = NavbarModule;
//# sourceMappingURL=navbar.module.js.map

/***/ }),

/***/ 534:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(1);
var OrderRendererComponent = (function () {
    function OrderRendererComponent() {
    }
    OrderRendererComponent.prototype.agInit = function (params) {
        this.params = params;
        this.priority = params.data.priority;
    };
    return OrderRendererComponent;
}());
OrderRendererComponent = __decorate([
    core_1.Component({
        selector: 'full-width-cell',
        template: "<td class=\"text-center table-action\">{{priority}}</td>"
    })
], OrderRendererComponent);
exports.OrderRendererComponent = OrderRendererComponent;
//# sourceMappingURL=order-renderer.component.js.map

/***/ }),

/***/ 535:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.LANG_EN_NAME = 'en';
exports.LANG_EN_TRANS = {
    'dashboard': 'Dashboard',
    'jobList': 'Job List',
    'employees': 'Employees',
    'reports': 'Reports',
    'notifications': 'Notifications',
    'accessControl': 'Access Control',
    'employeeStatus': 'Employee Status',
    'employeeProfiles': 'Employee Profiles',
    'workTimeLine': 'Work Timeline',
    'caresystems': 'Care Systems',
    'staff': 'Staff',
    'dispatch': 'Dispatching',
    'login': 'Login',
    'logout': 'Logout',
    'username': 'Username',
    'password': 'Password',
    'rememberme': 'Remember me on this computer',
    'forgotpassword': 'Forgot your password?',
    'productivity': 'Productivity',
    'realTimeOptimization': 'Real Time Optimization',
    'happyEmployees': 'Happy Employees',
    'proctivityParagraph': 'Our Automated staff dispatching system is designed to improve your response time, while improving staff productivity. ',
    'realTimeOptimizationParagraph': 'Dispatch managers immedeately can respond to changes in order to reduce delays and improve service level.',
    'happyEmployeesPragraph': 'Fairness in job assignment ability to keep a track of their performance will improve your staff\'s satisfaction.',
    'SUNDAY': 'Sunday',
    'MONDAY': 'Monday',
    'TUESDAY': 'Tuesday',
    'WEDNESDAY': 'Wednesday',
    'THURSDAY': 'Thursday',
    'FRIDAY': 'Friday',
    'SATURDAY': 'Saturday',
    'locations': 'Locations'
};
//# sourceMappingURL=lang-en.js.map

/***/ }),

/***/ 536:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.LANG_ES_NAME = 'es';
exports.LANG_ES_TRANS = {
    'dashboard': 'Tablero',
    'jobList': 'Lista de trabajo',
    'employees': 'Empleados',
    'reports': 'Informes',
    'notifications': 'Notificaciones',
    'SUNDAY': 'DOMINGO',
    'MONDAY': 'LUNES',
    'TUESDAY': 'MARTES',
    'WEDNESDAY': 'MIÉRCOLES',
    'THURSDAY': 'JUEVES',
    'FRIDAY': 'VIERNES',
    'SATURDAY': 'SÁBADO'
};
//# sourceMappingURL=lang-es.js.map

/***/ }),

/***/ 537:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.LANG_TH_NAME = 'th';
exports.LANG_TH_TRANS = {
    'dashboard': 'แผงควบคุม',
    'jobList': 'รายชื่องาน',
    'employees': 'พนักงาน',
    'reports': 'รายงาน',
    'notifications': 'การแจ้งเตือน',
    'caresystems': 'CareSystems',
    'staff': 'บุคลากร',
    'dispatch': 'ฆ่า',
    'login': 'เข้าสู่ระบบ',
    'logout': 'ออกจากระบบ',
    'username': 'ชื่อผู้ใช้',
    'password': 'รหัสผ่าน',
    'rememberme': 'จดจำฉันในคอมพิวเตอร์เครื่องนี้',
    'forgotpassword': 'ลืมรหัสผ่านหรือไม่?',
    'SUNDAY': 'วันอาทิตย์',
    'MONDAY': 'วันจันทร์',
    'TUESDAY': 'วันอังคาร',
    'WEDNESDAY': 'วันพุธ',
    'THURSDAY': 'วันพฤหัสบดี',
    'FRIDAY': 'วันศุกร์',
    'SATURDAY': 'วันเสาร์'
};
//# sourceMappingURL=lang-th.js.map

/***/ }),

/***/ 538:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(1);
var translate_1 = __webpack_require__(120); // our translate service
var TranslatePipe = (function () {
    function TranslatePipe(_translate) {
        this._translate = _translate;
    }
    TranslatePipe.prototype.transform = function (value, args) {
        if (!value)
            return;
        return this._translate.instant(value);
    };
    return TranslatePipe;
}());
TranslatePipe = __decorate([
    core_1.Pipe({
        name: 'translate',
        pure: false // add in this line, update value when we change language
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof translate_1.TranslateService !== "undefined" && translate_1.TranslateService) === "function" && _a || Object])
], TranslatePipe);
exports.TranslatePipe = TranslatePipe;
var _a;
//# sourceMappingURL=translate.pipe.js.map

/***/ }),

/***/ 539:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(1);
var translations_1 = __webpack_require__(279); // import our opaque token
var TranslateService = (function () {
    // inject our translations
    function TranslateService(_translations) {
        this._translations = _translations;
    }
    Object.defineProperty(TranslateService.prototype, "currentLang", {
        get: function () {
            return this._currentLang;
        },
        enumerable: true,
        configurable: true
    });
    TranslateService.prototype.use = function (lang) {
        // set current language
        this._currentLang = lang;
    };
    TranslateService.prototype.translate = function (key) {
        // private perform translation
        var translation = key;
        if (this._translations[this.currentLang] && this._translations[this.currentLang][key]) {
            return this._translations[this.currentLang][key];
        }
        return translation;
    };
    TranslateService.prototype.instant = function (key) {
        // call translation
        return this.translate(key);
    };
    return TranslateService;
}());
TranslateService = __decorate([
    core_1.Injectable(),
    __param(0, core_1.Inject(translations_1.TRANSLATIONS)),
    __metadata("design:paramtypes", [Object])
], TranslateService);
exports.TranslateService = TranslateService;
//# sourceMappingURL=translate.service.js.map

/***/ }),

/***/ 540:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(1);
var sidebar_routes_config_1 = __webpack_require__(280);
var custom_validation_service_1 = __webpack_require__(17);
var SidebarComponent = (function () {
    function SidebarComponent(customValidationService) {
        this.customValidationService = customValidationService;
    }
    SidebarComponent.prototype.ngOnInit = function () {
        this.menuItems = sidebar_routes_config_1.ROUTES.filter(this.check);
    };
    SidebarComponent.prototype.check = function (element, index, array) {
        if (localStorage.getItem("permissionList") != "undefined") {
            var permissions = JSON.parse(localStorage.getItem("permissionList"));
            // permissions=JSON.parse(permissions);
            if (permissions != null) {
                var pos = permissions.findIndex(function (x) { return x.permissionName == element.permission; });
                if (pos > -1) {
                    if (element.children.length > 0) {
                        var i = 0;
                        var _loop_1 = function (route) {
                            // permissions=JSON.parse(permissions);
                            var position = permissions.findIndex(function (x) { return x.permissionName == route.permission; });
                            if (position == -1) {
                                element.children.splice(i, 1);
                            }
                            i++;
                        };
                        for (var _i = 0, _a = element.children; _i < _a.length; _i++) {
                            var route = _a[_i];
                            _loop_1(route);
                        }
                        // this.customValidationService.check(element.children);
                    }
                    return true;
                }
                else {
                    return false;
                }
            }
        }
    };
    return SidebarComponent;
}());
SidebarComponent = __decorate([
    core_1.Component({
        selector: 'sidebar-cmp',
        template: __webpack_require__(721),
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof custom_validation_service_1.CustomValidationService !== "undefined" && custom_validation_service_1.CustomValidationService) === "function" && _a || Object])
], SidebarComponent);
exports.SidebarComponent = SidebarComponent;
var _a;
//# sourceMappingURL=sidebar.component.js.map

/***/ }),

/***/ 541:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var translate_module_1 = __webpack_require__(174);
var core_1 = __webpack_require__(1);
var common_1 = __webpack_require__(15);
var router_1 = __webpack_require__(36);
var sidebar_component_1 = __webpack_require__(540);
var SidebarModule = (function () {
    function SidebarModule() {
    }
    return SidebarModule;
}());
SidebarModule = __decorate([
    core_1.NgModule({
        imports: [router_1.RouterModule, common_1.CommonModule, translate_module_1.TranslateModule],
        declarations: [sidebar_component_1.SidebarComponent],
        exports: [sidebar_component_1.SidebarComponent]
    })
], SidebarModule);
exports.SidebarModule = SidebarModule;
//# sourceMappingURL=sidebar.module.js.map

/***/ }),

/***/ 542:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

Object.defineProperty(exports, "__esModule", { value: true });
exports.environment = {
    production: false
};
//# sourceMappingURL=environment.js.map

/***/ }),

/***/ 61:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(22));
__export(__webpack_require__(27));
__export(__webpack_require__(17));
//# sourceMappingURL=index.js.map

/***/ }),

/***/ 641:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(33)(false);
// imports


// module
exports.push([module.i, "/*@import \"https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-alpha.6/css/bootstrap.min.css\";*/", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 642:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(33)(false);
// imports


// module
exports.push([module.i, ".alert {\r\n  width:200px;\r\n  margin-top:20px;\r\n  margin-bottom:20px;\r\n}\r\n\r\n.alert.alert-info {\r\n  color:#607D8B;\r\n}\r\n\r\n.alert.alert-error {\r\n  color:red;\r\n}\r\n\r\n.help-block {\r\n  width:200px;\r\n  color:white;\r\n  background-color:gray;\r\n}\r\n\r\n.form-control {\r\n  width: 200px;\r\n  margin-bottom:10px;\r\n}\r\n\r\n.btn {\r\n  margin-top:20px;\r\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 643:
/***/ (function(module, exports, __webpack_require__) {

var escape = __webpack_require__(147);
exports = module.exports = __webpack_require__(33)(false);
// imports


// module
exports.push([module.i, ".jstree-node,.jstree-children,.jstree-container-ul{display:block;margin:0;padding:0;list-style-type:none;list-style-image:none}.jstree-node{white-space:nowrap}.jstree-anchor{display:inline-block;color:#000;white-space:nowrap;padding:0 4px 0 1px;margin:0;vertical-align:top}.jstree-anchor:focus{outline:0}.jstree-anchor,.jstree-anchor:link,.jstree-anchor:visited,.jstree-anchor:hover,.jstree-anchor:active{text-decoration:none;color:inherit}.jstree-icon{display:inline-block;text-decoration:none;margin:0;padding:0;vertical-align:top;text-align:center}.jstree-icon:empty{display:inline-block;text-decoration:none;margin:0;padding:0;vertical-align:top;text-align:center}.jstree-ocl{cursor:pointer}.jstree-leaf>.jstree-ocl{cursor:default}.jstree .jstree-open>.jstree-children{display:block}.jstree .jstree-closed>.jstree-children,.jstree .jstree-leaf>.jstree-children{display:none}.jstree-anchor>.jstree-themeicon{margin-right:2px}.jstree-no-icons .jstree-themeicon,.jstree-anchor>.jstree-themeicon-hidden{display:none}.jstree-hidden,.jstree-node.jstree-hidden{display:none}.jstree-rtl .jstree-anchor{padding:0 1px 0 4px}.jstree-rtl .jstree-anchor>.jstree-themeicon{margin-left:2px;margin-right:0}.jstree-rtl .jstree-node{margin-left:0}.jstree-rtl .jstree-container-ul>.jstree-node{margin-right:0}.jstree-wholerow-ul{position:relative;display:inline-block;min-width:100%}.jstree-wholerow-ul .jstree-leaf>.jstree-ocl{cursor:pointer}.jstree-wholerow-ul .jstree-anchor,.jstree-wholerow-ul .jstree-icon{position:relative}.jstree-wholerow-ul .jstree-wholerow{width:100%;cursor:pointer;position:absolute;left:0;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.jstree-contextmenu .jstree-anchor{-webkit-user-select:none;-webkit-touch-callout:none}.vakata-context{display:none}.vakata-context,.vakata-context ul{margin:0;padding:2px;position:absolute;background:#f5f5f5;border:1px solid #979797;box-shadow:2px 2px 2px #999}.vakata-context ul{list-style:none;left:100%;margin-top:-2.7em;margin-left:-4px}.vakata-context .vakata-context-right ul{left:auto;right:100%;margin-left:auto;margin-right:-4px}.vakata-context li{list-style:none}.vakata-context li>a{display:block;padding:0 2em;text-decoration:none;width:auto;color:#000;white-space:nowrap;line-height:2.4em;text-shadow:1px 1px 0 #fff;border-radius:1px}.vakata-context li>a:hover{position:relative;background-color:#e8eff7;box-shadow:0 0 2px #0a6aa1}.vakata-context li>a.vakata-context-parent{background-image:url(data:image/gif;base64,R0lGODlhCwAHAIAAACgoKP///yH5BAEAAAEALAAAAAALAAcAAAIORI4JlrqN1oMSnmmZDQUAOw==);background-position:right center;background-repeat:no-repeat}.vakata-context li>a:focus{outline:0}.vakata-context .vakata-context-hover>a{position:relative;background-color:#e8eff7;box-shadow:0 0 2px #0a6aa1}.vakata-context .vakata-context-separator>a,.vakata-context .vakata-context-separator>a:hover{background:#fff;border:0;border-top:1px solid #e2e3e3;height:1px;min-height:1px;max-height:1px;padding:0;margin:0 0 0 2.4em;border-left:1px solid #e0e0e0;text-shadow:0 0 0 transparent;box-shadow:0 0 0 transparent;border-radius:0}.vakata-context .vakata-contextmenu-disabled a,.vakata-context .vakata-contextmenu-disabled a:hover{color:silver;background-color:transparent;border:0;box-shadow:0 0 0}.vakata-context li>a>i{text-decoration:none;display:inline-block;width:2.4em;height:2.4em;background:0 0;margin:0 0 0 -2em;vertical-align:top;text-align:center;line-height:2.4em}.vakata-context li>a>i:empty{width:2.4em;line-height:2.4em}.vakata-context li>a .vakata-contextmenu-sep{display:inline-block;width:1px;height:2.4em;background:#fff;margin:0 .5em 0 0;border-left:1px solid #e2e3e3}.vakata-context .vakata-contextmenu-shortcut{font-size:.8em;color:silver;opacity:.5;display:none}.vakata-context-rtl ul{left:auto;right:100%;margin-left:auto;margin-right:-4px}.vakata-context-rtl li>a.vakata-context-parent{background-image:url(data:image/gif;base64,R0lGODlhCwAHAIAAACgoKP///yH5BAEAAAEALAAAAAALAAcAAAINjI+AC7rWHIsPtmoxLAA7);background-position:left center;background-repeat:no-repeat}.vakata-context-rtl .vakata-context-separator>a{margin:0 2.4em 0 0;border-left:0;border-right:1px solid #e2e3e3}.vakata-context-rtl .vakata-context-left ul{right:auto;left:100%;margin-left:-4px;margin-right:auto}.vakata-context-rtl li>a>i{margin:0 -2em 0 0}.vakata-context-rtl li>a .vakata-contextmenu-sep{margin:0 0 0 .5em;border-left-color:#fff;background:#e2e3e3}#jstree-marker{position:absolute;top:0;left:0;margin:-5px 0 0 0;padding:0;border-right:0;border-top:5px solid transparent;border-bottom:5px solid transparent;border-left:5px solid;width:0;height:0;font-size:0;line-height:0}#jstree-dnd{line-height:16px;margin:0;padding:4px}#jstree-dnd .jstree-icon,#jstree-dnd .jstree-copy{display:inline-block;text-decoration:none;margin:0 2px 0 0;padding:0;width:16px;height:16px}#jstree-dnd .jstree-ok{background:green}#jstree-dnd .jstree-er{background:red}#jstree-dnd .jstree-copy{margin:0 2px}.jstree-default-dark .jstree-node,.jstree-default-dark .jstree-icon{background-repeat:no-repeat;background-color:transparent}.jstree-default-dark .jstree-anchor,.jstree-default-dark .jstree-animated,.jstree-default-dark .jstree-wholerow{transition:background-color .15s,box-shadow .15s}.jstree-default-dark .jstree-hovered{background:#555;border-radius:2px;box-shadow:inset 0 0 1px #555}.jstree-default-dark .jstree-context{background:#555;border-radius:2px;box-shadow:inset 0 0 1px #555}.jstree-default-dark .jstree-clicked{background:#5fa2db;border-radius:2px;box-shadow:inset 0 0 1px #666}.jstree-default-dark .jstree-no-icons .jstree-anchor>.jstree-themeicon{display:none}.jstree-default-dark .jstree-disabled{background:0 0;color:#666}.jstree-default-dark .jstree-disabled.jstree-hovered{background:0 0;box-shadow:none}.jstree-default-dark .jstree-disabled.jstree-clicked{background:#333}.jstree-default-dark .jstree-disabled>.jstree-icon{opacity:.8;filter:url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg'><filter id='jstree-grayscale'><feColorMatrix type='matrix' values='0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0 0 0 1 0'/></filter></svg>#jstree-grayscale\");filter:gray;-webkit-filter:grayscale(100%)}.jstree-default-dark .jstree-search{font-style:italic;color:#fff;font-weight:700}.jstree-default-dark .jstree-no-checkboxes .jstree-checkbox{display:none!important}.jstree-default-dark.jstree-checkbox-no-clicked .jstree-clicked{background:0 0;box-shadow:none}.jstree-default-dark.jstree-checkbox-no-clicked .jstree-clicked.jstree-hovered{background:#555}.jstree-default-dark.jstree-checkbox-no-clicked>.jstree-wholerow-ul .jstree-wholerow-clicked{background:0 0}.jstree-default-dark.jstree-checkbox-no-clicked>.jstree-wholerow-ul .jstree-wholerow-clicked.jstree-wholerow-hovered{background:#555}.jstree-default-dark>.jstree-striped{min-width:100%;display:inline-block;background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAAkCAMAAAB/qqA+AAAABlBMVEUAAAAAAAClZ7nPAAAAAnRSTlMNAMM9s3UAAAAXSURBVHjajcEBAQAAAIKg/H/aCQZ70AUBjAATb6YPDgAAAABJRU5ErkJggg==) left top repeat}.jstree-default-dark>.jstree-wholerow-ul .jstree-hovered,.jstree-default-dark>.jstree-wholerow-ul .jstree-clicked{background:0 0;box-shadow:none;border-radius:0}.jstree-default-dark .jstree-wholerow{box-sizing:border-box}.jstree-default-dark .jstree-wholerow-hovered{background:#555}.jstree-default-dark .jstree-wholerow-clicked{background:#5fa2db;background:linear-gradient(to bottom,#5fa2db 0,#5fa2db 100%)}.jstree-default-dark .jstree-node{min-height:24px;line-height:24px;margin-left:24px;min-width:24px}.jstree-default-dark .jstree-anchor{line-height:24px;height:24px}.jstree-default-dark .jstree-icon{width:24px;height:24px;line-height:24px}.jstree-default-dark .jstree-icon:empty{width:24px;height:24px;line-height:24px}.jstree-default-dark.jstree-rtl .jstree-node{margin-right:24px}.jstree-default-dark .jstree-wholerow{height:24px}.jstree-default-dark .jstree-node,.jstree-default-dark .jstree-icon{background-image:url(" + escape(__webpack_require__(38)) + ")}.jstree-default-dark .jstree-node{background-position:-292px -4px;background-repeat:repeat-y}.jstree-default-dark .jstree-last{background:0 0}.jstree-default-dark .jstree-open>.jstree-ocl{background-position:-132px -4px}.jstree-default-dark .jstree-closed>.jstree-ocl{background-position:-100px -4px}.jstree-default-dark .jstree-leaf>.jstree-ocl{background-position:-68px -4px}.jstree-default-dark .jstree-themeicon{background-position:-260px -4px}.jstree-default-dark>.jstree-no-dots .jstree-node,.jstree-default-dark>.jstree-no-dots .jstree-leaf>.jstree-ocl{background:0 0}.jstree-default-dark>.jstree-no-dots .jstree-open>.jstree-ocl{background-position:-36px -4px}.jstree-default-dark>.jstree-no-dots .jstree-closed>.jstree-ocl{background-position:-4px -4px}.jstree-default-dark .jstree-disabled{background:0 0}.jstree-default-dark .jstree-disabled.jstree-hovered{background:0 0}.jstree-default-dark .jstree-disabled.jstree-clicked{background:#efefef}.jstree-default-dark .jstree-checkbox{background-position:-164px -4px}.jstree-default-dark .jstree-checkbox:hover{background-position:-164px -36px}.jstree-default-dark.jstree-checkbox-selection .jstree-clicked>.jstree-checkbox,.jstree-default-dark .jstree-checked>.jstree-checkbox{background-position:-228px -4px}.jstree-default-dark.jstree-checkbox-selection .jstree-clicked>.jstree-checkbox:hover,.jstree-default-dark .jstree-checked>.jstree-checkbox:hover{background-position:-228px -36px}.jstree-default-dark .jstree-anchor>.jstree-undetermined{background-position:-196px -4px}.jstree-default-dark .jstree-anchor>.jstree-undetermined:hover{background-position:-196px -36px}.jstree-default-dark .jstree-checkbox-disabled{opacity:.8;filter:url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg'><filter id='jstree-grayscale'><feColorMatrix type='matrix' values='0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0 0 0 1 0'/></filter></svg>#jstree-grayscale\");filter:gray;-webkit-filter:grayscale(100%)}.jstree-default-dark>.jstree-striped{background-size:auto 48px}.jstree-default-dark.jstree-rtl .jstree-node{background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAACAQMAAAB49I5GAAAABlBMVEUAAAAdHRvEkCwcAAAAAXRSTlMAQObYZgAAAAxJREFUCNdjAAMOBgAAGAAJMwQHdQAAAABJRU5ErkJggg==);background-position:100% 1px;background-repeat:repeat-y}.jstree-default-dark.jstree-rtl .jstree-last{background:0 0}.jstree-default-dark.jstree-rtl .jstree-open>.jstree-ocl{background-position:-132px -36px}.jstree-default-dark.jstree-rtl .jstree-closed>.jstree-ocl{background-position:-100px -36px}.jstree-default-dark.jstree-rtl .jstree-leaf>.jstree-ocl{background-position:-68px -36px}.jstree-default-dark.jstree-rtl>.jstree-no-dots .jstree-node,.jstree-default-dark.jstree-rtl>.jstree-no-dots .jstree-leaf>.jstree-ocl{background:0 0}.jstree-default-dark.jstree-rtl>.jstree-no-dots .jstree-open>.jstree-ocl{background-position:-36px -36px}.jstree-default-dark.jstree-rtl>.jstree-no-dots .jstree-closed>.jstree-ocl{background-position:-4px -36px}.jstree-default-dark .jstree-themeicon-custom{background-color:transparent;background-image:none;background-position:0 0}.jstree-default-dark>.jstree-container-ul .jstree-loading>.jstree-ocl{background:url(" + escape(__webpack_require__(248)) + ") center center no-repeat}.jstree-default-dark .jstree-file{background:url(" + escape(__webpack_require__(38)) + ") -100px -68px no-repeat}.jstree-default-dark .jstree-folder{background:url(" + escape(__webpack_require__(38)) + ") -260px -4px no-repeat}.jstree-default-dark>.jstree-container-ul>.jstree-node{margin-left:0;margin-right:0}#jstree-dnd.jstree-default-dark{line-height:24px;padding:0 4px}#jstree-dnd.jstree-default-dark .jstree-ok,#jstree-dnd.jstree-default-dark .jstree-er{background-image:url(" + escape(__webpack_require__(38)) + ");background-repeat:no-repeat;background-color:transparent}#jstree-dnd.jstree-default-dark i{background:0 0;width:24px;height:24px;line-height:24px}#jstree-dnd.jstree-default-dark .jstree-ok{background-position:-4px -68px}#jstree-dnd.jstree-default-dark .jstree-er{background-position:-36px -68px}.jstree-default-dark .jstree-ellipsis{overflow:hidden}.jstree-default-dark .jstree-ellipsis .jstree-anchor{width:calc(100% - 29px);text-overflow:ellipsis;overflow:hidden}.jstree-default-dark .jstree-ellipsis.jstree-no-icons .jstree-anchor{width:calc(100% - 5px)}.jstree-default-dark.jstree-rtl .jstree-node{background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAACAQMAAAB49I5GAAAABlBMVEUAAAAdHRvEkCwcAAAAAXRSTlMAQObYZgAAAAxJREFUCNdjAAMOBgAAGAAJMwQHdQAAAABJRU5ErkJggg==)}.jstree-default-dark.jstree-rtl .jstree-last{background:0 0}.jstree-default-dark-small .jstree-node{min-height:18px;line-height:18px;margin-left:18px;min-width:18px}.jstree-default-dark-small .jstree-anchor{line-height:18px;height:18px}.jstree-default-dark-small .jstree-icon{width:18px;height:18px;line-height:18px}.jstree-default-dark-small .jstree-icon:empty{width:18px;height:18px;line-height:18px}.jstree-default-dark-small.jstree-rtl .jstree-node{margin-right:18px}.jstree-default-dark-small .jstree-wholerow{height:18px}.jstree-default-dark-small .jstree-node,.jstree-default-dark-small .jstree-icon{background-image:url(" + escape(__webpack_require__(38)) + ")}.jstree-default-dark-small .jstree-node{background-position:-295px -7px;background-repeat:repeat-y}.jstree-default-dark-small .jstree-last{background:0 0}.jstree-default-dark-small .jstree-open>.jstree-ocl{background-position:-135px -7px}.jstree-default-dark-small .jstree-closed>.jstree-ocl{background-position:-103px -7px}.jstree-default-dark-small .jstree-leaf>.jstree-ocl{background-position:-71px -7px}.jstree-default-dark-small .jstree-themeicon{background-position:-263px -7px}.jstree-default-dark-small>.jstree-no-dots .jstree-node,.jstree-default-dark-small>.jstree-no-dots .jstree-leaf>.jstree-ocl{background:0 0}.jstree-default-dark-small>.jstree-no-dots .jstree-open>.jstree-ocl{background-position:-39px -7px}.jstree-default-dark-small>.jstree-no-dots .jstree-closed>.jstree-ocl{background-position:-7px -7px}.jstree-default-dark-small .jstree-disabled{background:0 0}.jstree-default-dark-small .jstree-disabled.jstree-hovered{background:0 0}.jstree-default-dark-small .jstree-disabled.jstree-clicked{background:#efefef}.jstree-default-dark-small .jstree-checkbox{background-position:-167px -7px}.jstree-default-dark-small .jstree-checkbox:hover{background-position:-167px -39px}.jstree-default-dark-small.jstree-checkbox-selection .jstree-clicked>.jstree-checkbox,.jstree-default-dark-small .jstree-checked>.jstree-checkbox{background-position:-231px -7px}.jstree-default-dark-small.jstree-checkbox-selection .jstree-clicked>.jstree-checkbox:hover,.jstree-default-dark-small .jstree-checked>.jstree-checkbox:hover{background-position:-231px -39px}.jstree-default-dark-small .jstree-anchor>.jstree-undetermined{background-position:-199px -7px}.jstree-default-dark-small .jstree-anchor>.jstree-undetermined:hover{background-position:-199px -39px}.jstree-default-dark-small .jstree-checkbox-disabled{opacity:.8;filter:url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg'><filter id='jstree-grayscale'><feColorMatrix type='matrix' values='0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0 0 0 1 0'/></filter></svg>#jstree-grayscale\");filter:gray;-webkit-filter:grayscale(100%)}.jstree-default-dark-small>.jstree-striped{background-size:auto 36px}.jstree-default-dark-small.jstree-rtl .jstree-node{background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAACAQMAAAB49I5GAAAABlBMVEUAAAAdHRvEkCwcAAAAAXRSTlMAQObYZgAAAAxJREFUCNdjAAMOBgAAGAAJMwQHdQAAAABJRU5ErkJggg==);background-position:100% 1px;background-repeat:repeat-y}.jstree-default-dark-small.jstree-rtl .jstree-last{background:0 0}.jstree-default-dark-small.jstree-rtl .jstree-open>.jstree-ocl{background-position:-135px -39px}.jstree-default-dark-small.jstree-rtl .jstree-closed>.jstree-ocl{background-position:-103px -39px}.jstree-default-dark-small.jstree-rtl .jstree-leaf>.jstree-ocl{background-position:-71px -39px}.jstree-default-dark-small.jstree-rtl>.jstree-no-dots .jstree-node,.jstree-default-dark-small.jstree-rtl>.jstree-no-dots .jstree-leaf>.jstree-ocl{background:0 0}.jstree-default-dark-small.jstree-rtl>.jstree-no-dots .jstree-open>.jstree-ocl{background-position:-39px -39px}.jstree-default-dark-small.jstree-rtl>.jstree-no-dots .jstree-closed>.jstree-ocl{background-position:-7px -39px}.jstree-default-dark-small .jstree-themeicon-custom{background-color:transparent;background-image:none;background-position:0 0}.jstree-default-dark-small>.jstree-container-ul .jstree-loading>.jstree-ocl{background:url(" + escape(__webpack_require__(248)) + ") center center no-repeat}.jstree-default-dark-small .jstree-file{background:url(" + escape(__webpack_require__(38)) + ") -103px -71px no-repeat}.jstree-default-dark-small .jstree-folder{background:url(" + escape(__webpack_require__(38)) + ") -263px -7px no-repeat}.jstree-default-dark-small>.jstree-container-ul>.jstree-node{margin-left:0;margin-right:0}#jstree-dnd.jstree-default-dark-small{line-height:18px;padding:0 4px}#jstree-dnd.jstree-default-dark-small .jstree-ok,#jstree-dnd.jstree-default-dark-small .jstree-er{background-image:url(" + escape(__webpack_require__(38)) + ");background-repeat:no-repeat;background-color:transparent}#jstree-dnd.jstree-default-dark-small i{background:0 0;width:18px;height:18px;line-height:18px}#jstree-dnd.jstree-default-dark-small .jstree-ok{background-position:-7px -71px}#jstree-dnd.jstree-default-dark-small .jstree-er{background-position:-39px -71px}.jstree-default-dark-small .jstree-ellipsis{overflow:hidden}.jstree-default-dark-small .jstree-ellipsis .jstree-anchor{width:calc(100% - 23px);text-overflow:ellipsis;overflow:hidden}.jstree-default-dark-small .jstree-ellipsis.jstree-no-icons .jstree-anchor{width:calc(100% - 5px)}.jstree-default-dark-small.jstree-rtl .jstree-node{background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAACAQMAAABv1h6PAAAABlBMVEUAAAAdHRvEkCwcAAAAAXRSTlMAQObYZgAAAAxJREFUCNdjAAMHBgAAiABBI4gz9AAAAABJRU5ErkJggg==)}.jstree-default-dark-small.jstree-rtl .jstree-last{background:0 0}.jstree-default-dark-large .jstree-node{min-height:32px;line-height:32px;margin-left:32px;min-width:32px}.jstree-default-dark-large .jstree-anchor{line-height:32px;height:32px}.jstree-default-dark-large .jstree-icon{width:32px;height:32px;line-height:32px}.jstree-default-dark-large .jstree-icon:empty{width:32px;height:32px;line-height:32px}.jstree-default-dark-large.jstree-rtl .jstree-node{margin-right:32px}.jstree-default-dark-large .jstree-wholerow{height:32px}.jstree-default-dark-large .jstree-node,.jstree-default-dark-large .jstree-icon{background-image:url(" + escape(__webpack_require__(38)) + ")}.jstree-default-dark-large .jstree-node{background-position:-288px 0;background-repeat:repeat-y}.jstree-default-dark-large .jstree-last{background:0 0}.jstree-default-dark-large .jstree-open>.jstree-ocl{background-position:-128px 0}.jstree-default-dark-large .jstree-closed>.jstree-ocl{background-position:-96px 0}.jstree-default-dark-large .jstree-leaf>.jstree-ocl{background-position:-64px 0}.jstree-default-dark-large .jstree-themeicon{background-position:-256px 0}.jstree-default-dark-large>.jstree-no-dots .jstree-node,.jstree-default-dark-large>.jstree-no-dots .jstree-leaf>.jstree-ocl{background:0 0}.jstree-default-dark-large>.jstree-no-dots .jstree-open>.jstree-ocl{background-position:-32px 0}.jstree-default-dark-large>.jstree-no-dots .jstree-closed>.jstree-ocl{background-position:0 0}.jstree-default-dark-large .jstree-disabled{background:0 0}.jstree-default-dark-large .jstree-disabled.jstree-hovered{background:0 0}.jstree-default-dark-large .jstree-disabled.jstree-clicked{background:#efefef}.jstree-default-dark-large .jstree-checkbox{background-position:-160px 0}.jstree-default-dark-large .jstree-checkbox:hover{background-position:-160px -32px}.jstree-default-dark-large.jstree-checkbox-selection .jstree-clicked>.jstree-checkbox,.jstree-default-dark-large .jstree-checked>.jstree-checkbox{background-position:-224px 0}.jstree-default-dark-large.jstree-checkbox-selection .jstree-clicked>.jstree-checkbox:hover,.jstree-default-dark-large .jstree-checked>.jstree-checkbox:hover{background-position:-224px -32px}.jstree-default-dark-large .jstree-anchor>.jstree-undetermined{background-position:-192px 0}.jstree-default-dark-large .jstree-anchor>.jstree-undetermined:hover{background-position:-192px -32px}.jstree-default-dark-large .jstree-checkbox-disabled{opacity:.8;filter:url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg'><filter id='jstree-grayscale'><feColorMatrix type='matrix' values='0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0 0 0 1 0'/></filter></svg>#jstree-grayscale\");filter:gray;-webkit-filter:grayscale(100%)}.jstree-default-dark-large>.jstree-striped{background-size:auto 64px}.jstree-default-dark-large.jstree-rtl .jstree-node{background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAACAQMAAAB49I5GAAAABlBMVEUAAAAdHRvEkCwcAAAAAXRSTlMAQObYZgAAAAxJREFUCNdjAAMOBgAAGAAJMwQHdQAAAABJRU5ErkJggg==);background-position:100% 1px;background-repeat:repeat-y}.jstree-default-dark-large.jstree-rtl .jstree-last{background:0 0}.jstree-default-dark-large.jstree-rtl .jstree-open>.jstree-ocl{background-position:-128px -32px}.jstree-default-dark-large.jstree-rtl .jstree-closed>.jstree-ocl{background-position:-96px -32px}.jstree-default-dark-large.jstree-rtl .jstree-leaf>.jstree-ocl{background-position:-64px -32px}.jstree-default-dark-large.jstree-rtl>.jstree-no-dots .jstree-node,.jstree-default-dark-large.jstree-rtl>.jstree-no-dots .jstree-leaf>.jstree-ocl{background:0 0}.jstree-default-dark-large.jstree-rtl>.jstree-no-dots .jstree-open>.jstree-ocl{background-position:-32px -32px}.jstree-default-dark-large.jstree-rtl>.jstree-no-dots .jstree-closed>.jstree-ocl{background-position:0 -32px}.jstree-default-dark-large .jstree-themeicon-custom{background-color:transparent;background-image:none;background-position:0 0}.jstree-default-dark-large>.jstree-container-ul .jstree-loading>.jstree-ocl{background:url(" + escape(__webpack_require__(248)) + ") center center no-repeat}.jstree-default-dark-large .jstree-file{background:url(" + escape(__webpack_require__(38)) + ") -96px -64px no-repeat}.jstree-default-dark-large .jstree-folder{background:url(" + escape(__webpack_require__(38)) + ") -256px 0 no-repeat}.jstree-default-dark-large>.jstree-container-ul>.jstree-node{margin-left:0;margin-right:0}#jstree-dnd.jstree-default-dark-large{line-height:32px;padding:0 4px}#jstree-dnd.jstree-default-dark-large .jstree-ok,#jstree-dnd.jstree-default-dark-large .jstree-er{background-image:url(" + escape(__webpack_require__(38)) + ");background-repeat:no-repeat;background-color:transparent}#jstree-dnd.jstree-default-dark-large i{background:0 0;width:32px;height:32px;line-height:32px}#jstree-dnd.jstree-default-dark-large .jstree-ok{background-position:0 -64px}#jstree-dnd.jstree-default-dark-large .jstree-er{background-position:-32px -64px}.jstree-default-dark-large .jstree-ellipsis{overflow:hidden}.jstree-default-dark-large .jstree-ellipsis .jstree-anchor{width:calc(100% - 37px);text-overflow:ellipsis;overflow:hidden}.jstree-default-dark-large .jstree-ellipsis.jstree-no-icons .jstree-anchor{width:calc(100% - 5px)}.jstree-default-dark-large.jstree-rtl .jstree-node{background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAACAQMAAAAD0EyKAAAABlBMVEUAAAAdHRvEkCwcAAAAAXRSTlMAQObYZgAAAAxJREFUCNdjgIIGBgABCgCBvVLXcAAAAABJRU5ErkJggg==)}.jstree-default-dark-large.jstree-rtl .jstree-last{background:0 0}@media (max-width:768px){#jstree-dnd.jstree-dnd-responsive{line-height:40px;font-weight:700;font-size:1.1em;text-shadow:1px 1px #fff}#jstree-dnd.jstree-dnd-responsive>i{background:0 0;width:40px;height:40px}#jstree-dnd.jstree-dnd-responsive>.jstree-ok{background-image:url(" + escape(__webpack_require__(85)) + ");background-position:0 -200px;background-size:120px 240px}#jstree-dnd.jstree-dnd-responsive>.jstree-er{background-image:url(" + escape(__webpack_require__(85)) + ");background-position:-40px -200px;background-size:120px 240px}#jstree-marker.jstree-dnd-responsive{border-left-width:10px;border-top-width:10px;border-bottom-width:10px;margin-top:-10px}}@media (max-width:768px){.jstree-default-dark-responsive .jstree-icon{background-image:url(" + escape(__webpack_require__(85)) + ")}.jstree-default-dark-responsive .jstree-node,.jstree-default-dark-responsive .jstree-leaf>.jstree-ocl{background:0 0}.jstree-default-dark-responsive .jstree-node{min-height:40px;line-height:40px;margin-left:40px;min-width:40px;white-space:nowrap}.jstree-default-dark-responsive .jstree-anchor{line-height:40px;height:40px}.jstree-default-dark-responsive .jstree-icon,.jstree-default-dark-responsive .jstree-icon:empty{width:40px;height:40px;line-height:40px}.jstree-default-dark-responsive>.jstree-container-ul>.jstree-node{margin-left:0}.jstree-default-dark-responsive.jstree-rtl .jstree-node{margin-left:0;margin-right:40px;background:0 0}.jstree-default-dark-responsive.jstree-rtl .jstree-container-ul>.jstree-node{margin-right:0}.jstree-default-dark-responsive .jstree-ocl,.jstree-default-dark-responsive .jstree-themeicon,.jstree-default-dark-responsive .jstree-checkbox{background-size:120px 240px}.jstree-default-dark-responsive .jstree-leaf>.jstree-ocl,.jstree-default-dark-responsive.jstree-rtl .jstree-leaf>.jstree-ocl{background:0 0}.jstree-default-dark-responsive .jstree-open>.jstree-ocl{background-position:0 0!important}.jstree-default-dark-responsive .jstree-closed>.jstree-ocl{background-position:0 -40px!important}.jstree-default-dark-responsive.jstree-rtl .jstree-closed>.jstree-ocl{background-position:-40px 0!important}.jstree-default-dark-responsive .jstree-themeicon{background-position:-40px -40px}.jstree-default-dark-responsive .jstree-checkbox,.jstree-default-dark-responsive .jstree-checkbox:hover{background-position:-40px -80px}.jstree-default-dark-responsive.jstree-checkbox-selection .jstree-clicked>.jstree-checkbox,.jstree-default-dark-responsive.jstree-checkbox-selection .jstree-clicked>.jstree-checkbox:hover,.jstree-default-dark-responsive .jstree-checked>.jstree-checkbox,.jstree-default-dark-responsive .jstree-checked>.jstree-checkbox:hover{background-position:0 -80px}.jstree-default-dark-responsive .jstree-anchor>.jstree-undetermined,.jstree-default-dark-responsive .jstree-anchor>.jstree-undetermined:hover{background-position:0 -120px}.jstree-default-dark-responsive .jstree-anchor{font-weight:700;font-size:1.1em;text-shadow:1px 1px #fff}.jstree-default-dark-responsive>.jstree-striped{background:0 0}.jstree-default-dark-responsive .jstree-wholerow{border-top:1px solid #666;border-bottom:1px solid #000;background:#333;height:40px}.jstree-default-dark-responsive .jstree-wholerow-hovered{background:#555}.jstree-default-dark-responsive .jstree-wholerow-clicked{background:#5fa2db}.jstree-default-dark-responsive .jstree-children .jstree-last>.jstree-wholerow{box-shadow:inset 0 -6px 3px -5px #111}.jstree-default-dark-responsive .jstree-children .jstree-open>.jstree-wholerow{box-shadow:inset 0 6px 3px -5px #111;border-top:0}.jstree-default-dark-responsive .jstree-children .jstree-open+.jstree-open{box-shadow:none}.jstree-default-dark-responsive .jstree-node,.jstree-default-dark-responsive .jstree-icon,.jstree-default-dark-responsive .jstree-node>.jstree-ocl,.jstree-default-dark-responsive .jstree-themeicon,.jstree-default-dark-responsive .jstree-checkbox{background-image:url(" + escape(__webpack_require__(85)) + ");background-size:120px 240px}.jstree-default-dark-responsive .jstree-node{background-position:-80px 0;background-repeat:repeat-y}.jstree-default-dark-responsive .jstree-last{background:0 0}.jstree-default-dark-responsive .jstree-leaf>.jstree-ocl{background-position:-40px -120px}.jstree-default-dark-responsive .jstree-last>.jstree-ocl{background-position:-40px -160px}.jstree-default-dark-responsive .jstree-themeicon-custom{background-color:transparent;background-image:none;background-position:0 0}.jstree-default-dark-responsive .jstree-file{background:url(" + escape(__webpack_require__(85)) + ") 0 -160px no-repeat;background-size:120px 240px}.jstree-default-dark-responsive .jstree-folder{background:url(" + escape(__webpack_require__(85)) + ") -40px -40px no-repeat;background-size:120px 240px}.jstree-default-dark-responsive>.jstree-container-ul>.jstree-node{margin-left:0;margin-right:0}}.jstree-default-dark{background:#333}.jstree-default-dark .jstree-anchor{color:#999;text-shadow:1px 1px 0 rgba(0,0,0,.5)}.jstree-default-dark .jstree-clicked,.jstree-default-dark .jstree-checked{color:#fff}.jstree-default-dark .jstree-hovered{color:#fff}#jstree-marker.jstree-default-dark{border-left-color:#999;background:0 0}.jstree-default-dark .jstree-anchor>.jstree-icon{opacity:.75}.jstree-default-dark .jstree-clicked>.jstree-icon,.jstree-default-dark .jstree-hovered>.jstree-icon,.jstree-default-dark .jstree-checked>.jstree-icon{opacity:1}.jstree-default-dark.jstree-rtl .jstree-node{background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAACAQMAAAB49I5GAAAABlBMVEUAAACZmZl+9SADAAAAAXRSTlMAQObYZgAAAAxJREFUCNdjAAMOBgAAGAAJMwQHdQAAAABJRU5ErkJggg==)}.jstree-default-dark.jstree-rtl .jstree-last{background:0 0}.jstree-default-dark-small.jstree-rtl .jstree-node{background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAACAQMAAABv1h6PAAAABlBMVEUAAACZmZl+9SADAAAAAXRSTlMAQObYZgAAAAxJREFUCNdjAAMHBgAAiABBI4gz9AAAAABJRU5ErkJggg==)}.jstree-default-dark-small.jstree-rtl .jstree-last{background:0 0}.jstree-default-dark-large.jstree-rtl .jstree-node{background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAACAQMAAAAD0EyKAAAABlBMVEUAAACZmZl+9SADAAAAAXRSTlMAQObYZgAAAAxJREFUCNdjgIIGBgABCgCBvVLXcAAAAABJRU5ErkJggg==)}.jstree-default-dark-large.jstree-rtl .jstree-last{background:0 0}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 644:
/***/ (function(module, exports, __webpack_require__) {

var escape = __webpack_require__(147);
exports = module.exports = __webpack_require__(33)(false);
// imports


// module
exports.push([module.i, ".jstree-node,.jstree-children,.jstree-container-ul{display:block;margin:0;padding:0;list-style-type:none;list-style-image:none}.jstree-node{white-space:nowrap}.jstree-anchor{display:inline-block;color:#000;white-space:nowrap;padding:0 4px 0 1px;margin:0;vertical-align:top}.jstree-anchor:focus{outline:0}.jstree-anchor,.jstree-anchor:link,.jstree-anchor:visited,.jstree-anchor:hover,.jstree-anchor:active{text-decoration:none;color:inherit}.jstree-icon{display:inline-block;text-decoration:none;margin:0;padding:0;vertical-align:top;text-align:center}.jstree-icon:empty{display:inline-block;text-decoration:none;margin:0;padding:0;vertical-align:top;text-align:center}.jstree-ocl{cursor:pointer}.jstree-leaf>.jstree-ocl{cursor:default}.jstree .jstree-open>.jstree-children{display:block}.jstree .jstree-closed>.jstree-children,.jstree .jstree-leaf>.jstree-children{display:none}.jstree-anchor>.jstree-themeicon{margin-right:2px}.jstree-no-icons .jstree-themeicon,.jstree-anchor>.jstree-themeicon-hidden{display:none}.jstree-hidden,.jstree-node.jstree-hidden{display:none}.jstree-rtl .jstree-anchor{padding:0 1px 0 4px}.jstree-rtl .jstree-anchor>.jstree-themeicon{margin-left:2px;margin-right:0}.jstree-rtl .jstree-node{margin-left:0}.jstree-rtl .jstree-container-ul>.jstree-node{margin-right:0}.jstree-wholerow-ul{position:relative;display:inline-block;min-width:100%}.jstree-wholerow-ul .jstree-leaf>.jstree-ocl{cursor:pointer}.jstree-wholerow-ul .jstree-anchor,.jstree-wholerow-ul .jstree-icon{position:relative}.jstree-wholerow-ul .jstree-wholerow{width:100%;cursor:pointer;position:absolute;left:0;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.jstree-contextmenu .jstree-anchor{-webkit-user-select:none;-webkit-touch-callout:none}.vakata-context{display:none}.vakata-context,.vakata-context ul{margin:0;padding:2px;position:absolute;background:#f5f5f5;border:1px solid #979797;box-shadow:2px 2px 2px #999}.vakata-context ul{list-style:none;left:100%;margin-top:-2.7em;margin-left:-4px}.vakata-context .vakata-context-right ul{left:auto;right:100%;margin-left:auto;margin-right:-4px}.vakata-context li{list-style:none}.vakata-context li>a{display:block;padding:0 2em;text-decoration:none;width:auto;color:#000;white-space:nowrap;line-height:2.4em;text-shadow:1px 1px 0 #fff;border-radius:1px}.vakata-context li>a:hover{position:relative;background-color:#e8eff7;box-shadow:0 0 2px #0a6aa1}.vakata-context li>a.vakata-context-parent{background-image:url(data:image/gif;base64,R0lGODlhCwAHAIAAACgoKP///yH5BAEAAAEALAAAAAALAAcAAAIORI4JlrqN1oMSnmmZDQUAOw==);background-position:right center;background-repeat:no-repeat}.vakata-context li>a:focus{outline:0}.vakata-context .vakata-context-hover>a{position:relative;background-color:#e8eff7;box-shadow:0 0 2px #0a6aa1}.vakata-context .vakata-context-separator>a,.vakata-context .vakata-context-separator>a:hover{background:#fff;border:0;border-top:1px solid #e2e3e3;height:1px;min-height:1px;max-height:1px;padding:0;margin:0 0 0 2.4em;border-left:1px solid #e0e0e0;text-shadow:0 0 0 transparent;box-shadow:0 0 0 transparent;border-radius:0}.vakata-context .vakata-contextmenu-disabled a,.vakata-context .vakata-contextmenu-disabled a:hover{color:silver;background-color:transparent;border:0;box-shadow:0 0 0}.vakata-context li>a>i{text-decoration:none;display:inline-block;width:2.4em;height:2.4em;background:0 0;margin:0 0 0 -2em;vertical-align:top;text-align:center;line-height:2.4em}.vakata-context li>a>i:empty{width:2.4em;line-height:2.4em}.vakata-context li>a .vakata-contextmenu-sep{display:inline-block;width:1px;height:2.4em;background:#fff;margin:0 .5em 0 0;border-left:1px solid #e2e3e3}.vakata-context .vakata-contextmenu-shortcut{font-size:.8em;color:silver;opacity:.5;display:none}.vakata-context-rtl ul{left:auto;right:100%;margin-left:auto;margin-right:-4px}.vakata-context-rtl li>a.vakata-context-parent{background-image:url(data:image/gif;base64,R0lGODlhCwAHAIAAACgoKP///yH5BAEAAAEALAAAAAALAAcAAAINjI+AC7rWHIsPtmoxLAA7);background-position:left center;background-repeat:no-repeat}.vakata-context-rtl .vakata-context-separator>a{margin:0 2.4em 0 0;border-left:0;border-right:1px solid #e2e3e3}.vakata-context-rtl .vakata-context-left ul{right:auto;left:100%;margin-left:-4px;margin-right:auto}.vakata-context-rtl li>a>i{margin:0 -2em 0 0}.vakata-context-rtl li>a .vakata-contextmenu-sep{margin:0 0 0 .5em;border-left-color:#fff;background:#e2e3e3}#jstree-marker{position:absolute;top:0;left:0;margin:-5px 0 0 0;padding:0;border-right:0;border-top:5px solid transparent;border-bottom:5px solid transparent;border-left:5px solid;width:0;height:0;font-size:0;line-height:0}#jstree-dnd{line-height:16px;margin:0;padding:4px}#jstree-dnd .jstree-icon,#jstree-dnd .jstree-copy{display:inline-block;text-decoration:none;margin:0 2px 0 0;padding:0;width:16px;height:16px}#jstree-dnd .jstree-ok{background:green}#jstree-dnd .jstree-er{background:red}#jstree-dnd .jstree-copy{margin:0 2px}.jstree-default .jstree-node,.jstree-default .jstree-icon{background-repeat:no-repeat;background-color:transparent}.jstree-default .jstree-anchor,.jstree-default .jstree-animated,.jstree-default .jstree-wholerow{transition:background-color .15s,box-shadow .15s}.jstree-default .jstree-hovered{background:#e7f4f9;border-radius:2px;box-shadow:inset 0 0 1px #ccc}.jstree-default .jstree-context{background:#e7f4f9;border-radius:2px;box-shadow:inset 0 0 1px #ccc}.jstree-default .jstree-clicked{background:#beebff;border-radius:2px;box-shadow:inset 0 0 1px #999}.jstree-default .jstree-no-icons .jstree-anchor>.jstree-themeicon{display:none}.jstree-default .jstree-disabled{background:0 0;color:#666}.jstree-default .jstree-disabled.jstree-hovered{background:0 0;box-shadow:none}.jstree-default .jstree-disabled.jstree-clicked{background:#efefef}.jstree-default .jstree-disabled>.jstree-icon{opacity:.8;filter:url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg'><filter id='jstree-grayscale'><feColorMatrix type='matrix' values='0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0 0 0 1 0'/></filter></svg>#jstree-grayscale\");filter:gray;-webkit-filter:grayscale(100%)}.jstree-default .jstree-search{font-style:italic;color:#8b0000;font-weight:700}.jstree-default .jstree-no-checkboxes .jstree-checkbox{display:none!important}.jstree-default.jstree-checkbox-no-clicked .jstree-clicked{background:0 0;box-shadow:none}.jstree-default.jstree-checkbox-no-clicked .jstree-clicked.jstree-hovered{background:#e7f4f9}.jstree-default.jstree-checkbox-no-clicked>.jstree-wholerow-ul .jstree-wholerow-clicked{background:0 0}.jstree-default.jstree-checkbox-no-clicked>.jstree-wholerow-ul .jstree-wholerow-clicked.jstree-wholerow-hovered{background:#e7f4f9}.jstree-default>.jstree-striped{min-width:100%;display:inline-block;background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAAkCAMAAAB/qqA+AAAABlBMVEUAAAAAAAClZ7nPAAAAAnRSTlMNAMM9s3UAAAAXSURBVHjajcEBAQAAAIKg/H/aCQZ70AUBjAATb6YPDgAAAABJRU5ErkJggg==) left top repeat}.jstree-default>.jstree-wholerow-ul .jstree-hovered,.jstree-default>.jstree-wholerow-ul .jstree-clicked{background:0 0;box-shadow:none;border-radius:0}.jstree-default .jstree-wholerow{box-sizing:border-box}.jstree-default .jstree-wholerow-hovered{background:#e7f4f9}.jstree-default .jstree-wholerow-clicked{background:#beebff;background:linear-gradient(to bottom,#beebff 0,#a8e4ff 100%)}.jstree-default .jstree-node{min-height:24px;line-height:24px;margin-left:24px;min-width:24px}.jstree-default .jstree-anchor{line-height:24px;height:24px}.jstree-default .jstree-icon{width:24px;height:24px;line-height:24px}.jstree-default .jstree-icon:empty{width:24px;height:24px;line-height:24px}.jstree-default.jstree-rtl .jstree-node{margin-right:24px}.jstree-default .jstree-wholerow{height:24px}.jstree-default .jstree-node,.jstree-default .jstree-icon{background-image:url(" + escape(__webpack_require__(39)) + ")}.jstree-default .jstree-node{background-position:-292px -4px;background-repeat:repeat-y}.jstree-default .jstree-last{background:0 0}.jstree-default .jstree-open>.jstree-ocl{background-position:-132px -4px}.jstree-default .jstree-closed>.jstree-ocl{background-position:-100px -4px}.jstree-default .jstree-leaf>.jstree-ocl{background-position:-68px -4px}.jstree-default .jstree-themeicon{background-position:-260px -4px}.jstree-default>.jstree-no-dots .jstree-node,.jstree-default>.jstree-no-dots .jstree-leaf>.jstree-ocl{background:0 0}.jstree-default>.jstree-no-dots .jstree-open>.jstree-ocl{background-position:-36px -4px}.jstree-default>.jstree-no-dots .jstree-closed>.jstree-ocl{background-position:-4px -4px}.jstree-default .jstree-disabled{background:0 0}.jstree-default .jstree-disabled.jstree-hovered{background:0 0}.jstree-default .jstree-disabled.jstree-clicked{background:#efefef}.jstree-default .jstree-checkbox{background-position:-164px -4px}.jstree-default .jstree-checkbox:hover{background-position:-164px -36px}.jstree-default.jstree-checkbox-selection .jstree-clicked>.jstree-checkbox,.jstree-default .jstree-checked>.jstree-checkbox{background-position:-228px -4px}.jstree-default.jstree-checkbox-selection .jstree-clicked>.jstree-checkbox:hover,.jstree-default .jstree-checked>.jstree-checkbox:hover{background-position:-228px -36px}.jstree-default .jstree-anchor>.jstree-undetermined{background-position:-196px -4px}.jstree-default .jstree-anchor>.jstree-undetermined:hover{background-position:-196px -36px}.jstree-default .jstree-checkbox-disabled{opacity:.8;filter:url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg'><filter id='jstree-grayscale'><feColorMatrix type='matrix' values='0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0 0 0 1 0'/></filter></svg>#jstree-grayscale\");filter:gray;-webkit-filter:grayscale(100%)}.jstree-default>.jstree-striped{background-size:auto 48px}.jstree-default.jstree-rtl .jstree-node{background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAACAQMAAAB49I5GAAAABlBMVEUAAAAdHRvEkCwcAAAAAXRSTlMAQObYZgAAAAxJREFUCNdjAAMOBgAAGAAJMwQHdQAAAABJRU5ErkJggg==);background-position:100% 1px;background-repeat:repeat-y}.jstree-default.jstree-rtl .jstree-last{background:0 0}.jstree-default.jstree-rtl .jstree-open>.jstree-ocl{background-position:-132px -36px}.jstree-default.jstree-rtl .jstree-closed>.jstree-ocl{background-position:-100px -36px}.jstree-default.jstree-rtl .jstree-leaf>.jstree-ocl{background-position:-68px -36px}.jstree-default.jstree-rtl>.jstree-no-dots .jstree-node,.jstree-default.jstree-rtl>.jstree-no-dots .jstree-leaf>.jstree-ocl{background:0 0}.jstree-default.jstree-rtl>.jstree-no-dots .jstree-open>.jstree-ocl{background-position:-36px -36px}.jstree-default.jstree-rtl>.jstree-no-dots .jstree-closed>.jstree-ocl{background-position:-4px -36px}.jstree-default .jstree-themeicon-custom{background-color:transparent;background-image:none;background-position:0 0}.jstree-default>.jstree-container-ul .jstree-loading>.jstree-ocl{background:url(" + escape(__webpack_require__(249)) + ") center center no-repeat}.jstree-default .jstree-file{background:url(" + escape(__webpack_require__(39)) + ") -100px -68px no-repeat}.jstree-default .jstree-folder{background:url(" + escape(__webpack_require__(39)) + ") -260px -4px no-repeat}.jstree-default>.jstree-container-ul>.jstree-node{margin-left:0;margin-right:0}#jstree-dnd.jstree-default{line-height:24px;padding:0 4px}#jstree-dnd.jstree-default .jstree-ok,#jstree-dnd.jstree-default .jstree-er{background-image:url(" + escape(__webpack_require__(39)) + ");background-repeat:no-repeat;background-color:transparent}#jstree-dnd.jstree-default i{background:0 0;width:24px;height:24px;line-height:24px}#jstree-dnd.jstree-default .jstree-ok{background-position:-4px -68px}#jstree-dnd.jstree-default .jstree-er{background-position:-36px -68px}.jstree-default .jstree-ellipsis{overflow:hidden}.jstree-default .jstree-ellipsis .jstree-anchor{width:calc(100% - 29px);text-overflow:ellipsis;overflow:hidden}.jstree-default .jstree-ellipsis.jstree-no-icons .jstree-anchor{width:calc(100% - 5px)}.jstree-default.jstree-rtl .jstree-node{background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAACAQMAAAB49I5GAAAABlBMVEUAAAAdHRvEkCwcAAAAAXRSTlMAQObYZgAAAAxJREFUCNdjAAMOBgAAGAAJMwQHdQAAAABJRU5ErkJggg==)}.jstree-default.jstree-rtl .jstree-last{background:0 0}.jstree-default-small .jstree-node{min-height:18px;line-height:18px;margin-left:18px;min-width:18px}.jstree-default-small .jstree-anchor{line-height:18px;height:18px}.jstree-default-small .jstree-icon{width:18px;height:18px;line-height:18px}.jstree-default-small .jstree-icon:empty{width:18px;height:18px;line-height:18px}.jstree-default-small.jstree-rtl .jstree-node{margin-right:18px}.jstree-default-small .jstree-wholerow{height:18px}.jstree-default-small .jstree-node,.jstree-default-small .jstree-icon{background-image:url(" + escape(__webpack_require__(39)) + ")}.jstree-default-small .jstree-node{background-position:-295px -7px;background-repeat:repeat-y}.jstree-default-small .jstree-last{background:0 0}.jstree-default-small .jstree-open>.jstree-ocl{background-position:-135px -7px}.jstree-default-small .jstree-closed>.jstree-ocl{background-position:-103px -7px}.jstree-default-small .jstree-leaf>.jstree-ocl{background-position:-71px -7px}.jstree-default-small .jstree-themeicon{background-position:-263px -7px}.jstree-default-small>.jstree-no-dots .jstree-node,.jstree-default-small>.jstree-no-dots .jstree-leaf>.jstree-ocl{background:0 0}.jstree-default-small>.jstree-no-dots .jstree-open>.jstree-ocl{background-position:-39px -7px}.jstree-default-small>.jstree-no-dots .jstree-closed>.jstree-ocl{background-position:-7px -7px}.jstree-default-small .jstree-disabled{background:0 0}.jstree-default-small .jstree-disabled.jstree-hovered{background:0 0}.jstree-default-small .jstree-disabled.jstree-clicked{background:#efefef}.jstree-default-small .jstree-checkbox{background-position:-167px -7px}.jstree-default-small .jstree-checkbox:hover{background-position:-167px -39px}.jstree-default-small.jstree-checkbox-selection .jstree-clicked>.jstree-checkbox,.jstree-default-small .jstree-checked>.jstree-checkbox{background-position:-231px -7px}.jstree-default-small.jstree-checkbox-selection .jstree-clicked>.jstree-checkbox:hover,.jstree-default-small .jstree-checked>.jstree-checkbox:hover{background-position:-231px -39px}.jstree-default-small .jstree-anchor>.jstree-undetermined{background-position:-199px -7px}.jstree-default-small .jstree-anchor>.jstree-undetermined:hover{background-position:-199px -39px}.jstree-default-small .jstree-checkbox-disabled{opacity:.8;filter:url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg'><filter id='jstree-grayscale'><feColorMatrix type='matrix' values='0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0 0 0 1 0'/></filter></svg>#jstree-grayscale\");filter:gray;-webkit-filter:grayscale(100%)}.jstree-default-small>.jstree-striped{background-size:auto 36px}.jstree-default-small.jstree-rtl .jstree-node{background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAACAQMAAAB49I5GAAAABlBMVEUAAAAdHRvEkCwcAAAAAXRSTlMAQObYZgAAAAxJREFUCNdjAAMOBgAAGAAJMwQHdQAAAABJRU5ErkJggg==);background-position:100% 1px;background-repeat:repeat-y}.jstree-default-small.jstree-rtl .jstree-last{background:0 0}.jstree-default-small.jstree-rtl .jstree-open>.jstree-ocl{background-position:-135px -39px}.jstree-default-small.jstree-rtl .jstree-closed>.jstree-ocl{background-position:-103px -39px}.jstree-default-small.jstree-rtl .jstree-leaf>.jstree-ocl{background-position:-71px -39px}.jstree-default-small.jstree-rtl>.jstree-no-dots .jstree-node,.jstree-default-small.jstree-rtl>.jstree-no-dots .jstree-leaf>.jstree-ocl{background:0 0}.jstree-default-small.jstree-rtl>.jstree-no-dots .jstree-open>.jstree-ocl{background-position:-39px -39px}.jstree-default-small.jstree-rtl>.jstree-no-dots .jstree-closed>.jstree-ocl{background-position:-7px -39px}.jstree-default-small .jstree-themeicon-custom{background-color:transparent;background-image:none;background-position:0 0}.jstree-default-small>.jstree-container-ul .jstree-loading>.jstree-ocl{background:url(" + escape(__webpack_require__(249)) + ") center center no-repeat}.jstree-default-small .jstree-file{background:url(" + escape(__webpack_require__(39)) + ") -103px -71px no-repeat}.jstree-default-small .jstree-folder{background:url(" + escape(__webpack_require__(39)) + ") -263px -7px no-repeat}.jstree-default-small>.jstree-container-ul>.jstree-node{margin-left:0;margin-right:0}#jstree-dnd.jstree-default-small{line-height:18px;padding:0 4px}#jstree-dnd.jstree-default-small .jstree-ok,#jstree-dnd.jstree-default-small .jstree-er{background-image:url(" + escape(__webpack_require__(39)) + ");background-repeat:no-repeat;background-color:transparent}#jstree-dnd.jstree-default-small i{background:0 0;width:18px;height:18px;line-height:18px}#jstree-dnd.jstree-default-small .jstree-ok{background-position:-7px -71px}#jstree-dnd.jstree-default-small .jstree-er{background-position:-39px -71px}.jstree-default-small .jstree-ellipsis{overflow:hidden}.jstree-default-small .jstree-ellipsis .jstree-anchor{width:calc(100% - 23px);text-overflow:ellipsis;overflow:hidden}.jstree-default-small .jstree-ellipsis.jstree-no-icons .jstree-anchor{width:calc(100% - 5px)}.jstree-default-small.jstree-rtl .jstree-node{background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAACAQMAAABv1h6PAAAABlBMVEUAAAAdHRvEkCwcAAAAAXRSTlMAQObYZgAAAAxJREFUCNdjAAMHBgAAiABBI4gz9AAAAABJRU5ErkJggg==)}.jstree-default-small.jstree-rtl .jstree-last{background:0 0}.jstree-default-large .jstree-node{min-height:32px;line-height:32px;margin-left:32px;min-width:32px}.jstree-default-large .jstree-anchor{line-height:32px;height:32px}.jstree-default-large .jstree-icon{width:32px;height:32px;line-height:32px}.jstree-default-large .jstree-icon:empty{width:32px;height:32px;line-height:32px}.jstree-default-large.jstree-rtl .jstree-node{margin-right:32px}.jstree-default-large .jstree-wholerow{height:32px}.jstree-default-large .jstree-node,.jstree-default-large .jstree-icon{background-image:url(" + escape(__webpack_require__(39)) + ")}.jstree-default-large .jstree-node{background-position:-288px 0;background-repeat:repeat-y}.jstree-default-large .jstree-last{background:0 0}.jstree-default-large .jstree-open>.jstree-ocl{background-position:-128px 0}.jstree-default-large .jstree-closed>.jstree-ocl{background-position:-96px 0}.jstree-default-large .jstree-leaf>.jstree-ocl{background-position:-64px 0}.jstree-default-large .jstree-themeicon{background-position:-256px 0}.jstree-default-large>.jstree-no-dots .jstree-node,.jstree-default-large>.jstree-no-dots .jstree-leaf>.jstree-ocl{background:0 0}.jstree-default-large>.jstree-no-dots .jstree-open>.jstree-ocl{background-position:-32px 0}.jstree-default-large>.jstree-no-dots .jstree-closed>.jstree-ocl{background-position:0 0}.jstree-default-large .jstree-disabled{background:0 0}.jstree-default-large .jstree-disabled.jstree-hovered{background:0 0}.jstree-default-large .jstree-disabled.jstree-clicked{background:#efefef}.jstree-default-large .jstree-checkbox{background-position:-160px 0}.jstree-default-large .jstree-checkbox:hover{background-position:-160px -32px}.jstree-default-large.jstree-checkbox-selection .jstree-clicked>.jstree-checkbox,.jstree-default-large .jstree-checked>.jstree-checkbox{background-position:-224px 0}.jstree-default-large.jstree-checkbox-selection .jstree-clicked>.jstree-checkbox:hover,.jstree-default-large .jstree-checked>.jstree-checkbox:hover{background-position:-224px -32px}.jstree-default-large .jstree-anchor>.jstree-undetermined{background-position:-192px 0}.jstree-default-large .jstree-anchor>.jstree-undetermined:hover{background-position:-192px -32px}.jstree-default-large .jstree-checkbox-disabled{opacity:.8;filter:url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg'><filter id='jstree-grayscale'><feColorMatrix type='matrix' values='0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0 0 0 1 0'/></filter></svg>#jstree-grayscale\");filter:gray;-webkit-filter:grayscale(100%)}.jstree-default-large>.jstree-striped{background-size:auto 64px}.jstree-default-large.jstree-rtl .jstree-node{background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAACAQMAAAB49I5GAAAABlBMVEUAAAAdHRvEkCwcAAAAAXRSTlMAQObYZgAAAAxJREFUCNdjAAMOBgAAGAAJMwQHdQAAAABJRU5ErkJggg==);background-position:100% 1px;background-repeat:repeat-y}.jstree-default-large.jstree-rtl .jstree-last{background:0 0}.jstree-default-large.jstree-rtl .jstree-open>.jstree-ocl{background-position:-128px -32px}.jstree-default-large.jstree-rtl .jstree-closed>.jstree-ocl{background-position:-96px -32px}.jstree-default-large.jstree-rtl .jstree-leaf>.jstree-ocl{background-position:-64px -32px}.jstree-default-large.jstree-rtl>.jstree-no-dots .jstree-node,.jstree-default-large.jstree-rtl>.jstree-no-dots .jstree-leaf>.jstree-ocl{background:0 0}.jstree-default-large.jstree-rtl>.jstree-no-dots .jstree-open>.jstree-ocl{background-position:-32px -32px}.jstree-default-large.jstree-rtl>.jstree-no-dots .jstree-closed>.jstree-ocl{background-position:0 -32px}.jstree-default-large .jstree-themeicon-custom{background-color:transparent;background-image:none;background-position:0 0}.jstree-default-large>.jstree-container-ul .jstree-loading>.jstree-ocl{background:url(" + escape(__webpack_require__(249)) + ") center center no-repeat}.jstree-default-large .jstree-file{background:url(" + escape(__webpack_require__(39)) + ") -96px -64px no-repeat}.jstree-default-large .jstree-folder{background:url(" + escape(__webpack_require__(39)) + ") -256px 0 no-repeat}.jstree-default-large>.jstree-container-ul>.jstree-node{margin-left:0;margin-right:0}#jstree-dnd.jstree-default-large{line-height:32px;padding:0 4px}#jstree-dnd.jstree-default-large .jstree-ok,#jstree-dnd.jstree-default-large .jstree-er{background-image:url(" + escape(__webpack_require__(39)) + ");background-repeat:no-repeat;background-color:transparent}#jstree-dnd.jstree-default-large i{background:0 0;width:32px;height:32px;line-height:32px}#jstree-dnd.jstree-default-large .jstree-ok{background-position:0 -64px}#jstree-dnd.jstree-default-large .jstree-er{background-position:-32px -64px}.jstree-default-large .jstree-ellipsis{overflow:hidden}.jstree-default-large .jstree-ellipsis .jstree-anchor{width:calc(100% - 37px);text-overflow:ellipsis;overflow:hidden}.jstree-default-large .jstree-ellipsis.jstree-no-icons .jstree-anchor{width:calc(100% - 5px)}.jstree-default-large.jstree-rtl .jstree-node{background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAACAQMAAAAD0EyKAAAABlBMVEUAAAAdHRvEkCwcAAAAAXRSTlMAQObYZgAAAAxJREFUCNdjgIIGBgABCgCBvVLXcAAAAABJRU5ErkJggg==)}.jstree-default-large.jstree-rtl .jstree-last{background:0 0}@media (max-width:768px){#jstree-dnd.jstree-dnd-responsive{line-height:40px;font-weight:700;font-size:1.1em;text-shadow:1px 1px #fff}#jstree-dnd.jstree-dnd-responsive>i{background:0 0;width:40px;height:40px}#jstree-dnd.jstree-dnd-responsive>.jstree-ok{background-image:url(" + escape(__webpack_require__(86)) + ");background-position:0 -200px;background-size:120px 240px}#jstree-dnd.jstree-dnd-responsive>.jstree-er{background-image:url(" + escape(__webpack_require__(86)) + ");background-position:-40px -200px;background-size:120px 240px}#jstree-marker.jstree-dnd-responsive{border-left-width:10px;border-top-width:10px;border-bottom-width:10px;margin-top:-10px}}@media (max-width:768px){.jstree-default-responsive .jstree-icon{background-image:url(" + escape(__webpack_require__(86)) + ")}.jstree-default-responsive .jstree-node,.jstree-default-responsive .jstree-leaf>.jstree-ocl{background:0 0}.jstree-default-responsive .jstree-node{min-height:40px;line-height:40px;margin-left:40px;min-width:40px;white-space:nowrap}.jstree-default-responsive .jstree-anchor{line-height:40px;height:40px}.jstree-default-responsive .jstree-icon,.jstree-default-responsive .jstree-icon:empty{width:40px;height:40px;line-height:40px}.jstree-default-responsive>.jstree-container-ul>.jstree-node{margin-left:0}.jstree-default-responsive.jstree-rtl .jstree-node{margin-left:0;margin-right:40px;background:0 0}.jstree-default-responsive.jstree-rtl .jstree-container-ul>.jstree-node{margin-right:0}.jstree-default-responsive .jstree-ocl,.jstree-default-responsive .jstree-themeicon,.jstree-default-responsive .jstree-checkbox{background-size:120px 240px}.jstree-default-responsive .jstree-leaf>.jstree-ocl,.jstree-default-responsive.jstree-rtl .jstree-leaf>.jstree-ocl{background:0 0}.jstree-default-responsive .jstree-open>.jstree-ocl{background-position:0 0!important}.jstree-default-responsive .jstree-closed>.jstree-ocl{background-position:0 -40px!important}.jstree-default-responsive.jstree-rtl .jstree-closed>.jstree-ocl{background-position:-40px 0!important}.jstree-default-responsive .jstree-themeicon{background-position:-40px -40px}.jstree-default-responsive .jstree-checkbox,.jstree-default-responsive .jstree-checkbox:hover{background-position:-40px -80px}.jstree-default-responsive.jstree-checkbox-selection .jstree-clicked>.jstree-checkbox,.jstree-default-responsive.jstree-checkbox-selection .jstree-clicked>.jstree-checkbox:hover,.jstree-default-responsive .jstree-checked>.jstree-checkbox,.jstree-default-responsive .jstree-checked>.jstree-checkbox:hover{background-position:0 -80px}.jstree-default-responsive .jstree-anchor>.jstree-undetermined,.jstree-default-responsive .jstree-anchor>.jstree-undetermined:hover{background-position:0 -120px}.jstree-default-responsive .jstree-anchor{font-weight:700;font-size:1.1em;text-shadow:1px 1px #fff}.jstree-default-responsive>.jstree-striped{background:0 0}.jstree-default-responsive .jstree-wholerow{border-top:1px solid rgba(255,255,255,.7);border-bottom:1px solid rgba(64,64,64,.2);background:#ebebeb;height:40px}.jstree-default-responsive .jstree-wholerow-hovered{background:#e7f4f9}.jstree-default-responsive .jstree-wholerow-clicked{background:#beebff}.jstree-default-responsive .jstree-children .jstree-last>.jstree-wholerow{box-shadow:inset 0 -6px 3px -5px #666}.jstree-default-responsive .jstree-children .jstree-open>.jstree-wholerow{box-shadow:inset 0 6px 3px -5px #666;border-top:0}.jstree-default-responsive .jstree-children .jstree-open+.jstree-open{box-shadow:none}.jstree-default-responsive .jstree-node,.jstree-default-responsive .jstree-icon,.jstree-default-responsive .jstree-node>.jstree-ocl,.jstree-default-responsive .jstree-themeicon,.jstree-default-responsive .jstree-checkbox{background-image:url(" + escape(__webpack_require__(86)) + ");background-size:120px 240px}.jstree-default-responsive .jstree-node{background-position:-80px 0;background-repeat:repeat-y}.jstree-default-responsive .jstree-last{background:0 0}.jstree-default-responsive .jstree-leaf>.jstree-ocl{background-position:-40px -120px}.jstree-default-responsive .jstree-last>.jstree-ocl{background-position:-40px -160px}.jstree-default-responsive .jstree-themeicon-custom{background-color:transparent;background-image:none;background-position:0 0}.jstree-default-responsive .jstree-file{background:url(" + escape(__webpack_require__(86)) + ") 0 -160px no-repeat;background-size:120px 240px}.jstree-default-responsive .jstree-folder{background:url(" + escape(__webpack_require__(86)) + ") -40px -40px no-repeat;background-size:120px 240px}.jstree-default-responsive>.jstree-container-ul>.jstree-node{margin-left:0;margin-right:0}}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 672:
/***/ (function(module, exports) {

module.exports = "<div class=\"wrapper\" mdl>\n  <simple-notifications ></simple-notifications>\n\t<div  *ngIf=\"isMaps('login')\" class=\"sidebar\" data-active-color='purple' data-image=\"\">\n\t\t<sidebar-cmp></sidebar-cmp>\n\t\t<div class=\"sidebar-background\"></div>\n\t</div>\n\t<div class=\"main-panel\">\n\t<div *ngIf=\"isMaps('login')\">\n\t\t<navbar-cmp></navbar-cmp>\n\t</div>\n\t\t<dashboard-cmp ></dashboard-cmp>\n\t\t<setting-cmp></setting-cmp>\n\t\t<div  *ngIf=\"isMaps('login') && isMaps('generalsetting')\">\n\t\t\t<footer-cmp></footer-cmp>\n\t\t</div>\n\t</div>\n</div>\n"

/***/ }),

/***/ 673:
/***/ (function(module, exports) {

module.exports = "<div class=\"main-content\">\r\n<p>TREE</p>\r\n \r\n    <tree-root [focused]=\"true\" [nodes]=\"nodes\"  (activate)=\"treeclickEvent($event)\">\r\n    </tree-root>\r\n\r\n\r\n\r\n</div>"

/***/ }),

/***/ 674:
/***/ (function(module, exports) {

module.exports = "<div class=\"main-content\">\n\n    <div class=\"row\">\n        <div class=\"col-sm-4\">\n            <div class=\"panel\" role=\"alert\">\n                Selected Items: {{values}}\n            </div>\n\n\n\n        </div>\n        <div class=\"col-sm-5\">\n\n            <label for=\"book-category\" class=\"col-3 col-form-label\">Tree Items</label>\n            <div class=\"col-9\">\n                <div class=\"d-inline-block\">\n                    <ngx-treeview [config]=\"config\" [items]=\"items\" (selectedChange)=\"values = $event\">\n                    </ngx-treeview>\n                </div>\n            </div>\n\n        </div>\n    </div>\n</div>"

/***/ }),

/***/ 675:
/***/ (function(module, exports) {

module.exports = "<div class=\"main-content\">\r\n  <div class=\"row\">\r\n    <div class=\"col-md-12\">\r\n      <div class=\"card\">\r\n        <div class=\"card-header\" data-background-color=\"purple\">\r\n          <h4 class=\"title\">Customer Profile</h4>\r\n        </div>\r\n        <div class=\"card-content\">\r\n          <div class=\"row\">\r\n            <form [formGroup]=\"customerForm\" >\r\n\r\n              <div class=\"col-md-3\">\r\n                <img src=\"assets/img/faces/marc.jpg\" alt=\"Rounded Image\"\r\n                     class=\"img-rounded img-responsive\">\r\n                <div class=\"dis-button-center-div\">\r\n                  <button md-button>Upload Photo</button>\r\n                </div>\r\n\r\n              </div>\r\n              <div class=\"col-md-9\">\r\n\r\n                <div class=\"row\">\r\n                  <div class=\"col-md-9\">\r\n                    <input type=\"hidden\" formControlName=\"id\" name=\"id\">\r\n                    <md-input-container><input formControlName=\"name\" mdInput\r\n                                               required type=\"text\" focused>\r\n                      <md-placeholder>Name</md-placeholder>\r\n                    </md-input-container>\r\n\r\n                  </div>\r\n                  <div class=\"col-md-3\">\r\n                    <md-input-container><input mdInput\r\n                                               placeholder=\"Customer Id\" formControlName=\"employeeId\" required\r\n                                               type=\"text\"></md-input-container>\r\n                    <!--<small *ngIf=\"customerForm.controls.employeeId.errors && (customerForm.controls.employeeId.dirty || customerForm.controls.employeeId.touched)\">\r\n                      <small [hidden]=\"!customerForm.controls.employeeId.errors.required\" class=\"text-danger\">\r\n                        Customer Id is required\r\n                      </small>\r\n\r\n                      <small [hidden]=\"!customerForm.controls.employeeId.errors.exist\" class=\"text-danger\">\r\n                        Duplicate Customer Id\r\n                      </small>\r\n                    </small>-->\r\n                  </div>\r\n                </div>\r\n\r\n                <div class=\"row\">\r\n                  <div class=\"col-md-9\">\r\n                    <md-input-container><input mdInput\r\n                                               placeholder=\"Address\" formControlName=\"address\" required type=\"text\">\r\n                    </md-input-container>\r\n                  </div>\r\n                  <div class=\"col-md-3\">\r\n                    <md-input-container><input mdInput formControlName=\"nationality\"\r\n                                               placeholder=\"Nationality\" required type=\"text\"></md-input-container>\r\n                  </div>\r\n                </div>\r\n\r\n                <div class=\"row\">\r\n                  <div class=\"col-md-4\">\r\n                    <md-input-container><input mdInput formControlName=\"email\"\r\n                                               placeholder=\"Email\" required type=\"email\"></md-input-container>\r\n                  </div>\r\n                  <div class=\"col-md-4\">\r\n                    <md-input-container><input mdInput formControlName=\"phoneNo\"\r\n                                               placeholder=\"Phone\" required type=\"text\"></md-input-container>\r\n                  </div>\r\n                  <div class=\"col-md-4\">\r\n                    <md-input-container><input mdInput formControlName=\"mobileNo\"\r\n                                               placeholder=\"Mobile\" required type=\"text\"></md-input-container>\r\n                  </div>\r\n                </div>\r\n\r\n                <div class=\"row\">\r\n                  <div class=\"col-md-4\">\r\n\r\n                    <md-select placeholder=\"Gender\" name=\"gender\" formControlName=\"gender\">\r\n                      <md-option *ngFor=\"let gen of genderLst;let i= index\" [value]=\"gen\">{{gen}}</md-option>\r\n                    </md-select>\r\n\r\n                  </div>\r\n                  <div class=\"col-md-4\">\r\n\r\n                    <md-select placeholder=\"Martial Status\" name=\"martialStatus\" formControlName=\"maritalStatus\">\r\n                      <md-option *ngFor=\"let status of statusList\" [value]=\"status\">{{status}}</md-option>\r\n                    </md-select>\r\n\r\n                  </div>\r\n                  <div class=\"col-md-4\">\r\n                    <md-input-container><input formControlName=\"dob\"\r\n                                               mdInput [mdDatepicker]=\"picker\" placeholder=\"Date Of Birth\">\r\n                      <button mdSuffix [mdDatepickerToggle]=\"picker\"></button>\r\n                      <md-datepicker #picker></md-datepicker>\r\n                    </md-input-container>\r\n                  </div>\r\n                </div>\r\n                <div class=\"row\">\r\n                  <div class=\"col-md-4\">\r\n\r\n                    <!-- <md-select mdInput formControlName=\"employeeType\" placeholder=\"Employeement Type\" type=\"text\">\r\n                       <md-option *ngFor=\"let empType of empTypes\" [value]=\"empType.id\">{{empType.name}}</md-option>\r\n                     </md-select>-->\r\n\r\n                  </div>\r\n                  <div class=\"col-md-4\">\r\n\r\n                  </div>\r\n                  <!--<div class=\"col-md-4\">\r\n                    <md-input-container><input formControlName=\"contractEndDate\"\r\n                                               mdInput [mdDatepicker]=\"endDate\"\r\n                                               placeholder=\"Contract End Date\">\r\n                      <button mdSuffix [mdDatepickerToggle]=\"endDate\"></button>\r\n                    </md-input-container>\r\n                    <md-datepicker #endDate></md-datepicker>\r\n                  </div>-->\r\n                </div>\r\n                <div class=\"row\">\r\n                  <div *ngIf=\" !isEdit\">\r\n\r\n                    <div class=\"col-md-4\">\r\n\r\n                      <md-input-container><input mdInput formControlName=\"username\"\r\n                                                 placeholder=\"User Name\" required type=\"text\"></md-input-container>\r\n\r\n                      <small *ngIf=\"customerForm.controls.username.errors && (customerForm.controls.username.dirty || customerForm.controls.username.touched)\">\r\n                        <small [hidden]=\"!customerForm.controls.username.errors.required\" class=\"text-danger\">\r\n                          User Name is required\r\n                        </small>\r\n\r\n                        <small [hidden]=\"!customerForm.controls.username.errors.exist\" class=\"text-danger\">\r\n                          Duplicate User name\r\n                        </small>\r\n                      </small>\r\n                    </div>\r\n                    <div class=\"col-md-4\">\r\n                      <md-input-container><input mdInput formControlName=\"password\"\r\n                                                 placeholder=\"Password\" required type=\"password\"></md-input-container>\r\n                    </div>\r\n                  </div>\r\n                  <div class=\"col-md-4\">\r\n                    <md-input-container><input formControlName=\"joinedDate\"\r\n                                               mdInput [mdDatepicker]=\"joinedDate\" placeholder=\"Joined Date\">\r\n                      <button mdSuffix [mdDatepickerToggle]=\"joinedDate\"></button>\r\n                    </md-input-container>\r\n                    <md-datepicker #joinedDate></md-datepicker>\r\n                  </div>\r\n                </div>\r\n                <div>\r\n                  <button type=\"submit\" [disabled]=\"!customerForm.valid\" (click)=\"saveCustomerProfile(customerForm.value)\"  class=\"btn btn-primary pull-right\">Update\r\n                    Profile\r\n                  </button>\r\n                  <div class=\"clearfix\"></div>\r\n\r\n                </div>\r\n\r\n\r\n\r\n              </div>\r\n            </form>\r\n\r\n          </div>\r\n\r\n        </div>\r\n      </div>\r\n\r\n    </div>\r\n  </div>\r\n</div>\r\n"

/***/ }),

/***/ 676:
/***/ (function(module, exports) {

module.exports = "<div class=\"main-content\">\r\n  <div class=\"row\">\r\n    <div class=\"col-md-12\">\r\n      <div class=\"card\">\r\n        <div class=\"card-header\" data-background-color=\"purple\" >\r\n          <h4 class=\"title\">List of Customers</h4>\r\n        </div>\r\n        <div class=\"card-content\">\r\n          <div style=\"margin-left:10px; margin-bottom:10px\" *ngIf=\"customValidation.isPermissionAvailable('CUSTOMER_PROFILE_EDIT')\">\r\n            <a class=\"md-button\"  href=\"#/customerprofile?id=0\" style=\"margin-right: 10px\"\r\n               class=\"btn btn-info pull-right\">Add Customer</a>\r\n          </div>\r\n          <ag-grid-table-cmp ></ag-grid-table-cmp>\r\n        </div>\r\n      </div>\r\n\r\n    </div>\r\n  </div>\r\n</div>\r\n"

/***/ }),

/***/ 677:
/***/ (function(module, exports) {

module.exports = "<router-outlet></router-outlet>\n\n"

/***/ }),

/***/ 678:
/***/ (function(module, exports) {

module.exports = "<div class=\"main-content\">\r\n  <div class=\"card\">\r\n    <div class=\"card-header\" data-background-color=\"purple\">\r\n      <h4 class=\"title\">Skill</h4>\r\n    </div>\r\n    <div class=\"card-content\" >\r\n      <form [formGroup]=\"skillForm\">\r\n        <div *ngFor=\"let skillGroup of skillGroups\" id=\"accordion\">\r\n          <div   role=\"tablist\">\r\n            <div role=\"tab\" id=\"headingOne\">\r\n              <h5 class=\"mb-0\">\r\n                <a data-toggle=\"collapse\" data-parent=\"#accordion\" href=\"{{'#collapse_'+skillGroup.id}}\" >\r\n                  {{skillGroup.name}}\r\n                </a>\r\n              </h5>\r\n            </div>\r\n          </div>\r\n\r\n          <div id=\"{{'collapse_'+skillGroup.id}}\" class=\"panel-collapse collapse\">\r\n            <div  *ngFor=\"let skill of skillGroup.skills\" role=\"tabpanel\" aria-labelledby=\"headingOne\">\r\n              <div *ngIf=\"skill.selected\">\r\n                <input type=\"checkbox\"  checked   (change)=\"onChange(skillGroup,skill, $event.target.checked)\">{{skill.name}}<br>\r\n              </div>\r\n              <div *ngIf=\" !skill.selected\">\r\n                <input type=\"checkbox\"    (change)=\"onChange(skillGroup,skill, $event.target.checked)\">{{skill.name}}<br>\r\n              </div>\r\n            </div>\r\n\r\n          </div>\r\n\r\n        </div>\r\n      </form>\r\n\r\n    </div>\r\n\r\n    <div class=\"card-footer\">\r\n\r\n      <button md-button type=\"submit\" (click)=\"dialogRef.close(skillForm.value)\">Add</button>\r\n      <button md-button type=\"button\" (click)=\"dialogRef.close(null)\">Cancel</button>\r\n\r\n\r\n    </div>\r\n  </div>\r\n</div>\r\n"

/***/ }),

/***/ 679:
/***/ (function(module, exports) {

module.exports = "<div class=\"main-content employee-profile\">\n  <form [formGroup]=\"empProfileForm\">\n  <div class=\"row\">\n    <div class=\"col-md-12\">\n      <div class=\"card\">\n        <div class=\"card-header\" data-background-color=\"purple\">\n          <h4 class=\"title\">Employee Profile</h4>\n        </div>\n        <div class=\"card-content\">\n          <div class=\"row\">\n            <div class=\"col-md-3\">\n              <img src=\"assets/img/faces/marc.jpg\" alt=\"Rounded Image\"\n                   class=\"img-rounded img-responsive\">\n              <div class=\"dis-button-center-div\">\n                <button md-button>Upload Photo</button>\n              </div>\n\n            </div>\n\n            <div class=\"col-md-9\">\n\n                <div class=\"row\">\n\n                  <div class=\"col-md-9\">\n                    <input type=\"hidden\" formControlName=\"id\" name=\"id\">\n                    <md-input-container><input formControlName=\"name\" mdInput\n                                               required type=\"text\" focused>\n                      <md-placeholder>Name</md-placeholder>\n                    </md-input-container>\n\n                  </div>\n                  <div class=\"col-md-3\">\n                    <md-input-container><input mdInput\n                                               placeholder=\"Employee Id\" formControlName=\"employeeId\" required\n                                               type=\"text\"></md-input-container>\n                    <small *ngIf=\"empProfileForm.controls.employeeId.errors && (empProfileForm.controls.employeeId.dirty || empProfileForm.controls.employeeId.touched)\">\n                      <small [hidden]=\"!empProfileForm.controls.employeeId.errors.required\" class=\"text-danger\">\n                        Employee Id is required\n                      </small>\n\n                      <small [hidden]=\"!empProfileForm.controls.employeeId.errors.exist\" class=\"text-danger\">\n                        Duplicate Employee Id\n                      </small>\n                    </small>\n                  </div>\n                </div>\n\n                <div class=\"row\">\n                  <div class=\"col-md-9\">\n                    <md-input-container><input mdInput\n                                               placeholder=\"Address\" formControlName=\"address\" required type=\"text\">\n                    </md-input-container>\n                  </div>\n                  <div class=\"col-md-3\">\n                    <md-input-container><input mdInput formControlName=\"nationality\"\n                                               placeholder=\"Nationality\" required type=\"text\"></md-input-container>\n                  </div>\n                </div>\n\n                <div class=\"row\">\n                  <div class=\"col-md-4\">\n                    <md-input-container><input mdInput formControlName=\"email\"\n                                               placeholder=\"Email\" required type=\"email\"></md-input-container>\n                  </div>\n                  <div class=\"col-md-4\">\n                    <md-input-container><input mdInput formControlName=\"phoneNo\"\n                                               placeholder=\"Phone\" required type=\"text\"></md-input-container>\n                  </div>\n                  <div class=\"col-md-4\">\n                    <md-input-container><input mdInput formControlName=\"mobileNo\"\n                                               placeholder=\"Mobile\" required type=\"text\"></md-input-container>\n                  </div>\n                </div>\n\n                <div class=\"row\">\n                  <div class=\"col-md-4\">\n\n                    <md-select placeholder=\"Gender\" name=\"gender\" formControlName=\"gender\">\n                      <md-option *ngFor=\"let gen of genderLst;let i= index\" [value]=\"gen\">{{gen}}</md-option>\n                    </md-select>\n\n                  </div>\n                  <div class=\"col-md-4\">\n\n                    <md-select placeholder=\"Martial Status\" name=\"martialStatus\" formControlName=\"maritalStatus\">\n                      <md-option *ngFor=\"let status of statusList\" [value]=\"status\">{{status}}</md-option>\n                    </md-select>\n\n                  </div>\n                  <div class=\"col-md-4\">\n                    <md-input-container><input formControlName=\"dob\"\n                                               mdInput [mdDatepicker]=\"picker\" placeholder=\"Date Of Birth\">\n                      <button mdSuffix [mdDatepickerToggle]=\"picker\"></button>\n                      <md-datepicker #picker></md-datepicker>\n                    </md-input-container>\n                  </div>\n                </div>\n                <div class=\"row\">\n                  <div class=\"col-md-4\">\n\n                      <md-select mdInput formControlName=\"employeeType\" placeholder=\"Employeement Type\" type=\"text\">\n                        <md-option *ngFor=\"let empType of empTypes\" [value]=\"empType.id\">{{empType.name}}</md-option>\n                      </md-select>\n\n                  </div>\n                  <div class=\"col-md-4\">\n                    <md-input-container><input formControlName=\"joinedDate\"\n                                               mdInput [mdDatepicker]=\"joinedDate\" placeholder=\"Joined Date\">\n                      <button mdSuffix [mdDatepickerToggle]=\"joinedDate\"></button>\n                    </md-input-container>\n                    <md-datepicker #joinedDate></md-datepicker>\n                  </div>\n                  <div class=\"col-md-4\">\n                    <md-input-container><input formControlName=\"contractEndDate\"\n                                               mdInput [mdDatepicker]=\"endDate\"\n                                               placeholder=\"Contract End Date\">\n                      <button mdSuffix [mdDatepickerToggle]=\"endDate\"></button>\n                    </md-input-container>\n                    <md-datepicker #endDate></md-datepicker>\n                  </div>\n                </div>\n                <div class=\"row\">\n                  <div class=\"col-md-4\">\n\n                    <md-select placeholder=\"Unit\" name=\"unit\" formControlName=\"unit\">\n                      <md-option *ngFor=\"let unit of unitList\" [value]=\"unit.id\">{{unit.name}}</md-option>\n\n                    </md-select>\n\n                  </div>\n                  <div class=\"col-md-4\">\n\n                    <md-select placeholder=\"Grade\" name=\"grade\" formControlName=\"grade\">\n\n                      <md-optGroup *ngFor=\"let grade of gradeList\" label=\"grade.category.name\">\n                        <md-option [value]=\"grade.id\">{{grade.name}}</md-option>\n                      </md-optGroup>\n                    </md-select>\n\n                  </div>\n                  <div class=\"col-md-4\">\n\n\n\n                  </div>\n                </div>\n                <div>\n                  <button type=\"submit\" [disabled]=\"!empProfileForm.valid\" (click)=\"saveEmpProfile(empProfileForm.value)\" class=\"btn btn-primary pull-right\">Update\n                    Profile\n                  </button>\n                  <div class=\"clearfix\"></div>\n\n                </div>\n\n\n\n            </div>\n\n          </div>\n\n        </div>\n      </div>\n\n    </div>\n  </div>\n  <div class=\"row\">\n    <div class=\"col-md-4\">\n      <div class=\"card\">\n        <div class=\"card-header\" data-background-color=\"purple\">\n          <h4 class=\"title\">Access Control</h4>\n        </div>\n        <div class=\"card-content\">\n\n            <div class=\"col-md-12\">\n\n                <md-select placeholder=\"Role\" formControlName=\"role\" name=\"role\">\n                  <md-option *ngFor=\"let role of retList\" [value]=\"role.id\" >{{role.roleName}}</md-option>\n                </md-select>\n\n            </div>\n\n\n            <div class=\"col-md-12\">\n\n\n                <md-select multiple=\"true\" placeholder=\"Unit Access\" formControlName=\"unitAccess\" name=\"unitAccess\">\n                  <md-option  *ngFor=\"let unit of unitList\" [value]=\"unit\">{{unit.name}}</md-option>\n                </md-select>\n\n            </div>\n\n          <div class=\"row\">\n            <div class=\"col-md-12\">\n\n                <md-select multiple=\"true\" placeholder=\"System Access\" name=\"unitAccess\" formControlName=\"systemAccess\">\n                  <md-option  *ngFor=\"let access of systemAccessTypes\" [value]=\"access\" >{{access}}</md-option>\n                </md-select>\n\n            </div>\n          </div>\n          <div class=\"row\" *ngIf=\"!isEdit\">\n            <div class=\"col-md-12\">\n              <md-input-container><input mdInput formControlName=\"username\"\n                                         placeholder=\"User Name\" required type=\"text\"></md-input-container>\n              <small *ngIf=\"empProfileForm.controls.username.errors && (empProfileForm.controls.username.dirty || empProfileForm.controls.username.touched)\">\n                <small [hidden]=\"!empProfileForm.controls.username.errors.required\" class=\"text-danger\">\n                  User Name is required\n                </small>\n\n                <small [hidden]=\"!empProfileForm.controls.username.errors.exist\" class=\"text-danger\">\n                  Duplicate User name\n                </small>\n              </small>\n            </div>\n          </div>\n          <div class=\"row\" *ngIf=\"!isEdit\">\n            <div class=\"col-md-12\">\n              <md-input-container><input mdInput formControlName=\"password\"\n                                         placeholder=\"Password\" required type=\"password\"></md-input-container>\n            </div>\n          </div>\n\n        </div>\n      </div>\n    </div>\n\n    <div class=\"col-md-4\">\n      <div class=\"card\">\n        <div class=\"card-header\" data-background-color=\"purple\">\n          <h4 class=\"title\">Skill Management</h4>\n        </div>\n        <div class=\"card-content\">\n\n          <div class=\"row\">\n            <div style=\"margin-left:10px; margin-bottom:10px\">\n              <button md-button (click)=\"openSkillDialog()\" style=\"margin-right: 10px\"\n                      class=\"btn btn-info pull-right\">Add Skills</button>\n            </div>\n            <div class=\"col-md-12\" >\n              <tree-root [focused]=\"true\" [nodes]=\"nodes\" (moveNode)=\"moveNode($event)\"\n                         [options]=\"treeoptions\" (activate)=\"treeclickEvent($event)\" (toggleExpanded)=\"treeExpanded($event)\"> </tree-root>\n            </div>\n          </div>\n\n        </div>\n      </div>\n    </div>\n    <div class=\"col-md-4\">\n      <div class=\"card system-configuration\">\n        <div class=\"card-header\" data-background-color=\"purple\">\n          <h4 class=\"title\">System Configuration</h4>\n        </div>\n        <div class=\"card-content\">\n          <div class=\"row\">\n            <div class=\"col-md-12\">\n              <md-input-container><input mdInput required\n                                         type=\"text\" focused>\n                <md-placeholder>Device\n                  Setting\n                </md-placeholder>\n              </md-input-container>\n            </div>\n            <div class=\"col-md-12\">\n              <md-input-container><input mdInput required\n                                         type=\"text\" focused>\n                <md-placeholder>Rejection\n                  Reasons\n                </md-placeholder>\n              </md-input-container>\n            </div>\n            <div class=\"col-md-12\">\n              <md-input-container><input mdInput required\n                                         type=\"text\" focused>\n                <md-placeholder>Allowed\n                  Status Type\n                </md-placeholder>\n              </md-input-container>\n            </div>\n          </div>\n        </div>\n      </div>\n    </div>\n  </div>\n  </form>\n</div>\n"

/***/ }),

/***/ 680:
/***/ (function(module, exports) {

module.exports = "<div class=\"main-content\">\n\t<div class=\"row\">\n\t\t<div class=\"col-md-12\">\n\t\t\t<div class=\"card\">\n\t\t\t\t<div class=\"card-header\" data-background-color=\"purple\">\n\t\t\t\t\t<h4 class=\"title\">List of Employee Profiles</h4>\n\t\t\t\t</div>\n\t\t\t\t<div class=\"card-content\">\n          <div *ngIf=\"customValidation.isPermissionAvailable('EMPLOYEE_PROFILE_EDIT')\" style=\"margin-left:10px; margin-bottom:10px\">\n            <a class=\"md-button\"  href=\"#/employeeProfile\" style=\"margin-right: 10px\"\n                    class=\"btn btn-info pull-right\">Add Employee Profile</a>\n          </div>\n\t\t\t\t\t<ag-grid-table-cmp ></ag-grid-table-cmp>\n\t\t\t\t</div>\n\t\t\t</div>\n\n\t\t</div>\n\t</div>\n</div>\n"

/***/ }),

/***/ 681:
/***/ (function(module, exports) {

module.exports = "<div class=\"main-content\">\n\t<div class=\"row\">\n    <div *ngIf=\"isSummaryAvailable=='true'\">\n      <div class=\"col-md-12\">\n        <div class=\"card\">\n          <div class=\"card-content\" style=\"height: auto\">\n            <div class=\"col-md-4 summary-right-border summary-main-block\" style=\"margin-bottom: 1vh;\">\n              <div class=\"col-md-12 \" style=\"margin-left: -3vw; \">\n                <div class=\"col-md-9 summary-main-text\">\n                  <span >Total Employees</span><br>\n                  <span style=\"font-size: 24px\">ACTIVE</span>\n                </div>\n                <div class=\"col-md-3 summary-main-count\" style=\"margin-top: 1.5vh;\">\n                  <span>52</span>\n                </div>\n              </div>\n            </div>\n            <div class=\"col-md-8\">\n              <div class=\"col-md-3 summary-right-border\" >\n                <span class=\"summary-detail-text-block\">Available</span><br>\n                <span class=\"summary-count-block\">02</span>\n              </div>\n              <div class=\"col-md-3 summary-right-border\" >\n                <span class=\"summary-detail-text-block\">Job Assigned</span><br>\n                <span class=\"summary-count-block\">35</span>\n              </div>\n              <div class=\"col-md-3 summary-right-border\" >\n                <span class=\"summary-detail-text-block\">Cleaning</span><br>\n                <span class=\"summary-count-block\">05</span>\n              </div>\n              <div class=\"col-md-3\" >\n                <span class=\"summary-detail-text-block\"> On Break</span><br>\n                <span class=\"summary-count-block\">10</span>\n              </div>\n            </div>\n          </div>\n\n        </div>\n      </div>\n    </div>\n\n\n\t\t<div class=\"col-md-12\">\n\t\t\t<div class=\"card\">\n\t\t\t\t<div class=\"card-header\" data-background-color=\"purple\">\n\t\t\t\t\t<h4 class=\"title\">Current Employee Status</h4>\n\t\t\t\t</div>\n\t\t\t\t<div class=\"card-content\">\n\t\t\t\t\t<ag-grid-table-cmp ></ag-grid-table-cmp>\n\t\t\t\t</div>\n\t\t\t</div>\n\n\t\t</div>\n\t</div>\n</div>\n"

/***/ }),

/***/ 682:
/***/ (function(module, exports) {

module.exports = "<div class=\"main-content\">\r\n  <div class=\"myDialog\">\r\n    <h2 md-dialog-title>{{title}}</h2>\r\n    <div md-dialog-content>\r\n      <div>\r\n        <form [formGroup]=\"empTypeForm\"  novalidate>\r\n          <!-- we will place our fields here -->\r\n          <div  class=\"form-group\">\r\n            <input  type=\"hidden\" formControlName=\"id\" name=\"id\" class=\"form-control\" >\r\n            <label>Name</label>\r\n            <!--bind name to ngModel, it's required with minimum 5 characters-->\r\n            <input  type=\"text\" formControlName=\"name\" name=\"name\" class=\"form-control\" >\r\n            <!--show error only when field is not valid & it's dirty or form submited-->\r\n            <small *ngIf=\"empTypeForm.controls.name.errors && (empTypeForm.controls.name.dirty || empTypeForm.controls.name.touched)\">\r\n              <small [hidden]=\"!empTypeForm.controls.name.errors.required\" class=\"text-danger\">\r\n                Employee Type Name is required\r\n              </small>\r\n\r\n              <small [hidden]=\"!empTypeForm.controls.name.errors.exist\" class=\"text-danger\">\r\n                Duplicate Employee Type\r\n              </small>\r\n            </small>\r\n          </div>\r\n\r\n          <div class=\"form-group\">\r\n            <label>Abbreviation</label>\r\n            <input type=\"text\" formControlName=\"abbreviation\" name=\"abbreviation\" class=\"form-control\">\r\n          </div>\r\n\r\n\r\n          <button md-button  type=\"submit\" (click)=\"dialogRef.close(empTypeForm.value)\" >{{actionButton}}</button>\r\n          <button md-button type=\"button\" (click)=\"dialogRef.close(null)\">Cancel</button>\r\n        </form>\r\n      </div>\r\n\r\n    </div>\r\n    <div md-dialog-actions>\r\n\r\n    </div>\r\n  </div>\r\n</div>\r\n\r\n"

/***/ }),

/***/ 683:
/***/ (function(module, exports) {

module.exports = "<div class=\"main-content\">\r\n  <div class=\"row\">\r\n    <div class=\"col-md-12\">\r\n      <div class=\"card\">\r\n        <div class=\"card-header\" data-background-color=\"purple\">\r\n          <h4 class=\"title\">Current Employee Types</h4>\r\n        </div>\r\n        <div class=\"card-content\">\r\n          <div style=\"margin-left:10px; margin-bottom:10px\" *ngIf=\"customValidation.isPermissionAvailable('EMPLOYEE_TYPE_EDIT')\">\r\n            <button md-button (click)=\"openEmpTypeDialog()\" style=\"margin-right: 10px\"\r\n                    class=\"btn btn-info pull-right\">Add Emp Type</button>\r\n          </div>\r\n          <ag-grid-table-cmp ></ag-grid-table-cmp>\r\n        </div>\r\n      </div>\r\n\r\n    </div>\r\n  </div>\r\n</div>\r\n"

/***/ }),

/***/ 684:
/***/ (function(module, exports) {

module.exports = "<div class=\"main-content\">\n\t<div class=\"row\">\n\t\t<div class=\"col-md-12\">\n\t\t\t<div class=\"card\">\n\t\t\t\t<div class=\"card-header\" data-background-color=\"purple\">\n\t\t\t\t\t<h4 class=\"title\">Employee's Work Timeline </h4>\n\t\t\t\t</div>\n\t\t\t\t<div class=\"card-content work-time-line\">\n\t\t\t\t\t<ag-grid-table-cmp [agPaginationAuto]=\"true\"></ag-grid-table-cmp>\n\t\t\t\t</div>\n\t\t\t</div>\n\n\t\t</div>\n\t</div>\n</div>\n"

/***/ }),

/***/ 685:
/***/ (function(module, exports) {

module.exports = "<div class=\"main-content dashboard\">\n\n\t<div class=\"row\">\n\t\t<div class=\"col-lg-3 col-md-6 col-sm-6\">\n\t\t\t<div class=\"card card-stats\">\n\t\t\t\t<div class=\"card-header\" data-background-color=\"red\">\n\t\t\t\t\t<i class=\"material-icons\">info_outline</i>\n\t\t\t\t</div>\n\t\t\t\t<div class=\"card-content\">\n\t\t\t\t\t<p class=\"category\">Pending Jobs</p>\n\t\t\t\t\t<h3 class=\"title\">4</h3>\n\t\t\t\t</div>\n\t\t\t\t<div class=\"card-footer\">\n\t\t\t\t\t<div class=\"stats\">\n\t\t\t\t\t\t<i class=\"material-icons text-danger\">warning</i> <a\n\t\t\t\t\t\t\thref=\"#dashbored\">Assign Manually</a>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</div>\n\t\t<div class=\"col-lg-3 col-md-6 col-sm-6\">\n\t\t\t<div class=\"card card-stats\">\n\t\t\t\t<div class=\"card-header\" data-background-color=\"orange\">\n\t\t\t\t\t<i class=\"material-icons\">person_pin</i>\n\t\t\t\t</div>\n\t\t\t\t<div class=\"card-content\">\n\t\t\t\t\t<p class=\"category\">Staff Available</p>\n\t\t\t\t\t<h3 class=\"title\">3</h3>\n\t\t\t\t</div>\n\t\t\t\t<div class=\"card-footer\">\n\t\t\t\t\t<div class=\"stats\">\n\t\t\t\t\t\t<i class=\"material-icons\">update</i> Updated 4 minutes ago\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</div>\n\t\t<div class=\"col-lg-3 col-md-6 col-sm-6\">\n\t\t\t<div class=\"card card-stats\">\n\t\t\t\t<div class=\"card-header\" data-background-color=\"green\">\n\t\t\t\t\t<i class=\"material-icons\">store</i>\n\t\t\t\t</div>\n\t\t\t\t<div class=\"card-content\">\n\t\t\t\t\t<p class=\"category\">Completed Jobs</p>\n\t\t\t\t\t<h3 class=\"title\">521</h3>\n\t\t\t\t</div>\n\t\t\t\t<div class=\"card-footer\">\n\t\t\t\t\t<div class=\"stats\">\n\t\t\t\t\t\t<i class=\"material-icons\">date_range</i> Last 24 Hours\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</div>\n\n\t\t<div class=\"col-lg-3 col-md-6 col-sm-6\">\n\t\t\t<div class=\"card card-stats\">\n\t\t\t\t<div class=\"card-header\" data-background-color=\"green\">\n\t\t\t\t\t<i class=\"material-icons\">schedule</i>\n\t\t\t\t</div>\n\t\t\t\t<div class=\"card-content\">\n\t\t\t\t\t<p class=\"category\">Average Handle Time</p>\n\t\t\t\t\t<h3 class=\"title\">11m 25s</h3>\n\t\t\t\t</div>\n\t\t\t\t<div class=\"card-footer\">\n\t\t\t\t\t<div class=\"stats\">\n\t\t\t\t\t\t<i class=\"material-icons\">date_range</i> Last 24 Hours\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</div>\n\t</div>\n\n \t<joblist-cmp [agPaginationAuto]=\"true\" ></joblist-cmp>\n\n\t<employees-cmp [agPaginationAuto]=\"true\" ></employees-cmp>\n\n\t<div class=\"row\">\n\t\t<div class=\"col-md-4\">\n\t\t\t<div class=\"card\">\n\t\t\t\t<div class=\"card-header card-chart\" data-background-color=\"red\">\n\t\t\t\t\t<div class=\"ct-chart\" id=\"dailySalesChart\">\n            <svg xmlns:ct=\"http://gionkunz.github.com/chartist-js/ct\" width=\"100%\" height=\"100%\" class=\"ct-chart-line\"\n                 style=\"width: 100%; height: 100%;\">\n              <g class=\"ct-grids\">\n                <line y1=\"119.60000610351562\" y2=\"119.60000610351562\" x1=\"40\" x2=\"355.32501220703125\"\n                      class=\"ct-grid ct-vertical\"></line>\n                <line y1=\"95.6800048828125\" y2=\"95.6800048828125\" x1=\"40\" x2=\"355.32501220703125\"\n                      class=\"ct-grid ct-vertical\"></line>\n                <line y1=\"71.76000366210937\" y2=\"71.76000366210937\" x1=\"40\" x2=\"355.32501220703125\"\n                      class=\"ct-grid ct-vertical\"></line>\n                <line y1=\"47.840002441406256\" y2=\"47.840002441406256\" x1=\"40\" x2=\"355.32501220703125\"\n                      class=\"ct-grid ct-vertical\"></line>\n                <line y1=\"23.920001220703128\" y2=\"23.920001220703128\" x1=\"40\" x2=\"355.32501220703125\"\n                      class=\"ct-grid ct-vertical\"></line>\n                <line y1=\"0\" y2=\"0\" x1=\"40\" x2=\"355.32501220703125\" class=\"ct-grid ct-vertical\"></line>\n              </g>\n              <g>\n                <g class=\"ct-series ct-series-a\">\n                  <path\n                    d=\"M 40 90.896 C 47.508 88.903 70.031 76.943 85.046 78.936 C 100.062 80.929 115.077 102.856 130.093 102.856 C 145.108 102.856 160.124 85.315 175.139 78.936 C 190.155 72.557 205.17 64.983 220.186 64.584 C 235.201 64.185 250.217 82.524 265.232 76.544 C 280.248 70.564 302.771 36.677 310.279 28.704\"\n                    class=\"ct-line\"></path>\n                </g>\n              </g>\n              <g class=\"ct-labels\">\n                <foreignObject style=\"overflow: visible;\" x=\"40\" y=\"124.60000610351562\" width=\"45.04643031529018\"\n                               height=\"20\">\n                  <text class=\"ct-label ct-horizontal ct-end\" xmlns=\"http://www.w3.org/2000/xmlns/\"\n                        style=\"width: 45px; height: 20px;\">M\n                  </text>\n                </foreignObject>\n                <foreignObject style=\"overflow: visible;\" x=\"85.04643031529018\" y=\"124.60000610351562\"\n                               width=\"45.04643031529018\" height=\"20\">\n                  <text class=\"ct-label ct-horizontal ct-end\" xmlns=\"http://www.w3.org/2000/xmlns/\"\n                        style=\"width: 45px; height: 20px;\">T\n                  </text>\n                </foreignObject>\n                <foreignObject style=\"overflow: visible;\" x=\"130.09286063058036\" y=\"124.60000610351562\"\n                               width=\"45.046430315290166\" height=\"20\">\n                  <text class=\"ct-label ct-horizontal ct-end\" xmlns=\"http://www.w3.org/2000/xmlns/\"\n                        style=\"width: 45px; height: 20px;\">W\n                  </text>\n                </foreignObject>\n                <foreignObject style=\"overflow: visible;\" x=\"175.13929094587053\" y=\"124.60000610351562\"\n                               width=\"45.046430315290195\" height=\"20\">\n                  <text class=\"ct-label ct-horizontal ct-end\" xmlns=\"http://www.w3.org/2000/xmlns/\"\n                        style=\"width: 45px; height: 20px;\">T\n                  </text>\n                </foreignObject>\n                <foreignObject style=\"overflow: visible;\" x=\"220.18572126116072\" y=\"124.60000610351562\"\n                               width=\"45.046430315290195\" height=\"20\">\n                  <text class=\"ct-label ct-horizontal ct-end\" xmlns=\"http://www.w3.org/2000/xmlns/\"\n                        style=\"width: 45px; height: 20px;\">F\n                  </text>\n                </foreignObject>\n                <foreignObject style=\"overflow: visible;\" x=\"265.2321515764509\" y=\"124.60000610351562\"\n                               width=\"45.04643031529014\" height=\"20\">\n                  <text class=\"ct-label ct-horizontal ct-end\" xmlns=\"http://www.w3.org/2000/xmlns/\"\n                        style=\"width: 45px; height: 20px;\">S\n                  </text>\n                </foreignObject>\n                <foreignObject style=\"overflow: visible;\" x=\"310.27858189174106\" y=\"124.60000610351562\"\n                               width=\"45.046430315290195\" height=\"20\">\n                  <text class=\"ct-label ct-horizontal ct-end\" xmlns=\"http://www.w3.org/2000/xmlns/\"\n                        style=\"width: 45px; height: 20px;\">S\n                  </text>\n                </foreignObject>\n                <foreignObject style=\"overflow: visible;\" y=\"95.6800048828125\" x=\"0\" height=\"23.920001220703124\"\n                               width=\"30\">\n                  <text class=\"ct-label ct-vertical ct-start\" xmlns=\"http://www.w3.org/2000/xmlns/\"\n                        style=\"height: 24px; width: 30px;\">0\n                  </text>\n                </foreignObject>\n                <foreignObject style=\"overflow: visible;\" y=\"71.76000366210937\" x=\"0\" height=\"23.920001220703124\"\n                               width=\"30\">\n                  <text class=\"ct-label ct-vertical ct-start\" xmlns=\"http://www.w3.org/2000/xmlns/\"\n                        style=\"height: 24px; width: 30px;\">10\n                  </text>\n                </foreignObject>\n                <foreignObject style=\"overflow: visible;\" y=\"47.84000244140625\" x=\"0\" height=\"23.92000122070312\"\n                               width=\"30\">\n                  <text class=\"ct-label ct-vertical ct-start\" xmlns=\"http://www.w3.org/2000/xmlns/\"\n                        style=\"height: 24px; width: 30px;\">20\n                  </text>\n                </foreignObject>\n                <foreignObject style=\"overflow: visible;\" y=\"23.920001220703128\" x=\"0\" height=\"23.920001220703128\"\n                               width=\"30\">\n                  <text class=\"ct-label ct-vertical ct-start\" xmlns=\"http://www.w3.org/2000/xmlns/\"\n                        style=\"height: 24px; width: 30px;\">30\n                  </text>\n                </foreignObject>\n                <foreignObject style=\"overflow: visible;\" y=\"0\" x=\"0\" height=\"23.920001220703128\" width=\"30\">\n                  <text class=\"ct-label ct-vertical ct-start\" xmlns=\"http://www.w3.org/2000/xmlns/\"\n                        style=\"height: 24px; width: 30px;\">40\n                  </text>\n                </foreignObject>\n                <foreignObject style=\"overflow: visible;\" y=\"-30\" x=\"0\" height=\"30\" width=\"30\">\n                  <text class=\"ct-label ct-vertical ct-start\" xmlns=\"http://www.w3.org/2000/xmlns/\"\n                        style=\"height: 30px; width: 30px;\">50\n                  </text>\n                </foreignObject>\n              </g>\n            </svg>\n          </div>\n\t\t\t\t</div>\n\t\t\t\t<div class=\"card-content\">\n\t\t\t\t\t<h4 class=\"title\">Job Type Analysis</h4>\n\t\t\t\t\t<p class=\"category\">Last 4 weeks trending</p>\n\t\t\t\t</div>\n\t\t\t\t<div class=\"card-footer\">\n\t\t\t\t\t<div class=\"stats\">\n\t\t\t\t\t\t<i class=\"material-icons\">access_time</i> updated 4 minutes ago\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</div>\n\n\t\t<div class=\"col-md-4\">\n\t\t\t<div class=\"card\">\n\t\t\t\t<div class=\"card-header card-chart\" data-background-color=\"green\">\n\t\t\t\t\t<div class=\"ct-chart\" id=\"emailsSubscriptionChart\">\n            <svg xmlns:ct=\"http://gionkunz.github.com/chartist-js/ct\" width=\"100%\" height=\"100%\" class=\"ct-chart-line\"\n                 style=\"width: 100%; height: 100%;\">\n              <g class=\"ct-grids\">\n                <line x1=\"40\" x2=\"40\" y1=\"0\" y2=\"119.60000610351562\" class=\"ct-grid ct-horizontal\"></line>\n                <line x1=\"75.03611246744791\" x2=\"75.03611246744791\" y1=\"0\" y2=\"119.60000610351562\"\n                      class=\"ct-grid ct-horizontal\"></line>\n                <line x1=\"110.07222493489583\" x2=\"110.07222493489583\" y1=\"0\" y2=\"119.60000610351562\"\n                      class=\"ct-grid ct-horizontal\"></line>\n                <line x1=\"145.10833740234375\" x2=\"145.10833740234375\" y1=\"0\" y2=\"119.60000610351562\"\n                      class=\"ct-grid ct-horizontal\"></line>\n                <line x1=\"180.14444986979166\" x2=\"180.14444986979166\" y1=\"0\" y2=\"119.60000610351562\"\n                      class=\"ct-grid ct-horizontal\"></line>\n                <line x1=\"215.18056233723956\" x2=\"215.18056233723956\" y1=\"0\" y2=\"119.60000610351562\"\n                      class=\"ct-grid ct-horizontal\"></line>\n                <line x1=\"250.2166748046875\" x2=\"250.2166748046875\" y1=\"0\" y2=\"119.60000610351562\"\n                      class=\"ct-grid ct-horizontal\"></line>\n                <line x1=\"285.2527872721354\" x2=\"285.2527872721354\" y1=\"0\" y2=\"119.60000610351562\"\n                      class=\"ct-grid ct-horizontal\"></line>\n                <line x1=\"320.2888997395833\" x2=\"320.2888997395833\" y1=\"0\" y2=\"119.60000610351562\"\n                      class=\"ct-grid ct-horizontal\"></line>\n                <line y1=\"119.60000610351562\" y2=\"119.60000610351562\" x1=\"40\" x2=\"355.32501220703125\"\n                      class=\"ct-grid ct-vertical\"></line>\n                <line y1=\"95.6800048828125\" y2=\"95.6800048828125\" x1=\"40\" x2=\"355.32501220703125\"\n                      class=\"ct-grid ct-vertical\"></line>\n                <line y1=\"71.76000366210937\" y2=\"71.76000366210937\" x1=\"40\" x2=\"355.32501220703125\"\n                      class=\"ct-grid ct-vertical\"></line>\n                <line y1=\"47.840002441406256\" y2=\"47.840002441406256\" x1=\"40\" x2=\"355.32501220703125\"\n                      class=\"ct-grid ct-vertical\"></line>\n                <line y1=\"23.920001220703128\" y2=\"23.920001220703128\" x1=\"40\" x2=\"355.32501220703125\"\n                      class=\"ct-grid ct-vertical\"></line>\n                <line y1=\"0\" y2=\"0\" x1=\"40\" x2=\"355.32501220703125\" class=\"ct-grid ct-vertical\"></line>\n              </g>\n              <g>\n                <g class=\"ct-series ct-series-a\">\n                  <path\n                    d=\"M 40 95.68 C 75.036 81.328 75.036 81.328 75.036 81.328 C 110.072 100.464 110.072 100.464 110.072 100.464 C 145.108 88.504 145.108 88.504 145.108 88.504 C 180.144 71.76 180.144 71.76 180.144 71.76 C 215.181 83.72 215.181 83.72 215.181 83.72 C 250.217 71.76 250.217 71.76 250.217 71.76 C 285.253 38.272 285.253 38.272 285.253 38.272 C 320.289 47.84 320.289 47.84 320.289 47.84\"\n                    class=\"ct-line ct-white\"></path>\n                  <line x1=\"40\" y1=\"95.6800048828125\" x2=\"40.01\" y2=\"95.6800048828125\" class=\"ct-point ct-white\"\n                        ct:value=\"10\" opacity=\"1\"></line>\n                  <line x1=\"75.03611246744791\" y1=\"81.32800415039063\" x2=\"75.04611246744791\" y2=\"81.32800415039063\"\n                        class=\"ct-point ct-white\" ct:value=\"16\" opacity=\"1\"></line>\n                  <line x1=\"110.07222493489583\" y1=\"100.46400512695313\" x2=\"110.08222493489583\"\n                        y2=\"100.46400512695313\"\n                        class=\"ct-point ct-white\" ct:value=\"8\" opacity=\"1\"></line>\n                  <line x1=\"145.10833740234375\" y1=\"88.50400451660155\" x2=\"145.11833740234374\" y2=\"88.50400451660155\"\n                        class=\"ct-point ct-white\" ct:value=\"13\" opacity=\"1\"></line>\n                  <line x1=\"180.14444986979166\" y1=\"71.76000366210937\" x2=\"180.15444986979165\" y2=\"71.76000366210937\"\n                        class=\"ct-point ct-white\" ct:value=\"20\" opacity=\"1\"></line>\n                  <line x1=\"215.18056233723956\" y1=\"83.72000427246094\" x2=\"215.19056233723956\" y2=\"83.72000427246094\"\n                        class=\"ct-point ct-white\" ct:value=\"15\" opacity=\"1\"></line>\n                  <line x1=\"250.2166748046875\" y1=\"71.76000366210937\" x2=\"250.2266748046875\" y2=\"71.76000366210937\"\n                        class=\"ct-point ct-white\" ct:value=\"20\" opacity=\"1\"></line>\n                  <line x1=\"285.2527872721354\" y1=\"38.272001953125\" x2=\"285.26278727213537\" y2=\"38.272001953125\"\n                        class=\"ct-point ct-white\" ct:value=\"34\" opacity=\"1\"></line>\n                  <line x1=\"320.2888997395833\" y1=\"47.840002441406256\" x2=\"320.2988997395833\" y2=\"47.840002441406256\"\n                        class=\"ct-point ct-white\" ct:value=\"30\" opacity=\"1\"></line>\n                </g>\n              </g>\n              <g class=\"ct-labels\">\n                <foreignObject style=\"overflow: visible;\" x=\"40\" y=\"124.60000610351562\" width=\"35.036112467447914\"\n                               height=\"20\">\n                  <text fill=\"white\" class=\"ct-label ct-horizontal ct-end\" xmlns=\"http://www.w3.org/2000/xmlns/\"\n                        style=\"width: 35px; height: 20px;\">'07\n                  </text>\n                </foreignObject>\n                <foreignObject style=\"overflow: visible;\" x=\"75.03611246744791\" y=\"124.60000610351562\"\n                               width=\"35.036112467447914\" height=\"20\">\n                  <text class=\"ct-label ct-horizontal ct-end\" xmlns=\"http://www.w3.org/2000/xmlns/\"\n                        style=\"width: 35px; height: 20px;\">'08\n                  </text>\n                </foreignObject>\n                <foreignObject style=\"overflow: visible;\" x=\"110.07222493489583\" y=\"124.60000610351562\"\n                               width=\"35.03611246744792\" height=\"20\">\n                  <text class=\"ct-label ct-horizontal ct-end\" xmlns=\"http://www.w3.org/2000/xmlns/\"\n                        style=\"width: 35px; height: 20px;\">'09\n                  </text>\n                </foreignObject>\n                <foreignObject style=\"overflow: visible;\" x=\"145.10833740234375\" y=\"124.60000610351562\"\n                               width=\"35.03611246744791\" height=\"20\">\n                  <text class=\"ct-label ct-horizontal ct-end\" xmlns=\"http://www.w3.org/2000/xmlns/\"\n                        style=\"width: 35px; height: 20px;\">'10\n                  </text>\n                </foreignObject>\n                <foreignObject style=\"overflow: visible;\" x=\"180.14444986979166\" y=\"124.60000610351562\"\n                               width=\"35.03611246744791\" height=\"20\">\n                  <text class=\"ct-label ct-horizontal ct-end\" xmlns=\"http://www.w3.org/2000/xmlns/\"\n                        style=\"width: 35px; height: 20px;\">'11\n                  </text>\n                </foreignObject>\n                <foreignObject style=\"overflow: visible;\" x=\"215.18056233723956\" y=\"124.60000610351562\"\n                               width=\"35.036112467447936\" height=\"20\">\n                  <text class=\"ct-label ct-horizontal ct-end\" xmlns=\"http://www.w3.org/2000/xmlns/\"\n                        style=\"width: 35px; height: 20px;\">'12\n                  </text>\n                </foreignObject>\n                <foreignObject style=\"overflow: visible;\" x=\"250.2166748046875\" y=\"124.60000610351562\"\n                               width=\"35.03611246744791\" height=\"20\">\n                  <text class=\"ct-label ct-horizontal ct-end\" xmlns=\"http://www.w3.org/2000/xmlns/\"\n                        style=\"width: 35px; height: 20px;\">'13\n                  </text>\n                </foreignObject>\n                <foreignObject style=\"overflow: visible;\" x=\"285.2527872721354\" y=\"124.60000610351562\"\n                               width=\"35.03611246744791\" height=\"20\">\n                  <text class=\"ct-label ct-horizontal ct-end\" xmlns=\"http://www.w3.org/2000/xmlns/\"\n                        style=\"width: 35px; height: 20px;\">'14\n                  </text>\n                </foreignObject>\n                <foreignObject style=\"overflow: visible;\" x=\"320.2888997395833\" y=\"124.60000610351562\"\n                               width=\"35.036112467447936\" height=\"20\">\n                  <text class=\"ct-label ct-horizontal ct-end\" xmlns=\"http://www.w3.org/2000/xmlns/\"\n                        style=\"width: 35px; height: 20px;\">'15\n                  </text>\n                </foreignObject>\n                <foreignObject style=\"overflow: visible;\" y=\"95.6800048828125\" x=\"0\" height=\"23.920001220703124\"\n                               width=\"30\">\n                  <text class=\"ct-label ct-vertical ct-start\" xmlns=\"http://www.w3.org/2000/xmlns/\"\n                        style=\"height: 24px; width: 30px;\">0\n                  </text>\n                </foreignObject>\n                <foreignObject style=\"overflow: visible;\" y=\"71.76000366210937\" x=\"0\" height=\"23.920001220703124\"\n                               width=\"30\">\n                  <text class=\"ct-label ct-vertical ct-start\" xmlns=\"http://www.w3.org/2000/xmlns/\"\n                        style=\"height: 24px; width: 30px;\">10\n                  </text>\n                </foreignObject>\n                <foreignObject style=\"overflow: visible;\" y=\"47.84000244140625\" x=\"0\" height=\"23.92000122070312\"\n                               width=\"30\">\n                  <text class=\"ct-label ct-vertical ct-start\" xmlns=\"http://www.w3.org/2000/xmlns/\"\n                        style=\"height: 24px; width: 30px;\">20\n                  </text>\n                </foreignObject>\n                <foreignObject style=\"overflow: visible;\" y=\"23.920001220703128\" x=\"0\" height=\"23.920001220703128\"\n                               width=\"30\">\n                  <text class=\"ct-label ct-vertical ct-start\" xmlns=\"http://www.w3.org/2000/xmlns/\"\n                        style=\"height: 24px; width: 30px;\">30\n                  </text>\n                </foreignObject>\n                <foreignObject style=\"overflow: visible;\" y=\"0\" x=\"0\" height=\"23.920001220703128\" width=\"30\">\n                  <text class=\"ct-label ct-vertical ct-start\" xmlns=\"http://www.w3.org/2000/xmlns/\"\n                        style=\"height: 24px; width: 30px;\">40\n                  </text>\n                </foreignObject>\n                <foreignObject style=\"overflow: visible;\" y=\"-30\" x=\"0\" height=\"30\" width=\"30\">\n                  <text class=\"ct-label ct-vertical ct-start\" xmlns=\"http://www.w3.org/2000/xmlns/\"\n                        style=\"height: 30px; width: 30px;\">50\n                  </text>\n                </foreignObject>\n              </g>\n            </svg>\n          </div>\n\t\t\t\t</div>\n\t\t\t\t<div class=\"card-content\">\n\t\t\t\t\t<h4 class=\"title\">Weekly Trend</h4>\n\n\t\t\t\t\t<p class=\"category\">\n\t\t\t\t\t\t<span class=\"text-success\"><i class=\"fa fa-long-arrow-up\"></i>\n\t\t\t\t\t\t\t55% </span> increase against last week.\n\t\t\t\t\t</p>\n\t\t\t\t</div>\n\t\t\t\t<div class=\"card-footer\">\n\t\t\t\t\t<div class=\"stats\">\n\t\t\t\t\t\t<i class=\"material-icons\">access_time</i> updated 4 minutes ago\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\n\t\t\t</div>\n\t\t</div>\n\n\t\t<div class=\"col-md-4\">\n\t\t\t<div class=\"card\">\n\t\t\t\t<div class=\"card-header card-chart\" data-background-color=\"blue\">\n\t\t\t\t\t<div class=\"ct-chart\" id=\"completedTasksChart\">\n            <svg xmlns:ct=\"http://gionkunz.github.com/chartist-js/ct\" width=\"100%\" height=\"100%\" class=\"ct-chart-bar\"\n                 style=\"width: 100%; height: 100%;\">\n              <g class=\"ct-grids\">\n                <line y1=\"114.60000610351562\" y2=\"114.60000610351562\" x1=\"50\" x2=\"340.32501220703125\"\n                      class=\"ct-grid ct-vertical\"></line>\n                <line y1=\"92.46667141384549\" y2=\"92.46667141384549\" x1=\"50\" x2=\"340.32501220703125\"\n                      class=\"ct-grid ct-vertical\"></line>\n                <line y1=\"70.33333672417535\" y2=\"70.33333672417535\" x1=\"50\" x2=\"340.32501220703125\"\n                      class=\"ct-grid ct-vertical\"></line>\n                <line y1=\"48.200002034505204\" y2=\"48.200002034505204\" x1=\"50\" x2=\"340.32501220703125\"\n                      class=\"ct-grid ct-vertical\"></line>\n                <line y1=\"26.066667344835068\" y2=\"26.066667344835068\" x1=\"50\" x2=\"340.32501220703125\"\n                      class=\"ct-grid ct-vertical\"></line>\n              </g>\n              <g>\n                <g class=\"ct-series ct-series-a\">\n                  <line x1=\"62.096875508626304\" x2=\"62.096875508626304\" y1=\"114.60000610351562\" y2=\"54.61866909450955\"\n                        class=\"ct-bar\" ct:value=\"542\" opacity=\"1\"></line>\n                  <line x1=\"86.2906265258789\" x2=\"86.2906265258789\" y1=\"114.60000610351562\" y2=\"65.57466976589626\"\n                        class=\"ct-bar\" ct:value=\"443\" opacity=\"1\"></line>\n                  <line x1=\"110.48437754313152\" x2=\"110.48437754313152\" y1=\"114.60000610351562\" y2=\"79.1866706000434\"\n                        class=\"ct-bar\" ct:value=\"320\" opacity=\"1\"></line>\n                  <line x1=\"134.67812856038412\" x2=\"134.67812856038412\" y1=\"114.60000610351562\" y2=\"28.28000081380209\"\n                        class=\"ct-bar\" ct:value=\"780\" opacity=\"1\"></line>\n                  <line x1=\"158.87187957763675\" x2=\"158.87187957763675\" y1=\"114.60000610351562\" y2=\"53.40133568657769\"\n                        class=\"ct-bar\" ct:value=\"553\" opacity=\"1\"></line>\n                  <line x1=\"183.06563059488934\" x2=\"183.06563059488934\" y1=\"114.60000610351562\" y2=\"64.46800303141276\"\n                        class=\"ct-bar\" ct:value=\"453\" opacity=\"1\"></line>\n                  <line x1=\"207.25938161214194\" x2=\"207.25938161214194\" y1=\"114.60000610351562\" y2=\"78.5226705593533\"\n                        class=\"ct-bar\" ct:value=\"326\" opacity=\"1\"></line>\n                  <line x1=\"231.45313262939456\" x2=\"231.45313262939456\" y1=\"114.60000610351562\" y2=\"66.57066982693142\"\n                        class=\"ct-bar\" ct:value=\"434\" opacity=\"1\"></line>\n                  <line x1=\"255.64688364664715\" x2=\"255.64688364664715\" y1=\"114.60000610351562\" y2=\"51.74133558485243\"\n                        class=\"ct-bar\" ct:value=\"568\" opacity=\"1\"></line>\n                  <line x1=\"279.8406346638997\" x2=\"279.8406346638997\" y1=\"114.60000610351562\" y2=\"47.09333530002171\"\n                        class=\"ct-bar\" ct:value=\"610\" opacity=\"1\"></line>\n                  <line x1=\"304.03438568115234\" x2=\"304.03438568115234\" y1=\"114.60000610351562\"\n                        y2=\"30.936000976562497\"\n                        class=\"ct-bar\" ct:value=\"756\" opacity=\"1\"></line>\n                  <line x1=\"328.22813669840497\" x2=\"328.22813669840497\" y1=\"114.60000610351562\"\n                        y2=\"15.553333367241748\"\n                        class=\"ct-bar\" ct:value=\"895\" opacity=\"1\"></line>\n                </g>\n              </g>\n              <g class=\"ct-labels\">\n                <foreignObject style=\"overflow: visible;\" x=\"50\" y=\"119.60000610351562\" width=\"24.193751017252605\"\n                               height=\"20\">\n                  <text class=\"ct-label ct-horizontal ct-end\" xmlns=\"http://www.w3.org/2000/xmlns/\"\n                        style=\"width: 24px; height: 20px;\">Jan\n                  </text>\n                </foreignObject>\n                <foreignObject style=\"overflow: visible;\" x=\"74.19375101725261\" y=\"119.60000610351562\"\n                               width=\"24.193751017252605\" height=\"20\">\n                  <text class=\"ct-label ct-horizontal ct-end\" xmlns=\"http://www.w3.org/2000/xmlns/\"\n                        style=\"width: 24px; height: 20px;\">Feb\n                  </text>\n                </foreignObject>\n                <foreignObject style=\"overflow: visible;\" x=\"98.38750203450522\" y=\"119.60000610351562\"\n                               width=\"24.193751017252602\" height=\"20\">\n                  <text class=\"ct-label ct-horizontal ct-end\" xmlns=\"http://www.w3.org/2000/xmlns/\"\n                        style=\"width: 24px; height: 20px;\">Mar\n                  </text>\n                </foreignObject>\n                <foreignObject style=\"overflow: visible;\" x=\"122.58125305175781\" y=\"119.60000610351562\"\n                               width=\"24.19375101725261\" height=\"20\">\n                  <text class=\"ct-label ct-horizontal ct-end\" xmlns=\"http://www.w3.org/2000/xmlns/\"\n                        style=\"width: 24px; height: 20px;\">Apr\n                  </text>\n                </foreignObject>\n                <foreignObject style=\"overflow: visible;\" x=\"146.77500406901044\" y=\"119.60000610351562\"\n                               width=\"24.19375101725261\" height=\"20\">\n                  <text class=\"ct-label ct-horizontal ct-end\" xmlns=\"http://www.w3.org/2000/xmlns/\"\n                        style=\"width: 24px; height: 20px;\">Mai\n                  </text>\n                </foreignObject>\n                <foreignObject style=\"overflow: visible;\" x=\"170.96875508626303\" y=\"119.60000610351562\"\n                               width=\"24.193751017252595\" height=\"20\">\n                  <text class=\"ct-label ct-horizontal ct-end\" xmlns=\"http://www.w3.org/2000/xmlns/\"\n                        style=\"width: 24px; height: 20px;\">Jun\n                  </text>\n                </foreignObject>\n                <foreignObject style=\"overflow: visible;\" x=\"195.16250610351562\" y=\"119.60000610351562\"\n                               width=\"24.193751017252623\" height=\"20\">\n                  <text class=\"ct-label ct-horizontal ct-end\" xmlns=\"http://www.w3.org/2000/xmlns/\"\n                        style=\"width: 24px; height: 20px;\">Jul\n                  </text>\n                </foreignObject>\n                <foreignObject style=\"overflow: visible;\" x=\"219.35625712076825\" y=\"119.60000610351562\"\n                               width=\"24.193751017252595\" height=\"20\">\n                  <text class=\"ct-label ct-horizontal ct-end\" xmlns=\"http://www.w3.org/2000/xmlns/\"\n                        style=\"width: 24px; height: 20px;\">Aug\n                  </text>\n                </foreignObject>\n                <foreignObject style=\"overflow: visible;\" x=\"243.55000813802084\" y=\"119.60000610351562\"\n                               width=\"24.193751017252595\" height=\"20\">\n                  <text class=\"ct-label ct-horizontal ct-end\" xmlns=\"http://www.w3.org/2000/xmlns/\"\n                        style=\"width: 24px; height: 20px;\">Sep\n                  </text>\n                </foreignObject>\n                <foreignObject style=\"overflow: visible;\" x=\"267.74375915527344\" y=\"119.60000610351562\"\n                               width=\"24.193751017252623\" height=\"20\">\n                  <text class=\"ct-label ct-horizontal ct-end\" xmlns=\"http://www.w3.org/2000/xmlns/\"\n                        style=\"width: 24px; height: 20px;\">Oct\n                  </text>\n                </foreignObject>\n                <foreignObject style=\"overflow: visible;\" x=\"291.93751017252606\" y=\"119.60000610351562\"\n                               width=\"24.193751017252623\" height=\"20\">\n                  <text class=\"ct-label ct-horizontal ct-end\" xmlns=\"http://www.w3.org/2000/xmlns/\"\n                        style=\"width: 24px; height: 20px;\">Nov\n                  </text>\n                </foreignObject>\n                <foreignObject style=\"overflow: visible;\" x=\"316.1312611897787\" y=\"119.60000610351562\" width=\"30\"\n                               height=\"20\">\n                  <text class=\"ct-label ct-horizontal ct-end\" xmlns=\"http://www.w3.org/2000/xmlns/\"\n                        style=\"width: 30px; height: 20px;\">Dec\n                  </text>\n                </foreignObject>\n                <foreignObject style=\"overflow: visible;\" y=\"92.46667141384549\" x=\"10\" height=\"22.13333468967014\"\n                               width=\"30\">\n                  <text class=\"ct-label ct-vertical ct-start\" xmlns=\"http://www.w3.org/2000/xmlns/\"\n                        style=\"height: 22px; width: 30px;\">0\n                  </text>\n                </foreignObject>\n                <foreignObject style=\"overflow: visible;\" y=\"70.33333672417535\" x=\"10\" height=\"22.13333468967014\"\n                               width=\"30\">\n                  <text class=\"ct-label ct-vertical ct-start\" xmlns=\"http://www.w3.org/2000/xmlns/\"\n                        style=\"height: 22px; width: 30px;\">200\n                  </text>\n                </foreignObject>\n                <foreignObject style=\"overflow: visible;\" y=\"48.20000203450521\" x=\"10\" height=\"22.133334689670143\"\n                               width=\"30\">\n                  <text class=\"ct-label ct-vertical ct-start\" xmlns=\"http://www.w3.org/2000/xmlns/\"\n                        style=\"height: 22px; width: 30px;\">400\n                  </text>\n                </foreignObject>\n                <foreignObject style=\"overflow: visible;\" y=\"26.066667344835068\" x=\"10\" height=\"22.133334689670136\"\n                               width=\"30\">\n                  <text class=\"ct-label ct-vertical ct-start\" xmlns=\"http://www.w3.org/2000/xmlns/\"\n                        style=\"height: 22px; width: 30px;\">600\n                  </text>\n                </foreignObject>\n                <foreignObject style=\"overflow: visible;\" y=\"-3.933332655164932\" x=\"10\" height=\"30\" width=\"30\">\n                  <text class=\"ct-label ct-vertical ct-start\" xmlns=\"http://www.w3.org/2000/xmlns/\"\n                        style=\"height: 30px; width: 30px;\">800\n                  </text>\n                </foreignObject>\n              </g>\n            </svg>\n          </div>\n\t\t\t\t</div>\n\t\t\t\t<div class=\"card-content\">\n\t\t\t\t\t<h4 class=\"title\">Hourly Volume</h4>\n\t\t\t\t\t<p class=\"category\">Last 24 Hours</p>\n\t\t\t\t</div>\n\t\t\t\t<div class=\"card-footer\">\n\t\t\t\t\t<div class=\"stats\">\n\t\t\t\t\t\t<i class=\"material-icons\">access_time</i> updated 4 minutes ago\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</div>\n\t</div>\n</div>\n"

/***/ }),

/***/ 686:
/***/ (function(module, exports) {

module.exports = "<link rel=\"stylesheet\" href=\"https://fonts.googleapis.com/icon?family=Material+Icons\">\r\n<div class=\"main-content employee-profile\">\r\n  <form [formGroup]=\"emergencyJobForm\">\r\n    <div class=\"row\">\r\n      <div class=\"col-md-12\">\r\n        <div class=\"card\">\r\n          <div class=\"card-header\" data-background-color=\"red\">\r\n            <h4 class=\"title\">EMERGENCY ALERTS</h4>\r\n          </div>\r\n          <div class=\"card-content\">\r\n            <div class=\"row\">\r\n              <div class=\"col-md-12\">\r\n                <div class=\"col-md-8\" style=\"border-right: solid;border-right-color: #80808038;height: 75vh;width: 57%\">\r\n                  <div class=\"col-md-12 formatted-form-emergency\">\r\n                    <div class=\"col-md-4\">\r\n                      <input type=\"hidden\" formControlName=\"id\" name=\"id\">\r\n\r\n                      <md-select placeholder=\"Type\" formControlName=\"type\" style=\"color: red\" name=\"type\" mdInput>\r\n                        <md-option [value]=\"3\" style=\"color: red\">Code 3</md-option>\r\n                        <md-option [value]=\"4\" style=\"color: red\">Code 4</md-option>\r\n                        <md-option [value]=\"5\" style=\"color: red\">Code 5</md-option>\r\n\r\n                      </md-select>\r\n\r\n                    </div>\r\n                    <div class=\"col-md-4\">\r\n                      <md-input-container><input formControlName=\"location\" mdInput\r\n                                                 required type=\"text\" focused>\r\n                        <md-placeholder>Required Location</md-placeholder>\r\n                      </md-input-container>\r\n                    </div>\r\n                    <div class=\"col-md-4\">\r\n\r\n                      <md-input-container><input formControlName=\"numOfStaff\" mdInput\r\n                                                 required type=\"number\" value=\"1\" focused>\r\n                        <md-placeholder>Total Staff Needed</md-placeholder>\r\n                      </md-input-container>\r\n                    </div>\r\n                  </div>\r\n                  <div class=\"col-md-12 formatted-form-emergency\">\r\n                    <div class=\"col-md-4 \">\r\n                      Send Alert(s) to\r\n                    </div>\r\n                  </div>\r\n                  <div class=\"col-md-12 formatted-form-emergency\">\r\n                    <div class=\"col-md-10\">\r\n                      <div class=\"col-md-3\">\r\n                        <md-checkbox formControlName=\"alertType\" class=\"md-primary\" value=\"one\"> All(Default)\r\n                        </md-checkbox>\r\n                      </div>\r\n                      <div class=\"col-md-3\">\r\n                        <md-checkbox formControlName=\"alertType\" value=\"two\"> Available</md-checkbox>\r\n                      </div>\r\n                      <div class=\"col-md-3\">\r\n                        <md-checkbox formControlName=\"alertType\" value=\"three\"> On Break</md-checkbox>\r\n                      </div>\r\n                      <div class=\"col-md-3\">\r\n                        <md-checkbox formControlName=\"alertType\" value=\"three\"> Busy</md-checkbox>\r\n                      </div>\r\n                    </div>\r\n                    <div class=\"col-md-2\"></div>\r\n                  </div>\r\n\r\n                  <div class=\"col-md-12 formatted-form-emergency\">\r\n                    <md-input-container><input formControlName=\"comment\" mdInput\r\n                                               required type=\"text\" focused>\r\n                      <md-placeholder>Comment(s)</md-placeholder>\r\n                    </md-input-container>\r\n                  </div>\r\n                  <div class=\"col-md-12 formatted-form-emergency\">\r\n                    <div class=\"col-md-6\">\r\n                    </div>\r\n                    <div class=\"col-md-6\">\r\n                      <div class=\"col-md-9\">\r\n                        <div style=\"margin-left:10px; margin-bottom:10px\">\r\n                          <a (click)=\"changeBtn()\" class=\"md-warn\" href=\"#/emergency\" name=\"btn\" data-type=\"send\" id=\"submitButton\" style=\"margin-right: 10px;font-size: 14px;width: 12vw\"\r\n                             class=\"btn btn-danger pull-right\"><b>Send Alert</b></a>\r\n                        </div>\r\n                      </div>\r\n                      <div class=\"col-md-3\">\r\n\r\n                      </div>\r\n                    </div>\r\n                  </div>\r\n                </div>\r\n                <div class=\"col-md-4\" style=\"width: 43%\">\r\n                  <div class=\"col-md-12\">\r\n                    <div id=\"responseDivHeader\" class=\"col-md-6\" style=\"margin-top: 5vh;font-size: 18px;color: red;font-weight: 400;\">Staff Responses\r\n                    </div>\r\n                    <div class=\"col-md-6\"></div>\r\n                  </div>\r\n                  <div id=\"noGrid\"  class=\"col-md-12\" style=\"background-color: #a9a9a94a;padding: 10px;margin: 2vh;height: 50vh;\" layout-align='center center' layout='column'>\r\n                    <span style=\"position: relative;top: 46%;transform: perspective(0px) translateY(-50%);left: 10%;color: #8080808c\"><b>Send The Alert To See Staff Responses</b></span>\r\n                  </div>\r\n                  <div  id=\"customGrid\" class=\"col-md-12\" style=\"background-color:white;padding: 10px;margin: 2vh;height: 50vh;\" layout-align='center center' layout='column'>\r\n                    <custom-grid-comp isToolTipRequired=\"false\" [jobList]=\"list\"></custom-grid-comp>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n            </div>\r\n          </div>\r\n        </div>\r\n      </div>\r\n    </div>\r\n\r\n  </form>\r\n</div>\r\n"

/***/ }),

/***/ 687:
/***/ (function(module, exports) {

module.exports = "<div *ngFor=\"let job of jobList\">\r\n\r\n  <div *ngIf=\"isToolTipRequired=='true'\">\r\n    <div class=\"locationDetailBlock\" [tooltip]=\"myTooltip\">\r\n      <div *ngIf=\"job.status=='1'\">\r\n        <div *ngIf=\"job.time >10\">\r\n          <div class=\"col-md-4 statusBlock available availablewarn\">\r\n            <span style=\"font-size: 13px\">{{job.time}} m</span>\r\n          </div>\r\n        </div>\r\n        <div *ngIf=\"job.time <=10\">\r\n          <div class=\"col-md-4 statusBlock available \">\r\n            <span style=\"font-size: 13px\">{{job.time}} m</span>\r\n          </div>\r\n        </div>\r\n\r\n      </div>\r\n      <div *ngIf=\"job.status=='2'\">\r\n        <div class=\"col-md-4 statusBlock cleaning\">\r\n          <span style=\"font-size: 13px\">{{job.time}} m</span>\r\n        </div>\r\n      </div>\r\n      <div *ngIf=\"job.status=='3'\">\r\n        <div class=\"col-md-4 statusBlock jobAssigned \">\r\n          <span style=\"font-size: 13px\">{{job.time}} m</span>\r\n        </div>\r\n      </div>\r\n      <div *ngIf=\"job.status=='4'\">\r\n        <div class=\"col-md-4 statusBlock onBreak\">\r\n          <span style=\"font-size: 13px\">{{job.time}} m</span>\r\n        </div>\r\n      </div>\r\n\r\n      <div class=\"col-md-8 locationRightBlock\">\r\n        <div>\r\n\r\n          <span class=\"locationName\"> {{job.name}} </span>\r\n        </div>\r\n        <div style=\"margin-top:-1vh\">\r\n\r\n          <span class=\"locationArea\"> {{job.currArea.area}} </span>\r\n        </div>\r\n\r\n      </div>\r\n      <tooltip-content #myTooltip [animation]=\"true\" tooltipPlacement=\"right\" placement=\"right\">\r\n        <div class=\"text-left locationToolTipDiv\">\r\n\r\n\r\n          <div class=\"col-md-12 locationToolTipHeader\">\r\n            <div class=\"col-md-8\" style=\"float: left;margin-left: -20px\"><b>{{job.name}}</b></div>\r\n\r\n            <div class=\"col-md-4 locationToolTipJobId\">\r\n              <b>{{job.jobId}}</b>\r\n            </div>\r\n          </div>\r\n          <div *ngIf=\"job.isJobAssigned=='true'\">\r\n            <div class=\"col-md-12\">\r\n              <span class=\"destDot\"></span>{{job.destArea.area}} , {{job.destArea.location}}\r\n            </div>\r\n          </div>\r\n          <div *ngIf=\"job.isJobAssigned == 'true'\">\r\n            <div class=\"col-md-12\"><span\r\n              style=\"border-left-color: #a8a8a8;border-left-style: solid;height: 1em\"></span>\r\n            </div>\r\n          </div>\r\n          <div class=\"col-md-12\">\r\n\r\n            <span class=\"currDot\"></span>{{job.currArea.area}} , {{job.currArea.location}}\r\n\r\n          </div>\r\n          <div *ngIf=\"job.isJobAssigned=='true'\">\r\n            <div class=\"col-md-12\" style=\";margin-top: 4px\">\r\n              <div *ngIf=\"job.status=='1'\">\r\n                <div class=\"col-md-7 locationJobStatusDiv available\"><b>AVAILABLE</b></div>\r\n              </div>\r\n              <div *ngIf=\"job.status=='2'\">\r\n                <div class=\"col-md-7 locationJobStatusDiv cleaning\"><b>CLEANING</b></div>\r\n              </div>\r\n              <div *ngIf=\"job.status=='3'\">\r\n                <div class=\"col-md-7 locationJobStatusDiv jobAssigned\"><b>IN PROGRESS</b></div>\r\n              </div>\r\n              <div *ngIf=\"job.status=='4'\">\r\n                <div class=\"col-md-7 locationJobStatusDiv onBreak\"><b>ON BREAK</b></div>\r\n              </div>\r\n\r\n              <div class=\"col-md-5\">\r\n\r\n                <div class=\"col-md-6\"></div>\r\n                <div class=\"col-md-6 locationTimer\"><b>\r\n                  00:{{job.time}}:00\r\n                </b></div>\r\n              </div>\r\n\r\n            </div>\r\n          </div>\r\n          <div *ngIf=\"job.isJobAssigned=='false'\">\r\n            <div class=\"col-md-12\" style=\";margin-top: 24px\">\r\n              <div *ngIf=\"job.status=='1'\">\r\n                <div class=\"col-md-7 locationJobStatusDiv available\"><b>AVAILABLE</b></div>\r\n              </div>\r\n              <div *ngIf=\"job.status=='2'\">\r\n                <div class=\"col-md-7 locationJobStatusDiv cleaning\"><b>CLEANING</b></div>\r\n              </div>\r\n              <div *ngIf=\"job.status=='3'\">\r\n                <div class=\"col-md-7 locationJobStatusDiv jobAssigned\"><b>IN PROGRESS</b></div>\r\n              </div>\r\n              <div *ngIf=\"job.status=='4'\">\r\n                <div class=\"col-md-7 locationJobStatusDiv onBreak\"><b>ON BREAK</b></div>\r\n              </div>\r\n\r\n              <div class=\"col-md-5\">\r\n\r\n                <div class=\"col-md-6\"></div>\r\n                <div class=\"col-md-6 locationTimer\"><b>\r\n                   00:{{job.time}}:00\r\n                </b></div>\r\n              </div>\r\n\r\n            </div>\r\n          </div>\r\n\r\n        </div>\r\n      </tooltip-content>\r\n\r\n\r\n    </div>\r\n  </div>\r\n  <div *ngIf=\"isToolTipRequired=='false'\">\r\n    <div class=\"locationDetailBlock\" >\r\n      <div *ngIf=\"job.status=='1'\">\r\n        <div class=\"col-md-4 statusBlock available\">\r\n          <span style=\"font-size: 13px\">{{job.time}} M</span>\r\n        </div>\r\n      </div>\r\n      <div *ngIf=\"job.status=='2'\">\r\n        <div class=\"col-md-4 statusBlock cleaning\">\r\n          <span style=\"font-size: 13px\">{{job.time}} M</span>\r\n        </div>\r\n      </div>\r\n      <div *ngIf=\"job.status=='3'\">\r\n        <div class=\"col-md-4 statusBlock jobAssigned \">\r\n          <span style=\"font-size: 13px\">{{job.time}} M</span>\r\n        </div>\r\n      </div>\r\n      <div *ngIf=\"job.status=='4'\">\r\n        <div class=\"col-md-4 statusBlock onBreak\">\r\n          <span style=\"font-size: 13px\">{{job.time}} M</span>\r\n        </div>\r\n      </div>\r\n\r\n      <div class=\"col-md-8 locationRightBlock\" >\r\n        <div>\r\n\r\n          <span class=\"locationName\"> {{job.name}} </span>\r\n        </div>\r\n        <div style=\"margin-top:-1vh\">\r\n\r\n          <span class=\"locationArea\"> {{job.currArea.area}} </span>\r\n        </div>\r\n\r\n      </div>\r\n\r\n\r\n\r\n    </div>\r\n  </div>\r\n\r\n\r\n</div>\r\n"

/***/ }),

/***/ 688:
/***/ (function(module, exports) {

module.exports = "<link rel=\"stylesheet\" href=\"https://fonts.googleapis.com/icon?family=Material+Icons\">\r\n<div class=\"main-content employee-profile\">\r\n  <form [formGroup]=\"addJobForm\">\r\n    <div class=\"row\">\r\n      <div class=\"col-md-12\">\r\n        <div class=\"card\">\r\n          <div class=\"card-header\" data-background-color=\"purple\">\r\n            <h4 class=\"title\">Create New Job</h4>\r\n          </div>\r\n          <div class=\"card-content\">\r\n            <div class=\"row\">\r\n              <div class=\"col-md-12\">\r\n                <div class=\"col-md-8\" style=\"border-right: solid;border-right-color: #80808038\">\r\n                  <div class=\"col-md-12 formatted-form\">\r\n                    <div class=\"col-md-4\">\r\n                      <input type=\"hidden\" formControlName=\"id\" name=\"id\">\r\n\r\n                        <md-select placeholder=\"Job Category\" formControlName=\"category\" name=\"category\" mdInput>\r\n                          <md-option *ngFor=\"let empType of empTypeList\" [value]=\"empType.id\">{{empType.name}}</md-option>\r\n\r\n                        </md-select>\r\n\r\n                    </div>\r\n                    <div class=\"col-md-4\">\r\n                      <md-select placeholder=\"Job Type\" formControlName=\"jobType\" name=\"jobType\" mdInput>\r\n                        <md-option *ngFor=\"let jobType of jobTypeList\" [value]=\"jobType.id\">{{jobType.name}}</md-option>\r\n\r\n                      </md-select>\r\n                    </div>\r\n                    <div class=\"col-md-4\">\r\n\r\n                      <md-input-container><input formControlName=\"numOfStaff\" mdInput\r\n                                                 required type=\"number\" value=\"1\" focused>\r\n                        <md-placeholder>Number of staff</md-placeholder>\r\n                      </md-input-container>\r\n                    </div>\r\n                  </div>\r\n                  <div class=\"col-md-12 formatted-form\">\r\n                    <div class=\"col-md-4\">\r\n\r\n                      <md-input-container><input formControlName=\"currLocation\" mdInput\r\n                                                 required type=\"text\" focused>\r\n                        <md-placeholder>Current location/building</md-placeholder>\r\n                      </md-input-container>\r\n                    </div>\r\n                    <div class=\"col-md-4\">\r\n                      <md-input-container><input mdInput formControlName=\"currFloor\"\r\n                                                 required type=\"text\" focused>\r\n                        <md-placeholder>Floor number</md-placeholder>\r\n                      </md-input-container>\r\n                    </div>\r\n                    <div class=\"col-md-4\">\r\n\r\n                      <md-input-container><input formControlName=\"currArea\" mdInput\r\n                                                 required type=\"text\" focused>\r\n                        <md-placeholder>Area</md-placeholder>\r\n                      </md-input-container>\r\n                    </div>\r\n                  </div>\r\n                  <div class=\"col-md-12 formatted-form\">\r\n                    <div class=\"col-md-4\">\r\n\r\n                      <md-input-container><input mdInput formControlName=\"destLocation\"\r\n                                                 required type=\"text\" focused>\r\n                        <md-placeholder>Destination location/building</md-placeholder>\r\n                      </md-input-container>\r\n                    </div>\r\n                    <div class=\"col-md-4\">\r\n\r\n                      <md-input-container><input mdInput formControlName=\"destFloor\"\r\n                                                 required type=\"text\" focused>\r\n                        <md-placeholder>Floor number</md-placeholder>\r\n                      </md-input-container>\r\n                    </div>\r\n                    <div class=\"col-md-4\">\r\n\r\n                      <md-input-container><input mdInput name=\"destArea\" formControlName=\"destArea\"\r\n                                                 required type=\"text\" focused>\r\n                        <md-placeholder>Area*</md-placeholder>\r\n                      </md-input-container>\r\n                    </div>\r\n                  </div>\r\n                  <div class=\"col-md-12 formatted-form\">\r\n                    <div class=\"col-md-7 formatted-form\" style=\"margin-left: 0px\">\r\n\r\n                      <md-radio-group>\r\n                        <div class=\"col-md-4\">\r\n                          Required Time\r\n                        </div>\r\n                        <div class=\"col-md-3\">\r\n                          <input type=\"radio\" formControlName=\"isPreSchedule\" value=\"now\"> Now\r\n                        </div>\r\n                        <div class=\"col-md-4\" style=\"padding: 1px\">\r\n                          <input type=\"radio\" formControlName=\"isPreSchedule\" value=\"pre\"> Pre Schedule\r\n                        </div>\r\n                      </md-radio-group>\r\n                    </div>\r\n                    <div class=\"col-md-4\"><md-placeholder>Set Required Date and Time</md-placeholder>\r\n                      <angular2-date-picker formControlName=\"date\" [settings]=\"settings\" ></angular2-date-picker>\r\n                    </div>\r\n                  </div>\r\n                  <div class=\"col-md-12 formatted-form\">\r\n                    <div class=\"col-md-3 \">\r\n                      Equipments Needed\r\n\r\n                    </div>\r\n                    <div class=\"col-md-9\">\r\n\r\n                      <div class=\"col-md-4 equipment\" style=\"width: auto;min-width: 17vh\">\r\n                        <md-checkbox formControlName=\"isPreSchedule\" class=\"md-primary\" value=\"one\"> Bed</md-checkbox>\r\n                      </div>\r\n                      <div class=\"col-md-3 equipment\" style=\"width: auto;\">\r\n                        <md-checkbox formControlName=\"isPreSchedule\" value=\"three\"> Trolley Luggage</md-checkbox>\r\n                      </div>\r\n                      <div class=\"col-md-4 equipment\" style=\"width: auto\">\r\n                        <md-checkbox formControlName=\"isPreSchedule\" class=\"md-primary\" value=\"one\">  Wheel chair (BIG)</md-checkbox>\r\n                      </div>\r\n\r\n                    </div>\r\n                  </div>\r\n                  <div class=\"col-md-12 formatted-form\">\r\n                    <div class=\"col-md-3\">\r\n\r\n\r\n                    </div>\r\n                    <div class=\"col-md-9\">\r\n\r\n                      <div class=\"col-md-4 equipment\" style=\"width: auto\">\r\n                        <md-checkbox formControlName=\"isPreSchedule\" value=\"two\"> Stretcher</md-checkbox>\r\n\r\n                      </div>\r\n                      <div class=\"col-md-3 equipment\" style=\"width: auto\">\r\n                        <md-checkbox formControlName=\"isPreSchedule\" value=\"two\"> Oxygen Tank</md-checkbox>\r\n                      </div>\r\n                      <div class=\"col-md-4 equipment\" style=\"width: auto\">\r\n                        <md-checkbox formControlName=\"isPreSchedule\" class=\"md-primary\" value=\"one\">  Wheel chair (SMALL)</md-checkbox>\r\n                      </div>\r\n\r\n                    </div>\r\n                  </div>\r\n                  <div class=\"col-md-12 formatted-form\">\r\n                    <div class=\"col-md-3\">\r\n\r\n\r\n                    </div>\r\n                    <div class=\"col-md-9\">\r\n\r\n                      <div class=\"col-md-4 equipment\" style=\"width: auto\">\r\n                        <md-checkbox formControlName=\"isPreSchedule\" value=\"three\"> Stretcher for ambulance</md-checkbox>\r\n\r\n                      </div>\r\n                      <div class=\"col-md-3\" style=\"width: auto\">\r\n                        <!--<md-checkbox formControlName=\"isPreSchedule\" value=\"two\"> Oxygen Tank</md-checkbox>-->\r\n                      </div>\r\n                      <div class=\"col-md-4\" style=\"width: auto\">\r\n                        <!--<md-checkbox formControlName=\"isPreSchedule\" value=\"three\"> Trolley Luggage</md-checkbox>-->\r\n                      </div>\r\n\r\n                    </div>\r\n                  </div>\r\n                  <div class=\"col-md-12 formatted-form\">\r\n                    <md-input-container><input formControlName=\"remark\" mdInput\r\n                                               required type=\"text\" focused>\r\n                      <md-placeholder>Special Remarks</md-placeholder>\r\n                    </md-input-container>\r\n                  </div>\r\n                </div>\r\n                <div class=\"col-md-4\">\r\n                  <div class=\"col-md-12\">\r\n\r\n                    <div class=\"col-md-3\">\r\n                      <md-select name=\"destArea\" class=\"title\" [value]=\"1\" formControlName=\"destArea\">\r\n                        <md-option [value]=\"1\" >Mr</md-option>\r\n                        <md-option [value]=\"2\">Mrs</md-option>\r\n                        <md-option [value]=\"3\">Ms</md-option>\r\n                        <md-option [value]=\"4\">Ven</md-option>\r\n                      </md-select>\r\n                    </div>\r\n                    <div class=\"col-md-9\">\r\n                      <md-input-container><input formControlName=\"patientName\" mdInput\r\n                                                 required type=\"text\" focused>\r\n                        <md-placeholder>Patient Name</md-placeholder>\r\n                      </md-input-container>\r\n                    </div>\r\n                  </div>\r\n                  <div class=\"col-md-12\">\r\n                    <md-input-container><input formControlName=\"patientId\" mdInput\r\n                                               required type=\"text\" focused>\r\n                      <md-placeholder>Patient Id</md-placeholder>\r\n                    </md-input-container>\r\n                  </div>\r\n                  <div>\r\n                    <div class=\"col-md-7 formatted-form\" style=\"margin-left: 0px\">\r\n\r\n                      <md-radio-group placeholder=\"Gender\">\r\n\r\n                        <div class=\"col-md-6\">\r\n                          <input type=\"radio\" formControlName=\"gender\" value=\"MALE\"> Male\r\n                        </div>\r\n                        <div class=\"col-md-6\" style=\"padding: 1px\">\r\n                          <input type=\"radio\" formControlName=\"gender\" value=\"FEMALE\"> Female\r\n                        </div>\r\n                      </md-radio-group>\r\n\r\n                    </div>\r\n                    <div class=\"col-md-3\">\r\n                      <md-input-container><input formControlName=\"age\" mdInput\r\n                                                 required type=\"number\" focused>\r\n                        <md-placeholder>Age</md-placeholder>\r\n                      </md-input-container>\r\n                    </div>\r\n                  </div>\r\n                  <div class=\"col-md-12 formatted-form\">\r\n                    <md-input-container><input formControlName=\"requestorName\" mdInput\r\n                                               required type=\"text\" focused>\r\n                      <md-placeholder>Requestor's name</md-placeholder>\r\n                    </md-input-container>\r\n                  </div>\r\n                  <div class=\"col-md-12 formatted-form\">\r\n                    <md-input-container><input formControlName=\"requestorContact\" mdInput\r\n                                               required type=\"text\" focused>\r\n                      <md-placeholder>Requestor's Contact No</md-placeholder>\r\n                    </md-input-container>\r\n                  </div>\r\n                  <div class=\"col-md-12 formatted-form\">\r\n                    <div class=\"col-md-2\"></div>\r\n                    <div class=\"col-md-10\">\r\n                      <button type=\"submit\"  class=\"btn btn-primary pull-right\">\r\n                        Create New Job\r\n                      </button>\r\n                      <div class=\"clearfix\"></div>\r\n                    </div>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n\r\n\r\n            </div>\r\n\r\n          </div>\r\n        </div>\r\n\r\n      </div>\r\n    </div>\r\n\r\n  </form>\r\n</div>\r\n\r\n<style>\r\n\r\n</style>\r\n"

/***/ }),

/***/ 689:
/***/ (function(module, exports) {

module.exports = "<div class=\"main-content\">\n\n\t<div class=\"row\">\n    <div *ngIf=\"isSummaryAvailable=='true'\">\n      <div class=\"col-md-12\">\n        <div class=\"card\">\n          <div class=\"card-content\" style=\"height: auto\">\n            <div class=\"col-md-4 summary-right-border summary-main-block\" style=\"margin-bottom: 1vh;\">\n              <div class=\"col-md-12 \" style=\"margin-left: -3vw; \">\n                <div class=\"col-md-9 summary-main-text\">\n                  <span >Total Jobs</span><br>\n                  <span style=\"font-size: 24px\">FOR TODAY</span>\n                </div>\n                <div class=\"col-md-3 summary-main-count\" style=\"margin-top: 1.5vh;\">\n                  <span>521</span>\n                </div>\n              </div>\n            </div>\n            <div class=\"col-md-8\">\n              <div class=\"col-md-2 summary-right-border\" >\n                <span class=\"summary-detail-text-block\">In Progress</span><br>\n                <span class=\"summary-count-block\">12</span>\n              </div>\n              <div class=\"col-md-2 summary-right-border\" >\n                <span class=\"summary-detail-text-block\">Pending</span><br>\n                <span class=\"summary-count-block\">03</span>\n              </div>\n              <div class=\"col-md-3 summary-right-border\" >\n                <span class=\"summary-detail-text-block\">Pre Scheduled</span><br>\n                <span class=\"summary-count-block\">06</span>\n              </div>\n              <div class=\"col-md-2 summary-right-border\" >\n                <span class=\"summary-detail-text-block\">Completed</span><br>\n                <span class=\"summary-count-block\">498</span>\n              </div>\n              <div class=\"col-md-3 \" >\n                <span class=\"summary-detail-text-block\">Cancelled</span><br>\n                <span class=\"summary-count-block\">02</span>\n              </div>\n            </div>\n          </div>\n\n        </div>\n      </div>\n    </div>\n\t\t<div class=\"col-md-12\">\n\t\t\t<div class=\"card\">\n\t\t\t\t<div class=\"card-header\" data-background-color=\"purple\">\n\t\t\t\t\t<h4 class=\"title\">Current Job List</h4>\n\t\t\t\t</div>\n\t\t\t\t<div class=\"card-content\">\n          <div *ngIf=\"customValidation.isPermissionAvailable('JOB_LIST_EDIT')\" style=\"margin-left:10px; margin-bottom:10px\">\n            <a class=\"md-button\"  href=\"#/addjob\" style=\"margin-right: 10px\"\n               class=\"btn btn-info pull-right\">Add Job</a>\n          </div>\n\t\t\t\t\t<ag-grid-table-cmp #jobListTable ></ag-grid-table-cmp>\n\t\t\t\t</div>\n\t\t\t</div>\n\n\t\t</div>\n\t</div>\n\n</div>\n"

/***/ }),

/***/ 690:
/***/ (function(module, exports) {

module.exports = "<div class=\"main-content job-status\">\n\n  <div class=\"row\">\n    <div class=\"col-md-4\">\n      <div class=\"card \" style=\"margin-left: 4vh\">\n\n        <div class=\"card-content\">\n          <div class=\"job-info\">\n            <div class=\"card-footer job-status-header\">\n              <div class=\"stats\">\n                <b>Job Details</b>\n              </div>\n              <div class=\"stats pull-right\">\n                <span style=\"padding: 4px\" class=\"onBreak locationJobStatusDiv\">Completed</span>\n              </div>\n            </div>\n            <div class=\"card-content\">\n\n              <div class=\"row text-center\" style=\"margin-top: 4vh;margin-bottom: 6vh\">\n                <span style=\"font-size: 22px\">Patient Transfer - Wheel Chair</span>\n              </div>\n              <div >\n                <div class=\"row\" style=\"padding: 2vh\">\n                  <div class=\"col-md-2\">\n                    <div class=\"icon\" style=\"color: green\">\n                      <i class=\"material-icons\">location_on</i>\n                    </div>\n                  </div>\n                  <div class=\"col-md-10\">\n                    <span>Emergency Department</span><br>\n                    <span style=\"font-weight: 500;    font-size: 16px;\">Ground Floor, Hospital Building</span>\n                  </div>\n                </div>\n                <div class=\"row\" style=\"padding: 2vh\">\n                  <div class=\"col-md-2\">\n                    <div class=\"icon\" style=\"color: orangered\">\n                      <i class=\"material-icons\">location_on</i>\n                    </div>\n                  </div>\n                  <div class=\"col-md-10\">\n                    <span>Operating Rooms</span><br>\n                    <span style=\"font-weight: 500;    font-size: 16px;\">9th Floor, Hospital Building</span>\n                  </div>\n                </div>\n              </div>\n              <div class=\"row text-center\" style=\"padding: 2vh;margin-top: 4vh; margin-bottom: 3vh;\">\n                <span style=\"font-size: 19px;font-weight:  600;\"> Total Duration - 10:12</span>\n              </div>\n            </div>\n\n            <div class=\"card-footer job-status-requested\">\n              <div style=\"margin-top: 3vh; margin-bottom: 2vh;    width: 22vw;\">\n                <h5>Requested By</h5>\n                <div class=\"author\">\n                  <a href=\"#pablo\"> <img src=\"assets/img/faces/marc.jpg\"\n                                         alt=\"...\" class=\"avatar img-raised\"> <span>Kanchana\n\t\t\t\t\t\t\t\t\t\tSumanasekara</span></a>\n                </div>\n                <div class=\"stats pull-right\">\n                  <i\n                    class=\"material-icons\">local_phone</i> 0771231233\n                </div>\n              </div>\n            </div>\n\n          </div>\n\n        </div>\n      </div>\n    </div>\n    <div class=\"col-md-4\">\n      <div class=\"col-md-3\"></div>\n      <div class=\"col-md-6\">\n        <ul class=\"timeline timeline-simple\" style=\"margin-top: 20px;\">\n          <li class=\"timeline-inverted\" style=\"margin-bottom: 0px\">\n            <div class=\"timeline-badge success\">\n              <i class=\"material-icons\">card_travel</i>\n            </div>\n            <div class=\"timeline-panel\">\n              <div class=\"timeline-heading\">\n                <span class=\"job-detail-timeline-text\">Requested</span>\n              </div>\n              <h6>\n                <i class=\"ti-time job-detail-timeline-text\"></i> 12:55:03 PM\n              </h6>\n            </div>\n          </li>\n          <li class=\"timeline-inverted\" style=\"margin-bottom: 0px\">\n            <div class=\"timeline-badge success\">\n              <i class=\"material-icons\">thumb_up</i>\n            </div>\n            <div class=\"timeline-panel\">\n              <div class=\"timeline-heading\">\n                <span class=\"job-detail-timeline-text\">Accepted</span>\n              </div>\n              <h6>\n                <i class=\"ti-time job-detail-timeline-text\"></i> 12:56:58 PM\n              </h6>\n            </div>\n          </li>\n          <li class=\"timeline-inverted\" style=\"margin-bottom: 0px\">\n            <div class=\"timeline-badge success\">\n              <i class=\"material-icons\">directions_walk</i>\n            </div>\n            <div class=\"timeline-panel\">\n              <div class=\"timeline-heading\">\n                <span class=\"job-detail-timeline-text\">Arrived</span>\n              </div>\n              <h6>\n                <i class=\"ti-time job-detail-timeline-text\"></i> 12:59:58 PM\n              </h6>\n            </div>\n          </li>\n          <li class=\"timeline-inverted\" style=\"margin-bottom: 0px\">\n            <div class=\"timeline-badge success\">\n              <i class=\"material-icons\">done</i>\n            </div>\n            <div class=\"timeline-panel\">\n              <div class=\"timeline-heading\">\n                <span class=\"job-detail-timeline-text\">Job Completed</span>\n              </div>\n              <h6>\n                <i class=\"ti-time job-detail-timeline-text\"></i> 13:06:10 PM\n              </h6>\n            </div>\n          </li>\n          <li class=\"timeline-inverted\" style=\"margin-bottom: 0px\">\n            <div class=\"timeline-badge \" style=\"background-color: orange\">\n\n            </div>\n            <div class=\"timeline-panel\">\n              <div class=\"timeline-heading\">\n                <span class=\"job-detail-timeline-text\">Cleaning</span>\n              </div>\n              <h6 style=\"color: orange\">\n                <i class=\"ti-time job-detail-timeline-text\" style=\"color: orange\"></i> Ongoing\n              </h6>\n            </div>\n          </li>\n        </ul>\n      </div>\n      <div class=\"col-md-3\"></div>\n\n\n\n    </div>\n    <div class=\"col-md-4\">\n      <!--<div class=\"card card-profile\">\n        <div class=\"card-avatar\">\n          <a href=\"#pablo\"> <img class=\"img\"\n                                 src=\"assets/img/faces/marc.jpg\">\n          </a>\n        </div>\n        <div class=\"card-content\">\n          <h6 class=\"category text-gray\">Airi Satou</h6>\n          <h4 class=\"card-title\">\n            Level 1 Interpreter - <span class=\"label label-success\">Available</span>\n          </h4>\n\n          <div class=\"row\">\n            <div class=\"col-md-12\">\n              <div class=\"nav-center\">\n                <ul class=\"nav nav-pills nav-pills-primary nav-pills-icons\"\n                    role=\"tablist\">\n                  <li class=\"active\"><a href=\"#info\" role=\"tab\"\n                                        data-toggle=\"tab\" aria-expanded=\"true\"> <i\n                    class=\"material-icons\">info</i> General\n                  </a></li>\n                  <li class=\"\"><a href=\"#workTimeLine\" role=\"tab\"\n                                  data-toggle=\"tab\" aria-expanded=\"false\"> <i\n                    class=\"material-icons\">timeline</i> Work Timeline\n                  </a></li>\n                </ul>\n              </div>\n              <div class=\"tab-content\">\n                <div class=\"tab-pane active\" id=\"info\">\n\n                  <div class=\"nav-pills-content\">\n\n                    <div class=\"content-set\">\n                      <div class=\"icon\">\n                        <i class=\"material-icons\">location_on</i>\n                      </div>\n                      <div class=\"value\">\n                        Emergency Department\n                        <small class=\"details\">Current\n                          location\n                        </small>\n                      </div>\n                    </div>\n                    <div class=\"content-set\">\n                      <div class=\"icon\">\n                        <i class=\"material-icons\">event_available</i>\n                      </div>\n                      <div class=\"value\">\n                        12:30:23\n                        <small class=\"details\">Available from</small>\n                      </div>\n                    </div>\n\n                    <div class=\"content-set\">\n                      <div class=\"icon\">\n                        <i class=\"material-icons\">local_phone</i>\n                      </div>\n                      <div class=\"value\">0716345345</div>\n                    </div>\n                    <div class=\"content-set\">\n                      <div class=\"icon\">\n                        <i class=\"material-icons\">school</i>\n                      </div>\n                      <div class=\"value\">Japanese , English , Spanish</div>\n                    </div>\n\n                  </div>\n                </div>\n                <div class=\"tab-pane\" id=\"workTimeLine\">\n                  <div class=\"nav-pills-content\">\n                    <div class=\"row\">\n                      <div class=\"col-md-6\">\n                        <div class=\"content-set\">\n                          <div class=\"icon\">\n                            <i class=\"material-icons\">alarm</i>\n                          </div>\n                          <div class=\"value\">08:00:00</div>\n                          <div class=\"details\">Works start at</div>\n                        </div>\n                      </div>\n\n                      <div class=\"col-md-6\">\n                        <div class=\"content-set\">\n                          <div class=\"icon\">\n                            <i class=\"material-icons\">alarm_off</i>\n                          </div>\n                          <div class=\"value\">05:00:00</div>\n                          <div class=\"details\">Works end at</div>\n                        </div>\n                      </div>\n                    </div>\n\n                  </div>\n                </div>\n              </div>\n            </div>\n\n          </div>\n          <a href=\"#pablo\" class=\"btn btn-primary btn-round\">Change\n            Assignee</a>\n        </div>\n      </div>-->\n      <div class=\"card \" style=\"margin-left: -4vh\">\n\n        <div class=\"card-content\">\n          <div class=\"job-info\">\n            <div class=\"card-footer job-status-header\">\n              <div class=\"stats\">\n                <b>Employee Details</b>\n              </div>\n              <div class=\"stats pull-right\">\n                <span style=\"padding: 4px\" class=\"cleaning locationJobStatusDiv\">Cleaning</span>\n              </div>\n            </div>\n            <div class=\"card-content\">\n\n              <div class=\"row text-center\" style=\"margin-top: 4vh;margin-bottom: 4vh\">\n                <div class=\"card-avatar\" style=\"margin-left: 2vw\">\n                  <div class=\"col-md-3\">\n                    <a href=\"#pablo\"> <img class=\"img\" style=\"border-radius: 50%; width: 10vh;\"\n                                           src=\"assets/img/faces/marc.jpg\">\n                    </a>\n                  </div>\n                  <div class=\"col-md-9\">\n                    <span style=\"margin-left: 2vh;margin-top: 2vh;float: left;font-size: 20px\">Asok Viriluseai</span><br>\n                    <span style=\"margin-left: 2vh;float: left\">Senior Porter - Group A </span>\n                  </div>\n\n\n                </div>\n              </div>\n              <div style=\"margin-bottom: 4vh;margin-top: 5vh\">\n                <div class=\"row text-center\" style=\"padding: 1vh\">\n                  <span style=\"font-size: 18px; font-weight: 600;\">Handle Time Breakdown</span>\n                </div>\n                <div class=\"row\" >\n                  <div>\n                    <div class=\"col-md-2\"></div>\n                    <div class=\"col-md-7\">\n                      <span style=\"font-weight: 500;\">On Route</span>\n                    </div>\n                    <div class=\"col-md-3\">\n                      <span style=\"font-weight: 500;\">3:00</span>\n                    </div>\n                  </div>\n                  <div>\n                    <div class=\"col-md-2\"></div>\n                    <div class=\"col-md-7\">\n                      <span style=\"font-weight: 500;\">Transport Time</span>\n                    </div>\n                    <div class=\"col-md-3\">\n                      <span style=\"font-weight: 500;\">6:12</span>\n                    </div>\n                  </div>\n                  <div>\n                    <div class=\"col-md-2\"></div>\n                    <div class=\"col-md-7\">\n                      <span style=\"font-weight: 500;\">Cleaning Time</span>\n                    </div>\n                    <div class=\"col-md-3\">\n                      <span style=\"font-weight: 500;\">1:00</span>\n                    </div>\n                  </div>\n                  <div>\n                    <div class=\"col-md-2\"></div>\n                    <div class=\"col-md-7\">\n                      <span style=\"font-weight: 600; font-size: 17px; color: darkgrey\">Total Handling Time</span>\n                    </div>\n                    <div class=\"col-md-3\">\n                      <span style=\"font-weight: 600; font-size: 17px; color: darkgrey\">10:12</span>\n                    </div>\n                  </div>\n                </div>\n\n              </div>\n              <div class=\"row text-center\" style=\"padding: 2vh;margin-top: 1vh; margin-bottom: 1vh;\">\n                <span style=\"font-size: 19px;font-weight:  600;\"> Point Rewarded</span><br>\n                <i style=\"color: orange;\" class=\"material-icons\">star_border</i>\n                <i style=\"color: orange;\" class=\"material-icons\">star_border</i>\n                <i style=\"color: orange;\" class=\"material-icons\">star_border</i>\n                <i class=\"material-icons\">star_border</i>\n                <i class=\"material-icons\">star_border</i>\n\n\n              </div>\n            </div>\n\n            <div class=\"card-footer job-status-requested\">\n              <div class=\"author\" style=\"margin-top: 3vh;margin-bottom: 1vh;\">\n                <div class=\"col-md-1\" style=\"background-color: orange;width: auto; height: 3vh;border-radius: 5px;\"> </div>\n                <div class=\"col-md-11\" style=\"width: auto\">\n                  <span style=\"font-size: 11px;font-weight: 600;margin-left: -1vh;\">9th Floor, Equipment Bay</span>\n                </div>\n              </div>\n              <div class=\"stats pull-right\" style=\"margin-top: 2vh\">\n                <i class=\"material-icons\">timeline</i><br>\n                <span style=\"font-size: 11px;font-weight: 600;\">Work Timeline</span>\n              </div>\n            </div>\n\n          </div>\n\n        </div>\n      </div>\n    </div>\n\n\n  </div>\n\n</div>\n"

/***/ }),

/***/ 691:
/***/ (function(module, exports) {

module.exports = "<div class=\"main-content\">\r\n  <div class=\"myDialog\">\r\n    <h2 md-dialog-title>{{title}}</h2>\r\n    <div md-dialog-content>\r\n      <div>\r\n        <form [formGroup]=\"jobTypeForm\"  novalidate>\r\n          <!-- we will place our fields here -->\r\n          <div  class=\"form-group\">\r\n            <input  type=\"hidden\" formControlName=\"id\" name=\"id\" class=\"form-control\" >\r\n            <label>Name</label>\r\n            <!--bind name to ngModel, it's required with minimum 5 characters-->\r\n            <input  type=\"text\" formControlName=\"name\" name=\"name\" class=\"form-control\" >\r\n            <!--show error only when field is not valid & it's dirty or form submited-->\r\n\r\n            <small *ngIf=\"jobTypeForm.controls.name.errors && (jobTypeForm.controls.name.dirty || jobTypeForm.controls.name.touched)\">\r\n              <small [hidden]=\"!jobTypeForm.controls.name.errors.required\" class=\"text-danger\">\r\n                Job Type Name is required\r\n              </small>\r\n\r\n              <small [hidden]=\"!jobTypeForm.controls.name.errors.exist\" class=\"text-danger\">\r\n                Duplicate Job Type\r\n              </small>\r\n            </small>\r\n          </div>\r\n\r\n          <div class=\"form-group\">\r\n            <label>Category</label>\r\n            <md-select   [(ngModel)]=\"category\" formControlName=\"category\" class=\"form-control\">\r\n              <md-option *ngFor=\"let cat of categoryList\" [value]=\"cat.id\">{{ cat.name }}</md-option>\r\n            </md-select>\r\n          </div>\r\n          <div class=\"form-group\">\r\n            <label>Required Skills</label>\r\n            <md-select multiple=\"true\"  [(ngModel)]=\"requiredSkills\" formControlName=\"requiredSkills\" class=\"form-control\">\r\n              <md-option *ngFor=\"let skill of skills\" [value]=\"skill.id\">{{ skill.name }}</md-option>\r\n            </md-select>\r\n          </div>\r\n\r\n          <div class=\"form-group\">\r\n            <label>Optional Skills</label>\r\n            <md-select multiple=\"true\"  [(ngModel)]=\"optionalSkills\" formControlName=\"optionalSkills\" class=\"form-control\">\r\n              <md-option *ngFor=\"let skill of skills\" [value]=\"skill.id\">{{ skill.name }}</md-option>\r\n            </md-select>\r\n          </div>\r\n\r\n          <button md-button  type=\"submit\" (click)=\"dialogRef.close(jobTypeForm.value)\" >{{actionButton}}</button>\r\n          <button md-button type=\"button\" (click)=\"dialogRef.close(null)\">Cancel</button>\r\n        </form>\r\n      </div>\r\n\r\n    </div>\r\n    <div md-dialog-actions>\r\n\r\n    </div>\r\n  </div>\r\n</div>\r\n"

/***/ }),

/***/ 692:
/***/ (function(module, exports) {

module.exports = "<div class=\"main-content\">\r\n  <div class=\"row\">\r\n    <div class=\"col-md-12\">\r\n      <div class=\"card\">\r\n        <div class=\"card-header\" data-background-color=\"purple\">\r\n          <h4 class=\"title\">Job Types</h4>\r\n        </div>\r\n        <div class=\"card-content\">\r\n          <div *ngIf=\"customValidation.isPermissionAvailable('JOB_TYPES_EDIT')\" style=\"margin-left:10px; margin-bottom:10px\">\r\n            <button md-button (click)=\"openJobTypeDialog()\" style=\"margin-right: 10px\"\r\n                    class=\"btn btn-info pull-right\">Add Job Type</button>\r\n          </div>\r\n          <ag-grid-table-cmp></ag-grid-table-cmp>\r\n        </div>\r\n      </div>\r\n\r\n    </div>\r\n  </div>\r\n</div>\r\n"

/***/ }),

/***/ 693:
/***/ (function(module, exports) {

module.exports = "\r\n<div class=\"\">\r\n\r\n\t<div class=\"col-md-10 col-md-offset-1 col-sm-9 col-sm-offset-2\" style = 'margin-left: 0% ; margin-top: 20px'>\r\n\r\n\t\t<div class=\"card card-signup\">\r\n\r\n\t\t\t<div class=\"col-md-6\">\r\n\r\n\t\t\t\t<div class='row' style=\"margin-top: 5em;\"></div>\r\n\r\n\t\t\t\t<div class='row' style=\"margin-left: 3em;\">\r\n\t\t\t\t\t<h3>\r\n\t\t\t\t\t\t<img src=\"assets/img/productivity.png\" [style.width.px]='happyImageWidth'\r\n\t\t\t\t\t\t\t[style.margin-top.px]='happyImageMargin'> <strong>{{'productivity'\r\n\t\t\t\t\t\t\t| translate}}</strong>\r\n\t\t\t\t\t</h3>\r\n\t\t\t\t\t<p>{{'proctivityParagraph' | translate}}</p>\r\n\t\t\t\t</div>\r\n\r\n\t\t\t\t<div class='row' style=\"margin-left: 3em;\">\r\n\t\t\t\t\t<h3>\r\n\t\t\t\t\t\t<img src=\"assets/img/gears.gif\" [style.width.px]='happyImageWidth'\r\n\t\t\t\t\t\t\t[style.margin-top.px]='happyImageMargin'> <strong>\r\n\t\t\t\t\t\t\t{{'realTimeOptimization' | translate}}</strong>\r\n\t\t\t\t\t</h3>\r\n\t\t\t\t\t<p>{{'realTimeOptimizationParagraph' | translate}}</p>\r\n\r\n\t\t\t\t</div>\r\n\r\n\t\t\t\t<div class='row' style=\"margin-left: 3em;\">\r\n\t\t\t\t\t<h3>\r\n\t\t\t\t\t\t<img src=\"assets/img/tim_80x80.png\" [style.width.px]='happyImageWidth'\r\n\t\t\t\t\t\t\t[style.margin-top.px]='happyImageMargin'> <strong>{{'happyEmployees'\r\n\t\t\t\t\t\t\t| translate}}</strong>\r\n\t\t\t\t\t</h3>\r\n\t\t\t\t\t<p>{{'happyEmployeesPragraph' | translate}}</p>\r\n\t\t\t\t</div>\r\n\t\t\t\t\r\n\t\t\t\t<div class='row' style=\"margin-bottom: 3em;\">\t\t\t\t\r\n\r\n\t\t\t\t</div>\r\n\r\n\t\t\t</div>\r\n\t\t\t<div class=\"col-md-1\"></div>\r\n\r\n\t\t\t<div class=\"col-md-5\">\r\n\r\n\r\n\t\t\t\t<img src=\"assets/img/caresytem-logo-large.png\" [style.width.px]='loginImageWidth'\r\n\t\t\t\t\t[style.margin-top.px]='loginImageMarginTop'>\r\n\r\n\r\n\t\t\t\t<form name=\"form\" (ngSubmit)=\"f.form.valid && login()\" #f=\"ngForm\"\r\n\t\t\t\t\tnovalidate>\r\n\t\t\t\t\t<div class=\"input-group\" [ngClass]=\"{ 'has-error': f.submitted && !username.valid }\">\r\n\t\t\t\t\t\t<!--<label for=\"username\">Username</label>-->\r\n\t\t\t\t\t\t<span class=\"input-group-addon\">\r\n\t\t\t\t\t\t\t\t\t\t\t<i class=\"material-icons\">face</i>\r\n\t\t\t\t\t\t\t\t\t\t</span>\r\n\t\t\t\t\t\t<div class=\"form-group is-empty\">\r\n\t\t\t\t\t\t\t<input type=\"text\" class=\"form-control\" name=\"username\" [(ngModel)]=\"model.username\" #username=\"ngModel\" required placeholder=\"User Name\"\r\n\t\t\t\t\t\t\t/> <span class=\"material-input\"></span> <span *ngIf=\"f.submitted && !username.valid\" class=\"help-block\">Username\r\n\t\t\t\t\t\t\tis required</span></div>\r\n\t\t\t\t\t</div>\r\n\t\t\t\t\t<div class=\"input-group\" [ngClass]=\"{ 'has-error': f.submitted && !password.valid }\">\r\n\t\t\t\t\t\t<!--<label for=\"password\">Password&nbsp;</label> -->\r\n\t\t\t\t\t\t<span class=\"input-group-addon\">\r\n\t\t\t\t\t\t\t\t\t\t\t<i class=\"material-icons\">lock_outline</i>\r\n\t\t\t\t\t\t\t\t\t\t</span>\r\n\t\t\t\t\t\t<div class=\"form-group is-empty\">\r\n\t\t\t\t\t\t\t<input type=\"password\" class=\"form-control\" name=\"password\" [(ngModel)]=\"model.password\" #password=\"ngModel\" required placeholder=\"Password\"\r\n\t\t\t\t\t\t\t/> <span class=\"material-input\"></span><span *ngIf=\"f.submitted && !password.valid\" class=\"help-block\">Password\r\n\t\t\t\t\t\t\tis required</span></div>\r\n\t\t\t\t\t</div>\r\n\t\t\t\t\t<div class=\"form-group\">\r\n\t\t\t\t\t\t<button [disabled]=\"loading\" class=\"btn btn-primary\">Login</button>\r\n\t\t\t\t\t\t<img *ngIf=\"loading\"\r\n\t\t\t\t\t\t\tsrc=\"data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==\"\r\n\t\t\t\t\t\t\tstyle=\"width: 20px\" />\r\n\t\t\t\t\t</div>\r\n\t\t\t\t\t<div *ngIf=\"error\" class=\"alert alert-error\">{{error}}</div>\r\n\t\t\t\t</form>\r\n\t\t\t</div>\r\n\r\n\t\t</div>\r\n\t\t<p align=\"center\">2017 CareSystems Inc. All Right Reserved</p>\r\n\t\t\r\n\t\t\r\n\t</div>\r\n\r\n</div>"

/***/ }),

/***/ 694:
/***/ (function(module, exports) {

module.exports = "<div class=\"main-content notification\">\n\n\t<div class=\"row\">\n\t\t<div class=\"col-md-12\">\n\n\t\t\t<div class=\"card\">\n\t\t\t\t<div class=\"card-content\">\n\t\t\t\t\t<div class=\"row\">\n\t\t\t\t\t\t<div class=\"col-sm-11\">\n\t\t\t\t\t\t\t<ul class=\"nav nav-pills nav-pills-rose\">\n\t\t\t\t\t\t\t\t<li class=\"active\"><a (click)=\"refreshTable('notificationTable')\" href=\"#notification\"\n\t\t\t\t\t\t\t\t\tdata-toggle=\"tab\" aria-expanded=\"true\">Notifications</a></li>\n\t\t\t\t\t\t\t\t<li class=\"\"><a (click)=\"refreshTable('incomingMessageTable')\" href=\"#messages\" data-toggle=\"tab\"\n\t\t\t\t\t\t\t\t\taria-expanded=\"false\">Messages</a></li>\n\t\t\t\t\t\t\t\t<li class=\"\"><a (click)=\"refreshTable('sentMessageTable')\" href=\"#sentItems\" data-toggle=\"tab\"\n\t\t\t\t\t\t\t\t\taria-expanded=\"false\">Sent Items</a></li>\n\t\t\t\t\t\t\t</ul>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class=\"col-sm-1\">\n\t\t\t\t\t\t\t<button md-mini-fab mdTooltip=\"Send Massage\" class=\"md-primary\"><i class=\"material-icons\">add</i></button>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\n\t\t\t\t\t<div class=\"tab-content tab-space notification-table\">\n\t\t\t\t\t\t<div class=\"tab-pane active\" id=\"notification\">\n\t\t\t\t\t\t\t<ag-grid-table-cmp #notificationTable [agPaginationAuto]=\"true\" [agHeader]=\"false\" [agPagination]=\"true\" ></ag-grid-table-cmp>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class=\"tab-pane\" id=\"messages\">\n\t\t\t\t\t\t\t<ag-grid-table-cmp #incomingMessageTable  [agPaginationAuto]=\"true\" [agHeader]=\"false\" [agPagination]=\"true\" ></ag-grid-table-cmp>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class=\"tab-pane\" id=\"sentItems\">\n\t\t\t\t\t\t\t<ag-grid-table-cmp #sentMessageTable  [agPaginationAuto]=\"true\" [agHeader]=\"false\" [agPagination]=\"true\" ></ag-grid-table-cmp>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t</div>\n\n\n\t\t</div>\n\t</div>\n\n</div>\n"

/***/ }),

/***/ 695:
/***/ (function(module, exports) {

module.exports = "<div class=\"main-content\">\n  <div class=\"\">\n    <div class=\"\">\n      <div class=\"col-md-12\" style=\"margin-bottom: 5vh\">\n        <div class=\"nav-center text-center\">\n          <ul class=\"nav nav-pills nav-pills-warning nav-pills-icons\" role=\"tablist\" style=\"display: inline-block\">\n            <!--\ncolor-classes: \"nav-pills-primary\", \"nav-pills-info\", \"nav-pills-success\", \"nav-pills-warning\",\"nav-pills-danger\"\n-->\n\n            <li class=\"active\" id=\"graphical\" (click)=\"tabChangeFunction($event)\">\n              <a role=\"tab\" data-toggle=\"tab\" aria-expanded=\"false\">\n                <i class=\"material-icons\">show_chart</i> GRAPHICAL\n              </a>\n\n\n            </li>\n            <li class=\"\" id=\"general\" (click)=\"tabChangeFunction($event)\">\n              <a role=\"tab\" data-toggle=\"tab\" aria-expanded=\"false\">\n                <i class=\"material-icons\">folder_open</i>GENERAL\n              </a>\n            </li>\n            <li class=\"\" id=\"schedule\" (click)=\"tabChangeFunction($event)\">\n              <a role=\"tab\" data-toggle=\"tab\" aria-expanded=\"false\">\n                <i class=\"material-icons\">alarm</i> SCHEDULED\n              </a>\n            </li>\n            <li class=\"\" id=\"eventLog\" (click)=\"tabChangeFunction($event)\">\n              <a role=\"tab\" data-toggle=\"tab\" aria-expanded=\"false\">\n                <i class=\"material-icons\">history</i> EVENT LOG\n              </a>\n            </li>\n          </ul>\n        </div>\n      </div>\n    </div>\n  </div>\n  <div id=\"graphicalDiv\" class=\"content-div \">\n    <div class=\"col-md-12\" style=\"margin-top: -5vh\">\n      <div class=\"col-md-4\">\n        <div class=\"card card-chart\">\n          <div class=\"card-header\" data-background-color=\"rose\" style=\"background-color: #ff4081\">\n            <div id=\"roundedLineChart\" class=\"ct-chart\">\n              <svg xmlns:ct=\"http://gionkunz.github.com/chartist-js/ct\" width=\"100%\" height=\"100%\" class=\"ct-chart-line\"\n                   style=\"width: 100%; height: 100%;\">\n                <g class=\"ct-grids\">\n                  <line y1=\"119.60000610351562\" y2=\"119.60000610351562\" x1=\"40\" x2=\"355.32501220703125\"\n                        class=\"ct-grid ct-vertical\"></line>\n                  <line y1=\"95.6800048828125\" y2=\"95.6800048828125\" x1=\"40\" x2=\"355.32501220703125\"\n                        class=\"ct-grid ct-vertical\"></line>\n                  <line y1=\"71.76000366210937\" y2=\"71.76000366210937\" x1=\"40\" x2=\"355.32501220703125\"\n                        class=\"ct-grid ct-vertical\"></line>\n                  <line y1=\"47.840002441406256\" y2=\"47.840002441406256\" x1=\"40\" x2=\"355.32501220703125\"\n                        class=\"ct-grid ct-vertical\"></line>\n                  <line y1=\"23.920001220703128\" y2=\"23.920001220703128\" x1=\"40\" x2=\"355.32501220703125\"\n                        class=\"ct-grid ct-vertical\"></line>\n                  <line y1=\"0\" y2=\"0\" x1=\"40\" x2=\"355.32501220703125\" class=\"ct-grid ct-vertical\"></line>\n                </g>\n                <g>\n                  <g class=\"ct-series ct-series-a\">\n                    <path\n                      d=\"M 40 90.896 C 47.508 88.903 70.031 76.943 85.046 78.936 C 100.062 80.929 115.077 102.856 130.093 102.856 C 145.108 102.856 160.124 85.315 175.139 78.936 C 190.155 72.557 205.17 64.983 220.186 64.584 C 235.201 64.185 250.217 82.524 265.232 76.544 C 280.248 70.564 302.771 36.677 310.279 28.704\"\n                      class=\"ct-line\"></path>\n                  </g>\n                </g>\n                <g class=\"ct-labels\">\n                  <foreignObject style=\"overflow: visible;\" x=\"40\" y=\"124.60000610351562\" width=\"45.04643031529018\"\n                                 height=\"20\">\n                    <text class=\"ct-label ct-horizontal ct-end\" xmlns=\"http://www.w3.org/2000/xmlns/\"\n                          style=\"width: 45px; height: 20px;\">M\n                    </text>\n                  </foreignObject>\n                  <foreignObject style=\"overflow: visible;\" x=\"85.04643031529018\" y=\"124.60000610351562\"\n                                 width=\"45.04643031529018\" height=\"20\">\n                    <text class=\"ct-label ct-horizontal ct-end\" xmlns=\"http://www.w3.org/2000/xmlns/\"\n                          style=\"width: 45px; height: 20px;\">T\n                    </text>\n                  </foreignObject>\n                  <foreignObject style=\"overflow: visible;\" x=\"130.09286063058036\" y=\"124.60000610351562\"\n                                 width=\"45.046430315290166\" height=\"20\">\n                    <text class=\"ct-label ct-horizontal ct-end\" xmlns=\"http://www.w3.org/2000/xmlns/\"\n                          style=\"width: 45px; height: 20px;\">W\n                    </text>\n                  </foreignObject>\n                  <foreignObject style=\"overflow: visible;\" x=\"175.13929094587053\" y=\"124.60000610351562\"\n                                 width=\"45.046430315290195\" height=\"20\">\n                    <text class=\"ct-label ct-horizontal ct-end\" xmlns=\"http://www.w3.org/2000/xmlns/\"\n                          style=\"width: 45px; height: 20px;\">T\n                    </text>\n                  </foreignObject>\n                  <foreignObject style=\"overflow: visible;\" x=\"220.18572126116072\" y=\"124.60000610351562\"\n                                 width=\"45.046430315290195\" height=\"20\">\n                    <text class=\"ct-label ct-horizontal ct-end\" xmlns=\"http://www.w3.org/2000/xmlns/\"\n                          style=\"width: 45px; height: 20px;\">F\n                    </text>\n                  </foreignObject>\n                  <foreignObject style=\"overflow: visible;\" x=\"265.2321515764509\" y=\"124.60000610351562\"\n                                 width=\"45.04643031529014\" height=\"20\">\n                    <text class=\"ct-label ct-horizontal ct-end\" xmlns=\"http://www.w3.org/2000/xmlns/\"\n                          style=\"width: 45px; height: 20px;\">S\n                    </text>\n                  </foreignObject>\n                  <foreignObject style=\"overflow: visible;\" x=\"310.27858189174106\" y=\"124.60000610351562\"\n                                 width=\"45.046430315290195\" height=\"20\">\n                    <text class=\"ct-label ct-horizontal ct-end\" xmlns=\"http://www.w3.org/2000/xmlns/\"\n                          style=\"width: 45px; height: 20px;\">S\n                    </text>\n                  </foreignObject>\n                  <foreignObject style=\"overflow: visible;\" y=\"95.6800048828125\" x=\"0\" height=\"23.920001220703124\"\n                                 width=\"30\">\n                    <text class=\"ct-label ct-vertical ct-start\" xmlns=\"http://www.w3.org/2000/xmlns/\"\n                          style=\"height: 24px; width: 30px;\">0\n                    </text>\n                  </foreignObject>\n                  <foreignObject style=\"overflow: visible;\" y=\"71.76000366210937\" x=\"0\" height=\"23.920001220703124\"\n                                 width=\"30\">\n                    <text class=\"ct-label ct-vertical ct-start\" xmlns=\"http://www.w3.org/2000/xmlns/\"\n                          style=\"height: 24px; width: 30px;\">10\n                    </text>\n                  </foreignObject>\n                  <foreignObject style=\"overflow: visible;\" y=\"47.84000244140625\" x=\"0\" height=\"23.92000122070312\"\n                                 width=\"30\">\n                    <text class=\"ct-label ct-vertical ct-start\" xmlns=\"http://www.w3.org/2000/xmlns/\"\n                          style=\"height: 24px; width: 30px;\">20\n                    </text>\n                  </foreignObject>\n                  <foreignObject style=\"overflow: visible;\" y=\"23.920001220703128\" x=\"0\" height=\"23.920001220703128\"\n                                 width=\"30\">\n                    <text class=\"ct-label ct-vertical ct-start\" xmlns=\"http://www.w3.org/2000/xmlns/\"\n                          style=\"height: 24px; width: 30px;\">30\n                    </text>\n                  </foreignObject>\n                  <foreignObject style=\"overflow: visible;\" y=\"0\" x=\"0\" height=\"23.920001220703128\" width=\"30\">\n                    <text class=\"ct-label ct-vertical ct-start\" xmlns=\"http://www.w3.org/2000/xmlns/\"\n                          style=\"height: 24px; width: 30px;\">40\n                    </text>\n                  </foreignObject>\n                  <foreignObject style=\"overflow: visible;\" y=\"-30\" x=\"0\" height=\"30\" width=\"30\">\n                    <text class=\"ct-label ct-vertical ct-start\" xmlns=\"http://www.w3.org/2000/xmlns/\"\n                          style=\"height: 30px; width: 30px;\">50\n                    </text>\n                  </foreignObject>\n                </g>\n              </svg>\n            </div>\n          </div>\n          <div class=\"card-content\">\n            <h4 class=\"title\">Offered Jobs Weekly Trend</h4>\n          </div>\n        </div>\n      </div>\n      <div class=\"col-md-4\">\n        <div class=\"card card-chart\">\n          <div class=\"card-header\" data-background-color=\"orange\">\n            <div id=\"straightLinesChart\" class=\"ct-chart\">\n              <svg xmlns:ct=\"http://gionkunz.github.com/chartist-js/ct\" width=\"100%\" height=\"100%\" class=\"ct-chart-line\"\n                   style=\"width: 100%; height: 100%;\">\n                <g class=\"ct-grids\">\n                  <line x1=\"40\" x2=\"40\" y1=\"0\" y2=\"119.60000610351562\" class=\"ct-grid ct-horizontal\"></line>\n                  <line x1=\"75.03611246744791\" x2=\"75.03611246744791\" y1=\"0\" y2=\"119.60000610351562\"\n                        class=\"ct-grid ct-horizontal\"></line>\n                  <line x1=\"110.07222493489583\" x2=\"110.07222493489583\" y1=\"0\" y2=\"119.60000610351562\"\n                        class=\"ct-grid ct-horizontal\"></line>\n                  <line x1=\"145.10833740234375\" x2=\"145.10833740234375\" y1=\"0\" y2=\"119.60000610351562\"\n                        class=\"ct-grid ct-horizontal\"></line>\n                  <line x1=\"180.14444986979166\" x2=\"180.14444986979166\" y1=\"0\" y2=\"119.60000610351562\"\n                        class=\"ct-grid ct-horizontal\"></line>\n                  <line x1=\"215.18056233723956\" x2=\"215.18056233723956\" y1=\"0\" y2=\"119.60000610351562\"\n                        class=\"ct-grid ct-horizontal\"></line>\n                  <line x1=\"250.2166748046875\" x2=\"250.2166748046875\" y1=\"0\" y2=\"119.60000610351562\"\n                        class=\"ct-grid ct-horizontal\"></line>\n                  <line x1=\"285.2527872721354\" x2=\"285.2527872721354\" y1=\"0\" y2=\"119.60000610351562\"\n                        class=\"ct-grid ct-horizontal\"></line>\n                  <line x1=\"320.2888997395833\" x2=\"320.2888997395833\" y1=\"0\" y2=\"119.60000610351562\"\n                        class=\"ct-grid ct-horizontal\"></line>\n                  <line y1=\"119.60000610351562\" y2=\"119.60000610351562\" x1=\"40\" x2=\"355.32501220703125\"\n                        class=\"ct-grid ct-vertical\"></line>\n                  <line y1=\"95.6800048828125\" y2=\"95.6800048828125\" x1=\"40\" x2=\"355.32501220703125\"\n                        class=\"ct-grid ct-vertical\"></line>\n                  <line y1=\"71.76000366210937\" y2=\"71.76000366210937\" x1=\"40\" x2=\"355.32501220703125\"\n                        class=\"ct-grid ct-vertical\"></line>\n                  <line y1=\"47.840002441406256\" y2=\"47.840002441406256\" x1=\"40\" x2=\"355.32501220703125\"\n                        class=\"ct-grid ct-vertical\"></line>\n                  <line y1=\"23.920001220703128\" y2=\"23.920001220703128\" x1=\"40\" x2=\"355.32501220703125\"\n                        class=\"ct-grid ct-vertical\"></line>\n                  <line y1=\"0\" y2=\"0\" x1=\"40\" x2=\"355.32501220703125\" class=\"ct-grid ct-vertical\"></line>\n                </g>\n                <g>\n                  <g class=\"ct-series ct-series-a\">\n                    <path\n                      d=\"M 40 95.68 C 75.036 81.328 75.036 81.328 75.036 81.328 C 110.072 100.464 110.072 100.464 110.072 100.464 C 145.108 88.504 145.108 88.504 145.108 88.504 C 180.144 71.76 180.144 71.76 180.144 71.76 C 215.181 83.72 215.181 83.72 215.181 83.72 C 250.217 71.76 250.217 71.76 250.217 71.76 C 285.253 38.272 285.253 38.272 285.253 38.272 C 320.289 47.84 320.289 47.84 320.289 47.84\"\n                      class=\"ct-line ct-white\"></path>\n                    <line x1=\"40\" y1=\"95.6800048828125\" x2=\"40.01\" y2=\"95.6800048828125\" class=\"ct-point ct-white\"\n                          ct:value=\"10\" opacity=\"1\"></line>\n                    <line x1=\"75.03611246744791\" y1=\"81.32800415039063\" x2=\"75.04611246744791\" y2=\"81.32800415039063\"\n                          class=\"ct-point ct-white\" ct:value=\"16\" opacity=\"1\"></line>\n                    <line x1=\"110.07222493489583\" y1=\"100.46400512695313\" x2=\"110.08222493489583\"\n                          y2=\"100.46400512695313\"\n                          class=\"ct-point ct-white\" ct:value=\"8\" opacity=\"1\"></line>\n                    <line x1=\"145.10833740234375\" y1=\"88.50400451660155\" x2=\"145.11833740234374\" y2=\"88.50400451660155\"\n                          class=\"ct-point ct-white\" ct:value=\"13\" opacity=\"1\"></line>\n                    <line x1=\"180.14444986979166\" y1=\"71.76000366210937\" x2=\"180.15444986979165\" y2=\"71.76000366210937\"\n                          class=\"ct-point ct-white\" ct:value=\"20\" opacity=\"1\"></line>\n                    <line x1=\"215.18056233723956\" y1=\"83.72000427246094\" x2=\"215.19056233723956\" y2=\"83.72000427246094\"\n                          class=\"ct-point ct-white\" ct:value=\"15\" opacity=\"1\"></line>\n                    <line x1=\"250.2166748046875\" y1=\"71.76000366210937\" x2=\"250.2266748046875\" y2=\"71.76000366210937\"\n                          class=\"ct-point ct-white\" ct:value=\"20\" opacity=\"1\"></line>\n                    <line x1=\"285.2527872721354\" y1=\"38.272001953125\" x2=\"285.26278727213537\" y2=\"38.272001953125\"\n                          class=\"ct-point ct-white\" ct:value=\"34\" opacity=\"1\"></line>\n                    <line x1=\"320.2888997395833\" y1=\"47.840002441406256\" x2=\"320.2988997395833\" y2=\"47.840002441406256\"\n                          class=\"ct-point ct-white\" ct:value=\"30\" opacity=\"1\"></line>\n                  </g>\n                </g>\n                <g class=\"ct-labels\">\n                  <foreignObject style=\"overflow: visible;\" x=\"40\" y=\"124.60000610351562\" width=\"35.036112467447914\"\n                                 height=\"20\">\n                    <text fill=\"white\" class=\"ct-label ct-horizontal ct-end\" xmlns=\"http://www.w3.org/2000/xmlns/\"\n                          style=\"width: 35px; height: 20px;\">'07\n                    </text>\n                  </foreignObject>\n                  <foreignObject style=\"overflow: visible;\" x=\"75.03611246744791\" y=\"124.60000610351562\"\n                                 width=\"35.036112467447914\" height=\"20\">\n                    <text class=\"ct-label ct-horizontal ct-end\" xmlns=\"http://www.w3.org/2000/xmlns/\"\n                          style=\"width: 35px; height: 20px;\">'08\n                    </text>\n                  </foreignObject>\n                  <foreignObject style=\"overflow: visible;\" x=\"110.07222493489583\" y=\"124.60000610351562\"\n                                 width=\"35.03611246744792\" height=\"20\">\n                    <text class=\"ct-label ct-horizontal ct-end\" xmlns=\"http://www.w3.org/2000/xmlns/\"\n                          style=\"width: 35px; height: 20px;\">'09\n                    </text>\n                  </foreignObject>\n                  <foreignObject style=\"overflow: visible;\" x=\"145.10833740234375\" y=\"124.60000610351562\"\n                                 width=\"35.03611246744791\" height=\"20\">\n                    <text class=\"ct-label ct-horizontal ct-end\" xmlns=\"http://www.w3.org/2000/xmlns/\"\n                          style=\"width: 35px; height: 20px;\">'10\n                    </text>\n                  </foreignObject>\n                  <foreignObject style=\"overflow: visible;\" x=\"180.14444986979166\" y=\"124.60000610351562\"\n                                 width=\"35.03611246744791\" height=\"20\">\n                    <text class=\"ct-label ct-horizontal ct-end\" xmlns=\"http://www.w3.org/2000/xmlns/\"\n                          style=\"width: 35px; height: 20px;\">'11\n                    </text>\n                  </foreignObject>\n                  <foreignObject style=\"overflow: visible;\" x=\"215.18056233723956\" y=\"124.60000610351562\"\n                                 width=\"35.036112467447936\" height=\"20\">\n                    <text class=\"ct-label ct-horizontal ct-end\" xmlns=\"http://www.w3.org/2000/xmlns/\"\n                          style=\"width: 35px; height: 20px;\">'12\n                    </text>\n                  </foreignObject>\n                  <foreignObject style=\"overflow: visible;\" x=\"250.2166748046875\" y=\"124.60000610351562\"\n                                 width=\"35.03611246744791\" height=\"20\">\n                    <text class=\"ct-label ct-horizontal ct-end\" xmlns=\"http://www.w3.org/2000/xmlns/\"\n                          style=\"width: 35px; height: 20px;\">'13\n                    </text>\n                  </foreignObject>\n                  <foreignObject style=\"overflow: visible;\" x=\"285.2527872721354\" y=\"124.60000610351562\"\n                                 width=\"35.03611246744791\" height=\"20\">\n                    <text class=\"ct-label ct-horizontal ct-end\" xmlns=\"http://www.w3.org/2000/xmlns/\"\n                          style=\"width: 35px; height: 20px;\">'14\n                    </text>\n                  </foreignObject>\n                  <foreignObject style=\"overflow: visible;\" x=\"320.2888997395833\" y=\"124.60000610351562\"\n                                 width=\"35.036112467447936\" height=\"20\">\n                    <text class=\"ct-label ct-horizontal ct-end\" xmlns=\"http://www.w3.org/2000/xmlns/\"\n                          style=\"width: 35px; height: 20px;\">'15\n                    </text>\n                  </foreignObject>\n                  <foreignObject style=\"overflow: visible;\" y=\"95.6800048828125\" x=\"0\" height=\"23.920001220703124\"\n                                 width=\"30\">\n                    <text class=\"ct-label ct-vertical ct-start\" xmlns=\"http://www.w3.org/2000/xmlns/\"\n                          style=\"height: 24px; width: 30px;\">0\n                    </text>\n                  </foreignObject>\n                  <foreignObject style=\"overflow: visible;\" y=\"71.76000366210937\" x=\"0\" height=\"23.920001220703124\"\n                                 width=\"30\">\n                    <text class=\"ct-label ct-vertical ct-start\" xmlns=\"http://www.w3.org/2000/xmlns/\"\n                          style=\"height: 24px; width: 30px;\">10\n                    </text>\n                  </foreignObject>\n                  <foreignObject style=\"overflow: visible;\" y=\"47.84000244140625\" x=\"0\" height=\"23.92000122070312\"\n                                 width=\"30\">\n                    <text class=\"ct-label ct-vertical ct-start\" xmlns=\"http://www.w3.org/2000/xmlns/\"\n                          style=\"height: 24px; width: 30px;\">20\n                    </text>\n                  </foreignObject>\n                  <foreignObject style=\"overflow: visible;\" y=\"23.920001220703128\" x=\"0\" height=\"23.920001220703128\"\n                                 width=\"30\">\n                    <text class=\"ct-label ct-vertical ct-start\" xmlns=\"http://www.w3.org/2000/xmlns/\"\n                          style=\"height: 24px; width: 30px;\">30\n                    </text>\n                  </foreignObject>\n                  <foreignObject style=\"overflow: visible;\" y=\"0\" x=\"0\" height=\"23.920001220703128\" width=\"30\">\n                    <text class=\"ct-label ct-vertical ct-start\" xmlns=\"http://www.w3.org/2000/xmlns/\"\n                          style=\"height: 24px; width: 30px;\">40\n                    </text>\n                  </foreignObject>\n                  <foreignObject style=\"overflow: visible;\" y=\"-30\" x=\"0\" height=\"30\" width=\"30\">\n                    <text class=\"ct-label ct-vertical ct-start\" xmlns=\"http://www.w3.org/2000/xmlns/\"\n                          style=\"height: 30px; width: 30px;\">50\n                    </text>\n                  </foreignObject>\n                </g>\n              </svg>\n            </div>\n          </div>\n          <div class=\"card-content\">\n            <h4 class=\"title\">Offered Jobs Monthly Trend</h4>\n          </div>\n        </div>\n      </div>\n      <div class=\"col-md-4\">\n        <div class=\"card card-chart\">\n          <div class=\"card-header\" data-background-color=\"blue\">\n            <div id=\"simpleBarChart\" class=\"ct-chart\">\n              <svg xmlns:ct=\"http://gionkunz.github.com/chartist-js/ct\" width=\"100%\" height=\"100%\" class=\"ct-chart-bar\"\n                   style=\"width: 100%; height: 100%;\">\n                <g class=\"ct-grids\">\n                  <line y1=\"114.60000610351562\" y2=\"114.60000610351562\" x1=\"50\" x2=\"340.32501220703125\"\n                        class=\"ct-grid ct-vertical\"></line>\n                  <line y1=\"92.46667141384549\" y2=\"92.46667141384549\" x1=\"50\" x2=\"340.32501220703125\"\n                        class=\"ct-grid ct-vertical\"></line>\n                  <line y1=\"70.33333672417535\" y2=\"70.33333672417535\" x1=\"50\" x2=\"340.32501220703125\"\n                        class=\"ct-grid ct-vertical\"></line>\n                  <line y1=\"48.200002034505204\" y2=\"48.200002034505204\" x1=\"50\" x2=\"340.32501220703125\"\n                        class=\"ct-grid ct-vertical\"></line>\n                  <line y1=\"26.066667344835068\" y2=\"26.066667344835068\" x1=\"50\" x2=\"340.32501220703125\"\n                        class=\"ct-grid ct-vertical\"></line>\n                </g>\n                <g>\n                  <g class=\"ct-series ct-series-a\">\n                    <line x1=\"62.096875508626304\" x2=\"62.096875508626304\" y1=\"114.60000610351562\" y2=\"54.61866909450955\"\n                          class=\"ct-bar\" ct:value=\"542\" opacity=\"1\"></line>\n                    <line x1=\"86.2906265258789\" x2=\"86.2906265258789\" y1=\"114.60000610351562\" y2=\"65.57466976589626\"\n                          class=\"ct-bar\" ct:value=\"443\" opacity=\"1\"></line>\n                    <line x1=\"110.48437754313152\" x2=\"110.48437754313152\" y1=\"114.60000610351562\" y2=\"79.1866706000434\"\n                          class=\"ct-bar\" ct:value=\"320\" opacity=\"1\"></line>\n                    <line x1=\"134.67812856038412\" x2=\"134.67812856038412\" y1=\"114.60000610351562\" y2=\"28.28000081380209\"\n                          class=\"ct-bar\" ct:value=\"780\" opacity=\"1\"></line>\n                    <line x1=\"158.87187957763675\" x2=\"158.87187957763675\" y1=\"114.60000610351562\" y2=\"53.40133568657769\"\n                          class=\"ct-bar\" ct:value=\"553\" opacity=\"1\"></line>\n                    <line x1=\"183.06563059488934\" x2=\"183.06563059488934\" y1=\"114.60000610351562\" y2=\"64.46800303141276\"\n                          class=\"ct-bar\" ct:value=\"453\" opacity=\"1\"></line>\n                    <line x1=\"207.25938161214194\" x2=\"207.25938161214194\" y1=\"114.60000610351562\" y2=\"78.5226705593533\"\n                          class=\"ct-bar\" ct:value=\"326\" opacity=\"1\"></line>\n                    <line x1=\"231.45313262939456\" x2=\"231.45313262939456\" y1=\"114.60000610351562\" y2=\"66.57066982693142\"\n                          class=\"ct-bar\" ct:value=\"434\" opacity=\"1\"></line>\n                    <line x1=\"255.64688364664715\" x2=\"255.64688364664715\" y1=\"114.60000610351562\" y2=\"51.74133558485243\"\n                          class=\"ct-bar\" ct:value=\"568\" opacity=\"1\"></line>\n                    <line x1=\"279.8406346638997\" x2=\"279.8406346638997\" y1=\"114.60000610351562\" y2=\"47.09333530002171\"\n                          class=\"ct-bar\" ct:value=\"610\" opacity=\"1\"></line>\n                    <line x1=\"304.03438568115234\" x2=\"304.03438568115234\" y1=\"114.60000610351562\"\n                          y2=\"30.936000976562497\"\n                          class=\"ct-bar\" ct:value=\"756\" opacity=\"1\"></line>\n                    <line x1=\"328.22813669840497\" x2=\"328.22813669840497\" y1=\"114.60000610351562\"\n                          y2=\"15.553333367241748\"\n                          class=\"ct-bar\" ct:value=\"895\" opacity=\"1\"></line>\n                  </g>\n                </g>\n                <g class=\"ct-labels\">\n                  <foreignObject style=\"overflow: visible;\" x=\"50\" y=\"119.60000610351562\" width=\"24.193751017252605\"\n                                 height=\"20\">\n                    <text class=\"ct-label ct-horizontal ct-end\" xmlns=\"http://www.w3.org/2000/xmlns/\"\n                          style=\"width: 24px; height: 20px;\">Jan\n                    </text>\n                  </foreignObject>\n                  <foreignObject style=\"overflow: visible;\" x=\"74.19375101725261\" y=\"119.60000610351562\"\n                                 width=\"24.193751017252605\" height=\"20\">\n                    <text class=\"ct-label ct-horizontal ct-end\" xmlns=\"http://www.w3.org/2000/xmlns/\"\n                          style=\"width: 24px; height: 20px;\">Feb\n                    </text>\n                  </foreignObject>\n                  <foreignObject style=\"overflow: visible;\" x=\"98.38750203450522\" y=\"119.60000610351562\"\n                                 width=\"24.193751017252602\" height=\"20\">\n                    <text class=\"ct-label ct-horizontal ct-end\" xmlns=\"http://www.w3.org/2000/xmlns/\"\n                          style=\"width: 24px; height: 20px;\">Mar\n                    </text>\n                  </foreignObject>\n                  <foreignObject style=\"overflow: visible;\" x=\"122.58125305175781\" y=\"119.60000610351562\"\n                                 width=\"24.19375101725261\" height=\"20\">\n                    <text class=\"ct-label ct-horizontal ct-end\" xmlns=\"http://www.w3.org/2000/xmlns/\"\n                          style=\"width: 24px; height: 20px;\">Apr\n                    </text>\n                  </foreignObject>\n                  <foreignObject style=\"overflow: visible;\" x=\"146.77500406901044\" y=\"119.60000610351562\"\n                                 width=\"24.19375101725261\" height=\"20\">\n                    <text class=\"ct-label ct-horizontal ct-end\" xmlns=\"http://www.w3.org/2000/xmlns/\"\n                          style=\"width: 24px; height: 20px;\">Mai\n                    </text>\n                  </foreignObject>\n                  <foreignObject style=\"overflow: visible;\" x=\"170.96875508626303\" y=\"119.60000610351562\"\n                                 width=\"24.193751017252595\" height=\"20\">\n                    <text class=\"ct-label ct-horizontal ct-end\" xmlns=\"http://www.w3.org/2000/xmlns/\"\n                          style=\"width: 24px; height: 20px;\">Jun\n                    </text>\n                  </foreignObject>\n                  <foreignObject style=\"overflow: visible;\" x=\"195.16250610351562\" y=\"119.60000610351562\"\n                                 width=\"24.193751017252623\" height=\"20\">\n                    <text class=\"ct-label ct-horizontal ct-end\" xmlns=\"http://www.w3.org/2000/xmlns/\"\n                          style=\"width: 24px; height: 20px;\">Jul\n                    </text>\n                  </foreignObject>\n                  <foreignObject style=\"overflow: visible;\" x=\"219.35625712076825\" y=\"119.60000610351562\"\n                                 width=\"24.193751017252595\" height=\"20\">\n                    <text class=\"ct-label ct-horizontal ct-end\" xmlns=\"http://www.w3.org/2000/xmlns/\"\n                          style=\"width: 24px; height: 20px;\">Aug\n                    </text>\n                  </foreignObject>\n                  <foreignObject style=\"overflow: visible;\" x=\"243.55000813802084\" y=\"119.60000610351562\"\n                                 width=\"24.193751017252595\" height=\"20\">\n                    <text class=\"ct-label ct-horizontal ct-end\" xmlns=\"http://www.w3.org/2000/xmlns/\"\n                          style=\"width: 24px; height: 20px;\">Sep\n                    </text>\n                  </foreignObject>\n                  <foreignObject style=\"overflow: visible;\" x=\"267.74375915527344\" y=\"119.60000610351562\"\n                                 width=\"24.193751017252623\" height=\"20\">\n                    <text class=\"ct-label ct-horizontal ct-end\" xmlns=\"http://www.w3.org/2000/xmlns/\"\n                          style=\"width: 24px; height: 20px;\">Oct\n                    </text>\n                  </foreignObject>\n                  <foreignObject style=\"overflow: visible;\" x=\"291.93751017252606\" y=\"119.60000610351562\"\n                                 width=\"24.193751017252623\" height=\"20\">\n                    <text class=\"ct-label ct-horizontal ct-end\" xmlns=\"http://www.w3.org/2000/xmlns/\"\n                          style=\"width: 24px; height: 20px;\">Nov\n                    </text>\n                  </foreignObject>\n                  <foreignObject style=\"overflow: visible;\" x=\"316.1312611897787\" y=\"119.60000610351562\" width=\"30\"\n                                 height=\"20\">\n                    <text class=\"ct-label ct-horizontal ct-end\" xmlns=\"http://www.w3.org/2000/xmlns/\"\n                          style=\"width: 30px; height: 20px;\">Dec\n                    </text>\n                  </foreignObject>\n                  <foreignObject style=\"overflow: visible;\" y=\"92.46667141384549\" x=\"10\" height=\"22.13333468967014\"\n                                 width=\"30\">\n                    <text class=\"ct-label ct-vertical ct-start\" xmlns=\"http://www.w3.org/2000/xmlns/\"\n                          style=\"height: 22px; width: 30px;\">0\n                    </text>\n                  </foreignObject>\n                  <foreignObject style=\"overflow: visible;\" y=\"70.33333672417535\" x=\"10\" height=\"22.13333468967014\"\n                                 width=\"30\">\n                    <text class=\"ct-label ct-vertical ct-start\" xmlns=\"http://www.w3.org/2000/xmlns/\"\n                          style=\"height: 22px; width: 30px;\">200\n                    </text>\n                  </foreignObject>\n                  <foreignObject style=\"overflow: visible;\" y=\"48.20000203450521\" x=\"10\" height=\"22.133334689670143\"\n                                 width=\"30\">\n                    <text class=\"ct-label ct-vertical ct-start\" xmlns=\"http://www.w3.org/2000/xmlns/\"\n                          style=\"height: 22px; width: 30px;\">400\n                    </text>\n                  </foreignObject>\n                  <foreignObject style=\"overflow: visible;\" y=\"26.066667344835068\" x=\"10\" height=\"22.133334689670136\"\n                                 width=\"30\">\n                    <text class=\"ct-label ct-vertical ct-start\" xmlns=\"http://www.w3.org/2000/xmlns/\"\n                          style=\"height: 22px; width: 30px;\">600\n                    </text>\n                  </foreignObject>\n                  <foreignObject style=\"overflow: visible;\" y=\"-3.933332655164932\" x=\"10\" height=\"30\" width=\"30\">\n                    <text class=\"ct-label ct-vertical ct-start\" xmlns=\"http://www.w3.org/2000/xmlns/\"\n                          style=\"height: 30px; width: 30px;\">800\n                    </text>\n                  </foreignObject>\n                </g>\n              </svg>\n            </div>\n          </div>\n          <div class=\"card-content\">\n            <h4 class=\"title\">Offered Jobs Daily Trend</h4>\n          </div>\n        </div>\n      </div>\n    </div>\n    <div class=\"col-md-12\">\n      <div class=\"col-md-5\">\n        <div class=\"card\">\n          <div class=\"card-header card-header-icon\" data-background-color=\"red\">\n            <i class=\"material-icons\">pie_chart</i>\n          </div>\n          <div class=\"card-content\">\n            <h4 class=\"title\">Job Types- June/2017</h4>\n          </div>\n          <div id=\"chartPreferences\" class=\"ct-chart\">\n            <svg xmlns:ct=\"http://gionkunz.github.com/chartist-js/ct\" width=\"100%\" height=\"230px\" class=\"ct-chart-pie\"\n                 style=\"width: 100%; height: 230px;\">\n              <g class=\"ct-series ct-series-a\">\n                <path d=\"M169.281,195.187A110,110,0,1,0,244.581,5L244.581,115Z\" class=\"ct-slice-pie\"\n                      ct:value=\"62\"></path>\n              </g>\n              <g class=\"ct-series ct-series-b\">\n                <path d=\"M204.088,12.725A110,110,0,0,0,169.561,195.449L244.581,115Z\" class=\"ct-slice-pie\"\n                      ct:value=\"32\"></path>\n              </g>\n              <g class=\"ct-series ct-series-c\">\n                <path d=\"M244.581,5A110,110,0,0,0,203.731,12.867L244.581,115Z\" class=\"ct-slice-pie\" ct:value=\"6\"></path>\n              </g>\n              <g>\n                <text dx=\"295.71895977561167\" dy=\"135.24685039765728\" text-anchor=\"middle\" class=\"ct-label\">62%</text>\n                <text dx=\"190.55545426167993\" dy=\"104.6940276977852\" text-anchor=\"middle\" class=\"ct-label\">32%</text>\n                <text dx=\"234.2752807495429\" dy=\"60.974201209922136\" text-anchor=\"middle\" class=\"ct-label\">6%</text>\n              </g>\n            </svg>\n          </div>\n          <div class=\"card-footer\">\n            <h6>Legend</h6>\n            <i class=\"fa fa-circle text-info\"></i> Arabic\n            <i class=\"fa fa-circle text-warning\"></i> Japanese\n            <i class=\"fa fa-circle text-danger\"></i> Chinesse\n          </div>\n        </div>\n      </div>\n      <div class=\"col-md-7\">\n        <div class=\"card\">\n          <div class=\"card-header card-header-icon\" data-background-color=\"blue\">\n            <i class=\"material-icons\">timeline</i>\n          </div>\n          <div class=\"card-content\">\n            <h4 class=\"title\">Job Types Trending - Last 10 Months</h4>\n          </div>\n          <div id=\"colouredBarsChart\" class=\"ct-chart\">\n            <svg xmlns:ct=\"http://gionkunz.github.com/chartist-js/ct\" width=\"100%\" height=\"300px\" class=\"ct-chart-line\"\n                 style=\"width: 100%; height: 300px;\">\n              <g class=\"ct-grids\">\n                <line y1=\"265\" y2=\"265\" x1=\"50\" x2=\"681.8250122070312\" class=\"ct-grid ct-vertical\"></line>\n                <line y1=\"240\" y2=\"240\" x1=\"50\" x2=\"681.8250122070312\" class=\"ct-grid ct-vertical\"></line>\n                <line y1=\"215\" y2=\"215\" x1=\"50\" x2=\"681.8250122070312\" class=\"ct-grid ct-vertical\"></line>\n                <line y1=\"190\" y2=\"190\" x1=\"50\" x2=\"681.8250122070312\" class=\"ct-grid ct-vertical\"></line>\n                <line y1=\"165\" y2=\"165\" x1=\"50\" x2=\"681.8250122070312\" class=\"ct-grid ct-vertical\"></line>\n                <line y1=\"140\" y2=\"140\" x1=\"50\" x2=\"681.8250122070312\" class=\"ct-grid ct-vertical\"></line>\n                <line y1=\"115\" y2=\"115\" x1=\"50\" x2=\"681.8250122070312\" class=\"ct-grid ct-vertical\"></line>\n                <line y1=\"90\" y2=\"90\" x1=\"50\" x2=\"681.8250122070312\" class=\"ct-grid ct-vertical\"></line>\n                <line y1=\"65\" y2=\"65\" x1=\"50\" x2=\"681.8250122070312\" class=\"ct-grid ct-vertical\"></line>\n                <line y1=\"40\" y2=\"40\" x1=\"50\" x2=\"681.8250122070312\" class=\"ct-grid ct-vertical\"></line>\n                <line y1=\"15\" y2=\"15\" x1=\"50\" x2=\"681.8250122070312\" class=\"ct-grid ct-vertical\"></line>\n              </g>\n              <g>\n                <g class=\"ct-series ct-series-a\">\n                  <path\n                    d=\"M 50 193.25 C 59.573 189.167 88.292 177.208 107.439 168.75 C 126.585 160.292 145.731 149.542 164.877 142.5 C 184.023 135.458 203.17 130.5 222.316 126.5 C 241.462 122.5 260.608 124.5 279.755 118.5 C 298.901 112.5 318.047 95.042 337.193 90.5 C 356.339 85.958 375.486 93.5 394.632 91.25 C 413.778 89 432.924 80.875 452.07 77 C 471.217 73.125 490.363 71.917 509.509 68 C 528.655 64.083 547.802 60 566.948 53.5 C 586.094 47 614.813 33.083 624.386 29\"\n                    class=\"ct-line\"></path>\n                  <line x1=\"50\" y1=\"193.25\" x2=\"50.01\" y2=\"193.25\" class=\"ct-point\" ct:value=\"287\" opacity=\"1\"></line>\n                  <line x1=\"107.43863747336647\" y1=\"168.75\" x2=\"107.44863747336647\" y2=\"168.75\" class=\"ct-point\"\n                        ct:value=\"385\" opacity=\"1\"></line>\n                  <line x1=\"164.87727494673294\" y1=\"142.5\" x2=\"164.88727494673293\" y2=\"142.5\" class=\"ct-point\"\n                        ct:value=\"490\" opacity=\"1\"></line>\n                  <line x1=\"222.31591242009944\" y1=\"126.5\" x2=\"222.32591242009943\" y2=\"126.5\" class=\"ct-point\"\n                        ct:value=\"554\" opacity=\"1\"></line>\n                  <line x1=\"279.7545498934659\" y1=\"118.5\" x2=\"279.76454989346587\" y2=\"118.5\" class=\"ct-point\"\n                        ct:value=\"586\" opacity=\"1\"></line>\n                  <line x1=\"337.1931873668324\" y1=\"90.5\" x2=\"337.20318736683237\" y2=\"90.5\" class=\"ct-point\"\n                        ct:value=\"698\" opacity=\"1\"></line>\n                  <line x1=\"394.6318248401989\" y1=\"91.25\" x2=\"394.64182484019886\" y2=\"91.25\" class=\"ct-point\"\n                        ct:value=\"695\" opacity=\"1\"></line>\n                  <line x1=\"452.0704623135653\" y1=\"77\" x2=\"452.0804623135653\" y2=\"77\" class=\"ct-point\" ct:value=\"752\"\n                        opacity=\"1\"></line>\n                  <line x1=\"509.5090997869318\" y1=\"68\" x2=\"509.5190997869318\" y2=\"68\" class=\"ct-point\" ct:value=\"788\"\n                        opacity=\"1\"></line>\n                  <line x1=\"566.9477372602983\" y1=\"53.5\" x2=\"566.9577372602982\" y2=\"53.5\" class=\"ct-point\"\n                        ct:value=\"846\" opacity=\"1\"></line>\n                  <line x1=\"624.3863747336648\" y1=\"29\" x2=\"624.3963747336647\" y2=\"29\" class=\"ct-point\" ct:value=\"944\"\n                        opacity=\"1\"></line>\n                </g>\n                <g class=\"ct-series ct-series-b\">\n                  <path\n                    d=\"M 50 248.25 C 59.573 244.708 88.292 230.167 107.439 227 C 126.585 223.833 145.731 234.875 164.877 229.25 C 184.023 223.625 203.17 201.25 222.316 193.25 C 241.462 185.25 260.608 187.417 279.755 181.25 C 298.901 175.083 318.047 160.5 337.193 156.25 C 356.339 152 375.486 160.083 394.632 155.75 C 413.778 151.417 432.924 134.625 452.07 130.25 C 471.217 125.875 490.363 129.708 509.509 129.5 C 528.655 129.292 547.802 133.375 566.948 129 C 586.094 124.625 614.813 107.542 624.386 103.25\"\n                    class=\"ct-line\"></path>\n                  <line x1=\"50\" y1=\"248.25\" x2=\"50.01\" y2=\"248.25\" class=\"ct-point\" ct:value=\"67\" opacity=\"1\"></line>\n                  <line x1=\"107.43863747336647\" y1=\"227\" x2=\"107.44863747336647\" y2=\"227\" class=\"ct-point\"\n                        ct:value=\"152\" opacity=\"1\"></line>\n                  <line x1=\"164.87727494673294\" y1=\"229.25\" x2=\"164.88727494673293\" y2=\"229.25\" class=\"ct-point\"\n                        ct:value=\"143\" opacity=\"1\"></line>\n                  <line x1=\"222.31591242009944\" y1=\"193.25\" x2=\"222.32591242009943\" y2=\"193.25\" class=\"ct-point\"\n                        ct:value=\"287\" opacity=\"1\"></line>\n                  <line x1=\"279.7545498934659\" y1=\"181.25\" x2=\"279.76454989346587\" y2=\"181.25\" class=\"ct-point\"\n                        ct:value=\"335\" opacity=\"1\"></line>\n                  <line x1=\"337.1931873668324\" y1=\"156.25\" x2=\"337.20318736683237\" y2=\"156.25\" class=\"ct-point\"\n                        ct:value=\"435\" opacity=\"1\"></line>\n                  <line x1=\"394.6318248401989\" y1=\"155.75\" x2=\"394.64182484019886\" y2=\"155.75\" class=\"ct-point\"\n                        ct:value=\"437\" opacity=\"1\"></line>\n                  <line x1=\"452.0704623135653\" y1=\"130.25\" x2=\"452.0804623135653\" y2=\"130.25\" class=\"ct-point\"\n                        ct:value=\"539\" opacity=\"1\"></line>\n                  <line x1=\"509.5090997869318\" y1=\"129.5\" x2=\"509.5190997869318\" y2=\"129.5\" class=\"ct-point\"\n                        ct:value=\"542\" opacity=\"1\"></line>\n                  <line x1=\"566.9477372602983\" y1=\"129\" x2=\"566.9577372602982\" y2=\"129\" class=\"ct-point\" ct:value=\"544\"\n                        opacity=\"1\"></line>\n                  <line x1=\"624.3863747336648\" y1=\"103.25\" x2=\"624.3963747336647\" y2=\"103.25\" class=\"ct-point\"\n                        ct:value=\"647\" opacity=\"1\"></line>\n                </g>\n                <g class=\"ct-series ct-series-c\">\n                  <path\n                    d=\"M 50 259.25 C 59.573 255.5 88.292 238.583 107.439 236.75 C 126.585 234.917 145.731 251.458 164.877 248.25 C 184.023 245.042 203.17 224.667 222.316 217.5 C 241.462 210.333 260.608 210.125 279.755 205.25 C 298.901 200.375 318.047 191.125 337.193 188.25 C 356.339 185.375 375.486 193.5 394.632 188 C 413.778 182.5 432.924 159.5 452.07 155.25 C 471.217 151 490.363 161.292 509.509 162.5 C 528.655 163.708 547.802 166.625 566.948 162.5 C 586.094 158.375 614.813 141.875 624.386 137.75\"\n                    class=\"ct-line\"></path>\n                  <line x1=\"50\" y1=\"259.25\" x2=\"50.01\" y2=\"259.25\" class=\"ct-point\" ct:value=\"23\" opacity=\"1\"></line>\n                  <line x1=\"107.43863747336647\" y1=\"236.75\" x2=\"107.44863747336647\" y2=\"236.75\" class=\"ct-point\"\n                        ct:value=\"113\" opacity=\"1\"></line>\n                  <line x1=\"164.87727494673294\" y1=\"248.25\" x2=\"164.88727494673293\" y2=\"248.25\" class=\"ct-point\"\n                        ct:value=\"67\" opacity=\"1\"></line>\n                  <line x1=\"222.31591242009944\" y1=\"217.5\" x2=\"222.32591242009943\" y2=\"217.5\" class=\"ct-point\"\n                        ct:value=\"190\" opacity=\"1\"></line>\n                  <line x1=\"279.7545498934659\" y1=\"205.25\" x2=\"279.76454989346587\" y2=\"205.25\" class=\"ct-point\"\n                        ct:value=\"239\" opacity=\"1\"></line>\n                  <line x1=\"337.1931873668324\" y1=\"188.25\" x2=\"337.20318736683237\" y2=\"188.25\" class=\"ct-point\"\n                        ct:value=\"307\" opacity=\"1\"></line>\n                  <line x1=\"394.6318248401989\" y1=\"188\" x2=\"394.64182484019886\" y2=\"188\" class=\"ct-point\" ct:value=\"308\"\n                        opacity=\"1\"></line>\n                  <line x1=\"452.0704623135653\" y1=\"155.25\" x2=\"452.0804623135653\" y2=\"155.25\" class=\"ct-point\"\n                        ct:value=\"439\" opacity=\"1\"></line>\n                  <line x1=\"509.5090997869318\" y1=\"162.5\" x2=\"509.5190997869318\" y2=\"162.5\" class=\"ct-point\"\n                        ct:value=\"410\" opacity=\"1\"></line>\n                  <line x1=\"566.9477372602983\" y1=\"162.5\" x2=\"566.9577372602982\" y2=\"162.5\" class=\"ct-point\"\n                        ct:value=\"410\" opacity=\"1\"></line>\n                  <line x1=\"624.3863747336648\" y1=\"137.75\" x2=\"624.3963747336647\" y2=\"137.75\" class=\"ct-point\"\n                        ct:value=\"509\" opacity=\"1\"></line>\n                </g>\n              </g>\n              <g class=\"ct-labels\">\n                <foreignObject style=\"overflow: visible;\" x=\"50\" y=\"270\" width=\"57.43863747336648\" height=\"20\">\n                  <text class=\"ct-label ct-horizontal ct-end\" xmlns=\"http://www.w3.org/2000/xmlns/\"\n                        style=\"width: 57px; height: 20px;\">'06\n                  </text>\n                </foreignObject>\n                <foreignObject style=\"overflow: visible;\" x=\"107.43863747336647\" y=\"270\" width=\"57.43863747336648\"\n                               height=\"20\">\n                  <text class=\"ct-label ct-horizontal ct-end\" xmlns=\"http://www.w3.org/2000/xmlns/\"\n                        style=\"width: 57px; height: 20px;\">'07\n                  </text>\n                </foreignObject>\n                <foreignObject style=\"overflow: visible;\" x=\"164.87727494673294\" y=\"270\" width=\"57.438637473366484\"\n                               height=\"20\">\n                  <text class=\"ct-label ct-horizontal ct-end\" xmlns=\"http://www.w3.org/2000/xmlns/\"\n                        style=\"width: 57px; height: 20px;\">'08\n                  </text>\n                </foreignObject>\n                <foreignObject style=\"overflow: visible;\" x=\"222.31591242009944\" y=\"270\" width=\"57.43863747336647\"\n                               height=\"20\">\n                  <text class=\"ct-label ct-horizontal ct-end\" xmlns=\"http://www.w3.org/2000/xmlns/\"\n                        style=\"width: 57px; height: 20px;\">'09\n                  </text>\n                </foreignObject>\n                <foreignObject style=\"overflow: visible;\" x=\"279.7545498934659\" y=\"270\" width=\"57.43863747336647\"\n                               height=\"20\">\n                  <text class=\"ct-label ct-horizontal ct-end\" xmlns=\"http://www.w3.org/2000/xmlns/\"\n                        style=\"width: 57px; height: 20px;\">'10\n                  </text>\n                </foreignObject>\n                <foreignObject style=\"overflow: visible;\" x=\"337.1931873668324\" y=\"270\" width=\"57.4386374733665\"\n                               height=\"20\">\n                  <text class=\"ct-label ct-horizontal ct-end\" xmlns=\"http://www.w3.org/2000/xmlns/\"\n                        style=\"width: 57px; height: 20px;\">'11\n                  </text>\n                </foreignObject>\n                <foreignObject style=\"overflow: visible;\" x=\"394.6318248401989\" y=\"270\" width=\"57.43863747336644\"\n                               height=\"20\">\n                  <text class=\"ct-label ct-horizontal ct-end\" xmlns=\"http://www.w3.org/2000/xmlns/\"\n                        style=\"width: 57px; height: 20px;\">'12\n                  </text>\n                </foreignObject>\n                <foreignObject style=\"overflow: visible;\" x=\"452.0704623135653\" y=\"270\" width=\"57.4386374733665\"\n                               height=\"20\">\n                  <text class=\"ct-label ct-horizontal ct-end\" xmlns=\"http://www.w3.org/2000/xmlns/\"\n                        style=\"width: 57px; height: 20px;\">'13\n                  </text>\n                </foreignObject>\n                <foreignObject style=\"overflow: visible;\" x=\"509.5090997869318\" y=\"270\" width=\"57.43863747336644\"\n                               height=\"20\">\n                  <text class=\"ct-label ct-horizontal ct-end\" xmlns=\"http://www.w3.org/2000/xmlns/\"\n                        style=\"width: 57px; height: 20px;\">'14\n                  </text>\n                </foreignObject>\n                <foreignObject style=\"overflow: visible;\" x=\"566.9477372602983\" y=\"270\" width=\"57.4386374733665\"\n                               height=\"20\">\n                  <text class=\"ct-label ct-horizontal ct-end\" xmlns=\"http://www.w3.org/2000/xmlns/\"\n                        style=\"width: 57px; height: 20px;\">'15\n                  </text>\n                </foreignObject>\n                <foreignObject style=\"overflow: visible;\" x=\"624.3863747336648\" y=\"270\" width=\"57.4386374733665\"\n                               height=\"20\">\n                  <text class=\"ct-label ct-horizontal ct-end\" xmlns=\"http://www.w3.org/2000/xmlns/\"\n                        style=\"width: 57px; height: 20px;\"></text>\n                </foreignObject>\n                <foreignObject style=\"overflow: visible;\" y=\"240\" x=\"10\" height=\"25\" width=\"30\">\n                  <text class=\"ct-label ct-vertical ct-start\" xmlns=\"http://www.w3.org/2000/xmlns/\"\n                        style=\"height: 25px; width: 30px;\">0\n                  </text>\n                </foreignObject>\n                <foreignObject style=\"overflow: visible;\" y=\"215\" x=\"10\" height=\"25\" width=\"30\">\n                  <text class=\"ct-label ct-vertical ct-start\" xmlns=\"http://www.w3.org/2000/xmlns/\"\n                        style=\"height: 25px; width: 30px;\">100\n                  </text>\n                </foreignObject>\n                <foreignObject style=\"overflow: visible;\" y=\"190\" x=\"10\" height=\"25\" width=\"30\">\n                  <text class=\"ct-label ct-vertical ct-start\" xmlns=\"http://www.w3.org/2000/xmlns/\"\n                        style=\"height: 25px; width: 30px;\">200\n                  </text>\n                </foreignObject>\n                <foreignObject style=\"overflow: visible;\" y=\"165\" x=\"10\" height=\"25\" width=\"30\">\n                  <text class=\"ct-label ct-vertical ct-start\" xmlns=\"http://www.w3.org/2000/xmlns/\"\n                        style=\"height: 25px; width: 30px;\">300\n                  </text>\n                </foreignObject>\n                <foreignObject style=\"overflow: visible;\" y=\"140\" x=\"10\" height=\"25\" width=\"30\">\n                  <text class=\"ct-label ct-vertical ct-start\" xmlns=\"http://www.w3.org/2000/xmlns/\"\n                        style=\"height: 25px; width: 30px;\">400\n                  </text>\n                </foreignObject>\n                <foreignObject style=\"overflow: visible;\" y=\"115\" x=\"10\" height=\"25\" width=\"30\">\n                  <text class=\"ct-label ct-vertical ct-start\" xmlns=\"http://www.w3.org/2000/xmlns/\"\n                        style=\"height: 25px; width: 30px;\">500\n                  </text>\n                </foreignObject>\n                <foreignObject style=\"overflow: visible;\" y=\"90\" x=\"10\" height=\"25\" width=\"30\">\n                  <text class=\"ct-label ct-vertical ct-start\" xmlns=\"http://www.w3.org/2000/xmlns/\"\n                        style=\"height: 25px; width: 30px;\">600\n                  </text>\n                </foreignObject>\n                <foreignObject style=\"overflow: visible;\" y=\"65\" x=\"10\" height=\"25\" width=\"30\">\n                  <text class=\"ct-label ct-vertical ct-start\" xmlns=\"http://www.w3.org/2000/xmlns/\"\n                        style=\"height: 25px; width: 30px;\">700\n                  </text>\n                </foreignObject>\n                <foreignObject style=\"overflow: visible;\" y=\"40\" x=\"10\" height=\"25\" width=\"30\">\n                  <text class=\"ct-label ct-vertical ct-start\" xmlns=\"http://www.w3.org/2000/xmlns/\"\n                        style=\"height: 25px; width: 30px;\">800\n                  </text>\n                </foreignObject>\n                <foreignObject style=\"overflow: visible;\" y=\"15\" x=\"10\" height=\"25\" width=\"30\">\n                  <text class=\"ct-label ct-vertical ct-start\" xmlns=\"http://www.w3.org/2000/xmlns/\"\n                        style=\"height: 25px; width: 30px;\">900\n                  </text>\n                </foreignObject>\n                <foreignObject style=\"overflow: visible;\" y=\"-15\" x=\"10\" height=\"30\" width=\"30\">\n                  <text class=\"ct-label ct-vertical ct-start\" xmlns=\"http://www.w3.org/2000/xmlns/\"\n                        style=\"height: 30px; width: 30px;\">1000\n                  </text>\n                </foreignObject>\n              </g>\n            </svg>\n          </div>\n        </div>\n      </div>\n    </div>\n    <div class=\"col-md-12\">\n      <div class=\"col-md-6\">\n        <div class=\"card\">\n          <div class=\"card-header card-header-icon\" data-background-color=\"blue\">\n            <i class=\"material-icons\">timeline</i>\n          </div>\n          <div class=\"card-content\">\n            <h4 class=\"title\">Offered Job Trending - Last 10 days</h4>\n          </div>\n          <div id=\"colouredRoundedLineChart\" class=\"ct-chart\">\n            <svg xmlns:ct=\"http://gionkunz.github.com/chartist-js/ct\" width=\"100%\" height=\"300px\" class=\"ct-chart-line\"\n                 style=\"width: 100%; height: 300px;\">\n              <g class=\"ct-grids\">\n                <line y1=\"265\" y2=\"265\" x1=\"50\" x2=\"578\" class=\"ct-grid ct-vertical\"></line>\n                <line y1=\"240\" y2=\"240\" x1=\"50\" x2=\"578\" class=\"ct-grid ct-vertical\"></line>\n                <line y1=\"215\" y2=\"215\" x1=\"50\" x2=\"578\" class=\"ct-grid ct-vertical\"></line>\n                <line y1=\"190\" y2=\"190\" x1=\"50\" x2=\"578\" class=\"ct-grid ct-vertical\"></line>\n                <line y1=\"165\" y2=\"165\" x1=\"50\" x2=\"578\" class=\"ct-grid ct-vertical\"></line>\n                <line y1=\"140\" y2=\"140\" x1=\"50\" x2=\"578\" class=\"ct-grid ct-vertical\"></line>\n                <line y1=\"115\" y2=\"115\" x1=\"50\" x2=\"578\" class=\"ct-grid ct-vertical\"></line>\n                <line y1=\"90\" y2=\"90\" x1=\"50\" x2=\"578\" class=\"ct-grid ct-vertical\"></line>\n                <line y1=\"65\" y2=\"65\" x1=\"50\" x2=\"578\" class=\"ct-grid ct-vertical\"></line>\n                <line y1=\"40\" y2=\"40\" x1=\"50\" x2=\"578\" class=\"ct-grid ct-vertical\"></line>\n                <line y1=\"15\" y2=\"15\" x1=\"50\" x2=\"578\" class=\"ct-grid ct-vertical\"></line>\n              </g>\n              <g>\n                <g class=\"ct-series ct-series-a\">\n                  <path\n                    d=\"M 50 193.25 C 58 185.208 82 145.125 98 145 C 114 144.875 130 195.583 146 192.5 C 162 189.417 178 143.167 194 126.5 C 210 109.833 226 98.167 242 92.5 C 258 86.833 274 84.583 290 92.5 C 306 100.417 322 142.583 338 140 C 354 137.417 370 83.25 386 77 C 402 70.75 418 108.667 434 102.5 C 450 96.333 466 52.25 482 40 C 498 27.75 522 30.833 530 29\"\n                    class=\"ct-line\"></path>\n                  <line x1=\"50\" y1=\"193.25\" x2=\"50.01\" y2=\"193.25\" class=\"ct-point\" ct:value=\"287\" opacity=\"1\"></line>\n                  <line x1=\"98\" y1=\"145\" x2=\"98.01\" y2=\"145\" class=\"ct-point\" ct:value=\"480\" opacity=\"1\"></line>\n                  <line x1=\"146\" y1=\"192.5\" x2=\"146.01\" y2=\"192.5\" class=\"ct-point\" ct:value=\"290\" opacity=\"1\"></line>\n                  <line x1=\"194\" y1=\"126.5\" x2=\"194.01\" y2=\"126.5\" class=\"ct-point\" ct:value=\"554\" opacity=\"1\"></line>\n                  <line x1=\"242\" y1=\"92.5\" x2=\"242.01\" y2=\"92.5\" class=\"ct-point\" ct:value=\"690\" opacity=\"1\"></line>\n                  <line x1=\"290\" y1=\"92.5\" x2=\"290.01\" y2=\"92.5\" class=\"ct-point\" ct:value=\"690\" opacity=\"1\"></line>\n                  <line x1=\"338\" y1=\"140\" x2=\"338.01\" y2=\"140\" class=\"ct-point\" ct:value=\"500\" opacity=\"1\"></line>\n                  <line x1=\"386\" y1=\"77\" x2=\"386.01\" y2=\"77\" class=\"ct-point\" ct:value=\"752\" opacity=\"1\"></line>\n                  <line x1=\"434\" y1=\"102.5\" x2=\"434.01\" y2=\"102.5\" class=\"ct-point\" ct:value=\"650\" opacity=\"1\"></line>\n                  <line x1=\"482\" y1=\"40\" x2=\"482.01\" y2=\"40\" class=\"ct-point\" ct:value=\"900\" opacity=\"1\"></line>\n                  <line x1=\"530\" y1=\"29\" x2=\"530.01\" y2=\"29\" class=\"ct-point\" ct:value=\"944\" opacity=\"1\"></line>\n                </g>\n              </g>\n              <g class=\"ct-labels\">\n                <foreignObject style=\"overflow: visible;\" x=\"50\" y=\"270\" width=\"48\" height=\"20\">\n                  <text class=\"ct-label ct-horizontal ct-end\" xmlns=\"http://www.w3.org/2000/xmlns/\"\n                        style=\"width: 48px; height: 20px;\">'06\n                  </text>\n                </foreignObject>\n                <foreignObject style=\"overflow: visible;\" x=\"98\" y=\"270\" width=\"48\" height=\"20\">\n                  <text class=\"ct-label ct-horizontal ct-end\" xmlns=\"http://www.w3.org/2000/xmlns/\"\n                        style=\"width: 48px; height: 20px;\">'07\n                  </text>\n                </foreignObject>\n                <foreignObject style=\"overflow: visible;\" x=\"146\" y=\"270\" width=\"48\" height=\"20\">\n                  <text class=\"ct-label ct-horizontal ct-end\" xmlns=\"http://www.w3.org/2000/xmlns/\"\n                        style=\"width: 48px; height: 20px;\">'08\n                  </text>\n                </foreignObject>\n                <foreignObject style=\"overflow: visible;\" x=\"194\" y=\"270\" width=\"48\" height=\"20\">\n                  <text class=\"ct-label ct-horizontal ct-end\" xmlns=\"http://www.w3.org/2000/xmlns/\"\n                        style=\"width: 48px; height: 20px;\">'09\n                  </text>\n                </foreignObject>\n                <foreignObject style=\"overflow: visible;\" x=\"242\" y=\"270\" width=\"48\" height=\"20\">\n                  <text class=\"ct-label ct-horizontal ct-end\" xmlns=\"http://www.w3.org/2000/xmlns/\"\n                        style=\"width: 48px; height: 20px;\">'10\n                  </text>\n                </foreignObject>\n                <foreignObject style=\"overflow: visible;\" x=\"290\" y=\"270\" width=\"48\" height=\"20\">\n                  <text class=\"ct-label ct-horizontal ct-end\" xmlns=\"http://www.w3.org/2000/xmlns/\"\n                        style=\"width: 48px; height: 20px;\">'11\n                  </text>\n                </foreignObject>\n                <foreignObject style=\"overflow: visible;\" x=\"338\" y=\"270\" width=\"48\" height=\"20\">\n                  <text class=\"ct-label ct-horizontal ct-end\" xmlns=\"http://www.w3.org/2000/xmlns/\"\n                        style=\"width: 48px; height: 20px;\">'12\n                  </text>\n                </foreignObject>\n                <foreignObject style=\"overflow: visible;\" x=\"386\" y=\"270\" width=\"48\" height=\"20\">\n                  <text class=\"ct-label ct-horizontal ct-end\" xmlns=\"http://www.w3.org/2000/xmlns/\"\n                        style=\"width: 48px; height: 20px;\">'13\n                  </text>\n                </foreignObject>\n                <foreignObject style=\"overflow: visible;\" x=\"434\" y=\"270\" width=\"48\" height=\"20\">\n                  <text class=\"ct-label ct-horizontal ct-end\" xmlns=\"http://www.w3.org/2000/xmlns/\"\n                        style=\"width: 48px; height: 20px;\">'14\n                  </text>\n                </foreignObject>\n                <foreignObject style=\"overflow: visible;\" x=\"482\" y=\"270\" width=\"48\" height=\"20\">\n                  <text class=\"ct-label ct-horizontal ct-end\" xmlns=\"http://www.w3.org/2000/xmlns/\"\n                        style=\"width: 48px; height: 20px;\">'15\n                  </text>\n                </foreignObject>\n                <foreignObject style=\"overflow: visible;\" x=\"530\" y=\"270\" width=\"48\" height=\"20\">\n                  <text class=\"ct-label ct-horizontal ct-end\" xmlns=\"http://www.w3.org/2000/xmlns/\"\n                        style=\"width: 48px; height: 20px;\"></text>\n                </foreignObject>\n                <foreignObject style=\"overflow: visible;\" y=\"240\" x=\"10\" height=\"25\" width=\"30\">\n                  <text class=\"ct-label ct-vertical ct-start\" xmlns=\"http://www.w3.org/2000/xmlns/\"\n                        style=\"height: 25px; width: 30px;\">0\n                  </text>\n                </foreignObject>\n                <foreignObject style=\"overflow: visible;\" y=\"215\" x=\"10\" height=\"25\" width=\"30\">\n                  <text class=\"ct-label ct-vertical ct-start\" xmlns=\"http://www.w3.org/2000/xmlns/\"\n                        style=\"height: 25px; width: 30px;\">100\n                  </text>\n                </foreignObject>\n                <foreignObject style=\"overflow: visible;\" y=\"190\" x=\"10\" height=\"25\" width=\"30\">\n                  <text class=\"ct-label ct-vertical ct-start\" xmlns=\"http://www.w3.org/2000/xmlns/\"\n                        style=\"height: 25px; width: 30px;\">200\n                  </text>\n                </foreignObject>\n                <foreignObject style=\"overflow: visible;\" y=\"165\" x=\"10\" height=\"25\" width=\"30\">\n                  <text class=\"ct-label ct-vertical ct-start\" xmlns=\"http://www.w3.org/2000/xmlns/\"\n                        style=\"height: 25px; width: 30px;\">300\n                  </text>\n                </foreignObject>\n                <foreignObject style=\"overflow: visible;\" y=\"140\" x=\"10\" height=\"25\" width=\"30\">\n                  <text class=\"ct-label ct-vertical ct-start\" xmlns=\"http://www.w3.org/2000/xmlns/\"\n                        style=\"height: 25px; width: 30px;\">400\n                  </text>\n                </foreignObject>\n                <foreignObject style=\"overflow: visible;\" y=\"115\" x=\"10\" height=\"25\" width=\"30\">\n                  <text class=\"ct-label ct-vertical ct-start\" xmlns=\"http://www.w3.org/2000/xmlns/\"\n                        style=\"height: 25px; width: 30px;\">500\n                  </text>\n                </foreignObject>\n                <foreignObject style=\"overflow: visible;\" y=\"90\" x=\"10\" height=\"25\" width=\"30\">\n                  <text class=\"ct-label ct-vertical ct-start\" xmlns=\"http://www.w3.org/2000/xmlns/\"\n                        style=\"height: 25px; width: 30px;\">600\n                  </text>\n                </foreignObject>\n                <foreignObject style=\"overflow: visible;\" y=\"65\" x=\"10\" height=\"25\" width=\"30\">\n                  <text class=\"ct-label ct-vertical ct-start\" xmlns=\"http://www.w3.org/2000/xmlns/\"\n                        style=\"height: 25px; width: 30px;\">700\n                  </text>\n                </foreignObject>\n                <foreignObject style=\"overflow: visible;\" y=\"40\" x=\"10\" height=\"25\" width=\"30\">\n                  <text class=\"ct-label ct-vertical ct-start\" xmlns=\"http://www.w3.org/2000/xmlns/\"\n                        style=\"height: 25px; width: 30px;\">800\n                  </text>\n                </foreignObject>\n                <foreignObject style=\"overflow: visible;\" y=\"15\" x=\"10\" height=\"25\" width=\"30\">\n                  <text class=\"ct-label ct-vertical ct-start\" xmlns=\"http://www.w3.org/2000/xmlns/\"\n                        style=\"height: 25px; width: 30px;\">900\n                  </text>\n                </foreignObject>\n                <foreignObject style=\"overflow: visible;\" y=\"-15\" x=\"10\" height=\"30\" width=\"30\">\n                  <text class=\"ct-label ct-vertical ct-start\" xmlns=\"http://www.w3.org/2000/xmlns/\"\n                        style=\"height: 30px; width: 30px;\">1000\n                  </text>\n                </foreignObject>\n              </g>\n            </svg>\n          </div>\n        </div>\n      </div>\n      <div class=\"col-md-6\">\n        <div class=\"card\">\n          <div class=\"card-header card-header-icon\" data-background-color=\"rose\" style=\"background-color: #ff4081\">\n            <i class=\"material-icons\">insert_chart</i>\n          </div>\n          <div class=\"card-content\">\n            <h4 class=\"title\">Offered Jobs Vs Handled On Time - 2016</h4>\n          </div>\n          <div id=\"multipleBarsChart\" class=\"ct-chart\">\n            <svg xmlns:ct=\"http://gionkunz.github.com/chartist-js/ct\" width=\"100%\" height=\"300px\" class=\"ct-chart-bar\"\n                 style=\"width: 100%; height: 300px;\">\n              <g class=\"ct-grids\">\n                <line y1=\"265\" y2=\"265\" x1=\"50\" x2=\"578\" class=\"ct-grid ct-vertical\"></line>\n                <line y1=\"237.22222222222223\" y2=\"237.22222222222223\" x1=\"50\" x2=\"578\"\n                      class=\"ct-grid ct-vertical\"></line>\n                <line y1=\"209.44444444444446\" y2=\"209.44444444444446\" x1=\"50\" x2=\"578\"\n                      class=\"ct-grid ct-vertical\"></line>\n                <line y1=\"181.66666666666669\" y2=\"181.66666666666669\" x1=\"50\" x2=\"578\"\n                      class=\"ct-grid ct-vertical\"></line>\n                <line y1=\"153.88888888888889\" y2=\"153.88888888888889\" x1=\"50\" x2=\"578\"\n                      class=\"ct-grid ct-vertical\"></line>\n                <line y1=\"126.11111111111111\" y2=\"126.11111111111111\" x1=\"50\" x2=\"578\"\n                      class=\"ct-grid ct-vertical\"></line>\n                <line y1=\"98.33333333333334\" y2=\"98.33333333333334\" x1=\"50\" x2=\"578\" class=\"ct-grid ct-vertical\"></line>\n                <line y1=\"70.55555555555554\" y2=\"70.55555555555554\" x1=\"50\" x2=\"578\" class=\"ct-grid ct-vertical\"></line>\n                <line y1=\"42.77777777777777\" y2=\"42.77777777777777\" x1=\"50\" x2=\"578\" class=\"ct-grid ct-vertical\"></line>\n                <line y1=\"15\" y2=\"15\" x1=\"50\" x2=\"578\" class=\"ct-grid ct-vertical\"></line>\n              </g>\n              <g>\n                <g class=\"ct-series ct-series-a\">\n                  <line x1=\"67\" x2=\"67\" y1=\"265\" y2=\"114.44444444444446\" class=\"ct-bar\" ct:value=\"542\"\n                        opacity=\"1\"></line>\n                  <line x1=\"111\" x2=\"111\" y1=\"265\" y2=\"141.94444444444446\" class=\"ct-bar\" ct:value=\"443\"\n                        opacity=\"1\"></line>\n                  <line x1=\"155\" x2=\"155\" y1=\"265\" y2=\"176.11111111111111\" class=\"ct-bar\" ct:value=\"320\"\n                        opacity=\"1\"></line>\n                  <line x1=\"199\" x2=\"199\" y1=\"265\" y2=\"48.33333333333334\" class=\"ct-bar\" ct:value=\"780\"\n                        opacity=\"1\"></line>\n                  <line x1=\"243\" x2=\"243\" y1=\"265\" y2=\"111.38888888888889\" class=\"ct-bar\" ct:value=\"553\"\n                        opacity=\"1\"></line>\n                  <line x1=\"287\" x2=\"287\" y1=\"265\" y2=\"139.16666666666669\" class=\"ct-bar\" ct:value=\"453\"\n                        opacity=\"1\"></line>\n                  <line x1=\"331\" x2=\"331\" y1=\"265\" y2=\"174.44444444444446\" class=\"ct-bar\" ct:value=\"326\"\n                        opacity=\"1\"></line>\n                  <line x1=\"375\" x2=\"375\" y1=\"265\" y2=\"144.44444444444446\" class=\"ct-bar\" ct:value=\"434\"\n                        opacity=\"1\"></line>\n                  <line x1=\"419\" x2=\"419\" y1=\"265\" y2=\"107.22222222222223\" class=\"ct-bar\" ct:value=\"568\"\n                        opacity=\"1\"></line>\n                  <line x1=\"463\" x2=\"463\" y1=\"265\" y2=\"95.55555555555554\" class=\"ct-bar\" ct:value=\"610\"\n                        opacity=\"1\"></line>\n                  <line x1=\"507\" x2=\"507\" y1=\"265\" y2=\"55\" class=\"ct-bar\" ct:value=\"756\" opacity=\"1\"></line>\n                  <line x1=\"551\" x2=\"551\" y1=\"265\" y2=\"16.388888888888886\" class=\"ct-bar\" ct:value=\"895\"\n                        opacity=\"1\"></line>\n                </g>\n                <g class=\"ct-series ct-series-b\">\n                  <line x1=\"77\" x2=\"77\" y1=\"265\" y2=\"150.55555555555554\" class=\"ct-bar\" ct:value=\"412\"\n                        opacity=\"1\"></line>\n                  <line x1=\"121\" x2=\"121\" y1=\"265\" y2=\"197.5\" class=\"ct-bar\" ct:value=\"243\" opacity=\"1\"></line>\n                  <line x1=\"165\" x2=\"165\" y1=\"265\" y2=\"187.22222222222223\" class=\"ct-bar\" ct:value=\"280\"\n                        opacity=\"1\"></line>\n                  <line x1=\"209\" x2=\"209\" y1=\"265\" y2=\"103.88888888888889\" class=\"ct-bar\" ct:value=\"580\"\n                        opacity=\"1\"></line>\n                  <line x1=\"253\" x2=\"253\" y1=\"265\" y2=\"139.16666666666669\" class=\"ct-bar\" ct:value=\"453\"\n                        opacity=\"1\"></line>\n                  <line x1=\"297\" x2=\"297\" y1=\"265\" y2=\"166.94444444444446\" class=\"ct-bar\" ct:value=\"353\"\n                        opacity=\"1\"></line>\n                  <line x1=\"341\" x2=\"341\" y1=\"265\" y2=\"181.66666666666669\" class=\"ct-bar\" ct:value=\"300\"\n                        opacity=\"1\"></line>\n                  <line x1=\"385\" x2=\"385\" y1=\"265\" y2=\"163.88888888888889\" class=\"ct-bar\" ct:value=\"364\"\n                        opacity=\"1\"></line>\n                  <line x1=\"429\" x2=\"429\" y1=\"265\" y2=\"162.77777777777777\" class=\"ct-bar\" ct:value=\"368\"\n                        opacity=\"1\"></line>\n                  <line x1=\"473\" x2=\"473\" y1=\"265\" y2=\"151.11111111111111\" class=\"ct-bar\" ct:value=\"410\"\n                        opacity=\"1\"></line>\n                  <line x1=\"517\" x2=\"517\" y1=\"265\" y2=\"88.33333333333334\" class=\"ct-bar\" ct:value=\"636\"\n                        opacity=\"1\"></line>\n                  <line x1=\"561\" x2=\"561\" y1=\"265\" y2=\"71.94444444444446\" class=\"ct-bar\" ct:value=\"695\"\n                        opacity=\"1\"></line>\n                </g>\n              </g>\n              <g class=\"ct-labels\">\n                <foreignObject style=\"overflow: visible;\" x=\"50\" y=\"270\" width=\"44\" height=\"20\">\n                  <text class=\"ct-label ct-horizontal ct-end\" xmlns=\"http://www.w3.org/2000/xmlns/\"\n                        style=\"width: 44px; height: 20px;\">Jan\n                  </text>\n                </foreignObject>\n                <foreignObject style=\"overflow: visible;\" x=\"94\" y=\"270\" width=\"44\" height=\"20\">\n                  <text class=\"ct-label ct-horizontal ct-end\" xmlns=\"http://www.w3.org/2000/xmlns/\"\n                        style=\"width: 44px; height: 20px;\">Feb\n                  </text>\n                </foreignObject>\n                <foreignObject style=\"overflow: visible;\" x=\"138\" y=\"270\" width=\"44\" height=\"20\">\n                  <text class=\"ct-label ct-horizontal ct-end\" xmlns=\"http://www.w3.org/2000/xmlns/\"\n                        style=\"width: 44px; height: 20px;\">Mar\n                  </text>\n                </foreignObject>\n                <foreignObject style=\"overflow: visible;\" x=\"182\" y=\"270\" width=\"44\" height=\"20\">\n                  <text class=\"ct-label ct-horizontal ct-end\" xmlns=\"http://www.w3.org/2000/xmlns/\"\n                        style=\"width: 44px; height: 20px;\">Apr\n                  </text>\n                </foreignObject>\n                <foreignObject style=\"overflow: visible;\" x=\"226\" y=\"270\" width=\"44\" height=\"20\">\n                  <text class=\"ct-label ct-horizontal ct-end\" xmlns=\"http://www.w3.org/2000/xmlns/\"\n                        style=\"width: 44px; height: 20px;\">Mai\n                  </text>\n                </foreignObject>\n                <foreignObject style=\"overflow: visible;\" x=\"270\" y=\"270\" width=\"44\" height=\"20\">\n                  <text class=\"ct-label ct-horizontal ct-end\" xmlns=\"http://www.w3.org/2000/xmlns/\"\n                        style=\"width: 44px; height: 20px;\">Jun\n                  </text>\n                </foreignObject>\n                <foreignObject style=\"overflow: visible;\" x=\"314\" y=\"270\" width=\"44\" height=\"20\">\n                  <text class=\"ct-label ct-horizontal ct-end\" xmlns=\"http://www.w3.org/2000/xmlns/\"\n                        style=\"width: 44px; height: 20px;\">Jul\n                  </text>\n                </foreignObject>\n                <foreignObject style=\"overflow: visible;\" x=\"358\" y=\"270\" width=\"44\" height=\"20\">\n                  <text class=\"ct-label ct-horizontal ct-end\" xmlns=\"http://www.w3.org/2000/xmlns/\"\n                        style=\"width: 44px; height: 20px;\">Aug\n                  </text>\n                </foreignObject>\n                <foreignObject style=\"overflow: visible;\" x=\"402\" y=\"270\" width=\"44\" height=\"20\">\n                  <text class=\"ct-label ct-horizontal ct-end\" xmlns=\"http://www.w3.org/2000/xmlns/\"\n                        style=\"width: 44px; height: 20px;\">Sep\n                  </text>\n                </foreignObject>\n                <foreignObject style=\"overflow: visible;\" x=\"446\" y=\"270\" width=\"44\" height=\"20\">\n                  <text class=\"ct-label ct-horizontal ct-end\" xmlns=\"http://www.w3.org/2000/xmlns/\"\n                        style=\"width: 44px; height: 20px;\">Oct\n                  </text>\n                </foreignObject>\n                <foreignObject style=\"overflow: visible;\" x=\"490\" y=\"270\" width=\"44\" height=\"20\">\n                  <text class=\"ct-label ct-horizontal ct-end\" xmlns=\"http://www.w3.org/2000/xmlns/\"\n                        style=\"width: 44px; height: 20px;\">Nov\n                  </text>\n                </foreignObject>\n                <foreignObject style=\"overflow: visible;\" x=\"534\" y=\"270\" width=\"44\" height=\"20\">\n                  <text class=\"ct-label ct-horizontal ct-end\" xmlns=\"http://www.w3.org/2000/xmlns/\"\n                        style=\"width: 44px; height: 20px;\">Dec\n                  </text>\n                </foreignObject>\n                <foreignObject style=\"overflow: visible;\" y=\"237.22222222222223\" x=\"10\" height=\"27.77777777777778\"\n                               width=\"30\">\n                  <text class=\"ct-label ct-vertical ct-start\" xmlns=\"http://www.w3.org/2000/xmlns/\"\n                        style=\"height: 28px; width: 30px;\">0\n                  </text>\n                </foreignObject>\n                <foreignObject style=\"overflow: visible;\" y=\"209.44444444444446\" x=\"10\" height=\"27.77777777777778\"\n                               width=\"30\">\n                  <text class=\"ct-label ct-vertical ct-start\" xmlns=\"http://www.w3.org/2000/xmlns/\"\n                        style=\"height: 28px; width: 30px;\">100\n                  </text>\n                </foreignObject>\n                <foreignObject style=\"overflow: visible;\" y=\"181.66666666666669\" x=\"10\" height=\"27.77777777777777\"\n                               width=\"30\">\n                  <text class=\"ct-label ct-vertical ct-start\" xmlns=\"http://www.w3.org/2000/xmlns/\"\n                        style=\"height: 28px; width: 30px;\">200\n                  </text>\n                </foreignObject>\n                <foreignObject style=\"overflow: visible;\" y=\"153.8888888888889\" x=\"10\" height=\"27.777777777777786\"\n                               width=\"30\">\n                  <text class=\"ct-label ct-vertical ct-start\" xmlns=\"http://www.w3.org/2000/xmlns/\"\n                        style=\"height: 28px; width: 30px;\">300\n                  </text>\n                </foreignObject>\n                <foreignObject style=\"overflow: visible;\" y=\"126.11111111111111\" x=\"10\" height=\"27.77777777777777\"\n                               width=\"30\">\n                  <text class=\"ct-label ct-vertical ct-start\" xmlns=\"http://www.w3.org/2000/xmlns/\"\n                        style=\"height: 28px; width: 30px;\">400\n                  </text>\n                </foreignObject>\n                <foreignObject style=\"overflow: visible;\" y=\"98.33333333333334\" x=\"10\" height=\"27.77777777777777\"\n                               width=\"30\">\n                  <text class=\"ct-label ct-vertical ct-start\" xmlns=\"http://www.w3.org/2000/xmlns/\"\n                        style=\"height: 28px; width: 30px;\">500\n                  </text>\n                </foreignObject>\n                <foreignObject style=\"overflow: visible;\" y=\"70.55555555555554\" x=\"10\" height=\"27.7777777777778\"\n                               width=\"30\">\n                  <text class=\"ct-label ct-vertical ct-start\" xmlns=\"http://www.w3.org/2000/xmlns/\"\n                        style=\"height: 28px; width: 30px;\">600\n                  </text>\n                </foreignObject>\n                <foreignObject style=\"overflow: visible;\" y=\"42.77777777777777\" x=\"10\" height=\"27.77777777777777\"\n                               width=\"30\">\n                  <text class=\"ct-label ct-vertical ct-start\" xmlns=\"http://www.w3.org/2000/xmlns/\"\n                        style=\"height: 28px; width: 30px;\">700\n                  </text>\n                </foreignObject>\n                <foreignObject style=\"overflow: visible;\" y=\"15\" x=\"10\" height=\"27.77777777777777\" width=\"30\">\n                  <text class=\"ct-label ct-vertical ct-start\" xmlns=\"http://www.w3.org/2000/xmlns/\"\n                        style=\"height: 28px; width: 30px;\">800\n                  </text>\n                </foreignObject>\n                <foreignObject style=\"overflow: visible;\" y=\"-15\" x=\"10\" height=\"30\" width=\"30\">\n                  <text class=\"ct-label ct-vertical ct-start\" xmlns=\"http://www.w3.org/2000/xmlns/\"\n                        style=\"height: 30px; width: 30px;\">900\n                  </text>\n                </foreignObject>\n              </g>\n            </svg>\n          </div>\n        </div>\n      </div>\n    </div>\n  </div>\n  <div class=\"content-div hide\" id=\"generalDiv\">\n    <div class=\"col-md-12\" style=\"margin-top: -5vh\">\n      <div class=\"col-md-6\">\n        <div class=\"card\" style=\"height: 70vh\">\n          <div class=\"card-content\">\n            <form [formGroup]=\"generalReportForm\">\n              <div><span style=\"font-weight: bold; font-size: 18px;\" class=\"pull-left\">Report Selector</span></div>\n              <div class=\"col-md-12 \">\n                <div class=\"col-md-3 text-right\" style=\"margin-top: 3vh\">\n                  <span>Report Category</span>\n                </div>\n                <div class=\"col-md-9 \">\n                  <md-input-container><input mdInput formControlName=\"name\"\n                                             type=\"text\"></md-input-container>\n                </div>\n              </div>\n              <div class=\"col-md-12 \">\n                <div class=\"col-md-3 text-right\" style=\"margin-top: 3vh\">\n                  <span>Report Name</span>\n                </div>\n                <div class=\"col-md-9 \">\n                  <md-input-container><input mdInput formControlName=\"name\"\n                                             type=\"text\"></md-input-container>\n                </div>\n              </div>\n              <div class=\"col-md-12 \">\n                <div class=\"col-md-3 text-right\" style=\"margin-top: 3vh\">\n                  <span>Date Range</span>\n                </div>\n                <div class=\"col-md-9 \">\n                  <div class=\"col-md-5\">\n                    <md-input-container><input mdInput formControlName=\"name\"\n                                               type=\"text\"></md-input-container>\n                  </div>\n                  <div class=\"col-md-2\" style=\"margin-top: 3vh\">To</div>\n                  <div class=\"col-md-5\">\n                    <md-input-container><input mdInput formControlName=\"name\"\n                                               type=\"text\"></md-input-container>\n                  </div>\n\n                </div>\n              </div>\n              <div class=\"col-md-12 \">\n                <div class=\"col-md-3 text-right\" style=\"margin-top: 3vh\">\n                  <span>Time Range</span>\n                </div>\n                <div class=\"col-md-9 \">\n                  <div class=\"col-md-5\">\n                    <md-input-container><input mdInput formControlName=\"name\"\n                                               type=\"text\"></md-input-container>\n                  </div>\n                  <div class=\"col-md-2\" style=\"margin-top: 3vh\">To</div>\n                  <div class=\"col-md-5\">\n                    <md-input-container><input mdInput formControlName=\"name\"\n                                               type=\"text\"></md-input-container>\n                  </div>\n                </div>\n              </div>\n              <div class=\"col-md-12 \">\n                <div class=\"col-md-3 text-right\" style=\"margin-top: 3vh\">\n                  <span>Filters</span>\n                </div>\n                <div class=\"col-md-9 \">\n                  <md-input-container><input mdInput formControlName=\"name\"\n                                             type=\"text\"></md-input-container>\n                </div>\n              </div>\n              <div class=\"col-md-12 formatted-form\" style=\"margin-top: 3vh\">\n                <div class=\"col-md-3 text-right\">\n                  <span>Report Formats</span>\n                </div>\n                <div class=\"col-md-9 \">\n                  <md-radio-group>\n                    <div class=\"col-md-3\" style=\"width: auto\">\n                      <input type=\"radio\" formControlName=\"name\" value=\"w\"> Web Page\n                    </div>\n                    <div class=\"col-md-3\" style=\"width: auto\">\n                      <input type=\"radio\" formControlName=\"name\" value=\"e\">MS Excel\n                    </div>\n                    <div class=\"col-md-3\" style=\"width: auto\">\n                      <input type=\"radio\" formControlName=\"name\" value=\"p\"> PDF\n                    </div>\n                  </md-radio-group>\n                </div>\n              </div>\n              <div class=\"col-md-12 \">\n                <div class=\"col-md-2\"></div>\n                <div class=\"col-md-6\">\n                  <button type=\"submit\" class=\"btn btn-primary pull-right\">\n                    Generate Report\n                  </button>\n                  <div class=\"clearfix\"></div>\n                </div>\n              </div>\n            </form>\n\n          </div>\n        </div>\n      </div>\n      <div class=\"col-md-6\">\n        <div class=\"card\" style=\"height: 70vh\">\n          <div class=\"card-content\">\n            <div class=\"col-md-12\"><span class=\"pull-left\"\n                                         style=\"font-weight: bold; font-size: 18px;    margin-bottom: 1vh;\">Recently Accessed Reports</span>\n            </div>\n            <div class=\"col-md-12 \" style=\"margin-top: 2vh\">\n              <div class=\"col-md-7\">\n                <span>Daily Employee Productivity</span>\n              </div>\n              <div class=\"col-md-5\">\n                <div class=\"col-md-4\">\n                  <i class=\"material-icons\">tune</i>\n                </div>\n                <div class=\"col-md-4\">\n                  <img src=\"assets/img/excel_logo.png\">\n                </div>\n                <div class=\"col-md-4\">\n                  <img src=\"assets/img/pdf_logo.png\">\n                </div>\n              </div>\n            </div>\n            <div class=\"col-md-12\" style=\"margin-top: 1vh;margin-bottom: 1vh\">\n              <div class=\"col-md-7\">\n                <span>Daily Job Types Report</span>\n              </div>\n              <div class=\"col-md-5\">\n                <div class=\"col-md-4\">\n                  <i class=\"material-icons\">tune</i>\n                </div>\n                <div class=\"col-md-4\">\n                  <img src=\"assets/img/excel_logo.png\">\n                </div>\n                <div class=\"col-md-4\">\n                  <img src=\"assets/img/pdf_logo.png\">\n                </div>\n              </div>\n            </div>\n            <div class=\"col-md-12 \">\n              <div class=\"col-md-7\">\n                <span>Daily Jobs By Customer</span>\n              </div>\n              <div class=\"col-md-5\">\n                <div class=\"col-md-4\">\n                  <i class=\"material-icons\">tune</i>\n                </div>\n                <div class=\"col-md-4\">\n                  <img src=\"assets/img/excel_logo.png\">\n                </div>\n                <div class=\"col-md-4\">\n                  <img src=\"assets/img/pdf_logo.png\">\n                </div>\n              </div>\n            </div>\n\n\n            <br>\n\n            <div class=\"col-md-12\" style=\"margin-top: 3vh\"><span\n              style=\"font-weight: bold; font-size: 18px;    margin-bottom: 3vh;\" class=\"pull-left\">Frequently Accessed Reports</span>\n            </div>\n            <div class=\"col-md-12 \">\n              <div class=\"col-md-7\">\n                <span>Daily Employee Productivity</span>\n              </div>\n              <div class=\"col-md-5\">\n                <div class=\"col-md-4\">\n                  <i class=\"material-icons\">tune</i>\n                </div>\n                <div class=\"col-md-4\">\n                  <img src=\"assets/img/excel_logo.png\">\n                </div>\n                <div class=\"col-md-4\">\n                  <img src=\"assets/img/pdf_logo.png\">\n                </div>\n              </div>\n            </div>\n            <div class=\"col-md-12 \" style=\"margin-top: 1vh;margin-bottom: 1vh\">\n              <div class=\"col-md-7\">\n                <span>Daily Job Types Report</span>\n              </div>\n              <div class=\"col-md-5\">\n                <div class=\"col-md-4\">\n                  <i class=\"material-icons\">tune</i>\n                </div>\n                <div class=\"col-md-4\">\n                  <img src=\"assets/img/excel_logo.png\">\n                </div>\n                <div class=\"col-md-4\">\n                  <img src=\"assets/img/pdf_logo.png\">\n                </div>\n              </div>\n            </div>\n            <div class=\"col-md-12 \">\n              <div class=\"col-md-7\">\n                <span>Daily Jobs By Customer</span>\n              </div>\n              <div class=\"col-md-5\">\n                <div class=\"col-md-4\">\n                  <i class=\"material-icons\">tune</i>\n                </div>\n                <div class=\"col-md-4\">\n                  <img src=\"assets/img/excel_logo.png\">\n                </div>\n                <div class=\"col-md-4\">\n                  <img src=\"assets/img/pdf_logo.png\">\n                </div>\n              </div>\n            </div>\n          </div>\n        </div>\n      </div>\n    </div>\n  </div>\n  <div class=\"content-div hide\" id=\"scheduleDiv\">\n    <div class=\"col-md-12\" style=\"margin-top: -5vh\">\n      <div class=\"col-md-6\">\n        <div class=\"card\" style=\"height: 65vh\">\n          <div class=\"card-content\">\n            <form [formGroup]=\"generalReportForm\">\n              <div><span style=\"font-weight: bold; font-size: 18px; margin-bottom: 3vh;\" class=\"pull-left\">Manage Existing Reports</span>\n              </div>\n              <div class=\"col-md-12 \">\n\n\n                <accordion [showArrows]=\"true\" [closeOthers]=\"true\" [expandAll]=\"false\">\n                  <accordion-group>\n                    <accordion-heading>\n                      <accordion-toggle>Scheduled Daily</accordion-toggle>\n                    </accordion-heading>\n                    <div>\n                      <div class=\"col-md-7\">\n                        <span>Daily Job Types Report</span>\n                      </div>\n                      <div class=\"col-md-5\">\n                        <i class=\"material-icons pull-right\">delete</i>\n                        <i class=\"material-icons pull-right\">mail</i>\n                        <i class=\"material-icons pull-right\">mode_edit</i>\n                      </div>\n                    </div>\n                    <div>\n                      <div class=\"col-md-7\">\n                        <span>Daily Employee Types Report</span>\n                      </div>\n                      <div class=\"col-md-5\">\n                        <i class=\"material-icons pull-right\">delete</i>\n                        <i class=\"material-icons pull-right\">mail</i>\n                        <i class=\"material-icons pull-right\">mode_edit</i>\n                      </div>\n                    </div>\n                    <div>\n                      <div class=\"col-md-7\">\n                        <span>Daily Employee Types Report</span>\n                      </div>\n                      <div class=\"col-md-5\">\n                        <i class=\"material-icons pull-right\">delete</i>\n                        <i class=\"material-icons pull-right\">mail</i>\n                        <i class=\"material-icons pull-right\">mode_edit</i>\n                      </div>\n                    </div>\n                  </accordion-group>\n                  <accordion-group>\n                    <accordion-heading>\n                      <accordion-toggle>Scheduled Weekly</accordion-toggle>\n                    </accordion-heading>\n                    <div>\n                      <div class=\"col-md-7\">\n                        <span>Weekly Job Types Report</span>\n                      </div>\n                      <div class=\"col-md-5\">\n                        <i class=\"material-icons pull-right\">delete</i>\n                        <i class=\"material-icons pull-right\">mail</i>\n                        <i class=\"material-icons pull-right\">mode_edit</i>\n                      </div>\n                    </div>\n                    <div>\n                      <div class=\"col-md-7\">\n                        <span>Weekly Employee Types Report</span>\n                      </div>\n                      <div class=\"col-md-5\">\n                        <i class=\"material-icons pull-right\">delete</i>\n                        <i class=\"material-icons pull-right\">mail</i>\n                        <i class=\"material-icons pull-right\">mode_edit</i>\n                      </div>\n                    </div>\n                    <div>\n                      <div class=\"col-md-7\">\n                        <span>Weekly Employee Types Report</span>\n                      </div>\n                      <div class=\"col-md-5\">\n                        <i class=\"material-icons pull-right\">delete</i>\n                        <i class=\"material-icons pull-right\">mail</i>\n                        <i class=\"material-icons pull-right\">mode_edit</i>\n                      </div>\n                    </div>\n                  </accordion-group>\n                  <accordion-group>\n                    <accordion-heading>\n                      <accordion-toggle>Scheduled Monthly</accordion-toggle>\n                    </accordion-heading>\n                    <div>\n                      <div class=\"col-md-7\">\n                        <span>Monthly Job Types Report</span>\n                      </div>\n                      <div class=\"col-md-5\">\n                        <i class=\"material-icons pull-right\">delete</i>\n                        <i class=\"material-icons pull-right\">mail</i>\n                        <i class=\"material-icons pull-right\">mode_edit</i>\n                      </div>\n                    </div>\n                    <div>\n                      <div class=\"col-md-7\">\n                        <span>Monthly Employee Types Report</span>\n                      </div>\n                      <div class=\"col-md-5\">\n                        <i class=\"material-icons pull-right\">delete</i>\n                        <i class=\"material-icons pull-right\">mail</i>\n                        <i class=\"material-icons pull-right\">mode_edit</i>\n                      </div>\n                    </div>\n                    <div>\n                      <div class=\"col-md-7\">\n                        <span>Monthly Employee Types Report</span>\n                      </div>\n                      <div class=\"col-md-5\">\n                        <i class=\"material-icons pull-right\">delete</i>\n                        <i class=\"material-icons pull-right\">mail</i>\n                        <i class=\"material-icons pull-right\">mode_edit</i>\n                      </div>\n                    </div>\n                  </accordion-group>\n\n                </accordion>\n\n              </div>\n\n\n            </form>\n\n          </div>\n        </div>\n      </div>\n      <div class=\"col-md-6\">\n        <div class=\"card\" style=\"height: 65vh\">\n          <div class=\"card-content\">\n            <div><span class=\"pull-left\" style=\"font-weight: bold; font-size: 18px;\">Add / Change Report Settings</span>\n            </div>\n            <div class=\"col-md-12 \">\n              <div class=\"col-md-3 text-right\" style=\"margin-top: 3vh\">\n                <span>Time Range</span>\n              </div>\n              <div class=\"col-md-9 \">\n                <md-input-container><input mdInput\n                                           type=\"text\"></md-input-container>\n              </div>\n            </div>\n            <div class=\"col-md-12 \">\n              <div class=\"col-md-3 text-right\" style=\"margin-top: 3vh\">\n                <span>Filters</span>\n              </div>\n              <div class=\"col-md-9 \">\n                <md-input-container><input mdInput\n                                           type=\"text\"></md-input-container>\n              </div>\n            </div>\n            <div class=\"col-md-12 formatted-form\" style=\"margin-top: 3vh\">\n              <div class=\"col-md-3 text-right\">\n                <span>Cycle</span>\n              </div>\n              <div class=\"col-md-9 \">\n                <md-radio-group>\n                  <div class=\"col-md-3\" style=\"width: auto\">\n                    <input type=\"radio\" value=\"1\"> Daily\n                  </div>\n                  <div class=\"col-md-3\" style=\"width: auto\">\n                    <input type=\"radio\" value=\"2\"> Weekly\n                  </div>\n                  <div class=\"col-md-3\" style=\"width: auto\">\n                    <input type=\"radio\" value=\"3\"> Monthly\n                  </div>\n                </md-radio-group>\n              </div>\n            </div>\n            <div class=\"col-md-12 \">\n              <div class=\"col-md-3 text-right\" style=\"margin-top: 3vh\">\n                <span>Time Picker</span>\n              </div>\n              <div class=\"col-md-9 \">\n                <!--<ngb-timepicker [(ngModel)]=\"time\" meridian=\"true\"></ngb-timepicker>-->\n              </div>\n            </div>\n            <div class=\"col-md-12 \">\n              <div class=\"col-md-3 text-right\" style=\"margin-top: 3vh\">\n                <span>Recepients</span>\n              </div>\n              <div class=\"col-md-9 \">\n                <md-input-container><input mdInput\n                                           type=\"text\"></md-input-container>\n              </div>\n            </div>\n            <div class=\"col-md-12 \">\n              <div class=\"col-md-2\"></div>\n              <div class=\"col-md-6\">\n                <button type=\"submit\" class=\"btn btn-primary pull-right\">\n                  Schedule Report\n                </button>\n                <div class=\"clearfix\"></div>\n              </div>\n            </div>\n          </div>\n        </div>\n      </div>\n    </div>\n  </div>\n  <div class=\"content-div hide\" id=\"eventLogDiv\">\n    <div class=\"col-md-12\" style=\"margin-top: -5vh\">\n\n      <div class=\"card\" style=\"height: 85vh\">\n        <div class=\"card-content\">\n          <div class=\"col-md-5\" style=\"border-right: solid;border-right-color: lightgrey\">\n            <form [formGroup]=\"generalReportForm\">\n              <div class=\"row\">\n                <div><span style=\"font-weight: bold; font-size: 18px;\" class=\"pull-left\">Event Log</span></div>\n                <div class=\"col-md-12 \">\n                  <div class=\"col-md-3 text-right\" style=\"margin-top: 3vh\">\n                    <span>Date Range</span>\n                  </div>\n                  <div class=\"col-md-9 \">\n                    <div class=\"col-md-5\">\n                      <md-input-container><input mdInput formControlName=\"name\"\n                                                 type=\"text\"></md-input-container>\n                    </div>\n                    <div class=\"col-md-2\" style=\"margin-top: 3vh\">To</div>\n                    <div class=\"col-md-5\">\n                      <md-input-container><input mdInput formControlName=\"name\"\n                                                 type=\"text\"></md-input-container>\n                    </div>\n\n                  </div>\n                </div>\n                <div class=\"col-md-12 \">\n                  <div class=\"col-md-3 text-right\" style=\"margin-top: 3vh\">\n                    <span>User Name</span>\n                  </div>\n                  <div class=\"col-md-9 \">\n                    <md-input-container><input mdInput formControlName=\"name\"\n                                               type=\"text\"></md-input-container>\n                  </div>\n                </div>\n                <div class=\"col-md-12 \">\n                  <div class=\"col-md-3 text-right\" style=\"margin-top: 3vh\">\n                    <span>Employee ID</span>\n                  </div>\n                  <div class=\"col-md-9 \">\n                    <md-input-container><input mdInput formControlName=\"name\"\n                                               type=\"text\"></md-input-container>\n                  </div>\n                </div>\n\n\n                <div class=\"col-md-12 \">\n                  <div class=\"col-md-3 text-right\" style=\"margin-top: 3vh\">\n                    <span>Target Queue</span>\n                  </div>\n                  <div class=\"col-md-9 \">\n                    <md-input-container><input mdInput formControlName=\"name\"\n                                               type=\"text\"></md-input-container>\n                  </div>\n                </div>\n                <div class=\"col-md-12 \">\n                  <div class=\"col-md-3 text-right\" style=\"margin-top: 3vh\">\n                    <span>Modified Entity</span>\n                  </div>\n                  <div class=\"col-md-9 \">\n                    <md-input-container><input mdInput formControlName=\"name\"\n                                               type=\"text\"></md-input-container>\n                  </div>\n                </div>\n                <div class=\"col-md-12 \">\n                  <div class=\"col-md-3 text-right\" style=\"margin-top: 3vh\">\n                    <span>Events</span>\n                  </div>\n                  <div class=\"col-md-9 \">\n                    <md-input-container><input mdInput formControlName=\"name\"\n                                               type=\"text\"></md-input-container>\n                  </div>\n                </div>\n                <div class=\"col-md-12 \">\n                  <div class=\"col-md-3 text-right\" style=\"margin-top: 3vh\">\n                    <span>Access Levels</span>\n                  </div>\n                  <div class=\"col-md-9 \">\n                    <md-input-container><input mdInput formControlName=\"name\"\n                                               type=\"text\"></md-input-container>\n                  </div>\n                </div>\n\n                <div class=\"col-md-12 \">\n                  <div class=\"col-md-6\">\n                    <button type=\"submit\" class=\"btn btn-primary pull-right\">\n                      Clear All\n                    </button>\n                  </div>\n                  <div class=\"col-md-6\">\n                    <button type=\"submit\" class=\"btn btn-primary pull-left\">\n                      Search\n                    </button>\n                    <div class=\"clearfix\"></div>\n                  </div>\n                </div>\n              </div>\n\n            </form>\n\n          </div>\n          <div class=\"col-md-7\">\n            <ag-grid-table-cmp></ag-grid-table-cmp>\n          </div>\n        </div>\n      </div>\n\n    </div>\n  </div>\n</div>\n"

/***/ }),

/***/ 696:
/***/ (function(module, exports) {

module.exports = "<div class=\"main-content\">\r\n    <div class=\"myDialog\">\r\n        <h2 md-dialog-title>{{title}}</h2>\r\n        <div md-dialog-content>\r\n            <div>\r\n                <form [formGroup]=\"roleForm\"  novalidate>\r\n                    <!-- we will place our fields here -->\r\n                    <div  class=\"form-group\">\r\n                        <input  type=\"hidden\" formControlName=\"id\" name=\"id\" class=\"form-control\" >\r\n                        <input  type=\"hidden\" formControlName= \"oldParent\" name=\"oldParent\" class=\"form-control\" >\r\n                      <input  type=\"hidden\" formControlName= \"companyId\" name=\"companyId\" class=\"form-control\" >\r\n                        <label>Name</label>\r\n                        <!--bind name to ngModel, it's required with minimum 5 characters-->\r\n                        <input  type=\"text\" formControlName=\"roleName\" name=\"roleName\" class=\"form-control\" >\r\n                        <!--show error only when field is not valid & it's dirty or form submited-->\r\n\r\n                        <small *ngIf=\"roleForm.controls.roleName.errors && (roleForm.controls.roleName.dirty || roleForm.controls.roleName.touched)\">\r\n                             <small [hidden]=\"!roleForm.controls.roleName.errors.required\" class=\"text-danger\">\r\n                                 Name is required\r\n                             </small>\r\n\r\n                              <small [hidden]=\"!roleForm.controls.roleName.errors.roleAvailable\" class=\"text-danger\">\r\n                                  Duplicate role name\r\n                             </small>\r\n                        </small>\r\n                    </div>\r\n\r\n                    <div class=\"form-group\">\r\n                        <label>Parent Role</label>\r\n                        <md-select  [(ngModel)]=\"parentRoleId\" formControlName=\"parentRole\" class=\"form-control\">\r\n                            <md-option *ngFor=\"let role of parentRoles\" [value]=\"role.id\">{{ role.roleName }}</md-option>\r\n                        </md-select>\r\n                    </div>\r\n\r\n                    <button md-button [disabled]=\"!roleForm.valid\" type=\"submit\" (click)=\"dialogRef.close(roleForm.value)\">{{actionButton}}</button>\r\n                    <button md-button type=\"button\" (click)=\"dialogRef.close(null)\">Cancel</button>\r\n                </form>\r\n            </div>\r\n\r\n        </div>\r\n        <div md-dialog-actions>\r\n\r\n        </div>\r\n    </div>\r\n<div class=\"main-content\">\r\n"

/***/ }),

/***/ 697:
/***/ (function(module, exports) {

module.exports = "<div class=\"main-content access-control\">\r\n\r\n\t<div class=\"row\">\r\n\t\t<div class=\"col-md-5\">\r\n\t\t\t<div class=\"card\">\r\n\t\t\t\t<div class=\"card-header\" data-background-color=\"purple\">\r\n\t\t\t\t\t<h4 class=\"title\">Role</h4>\r\n\t\t\t\t</div>\r\n\t\t\t\t<div class=\"card-content\">\r\n\t\t\t\t\t<tree-root #tree [focused]=\"true\" [nodes]=\"roleNodes\"\r\n\t\t\t\t\t\t(moveNode)=\"roleMoveNode($event)\" [options]=\"options\"\r\n\t\t\t\t\t\t(activate)=\"treeclickEvent($event)\"> </tree-root>\r\n\t\t\t\t</div>\r\n\t\t\t\t<div class=\"card-footer\" *ngIf=\"customValidationService.isPermissionAvailable('ROLE_EDIT')\">\r\n\r\n\t\t\t\t\t<button *ngIf=\"showAddRoleButton\" (click)=\"addRole()\"\r\n\t\t\t\t\t\tclass=\" btn btn-primary pull-right\">Add Role</button>\r\n\r\n\t\t\t\t\t<button *ngIf=\"showEditButton\" (click)=\"editRole()\"\r\n\t\t\t\t\t\tclass=\" btn btn-primary pull-right\">Edit Role</button>\r\n\r\n\t\t\t\t\t<button *ngIf=\"showEditButton\" (click)=\"deleteRole()\"\r\n\t\t\t\t\t\tclass=\" btn btn-primary pull-right\">Remove Role</button>\r\n\t\t\t\t</div>\r\n\t\t\t</div>\r\n\t\t</div>\r\n\t\t<div class=\"col-md-7\">\r\n\t\t\t<div class=\"card\">\r\n\t\t\t\t<div class=\"card-header\" data-background-color=\"purple\">\r\n\t\t\t\t\t<h4 class=\"title\">Permission</h4>\r\n\t\t\t\t</div>\r\n\t\t\t\t<div class=\" \">\r\n\t\t\t\t\t<ngx-treeview [config]=\"config\" [items]=\"items\"\r\n\t\t\t\t\t\t(selectedChange)=\"selectedChange($event)\"> </ngx-treeview>\r\n\t\t\t\t</div>\r\n\t\t\t</div>\r\n\t\t</div>\r\n\t</div>\r\n\r\n</div>\r\n"

/***/ }),

/***/ 698:
/***/ (function(module, exports) {

module.exports = "<div class=\"main-content\">\r\n  <div class=\"myDialog\">\r\n    <h2 md-dialog-title>{{title}}</h2>\r\n    <div md-dialog-content>\r\n      <div>\r\n        <form [formGroup]=\"categoryForm\" novalidate\r\n              (ngSubmit)=\"categoryForm.valid && categorySave(categoryForm.value, categoryForm.valid)\" novalidate>\r\n          <!-- we will place our fields here -->\r\n          <div class=\"form-group\">\r\n            <input type=\"hidden\" formControlName=\"id\" name=\"id\" class=\"form-control\">\r\n            <input type=\"hidden\" formControlName=\"companyId\" name=\"company\" class=\"form-control\">\r\n            <input type=\"hidden\" formControlName=\"orderId\" name=\"orderId\" class=\"form-control\">\r\n            <label>Name</label>\r\n            <!--bind name to ngModel, it's required with minimum 5 characters-->\r\n            <input type=\"text\" formControlName=\"name\" name=\"name\" class=\"form-control\">\r\n            <!--show error only when field is not valid & it's dirty or form submited-->\r\n\r\n            <small\r\n              *ngIf=\"categoryForm.controls.name.errors && (categoryForm.controls.name.dirty || categoryForm.controls.name.touched)\">\r\n              <small [hidden]=\"!categoryForm.controls.name.errors.required\" class=\"text-danger\">\r\n                Name is required\r\n              </small>\r\n\r\n              <small [hidden]=\"!categoryForm.controls.name.errors.categoryAvailable\" class=\"text-danger\">\r\n                duplicate category name\r\n              </small>\r\n            </small>\r\n          </div>\r\n\r\n          <!--adrress group-->\r\n          <div class=\"form-group\">\r\n            <!--street-->\r\n            <div>\r\n              <label>Abbreviation</label>\r\n              <input type=\"text\" formControlName=\"abbreviation\" name=\"abbreviation\" class=\"form-control\">\r\n              <small *ngIf=\"categoryForm.controls.abbreviation.errors\">\r\n                <small [hidden]=\"!categoryForm.controls.abbreviation.errors.abbreviationAvailable\" class=\"text-danger\">\r\n                  duplicate abbreviation\r\n                </small>\r\n              </small>\r\n            </div>\r\n          </div>\r\n          <button md-button [disabled]=\"!categoryForm.valid\" type=\"submit\"\r\n                  (click)=\"dialogRef.close(categoryForm.value)\">{{actionButton}}\r\n          </button>\r\n          <button md-button type=\"button\" (click)=\"dialogRef.close(null)\">Cancel</button>\r\n        </form>\r\n      </div>\r\n\r\n    </div>\r\n    <div md-dialog-actions>\r\n\r\n    </div>\r\n  </div>\r\n  <div class=\"main-content\">\r\n"

/***/ }),

/***/ 699:
/***/ (function(module, exports) {

module.exports = "<div class=\"main-content category-grade\">\r\n\r\n\t<div class=\"row\">\r\n\t\t<div class=\"col-md-12\">\r\n\t\t\t<div class=\"card\">\r\n\t\t\t\t<div class=\"card-header\" data-background-color=\"purple\">\r\n\t\t\t\t\t<h4 class=\"title\">Category and Grade</h4>\r\n\t\t\t\t</div>\r\n\t\t\t\t<div class=\"card-content\">\r\n\t\t\t\t\t<tree-root #tree [focused]=\"true\" [nodes]=\"nodes\"\r\n\t\t\t\t\t\t[options]=\"options\" (moveNode)=\"moveNode($event)\"\r\n\t\t\t\t\t\t(activate)=\"treeclickEvent($event)\"> </tree-root>\r\n\t\t\t\t</div>\r\n\t\t\t\t<div class=\"card-footer\" *ngIf=\"customValid.isPermissionAvailable('CATEGORY_EDIT')\">\r\n\r\n\t\t\t\t\t<button *ngIf=\"selectedId == '0'\" (click)=\"addCategory()\"\r\n\t\t\t\t\t\tclass=\"btn btn-primary pull-right\">Add Category</button>\r\n\r\n\t\t\t\t\t<button *ngIf=\"selectedId > '0' && isCategorySelected\"\r\n\t\t\t\t\t\t(click)=\"addGrade()\" class=\"btn btn-primary pull-right\">Add\r\n\t\t\t\t\t\tGrade</button>\r\n\r\n\t\t\t\t\t<button *ngIf=\"selectedId > '0' && isCategorySelected\"\r\n\t\t\t\t\t\t(click)=\"editCategory()\" class=\"btn btn-primary pull-right\">Edit\r\n\t\t\t\t\t\tCategory</button>\r\n\r\n\t\t\t\t\t<button *ngIf=\"selectedId > '0' && isCategorySelected\"\r\n\t\t\t\t\t\t(click)=\"removeCategory()\" class=\"btn btn-primary pull-right\">Remove\r\n\t\t\t\t\t\tCategory</button>\r\n\r\n\t\t\t\t\t<button *ngIf=\"selectedId > '0' && !isCategorySelected\"\r\n\t\t\t\t\t\t(click)=\"editGrade()\" class=\"btn btn-primary pull-right\">Edit Grade</button>\r\n\r\n\t\t\t\t\t<button *ngIf=\"selectedId > '0' && !isCategorySelected\"\r\n\t\t\t\t\t\t(click)=\"removeGrade()\" class=\"btn btn-primary pull-right\">Remove\r\n\t\t\t\t\t\tGrade</button>\r\n\t\t\t\t</div>\r\n\t\t\t</div>\r\n\t\t</div>\r\n\t</div>\r\n</div>\r\n"

/***/ }),

/***/ 700:
/***/ (function(module, exports) {

module.exports = "<div class=\"main-content\">\r\n    <div class=\"myDialog\">\r\n        <h2 md-dialog-title>{{title}}</h2>\r\n        <div md-dialog-content>\r\n            <div>\r\n                <form [formGroup]=\"gradeForm\"   novalidate>\r\n                    <!-- we will place our fields here -->\r\n                    <div  class=\"form-group\">\r\n                        <input  type=\"hidden\" formControlName=\"id\" name=\"id\" class=\"form-control\" >\r\n                        <label>Name</label>\r\n                        <!--bind name to ngModel, it's required with minimum 5 characters-->\r\n                        <input  type=\"text\" formControlName=\"name\" name=\"name\" class=\"form-control\" >\r\n                        <!--show error only when field is not valid & it's dirty or form submited-->\r\n                        \r\n                        <small *ngIf=\"gradeForm.controls.name.errors && (gradeForm.controls.name.dirty || gradeForm.controls.name.touched)\">\r\n                             <small [hidden]=\"!gradeForm.controls.name.errors.required\" class=\"text-danger\">\r\n                                 Name is required\r\n                             </small>\r\n\r\n                              <small [hidden]=\"!gradeForm.controls.name.errors.gradeAvailable\" class=\"text-danger\">\r\n                                  duplicate category name\r\n                             </small>\r\n                        </small>\r\n                    </div>\r\n                    <!--adrress group-->\r\n                    <div class=\"form-group\">\r\n                        <!--street-->\r\n                        <div>\r\n                            <label>Abbreviation</label>\r\n                            <input type=\"text\" formControlName=\"abbreviation\" name=\"abbreviation\" class=\"form-control\" >\r\n                             <small *ngIf=\"gradeForm.controls.abbreviation.errors\">\r\n                                    <small [hidden]=\"!gradeForm.controls.abbreviation.errors.abbreviationAvailable\" class=\"text-danger\">\r\n                                       duplicate abbreviation\r\n                                    </small>\r\n                             </small>\r\n                        </div>\r\n                    </div>\r\n                    <div class=\"form-group\">\r\n                        <label>Category</label>\r\n                        <md-select  [(ngModel)]=\"categoryId\" formControlName=\"category\" class=\"form-control\">\r\n                            <md-option *ngFor=\"let category of categories\" [value]=\"category.id\">{{ category.name }}</md-option>\r\n                        </md-select>\r\n                    </div>\r\n                    <button md-button [disabled]=\"!gradeForm.valid\" type=\"submit\" (click)=\"dialogRef.close(gradeForm.value)\">{{actionButton}}</button>\r\n                    <button md-button type=\"button\" (click)=\"dialogRef.close(null)\">Cancel</button>\r\n                </form>\r\n            </div>\r\n\r\n        </div>\r\n        <div md-dialog-actions>\r\n           \r\n        </div>\r\n    </div>\r\n<div class=\"main-content\">"

/***/ }),

/***/ 701:
/***/ (function(module, exports) {

module.exports = "<div class=\"main-content employee-status-config\">\n    <div class=\"row\">\n\t\t<div class=\"col-md-12\">\n\t\t\t<div class=\"card\">\n\t\t\t\t<div class=\"card-header\" data-background-color=\"purple\">\n\t\t\t\t\t<h4 class=\"title\">Employee Status</h4>\n\t\t\t\t</div>\n\t\t\t\t<div class=\"card-content\">\n\t\t\t\t\t<div style=\"margin-left:10px; margin-bottom:10px\" *ngIf=\"customValidation.isPermissionAvailable('EMPLOYEE_STATUS_EDIT')\">\n\t\t\t\t\t\t<button md-button (click)=\"addNewEmployeeStatus()\" style=\"margin-right: 10px\"\n\t\t\t\t\t\t\t\t\tclass=\"btn btn-info pull-right\">Add Employee Status</button>\n\t\t\t\t\t</div>\n\t\t\t\t\t<ag-grid-table-cmp ></ag-grid-table-cmp>\n\n\t\t\t\t</div>\n\t\t\t</div>\n\n\t\t</div>\n\t</div>\n</div>\n"

/***/ }),

/***/ 702:
/***/ (function(module, exports) {

module.exports = "<div class=\"employeeStatusDialog\">\r\n        <h2 md-dialog-title>{{title}}</h2>\r\n        <div md-dialog-content>\r\n            <div>\r\n                <form [formGroup]=\"empStatusForm\"  novalidate (ngSubmit)=\"empStatusForm.valid\" novalidate>\r\n                    <!-- we will place our fields here -->\r\n                    <div  class=\"form-group\">\r\n                        <input  type=\"hidden\" formControlName=\"id\" name=\"id\" class=\"form-control\" >\r\n                        <label>Name</label>\r\n                        <!--bind name to ngModel, it's required with minimum 5 characters-->\r\n                        <input  type=\"text\" formControlName=\"name\" name=\"name\" class=\"form-control\" >\r\n                        <!--show error only when field is not valid & it's dirty or form submited-->\r\n                        \r\n                        <small *ngIf=\"empStatusForm.controls.name.errors && (empStatusForm.controls.name.dirty || empStatusForm.controls.name.touched)\">\r\n                             <small [hidden]=\"!empStatusForm.controls.name.errors.required\" class=\"text-danger\">\r\n                                 Name is required\r\n                             </small>\r\n\r\n                              <small [hidden]=\"!empStatusForm.controls.name.errors.exist\" class=\"text-danger\">\r\n                                  Duplicate Employee Status name\r\n                             </small>\r\n                        </small>\r\n                    </div>\r\n\r\n                    <!--adrress group-->\r\n                    <div class=\"form-group\">\r\n                        <!--street-->\r\n                        <div>\r\n                            <label>Abbreviation</label>\r\n                            <input type=\"text\" formControlName=\"abbreviation\" name=\"abbreviation\" class=\"form-control\" >\r\n                             <small *ngIf=\"empStatusForm.controls.abbreviation.errors\">\r\n                                    <small [hidden]=\"!empStatusForm.controls.abbreviation.errors.exist\" class=\"text-danger\">\r\n                                       Duplicate abbreviation\r\n                                    </small>\r\n                             </small>\r\n                        </div>\r\n                    </div>\r\n\r\n                    <div class=\"form-group\">\r\n                        <label>Employee Status Type</label>\r\n                        <md-select  [(ngModel)]=\"employeeStatusTypeId\" formControlName=\"employeeStatusType\" class=\"form-control\">\r\n                            <md-option *ngFor=\"let employeeStatusTypeTmp of employeeStatusTypes ; let i = index\" [value]=\"i\">{{ employeeStatusTypeTmp }}</md-option>\r\n                        </md-select>\r\n                    </div>\r\n                    <button md-button [disabled]=\"!empStatusForm.valid\" type=\"submit\" (click)=\"dialogRef.close(empStatusForm.value)\">{{actionButton}}</button>\r\n                    <button md-button type=\"button\" (click)=\"dialogRef.close(null)\">Cancel</button>\r\n                </form>\r\n            </div>\r\n\r\n        </div>\r\n        <div md-dialog-actions>\r\n           \r\n        </div>\r\n</div>"

/***/ }),

/***/ 703:
/***/ (function(module, exports) {

module.exports = "<div class=\"main-content general-setting\">\n\n  <div class=\"row\">\n    <div class=\"col-md-12\">\n      <div class=\"card\">\n        <div class=\"card-header\" data-background-color=\"purple\">\n          <h4 class=\"title\">Company Profile</h4>\n        </div>\n        <div class=\"card-content\">\n          <div class=\"row\">\n            <div class=\"col-md-3\">\n              <img src=\"assets/img/faces/marc.jpg\" alt=\"Rounded Image\"\n                   class=\"img-rounded img-responsive\">\n              <div class=\"dis-button-center-div\">\n                <button md-button>Change Logo</button>\n              </div>\n\n            </div>\n            <div class=\"col-md-9\">\n              <form [formGroup]=\"companyForm\">\n                <div class=\"form-group\">\n\n                  <div class=\"row\">\n                    <div class=\"col-md-8\">\n                      <md-input-container>\n                        <input mdInput formControlName=\"name\" name=\"name\" required type=\"text\" focused>\n                        <md-placeholder>Company</md-placeholder>\n                      </md-input-container>\n                    </div>\n                    <div class=\"col-md-4\">\n                      <md-select formControlName=\"timeZone\" class=\"form-control\" placeholder=\"Time Zone\">\n                        <md-option *ngFor=\"let zone of timeZones\" [value]=\"zone.id\">{{\"GMT \"+zone.offset+\"\n                          \"+zone.country }}\n                        </md-option>\n                      </md-select>\n\n                      <input type=\"hidden\" name=\"id\" formControlName=\"id\" class=\"form-control\">\n                    </div>\n                  </div>\n                </div>\n\n                <div class=\"form-group\">\n\n                  <div class=\"row\">\n                    <div class=\"col-md-8\">\n                      <md-input-container>\n                        <input mdInput name=\"address\" formControlName=\"address\" placeholder=\"Address\" required\n                               type=\"text\">\n                      </md-input-container>\n                    </div>\n                    <div class=\"col-md-4\">\n                      <md-select name=\"timeFormat\" formControlName=\"timeFormat\" placeholder=\"Time Format\">\n                        <md-option [value]=\"12\">12</md-option>\n                        <md-option [value]=\"24\">24</md-option>\n                      </md-select>\n\n                    </div>\n                  </div>\n                </div>\n\n                <div class=\"form-group\">\n                  <div class=\"row\">\n\n                    <div class=\"col-md-8\">\n                      <md-input-container>\n                        <input mdInput name=\"phoneNo\" formControlName=\"phoneNo\" placeholder=\"Phone No\" required\n                               type=\"text\">\n                      </md-input-container>\n                    </div>\n                    <div class=\"col-md-4\">\n                      <md-select name=\"weekStartDay\" formControlName=\"weekStartDay\" placeholder=\"Week Start Day\">\n                        <md-option *ngFor=\"let day of weekDays\" [value]=\"day\">{{day|translate}}</md-option>\n                      </md-select>\n\n                    </div>\n                  </div>\n                </div>\n                <div class=\"form-group\">\n\n                  <div class=\"row\">\n                    <div class=\"col-md-4\">\n                      <md-input-container>\n                        <input mdInput name=\"licenseNo\" formControlName=\"licenseNo\" placeholder=\"License Number\"\n                               disabled type=\"text\">\n                      </md-input-container>\n                    </div>\n                    <div class=\"col-md-4\">\n                      <md-input-container><input\n                        mdInput [mdDatepicker]=\"validdate\" name=\"validDate\" formControlName=\"validDate\"\n                        placeholder=\"Valid Date\">\n                        <button mdSuffix [mdDatepickerToggle]=\"validdate\"></button>\n                      </md-input-container>\n                      <md-datepicker #validdate></md-datepicker>\n                    </div>\n                    <div class=\"col-md-4\">\n                      <md-input-container>\n                        <input mdInput name=\"operationalHours\" formControlName=\"operationalHours\"\n                               placeholder=\"Operational Hours\" required type=\"text\">\n                      </md-input-container>\n                    </div>\n                  </div>\n                </div>\n                <div>\n                  <button type=\"submit\" (click)=\"saveCompany(companyForm.value)\" class=\"btn btn-primary pull-right\">\n                    Update\n                    Profile\n                  </button>\n                  <div class=\"clearfix\"></div>\n\n                </div>\n\n\n              </form>\n\n            </div>\n\n\n          </div>\n\n        </div>\n      </div>\n\n    </div>\n  </div>\n  <div class=\"row\">\n    <div class=\"col-md-4\">\n      <div class=\"card\">\n        <div class=\"card-header\" data-background-color=\"purple\">\n          <h4 class=\"title\">Employees Attributes</h4>\n        </div>\n        <div class=\"card-content table-responsive\">\n          <table class=\"table\">\n            <tbody *ngFor=\"let tab of employeeAttributes\">\n            <tr>\n              <td>{{tab.title}}</td>\n              <td class=\"td-actions pull-right\">\n                <a href=\"#/{{tab.path}}\">\n                <button type=\"button\" rel=\"tooltip\" title=\"\"\n                        class=\"btn btn-primary btn-simple btn-xs\"\n                        data-original-title=\"Edit Task\">\n                  <i class=\"material-icons\">dvr</i>\n                </button>\n                </a>\n              </td>\n            </tr>\n\n            </tbody>\n          </table>\n\n\n        </div>\n      </div>\n    </div>\n\n    <div class=\"col-md-4\">\n      <div class=\"card\">\n        <div class=\"card-header\" data-background-color=\"purple\">\n          <h4 class=\"title\">Job Queue Management</h4>\n        </div>\n        <div class=\"card-content table-responsive\">\n          <table class=\"table\">\n            <tbody *ngFor=\"let queueTab of jobQueueAttributes\">\n            <tr>\n              <td>{{queueTab.title}}</td>\n              <td class=\"td-actions pull-right\">\n                <a href=\"#/{{queueTab.path}}\">\n                <button type=\"button\" rel=\"tooltip\" title=\"\"\n                        class=\"btn btn-primary btn-simple btn-xs\"\n                        data-original-title=\"Edit Task\">\n                  <i class=\"material-icons\">dvr</i>\n                </button>\n                </a>\n              </td>\n            </tr>\n\n            </tbody>\n          </table>\n\n\n        </div>\n      </div>\n    </div>\n    <div class=\"col-md-4\">\n      <div class=\"card\">\n        <div class=\"card-header\" data-background-color=\"purple\">\n          <h4 class=\"title\">System Configuration</h4>\n        </div>\n        <div class=\"card-content table-responsive\">\n          <table class=\"table\">\n            <tbody *ngFor=\"let sysTab of systemConfiguration\">\n            <tr>\n              <td>{{sysTab.title}}</td>\n              <td class=\"td-actions pull-right\">\n                <a href=\"#/{{sysTab.path}}\">\n                  <button type=\"button\" rel=\"tooltip\" title=\"\"\n                          class=\"btn btn-primary btn-simple btn-xs\"\n                          data-original-title=\"Edit Task\">\n                    <i class=\"material-icons\">dvr</i>\n                  </button>\n                </a>\n              </td>\n            </tr>\n\n            </tbody>\n          </table>\n\n\n        </div>\n      </div>\n    </div>\n  </div>\n</div>\n"

/***/ }),

/***/ 704:
/***/ (function(module, exports) {

module.exports = "<div class=\"main-content\">\r\n\r\n    <unitHierarchy-cmp  [levelType]=\"levelType\"> </unitHierarchy-cmp>\r\n\r\n</div>"

/***/ }),

/***/ 705:
/***/ (function(module, exports) {

module.exports = "<div class=\"main-content\">\r\n    <div class=\"row\">\r\n\t\t<div class=\"col-md-12\">\r\n\t\t\t<div class=\"card\">\r\n\t\t\t\t<div class=\"card-header\" data-background-color=\"purple\">\r\n\t\t\t\t\t<h4 class=\"title\">{{levelTitle}}</h4>\r\n\t\t\t\t</div>\r\n\t\t\t\t<div class=\"card-content\">\r\n\t\t\t\t\t<div style=\"margin-left:10px; margin-bottom:10px\">\r\n\t\t\t\t\t\t<button md-button (click)=\"addNewLevel()\" style=\"margin-right: 10px\"\r\n\t\t\t\t\t\t\t\t\tclass=\"btn btn-info pull-right\">Add Level</button>\r\n\t\t\t\t\t</div>\r\n\t\t\t\t\t<ag-grid-table-cmp ></ag-grid-table-cmp>\r\n\t\t\t\t\t\r\n\t\t\t\t</div>\r\n\t\t\t</div>\r\n\r\n\t\t</div>\r\n\t</div>\r\n</div>"

/***/ }),

/***/ 706:
/***/ (function(module, exports) {

module.exports = "<div class=\"main-content\">\r\n    <div class=\"myDialog\">\r\n        <h2 md-dialog-title>{{title}}</h2>\r\n        <div md-dialog-content>\r\n            <div>\r\n                <form [formGroup]=\"unitLevelForm\"   novalidate>\r\n                    <!-- we will place our fields here -->\r\n                    <div  class=\"form-group\">\r\n                        <input  type=\"hidden\" formControlName=\"id\" name=\"id\" class=\"form-control\" >\r\n                    <!--  <input  type=\"hidden\" formControlName=\"companyId\" name=\"companyId\" class=\"form-control\" > -->\r\n                        <label>Name</label>\r\n                        <!--bind name to ngModel, it's required with minimum 5 characters-->\r\n                        <input  type=\"text\" formControlName=\"name\" name=\"name\" class=\"form-control\" >\r\n                        <!--show error only when field is not valid & it's dirty or form submited-->\r\n\r\n                        <small *ngIf=\"unitLevelForm.controls.name.errors && (unitLevelForm.controls.name.dirty || unitLevelForm.controls.name.touched)\">\r\n                             <small [hidden]=\"!unitLevelForm.controls.name.errors.required\" class=\"text-danger\">\r\n                                 Name is required\r\n                             </small>\r\n\r\n                              <small [hidden]=\"!unitLevelForm.controls.name.errors.exist\" class=\"text-danger\">\r\n                                  duplicate unitLevel name\r\n                             </small>\r\n                        </small>\r\n                    </div>\r\n                    <!--adrress group-->\r\n                    <div class=\"form-group\">\r\n                        <!--street-->\r\n                        <div>\r\n                            <label>Abbreviation</label>\r\n                            <input type=\"text\" formControlName=\"abbreviation\" name=\"abbreviation\" class=\"form-control\" >\r\n                             <small *ngIf=\"unitLevelForm.controls.abbreviation.errors\">\r\n                                    <small [hidden]=\"!unitLevelForm.controls.abbreviation.errors.exist\" class=\"text-danger\">\r\n                                       duplicate abbreviation\r\n                                    </small>\r\n                             </small>\r\n                        </div>\r\n                    </div>\r\n\r\n                    <button md-button [disabled]=\"!unitLevelForm.valid\" type=\"submit\" (click)=\"dialogRef.close(unitLevelForm.value)\">{{actionButton}}</button>\r\n                    <button md-button type=\"button\" (click)=\"dialogRef.close(null)\">Cancel</button>\r\n                </form>\r\n            </div>\r\n\r\n        </div>\r\n        <div md-dialog-actions>\r\n\r\n        </div>\r\n    </div>\r\n<div class=\"main-content\">\r\n"

/***/ }),

/***/ 707:
/***/ (function(module, exports) {

module.exports = "<div class=\"main-content\">\r\n    <div class=\"row\">\r\n\t\t<div class=\"col-md-12\">\r\n\t\t\t<div class=\"card\">\r\n\t\t\t\t<div class=\"card-header\" data-background-color=\"purple\">\r\n\t\t\t\t\t<h4 class=\"title\">Job Status Configurations</h4>\r\n\t\t\t\t</div>\r\n\t\t\t\t<div class=\"card-content\">\r\n\t\t\t\t\t<div style=\"margin-left:10px; margin-bottom:10px\" *ngIf=\"customValidation.isPermissionAvailable('JOB_STATUS_EDIT')\">\r\n\t\t\t\t\t\t<button md-button (click)=\"addNewJobStatus()\" style=\"margin-right: 10px\"\r\n\t\t\t\t\t\t\t\t\tclass=\"btn btn-info pull-right\">Add Job Status</button>\r\n\t\t\t\t\t</div>\r\n\t\t\t\t\t <ag-grid-table-cmp ></ag-grid-table-cmp>\r\n\r\n\t\t\t\t</div>\r\n\t\t\t</div>\r\n\r\n\t\t</div>\r\n\t</div>\r\n</div>\r\n"

/***/ }),

/***/ 708:
/***/ (function(module, exports) {

module.exports = "<div class=\"main-content\">\r\n    <div class=\"myDialog\">\r\n        <h2 md-dialog-title>{{title}}</h2>\r\n        <div md-dialog-content>\r\n            <div>\r\n                <form [formGroup]=\"jobStatusForm\" novalidate>\r\n                    <!-- we will place our fields here -->\r\n                    <div class=\"form-group\">\r\n                        <input type=\"hidden\" formControlName=\"id\" name=\"id\" class=\"form-control\">\r\n\r\n                        <label>Name</label>\r\n                        <!--bind name to ngModel, it's required with minimum 5 characters-->\r\n                        <input type=\"text\" formControlName=\"jobStatusName\" name=\"jobStatusName\" class=\"form-control\">\r\n                        <!--show error only when field is not valid & it's dirty or form submited-->\r\n\r\n                        <small *ngIf=\"jobStatusForm.controls.jobStatusName.errors && (jobStatusForm.controls.jobStatusName.dirty || jobStatusForm.controls.jobStatusName.touched)\">\r\n                             <small [hidden]=\"!jobStatusForm.controls.jobStatusName.errors.required\" class=\"text-danger\">\r\n                                 Name is required\r\n                             </small>\r\n                        </small>\r\n                    </div>\r\n                    <!--adrress group-->\r\n                    <div class=\"form-group\">\r\n                        <!--street-->\r\n                        <div>\r\n                            <label>Abbreviation</label>\r\n                            <input type=\"text\" formControlName=\"abbreviation\" name=\"abbreviation\" class=\"form-control\">\r\n                            <small *ngIf=\"jobStatusForm.controls.abbreviation.errors\">\r\n                                    <small [hidden]=\"!jobStatusForm.controls.abbreviation.errors.abbreviationAvailable\" class=\"text-danger\">\r\n                                       duplicate abbreviation\r\n                                    </small>\r\n                            </small>\r\n                        </div>\r\n                    </div>\r\n\r\n                    <div class=\"form-group\">\r\n                        <label>Job Status Type</label>\r\n                        <md-select [(ngModel)]=\"jobStatusKey\" formControlName=\"jobStatusType\" class=\"form-control\">\r\n                            <md-option *ngFor=\"let key of keys\" [value]=\"jobStatus[key]\"> {{jobStatus[key]}}</md-option>\r\n                        </md-select>\r\n                         <small *ngIf=\"jobStatusForm.controls.jobStatusType.errors  && (jobStatusForm.controls.jobStatusType.dirty || jobStatusForm.controls.jobStatusType.touched)\">\r\n                            <small [hidden]=\"!jobStatusForm.controls.jobStatusType.errors.required\" class=\"text-danger\">\r\n                                 Type is required\r\n                            </small>\r\n                         </small>\r\n                    </div>\r\n\r\n\r\n                    <button md-button [disabled]=\"!jobStatusForm.valid\" type=\"submit\" (click)=\"dialogRef.close(jobStatusForm.value)\">{{actionButton}}</button>\r\n                    <button md-button type=\"button\" (click)=\"dialogRef.close(null)\">Cancel</button>\r\n                </form>\r\n            </div>\r\n\r\n        </div>\r\n        <div md-dialog-actions>\r\n\r\n        </div>\r\n    </div>\r\n    <div class=\"main-content\">\r\n"

/***/ }),

/***/ 709:
/***/ (function(module, exports) {

module.exports = "<div class=\"main-content\">\r\n  <div class=\"card\" style=\"padding: 2vh\">\r\n    <div class=\"card-content\">\r\n      <div class=\"col-md-12\">\r\n        <!--<a class=\"md-button\"  href=\"#/location\" style=\"margin-right: 10px\"\r\n           class=\"btn btn-info pull-left\">Back</a>-->\r\n        <div class=\"col-md-3\">\r\n          <h5 style=\"float: left\">Staff By location</h5>\r\n        </div>\r\n        <div class=\"col-md-9\">\r\n          <div class=\"col-md-2\">\r\n            <div class=\"col-md-3\"\r\n                 style=\"background-color: orangered;padding:5px;height: 3vh;border-radius:5px;width: 3vh\">\r\n\r\n            </div>\r\n            <div class=\"col-md-9\" style=\"margin-top: 1px\">\r\n              Available\r\n            </div>\r\n          </div>\r\n          <div class=\"col-md-2\">\r\n            <div class=\"col-md-3\" style=\"background-color: orange;padding:5px;height: 3vh;border-radius:5px;width: 3vh\">\r\n\r\n            </div>\r\n            <div class=\"col-md-9\" style=\"margin-top: 1px\">\r\n              Cleaning\r\n            </div>\r\n          </div>\r\n          <div class=\"col-md-2\" style=\"width: 20%\">\r\n            <div class=\"col-md-3\" style=\"background-color: green;padding:5px;height: 3vh;border-radius:5px;width: 3vh\">\r\n\r\n            </div>\r\n            <div class=\"col-md-9\" style=\"margin-top: 1px;padding: 3px\">\r\n              Job Assigned\r\n            </div>\r\n          </div>\r\n          <div class=\"col-md-2\">\r\n            <div class=\"col-md-3\"\r\n                 style=\"background-color: deepskyblue;padding:5px;height: 3vh;border-radius:5px;width: 3vh\">\r\n\r\n            </div>\r\n            <div class=\"col-md-9\" style=\"margin-top: 1px;padding: 3px\">\r\n              On Break\r\n            </div>\r\n          </div>\r\n          <div class=\"col-md-3\">\r\n            <!--<md-select name=\"destArea\" class=\"title\" [value]=\"1\" >\r\n              <md-option [value]=\"1\" >Select All</md-option>\r\n            </md-select>-->\r\n          </div>\r\n        </div>\r\n      </div>\r\n\r\n      <div class=\"col-md-12\"\r\n           style=\"background-image: url('./assets/img/LocationsSample.png');background-repeat: no-repeat; background-size: 150vh; height: 115vh;\">\r\n        <!--<img src=\"assets/img/Locations%20-%20Sample.png\">-->\r\n        <!-- <div style=\"margin-top: 42vh;margin-left: 50vh\">\r\n         <span class=\"statusBlock available\" style=\"height: 1vh;width: 2vh;color: orangered\" >ab</span>\r\n         </div>\r\n         <div style=\"margin-top: 35vh;margin-left: 50vh\">\r\n         <span class=\"statusBlock available\" style=\"height: 1vh;width: 2vh;color: orangered\" >ab</span>\r\n         </div>-->\r\n        <div class=\"col-md-12\" style=\"height: 4vh\">\r\n          <div class=\"col-md-1\"></div>\r\n          <div class=\"col-md-1\"></div>\r\n          <div class=\"col-md-1\"></div>\r\n          <div class=\"col-md-1\"></div>\r\n          <div class=\"col-md-1\"></div>\r\n          <div class=\"col-md-1\"></div>\r\n          <div class=\"col-md-1\"></div>\r\n          <div class=\"col-md-1\"></div>\r\n          <div class=\"col-md-1\"></div>\r\n          <div class=\"col-md-1\"></div>\r\n          <div class=\"col-md-1\"></div>\r\n          <div class=\"col-md-1\"></div>\r\n        </div>\r\n        <div class=\"col-md-12\" style=\"height: 4vh\">\r\n          <div class=\"col-md-1\"></div>\r\n          <div class=\"col-md-1\"></div>\r\n          <div class=\"col-md-1\"></div>\r\n          <div class=\"col-md-1\"></div>\r\n          <div class=\"col-md-1\"></div>\r\n          <div class=\"col-md-1\"></div>\r\n          <div class=\"col-md-1\"></div>\r\n          <div class=\"col-md-1\"></div>\r\n          <div class=\"col-md-1\"></div>\r\n          <div class=\"col-md-1\"></div>\r\n          <div class=\"col-md-1\"></div>\r\n          <div class=\"col-md-1\"></div>\r\n        </div>\r\n        <div class=\"col-md-12\" style=\"height: 4vh\">\r\n          <div class=\"col-md-1\"></div>\r\n          <div class=\"col-md-1\"></div>\r\n          <div class=\"col-md-1\"></div>\r\n          <div class=\"col-md-1\"></div>\r\n          <div class=\"col-md-1\"></div>\r\n          <div class=\"col-md-1\"></div>\r\n          <div class=\"col-md-1\"></div>\r\n          <div class=\"col-md-1\"></div>\r\n          <div class=\"col-md-1\"></div>\r\n          <div class=\"col-md-1\"></div>\r\n          <div class=\"col-md-1\"></div>\r\n          <div class=\"col-md-1\"></div>\r\n        </div>\r\n        <div class=\"col-md-12\" style=\"height: 4vh\">\r\n          <div class=\"col-md-1\"></div>\r\n          <div class=\"col-md-1\"></div>\r\n          <div class=\"col-md-1\"></div>\r\n          <div class=\"col-md-1 available mapIndicatorBlock\" [tooltip]=\"myTooltip2\">\r\n            <div>\r\n              <tooltip-content #myTooltip2 [animation]=\"true\" tooltipPlacement=\"left\" >\r\n                <div class=\"text-left locationToolTipDiv\">\r\n                  <div class=\"col-md-12 locationToolTipHeader\">\r\n                    <div class=\"col-md-8\" style=\"float: left;margin-left: -20px\"><b>James</b></div>\r\n\r\n                    <div class=\"col-md-4 locationToolTipJobId\">\r\n                      <b>123-45678E</b>\r\n                    </div>\r\n                  </div>\r\n\r\n                  <div class=\"col-md-12\" >\r\n                    <span  class=\"currDot\"></span>Utility , Hospital Building\r\n                  </div>\r\n                  <div class=\"col-md-12\" style=\";margin-top: 24px\">\r\n                    <div class=\"col-md-7 locationJobStatusDiv available\"><b>AVAILABLE</b></div>\r\n                    <div class=\"col-md-5\">\r\n                      <div class=\"col-md-6\"></div>\r\n                      <div class=\"col-md-6 locationTimer\"><b>\r\n                        00:12:00\r\n                      </b></div>\r\n                    </div>\r\n                  </div>\r\n                </div>\r\n              </tooltip-content>\r\n            </div>\r\n          </div>\r\n          <div class=\"col-md-1\"></div>\r\n          <div class=\"col-md-1 jobAssigned mapIndicatorBlock\" [tooltip]=\"myTooltip4\">\r\n            <div>\r\n              <tooltip-content #myTooltip4 [animation]=\"true\" tooltipPlacement=\"left\" >\r\n                <div class=\"text-left locationToolTipDiv\">\r\n                  <div class=\"col-md-12 locationToolTipHeader\">\r\n                    <div class=\"col-md-8\" style=\"float: left;margin-left: -20px\"><b>Bert</b></div>\r\n\r\n                    <div class=\"col-md-4 locationToolTipJobId\">\r\n                      <b>123-45678E</b>\r\n                    </div>\r\n                  </div>\r\n                  <div class=\"col-md-12\">\r\n                    <span class=\"destDot\"></span>Ward 12 , Hospital Building\r\n                  </div>\r\n                  <div class=\"col-md-12\"><span\r\n                    style=\"border-left-color: #a8a8a8;border-left-style: solid;height: 1em\"></span>\r\n                  </div>\r\n                  <div class=\"col-md-12\">\r\n                    <span class=\"currDot\"></span>Utility , Hospital Building\r\n                  </div>\r\n                  <div class=\"col-md-12\" style=\";margin-top: 4px\">\r\n                    <div class=\"col-md-7 locationJobStatusDiv jobAssigned\"><b>IN PROGRESS</b></div>\r\n                    <div class=\"col-md-5\">\r\n                      <div class=\"col-md-6\"></div>\r\n                      <div class=\"col-md-6 locationTimer\"><b>\r\n                        00:12:00\r\n                      </b></div>\r\n                    </div>\r\n                  </div>\r\n                </div>\r\n              </tooltip-content>\r\n            </div>\r\n          </div>\r\n          <div class=\"col-md-1\"></div>\r\n          <div class=\"col-md-1\"></div>\r\n          <div class=\"col-md-1\"></div>\r\n          <div class=\"col-md-1\"></div>\r\n          <div class=\"col-md-1\"></div>\r\n          <div class=\"col-md-1\"></div>\r\n        </div>\r\n        <div class=\"col-md-12\" style=\"height: 4vh\">\r\n          <div class=\"col-md-1\"></div>\r\n          <div class=\"col-md-1\"></div>\r\n          <div class=\"col-md-1\"></div>\r\n          <div class=\"col-md-1\"></div>\r\n          <div class=\"col-md-1\"></div>\r\n          <div class=\"col-md-1\"></div>\r\n          <div class=\"col-md-1\"></div>\r\n          <div class=\"col-md-1\"></div>\r\n          <div class=\"col-md-1\"></div>\r\n          <div class=\"col-md-1\"></div>\r\n          <div class=\"col-md-1\"></div>\r\n          <div class=\"col-md-1\"></div>\r\n        </div>\r\n        <div class=\"col-md-12\" style=\"height: 4vh\">\r\n          <div class=\"col-md-1\"></div>\r\n          <div class=\"col-md-1\"></div>\r\n          <div class=\"col-md-1\"></div>\r\n          <div class=\"col-md-1\"></div>\r\n          <div class=\"col-md-1\"></div>\r\n          <div class=\"col-md-1\"></div>\r\n          <div class=\"col-md-1\"></div>\r\n          <div class=\"col-md-1\"></div>\r\n          <div class=\"col-md-1\"></div>\r\n          <div class=\"col-md-1\"></div>\r\n          <div class=\"col-md-1\"></div>\r\n          <div class=\"col-md-1\"></div>\r\n        </div>\r\n        <div class=\"col-md-12\" style=\"height: 4vh\">\r\n          <div class=\"col-md-1\"></div>\r\n          <div class=\"col-md-1\"></div>\r\n          <div class=\"col-md-1\"></div>\r\n          <div class=\"col-md-1\"></div>\r\n          <div class=\"col-md-1\"></div>\r\n          <div class=\"col-md-1\"></div>\r\n          <div class=\"col-md-1\"></div>\r\n          <div class=\"col-md-1\"></div>\r\n          <div class=\"col-md-1\"></div>\r\n          <div class=\"col-md-1\"></div>\r\n          <div class=\"col-md-1\"></div>\r\n          <div class=\"col-md-1\"></div>\r\n        </div>\r\n        <div class=\"col-md-12\" style=\"height: 4vh\">\r\n          <div class=\"col-md-1\"></div>\r\n          <div class=\"col-md-1\"></div>\r\n          <div class=\"col-md-1\"></div>\r\n          <div class=\"col-md-1\"></div>\r\n          <div class=\"col-md-1\"></div>\r\n          <div class=\"col-md-1\"></div>\r\n          <div class=\"col-md-1\"></div>\r\n          <div class=\"col-md-1\"></div>\r\n          <div class=\"col-md-1\"></div>\r\n          <div class=\"col-md-1\"></div>\r\n          <div class=\"col-md-1\"></div>\r\n          <div class=\"col-md-1\"></div>\r\n        </div>\r\n        <div class=\"col-md-12\" style=\"height: 4vh\">\r\n          <div class=\"col-md-1\"></div>\r\n          <div class=\"col-md-1\"></div>\r\n          <div class=\"col-md-1\"></div>\r\n          <div class=\"col-md-1 \"></div>\r\n          <div class=\"col-md-1\"></div>\r\n          <div class=\"col-md-1\"></div>\r\n          <div class=\"col-md-1\"></div>\r\n          <div class=\"col-md-1\"></div>\r\n          <div class=\"col-md-1\"></div>\r\n          <div class=\"col-md-1\"></div>\r\n          <div class=\"col-md-1\"></div>\r\n          <div class=\"col-md-1\"></div>\r\n        </div>\r\n        <div class=\"col-md-12\" style=\"height: 4vh\">\r\n          <div class=\"col-md-1\"></div>\r\n          <div class=\"col-md-1\"></div>\r\n          <div class=\"col-md-1\"></div>\r\n          <div class=\"col-md-1\"></div>\r\n          <div class=\"col-md-1\"></div>\r\n          <div class=\"col-md-1\"></div>\r\n          <div class=\"col-md-1 \"></div>\r\n          <div class=\"col-md-1\"></div>\r\n          <div class=\"col-md-1\"></div>\r\n          <div class=\"col-md-1\"></div>\r\n          <div class=\"col-md-1\"></div>\r\n          <div class=\"col-md-1\"></div>\r\n        </div>\r\n        <div class=\"col-md-12\" style=\"height: 4vh\">\r\n          <div class=\"col-md-1\"></div>\r\n          <div class=\"col-md-1\"></div>\r\n          <div class=\"col-md-1 available mapIndicatorBlock\" [tooltip]=\"myTooltip3\">\r\n            <div>\r\n              <tooltip-content #myTooltip3 [animation]=\"true\" tooltipPlacement=\"left\" >\r\n                <div class=\"text-left locationToolTipDiv\">\r\n                  <div class=\"col-md-12 locationToolTipHeader\">\r\n                    <div class=\"col-md-8\" style=\"float: left;margin-left: -20px\"><b>Jonathan</b></div>\r\n\r\n                    <div class=\"col-md-4 locationToolTipJobId\">\r\n                      <b>123-45678E</b>\r\n                    </div>\r\n                  </div>\r\n\r\n                  <div class=\"col-md-12\" >\r\n                    <span  class=\"currDot\"></span>Emergency Room , Hospital Building\r\n                  </div>\r\n                  <div class=\"col-md-12\" style=\";margin-top: 24px\">\r\n                    <div class=\"col-md-7 locationJobStatusDiv available\"><b>AVAILABLE</b></div>\r\n                    <div class=\"col-md-5\">\r\n                      <div class=\"col-md-6\"></div>\r\n                      <div class=\"col-md-6 locationTimer\"><b>\r\n                        00:12:00\r\n                      </b></div>\r\n                    </div>\r\n                  </div>\r\n                </div>\r\n              </tooltip-content>\r\n            </div>\r\n          </div>\r\n          <div class=\"col-md-1\"></div>\r\n          <div class=\"col-md-1\"></div>\r\n          <div class=\"col-md-1\"></div>\r\n          <div class=\"col-md-1\"></div>\r\n          <div class=\"col-md-1\"></div>\r\n          <div class=\"col-md-1\"></div>\r\n          <div class=\"col-md-1\"></div>\r\n          <div class=\"col-md-1\"></div>\r\n          <div class=\"col-md-1\"></div>\r\n        </div>\r\n        <div class=\"col-md-12\" style=\"height: 4vh\">\r\n          <div class=\"col-md-1\"></div>\r\n          <div class=\"col-md-1\"></div>\r\n          <div class=\"col-md-1\"></div>\r\n          <div class=\"col-md-1\"></div>\r\n          <div class=\"col-md-1\"></div>\r\n          <div class=\"col-md-1\"></div>\r\n          <div class=\"col-md-1\"></div>\r\n          <div class=\"col-md-1\"></div>\r\n          <div class=\"col-md-1\"></div>\r\n          <div class=\"col-md-1\"></div>\r\n          <div class=\"col-md-1\"></div>\r\n          <div class=\"col-md-1\"></div>\r\n        </div>\r\n        <div class=\"col-md-12\" style=\"height: 4vh\">\r\n          <div class=\"col-md-1\"></div>\r\n          <div class=\"col-md-1\"></div>\r\n          <div class=\"col-md-1\"></div>\r\n          <div class=\"col-md-1\"></div>\r\n          <div class=\"col-md-1\"></div>\r\n          <div class=\"col-md-1\"></div>\r\n          <div class=\"col-md-1\"></div>\r\n          <div class=\"col-md-1\"></div>\r\n          <div class=\"col-md-1\"></div>\r\n          <div class=\"col-md-1\"></div>\r\n          <div class=\"col-md-1\"></div>\r\n          <div class=\"col-md-1\"></div>\r\n        </div>\r\n        <div class=\"col-md-12\" style=\"height: 4vh\">\r\n          <div class=\"col-md-1\"></div>\r\n          <div class=\"col-md-1\"></div>\r\n          <div class=\"col-md-1\"></div>\r\n          <div class=\"col-md-1\"></div>\r\n          <div class=\"col-md-1\"></div>\r\n          <div class=\"col-md-1\"></div>\r\n          <div class=\"col-md-1\"></div>\r\n          <div class=\"col-md-1\"></div>\r\n          <div class=\"col-md-1\"></div>\r\n          <div class=\"col-md-1\"></div>\r\n          <div class=\"col-md-1\"></div>\r\n          <div class=\"col-md-1\"></div>\r\n        </div>\r\n        <div class=\"col-md-12\" style=\"height: 4vh\">\r\n          <div class=\"col-md-1\"></div>\r\n          <div class=\"col-md-1\"></div>\r\n          <div class=\"col-md-1\"></div>\r\n          <div class=\"col-md-1\"></div>\r\n          <div class=\"col-md-1\"></div>\r\n          <div class=\"col-md-1\"></div>\r\n          <div class=\"col-md-1\"></div>\r\n          <div class=\"col-md-1\"></div>\r\n          <div class=\"col-md-1\"></div>\r\n          <div class=\"col-md-1\"></div>\r\n          <div class=\"col-md-1\"></div>\r\n          <div class=\"col-md-1\"></div>\r\n        </div>\r\n        <div class=\"col-md-12\" style=\"height: 4vh\">\r\n          <div class=\"col-md-1\"></div>\r\n          <div class=\"col-md-1\"></div>\r\n          <div class=\"col-md-1\"></div>\r\n          <div class=\"col-md-1\"></div>\r\n          <div class=\"col-md-1\"></div>\r\n          <div class=\"col-md-1\"></div>\r\n          <div class=\"col-md-1\"></div>\r\n          <div class=\"col-md-1\"></div>\r\n          <div class=\"col-md-1\"></div>\r\n          <div class=\"col-md-1\"></div>\r\n          <div class=\"col-md-1\"></div>\r\n          <div class=\"col-md-1\"></div>\r\n        </div>\r\n        <div class=\"col-md-12\" style=\"height: 4vh\">\r\n          <div class=\"col-md-1\"></div>\r\n          <div class=\"col-md-1\"></div>\r\n          <div class=\"col-md-1\"></div>\r\n          <div class=\"col-md-1\"></div>\r\n          <div class=\"col-md-1\"></div>\r\n          <div class=\"col-md-1\"></div>\r\n          <div class=\"col-md-1\"></div>\r\n          <div class=\"col-md-1\"></div>\r\n          <div class=\"col-md-1\"></div>\r\n          <div class=\"col-md-1\"></div>\r\n          <div class=\"col-md-1\"></div>\r\n          <div class=\"col-md-1\"></div>\r\n        </div>\r\n        <div class=\"col-md-12\" style=\"height: 4vh\">\r\n          <div class=\"col-md-1\"></div>\r\n          <div class=\"col-md-1\"></div>\r\n          <div class=\"col-md-1\"></div>\r\n          <div class=\"col-md-1\"></div>\r\n          <div class=\"col-md-1\"></div>\r\n          <div class=\"col-md-1\"></div>\r\n          <div class=\"col-md-1\"></div>\r\n          <div class=\"col-md-1\"></div>\r\n          <div class=\"col-md-1\"></div>\r\n          <div class=\"col-md-1\"></div>\r\n          <div class=\"col-md-1\"></div>\r\n          <div class=\"col-md-1\"></div>\r\n        </div>\r\n        <div class=\"col-md-12\" style=\"height: 4vh\">\r\n          <div class=\"col-md-1\"></div>\r\n          <div class=\"col-md-1\"></div>\r\n          <div class=\"col-md-1\"></div>\r\n          <div class=\"col-md-1\"></div>\r\n          <div class=\"col-md-1 jobAssigned mapIndicatorBlock\" [tooltip]=\"myTooltip1\">\r\n            <div>\r\n              <tooltip-content #myTooltip1 [animation]=\"true\" tooltipPlacement=\"left\" >\r\n                <div class=\"text-left locationToolTipDiv\">\r\n                  <div class=\"col-md-12 locationToolTipHeader\">\r\n                    <div class=\"col-md-8\" style=\"float: left;margin-left: -20px\"><b>John</b></div>\r\n\r\n                    <div class=\"col-md-4 locationToolTipJobId\">\r\n                      <b>123-45678E</b>\r\n                    </div>\r\n                  </div>\r\n                  <div class=\"col-md-12\">\r\n                    <span class=\"destDot\"></span>Dispensary , Hospital Building\r\n                  </div>\r\n                  <div class=\"col-md-12\"><span\r\n                    style=\"border-left-color: #a8a8a8;border-left-style: solid;height: 1em\"></span>\r\n                  </div>\r\n                  <div class=\"col-md-12\">\r\n                    <span class=\"currDot\"></span>Admin , Hospital Building\r\n                  </div>\r\n                  <div class=\"col-md-12\" style=\";margin-top: 4px\">\r\n                    <div class=\"col-md-7 locationJobStatusDiv jobAssigned\"><b>IN PROGRESS</b></div>\r\n                    <div class=\"col-md-5\">\r\n                      <div class=\"col-md-6\"></div>\r\n                      <div class=\"col-md-6 locationTimer\"><b>\r\n                        00:12:00\r\n                      </b></div>\r\n                    </div>\r\n                  </div>\r\n                </div>\r\n              </tooltip-content>\r\n            </div>\r\n          </div>\r\n          <div class=\"col-md-1\"></div>\r\n          <div class=\"col-md-1\"></div>\r\n          <div class=\"col-md-1\"></div>\r\n          <div class=\"col-md-1\"></div>\r\n          <div class=\"col-md-1\"></div>\r\n          <div class=\"col-md-1\"></div>\r\n          <div class=\"col-md-1\"></div>\r\n        </div>\r\n        <div class=\"col-md-12\" style=\"height: 4vh\">\r\n          <div class=\"col-md-1\"></div>\r\n          <div class=\"col-md-1\"></div>\r\n          <div class=\"col-md-1\"></div>\r\n          <div class=\"col-md-1\"></div>\r\n          <div class=\"col-md-1\"></div>\r\n          <div class=\"col-md-1\"></div>\r\n          <div class=\"col-md-1\"></div>\r\n          <div class=\"col-md-1\"></div>\r\n          <div class=\"col-md-1\"></div>\r\n          <div class=\"col-md-1\"></div>\r\n          <div class=\"col-md-1\"></div>\r\n          <div class=\"col-md-1\"></div>\r\n        </div>\r\n        <div class=\"col-md-12\" style=\"height: 4vh\">\r\n          <div class=\"col-md-1\"></div>\r\n          <div class=\"col-md-1\"></div>\r\n          <div class=\"col-md-1\"></div>\r\n          <div class=\"col-md-1\"></div>\r\n          <div class=\"col-md-1\"></div>\r\n          <div class=\"col-md-1\"></div>\r\n          <div class=\"col-md-1\"></div>\r\n          <div class=\"col-md-1\"></div>\r\n          <div class=\"col-md-1\"></div>\r\n          <div class=\"col-md-1\"></div>\r\n          <div class=\"col-md-1\"></div>\r\n          <div class=\"col-md-1\"></div>\r\n        </div>\r\n        <div class=\"col-md-12\" style=\"height: 4vh\">\r\n          <div class=\"col-md-1\"></div>\r\n          <div class=\"col-md-1\"></div>\r\n          <div class=\"col-md-1\"></div>\r\n          <div class=\"col-md-1\"></div>\r\n          <div class=\"col-md-1\"></div>\r\n          <div class=\"col-md-1\"></div>\r\n          <div class=\"col-md-1\"></div>\r\n          <div class=\"col-md-1\"></div>\r\n          <div class=\"col-md-1\"></div>\r\n          <div class=\"col-md-1\"></div>\r\n          <div class=\"col-md-1\"></div>\r\n          <div class=\"col-md-1\"></div>\r\n        </div>\r\n        <div class=\"col-md-12\" style=\"height: 4vh\">\r\n          <div class=\"col-md-1\"></div>\r\n          <div class=\"col-md-1\"></div>\r\n          <div class=\"col-md-1\"></div>\r\n          <div class=\"col-md-1\"></div>\r\n          <div class=\"col-md-1\"></div>\r\n          <div class=\"col-md-1\"></div>\r\n          <div class=\"col-md-1\"></div>\r\n          <div class=\"col-md-1\"></div>\r\n          <div class=\"col-md-1\"></div>\r\n          <div class=\"col-md-1\"></div>\r\n          <div class=\"col-md-1\"></div>\r\n          <div class=\"col-md-1\"></div>\r\n        </div>\r\n        <div class=\"col-md-12\" style=\"height: 4vh\">\r\n          <div class=\"col-md-1\"></div>\r\n          <div class=\"col-md-1\"></div>\r\n          <div class=\"col-md-1 \"></div>\r\n          <div class=\"col-md-1  cleaning mapIndicatorBlock\" [tooltip]=\"myTooltip\">\r\n            <div>\r\n              <tooltip-content #myTooltip [animation]=\"true\" tooltipPlacement=\"bottom\" >\r\n                <div class=\"text-left locationToolTipDiv\">\r\n                  <div class=\"col-md-12 locationToolTipHeader\">\r\n                    <div class=\"col-md-8\" style=\"float: left;margin-left: -20px\"><b>Elliot</b></div>\r\n\r\n                    <div class=\"col-md-4 locationToolTipJobId\">\r\n                      <b>123-45678E</b>\r\n                    </div>\r\n                  </div>\r\n                  <div class=\"col-md-12\">\r\n                    <span class=\"destDot\"></span>Cafetaria , Hospital Building\r\n                  </div>\r\n                  <div class=\"col-md-12\"><span\r\n                    style=\"border-left-color: #a8a8a8;border-left-style: solid;height: 1em\"></span>\r\n                  </div>\r\n                  <div class=\"col-md-12\">\r\n                    <span class=\"currDot\"></span>Pediatric Waiting , Hospital Building\r\n                  </div>\r\n                  <div class=\"col-md-12\" style=\";margin-top: 4px\">\r\n                    <div class=\"col-md-7 locationJobStatusDiv cleaning\"><b>CLEANING</b></div>\r\n                    <div class=\"col-md-5\">\r\n                      <div class=\"col-md-6\"></div>\r\n                      <div class=\"col-md-6 locationTimer\"><b>\r\n                        00:12:00\r\n                      </b></div>\r\n                    </div>\r\n                  </div>\r\n                </div>\r\n              </tooltip-content>\r\n            </div>\r\n          </div>\r\n          <div class=\"col-md-1\"></div>\r\n          <div class=\"col-md-1\"></div>\r\n          <div class=\"col-md-1\"></div>\r\n          <div class=\"col-md-1\"></div>\r\n          <div class=\"col-md-1\"></div>\r\n          <div class=\"col-md-1\"></div>\r\n          <div class=\"col-md-1\"></div>\r\n          <div class=\"col-md-1\"></div>\r\n        </div>\r\n        <div class=\"col-md-12\" style=\"height: 4vh\">\r\n          <div class=\"col-md-1\"></div>\r\n          <div class=\"col-md-1\"></div>\r\n          <div class=\"col-md-1\"></div>\r\n          <div class=\"col-md-1\"></div>\r\n          <div class=\"col-md-1\"></div>\r\n          <div class=\"col-md-1\"></div>\r\n          <div class=\"col-md-1\"></div>\r\n          <div class=\"col-md-1\"></div>\r\n          <div class=\"col-md-1\"></div>\r\n          <div class=\"col-md-1\"></div>\r\n          <div class=\"col-md-1\"></div>\r\n          <div class=\"col-md-1\"></div>\r\n        </div>\r\n      </div>\r\n\r\n\r\n    </div>\r\n  </div>\r\n\r\n\r\n</div>\r\n"

/***/ }),

/***/ 710:
/***/ (function(module, exports) {

module.exports = "<div class=\"main-content\">\r\n  <div class=\"card\" style=\"padding: 2vh\">\r\n    <div class=\"card-content\">\r\n      <div class=\"row\" style=\"border-bottom: solid;border-bottom-color:darkgrey;: \">\r\n        <div class=\"col-md-4\">\r\n          <h5 style=\"float: left\">Staff By location</h5>\r\n        </div>\r\n        <div class=\"col-md-8\">\r\n          <div class=\"col-md-3\">\r\n            <div class=\"col-md-3\"\r\n                 style=\"background-color: orangered;padding:5px;height: 3vh;border-radius:5px;width: 3vh\">\r\n\r\n            </div>\r\n            <div class=\"col-md-9\" style=\"margin-top: 1px\">\r\n              Available\r\n            </div>\r\n          </div>\r\n          <div class=\"col-md-3\">\r\n            <div class=\"col-md-3\" style=\"background-color: orange;padding:5px;height: 3vh;border-radius:5px;width: 3vh\">\r\n\r\n            </div>\r\n            <div class=\"col-md-9\" style=\"margin-top: 1px\">\r\n              Cleaning\r\n            </div>\r\n          </div>\r\n          <div class=\"col-md-3\" >\r\n            <div class=\"col-md-3\" style=\"background-color: green;padding:5px;height: 3vh;border-radius:5px;width: 3vh\">\r\n\r\n            </div>\r\n            <div class=\"col-md-9\" style=\"margin-top: 1px;padding: 3px;margin-left: 1px\">\r\n              Job Assigned\r\n            </div>\r\n          </div>\r\n          <div class=\"col-md-3\">\r\n            <div class=\"col-md-3\"\r\n                 style=\"background-color: deepskyblue;padding:5px;height: 3vh;border-radius:5px;width: 3vh\">\r\n\r\n            </div>\r\n            <div class=\"col-md-9\" style=\"margin-top: 1px;padding: 3px\">\r\n              On Break\r\n            </div>\r\n          </div>\r\n          <!--<div class=\"col-md-3\">\r\n            &lt;!&ndash;<md-select name=\"destArea\" class=\"title\" [value]=\"1\" >\r\n              <md-option [value]=\"1\" >Select All</md-option>\r\n            </md-select>&ndash;&gt;\r\n          </div>-->\r\n        </div>\r\n      </div>\r\n\r\n      <div class=\"row\" style=\"padding: 1vh;\">\r\n        <div *ngFor=\"let location of locationList\">\r\n          <div class=\"col-md-12 locationCard\">\r\n            <div class=\"col-md-2\">\r\n              <a href=\"#/locationDetailView\" style=\"color: black\">\r\n                <span>{{location.floor}}</span><br>\r\n                {{location.building}}\r\n              </a>\r\n            </div>\r\n\r\n            <div class=\"col-md-10\">\r\n              <custom-grid-comp isToolTipRequired=\"true\" [jobList]=\"location.jobs\"></custom-grid-comp>\r\n            </div>\r\n          </div>\r\n\r\n\r\n        </div>\r\n      </div>\r\n\r\n    </div>\r\n  </div>\r\n\r\n\r\n\r\n</div>\r\n"

/***/ }),

/***/ 711:
/***/ (function(module, exports) {

module.exports = "\r\n<div class=\"skillDialog\">\r\n        <h2 md-dialog-title>{{title}}</h2>\r\n        <div md-dialog-content>\r\n            <div>\r\n                <form [formGroup]=\"skillForm\"  novalidate (ngSubmit)=\"skillForm.valid\" novalidate>\r\n                    <!-- we will place our fields here -->\r\n                    <div  class=\"form-group\">\r\n                        <input  type=\"hidden\" formControlName=\"id\" name=\"id\" class=\"form-control\" >\r\n                        <label>Name</label>\r\n                        <!--bind name to ngModel, it's required with minimum 5 characters-->\r\n                        <input  type=\"text\" formControlName=\"name\" name=\"name\" class=\"form-control\" >\r\n                        <!--show error only when field is not valid & it's dirty or form submited-->\r\n\r\n                        <small *ngIf=\"skillForm.controls.name.errors && (skillForm.controls.name.dirty || skillForm.controls.name.touched)\">\r\n                             <small [hidden]=\"!skillForm.controls.name.errors.required\" class=\"text-danger\">\r\n                                 Name is required\r\n                             </small>\r\n\r\n                              <small [hidden]=\"!skillForm.controls.name.errors.exist\" class=\"text-danger\">\r\n                                  Duplicate {{type}} name\r\n                             </small>\r\n                        </small>\r\n                    </div>\r\n\r\n                    <!--adrress group-->\r\n                    <div class=\"form-group\">\r\n                        <!--street-->\r\n                        <div>\r\n                            <label>Abbreviation</label>\r\n                            <input type=\"text\" formControlName=\"abbreviation\" name=\"abbreviation\" class=\"form-control\" >\r\n                             <small *ngIf=\"skillForm.controls.abbreviation.errors\">\r\n                                    <small [hidden]=\"!skillForm.controls.abbreviation.errors.exist\" class=\"text-danger\">\r\n                                       Duplicate abbreviation\r\n                                    </small>\r\n                             </small>\r\n                        </div>\r\n                    </div>\r\n\r\n                    <div *ngIf=\"!isSkillGroup\"  class=\"form-group\">\r\n                      <input  hidden formControlName=\"companyId\" name=\"companyId\" class=\"form-control\" >\r\n                        <label>Skill Group</label>\r\n                        <md-select  [(ngModel)]=\"skillGroupId\" formControlName=\"skillGroup\" class=\"form-control\">\r\n                            <md-option *ngFor=\"let skillGroupTmp of skillGroups\" [value]=\"skillGroupTmp.id\">{{ skillGroupTmp.name }}</md-option>\r\n                        </md-select>\r\n                    </div>\r\n                    <button md-button [disabled]=\"!skillForm.valid\" type=\"submit\" (click)=\"dialogRef.close(skillForm.value)\">{{actionButton}}</button>\r\n                    <button md-button type=\"button\" (click)=\"dialogRef.close(null)\">Cancel</button>\r\n                </form>\r\n            </div>\r\n\r\n        </div>\r\n        <div md-dialog-actions>\r\n\r\n        </div>\r\n</div>\r\n"

/***/ }),

/***/ 712:
/***/ (function(module, exports) {

module.exports = "<div class=\"main-content skill-page\">\r\n\r\n\t<div class=\"row\">\r\n\t\t<div class=\"col-md-12\">\r\n\t\t\t<div class=\"card\">\r\n\t\t\t\t<div class=\"card-header\" data-background-color=\"purple\">\r\n\t\t\t\t\t<h4 class=\"title\">Skill</h4>\r\n\t\t\t\t</div>\r\n\t\t\t\t<div class=\"card-content\">\r\n\t\t\t\t\t<tree-root [focused]=\"true\" [nodes]=\"nodes\"\r\n\t\t\t\t\t\t[options]=\"options\" (moveNode)=\"moveNode($event)\"\r\n\t\t\t\t\t\t(activate)=\"treeclickEvent($event)\"> </tree-root>\r\n\t\t\t\t</div>\r\n\t\t\t\t<div class=\"card-footer\">\r\n\r\n\t\t\t\t\t<button *ngIf=\"!isSkillGroupSelected && !isSkillSelected\" (click)=\"addEntity(true)\"\r\n\t\t\t\t\t\tclass=\"btn btn-primary pull-right\">Add Skill Group</button>\r\n\r\n\t\t\t\t\t<button *ngIf=\"isSkillGroupSelected && customValidation.isPermissionAvailable('SKILL_EDIT')\"\r\n\t\t\t\t\t\t(click)=\"addEntity(false)\" class=\"btn btn-primary pull-right\">Add\r\n\t\t\t\t\t\tSkill</button>\r\n\r\n\t\t\t\t\t<button *ngIf=\"isSkillGroupSelected\"\r\n\t\t\t\t\t\t(click)=\"editEntity(true)\" class=\"btn btn-primary pull-right\">Edit\r\n\t\t\t\t\t\tSkill Group</button>\r\n\r\n\t\t\t\t\t<button *ngIf=\"isSkillGroupSelected\"\r\n\t\t\t\t\t\t(click)=\"removeEntity(true)\" class=\"btn btn-primary pull-right\">Remove\r\n\t\t\t\t\t\tSkill Group</button>\r\n\r\n\t\t\t\t\t<button *ngIf=\"isSkillSelected && customValidation.isPermissionAvailable('SKILL_EDIT')\"\r\n\t\t\t\t\t\t(click)=\"editEntity(false)\" class=\"btn btn-primary pull-right\">Edit Skill</button>\r\n\r\n\t\t\t\t\t<button *ngIf=\"isSkillSelected && customValidation.isPermissionAvailable('SKILL_EDIT')\"\r\n\t\t\t\t\t\t(click)=\"removeEntity(false)\" class=\"btn btn-primary pull-right\">Remove\r\n\t\t\t\t\t\tSkill</button>\r\n\t\t\t\t</div>\r\n\t\t\t</div>\r\n\t\t</div>\r\n\t</div>\r\n</div>\r\n"

/***/ }),

/***/ 713:
/***/ (function(module, exports) {

module.exports = "<div class=\"main-content\">\r\n <div class=\"row\">\r\n\t\t<div class=\"col-md-12\">\r\n\t\t\t<div class=\"card\">\r\n\t\t\t\t<div class=\"card-header\" data-background-color=\"purple\">\r\n\t\t\t\t\t<h4 class=\"title\">{{treeTitle}}</h4>\r\n\t\t\t\t</div>\r\n\t\t\t\t<div class=\"card-content\">\r\n\t\t\t\t\t<tree-root #tree [focused]=\"true\" [nodes]=\"nodes\"\r\n\t\t\t\t\t\t(activate)=\"treeclickEvent($event)\"> </tree-root>\r\n\t\t\t\t</div>\r\n\t\t\t\t<div class=\"card-footer\">\r\n\t\t\t\t\t<button *ngIf=\"isAddShow\" (click)=\"addUnit()\"\r\n\t\t\t\t\t\tclass=\"btn btn-primary pull-right\">Add {{addAction}}</button>\r\n\r\n\t\t\t\t\t<button *ngIf=\"isEditShow\"\r\n\t\t\t\t\t\t(click)=\"editUnit()\" class=\"btn btn-primary pull-right\">Edit {{editAction}}\r\n\t\t\t\t\t\t</button>\r\n\r\n\t\t\t\t\t<button *ngIf=\"isRemoveShow\"\r\n\t\t\t\t\t\t(click)=\"removeUnit()\" class=\"btn btn-primary pull-right\">Remove\r\n\t\t\t\t\t\t{{removeAction}}</button>\r\n\t\t\t\t</div>\r\n\t\t\t</div>\r\n\t\t</div>\r\n\t</div>\r\n</div>"

/***/ }),

/***/ 714:
/***/ (function(module, exports) {

module.exports = "<div class=\"main-content\">\r\n    <div class=\"myDialog\">\r\n        <h2 md-dialog-title>{{title}}</h2>\r\n        <div md-dialog-content>\r\n            <div>\r\n                <form [formGroup]=\"unitForm\"   novalidate>\r\n                    <!-- we will place our fields here -->\r\n                    <div  class=\"form-group\">\r\n                        <input  type=\"hidden\" formControlName=\"id\" name=\"id\" class=\"form-control\" >\r\n\r\n                        <input  type=\"hidden\" formControlName=\"itemLevelId\" name=\"unitLevelId\" class=\"form-control\" >\r\n\r\n                        <input  type=\"hidden\" formControlName=\"itemLevelId\" name=\"unitLevelId\" class=\"form-control\" >\r\n\r\n                       \r\n                        <label>Name</label>\r\n                        <!--bind name to ngModel, it's required with minimum 5 characters-->\r\n                        <input  type=\"text\" formControlName=\"name\" name=\"name\" class=\"form-control\" >\r\n                        <!--show error only when field is not valid & it's dirty or form submited-->\r\n                        \r\n                        <small *ngIf=\"unitForm.controls.name.errors && (unitForm.controls.name.dirty || unitForm.controls.name.touched)\">\r\n                             <small [hidden]=\"!unitForm.controls.name.errors.required\" class=\"text-danger\">\r\n                                 Name is required\r\n                             </small>\r\n\r\n                              <small [hidden]=\"!unitForm.controls.name.errors.unitAvailable\" class=\"text-danger\">\r\n                                  duplicate unitLevel name\r\n                             </small>\r\n                        </small>\r\n                    </div>\r\n                    <!--adrress group-->\r\n                    <div class=\"form-group\">\r\n                        <!--street-->\r\n                        <div>\r\n                            <label>Abbreviation</label>\r\n                            <input type=\"text\" formControlName=\"abbreviation\" name=\"abbreviation\" class=\"form-control\" >\r\n                             <small *ngIf=\"unitForm.controls.abbreviation.errors\">\r\n                                    <small [hidden]=\"!unitForm.controls.abbreviation.errors.abbreviationAvailable\" class=\"text-danger\">\r\n                                       duplicate abbreviation\r\n                                    </small>\r\n                             </small>\r\n                        </div>\r\n                    </div>\r\n                   \r\n                    <button md-button [disabled]=\"!unitForm.valid\" type=\"submit\" (click)=\"dialogRef.close(unitForm.value)\">{{actionButton}}</button>\r\n                    <button md-button type=\"button\" (click)=\"dialogRef.close(null)\">Cancel</button>\r\n                </form>\r\n            </div>\r\n\r\n        </div>\r\n        <div md-dialog-actions>\r\n           \r\n        </div>\r\n    </div>\r\n<div class=\"main-content\">"

/***/ }),

/***/ 715:
/***/ (function(module, exports) {

module.exports = "<router-outlet></router-outlet>\n"

/***/ }),

/***/ 716:
/***/ (function(module, exports) {

module.exports = "<div class=\"row\">\n\t<div class=\"col-md-10 col-sm-12 pagination-info\">\n\t\t<span class=\"pagination-length-info\">Show</span>\n\t\t<form>\n\t\t\t<md-select [(ngModel)]=\"selectedValue\" (ngModelChange)=\"filterValue(selectedValue)\" name=\"length\"\n\t\t\t\tclass=\"ag-grid length\"> <md-option\n\t\t\t\t*ngFor=\"let selectOption of selectOptions\" [value]=\"selectOption.value\">\n\t\t\t{{selectOption.viewValue}} </md-option> </md-select>\n\t\t</form>\n\t\t<span class=\"pagination-length-info\">entries</span>\n\t</div>\n\t\n\t<div class=\"col-md-2 col-sm-12\">\n\t\t<md-input-container> <input mdInput (keyup)=\"onSearchRecords()\" \n    [(ngModel)]=\"searchRecord\"\n\t\t\tplaceholder=\"Search records\" type=\"text\"> </md-input-container>\n\t</div>\n</div>\n"

/***/ }),

/***/ 717:
/***/ (function(module, exports) {

module.exports = "<div>\n\t<div class=\"container\">\n\t\t<div class=\"row\" *ngIf=\"pager.pages && pager.pages.length\" >\n\t\t\t<div class=\"col-sm-5 pagination-info\">\n\t\t\t\tShowing {{ pager.startIndex +1 }} to {{pager.endIndex + 1}} of {{pager.totalItems}} entries\n\t\t\t</div>\n\t\t\t<div class=\"col-sm-7 ag-grid-paginate\">\n\t\t\t<!-- pager -->\n\t\t<ul class=\"ag-grid pagination\">\n\t\t\t<li [ngClass]=\"{disabled:pager.currentPage === 1}\" class=\"paginate-button\"><a\n\t\t\t\t(click)=\"setPage(1)\">First</a></li>\n\t\t\t<li [ngClass]=\"{disabled:pager.currentPage === 1}\" class=\"paginate-button\"><a\n\t\t\t\t(click)=\"setPage(pager.currentPage - 1)\">Previous</a></li>\n\t\t\t<li *ngFor=\"let page of pager.pages\"\n\t\t\t\t[ngClass]=\"{active:pager.currentPage === page}\"><a\n\t\t\t\t(click)=\"setPage(page)\">{{page}}</a></li>\n\t\t\t<li [ngClass]=\"{disabled:pager.currentPage === pager.totalPages}\" class=\"paginate-button\">\n\t\t\t\t<a (click)=\"setPage(pager.currentPage + 1)\">Next</a>\n\t\t\t</li>\n\t\t\t<li [ngClass]=\"{disabled:pager.currentPage === pager.totalPages}\" class=\"paginate-button\">\n\t\t\t\t<a (click)=\"setPage(pager.totalPages)\">Last</a>\n\t\t\t</li>\n\t\t</ul>\n\t\t\t</div>\n\t\t</div>\n\t\t\n\t</div>\n</div>\n"

/***/ }),

/***/ 718:
/***/ (function(module, exports) {

module.exports = "<div class=\"ag-grid-table\">\n\t\n\t<ag-grid-header *ngIf=\"agHeader\" ></ag-grid-header>\n\n\t<ag-grid-angular [gridOptions]=\"gridOptions\" rowHeight=\"46\"\n\t\tclass=\"ag-material ag-grid-table-view\"> </ag-grid-angular>\n\t\t\n \t<ag-grid-pagination *ngIf=\"agPagination\"></ag-grid-pagination>\n\n</div>\n\n"

/***/ }),

/***/ 719:
/***/ (function(module, exports) {

module.exports = "<footer>\n    <div class=\"container-fluid\">\n        <p class=\"copyright pull-right\">\n            &copy; {{test | date: 'yyyy'}} <a href=\"http://www.caresystemsinc.com\">Care Systems</a>\n        </p>\n    </div>\n</footer>\n"

/***/ }),

/***/ 720:
/***/ (function(module, exports) {

module.exports = "<script src=\"../../../assets/js/material-dashboard.js\"></script>\n<nav class=\"navbar navbar-transparent navbar-absolute\">\n    <div class=\"container-fluid\">\n\t\t<div class=\"navbar-minimize\">\n\t\t\t<button id=\"minimizeSidebar\" (click)=\"toggleSideBar()\"\n\t\t\t\tclass=\"btn btn-round btn-white btn-fill btn-just-icon\">\n\t\t\t\t<i class=\"material-icons visible-on-sidebar-regular\">more_vert</i>\n        <i class=\"material-icons visible-on-sidebar-mini\">view_list</i>\n\t\t\t\t<div class=\"ripple-container\"></div>\n\t\t\t</button>\n\t\t</div>\n\t\t<div class=\"navbar-header\">\n            <button type=\"button\" (click)=\"toggleSideBar()\" class=\"navbar-toggle\" data-toggle=\"collapse\">\n                <span class=\"sr-only\">Toggle navigation</span>\n                <span class=\"icon-bar\"></span>\n                <span class=\"icon-bar\"></span>\n                <span class=\"icon-bar\"></span>\n            </button>\n            <a class=\"navbar-brand\" href=\"#\">{{getTitle()}}</a>\n        </div>\n        <div class=\"collapse navbar-collapse\">\n            <ul class=\"nav navbar-nav navbar-right\" style=\"width: 55vh\">\n\n\n                <li class=\"dropdown\">\n                    <a href=\"#\" class=\"dropdown-toggle\" data-toggle=\"dropdown\">\n                        <i class=\"material-icons\">notifications</i>\n                        <span class=\"notification\">5</span>\n                        <p class=\"hidden-lg hidden-md\">Notifications</p>\n                    </a>\n                    <ul class=\"dropdown-menu\">\n                        <li><a href=\"#\">Mike John responded to your email</a></li>\n                        <li><a href=\"#\">You have 5 new tasks</a></li>\n                        <li><a href=\"#\">You're now friend with Andrew</a></li>\n                        <li><a href=\"#\">Another Notification</a></li>\n                        <li><a href=\"#\">Another One</a></li>\n                    </ul>\n                </li>\n                <li>\n                    <a href=\"#pablo\" class=\"dropdown-toggle\" data-toggle=\"dropdown\">\n                       <i class=\"material-icons\">person</i>\n                       <p class=\"hidden-lg hidden-md\">Profile</p>\n                    </a>\n                     <ul class=\"dropdown-menu\">\n                        <li><a routerLinkActive=\"active\"  routerLink=\"/login\" (click)=\"logout()\" >Logout</a></li>\n                    </ul>\n                </li>\n                <li class=\"dropdown\">\n                    <a href=\"#\" class=\"dropdown-toggle mdl-js-ripple-effect\" data-toggle=\"dropdown\">\n                       <i class=\"material-icons\">language</i>\n                       <p class=\"hidden-lg hidden-md\">Language</p>\n                    </a>\n                    <ul class=\"dropdown-menu\">\n\t\t\t\t\t\t<li *ngFor=\"let lang of languageMenuItems\" routerLinkActive=\"active\"\n\t\t\t\t\t\t\t(click)=\"selectLang(lang.value)\"><a>{{ lang.title }}</a></li>\n\t\t\t\t\t</ul>\n                </li>\n                <li class=\"dropdown\" >\n                    <a href=\"#\" class=\"dropdown-toggle\" data-toggle=\"dropdown\">\n                        <i class=\"material-icons\">settings</i>\n                        <p class=\"hidden-lg hidden-md\">Settings</p>\n                    </a>\n                    <ul class=\"dropdown-menu\">\n\t\t\t\t\t\t<li *ngFor=\"let settingMenuItem of settingMenuItems\" routerLinkActive=\"active\"\n\t\t\t\t\t\t\tclass=\"{{settingMenuItem.class}}\"><a [routerLink]=\"[settingMenuItem.path]\">{{ settingMenuItem.title }}\n\t\t\t\t\t\t</a></li>\n                    </ul>\n                </li>\n              <div  style=\"margin-left:10px; margin-bottom:10px\">\n                <a class=\"md-warn\"  href=\"#/emergency\" style=\"margin-right: 10px\"\n                   class=\"btn btn-danger pull-right\">EMERGENCY</a>\n              </div>\n            </ul>\n        </div>\n    </div>\n</nav>\n"

/***/ }),

/***/ 721:
/***/ (function(module, exports) {

module.exports = "<div class=\"logo\">\n\t<a href=\"http://www.caresystemsinc.com\" class=\"simple-text\"> <img\n\t\tsrc=\"assets/img/caresytem-logo-small.png\" />\n\t</a>\n</div>\n<div class=\"user\">\n\t<div class=\"photo\">\n\t\t<img src=\"assets/img/faces/marc.jpg\" style=\"height: 80px;\">\n\t</div>\n\t<div class=\"info\">\n\t\t<a href=\"#\"> Porter Manager </a>\n\t</div>\n</div>\n<div class=\"sidebar-wrapper\">\n\t<div class=\"nav-container\">\n\t\t<ul class=\"nav\">\n\t\t\t<li *ngFor=\"let menuItem of menuItems\" routerLinkActive=\"active\"\n\t\t\t\tclass=\"{{menuItem.class}}\"><a\n\t\t\t\t*ngIf=\"menuItem.children.length == 0\" [routerLink]=\"[menuItem.path]\">\n\t\t\t\t\t<i class=\"material-icons \">{{menuItem.icon}}</i>\n\t\t\t\t\t<p >{{ menuItem.title | translate }}</p>\n\t\t\t</a> <a *ngIf=\"menuItem.children.length > 0\" data-toggle=\"collapse\"\n\t\t\t\thref=\"#{{menuItem.path}}\" class=\"nestedChildren\" aria-expanded=\"false\"> <i\n\t\t\t\t\tclass=\"material-icons \">{{menuItem.icon}}</i>\n\t\t\t\t\t<p>\n\t\t\t\t\t\t{{ menuItem.title | translate }} <b class=\"caret\"></b>\n\t\t\t\t\t</p>\n\t\t\t</a>\n\n\t\t\t\t<div class=\"collapse\" id=\"{{menuItem.path}}\" aria-expanded=\"false\">\n\t\t\t\t\t<ul class=\"nav\">\n\t\t\t\t\t\t<li *ngFor=\"let children of menuItem.children\" routerLinkActive=\"active\" ><a\n\t\t\t\t\t\t\t[routerLink]=\"[children.path]\">\n              <span class=\"sidebar-normal\">{{ children.title | translate\n              }}</span></a></li>\n\t\t\t\t\t</ul>\n\t\t\t\t</div></li>\n\n\t\t</ul>\n\t</div>\n</div>\n"

/***/ }),

/***/ 85:
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAPAAAAHgCAMAAACsKhCPAAACRlBMVEUAAABzc3NWVlYAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAgIAAAAAAAABeXl4AAABvb29OTk4AAAAAAAD///9VVVVUVFRSUlKhoaFQUFAAAAAKCgpTU1MAAABPT09/f3/l5eVdXV1WVlZXV1dRUVFkZGQAAAAwMDAAAAB9fX17e3t1dXV0dHR3d3d5eXlcXFxbW1taWlpZWVlYWFgAAABoaGgAAAAAAAB+fn52dnZ8fHwEBAR6enoUFBR4eHhMTEz9/f1LS0tVVVXc3NweHh7n5+fx8fH09PT6+vr5+fnj4+P7+/vl5eX39/fz8/P29vbt7e3v7+/r6+vp6enh4eHf39/d3d3a2toXFxfm5uYAAADi4uIAAACNjY0ZGRlUVFSioqIAAAAkJCRbW1upqakAAACioqJYWFgbGxv///+ZmZn+/v77+/vX19f4+PjBwcGzs7Px8fHd3d3i4uL19fXn5+ft7e29vb3o6Ojf39/Ozs7w8PDNzc3Y2NjIyMjj4+P5+fns7OzCwsLk5OT09PTg4OCrq6vT09Pl5eX8/Py4uLj29vb9/f3S0tLy8vLa2tr39/fGxsbp6enz8/Pb29vr6+ve3t76+vq5ubnQ0NCurq7Hx8ewsLDm5ubu7u7q6urDw8Ovr6/U1NTMzMy+vr6qqqrh4eHV1dWysrLKysrv7+/Ly8vR0dHW1ta1tbWsrKy8vLzc3Ny6urqoqKi7u7u3t7epqanFxcW/v7/Z2dnAwMDPz8/ExMS0tLTJycmxsbGtra22trbkM1sTAAAAaXRSTlMAAlxJAhIlMQw9BgIFMFQBR1wYEQFcXFySXA8zXA5cAgFUVFRcRyZLFAICAgICAlRUVFRUPkdhVQICAj4CDQJo/mhU/kX+/v7+/v7+/v7+/v7+/v7+/v7+Q/4Q/iihNliRG0dceQSSOjlOmCs4AAATVUlEQVR42u3diV8aaZoHcHu0uZKdTjKd9CbbV5LpmT6nz+nZmZ3ZOfa+7/u+lygaTilAuWRFUe5DgoCtGYwIaXF1jdE23f/ZvtxVUKV1vFAv8DyfT39aq6iH90sVUJe/jI0NSd0bFgiAAQxgAAMYwAAGMIABDGCWmrh8eWKUwBPPX7ny/MTogCee/5pW+zVM4gEA17zYxOSDG15cYuLBLS8mMelgmhePmHAww4tFLB2sUihUYuaJ8OIQSwar1FqtWiV8nigvBvE9DF4u1XnzRHq12iuXZQXXTeyq8+aJ9soMbprYVOfNE++Vd5Num7pV582T0SsJTDd1qs6bJ6dXCphpYqrOmyerVwK400RXnTdPXq8EsKJ7RE1Vt1erVZDhxQtuiNm8QsC99GLdpBtizhkkeHF+aDVgZHsxfi01anycaC++HY/ziiAvtl3LQfHiOnjA5B27fEWrneysH7+Jz4vh8HByZWlpiqOWllYmBe1yXL4yifp19PgpSWAkXppyTU+HWWp62jW1JHQX6/rKVMqFGrbKlZq6Ts4mXROnwqZYUN9VwZgpnBK+E30dvX7hgKlVgbALpxjDSTyVenpBn7O4E4xyW3L6hWkxh0nXmS9g7XW7TsbXUksc0Fui5qyfVllz1KIPiDsQvjFtCtpzOUu9cjl70DR9g6hrSyp1zGL1Fqhkq6iC12qJiT3VcSMQzLnzUWu9onl3Lhi4QdS1JZVaH3UmQ3O6Rs2Fks6oXvzJrBsme8Ka9Xvr5c9aE3bTDaKuLanUOb9Bt1hKn6BKlxZ1Bn9OyunKl2ubjI+ql6+2vbxM1LUllTpRmCs5ds7m5892HKW5QkLaCemX9XmvzxAP1Stu8Hnz+peJurakUkcrq7tHnpkZz9HuaiWqlnjJ4aWiuVCZK2/XqzxXKZiLLxF1bUmlzh47jp7s7T05chxnpXlrYovXoNssldLVKpU2dQav5SUSri3RxN7ts6cHB0/Ptr1SvTVxonC8atva3anW7pZt9bjgfkn+a0sMsXExMzOTWTRK91bF34wmt21nmchRtSKZnROdsfhNua8tdYo3HY5NLN6a2Bwv7aCPhafVmtnInISsxe9eJgiMxGaKMuPxVsU3/ce2yNPZvQNUew89u7psjixw9ZMri8tbE3vLOzMHy4dffXW4vOdxhPI3idqkx6RfAu8SGzczD5e/uH//i+WHmU3vTaI+tHpQE8+/6iud7t9/9uz+/mnJ9ypRX0u9ElO2meVHj5ZnbNSrw39TS1V81eCY2d+fcRiujsJtS3Vxen4+jcc7GLceXvVWKt6ro3LrYU2czV4dnZtLq+I33hil24dH7wZxnAVgAAMYwAAGMIABDGAAAxjAAAYwgAEMYAADGMAABjCAAQxgAAO4x2CMFzQHAowz8WoQwFgTr1QKJa1w3ueGDYw18UpqfEAfwFgTr6TGB/QBjDfxSiEtPqAPYEyJV8137ve6wd9TdpX4d/Y9rF7R4olbn2gF1Se3JuQBY0q8qv7dsLASG0J0D7NXpFjzdaHgr2tkAbOtGTHigVnDrAMVIZ649S2loPqWTO/h3ocU4C7sH1qki3F/LYkUD8wmjUs8MB9auMQD87WESzxYYAziAQNLFw8aWLJ44MBSxYMHligeQLA08SCCxybe/HFXFBbfHQQEnhRUZIB/2pGshdK0JvmCz0nlYs3pImGTvo6SsOhBWCgJa4VnTJLm9hJj2QvKlVq6Lf+HFgrCYuZgTfMPwtLcTk0HTAs8yxSYTskNlhiDpbntMgX1dp6lD5pct+Xe8ZAWgqV5PxwsWtw8y1IMht+XeddSYgSW5n1TMWE18yxromh6X96DB6kBWJoPgm6z08iznGZ38ANZDw8lx19pPrBbnZSBZ1FOq11GMI7wK82HOT9KXONZoaQ/96FsYCzRV5oP3cbQ9iLP2g4Z3bKB8QRfaT5CyUppB89KbyejH8kERl53V+xVQnDsleYjFKy0O8+zdktxs0xgFAFVNOpOdlqhV2c29OoLD73SfOzXbR15eNbRls7/sUzXlr5btIZOMhuNyCvP0Q568UWEfGk+di7OP53lWU/nF52ygXNZ3a7nYT3xavZpxHbsF5OIpLnrS5/uLfOsvdO0765cm/TNfMjh2asnXh3M7JTFJUBp7iYdTw/v86zDp47kXdk+tG566YlXRnGJV5q7lbODRw941qODs8pd+b6WcCReae6EMssPfs6zHixnQndk3PHAkHiluVOZX1v/H561vjZfuSPnrqX0xCvNnYJNyHvYVrgj68GD5MQrzc/MIcfpDM86dYTMP5P38FBq4tXlN7LZQkjHs0KFbPaNyzKCpSdeDdIF8YYYX+JVbwtuEB/2AjCAAQxgAAMYwAAGMIABDGAAAxjAAAYwgAEMYAADGMAABjCAAQxgAEsoZgSW9CAs3P3wgtHoxtn+OlBsLBRXv3Es5nvSueNcfw95rfmQayos/ZBZOlkquDvvq2sNo4fwX9nn9JO02eAC8/PyH+dFXunie33x8h3nxV7J4nv98fIbJx+vVPG9Pnn5jJOfV6JYClghxNv+0BbRr6MU8oBV4+1vSPZ9BIb3wvXC3a9R7fkqWcCKiyjCvEL6KWQBKy94vQV6L+xH2waUcoAvenahXj4apfRtWjy4tQUqsXgv6scAS9imxYOVXQNUKdq7uoK9LP3EPaZ/4KpRrRLrHTxw3VjHifAOHLhprPLEeAcN3DaqVaK8gwam7RaOj4va7x1csMj9/IHdpMUe1wwAuJFs1frQ6sq8an1J8Tmp1dFP9GN6B64lYKFkq9bX0iQtEwtNn2x/KU8qhPcT+5jegWsJWCjZqr3jsYICtVytKK22d4XPALv6iXxM78BTKAELJVtNtXct1c1ErUDYNdX2Li3xGWB3P3GP6R3YZYrp9TGTq/3kKnUqvBALBmML4VTbO4VWt1JUP1GP6R04HCtaLMVYmPbkKjVK1ULhYabpthetkwCfAbL1E/OY3oGriVLVGCn6k6vU4YVgcCHc9qJgsGIwoBTZT8RjegdesJi9XrM7xnjy6jqmr9+APRHN5xaUYvt1PCbmrj7GsiALOIgypShnVM98cmQMtPY3FAF71Gv0J2JK0f2Yj9FHnRQKrwrKA7YW4nEqW+x4cvppAGUsbzQYCtagUnw/xmOKWSoe59cPO1gRs1JzOpRsdd4Ac86K7piyxhSY+qHULd0cv37Ywapxq2F7dbOSPW+A5sr26rbByuekG69+2com337YwWPKvGHRdlL2nXda1Vc+sS0a8ko5+mEHK3LU4taOTefkPnHu1Nl2thapnEKOftjBqnF/eSszb0PrhOPSiK9sm89slf38tkDc/bCDxxQWQzqycbST1lV83eGTvoouvXO0EUkbLAp5+mEHq9RmFB725IknsrNl66qtnUh13q7OzP/yP95+2MHVN9Vm5sn+8to+SkvrqL2D/bXl/SeZTaeQGzzw9sMORiM0LkZmD7949Gx9/TNGra8/e/TF4Wxk0ShkfLj7YQfX1sk8yktbf/Dl5/TEq8+/fLCOEtTmha4P3P2wg6vvu5At8mT/8DEz8urx4f6TiC0k+P2Gux92cPVGMm9odTdy6qEnXnlOI7urIa+IG8lw98MOrt8q6EVJuvTEK5SX6xV7qyDuftjBY6N2c+lgFYABDGAAAxjAAAYwgAEMYAADGMAABjCAAQxgAAMYwAAGMIABDGAAAxjAAOasHt6iQCC4t/lXxIF7nX9FGrjn+VeEgXuff0UWuA/5V0SB+5F/RRK4L/lXJIH7kn9FELg/+VcEgfuTf0UQmJb1xLFriSP/ihwwTcOZaaEkb5vGkqel4PqsUpK3TWMJLlGyg5U4gkYADGAAAxjAAAYwK7iVbaXsitLqmDEc4Ha2lZIWpEUL1FLiyL8iCNzOtqr/yCzaDEn5VwSBG9lWKeRKoR8XGEWbITH/il/1A9zItppGrmn0o51RtBnS8q8IWsONbCsUHaUMoB/djKLNkJZ/RRC4kW2Fop6UC+hHM6NoM6TlXxEEbuRfoeQjZRD9yEzdQKFXtRmS868IAjfyr+zIpU/4CxSjCv4ECsZS2iXnX5EErudfWWorMmtkgo3Z2qq3SM6/IgfczL9C0UeKBXs+62RUNm9fQKd48pLzr8gBN/Ov/NWTeMEi+nCiV6IYrJ7E80vOvyIH3My/os47TUtJzr8iCNzIvyoXuE/EF8qS868IAjfyrxzlJNellmTZITn/iiBwO/+qHDdQVJJRFGWIl3HkX5EE7kv+FUngvuRfEQXuR/4VWeA+5F8RBu59/hVp4J7nXxEH7nX+FYHgsVG7uXSwCsAABjCAAQxgAAMYwAAGMIABDGAAAxjAAz9AAAMYwAAGMIABDGAAAxjAsvRjuRKO+UI4YWBFz0MsCAMrWf8CD8BDD1ZdU40WWKH95NbEKIHR5H/62xdGCjyp/fYrL4wSeEWLSTxAYDziQQJjEQ8UWPvrr4wYWPvXktfxgIG1/ypVPGhg7be/MTES4MnWr/92awTAjKPGfxkBsErxS8367/96ZQTAqF5o1MTEC8MO/uQbjFL9x7CD/+Gff5FW//nvbw47uLP+fsTAk78wYuCfDBl48qIaMjBLklZHrNbvDReYJUmLGas19dvDBZ5yhVFiFmcFwq7fkQgmJk+rDnYFFoJ67gouBP5AGhh3SQVPx+w5C3fl7LE/Gi5wQG/JR7krb9H/1nCBF3J5s5+7zPncHw4XOJjIGn3cZcwmfnO4wHZrwRDnLkPB+ifDBS76k8c67gol/X88XGCLMbS9yl3bIeOfDhc4QZXTDu5Kl6k/Gy5wtLK6O89du6uV3xgusHnOltngrozt+PeHC+zf3vE85C7PzvbvDhfYuRqZXeOu2cjqnw8XuHDiWXvMXfue9F8MF5jaevh4nbseP3T85XCBDTsHzz7nrmcHO782XOBKZvnL/+WuL5czfzVka/hs7bP/46yff7Z2NmRr2Hkyc/iIuw5n0n83ZDsecdvRDHcd2eJ/M1RgRTaL8oW5K27MZkmK8ezFDeKEJ6fB3w8DGMAABjCAAQxgAAMYwAAGMIABDGAAAxjAAAYwgAEMYAAPIvjFPi0z0OCRW8OjDn5x1MCXSAb3YgsmGnwJwAAGMIAHA6xSVG9dEjo4jlw9xmQywSq1Vov+zdZLgpdi+4demZOJBFe9VfEl4Ut1izsmkwiue9EofyRiqU5x52QCwU2vVvsrKhFLMcVdk8kDt71aLf9/e5m2FH2h7snEgele/mLGUu2FWCaTBmZ6+Yo7lmouxDaZMHCnl5+4a6n6QqyTyQJ3e7Xaaxcv1h1ZXaWxNFMQBmbz8lnDCrbF2JoRBhbrZV1wfJy9GUFg0V72RTmakQOW4OUnJuxriW3IAva0LhYTtuPBun5/JLEB28YiD7h+uHvh9nxpDJtY3oOHxuHuhe9fEYeHF3llATcPdy/8vLo0hkks7wmA1uGu6qLP50tjeMRqWU/xtEfVGAf399GlMSxixrun72CVGqX8raBC/6uNpDWhWc0ZY2OvCe5+7VNGq1q7Txl746/1GaxSryxNpVIuVyo1tbSCYPUJrlY1JosbnErN6NXox1jDfQajEaEIwHAAVXgaDUZ9TT3VnNCc2B7ga4K7T9F6tTpO0cX9BVdHhBLx6pF4wRgK/PsUBQLGWhF5aFI41R7eLwvtngrTmrG2FNpTIvhaKhVuJeLlcnZ9EOHtufaEoMlFG9xbAr0uU7DVrBWx19H0rb6Cq2Oyo0Q8a62i+Xwikci3f3UXg2H65veWsN7hYNHdbNaujrb9BaNRBfQJq9/rrJXX6/Wj/xq/+K0Ju4nxAfMDQZ1N9nbnau/WT4zGP+gvGI0r5jY7fUlDZyV9TrM7xjwefFts3yRF+XwUlWRp/XafwWhk+ryTih/PMes4Tjnz+o7j37dFdj2OV8lJQ/v3dvO+g9HYilkqVN5cpMXCLW6WQ1S22Hm8/0P+Pe3mVk/U7NjgMxp9huP2lBBlttfa/7DvYDQ6izO+nbY5tprlsKW3405L1/mN7/DuGDQbmh2rzUKF7Ph4thCiTzOYg9Un+E7/wWh8CZ8uvTufidQrM7+b1vkS3edz+A5OoXdTm46zTKsZFa2etYxSrWfJnDk2KbdeIQ8YiaOGxd3IhqcWzeLZiOwuGqIs569+lS+4mK+Uzk49zGb0Z/GcnpUq+aKCf0+sYDQWc+gkMjO7d3BwsDc7EzkJmdnO173Hu10uWcpU2zGatZ8FTc6Ukrnq5PdkAaOx+HW7nr21w68O1/Y8uzo/6/nJ9wS8gHPVdsvMZs1nqU2eq78MMoHRWJybmdnD+4/uH85mNp3s52O/L7Dd8lfLzGYsk78vExiNpVDaWLv/7P7aRqnAcf75HWHtTvfW9k6ZzbonvyMXGI3Fl/bsH6LMPx/X+fZ3hLUrZTYyJV/nHQAdk+UD18YS2YiUOL1j7wp8k8xtzjm77/FgTn5XPjAai/d4+9jLfT3lXYHtzGYz2108jMlygtFYstnsOdePnhPcjv0+Lfrk5+QEoysQ/3heWJjQwfG5E09ecPXflBrDB+ZT/QS//pyYen1wwdLrRQAL325gDQ8b+HUADxAYQ70+auAxAAMYwAAGMIBHAvz/FW/+VY6NBOMAAAAASUVORK5CYII="

/***/ }),

/***/ 86:
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAPAAAAHgCAMAAACsKhCPAAAAP1BMVEUAAAAzMzMzMzMzMzMzMzMzMzMzMzPS0tL///8zMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzPt7e0zMzMzMzM8PDx7bmBmAAAAE3RSTlMADv4GXAL9HwH8CFkdIRQKXQZQ61O9/gAABrVJREFUeNrt3euS3CYQhmFiJ5ZydBL2/q81h8o6Y+uE4EN00y//RlqpeGo0ApqGTWmSklOwAhgwYMCAAQMGDBgw4KnByxILvOS8RAL/7ZWJsxevSpzdeEXi7MerEWdHXok4e/IqxAJwznXnKrwCcRZ4j1Vn56q87eKs8B6pzs5VeoeD3+tx99wobyv4/5rcOzfM2wh+rcudc+O8beCva1N+bqC3CfxtfUrPjfS2gLc1Kjs31KsF54JTg73SR/oLy7BX+dL6ArPsFTZLX2imvbqOx1kx5JV1Lb14VYMHN17R8FDm9QBOSq+DR/pCbKcTrYxpKb3Gm6ULsaWBsDZqqfQa7lpeiG0Fs8TgpPQaHR7eCAcYEgtnHpRemyEeddjOfhDvWKy4m8Uw7ZFYczeLgfh9sepuFqda9sS6uy32wSlL77hYf6TlZbH90uotDpDyEC+pJV7aUrzEtHiph/GSS+OlDys7RoABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMuKksSyzwIl5PZR28SNdhZG3mdQewNrEo9xRrU7mXDl6xOCu9mmRI82BR+me+VQaCNQm+S75ZllFgUQq3G7AqSd8z2HYPxOwKMrs9LWdiu2vmDPelFWI/zZJI7AssEDsDt4u9gZvF7sCtYn/gRrFDcJvYI7hJ7BLcIgbMI81Li2aJjgddSwYPDA8JABDiEQXxHIE1QUvHc0t1lQk31cJkGtOlVl9a00+Ii1IevHY8lhQBrEhb8jl4WFIUcHvqoccAQKjk0njpw24KYMCAAQMGDBgwYMCAAQMGDBgwYMCAAQMGDBgwYMCAAQMGDPjkNtJ/Ia6/nxas3iCow5ZDSnBB7bKGKyHnJ7x36tltXykRuMxbXs+OO2lJwKXe0np23TtMAC73ltWz825pzeA73pJ6dt8fTgUuIgjuNxr8tFciFoBV3pLXm23w3V+ddXDpL+6mN7f+zSjw7beqQ3B1e+QU/PqhotV0B379VNNL8AZ+/VjVK3IGfiXW9QLdgmt7vV4f6epevtOXVv2oxmez1BDUctnxOBoUz9q1bAriuexLHwU95h08NAQtnY6W9n/XMw8Pq4O0bsfDe+/tCAEAwO7B8qCb+6jlrGBZ4Nx8IF4+NWJ9qkU++WV+Mk0+vWl9ulQ/gW19QlyfomA95UGfhGI9qUWfZmQ9bSnpE8mMJ6Yd1tHS/eRgPwUwYMCAAQMGDBgwYMCAAQMGDBgwYMCAAQMGDBgwYMCAAQMGDDguuF8SikVw1zQje+DOiWTmwL1TBa2BuyeDGgP3T/e1BX4godsU+ImUfZPg2vPewI8suzEIbvwTn+CjX+5U4BfY4bvK3jMNGDBgwIABAwYMGHAUsDrGwDcMGDBgwIDnAIcL4oUN08YJxIebaok3mRZuujTehHi8lId4SS3x0pZSuMS0dNa1nBbspwAGDBgwYMCAAQMGDBgwYMCAAQMG7K2CgAEDBgwYMGDAgAEDBvzI/bqnOgAGDHgEOIcD51+CgT/k72KBP2WR2BFYI/YElohdgfNP0cD5YzRw/hwN3Pw79tMOv5dfg/S0rPwb+6cGDz+8l4+/MVoC7Bz88/ev5fc/pwdrv3F/4A/RwD8CBgw4NNjOflrPgFO0bxgwYMCAAQMGDBgwYMCAAQMGDNgg+FM08GTbPLorgAEDBgwYMGDAgAEDBgwYMGDAgAEDBgwYMGDAgD2C18cu8gxOgGOBV8B2wKuNmwIGDBgw4PDg/KasWzYPzvkf8Vpx2eVhk+B/8w/fbtftIG3x68MWwf9lXL6tVZddHDYIrkwyPbjq28P2wJVptQdXbQ6bA9cu1N+/anvYGrgydfrgqp3DxsCVyeIHV+0dtgWuTY6/3oTNJrh+McDelft3swRuWfxQvFWJIXDbYo/SpSN2wNsarkkpttbx2KnhmoRia13LvRquSScePHjY/Dw1LUjJ0q8h4M0LSdaCXC91GwHeVELWgqTrpX0DwJtq6FqQffHgmNamIsIWpKA1fxy8qYqyBTH4DW+qIm1B7P2GN1URtyDW3tL3FkvP0A7fWhw+RU/rzmL4OfrSNxb/TzJaKt/sYNW+Hob3tC7H+6v2dTgu4lG6mcXacktTMa3CzTvWJq+pqGXZZiUN4OPDgyIeRfG6+kf65PCoEE9JfLL6pXV2eFhMqyAeW9ssnR4eF8S7jj9XdjzODw+MWl7G26fLALiaX5gvx+NiPmXCLJ7z+aMZ87T+SFJwQSH1sB94rSuBvuEuX7l/cPcnhm/YOHgF7Acc7i09pgAGDBgwYMAOwX8BjFtKB7+K+X8AAAAASUVORK5CYII="

/***/ }),

/***/ 88:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(1);
var NameRendererComponent = (function () {
    function NameRendererComponent() {
    }
    NameRendererComponent.prototype.agInit = function (params) {
        this.params = params;
        this.values = "" + params.data.name;
    };
    return NameRendererComponent;
}());
NameRendererComponent = __decorate([
    core_1.Component({
        selector: 'full-width-cell',
        template: "<div class='employee'><img src=\"assets/img/faces/marc.jpg\" class=\"photo\">  <span class='employeeName' >{{ values }}</span>"
    })
], NameRendererComponent);
exports.NameRendererComponent = NameRendererComponent;
//# sourceMappingURL=name-renderer.component.js.map

/***/ }),

/***/ 991:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(474);


/***/ })

},[991]);
//# sourceMappingURL=main.bundle.js.map