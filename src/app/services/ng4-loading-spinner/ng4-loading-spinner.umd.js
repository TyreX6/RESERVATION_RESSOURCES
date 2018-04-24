(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('rxjs/BehaviorSubject')) :
	typeof define === 'function' && define.amd ? define(['exports', '@angular/core', 'rxjs/BehaviorSubject'], factory) :
	(factory((global['ng4-loading-spinner'] = {}),global.core,global.BehaviorSubject));
}(this, (function (exports,core,BehaviorSubject) { 'use strict';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * Injectable service
 * @export
 */
var Ng4LoadingSpinnerService = (function () {
    /**
     * Creates an instance of Ng4LoadingSpinnerService.
     * @memberof Ng4LoadingSpinnerService
     */
    function Ng4LoadingSpinnerService() {
        /**
         * \@description spinners BehaviorSubject
         * \@memberof Ng4LoadingSpinnerService
         */
        this.spinnerSubject = new BehaviorSubject.BehaviorSubject(false);
    }
    /**
     * To show spinner
     * @memberof Ng4LoadingSpinnerService
     */
    /**
     * To show spinner
     * \@memberof Ng4LoadingSpinnerService
     * @return {?}
     */
    Ng4LoadingSpinnerService.prototype.show = /**
     * To show spinner
     * \@memberof Ng4LoadingSpinnerService
     * @return {?}
     */
    function () {
        this.spinnerSubject.next(true);
    };
    /**
     * To hide spinner
     * @memberof Ng4LoadingSpinnerService
     */
    /**
     * To hide spinner
     * \@memberof Ng4LoadingSpinnerService
     * @return {?}
     */
    Ng4LoadingSpinnerService.prototype.hide = /**
     * To hide spinner
     * \@memberof Ng4LoadingSpinnerService
     * @return {?}
     */
    function () {
        this.spinnerSubject.next(false);
    };
    /**
     * @return {?}
     */
    Ng4LoadingSpinnerService.prototype.getMessage = /**
     * @return {?}
     */
    function () {
        return this.spinnerSubject.asObservable();
    };
    Ng4LoadingSpinnerService.decorators = [
        { type: core.Injectable },
    ];
    /** @nocollapse */
    Ng4LoadingSpinnerService.ctorParameters = function () { return []; };
    return Ng4LoadingSpinnerService;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * \@description
 * @author Amit Mahida
 * @export
 */
var Ng4LoadingSpinnerComponent = (function () {
    /**
     * Constructor
     * @param {Ng4LoadingSpinnerService} spinnerService Spinner Service
     * @memberof Ng4LoadingSpinnerComponent
     */
    function Ng4LoadingSpinnerComponent(spinnerService) {
        this.spinnerService = spinnerService;
        /**
         * \@description Default loading spinner template
         * \@memberof Ng4LoadingSpinnerComponent
         */
        this._template = "\n  <div class=\"lds-roller\"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>";
        /**
         * \@description Loading text
         * \@memberof Ng4LoadingSpinnerComponent
         */
        this._loadingText = '';
        /**
         * \@description Defines threhold for not to diplay if time is less than 500ms
         * \@memberof Ng4LoadingSpinnerComponent
         */
        this._threshold = 500;
        /**
         * \@description Defines z-index property of the loading text
         * \@memberof Ng4LoadingSpinnerComponent
         */
        this._zIndex = 9999;
        /**
         * \@description Show/hide spinner
         * \@memberof Ng4LoadingSpinnerComponent
         */
        this.showSpinner = false;
        this.createServiceSubscription();
    }
    Object.defineProperty(Ng4LoadingSpinnerComponent.prototype, "zIndex", {
        get: /**
         * \@description returns z-index for input text
         * \@readonly
         * \@memberof Ng4LoadingSpinnerComponent
         * @return {?}
         */
        function () {
            return this._zIndex;
        },
        set: /**
         * \@description Sets z-index for input text
         * \@memberof Ng4LoadingSpinnerComponent
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._zIndex = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Ng4LoadingSpinnerComponent.prototype, "template", {
        get: /**
         * \@description Gives the current template
         * \@readonly
         * \@memberof Ng4LoadingSpinnerComponent
         * @return {?}
         */
        function () {
            return this._template;
        },
        set: /**
         * \@description Accepts custom template
         * \@memberof Ng4LoadingSpinnerComponent
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._template = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Ng4LoadingSpinnerComponent.prototype, "loadingText", {
        get: /**
         * \@description Gives loading text
         * \@readonly
         * \@memberof Ng4LoadingSpinnerComponent
         * @return {?}
         */
        function () {
            return this._loadingText;
        },
        set: /**
         * \@description Accepts loading text string
         * \@memberof Ng4LoadingSpinnerComponent
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._loadingText = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Ng4LoadingSpinnerComponent.prototype, "threshold", {
        get: /**
         * \@description
         * \@readonly
         * \@memberof Ng4LoadingSpinnerComponent
         * @return {?}
         */
        function () {
            return this._threshold;
        },
        set: /**
         * \@description Accepts external threshold
         * \@memberof Ng4LoadingSpinnerComponent
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._threshold = value;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Destroy function
     * @memberof Ng4LoadingSpinnerComponent
     */
    /**
     * Destroy function
     * \@memberof Ng4LoadingSpinnerComponent
     * @return {?}
     */
    Ng4LoadingSpinnerComponent.prototype.ngOnDestroy = /**
     * Destroy function
     * \@memberof Ng4LoadingSpinnerComponent
     * @return {?}
     */
    function () {
        this.subscription.unsubscribe();
    };
    /**
     * Create service subscription
     * @memberof Ng4LoadingSpinnerComponent
     */
    /**
     * Create service subscription
     * \@memberof Ng4LoadingSpinnerComponent
     * @return {?}
     */
    Ng4LoadingSpinnerComponent.prototype.createServiceSubscription = /**
     * Create service subscription
     * \@memberof Ng4LoadingSpinnerComponent
     * @return {?}
     */
    function () {
        var _this = this;
        var /** @type {?} */ timer;
        this.subscription =
            this.spinnerService.getMessage().subscribe(function (show) {
                if (show) {
                    if (timer) {
                        return;
                    }
                    timer = setTimeout(function () {
                        timer = null;
                        this.showSpinner = show;
                    }.bind(_this), _this.threshold);
                }
                else {
                    if (timer) {
                        clearTimeout(timer);
                        timer = null;
                    }
                    _this.showSpinner = false;
                }
            });
    };
    Ng4LoadingSpinnerComponent.decorators = [
        { type: core.Component, args: [{
                    selector: 'ng4-loading-spinner',
                    template: "<div #spinnerContainer [class]=\"showSpinner ? 'visible spinner center' : 'hidden spinner center'\" [innerHTML]=\"template\">     </div> <h1 [style.zIndex]=\"zIndex\" [class]=\"showSpinner ? 'visible loading-text' : 'hidden loading-text'\"> {{loadingText}} </h1> ",
                    encapsulation: core.ViewEncapsulation.None
                },] },
    ];
    /** @nocollapse */
    Ng4LoadingSpinnerComponent.ctorParameters = function () { return [
        { type: Ng4LoadingSpinnerService, },
    ]; };
    Ng4LoadingSpinnerComponent.propDecorators = {
        "zIndex": [{ type: core.Input },],
        "template": [{ type: core.Input },],
        "loadingText": [{ type: core.Input },],
        "threshold": [{ type: core.Input },],
    };
    return Ng4LoadingSpinnerComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var Ng4LoadingSpinnerModule = (function () {
    function Ng4LoadingSpinnerModule() {
    }
    /**
     * @return {?}
     */
    Ng4LoadingSpinnerModule.forRoot = /**
     * @return {?}
     */
    function () {
        return {
            ngModule: Ng4LoadingSpinnerModule,
            providers: [Ng4LoadingSpinnerService]
        };
    };
    Ng4LoadingSpinnerModule.decorators = [
        { type: core.NgModule, args: [{
                    imports: [],
                    declarations: [Ng4LoadingSpinnerComponent],
                    exports: [Ng4LoadingSpinnerComponent],
                    providers: [Ng4LoadingSpinnerService]
                },] },
    ];
    /** @nocollapse */
    Ng4LoadingSpinnerModule.ctorParameters = function () { return []; };
    return Ng4LoadingSpinnerModule;
}());

exports.Ng4LoadingSpinnerModule = Ng4LoadingSpinnerModule;
exports.Ng4LoadingSpinnerService = Ng4LoadingSpinnerService;
exports.Ng4LoadingSpinnerComponent = Ng4LoadingSpinnerComponent;

Object.defineProperty(exports, '__esModule', { value: true });

})));
