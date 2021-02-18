export function WMBOSInit(element, configurations) {
    var themePath = configurations.themePath;
    delete configurations.themePath;
    WMBOSLoadOverlayScrollbarsTheme(configurations, themePath);
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

function WMBOSLoadOverlayScrollbarsTheme(configurations, themePath) {
    // built-in styles
    WMBOSLoadStyles('overlay-scrollbars', './_content/WMBlazorOverlayScrollbars/themes/OverlayScrollbars.min.css');
    // custom themes
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

function WMBOSGetTheme(className, themePath) {
    var themes = ['os-theme-block-dark', 'os-theme-block-light', 
    'os-theme-minimal-dark', 'os-theme-minimal-light', 
    'os-theme-round-dark', 'os-theme-round-light', 
    'os-theme-thick-dark', 'os-theme-thick-light', 
    'os-theme-thin-dark', 'os-theme-minimal-light'];
    if (className && themePath) {
        return themePath;
    } else if (className && themes.includes(className)) {
        return './_content/WMBlazorOverlayScrollbars/themes/' + className + '.css';
    }
    return null;
}