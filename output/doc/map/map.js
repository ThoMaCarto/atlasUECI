
  

//// création de la carte et paramétrages généraux : 
//centre et niveau de zoom,zoom minimum,zoom maximum, 
// et limites du canevas (afin que l'ordinateur ne charge pas trop de tuiles de fond de carte)
// les paramètres de la fonction setView (coordonnées du centre de la vue=coordonnée de la localité
//niveau de zoom = 14 pour un quartier et 16 pour un village) seront extraits des métadata de chaque 
//fiches localité.
var map = L.map('map');
	map.setView([7.70400, -5.05500], 14);
	map.setMinZoom(11);
	map.setMaxZoom(19);
	map.setMaxBounds([[7.5,-4.8],[7.9,-5.3]])	       
     

        
//// Fonds de carte et habillage				
// création d'une couche "HOTOSM" avec les références des auteurs
//HOTOSM est un fond de carte utilisant les données d'OSM pour les besoins humanitaires.
//C'est le fond qui permet les zooms les plus fins.
var HOTOSM = L.tileLayer('http://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
      attribution: 'Données © <a href="http://urgenceeau.com/urgence-eau-cote-divoire-ueci/">Urgence Eaux Côte d\'Ivoire</a><br>Cartographie © T.Maillard | Fond de carte © <a href="http://osm.org/copyright">Contributeurs OpenStreetMap</a>'
       });
// Ajouter la couche "HOTOSM" à la carte		
	map.addLayer(HOTOSM); 
		
// création d'une couche "osmfr"
//OSM FR utilise les données OSM avec une charte graphique développé pour le territoire français
// C'est un fond de carte plus classique
var osmfr = L.tileLayer('http://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png', {
     attribution: '© <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
     });

   
//échelle
L.control.scale({imperial:false,maxWidth: 200,updateWhenIdle:false}).addTo(map);

//flèche du nord
var north = L.control({position: "topleft"});
	north.onAdd = function(map) {
		var div = L.DomUtil.create("div", "info-legend");
			div.innerHTML = '<img src="theme/static/images/compass.png" style="width:20px;">';
		return div;
		}
north.addTo(map);

// création d'un contrôle des couches pour modifier les couches affichées
var fond ={ "OSM humanitaire": HOTOSM,"OSM Classique": osmfr};
L.control.layers(fond,null, {collapsed : true}).addTo(map);
var controlLayers=L.control.layers(null,null,{collapsed : true}).addTo(map)


////Paramétrage de la charte graphique des éléments cartographiés

//Couleur en fonction du type de point d'eau
function getColortype(Type_de_point_deau) {
          switch (Type_de_point_deau) {
            case 'puits_ouvert':
              return  'blue';
            case 'point_equipe':
              return 'purple';
            case 'surface':
              return 'green';
     		default:
              return 'grey';
          }
        };
        
//Couleur en fonction de la vulnérabilité
function getColorVuln(vulnerabilit) {
          switch (vulnerabilit) {
            case 'Vulnérabilité faible':
              return  'green';
            case 'Vulnérabilité moyenne':
              return 'orange';
            case 'Vulnérabilité forte':
              return 'red';
     		default:
              return 'DarkSlateGray ';
          }
        };
        
////Création de la couche (Layer) type de point d'eau
//transformation de la base de donné "point_eau.geojson" en une couche type de points d'eau
//lecture de la base de donnée
var getjson = $.getJSON("doc/point_eau.geojson",function(data){
	//transformation de la base de donnée en couche (Layer)
	var typePE = L.geoJson(data,{
		//Affichage sous forme de point
		pointToLayer:function(feature,latlng){
			//caractéristique des points
			var marker = L.circleMarker(latlng,{radius: 5,fillOpacity: 1, color: 'black', fillColor: getColortype(feature.properties.Type_de_point_deau),weight: 1,fillOpacity: 0.8,});
			//caractéristiques des popup
			marker.bindPopup('<b><u>Type de point d\'eau</u></b><br><i>' + feature.properties.Type_de_point_deau
												+ ' <br><i>détail:</i> ' + feature.properties.B_type + '<br><b><u>Nom du point d\'eau : </u></b>'+feature.properties.A_nom);
			//Affichage des marqueurs
			return marker;
		}
		});
	//Affichage sur la carte
	typePE.addTo(map);
	//Affichage dans le controleur de couche
	controlLayers.addOverlay(typePE, "Type de point d'eau");
});

// création d’une couche geoJson qui appelle le fichier « localites.geojson »
var localites = $.getJSON("doc/localites.geojson",function(data2)
{
	var vulnLocalites= L.geoJson(data2,{style: function(feature){return { color : getColorVuln(feature.properties.vulnerabil), weight : 3, fillColor : getColorVuln(feature.properties.vulnerabil), fillOpacity : .2 };},
	onEachFeature : function(feature, layer ) {layer.bindPopup('<b><u>Nom de la localité</u></b><br>' + feature.properties.a_quartier +'<br>Niveau de Vulnérabilité : '+ feature.properties.vulnerabil)}
});
vulnLocalites.addTo(map);
controlLayers.addOverlay(vulnLocalites, "Niveau de Vulnérabilité");
});<img src="map_home.js.svg" alt="" /><img src="map_home.js.svg" alt="" />



