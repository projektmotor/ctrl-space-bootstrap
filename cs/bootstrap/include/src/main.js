/* global cs */

//cs.io.include('./nav-tabs.js');

cs.extend.addSimplifier({
    name: 'bs-include',
    onRun: function() {
        var
            html,
            head,
            body,
            cssLinks,
            jsLinks;
         
        html = cs.panel.html.getActiveHtml();

        cssLinks = cs.util.dependencies.copyAssetFiles(
            ["css/bootstrap.min.css", "css/bootstrap-theme.min.css"], 
            project.defaultCSSPath, 
            cs.panel.html.getActiveHtml().getFilePath()
        );
        
        jsLinks = cs.util.dependencies.copyAssetFiles(
            ["js/bootstrap.min.js"], 
            project.defaultJSPath, 
            cs.panel.html.getActiveHtml().getFilePath()
        );

        body = html.getRaw().$('body').get(0);
        for (var index in jsLinks) {
            body.appendChild(jsLinks[index]);
            body.appendChild(fileManager.createTextNode("\n"));
        }
        

        head = html.getRaw().$('head').get(0);
        for (var index in cssLinks) {
            head.appendChild(cssLinks[index]);
            head.appendChild(fileManager.createTextNode("\n"));
        }
    }
});