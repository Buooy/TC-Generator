/* Script */
jQuery(document).ready(function($){

  // All onload functions
  generate_title();
  generate_document('sample');

  // Generate the title
  function generate_title(){
    if( $("#document option:selected").attr("name") == "terms-conditions" ){
      $("#title").text("Terms & Conditions");
    }
    else if( $("#document option:selected").attr("name") == "privacy" ){
      $("#title").text("Privacy");
    }
  }

  // Generates the documentss
  function generate_document(name, doc, type){
    
    // Load Handlebar templates to the main page
    var source;
    var template;
    var context;

    // Document URL
    var document_url;
    if( doc == "privacy" ){
      document_url = 'templates/privacy.hbr';
    }
    else{
      document_url = 'templates/terms-conditions.hbr';
    }

    $.ajax({
        type: 'GET',
        url: document_url,
        cache: true,
        success: function(data) {
            source    = data;
            template  = Handlebars.compile(source);
            context = { company: name };
            var html    = template(context);
            
            if(type=='code'){
              $('#content').text(html);
            }
            else{
              $('#content').html(html); 
            }
        }               
    });
  }

  // Document change
  $("#document").change(function(){
    
    generate_title();
    generate_document( $("#company-name").val(), $("#document option:selected").attr("name"), $("#output-type option:selected").attr("name") );

  });

  // Generate Terms and Conditions
  $("#generate").click(function(e){
    
    e.preventDefault();

    generate_document( $("#company-name").val(), $("#document option:selected").attr("name"), $("#output-type option:selected").attr("name") );

  });

});