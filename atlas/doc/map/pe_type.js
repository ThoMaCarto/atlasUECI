//


///// Création de la charte graphique
//Couleur en fonction de la présence d'E. coli
function getColorEcoli(ecoli) {
          if (ecoli == 0 == true) {
          	return('green');
          }
          else if (ecoli > 0 == true) {
          	return('Red');
          }
          else {
          	return('grey');
          }
       };
       
//Couleur en fonction de la concentration en Nitrates
 function getColorNitrates(Nitrate) {
          if (Nitrate < 50 == true) {
          	return('green');
          }
          else if (Nitrate >= 50 == true) {
          	return('Red');
          }
          else {
          	return('grey');
          }
       }; 
//Couleur en fonction de la concentration en Ammoniac
function getColorAmmoniac(Ammoniac) {
          if (Ammoniac < 1 == true) {
          	return('green');
          }
          else if (Ammoniac >= 1 == true) {
          	return('Red');
          }
          else {
          	return('grey');
          }
       };  
       
          

//lecture de la base de donnée
$.getJSON(urlpointdeau,function(data){
	
	//transformation de la base de donnée en couche (Layer)
	
	// création de la couche E coli
	var Ecoli = L.geoJson(data,{
		
		//Affichage sous forme de point
		pointToLayer:function(feature,latlng){
			//caractéristique des points
			var marker = L.circleMarker(latlng,{radius: 5,fillOpacity: 1, color: 'black', fillColor: getColorEcoli(feature.properties.ecoli),weight: 1,fillOpacity: 0.8,});
			//caractéristiques des popup
			marker.bindPopup('<p>Comptage <em>E. coli</em>: ' + feature.properties.ecoli + ' UFC / 100 ml</p>');			
			//Affichage des marqueurs
			return marker;
		}
		});
	//Affichage sur la carte
	Ecoli.addTo(map);
	//Affichage dans le controleur de couche
	controlLayers.addOverlay(Ecoli, "Contamination par <em>E. coli</em>", "<strong>Diagnostic des points d'eau</strong>");
	
	//Création de la couche Nitrate
	var Nitrate = L.geoJson(data,{
		
		//Affichage sous forme de point
		pointToLayer:function(feature,latlng){
			//caractéristique des points
			var marker = L.circleMarker(latlng,{radius: 5,fillOpacity: 1, color: 'black', fillColor: getColorNitrates(feature.properties.nitrate),weight: 1,fillOpacity: 0.8,});
			//caractéristiques des popup
			marker.bindPopup('<p>Concentration en Nitrate: ' + feature.properties.nitrate + ' mg/l</p>');			
			//Affichage des marqueurs
			return marker;
		}
		});
	controlLayers.addOverlay(Nitrate, "Pollution au Nitrate", "<strong>Diagnostic des points d'eau</strong>");
	
	//Création de la couche Ammoniac
	var Ammoniac = L.geoJson(data,{
		
		//Affichage sous forme de point
		pointToLayer:function(feature,latlng){
			//caractéristique des points
			var marker = L.circleMarker(latlng,{radius: 5,fillOpacity: 1, color: 'black', fillColor: getColorAmmoniac(feature.properties.ammoniac),weight: 1,fillOpacity: 0.8,});
			//caractéristiques des popup
			marker.bindPopup('<p>Concentration en Ammoniac: ' + feature.properties.ammoniac + '  mg/l</p>');			
			//Affichage des marqueurs
			return marker;
		}
		});
	controlLayers.addOverlay(Ammoniac, "Pollution à l'Ammoniac", "<strong>Diagnostic des points d'eau</strong>");
});



