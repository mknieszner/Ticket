(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ "./src/$$_lazy_route_resource lazy recursive":
/*!**********************************************************!*\
  !*** ./src/$$_lazy_route_resource lazy namespace object ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(function() {
		var e = new Error('Cannot find module "' + req + '".');
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "./src/$$_lazy_route_resource lazy recursive";

/***/ }),

/***/ "./src/app/app.component.css":
/*!***********************************!*\
  !*** ./src/app/app.component.css ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/app.component.html":
/*!************************************!*\
  !*** ./src/app/app.component.html ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<app-header *ngIf=\"currentUser | async\"></app-header>\r\n<router-outlet></router-outlet>\r\n"

/***/ }),

/***/ "./src/app/app.component.ts":
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/*! exports provided: AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _shared_auth_cookies_handler__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./shared/auth-cookies-handler */ "./src/app/shared/auth-cookies-handler.ts");
/* harmony import */ var _ngrx_store__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ngrx/store */ "./node_modules/@ngrx/store/@ngrx/store.es5.js");
/* harmony import */ var _shared_socket_task_info_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./shared/socket/task-info.service */ "./src/app/shared/socket/task-info.service.ts");
/* harmony import */ var _shared_store_user_users_actions__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./shared/store/user/users.actions */ "./src/app/shared/store/user/users.actions.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _shared_store_reset_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./shared/store-reset.service */ "./src/app/shared/store-reset.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var AppComponent = /** @class */ (function () {
    function AppComponent(cookie, store, taskInfo, router, resetService) {
        this.cookie = cookie;
        this.store = store;
        this.taskInfo = taskInfo;
        this.router = router;
        this.resetService = resetService;
    }
    AppComponent.prototype.ngOnInit = function () {
        var _this = this;
        console.log('AAA');
        this.currentUser = this.store.select('users', 'currentUser');
        this.currentUser.subscribe(function (user) {
            if (user.length > 0) {
                _this.store.dispatch(new _shared_store_user_users_actions__WEBPACK_IMPORTED_MODULE_4__["SetNewWebSocketClient"](_this.stompClient = _this.taskInfo.getClient()));
            }
            else {
                _this.router.navigate(['/signin']);
            }
        });
    };
    AppComponent.prototype.ngOnDestroy = function () {
        this.resetService.resetStore();
    };
    AppComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-root',
            template: __webpack_require__(/*! ./app.component.html */ "./src/app/app.component.html"),
            styles: [__webpack_require__(/*! ./app.component.css */ "./src/app/app.component.css")]
        }),
        __metadata("design:paramtypes", [_shared_auth_cookies_handler__WEBPACK_IMPORTED_MODULE_1__["AuthCookie"],
            _ngrx_store__WEBPACK_IMPORTED_MODULE_2__["Store"],
            _shared_socket_task_info_service__WEBPACK_IMPORTED_MODULE_3__["TaskInfoService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_5__["Router"],
            _shared_store_reset_service__WEBPACK_IMPORTED_MODULE_6__["StoreResetService"]])
    ], AppComponent);
    return AppComponent;
}());



/***/ }),

/***/ "./src/app/app.module.ts":
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/*! exports provided: AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm5/platform-browser.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app.component */ "./src/app/app.component.ts");
/* harmony import */ var _header_header_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./header/header.component */ "./src/app/header/header.component.ts");
/* harmony import */ var _signin_signin_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./signin/signin.component */ "./src/app/signin/signin.component.ts");
/* harmony import */ var _definition_definition_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./definition/definition.component */ "./src/app/definition/definition.component.ts");
/* harmony import */ var _user_user_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./user/user.component */ "./src/app/user/user.component.ts");
/* harmony import */ var _roles_roles_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./roles/roles.component */ "./src/app/roles/roles.component.ts");
/* harmony import */ var _tables_tables_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./tables/tables.component */ "./src/app/tables/tables.component.ts");
/* harmony import */ var _home_home_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./home/home.component */ "./src/app/home/home.component.ts");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _tables_row_row_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./tables/row/row.component */ "./src/app/tables/row/row.component.ts");
/* harmony import */ var _ngrx_store__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @ngrx/store */ "./node_modules/@ngrx/store/@ngrx/store.es5.js");
/* harmony import */ var _tables_key_pipe__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./tables/key.pipe */ "./src/app/tables/key.pipe.ts");
/* harmony import */ var _tables_row_question_control_service__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./tables/row/question-control.service */ "./src/app/tables/row/question-control.service.ts");
/* harmony import */ var _tables_table_header_table_header_component__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./tables/table-header/table-header.component */ "./src/app/tables/table-header/table-header.component.ts");
/* harmony import */ var _user_user_details_user_details_component__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./user/user-details/user-details.component */ "./src/app/user/user-details/user-details.component.ts");
/* harmony import */ var _roles_role_details_role_details_component__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./roles/role-details/role-details.component */ "./src/app/roles/role-details/role-details.component.ts");
/* harmony import */ var _shared_data_storage_service__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./shared/data-storage.service */ "./src/app/shared/data-storage.service.ts");
/* harmony import */ var _tables_menu_menu_component__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./tables/menu/menu.component */ "./src/app/tables/menu/menu.component.ts");
/* harmony import */ var _shared_oauth_service__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./shared/oauth.service */ "./src/app/shared/oauth.service.ts");
/* harmony import */ var _shared_auth_interceptor__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ./shared/auth.interceptor */ "./src/app/shared/auth.interceptor.ts");
/* harmony import */ var _shared_auth_cookies_handler__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ./shared/auth-cookies-handler */ "./src/app/shared/auth-cookies-handler.ts");
/* harmony import */ var _tables_row_details_row_details_component__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ./tables/row-details/row-details.component */ "./src/app/tables/row-details/row-details.component.ts");
/* harmony import */ var _shared_filter_filter_service__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! ./shared/filter/filter.service */ "./src/app/shared/filter/filter.service.ts");
/* harmony import */ var _tables_task_task_component__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! ./tables/task/task.component */ "./src/app/tables/task/task.component.ts");
/* harmony import */ var _shared_store_table_tables_reducers__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! ./shared/store/table/tables.reducers */ "./src/app/shared/store/table/tables.reducers.ts");
/* harmony import */ var _shared_store_user_users_reducers__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! ./shared/store/user/users.reducers */ "./src/app/shared/store/user/users.reducers.ts");
/* harmony import */ var _shared_store_task_tasks_reducers__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(/*! ./shared/store/task/tasks.reducers */ "./src/app/shared/store/task/tasks.reducers.ts");
/* harmony import */ var _shared_store_chat_chat_reducers__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__(/*! ./shared/store/chat/chat.reducers */ "./src/app/shared/store/chat/chat.reducers.ts");
/* harmony import */ var _shared_store_statistics_statistics_reducers__WEBPACK_IMPORTED_MODULE_31__ = __webpack_require__(/*! ./shared/store/statistics/statistics.reducers */ "./src/app/shared/store/statistics/statistics.reducers.ts");
/* harmony import */ var _ngrx_router_store__WEBPACK_IMPORTED_MODULE_32__ = __webpack_require__(/*! @ngrx/router-store */ "./node_modules/@ngrx/router-store/@ngrx/router-store.es5.js");
/* harmony import */ var _ngrx_store_devtools__WEBPACK_IMPORTED_MODULE_33__ = __webpack_require__(/*! @ngrx/store-devtools */ "./node_modules/@ngrx/store-devtools/@ngrx/store-devtools.es5.js");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_34__ = __webpack_require__(/*! ../environments/environment */ "./src/environments/environment.ts");
/* harmony import */ var _user_user_task_user_task_component__WEBPACK_IMPORTED_MODULE_35__ = __webpack_require__(/*! ./user/user-task/user-task.component */ "./src/app/user/user-task/user-task.component.ts");
/* harmony import */ var _shared_socket_task_info_service__WEBPACK_IMPORTED_MODULE_36__ = __webpack_require__(/*! ./shared/socket/task-info.service */ "./src/app/shared/socket/task-info.service.ts");
/* harmony import */ var _shared_socket_web_socket_service__WEBPACK_IMPORTED_MODULE_37__ = __webpack_require__(/*! ./shared/socket/web-socket.service */ "./src/app/shared/socket/web-socket.service.ts");
/* harmony import */ var _chat_chat_component__WEBPACK_IMPORTED_MODULE_38__ = __webpack_require__(/*! ./chat/chat.component */ "./src/app/chat/chat.component.ts");
/* harmony import */ var _shared_store_reset_service__WEBPACK_IMPORTED_MODULE_39__ = __webpack_require__(/*! ./shared/store-reset.service */ "./src/app/shared/store-reset.service.ts");
/* harmony import */ var _shared_reverse_pipe__WEBPACK_IMPORTED_MODULE_40__ = __webpack_require__(/*! ./shared/reverse.pipe */ "./src/app/shared/reverse.pipe.ts");
/* harmony import */ var _shared_filter_extended_filter_pipe__WEBPACK_IMPORTED_MODULE_41__ = __webpack_require__(/*! ./shared/filter/extended-filter.pipe */ "./src/app/shared/filter/extended-filter.pipe.ts");
/* harmony import */ var _shared_sort_sort_by_pipe__WEBPACK_IMPORTED_MODULE_42__ = __webpack_require__(/*! ./shared/sort/sort-by.pipe */ "./src/app/shared/sort/sort-by.pipe.ts");
/* harmony import */ var _statistics_statistics_component__WEBPACK_IMPORTED_MODULE_43__ = __webpack_require__(/*! ./statistics/statistics.component */ "./src/app/statistics/statistics.component.ts");
/* harmony import */ var _user_info_user_info_component__WEBPACK_IMPORTED_MODULE_44__ = __webpack_require__(/*! ./user-info/user-info.component */ "./src/app/user-info/user-info.component.ts");
/* harmony import */ var _shared_statistics_statistics_service__WEBPACK_IMPORTED_MODULE_45__ = __webpack_require__(/*! ./shared/statistics/statistics.service */ "./src/app/shared/statistics/statistics.service.ts");
/* harmony import */ var ng4_charts__WEBPACK_IMPORTED_MODULE_46__ = __webpack_require__(/*! ng4-charts */ "./node_modules/ng4-charts/index.js");
/* harmony import */ var ng4_charts__WEBPACK_IMPORTED_MODULE_46___default = /*#__PURE__*/__webpack_require__.n(ng4_charts__WEBPACK_IMPORTED_MODULE_46__);
/* harmony import */ var _shared_clear_array_pipe__WEBPACK_IMPORTED_MODULE_47__ = __webpack_require__(/*! ./shared/clear-array-pipe */ "./src/app/shared/clear-array-pipe.ts");
/* harmony import */ var _spinner_spinner_component__WEBPACK_IMPORTED_MODULE_48__ = __webpack_require__(/*! ./spinner/spinner.component */ "./src/app/spinner/spinner.component.ts");
/* harmony import */ var _statistics_table_stats_table_statistics_component__WEBPACK_IMPORTED_MODULE_49__ = __webpack_require__(/*! ./statistics/table-stats/table-statistics.component */ "./src/app/statistics/table-stats/table-statistics.component.ts");
/* harmony import */ var _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_50__ = __webpack_require__(/*! @angular/platform-browser/animations */ "./node_modules/@angular/platform-browser/fesm5/animations.js");
/* harmony import */ var _shared_modules_material_app_material_module__WEBPACK_IMPORTED_MODULE_51__ = __webpack_require__(/*! ./shared/modules/material/app-material.module */ "./src/app/shared/modules/material/app-material.module.ts");
/* harmony import */ var _training_training_component__WEBPACK_IMPORTED_MODULE_52__ = __webpack_require__(/*! ./training/training.component */ "./src/app/training/training.component.ts");
/* harmony import */ var _shared_modules_routing_app_routing_module__WEBPACK_IMPORTED_MODULE_53__ = __webpack_require__(/*! ./shared/modules/routing/app-routing-module */ "./src/app/shared/modules/routing/app-routing-module.ts");
/* harmony import */ var _angular_flex_layout__WEBPACK_IMPORTED_MODULE_54__ = __webpack_require__(/*! @angular/flex-layout */ "./node_modules/@angular/flex-layout/esm5/flex-layout.es5.js");
/* harmony import */ var _training_dialog_dialog_component__WEBPACK_IMPORTED_MODULE_55__ = __webpack_require__(/*! ./training/dialog/dialog.component */ "./src/app/training/dialog/dialog.component.ts");
/* harmony import */ var _training_table_table_component__WEBPACK_IMPORTED_MODULE_56__ = __webpack_require__(/*! ./training/table/table.component */ "./src/app/training/table/table.component.ts");
/* harmony import */ var _angular_cdk_overlay__WEBPACK_IMPORTED_MODULE_57__ = __webpack_require__(/*! @angular/cdk/overlay */ "./node_modules/@angular/cdk/esm5/overlay.es5.js");
/* harmony import */ var _training_snack_bar_snack_bar_component__WEBPACK_IMPORTED_MODULE_58__ = __webpack_require__(/*! ./training/snack-bar/snack-bar.component */ "./src/app/training/snack-bar/snack-bar.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



























































var AppModule = /** @class */ (function () {
    function AppModule(overlayContainer) {
        overlayContainer.getContainerElement().classList.add('candy-themed');
        overlayContainer.getContainerElement().classList.add('my-themed');
    }
    AppModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            declarations: [
                _app_component__WEBPACK_IMPORTED_MODULE_3__["AppComponent"],
                _statistics_table_stats_table_statistics_component__WEBPACK_IMPORTED_MODULE_49__["TableStatisticsComponent"],
                _header_header_component__WEBPACK_IMPORTED_MODULE_4__["HeaderComponent"],
                _signin_signin_component__WEBPACK_IMPORTED_MODULE_5__["SigninComponent"],
                _definition_definition_component__WEBPACK_IMPORTED_MODULE_6__["DefinitionComponent"],
                _user_user_component__WEBPACK_IMPORTED_MODULE_7__["UserComponent"],
                _roles_roles_component__WEBPACK_IMPORTED_MODULE_8__["RolesComponent"],
                _tables_tables_component__WEBPACK_IMPORTED_MODULE_9__["TablesComponent"],
                _tables_row_row_component__WEBPACK_IMPORTED_MODULE_12__["RowComponent"],
                _home_home_component__WEBPACK_IMPORTED_MODULE_10__["HomeComponent"],
                _tables_key_pipe__WEBPACK_IMPORTED_MODULE_14__["KeyPipe"],
                _shared_reverse_pipe__WEBPACK_IMPORTED_MODULE_40__["ReversePipe"],
                _shared_clear_array_pipe__WEBPACK_IMPORTED_MODULE_47__["ClearArrayPipe"],
                _tables_table_header_table_header_component__WEBPACK_IMPORTED_MODULE_16__["TableHeaderComponent"],
                _user_user_details_user_details_component__WEBPACK_IMPORTED_MODULE_17__["UserDetailsComponent"],
                _roles_role_details_role_details_component__WEBPACK_IMPORTED_MODULE_18__["RoleDetailsComponent"],
                _tables_menu_menu_component__WEBPACK_IMPORTED_MODULE_20__["MenuComponent"],
                _tables_row_details_row_details_component__WEBPACK_IMPORTED_MODULE_24__["RowDetailsComponent"],
                _tables_task_task_component__WEBPACK_IMPORTED_MODULE_26__["TaskComponent"],
                _user_user_task_user_task_component__WEBPACK_IMPORTED_MODULE_35__["UserTaskComponent"],
                _chat_chat_component__WEBPACK_IMPORTED_MODULE_38__["ChatComponent"],
                _shared_filter_extended_filter_pipe__WEBPACK_IMPORTED_MODULE_41__["ExtendedFilterPipe"],
                _shared_sort_sort_by_pipe__WEBPACK_IMPORTED_MODULE_42__["SortByPipe"],
                _statistics_statistics_component__WEBPACK_IMPORTED_MODULE_43__["StatisticsComponent"],
                _user_info_user_info_component__WEBPACK_IMPORTED_MODULE_44__["UserInfoComponent"],
                _spinner_spinner_component__WEBPACK_IMPORTED_MODULE_48__["SpinnerComponent"],
                _training_training_component__WEBPACK_IMPORTED_MODULE_52__["TrainingComponent"],
                _training_dialog_dialog_component__WEBPACK_IMPORTED_MODULE_55__["DialogComponent"],
                _training_table_table_component__WEBPACK_IMPORTED_MODULE_56__["TableComponent"],
                _training_snack_bar_snack_bar_component__WEBPACK_IMPORTED_MODULE_58__["SnackBarComponent"]
            ],
            imports: [
                ng4_charts__WEBPACK_IMPORTED_MODULE_46__["ChartsModule"],
                _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"],
                _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_50__["BrowserAnimationsModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_11__["FormsModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_11__["ReactiveFormsModule"],
                _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClientModule"],
                _angular_flex_layout__WEBPACK_IMPORTED_MODULE_54__["FlexLayoutModule"],
                _shared_modules_material_app_material_module__WEBPACK_IMPORTED_MODULE_51__["AppMaterialModule"],
                _shared_modules_routing_app_routing_module__WEBPACK_IMPORTED_MODULE_53__["AppRoutingModule"],
                _ngrx_store__WEBPACK_IMPORTED_MODULE_13__["StoreModule"].forRoot({
                    tables: _shared_store_table_tables_reducers__WEBPACK_IMPORTED_MODULE_27__["tablesReducers"],
                    users: _shared_store_user_users_reducers__WEBPACK_IMPORTED_MODULE_28__["usersReducers"],
                    tasks: _shared_store_task_tasks_reducers__WEBPACK_IMPORTED_MODULE_29__["tasksReducers"],
                    chat: _shared_store_chat_chat_reducers__WEBPACK_IMPORTED_MODULE_30__["chatReducers"],
                    statistics: _shared_store_statistics_statistics_reducers__WEBPACK_IMPORTED_MODULE_31__["statisticsReducers"]
                }),
                _ngrx_router_store__WEBPACK_IMPORTED_MODULE_32__["StoreRouterConnectingModule"],
                !_environments_environment__WEBPACK_IMPORTED_MODULE_34__["environment"].production ? _ngrx_store_devtools__WEBPACK_IMPORTED_MODULE_33__["StoreDevtoolsModule"].instrument() : []
            ],
            providers: [
                _tables_row_question_control_service__WEBPACK_IMPORTED_MODULE_15__["QuestionControlService"],
                _shared_data_storage_service__WEBPACK_IMPORTED_MODULE_19__["DataStorageService"],
                _shared_filter_filter_service__WEBPACK_IMPORTED_MODULE_25__["FilterService"],
                _shared_oauth_service__WEBPACK_IMPORTED_MODULE_21__["OauthService"],
                _shared_auth_cookies_handler__WEBPACK_IMPORTED_MODULE_23__["AuthCookie"],
                _shared_socket_task_info_service__WEBPACK_IMPORTED_MODULE_36__["TaskInfoService"],
                _shared_socket_web_socket_service__WEBPACK_IMPORTED_MODULE_37__["WebSocketService"],
                _shared_store_reset_service__WEBPACK_IMPORTED_MODULE_39__["StoreResetService"],
                _shared_statistics_statistics_service__WEBPACK_IMPORTED_MODULE_45__["StatisticsService"],
                { provide: _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HTTP_INTERCEPTORS"], useClass: _shared_auth_interceptor__WEBPACK_IMPORTED_MODULE_22__["AuthInterceptor"], multi: true }
                // {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi:true}
            ],
            exports: [
                _shared_filter_extended_filter_pipe__WEBPACK_IMPORTED_MODULE_41__["ExtendedFilterPipe"],
                _shared_sort_sort_by_pipe__WEBPACK_IMPORTED_MODULE_42__["SortByPipe"]
            ],
            entryComponents: [_training_dialog_dialog_component__WEBPACK_IMPORTED_MODULE_55__["DialogComponent"], _training_snack_bar_snack_bar_component__WEBPACK_IMPORTED_MODULE_58__["SnackBarComponent"]],
            bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_3__["AppComponent"]]
        }),
        __metadata("design:paramtypes", [_angular_cdk_overlay__WEBPACK_IMPORTED_MODULE_57__["OverlayContainer"]])
    ], AppModule);
    return AppModule;
}());



/***/ }),

/***/ "./src/app/chat/chat.component.css":
/*!*****************************************!*\
  !*** ./src/app/chat/chat.component.css ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "li {\r\n  border: 1px solid #32383e;\r\n  background-color: rgba(200, 200, 200, 0.05);\r\n  color: gray !important;\r\n}\r\n\r\nli:hover {\r\n  background-color: rgba(0, 0, 0, 0.2);\r\n}\r\n\r\ninput, select, textarea {\r\n  background-color: rgba(0, 0, 0, 0.05) !important;\r\n}\r\n\r\n.jumbotron {\r\n  background: none;\r\n}\r\n\r\n/* width */\r\n\r\n::-webkit-scrollbar {\r\n  width: 20px;\r\n}\r\n\r\n/* Track */\r\n\r\n::-webkit-scrollbar-track {\r\n  border-radius: 10px;\r\n}\r\n\r\n/* Handle */\r\n\r\n::-webkit-scrollbar-thumb {\r\n  background: grey;\r\n  border-radius: 10px;\r\n}\r\n\r\n/* Handle on hover */\r\n\r\n::-webkit-scrollbar-thumb:hover {\r\n  background: darkgrey;\r\n}\r\n"

/***/ }),

/***/ "./src/app/chat/chat.component.html":
/*!******************************************!*\
  !*** ./src/app/chat/chat.component.html ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"jumbotron\">\r\n  <div class=\"row\">\r\n\r\n    <div class=\"col-4\">\r\n      <ul class=\"list-group\" style=\"padding: 50px 30px\">\r\n        <li class=\"list-group-item list-group-item-dark bg-dark text-white\">Active Users:</li>\r\n        <li class=\"list-group-item list-group-item-action list-group-item-light\"\r\n            (click)=\"setChat('global')\">\r\n          Global chat\r\n        </li>\r\n        <div *ngFor=\"let activeWsUser of (activeWsUsers | async)\">\r\n          <li *ngIf=\"activeWsUser != (currentUser |async)\"\r\n              class=\"list-group-item list-group-item-action list-group-item-light\"\r\n              (click)=\"setChat(activeWsUser)\"\r\n          >{{activeWsUser}}\r\n          </li>\r\n        </div>\r\n      </ul>\r\n    </div>\r\n\r\n    <div class=\"col-8\" style=\"padding: 50px 70px 0 0;\">\r\n      <ul class=\"list-group\" [ngClass]=\"chatName != 'global' ? 'd-none' : ''\">\r\n        <li class=\"list-group-item bg-dark text-info\">Global chat:</li>\r\n        <li class=\"list-group-item\"\r\n            style=\"min-height: 600px; max-height: 600px; overflow-y: scroll;\">\r\n          <div *ngFor=\"let message of (chatContent | async | reverse)\">\r\n            <div *ngIf=\"(message.senderName) === 'global' || (message.recipientName) === 'global'\">\r\n              <div *ngIf=\"(message.senderName) === (currentUser |async)\" class=\"alert border-primary text-primary\"\r\n                   style=\"width: 70%; margin-bottom: 5px;\">{{message.senderName}} : {{message.message}}\r\n              </div>\r\n              <div *ngIf=\"(message.senderName) !== (currentUser |async)\" class=\"alert border-success text-success\"\r\n                   style=\"width: 70%; margin: 0 0 5px 30%\">{{message.senderName}} : {{message.message}}\r\n              </div>\r\n            </div>\r\n          </div>\r\n        </li>\r\n        <li *ngIf=\"chatName == 'global'\" class=\"list-group-item bg-dark\">\r\n          <div class=\"input-group\">\r\n            <input class=\"form-control border-secondary\" type=\"text\" #messageContentGlobal>\r\n            <div class=\"input-group-append\">\r\n              <button (click)=\"postMessage(messageContentGlobal.value)\" class=\"btn btn-default\">Post</button>\r\n            </div>\r\n          </div>\r\n        </li>\r\n      </ul>\r\n\r\n      <div *ngFor=\"let activeWsUser of (activeWsUsers | async | reverse)\">\r\n        <ul class=\"list-group\" [ngClass]=\"chatName != activeWsUser ? 'd-none' : ''\">\r\n          <li class=\"list-group-item bg-dark text-info\">{{activeWsUser}} chat:</li>\r\n          <li class=\"list-group-item\" style=\"min-height: 600px;max-height: 600px; overflow-y: scroll;\">\r\n            <div *ngFor=\"let message of (chatContent | async)\">\r\n              <div *ngIf=\"\r\n            (message.senderName === activeWsUser || message.recipientName === activeWsUser) &&\r\n            (message.senderName !== 'global' && message.recipientName !== 'global')\r\n            \">\r\n                <div *ngIf=\"(message.senderName) === (currentUser |async)\" class=\"alert border-primary text-primary\"\r\n                     style=\"width: 70%; margin-bottom: 5px;\">{{message.senderName}} :{{message.message}}\r\n                </div>\r\n                <div *ngIf=\"(message.senderName) !== (currentUser |async)\" class=\"alert border-success text-success\"\r\n                     style=\"width: 70%; margin: 0 0 5px 30%\">{{message.senderName}} : {{message.message}}\r\n                </div>\r\n              </div>\r\n            </div>\r\n          </li>\r\n          <li *ngIf=\"chatName == activeWsUser\" class=\"list-group-item bg-dark text-white\">\r\n            <div class=\"input-group\">\r\n              <input class=\"form-control border-secondary\" type=\"text\" #messageContent>\r\n              <div class=\"input-group-append\">\r\n                <button (click)=\"postMessage(messageContent.value)\" class=\"btn btn-default\">Post</button>\r\n              </div>\r\n            </div>\r\n          </li>\r\n        </ul>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>\r\n"

/***/ }),

/***/ "./src/app/chat/chat.component.ts":
/*!****************************************!*\
  !*** ./src/app/chat/chat.component.ts ***!
  \****************************************/
/*! exports provided: ChatComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ChatComponent", function() { return ChatComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _ngrx_store__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ngrx/store */ "./node_modules/@ngrx/store/@ngrx/store.es5.js");
/* harmony import */ var _shared_socket_task_info_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../shared/socket/task-info.service */ "./src/app/shared/socket/task-info.service.ts");
/* harmony import */ var _shared_chat_message_model__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../shared/chat-message.model */ "./src/app/shared/chat-message.model.ts");
/* harmony import */ var _shared_data_storage_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../shared/data-storage.service */ "./src/app/shared/data-storage.service.ts");
/* harmony import */ var _shared_store_chat_chat_actions__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../shared/store/chat/chat.actions */ "./src/app/shared/store/chat/chat.actions.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var ChatComponent = /** @class */ (function () {
    function ChatComponent(store, ws, dss) {
        this.store = store;
        this.ws = ws;
        this.dss = dss;
        this.chatName = 'global';
    }
    ChatComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.chatContent = this.store.select('chat', 'chatContent');
        this.currentUser = this.store.select('users', 'currentUser');
        this.currentUser.subscribe(function (username) {
            _this.username = username;
        });
        this.activeWsUsers = this.store.select('chat', 'activeUsers');
        this.dss.getActiveWsUsers();
    };
    ChatComponent.prototype.postMessage = function (messageContent) {
        console.log(messageContent);
        if (this.chatName === 'global') {
            console.log('postMessage' + this.chatName);
            this.ws.stompClient.send('/app/chat', {}, messageContent);
        }
        else {
            this.store.dispatch(new _shared_store_chat_chat_actions__WEBPACK_IMPORTED_MODULE_5__["AppendChatWithMessage"](new _shared_chat_message_model__WEBPACK_IMPORTED_MODULE_3__["ChatMessageModel"](this.username, messageContent, this.chatName)));
            this.ws.stompClient.send('/app/chat/' + this.chatName, {}, messageContent);
        }
    };
    ChatComponent.prototype.setChat = function (chatName) {
        console.log('chatName' + chatName);
        this.chatName = chatName;
    };
    ChatComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-chat',
            template: __webpack_require__(/*! ./chat.component.html */ "./src/app/chat/chat.component.html"),
            styles: [__webpack_require__(/*! ./chat.component.css */ "./src/app/chat/chat.component.css")]
        }),
        __metadata("design:paramtypes", [_ngrx_store__WEBPACK_IMPORTED_MODULE_1__["Store"],
            _shared_socket_task_info_service__WEBPACK_IMPORTED_MODULE_2__["TaskInfoService"],
            _shared_data_storage_service__WEBPACK_IMPORTED_MODULE_4__["DataStorageService"]])
    ], ChatComponent);
    return ChatComponent;
}());



/***/ }),

/***/ "./src/app/definition/definition.component.css":
/*!*****************************************************!*\
  !*** ./src/app/definition/definition.component.css ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "li {\r\n  border: 1px solid #32383e;\r\n  background-color: rgba(200, 200, 200, 0.05);\r\n  color: gray !important;\r\n}\r\n\r\nli:hover {\r\n  background-color: rgba(200, 200, 200, 0.2);\r\n}\r\n\r\ninput, select, textarea {\r\n  background-color: rgba(0, 0, 0, 0.05) !important;\r\n}\r\n\r\n.jumbotron {\r\n  background: none;\r\n}\r\n"

/***/ }),

/***/ "./src/app/definition/definition.component.html":
/*!******************************************************!*\
  !*** ./src/app/definition/definition.component.html ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"jumbotron\">\r\n  <div class=\"container\">\r\n    <div class=\"row\">\r\n      <div class=\"col-12\">\r\n        <h3 class=\"text-center text-info\">Table Definition</h3>\r\n        <form [formGroup]=\"definitionForm\" style=\"margin-top: 10px\">\r\n          <div class=\"form-group\">\r\n            <input type=\"text\"\r\n                   id=\"table-name\"\r\n                   formControlName=\"name\"\r\n                   placeholder=\"Table Name\"\r\n                   class=\"form-control  border-secondary\" ngModel\r\n                   required\r\n            >\r\n          </div>\r\n          <div class=\"row justify-content-center\">\r\n            <div class=\"col-12\" formArrayName=\"columnDetailDefinitionDtoList\">\r\n              <div class=\"row justify-content-center\"\r\n                   *ngFor=\"let columnDetailDefinitionDto of getData().controls; let i = index;\"\r\n                   [formGroupName]=\"i\">\r\n                <div class=\"col-12 col-sm-5 col-md-3\">\r\n                  <div class=\"input-group\">\r\n                    <div class=\"input-group-prepend\">\r\n                      <label class=\"btn btn-outline-secondary\">Type:</label>\r\n                    </div>\r\n                    <select type=\"text\" class=\"form-control  border-secondary\" formControlName=\"type\" required>\r\n                      <option *ngFor=\"let option of options;\" [selected]=\"option.name\" [value]=\"option.shortcut\">{{\r\n                        option.name }}\r\n                      </option>\r\n                    </select>\r\n                  </div>\r\n                  <div *ngIf=\"definitionForm.value.columnDetailDefinitionDtoList[i].type=='EN'\">\r\n                    <div class=\"col-12\" formArrayName=\"optionList\">\r\n                      <div *ngFor=\"let option of columnDetailDefinitionDto.get('optionList').controls;let j = index\" class=\"row\">\r\n                        <div class=\"input-group\" style=\"margin-top: 3px;\">\r\n                          <input type=\"text\" class=\"form-control  border-secondary\"\r\n                                 [value]=\"definitionForm.value.columnDetailDefinitionDtoList[i].optionList[j]\" formControlName=\"{{j}}\"\r\n                                 placeholder=\"Option...\"\r\n                                 required>\r\n                          <div class=\"input-group-append\">\r\n                            <button type=\"button\" class=\"btn btn-outline-secondary text-danger\" (click)=\"onDeleteOption(i,j)\">X</button>\r\n                          </div>\r\n                        </div>\r\n                      </div>\r\n                      <div class=\"row\">\r\n                        <div class=\"form-group\" style=\"margin: 5px 0\">\r\n                          <button type=\"button\" class=\"btn btn-outline-secondary text-primary\" (click)=\"onAddOptions(i)\">\r\n                            Add option\r\n                          </button>\r\n                        </div>\r\n                      </div>\r\n                    </div>\r\n                  </div>\r\n                </div>\r\n                <div class=\"col-11 col-sm-6 col-md-5\">\r\n                  <div class=\"input-group\">\r\n                    <div class=\"input-group-prepend\">\r\n                      <label class=\"btn btn-outline-secondary\">Name:</label>\r\n                    </div>\r\n                    <input type=\"text\" class=\"form-control border-secondary\" formControlName=\"name\" required style=\"height: 38px;\">\r\n                  </div>\r\n                </div>\r\n                <div class=\"col-1\">\r\n                  <button type=\"button\" class=\"btn btn-outline-secondary text-danger\" (click)=\"onDeleteColumn(i)\">X</button>\r\n                </div>\r\n              </div>\r\n            </div>\r\n          </div>\r\n          <br>\r\n          <div class=\"row justify-content-center\">\r\n            <div class=\"form-group\">\r\n              <button type=\"button\" class=\"btn btn-outline-secondary text-primary\" (click)=\"onAddColumn()\">Add column</button>\r\n              <button type=\"button\" class=\"btn btn-outline-secondary text-danger\" (click)=\"onResetForm()\">Reset form</button>\r\n              <button type=\"submit\" class=\"btn btn-outline-secondary text-success\" [disabled]=\"!definitionForm.valid\" (click)=\"postCommonTableForm()\">Define in common table</button>\r\n              <button type=\"submit\" class=\"btn btn-outline-secondary text-success\" [disabled]=\"!definitionForm.valid\" (click)=\"postSepareteTableForm()\">Define in separate table</button>\r\n            </div>\r\n          </div>\r\n        </form>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>\r\n"

/***/ }),

/***/ "./src/app/definition/definition.component.ts":
/*!****************************************************!*\
  !*** ./src/app/definition/definition.component.ts ***!
  \****************************************************/
/*! exports provided: DefinitionComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DefinitionComponent", function() { return DefinitionComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _shared_table_model__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../shared/table.model */ "./src/app/shared/table.model.ts");
/* harmony import */ var _shared_data_storage_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../shared/data-storage.service */ "./src/app/shared/data-storage.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var COMMON_TABLE_ENVIRONMENT = "COMMON_TABLE_ENVIRONMENT";
var SEPARATE_TABLE_ENVIRONMENT = "SEPARATE_TABLE_ENVIRONMENT";
var DefinitionComponent = /** @class */ (function () {
    function DefinitionComponent(dss) {
        this.dss = dss;
        this.options = _shared_table_model__WEBPACK_IMPORTED_MODULE_2__["options"];
    }
    DefinitionComponent.prototype.ngOnInit = function () {
        this.initForm();
        // this.options = fromDefinitionModel.options;
    };
    DefinitionComponent.prototype.initForm = function () {
        this.definitionForm = new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormGroup"]({
            'name': new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"](),
            'columnDetailDefinitionDtoList': new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormArray"]([])
        });
    };
    DefinitionComponent.prototype.onAddColumn = function () {
        this.definitionForm.get('columnDetailDefinitionDtoList').push(new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormGroup"]({
            'type': new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"]('IN'),
            'name': new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"](''),
            'optionList': new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormArray"]([])
        }));
    };
    DefinitionComponent.prototype.onAddOptions = function (i) {
        this.definitionForm.get('columnDetailDefinitionDtoList').at(i).get('optionList').push(new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"]());
    };
    DefinitionComponent.prototype.onDeleteOption = function (typeIndex, optionNumber) {
        this.definitionForm.get('columnDetailDefinitionDtoList')
            .at(typeIndex)
            .get('optionList')
            .removeAt(optionNumber);
    };
    DefinitionComponent.prototype.onDeleteColumn = function (i) {
        this.definitionForm.get('columnDetailDefinitionDtoList').removeAt(i);
    };
    DefinitionComponent.prototype.onResetForm = function () {
        this.initForm();
    };
    DefinitionComponent.prototype.postSepareteTableForm = function () {
        this.postTableForm(SEPARATE_TABLE_ENVIRONMENT);
    };
    DefinitionComponent.prototype.postCommonTableForm = function () {
        this.postTableForm(COMMON_TABLE_ENVIRONMENT);
    };
    DefinitionComponent.prototype.postTableForm = function (databaseEnviroment) {
        var formValue = this.definitionForm.value;
        formValue['id'] = null;
        this.dss.postTableDefinition(formValue, databaseEnviroment);
    };
    DefinitionComponent.prototype.getData = function () {
        return this.definitionForm.get('columnDetailDefinitionDtoList');
    };
    DefinitionComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-definition',
            template: __webpack_require__(/*! ./definition.component.html */ "./src/app/definition/definition.component.html"),
            styles: [__webpack_require__(/*! ./definition.component.css */ "./src/app/definition/definition.component.css")]
        }),
        __metadata("design:paramtypes", [_shared_data_storage_service__WEBPACK_IMPORTED_MODULE_3__["DataStorageService"]])
    ], DefinitionComponent);
    return DefinitionComponent;
}());



/***/ }),

/***/ "./src/app/header/header.component.css":
/*!*********************************************!*\
  !*** ./src/app/header/header.component.css ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "nav {\r\n  background-color: rgba(0,0,0,0.1);\r\n}\r\n"

/***/ }),

/***/ "./src/app/header/header.component.html":
/*!**********************************************!*\
  !*** ./src/app/header/header.component.html ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<nav class=\"navbar navbar-expand-lg navbar-dark\" style=\"margin-bottom: 0\">\r\n  <!--*ngIf=\"(token | async)\"-->\r\n  <a class=\"navbar-brand text-info\" href=\"/\">MY JIRA</a>\r\n  <button class=\"navbar-toggler\" type=\"button\" data-toggle=\"collapse\" data-target=\"#navbarNavDropdown\" aria-controls=\"navbarNavDropdown\"\r\n          aria-expanded=\"false\" aria-label=\"Toggle navigation\">\r\n    <span class=\"navbar-toggler-icon\"></span>\r\n  </button>\r\n  <div class=\"collapse navbar-collapse\" id=\"navbarNavDropdown\">\r\n    <ul class=\"navbar-nav mr-auto\" *ngIf=\"(token | async)\">\r\n      <li class=\"nav-item \" routerLinkActive=\"active\" [routerLinkActiveOptions]=\"{exact: true}\"><a class=\"nav-link text-info\" routerLink=\"/home\">Home</a></li>\r\n      <li class=\"nav-item\" routerLinkActive=\"active\"><a class=\"nav-link text-info\" routerLink=\"/tables\">Tables</a></li>\r\n      <li class=\"nav-item\" routerLinkActive=\"active\"><a class=\"nav-link text-info\" routerLink=\"/users\">Users</a></li>\r\n      <li *ngIf=\"(isAdmin | async)\" class=\"nav-item\" routerLinkActive=\"active\"><a class=\"nav-link text-info\" routerLink=\"/definitions\">Definition</a></li>\r\n      <li *ngIf=\"(isAdmin | async)\" class=\"nav-item\" routerLinkActive=\"active\"><a class=\"nav-link text-info\" routerLink=\"/roles\">Roles</a></li>\r\n      <li *ngIf=\"(isAdmin | async)\" class=\"nav-item\" routerLinkActive=\"active\"><a class=\"nav-link text-info\" routerLink=\"/statistics\">Statistics</a></li>\r\n      <li class=\"nav-item\" routerLinkActive=\"active\"><a class=\"nav-link text-info\" routerLink=\"/chat\">Chat</a></li>\r\n      <li class=\"nav-item\" routerLinkActive=\"active\"><a class=\"nav-link text-info\" routerLink=\"/training\">Training</a></li>\r\n    </ul>\r\n\r\n    <span class=\"nav navbar-text font-weight-bold\" *ngIf=\"(token | async)\">\r\n      <a class=\"text-info\" routerLink=\"/user-info\">Welcome : {{ username | async }}</a>\r\n    </span>\r\n    <span *ngIf=\"(newTaskState | async)\" (click)=\"onNewTasksSeen()\" class=\"nav navbar-text text-danger\">!Check Tasks!</span>\r\n    <span class=\"navbar-text\">\r\n      <a class=\"nav-link text-info\" routerLink=\"/signin\" *ngIf=\"!(token | async)\">Login</a>\r\n    </span>\r\n    <span class=\"navbar-text\">\r\n      <a class=\"nav-link text-info\" (click)=\"onLogout()\" *ngIf=\"(token | async)\" routerLink=\"/\">Logout</a>\r\n    </span>\r\n  </div>\r\n</nav>\r\n"

/***/ }),

/***/ "./src/app/header/header.component.ts":
/*!********************************************!*\
  !*** ./src/app/header/header.component.ts ***!
  \********************************************/
/*! exports provided: HeaderComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HeaderComponent", function() { return HeaderComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _ngrx_store__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ngrx/store */ "./node_modules/@ngrx/store/@ngrx/store.es5.js");
/* harmony import */ var _shared_oauth_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../shared/oauth.service */ "./src/app/shared/oauth.service.ts");
/* harmony import */ var _shared_data_storage_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../shared/data-storage.service */ "./src/app/shared/data-storage.service.ts");
/* harmony import */ var _shared_store_user_users_actions__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../shared/store/user/users.actions */ "./src/app/shared/store/user/users.actions.ts");
/* harmony import */ var _shared_store_reset_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../shared/store-reset.service */ "./src/app/shared/store-reset.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var HeaderComponent = /** @class */ (function () {
    function HeaderComponent(store, oauth, dss, resetService, router) {
        this.store = store;
        this.oauth = oauth;
        this.dss = dss;
        this.resetService = resetService;
        this.router = router;
    }
    HeaderComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.newTaskState = this.store.select('users', 'newTaskInfo');
        this.token = this.store.select('users', 'token');
        this.username = this.store.select('users', 'currentUser');
        this.username.subscribe(function (username) {
            _this.dss.getCurrentUserRoles(username);
            _this.currentUsername = username;
            // this.dss.getActiveWsUsers();
        });
        this.currentUserRoles = this.store.select('users', 'currentUserRoles');
        this.isAdmin = this.currentUserRoles.map(function (roles) {
            var condition = false;
            roles.forEach(function (role) {
                if (role === 'ROLE_ADMIN') {
                    condition = true;
                }
            });
            return condition;
        });
    };
    HeaderComponent.prototype.onLogout = function () {
        this.resetService.resetStore();
        this.router.navigate(['/signin']);
        this.store.dispatch(new _shared_store_user_users_actions__WEBPACK_IMPORTED_MODULE_4__["SetLogoutInfo"]('You have been successfully logged out!'));
    };
    HeaderComponent.prototype.onNewTasksSeen = function () {
        this.store.dispatch(new _shared_store_user_users_actions__WEBPACK_IMPORTED_MODULE_4__["SetTaskInfoAction"](false));
    };
    HeaderComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-header',
            template: __webpack_require__(/*! ./header.component.html */ "./src/app/header/header.component.html"),
            styles: [__webpack_require__(/*! ./header.component.css */ "./src/app/header/header.component.css")]
        }),
        __metadata("design:paramtypes", [_ngrx_store__WEBPACK_IMPORTED_MODULE_1__["Store"],
            _shared_oauth_service__WEBPACK_IMPORTED_MODULE_2__["OauthService"],
            _shared_data_storage_service__WEBPACK_IMPORTED_MODULE_3__["DataStorageService"],
            _shared_store_reset_service__WEBPACK_IMPORTED_MODULE_5__["StoreResetService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_6__["Router"]])
    ], HeaderComponent);
    return HeaderComponent;
}());



/***/ }),

/***/ "./src/app/home/home.component.css":
/*!*****************************************!*\
  !*** ./src/app/home/home.component.css ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".jumbotron {\r\n  width: auto;\r\n  background-color: transparent;\r\n  color: #ecf0f1;\r\n  height: 80%;\r\n}\r\n"

/***/ }),

/***/ "./src/app/home/home.component.html":
/*!******************************************!*\
  !*** ./src/app/home/home.component.html ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"jumbotron jumbotron-fluid\">\r\n  <div class=\"container\">\r\n    <h3 class=\"display-3 text-white\">Welcome !</h3>\r\n    <p class=\"lead text-white\">Lorem ipsum dolor sit amet, consectetur adipiscing elit.\r\n      Fusce ullamcorper a ipsum nec feugiat. Quisque viverra quis nulla eu pharetra.\r\n      Morbi blandit, quam vehicula semper hendrerit, ante urna vulputate justo, vitae venenatis\r\n      massa tellus ac risus. Aliquam consequat libero quis aliquet posuere. Etiam imperdiet interdum accumsan.\r\n      Etiam sodales suscipit dui, sit amet finibus augue aliquam quis.\r\n    </p>\r\n  </div>\r\n</div>\r\n"

/***/ }),

/***/ "./src/app/home/home.component.ts":
/*!****************************************!*\
  !*** ./src/app/home/home.component.ts ***!
  \****************************************/
/*! exports provided: HomeComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HomeComponent", function() { return HomeComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var HomeComponent = /** @class */ (function () {
    function HomeComponent() {
    }
    HomeComponent.prototype.ngOnInit = function () {
    };
    HomeComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-home',
            template: __webpack_require__(/*! ./home.component.html */ "./src/app/home/home.component.html"),
            styles: [__webpack_require__(/*! ./home.component.css */ "./src/app/home/home.component.css")]
        }),
        __metadata("design:paramtypes", [])
    ], HomeComponent);
    return HomeComponent;
}());



/***/ }),

/***/ "./src/app/roles/role-details/role-details.component.css":
/*!***************************************************************!*\
  !*** ./src/app/roles/role-details/role-details.component.css ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "li, td {\r\n  border: 1px solid #32383e;\r\n  background-color: rgba(200, 200, 200, 0.05);\r\n  color: gray !important;\r\n}\r\n\r\n.bg-light {\r\n  background-color: rgba(200, 200, 200, 0.2) !important;\r\n}\r\n\r\nselect, input, textarea {\r\n  background-color: rgba(0, 0, 0, 0.05) !important;\r\n}\r\n\r\n"

/***/ }),

/***/ "./src/app/roles/role-details/role-details.component.html":
/*!****************************************************************!*\
  !*** ./src/app/roles/role-details/role-details.component.html ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div *ngIf=\"role && !(newRoleMode | async)\">\r\n  <table class=\"table table-bordered table-striped\">\r\n    <tbody>\r\n    <tr>\r\n      <td><span class=\"text-info\">ID:</span></td>\r\n      <td>\r\n        <div class=\"d-flex justify-content-between\">\r\n          <span> {{ role.id }} </span>\r\n          <button class=\"btn btn-outline-secondary text-danger\" data-toggle=\"modal\" data-target=\"#deleteConfirmModal\"> Delete Role</button>\r\n        </div>\r\n      </td>\r\n    </tr>\r\n    <tr>\r\n      <td><span class=\"text-info\">NAME:</span></td>\r\n      <td>{{ role.name }}</td>\r\n    </tr>\r\n    <tr>\r\n      <td><span class=\"text-info\">DESCRIPTION:</span></td>\r\n      <td> {{ role.description }}</td>\r\n    </tr>\r\n    <tr>\r\n      <td><span class=\"text-info\">USERS</span></td>\r\n      <td>\r\n        <ul class=\"list-group\">\r\n          <li class=\"list-group-item\" *ngFor=\"let user of role.userDtos\" style=\"background-color: rgba(0, 0, 0, 0.05) !important;\">{{user.username}}</li>\r\n        </ul>\r\n      </td>\r\n    </tr>\r\n    </tbody>\r\n  </table>\r\n  <div *ngIf=\"editUserMode && !(newRoleMode | async)\">\r\n    <form [formGroup]=\"userForm\" class=\"form-group\">\r\n      <div class=\"input-group\">\r\n        <select class=\"form-control border-secondary\" formControlName=\"user\">\r\n          <option selected>- Select -</option>\r\n          <option *ngFor=\"let user of (users|async)\"> {{ user.username }}</option>\r\n        </select>\r\n        <div class=\"input-group-append\">\r\n          <button class=\"btn btn-outline-secondary\" (click)=\"postAddUser()\">Add</button>\r\n          <button class=\"btn btn-outline-secondary\" (click)=\"postRemoveUser()\">Remove</button>\r\n          <button class=\"btn btn-outline-secondary\" (click)=\"abortAddUser()\">Abort</button>\r\n        </div>\r\n      </div>\r\n    </form>\r\n  </div>\r\n  <div *ngIf=\"!editUserMode\">\r\n    <button class=\"btn btn-outline-secondary\" (click)=\"onEditUserMode()\">Edit Role</button>\r\n  </div>\r\n</div>\r\n\r\n<div *ngIf=\"(newRoleMode | async)\">\r\n  <form>\r\n    <div class=\"form-group\">\r\n      <label class=\"text-info\">Role name:</label>\r\n      <input type=\"text\" class=\"form-control border-secondary\" #name>\r\n    </div>\r\n    <div class=\"form-group\">\r\n      <label class=\"text-info\">Role description:</label>\r\n      <textarea rows=\"6\" class=\"form-control border-secondary\" #description></textarea>\r\n    </div>\r\n    <div class=\"form-group\">\r\n      <button (click)=\"onSubmitRole(name.value, description.value)\" class=\"btn btn-outline-secondary\">Submit</button>\r\n      <button (click)=\"onAbortSubmitRole()\" class=\"btn btn-outline-secondary\">Close</button>\r\n    </div>\r\n  </form>\r\n</div>\r\n\r\n<!-- Modal -->\r\n<div class=\"modal fade\" id=\"deleteConfirmModal\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"exampleModalLabel\" aria-hidden=\"true\">\r\n  <div class=\"modal-dialog\" role=\"document\">\r\n    <div class=\"modal-content\">\r\n      <div class=\"modal-header\">\r\n        <h5 class=\"modal-title\" id=\"exampleModalLabel\">Role removal</h5>\r\n        <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\">\r\n          <span aria-hidden=\"true\">&times;</span>\r\n        </button>\r\n      </div>\r\n      <div class=\"modal-body\">\r\n        Whhaaaaaatt??!!\r\n      </div>\r\n      <div class=\"modal-footer\">\r\n        <button type=\"button\" class=\"btn btn-outline-secondary\" data-dismiss=\"modal\">Abort</button>\r\n        <button type=\"button\" class=\"btn btn-outline-secondary\" (click)=\"postRemoveUser()\">Confirm</button>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>\r\n"

/***/ }),

/***/ "./src/app/roles/role-details/role-details.component.ts":
/*!**************************************************************!*\
  !*** ./src/app/roles/role-details/role-details.component.ts ***!
  \**************************************************************/
/*! exports provided: RoleDetailsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RoleDetailsComponent", function() { return RoleDetailsComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _role_model__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../role.model */ "./src/app/roles/role.model.ts");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _ngrx_store__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ngrx/store */ "./node_modules/@ngrx/store/@ngrx/store.es5.js");
/* harmony import */ var _shared_data_storage_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../shared/data-storage.service */ "./src/app/shared/data-storage.service.ts");
/* harmony import */ var _shared_store_user_users_actions__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../shared/store/user/users.actions */ "./src/app/shared/store/user/users.actions.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var RoleDetailsComponent = /** @class */ (function () {
    function RoleDetailsComponent(store, dss) {
        this.store = store;
        this.dss = dss;
        this.editUserMode = false;
    }
    RoleDetailsComponent.prototype.ngOnInit = function () {
        this.newRoleMode = this.store.select('users', 'newRoleMode');
        this.users = this.store.select('users', 'users');
        this.dss.getUsers();
        this.userForm =
            new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormGroup"]({
                'user': new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"]('Select option')
            });
    };
    RoleDetailsComponent.prototype.postRemoveUser = function () {
        this.dss.removeUserFromRole({ role: this.role, username: this.userForm.value.user });
    };
    RoleDetailsComponent.prototype.onEditUserMode = function () {
        this.editUserMode = true;
    };
    RoleDetailsComponent.prototype.postAddUser = function () {
        var _this = this;
        if (this.dss.addRoleToUser({ rolename: this.role.name, username: this.userForm.value.user })) {
            this.users.subscribe(function (users) {
                users.forEach(function (user) {
                    if (user.username === _this.userForm.value.user) {
                        _this.role.userDtos.push(user);
                    }
                });
            }).unsubscribe();
        }
    };
    RoleDetailsComponent.prototype.abortAddUser = function () {
        this.editUserMode = false;
    };
    RoleDetailsComponent.prototype.onSubmitRole = function (name, description) {
        this.dss.saveNewRole({ name: name, description: description });
    };
    RoleDetailsComponent.prototype.onAbortSubmitRole = function () {
        this.store.dispatch(new _shared_store_user_users_actions__WEBPACK_IMPORTED_MODULE_5__["SetNewRoleModeAction"](false));
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", _role_model__WEBPACK_IMPORTED_MODULE_1__["RoleModel"])
    ], RoleDetailsComponent.prototype, "role", void 0);
    RoleDetailsComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-role-details',
            template: __webpack_require__(/*! ./role-details.component.html */ "./src/app/roles/role-details/role-details.component.html"),
            styles: [__webpack_require__(/*! ./role-details.component.css */ "./src/app/roles/role-details/role-details.component.css")]
        }),
        __metadata("design:paramtypes", [_ngrx_store__WEBPACK_IMPORTED_MODULE_3__["Store"],
            _shared_data_storage_service__WEBPACK_IMPORTED_MODULE_4__["DataStorageService"]])
    ], RoleDetailsComponent);
    return RoleDetailsComponent;
}());



/***/ }),

/***/ "./src/app/roles/role.model.ts":
/*!*************************************!*\
  !*** ./src/app/roles/role.model.ts ***!
  \*************************************/
/*! exports provided: RoleModel */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RoleModel", function() { return RoleModel; });
var RoleModel = /** @class */ (function () {
    function RoleModel() {
    }
    return RoleModel;
}());



/***/ }),

/***/ "./src/app/roles/roles.component.css":
/*!*******************************************!*\
  !*** ./src/app/roles/roles.component.css ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "li {\r\n  border: 1px solid #32383e;\r\n  background-color: rgba(200, 200, 200, 0.05);\r\n  color: gray !important;\r\n}\r\n\r\nli:hover {\r\n  background-color: rgba(200, 200, 200, 0.2);\r\n}\r\n\r\n.bg-light {\r\n  background-color: rgba(200, 200, 200, 0.2) !important;\r\n}\r\n\r\n.jumbotron {\r\n  background: none;\r\n}\r\n"

/***/ }),

/***/ "./src/app/roles/roles.component.html":
/*!********************************************!*\
  !*** ./src/app/roles/roles.component.html ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"jumbotron\">\r\n  <div class=\"row\" style=\"padding: 30px\">\r\n    <div class=\"col-4 align-self-start\">\r\n      <ul class=\"list-group\">\r\n        <li class=\"list-group-item active border-dark\" style=\"background-color: rgba(0,0,0,0.05) !important;\">Roles:</li>\r\n        <li class=\"list-group-item list-group-item-action d-flex justify-content-end\"\r\n            *ngFor=\"let role of (roles | async)\" (click)=\"onSelectRole(role)\"\r\n            [ngClass]=\"selectedRole?.id == role.id ? 'bg-light' : ''\">\r\n          <td class=\"mr-auto p-2\">{{ role.name }}</td>\r\n        </li>\r\n        <button class=\"btn text-white\" style=\"background-color: rgba(0,0,0,0.05) !important;\" (click)=\"onNewRole()\">New role</button>\r\n      </ul>\r\n    </div>\r\n    <div class=\"col-8 align-self-center\">\r\n      <app-role-details [role]=\"selectedRole\"></app-role-details>\r\n    </div>\r\n  </div>\r\n</div>\r\n"

/***/ }),

/***/ "./src/app/roles/roles.component.ts":
/*!******************************************!*\
  !*** ./src/app/roles/roles.component.ts ***!
  \******************************************/
/*! exports provided: RolesComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RolesComponent", function() { return RolesComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _ngrx_store__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ngrx/store */ "./node_modules/@ngrx/store/@ngrx/store.es5.js");
/* harmony import */ var _shared_data_storage_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../shared/data-storage.service */ "./src/app/shared/data-storage.service.ts");
/* harmony import */ var _shared_store_user_users_actions__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../shared/store/user/users.actions */ "./src/app/shared/store/user/users.actions.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var RolesComponent = /** @class */ (function () {
    function RolesComponent(roleStore, dss) {
        this.roleStore = roleStore;
        this.dss = dss;
    }
    RolesComponent.prototype.ngOnInit = function () {
        this.roles = this.roleStore.select('users', 'roles');
        this.dss.getRoles();
    };
    RolesComponent.prototype.onSelectRole = function (role) {
        this.selectedRole = role;
    };
    RolesComponent.prototype.onNewRole = function () {
        this.roleStore.dispatch(new _shared_store_user_users_actions__WEBPACK_IMPORTED_MODULE_3__["SetNewRoleModeAction"](true));
    };
    RolesComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-roles',
            template: __webpack_require__(/*! ./roles.component.html */ "./src/app/roles/roles.component.html"),
            styles: [__webpack_require__(/*! ./roles.component.css */ "./src/app/roles/roles.component.css")]
        }),
        __metadata("design:paramtypes", [_ngrx_store__WEBPACK_IMPORTED_MODULE_1__["Store"],
            _shared_data_storage_service__WEBPACK_IMPORTED_MODULE_2__["DataStorageService"]])
    ], RolesComponent);
    return RolesComponent;
}());



/***/ }),

/***/ "./src/app/shared/auth-cookies-handler.ts":
/*!************************************************!*\
  !*** ./src/app/shared/auth-cookies-handler.ts ***!
  \************************************************/
/*! exports provided: AuthCookie */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AuthCookie", function() { return AuthCookie; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var ng2_cookies_ng2_cookies__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ng2-cookies/ng2-cookies */ "./node_modules/ng2-cookies/ng2-cookies.js");
/* harmony import */ var ng2_cookies_ng2_cookies__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(ng2_cookies_ng2_cookies__WEBPACK_IMPORTED_MODULE_1__);
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var AuthCookie = /** @class */ (function () {
    function AuthCookie() {
    }
    AuthCookie.getAuth = function () {
        return ng2_cookies_ng2_cookies__WEBPACK_IMPORTED_MODULE_1__["Cookie"].get('sticky');
    };
    AuthCookie.setAuth = function (value, expires) {
        // 0.0138889//this accept day not minuts
        ng2_cookies_ng2_cookies__WEBPACK_IMPORTED_MODULE_1__["Cookie"].set('sticky', value, expires);
    };
    AuthCookie.deleteAuth = function () {
        ng2_cookies_ng2_cookies__WEBPACK_IMPORTED_MODULE_1__["Cookie"].delete('sticky');
    };
    AuthCookie = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])(),
        __metadata("design:paramtypes", [])
    ], AuthCookie);
    return AuthCookie;
}());



/***/ }),

/***/ "./src/app/shared/auth.interceptor.ts":
/*!********************************************!*\
  !*** ./src/app/shared/auth.interceptor.ts ***!
  \********************************************/
/*! exports provided: AuthInterceptor */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AuthInterceptor", function() { return AuthInterceptor; });
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _auth_cookies_handler__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./auth-cookies-handler */ "./src/app/shared/auth-cookies-handler.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var AuthInterceptor = /** @class */ (function () {
    function AuthInterceptor() {
    }
    AuthInterceptor.prototype.intercept = function (req, next) {
        if (!req.url.includes('oauth/token')) {
            if (req.method === 'GET') {
                var headers = new _angular_common_http__WEBPACK_IMPORTED_MODULE_0__["HttpHeaders"]({ 'Content-type': 'multipart/form-data', 'Authorization': 'Bearer ' + _auth_cookies_handler__WEBPACK_IMPORTED_MODULE_2__["AuthCookie"].getAuth() });
                // TODO'multipart/form-data' -> urlencoded??
                var updatedReq = req.clone({ headers: headers });
                return next.handle(updatedReq);
            }
            else {
                var headers = new _angular_common_http__WEBPACK_IMPORTED_MODULE_0__["HttpHeaders"]({ 'Content-type': 'application/json', 'Authorization': 'Bearer ' + _auth_cookies_handler__WEBPACK_IMPORTED_MODULE_2__["AuthCookie"].getAuth() });
                var updatedReq = req.clone({ headers: headers });
                return next.handle(updatedReq);
            }
        }
        else {
            return next.handle(req);
        }
    };
    AuthInterceptor = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])(),
        __metadata("design:paramtypes", [])
    ], AuthInterceptor);
    return AuthInterceptor;
}());



/***/ }),

/***/ "./src/app/shared/chat-message.model.ts":
/*!**********************************************!*\
  !*** ./src/app/shared/chat-message.model.ts ***!
  \**********************************************/
/*! exports provided: ChatMessageModel */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ChatMessageModel", function() { return ChatMessageModel; });
var ChatMessageModel = /** @class */ (function () {
    function ChatMessageModel(senderName, message, recipientName) {
        this.senderName = senderName;
        this.message = message;
        this.recipientName = recipientName;
    }
    return ChatMessageModel;
}());



/***/ }),

/***/ "./src/app/shared/clear-array-pipe.ts":
/*!********************************************!*\
  !*** ./src/app/shared/clear-array-pipe.ts ***!
  \********************************************/
/*! exports provided: ClearArrayPipe */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ClearArrayPipe", function() { return ClearArrayPipe; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var ClearArrayPipe = /** @class */ (function () {
    function ClearArrayPipe() {
    }
    ClearArrayPipe.prototype.transform = function (array) {
        var newArray = [];
        for (var i = 0; i < array.length; i++) {
            if (typeof array[i] !== 'undefined') {
                newArray.push(array[i]);
            }
        }
        return newArray;
    };
    ClearArrayPipe = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Pipe"])({
            name: 'clearArray'
        })
    ], ClearArrayPipe);
    return ClearArrayPipe;
}());



/***/ }),

/***/ "./src/app/shared/data-storage.service.ts":
/*!************************************************!*\
  !*** ./src/app/shared/data-storage.service.ts ***!
  \************************************************/
/*! exports provided: DataStorageService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DataStorageService", function() { return DataStorageService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var rxjs_add_operator_map__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/add/operator/map */ "./node_modules/rxjs-compat/_esm5/add/operator/map.js");
/* harmony import */ var _ngrx_store__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ngrx/store */ "./node_modules/@ngrx/store/@ngrx/store.es5.js");
/* harmony import */ var _store_user_users_actions__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./store/user/users.actions */ "./src/app/shared/store/user/users.actions.ts");
/* harmony import */ var _store_table_tables_actions__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./store/table/tables.actions */ "./src/app/shared/store/table/tables.actions.ts");
/* harmony import */ var _server_model__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./server.model */ "./src/app/shared/server.model.ts");
/* harmony import */ var _store_task_tasks_actions__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./store/task/tasks.actions */ "./src/app/shared/store/task/tasks.actions.ts");
/* harmony import */ var _socket_task_info_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./socket/task-info.service */ "./src/app/shared/socket/task-info.service.ts");
/* harmony import */ var _store_chat_chat_actions__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./store/chat/chat.actions */ "./src/app/shared/store/chat/chat.actions.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};










var DataStorageService = /** @class */ (function () {
    function DataStorageService(httpClient, store, taskInfoService) {
        this.httpClient = httpClient;
        this.store = store;
        this.taskInfoService = taskInfoService;
        // stompClientState: Observable<Client>;
        // stompClient: Client;
        this.basehost = _server_model__WEBPACK_IMPORTED_MODULE_6__["baseUrl"];
    }
    DataStorageService.prototype.getCurrentUser = function (username) {
        var _this = this;
        this.httpClient.get(this.basehost + '/v1/users/' + username)
            .subscribe(function (user) {
            _this.store.dispatch(new _store_user_users_actions__WEBPACK_IMPORTED_MODULE_4__["SetCurrntUserDetails"](user));
        }, function (err) {
            console.log('getCurrentUser dss err: ', err);
        });
    };
    DataStorageService.prototype.updateUser = function (user) {
        var _this = this;
        this.httpClient.put(this.basehost + '/v1/users/' + user.username, user)
            .subscribe(function (updatedUser) {
            console.log('updateUser dss OK: ', updatedUser);
            _this.store.dispatch(new _store_user_users_actions__WEBPACK_IMPORTED_MODULE_4__["SetCurrntUserDetails"](updatedUser));
        }, function (err) {
            console.log('updateUser dss ERR: ', err);
        });
    };
    DataStorageService.prototype.updatePassword = function (oldPassword, newPassword, username) {
        this.httpClient.put(this.basehost + '/v1/users/' + username + '/pass', {
            oldPassword: oldPassword,
            newPassword: newPassword
        })
            .subscribe(function (done) {
            console.log('updatePassword dss OK: ', done);
        }, function (err) {
            console.log('updatePassword dss ERR: ', err);
        });
    };
    DataStorageService.prototype.getActiveWsUsers = function () {
        var _this = this;
        this.httpClient.get(this.basehost + '/v1/users/ws-active')
            .subscribe(function (activeUsers) {
            _this.store.dispatch(new _store_chat_chat_actions__WEBPACK_IMPORTED_MODULE_9__["SetActiveWsUsers"](activeUsers));
        }, function (err) {
            console.log('getActiveWsUsers dss err: ', err);
        });
    };
    DataStorageService.prototype.getTableHeaderByName = function (tableName) {
        var _this = this;
        return this.httpClient.get(this.basehost + '/v1/projects/tables/definition/' + tableName)
            .map(function (definition) {
            return definition;
        }).subscribe(function (definition) {
            _this.store.dispatch(new _store_table_tables_actions__WEBPACK_IMPORTED_MODULE_5__["SetTableDefinitionAction"](definition));
        }, function (err) {
            console.log('getTableHeaderByName dss err: ', err);
        });
    };
    DataStorageService.prototype.getTableRowsByName = function (tableName) {
        var _this = this;
        return this.httpClient.get(this.basehost + '/v1/projects/tables/' + tableName + '/rows')
            .subscribe(function (rows) {
            _this.store.dispatch(new _store_table_tables_actions__WEBPACK_IMPORTED_MODULE_5__["SetRowsAction"](rows));
        }, function (err) {
            console.log('getTableRowsByName dss err: ', err);
        });
    };
    DataStorageService.prototype.getTableNames = function () {
        var _this = this;
        this.httpClient.get(this.basehost + '/v1/projects/tables/names')
            .subscribe(function (names) {
            _this.store.dispatch(new _store_table_tables_actions__WEBPACK_IMPORTED_MODULE_5__["SetNamesAction"](names));
        }, function (err) {
            console.log('getTableNames dss err: ', err);
        });
    };
    DataStorageService.prototype.postTableDefinition = function (definition, databaseEnvironment) {
        this.httpClient.post(this.basehost + '/v1/projects/tables/definition/' + databaseEnvironment, definition)
            .subscribe(function () {
            //TODO komunikat
            alert("DONE!");
        }, function (err) {
            console.log('postTableDefinition dss err: ', err);
        });
    };
    DataStorageService.prototype.getUsers = function () {
        var _this = this;
        this.httpClient.get(this.basehost + '/v1/users')
            .subscribe(function (users) {
            _this.store.dispatch(new _store_user_users_actions__WEBPACK_IMPORTED_MODULE_4__["SetUsersAction"](users));
        }, function (err) {
            console.log('getUsers dss err: ', err);
        });
    };
    DataStorageService.prototype.getRoles = function () {
        var _this = this;
        this.httpClient.get(this.basehost + '/v1/roles/details')
            .subscribe(function (roles) {
            _this.store.dispatch(new _store_user_users_actions__WEBPACK_IMPORTED_MODULE_4__["SetRolesAction"](roles));
        }, function (err) {
            console.log('getRoles dss err: ', err);
        });
    };
    DataStorageService.prototype.addRoleToUser = function (data) {
        var _this = this;
        return this.httpClient.post(this.basehost + '/v1/users/' + data.username + '/roles/' + data.rolename, null)
            .subscribe(function (user) {
            _this.store.dispatch(new _store_user_users_actions__WEBPACK_IMPORTED_MODULE_4__["AddRoleToUser"](user));
            return true;
        }, function (err) {
            console.log('addRoleToUser dss err: ', err);
        });
    };
    DataStorageService.prototype.removeRoleFromUser = function (data) {
        var _this = this;
        this.httpClient.delete(this.basehost + '/v1/users/' + data.user.username + '/roles/' + data.rolename)
            .subscribe(function (response) {
            if (response) {
                data.user.roleNames.splice(data.user.roleNames.indexOf(data.rolename), 1);
                _this.store.dispatch(new _store_user_users_actions__WEBPACK_IMPORTED_MODULE_4__["RemoveRoleFromUser"](data.user));
            }
        }, function (err) {
            console.log('removeRoleFromUser dss err: ', err);
        });
    };
    // addUserToRole(data: { rolename: string, username: string }) { TODO addUserToRole
    //   return this.httpClient.post(this.basehost + '/v1/roles/' + data.rolename + '/users/' + data.username, null)
    //     .subscribe((role: RoleModel) => {
    //       this.store.dispatch(new UsersActions.AddUserToRole(role));
    //       return true;
    //     }, (err) => {
    //       console.log('addUserToRole dss err: ', err);
    //     });
    // }
    DataStorageService.prototype.removeUserFromRole = function (data) {
        var _this = this;
        this.httpClient.delete(this.basehost + '/v1/roles/' + data.role.name + '/users/' + data.username)
            .subscribe(function (response) {
            if (response) {
                var usertoRemove_1 = null;
                data.role.userDtos.forEach(function (user) {
                    if (user.username === data.username) {
                        usertoRemove_1 = user;
                    }
                });
                data.role.userDtos.splice(data.role.userDtos.indexOf(usertoRemove_1), 1);
                _this.store.dispatch(new _store_user_users_actions__WEBPACK_IMPORTED_MODULE_4__["RemoveUserFromRole"](data.role));
            }
        });
    };
    DataStorageService.prototype.addNewRow = function (tableName, newRow) {
        var _this = this;
        this.httpClient.post(this.basehost + '/v1/projects/tables/' + tableName + '/row', newRow)
            .subscribe(function (savedRow) {
            // console.log('addNewRow dss OK: ', savedRow)
            _this.store.dispatch(new _store_table_tables_actions__WEBPACK_IMPORTED_MODULE_5__["AddRowAction"](savedRow));
        }, function (err) {
            console.log('addNewRow dss err: ', err);
        });
    };
    DataStorageService.prototype.updateRow = function (tableName, updatedRow) {
        var _this = this;
        this.httpClient.put(this.basehost + '/v1/projects/tables/' + tableName + '/row', updatedRow)
            .subscribe(function (savedRow) {
            // console.log("updateRow dss OK: ", savedRow);
            _this.store.dispatch(new _store_table_tables_actions__WEBPACK_IMPORTED_MODULE_5__["UpdateRowAction"](savedRow));
        }, function (err) {
            console.log('updateRow dss ERR: ', err);
        });
    };
    DataStorageService.prototype.getCurrentUserRoles = function (username) {
        var _this = this;
        this.httpClient.get(this.basehost + '/v1/roles/user/' + username)
            .subscribe(function (roles) {
            _this.store.dispatch(new _store_user_users_actions__WEBPACK_IMPORTED_MODULE_4__["SetCurrentUserRolenames"](roles));
        }, function (err) {
            console.log('getUserRoles dss ERR: ', err);
        });
    };
    DataStorageService.prototype.saveNewRole = function (role) {
        var _this = this;
        this.httpClient.post(this.basehost + '/v1/roles/' + role.name, role.description)
            .subscribe(function (savedRole) {
            // console.log('saveNewRole dss OK: ', savedRole)
            _this.store.dispatch(new _store_user_users_actions__WEBPACK_IMPORTED_MODULE_4__["AddRoleAction"](savedRole));
        }, function (err) {
            console.log('saveNewRole dss err: ', err);
        });
    };
    // deleteRole(roleName: string) { todo remove?
    //   this.httpClient.delete<boolean>(this.basehost + '/v1/roles/' + roleName)
    //     .subscribe((status: boolean) => {
    //         if (status) {
    //           this.store.dispatch(new UsersActions.DeleteRoleAction(roleName));
    //         }
    //       },
    //       err => {
    //         console.log('deleteRole dss err: ', err);
    //       });
    // }
    DataStorageService.prototype.deleteUser = function (username) {
        var _this = this;
        this.httpClient.delete(this.basehost + '/v1/users/' + username)
            .subscribe(function (status) {
            if (status) {
                _this.store.dispatch(new _store_user_users_actions__WEBPACK_IMPORTED_MODULE_4__["DeleteUserAction"](username));
                _this.store.dispatch(new _store_user_users_actions__WEBPACK_IMPORTED_MODULE_4__["SetNewUserModeAction"](false));
                _this.store.dispatch(new _store_user_users_actions__WEBPACK_IMPORTED_MODULE_4__["SetUserDisplayedTask"](null));
            }
            return true;
        }, function (err) {
            console.log('deleteUser dss err: ', err);
        });
    };
    DataStorageService.prototype.saveNewUser = function (user) {
        var _this = this;
        this.httpClient.post(this.basehost + '/v1/users', user)
            .subscribe(function (savedUser) {
            console.log('saveNewUser dss OK: ', savedUser);
            _this.store.dispatch(new _store_user_users_actions__WEBPACK_IMPORTED_MODULE_4__["AddUserAction"](savedUser));
            _this.store.dispatch(new _store_user_users_actions__WEBPACK_IMPORTED_MODULE_4__["SetNewUserModeAction"](false));
        }, function (err) {
            console.log('saveNewUser dss err: ', err);
        });
    };
    DataStorageService.prototype.saveNewTask = function (tableName, newTask, rowId) {
        var _this = this;
        this.httpClient.post(this.basehost + '/v1/projects/tables/' + tableName + '/rows/' + rowId + '/tasks', newTask)
            .subscribe(function (task) {
            // console.log('saveNewTask dss OK: ', tasks)
            _this.store.dispatch(new _store_table_tables_actions__WEBPACK_IMPORTED_MODULE_5__["AddTaskAction"]({ task: task, rowId: rowId }));
        }, function (err) {
            console.log('saveNewTask dss err: ', err);
        });
    };
    DataStorageService.prototype.setTableUsers = function (tableName) {
        var _this = this;
        // console.log(tableName);
        this.httpClient.get(this.basehost + '/v1/users/table/' + tableName)
            .subscribe(function (users) {
            _this.store.dispatch(new _store_table_tables_actions__WEBPACK_IMPORTED_MODULE_5__["SetTableUsers"](users));
        }, function (err) {
            console.log('setTableUsers dss ERR: ', err);
        });
    };
    DataStorageService.prototype.onAssignUserToTask = function (tableName, rowId, taskId, username) {
        var _this = this;
        this.httpClient.post(this.basehost + '/v1/projects/tables/' + tableName + '/rows/tasks/' + taskId, username)
            .subscribe(function (task) {
            // console.log('onAssignUserToTask dss OK: ', task)
            _this.store.dispatch(new _store_table_tables_actions__WEBPACK_IMPORTED_MODULE_5__["UpdateRowsTaskAction"]({ rowId: rowId, task: task }));
            _this.taskInfoService.stompClient.send('/app/newTasks/' + username, {});
        }, function (err) {
            console.log('onAssignUserToTask dss err: ', err);
        });
    };
    DataStorageService.prototype.onRemoveUserFromTask = function (tableName, rowId, taskId, username) {
        var _this = this;
        this.httpClient.delete(this.basehost + '/v1/projects/tables/' + tableName + '/rows/tasks/' + taskId + '/user/' + username)
            .subscribe(function (task) {
            // console.log('onRemoveUserFromTask dss OK: ', task)
            _this.store.dispatch(new _store_table_tables_actions__WEBPACK_IMPORTED_MODULE_5__["UpdateRowsTaskAction"]({ rowId: rowId, task: task }));
            _this.taskInfoService.stompClient.send('/app/newTasks/' + username, {});
        }, function (err) {
            console.log('onRemoveUserFromTask dss err: ', err);
        });
    };
    DataStorageService.prototype.updateTask = function (task) {
        var _this = this;
        this.httpClient.put(this.basehost + '/v1/projects/tables/rows/tasks/', task)
            .subscribe(function (updatedTask) {
            console.log('updateTask dss OK: ', updatedTask);
            _this.store.dispatch(new _store_table_tables_actions__WEBPACK_IMPORTED_MODULE_5__["UpdateTaskAction"](updatedTask));
            _this.store.dispatch(new _store_user_users_actions__WEBPACK_IMPORTED_MODULE_4__["UpdateTaskAction"](updatedTask));
        }, function (err) {
            console.log('updateTask dss ERR: ', err);
        });
    };
    DataStorageService.prototype.deleteTask = function (tableName, taskId, rowId) {
        var _this = this;
        // console.log('deleteTask',taskId, rowId)
        this.httpClient.delete(this.basehost + '/v1/projects/tables/' + tableName + '/rows/tasks/' + taskId)
            .subscribe(function (response) {
            if (response) {
                _this.store.dispatch(new _store_task_tasks_actions__WEBPACK_IMPORTED_MODULE_7__["OnDeleteTask"](taskId));
                _this.store.dispatch(new _store_table_tables_actions__WEBPACK_IMPORTED_MODULE_5__["DeleteTask"]({ rowId: rowId, taskId: taskId }));
            }
        }, function (err) {
            console.log('deleteTask dss err: ', err);
        });
    };
    DataStorageService.prototype.deleteRow = function (tableName, rowId) {
        var _this = this;
        this.httpClient.delete(this.basehost + '/v1/projects/tables/' + tableName + '/rows/' + rowId)
            .subscribe(function (response) {
            if (response) {
                _this.store.dispatch(new _store_table_tables_actions__WEBPACK_IMPORTED_MODULE_5__["DeleteRow"](rowId));
            }
        }, function (err) {
            console.log('deleteRow dss err: ', err);
        });
    };
    DataStorageService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])(),
        __metadata("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"],
            _ngrx_store__WEBPACK_IMPORTED_MODULE_3__["Store"],
            _socket_task_info_service__WEBPACK_IMPORTED_MODULE_8__["TaskInfoService"]])
    ], DataStorageService);
    return DataStorageService;
}());



/***/ }),

/***/ "./src/app/shared/filter/extended-filter.pipe.ts":
/*!*******************************************************!*\
  !*** ./src/app/shared/filter/extended-filter.pipe.ts ***!
  \*******************************************************/
/*! exports provided: ExtendedFilterPipe */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ExtendedFilterPipe", function() { return ExtendedFilterPipe; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _filter_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./filter.service */ "./src/app/shared/filter/filter.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var ExtendedFilterPipe = /** @class */ (function () {
    function ExtendedFilterPipe(filterService) {
        this.filterService = filterService;
    }
    ExtendedFilterPipe.prototype.transform = function (rows, extendedFilterContent, filterSelect) {
        var _this = this;
        return rows.filter(function (row) { return _this.filterService.runExtendedRowFilter(row, extendedFilterContent, filterSelect); });
    };
    ExtendedFilterPipe = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Pipe"])({ name: 'extendedFilter' }),
        __metadata("design:paramtypes", [_filter_service__WEBPACK_IMPORTED_MODULE_1__["FilterService"]])
    ], ExtendedFilterPipe);
    return ExtendedFilterPipe;
}());



/***/ }),

/***/ "./src/app/shared/filter/filter.service.ts":
/*!*************************************************!*\
  !*** ./src/app/shared/filter/filter.service.ts ***!
  \*************************************************/
/*! exports provided: FilterService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FilterService", function() { return FilterService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var FilterService = /** @class */ (function () {
    function FilterService() {
    }
    FilterService_1 = FilterService;
    FilterService.prototype.runExtendedRowFilter = function (row, filter, filterSelect) {
        if (this.isEmptyFilter(filter)) {
            return true;
        }
        else {
            if (filterSelect) {
                return this.anyFilter(row, filter);
            }
            else {
                return FilterService_1.andFilter(row, filter);
            }
        }
    };
    FilterService.andFilter = function (row, filter) {
        if (!FilterService_1.containsAll(row.id, filter.id)) {
            return false;
        }
        if (!FilterService_1.containsAll(row.name || '', filter.name)) {
            return false;
        }
        if (!FilterService_1.containsAll(row.createdOn, filter.createdOn)) {
            return false;
        }
        if (!FilterService_1.containsAll(row.createdBy, filter.createdBy)) {
            return false;
        }
        if (!FilterService_1.containsAll(row.lastModifiedOn, filter.lastModifiedOn)) {
            return false;
        }
        if (!FilterService_1.containsAll(row.lastModifiedBy, filter.lastModifiedBy)) {
            return false;
        }
        if (!FilterService_1.containsAll(row.taskDtos.length, filter.taskDtos)) {
            return false;
        }
        for (var i = 0; i < row.columnValueDtos.length; i++) {
            if (!FilterService_1.containsAll(FilterService_1.getMappedValue(row.columnValueDtos[i]), filter.columnValueDtos[i].value)) {
                return false;
            }
        }
        return true;
    };
    FilterService.containsAll = function (rowValue, filterValue) {
        if (!filterValue) {
            return true;
        }
        return rowValue.toString().includes(filterValue);
    };
    FilterService.prototype.anyFilter = function (row, filter) {
        var condition = true;
        if (FilterService_1.containsAny(row.id, filter.id)) {
            condition = false;
        }
        if (FilterService_1.containsAny(row.name || '', filter.name)) {
            condition = false;
        }
        if (FilterService_1.containsAny(row.createdOn, filter.createdOn)) {
            condition = false;
        }
        if (FilterService_1.containsAny(row.createdBy, filter.createdBy)) {
            condition = false;
        }
        if (FilterService_1.containsAny(row.lastModifiedOn, filter.lastModifiedOn)) {
            condition = false;
        }
        if (FilterService_1.containsAny(row.lastModifiedBy, filter.lastModifiedBy)) {
            condition = false;
        }
        if (row.taskDtos.length === filter.taskDtos) {
            condition = false;
        }
        row.columnValueDtos.forEach(function (value, i) {
            if (FilterService_1.containsAny(FilterService_1.getMappedValue(value), filter.columnValueDtos[i].value)) {
                condition = false;
            }
        });
        return !condition;
    };
    FilterService.prototype.runFilterTable = function (row, filter) {
        var condition = false;
        row.columnValueDtos.forEach(function (value) {
            if (FilterService_1.containsAny(FilterService_1.getMappedValue(value), filter)) {
                condition = true;
            }
        });
        return condition;
    };
    FilterService.containsAny = function (rowValue, filterValue) {
        if (!filterValue) {
            return false;
        }
        return rowValue.toString().includes(filterValue);
    };
    FilterService.getMappedValue = function (object) {
        return object[Object.keys(object)[0]].value.toString();
    };
    FilterService.prototype.isEmptyFilter = function (filter) {
        var isFilterEmpty = true;
        if (!filter) {
            return true;
        }
        if (filter.id) {
            isFilterEmpty = false;
        }
        if (filter.name) {
            isFilterEmpty = false;
        }
        if (filter.createdOn) {
            isFilterEmpty = false;
        }
        if (filter.createdBy) {
            isFilterEmpty = false;
        }
        if (filter.lastModifiedOn) {
            isFilterEmpty = false;
        }
        if (filter.lastModifiedBy) {
            isFilterEmpty = false;
        }
        if (filter.taskDtos) {
            isFilterEmpty = false;
        }
        filter.columnValueDtos.forEach(function (value) {
            if (value.value) {
                isFilterEmpty = false;
            }
        });
        return isFilterEmpty;
    };
    FilterService = FilterService_1 = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])(),
        __metadata("design:paramtypes", [])
    ], FilterService);
    return FilterService;
    var FilterService_1;
}());



/***/ }),

/***/ "./src/app/shared/modules/material/app-material.module.ts":
/*!****************************************************************!*\
  !*** ./src/app/shared/modules/material/app-material.module.ts ***!
  \****************************************************************/
/*! exports provided: AppMaterialModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppMaterialModule", function() { return AppMaterialModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


var MATERIAL_MODULES = [
    _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatButtonModule"],
    _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatIconModule"],
    _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatFormFieldModule"],
    _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatInputModule"],
    _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatDatepickerModule"],
    _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatNativeDateModule"],
    _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatCheckboxModule"],
    _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatSidenavModule"],
    _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatToolbarModule"],
    _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatListModule"],
    _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatCardModule"],
    _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatSelectModule"],
    _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatProgressSpinnerModule"],
    _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatDialogModule"],
    _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatTableModule"],
    _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatSortModule"],
    _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatPaginatorModule"],
    _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatSnackBarModule"]
];
var AppMaterialModule = /** @class */ (function () {
    function AppMaterialModule() {
    }
    AppMaterialModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: MATERIAL_MODULES.slice(),
            exports: MATERIAL_MODULES.slice()
        })
    ], AppMaterialModule);
    return AppMaterialModule;
}());



/***/ }),

/***/ "./src/app/shared/modules/routing/app-routing-module.ts":
/*!**************************************************************!*\
  !*** ./src/app/shared/modules/routing/app-routing-module.ts ***!
  \**************************************************************/
/*! exports provided: appRoutes, AppRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "appRoutes", function() { return appRoutes; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppRoutingModule", function() { return AppRoutingModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _user_user_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../user/user.component */ "./src/app/user/user.component.ts");
/* harmony import */ var _chat_chat_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../chat/chat.component */ "./src/app/chat/chat.component.ts");
/* harmony import */ var _training_training_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../training/training.component */ "./src/app/training/training.component.ts");
/* harmony import */ var _signin_signin_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../signin/signin.component */ "./src/app/signin/signin.component.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _home_home_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../home/home.component */ "./src/app/home/home.component.ts");
/* harmony import */ var _statistics_statistics_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../statistics/statistics.component */ "./src/app/statistics/statistics.component.ts");
/* harmony import */ var _roles_roles_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../roles/roles.component */ "./src/app/roles/roles.component.ts");
/* harmony import */ var _tables_tables_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../tables/tables.component */ "./src/app/tables/tables.component.ts");
/* harmony import */ var _definition_definition_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../../definition/definition.component */ "./src/app/definition/definition.component.ts");
/* harmony import */ var _user_info_user_info_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../../user-info/user-info.component */ "./src/app/user-info/user-info.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};












var appRoutes = [
    { path: 'home', component: _home_home_component__WEBPACK_IMPORTED_MODULE_6__["HomeComponent"] },
    { path: 'roles', component: _roles_roles_component__WEBPACK_IMPORTED_MODULE_8__["RolesComponent"] },
    { path: 'users', component: _user_user_component__WEBPACK_IMPORTED_MODULE_1__["UserComponent"] },
    { path: 'tables', component: _tables_tables_component__WEBPACK_IMPORTED_MODULE_9__["TablesComponent"] },
    { path: 'signin', component: _signin_signin_component__WEBPACK_IMPORTED_MODULE_4__["SigninComponent"] },
    // {path: 'signin', component: TrainingComponent},
    { path: 'definitions', component: _definition_definition_component__WEBPACK_IMPORTED_MODULE_10__["DefinitionComponent"] },
    { path: 'statistics', component: _statistics_statistics_component__WEBPACK_IMPORTED_MODULE_7__["StatisticsComponent"] },
    { path: 'chat', component: _chat_chat_component__WEBPACK_IMPORTED_MODULE_2__["ChatComponent"] },
    { path: 'user-info', component: _user_info_user_info_component__WEBPACK_IMPORTED_MODULE_11__["UserInfoComponent"] },
    { path: 'user-info', component: _user_info_user_info_component__WEBPACK_IMPORTED_MODULE_11__["UserInfoComponent"] },
    { path: 'training', component: _training_training_component__WEBPACK_IMPORTED_MODULE_3__["TrainingComponent"] },
];
var AppRoutingModule = /** @class */ (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [_angular_router__WEBPACK_IMPORTED_MODULE_5__["RouterModule"].forRoot(appRoutes)],
            exports: [_angular_router__WEBPACK_IMPORTED_MODULE_5__["RouterModule"]]
        })
    ], AppRoutingModule);
    return AppRoutingModule;
}());



/***/ }),

/***/ "./src/app/shared/oauth.service.ts":
/*!*****************************************!*\
  !*** ./src/app/shared/oauth.service.ts ***!
  \*****************************************/
/*! exports provided: OauthService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OauthService", function() { return OauthService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _ngrx_store__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ngrx/store */ "./node_modules/@ngrx/store/@ngrx/store.es5.js");
/* harmony import */ var _shared_server_model__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../shared/server.model */ "./src/app/shared/server.model.ts");
/* harmony import */ var _auth_cookies_handler__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./auth-cookies-handler */ "./src/app/shared/auth-cookies-handler.ts");
/* harmony import */ var _store_user_users_actions__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./store/user/users.actions */ "./src/app/shared/store/user/users.actions.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var OauthService = /** @class */ (function () {
    function OauthService(router, httpClient, store) {
        var _this = this;
        this.router = router;
        this.httpClient = httpClient;
        this.store = store;
        this.basehost = _shared_server_model__WEBPACK_IMPORTED_MODULE_4__["baseUrl"];
        this.store.select('users', 'token').forEach(function (token) {
            if (token !== null) {
                _auth_cookies_handler__WEBPACK_IMPORTED_MODULE_5__["AuthCookie"].setAuth(token.access_token, token.expires_in);
                _this.token = token.access_token;
                _this.isAuthenticated = true;
            }
            else {
                _this.isAuthenticated = false;
            }
        });
    }
    OauthService.prototype.obtainAccessToken = function (loginData) {
        var _this = this;
        var params = new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpParams"]()
            .append('username', loginData.username)
            .append('password', loginData.password)
            .append('grant_type', 'password')
            .append('client_id', 'live-test');
        var headers = new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpHeaders"]({
            'Content-type': 'application/x-www-form-urlencoded; charset=utf-8',
            'Authorization': 'Basic ' + btoa('live-test:bG2ZS10ZXN0')
        });
        this.httpClient.post(this.basehost + '/oauth/token', null, {
            observe: 'body',
            headers: headers,
            params: params
        })
            .subscribe(function (data) {
            _this.saveToken(data, loginData.username);
            _this.router.navigate(['/home']);
        }, function (err) {
            console.log(err.message);
            var errorMessage = err.message;
            if (errorMessage.includes('live-test')) {
                _this.store.dispatch(new _store_user_users_actions__WEBPACK_IMPORTED_MODULE_6__["SetLoginFailureInfo"]('Invalid credentials!'));
            }
            else {
                switch (errorMessage) {
                    case 'Http failure response for (unknown url): 0 Unknown Error':
                        _this.store.dispatch(new _store_user_users_actions__WEBPACK_IMPORTED_MODULE_6__["SetLoginFailureInfo"]('Connection problem'));
                        return;
                    default:
                        _this.store.dispatch(new _store_user_users_actions__WEBPACK_IMPORTED_MODULE_6__["SetLoginFailureInfo"](errorMessage));
                        return;
                }
            }
            return false;
        });
    };
    // getResource(resourceUrl) : Observable<any> {
    //   var headers = new HttpHeaders({'Content-type': 'application/x-www-form-urlencoded; charset=utf-8',
    //     'Authorization': 'Bearer ' + this.cookie.getAuth()});
    //   return this.httpClient.get(resourceUrl, { headers: headers }).subscribe({})
    //   //.catch((error:any) => Observable.throw('Server error',error));
    // }
    OauthService.prototype.saveToken = function (token, username) {
        // const expireDate = new Date().getTime() + (1000 * token.expires_in); // TODO remove??
        this.store.dispatch(new _store_user_users_actions__WEBPACK_IMPORTED_MODULE_6__["SetTokenAction"](token));
        this.store.dispatch(new _store_user_users_actions__WEBPACK_IMPORTED_MODULE_6__["SetCurrentUserAction"](username));
        _auth_cookies_handler__WEBPACK_IMPORTED_MODULE_5__["AuthCookie"].setAuth(token.access_token, token.expires_in);
    };
    OauthService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])(),
        __metadata("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"],
            _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"],
            _ngrx_store__WEBPACK_IMPORTED_MODULE_3__["Store"]])
    ], OauthService);
    return OauthService;
}());



/***/ }),

/***/ "./src/app/shared/reverse.pipe.ts":
/*!****************************************!*\
  !*** ./src/app/shared/reverse.pipe.ts ***!
  \****************************************/
/*! exports provided: ReversePipe */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ReversePipe", function() { return ReversePipe; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var ReversePipe = /** @class */ (function () {
    function ReversePipe() {
    }
    ReversePipe.prototype.transform = function (value) {
        return value.slice().reverse();
    };
    ReversePipe = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Pipe"])({
            name: 'reverse'
        })
    ], ReversePipe);
    return ReversePipe;
}());



/***/ }),

/***/ "./src/app/shared/server.model.ts":
/*!****************************************!*\
  !*** ./src/app/shared/server.model.ts ***!
  \****************************************/
/*! exports provided: baseUrl */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "baseUrl", function() { return baseUrl; });
var baseUrl = 'https://my-jira.herokuapp.com';
//export const baseUrl = 'http://localhost:8080';


/***/ }),

/***/ "./src/app/shared/socket/task-info.service.ts":
/*!****************************************************!*\
  !*** ./src/app/shared/socket/task-info.service.ts ***!
  \****************************************************/
/*! exports provided: TaskInfoService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TaskInfoService", function() { return TaskInfoService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _web_socket_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./web-socket.service */ "./src/app/shared/socket/web-socket.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var TaskInfoService = /** @class */ (function () {
    function TaskInfoService(wsService) {
        this.wsService = wsService;
    }
    TaskInfoService.prototype.getClient = function () {
        this.stompClient = this.wsService.connect();
        return this.stompClient;
    };
    TaskInfoService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])(),
        __metadata("design:paramtypes", [_web_socket_service__WEBPACK_IMPORTED_MODULE_1__["WebSocketService"]])
    ], TaskInfoService);
    return TaskInfoService;
}());



/***/ }),

/***/ "./src/app/shared/socket/web-socket.service.ts":
/*!*****************************************************!*\
  !*** ./src/app/shared/socket/web-socket.service.ts ***!
  \*****************************************************/
/*! exports provided: WebSocketService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WebSocketService", function() { return WebSocketService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var sockjs_client__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! sockjs-client */ "./node_modules/sockjs-client/lib/entry.js");
/* harmony import */ var sockjs_client__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(sockjs_client__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _auth_cookies_handler__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../auth-cookies-handler */ "./src/app/shared/auth-cookies-handler.ts");
/* harmony import */ var stompjs_lib_stomp_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! stompjs/lib/stomp.js */ "./node_modules/stompjs/lib/stomp.js");
/* harmony import */ var stompjs_lib_stomp_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(stompjs_lib_stomp_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _ngrx_store__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ngrx/store */ "./node_modules/@ngrx/store/@ngrx/store.es5.js");
/* harmony import */ var _store_user_users_actions__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../store/user/users.actions */ "./src/app/shared/store/user/users.actions.ts");
/* harmony import */ var _store_chat_chat_actions__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../store/chat/chat.actions */ "./src/app/shared/store/chat/chat.actions.ts");
/* harmony import */ var _server_model__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../server.model */ "./src/app/shared/server.model.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var WebSocketService = /** @class */ (function () {
    function WebSocketService(cookie, store) {
        this.cookie = cookie;
        this.store = store;
    }
    WebSocketService.prototype.connect = function () {
        return this.connectWS();
    };
    WebSocketService.prototype.connectWS = function () {
        var _this = this;
        var socket = new sockjs_client__WEBPACK_IMPORTED_MODULE_1__(_server_model__WEBPACK_IMPORTED_MODULE_7__["baseUrl"] + '/newTasks?access_token=' + _auth_cookies_handler__WEBPACK_IMPORTED_MODULE_2__["AuthCookie"].getAuth());
        this.stompClient = stompjs_lib_stomp_js__WEBPACK_IMPORTED_MODULE_3__["Stomp"].over(socket);
        this.stompClient.connect({}, function () {
            // console.log('CONNECT CONNECT', frame);
            _this.store.select('users', 'currentUser').subscribe(function (username) {
                _this.stompClient.subscribe('/topic/newTasks/' + username, function () {
                    // console.log(messageOutput);
                    _this.store.dispatch(new _store_user_users_actions__WEBPACK_IMPORTED_MODULE_5__["SetTaskInfoAction"](true));
                });
                _this.stompClient.subscribe('/topic/chat', function (messageOutput) {
                    // console.log('/topic/chat/',messageOutput.body);
                    _this.store.dispatch(new _store_chat_chat_actions__WEBPACK_IMPORTED_MODULE_6__["AppendChatWithMessage"](JSON.parse(messageOutput.body)));
                });
                _this.stompClient.subscribe('/topic/chat/' + username, function (messageOutput) {
                    // console.log('/topic/chat/',messageOutput.body);
                    _this.store.dispatch(new _store_chat_chat_actions__WEBPACK_IMPORTED_MODULE_6__["AppendChatWithMessage"](JSON.parse(messageOutput.body)));
                });
                _this.stompClient.subscribe('/topic/people/chat', function (messageOutput) {
                    // console.log('/topic/people/chat/',messageOutput.body);
                    _this.store.dispatch(new _store_chat_chat_actions__WEBPACK_IMPORTED_MODULE_6__["SetActiveWsUsers"](JSON.parse(messageOutput.body)));
                });
            });
        });
        return this.stompClient;
    };
    WebSocketService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])(),
        __metadata("design:paramtypes", [_auth_cookies_handler__WEBPACK_IMPORTED_MODULE_2__["AuthCookie"],
            _ngrx_store__WEBPACK_IMPORTED_MODULE_4__["Store"]])
    ], WebSocketService);
    return WebSocketService;
}());



/***/ }),

/***/ "./src/app/shared/sort/sort-by.pipe.ts":
/*!*********************************************!*\
  !*** ./src/app/shared/sort/sort-by.pipe.ts ***!
  \*********************************************/
/*! exports provided: SortByPipe */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SortByPipe", function() { return SortByPipe; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var SortByPipe = /** @class */ (function () {
    function SortByPipe() {
    }
    SortByPipe.prototype.transform = function (rows, sortContent) {
        if (sortContent == null) {
            return rows;
        }
        else {
            switch (sortContent.dataType) {
                case 'ST':
                case 'DE':
                case 'EN':
                    return this.textSort(rows, sortContent.asc, sortContent.name, sortContent.index);
                case 'IN':
                    return this.numberSort(rows, sortContent.asc, sortContent.name, sortContent.index);
                case 'DT':
                    return this.dateSort(rows, sortContent.asc, sortContent.name, sortContent.index);
                default:
                    return rows;
            }
        }
    };
    SortByPipe.prototype.textSort = function (rows, asc, name, index) {
        switch (name) {
            case 'id':
                return this.sortNumber(rows, name, index, asc); // TODO toremove?
            case 'name':
                return this.sortText(rows, name, index, asc);
            case 'createdBy':
                return this.sortText(rows, name, index, asc);
            case 'createdOn':
                return this.sortDate(rows, name, index, asc); // TODO toremove?
            case 'lastModifiedBy':
                return this.sortText(rows, name, index, asc);
            case 'lastModifiedOn':
                return this.sortDate(rows, name, index, asc); // todo toremove?
            case 'taskDtos':
                return this.sortByArrayLength(rows, name, index, asc); // todo toremove?
            case 'column':
                return this.sortText(rows, name, index, asc);
        }
    };
    SortByPipe.prototype.numberSort = function (rows, asc, name, index) {
        switch (name) {
            case 'id':
                return this.sortNumber(rows, name, index, asc);
            case 'name':
                return this.sortText(rows, name, index, asc); // todo toremove?
            case 'createdBy':
                return this.sortText(rows, name, index, asc); // todo toremove?
            case 'createdOn':
                return this.sortDate(rows, name, index, asc); // todo toremove?
            case 'lastModifiedBy':
                return this.sortText(rows, name, index, asc); // todo toremove?
            case 'lastModifiedOn':
                return this.sortDate(rows, name, index, asc); // todo toremove?
            case 'taskDtos':
                return this.sortByArrayLength(rows, name, index, asc);
            case 'column':
                return this.sortNumber(rows, name, index, asc);
        }
    };
    SortByPipe.prototype.dateSort = function (rows, asc, name, index) {
        switch (name) {
            case 'id':
                return this.sortNumber(rows, name, index, asc);
            case 'name':
                return this.sortText(rows, name, index, asc);
            case 'createdBy':
                return this.sortText(rows, name, index, asc);
            case 'createdOn':
                return this.sortDate(rows, name, index, asc); // todo toremove?
            case 'lastModifiedBy':
                return this.sortText(rows, name, index, asc);
            case 'lastModifiedOn':
                return this.sortDate(rows, name, index, asc); // todo toremove?
            case 'taskDtos':
                return this.sortByArrayLength(rows, name, index, asc);
            case 'column':
                return this.sortDate(rows, name, index, asc);
        }
    };
    SortByPipe.prototype.sortText = function (rows, field, index, asc) {
        if (field !== 'column') {
            rows.sort(function (a, b) {
                return a[field].localeCompare(b[field]);
            });
        }
        else {
            rows.sort(function (a, b) {
                return a.columnValueDtos[index][Object.keys(a.columnValueDtos[index])[0]].value
                    .localeCompare(b.columnValueDtos[index][Object.keys(a.columnValueDtos[index])[0]].value);
            });
        }
        if (!asc) {
            return rows;
        }
        else {
            return rows.reverse();
        }
    };
    SortByPipe.prototype.sortNumber = function (rows, field, index, asc) {
        if (field !== 'column') {
            rows.sort(function (a, b) {
                return a[field] - b[field];
            });
        }
        else {
            rows.sort(function (a, b) {
                return parseInt(a.columnValueDtos[index][Object.keys(a.columnValueDtos[index])[0]].value, 0)
                    - parseInt(b.columnValueDtos[index][Object.keys(a.columnValueDtos[index])[0]].value, 0);
            });
        }
        return asc ? rows : rows.reverse();
    };
    SortByPipe.prototype.sortByArrayLength = function (rows, field, index, asc) {
        rows.sort(function (a, b) {
            return a[field].length - b[field].length;
        });
        return asc ? rows : rows.reverse();
    };
    SortByPipe.prototype.sortDate = function (rows, field, index, asc) {
        if (field !== 'column') {
            rows.sort(function (a, b) {
                return Date.parse(a[field]) - Date.parse(b[field]);
            });
        }
        else {
            rows.sort(function (a, b) {
                return Date.parse(a.columnValueDtos[index][Object.keys(a.columnValueDtos[index])[0]].value)
                    - Date.parse(b.columnValueDtos[index][Object.keys(a.columnValueDtos[index])[0]].value);
            });
        }
        return asc ? rows : rows.reverse();
    };
    SortByPipe = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Pipe"])({ name: 'orderBy' })
    ], SortByPipe);
    return SortByPipe;
}());



/***/ }),

/***/ "./src/app/shared/statistics/statistics.service.ts":
/*!*********************************************************!*\
  !*** ./src/app/shared/statistics/statistics.service.ts ***!
  \*********************************************************/
/*! exports provided: StatisticsService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StatisticsService", function() { return StatisticsService; });
var StatisticsService = /** @class */ (function () {
    function StatisticsService() {
    }
    StatisticsService.prototype.mapToRowsInfo = function (rowList) {
        var _this = this;
        var rows = [];
        var doneRows = [];
        var undoneRows = [];
        var columnInfo = {
            numberInfo: [],
            enumInfo: [],
            dateInfo: [],
            shortTextInfo: [],
            descriptionInfo: []
        };
        var numberInfoIndex = 0;
        var enumInfoIndex = 0;
        var dateInfoIndex = 0;
        var shortTextIndex = 0;
        var descriptionInfoIndex = 0;
        rowList.forEach(function (row, rowIdx) {
            rows.push(row);
            if (_this.containsUndoneTasks(row)) {
                doneRows.push(row);
            }
            else {
                undoneRows.push(row);
            }
            row.columnValueDtos.forEach(function (value, j) {
                var string = Object.keys(value)[0];
                if (string === 'IN') {
                    if (typeof columnInfo.numberInfo[j] === 'undefined') {
                        columnInfo.numberInfo[j] = {
                            columnNumber: j,
                            sum: 0,
                            avg: 0,
                            min: Number.POSITIVE_INFINITY,
                            max: Number.NEGATIVE_INFINITY
                        };
                    }
                    columnInfo.numberInfo[j].sum += parseFloat(value[Object.keys(value)[0]].value);
                    columnInfo.numberInfo[j].avg += parseFloat(value[Object.keys(value)[0]].value);
                    if (columnInfo.numberInfo[j].min >= parseFloat(value[Object.keys(value)[0]].value)) {
                        columnInfo.numberInfo[j].min = parseFloat(value[Object.keys(value)[0]].value);
                    }
                    if (columnInfo.numberInfo[j].max <= parseFloat(value[Object.keys(value)[0]].value)) {
                        columnInfo.numberInfo[j].max = parseFloat(value[Object.keys(value)[0]].value);
                    }
                    numberInfoIndex++;
                    return;
                }
                else if (string === 'EN') {
                    if (typeof columnInfo.enumInfo[j] === 'undefined') {
                        columnInfo.enumInfo[j] = [];
                    }
                    var exist_1 = false;
                    columnInfo.enumInfo[j].forEach(function (columnStats, columnInfoIdx) {
                        if (columnStats.name === value[Object.keys(value)[0]].value) {
                            columnInfo.enumInfo[j][columnInfoIdx].sum++;
                            exist_1 = true;
                        }
                    });
                    if (!exist_1) {
                        columnInfo.enumInfo[j][rowIdx] = { columnNumber: j, name: value[Object.keys(value)[0]].value, sum: 1 };
                    }
                    enumInfoIndex++;
                    return;
                }
                else if (string === 'DT') {
                    if (typeof columnInfo.dateInfo[j] === 'undefined') {
                        columnInfo.dateInfo[j] = {
                            columnNumber: j,
                            min: Date.parse(new Date(8640000000000000).toString()),
                            max: Date.parse(new Date(-8640000000000000).toString())
                        };
                    }
                    if (columnInfo.dateInfo[j].min >= Date.parse(value[Object.keys(value)[0]].value)) {
                        columnInfo.dateInfo[j].min = Date.parse(value[Object.keys(value)[0]].value);
                    }
                    if (columnInfo.dateInfo[j].max <= Date.parse(value[Object.keys(value)[0]].value)) {
                        columnInfo.dateInfo[j].max = Date.parse(value[Object.keys(value)[0]].value);
                    }
                    dateInfoIndex++;
                    return;
                }
                else if (string === 'ST') {
                    if (typeof columnInfo.shortTextInfo[j] === 'undefined') {
                        columnInfo.shortTextInfo[j] = { columnNumber: j, avgLength: 0 };
                    }
                    columnInfo.shortTextInfo[j].avgLength += value[Object.keys(value)[0]].value.length;
                    shortTextIndex++;
                    return;
                }
                else if (string === 'DE') {
                    if (typeof columnInfo.descriptionInfo[j] === 'undefined') {
                        columnInfo.descriptionInfo[j] = { columnNumber: j, avgLength: 0 };
                    }
                    columnInfo.descriptionInfo[j].avgLength += value[Object.keys(value)[0]].value.length;
                    descriptionInfoIndex++;
                    return;
                }
            });
        });
        columnInfo.numberInfo.forEach(function (value, i) {
            columnInfo.numberInfo[i]['avg'] = value.avg / rows.length;
        });
        columnInfo.shortTextInfo.forEach(function (value, i) {
            columnInfo.shortTextInfo[i].avgLength = value.avgLength / rows.length;
        });
        columnInfo.descriptionInfo.forEach(function (value, i) {
            columnInfo.descriptionInfo[i].avgLength = value.avgLength / rows.length;
        });
        return { rows: rows, doneRows: doneRows, undoneRows: undoneRows, columnInfo: StatisticsService.cleanColumnInfo(columnInfo) };
    };
    StatisticsService.cleanColumnInfo = function (columnInfo) {
        var cleanColumnInfo = {
            dateInfo: [],
            shortTextInfo: [],
            enumInfo: [],
            numberInfo: [],
            descriptionInfo: []
        };
        cleanColumnInfo.dateInfo = StatisticsService.cleanArray(columnInfo.dateInfo);
        cleanColumnInfo.shortTextInfo = StatisticsService.cleanArray(columnInfo.shortTextInfo);
        cleanColumnInfo.enumInfo = StatisticsService.cleanArray(columnInfo.enumInfo);
        cleanColumnInfo.numberInfo = StatisticsService.cleanArray(columnInfo.numberInfo);
        cleanColumnInfo.descriptionInfo = StatisticsService.cleanArray(columnInfo.descriptionInfo);
        return cleanColumnInfo;
    };
    StatisticsService.cleanArray = function (actual) {
        var newArray = [];
        for (var i = 0; i < actual.length; i++) {
            if (typeof actual[i] !== 'undefined') {
                newArray.push(actual[i]);
            }
        }
        return newArray;
    };
    StatisticsService.prototype.containsUndoneTasks = function (row) {
        var rowStatus = true;
        row.taskDtos.forEach(function (task) {
            if (task.status.toString() !== 'DONE') {
                rowStatus = false;
            }
        });
        return rowStatus;
    };
    StatisticsService.prototype.mapToTaskInfo = function (rows) {
        var tasks = [];
        var unassignedTasks = [];
        var assignedTasks = [];
        var inProgressTasks = [];
        var doneTasks = [];
        rows.forEach(function (row) {
            row.taskDtos.forEach(function (task) {
                switch (task.status.toString()) {
                    case ('UNASSIGNED'):
                        tasks.push(task);
                        unassignedTasks.push(task);
                        return;
                    case ('ASSIGNED'):
                        tasks.push(task);
                        assignedTasks.push(task);
                        return;
                    case ('IN_PROGRESS'):
                        tasks.push(task);
                        inProgressTasks.push(task);
                        return;
                    case ('DONE'):
                        tasks.push(task);
                        doneTasks.push(task);
                        return;
                    default:
                        throw new Error('Unknown task status: ' + task.status.toString());
                }
            });
        });
        return {
            tasks: tasks,
            unassignedTasks: unassignedTasks,
            assignedTasks: assignedTasks,
            inProgressTasks: inProgressTasks,
            doneTasks: doneTasks
        };
    };
    return StatisticsService;
}());



/***/ }),

/***/ "./src/app/shared/store-reset.service.ts":
/*!***********************************************!*\
  !*** ./src/app/shared/store-reset.service.ts ***!
  \***********************************************/
/*! exports provided: StoreResetService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StoreResetService", function() { return StoreResetService; });
/* harmony import */ var _ngrx_store__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ngrx/store */ "./node_modules/@ngrx/store/@ngrx/store.es5.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _store_table_tables_actions__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./store/table/tables.actions */ "./src/app/shared/store/table/tables.actions.ts");
/* harmony import */ var _store_user_users_actions__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./store/user/users.actions */ "./src/app/shared/store/user/users.actions.ts");
/* harmony import */ var _store_chat_chat_actions__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./store/chat/chat.actions */ "./src/app/shared/store/chat/chat.actions.ts");
/* harmony import */ var _store_task_tasks_actions__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./store/task/tasks.actions */ "./src/app/shared/store/task/tasks.actions.ts");
/* harmony import */ var _auth_cookies_handler__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./auth-cookies-handler */ "./src/app/shared/auth-cookies-handler.ts");
/* harmony import */ var _socket_task_info_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./socket/task-info.service */ "./src/app/shared/socket/task-info.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var StoreResetService = /** @class */ (function () {
    function StoreResetService(store, cookie, ws) {
        this.store = store;
        this.cookie = cookie;
        this.ws = ws;
    }
    StoreResetService.prototype.resetStore = function () {
        this.ws.stompClient.disconnect();
        this.store.dispatch(new _store_table_tables_actions__WEBPACK_IMPORTED_MODULE_2__["ResetStore"]());
        this.store.dispatch(new _store_user_users_actions__WEBPACK_IMPORTED_MODULE_3__["ResetStore"]());
        this.store.dispatch(new _store_chat_chat_actions__WEBPACK_IMPORTED_MODULE_4__["ResetStore"]());
        this.store.dispatch(new _store_task_tasks_actions__WEBPACK_IMPORTED_MODULE_5__["ResetStore"]());
        _auth_cookies_handler__WEBPACK_IMPORTED_MODULE_6__["AuthCookie"].deleteAuth();
    };
    StoreResetService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])(),
        __metadata("design:paramtypes", [_ngrx_store__WEBPACK_IMPORTED_MODULE_0__["Store"],
            _auth_cookies_handler__WEBPACK_IMPORTED_MODULE_6__["AuthCookie"],
            _socket_task_info_service__WEBPACK_IMPORTED_MODULE_7__["TaskInfoService"]])
    ], StoreResetService);
    return StoreResetService;
}());



/***/ }),

/***/ "./src/app/shared/store/chat/chat.actions.ts":
/*!***************************************************!*\
  !*** ./src/app/shared/store/chat/chat.actions.ts ***!
  \***************************************************/
/*! exports provided: APPEND_CHAT_WITH_MESSAGE, SET_ACTIVE_USERS, RESET_STORE, AppendChatWithMessage, SetActiveWsUsers, ResetStore */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "APPEND_CHAT_WITH_MESSAGE", function() { return APPEND_CHAT_WITH_MESSAGE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SET_ACTIVE_USERS", function() { return SET_ACTIVE_USERS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RESET_STORE", function() { return RESET_STORE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppendChatWithMessage", function() { return AppendChatWithMessage; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SetActiveWsUsers", function() { return SetActiveWsUsers; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ResetStore", function() { return ResetStore; });
var APPEND_CHAT_WITH_MESSAGE = 'APPEND_CHAT_WITH_MESSAGE';
var SET_ACTIVE_USERS = 'SET_ACTIVE_USERS';
var RESET_STORE = 'RESET_STORE';
var AppendChatWithMessage = /** @class */ (function () {
    function AppendChatWithMessage(payload) {
        this.payload = payload;
        this.type = APPEND_CHAT_WITH_MESSAGE;
    }
    return AppendChatWithMessage;
}());

var SetActiveWsUsers = /** @class */ (function () {
    function SetActiveWsUsers(payload) {
        this.payload = payload;
        this.type = SET_ACTIVE_USERS;
    }
    return SetActiveWsUsers;
}());

var ResetStore = /** @class */ (function () {
    function ResetStore() {
        this.type = RESET_STORE;
    }
    return ResetStore;
}());



/***/ }),

/***/ "./src/app/shared/store/chat/chat.reducers.ts":
/*!****************************************************!*\
  !*** ./src/app/shared/store/chat/chat.reducers.ts ***!
  \****************************************************/
/*! exports provided: chatReducers */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "chatReducers", function() { return chatReducers; });
/* harmony import */ var _chat_actions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./chat.actions */ "./src/app/shared/store/chat/chat.actions.ts");
var __assign = (undefined && undefined.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};

var initialChatState = {
    chatContent: [],
    activeUsers: []
};
function chatReducers(state, action) {
    if (state === void 0) { state = initialChatState; }
    switch (action.type) {
        case _chat_actions__WEBPACK_IMPORTED_MODULE_0__["APPEND_CHAT_WITH_MESSAGE"]:
            return __assign({}, state, { chatContent: state.chatContent.concat([action.payload]) });
        case _chat_actions__WEBPACK_IMPORTED_MODULE_0__["SET_ACTIVE_USERS"]:
            return __assign({}, state, { activeUsers: action.payload.slice() });
        case _chat_actions__WEBPACK_IMPORTED_MODULE_0__["RESET_STORE"]:
            return __assign({}, initialChatState);
        default:
            return state;
    }
}


/***/ }),

/***/ "./src/app/shared/store/statistics/statistics.actions.ts":
/*!***************************************************************!*\
  !*** ./src/app/shared/store/statistics/statistics.actions.ts ***!
  \***************************************************************/
/*! exports provided: SET_SELECTED_TABLE_NAME, SetSelectedTableName */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SET_SELECTED_TABLE_NAME", function() { return SET_SELECTED_TABLE_NAME; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SetSelectedTableName", function() { return SetSelectedTableName; });
var SET_SELECTED_TABLE_NAME = 'SET_SELECTED_TABLE_NAME';
var SetSelectedTableName = /** @class */ (function () {
    function SetSelectedTableName(payload) {
        this.payload = payload;
        this.type = SET_SELECTED_TABLE_NAME;
    }
    return SetSelectedTableName;
}());



/***/ }),

/***/ "./src/app/shared/store/statistics/statistics.reducers.ts":
/*!****************************************************************!*\
  !*** ./src/app/shared/store/statistics/statistics.reducers.ts ***!
  \****************************************************************/
/*! exports provided: statisticsReducers */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "statisticsReducers", function() { return statisticsReducers; });
/* harmony import */ var _statistics_actions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./statistics.actions */ "./src/app/shared/store/statistics/statistics.actions.ts");
var __assign = (undefined && undefined.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};

var initialStatisticState = {
    selectedTableName: null
};
function statisticsReducers(state, action) {
    if (state === void 0) { state = initialStatisticState; }
    switch (action.type) {
        case _statistics_actions__WEBPACK_IMPORTED_MODULE_0__["SET_SELECTED_TABLE_NAME"]:
            return __assign({}, state, { selectedTableName: action.payload });
        default:
            return state;
    }
}


/***/ }),

/***/ "./src/app/shared/store/table/tables.actions.ts":
/*!******************************************************!*\
  !*** ./src/app/shared/store/table/tables.actions.ts ***!
  \******************************************************/
/*! exports provided: RESET_STORE, ADD_ROW, ADD_TASK, SHOW_ROW, UPDATE_ROW, EDIT_ROW_MODE, EDITED_ROW, DELETE_ROW, SET_ROWS, SET_DEFINITION, SET_NAMES, ADD_NAMES, NEW_ROW_MODE, SET_FILTER, EXTENDED_FILTER_MODE, SET_EXTENDED_TABLE_VIEW, SET_EXTENDED_ROW_VIEW, RUN_EXTENDED_FILTER, SET_EXTENDED_FILTER, SET_EXTENDED_FILTER_SELECT, SET_SORT_CONTENT, SWITCH_TABLE_RESET, SET_ROW_TASKS, SET_TABLE_USERS, UPDATE_ROWS_TASK, UPDATE_TASK, DELETE_ROWS_TASK, SetNewRowModeAction, SetSortContent, AddRowAction, ShowRowDetailsAction, UpdateRowAction, SetRowsAction, SetTableDefinitionAction, SetNamesAction, AddNamesAction, SetEditRowMode, SetEditedRow, ResetStore, TableFilter, SetExtendedFilterMode, RunExtendedFilter, SetExtendedFilterSelect, SetExtendedFilter, SwitchTableReset, SetRowsTasksAction, SetTableUsers, UpdateRowsTaskAction, UpdateTaskAction, DeleteTask, SetExtendedTableView, SetExtendedRowView, DeleteRow, AddTaskAction */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RESET_STORE", function() { return RESET_STORE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ADD_ROW", function() { return ADD_ROW; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ADD_TASK", function() { return ADD_TASK; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SHOW_ROW", function() { return SHOW_ROW; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UPDATE_ROW", function() { return UPDATE_ROW; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EDIT_ROW_MODE", function() { return EDIT_ROW_MODE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EDITED_ROW", function() { return EDITED_ROW; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DELETE_ROW", function() { return DELETE_ROW; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SET_ROWS", function() { return SET_ROWS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SET_DEFINITION", function() { return SET_DEFINITION; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SET_NAMES", function() { return SET_NAMES; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ADD_NAMES", function() { return ADD_NAMES; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NEW_ROW_MODE", function() { return NEW_ROW_MODE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SET_FILTER", function() { return SET_FILTER; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EXTENDED_FILTER_MODE", function() { return EXTENDED_FILTER_MODE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SET_EXTENDED_TABLE_VIEW", function() { return SET_EXTENDED_TABLE_VIEW; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SET_EXTENDED_ROW_VIEW", function() { return SET_EXTENDED_ROW_VIEW; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RUN_EXTENDED_FILTER", function() { return RUN_EXTENDED_FILTER; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SET_EXTENDED_FILTER", function() { return SET_EXTENDED_FILTER; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SET_EXTENDED_FILTER_SELECT", function() { return SET_EXTENDED_FILTER_SELECT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SET_SORT_CONTENT", function() { return SET_SORT_CONTENT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SWITCH_TABLE_RESET", function() { return SWITCH_TABLE_RESET; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SET_ROW_TASKS", function() { return SET_ROW_TASKS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SET_TABLE_USERS", function() { return SET_TABLE_USERS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UPDATE_ROWS_TASK", function() { return UPDATE_ROWS_TASK; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UPDATE_TASK", function() { return UPDATE_TASK; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DELETE_ROWS_TASK", function() { return DELETE_ROWS_TASK; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SetNewRowModeAction", function() { return SetNewRowModeAction; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SetSortContent", function() { return SetSortContent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AddRowAction", function() { return AddRowAction; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ShowRowDetailsAction", function() { return ShowRowDetailsAction; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UpdateRowAction", function() { return UpdateRowAction; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SetRowsAction", function() { return SetRowsAction; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SetTableDefinitionAction", function() { return SetTableDefinitionAction; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SetNamesAction", function() { return SetNamesAction; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AddNamesAction", function() { return AddNamesAction; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SetEditRowMode", function() { return SetEditRowMode; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SetEditedRow", function() { return SetEditedRow; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ResetStore", function() { return ResetStore; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TableFilter", function() { return TableFilter; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SetExtendedFilterMode", function() { return SetExtendedFilterMode; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RunExtendedFilter", function() { return RunExtendedFilter; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SetExtendedFilterSelect", function() { return SetExtendedFilterSelect; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SetExtendedFilter", function() { return SetExtendedFilter; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SwitchTableReset", function() { return SwitchTableReset; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SetRowsTasksAction", function() { return SetRowsTasksAction; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SetTableUsers", function() { return SetTableUsers; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UpdateRowsTaskAction", function() { return UpdateRowsTaskAction; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UpdateTaskAction", function() { return UpdateTaskAction; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DeleteTask", function() { return DeleteTask; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SetExtendedTableView", function() { return SetExtendedTableView; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SetExtendedRowView", function() { return SetExtendedRowView; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DeleteRow", function() { return DeleteRow; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AddTaskAction", function() { return AddTaskAction; });
var RESET_STORE = 'RESET_STORE';
var ADD_ROW = 'ADD_ROW';
var ADD_TASK = 'ADD_TASK';
var SHOW_ROW = 'SHOW_ROW';
var UPDATE_ROW = 'UPDATE_ROW';
var EDIT_ROW_MODE = 'EDIT_ROW_MODE';
var EDITED_ROW = 'EDITED_ROW';
var DELETE_ROW = 'DELETE_ROW';
var SET_ROWS = 'SET_ROWS';
var SET_DEFINITION = 'SET_DEFINITION';
var SET_NAMES = 'SET_NAMES';
var ADD_NAMES = 'ADD_NAMES';
var NEW_ROW_MODE = 'NEW_ROW_MODE';
var SET_FILTER = 'SET_FILTER';
var EXTENDED_FILTER_MODE = 'EXTENDED_FILTER_MODE';
var SET_EXTENDED_TABLE_VIEW = 'SET_EXTENDED_TABLE_VIEW';
var SET_EXTENDED_ROW_VIEW = 'SET_EXTENDED_ROW_VIEW';
var RUN_EXTENDED_FILTER = 'RUN_EXTENDED_FILTER';
var SET_EXTENDED_FILTER = 'SET_EXTENDED_FILTER';
var SET_EXTENDED_FILTER_SELECT = 'SET_EXTENDED_FILTER_SELECT';
var SET_SORT_CONTENT = 'SET_SORT_CONTENT';
var SWITCH_TABLE_RESET = 'SWITCH_TABLE_RESET';
var SET_ROW_TASKS = 'SET_ROW_TASKS';
var SET_TABLE_USERS = 'SET_TABLE_USERS';
var UPDATE_ROWS_TASK = 'UPDATE_ROWS_TASK';
var UPDATE_TASK = 'UPDATE_TASK';
var DELETE_ROWS_TASK = 'DELETE_ROWS_TASK';
var SetNewRowModeAction = /** @class */ (function () {
    function SetNewRowModeAction(payload) {
        this.payload = payload;
        this.type = NEW_ROW_MODE;
    }
    return SetNewRowModeAction;
}());

var SetSortContent = /** @class */ (function () {
    function SetSortContent(payload) {
        this.payload = payload;
        this.type = SET_SORT_CONTENT;
    }
    return SetSortContent;
}());

var AddRowAction = /** @class */ (function () {
    function AddRowAction(payload) {
        this.payload = payload;
        this.type = ADD_ROW;
    }
    return AddRowAction;
}());

var ShowRowDetailsAction = /** @class */ (function () {
    function ShowRowDetailsAction(payload) {
        this.payload = payload;
        this.type = SHOW_ROW;
    }
    return ShowRowDetailsAction;
}());

var UpdateRowAction = /** @class */ (function () {
    function UpdateRowAction(payload) {
        this.payload = payload;
        this.type = UPDATE_ROW;
    }
    return UpdateRowAction;
}());

var SetRowsAction = /** @class */ (function () {
    function SetRowsAction(payload) {
        this.payload = payload;
        this.type = SET_ROWS;
    }
    return SetRowsAction;
}());

var SetTableDefinitionAction = /** @class */ (function () {
    function SetTableDefinitionAction(payload) {
        this.payload = payload;
        this.type = SET_DEFINITION;
    }
    return SetTableDefinitionAction;
}());

var SetNamesAction = /** @class */ (function () {
    function SetNamesAction(payload) {
        this.payload = payload;
        this.type = SET_NAMES;
    }
    return SetNamesAction;
}());

var AddNamesAction = /** @class */ (function () {
    function AddNamesAction(payload) {
        this.payload = payload;
        this.type = ADD_NAMES;
    }
    return AddNamesAction;
}());

var SetEditRowMode = /** @class */ (function () {
    function SetEditRowMode(payload) {
        this.payload = payload;
        this.type = EDIT_ROW_MODE;
    }
    return SetEditRowMode;
}());

var SetEditedRow = /** @class */ (function () {
    function SetEditedRow(payload) {
        this.payload = payload;
        this.type = EDITED_ROW;
    }
    return SetEditedRow;
}());

var ResetStore = /** @class */ (function () {
    function ResetStore() {
        this.type = RESET_STORE;
    }
    return ResetStore;
}());

var TableFilter = /** @class */ (function () {
    function TableFilter(payload) {
        this.payload = payload;
        this.type = SET_FILTER;
    }
    return TableFilter;
}());

var SetExtendedFilterMode = /** @class */ (function () {
    function SetExtendedFilterMode() {
        this.type = EXTENDED_FILTER_MODE;
    }
    return SetExtendedFilterMode;
}());

var RunExtendedFilter = /** @class */ (function () {
    function RunExtendedFilter() {
        this.type = RUN_EXTENDED_FILTER;
    }
    return RunExtendedFilter;
}());

var SetExtendedFilterSelect = /** @class */ (function () {
    function SetExtendedFilterSelect(payload) {
        this.payload = payload;
        this.type = SET_EXTENDED_FILTER_SELECT;
    }
    return SetExtendedFilterSelect;
}());

var SetExtendedFilter = /** @class */ (function () {
    function SetExtendedFilter(payload) {
        this.payload = payload;
        this.type = SET_EXTENDED_FILTER;
    }
    return SetExtendedFilter;
}());

var SwitchTableReset = /** @class */ (function () {
    function SwitchTableReset() {
        this.type = SWITCH_TABLE_RESET;
    }
    return SwitchTableReset;
}());

var SetRowsTasksAction = /** @class */ (function () {
    function SetRowsTasksAction(payload) {
        this.payload = payload;
        this.type = SET_ROW_TASKS;
    }
    return SetRowsTasksAction;
}());

var SetTableUsers = /** @class */ (function () {
    function SetTableUsers(payload) {
        this.payload = payload;
        this.type = SET_TABLE_USERS;
    }
    return SetTableUsers;
}());

var UpdateRowsTaskAction = /** @class */ (function () {
    function UpdateRowsTaskAction(payload) {
        this.payload = payload;
        this.type = UPDATE_ROWS_TASK;
    }
    return UpdateRowsTaskAction;
}());

var UpdateTaskAction = /** @class */ (function () {
    function UpdateTaskAction(payload) {
        this.payload = payload;
        this.type = UPDATE_TASK;
    }
    return UpdateTaskAction;
}());

var DeleteTask = /** @class */ (function () {
    function DeleteTask(payload) {
        this.payload = payload;
        this.type = DELETE_ROWS_TASK;
    }
    return DeleteTask;
}());

var SetExtendedTableView = /** @class */ (function () {
    function SetExtendedTableView(payload) {
        this.payload = payload;
        this.type = SET_EXTENDED_TABLE_VIEW;
    }
    return SetExtendedTableView;
}());

var SetExtendedRowView = /** @class */ (function () {
    function SetExtendedRowView(payload) {
        this.payload = payload;
        this.type = SET_EXTENDED_ROW_VIEW;
    }
    return SetExtendedRowView;
}());

var DeleteRow = /** @class */ (function () {
    function DeleteRow(payload) {
        this.payload = payload;
        this.type = DELETE_ROW;
    }
    return DeleteRow;
}());

var AddTaskAction = /** @class */ (function () {
    function AddTaskAction(payload) {
        this.payload = payload;
        this.type = ADD_TASK;
    }
    return AddTaskAction;
}());



/***/ }),

/***/ "./src/app/shared/store/table/tables.reducers.ts":
/*!*******************************************************!*\
  !*** ./src/app/shared/store/table/tables.reducers.ts ***!
  \*******************************************************/
/*! exports provided: tablesReducers */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "tablesReducers", function() { return tablesReducers; });
/* harmony import */ var _tables_actions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./tables.actions */ "./src/app/shared/store/table/tables.actions.ts");
var __assign = (undefined && undefined.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};

var initialTableState = {
    editRowMode: false,
    newRowMode: false,
    editedRow: null,
    tableDefinition: null,
    tableContent: [],
    tableUsers: [],
    tablesNames: [],
    tableFilter: '',
    extendedFilterMode: false,
    extendedFilterAction: false,
    extendedFilterContent: null,
    filterSelect: false,
    extendedTableView: false,
    extendedRowView: false,
    sortContent: {
        name: '',
        index: 0,
        dataType: '',
        asc: true
    }
};
function tablesReducers(state, action) {
    if (state === void 0) { state = initialTableState; }
    switch (action.type) {
        case _tables_actions__WEBPACK_IMPORTED_MODULE_0__["ADD_ROW"]:
            return __assign({}, state, { tableContent: state.tableContent.concat([action.payload]) });
        case _tables_actions__WEBPACK_IMPORTED_MODULE_0__["UPDATE_ROW"]:
            return __assign({}, state, { tableContent: updateRow(state.tableContent, action.payload).slice() });
        case _tables_actions__WEBPACK_IMPORTED_MODULE_0__["SET_ROWS"]:
            return __assign({}, state, { tableContent: action.payload.slice() });
        case _tables_actions__WEBPACK_IMPORTED_MODULE_0__["SET_NAMES"]:
            return __assign({}, state, { tablesNames: action.payload.slice() });
        case _tables_actions__WEBPACK_IMPORTED_MODULE_0__["ADD_NAMES"]:
            return __assign({}, state, { tablesNames: state.tablesNames.concat(action.payload) });
        case _tables_actions__WEBPACK_IMPORTED_MODULE_0__["SET_DEFINITION"]:
            return __assign({}, state, { tableDefinition: [action.payload] });
        case _tables_actions__WEBPACK_IMPORTED_MODULE_0__["EDIT_ROW_MODE"]:
            return __assign({}, state, { editRowMode: action.payload });
        case _tables_actions__WEBPACK_IMPORTED_MODULE_0__["NEW_ROW_MODE"]:
            return __assign({}, state, { newRowMode: action.payload });
        case _tables_actions__WEBPACK_IMPORTED_MODULE_0__["EDITED_ROW"]:
            return __assign({}, state, { editedRow: action.payload });
        case _tables_actions__WEBPACK_IMPORTED_MODULE_0__["RESET_STORE"]:
            return __assign({}, initialTableState);
        case _tables_actions__WEBPACK_IMPORTED_MODULE_0__["SET_FILTER"]:
            return __assign({}, state, { tableFilter: action.payload });
        case _tables_actions__WEBPACK_IMPORTED_MODULE_0__["EXTENDED_FILTER_MODE"]:
            return __assign({}, state, { extendedFilterMode: !state.extendedFilterMode });
        case _tables_actions__WEBPACK_IMPORTED_MODULE_0__["RUN_EXTENDED_FILTER"]:
            return __assign({}, state, { extendedFilterAction: !state.extendedFilterAction });
        case _tables_actions__WEBPACK_IMPORTED_MODULE_0__["SET_EXTENDED_FILTER"]:
            return __assign({}, state, { extendedFilterContent: action.payload });
        case _tables_actions__WEBPACK_IMPORTED_MODULE_0__["SET_EXTENDED_FILTER_SELECT"]:
            return __assign({}, state, { filterSelect: action.payload });
        case _tables_actions__WEBPACK_IMPORTED_MODULE_0__["SWITCH_TABLE_RESET"]:
            return __assign({}, initialTableState, { tablesNames: state.tablesNames });
        case _tables_actions__WEBPACK_IMPORTED_MODULE_0__["SET_ROW_TASKS"]:
            return __assign({}, state, { tableContent: setRowTasks(state.tableContent, action.payload).slice() });
        case _tables_actions__WEBPACK_IMPORTED_MODULE_0__["SET_TABLE_USERS"]:
            return __assign({}, state, { tableUsers: action.payload.slice() });
        case _tables_actions__WEBPACK_IMPORTED_MODULE_0__["UPDATE_ROWS_TASK"]:
            return __assign({}, state, { tableContent: updateTaskUsers(state.tableContent, action.payload).slice() });
        case _tables_actions__WEBPACK_IMPORTED_MODULE_0__["UPDATE_TASK"]:
            return __assign({}, state, { tableContent: updateTask(state.tableContent, action.payload).slice() });
        case _tables_actions__WEBPACK_IMPORTED_MODULE_0__["DELETE_ROWS_TASK"]:
            return __assign({}, state, { tableContent: deleteRowsTask(state.tableContent, action.payload).slice() });
        case _tables_actions__WEBPACK_IMPORTED_MODULE_0__["SET_EXTENDED_TABLE_VIEW"]:
            return __assign({}, state, { extendedTableView: action.payload });
        case _tables_actions__WEBPACK_IMPORTED_MODULE_0__["SET_EXTENDED_ROW_VIEW"]:
            return __assign({}, state, { extendedRowView: action.payload });
        case _tables_actions__WEBPACK_IMPORTED_MODULE_0__["SET_SORT_CONTENT"]:
            return __assign({}, state, { sortContent: action.payload });
        case _tables_actions__WEBPACK_IMPORTED_MODULE_0__["DELETE_ROW"]:
            return __assign({}, state, { tableContent: deleteRow(state.tableContent, action.payload).slice(), editRowMode: initialTableState.editRowMode, editedRow: initialTableState.editedRow });
        case _tables_actions__WEBPACK_IMPORTED_MODULE_0__["ADD_TASK"]:
            return __assign({}, state, { tableContent: addRowTask(state.tableContent, action.payload).slice() });
        default:
            return state;
    }
}
function updateTask(tableContent, payload) {
    tableContent.forEach(function (row, i) {
        row.taskDtos.forEach(function (taskDto, j) {
            if (taskDto.id === payload.id) {
                tableContent[i].taskDtos[j] = payload;
            }
        });
    });
    return tableContent;
}
function deleteRow(tableContent, rowId) {
    tableContent.forEach(function (row, i) {
        if (row.id === rowId) {
            tableContent.splice(i, 1);
        }
    });
    return tableContent;
}
function deleteRowsTask(tableContent, payload) {
    tableContent.forEach(function (row, i) {
        if (row.id === payload.rowId) {
            row.taskDtos.forEach(function (taskDto, j) {
                if (taskDto.id === payload.taskId) {
                    tableContent[i].taskDtos.splice(j, 1);
                }
            });
        }
    });
    return tableContent;
}
function updateTaskUsers(tableContent, payload) {
    tableContent.forEach(function (row, i) {
        if (row.id === payload.rowId) {
            row.taskDtos.forEach(function (taskDto, j) {
                if (taskDto.id === payload.task.id) {
                    tableContent[i].taskDtos[j].userNames = payload.task.userNames;
                }
            });
        }
    });
    return tableContent;
}
function setRowTasks(rows, data) {
    rows.forEach(function (row) {
        if (row.id === data.rowId) {
            row.taskDtos = data.tasks;
        }
    });
    return rows;
}
function addRowTask(rows, data) {
    rows.forEach(function (row) {
        if (row.id === data.rowId) {
            row.taskDtos = row.taskDtos.concat([data.task]);
        }
    });
    return rows;
}
// function deleteItemByName(array: NameModel[], itemName: string): Array<NameModel> {// TODO GENERIC TYPE FUNCTION???  r.216/255 REMOVE?
//   array.forEach((arrayItem, i) => {
//     if (arrayItem.name === itemName) {
//       array.splice(i, 1);
//     }
//   });
//   return array;
// }
//
// function deleteItemByUsername(array: UsernameModel[], itemName: string) { // TODO REMOVE?
//   array.forEach((arrayItem, i) => {
//     if (arrayItem.username === itemName) {
//       array.splice(i, 1);
//     }
//   });
//   return array;
// }
function updateRow(rows, updatedRow) {
    rows.forEach(function (row, i) {
        if (row.id === updatedRow.id) {
            rows[i] = updatedRow;
        }
    });
    return rows;
}
// function updateRoleUsers(roles: RoleModel[], newRole: RoleModel): RoleModel[] { // TODO remove?
//   roles.forEach((role) => {
//     if (role.name === newRole.name) {
//       role.userDtos = newRole.userDtos;
//     }
//   });
//   return roles;
// }
//
// function updateUsersRoles(users: UserModel[], newUser: UserModel): UserModel[] {// TODO remove?
//   users.forEach((user, i) => {
//     if (user.username === newUser.username) {
//       users[i].roleNames = newUser.roleNames;
//     }
//   });
//   return users;
// }
//
// interface NameModel { // TODO remove?
//   name: string;
// }
//
// interface UsernameModel { // TODO remove?
//   username: string;
// }


/***/ }),

/***/ "./src/app/shared/store/task/tasks.actions.ts":
/*!****************************************************!*\
  !*** ./src/app/shared/store/task/tasks.actions.ts ***!
  \****************************************************/
/*! exports provided: SET_TASK_DETAILS_MODE, SET_SHOWED_TASK, ON_DELETE_TASK, RESET_STORE, SetTaskDetailsModeAction, SetShowedTaskAction, OnDeleteTask, ResetStore */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SET_TASK_DETAILS_MODE", function() { return SET_TASK_DETAILS_MODE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SET_SHOWED_TASK", function() { return SET_SHOWED_TASK; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ON_DELETE_TASK", function() { return ON_DELETE_TASK; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RESET_STORE", function() { return RESET_STORE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SetTaskDetailsModeAction", function() { return SetTaskDetailsModeAction; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SetShowedTaskAction", function() { return SetShowedTaskAction; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OnDeleteTask", function() { return OnDeleteTask; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ResetStore", function() { return ResetStore; });
var SET_TASK_DETAILS_MODE = 'SET_TASK_DETAILS_MODE';
var SET_SHOWED_TASK = 'SET_SHOWED_TASK';
var ON_DELETE_TASK = 'ON_DELETE_TASK';
var RESET_STORE = 'RESET_STORE';
var SetTaskDetailsModeAction = /** @class */ (function () {
    function SetTaskDetailsModeAction(payload) {
        this.payload = payload;
        this.type = SET_TASK_DETAILS_MODE;
    }
    return SetTaskDetailsModeAction;
}());

var SetShowedTaskAction = /** @class */ (function () {
    function SetShowedTaskAction(payload) {
        this.payload = payload;
        this.type = SET_SHOWED_TASK;
    }
    return SetShowedTaskAction;
}());

var OnDeleteTask = /** @class */ (function () {
    function OnDeleteTask(payload) {
        this.payload = payload;
        this.type = ON_DELETE_TASK;
    }
    return OnDeleteTask;
}());

var ResetStore = /** @class */ (function () {
    function ResetStore() {
        this.type = RESET_STORE;
    }
    return ResetStore;
}());



/***/ }),

/***/ "./src/app/shared/store/task/tasks.reducers.ts":
/*!*****************************************************!*\
  !*** ./src/app/shared/store/task/tasks.reducers.ts ***!
  \*****************************************************/
/*! exports provided: tasksReducers */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "tasksReducers", function() { return tasksReducers; });
/* harmony import */ var _tasks_actions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./tasks.actions */ "./src/app/shared/store/task/tasks.actions.ts");
var __assign = (undefined && undefined.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};

var initialTaskState = {
    taskDetailsMode: false,
    showedTask: null
};
function tasksReducers(state, action) {
    if (state === void 0) { state = initialTaskState; }
    switch (action.type) {
        case _tasks_actions__WEBPACK_IMPORTED_MODULE_0__["SET_TASK_DETAILS_MODE"]:
            return __assign({}, state, { taskDetailsMode: action.payload });
        case _tasks_actions__WEBPACK_IMPORTED_MODULE_0__["SET_SHOWED_TASK"]:
            return __assign({}, state, { showedTask: action.payload });
        case _tasks_actions__WEBPACK_IMPORTED_MODULE_0__["ON_DELETE_TASK"]:
            state.taskDetailsMode = false;
            state.showedTask = null;
            return {
                state: state
            };
        case _tasks_actions__WEBPACK_IMPORTED_MODULE_0__["RESET_STORE"]:
            return __assign({}, initialTaskState);
        default:
            return state;
    }
}


/***/ }),

/***/ "./src/app/shared/store/user/users.actions.ts":
/*!****************************************************!*\
  !*** ./src/app/shared/store/user/users.actions.ts ***!
  \****************************************************/
/*! exports provided: SET_NEW_USER_MODE, SET_USERS, ADD_USER, DELETE_USER, ADD_ROLE_TO_USER, REMOVE_ROLE_FROM_USER, SET_CURRENT_USER_ROLENAMES, SET_NEW_ROLE_MODE, SET_ROLES, ADD_ROLE, DELETE_ROLE, REMOVE_USER_FROM_ROLE, ADD_USER_TO_ROLE, SET_TOKEN, DELETE_TOKEN, DELETE_CURRENT_USER, SET_CURRENT_USER, SET_CURRENT_USER_DETAILS, SWITCH_TABLE_RESET, SET_NEW_WEB_SOCKET_CLIENT, SET_TASK_INFO, RESET_STORE, SET_LOGIN_FAILURE_INFO, SET_LOGOUT_INFO, SET_USER_DISPLAYED_TASK, SET_SELECTED_USER, UPDATE_TASK, DeleteUserAction, SetNewUserModeAction, SetUsersAction, AddUserAction, AddUserToRole, RemoveUserFromRole, SetCurrentUserRolenames, SetTokenAction, DeleteTokenAction, RemoveRoleFromUser, SetCurrentUserAction, DeleteCurrentUserAction, SetNewRoleModeAction, AddRoleAction, DeleteRoleAction, SetRolesAction, AddRoleToUser, SwitchTableReset, SetNewWebSocketClient, SetTaskInfoAction, SetLoginFailureInfo, SetLogoutInfo, ResetStore, SetUserDisplayedTask, SetSelectedUser, UpdateTaskAction, SetCurrntUserDetails */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SET_NEW_USER_MODE", function() { return SET_NEW_USER_MODE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SET_USERS", function() { return SET_USERS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ADD_USER", function() { return ADD_USER; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DELETE_USER", function() { return DELETE_USER; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ADD_ROLE_TO_USER", function() { return ADD_ROLE_TO_USER; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "REMOVE_ROLE_FROM_USER", function() { return REMOVE_ROLE_FROM_USER; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SET_CURRENT_USER_ROLENAMES", function() { return SET_CURRENT_USER_ROLENAMES; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SET_NEW_ROLE_MODE", function() { return SET_NEW_ROLE_MODE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SET_ROLES", function() { return SET_ROLES; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ADD_ROLE", function() { return ADD_ROLE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DELETE_ROLE", function() { return DELETE_ROLE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "REMOVE_USER_FROM_ROLE", function() { return REMOVE_USER_FROM_ROLE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ADD_USER_TO_ROLE", function() { return ADD_USER_TO_ROLE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SET_TOKEN", function() { return SET_TOKEN; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DELETE_TOKEN", function() { return DELETE_TOKEN; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DELETE_CURRENT_USER", function() { return DELETE_CURRENT_USER; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SET_CURRENT_USER", function() { return SET_CURRENT_USER; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SET_CURRENT_USER_DETAILS", function() { return SET_CURRENT_USER_DETAILS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SWITCH_TABLE_RESET", function() { return SWITCH_TABLE_RESET; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SET_NEW_WEB_SOCKET_CLIENT", function() { return SET_NEW_WEB_SOCKET_CLIENT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SET_TASK_INFO", function() { return SET_TASK_INFO; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RESET_STORE", function() { return RESET_STORE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SET_LOGIN_FAILURE_INFO", function() { return SET_LOGIN_FAILURE_INFO; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SET_LOGOUT_INFO", function() { return SET_LOGOUT_INFO; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SET_USER_DISPLAYED_TASK", function() { return SET_USER_DISPLAYED_TASK; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SET_SELECTED_USER", function() { return SET_SELECTED_USER; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UPDATE_TASK", function() { return UPDATE_TASK; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DeleteUserAction", function() { return DeleteUserAction; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SetNewUserModeAction", function() { return SetNewUserModeAction; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SetUsersAction", function() { return SetUsersAction; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AddUserAction", function() { return AddUserAction; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AddUserToRole", function() { return AddUserToRole; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RemoveUserFromRole", function() { return RemoveUserFromRole; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SetCurrentUserRolenames", function() { return SetCurrentUserRolenames; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SetTokenAction", function() { return SetTokenAction; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DeleteTokenAction", function() { return DeleteTokenAction; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RemoveRoleFromUser", function() { return RemoveRoleFromUser; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SetCurrentUserAction", function() { return SetCurrentUserAction; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DeleteCurrentUserAction", function() { return DeleteCurrentUserAction; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SetNewRoleModeAction", function() { return SetNewRoleModeAction; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AddRoleAction", function() { return AddRoleAction; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DeleteRoleAction", function() { return DeleteRoleAction; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SetRolesAction", function() { return SetRolesAction; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AddRoleToUser", function() { return AddRoleToUser; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SwitchTableReset", function() { return SwitchTableReset; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SetNewWebSocketClient", function() { return SetNewWebSocketClient; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SetTaskInfoAction", function() { return SetTaskInfoAction; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SetLoginFailureInfo", function() { return SetLoginFailureInfo; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SetLogoutInfo", function() { return SetLogoutInfo; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ResetStore", function() { return ResetStore; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SetUserDisplayedTask", function() { return SetUserDisplayedTask; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SetSelectedUser", function() { return SetSelectedUser; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UpdateTaskAction", function() { return UpdateTaskAction; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SetCurrntUserDetails", function() { return SetCurrntUserDetails; });
var SET_NEW_USER_MODE = 'SET_NEW_USER_MODE';
var SET_USERS = 'SET_USERS';
var ADD_USER = 'ADD_USER';
var DELETE_USER = 'DELETE_USER';
var ADD_ROLE_TO_USER = 'ADD_ROLE_TO_USER';
var REMOVE_ROLE_FROM_USER = 'REMOVE_ROLE_FROM_USER';
var SET_CURRENT_USER_ROLENAMES = 'SET_CURRENT_USER_ROLENAMES';
var SET_NEW_ROLE_MODE = 'SET_NEW_ROLE_MODE';
var SET_ROLES = 'SET_ROLES';
var ADD_ROLE = 'ADD_ROLE';
var DELETE_ROLE = 'DELETE_ROLE';
var REMOVE_USER_FROM_ROLE = 'REMOVE_USER_FROM_ROLE';
var ADD_USER_TO_ROLE = 'ADD_USER_TO_ROLE';
var SET_TOKEN = 'SET_TOKEN';
var DELETE_TOKEN = 'DELETE_TOKEN';
var DELETE_CURRENT_USER = 'DELETE_CURRENT_USER';
var SET_CURRENT_USER = 'SET_CURRENT_USER';
var SET_CURRENT_USER_DETAILS = 'SET_CURRENT_USER_DETAILS';
var SWITCH_TABLE_RESET = 'SWITCH_TABLE_RESET';
var SET_NEW_WEB_SOCKET_CLIENT = 'SET_NEW_WEB_SOCKET_CLIENT';
var SET_TASK_INFO = 'SET_TASK_INFO';
var RESET_STORE = 'RESET_STORE';
var SET_LOGIN_FAILURE_INFO = 'SET_LOGIN_FAILURE_INFO';
var SET_LOGOUT_INFO = 'SET_LOGOUT_INFO';
var SET_USER_DISPLAYED_TASK = 'SET_USER_DISPLAYED_TASK';
var SET_SELECTED_USER = 'SET_SELECTED_USER';
var UPDATE_TASK = 'UPDATE_TASK';
var DeleteUserAction = /** @class */ (function () {
    function DeleteUserAction(payload) {
        this.payload = payload;
        this.type = DELETE_USER;
    }
    return DeleteUserAction;
}());

var SetNewUserModeAction = /** @class */ (function () {
    function SetNewUserModeAction(payload) {
        this.payload = payload;
        this.type = SET_NEW_USER_MODE;
    }
    return SetNewUserModeAction;
}());

var SetUsersAction = /** @class */ (function () {
    function SetUsersAction(payload) {
        this.payload = payload;
        this.type = SET_USERS;
    }
    return SetUsersAction;
}());

var AddUserAction = /** @class */ (function () {
    function AddUserAction(payload) {
        this.payload = payload;
        this.type = ADD_USER;
    }
    return AddUserAction;
}());

var AddUserToRole = /** @class */ (function () {
    function AddUserToRole(payload) {
        this.payload = payload;
        this.type = ADD_USER_TO_ROLE;
    }
    return AddUserToRole;
}());

var RemoveUserFromRole = /** @class */ (function () {
    function RemoveUserFromRole(payload) {
        this.payload = payload;
        this.type = REMOVE_USER_FROM_ROLE;
    }
    return RemoveUserFromRole;
}());

var SetCurrentUserRolenames = /** @class */ (function () {
    function SetCurrentUserRolenames(payload) {
        this.payload = payload;
        this.type = SET_CURRENT_USER_ROLENAMES;
    }
    return SetCurrentUserRolenames;
}());

var SetTokenAction = /** @class */ (function () {
    function SetTokenAction(payload) {
        this.payload = payload;
        this.type = SET_TOKEN;
    }
    return SetTokenAction;
}());

var DeleteTokenAction = /** @class */ (function () {
    function DeleteTokenAction() {
        this.type = DELETE_TOKEN;
    }
    return DeleteTokenAction;
}());

var RemoveRoleFromUser = /** @class */ (function () {
    function RemoveRoleFromUser(payload) {
        this.payload = payload;
        this.type = REMOVE_ROLE_FROM_USER;
    }
    return RemoveRoleFromUser;
}());

var SetCurrentUserAction = /** @class */ (function () {
    function SetCurrentUserAction(payload) {
        this.payload = payload;
        this.type = SET_CURRENT_USER;
    }
    return SetCurrentUserAction;
}());

var DeleteCurrentUserAction = /** @class */ (function () {
    function DeleteCurrentUserAction() {
        this.type = DELETE_CURRENT_USER;
    }
    return DeleteCurrentUserAction;
}());

var SetNewRoleModeAction = /** @class */ (function () {
    function SetNewRoleModeAction(payload) {
        this.payload = payload;
        this.type = SET_NEW_ROLE_MODE;
    }
    return SetNewRoleModeAction;
}());

var AddRoleAction = /** @class */ (function () {
    function AddRoleAction(payload) {
        this.payload = payload;
        this.type = ADD_ROLE;
    }
    return AddRoleAction;
}());

var DeleteRoleAction = /** @class */ (function () {
    function DeleteRoleAction(payload) {
        this.payload = payload;
        this.type = DELETE_ROLE;
    }
    return DeleteRoleAction;
}());

var SetRolesAction = /** @class */ (function () {
    function SetRolesAction(payload) {
        this.payload = payload;
        this.type = SET_ROLES;
    }
    return SetRolesAction;
}());

var AddRoleToUser = /** @class */ (function () {
    function AddRoleToUser(payload) {
        this.payload = payload;
        this.type = ADD_ROLE_TO_USER;
    }
    return AddRoleToUser;
}());

var SwitchTableReset = /** @class */ (function () {
    function SwitchTableReset() {
        this.type = SWITCH_TABLE_RESET;
    }
    return SwitchTableReset;
}());

var SetNewWebSocketClient = /** @class */ (function () {
    function SetNewWebSocketClient(payload) {
        this.payload = payload;
        this.type = SET_NEW_WEB_SOCKET_CLIENT;
    }
    return SetNewWebSocketClient;
}());

var SetTaskInfoAction = /** @class */ (function () {
    function SetTaskInfoAction(payload) {
        this.payload = payload;
        this.type = SET_TASK_INFO;
    }
    return SetTaskInfoAction;
}());

var SetLoginFailureInfo = /** @class */ (function () {
    function SetLoginFailureInfo(payload) {
        this.payload = payload;
        this.type = SET_LOGIN_FAILURE_INFO;
    }
    return SetLoginFailureInfo;
}());

var SetLogoutInfo = /** @class */ (function () {
    function SetLogoutInfo(payload) {
        this.payload = payload;
        this.type = SET_LOGOUT_INFO;
    }
    return SetLogoutInfo;
}());

var ResetStore = /** @class */ (function () {
    function ResetStore() {
        this.type = RESET_STORE;
    }
    return ResetStore;
}());

var SetUserDisplayedTask = /** @class */ (function () {
    function SetUserDisplayedTask(payload) {
        this.payload = payload;
        this.type = SET_USER_DISPLAYED_TASK;
    }
    return SetUserDisplayedTask;
}());

var SetSelectedUser = /** @class */ (function () {
    function SetSelectedUser(payload) {
        this.payload = payload;
        this.type = SET_SELECTED_USER;
    }
    return SetSelectedUser;
}());

var UpdateTaskAction = /** @class */ (function () {
    function UpdateTaskAction(payload) {
        this.payload = payload;
        this.type = UPDATE_TASK;
    }
    return UpdateTaskAction;
}());

var SetCurrntUserDetails = /** @class */ (function () {
    function SetCurrntUserDetails(payload) {
        this.payload = payload;
        this.type = SET_CURRENT_USER_DETAILS;
    }
    return SetCurrntUserDetails;
}());



/***/ }),

/***/ "./src/app/shared/store/user/users.reducers.ts":
/*!*****************************************************!*\
  !*** ./src/app/shared/store/user/users.reducers.ts ***!
  \*****************************************************/
/*! exports provided: usersReducers */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "usersReducers", function() { return usersReducers; });
/* harmony import */ var _users_actions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./users.actions */ "./src/app/shared/store/user/users.actions.ts");
var __assign = (undefined && undefined.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};

var initialUserState = {
    newTaskInfo: false,
    currentSocketClient: null,
    currentUser: '',
    currentUserDetails: null,
    currentUserRoles: [],
    token: null,
    users: [],
    newUserMode: false,
    roles: [],
    newRoleMode: false,
    loginFailureInfo: '',
    logoutInfo: '',
    selectedUser: null,
    userDisplayedTask: null
};
function usersReducers(state, action) {
    if (state === void 0) { state = initialUserState; }
    switch (action.type) {
        case _users_actions__WEBPACK_IMPORTED_MODULE_0__["SET_NEW_USER_MODE"]:
            return __assign({}, state, { newUserMode: action.payload });
        case _users_actions__WEBPACK_IMPORTED_MODULE_0__["SET_NEW_ROLE_MODE"]:
            return __assign({}, state, { newRoleMode: action.payload });
        case _users_actions__WEBPACK_IMPORTED_MODULE_0__["ADD_ROLE"]:
            return __assign({}, state, { roles: state.roles.concat([action.payload]) });
        case _users_actions__WEBPACK_IMPORTED_MODULE_0__["DELETE_ROLE"]:
            return __assign({}, state, { roles: deleteItemByName(state.roles, action.payload).slice() });
        case _users_actions__WEBPACK_IMPORTED_MODULE_0__["DELETE_USER"]:
            return __assign({}, state, { users: deleteItemByUsername(state.users, action.payload).slice() });
        case _users_actions__WEBPACK_IMPORTED_MODULE_0__["SET_USERS"]:
            return __assign({}, state, { users: action.payload.slice() });
        case _users_actions__WEBPACK_IMPORTED_MODULE_0__["ADD_USER"]:
            return __assign({}, state, { users: state.users.concat([action.payload]) });
        case _users_actions__WEBPACK_IMPORTED_MODULE_0__["SET_ROLES"]:
            return __assign({}, state, { roles: action.payload.slice() });
        case _users_actions__WEBPACK_IMPORTED_MODULE_0__["ADD_ROLE_TO_USER"]:
            return __assign({}, state, { users: updateUsersRoles(state.users, action.payload).slice() });
        case _users_actions__WEBPACK_IMPORTED_MODULE_0__["REMOVE_ROLE_FROM_USER"]:
            return __assign({}, state, { users: updateUsersRoles(state.users, action.payload).slice() });
        case _users_actions__WEBPACK_IMPORTED_MODULE_0__["REMOVE_USER_FROM_ROLE"]:
            return __assign({}, state, { roles: updateRoleUsers(state.roles, action.payload).slice() });
        case _users_actions__WEBPACK_IMPORTED_MODULE_0__["SET_CURRENT_USER_ROLENAMES"]:
            return __assign({}, state, { currentUserRoles: action.payload });
        case _users_actions__WEBPACK_IMPORTED_MODULE_0__["DELETE_TOKEN"]:
            return __assign({}, state, { token: null });
        case _users_actions__WEBPACK_IMPORTED_MODULE_0__["SET_TOKEN"]:
            return __assign({}, state, { token: action.payload });
        case _users_actions__WEBPACK_IMPORTED_MODULE_0__["DELETE_CURRENT_USER"]:
            return __assign({}, state, { currentUser: '' });
        case _users_actions__WEBPACK_IMPORTED_MODULE_0__["SET_CURRENT_USER"]:
            return __assign({}, state, { currentUser: action.payload });
        case _users_actions__WEBPACK_IMPORTED_MODULE_0__["SET_CURRENT_USER_DETAILS"]:
            return __assign({}, state, { currentUserDetails: action.payload });
        case _users_actions__WEBPACK_IMPORTED_MODULE_0__["SWITCH_TABLE_RESET"]:
            return __assign({}, initialUserState, { currentUser: state.currentUser, currentUserRoles: state.currentUserRoles, token: state.token });
        case _users_actions__WEBPACK_IMPORTED_MODULE_0__["SET_NEW_WEB_SOCKET_CLIENT"]:
            return __assign({}, state, { currentSocketClient: action.payload });
        case _users_actions__WEBPACK_IMPORTED_MODULE_0__["SET_TASK_INFO"]:
            return __assign({}, state, { newTaskInfo: action.payload });
        case _users_actions__WEBPACK_IMPORTED_MODULE_0__["SET_LOGIN_FAILURE_INFO"]:
            return __assign({}, state, { loginFailureInfo: action.payload, logoutInfo: initialUserState.logoutInfo });
        case _users_actions__WEBPACK_IMPORTED_MODULE_0__["SET_LOGOUT_INFO"]:
            return __assign({}, state, { loginFailureInfo: initialUserState.loginFailureInfo, logoutInfo: action.payload });
        case _users_actions__WEBPACK_IMPORTED_MODULE_0__["SET_SELECTED_USER"]:
            return __assign({}, state, { selectedUser: action.payload });
        case _users_actions__WEBPACK_IMPORTED_MODULE_0__["UPDATE_TASK"]:
            return __assign({}, state, { users: updateUsersTask(state.users, action.payload).slice(), selectedUser: updateUserTask(state.selectedUser, action.payload), userDisplayedTask: null });
        case _users_actions__WEBPACK_IMPORTED_MODULE_0__["SET_USER_DISPLAYED_TASK"]:
            return __assign({}, state, { userDisplayedTask: action.payload });
        case _users_actions__WEBPACK_IMPORTED_MODULE_0__["RESET_STORE"]:
            return __assign({}, initialUserState);
        default:
            return state;
    }
}
function updateUsersTask(usersToUpdate, task) {
    var users = usersToUpdate;
    users.forEach(function (user, i) {
        users[i] = updateUserTask(user, task);
    });
    return users;
}
function updateUserTask(userToUpdate, task) {
    var user = userToUpdate;
    user.taskDtos.forEach(function (taskToUpdate, i) {
        if (taskToUpdate.id === task.id) {
            user.taskDtos[i] = task;
        }
    });
    return user;
}
function deleteItemByName(array, itemName) {
    array.forEach(function (arrayItem, i) {
        if (arrayItem.name === itemName) {
            array.splice(i, 1);
        }
    });
    return array;
}
function deleteItemByUsername(array, itemName) {
    array.forEach(function (arrayItem, i) {
        if (arrayItem.username === itemName) {
            array.splice(i, 1);
        }
    });
    return array;
}
// function updateRow(rows: RowContentModel[], updatedRow: RowContentModel): RowContentModel[] { TODO remove?
//   rows.forEach((row, i) => {
//     if (row.id === updatedRow.id) {
//       rows[i] = updatedRow;
//     }
//   });
//   return rows;
// }
function updateRoleUsers(roles, newRole) {
    roles.forEach(function (role) {
        if (role.name === newRole.name) {
            role.userDtos = newRole.userDtos;
        }
    });
    return roles;
}
function updateUsersRoles(users, newUser) {
    users.forEach(function (user, i) {
        if (user.username === newUser.username) {
            users[i].roleNames = newUser.roleNames;
        }
    });
    return users;
}


/***/ }),

/***/ "./src/app/shared/table.model.ts":
/*!***************************************!*\
  !*** ./src/app/shared/table.model.ts ***!
  \***************************************/
/*! exports provided: options, RowContentModel, TaskModel, Status, TableDefinitionModel */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "options", function() { return options; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RowContentModel", function() { return RowContentModel; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TaskModel", function() { return TaskModel; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Status", function() { return Status; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TableDefinitionModel", function() { return TableDefinitionModel; });
var options = [
    { shortcut: 'ST', name: 'Short text' },
    { shortcut: 'DE', name: 'Description' },
    { shortcut: 'DT', name: 'Date' },
    { shortcut: 'EN', name: 'Enum' },
    { shortcut: 'IN', name: 'Number' }
];
var RowContentModel = /** @class */ (function () {
    function RowContentModel() {
    }
    return RowContentModel;
}());

var TaskModel = /** @class */ (function () {
    function TaskModel() {
    }
    return TaskModel;
}());

var Status;
(function (Status) {
    Status[Status["UNASSIGNED"] = 0] = "UNASSIGNED";
    Status[Status["ASSIGNED"] = 1] = "ASSIGNED";
    Status[Status["IN_PROGRESS"] = 2] = "IN_PROGRESS";
    Status[Status["DONE"] = 3] = "DONE";
})(Status || (Status = {}));
var TableDefinitionModel = /** @class */ (function () {
    function TableDefinitionModel() {
    }
    return TableDefinitionModel;
}());



/***/ }),

/***/ "./src/app/signin/signin.component.css":
/*!*********************************************!*\
  !*** ./src/app/signin/signin.component.css ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".container {\r\n  margin-top: 30%;\r\n}\r\n\r\n.card {\r\n  background: transparent;\r\n  border: none;\r\n}\r\n\r\n.card-header {\r\n  border: none;\r\n  background-color: transparent;\r\n}\r\n\r\n.form-group {\r\n  margin: 10px auto 0;\r\n}\r\n\r\n.form-control {\r\n  background-color: rgba(200,200,200,0.05);\r\n  border: none;\r\n}\r\n\r\n.alert {\r\n  margin-top: 10px;\r\n}\r\n\r\n.alert-danger {\r\n  background: none;\r\n  border-color: #721c24;\r\n}\r\n\r\n.alert-success {\r\n  background: none;\r\n  border-color: #155724;\r\n}\r\n\r\n.btn-group {\r\n  display: flex;\r\n}\r\n\r\n.btn {\r\n  margin: auto !important;\r\n}\r\n"

/***/ }),

/***/ "./src/app/signin/signin.component.html":
/*!**********************************************!*\
  !*** ./src/app/signin/signin.component.html ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"container\">\r\n  <div class=\"row justify-content-center\">\r\n    <div class=\"col-sm-12 col-md-6\">\r\n      <div class=\"card\">\r\n        <div class=\"card-header text-white text-center\">\r\n\r\n          <h3 class=\"text-info\">MY JIRA</h3>\r\n\r\n        </div>\r\n        <div class=\"card-body\">\r\n          <div class=\"form-group\">\r\n            <form [formGroup]=\"signinForm\">\r\n              <div class=\"form-group\">\r\n                <input type=\"text\" aria-describedby=\"usernameHelpInline\" name=\"username\" placeholder=\"username\" class=\"form-control\" formControlName=\"username\">\r\n                <small id=\"usernameHelpInline\" class=\"text-muted\">\r\n                  Must be 8-20 characters long.\r\n                </small>\r\n              </div>\r\n              <div class=\"form-group\">\r\n                <input type=\"password\" aria-describedby=\"passwordHelpInline\" name=\"password\" placeholder=\"password\" class=\"form-control\"\r\n                       formControlName=\"password\">\r\n                <small id=\"passwordHelpInline\" class=\"text-muted\">\r\n                  Must be 8-20 characters long.\r\n                </small>\r\n              </div>\r\n              <div class=\"btn-group\">\r\n                <button value=\"Sign In\" class=\"btn btn-outline-info\" (click)=\"onSignin()\">Sign In</button>\r\n              </div>\r\n              <div class=\"alert alert-danger\" *ngIf=\"loginFailureInfo | async\">\r\n                <span> {{ loginFailureInfo | async }} </span>\r\n              </div>\r\n              <div class=\"alert alert-success\" *ngIf=\"logoutInfo | async\">\r\n                <span> {{ logoutInfo | async}} </span>\r\n              </div>\r\n            </form>\r\n          </div>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>\r\n"

/***/ }),

/***/ "./src/app/signin/signin.component.ts":
/*!********************************************!*\
  !*** ./src/app/signin/signin.component.ts ***!
  \********************************************/
/*! exports provided: SigninComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SigninComponent", function() { return SigninComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _shared_oauth_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../shared/oauth.service */ "./src/app/shared/oauth.service.ts");
/* harmony import */ var _shared_auth_cookies_handler__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../shared/auth-cookies-handler */ "./src/app/shared/auth-cookies-handler.ts");
/* harmony import */ var _ngrx_store__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ngrx/store */ "./node_modules/@ngrx/store/@ngrx/store.es5.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var SigninComponent = /** @class */ (function () {
    function SigninComponent(oauthservice, cookie, store) {
        this.oauthservice = oauthservice;
        this.cookie = cookie;
        this.store = store;
    }
    SigninComponent.prototype.ngOnInit = function () {
        this.logoutInfo = this.store.select('users', 'logoutInfo');
        this.loginFailureInfo = this.store.select('users', 'loginFailureInfo');
        _shared_auth_cookies_handler__WEBPACK_IMPORTED_MODULE_3__["AuthCookie"].deleteAuth();
        this.signinForm = new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormGroup"]({
            'username': new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"](),
            'password': new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"]()
        });
    };
    SigninComponent.prototype.onSignin = function () {
        this.oauthservice.obtainAccessToken({
            username: this.signinForm.value.username,
            password: this.signinForm.value.password
        });
    };
    SigninComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-signin',
            template: __webpack_require__(/*! ./signin.component.html */ "./src/app/signin/signin.component.html"),
            styles: [__webpack_require__(/*! ./signin.component.css */ "./src/app/signin/signin.component.css")]
        }),
        __metadata("design:paramtypes", [_shared_oauth_service__WEBPACK_IMPORTED_MODULE_2__["OauthService"],
            _shared_auth_cookies_handler__WEBPACK_IMPORTED_MODULE_3__["AuthCookie"],
            _ngrx_store__WEBPACK_IMPORTED_MODULE_4__["Store"]])
    ], SigninComponent);
    return SigninComponent;
}());



/***/ }),

/***/ "./src/app/spinner/spinner.component.css":
/*!***********************************************!*\
  !*** ./src/app/spinner/spinner.component.css ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".sk-folding-cube {\r\n  margin: 20px auto;\r\n  width: 40px;\r\n  height: 40px;\r\n  position: relative;\r\n  -webkit-transform: rotateZ(45deg);\r\n  transform: rotateZ(45deg);\r\n}\r\n\r\n.sk-folding-cube .sk-cube {\r\n  float: left;\r\n  width: 50%;\r\n  height: 50%;\r\n  position: relative;\r\n  -webkit-transform: scale(1.1);\r\n  transform: scale(1.1);\r\n}\r\n\r\n.sk-folding-cube .sk-cube:before {\r\n  content: '';\r\n  position: absolute;\r\n  top: 0;\r\n  left: 0;\r\n  width: 100%;\r\n  height: 100%;\r\n  background-color: rgba(23,162,184,0.4);\r\n  border: 1px solid #107180;\r\n  -webkit-animation: sk-foldCubeAngle 2.4s infinite linear both;\r\n  animation: sk-foldCubeAngle 2.4s infinite linear both;\r\n  -webkit-transform-origin: 100% 100%;\r\n  transform-origin: 100% 100%;\r\n}\r\n\r\n.sk-folding-cube .sk-cube2 {\r\n  -webkit-transform: scale(1.1) rotateZ(90deg);\r\n  transform: scale(1.1) rotateZ(90deg);\r\n}\r\n\r\n.sk-folding-cube .sk-cube3 {\r\n  -webkit-transform: scale(1.1) rotateZ(180deg);\r\n  transform: scale(1.1) rotateZ(180deg);\r\n}\r\n\r\n.sk-folding-cube .sk-cube4 {\r\n  -webkit-transform: scale(1.1) rotateZ(270deg);\r\n  transform: scale(1.1) rotateZ(270deg);\r\n}\r\n\r\n.sk-folding-cube .sk-cube2:before {\r\n  -webkit-animation-delay: 0.3s;\r\n  animation-delay: 0.3s;\r\n}\r\n\r\n.sk-folding-cube .sk-cube3:before {\r\n  -webkit-animation-delay: 0.6s;\r\n  animation-delay: 0.6s;\r\n}\r\n\r\n.sk-folding-cube .sk-cube4:before {\r\n  -webkit-animation-delay: 0.9s;\r\n  animation-delay: 0.9s;\r\n}\r\n\r\n@-webkit-keyframes sk-foldCubeAngle {\r\n  0%, 10% {\r\n    -webkit-transform: perspective(140px) rotateX(-180deg);\r\n    transform: perspective(140px) rotateX(-180deg);\r\n    opacity: 0;\r\n  } 25%, 75% {\r\n      -webkit-transform: perspective(140px) rotateX(0deg);\r\n      transform: perspective(140px) rotateX(0deg);\r\n      opacity: 1;\r\n    } 90%, 100% {\r\n        -webkit-transform: perspective(140px) rotateY(180deg);\r\n        transform: perspective(140px) rotateY(180deg);\r\n        opacity: 0;\r\n      }\r\n}\r\n\r\n@keyframes sk-foldCubeAngle {\r\n  0%, 10% {\r\n    -webkit-transform: perspective(140px) rotateX(-180deg);\r\n    transform: perspective(140px) rotateX(-180deg);\r\n    opacity: 0;\r\n  } 25%, 75% {\r\n      -webkit-transform: perspective(140px) rotateX(0deg);\r\n      transform: perspective(140px) rotateX(0deg);\r\n      opacity: 1;\r\n    } 90%, 100% {\r\n        -webkit-transform: perspective(140px) rotateY(180deg);\r\n        transform: perspective(140px) rotateY(180deg);\r\n        opacity: 0;\r\n      }\r\n}\r\n"

/***/ }),

/***/ "./src/app/spinner/spinner.component.html":
/*!************************************************!*\
  !*** ./src/app/spinner/spinner.component.html ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"sk-folding-cube\">\r\n  <div class=\"sk-cube1 sk-cube\"></div>\r\n  <div class=\"sk-cube2 sk-cube\"></div>\r\n  <div class=\"sk-cube4 sk-cube\"></div>\r\n  <div class=\"sk-cube3 sk-cube\"></div>\r\n</div>\r\n"

/***/ }),

/***/ "./src/app/spinner/spinner.component.ts":
/*!**********************************************!*\
  !*** ./src/app/spinner/spinner.component.ts ***!
  \**********************************************/
/*! exports provided: SpinnerComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SpinnerComponent", function() { return SpinnerComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var SpinnerComponent = /** @class */ (function () {
    function SpinnerComponent() {
    }
    SpinnerComponent.prototype.ngOnInit = function () {
    };
    SpinnerComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-spinner',
            template: __webpack_require__(/*! ./spinner.component.html */ "./src/app/spinner/spinner.component.html"),
            styles: [__webpack_require__(/*! ./spinner.component.css */ "./src/app/spinner/spinner.component.css")]
        }),
        __metadata("design:paramtypes", [])
    ], SpinnerComponent);
    return SpinnerComponent;
}());



/***/ }),

/***/ "./src/app/statistics/statistics.component.css":
/*!*****************************************************!*\
  !*** ./src/app/statistics/statistics.component.css ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "li {\r\n  border: 1px solid #32383e;\r\n  background-color: rgba(200, 200, 200, 0.05);\r\n  color: gray !important;\r\n}\r\n\r\nli:hover {\r\n  background-color: rgba(200, 200, 200, 0.2);\r\n}\r\n\r\n.bg-light {\r\n  background-color: rgba(200, 200, 200, 0.2) !important;\r\n}\r\n\r\n.jumbotron {\r\n  background: none;\r\n}\r\n\r\n.panel-header {\r\n  background-color: rgba(0, 0, 0, 0.05);\r\n}\r\n\r\ntd, th{\r\n  padding: 0.75rem;\r\n  vertical-align: top;\r\n  border-top: none;\r\n}\r\n"

/***/ }),

/***/ "./src/app/statistics/statistics.component.html":
/*!******************************************************!*\
  !*** ./src/app/statistics/statistics.component.html ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"jumbotron\">\r\n    <div class=\"row\">\r\n      <div class=\"col-3\">\r\n        <ul class=\"list-group\">\r\n          <li class=\"list-group-item\" style=\"background-color: rgba(0,0,0,0.05)\">Tables:</li>\r\n          <li class=\"list-group-item\" *ngFor=\"let tableName of (tableState | async).tablesNames\"\r\n              [ngClass]=\"(selectedTableName | async) == tableName ? 'bg-light' : ''\"\r\n              (click)=\"onSelectTableName(tableName)\"\r\n          >\r\n            {{ tableName }}\r\n          </li>\r\n        </ul>\r\n      </div>\r\n      <div class=\"col-9\">\r\n        <app-table-statistics></app-table-statistics>\r\n      </div>\r\n    </div>\r\n</div>\r\n"

/***/ }),

/***/ "./src/app/statistics/statistics.component.ts":
/*!****************************************************!*\
  !*** ./src/app/statistics/statistics.component.ts ***!
  \****************************************************/
/*! exports provided: StatisticsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StatisticsComponent", function() { return StatisticsComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _ngrx_store__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ngrx/store */ "./node_modules/@ngrx/store/@ngrx/store.es5.js");
/* harmony import */ var _shared_data_storage_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../shared/data-storage.service */ "./src/app/shared/data-storage.service.ts");
/* harmony import */ var _shared_store_statistics_statistics_actions__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../shared/store/statistics/statistics.actions */ "./src/app/shared/store/statistics/statistics.actions.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var StatisticsComponent = /** @class */ (function () {
    function StatisticsComponent(store, dss) {
        this.store = store;
        this.dss = dss;
    }
    StatisticsComponent.prototype.ngOnInit = function () {
        this.dss.getTableNames();
        this.tableState = this.store.select('tables');
        this.selectedTableName = this.store.select('statistics', 'selectedTableName');
    };
    StatisticsComponent.prototype.onSelectTableName = function (tableName) {
        this.store.dispatch(new _shared_store_statistics_statistics_actions__WEBPACK_IMPORTED_MODULE_3__["SetSelectedTableName"](tableName));
    };
    StatisticsComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-statistics',
            template: __webpack_require__(/*! ./statistics.component.html */ "./src/app/statistics/statistics.component.html"),
            styles: [__webpack_require__(/*! ./statistics.component.css */ "./src/app/statistics/statistics.component.css")]
        }),
        __metadata("design:paramtypes", [_ngrx_store__WEBPACK_IMPORTED_MODULE_1__["Store"],
            _shared_data_storage_service__WEBPACK_IMPORTED_MODULE_2__["DataStorageService"]])
    ], StatisticsComponent);
    return StatisticsComponent;
}());



/***/ }),

/***/ "./src/app/statistics/table-stats/table-statistics.component.css":
/*!***********************************************************************!*\
  !*** ./src/app/statistics/table-stats/table-statistics.component.css ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".card-header {\r\n  border: 1px solid #32383e;\r\n  background-color: rgba(0, 0, 0, 0.05);\r\n  color: gray !important;\r\n}\r\n\r\n.card {\r\n  margin-bottom: 20px;\r\n  border: 1px solid #32383e;\r\n  background-color: rgba(200, 200, 200, 0.05);\r\n  color: gray !important;\r\n}\r\n"

/***/ }),

/***/ "./src/app/statistics/table-stats/table-statistics.component.html":
/*!************************************************************************!*\
  !*** ./src/app/statistics/table-stats/table-statistics.component.html ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div *ngIf=\"selectedTableName | async\">\r\n\r\n  <div *ngIf=\"tableState | async\">\r\n\r\n    <div class=\"card\"><!--                                                                                 ROWS INFO -->\r\n      <div class=\"card-header\">\r\n        <h5 class=\"text-info text-center\">{{ selectedTableName | async }}</h5>\r\n      </div>\r\n      <div class=\"card-body\" style=\"background-color: transparent !important; padding: 20px\">\r\n        <div class=\"card\">\r\n          <div class=\"card-header\">\r\n            Rows info:\r\n          </div>\r\n          <div class=\"card-body\">\r\n            <div class=\"row d-flex justify-content-center\" style=\"margin-top: 20px\">\r\n              <div class=\"col-3\">\r\n\r\n                <div class=\"card bg-transparent\" style=\"width: 10rem; border: 1px solid #107180\">\r\n                  <div class=\"align-middle\" style=\"background-color: rgba(23,162,184,0.4)\">\r\n                    <h3 class=\"text-white text-center\">{{ tableInfo?.rows.length }} </h3>\r\n                  </div>\r\n                  <div class=\"card-body\">\r\n                    <h5 class=\"card-title text-center text-white\">Rows</h5>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n              <div class=\"col-3\">\r\n\r\n                <div class=\"card bg-transparent\" style=\"width: 10rem; border: 1px solid #1c7430\">\r\n                  <div class=\"align-middle\" style=\"background-color: rgba(40,167,69,0.4)\">\r\n                    <h3 class=\"text-white text-center\">{{ tableInfo?.doneRows.length }} </h3>\r\n                  </div>\r\n                  <div class=\"card-body\" style=\"min-height: 100px\">\r\n                    <h5 class=\"card-title text-center text-white\">Done Rows</h5>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n              <div class=\"col-3\">\r\n                <div class=\"card bg-transparent\" style=\"width: 10rem; border: 1px solid #9a2530\">\r\n                  <div class=\"align-middle\" style=\"background-color: rgba(220,53,69,0.4)\">\r\n                    <h3 class=\"text-white text-center\">{{ tableInfo?.undoneRows.length }} </h3>\r\n                  </div>\r\n                  <div class=\"card-body\">\r\n                    <h5 class=\"card-title text-center text-white\">Undone Rows</h5>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n            </div>\r\n\r\n            <div *ngIf=\"tableInfo\" class=\"progress bg-transparent\" style=\"margin-top: 20px\">\r\n              <div class=\"progress-bar\"\r\n                   style=\"background-color: rgba(40,167,69,0.4); border: 1px solid #1c7430\"\r\n                   role=\"progressbar\"\r\n                   [style.width]=\" (tableInfo?.doneRows.length / tableInfo?.rows.length * 100 | number : '1.0-0') + '%'\"\r\n                   attr.aria-valuenow=\"{{ tableInfo?.doneRows.length / tableInfo?.rows.length * 100 | number : '1.0-0' }}\"\r\n                   attr.aria-valuemin=\"0\"\r\n                   attr.aria-valuemax=\"100\">\r\n              </div>\r\n              <div class=\"progress-bar\"\r\n                   style=\"background-color: rgba(220,53,69,0.4); border: 1px solid #9a2530\"\r\n                   role=\"progressbar\"\r\n                   [style.width]=\"(tableInfo?.undoneRows.length / tableInfo?.rows.length * 100 | number : '1.0-0') + '%'\"\r\n                   attr.aria-valuenow=\"{{ tableInfo?.undoneRows.length / tableInfo?.rows.length * 100 | number : '1.0-0' }}\"\r\n                   attr.aria-valuemin=\"0\"\r\n                   attr.aria-valuemax=\"100\">\r\n              </div>\r\n            </div>\r\n          </div>\r\n        </div>\r\n      </div>\r\n    </div><!--                                                                                              ROWS INFO END-->\r\n\r\n    <div class=\"card\"><!--                                 COLUMNS  INFO -->\r\n      <div class=\"card-header\">Columns info:</div>\r\n      <div class=\"card-body\" *ngIf=\"(tableHeaderState | async)\">\r\n        <div class=\"row\">\r\n\r\n          <div class=\"col-12\">\r\n\r\n            <div class=\"card\" *ngIf=\"tableInfo.columnInfo.numberInfo.length > 0\"><!--                          NUMBER COLUMNS INFO -->\r\n              <div class=\"card-header\">Number info:</div>\r\n              <div class=\"card-body\" *ngIf=\"(tableHeaderState | async)\">\r\n                <table class=\"table bg-transparent table-responsive table-striped\">\r\n                  <thead>\r\n                  <tr>\r\n                    <th>Column name</th>\r\n                    <th>Column number</th>\r\n                    <th>Sum</th>\r\n                    <th>Average</th>\r\n                    <th>Min</th>\r\n                    <th>Max</th>\r\n                  </tr>\r\n                  </thead>\r\n                  <tbody>\r\n                  <tr *ngFor=\"let numberInfo of tableInfo.columnInfo.numberInfo\">\r\n                    <th>{{ (tableHeaderState | async)[0].columnDetailDefinitionDtoList[numberInfo.columnNumber]?.name }}</th>\r\n                    <td>{{ numberInfo.columnNumber }}</td>\r\n                    <td>{{ numberInfo.sum }}</td>\r\n                    <td>{{ numberInfo.avg | number : '1.2-2' }}</td>\r\n                    <td>{{ numberInfo.min }}</td>\r\n                    <td>{{numberInfo.max }}</td>\r\n                  </tr>\r\n                  </tbody>\r\n                </table>\r\n              </div>\r\n            </div><!--                                                                                         NUMBER COLUMNS INFO END -->\r\n          </div>\r\n\r\n          <div class=\"col-6\">\r\n            <div class=\"card\" *ngIf=\"tableInfo.columnInfo.enumInfo.length > 0\"><!--                        ENUM INFO -->\r\n              <div class=\"card-header\">Enum info:</div>\r\n              <div class=\"card-body\" *ngIf=\"(tableHeaderState | async)\">\r\n                <div *ngFor=\"let enumInfoArray of tableInfo.columnInfo.enumInfo,let i = index\"\r\n                     style=\"border: 1px solid #32383e; padding: 20px; border-radius: 20px; margin: 10px; background-color: rgba(0,0,0,0.05)\">\r\n\r\n                  <h5 style=\"padding: 20px\">\r\n                    {{ (tableHeaderState | async)[0].columnDetailDefinitionDtoList[(enumInfoArray | clearArray)[i].columnNumber]?.name }}\r\n                  </h5>\r\n\r\n                  <div *ngIf=\"enumCharts[i].data.length > 0 && enumCharts[i].labels.length > 0\" style=\"display: block\">\r\n                    <canvas baseChart\r\n                            [datasets]=\"enumCharts[i].data\"\r\n                            [labels]=\"enumCharts[i].labels\"\r\n                            [legend]=\"enumCharts[i].legend\"\r\n                            [chartType]=\"enumCharts[i].chartType\"\r\n                            [options]=\"enumCharts[i].options\">\r\n                    </canvas>\r\n                  </div>\r\n\r\n\r\n                  <table class=\"table table-responsive table-striped bg-transparent \"\r\n                         style=\"margin-top: 30px\">\r\n                    <thead class=\"border-secondary\">\r\n                    <tr>\r\n                      <th>\r\n                        ENUM NAME\r\n                      </th>\r\n                      <th>\r\n                        SUM\r\n                      </th>\r\n                    </tr>\r\n                    </thead>\r\n                    <tbody class=\"border-secondary\" *ngFor=\"let enumInfo of enumInfoArray | clearArray\">\r\n                    <tr *ngIf=\"enumInfo\">\r\n                      <td>\r\n                        {{ enumInfo.name }}\r\n                      </td>\r\n                      <td>\r\n                        {{ enumInfo.sum }}\r\n                      </td>\r\n                    </tr>\r\n                    </tbody>\r\n                  </table>\r\n                </div>\r\n              </div>\r\n            </div><!--                                                                                         ENUM COLUMNS INFO END -->\r\n          </div>\r\n\r\n          <div class=\"col-6\">\r\n\r\n            <div class=\"card\" *ngIf=\"tableInfo.columnInfo.dateInfo.length > 0\"><!--                            DATE COLUMNS INFO -->\r\n              <div class=\"card-header\">\r\n                <span>\r\n                  DATE TYPE COLUMNS:\r\n                </span>\r\n              </div>\r\n              <div class=\"card-body\">\r\n                <table class=\"table table-striped table-responsive bg-transparent \">\r\n                  <thead class=\"border-secondary\">\r\n                  <tr>\r\n                    <th>\r\n                      COLUMN NAME\r\n                    </th>\r\n                    <th>\r\n                      MIN DATE\r\n                    </th>\r\n                    <th>\r\n                      MAX DATE\r\n                    </th>\r\n                  </tr>\r\n                  </thead>\r\n                  <tbody class=\"border-secondary\">\r\n                  <tr *ngFor=\"let dateInfo of tableInfo.columnInfo.dateInfo\">\r\n                    <td>\r\n                      {{ (tableHeaderState | async)[0].columnDetailDefinitionDtoList[dateInfo.columnNumber]?.name }}\r\n                    </td>\r\n                    <td>\r\n                      {{ dateInfo.min | date:'fullDate' }}\r\n                    </td>\r\n                    <td>\r\n                      {{ dateInfo.max | date:'fullDate' }}\r\n                    </td>\r\n                  </tr>\r\n                  </tbody>\r\n                </table>\r\n              </div>\r\n            </div><!--                                                                                     DATE COLUMNS INFO END-->\r\n\r\n            <div class=\"card\" *ngIf=\"tableInfo.columnInfo.descriptionInfo.length > 0\"><!--                     DESCRIPTION COLUMNS INFO -->\r\n              <div class=\"card-header\">Description info:</div>\r\n              <div class=\"card-body\" *ngIf=\"(tableHeaderState | async)\">\r\n                <table class=\"table bg-transparent table-responsive table-striped\">\r\n                  <thead>\r\n                  <tr>\r\n                    <th>Column name</th>\r\n                    <th>Column number</th>\r\n                    <th>Average</th>\r\n                  </tr>\r\n                  </thead>\r\n                  <tbody>\r\n                  <tr *ngFor=\"let descriptionInfo of tableInfo.columnInfo.descriptionInfo\">\r\n                    <th>{{ (tableHeaderState | async)[0].columnDetailDefinitionDtoList[descriptionInfo.columnNumber]?.name }}</th>\r\n                    <td>{{ descriptionInfo.columnNumber }}</td>\r\n                    <td>{{ descriptionInfo.avgLength | number : '1.2-2'}}</td>\r\n                  </tr>\r\n                  </tbody>\r\n                </table>\r\n              </div>\r\n            </div><!--                                                                                         DESCRIPTION COLUMNS INFO END -->\r\n\r\n            <div class=\"card\" *ngIf=\"tableInfo.columnInfo.shortTextInfo.length > 0\"><!--                       SHORT TEXT COLUMNS INFO -->\r\n              <div class=\"card-header\">Short text info:</div>\r\n              <div class=\"card-body\" *ngIf=\"(tableHeaderState | async)\">\r\n\r\n                <table class=\"table bg-transparent table-responsive table-striped\">\r\n                  <thead>\r\n                  <tr>\r\n                    <th>Column name</th>\r\n                    <th>Column number</th>\r\n                    <th>Average</th>\r\n                  </tr>\r\n                  </thead>\r\n                  <tbody>\r\n                  <tr *ngFor=\"let shortTextInfo of tableInfo.columnInfo.shortTextInfo\">\r\n                    <th>{{ (tableHeaderState | async)[0].columnDetailDefinitionDtoList[shortTextInfo.columnNumber]?.name }}</th>\r\n                    <td>{{ shortTextInfo.columnNumber }}</td>\r\n                    <td>{{ shortTextInfo.avgLength | number : '1.2-2'}}</td>\r\n                  </tr>\r\n                  </tbody>\r\n                </table>\r\n              </div>\r\n            </div><!--                                                                                           SHORT TEXT COLUMNS INFO END -->\r\n\r\n          </div>\r\n\r\n        </div><!--                                                                                             COLUMNS INFO END-->\r\n      </div>\r\n    </div>\r\n    <div class=\"card\"><!--                                                                                    TASKS INFO -->\r\n      <div class=\"card-header\">Tasks info:</div>\r\n      <div class=\"card-body\">\r\n        <div class=\"row\" style=\"margin-top: 20px\">\r\n          <div class=\"col-12 d-flex justify-content-center\">\r\n            <div class=\"card border-info bg-transparent\" style=\"width: 10rem;\">\r\n              <div class=\"align-middle\" style=\"background-color: rgba(23,162,184,0.4)\">\r\n                <h3 class=\"text-white text-center\">{{ tasksInfo.tasks.length }} </h3>\r\n              </div>\r\n              <div class=\"card-body\">\r\n                <h5 class=\"card-title text-center text-white\">Tasks</h5>\r\n              </div>\r\n            </div>\r\n          </div>\r\n        </div>\r\n        <div class=\"row\" style=\"margin-top: 20px\">\r\n          <div class=\"col-3\">\r\n            <div class=\"card border-danger bg-transparent\" style=\"width: 10rem; border: 1px solid #9a2530\">\r\n              <div class=\"align-middle\" style=\"background-color: rgba(220,53,69,0.4)\">\r\n                <h3 class=\"text-white text-center\">{{ tasksInfo.unassignedTasks.length }} </h3>\r\n              </div>\r\n              <div class=\"card-body\">\r\n                <h5 class=\"card-title text-center text-white\">Unassigned Tasks</h5>\r\n              </div>\r\n            </div>\r\n          </div>\r\n          <div class=\"col-3\">\r\n            <div class=\"card bg-transparent\" style=\"width: 10rem; border: 1px solid #b28704\">\r\n              <div class=\"align-middle\" style=\"background-color: rgba(255,193,7,0.4)\">\r\n                <h3 class=\"text-white text-center\">{{ tasksInfo.assignedTasks.length }} </h3>\r\n              </div>\r\n              <div class=\"card-body\">\r\n                <h5 class=\"card-title text-center text-white\">Assigned Tasks</h5>\r\n              </div>\r\n            </div>\r\n          </div>\r\n          <div class=\"col-3\">\r\n            <div class=\"card bg-transparent\" style=\"width: 10rem;\" style=\"border: 1px solid #0056b2\">\r\n              <div class=\"align-middle\" style=\"background-color: rgba(0,123,255,0.4)\">\r\n                <h3 class=\"text-white text-center\">{{ tasksInfo.inProgressTasks.length }} </h3>\r\n              </div>\r\n              <div class=\"card-body\">\r\n                <h5 class=\"card-title text-center text-white\">In progress Tasks</h5>\r\n              </div>\r\n            </div>\r\n          </div>\r\n          <div class=\"col-3\">\r\n            <div class=\"card bg-transparent\" style=\"width: 10rem;\" style=\"border: 1px solid #1c7430\">\r\n              <div class=\"align-middle\" style=\"background-color: rgba(40,167,69,0.4)\">\r\n                <h3 class=\"text-white text-center\">{{ tasksInfo.doneTasks.length }} </h3>\r\n              </div>\r\n              <div class=\"card-body\" style=\"min-height: 100px\">\r\n                <h5 class=\"card-title text-center text-white\">Done Tasks</h5>\r\n              </div>\r\n            </div>\r\n          </div>\r\n        </div>\r\n\r\n        <div class=\"progress bg-transparent\" *ngIf=\"tasksInfo.tasks.length > 0\" style=\"margin-top: 20px\">\r\n          <div class=\"progress-bar\"\r\n               style=\"background-color: rgba(220,53,69,0.4); border: 1px solid #9a2530\"\r\n               role=\"progressbar\"\r\n               [style.width]=\" (tasksInfo.unassignedTasks.length / tasksInfo.tasks.length * 100 | number : '1.0-0') + '%'\"\r\n               attr.aria-valuenow=\"{{ tasksInfo.unassignedTasks.length / tasksInfo.tasks.length * 100 | number : '1.0-0' }}\"\r\n               attr.aria-valuemin=\"0\"\r\n               attr.aria-valuemax=\"100\">\r\n          </div>\r\n          <div class=\"progress-bar\"\r\n               style=\"background-color: rgba(255,193,7,0.4); border: 1px solid #b28704\"\r\n               role=\"progressbar\"\r\n               [style.width]=\"(tasksInfo.assignedTasks.length / tasksInfo.tasks.length * 100 | number : '1.0-0') + '%'\"\r\n               attr.aria-valuenow=\"{{ tasksInfo.assignedTasks.length / tasksInfo.tasks.length * 100 | number : '1.0-0' }}\"\r\n               attr.aria-valuemin=\"0\"\r\n               attr.aria-valuemax=\"100\">\r\n          </div>\r\n          <div class=\"progress-bar\"\r\n               style=\"background-color: rgba(0,123,255,0.4); border: 1px solid #0056b2\"\r\n               role=\"progressbar\"\r\n               [style.width]=\"(tasksInfo.inProgressTasks.length / tasksInfo.tasks.length * 100 | number : '1.0-0') + '%'\"\r\n               attr.aria-valuenow=\"{{ tasksInfo.inProgressTasks.length / tasksInfo.tasks.length * 100 | number : '1.0-0' }}\"\r\n               attr.aria-valuemin=\"0\"\r\n               attr.aria-valuemax=\"100\">\r\n          </div>\r\n          <div class=\"progress-bar\"\r\n               style=\"background-color: rgba(40,167,69,0.4); border: 1px solid #1c7430\"\r\n               role=\"progressbar\"\r\n               [style.width]=\"(tasksInfo.doneTasks.length / tasksInfo.tasks.length * 100 | number : '1.0-0') + '%'\"\r\n               attr.aria-valuenow=\"{{ tasksInfo.doneTasks.length / tasksInfo.tasks.length * 100 | number : '1.0-0' }}\"\r\n               attr.aria-valuemin=\"0\"\r\n               attr.aria-valuemax=\"100\">\r\n          </div>\r\n        </div>\r\n      </div>\r\n    </div><!--                                                                     TASKS INFO -->\r\n  </div>\r\n</div>\r\n"

/***/ }),

/***/ "./src/app/statistics/table-stats/table-statistics.component.ts":
/*!**********************************************************************!*\
  !*** ./src/app/statistics/table-stats/table-statistics.component.ts ***!
  \**********************************************************************/
/*! exports provided: TableStatisticsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TableStatisticsComponent", function() { return TableStatisticsComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _ngrx_store__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ngrx/store */ "./node_modules/@ngrx/store/@ngrx/store.es5.js");
/* harmony import */ var _shared_data_storage_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../shared/data-storage.service */ "./src/app/shared/data-storage.service.ts");
/* harmony import */ var _shared_statistics_statistics_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../shared/statistics/statistics.service */ "./src/app/shared/statistics/statistics.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var TableStatisticsComponent = /** @class */ (function () {
    function TableStatisticsComponent(store, dss, statistics) {
        this.store = store;
        this.dss = dss;
        this.statistics = statistics;
        this.tableInfo = null;
        this.tasksInfo = null;
        this.enumCharts = [];
    }
    TableStatisticsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.tableHeaderState = this.store.select('tables', 'tableDefinition');
        this.tableHeaderState.subscribe(function (header) {
            console.log(header);
        });
        this.tableState = this.store.select('tables');
        this.selectedTableName = this.store.select('statistics', 'selectedTableName');
        this.selectedTableName.subscribe(function (tableName) {
            if (tableName) {
                _this.dss.getTableRowsByName(tableName);
                _this.dss.getTableHeaderByName(tableName);
            }
        });
        this.tableState.subscribe(function (tableState) {
            if (tableState) {
                _this.tasksInfo = _this.statistics.mapToTaskInfo(tableState.tableContent);
                _this.tableInfo = _this.statistics.mapToRowsInfo(tableState.tableContent);
                console.log(_this.tableInfo);
                _this.tableInfo.columnInfo.enumInfo.forEach(function (enumInfo, i) {
                    console.log('enumCharts', _this.enumCharts);
                    _this.setEnumChart(enumInfo, i);
                });
            }
        });
    };
    TableStatisticsComponent.prototype.setEnumChart = function (enumInfos, i) {
        var _this = this;
        this.enumCharts[i] = {
            data: [],
            labels: [],
            chartType: (i % 2 === 0) ? 'doughnut' : 'bar',
            legend: true,
            options: {
                scaleShowVerticalLines: false,
                responsive: true,
                legend: false,
                elements: {
                    arc: {
                        borderWidth: 0
                    }
                }
            }
        };
        var enumValues = [];
        var columnNumber = null;
        enumInfos.forEach(function (enumInfo) {
            enumValues.push(enumInfo.sum);
            columnNumber = enumInfo.columnNumber;
            _this.enumCharts[i].labels.push(enumInfo.name);
        });
        this.enumCharts[i].data.push({ data: enumValues, label: 'ENUM ' + columnNumber });
    };
    TableStatisticsComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-table-statistics',
            template: __webpack_require__(/*! ./table-statistics.component.html */ "./src/app/statistics/table-stats/table-statistics.component.html"),
            styles: [__webpack_require__(/*! ./table-statistics.component.css */ "./src/app/statistics/table-stats/table-statistics.component.css")]
        }),
        __metadata("design:paramtypes", [_ngrx_store__WEBPACK_IMPORTED_MODULE_1__["Store"],
            _shared_data_storage_service__WEBPACK_IMPORTED_MODULE_2__["DataStorageService"],
            _shared_statistics_statistics_service__WEBPACK_IMPORTED_MODULE_3__["StatisticsService"]])
    ], TableStatisticsComponent);
    return TableStatisticsComponent;
}());



/***/ }),

/***/ "./src/app/tables/key.pipe.ts":
/*!************************************!*\
  !*** ./src/app/tables/key.pipe.ts ***!
  \************************************/
/*! exports provided: KeyPipe */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "KeyPipe", function() { return KeyPipe; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

// @Pipe({name: 'keys'})
// export class KeyPipe implements PipeTransform {
//   transform(value: any, ...args: any[]): any {
//     return Object.keys(value);
//   }
// }
var KeyPipe = /** @class */ (function () {
    function KeyPipe() {
    }
    KeyPipe.prototype.transform = function (value) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        var key = Object.keys(value);
        return { key: key, value: value[Object.keys(value)[0]] };
    };
    KeyPipe = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Pipe"])({ name: 'valueOnKey' })
    ], KeyPipe);
    return KeyPipe;
}());



/***/ }),

/***/ "./src/app/tables/menu/menu.component.css":
/*!************************************************!*\
  !*** ./src/app/tables/menu/menu.component.css ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "a.bg-dark:hover {\r\n  background-color: #343a40!important;\r\n}\r\n\r\nli {\r\n  background-color: rgba(200,200,200,0.05);\r\n  border: none;\r\n}\r\n\r\n.form-control {\r\n  background-color: rgba(200,200,200,0.05);\r\n  border: none;\r\n}\r\n"

/***/ }),

/***/ "./src/app/tables/menu/menu.component.html":
/*!*************************************************!*\
  !*** ./src/app/tables/menu/menu.component.html ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\r\n  <div class=\"container-fluid\" style=\"padding: 0\" *ngIf=\"choosenName\">\r\n    <nav class=\"navbar\" style=\"margin-bottom: 0;padding-bottom: 0; border-bottom: none;\">\r\n      <ul class=\"nav\" style=\"margin-bottom: 0;padding-bottom: 0; border-bottom: none;\">\r\n        <li style=\"background-color: transparent !important;\">\r\n          <form class=\"form-inline input-group my-2 my-lg-0\" style=\"margin-bottom: 0;padding-left: 20px;\">\r\n            <div class=\"btn-group\" role=\"group\" aria-label=\"\">\r\n              <button class=\"btn btn-outline-secondary my-2 my-sm-0\" (click)=\"onNewRow()\">\r\n                New row\r\n              </button>\r\n              <button class=\"btn btn-outline-secondary my-2 my-sm-0\"\r\n                      *ngIf=\"(extendedTableView|async)\"\r\n                      (click)=\"onExtendedFilterMode()\">\r\n                Filter Mode\r\n              </button>\r\n              <button class=\"btn btn-outline-secondary my-2 my-sm-0\" (click)=\"switchExtendedTableView()\">\r\n                {{ (extendedTableView|async) ? 'Reduce View' : 'Extend View'}}\r\n              </button>\r\n            </div>\r\n            <div class=\"btn-group btn-group-toggle\" data-toggle=\"buttons\"\r\n                 *ngIf=\"(extendedTableView|async) && (extendedFilterMode | async)\">\r\n              <label class=\"btn btn-outline-secondary active\"(click)=\"setFilterSelectValue(false)\">\r\n                <input type=\"radio\"> All\r\n              </label>\r\n              <label class=\"btn btn-outline-secondary\" (click)=\"setFilterSelectValue(true)\">\r\n                <input type=\"radio\"> Any\r\n              </label>\r\n            </div>\r\n            <div class=\"btn-group\" role=\"group\" aria-label=\"\">\r\n              <input class=\"form-control mr-sm-2\" type=\"text\" placeholder=\"Search\"\r\n                     (keyup)=\"onFilter(filterInput.value)\"\r\n                     *ngIf=\"!(extendedTableView|async)\"\r\n                     #filterInput>\r\n            </div>\r\n          </form>\r\n        </li>\r\n      </ul>\r\n      <ul class=\"nav nav-pills nav-collapse\" style=\"margin-bottom: 0;padding-bottom: 0;border-bottom: none;\">\r\n        <li class=\"nav-item\">\r\n          <div class=\"btn-group\" role=\"group\" aria-label=\"\">\r\n            <button class=\"btn btn-outline-secondary\"\r\n                    *ngFor=\"let tableName of tableNames\" (click)=\"onChooseName(tableName)\"\r\n                    [ngClass]=\"choosenName == tableName ? 'text-info' : 'text-secondary'\">\r\n              {{tableName}}\r\n            </button>\r\n          </div>\r\n        </li>\r\n      </ul>\r\n    </nav>\r\n  </div>\r\n\r\n<div class=\"container\" style=\"margin-top: 10%\" *ngIf=\"choosenName == null || choosenName == undefined\">\r\n  <div class=\"row justify-content-center\">\r\n    <div class=\"col-sm-12 col-md-6\">\r\n      <ul class=\"list-group\">\r\n        <li class=\"list-group-item bg-dark text-info\">Select a table:</li>\r\n        <li class=\"list-group-item text-secondary\" *ngFor=\"let tableName of tableNames\" (click)=\"onChooseName(tableName)\"> {{tableName}}</li>\r\n      </ul>\r\n    </div>\r\n  </div>\r\n</div>\r\n"

/***/ }),

/***/ "./src/app/tables/menu/menu.component.ts":
/*!***********************************************!*\
  !*** ./src/app/tables/menu/menu.component.ts ***!
  \***********************************************/
/*! exports provided: MenuComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MenuComponent", function() { return MenuComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var rxjs_Subject__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs/Subject */ "./node_modules/rxjs-compat/_esm5/Subject.js");
/* harmony import */ var _ngrx_store__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ngrx/store */ "./node_modules/@ngrx/store/@ngrx/store.es5.js");
/* harmony import */ var _shared_store_table_tables_actions__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../shared/store/table/tables.actions */ "./src/app/shared/store/table/tables.actions.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var MenuComponent = /** @class */ (function () {
    function MenuComponent(store) {
        this.store = store;
        this.choosenNameChanged = new rxjs_Subject__WEBPACK_IMPORTED_MODULE_1__["Subject"]();
    }
    MenuComponent.prototype.setFilterSelectValue = function (value) {
        console.log('setFilterSelectValue', value);
        this.store.dispatch(new _shared_store_table_tables_actions__WEBPACK_IMPORTED_MODULE_3__["SetExtendedFilterSelect"](value));
    };
    MenuComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.extendedFilterMode = this.store.select('tables', 'extendedFilterMode');
        this.extendedTableView = this.store.select('tables', 'extendedTableView');
        this.extendedTableView.subscribe(function (value) {
            _this.extendedTableViewValue = value;
        });
    };
    MenuComponent.prototype.onChooseName = function (tableName) {
        this.choosenName = tableName;
        this.choosenNameChanged.next(tableName);
    };
    MenuComponent.prototype.onFilter = function (filter) {
        console.log(filter);
        this.store.dispatch(new _shared_store_table_tables_actions__WEBPACK_IMPORTED_MODULE_3__["TableFilter"](filter));
    };
    MenuComponent.prototype.onNewRow = function () {
        // TODO new Row
        this.store.dispatch(new _shared_store_table_tables_actions__WEBPACK_IMPORTED_MODULE_3__["SetEditRowMode"](true));
        this.store.dispatch(new _shared_store_table_tables_actions__WEBPACK_IMPORTED_MODULE_3__["SetNewRowModeAction"](true));
    };
    MenuComponent.prototype.switchExtendedTableView = function () {
        this.store.dispatch(new _shared_store_table_tables_actions__WEBPACK_IMPORTED_MODULE_3__["SetExtendedTableView"](!this.extendedTableViewValue));
    };
    MenuComponent.prototype.onExtendedFilterMode = function () {
        this.store.dispatch(new _shared_store_table_tables_actions__WEBPACK_IMPORTED_MODULE_3__["SetExtendedFilterMode"]());
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Array)
    ], MenuComponent.prototype, "tableNames", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"])(),
        __metadata("design:type", Object)
    ], MenuComponent.prototype, "choosenNameChanged", void 0);
    MenuComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-menu',
            template: __webpack_require__(/*! ./menu.component.html */ "./src/app/tables/menu/menu.component.html"),
            styles: [__webpack_require__(/*! ./menu.component.css */ "./src/app/tables/menu/menu.component.css")]
        }),
        __metadata("design:paramtypes", [_ngrx_store__WEBPACK_IMPORTED_MODULE_2__["Store"]])
    ], MenuComponent);
    return MenuComponent;
}());



/***/ }),

/***/ "./src/app/tables/row-details/row-details.component.css":
/*!**************************************************************!*\
  !*** ./src/app/tables/row-details/row-details.component.css ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "li, td {\r\n  border: 1px solid #32383e;\r\n  background-color: rgba(200, 200, 200, 0.05);\r\n  color: lightgray !important;\r\n}\r\n\r\n.form-control {\r\n  background-color: rgba(200,200,200,0.05);\r\n  border: none;\r\n  color: gray !important;\r\n}\r\n"

/***/ }),

/***/ "./src/app/tables/row-details/row-details.component.html":
/*!***************************************************************!*\
  !*** ./src/app/tables/row-details/row-details.component.html ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"panel\" *ngIf=\"editRowMode\" style=\"border: solid 2px #343a40; border-radius: 8px\">\r\n\r\n  <div class=\"panel-heading text-center\" style=\"background-color: rgba(0,0,0,0.05); padding: 10px\">\r\n    <div class=\"btn-group\">\r\n      <button type=\"button\" class=\"btn btn-outline-secondary\" (click)=\"onToggleRowEditMode()\">Close</button>\r\n      <button type=\"button\" class=\"btn btn-outline-secondary\" (click)=\"onAddTask()\">Add Task</button>\r\n      <button type=\"button\" class=\"btn btn-outline-secondary\" *ngIf=\"unlockFields && !(newRowMode | async)\" (click)=\"onSubmit()\">Save</button>\r\n      <button type=\"button\" class=\"btn btn-outline-secondary\" *ngIf=\"!(newRowMode | async)\" (click)=\"toggleUnlock()\"> {{ unlockFields ? 'Cancel' : 'Edit' }}</button>\r\n      <button type=\"button\" class=\"btn btn-outline-secondary\" *ngIf=\"(newRowMode | async)\" (click)=\"onSaveNewRow()\">Save</button>\r\n      <button type=\"button\" class=\"btn btn-outline-secondary\" (click)=\"switchExtendedRowView()\">{{(extendedRowView| async) ? 'Reduce' : 'Extend'}}</button>\r\n      <button type=\"button\" class=\"btn btn-outline-secondary text-danger\" (click)=\"onDeleteRow()\"> Delete </button>\r\n    </div>\r\n  </div>\r\n\r\n  <div class=\"panel-body\" style=\"padding: 10px\">\r\n    <div *ngIf=\"!unlockFields && (newRowMode | async)\">\r\n      <div class=\"col-xs-12 \">\r\n        <form [formGroup]=\"newRowForm\">\r\n          <div class=\"form-group\" hidden>\r\n            <label for=\"id\" class=\"text-info\">ID:</label>\r\n            <input type=\"number\"\r\n                   id=\"id\"\r\n                   formControlName=\"id\"\r\n                   class=\"form-control\"\r\n            >\r\n          </div>\r\n          <div class=\"form-group\" hidden>\r\n            <label for=\"name\" class=\"text-info\">Name:</label>\r\n            <input type=\"text\"\r\n                   id=\"name\"\r\n                   formControlName=\"name\"\r\n                   class=\"form-control\"\r\n            >\r\n          </div>\r\n          <div class=\"form-group\" hidden>\r\n            <label for=\"createdBy\" class=\"text-info\">Created By:</label>\r\n            <input type=\"text\"\r\n                   id=\"createdBy\"\r\n                   formControlName=\"createdBy\"\r\n                   class=\"form-control\"\r\n            >\r\n          </div>\r\n          <div class=\"form-group\" hidden>\r\n            <label for=\"createdOn\" class=\"text-info\">Created On:</label>\r\n            <input type=\"datetime-local\"\r\n                   id=\"createdOn\"\r\n                   formControlName=\"createdOn\"\r\n                   class=\"form-control\"\r\n            >\r\n          </div>\r\n          <div class=\"form-group\" hidden>\r\n            <label for=\"lastModifiedBy\" class=\"text-info\">Last modified by:</label>\r\n            <input type=\"text\"\r\n                   id=\"lastModifiedBy\"\r\n                   formControlName=\"lastModifiedBy\"\r\n                   class=\"form-control\"\r\n            >\r\n          </div>\r\n          <div class=\"form-group\" hidden>\r\n            <label for=\"lastModifiedOn\" class=\"text-info\">Last modified on:</label>\r\n            <input type=\"datetime-local\"\r\n                   id=\"lastModifiedOn\"\r\n                   formControlName=\"lastModifiedOn\"\r\n                   class=\"form-control\"\r\n            >\r\n          </div>\r\n          <div formArrayName=\"columnValueDtos\">\r\n            <div *ngFor=\"let cell of newRowForm.get('columnValueDtos').controls;let j = index\">\r\n\r\n              <div [ngSwitch]=\"(cell.value | valueOnKey).key\" formGroupName=\"{{j}}\">\r\n\r\n                <div *ngSwitchCase=\"'DT'\" class=\"form-group\" style=\"margin-top: 10px\">\r\n                  <label class=\"text-info\">{{(header | async)[0].columnDetailDefinitionDtoList[j].name}}</label>\r\n                  <input type=\"datetime-local\"\r\n                         formControlName=\"DT\"\r\n                         class=\"form-control\"\r\n                         formControlName=\"DT\">\r\n                </div>\r\n                <div *ngSwitchCase=\"'ST'\" class=\"form-group\" style=\"margin-top: 10px\">\r\n                  <label class=\"text-info\">{{(header | async)[0].columnDetailDefinitionDtoList[j].name}}</label>\r\n                  <input\r\n                    [type]=\"'text'\"\r\n                    formControlName=\"ST\"\r\n                    class=\"form-control\">\r\n                </div>\r\n                <div *ngSwitchCase=\"'DE'\" class=\"form-group\" style=\"margin-top: 10px\">\r\n                  <label class=\"text-info\">{{(header | async)[0].columnDetailDefinitionDtoList[j].name}}</label>\r\n                  <textarea cols=\"30\" rows=\"10\"\r\n                            class=\"form-control\"\r\n                            formControlName=\"DE\">\r\n                </textarea>\r\n                </div>\r\n                <div *ngSwitchCase=\"'EN'\" class=\"form-group\" style=\"margin-top: 10px\">\r\n                  <label class=\"text-info\">{{(header | async)[0].columnDetailDefinitionDtoList[j].name}}</label>\r\n                  <select class=\"form-control\" formControlName=\"EN\">\r\n                    <option selected> -Select value-</option>\r\n                    <option *ngFor=\"let option of (header | async)[0].columnDetailDefinitionDtoList[j].optionList\">\r\n                      {{option.value}}\r\n                    </option>\r\n                  </select>\r\n                </div>\r\n                <div *ngSwitchCase=\"'IN'\" class=\"form-group\" style=\"margin-top: 10px\">\r\n                  <label class=\"text-info\">{{(header | async)[0].columnDetailDefinitionDtoList[j].name}}</label>\r\n                  <input [id]=\"(cell.value | valueOnKey).key\"\r\n                         [type]=\"'number'\"\r\n                         class=\"form-control\"\r\n                         formControlName=\"IN\">\r\n                </div>\r\n              </div>\r\n            </div>\r\n          </div>\r\n        </form>\r\n      </div>\r\n    </div>\r\n\r\n    <form *ngIf=\"unlockFields && !(newRowMode | async)\" [formGroup]=\"updateRowForm\" style=\"padding-left: 10px\" style=\"padding: 5px\">\r\n      <div formArrayName=\"columnValueDtos\">\r\n        <div *ngFor=\"let cell of updateRowForm.get('columnValueDtos').controls;let j = index\">\r\n          <div [ngSwitch]=\"(cell.value | valueOnKey).key\" formGroupName=\"{{j}}\">\r\n            <div *ngSwitchCase=\"'DT'\" class=\"form-group\" style=\"margin-top: 10px\">\r\n              <label class=\"text-info\"> {{ (header | async)[0].columnDetailDefinitionDtoList[j]?.name }} </label>\r\n              <input type=\"datetime-local\"\r\n                     formControlName=\"DT\"\r\n                     class=\"form-control\"\r\n              >\r\n            </div>\r\n            <div *ngSwitchCase=\"'ST'\" class=\"form-group\" style=\"margin-top: 10px\">\r\n              <label class=\"text-info\"> {{ (header | async)[0].columnDetailDefinitionDtoList[j]?.name }} </label>\r\n              <input formControlName=\"ST\"\r\n                     [type]=\"'text'\"\r\n                     class=\"form-control\"\r\n              >\r\n            </div>\r\n            <div *ngSwitchCase=\"'DE'\" class=\"form-group\" style=\"margin-top: 10px\">\r\n              <label class=\"text-info\"> {{ (header | async)[0].columnDetailDefinitionDtoList[j]?.name }} </label>\r\n              <textarea cols=\"30\" rows=\"10\"\r\n                        formControlName=\"DE\"\r\n                        class=\"form-control\"\r\n\r\n              >\r\n                </textarea>\r\n            </div>\r\n            <div *ngSwitchCase=\"'IN'\" class=\"form-group\" style=\"margin-top: 10px\">\r\n              <label class=\"text-info\"> {{ (header | async)[0].columnDetailDefinitionDtoList[j]?.name }} </label>\r\n              <input formControlName=\"IN\"\r\n                     [type]=\"'number'\"\r\n                     class=\"form-control\"\r\n\r\n              >\r\n            </div>\r\n            <div *ngSwitchCase=\"'EN'\" class=\"form-group\" style=\"margin-top: 10px\">\r\n              <label class=\"text-info\"> {{ (header | async)[0].columnDetailDefinitionDtoList[j]?.name }} </label>\r\n              <select class=\"form-control\"\r\n                      formControlName=\"EN\"\r\n                      style=\"height: 35px\"\r\n\r\n              >\r\n                <option *ngFor=\"let option of (header | async)[0].columnDetailDefinitionDtoList[j]?.optionList\"\r\n                        [value]=\"option.value\"\r\n                        [selected]=\"(row| async)?.columnValueDtos[j]['EN'].value == option.value\"\r\n                >{{ option.value }}\r\n              </select>\r\n            </div>\r\n          </div>\r\n        </div>\r\n      </div>\r\n      <div class=\"form-group\">\r\n        <label for=\"id\" class=\"text-info\">ID:</label>\r\n        <input type=\"number\"\r\n               id=\"id\"\r\n               formControlName=\"id\"\r\n               class=\"form-control\"\r\n               readonly\r\n               required\r\n        >\r\n      </div>\r\n      <div class=\"form-group\" hidden>\r\n        <label for=\"name\" class=\"text-info\">Name:</label>\r\n        <input type=\"text\"\r\n               id=\"name\"\r\n               formControlName=\"name\"\r\n               class=\"form-control\"\r\n               readonly\r\n        >\r\n      </div>\r\n      <div class=\"form-group\" >\r\n        <label for=\"createdBy\" class=\"text-info\">Created By:</label>\r\n        <input type=\"text\"\r\n               id=\"createdBy\"\r\n               formControlName=\"createdBy\"\r\n               class=\"form-control\"\r\n               readonly\r\n               required\r\n        >\r\n      </div>\r\n      <div class=\"form-group\">\r\n        <label class=\"text-info\">Created On:</label>\r\n        <input type=\"datetime-local\"\r\n               formControlName=\"createdOn\"\r\n               class=\"form-control\"\r\n               readonly\r\n               required\r\n        >\r\n      </div>\r\n      <div class=\"form-group\">\r\n        <label for=\"lastModifiedBy\" class=\"text-info\">Last modified by:</label>\r\n        <input type=\"text\"\r\n               id=\"lastModifiedBy\"\r\n               formControlName=\"lastModifiedBy\"\r\n               class=\"form-control\"\r\n               readonly\r\n               required\r\n        >\r\n      </div>\r\n      <div class=\"form-group\" disabled>\r\n        <label for=\"lastModifiedOn\" class=\"text-info\">Last modified on:</label>\r\n        <input type=\"datetime-local\"\r\n               id=\"lastModifiedOn\"\r\n               formControlName=\"lastModifiedOn\"\r\n               class=\"form-control\"\r\n               readonly\r\n               required\r\n        >\r\n      </div>\r\n    </form>\r\n\r\n    <div *ngIf=\"!unlockFields && !(newRowMode | async)\">\r\n      <table class=\"table\">\r\n        <tbody>\r\n        <tr *ngFor=\"let cellValue of (row | async)?.columnValueDtos; let i = index;\">\r\n          <td><span class=\"text-info\">\r\n            {{ (header | async)[0].columnDetailDefinitionDtoList[i]?.name }}</span>\r\n          </td>\r\n          <td>\r\n            {{(cellValue | valueOnKey).value.value }}\r\n          </td>\r\n        </tr>\r\n        <tr *ngIf=\"extendedRowView | async\">\r\n          <td><span class=\"text-info\">ID</span></td>\r\n          <td>{{ (row | async)?.id }}</td>\r\n        </tr>\r\n        <tr *ngIf=\"extendedRowView | async\" hidden>\r\n          <td><span class=\"text-info\">Name</span></td>\r\n          <td>{{ (row | async)?.name }}</td>\r\n        </tr>\r\n        <tr *ngIf=\"extendedRowView | async\">\r\n          <td><span class=\"text-info\">Created by</span></td>\r\n          <td>{{ (row | async)?.createdBy}}</td>\r\n        </tr>\r\n        <tr *ngIf=\"extendedRowView | async\">\r\n          <td><span class=\"text-info\">Created on</span></td>\r\n          <td>{{ (row | async)?.createdOn }}</td>\r\n        </tr>\r\n        <tr *ngIf=\"extendedRowView | async\">\r\n          <td><span class=\"text-info\">Last modified by</span></td>\r\n          <td>{{ (row | async)?.lastModifiedBy }}</td>\r\n        </tr>\r\n        <tr *ngIf=\"extendedRowView | async\">\r\n          <td><span class=\"text-info\">Last modified on</span></td>\r\n          <td>{{ (row | async)?.lastModifiedOn }}</td>\r\n        </tr>\r\n        </tbody>\r\n      </table>\r\n\r\n      <div *ngIf=\"(row | async)?.taskDtos.length <= 0\">\r\n        <ul class=\"list-group\" style=\"margin-bottom: 0\">\r\n          <li class=\"list-group-item text-white text-center\" style=\"background-color: rgba(0,0,0,0.05);\">\r\n            <h5>NO TASKS</h5>\r\n          </li>\r\n        </ul>\r\n      </div>\r\n\r\n      <div *ngIf=\"(row | async)?.taskDtos.length > 0\">\r\n        <ul class=\"list-group\" style=\"margin-bottom: 0\">\r\n          <li class=\"list-group-item text-white text-center\" style=\"background-color: rgba(0,0,0,0.05);\">\r\n            <h5>TASKS</h5>\r\n          </li>\r\n          <div *ngFor=\"let task of (row | async)?.taskDtos; let i = index;\">\r\n            <li class=\"list-group-item d-flex justify-content-between align-items-center\" style=\"margin-top: 3px\">\r\n              <span class=\"btn btn-outline-secondary text-info\"\r\n                    (click)=\"task.id == selectedTask?.id ? onShowTask(null) : onShowTask(task)\"> {{task.name }} </span>\r\n              <span class=\"btn btn-outline-secondary text-danger\" (click)=\"onDeleteTask(task.id)\" *ngIf=\"task.id == selectedTask?.id\"> Delete Task</span>\r\n              <span class=\"btn btn-outline-secondary\" (click)=\"onShowTaskDetails(task)\">Details</span>\r\n            </li>\r\n            <div *ngIf=\"task.id == selectedTask?.id\">\r\n              <li class=\"list-group-item\"> ID: {{task.id}}</li>\r\n              <li class=\"list-group-item\"> Name: {{task.name}}</li>\r\n              <li class=\"list-group-item\"> Description: {{task.description}}</li>\r\n              <li class=\"list-group-item\"> Status: {{task.status}}</li>\r\n            </div>\r\n          </div>\r\n        </ul>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>\r\n"

/***/ }),

/***/ "./src/app/tables/row-details/row-details.component.ts":
/*!*************************************************************!*\
  !*** ./src/app/tables/row-details/row-details.component.ts ***!
  \*************************************************************/
/*! exports provided: RowDetailsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RowDetailsComponent", function() { return RowDetailsComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _shared_data_storage_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../shared/data-storage.service */ "./src/app/shared/data-storage.service.ts");
/* harmony import */ var _ngrx_store__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ngrx/store */ "./node_modules/@ngrx/store/@ngrx/store.es5.js");
/* harmony import */ var _shared_store_table_tables_actions__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../shared/store/table/tables.actions */ "./src/app/shared/store/table/tables.actions.ts");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _row_value_types_question_base_model__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../row/value-types/question-base.model */ "./src/app/tables/row/value-types/question-base.model.ts");
/* harmony import */ var _row_question_control_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../row/question-control.service */ "./src/app/tables/row/question-control.service.ts");
/* harmony import */ var _shared_store_task_tasks_actions__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../shared/store/task/tasks.actions */ "./src/app/shared/store/task/tasks.actions.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var RowDetailsComponent = /** @class */ (function () {
    function RowDetailsComponent(qcs, store, dss) {
        this.qcs = qcs;
        this.store = store;
        this.dss = dss;
        this.selectedTask = null;
    }
    RowDetailsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.unlockFields = false;
        this.extendedRowView = this.store.select('tables', 'extendedRowView');
        this.extendedRowView.subscribe(function (value) {
            _this.extendedRowViewValue = value;
        });
        this.editRowMode = this.store.select('tables', 'editRowMode');
        this.row = this.store.select('tables', 'editedRow');
        this.header = this.store.select('tables', 'tableDefinition');
        this.header.subscribe(function (header) {
            _this.selectedTableName = header[0].name;
        });
        this.row.subscribe(function (row) {
            _this.createUpdateRowForm(row);
            _this.selesctedRow = row;
        });
        this.newRowMode = this.store.select('tables', 'newRowMode');
        this.newRowMode.subscribe(function () {
            _this.createNewRowForm();
        });
    };
    RowDetailsComponent.prototype.createNewRowForm = function () {
        var _this = this;
        this.header.subscribe(function (header) {
            if (header) {
                _this.newRowForm =
                    new _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormGroup"]({
                        'id': new _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormControl"](),
                        'name': new _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormControl"](),
                        'createdBy': new _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormControl"](),
                        'createdOn': new _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormControl"](),
                        'lastModifiedBy': new _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormControl"](),
                        'lastModifiedOn': new _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormControl"](),
                        'columnValueDtos': new _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormArray"]([]),
                        'taskDtos': new _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormArray"]([])
                    });
                header[0]['columnDetailDefinitionDtoList'].forEach(function (column) {
                    _this.newRowForm.get('columnValueDtos').push(_this.qcs.toFormGroup([new _row_value_types_question_base_model__WEBPACK_IMPORTED_MODULE_5__["Question"]({ key: column.type, value: '' })]));
                });
            }
        });
    };
    RowDetailsComponent.prototype.createUpdateRowForm = function (row) {
        var _this = this;
        if (row) {
            this.updateRowForm =
                new _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormGroup"]({
                    'id': new _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormControl"](row.id),
                    'name': new _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormControl"](row.name),
                    'createdBy': new _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormControl"](row.createdBy),
                    'createdOn': new _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormControl"](row.createdOn),
                    'lastModifiedBy': new _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormControl"](row.lastModifiedBy),
                    'lastModifiedOn': new _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormControl"](row.lastModifiedOn),
                    'columnValueDtos': new _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormArray"]([]),
                    'taskDtos': new _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormArray"]([])
                });
            row.columnValueDtos.forEach(function (cell) {
                _this.updateRowForm.get('columnValueDtos').push(_this.qcs.toFormGroup([new _row_value_types_question_base_model__WEBPACK_IMPORTED_MODULE_5__["Question"]({ key: Object.keys(cell), value: cell[Object.keys(cell)[0]].value })]));
            });
            row.taskDtos.forEach(function () {
                _this.updateRowForm.get('taskDtos').push(new _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormGroup"]({
                    'id': new _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormControl"](),
                    'name': new _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormControl"](),
                    'description': new _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormControl"](),
                    'status': new _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormControl"](),
                    'userNames': new _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormArray"]([]),
                    'taskDtos': new _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormArray"]([])
                }));
            });
        }
    };
    // show() { TODO remove
    //   this.row.subscribe(this.updateRowForm.value);
    // }
    RowDetailsComponent.prototype.onToggleRowEditMode = function () {
        this.store.dispatch(new _shared_store_table_tables_actions__WEBPACK_IMPORTED_MODULE_3__["SetEditRowMode"](false));
        this.store.dispatch(new _shared_store_table_tables_actions__WEBPACK_IMPORTED_MODULE_3__["SetNewRowModeAction"](false));
        this.store.dispatch(new _shared_store_task_tasks_actions__WEBPACK_IMPORTED_MODULE_7__["SetTaskDetailsModeAction"](false));
        this.store.dispatch(new _shared_store_task_tasks_actions__WEBPACK_IMPORTED_MODULE_7__["SetShowedTaskAction"](null));
        this.unlockFields = false;
    };
    RowDetailsComponent.prototype.onSubmit = function () {
        var _this = this;
        if (this.unlockFields) {
            this.header.forEach(function (header) {
                _this.dss.updateRow(header[0].name, mapForm(_this.updateRowForm.value));
            });
            this.onToggleRowEditMode();
        }
        function mapForm(formValue) {
            formValue.columnValueDtos.forEach(function (value, i) {
                if (Object.keys(value[Object.keys(value)[0]])[0] !== 'value') {
                    var mappedColumnValue = {};
                    mappedColumnValue[Object.keys(value)[0]] = { value: value[Object.keys(value)[0]] };
                    formValue.columnValueDtos[i] = mappedColumnValue;
                }
            });
            return formValue;
        }
    };
    RowDetailsComponent.prototype.onSaveNewRow = function () {
        var _this = this;
        var newRow = this.mapNewRow();
        this.header.forEach(function (header) {
            _this.dss.addNewRow(header[0].name, newRow);
        });
    };
    RowDetailsComponent.prototype.mapNewRow = function () {
        var newRow = this.newRowForm.value;
        var mapedNewRow = {
            id: this.newRowForm.value.id,
            name: this.newRowForm.value.name,
            createdBy: this.newRowForm.value.createdBy,
            createdOn: this.newRowForm.value.createdOn,
            lastModifiedBy: this.newRowForm.value.lastModifiedBy,
            lastModifiedOn: this.newRowForm.value.lastModifiedOn,
            columnValueDtos: [],
            taskDtos: []
        };
        newRow.columnValueDtos.forEach(function (value) {
            var newValue = {};
            newValue[Object.keys(value)[0]] = { value: value[Object.keys(value)[0]] };
            mapedNewRow.columnValueDtos.push(newValue);
        });
        return mapedNewRow;
    };
    RowDetailsComponent.prototype.toggleUnlock = function () {
        this.unlockFields = !this.unlockFields;
    };
    RowDetailsComponent.prototype.ngOnDestroy = function () {
    };
    RowDetailsComponent.prototype.onAddTask = function () {
        this.store.dispatch(new _shared_store_task_tasks_actions__WEBPACK_IMPORTED_MODULE_7__["SetTaskDetailsModeAction"](true));
        this.store.dispatch(new _shared_store_task_tasks_actions__WEBPACK_IMPORTED_MODULE_7__["SetShowedTaskAction"](null));
    };
    RowDetailsComponent.prototype.onShowTask = function (task) {
        this.selectedTask = task;
    };
    RowDetailsComponent.prototype.onShowTaskDetails = function (task) {
        this.store.dispatch(new _shared_store_task_tasks_actions__WEBPACK_IMPORTED_MODULE_7__["SetTaskDetailsModeAction"](true));
        this.store.dispatch(new _shared_store_task_tasks_actions__WEBPACK_IMPORTED_MODULE_7__["SetShowedTaskAction"](task));
    };
    RowDetailsComponent.prototype.onDeleteRow = function () {
        console.log(this.selesctedRow);
        this.dss.deleteRow(this.selectedTableName, this.selesctedRow.id);
    };
    RowDetailsComponent.prototype.onDeleteTask = function (taskId) {
        this.dss.deleteTask(this.selectedTableName, taskId, this.selesctedRow.id);
    };
    RowDetailsComponent.prototype.switchExtendedRowView = function () {
        this.store.dispatch(new _shared_store_table_tables_actions__WEBPACK_IMPORTED_MODULE_3__["SetExtendedRowView"](!this.extendedRowViewValue));
    };
    RowDetailsComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-row-details',
            template: __webpack_require__(/*! ./row-details.component.html */ "./src/app/tables/row-details/row-details.component.html"),
            styles: [__webpack_require__(/*! ./row-details.component.css */ "./src/app/tables/row-details/row-details.component.css")]
        }),
        __metadata("design:paramtypes", [_row_question_control_service__WEBPACK_IMPORTED_MODULE_6__["QuestionControlService"],
            _ngrx_store__WEBPACK_IMPORTED_MODULE_2__["Store"],
            _shared_data_storage_service__WEBPACK_IMPORTED_MODULE_1__["DataStorageService"]])
    ], RowDetailsComponent);
    return RowDetailsComponent;
}());



/***/ }),

/***/ "./src/app/tables/row/question-control.service.ts":
/*!********************************************************!*\
  !*** ./src/app/tables/row/question-control.service.ts ***!
  \********************************************************/
/*! exports provided: QuestionControlService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "QuestionControlService", function() { return QuestionControlService; });
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var QuestionControlService = /** @class */ (function () {
    function QuestionControlService() {
    }
    QuestionControlService.prototype.toFormGroup = function (questions) {
        var group = {};
        questions.forEach(function (question) {
            group[question.key] = question.required ? new _angular_forms__WEBPACK_IMPORTED_MODULE_0__["FormControl"](question.value || '', _angular_forms__WEBPACK_IMPORTED_MODULE_0__["Validators"].required)
                : new _angular_forms__WEBPACK_IMPORTED_MODULE_0__["FormControl"](question.value || '');
        });
        return new _angular_forms__WEBPACK_IMPORTED_MODULE_0__["FormGroup"](group);
    };
    QuestionControlService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])(),
        __metadata("design:paramtypes", [])
    ], QuestionControlService);
    return QuestionControlService;
}());



/***/ }),

/***/ "./src/app/tables/row/row.component.css":
/*!**********************************************!*\
  !*** ./src/app/tables/row/row.component.css ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "td {\r\n  min-width: 200px;\r\n  width: 200px;\r\n  text-align: center;\r\n  border: 1px solid #32383e;\r\n  background-color: rgba(200, 200, 200, 0.05);\r\n  color: lightgray !important;\r\n}\r\n\r\ntd.description {\r\n  min-width: 400px;\r\n  width: 400px;\r\n  text-align: justify;\r\n  background-color: rgba(200, 200, 200, 0.05);\r\n  border: 1px solid #32383e;\r\n  color: lightgray !important;\r\n}\r\n"

/***/ }),

/***/ "./src/app/tables/row/row.component.html":
/*!***********************************************!*\
  !*** ./src/app/tables/row/row.component.html ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"d-flex justify-content-center\">\r\n  <tr (click)=\"onEditForm()\" *ngIf=\"rowFilterState\" main>\r\n    <td *ngFor=\"let cellValue of row.columnValueDtos\"\r\n        [ngClass]=\"(cellValue | valueOnKey).key == 'DE' ? 'description' : '' \">\r\n      {{(cellValue | valueOnKey).value.value }}\r\n    </td>\r\n    <td *ngIf=\"extendedTableView | async\">{{ row.id }}</td>\r\n    <td *ngIf=\"extendedTableView | async\" hidden>{{ row.name }}</td>\r\n    <td *ngIf=\"extendedTableView | async\">{{ row.createdBy}}</td>\r\n    <td *ngIf=\"extendedTableView | async\">{{ row.createdOn }}</td>\r\n    <td *ngIf=\"extendedTableView | async\">{{ row.lastModifiedBy }}</td>\r\n    <td *ngIf=\"extendedTableView | async\">{{ row.lastModifiedOn }}</td>\r\n    <td *ngIf=\"extendedTableView | async\">{{ row.taskDtos.length }}</td>\r\n  </tr>\r\n</div>\r\n"

/***/ }),

/***/ "./src/app/tables/row/row.component.ts":
/*!*********************************************!*\
  !*** ./src/app/tables/row/row.component.ts ***!
  \*********************************************/
/*! exports provided: RowComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RowComponent", function() { return RowComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _question_control_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./question-control.service */ "./src/app/tables/row/question-control.service.ts");
/* harmony import */ var _shared_table_model__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../shared/table.model */ "./src/app/shared/table.model.ts");
/* harmony import */ var _value_types_question_base_model__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./value-types/question-base.model */ "./src/app/tables/row/value-types/question-base.model.ts");
/* harmony import */ var _ngrx_store__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ngrx/store */ "./node_modules/@ngrx/store/@ngrx/store.es5.js");
/* harmony import */ var _shared_data_storage_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../shared/data-storage.service */ "./src/app/shared/data-storage.service.ts");
/* harmony import */ var _shared_store_table_tables_actions__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../shared/store/table/tables.actions */ "./src/app/shared/store/table/tables.actions.ts");
/* harmony import */ var _shared_filter_filter_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../shared/filter/filter.service */ "./src/app/shared/filter/filter.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









var RowComponent = /** @class */ (function () {
    function RowComponent(qcs, store, dss, filterService) {
        this.qcs = qcs;
        this.store = store;
        this.dss = dss;
        this.filterService = filterService;
        this.rowFilterState = true;
    }
    RowComponent_1 = RowComponent;
    RowComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.initForm();
        this.filter = this.store.select('tables', 'tableFilter');
        // this.editMode = this.store.select('tables', 'editRowMode');
        this.extendedTableView = this.store.select('tables', 'extendedTableView');
        this.filter.subscribe(function (filter) {
            if (filter !== '') {
                _this.rowFilterState = _this.filterService.runFilterTable(_this.row, filter);
            }
            else {
                _this.rowFilterState = true;
            }
        });
        this.extendedFilterContent = this.store.select('tables', 'extendedFilterContent');
    };
    RowComponent.prototype.initForm = function () {
        var _this = this;
        this.rowForm =
            new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormGroup"]({
                'id': new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"](this.row.id),
                'name': new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"](this.row.name),
                'createdBy': new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"](this.row.createdBy),
                'createdOn': new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"](this.row.createdOn),
                'lastModifiedBy': new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"](this.row.lastModifiedBy),
                'lastModifiedOn': new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"](this.row.lastModifiedOn),
                'columnValueDtos': new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormArray"]([])
            });
        this.row.columnValueDtos.forEach(function (cell) {
            _this.rowForm.get('columnValueDtos').push(_this.qcs.toFormGroup([new _value_types_question_base_model__WEBPACK_IMPORTED_MODULE_4__["Question"]({ key: Object.keys(cell), value: RowComponent_1.getMappedValue(cell) })]));
        });
    };
    RowComponent.prototype.onEditForm = function () {
        this.store.dispatch(new _shared_store_table_tables_actions__WEBPACK_IMPORTED_MODULE_7__["SetNewRowModeAction"](false));
        this.store.dispatch(new _shared_store_table_tables_actions__WEBPACK_IMPORTED_MODULE_7__["SetEditRowMode"](true));
        this.store.dispatch(new _shared_store_table_tables_actions__WEBPACK_IMPORTED_MODULE_7__["SetEditedRow"](this.row));
    };
    RowComponent.getMappedValue = function (object) {
        return object[Object.keys(object)[0]].value.toString();
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", _shared_table_model__WEBPACK_IMPORTED_MODULE_3__["RowContentModel"])
    ], RowComponent.prototype, "row", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", _shared_table_model__WEBPACK_IMPORTED_MODULE_3__["TableDefinitionModel"])
    ], RowComponent.prototype, "header", void 0);
    RowComponent = RowComponent_1 = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-row',
            template: __webpack_require__(/*! ./row.component.html */ "./src/app/tables/row/row.component.html"),
            styles: [__webpack_require__(/*! ./row.component.css */ "./src/app/tables/row/row.component.css")]
        }),
        __metadata("design:paramtypes", [_question_control_service__WEBPACK_IMPORTED_MODULE_2__["QuestionControlService"],
            _ngrx_store__WEBPACK_IMPORTED_MODULE_5__["Store"],
            _shared_data_storage_service__WEBPACK_IMPORTED_MODULE_6__["DataStorageService"],
            _shared_filter_filter_service__WEBPACK_IMPORTED_MODULE_8__["FilterService"]])
    ], RowComponent);
    return RowComponent;
    var RowComponent_1;
}());



/***/ }),

/***/ "./src/app/tables/row/value-types/question-base.model.ts":
/*!***************************************************************!*\
  !*** ./src/app/tables/row/value-types/question-base.model.ts ***!
  \***************************************************************/
/*! exports provided: QuestionBase, Question */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "QuestionBase", function() { return QuestionBase; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Question", function() { return Question; });
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var QuestionBase = /** @class */ (function () {
    function QuestionBase(options) {
        if (options === void 0) { options = {}; }
        this.value = options.value;
        this.key = options.key || '';
        this.label = options.label || '';
        this.required = !!options.required;
        this.order = options.order === undefined ? 1 : options.order;
        this.controlType = options.controlType || '';
    }
    return QuestionBase;
}());

var Question = /** @class */ (function (_super) {
    __extends(Question, _super);
    function Question(options) {
        if (options === void 0) { options = {}; }
        var _this = _super.call(this, options) || this;
        _this.controlType = 'textbox';
        _this.type = options['type'] || '';
        return _this;
    }
    return Question;
}(QuestionBase));



/***/ }),

/***/ "./src/app/tables/table-header/table-header.component.css":
/*!****************************************************************!*\
  !*** ./src/app/tables/table-header/table-header.component.css ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "td {\r\n  min-width: 200px;\r\n  width: 200px;\r\n  border: 1px solid #083E46;\r\n}\r\n\r\ntd.description {\r\n  min-width: 400px;\r\n  width: 400px;\r\n}\r\n\r\ntr {\r\n  border: 1px solid #083E46;\r\n}\r\n\r\n.form-control {\r\n  background-color: rgba(200,200,200,0.05);\r\n  border: none;\r\n  color: gray !important;\r\n}\r\n"

/***/ }),

/***/ "./src/app/tables/table-header/table-header.component.html":
/*!*****************************************************************!*\
  !*** ./src/app/tables/table-header/table-header.component.html ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"d-flex justify-content-center\">\r\n  <tr *ngIf=\"(header| async) && !(extendedFilterMode |async)\">\r\n    <td *ngFor=\"let column of (header| async)[0]?.columnDetailDefinitionDtoList; let i = index\"\r\n        [ngClass]=\"column.type== 'DE' ? 'description' : '' \"\r\n        style=\"border-top: 1px solid #083E46\">\r\n      <div class=\"d-flex justify-content-between\">\r\n        <span class=\"text-info\">{{column.name }}</span>\r\n        <button class=\"btn btn-outline-info\" (click)=\"sort({name:'column', index: i, dataType: column.type, asc: !sortContent.asc})\">\r\n          <i class=\"text-info fas fa-arrows-alt-v\"></i>\r\n        </button>\r\n      </div>\r\n\r\n    </td>\r\n    <div *ngIf=\"extendedTableView | async\">\r\n      <td>\r\n        <div class=\"d-flex justify-content-between\">\r\n          <span class=\"text-info\">ID</span>\r\n          <button class=\"btn btn-outline-info\"\r\n                  (click)=\"sort({name:'id', index: 0, dataType: 'IN', asc: !sortContent.asc })\">\r\n            <i class=\"text-info fas fa-arrows-alt-v\"></i>\r\n          </button>\r\n        </div>\r\n      </td>\r\n      <td hidden>\r\n        <div class=\"d-flex justify-content-between\"></div>\r\n        <span class=\"text-info\">NAME</span>\r\n        <button class=\"btn btn-outline-info\" (click)=\"sort({name:'name', index: 0, dataType: 'ST', asc: !sortContent.asc})\">\r\n          <i class=\"text-info fas fa-arrows-alt-v\"></i>\r\n        </button>\r\n      </td>\r\n      <td>\r\n        <div class=\"d-flex justify-content-between\">\r\n          <span class=\"text-info\">Created by</span>\r\n          <button class=\"btn btn-outline-info\" (click)=\"sort({name:'createdBy', index: 0,  dataType: 'ST', asc: !sortContent.asc})\">\r\n            <i class=\"text-info fas fa-arrows-alt-v\"></i>\r\n          </button>\r\n        </div>\r\n      </td>\r\n      <td>\r\n        <div class=\"d-flex justify-content-between\">\r\n          <span class=\"text-info\">Created on</span>\r\n          <button class=\"btn btn-outline-info\" (click)=\"sort({name:'createdOn', index: 0,  dataType: 'DT', asc: !sortContent.asc})\">\r\n            <i class=\"text-info fas fa-arrows-alt-v\"></i>\r\n          </button>\r\n        </div>\r\n      </td>\r\n      <td>\r\n        <div class=\"d-flex justify-content-between\">\r\n          <span class=\"text-info\">Last Modified By</span>\r\n          <button class=\"btn btn-outline-info\" (click)=\"sort({name:'lastModifiedBy', index: 0,  dataType: 'ST', asc: !sortContent.asc})\">\r\n            <i class=\"text-info fas fa-arrows-alt-v\"></i>\r\n          </button>\r\n        </div>\r\n      </td>\r\n      <td>\r\n        <div class=\"d-flex justify-content-between\">\r\n          <span class=\"text-info\">Last Modified On</span>\r\n          <button class=\"btn btn-outline-info\" (click)=\"sort({name:'lastModifiedOn', index: 0,  dataType: 'DT', asc: !sortContent.asc})\">\r\n            <i class=\"text-info fas fa-arrows-alt-v\"></i>\r\n          </button>\r\n        </div>\r\n      </td>\r\n      <td>\r\n        <div class=\"d-flex justify-content-between\">\r\n          <span class=\"text-info\">Tasks</span>\r\n          <button class=\"btn btn-outline-info\" (click)=\"sort({name:'taskDtos', index: 0,  dataType: 'IN', asc: !sortContent.asc})\">\r\n            <i class=\"text-info fas fa-arrows-alt-v\"></i>\r\n          </button>\r\n        </div>\r\n      </td>\r\n    </div>\r\n  </tr>\r\n  <form *ngIf=\"extendedFilterMode |async\" [formGroup]=\"filterForm\">\r\n    <tr>\r\n    <span formArrayName=\"columnValueDtos\">\r\n      <td *ngFor=\"let column of (header| async)[0]?.columnDetailDefinitionDtoList; let i = index\" formGroupName=\"{{i}}\"\r\n          [ngClass]=\"column.type== 'DE' ? 'description' : '' \"\r\n      >\r\n        <input class=\"form-control mr-sm-2\" type=\"text\" placeholder=\"{{ column.name }}\" formControlName=\"value\"\r\n               (keyup)=\"onRunExtendedFilter()\">\r\n      </td>\r\n    </span>\r\n      <td><input class=\"form-control mr-sm-2\" type=\"text\" placeholder=\"ID\" formControlName=\"id\"\r\n                 (keyup)=\"onRunExtendedFilter()\"></td>\r\n      <td hidden><input class=\"form-control mr-sm-2\" type=\"text\" placeholder=\"NAME\" formControlName=\"name\"\r\n                        (keyup)=\"onRunExtendedFilter()\"></td>\r\n      <td><input class=\"form-control mr-sm-2\" type=\"text\" placeholder=\"Created by\" formControlName=\"createdBy\"\r\n                 (keyup)=\"onRunExtendedFilter()\"></td>\r\n      <td><input class=\"form-control mr-sm-2\" type=\"text\" placeholder=\"Created on\" formControlName=\"createdOn\"\r\n                 (keyup)=\"onRunExtendedFilter()\"></td>\r\n      <td><input class=\"form-control mr-sm-2\" type=\"text\" placeholder=\"Last Modified By\" formControlName=\"lastModifiedBy\"\r\n                 (keyup)=\"onRunExtendedFilter()\"></td>\r\n      <td><input class=\"form-control mr-sm-2\" type=\"text\" placeholder=\"Last Modified On\" formControlName=\"lastModifiedOn\"\r\n                 (keyup)=\"onRunExtendedFilter()\"></td>\r\n      <td><input class=\"form-control mr-sm-2\" type=\"text\" placeholder=\"Tasks\" formControlName=\"taskDtos\"\r\n                 (keyup)=\"onRunExtendedFilter()\"></td>\r\n    </tr>\r\n  </form>\r\n</div>\r\n"

/***/ }),

/***/ "./src/app/tables/table-header/table-header.component.ts":
/*!***************************************************************!*\
  !*** ./src/app/tables/table-header/table-header.component.ts ***!
  \***************************************************************/
/*! exports provided: TableHeaderComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TableHeaderComponent", function() { return TableHeaderComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _ngrx_store__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ngrx/store */ "./node_modules/@ngrx/store/@ngrx/store.es5.js");
/* harmony import */ var _shared_store_table_tables_actions__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../shared/store/table/tables.actions */ "./src/app/shared/store/table/tables.actions.ts");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var TableHeaderComponent = /** @class */ (function () {
    function TableHeaderComponent(contentStore) {
        this.contentStore = contentStore;
    }
    TableHeaderComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.contentStore.select('tables', 'sortContent').subscribe(function (sortContent) {
            _this.sortContent = sortContent;
        });
        this.extendedTableView = this.contentStore.select('tables', 'extendedTableView');
        this.header = this.contentStore.select('tables', 'tableDefinition');
        this.editRowMode = this.contentStore.select('tables', 'editRowMode');
        this.extendedFilterMode = this.contentStore.select('tables', 'extendedFilterMode');
        this.extendedFilterMode.subscribe(function (mode) {
            if (mode) {
                _this.header.forEach(function (header) {
                    if (header) {
                        _this.setForm(header);
                    }
                });
            }
            else {
                _this.filterForm = null;
            }
        });
    };
    TableHeaderComponent.prototype.setForm = function (header) {
        var _this = this;
        this.filterForm = new _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormGroup"]({
            'id': new _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormControl"](),
            'name': new _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormControl"](),
            'createdBy': new _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormControl"](),
            'createdOn': new _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormControl"](),
            'lastModifiedBy': new _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormControl"](),
            'lastModifiedOn': new _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormControl"](),
            'columnValueDtos': new _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormArray"]([]),
            'taskDtos': new _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormControl"]()
        });
        header[0].columnDetailDefinitionDtoList.forEach(function () {
            _this.filterForm.get('columnValueDtos').push(new _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormGroup"]({
                'value': new _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormControl"]()
            }));
        });
    };
    // onNewRow() { // TODO remove?
    //   this.contentStore.dispatch(new TablesActions.SetEditRowMode(true));
    // }
    TableHeaderComponent.prototype.getFormValues = function () {
        return this.filterForm['value'];
    };
    TableHeaderComponent.prototype.onRunExtendedFilter = function () {
        this.contentStore.dispatch(new _shared_store_table_tables_actions__WEBPACK_IMPORTED_MODULE_2__["SetExtendedFilter"](this.getFormValues()));
    };
    TableHeaderComponent.prototype.sort = function (payload) {
        this.contentStore.dispatch(new _shared_store_table_tables_actions__WEBPACK_IMPORTED_MODULE_2__["SetSortContent"](payload));
    };
    TableHeaderComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-table-header',
            template: __webpack_require__(/*! ./table-header.component.html */ "./src/app/tables/table-header/table-header.component.html"),
            styles: [__webpack_require__(/*! ./table-header.component.css */ "./src/app/tables/table-header/table-header.component.css")]
        }),
        __metadata("design:paramtypes", [_ngrx_store__WEBPACK_IMPORTED_MODULE_1__["Store"]])
    ], TableHeaderComponent);
    return TableHeaderComponent;
}());



/***/ }),

/***/ "./src/app/tables/tables.component.css":
/*!*********************************************!*\
  !*** ./src/app/tables/tables.component.css ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".header-fixed {\r\n  width: 100%\r\n}\r\n\r\n.header-fixed > thead,\r\n.header-fixed > tbody,\r\n.header-fixed > thead > tr,\r\n.header-fixed > tbody > tr,\r\n.header-fixed > thead > tr > th,\r\n.header-fixed > tbody > tr > td {\r\n  display: block;\r\n}\r\n\r\n.header-fixed > tbody > tr:after,\r\n.header-fixed > thead > tr:after {\r\n  content: ' ';\r\n  display: block;\r\n  visibility: hidden;\r\n  clear: both;\r\n}\r\n\r\n.header-fixed > tbody {\r\n  overflow: hidden;\r\n  overflow-y: auto;\r\n  height: 75vh;\r\n}\r\n\r\n.header-fixed > tbody > tr > td,\r\n.header-fixed > thead > tr > th {\r\n  width: 20%;\r\n  float: left;\r\n}\r\n\r\n/* width */\r\n\r\n::-webkit-scrollbar {\r\n  width: 20px;\r\n}\r\n\r\n/* Track */\r\n\r\n::-webkit-scrollbar-track {\r\n  border-radius: 10px;\r\n}\r\n\r\n/* Handle */\r\n\r\n::-webkit-scrollbar-thumb {\r\n  background: grey;\r\n  border-radius: 10px;\r\n}\r\n\r\n/* Handle on hover */\r\n\r\n::-webkit-scrollbar-thumb:hover {\r\n  background: darkgrey;\r\n}\r\n\r\ntbody {\r\n  max-height: 700px;\r\n  height: auto;\r\n}\r\n\r\ntable {\r\n  margin-top: 10px;\r\n}\r\n"

/***/ }),

/***/ "./src/app/tables/tables.component.html":
/*!**********************************************!*\
  !*** ./src/app/tables/tables.component.html ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"row\" style=\"margin: 0 10px;padding: 0;\">\r\n  <div [ngClass]=\"(tableState | async).editRowMode ? ((taskDetailsMode | async) ? 'col-12 col-md-6 col-lg-4' : 'col-12 col-md-6 col-lg-4') : 'd-none'\"\r\n       style=\"margin: 41px 0\">\r\n    <app-row-details *ngIf=\"(tableState | async).editRowMode\"></app-row-details>\r\n  </div>\r\n  <div [ngClass]=\"(taskDetailsMode | async) ? 'col-12 col-md-6 col-lg-4' : 'd-none'\" style=\"margin: 41px 0\">\r\n    <app-task></app-task>\r\n  </div>\r\n  <div [ngClass]=\"(tableState | async).editRowMode ?\r\n                        ((taskDetailsMode | async) ? 'col-lg-4' : 'col-md-6 col-lg-8')\r\n                        : ('col-12')\" style=\"padding: 0\"\r\n  >\r\n\r\n\r\n    <div class=\"panel\">\r\n      {{showSpinner | json}}\r\n      <app-menu *ngIf=\"(tableState | async).tablesNames.length != 0\"\r\n                [tableNames]=\"(tableState | async).tablesNames\"\r\n                (choosenNameChanged)=\"setTable($event)\"></app-menu>\r\n      <div class=\"panel-body\" style=\"padding: 0\">\r\n\r\n        <div *ngIf=\"tableChosen && !showSpinner\">\r\n          <div class=\"table-responsive\" style=\"border-radius: 10px\">\r\n            <table\r\n              class=\"table table-hover header-fixed table-striped\"\r\n              style=\"margin-bottom: 0\"\r\n            >\r\n              <thead>\r\n                <app-table-header></app-table-header>\r\n              </thead>\r\n              <tbody style=\"max-height: 700px; height: auto; background-color: transparent\">\r\n                <app-row\r\n                  *ngFor=\"let row of ((tableState | async).tableContent)  | extendedFilter: extendedFilterContent : filterSelect | orderBy : sortContentValue\"\r\n                  [row]=\"row\"\r\n                  [header]=\"(tableState|async).tableDefinition\">\r\n                </app-row>\r\n              </tbody>\r\n            </table>\r\n          </div>\r\n        </div>\r\n        <app-spinner *ngIf=\"tableChosen && showSpinner\"></app-spinner>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>\r\n"

/***/ }),

/***/ "./src/app/tables/tables.component.ts":
/*!********************************************!*\
  !*** ./src/app/tables/tables.component.ts ***!
  \********************************************/
/*! exports provided: TablesComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TablesComponent", function() { return TablesComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _ngrx_store__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ngrx/store */ "./node_modules/@ngrx/store/@ngrx/store.es5.js");
/* harmony import */ var _shared_data_storage_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../shared/data-storage.service */ "./src/app/shared/data-storage.service.ts");
/* harmony import */ var _shared_store_table_tables_actions__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../shared/store/table/tables.actions */ "./src/app/shared/store/table/tables.actions.ts");
/* harmony import */ var _shared_store_user_users_actions__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../shared/store/user/users.actions */ "./src/app/shared/store/user/users.actions.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var TablesComponent = /** @class */ (function () {
    function TablesComponent(contentStore, dss) {
        this.contentStore = contentStore;
        this.dss = dss;
        this.tableChosen = false;
        this.showSpinner = true;
    }
    TablesComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.dss.getTableNames();
        this.tableState = this.contentStore.select('tables');
        this.tableState.subscribe(function () {
            _this.showSpinner = false;
        });
        this.taskDetailsMode = this.contentStore.select('tasks', 'taskDetailsMode');
        this.contentStore.select('tables', 'extendedFilterContent').subscribe(function (extendedFilterContent) {
            _this.extendedFilterContent = extendedFilterContent;
        });
        this.contentStore.select('tables', 'filterSelect').subscribe(function (filterSelect) {
            _this.filterSelect = filterSelect;
        });
        this.sortContent = this.contentStore.select('tables', 'sortContent');
        this.sortContent.subscribe(function (sortContent) {
            _this.sortContentValue = sortContent;
        });
    };
    // onToggleRowEditMode() {
    //   this.contentStore.dispatch(new TablesActions.SetEditRowMode(false));
    // }
    TablesComponent.prototype.setTable = function (tableName) {
        this.showSpinner = true;
        this.contentStore.dispatch(new _shared_store_table_tables_actions__WEBPACK_IMPORTED_MODULE_3__["SwitchTableReset"]());
        this.contentStore.dispatch(new _shared_store_user_users_actions__WEBPACK_IMPORTED_MODULE_4__["SwitchTableReset"]());
        this.dss.getTableHeaderByName(tableName);
        this.dss.getTableRowsByName(tableName);
        this.tableChosen = true;
    };
    TablesComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-tables',
            template: __webpack_require__(/*! ./tables.component.html */ "./src/app/tables/tables.component.html"),
            styles: [__webpack_require__(/*! ./tables.component.css */ "./src/app/tables/tables.component.css")]
        }),
        __metadata("design:paramtypes", [_ngrx_store__WEBPACK_IMPORTED_MODULE_1__["Store"],
            _shared_data_storage_service__WEBPACK_IMPORTED_MODULE_2__["DataStorageService"]])
    ], TablesComponent);
    return TablesComponent;
}());



/***/ }),

/***/ "./src/app/tables/task/task.component.css":
/*!************************************************!*\
  !*** ./src/app/tables/task/task.component.css ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".form-control {\r\n  background-color: rgba(200,200,200,0.05);\r\n  border: none;\r\n  color: gray !important;\r\n}\r\n\r\nli, .list-group-item {\r\n  border: 1px solid #32383e;\r\n  background-color: rgba(200, 200, 200, 0.05);\r\n  color: gray !important;\r\n}\r\n"

/***/ }),

/***/ "./src/app/tables/task/task.component.html":
/*!*************************************************!*\
  !*** ./src/app/tables/task/task.component.html ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div *ngIf=\"(showedTask | async)\">\r\n  <ul class=\"list-group\">\r\n    <li class=\"list-group-item text-white text-center\" style=\"background-color: rgba(0,0,0,0.05);\">\r\n      <button class=\"btn btn-outline-secondary\" (click)=\"onHideTaskDetails()\">Hide Details</button>\r\n    </li>\r\n    <li class=\"list-group-item\">\r\n      <div class=\"list-group-item d-flex justify-content-between\">\r\n        <span class=\"text-info\">ID: </span>\r\n        <span>{{(showedTask | async)?.id}}</span>\r\n      </div>\r\n    </li>\r\n    <li class=\"list-group-item\">\r\n      <div class=\"list-group-item d-flex justify-content-between\">\r\n        <span class=\"text-info\">Name:</span>\r\n        <span>{{ (showedTask | async)?.name}}</span>\r\n      </div>\r\n    </li>\r\n    <li class=\"list-group-item\">\r\n      <div class=\"list-group-item d-flex justify-content-between\">\r\n        <span class=\"text-info\">Description:</span>\r\n        <span>{{ (showedTask | async)?.description }}</span>\r\n      </div>\r\n    </li>\r\n    <li class=\"list-group-item\">\r\n      <div class=\"list-group-item d-flex justify-content-between\">\r\n        <span class=\"text-info\">Status:</span>\r\n        <span>{{(showedTask | async)?.status}}</span>\r\n      </div>\r\n    </li>\r\n    <li class=\"list-group-item text-white text-center\" style=\"background-color: rgba(0,0,0,0.05);\">\r\n      <form class=\"form-group\">\r\n        <div class=\"form-group d-flex justify-content-between align-items-center\" style=\"margin-top: 5px\">\r\n          <div class=\"input-group\">\r\n            <select #userContol class=\"form-control\">\r\n              <option>{{(tableUsers| async).length != 0 ? 'Assign user' : 'No available users to assign'}}</option>\r\n              <option *ngFor=\"let tableUser of (tableUsers| async)\"> {{ tableUser }}</option>\r\n            </select>\r\n            <div class=\"input-group-append\" *ngIf=\"(tableUsers| async).length != 0\">\r\n              <button class=\"btn btn-outline-secondary\" (click)=\"onAssignUserToTask(userContol.value)\">+</button>\r\n              <button class=\"btn btn-outline-secondary\" (click)=\"onRemoveUserFromTask(userContol.value)\">-</button>\r\n            </div>\r\n          </div>\r\n        </div>\r\n      </form>\r\n    </li>\r\n    <li class=\"list-group-item text-white text-center\" style=\"background-color: rgba(0,0,0,0.05);\"><p\r\n      style=\"margin-bottom: 3px\">{{ (showedTask | async)?.userNames.length <= 0 ? 'No assigned users' : 'Assigned\r\n      Users:'}}</p></li>\r\n    <li class=\"list-group-item\" *ngFor=\" let username of (showedTask | async)?.userNames\">\r\n      <span class=\"text-info\">{{username}}</span>\r\n    </li>\r\n    <li class=\"list-group-item text-white text-center\" style=\"background-color: rgba(0,0,0,0.05);\">\r\n      {{ (showedTask | async)?.taskDtos.length <= 0 ? 'No tasks' : 'Assigned Tasks:'}}\r\n    </li>\r\n    <li class=\"list-group-item\" *ngFor=\"let taskDto of (showedTask | async)?.taskDtos\">\r\n      <!--<app-task></app-task>-->\r\n    </li>\r\n  </ul>\r\n</div>\r\n\r\n<div *ngIf=\"(showedTask | async) == null\">\r\n  <form>\r\n    <div class=\"form-group\">\r\n      <label class=\"text-info\">Name:</label>\r\n      <input class=\"form-control\" type=\"text\" #nameEl>\r\n    </div>\r\n    <div class=\"form-group\">\r\n      <label class=\"text-info\">Description:</label>\r\n      <textarea rows=\"20\" class=\"form-control\" #descriptionEl></textarea>\r\n    </div>\r\n    <div class=\"form-group\">\r\n      <label class=\"text-info\">Status:</label>\r\n      <select class=\"form-control\" #statusEl>\r\n        <option> {{status[0]}}</option>\r\n        <option> {{status[1]}}</option>\r\n        <option> {{status[2]}}</option>\r\n        <option> {{status[3]}}</option>\r\n      </select>\r\n    </div>\r\n    <div class=\"form-group\">\r\n      <button class=\"btn btn-dark text-white\"\r\n              (click)=\"onSaveRowNewTask({name: nameEl.value,description: descriptionEl.value,status: statusEl.value})\">\r\n        Submit\r\n      </button>\r\n      <button class=\"btn btn-dark text-white\" (click)=\"onHideTaskDetails()\">Abort</button>\r\n    </div>\r\n  </form>\r\n</div>\r\n"

/***/ }),

/***/ "./src/app/tables/task/task.component.ts":
/*!***********************************************!*\
  !*** ./src/app/tables/task/task.component.ts ***!
  \***********************************************/
/*! exports provided: TaskComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TaskComponent", function() { return TaskComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _shared_table_model__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../shared/table.model */ "./src/app/shared/table.model.ts");
/* harmony import */ var _ngrx_store__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ngrx/store */ "./node_modules/@ngrx/store/@ngrx/store.es5.js");
/* harmony import */ var _shared_store_task_tasks_actions__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../shared/store/task/tasks.actions */ "./src/app/shared/store/task/tasks.actions.ts");
/* harmony import */ var _shared_data_storage_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../shared/data-storage.service */ "./src/app/shared/data-storage.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var TaskComponent = /** @class */ (function () {
    function TaskComponent(store, dss) {
        this.store = store;
        this.dss = dss;
        // showedInnerTask: Observable<TaskModel>;
        this.status = _shared_table_model__WEBPACK_IMPORTED_MODULE_1__["Status"];
    }
    TaskComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.showedTask = this.store.select('tasks', 'showedTask');
        this.showedTask.forEach(function (task) {
            _this.task = task;
        });
        this.editedRow = this.store.select('tables', 'editedRow');
        this.editedRow.forEach(function (row) {
            _this.row = row;
        });
        this.tableDefinition = this.store.select('tables', 'tableDefinition');
        this.tableDefinition.subscribe(function (tableDefinition) {
            // console.log( 'setTableUsers');
            // console.log(tableDefinition);
            if (tableDefinition) {
                _this.tableName = tableDefinition[0].name;
                _this.dss.setTableUsers(_this.tableName);
            }
        });
        this.tableUsers = this.store.select('tables', 'tableUsers');
    };
    TaskComponent.prototype.onHideTaskDetails = function () {
        this.store.dispatch(new _shared_store_task_tasks_actions__WEBPACK_IMPORTED_MODULE_3__["SetTaskDetailsModeAction"](false));
        this.store.dispatch(new _shared_store_task_tasks_actions__WEBPACK_IMPORTED_MODULE_3__["SetShowedTaskAction"](null));
    };
    TaskComponent.prototype.onSaveRowNewTask = function (newTaskDetails) {
        var task = {
            id: null,
            name: newTaskDetails.name,
            description: newTaskDetails.description,
            status: newTaskDetails.status,
            userNames: [],
            taskDtos: []
        };
        this.dss.saveNewTask(this.tableName, task, this.row.id);
    };
    TaskComponent.prototype.onAssignUserToTask = function (username) {
        console.log('onAssignUserToTask username >' + username + '<');
        this.dss.onAssignUserToTask(this.tableName, this.row.id, this.task.id, username);
    };
    TaskComponent.prototype.onRemoveUserFromTask = function (username) {
        this.dss.onRemoveUserFromTask(this.tableName, this.row.id, this.task.id, username);
    };
    TaskComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-task',
            template: __webpack_require__(/*! ./task.component.html */ "./src/app/tables/task/task.component.html"),
            styles: [__webpack_require__(/*! ./task.component.css */ "./src/app/tables/task/task.component.css")]
        }),
        __metadata("design:paramtypes", [_ngrx_store__WEBPACK_IMPORTED_MODULE_2__["Store"],
            _shared_data_storage_service__WEBPACK_IMPORTED_MODULE_4__["DataStorageService"]])
    ], TaskComponent);
    return TaskComponent;
}());



/***/ }),

/***/ "./src/app/training/dialog/dialog.component.css":
/*!******************************************************!*\
  !*** ./src/app/training/dialog/dialog.component.css ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/training/dialog/dialog.component.html":
/*!*******************************************************!*\
  !*** ./src/app/training/dialog/dialog.component.html ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<h1 mat-dialog-title style=\"text-align: center\">{{passedData?.message || 'Are you sure?'}}</h1>\r\n<mat-dialog-actions>\r\n  <button mat-button [mat-dialog-close]=\"true\">Yes</button>\r\n  <button mat-button [mat-dialog-close]=\"false\">No</button>\r\n</mat-dialog-actions>\r\n"

/***/ }),

/***/ "./src/app/training/dialog/dialog.component.ts":
/*!*****************************************************!*\
  !*** ./src/app/training/dialog/dialog.component.ts ***!
  \*****************************************************/
/*! exports provided: DialogComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DialogComponent", function() { return DialogComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (undefined && undefined.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};


var DialogComponent = /** @class */ (function () {
    function DialogComponent(passedData) {
        this.passedData = passedData;
    }
    DialogComponent.prototype.ngOnInit = function () {
    };
    DialogComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-dialog',
            template: __webpack_require__(/*! ./dialog.component.html */ "./src/app/training/dialog/dialog.component.html"),
            styles: [__webpack_require__(/*! ./dialog.component.css */ "./src/app/training/dialog/dialog.component.css")]
        }),
        __param(0, Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Inject"])(_angular_material__WEBPACK_IMPORTED_MODULE_1__["MAT_DIALOG_DATA"])),
        __metadata("design:paramtypes", [Object])
    ], DialogComponent);
    return DialogComponent;
}());



/***/ }),

/***/ "./src/app/training/snack-bar/snack-bar.component.ts":
/*!***********************************************************!*\
  !*** ./src/app/training/snack-bar/snack-bar.component.ts ***!
  \***********************************************************/
/*! exports provided: SnackBarComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SnackBarComponent", function() { return SnackBarComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (undefined && undefined.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};


var SnackBarComponent = /** @class */ (function () {
    function SnackBarComponent(data) {
        this.data = data;
        this.message = data.message;
        this.action = data.action;
    }
    SnackBarComponent.prototype.dismiss = function () {
        this.ref.dismiss();
    };
    SnackBarComponent.prototype.dismissWithAction = function () {
        this.ref.dismissWithAction();
    };
    SnackBarComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-snack-bar',
            template: "\n    <section class=\"form\"\n             fxLayout\n             fxLayoutAlign=\"center\">\n      <mat-card fxFlex.xs=\"100%\" fxFlex=\"100%\">\n        <mat-card-title fxLayoutAlign=\"center\">{{message || 'What!!!'}}</mat-card-title>\n        <mat-card-content fxLayoutAlign=\"center\">\n          <button mat-button color=\"primary\" (click)=\"dismiss()\">{{action || 'Dismiss'}}</button>\n          <button mat-button color=\"primary\" (click)=\"dismissWithAction()\">{{action || 'Dismiss '}} with action</button>\n        </mat-card-content>\n      </mat-card>\n    </section>\n  ",
            styles: ["\n    ::ng-deep .styled-snack {\n      padding: 0;\n      margin: 0;\n    }\n  "],
        }),
        __param(0, Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Inject"])(_angular_material__WEBPACK_IMPORTED_MODULE_1__["MAT_SNACK_BAR_DATA"])),
        __metadata("design:paramtypes", [Object])
    ], SnackBarComponent);
    return SnackBarComponent;
}());



/***/ }),

/***/ "./src/app/training/table/table.component.css":
/*!****************************************************!*\
  !*** ./src/app/training/table/table.component.css ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/training/table/table.component.html":
/*!*****************************************************!*\
  !*** ./src/app/training/table/table.component.html ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div fxLayoutAlign=\"center center\">\r\n  <mat-form-field fxFlex=\"100%\">\r\n    <input matInput type=\"text\" (keyup)=\"doFilter($event.target.value)\" placeholder=\"Filter\">\r\n  </mat-form-field>\r\n</div>\r\n<mat-table [dataSource]=\"dataSource\" matSort>\r\n  <ng-container matColumnDef=\"date\" >\r\n    <mat-header-cell *matHeaderCellDef mat-sort-header>Date</mat-header-cell>\r\n    <mat-cell *matCellDef=\"let element\">{{element.date | date}}</mat-cell>\r\n  </ng-container>\r\n\r\n  <ng-container matColumnDef=\"name\">\r\n    <mat-header-cell *matHeaderCellDef mat-sort-header>Name</mat-header-cell>\r\n    <mat-cell *matCellDef=\"let element\">{{element.name}}</mat-cell>\r\n  </ng-container>\r\n\r\n  <ng-container matColumnDef=\"number\">\r\n    <mat-header-cell *matHeaderCellDef mat-sort-header>Number</mat-header-cell>\r\n    <mat-cell *matCellDef=\"let element\">{{element.number | number}}</mat-cell>\r\n  </ng-container>\r\n\r\n  <mat-header-row *matHeaderRowDef=\"displayedColumns\"></mat-header-row>\r\n  <mat-row *matRowDef=\"let row; columns: displayedColumns\"></mat-row>\r\n</mat-table>\r\n\r\n<mat-paginator #paginator [pageSize]=\"1\" [pageSizeOptions]=\"[5,10,20]\">\r\n</mat-paginator>\r\n"

/***/ }),

/***/ "./src/app/training/table/table.component.ts":
/*!***************************************************!*\
  !*** ./src/app/training/table/table.component.ts ***!
  \***************************************************/
/*! exports provided: TableComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TableComponent", function() { return TableComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var TableComponent = /** @class */ (function () {
    function TableComponent() {
        this.displayedColumns = ['date', 'name', 'number'];
        this.dataSource = new _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatTableDataSource"]();
    }
    TableComponent.prototype.ngOnInit = function () {
        this.dataSource.data = [
            { date: new Date(), name: '1', number: 5 },
            { date: new Date(), name: '2', number: 2 },
            { date: new Date(), name: '4', number: 3 },
            { date: new Date(), name: '3', number: 4 },
            { date: new Date(), name: '5', number: 1 },
            { date: new Date(), name: '1', number: 5 },
            { date: new Date(), name: '2', number: 2 },
            { date: new Date(), name: '4', number: 3 },
            { date: new Date(), name: '3', number: 4 },
            { date: new Date(), name: '5', number: 1 },
            { date: new Date(), name: '1', number: 5 },
            { date: new Date(), name: '2', number: 2 },
            { date: new Date(), name: '4', number: 3 },
            { date: new Date(), name: '3', number: 4 },
            { date: new Date(), name: '5', number: 1 },
            { date: new Date(), name: '1', number: 5 },
            { date: new Date(), name: '2', number: 2 },
            { date: new Date(), name: '4', number: 3 },
            { date: new Date(), name: '3', number: 4 },
            { date: new Date(), name: '5', number: 1 }
        ];
    };
    TableComponent.prototype.ngAfterViewInit = function () {
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
    };
    TableComponent.prototype.doFilter = function (filterValue) {
        this.dataSource.filter = filterValue.trim().toLowerCase();
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])(_angular_material__WEBPACK_IMPORTED_MODULE_1__["MatSort"]),
        __metadata("design:type", _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatSort"])
    ], TableComponent.prototype, "sort", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])(_angular_material__WEBPACK_IMPORTED_MODULE_1__["MatPaginator"]),
        __metadata("design:type", _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatPaginator"])
    ], TableComponent.prototype, "paginator", void 0);
    TableComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-table',
            template: __webpack_require__(/*! ./table.component.html */ "./src/app/training/table/table.component.html"),
            styles: [__webpack_require__(/*! ./table.component.css */ "./src/app/training/table/table.component.css")]
        }),
        __metadata("design:paramtypes", [])
    ], TableComponent);
    return TableComponent;
}());



/***/ }),

/***/ "./src/app/training/training.component.css":
/*!*************************************************!*\
  !*** ./src/app/training/training.component.css ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "/*mat-form-field {*/\r\n  /*width: 400px;*/\r\n  /*}*/\r\n  mat-sidenav-container, mat-sidenav-container, mat-sidenav {\r\n  height: 100%;\r\n}\r\n  mat-sidenav {\r\n  width: 250px;\r\n}\r\n  a {\r\n  text-decoration: none;\r\n  color: white;\r\n}\r\n  a:hover,\r\na:active {\r\n  color: lightgray;\r\n}\r\n  .navigation-items {\r\n  list-style: none;\r\n  padding: 0;\r\n  margin: 0;\r\n}\r\n  .nav-caption {\r\n  display: inline-block;\r\n  padding-left: 6px;\r\n}\r\n  section {\r\n  padding: 10px;\r\n}\r\n"

/***/ }),

/***/ "./src/app/training/training.component.html":
/*!**************************************************!*\
  !*** ./src/app/training/training.component.html ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div [ngClass]=\"theme ? 'my-themed':'candy-themed'\">\r\n  <mat-sidenav-container>\r\n    <mat-sidenav #sidenav role=\"navigation\">\r\n      <mat-nav-list>\r\n        <a mat-list-item (click)=\"sidenav.close()\">\r\n          <mat-icon>face</mat-icon>\r\n          <span class=\"nav-caption\">Sign up</span></a>\r\n        <a mat-list-item routerLink=\"\" (click)=\"sidenav.close()\">\r\n          <mat-icon>person pin</mat-icon>\r\n          <span class=\"nav-caption\">Login</span></a>\r\n        <a mat-list-item routerLink=\"\" (click)=\"sidenav.close()\">\r\n          <mat-icon>adb</mat-icon>\r\n          <span class=\"nav-caption\">Training</span></a>\r\n      </mat-nav-list>\r\n    </mat-sidenav>\r\n    <mat-sidenav-content>\r\n      <mat-toolbar color=\"primary\">\r\n        <div>\r\n          <button mat-icon-button (click)=\"sidenav.toggle()\">\r\n            <mat-icon>menu</mat-icon>\r\n          </button>\r\n        </div>\r\n        <div><a routerLink=\"/\">MY JIRA</a></div>\r\n        <div fxFlex\r\n             fxLayout\r\n             fxLayoutAlign=\"flex-end\" fxHide.xs>\r\n          <ul fxLayout fxLayoutGap=\"10px\" class=\"navigation-items\">\r\n            <li (click)=\"toggleTheme()\">Change color</li>\r\n            <li><a routerLink=\"\">SignUp</a></li>\r\n            <li><a routerLink=\"\">Login</a></li>\r\n            <li><a routerLink=\"\">Training</a></li>\r\n          </ul>\r\n        </div>\r\n      </mat-toolbar>\r\n      <main>\r\n        <section class=\"new-card\"\r\n                 fxLayout\r\n                 fxLayoutAlign=\"center\">\r\n          <mat-card fxFlex.xs=\"100%\" fxFlex=\"50%\">\r\n            <mat-card-title fxLayoutAlign=\"center\">Main</mat-card-title>\r\n            <mat-card-content fxLayoutAlign=\"center\">\r\n              <mat-form-field>\r\n                <mat-select placeholder=\"Abc\">\r\n                  <mat-option value=\"a\">A</mat-option>\r\n                  <mat-option value=\"c\">C</mat-option>\r\n                  <mat-option value=\"a\">B</mat-option>\r\n                </mat-select>\r\n              </mat-form-field>\r\n            </mat-card-content>\r\n            <mat-card-actions fxLayoutAlign=\"center\">\r\n              <button type=\"submit\" mat-button (click)=\"sidenav.toggle()\" color=\"accent\">Toggle SideNav</button>\r\n            </mat-card-actions>\r\n          </mat-card>\r\n        </section>\r\n        <section fxLayout=\"column\" fxLayoutGap=\"50px\" fxLayoutAlign=\"center center\">\r\n          <div fxLayout fxLayoutGap=\"50px\" fxLayoutAlign=\"center center\">\r\n            <p>Determinate: {{progress}}%</p>\r\n            <mat-progress-spinner mode=\"determinate\" [value]=\"progress\"></mat-progress-spinner>\r\n            <mat-form-field>\r\n              <input #infoMessage matInput>\r\n            </mat-form-field>\r\n            <button mat-raised-button color=\"accent\" (click)=\"onRerunTimer(infoMessage.value)\">Restart</button>\r\n          </div>\r\n          <div fxLayout fxLayoutGap=\"50px\" fxLayoutAlign=\"center center\">\r\n            <p>Indeterminate:</p>\r\n            <mat-progress-spinner mode=\"indeterminate\"></mat-progress-spinner>\r\n          </div>\r\n        </section>\r\n\r\n        <section class=\"form\"\r\n                 fxLayout\r\n                 fxLayoutAlign=\"center\">\r\n          <mat-card fxFlex.xs=\"100%\" fxFlex=\"50%\">\r\n            <mat-card-content fxLayoutAlign=\"center\">\r\n              <mat-form-field>\r\n                <input matInput value=\"Message?\" placeholder=\"Message\" #message>\r\n              </mat-form-field>\r\n              <mat-form-field>\r\n                <input matInput value=\"Close\" placeholder=\"Action\" #action>\r\n              </mat-form-field>\r\n            </mat-card-content>\r\n            <mat-card-actions fxLayoutAlign=\"center\">\r\n              <button mat-button (click)=\"showSnackBar(message.value, action.value)\">Show snack-bar</button>\r\n            </mat-card-actions>\r\n          </mat-card>\r\n        </section>\r\n\r\n        <section class=\"form\"\r\n                 fxLayout\r\n                 fxLayoutAlign=\"center\">\r\n          <mat-card fxFlex.xs=\"100%\" fxFlex=\"50%\">\r\n            <mat-card-title fxLayoutAlign=\"center\">Form</mat-card-title>\r\n            <mat-card-content fxLayoutAlign=\"center\">\r\n              <form fxLayout=\"column\"\r\n                    fxLayoutAlign=\"center center\"\r\n                    fxLayoutGap=\"10px\"\r\n                    #f=\"ngForm\"\r\n                    (submit)=\"onSubmit(f)\">\r\n                <mat-form-field color=\"accent\">\r\n                  <input\r\n                    type=\"email\"\r\n                    matInput\r\n                    placeholder=\"Your email\"\r\n                    ngModel\r\n                    name=\"email\"\r\n                    email\r\n                    required\r\n                    #mailInput=\"ngModel\"\r\n                  >\r\n                  <mat-error *ngIf=\"mailInput.hasError('required')\">Email is required</mat-error>\r\n                  <mat-error *ngIf=\"!mailInput.hasError('required')\">Email is invalid</mat-error>\r\n                </mat-form-field>\r\n                <mat-form-field color=\"accent\"\r\n                                hintLabel=\"Min 2 characters.\">\r\n                  <input\r\n                    type=\"password\"\r\n                    matInput\r\n                    placeholder=\"Your password\"\r\n                    ngModel\r\n                    name=\"password\"\r\n                    required\r\n                    minlength=\"2\"\r\n                    #pwInput=\"ngModel\"\r\n                  >\r\n                  <mat-hint align=\"end\">{{pwInput.value?.length}} / 2</mat-hint>\r\n                </mat-form-field>\r\n                <mat-form-field>\r\n                  <input matInput\r\n                         [matDatepicker]=\"picker\"\r\n                         placeholder=\"Your Birthdate\"\r\n                         [max]=\"maxDate\"\r\n                         ngModel\r\n                         required\r\n                         name=\"bday\">\r\n                  <mat-datepicker-toggle matSuffix [for]=\"picker\"></mat-datepicker-toggle>\r\n                  <mat-datepicker #picker></mat-datepicker>\r\n                </mat-form-field>\r\n                <mat-checkbox\r\n                  ngModel\r\n                  name=\"terms\"\r\n                  required\r\n                  labelPosition=\"before\"\r\n                  color=\"primary\"\r\n                >Terms Agreement\r\n                </mat-checkbox>\r\n                <button mat-icon-button color=\"accent\">\r\n                  <mat-icon>home</mat-icon>\r\n                </button>\r\n                <button type=\"submit\" mat-raised-button color=\"primary\" [disabled]=\"f.invalid\">\r\n                  <span>Hit</span>\r\n                </button>\r\n              </form>\r\n            </mat-card-content>\r\n            <mat-card-actions fxLayoutAlign=\"center\">\r\n            </mat-card-actions>\r\n          </mat-card>\r\n        </section>\r\n\r\n        <section class=\"form\"\r\n                 fxLayout\r\n                 fxLayoutAlign=\"center\">\r\n          <mat-card fxFlex.xs=\"100%\" fxFlex=\"70%\">\r\n            <mat-card-title fxLayoutAlign=\"center\">Table</mat-card-title>\r\n            <mat-card-content fxLayoutAlign=\"center\">\r\n              <app-table fxFlex=\"100%\"></app-table>\r\n            </mat-card-content>\r\n          </mat-card>\r\n        </section>\r\n\r\n      </main>\r\n    </mat-sidenav-content>\r\n  </mat-sidenav-container>\r\n</div>\r\n\r\n"

/***/ }),

/***/ "./src/app/training/training.component.ts":
/*!************************************************!*\
  !*** ./src/app/training/training.component.ts ***!
  \************************************************/
/*! exports provided: TrainingComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TrainingComponent", function() { return TrainingComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var _dialog_dialog_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./dialog/dialog.component */ "./src/app/training/dialog/dialog.component.ts");
/* harmony import */ var _snack_bar_snack_bar_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./snack-bar/snack-bar.component */ "./src/app/training/snack-bar/snack-bar.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var TrainingComponent = /** @class */ (function () {
    function TrainingComponent(dialog, snackBar) {
        this.dialog = dialog;
        this.snackBar = snackBar;
        this.shouldRun = false;
        this.openSidenav = false;
        this.progress = 0;
    }
    TrainingComponent.prototype.ngOnInit = function () {
        this.maxDate = new Date();
        this.maxDate.setFullYear(this.maxDate.getFullYear() - 18);
        this.shouldRun = true;
        this.openSidenav = false;
        this.restartTimer();
    };
    TrainingComponent.prototype.toggleTheme = function () {
        this.theme = !this.theme;
    };
    TrainingComponent.prototype.onRerunTimer = function (message) {
        var _this = this;
        var dialogRef = this.dialog.open(_dialog_dialog_component__WEBPACK_IMPORTED_MODULE_2__["DialogComponent"], { data: { message: message } });
        dialogRef.afterClosed().subscribe(function (result) {
            if (result) {
                _this.restartTimer();
            }
        });
    };
    TrainingComponent.prototype.restartTimer = function () {
        var _this = this;
        clearInterval(this.timer);
        this.progress = 0;
        this.timer = setInterval(function () {
            _this.progress += 1;
            if (_this.progress >= 100) {
                clearInterval(_this.timer);
            }
        }, 100);
    };
    TrainingComponent.prototype.onSubmit = function (f) {
        console.log(f);
    };
    TrainingComponent.prototype.showSnackBar = function (message, action) {
        this.snackBarRef = this.snackBar.openFromComponent(_snack_bar_snack_bar_component__WEBPACK_IMPORTED_MODULE_3__["SnackBarComponent"], {
            panelClass: ['styled-snack'],
            data: {
                message: message,
                action: action
            }
        });
        this.snackBarRef.afterDismissed().subscribe(function (data) { return console.log(data); });
        this.snackBarRef.instance.ref = this.snackBarRef;
    };
    TrainingComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-training',
            template: __webpack_require__(/*! ./training.component.html */ "./src/app/training/training.component.html"),
            styles: [__webpack_require__(/*! ./training.component.css */ "./src/app/training/training.component.css")]
        }),
        __metadata("design:paramtypes", [_angular_material__WEBPACK_IMPORTED_MODULE_1__["MatDialog"], _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatSnackBar"]])
    ], TrainingComponent);
    return TrainingComponent;
}());



/***/ }),

/***/ "./src/app/user-info/user-info.component.css":
/*!***************************************************!*\
  !*** ./src/app/user-info/user-info.component.css ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "table {\r\n  background-color: rgba(0,0,0,0.05);\r\n}\r\ntd {\r\n  border: 1px solid #32383e;\r\n  padding: 30px;\r\n}\r\nli {\r\n  border: 1px solid #32383e;\r\n  background-color: rgba(200, 200, 200, 0.05);\r\n  color: gray !important;\r\n  padding: 30px;\r\n}\r\n.form-control {\r\n  background-color: rgba(0,0,0,0.05);\r\n  border: 1px solid #32383e;\r\n}\r\n.jumbotron {\r\n  background: none;\r\n}\r\n"

/***/ }),

/***/ "./src/app/user-info/user-info.component.html":
/*!****************************************************!*\
  !*** ./src/app/user-info/user-info.component.html ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div *ngIf=\"(usernameState| async)\">\r\n  <div class=\"jumbotron bg-transparent\">\r\n    <div class=\"row d-flex justify-content-center\">\r\n      <div class=\"col-6\">\r\n        <div class=\"row\">\r\n          <div class=\"col-12 d-flex justify-content-center\">\r\n            <div *ngIf=\"!editMode && !resetPasswordMode\">\r\n              <table class=\"table border-secondary table-striped\">\r\n                <tbody>\r\n                <tr>\r\n                  <td><span class=\"text-info\">USERNAME:</span></td>\r\n                  <td><span class=\"text-white\"> {{(usernDetailsState | async)?.username}}</span></td>\r\n                </tr>\r\n                <tr>\r\n                  <td><span class=\"text-info\">EMAIL:</span></td>\r\n                  <td><span class=\"text-white\"> {{ (usernDetailsState | async)?.email }}</span></td>\r\n                </tr>\r\n                <tr>\r\n                  <td><span class=\"text-info\">FIRSTNAME:</span></td>\r\n                  <td><span class=\"text-white\">{{ (usernDetailsState | async)?.firstName }}</span></td>\r\n                </tr>\r\n                <tr>\r\n                  <td><span class=\"text-info\">LASTNAME:</span></td>\r\n                  <td><span class=\"text-white\">{{ (usernDetailsState | async)?.lastName }}</span></td>\r\n                </tr>\r\n                <tr>\r\n                  <td><span class=\"text-info\">ENABLED:</span></td>\r\n                  <td><span class=\"text-white\">{{ (usernDetailsState | async)?.enabled }}</span></td>\r\n                </tr>\r\n                </tbody>\r\n              </table>\r\n            </div>\r\n\r\n            <div *ngIf=\"editMode\">\r\n              <form #updateDetailsForm=\"ngForm\">\r\n                <ul class=\"list-group bg-transparent\">\r\n                  <li class=\"list-group-item\">\r\n                    <span class=\"text-info\">USERNAME:</span>\r\n                    <span class=\"text-white\"> {{(usernDetailsState | async)?.username}}</span>\r\n                  </li>\r\n                  <li class=\"list-group-item\">\r\n                    <span class=\"text-info\">EMAIL:</span>\r\n                    <input class=\"text-white form-control\" ngModel=\"{{ (usernDetailsState | async)?.email }}\" name=\"email\">\r\n                  </li>\r\n                  <li class=\"list-group-item\">\r\n                    <span class=\"text-info\">FIRSTNAME:</span>\r\n                    <input class=\"text-white form-control\" ngModel=\"{{ (usernDetailsState | async)?.firstName }}\" name=\"firstName\">\r\n                  </li>\r\n                  <li class=\"list-group-item\">\r\n                    <span class=\"text-info\">LASTNAME:</span>\r\n                    <input class=\"text-white form-control\" ngModel=\"{{ (usernDetailsState | async)?.lastName }}\" name=\"lastName\">\r\n                  </li>\r\n                  <li class=\"list-group-item\">\r\n                    <span class=\"text-info\">ENABLED:</span>\r\n                    <span class=\"text-white\">{{ (usernDetailsState | async)?.enabled }}</span>\r\n                  </li>\r\n                </ul>\r\n                <div *ngIf=\"editMode\" class=\"btn-group\" style=\"margin-top: 30px\">\r\n                  <button class=\"btn btn-outline-secondary\" (click)=\"toggleEdidMode()\"> Close</button>\r\n                  <button class=\"btn btn-outline-secondary\" (click)=\"updateUser(updateDetailsForm.value)\" *ngIf=\"editMode\"> Save</button>\r\n                </div>\r\n              </form>\r\n            </div>\r\n\r\n            <div *ngIf=\"resetPasswordMode\">\r\n              <form #updatePasswordForm=\"ngForm\">\r\n\r\n                <ul class=\"list-group bg-transparent\">\r\n\r\n                  <li class=\"list-group-item\">\r\n                    <span class=\"text-info\">Old password</span>\r\n                    <input type=\"password\" class=\"text-white form-control\" ngModel name=\"oldPassword\">\r\n                  </li>\r\n\r\n                  <li class=\"list-group-item\">\r\n                    <span class=\"text-info\">Password</span>\r\n                    <input type=\"password\" class=\"text-white form-control\" ngModel name=\"newPassword\">\r\n                  </li>\r\n\r\n                  <li class=\"list-group-item\">\r\n                    <span class=\"text-info\">Confirm password</span>\r\n                    <input type=\"password\" class=\"text-white form-control\" ngModel name=\"confirmPassword\">\r\n                  </li>\r\n                </ul>\r\n                <div class=\"btn-group\" style=\"margin-top: 30px\">\r\n                  <button class=\"btn btn-outline-secondary\" (click)=\"togglePasswordResetMode()\"> Close</button>\r\n                  <button class=\"btn btn-outline-secondary\" (click)=\"updatePassword(updatePasswordForm.value)\"> Save</button>\r\n                </div>\r\n              </form>\r\n            </div>\r\n          </div>\r\n        </div>\r\n        <div class=\"row\">\r\n          <div class=\"col-12 d-flex justify-content-center\">\r\n            <div class=\"btn-group\" *ngIf=\"!editMode && !resetPasswordMode\">\r\n              <button class=\"btn btn-outline-secondary\" (click)=\"toggleEdidMode()\"> Edit</button>\r\n              <button class=\"btn btn-outline-secondary\" (click)=\"togglePasswordResetMode()\">Reset Password</button>\r\n            </div>\r\n          </div>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>\r\n"

/***/ }),

/***/ "./src/app/user-info/user-info.component.ts":
/*!**************************************************!*\
  !*** ./src/app/user-info/user-info.component.ts ***!
  \**************************************************/
/*! exports provided: UserInfoComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UserInfoComponent", function() { return UserInfoComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _ngrx_store__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ngrx/store */ "./node_modules/@ngrx/store/@ngrx/store.es5.js");
/* harmony import */ var _shared_data_storage_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../shared/data-storage.service */ "./src/app/shared/data-storage.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var UserInfoComponent = /** @class */ (function () {
    function UserInfoComponent(store, dss) {
        this.store = store;
        this.dss = dss;
        this.editMode = false;
        this.resetPasswordMode = false;
    }
    UserInfoComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.usernameState = this.store.select('users', 'currentUser');
        this.usernDetailsState = this.store.select('users', 'currentUserDetails');
        this.usernDetailsState.subscribe(function (user) {
            console.log('user', user);
            _this.userDetails = user;
        });
        this.usernameState.subscribe(function (username) {
            _this.dss.getCurrentUser(username);
        });
    };
    UserInfoComponent.prototype.toggleEdidMode = function () {
        this.editMode = !this.editMode;
    };
    UserInfoComponent.prototype.togglePasswordResetMode = function () {
        this.resetPasswordMode = !this.resetPasswordMode;
    };
    UserInfoComponent.prototype.updateUser = function (formValue) {
        this.dss.updateUser({
            username: this.userDetails.username,
            firstName: formValue.firstName,
            lastName: formValue.lastName,
            passowrd: '',
            email: formValue.email,
            enabled: false,
            roleNames: [],
            taskDtos: [],
        });
    };
    UserInfoComponent.prototype.updatePassword = function (formValue) {
        if (formValue.newPassword === formValue.confirmPassword && formValue.newPassword.length > 1) {
            this.dss.updatePassword(formValue.oldPassword, formValue.newPassword, this.userDetails.username);
        }
        else {
            console.log('Passwords do not match!');
        }
    };
    UserInfoComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-user-info',
            template: __webpack_require__(/*! ./user-info.component.html */ "./src/app/user-info/user-info.component.html"),
            styles: [__webpack_require__(/*! ./user-info.component.css */ "./src/app/user-info/user-info.component.css")]
        }),
        __metadata("design:paramtypes", [_ngrx_store__WEBPACK_IMPORTED_MODULE_1__["Store"],
            _shared_data_storage_service__WEBPACK_IMPORTED_MODULE_2__["DataStorageService"]])
    ], UserInfoComponent);
    return UserInfoComponent;
}());



/***/ }),

/***/ "./src/app/user/user-details/user-details.component.css":
/*!**************************************************************!*\
  !*** ./src/app/user/user-details/user-details.component.css ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "li, td {\r\n  border: 1px solid #32383e;\r\n  background-color: rgba(200, 200, 200, 0.05);\r\n  color: gray !important;\r\n}\r\n\r\n.bg-light {\r\n  background-color: rgba(200, 200, 200, 0.2) !important;\r\n}\r\n\r\nselect, input, textarea {\r\n  background-color: rgba(0, 0, 0, 0.05) !important;\r\n}\r\n"

/***/ }),

/***/ "./src/app/user/user-details/user-details.component.html":
/*!***************************************************************!*\
  !*** ./src/app/user/user-details/user-details.component.html ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"row\">\r\n  <div class=\"col-6\">\r\n    <div *ngIf=\"user && !(newUserMode | async)\">\r\n      <table class=\"table table-bordered table-striped\">\r\n        <tbody>\r\n        <tr>\r\n          <td><span class=\"text-info\">USERNAME:</span></td>\r\n          <td>\r\n            <div class=\"d-flex justify-content-between\">\r\n              <span> {{ user.username }} </span>\r\n              <button class=\"btn btn-outline-secondary text-danger\" data-toggle=\"modal\"\r\n                      data-target=\"#deleteConfirmModal\"> Delete User\r\n              </button>\r\n            </div>\r\n          </td>\r\n        </tr>\r\n        <tr>\r\n          <td><span class=\"text-info\">EMAIL:</span></td>\r\n          <td> {{ user.email }}</td>\r\n        </tr>\r\n        <tr>\r\n          <td><span class=\"text-info\">FIRSTNAME:</span></td>\r\n          <td>{{ user.firstName }}</td>\r\n        </tr>\r\n        <tr>\r\n          <td><span class=\"text-info\">LASTNAME:</span></td>\r\n          <td>{{ user.lastName }}</td>\r\n        </tr>\r\n        <tr>\r\n          <td><span class=\"text-info\">ENABLED:</span></td>\r\n          <td>{{ user.enabled }}</td>\r\n        </tr>\r\n        <tr>\r\n          <td>\r\n            <p class=\"text-info\">ROLES:</p>\r\n            <div *ngIf=\"editRoleMode && !(newUserMode | async)\">\r\n              <form [formGroup]=\"roleForm\" class=\"form-group\">\r\n                <select class=\"form-control border-secondary\" formControlName=\"role\">\r\n                  <option selected>- Select -</option>\r\n                  <option *ngFor=\"let role of (roles|async)\"> {{ role.name }}</option>\r\n                </select>\r\n                <div class=\"btn-group\" style=\"margin-top: 5px\">\r\n                  <button class=\"btn btn-outline-secondary\" (click)=\"postAddRole()\">+</button>\r\n                  <button class=\"btn btn-outline-secondary\" (click)=\"postRemove()\">-</button>\r\n                  <button class=\"btn btn-outline-secondary\" (click)=\"abortAddRole()\">Abort</button>\r\n                </div>\r\n              </form>\r\n            </div>\r\n            <div *ngIf=\"!editRoleMode\">\r\n              <button class=\"btn btn-outline-secondary\" (click)=\"onEditRoleMode()\">Edit</button>\r\n            </div>\r\n          </td>\r\n          <td>\r\n            <ul class=\"list-group\">\r\n              <li class=\"list-group-item\"\r\n                  *ngFor=\"let roleName of user.roleNames\"\r\n                  style=\"background-color: rgba(0, 0, 0, 0.05) !important\">\r\n                {{roleName}}\r\n              </li>\r\n            </ul>\r\n          </td>\r\n        </tr>\r\n        </tbody>\r\n      </table>\r\n      <ul class=\"list-group\">\r\n        <li class=\"list-group-item\" style=\"background-color: rgba(0,0,0,0.05);\">\r\n          <span class=\"text-info\">{{user.taskDtos.length > 0 ? 'TASKS' : 'NO TASKS'}}</span>\r\n        </li>\r\n        <li class=\"list-group-item list-group-item-action\"\r\n            *ngFor=\"let taskDto of user.taskDtos\" (click)=\"onSelectTask(taskDto)\"\r\n            [ngClass]=\"(userDisplayedTask|async)?.id == taskDto.id ? 'bg-light' : ''\"\r\n        > {{ taskDto.name }}\r\n        </li>\r\n      </ul>\r\n    </div>\r\n\r\n    <div *ngIf=\"(newUserMode | async)\">\r\n      <form [formGroup]=\"newUserForm\" #f>\r\n        <div class=\"form-group\">\r\n          <label class=\"text-info\">Username:</label>\r\n          <input type=\"text\" class=\"form-control border-secondary\" formControlName=\"username\" required>\r\n        </div>\r\n        <div class=\"form-group\">\r\n          <label class=\"text-info\">Password</label>\r\n          <input type=\"password\" class=\"form-control border-secondary\" formControlName=\"password\" required>\r\n        </div>\r\n        <div class=\"form-group\">\r\n          <label class=\"text-info\">First name</label>\r\n          <input type=\"text\" class=\"form-control border-secondary\" formControlName=\"firstName\" required>\r\n        </div>\r\n        <div class=\"form-group\">\r\n          <label class=\"text-info\">Last name</label>\r\n          <input type=\"text\" class=\"form-control border-secondary\" formControlName=\"lastName\" required>\r\n        </div>\r\n        <div class=\"form-group\">\r\n          <label class=\"text-info\">Email</label>\r\n          <input type=\"text\" class=\"form-control border-secondary\" formControlName=\"email\" required>\r\n        </div>\r\n        <div class=\"form-group\">\r\n          <label class=\"text-info\">Enabled</label>\r\n          <select class=\"form-control border-secondary\" formControlName=\"enabled\" required>\r\n            <option [value]=\"true\"  [selected]=\"true\" >Yes</option>\r\n            <option [value]=\"false\" >No</option>\r\n          </select>\r\n        </div>\r\n        <div class=\"form-group\">\r\n          <button (click)=\"onSubmitUser()\" class=\"btn btn-outline-secondary\" [disabled]=\"!newUserForm.valid\">Submit</button>\r\n          <button (click)=\"onAbortSubmitUser()\" class=\"btn btn-outline-secondary\">Close</button>\r\n        </div>\r\n      </form>\r\n    </div>\r\n  </div>\r\n  <div class=\"col-6\">\r\n    <div *ngIf=\"(userDisplayedTask | async)\">\r\n      <app-user-task [task]=\"(userDisplayedTask | async)\"></app-user-task>\r\n    </div>\r\n  </div>\r\n</div>\r\n\r\n\r\n<!-- Modal -->\r\n<div class=\"modal fade\" id=\"deleteConfirmModal\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"exampleModalLabel\"\r\n     aria-hidden=\"true\">\r\n  <div class=\"modal-dialog\" role=\"document\">\r\n    <div class=\"modal-content\">\r\n      <div class=\"modal-header\">\r\n        <h5 class=\"modal-title\" id=\"exampleModalLabel\">User removal</h5>\r\n        <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\">\r\n          <span aria-hidden=\"true\">&times;</span>\r\n        </button>\r\n      </div>\r\n      <div class=\"modal-body\">\r\n        Whhaaaaaatt??!!\r\n      </div>\r\n      <div class=\"modal-footer\">\r\n        <button #closeModal type=\"button\" class=\"btn btn-outline-secondary\" data-dismiss=\"modal\">Close</button>\r\n        <button type=\"button\" class=\"btn btn-outline-secondary\" (click)=\"onRemoveUser(user.username, closeModal)\">Confirm</button>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>\r\n"

/***/ }),

/***/ "./src/app/user/user-details/user-details.component.ts":
/*!*************************************************************!*\
  !*** ./src/app/user/user-details/user-details.component.ts ***!
  \*************************************************************/
/*! exports provided: UserDetailsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UserDetailsComponent", function() { return UserDetailsComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _shared_data_storage_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../shared/data-storage.service */ "./src/app/shared/data-storage.service.ts");
/* harmony import */ var _ngrx_store__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ngrx/store */ "./node_modules/@ngrx/store/@ngrx/store.es5.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _shared_store_user_users_actions__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../shared/store/user/users.actions */ "./src/app/shared/store/user/users.actions.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var UserDetailsComponent = /** @class */ (function () {
    function UserDetailsComponent(store, dss) {
        this.store = store;
        this.dss = dss;
        this.editRoleMode = false;
    }
    UserDetailsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.userState = this.store.select('users', 'selectedUser');
        this.userState.subscribe(function (user) {
            _this.user = user;
        });
        this.userDisplayedTask = this.store.select('users', 'userDisplayedTask');
        this.newUserMode = this.store.select('users', 'newUserMode');
        this.roles = this.store.select('users', 'roles');
        this.dss.getRoles();
        this.roleForm =
            new _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormGroup"]({
                'role': new _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormControl"]('Select option')
            });
        this.newUserMode.subscribe(function () {
            _this.createForm();
        });
    };
    UserDetailsComponent.prototype.postRemove = function () {
        this.dss.removeRoleFromUser({ user: this.user, rolename: this.roleForm.value.role });
    };
    UserDetailsComponent.prototype.onEditRoleMode = function () {
        this.editRoleMode = true;
    };
    UserDetailsComponent.prototype.postAddRole = function () {
        if (this.dss.addRoleToUser({ username: this.user.username, rolename: this.roleForm.value.role })) {
            this.user.roleNames.push(this.roleForm.value.role);
        }
    };
    UserDetailsComponent.prototype.abortAddRole = function () {
        this.editRoleMode = false;
    };
    UserDetailsComponent.prototype.onAbortSubmitUser = function () {
        this.store.dispatch(new _shared_store_user_users_actions__WEBPACK_IMPORTED_MODULE_4__["SetNewUserModeAction"](false));
    };
    UserDetailsComponent.prototype.createForm = function () {
        this.newUserForm =
            new _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormGroup"]({
                'username': new _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormControl"](null, [_angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required]),
                'firstName': new _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormControl"](null, [_angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required]),
                'lastName': new _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormControl"](null, [_angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required]),
                'password': new _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormControl"](null, [_angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required]),
                'email': new _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormControl"](null, [_angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required]),
                'enabled': new _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormControl"](true, [_angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required]),
                'roleNames': new _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormArray"]([]),
                'taskDtos': new _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormArray"]([])
            });
    };
    UserDetailsComponent.prototype.onRemoveUser = function (username, closeModalButton) {
        if (closeModalButton && this.dss.deleteUser(username)) {
            closeModalButton.click();
        }
    };
    // onSubmitRole(name, description) {
    //   console.log(name, description);
    //   this.dss.saveNewRole({name: name, description: description});
    // }
    UserDetailsComponent.prototype.onSubmitUser = function () {
        this.dss.saveNewUser(this.newUserForm.value);
    };
    UserDetailsComponent.prototype.onSelectTask = function (taskDto) {
        this.store.dispatch(new _shared_store_user_users_actions__WEBPACK_IMPORTED_MODULE_4__["SetUserDisplayedTask"](taskDto));
    };
    UserDetailsComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-user-details',
            template: __webpack_require__(/*! ./user-details.component.html */ "./src/app/user/user-details/user-details.component.html"),
            styles: [__webpack_require__(/*! ./user-details.component.css */ "./src/app/user/user-details/user-details.component.css")]
        }),
        __metadata("design:paramtypes", [_ngrx_store__WEBPACK_IMPORTED_MODULE_2__["Store"],
            _shared_data_storage_service__WEBPACK_IMPORTED_MODULE_1__["DataStorageService"]])
    ], UserDetailsComponent);
    return UserDetailsComponent;
}());



/***/ }),

/***/ "./src/app/user/user-task/user-task.component.css":
/*!********************************************************!*\
  !*** ./src/app/user/user-task/user-task.component.css ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "li, td {\r\n  border: 1px solid #32383e;\r\n  background-color: rgba(200, 200, 200, 0.05);\r\n  color: gray !important;\r\n}\r\n\r\n.bg-light {\r\n  background-color: rgba(200, 200, 200, 0.2) !important;\r\n}\r\n\r\nselect, input, textarea {\r\n  background-color: rgba(0, 0, 0, 0.05) !important;\r\n}\r\n"

/***/ }),

/***/ "./src/app/user/user-task/user-task.component.html":
/*!*********************************************************!*\
  !*** ./src/app/user/user-task/user-task.component.html ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div *ngIf=\"task && !editTaskMode\">\r\n  <li class=\"list-group-item d-flex justify-content-between\" style=\"background-color: rgba(0,0,0,0.05);\">\r\n    <span>Name: {{task.name}}</span>\r\n    <button class=\"btn btn-outline-secondary\" (click)=\"onEditTaskMode(true)\">Edit</button>\r\n  </li>\r\n  <li class=\"list-group-item\"> ID: {{task.id}}</li>\r\n  <li class=\"list-group-item\"> Description: {{task.description}}</li>\r\n  <li class=\"list-group-item\"> Status: {{task.status}}</li>\r\n  <li class=\"list-group-item\" style=\"background-color: rgba(0,0,0,0.05);\">{{task.userNames.length <= 0 ? 'No users' : 'Assigned Users:'}}</li>\r\n  <li *ngFor=\" let username of task.userNames\" class=\"list-group-item\"> {{username}}</li>\r\n  <li class=\"list-group-item\" style=\"background-color: rgba(0,0,0,0.05);\">{{ task.taskDtos.length <= 0 ? 'No tasks' : 'Assigned Tasks:' }}</li>\r\n  <li class=\"list-group-item\" *ngFor=\"let taskDto of task.taskDtos\">\r\n    <app-user-task [task]=\"taskDto\"></app-user-task>\r\n  </li>\r\n</div>\r\n\r\n<div *ngIf=\"task && editTaskMode\">\r\n  <form [formGroup]=\"editedTaskForm\" #f>\r\n    <div class=\"form-group\">\r\n      <label class=\"text-info\">Name:</label>\r\n      <input class=\"form-control\" type=\"text\" formControlName=\"name\">\r\n    </div>\r\n    <div class=\"form-group\">\r\n      <label class=\"text-info\">Description:</label>\r\n      <textarea rows=\"20\" class=\"form-control\"  formControlName=\"description\"></textarea>\r\n    </div>\r\n    <div class=\"form-group\">\r\n      <label class=\"text-info\">Status:</label>\r\n      <select class=\"form-control\"  formControlName=\"status\">\r\n        <option [selected]=\"task.status == status[0]\" value=\"{{ status[0] }}\"> {{ status[0] }} </option>\r\n        <option [selected]=\"task.status == status[1]\" value=\"{{ status[1] }}\"> {{ status[1] }} </option>\r\n        <option [selected]=\"task.status == status[2]\" value=\"{{ status[2] }}\"> {{ status[2] }} </option>\r\n        <option [selected]=\"task.status == status[3]\" value=\"{{ status[3] }}\"> {{ status[3] }} </option>\r\n      </select>\r\n    </div>\r\n    <div class=\"form-group\">\r\n      <button class=\"btn btn-outline-secondary\" (click)=\"onSaveEditedTask(f)\">\r\n        Submit\r\n      </button>\r\n      <button class=\"btn btn-outline-secondary\" (click)=\"onEditTaskMode(false)\">Abort</button>\r\n    </div>\r\n  </form>\r\n</div>\r\n"

/***/ }),

/***/ "./src/app/user/user-task/user-task.component.ts":
/*!*******************************************************!*\
  !*** ./src/app/user/user-task/user-task.component.ts ***!
  \*******************************************************/
/*! exports provided: UserTaskComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UserTaskComponent", function() { return UserTaskComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _shared_table_model__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../shared/table.model */ "./src/app/shared/table.model.ts");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _shared_data_storage_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../shared/data-storage.service */ "./src/app/shared/data-storage.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var UserTaskComponent = /** @class */ (function () {
    function UserTaskComponent(dss) {
        this.dss = dss;
        this.editTaskMode = false;
        this.status = _shared_table_model__WEBPACK_IMPORTED_MODULE_1__["Status"];
    }
    UserTaskComponent.prototype.ngOnInit = function () {
    };
    UserTaskComponent.prototype.onEditTaskMode = function (mode) {
        this.editTaskMode = mode;
        if (this.task) {
            this.editedTaskForm = new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormGroup"]({
                name: new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"](this.task.name),
                description: new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"](this.task.description),
                status: new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"](this.task.status),
            });
        }
    };
    UserTaskComponent.prototype.onSaveEditedTask = function () {
        var task = {
            id: this.task.id,
            name: this.editedTaskForm.value.name,
            description: this.editedTaskForm.value.description,
            status: this.editedTaskForm.value.status,
            userNames: this.task.userNames,
            taskDtos: this.task.taskDtos
        };
        this.dss.updateTask(task);
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", _shared_table_model__WEBPACK_IMPORTED_MODULE_1__["TaskModel"])
    ], UserTaskComponent.prototype, "task", void 0);
    UserTaskComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-user-task',
            template: __webpack_require__(/*! ./user-task.component.html */ "./src/app/user/user-task/user-task.component.html"),
            styles: [__webpack_require__(/*! ./user-task.component.css */ "./src/app/user/user-task/user-task.component.css")]
        }),
        __metadata("design:paramtypes", [_shared_data_storage_service__WEBPACK_IMPORTED_MODULE_3__["DataStorageService"]])
    ], UserTaskComponent);
    return UserTaskComponent;
}());



/***/ }),

/***/ "./src/app/user/user.component.css":
/*!*****************************************!*\
  !*** ./src/app/user/user.component.css ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "li {\r\n  border: 1px solid #32383e;\r\n  background-color: rgba(200, 200, 200, 0.05);\r\n  color: gray !important;\r\n}\r\n\r\nli:hover {\r\n  background-color: rgba(200, 200, 200, 0.2);\r\n}\r\n\r\n.bg-light {\r\n  background-color: rgba(200, 200, 200, 0.2) !important;\r\n}\r\n\r\n.jumbotron {\r\n  background: none;\r\n}\r\n"

/***/ }),

/***/ "./src/app/user/user.component.html":
/*!******************************************!*\
  !*** ./src/app/user/user.component.html ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"jumbotron\">\r\n  <div class=\"row\" style=\"padding: 30px\">\r\n    <div class=\"col-4 align-self-start\">\r\n      <ul class=\"list-group\">\r\n        <li class=\"list-group-item border-dark\" style=\"background-color: rgba(0,0,0,0.05);\">Users:</li>\r\n        <li class=\"list-group-item list-group-item-action d-flex justify-content-end\"\r\n            *ngFor=\"let user of (users | async)\" (click)=\"onSelectUser(user)\"\r\n            [ngClass]=\"(selectedUser | async)?.username == user.username ? 'bg-light' : ''\">\r\n          <td class=\"mr-auto p-2\">{{ user.username }}</td>\r\n        </li>\r\n        <button class=\"btn text-white\" style=\"background-color: rgba(0,0,0,0.05) !important;\" (click)=\"onNewUser()\">New user</button>\r\n      </ul>\r\n    </div>\r\n    <div class=\"col-8 align-self-center\">\r\n      <app-user-details></app-user-details>\r\n    </div>\r\n  </div>\r\n</div>\r\n"

/***/ }),

/***/ "./src/app/user/user.component.ts":
/*!****************************************!*\
  !*** ./src/app/user/user.component.ts ***!
  \****************************************/
/*! exports provided: UserComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UserComponent", function() { return UserComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _ngrx_store__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ngrx/store */ "./node_modules/@ngrx/store/@ngrx/store.es5.js");
/* harmony import */ var _shared_data_storage_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../shared/data-storage.service */ "./src/app/shared/data-storage.service.ts");
/* harmony import */ var _shared_store_user_users_actions__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../shared/store/user/users.actions */ "./src/app/shared/store/user/users.actions.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var UserComponent = /** @class */ (function () {
    function UserComponent(contentStore, dss) {
        this.contentStore = contentStore;
        this.dss = dss;
    }
    UserComponent.prototype.ngOnInit = function () {
        this.users = this.contentStore.select('users', 'users');
        this.contentStore.select('users', 'selectedUser');
        this.dss.getUsers();
    };
    UserComponent.prototype.onSelectUser = function (user) {
        this.contentStore.dispatch(new _shared_store_user_users_actions__WEBPACK_IMPORTED_MODULE_3__["SetSelectedUser"](user));
        this.contentStore.dispatch(new _shared_store_user_users_actions__WEBPACK_IMPORTED_MODULE_3__["SetUserDisplayedTask"](null));
    };
    UserComponent.prototype.onNewUser = function () {
        this.contentStore.dispatch(new _shared_store_user_users_actions__WEBPACK_IMPORTED_MODULE_3__["SetNewUserModeAction"](true));
        this.contentStore.dispatch(new _shared_store_user_users_actions__WEBPACK_IMPORTED_MODULE_3__["SetUserDisplayedTask"](null));
    };
    UserComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-user',
            template: __webpack_require__(/*! ./user.component.html */ "./src/app/user/user.component.html"),
            styles: [__webpack_require__(/*! ./user.component.css */ "./src/app/user/user.component.css")]
        }),
        __metadata("design:paramtypes", [_ngrx_store__WEBPACK_IMPORTED_MODULE_1__["Store"],
            _shared_data_storage_service__WEBPACK_IMPORTED_MODULE_2__["DataStorageService"]])
    ], UserComponent);
    return UserComponent;
}());



/***/ }),

/***/ "./src/environments/environment.ts":
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
var environment = {
    production: false
};


/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var hammerjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! hammerjs */ "./node_modules/hammerjs/hammer.js");
/* harmony import */ var hammerjs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(hammerjs__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/platform-browser-dynamic */ "./node_modules/@angular/platform-browser-dynamic/fesm5/platform-browser-dynamic.js");
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/app.module */ "./src/app/app.module.ts");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./environments/environment */ "./src/environments/environment.ts");





if (_environments_environment__WEBPACK_IMPORTED_MODULE_4__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["enableProdMode"])();
}
Object(_angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_2__["platformBrowserDynamic"])().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_3__["AppModule"])
    .catch(function (err) { return console.log(err); });


/***/ }),

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! D:\Projekty\my-jira\frontend\src\main.ts */"./src/main.ts");


/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main.js.map