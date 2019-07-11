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

//fonction qui transforme yellow, red, orange en niveau de vulnérabilité
function colorToVulnLevel(c){
switch(c) {
	case'yellow': return 'faible';
	case 'orange': return 'moyenne';
	case 'red': return 'forte';
}
}



//Légende de vulnLocalites
var legendVuln = L.control({position:"bottomright",},);
legendVuln.onAdd = function (map){
var div = L.DomUtil.create("div", "legendin");
div.innerHTML =
'<details title="Cliquez sur la flèche noir pour afficher la légende détaillée">'
+'<summary><strong>Niveau de vulnérabilité des localités</strong></summary>'
+'<table class="info-legend">'
+'<thead><tr ><th></th><th>Milieu rural</th><th>Milieu urbain</th></tr</thead>'
+'<tbody>'
+'<tr></tr>'
+'<tr><td style="background-color:Red;height:10px;width:30px;opacity:.8;border:1px solid Red;"></td><td title="Aucune pompe ou aucune pompe fonctionnelle">Vulnérabilité forte<br>(Aucun accès à l\'hydraulique moderne)</td><td> Non raccordée au réseau</td></tr>'
+'<tr></tr>'
+'<tr><td style="background-color:Orange;height:10px;width:30px;opacity:.8;border:1px solid Orange;"></td><td title="Raccordé exclusievement au réseau ou disposant de pompes majoritairement en panne">Vulnérabilité moyenne<br>(Accès à un seul équipement d\'hydraulique moderne sans alternative)</td><td>Partiellement raccordée</td></tr>'
+'<tr></tr>'
+'<tr><td style="background-color:yellow;height:10px;width:30px;opacity:.8;border:1px solid yellow;"></td><td title="Plusieurs types d\'équipements:réseau, plusieurs pompes dont la majorité sont fonctionnelles">Vulnérabilité faible<br>(Accès à plusieurs équipements d\'hydraulique moderne en bon état)</td><td>Majoritairement raccordée</td></tr>'
+'</tbody>'
+'</table>'
+'</details>';
return div;
};
//legendVuln.addTo(map);


//lecture de la base de donnée pour créer les différentes couches
$.getJSON(urllocalites,function(data)
{
	// création d’une couche geoJson qui appelle le fichier « localites.geojson » pour créer une simple carte des localités étudiées
	var localites= L.geoJson(data,{style: function(feature){
		return { color : 'red', weight : 1.5, fillColor : 'red', fillOpacity : .0, };},
		
		onEachFeature : 
		function(feature, layer ) {layer.bindPopup('<b><u>Nom de la localité</u></b><br>' + feature.properties.a_quartier 
		+'<br><strong>Diagnostic détaillé : </strong> <a href="'+ articlespath + feature.properties.link_1 +'" style="text-transform: capitalize;">'
		+ feature.properties.a_quartier +'</a>')},
});
		

localites.beforeAdd = function (map) {legendVuln.remove(map);};
localites.addTo(map);
controlLayers.addOverlay(localites, "Localités","<strong>Diagnostic des localités</strong>");

// création d’une couche geoJson qui appelle le fichier « localites.geojson » pour créer carte en fonction des vulnérabilités
var vulnLocalites= L.geoJson(data,{style: function(feature){
	return { color : getColorVuln(feature.properties.Points_deau_diagnostiqués_conformes_aux_normes_OMS,feature.properties.Nombre_de_points_deau_diagnostiqués,feature.properties.EAU_SODECI,feature.properties.Pompes_Fonctionnelles), weight : 1, fillColor : getColorVuln(feature.properties.Points_deau_diagnostiqués_conformes_aux_normes_OMS,feature.properties.Nombre_de_points_deau_diagnostiqués,feature.properties.EAU_SODECI,feature.properties.Pompes_Fonctionnelles), fillOpacity : .5 };},

		onEachFeature : 
		function(feature, layer ) {layer.bindPopup('<b><u>Nom de la localité</u></b><br>' + feature.properties.a_quartier 
		+'<br><strong>Niveau de Vulnérabilité : </strong>'+ colorToVulnLevel(getColorVuln(feature.properties.Points_deau_diagnostiqués_conformes_aux_normes_OMS,feature.properties.Nombre_de_points_deau_diagnostiqués,feature.properties.EAU_SODECI,feature.properties.Pompes_Fonctionnelles))
		+'<br><strong>Diagnostic détaillé : </strong> <a href="'+ articlespath + feature.properties.link_1 +'" style="text-transform: capitalize;">'
		+ feature.properties.a_quartier +'</a>')},
});	

vulnLocalites.beforeAdd = function (map) {legendVuln.addTo(map);};
controlLayers.addOverlay(vulnLocalites, "Niveau de Vulnérabilité","<strong>Diagnostic des localités</strong>");

});