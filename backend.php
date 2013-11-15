<?php 

function getFiles($filters) {
	extract($filters);

	$filesRepo = array(
		array(
			'id'=>1, 
			'title' => 'Ember.js - About', 
			'body'=> 'Ember.js incorporates common idioms so you can focus on what makes your app special, not reinventing the wheel. Productivity. Ember.js is built for productivity ..',
			'author_firstname'=> 'Pepe',
			'author_lastname'=> 'Vazquez',

		),

		array(
			'id'=>2, 
			'title' => 
			'EmberJS (emberjs) on Twitter', 
			'body'=> 'The latest from EmberJS (@emberjs). A JavaScript framework for creating ambitious web apps.',
			'author_firstname'=> 'Gitllermo',
			'author_lastname'=> 'M.',

		),
	
		array(
			'id'=>3, 
			'title' => 'Why does Ember.js rock? - Kerrick Long', 
			'body'=> ' Ember.js is a MVC (Model – View – Controller) JavaScript framework which is ... I could spend all day writing about why you should try Ember.js, but its probably ...',
			'author_firstname'=> 'Pither',
			'author_lastname'=> 'Costa',
		),


	);
	if (empty($query) && empty($id)) {
		return $filesRepo ;
	}elseif (isset($id)) {
		return array_values(array_filter($filesRepo, function($elem) use ($id) {
			return  $elem['id'] == $id ;
		}));
	}else{
		return array_values(array_filter($filesRepo, function($elem) use ($query) {
			return ( stripos ($elem['title'].$elem['body'], $query) !== false ) ;
		}));
	}
}

function sendResponse($files) {
	echo json_encode( array(	
		"files" => $files
	));
	header('Content-Type: application/json');
	exit;
}


$files = getFiles($_REQUEST);
sendResponse($files);