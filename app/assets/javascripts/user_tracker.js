var ready, setVisitorUidOnForm, generateUID, getUID, existsUID, user_uid, current_page, current_date, data, extractPage;

generateUID = function(){
  var c = 1
  var d = new Date(),
  m = d.getMilliseconds() + "",
  u = ++d + m + (++c === 10000 ? (c = 1) : c);
  localStorage.setItem('user_tracker_uid', u);
  return u;
};

getUID = function() {
  return localStorage.getItem('user_tracker_uid')
};

existsUID = function(){
  return localStorage.getItem('user_tracker_uid')!=null;
};

setVisitorUidOnForm = function(){
  document.getElementById("visitor_id_").value=String(createOrGetUID());
}

extractPage = function(url){
  var page;
  if (url.indexOf("about") != -1) {
    page = 'about'
  }
  else if (url.indexOf("prices") != -1) {
    page = 'prices'
  }
  else if (url.indexOf("contact") != -1) {
    page = 'contact'
  }
  else {
    page = 'home'
  }

  return page;
};

createOrGetUID = function(){
  if(existsUID()){
    return getUID();
  }
  else {
    return generateUID();
  }
};

ready = function() {
  user_uid = createOrGetUID();

  current_page = extractPage(window.location.href);
  current_date = new Date();

  data = {
    'visited_page': {
      'page': current_page,
      'accessed_at': current_date
    }
  };
  var url;
  if(window.location.href.indexOf("localhost") != -1){
    url = "http://localhost:3000/visitors/"+user_uid+"/visited_pages";
  }
  else {
    url = "http://user-tracker.herokuapp.com/visitors/"+user_uid+"/visited_pages";
  }
  
  $.ajax({
    url: url,
    type: "POST",
    data: data,
    success: function(resp){}
  });
};

$(document).ready(ready);
$(document).on('page:load', ready);
