//Useful Scripts Javascript


//Droparea script replacing input type file
let dropArea = document.getElementById('drop-area')
;['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
   dropArea.addEventListener(eventName, preventDefaults, false)
})

function preventDefaults (e) {
   e.preventDefault()
   e.stopPropagation()
}


dropArea.addEventListener('drop', handleDrop, false);

function handleDrop(e) {
   var dt = e.dataTransfer
   var files = dt.files

   handleFiles(files)
}


//convert fileList to array
function handleFiles(files) {
   files = [...files];
   files.forEach(uploadFile);
   document.getElementById("fileElem").value = "";
}

function uploadFile(file) {
   var url = "mtc_file_filt.cgi"
   var xhr = new XMLHttpRequest()
   var formData = new FormData()
   xhr.open('POST', url, true)

   xhr.addEventListener('readystatechange', function(e) {
      if (xhr.readyState == 4 && xhr.status == 200) {
         loadXMLDoc();
      }
      else if (xhr.readyState == 4 && xhr.status != 200) {
         // Error. Inform the user
      }
   })

   formData.append('file', file)
   xhr.send(formData)
}




//script for simulating a form post request
function simulateForm(action){
  if(action === 'delete'){
     if(!confirm("The selected file will be deleted do you wish to continue?"))
     return false;
  }
  xmlhttp2=new XMLHttpRequest();
  xmlhttp2.open("POST", 'mtc_filt_write.cgi', true);
  xmlhttp2.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  document.getElementById("progress").style.display = "block";
  xmlhttp2.onreadystatechange=function(){
     if (this.readyState === 4 && this.status === 200) {
        loadXMLDoc();
     }
  }
  if(action=="Remove"){
     var selectedFilt = document.getElementById("filters").value;
     for(var i =0;i<activeFilters.length;i++){
        if(activeFilters[i] === selectedFilt){
           xmlhttp2.send("sel_filt="+ selectedFilt +"&action=Remove");  
           break; 
        }
     }
  }else{
     xmlhttp2.send("all_filt="+ document.getElementById("filters").value +"&action=" + action);    
  }
}

