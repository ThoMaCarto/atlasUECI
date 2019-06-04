



var table = new Tabulator("#localites-table", {
	ajaxURL:urllocalites,
	//ajaxConfig:"POST",
	//ajaxContentType:"json",
	
	//data:tabledata,           //load row data from array
	height: 350,
	 dataTree:true,
	//layout:"fitColumns",      //fit columns to width of table
	//responsiveLayout:"hide",  //hide columns that dont fit on the table
	//tooltips:true,            //show tool tips on cells
	//addRowPos:"top",          //when adding a new row, add it to the top of the table
	history:true,             //allow undo and redo actions on the table
	//pagination:"local",       //paginate the data
	//paginationSize:10,         //allow 7 rows per page of data
	//movableColumns:true,      //allow column order to be changed
	//resizableRows:true,       //allow row order to be changed
	initialSort:[             //set the initial sort order of the data
		{column:"name", dir:"asc"},
	],
	 //autoColumns:true,
	 columns:[                 //define the table columns
		{title:"Localité", field:"properties.a_quartier",frozen:true},
		{title:"Niveau de vulnérabilité", field:"properties.vulnerabil"},
		{title:"Raccordé à la SODECI", field:"properties.Sheet1_EAU"},
		{title:"Nombre de Pompes fonctionnelles", field:"properties.Sheet1_Pom"},
		{title:"Nombre de Pompes en panne", field:"properties.Sheet1_P_1"},
		{title:"Comité de gestion", field:"properties.Sheet1_CGP"},
		{title:"Demande des habitants", field:"properties.Sheet1_Bes"},
		{title:"Localité", field:"geometry.type",visible:false},
		{title:"Localité", field:"geometry.coordinates",visible:false},
		
	],
	
});



//table.setFilter("properties.a_quartier", "=", "Lokanou");

//trigger download of data.csv file
$("#download-csv").click(function(){
    table.download("csv", "localites.csv");
});

//trigger download of data.json file
//$("#download-json").click(function(){
//    table.download("json", "data.json");


//Trigger setFilter function with correct parameters
function updateFilter(){

    var filter = $("#filter-field").val() == "function" ? customFilter : $("#filter-field").val();

    if($("#filter-field").val() == "function" ){
        $("#filter-type").prop("disabled", true);
        $("#filter-value").prop("disabled", true);
    }else{
        $("#filter-type").prop("disabled", false);
        $("#filter-value").prop("disabled", false);
    }

    table.setFilter(filter, $("#filter-type").val(), $("#filter-value").val());
}

//Update filters on value change
$("#filter-field, #filter-type").change(updateFilter);
$("#filter-value").keyup(updateFilter);

//Clear filters on "Clear Filters" button click
$("#filter-clear").click(function(){
    $("#filter-field").val("");
    $("#filter-type").val("=");
    $("#filter-value").val("");

    table.clearFilter();
});




var table = new Tabulator("#ptseau-table", {
	ajaxURL:urlpointdeau,
	//ajaxConfig:"POST",
	//ajaxContentType:"json",
	
	//data:tabledata,           //load row data from array
	height: 350,
	 dataTree:true,
	//layout:"fitColumns",      //fit columns to width of table
	//responsiveLayout:"hide",  //hide columns that dont fit on the table
	//tooltips:true,            //show tool tips on cells
	//addRowPos:"top",          //when adding a new row, add it to the top of the table
	history:true,             //allow undo and redo actions on the table
	//pagination:"local",       //paginate the data
	//paginationSize:10,         //allow 7 rows per page of data
	//movableColumns:true,      //allow column order to be changed
	//resizableRows:true,       //allow row order to be changed
	initialSort:[             //set the initial sort order of the data
		{column:"name", dir:"asc"},
	],
	// autoColumns:true,
	 columns:[                 //define the table columns
		{title:"Localité", field:"properties.Quartier",frozen:true},	 	
	 	{title:"Id", field:"properties.ID_point d'eau",frozen:true,width:50,},
		{title:"Zone", field:"properties.Zone",headerFilter:true},
		
		{
			title:"Description du point d'eau",
			columns: [
		{title:"Responsable de la construction",field:"properties.Responsable de la construction"},
{title:"Construction",field:"properties.Année de construction"},
{title:"Type",field:"properties.Types de points d\'eau"},
{title:"Profondeur",field:"properties.Profondeur (m)"},
{title:"Niveau de la nappe",field:"properties.Niveau_nappe"},
{title:"Margelle",field:"properties.Margelle"},
{title:"Dalle",field:"properties.Dalle anti-bourbier"},
{title:"Trottoir",field:"properties.Trottoir"},
{title:"Clôture",field:"properties.Clôture"},
{title:"Canal de drainage",field:"properties.Canal d\'évacuation des eaux"},
{title:"Courvercle adapté",field:"properties.Couvercle adapté"},
{title:"État de la superstructure",field:"properties.Etat de la superstructure"},
{title:"Type d'exhaure",field:"properties.Type d\'exhaure"},
{title:"Disponibilité de l'eau en saison sèche",field:"properties.Disponibilité de l\'eau toute l\'année"},
{title:"Mois de tarissement",field:"properties.Mois de rupture"},
{title:"Entretien",field:"properties.Entretien du PE"},
{title:"Type d'entretien",field:"properties.Types d’entretien"},
{title:"Fréquence des pannes (par an)",field:"properties.Freq_panne"},
{title:"Type de panne",field:"properties.type_pannes"},
{title:"Pièce défaillante sur la pompe",field:"properties.piece_defaillante_sur_pompe"},
{title:"Responsable de l'entretien",field:"properties.responsable_entretien"},
{title:"Variation du niveau de la nappe",field:"properties.Variation du niveau de la nappe"},
{title:"Accès",field:"properties.Accès"},
{title:"Coût de l'accès",field:"properties.Service collecte"},
]
},

{
			title:"Diagnostic sanitaire du point d'eau",
			columns: [
{title:"Niveau de vulnérabilité",field:"properties.Note d\'évaluation de la vulnérabilité",formatter:"star"},
{title:"Source de pollution à proximité",field:"properties.Source de pollution à une distance inférieure à 3Non m/OuiNonNon m"},
{title:"type de source de pollution",field:"properties.Décrire la source de pollution"},
{title:"Absence de Clôture",field:"properties.Absence ou la déficience de la clôture"},
{title:"Déficience du canal de draînage",field:"properties.Canal de drainage est inférieur en distance à 2 m, sale ou défectueux"},
{title:"Présence d'eau stagnante",field:"properties.Eau stagnante près de l’ouvrage"},
{title:"Dalle inférieur à la norme",field:"properties.Dalle de l’ouvrage présente une largeur minimale inférieure à Ouim/ouvrage"},
{title:"Fissure sur la superstructure",field:"properties.Dalle ou la margelle de l’ouvrage présente-t-elle des craquelures ou des fentes"},
{title:"Absence de couvercle approprié",field:"properties.Couvercle de l’ouvrage est-il inapproprié"},
{title:"Insuffisance d'étanchéité",field:"properties.Etanchéité) médiocre ou insuffisante ou inexistante sur les 3 m en-dessous du niveau du sol"},
{title:"Défaut d'hygiène aux alentours",field:"properties.Manque d\'hygiène autour du point d’eau"},
{title:"Défaut d'hygiène du système d'exhaure",field:"properties.Système d’exhaure est en mauvaise condition ou sale ou impropre"},

]
},

{title:"Analyse de la qualité de l'eau",
			columns: [

//{title:"Couleur de l'eau",field:"properties.Couleur"},
{title:"Description de l'aspect",field:"properties.Décrire l\'aspect"},
//{title:"Goût",field:"properties.Gôut"},
{title:"Description du goût",field:"properties.Décrire l\'aspect"},
//{title:"Odeur",field:"properties.Odeur"},
{title:"Description de l'odeur",field:"properties.Décrire l\'aspect"},
{title:"pH",field:"properties.pH"},
{title:"Conductivité (µS/cm)",field:"properties.Conductivité (µS/Cm)"},
{title:"Turbidité (UTN)",field:"properties.Turbidité (UTN)"},
{title:"Température (°C)",field:"properties.Température (°C)"},

{title:"Chlore libre (mg/l)",field:"properties.Chlore libre (mg/L)"},
{title:"Chlore total (mg/l)",field:"properties.Chlore total (mg/L)"},
{title:"Ammoniac (mg/l)",field:"properties.Ammoniac (mg/L)"},
{title:"Nitrates (mg/l)",field:"properties.Nitrate (mg/L)"},
{title:"Nitrite (mg/l)",field:"properties.Nitrite (mg/L)"},
{title:"Arsenic (mg/l)",field:"properties.Arsenic (mg/L)"},
{title:"Fluor (mg/l)",field:"properties.Fluor (mg/L)"},
{title:"E. Coli (UFC/100ml)",field:"properties.E Coli  (UFC/100 mL)"},

]
},

{title:"Commentaires",field:"properties.Noter les commentaires", visible:false},

		
		//{title:"Localité", field:"geometry.type"},
		{title:"Coordonnées géographiques", field:"geometry.coordinates",},
		
	],
	
});



//table.setFilter("properties.a_quartier", "=", "Lokanou");

//trigger download of data.csv file
$("#download-csv").click(function(){
    table.download("csv", "localites.csv");
});

//trigger download of data.json file
//$("#download-json").click(function(){
//    table.download("json", "data.json");

