window['WMBOSInstances'] = {};

export function WMBOSInit(element, configurations, callbacks) {
    var themePath = configurations.themePath;
    delete configurations.themePath;
    WMBOSLoadOverlayScrollbarsTheme(configurations, themePath);
    WMBOSLoadOverlayScrollbars(element, configurations, callbacks);
}

export function WMBOSDestroy(referenceId) {
    var instance = window['WMBOSInstances'][referenceId];
    if (instance) {
        instance.destroy();
    }
    delete window['WMBOSInstances'][referenceId];
}

export function WMBOSUpdate(referenceId, force) {
    var instance = window['WMBOSInstances'][referenceId];
    if (instance) {
        instance.update(force);
    }
}

export function WMBOSScroll(referenceId, x, y, duration) {
    var instance = window['WMBOSInstances'][referenceId];
    if (instance) {
        instance.scroll({x: x, y: y}, duration);
    }
}

export function WMBOSSleep(referenceId, force) {
    var instance = window['WMBOSInstances'][referenceId];
    if (instance) {
        instance.sleep(force);
    }
}

export function WMBOSScrollStop(referenceId, force) {
    var instance = window['WMBOSInstances'][referenceId];
    if (instance) {
        instance.scrollStop(force);
    }
}

function WMBOSInitJS(element, configurations, callbacks) {
    var config  = (configurations) ? configurations : {};
    WMBOSInitCallbacks(config, element, callbacks);
    window['WMBOSInstances'][WMBOSGetReferenceId(element)] = OverlayScrollbars(element, config);
    console.log(window['WMBOSInstances']);
}

function WMBOSGetReferenceId(element) {
    return element.getAttribute('data-reference-id');
}

function WMBOSInitCallbacks(config, element, callbacks) {
    config.callbacks = {
        onInitialized: function() {  WMBOSCOnInitialized(element, callbacks); },
        onInitializationWithdrawn: function() {  WMBOSCOnInitializationWithdrawn(callbacks); },
        onDestroyed: function() {  WMBOSCOnDestroyed(callbacks); },
        onScrollStart: function() {  WMBOSCOnScrollStart(callbacks); },
        onScroll: function() {  WMBOSCOnScroll(callbacks); },
        onScrollStop: function() {  WMBOSCOnScrollStop(callbacks); },
        onContentSizeChanged: function() {  WMBOSCOnContentSizeChanged(callbacks); },
        onHostSizeChanged: function() {  WMBOSCOnHostSizeChanged(callbacks); },
        onUpdated: function() {  WMBOSCOnUpdated(callbacks); }
    };
}

function WMBOSCOnInitialized(element, callbacks) {
    if(callbacks && callbacks['projectName'] && callbacks['onInitialized']) {
        DotNet.invokeMethodAsync(callbacks['projectName'], callbacks['onInitialized']);
    }
    element.parentElement.classList.remove('loading');
}

function WMBOSCOnInitializationWithdrawn(callbacks) {
    if(callbacks && callbacks['projectName'] && callbacks['onInitializationWithdrawn']) {
        DotNet.invokeMethodAsync(callbacks['projectName'], callbacks['onInitializationWithdrawn']);
    }
}

function WMBOSCOnDestroyed(callbacks) {
    if(callbacks && callbacks['projectName'] && callbacks['onDestroyed']) {
        DotNet.invokeMethodAsync(callbacks['projectName'], callbacks['onDestroyed']);
    }
}

function WMBOSCOnScrollStart(callbacks) {
    if(callbacks && callbacks['projectName'] && callbacks['onScrollStart']) {
        DotNet.invokeMethodAsync(callbacks['projectName'], callbacks['onScrollStart']);
    }
}

function WMBOSCOnScroll(callbacks) {
    if(callbacks && callbacks['projectName'] && callbacks['onScroll']) {
        DotNet.invokeMethodAsync(callbacks['projectName'], callbacks['onScroll']);
    }
}

function WMBOSCOnScrollStop(callbacks) {
    if(callbacks && callbacks['projectName'] && callbacks['onScrollStop']) {
        DotNet.invokeMethodAsync(callbacks['projectName'], callbacks['onScrollStop']);
    }
}

function WMBOSCOnContentSizeChanged(callbacks) {
    if(callbacks && callbacks['projectName'] && callbacks['onContentSizeChanged']) {
        DotNet.invokeMethodAsync(callbacks['projectName'], callbacks['onContentSizeChanged']);
    }
}

function WMBOSCOnHostSizeChanged(callbacks) {
    if(callbacks && callbacks['projectName'] && callbacks['onHostSizeChanged']) {
        DotNet.invokeMethodAsync(callbacks['projectName'], callbacks['onHostSizeChanged']);
    }
}

function WMBOSCOnUpdated(callbacks) {
    if(callbacks && callbacks['projectName'] && callbacks['onUpdated']) {
        DotNet.invokeMethodAsync(callbacks['projectName'], callbacks['onUpdated']);
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

function WMBOSLoadOverlayScrollbars(element, configurations, callbacks) {
    if (WMBOSHasScripts()) {
        WMBOSRunInitAsync(element, configurations, callbacks, WMBOSInitJS);
    } else {
        return WMBOSLoadScript(
            './_content/WMBlazorOverlayScrollbars/OverlayScrollbars.min.js',
            WMBOSInitJS,
            element,
            configurations,
            callbacks
        );
    }
}

function WMBOSLoadOverlayScrollbarsTheme(configurations, themePath) {
    WMBOSLoadStyles('overlay-scrollbars', './_content/WMBlazorOverlayScrollbars/themes/OverlayScrollbars.min.css');
    if (WMBOSGetTheme(configurations.className, themePath)) {
        WMBOSLoadStyles(configurations.className, WMBOSGetTheme(configurations.className, themePath));
    }
}

function WMBOSLoadStyles(className, path) {
    if (!WMBOSHasTheme(className)) {
        var link = document.createElement('link');  
        link.rel = 'stylesheet';  
        link.type = 'text/css'; 
        link.href = path;
        link.id = 'WMBOS-theme-' + className;  
        document.getElementsByTagName('HEAD')[0].appendChild(link);
    }
}

function WMBOSLoadScript(src, callback, element, configurations, callbacks) {
    var s, r, t;
    r = false;
    s = document.createElement('script');
    s.type = 'text/javascript';
    s.src = src;
    s.id = 'WMBOS-scripts-overlay-scrollbars';
    s.onload = s.onreadystatechange = function () {
        if (!r && (!this.readyState || this.readyState === 'complete')) {
            r = true;
            if (callback && element) {
                callback(element, configurations, callbacks);
            }
            return true;
        } else {
            return false;
        }
    };
    t = document.getElementsByTagName('script')[0];
    t.parentNode.insertBefore(s, t);
}

function WMBOSHasScripts() {
    return (document.querySelector('#WMBOS-scripts-overlay-scrollbars'));
}

function WMBOSHasTheme(className) {
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
        'os-theme-minimal-light'
    ];
    if (className && themePath) {
        return themePath;
    } else if (className && themes.includes(className)) {
        return './_content/WMBlazorOverlayScrollbars/themes/' + className + '.css';
    }
    return null;
}