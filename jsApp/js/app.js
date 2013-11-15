// ----  HTML Rendering functions ----
// This are not needed when the App is builded with EmberJS or similar framework
function renderSearchString(str) {
  $("#query-text").text(str);
}

function renderResults(files){
  // Cleanup the dynamic table
  $table = $('#file-list');
  $table.html(''); 

  // Iterate over results and buidl the html:
  $(files).each(function(index, elem){
    var $row = $('<tr></tr>') ;
    $row.data('file-id', elem.id);
    $row.append('<td><a href="#">'+elem.title+'</a></td>');
    $row.append('<td>'+elem.author_firstname+' ' + elem.author_lastname + '</td>');
    $table.append($row);
  });
  // Update references:  
}

function renderSingleFile(file){

  $ct = $('.file-details');
  $ct.html('');
  $ct.append('<h1>'+file.title+'</h1>' );
  $ct.append('<h2>by: '+file.author_firstname+ ' ' +file.author_lastname + '</h2>' );
  $ct.append('<div class="intro">' + file.body + '</div>' );
  // Update references:  
}


// ---- Ajax wrappers ----
function fetchFiles(query){
  return $.getJSON('../backend.php?query='+query);
}

function fetchSingleFile(id){
  return $.getJSON('../backend.php?id='+id);
}


// ---- Event Bindings -----
$(function(){
  // Event binding
  $('#search-input').keyup(function(){
    var query = $(this).val();
    renderSearchString(query);
    // After Fetching files neet to explicity call the page refresh function:
    fetchFiles(query).then(function(data){
      renderResults(data.files);
    });
  });


  $('#file-list').on('click', 'tr a',function() {
    var id = $(this).closest('tr').data('file-id');
    if (id){
      fetchSingleFile(id).then(function(data){
        renderSingleFile(data.files[0]);
      });
    }
  });


  // main
    fetchFiles('').then(function(data){
      renderResults(data.files);
    });
});

