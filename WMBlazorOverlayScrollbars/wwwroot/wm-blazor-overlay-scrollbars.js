window['WMBOSInstances'] = {};

export function WMBOSInit(element, configurations, callbacks) {
    var themePath = configurations.themePath;
    WMBOSLoadOverlayScrollbarsTheme(element, configurations, themePath);
    WMBOSLoadOverlayScrollbars(element, configurations, callbacks);
}

export function WMBOSDestroy(referenceId) {
    if (window['WMBOSInstances'][referenceId])  window['WMBOSInstances'][referenceId].destroy();
    delete window['WMBOSInstances'][referenceId];
}

export function WMBOSUpdate(referenceId, force) {
    if (window['WMBOSInstances'][referenceId]) window['WMBOSInstances'][referenceId].update(force);
}

export function WMBOSScroll(referenceId, x, y, duration) {
    if (window['WMBOSInstances'][referenceId]) window['WMBOSInstances'][referenceId].scroll({x: x, y: y}, duration);
}

export function WMBOSSleep(referenceId, force) {
    if (window['WMBOSInstances'][referenceId]) window['WMBOSInstances'][referenceId].sleep(force);
}

export function WMBOSScrollStop(referenceId, force) {
    if (window['WMBOSInstances'][referenceId]) window['WMBOSInstances'][referenceId].scrollStop(force);
}

function WMBOSInitJS(element, configurations, callbacks) {
    var themePath = configurations.themePath;
    delete configurations.themePath;
    WMBOSInitCallbacks(configurations, element, callbacks);
    if (element.firstElementChild &&
        element.firstElementChild.tagName.toUpperCase() === 'TEXTAREA' &&
        element.childElementCount === 1) {
        window['WMBOSInstances'][WMBOSGetReferenceId(element)] = OverlayScrollbars(element.firstElementChild, configurations);
    } else if (element.firstElementChild &&
        element.firstElementChild.tagName.toUpperCase() === 'IFRAME' &&
        element.childElementCount === 1) {
            WMBOSInitIframeAsync(element, configurations, themePath);
            element.firstElementChild.onload = function() { WMBOSInitIframeAsync(element, configurations, themePath); }
    } else {
        window['WMBOSInstances'][WMBOSGetReferenceId(element)] = OverlayScrollbars(element, configurations);
    }
}

function WMBOSInitCallbacks(config, element, callbacks) {
    var allCallbacks = [
        'onInitialized',
        'onInitializationWithdrawn',
        'onDestroyed',
        'onScrollStart',
        'onScroll',
        'onScrollStop',
        'onContentSizeChanged',
        'onHostSizeChanged',
        'onUpdated',
    ];
    config.callbacks = {};
    for (var i = 0; i < allCallbacks.length; i++) {
        config.callbacks[allCallbacks[i]] = (function() {
            var theCallback = allCallbacks[i];
            return function() {
                if(callbacks && callbacks['projectName'] && callbacks[theCallback])
                    DotNet.invokeMethodAsync(callbacks['projectName'], callbacks[theCallback]);
                if (theCallback === 'onInitialized')
                    element.parentElement.classList.remove('loading');
            }
        })();
    }
}

function WMBOSRunInitAsync(element, configurations, callbacks, callback) {
    var timer;
    try {
        callback(element, configurations, callbacks);
    } catch (error) {
        timer = setInterval(() => {
            try {
                callback(element, configurations, callbacks);
                clearInterval(timer);
            } catch (error) {}
        }, 100);
    }
}

function WMBOSInitIframeAsync(element, config, themePath) {
    var timer;
    try {
        window['WMBOSInstances'][WMBOSGetReferenceId(element)] = OverlayScrollbars(element.firstElementChild.contentWindow.document.body, config);
        WMBOSLoadOverlayScrollbarsTheme(element.firstElementChild, config, themePath);
    } catch (error) {
        timer = setInterval(() => {
            try {
                window['WMBOSInstances'][WMBOSGetReferenceId(element)] = OverlayScrollbars(element.firstElementChild.contentWindow.document.body, config);
                WMBOSLoadOverlayScrollbarsTheme(element.firstElementChild, config, themePath);
                clearInterval(timer);
            } catch (error) {}
        }, 100);
    }
}

function WMBOSLoadOverlayScrollbars(element, configurations, callbacks) {
    if (WMBOSHasScripts())
        WMBOSRunInitAsync(element, configurations, callbacks, WMBOSInitJS);
    else
        return WMBOSLoadScript('./_content/WMBlazorOverlayScrollbars/OverlayScrollbars.min.js', WMBOSInitJS, element, configurations, callbacks);
}

function WMBOSLoadOverlayScrollbarsTheme(element, configurations, themePath) {
    WMBOSLoadStyles(element, 'overlay-scrollbars', './_content/WMBlazorOverlayScrollbars/themes/OverlayScrollbars.min.css');
    if (WMBOSGetTheme(configurations.className, themePath))
        WMBOSLoadStyles(element, configurations.className, WMBOSGetTheme(configurations.className, themePath));
}

function WMBOSLoadStyles(element, className, path) {
    if (!WMBOSHasTheme(element, className)) {
        var link = document.createElement('link');  
        link.rel = 'stylesheet';  
        link.type = 'text/css'; 
        link.href = path;
        link.id = 'WMBOS-theme-' + className;
        if (element.tagName.toUpperCase() === 'IFRAME')
            element.contentWindow.document.getElementsByTagName('HEAD')[0].appendChild(link);
        else
            document.getElementsByTagName('HEAD')[0].appendChild(link);
    }
}

function WMBOSLoadScript(src, callback, element, configurations, callbacks) {
    var scriptEl, isReady, target;
    isReady = false;
    scriptEl = document.createElement('script');
    scriptEl.type = 'text/javascript';
    scriptEl.src = src;
    scriptEl.id = 'WMBOS-scripts-overlay-scrollbars';
    scriptEl.onload = scriptEl.onreadystatechange = function () {
        if (!isReady && (!this.readyState || this.readyState === 'complete')) {
            isReady = true;
            if (callback && element) callback(element, configurations, callbacks);
            return true;
        } else {
            return false;
        }
    };
    target = document.getElementsByTagName('script')[0];
    target.parentNode.insertBefore(scriptEl, target);
}

function WMBOSHasScripts() {
    return (document.querySelector('#WMBOS-scripts-overlay-scrollbars'));
}

function WMBOSHasTheme(element, className) {
    if (element.tagName.toUpperCase() === 'IFRAME')
        return (element.contentWindow.document.querySelector('#WMBOS-theme-' + className));
    return (document.querySelector('#WMBOS-theme-' + className));
}

function WMBOSGetTheme(className, themePath) {
    var themes = [
        'os-theme-block-dark',
        'os-theme-block-light',
        'os-theme-minimal-dark',
        'os-theme-minimal-light',
        'os-theme-round-dark',
        'os-theme-round-light',
        'os-theme-thick-dark',
        'os-theme-thick-light',
        'os-theme-thin-dark',
        'os-theme-thin-light'
    ];
    if (className && themePath)
        return themePath;
    else if (className && themes.includes(className))
        return './_content/WMBlazorOverlayScrollbars/themes/' + className + '.css';
    return null;
}

function WMBOSGetReferenceId(element) {
    return element.getAttribute('data-reference-id');
}