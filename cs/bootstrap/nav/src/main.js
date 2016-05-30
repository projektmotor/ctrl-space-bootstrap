/* global cs */

//cs.io.include('./nav-tabs.js');

cs.extend.addSimplifier({
    name: 'bs-nav-tabs',
    onRun: function() {
        var
            csImage = cs.panel.image.getActiveSlimage(),
            html = cs.panel.html.getActiveHtml(),

            selectedNodes = html.getSelectedNodes(),
            layers = csImage.getSelectedLayers(),

            itemNodeTemplate = io.loadFile('assets/html/nav-tabs-item.html'),
            nodeTemplate = io.loadFile('assets/html/nav-tabs.html');

        if (layers.length === 0) {
            cs.console.log('Please select at least one layer as naviagtion item!');
            return;
        }
        
        if (selectedNodes.length === 0) {
            cs.console.log('Please select at least one html node as parent node!');
            return;
        }
        
        for (var nodeIndex in selectedNodes) {
            var
                nodeTemplate,
                rawNode,
                rawItemNodes = [],
                node;
            
            rawNode = new String(nodeTemplate)
                .replace(/\$\{NAV_TABS_ITEMS\}/g, rawItemNodes);

            node = cs.obj.factory.createHtmlNode(rawNode);
            
            for (var index in layers) {
                var 
                    linkTarget = '#',
                    linkName = layers[index].getName(),
                    rawItemNode = new String(itemNodeTemplate)
                        .replace(/\$\{LINK_TARGET\}/g, linkTarget)
                        .replace(/\$\{LINK_NAME\}/g, linkName);
                
                node.appendChild(new cs.obj.HtmlNode(fileManager.createTextNode("            ")));
                node.appendChild(cs.obj.factory.createHtmlNode(rawItemNode));
                node.appendChild(new cs.obj.HtmlNode(fileManager.createTextNode("\n")));
            }
            
            node.appendChild(new cs.obj.HtmlNode(fileManager.createTextNode("        ")));

            selectedNodes[nodeIndex].appendChild(new cs.obj.HtmlNode(fileManager.createTextNode("        ")));
            selectedNodes[nodeIndex].appendChild(node);
            selectedNodes[nodeIndex].appendChild(new cs.obj.HtmlNode(fileManager.createTextNode("\n")));
            selectedNodes[nodeIndex].appendChild(new cs.obj.HtmlNode(fileManager.createTextNode("    ")));
            selectedNodes[nodeIndex].appendChild(new cs.obj.HtmlNode(fileManager.createTextNode("\n")));
        }
    }
});

cs.extend.addSimplifier({
    name: 'bs-nav-fixed',
    onRun: function() {
        var
            csFactory = cs.obj.factory,
        
            csImage = cs.panel.image.getActiveSlimage(),
            html = cs.panel.html.getActiveHtml(),

            selectedNodes = html.getSelectedNodes(),
            layers = csImage.getSelectedLayers(),

            itemNodeTemplate = io.loadFile('assets/html/nav-fixed-item.html'),
            nodeTemplate = io.loadFile('assets/html/nav-fixed.html');


        if (layers.length === 0) {
            cs.console.log('Please select at least one layer as naviagtion item!');
            return;
        }
        
        if (selectedNodes.length === 0) {
            cs.console.log('Please select at least one html node as parent node!');
            return;
        }
        
        for (var nodeIndex in selectedNodes) {
            var
                containerType,
                nodeTemplate,
                node,
                rawNode;
           
            containerType = window.dropDownDialog("Which type of container should be used:", ['container', 'container-fluid']);
           
            rawNode = new String(nodeTemplate)
                .replace(/\$\{CONTAINER_TYPE\}/g, containerType);
           
            node = csFactory.createHtmlNode(rawNode);
            
            selectedNodes[nodeIndex].appendChild(new cs.obj.HtmlNode(fileManager.createTextNode("\n")));
            selectedNodes[nodeIndex].appendChild(node);
            selectedNodes[nodeIndex].appendChild(new cs.obj.HtmlNode(fileManager.createTextNode("\n")));
            
            node = new cs.obj.HtmlNode(html.getRaw().$('.nav.navbar-nav').get(0));
            
            for (var index in layers) {
                var 
                    linkTarget = '#',
                    linkName = layers[index].getName(),
                    rawItemNode = new String(itemNodeTemplate)
                        .replace(/\$\{LINK_TARGET\}/g, linkTarget)
                        .replace(/\$\{LINK_NAME\}/g, linkName);
                
                if (index === 0) {
                    node.appendChild(new cs.obj.HtmlNode(fileManager.createTextNode("\n")));
                }

                node.appendChild(csFactory.createHtmlNode(rawItemNode));
                node.appendChild(new cs.obj.HtmlNode(fileManager.createTextNode("\n")));
            }
        }
    }
});