var nodes = new vis.DataSet([
    { label: "Formulas", color: '#4830DA' },
    { label: "Time", color: '#F65858' },
    { label: "Decisions", color: '#19C285' },
    { label: "Height", color: '#59F4F4' },
    { label: "Environement", color: '#FF7E08' },
    { label: "Encounter", color: '#FFE660' },
    { label: "Clout", color: '#EE3FBD' }
]);
var edges = new vis.DataSet();

var container = document.getElementById('bubbles');
var data = {
    nodes: nodes,
    edges: edges
};

var options = {
    nodes: {
        shape: "circle",
        border: 'transparent',
        borderWidth: 0,
        heightConstraint: {minimum: 200, maximum: 300, valign:'middle'},
        widthConstraint: { minimum: 200, maximum: 300 },
        color: { background: '', highlight: { border: 'transparent' } },
        font: { color: 'white', size: 27, strokeWidth: 1.5}
    },
    physics: {
        stabilization: false,
        minVelocity: 0.01,
        solver: "repulsion",
        repulsion: {
            nodeDistance: 150
        }
    }
};
var network = new vis.Network(container, data, options);


// Events
network.on("click", function (e) {
    if (e.nodes.length) {
        var node = nodes.get(e.nodes[0]);
        // Do something
        nodes.update(node);
    }
});
