
var attribUECI ='Fond de carte © <a href="http://osm.org/copyright">Contributeurs OpenStreetMap</a><br>Données © <a href="http://urgenceeau.com/urgence-eau-cote-divoire-ueci/">Urgence Eaux Côte d\'Ivoire</a> | Cartographie © <a href="http://www.ladyss.com/thomas-maillard">T.Maillard</a> et F. K. N\'guessan '

//// Fonds de carte et habillage




			
// création d'une couche "HOTOSM" avec les références des auteurs
//HOTOSM est un fond de carte utilisant les données d'OSM pour les besoins humanitaires.
//C'est le fond qui permet les zooms les plus fins.
var HOTOSM = L.tileLayer('http://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
	   attribution: attribUECI,
	   opacity:0.9,
	   minZoom: 16,
	   maxZoom: 19,     
       });
// Ajouter la couche "HOTOSM" à la carte		
	map.addLayer(HOTOSM); 
	
// création d'une couche "osmfr"
//OSM FR utilise les données OSM avec une charte graphique développé pour le territoire français
// C'est un fond de carte plus classique
var osmfr = L.tileLayer('http://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png', {
     attribution: attribUECI,
	  opacity:0.9,
	  	minZoom: 0,
	   maxZoom: 16,
	  	     
     });
// Ajouter la couche "HOTOSM" à la carte		
	map.addLayer(osmfr);	

   
//échelle
L.control.scale({imperial:false,maxWidth: 200,updateWhenIdle:false}).addTo(map);



//flèche du nord
var north = L.control({position: "topleft"});
	north.onAdd = function(map) {
		var div = L.DomUtil.create("div", );
			div.innerHTML = urlNorthArray;
		return div;
		}
north.addTo(map);



//var controlLayers= L.control.layers(null,null,{}).addTo(map);
var groupedOverlays = { 
 "Diagnostic des points d'eau": {},"Diagnostic des localites":{},
};


