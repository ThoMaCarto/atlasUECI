//Création des différents pane
map.createPane('fond');
map.getPane('fond').style.zIndex = 500;
map.getPane('fond').style.pointerEvents = 'none';
map.createPane('marker2');
map.getPane('marker2').style.zIndex = 600;


 // fonction pour l\'affichage dans le panneau à droite des données du point       
function oneachfeature(feature, layer){
		 	//marker.setOpacity(0); 
           layer.on({
                click: function showResultsInDiv() {
                    var d = document.getElementById('popupstatic');
                    d.innerHTML = "";
                    tableNew = '<table>';
                    //tableNew += "<tr><td></td></tr>";
                       
                        for (prop in feature.properties){
                        	
                        	
                        	 if (feature.properties[prop] !== 'nd' 
                        	 && feature.properties[prop] !== null 
                        	 && prop !== 'slug' 
                        	 && prop !== 'field_36' 
                        	 && prop !== 'link'
                        	 && prop !== 'link_1'
                        	 && prop !== 'row id'
                        	 && prop !== 'a_préfect'
                        	 && prop !== 'a__sous_pr'
                        	 && prop !== 'a_sous_qua'
                        	 && prop !== 'id') 
                        		{
                        			tableNew += '<tr><td style="max-width:150px;"><strong>'+prop+" : </strong></td><td>"+feature.properties[prop]+"</td></tr>" ;
                        			}
                        		else {;}
                        		;
                        		
                        	  }                     	
                        	
                        
                    
                    tableNew += "</table>";
                    d.innerHTML = tableNew;
                    
                    
                }
            }) }
//fonction pour afficher un cible bleu autour du point sélectionné
function cible(e){
						
		var marker = new L.circleMarker([e.latlng.lat, e.latlng.lng],{radius: 5, color: 'dodgerblue', fillColor: 'dodgerblue',weight: 3,fillOpacity: 0,dashArray:"5",})
		.addTo(map);
		if (markers.length > 0) {map.removeLayer(markers.pop());}
		var marker;
		markers.push(marker)
      return marker;
		
		
}

//Création d'un compteur de marker permettant de n'afficher qu'une seule cible bleu
var markers = [];	   




////Fonction qui défini la couleur en fonction de la vulnérabilité  
/// e sera le nombre de point d'eau conforme, f le nmbre de pts d'eau diag, et g le raccordement à la SODECI, h le nombre de pompe fonctionnelles        
function getColorVuln (e,f,g,h){
	//séléctionné les quartiers de Bouaké
	if (f > 10 == true) {
		if (g == 1 == true) {return ('yellow');}
		else if (g == '0,5' == true) {return ('orange');}
		else {return('red');}
	}
	// sélectionné les villages
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
 
// définir la couleur en fonction du type de route
function getColorRoute (c){
	switch(c){
		case 'Bitume': return 'green';
		case 'Terre battue': return 'orange';
		case 'Piste': return 'red';
		default: return 'white';
	}
};





//Légende de vulnLocalites
var div = L.DomUtil.create("div", "legendin");
var legendVuln = L.control({position:"bottomright",},);
legendVuln.onAdd = function (map){

div.innerHTML =
'<strong>Accessibilité à l\'eau potable</strong>'
+'<table>'
+'<tr><td style="color:black;background-color:yellow;height:10px;width:10px;opacity:.8;border:1px solid yellow;text-align:center;"><strong>Bonne</strong></td>'
+'<td style="color:black;background-color:orange;height:10px;width:10px;opacity:.8;border:1px solid orange;text-align:center;"><strong>Moyenne</strong></td>'
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
+'</div>';
return div;
};
//legendVuln.addTo(map);


//Légende de localites
var legendLoc = L.control ({position:'bottomright',},);
legendLoc.onAdd = function () {
div.innerHTML = 
'<table class="info-legend">'
+'<tr><td style="background-color:white;height:10px;width:30px;opacity:.8;border:2px solid red;"></td><td>Localité diagnostiquée</td></tr>'
+'</table>';
return div;
};


//Légende de route
var legendRoute = L.control ({position:'bottomright',},);
legendRoute.onAdd = function () {
div.innerHTML = '<strong>Type de voie d\'accès à la localité</strong>'
+'<table>'
+'<tr><td style="color:black;background-color:green;height:10px;width:10px;opacity:.8;border:1px solid green;text-align:center;"><strong>Route bîtumée</strong></td>'
+'<td style="color:black;background-color:orange;height:10px;width:10px;opacity:.8;border:1px solid orange;text-align:center;"><strong>Route en terre battue</strong></td>'
+'<td style="color:black;background-color:Red;height:10px;width:10px;opacity:.8;border:1px solid Red;text-align:center;"><strong>Piste étroite</strong></td></tr>'
+'</table>';
return div;
};


//lecture de la base de donnée pour créer les différentes couches
$.getJSON(urllocalites,function(data)
{
	// création d’une couche geoJson qui appelle le fichier « localites.geojson » pour créer une simple carte des localités étudiées
	var localites= L.geoJson(data,{style: function(feature){
		return { pane : 'marker2',color : 'red', weight : 1.5, fillColor : 'red', fillOpacity : .0, };},
		onEachFeature: oneachfeature,
});
localites.beforeAdd = function (map) {legendVuln.remove(map);};
localites.beforeAdd = function (map) {legendRoute.remove(map);};
localites.beforeAdd = function (map) {legendLoc.addTo(map);};
localites.on("click", cible);
localites.addTo(map);
controlLayers.addOverlay(localites, "Localités","<strong>Diagnostic des localités</strong>");






// création d’une couche geoJson qui appelle le fichier « localites.geojson » pour créer carte en fonction des vulnérabilités
var vulnLocalites= L.geoJson(data,{style: function(feature){return { pane : 'marker2',color : getColorVuln(feature.properties.Points_deau_diagnostiqués_conformes_aux_normes_OMS,feature.properties.Nombre_de_points_deau_diagnostiqués,feature.properties.EAU_SODECI,feature.properties.Pompes_Fonctionnelles), weight : 1, fillColor : getColorVuln(feature.properties.Points_deau_diagnostiqués_conformes_aux_normes_OMS,feature.properties.Nombre_de_points_deau_diagnostiqués,feature.properties.EAU_SODECI,feature.properties.Pompes_Fonctionnelles), fillOpacity : .5 };},
	onEachFeature: oneachfeature,
});
vulnLocalites.beforeAdd = function (map) {legendLoc.remove(map);};
vulnLocalites.beforeAdd = function (map) {legendRoute.remove(map);};
vulnLocalites.beforeAdd = function (map) {legendVuln.addTo(map);};
vulnLocalites.on("click", cible);
//vulnLocalites.addTo(map);
controlLayers.addOverlay(vulnLocalites, "Niveau de Vulnérabilité","<strong>Diagnostic des localités</strong>");


var routeAcces= L.geoJson(data,{style: function(feature){return { pane : 'marker2',color : getColorRoute(feature.properties.route), weight : 1, fillColor : getColorRoute(feature.properties.route), fillOpacity : .5 };},
	onEachFeature: oneachfeature,
});
routeAcces.beforeAdd = function (map) {legendLoc.remove(map);};
routeAcces.beforeAdd = function (map) {legendVuln.remove(map);};
routeAcces.beforeAdd = function (map) {legendRoute.addTo(map);};
routeAcces.on("click", cible);
//vulnLocalites.addTo(map);
controlLayers.addOverlay(routeAcces, "Type de voie d'accès","<strong>Diagnostic des localités</strong>");

});

//création dune couche geoJSON qui appelle le fichier "agglo_Bouake.geojson"
$.getJSON(urlAggloBouake,function(data)
{
	var tacheUrbBouake = L.geoJson(data,{
		style: function (feature){return { pane : 'fond',weight : 1, color : 'purple',fillColor:'white',fillOpacity : 0,};},
	});
	tacheUrbBouake.addTo(map);
	
	controlLayers.addOverlay(tacheUrbBouake,'<strong>Agglomération de Bouaké</strong>'
	+'<table class="legendin">'
	+'<tr>'
	+'<td style="width:30px;border:1px solid purple;text-align:center;"></td>'
	+'<td>Tache urbaine en 2018</td>'
	+'</tr>'
	+'</table>');
}
);




