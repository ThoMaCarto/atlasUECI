// création d’une couche geoJson qui appelle le fichier « localites.geojson » dont l'url est défini dans le template
$.getJSON(urllocalites,function(data)
{
	var localites= L.geoJson(data,{style: function(feature){
		return { color : 'red', weight : 1.5, fillColor : 'red', fillOpacity : .0, };},
		onEachFeature: oneachfeature,
});
//localites.addTo(map);
controlLayers.addOverlay(localites, "Localités","Diagnostic des localités");
});

//Titre et légende de la carte
var maptitle = L.control({position:"bottomright",},);
maptitle.onAdd = function (map){
var div = L.DomUtil.create("div", "legendin");
div.innerHTML ='<strong>Niveau de vulnérabilité des localités</strong><table class="info-legend"><thead><tr ><th></th><th>Milieu rural</th><th>Milieu urbain</th></tr</thead><tbody><tr></tr><tr><td style="background-color:Red;height:10px;width:30px;opacity:.8;border:1px solid Red;"></td><td>Vulnérabilité forte</td><td> Non raccordée au réseau</td></tr><tr></tr><tr><td style="background-color:Orange;height:10px;width:30px;opacity:.8;border:1px solid Orange;"></td><td>Vulnérabilité moyenne</td><td>Partiellement raccordée</td></tr><tr></tr><tr><td style="background-color:yellow;height:10px;width:30px;opacity:.8;border:1px solid yellow;"></td><td>Vulnérabilité faible</td><td>Majoritairement raccordée</td></tr></tbody></table>';
return div;
}
maptitle.addTo(map);

 // fonction pour l'affichage dans le panneau à droite des données du point       
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
                        			tableNew += '<tr><td style="max-width:300px;"><strong>'+prop+" : </strong></td><td>"+feature.properties[prop]+"</td></tr>" ;
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
						
		var marker = new L.circleMarker([e.latlng.lat, e.latlng.lng],{radius: 10, color: 'dodgerblue', fillColor: 'dodgerblue',weight: 3,fillOpacity: 0,dashArray:"5",})
		.addTo(map);
		if (markers.length > 0) {map.removeLayer(markers.pop());}
		var marker;
		markers.push(marker)
      return marker;
		
		
}

//Création d'un compteur de marker
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
 
// fonction d'affichage de la DB



// création d’une couche geoJson qui appelle le fichier « localites.geojson »
$.getJSON(urllocalites,function(data2)
{
	var vulnLocalites= L.geoJson(data2,{style: function(feature){return { color : getColorVuln(feature.properties.Points_deau_diagnostiqués_conformes_aux_normes_OMS,feature.properties.Nombre_de_points_deau_diagnostiqués,feature.properties.EAU_SODECI,feature.properties.Pompes_Fonctionnelles), weight : 1, fillColor : getColorVuln(feature.properties.Points_deau_diagnostiqués_conformes_aux_normes_OMS,feature.properties.Nombre_de_points_deau_diagnostiqués,feature.properties.EAU_SODECI,feature.properties.Pompes_Fonctionnelles), fillOpacity : .5 };},
	onEachFeature: oneachfeature,
});
vulnLocalites.addTo(map);
controlLayers.addOverlay(vulnLocalites, "Niveau de Vulnérabilité","Diagnostic des localités");
});


