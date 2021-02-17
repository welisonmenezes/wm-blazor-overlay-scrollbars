export function WMBOSInit(element, configurations) {
    WMBOSLoadOverlayScrollbarsTheme(configurations);
    WMBOSLoadOverlayScrollbars(element, configurations);
}

function WMBOSInitJS(element, configurations) {
    var config  = (configurations) ? configurations : {};
    OverlayScrollbars(element, config);
    element.parentElement.classList.remove('loading');
}

function WMBOSRunInitAsync(element, configurations, callback) {
    var timer;
    try {
        callback(element, configurations);
    } catch (error) {
        timer = setInterval(() => {
            try {
                callback(element, configurations);
                clearInterval(timer);
            } catch (error) {}
        }, 100);
    }
}

function WMBOSLoadOverlayScrollbars(element, configurations) {
    if (WMBOSHasScripts()) {
        WMBOSRunInitAsync(element, configurations, WMBOSInitJS);
    } else {
        return WMBOSLoadScript(
            './_content/WMBlazorOverlayScrollbars/OverlayScrollbars.min.js',
            WMBOSInitJS,
            element,
            configurations
        );
    }
}

function WMBOSLoadOverlayScrollbarsTheme(configurations) {
    WMBOSLoadStyles('overlay-scrollbars', './_content/WMBlazorOverlayScrollbars/themes/OverlayScrollbars.min.css');
    if (WMBOSGetTheme(configurations.className)) {
        WMBOSLoadStyles(configurations.className, WMBOSGetTheme(configurations.className));
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

function WMBOSLoadScript(src, callback, element, configurations) {
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
                callback(element, configurations);
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

function WMBOSGetTheme(className) {
    if (className === 'os-theme-thin-dark') {
        return './_content/WMBlazorOverlayScrollbars/themes/os-theme-thin-dark.css';
    }
    return null;
}