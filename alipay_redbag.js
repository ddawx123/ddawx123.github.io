// JavaScript 支付宝红包浮动推送

var CookieMgr = {
    set: function (key, value, expires = 0, domain = '', path = '', secure = false) {
        var cookieString = '';
        cookieString += encodeURIComponent(key) + '=' + encodeURIComponent(value);
        if (expires != 0) {
            var d = new Date();
            d.setTime(d.getTime + (expires * 24 * 60 * 60 * 1000));
            cookieString += '; expires=' + d.toGMTString();
        }
        if (path != '') cookieString += '; path=' + path;
        if (domain != '') cookieString += '; domain=' + domain;
        if (secure) cookieString += '; secure';
        document.cookie = cookieString;
    },
    get: function (key) {
        var cookieName = encodeURIComponent(key) + '=';
        var cookieStart = document.cookie.indexOf(cookieName);
        var cookieValue = '';
        if (cookieStart > -1) {
            var cookieEnd = document.cookie.indexOf(';', cookieStart);
            if (cookieEnd == -1) cookieEnd = document.cookie.length;
            cookieValue = decodeURIComponent(document.cookie.substring(cookieStart + cookieName.length, cookieEnd));
        }
        return cookieValue;
    },
    del: function (key) {
        document.cookie = key + '=; expires=Thu, 01 Jan 1970 00:00:00 GMT';
    }
};

function hideDialog() {
    document.getElementById('alipay_redbag_ad').style.display = 'none';
    CookieMgr.set('ad_clickonce', new Date().toLocaleString(), 3, window.location.hostname, '/', false);
}

function createDialog() {
    var alipay_redbag_ad = document.createElement('div');
    alipay_redbag_ad.id = 'alipay_redbag_ad';
    alipay_redbag_ad.style.display = 'block';
    alipay_redbag_ad.style.position = 'fixed';
    alipay_redbag_ad.style.right = '0px';
    alipay_redbag_ad.style.bottom = '0px';
    alipay_redbag_ad.style.zIndex = '99999';
    
    alipay_redbag_ad.innerHTML += '<div id="divdlgTitle" style="width:100%; hight: 40px; background: #A1C2E5; padding: 5 5 5 5; z-index:99999">\n';
    alipay_redbag_ad.innerHTML += '<span style="float:left" id="dlgTitle">扫码领取支付宝红包</span>\n';
    alipay_redbag_ad.innerHTML += '<span style="float:right; cursor:pointer;" onclick="javascript:hideDialog();">X</span>\n';
    alipay_redbag_ad.innerHTML += '</div>\n';
    
    alipay_redbag_ad.innerHTML += '<div align="center" style="width:100%; height:100%; background: #A1C2E5; z-index:99999">\n';
    alipay_redbag_ad.innerHTML += '<img src="https://static2.dingstudio.cn/images/ad/1544337377187.jpg" height="250"></img>\n';
    alipay_redbag_ad.innerHTML += '</div>\n';
    document.body.appendChild(alipay_redbag_ad);
}

document.onreadystatechange = function () {
    if (document.readyState === 'complete') {
        if (CookieMgr.get('ad_clickonce') == '') createDialog();
    }
}
