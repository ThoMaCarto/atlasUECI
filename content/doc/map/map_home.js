/// CARTE DE LA PAGE D'ACCUEIL
/* Création Thomas Maillard */

/// Habillage de la carte

//Les sources
var attribUECI ='Fond de carte © <a href="http://osm.org/copyright">Contributeurs OpenStreetMap</a><br>Données © <a href="http://urgenceeau.com/urgence-eau-cote-divoire-ueci/">Urgence Eaux Côte d\'Ivoire</a> | Cartographie © <a href="http://www.ladyss.com/thomas-maillard">T.Maillard</a> et F. K. N\'guessan '


// Fond de carte grisaille de mapnik
var toner = L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
     attribution: attribUECI ,
	  opacity:0.9, 	     
     });
// Ajouter la couche à la carte		
	map.addLayer(toner);	

   
//échelle
L.control.scale({imperial:false,maxWidth: 100,updateWhenIdle:false}).addTo(map);


//flèche du nord
var north = L.control({position: "topleft"});
	north.onAdd = function(map) {
		var div = L.DomUtil.create("div", );
			div.innerHTML = urlNorthArray;
		return div;
		}
north.addTo(map);

// création d'un contrôle des couches pour modifier les couches affichées
//var fond ={ "Noir et blanc": toner};
var controlLayers=L.control.layers(null,null,{collapsed : false,position:"bottomright"},).addTo(map)

//création dune couche geoJSON qui appelle le fichier "agglo_Bouake.geojson", contour simple de la tache urbaine 
$.getJSON(urlAggloBouake,function(data)
{
	var tacheUrbBouake = L.geoJson(data,{
		style: function (feature){return { weight : 1, color : 'purple',fillColor:'white',fillOpacity : 0,};},
	});
	tacheUrbBouake.addTo(map);
	
	controlLayers.addOverlay(tacheUrbBouake,'<strong>Agglomération de Bouaké</strong>'
	+'<table class="legendin">'
	+'<tr>'
	+'<td style="width:30px;border:1px solid purple;text-align:center;"></td>'
	+'<td>Tache urbaine en 2018</td>'
	+'</tr>'
	+'</table>');
});






///Création des couches cartographiant les données

/// Couche des points d'eau représenté sous forme d'agglomérats de point (markerCluster) 
//paramétrage des agglomérats de marqueurs (markercluster)
var iconclusters = L.markerClusterGroup({
	maxClusterRadius: 45,
	singleMarkerMode: true,
	zoomToBoundsOnClick: true,
	spiderfyOnMaxZoom:true,
	
	iconCreateFunction: function (cluster) {
		var markers = cluster.getAllChildMarkers();
		var n = markers.length;
		var e =n/2 +4;
		return L.divIcon({ html: n, className: 'mycluster', iconSize: L.point(e, e) });
	},
});

//Création de la couche points d'eau
$.getJSON(urlpointdeau,function(data){
	var geoJsonLayer = L.geoJson (data,{
		onEachFeature:function (feature,layer) {
		}
	});
	
	iconclusters.addLayer(geoJsonLayer);
	iconclusters.addTo(map);

	controlLayers.addOverlay(iconclusters, '<strong>Effectifs des points d\'eau <br> diagnostiqués </strong>'
		+'<div style="display:flex;flex-wrap:nowrap;align-items: center;justify-content: space-around;">'
		+'<div class="mycluster" style="height:54px;width:54px;">100</div>'
		+'<div class="mycluster" style="height:29px;width:29px;">50</div>'
		+'<div class="mycluster" style="height:4.5px;width:4.5px;">1</div>'
		+'</div>'
	);
	
}); 

///Couche des localités représenté sous forme de polygone choroplète en fonction de l'accès à l'eau potable

//Fonction qui défini la couleur en fonction de la vulnérabilité  
/* e sera le nombre de point d'eau conforme, f le nmbre de pts d'eau diag, et g le raccordement à la SODECI, h le nombre de pompe fonctionnelles */       
function getColorVuln (e,f,g,h){
	//selectionne les quartiers de Bouaké (plus de 10 points d'eau analysés)
	if (f > 10 == true) {
		if (g == 1 == true) {return ('yellow');}
		else if (g == '0,5' == true) {return ('orange');}
		else {return('red');}
	}
	// sélectionne les villages (moins de 10 points d'eau)
	else {
		// sélectionner les villages sans aucune pompes fonctionnelles
		if (h == 0 == true) {
			//si SODECI
			if (g == 1 == true) {return ('orange');}
			//Sinon
			else { return('red');}
			
		}
		//Sélectionner les villages avec des pompes fonctionnelles
		// si SODECI
		else if (g == 1 == true) {return ('yellow');}
		// Si plus de 50% des pompes fonctionnelles sont conformes aux normes OMS
		else if (h-e<h/2 == true){return ('yellow');}
		else {return ('orange');}
	}
}; 




// création d’une couche geoJson qui appelle le fichier « localites.geojson »
$.getJSON(urllocalites,function(data)
{
	var vulnLocalites= L.geoJson(data,{style: function(feature){return { color : getColorVuln(feature.properties.conforme,feature.properties.analyse,feature.properties.eau_sodeci,feature.properties.pompes_fon), weight : 1, fillColor : getColorVuln(feature.properties.conforme,feature.properties.analyse,feature.properties.eau_sodeci,feature.properties.pompes_fon), fillOpacity : .5 };},
	onEachFeature : function(feature, layer ) {layer.bindPopup(
	'Nom de la localité : <b>' + feature.properties.a_quartier+'</b>'
	+ '<br>Population : <b>' + feature.properties.population+'</b>'
	+ '<br>Points d\'eau analysés : <b>' + feature.properties.analyse+'</b>'
	+ '<br>Points d\'eau conformes aux normes OMS : <b>' + feature.properties.conforme+'</b>'
	+ '<br>Type de voie d\'accès : <b>' + feature.properties.route+'</b>'
	+'<br><strong>Diagnostic détaillé : </strong> <a href="'+ articlespath + feature.properties.link_1 +'" style="text-transform: capitalize;">'
		+ feature.properties.a_quartier +'</a>'
	)}
});

vulnLocalites.addTo(map);

controlLayers.addOverlay(vulnLocalites, '<strong>Accès à l\'eau potable</strong>'
+'<table>'
+'<tr><td style="color:black;background-color:yellow;height:10px;width:10px;opacity:.8;border:1px solid yellow;text-align:center;"><strong>Bon</strong></td>'
+'<td style="color:black;background-color:orange;height:10px;width:10px;opacity:.8;border:1px solid orange;text-align:center;"><strong>Moyen</strong></td>'
+'<td style="color:black;background-color:Red;height:10px;width:10px;opacity:.8;border:1px solid Red;text-align:center;"><strong>Faible</strong></td></tr>'
+'</table>'
+'<div class="legendin">'
+'<details title="Cliquez sur la flèche noir pour afficher la légende détaillée">'
+'<summary>détails</summary>'
+'<table class="info-legend">'
+'<thead><tr ><th></th><th>Milieu rural</th><th>Milieu urbain</th></tr</thead>'
+'<tbody>'
+'<tr></tr>'
+'<tr><td style="background-color:yellow;height:10px;width:30px;opacity:.8;border:1px solid yellow;"></td><td title="Plusieurs types d\'équipements:réseau, plusieurs pompes dont la majorité sont fonctionnelles">Bon accès<br>(plusieurs équipements d\'hydraulique moderne en bon état)</td><td>Majoritairement raccordée</td></tr>'
+'<tr></tr>'
+'<tr><td style="background-color:Orange;height:10px;width:30px;opacity:.8;border:1px solid Orange;"></td><td title="Raccordé exclusivement au réseau ou disposant de pompes majoritairement en panne">Accès moyen<br>(un seul équipement d\'hydraulique moderne sans alternative)</td><td>Partiellement raccordée</td></tr>'
+'<tr></tr>'
+'<tr><td style="background-color:Red;height:10px;width:30px;opacity:.8;border:1px solid Red;"></td><td title="Aucune pompe ou aucune pompe fonctionnelle">Faible accès<br>(Aucun accès à l\'hydraulique moderne)</td><td> Non raccordée au réseau</td></tr>'
+'</tbody>'
+'</table>'
+'</details>'
+'</div>');
});

       
	

