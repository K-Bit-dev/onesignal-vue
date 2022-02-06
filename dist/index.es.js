/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

function __read(o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
}

function __spread() {
    for (var ar = [], i = 0; i < arguments.length; i++)
        ar = ar.concat(__read(arguments[i]));
    return ar;
}

var Vue = require('vue');
var ONESIGNAL_SDK_ID = 'onesignal-sdk';
var ONE_SIGNAL_SCRIPT_SRC = 'https://cdn.onesignal.com/sdks/OneSignalSDK.js';
var ONESIGNAL_NOT_SETUP_ERROR = 'OneSignal is not setup correctly.';
var MAX_TIMEOUT = 30;
var isOneSignalInitialized = false;
var vueOneSignalFunctionQueue = [];
/* H E L P E R S */
var injectScript = function () {
    var script = document.createElement('script');
    script.id = ONESIGNAL_SDK_ID;
    script.src = ONE_SIGNAL_SCRIPT_SRC;
    script.async = true;
    document.head.appendChild(script);
};
var doesOneSignalExist = function () {
    if (window.OneSignal) {
        return true;
    }
    return false;
};
var processQueuedOneSignalFunctions = function () {
    vueOneSignalFunctionQueue.forEach(function (element) {
        var _a;
        var name = element.name, args = element.args, promiseResolver = element.promiseResolver;
        if (!!promiseResolver) {
            OneSignalVue[name].apply(OneSignalVue, __spread(args)).then(function (result) {
                promiseResolver(result);
            });
        }
        else {
            (_a = window.OneSignal)[name].apply(_a, __spread(args));
        }
    });
};
var setupOneSignalIfMissing = function () {
    if (!doesOneSignalExist()) {
        window.OneSignal = window.OneSignal || [];
    }
};
/* O N E S I G N A L   A P I  */
function init(options) {
    return new Promise(function (resolve) {
        if (isOneSignalInitialized) {
            return;
        }
        injectScript();
        setupOneSignalIfMissing();
        window.OneSignal.push(function () {
            window.OneSignal.init(options);
        });
        var timeout = setTimeout(function () {
            console.error(ONESIGNAL_NOT_SETUP_ERROR);
        }, MAX_TIMEOUT * 1000);
        window.OneSignal.push(function () {
            clearTimeout(timeout);
            isOneSignalInitialized = true;
            processQueuedOneSignalFunctions();
            resolve();
        });
    });
}
function on(event, listener) {
    if (!doesOneSignalExist()) {
        vueOneSignalFunctionQueue.push({
            name: "on",
            args: arguments,
        });
        return;
    }
    window.OneSignal.push(function () {
        window.OneSignal.on(event, listener);
    });
}
function off(event, listener) {
    if (!doesOneSignalExist()) {
        vueOneSignalFunctionQueue.push({
            name: "off",
            args: arguments,
        });
        return;
    }
    window.OneSignal.push(function () {
        window.OneSignal.off(event, listener);
    });
}
function once(event, listener) {
    if (!doesOneSignalExist()) {
        vueOneSignalFunctionQueue.push({
            name: "once",
            args: arguments,
        });
        return;
    }
    window.OneSignal.push(function () {
        window.OneSignal.once(event, listener);
    });
}
function isPushNotificationsEnabled(callback) {
    return new Promise(function (resolve, reject) {
        if (!doesOneSignalExist()) {
            vueOneSignalFunctionQueue.push({
                name: "isPushNotificationsEnabled",
                args: arguments,
                promiseResolver: resolve,
            });
            return;
        }
        window.OneSignal.push(function () {
            window.OneSignal.isPushNotificationsEnabled(callback)
                .then(function (value) { return resolve(value); })
                .catch(function (error) { return reject(error); });
        });
    });
}
function showHttpPrompt(options) {
    return new Promise(function (resolve, reject) {
        if (!doesOneSignalExist()) {
            vueOneSignalFunctionQueue.push({
                name: "showHttpPrompt",
                args: arguments,
                promiseResolver: resolve,
            });
            return;
        }
        window.OneSignal.push(function () {
            window.OneSignal.showHttpPrompt(options)
                .then(function (value) { return resolve(value); })
                .catch(function (error) { return reject(error); });
        });
    });
}
function registerForPushNotifications(options) {
    return new Promise(function (resolve, reject) {
        if (!doesOneSignalExist()) {
            vueOneSignalFunctionQueue.push({
                name: "registerForPushNotifications",
                args: arguments,
                promiseResolver: resolve,
            });
            return;
        }
        window.OneSignal.push(function () {
            window.OneSignal.registerForPushNotifications(options)
                .then(function (value) { return resolve(value); })
                .catch(function (error) { return reject(error); });
        });
    });
}
function setDefaultNotificationUrl(url) {
    return new Promise(function (resolve, reject) {
        if (!doesOneSignalExist()) {
            vueOneSignalFunctionQueue.push({
                name: "setDefaultNotificationUrl",
                args: arguments,
                promiseResolver: resolve,
            });
            return;
        }
        window.OneSignal.push(function () {
            window.OneSignal.setDefaultNotificationUrl(url)
                .then(function (value) { return resolve(value); })
                .catch(function (error) { return reject(error); });
        });
    });
}
function setDefaultTitle(title) {
    return new Promise(function (resolve, reject) {
        if (!doesOneSignalExist()) {
            vueOneSignalFunctionQueue.push({
                name: "setDefaultTitle",
                args: arguments,
                promiseResolver: resolve,
            });
            return;
        }
        window.OneSignal.push(function () {
            window.OneSignal.setDefaultTitle(title)
                .then(function (value) { return resolve(value); })
                .catch(function (error) { return reject(error); });
        });
    });
}
function getTags(callback) {
    return new Promise(function (resolve, reject) {
        if (!doesOneSignalExist()) {
            vueOneSignalFunctionQueue.push({
                name: "getTags",
                args: arguments,
                promiseResolver: resolve,
            });
            return;
        }
        window.OneSignal.push(function () {
            window.OneSignal.getTags(callback)
                .then(function (value) { return resolve(value); })
                .catch(function (error) { return reject(error); });
        });
    });
}
function sendTag(key, value, callback) {
    return new Promise(function (resolve, reject) {
        if (!doesOneSignalExist()) {
            vueOneSignalFunctionQueue.push({
                name: "sendTag",
                args: arguments,
                promiseResolver: resolve,
            });
            return;
        }
        window.OneSignal.push(function () {
            window.OneSignal.sendTag(key, value, callback)
                .then(function (value) { return resolve(value); })
                .catch(function (error) { return reject(error); });
        });
    });
}
function sendTags(tags, callback) {
    return new Promise(function (resolve, reject) {
        if (!doesOneSignalExist()) {
            vueOneSignalFunctionQueue.push({
                name: "sendTags",
                args: arguments,
                promiseResolver: resolve,
            });
            return;
        }
        window.OneSignal.push(function () {
            window.OneSignal.sendTags(tags, callback)
                .then(function (value) { return resolve(value); })
                .catch(function (error) { return reject(error); });
        });
    });
}
function deleteTag(tag) {
    return new Promise(function (resolve, reject) {
        if (!doesOneSignalExist()) {
            vueOneSignalFunctionQueue.push({
                name: "deleteTag",
                args: arguments,
                promiseResolver: resolve,
            });
            return;
        }
        window.OneSignal.push(function () {
            window.OneSignal.deleteTag(tag)
                .then(function (value) { return resolve(value); })
                .catch(function (error) { return reject(error); });
        });
    });
}
function deleteTags(tags, callback) {
    return new Promise(function (resolve, reject) {
        if (!doesOneSignalExist()) {
            vueOneSignalFunctionQueue.push({
                name: "deleteTags",
                args: arguments,
                promiseResolver: resolve,
            });
            return;
        }
        window.OneSignal.push(function () {
            window.OneSignal.deleteTags(tags, callback)
                .then(function (value) { return resolve(value); })
                .catch(function (error) { return reject(error); });
        });
    });
}
function addListenerForNotificationOpened(callback) {
    return new Promise(function (resolve, reject) {
        if (!doesOneSignalExist()) {
            vueOneSignalFunctionQueue.push({
                name: "addListenerForNotificationOpened",
                args: arguments,
                promiseResolver: resolve,
            });
            return;
        }
        window.OneSignal.push(function () {
            window.OneSignal.addListenerForNotificationOpened(callback)
                .then(function (value) { return resolve(value); })
                .catch(function (error) { return reject(error); });
        });
    });
}
function setSubscription(newSubscription) {
    return new Promise(function (resolve, reject) {
        if (!doesOneSignalExist()) {
            vueOneSignalFunctionQueue.push({
                name: "setSubscription",
                args: arguments,
                promiseResolver: resolve,
            });
            return;
        }
        window.OneSignal.push(function () {
            window.OneSignal.setSubscription(newSubscription)
                .then(function (value) { return resolve(value); })
                .catch(function (error) { return reject(error); });
        });
    });
}
function showHttpPermissionRequest(options) {
    return new Promise(function (resolve, reject) {
        if (!doesOneSignalExist()) {
            vueOneSignalFunctionQueue.push({
                name: "showHttpPermissionRequest",
                args: arguments,
                promiseResolver: resolve,
            });
            return;
        }
        window.OneSignal.push(function () {
            window.OneSignal.showHttpPermissionRequest(options)
                .then(function (value) { return resolve(value); })
                .catch(function (error) { return reject(error); });
        });
    });
}
function showNativePrompt() {
    return new Promise(function (resolve, reject) {
        if (!doesOneSignalExist()) {
            vueOneSignalFunctionQueue.push({
                name: "showNativePrompt",
                args: arguments,
                promiseResolver: resolve,
            });
            return;
        }
        window.OneSignal.push(function () {
            window.OneSignal.showNativePrompt()
                .then(function (value) { return resolve(value); })
                .catch(function (error) { return reject(error); });
        });
    });
}
function showSlidedownPrompt(options) {
    return new Promise(function (resolve, reject) {
        if (!doesOneSignalExist()) {
            vueOneSignalFunctionQueue.push({
                name: "showSlidedownPrompt",
                args: arguments,
                promiseResolver: resolve,
            });
            return;
        }
        window.OneSignal.push(function () {
            window.OneSignal.showSlidedownPrompt(options)
                .then(function (value) { return resolve(value); })
                .catch(function (error) { return reject(error); });
        });
    });
}
function showCategorySlidedown(options) {
    return new Promise(function (resolve, reject) {
        if (!doesOneSignalExist()) {
            vueOneSignalFunctionQueue.push({
                name: "showCategorySlidedown",
                args: arguments,
                promiseResolver: resolve,
            });
            return;
        }
        window.OneSignal.push(function () {
            window.OneSignal.showCategorySlidedown(options)
                .then(function (value) { return resolve(value); })
                .catch(function (error) { return reject(error); });
        });
    });
}
function showSmsSlidedown(options) {
    return new Promise(function (resolve, reject) {
        if (!doesOneSignalExist()) {
            vueOneSignalFunctionQueue.push({
                name: "showSmsSlidedown",
                args: arguments,
                promiseResolver: resolve,
            });
            return;
        }
        window.OneSignal.push(function () {
            window.OneSignal.showSmsSlidedown(options)
                .then(function (value) { return resolve(value); })
                .catch(function (error) { return reject(error); });
        });
    });
}
function showEmailSlidedown(options) {
    return new Promise(function (resolve, reject) {
        if (!doesOneSignalExist()) {
            vueOneSignalFunctionQueue.push({
                name: "showEmailSlidedown",
                args: arguments,
                promiseResolver: resolve,
            });
            return;
        }
        window.OneSignal.push(function () {
            window.OneSignal.showEmailSlidedown(options)
                .then(function (value) { return resolve(value); })
                .catch(function (error) { return reject(error); });
        });
    });
}
function showSmsAndEmailSlidedown(options) {
    return new Promise(function (resolve, reject) {
        if (!doesOneSignalExist()) {
            vueOneSignalFunctionQueue.push({
                name: "showSmsAndEmailSlidedown",
                args: arguments,
                promiseResolver: resolve,
            });
            return;
        }
        window.OneSignal.push(function () {
            window.OneSignal.showSmsAndEmailSlidedown(options)
                .then(function (value) { return resolve(value); })
                .catch(function (error) { return reject(error); });
        });
    });
}
function getNotificationPermission(onComplete) {
    return new Promise(function (resolve, reject) {
        if (!doesOneSignalExist()) {
            vueOneSignalFunctionQueue.push({
                name: "getNotificationPermission",
                args: arguments,
                promiseResolver: resolve,
            });
            return;
        }
        window.OneSignal.push(function () {
            window.OneSignal.getNotificationPermission(onComplete)
                .then(function (value) { return resolve(value); })
                .catch(function (error) { return reject(error); });
        });
    });
}
function getUserId(callback) {
    return new Promise(function (resolve, reject) {
        if (!doesOneSignalExist()) {
            vueOneSignalFunctionQueue.push({
                name: "getUserId",
                args: arguments,
                promiseResolver: resolve,
            });
            return;
        }
        window.OneSignal.push(function () {
            window.OneSignal.getUserId(callback)
                .then(function (value) { return resolve(value); })
                .catch(function (error) { return reject(error); });
        });
    });
}
function getSubscription(callback) {
    return new Promise(function (resolve, reject) {
        if (!doesOneSignalExist()) {
            vueOneSignalFunctionQueue.push({
                name: "getSubscription",
                args: arguments,
                promiseResolver: resolve,
            });
            return;
        }
        window.OneSignal.push(function () {
            window.OneSignal.getSubscription(callback)
                .then(function (value) { return resolve(value); })
                .catch(function (error) { return reject(error); });
        });
    });
}
function setEmail(email, options) {
    return new Promise(function (resolve, reject) {
        if (!doesOneSignalExist()) {
            vueOneSignalFunctionQueue.push({
                name: "setEmail",
                args: arguments,
                promiseResolver: resolve,
            });
            return;
        }
        window.OneSignal.push(function () {
            window.OneSignal.setEmail(email, options)
                .then(function (value) { return resolve(value); })
                .catch(function (error) { return reject(error); });
        });
    });
}
function setSMSNumber(smsNumber, options) {
    return new Promise(function (resolve, reject) {
        if (!doesOneSignalExist()) {
            vueOneSignalFunctionQueue.push({
                name: "setSMSNumber",
                args: arguments,
                promiseResolver: resolve,
            });
            return;
        }
        window.OneSignal.push(function () {
            window.OneSignal.setSMSNumber(smsNumber, options)
                .then(function (value) { return resolve(value); })
                .catch(function (error) { return reject(error); });
        });
    });
}
function logoutEmail() {
    return new Promise(function (resolve, reject) {
        if (!doesOneSignalExist()) {
            vueOneSignalFunctionQueue.push({
                name: "logoutEmail",
                args: arguments,
                promiseResolver: resolve,
            });
            return;
        }
        window.OneSignal.push(function () {
            window.OneSignal.logoutEmail()
                .then(function (value) { return resolve(value); })
                .catch(function (error) { return reject(error); });
        });
    });
}
function logoutSMS() {
    return new Promise(function (resolve, reject) {
        if (!doesOneSignalExist()) {
            vueOneSignalFunctionQueue.push({
                name: "logoutSMS",
                args: arguments,
                promiseResolver: resolve,
            });
            return;
        }
        window.OneSignal.push(function () {
            window.OneSignal.logoutSMS()
                .then(function (value) { return resolve(value); })
                .catch(function (error) { return reject(error); });
        });
    });
}
function setExternalUserId(externalUserId, authHash) {
    return new Promise(function (resolve, reject) {
        if (!doesOneSignalExist()) {
            vueOneSignalFunctionQueue.push({
                name: "setExternalUserId",
                args: arguments,
                promiseResolver: resolve,
            });
            return;
        }
        window.OneSignal.push(function () {
            window.OneSignal.setExternalUserId(externalUserId, authHash)
                .then(function (value) { return resolve(value); })
                .catch(function (error) { return reject(error); });
        });
    });
}
function removeExternalUserId() {
    return new Promise(function (resolve, reject) {
        if (!doesOneSignalExist()) {
            vueOneSignalFunctionQueue.push({
                name: "removeExternalUserId",
                args: arguments,
                promiseResolver: resolve,
            });
            return;
        }
        window.OneSignal.push(function () {
            window.OneSignal.removeExternalUserId()
                .then(function (value) { return resolve(value); })
                .catch(function (error) { return reject(error); });
        });
    });
}
function getExternalUserId() {
    return new Promise(function (resolve, reject) {
        if (!doesOneSignalExist()) {
            vueOneSignalFunctionQueue.push({
                name: "getExternalUserId",
                args: arguments,
                promiseResolver: resolve,
            });
            return;
        }
        window.OneSignal.push(function () {
            window.OneSignal.getExternalUserId()
                .then(function (value) { return resolve(value); })
                .catch(function (error) { return reject(error); });
        });
    });
}
function provideUserConsent(consent) {
    return new Promise(function (resolve, reject) {
        if (!doesOneSignalExist()) {
            vueOneSignalFunctionQueue.push({
                name: "provideUserConsent",
                args: arguments,
                promiseResolver: resolve,
            });
            return;
        }
        window.OneSignal.push(function () {
            window.OneSignal.provideUserConsent(consent)
                .then(function (value) { return resolve(value); })
                .catch(function (error) { return reject(error); });
        });
    });
}
function getEmailId(callback) {
    return new Promise(function (resolve, reject) {
        if (!doesOneSignalExist()) {
            vueOneSignalFunctionQueue.push({
                name: "getEmailId",
                args: arguments,
                promiseResolver: resolve,
            });
            return;
        }
        window.OneSignal.push(function () {
            window.OneSignal.getEmailId(callback)
                .then(function (value) { return resolve(value); })
                .catch(function (error) { return reject(error); });
        });
    });
}
function getSMSId(callback) {
    return new Promise(function (resolve, reject) {
        if (!doesOneSignalExist()) {
            vueOneSignalFunctionQueue.push({
                name: "getSMSId",
                args: arguments,
                promiseResolver: resolve,
            });
            return;
        }
        window.OneSignal.push(function () {
            window.OneSignal.getSMSId(callback)
                .then(function (value) { return resolve(value); })
                .catch(function (error) { return reject(error); });
        });
    });
}
function sendOutcome(outcomeName, outcomeWeight) {
    return new Promise(function (resolve, reject) {
        if (!doesOneSignalExist()) {
            vueOneSignalFunctionQueue.push({
                name: "sendOutcome",
                args: arguments,
                promiseResolver: resolve,
            });
            return;
        }
        window.OneSignal.push(function () {
            window.OneSignal.sendOutcome(outcomeName, outcomeWeight)
                .then(function (value) { return resolve(value); })
                .catch(function (error) { return reject(error); });
        });
    });
}
var OneSignalVue = {
    init: init,
    on: on,
    off: off,
    once: once,
    isPushNotificationsEnabled: isPushNotificationsEnabled,
    showHttpPrompt: showHttpPrompt,
    registerForPushNotifications: registerForPushNotifications,
    setDefaultNotificationUrl: setDefaultNotificationUrl,
    setDefaultTitle: setDefaultTitle,
    getTags: getTags,
    sendTag: sendTag,
    sendTags: sendTags,
    deleteTag: deleteTag,
    deleteTags: deleteTags,
    addListenerForNotificationOpened: addListenerForNotificationOpened,
    setSubscription: setSubscription,
    showHttpPermissionRequest: showHttpPermissionRequest,
    showNativePrompt: showNativePrompt,
    showSlidedownPrompt: showSlidedownPrompt,
    showCategorySlidedown: showCategorySlidedown,
    showSmsSlidedown: showSmsSlidedown,
    showEmailSlidedown: showEmailSlidedown,
    showSmsAndEmailSlidedown: showSmsAndEmailSlidedown,
    getNotificationPermission: getNotificationPermission,
    getUserId: getUserId,
    getSubscription: getSubscription,
    setEmail: setEmail,
    setSMSNumber: setSMSNumber,
    logoutEmail: logoutEmail,
    logoutSMS: logoutSMS,
    setExternalUserId: setExternalUserId,
    removeExternalUserId: removeExternalUserId,
    getExternalUserId: getExternalUserId,
    provideUserConsent: provideUserConsent,
    getEmailId: getEmailId,
    getSMSId: getSMSId,
    sendOutcome: sendOutcome,
};
var OneSignalVuePlugin = {
    install: function (app, options) {
        app.config.globalProperties.$OneSignal = OneSignalVue;
        app.config.globalProperties.$OneSignal.init(options);
    }
};
var useOneSignal = function () {
    return OneSignalVue;
};

export default OneSignalVuePlugin;
export { useOneSignal };
//# sourceMappingURL=index.es.js.map
