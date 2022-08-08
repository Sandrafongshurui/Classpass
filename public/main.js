function openLoginModal() {
    const xhttp = new XMLHttpRequest();
    xhttp.onload = function() {
      const list = document.getElementById("myLoginModal").classList
    list.add("show")
};
    xhttp.open("GET", "ajax_info.txt");
    xhttp.send();
  }
