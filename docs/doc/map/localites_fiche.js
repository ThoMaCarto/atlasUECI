// création d’une couche geoJson qui appelle le fichier « localites.geojson » dont l'url est défini dans le template
$.getJSON(urllocalites,function(data)
{
	var localites= L.geoJson(data,{style: function(feature){
		return { color : 'red', weight : 1.5, fillColor : 'red', fillOpacity : .0, };},
		onEachFeature : function(feature, layer ) {layer.bindPopup('<b><u>Nom de la localité</u></b><br>' + feature.properties.a_quartier +'<br>Niveau de Vulnérabilité : '+ feature.properties.vulnerabil+
	 '<br><strong> Diagnostic détaillé : </strong> <a href="articles/' + articlespath + feature.properties.lien +'" style="text-transform: capitalize;">'+ feature.properties.a_quartier +'</a>')}
});
localites.addTo(map);
controlLayers.addOverlay(localites, "Localités","Diagnostic des localités");
});

//Titre et légende de la carte
var maptitle = L.control({position:"bottomright",},);
maptitle.onAdd = function (map){
var div = L.DomUtil.create("div", "legendin");
div.innerHTML ='<details title="cliquer sur la flèche pour afficher la légende"><summary><strong>Niveau de vulnérabilité des localités</strong></summary><table class="info-legend"><thead><tr ><th></th><th>Milieu rural</th><th>Milieu urbain</th></tr</thead><tbody><tr></tr><tr><td style="background-color:Red;height:10px;width:30px;opacity:.8;border:1px solid Red;"></td><td>Vulnérabilité forte</td><td> Non raccordée au réseau</td></tr><tr></tr><tr><td style="background-color:Orange;height:10px;width:30px;opacity:.8;border:1px solid Orange;"></td><td>Vulnérabilité moyenne</td><td>Partiellement raccordée</td></tr><tr></tr><tr><td style="background-color:yellow;height:10px;width:30px;opacity:.8;border:1px solid yellow;"></td><td>Vulnérabilité faible</td><td>Majoritairement raccordée</td></tr></tbody></table></details>';
return div;
}
maptitle.addTo(map);

//Couleur en fonction de la vulnérabilité
function getColorVuln(vulnerabilit) {
          switch (vulnerabilit) {
            case 'Vulnérabilité faible':
              return  'yellow';
            case 'Vulnérabilité moyenne':
              return 'orange';
            case 'Vulnérabilité forte':
              return 'red';
            case 'Majoritairement':
            	return 'yellow';
            case 'Partiellement':
            	return 'orange';
     		default:
              return 'DarkSlateGray ';
          }
        };
        




// Ne pas oublier de définir les fonctions url (ici urllocalites) dans le template des pages ou articles.
// création d’une couche geoJson qui appelle le fichier « localites.geojson » dont l'url est défini dans le template
$.getJSON(urllocalites,function(data)
{
	var vulnLocalites= L.geoJson(data,{style: function(feature){
		return { color : getColorVuln(feature.properties.vulnerabil), weight : 1, fillColor : getColorVuln(feature.properties.vulnerabil), fillOpacity : .5 };},
		onEachFeature : function(feature, layer ) {layer.bindPopup('<b><u>Nom de la localité</u></b><br>' + feature.properties.a_quartier +'<br>Niveau de Vulnérabilité : '+ feature.properties.vulnerabil+
	 '<br><strong> Diagnostic détaillé : </strong> <a href="articles/'+ feature.properties.lien +'" style="text-transform: capitalize;">'+ feature.properties.a_quartier +'</a>')}
});
//vulnLocalites.addTo(map);
controlLayers.addOverlay(vulnLocalites, "Niveau de Vulnérabilité","Diagnostic des localités");
});

