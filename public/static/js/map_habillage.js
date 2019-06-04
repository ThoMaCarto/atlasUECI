//// Fonds de carte et habillage				
// création d'une couche "HOTOSM" avec les références des auteurs
//HOTOSM est un fond de carte utilisant les données d'OSM pour les besoins humanitaires.
//C'est le fond qui permet les zooms les plus fins.
var HOTOSM = L.tileLayer('http://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
      attribution: 'Données © <a href="http://urgenceeau.com/urgence-eau-cote-divoire-ueci/">Urgence Eaux Côte d\'Ivoire</a><br>Cartographie © T.Maillard | Fond de carte © <a href="http://osm.org/copyright">Contributeurs OpenStreetMap</a>'
       });
// Ajouter la couche "HOTOSM" à la carte		
	map.addLayer(HOTOSM); 
		

   
//échelle
L.control.scale({imperial:false,maxWidth: 200,updateWhenIdle:false}).addTo(map);


//flèche du nord
var north = L.control({position: "topleft"});
	north.onAdd = function(map) {
		var div = L.DomUtil.create("div", );
			div.innerHTML = '<img src="http://localhost:8000/static/images/compass.png" style="width:30px;">';
		return div;
		}
north.addTo(map);

// création d'un contrôle des couches pour modifier les couches affichées
var fond ={ "OSM humanitaire": HOTOSM};
L.control.layers(fond,null, {collapsed : false}).addTo(map);
var controlLayers=L.control.layers(null,null,{collapsed : false}).addTo(map)