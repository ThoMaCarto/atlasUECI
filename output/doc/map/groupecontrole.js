// variable pour paramétrer les groupes de couches

// variable pour paramétrer l'affichage des groupes exclusif
var options = {
  // Make the "Landmarks" group exclusive (use radio inputs)
  exclusiveGroups: [
  
  "<strong>Analyse de l'eau</strong>",
  "<strong>Analyse du point d'eau</strong>",
  "<strong>Diagnostic des localités</strong>"
  ],
  // Show a checkbox next to non-exclusive group labels for toggling all
  groupCheckboxes: false,
  Checkboxes: true,
  // collapse le controle de couche
  collapsed : false
};

// insertion des groupe dans le contrôleur de couches
var controlLayers = L.control.groupedLayers(null, groupedOverlays, options).addTo(map);