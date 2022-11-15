// (function($) {
//   'use strict';
//   $(function() {
//     $('.file-upload-browse').on('click', function() {
//       var file = $(this).parent().parent().parent().find('.file-upload-default');
//       file.trigger('click');
//     });
//     $('.file-upload-default').on('change', function() {
//       $(this).parent().find('.form-control').val($(this).val().replace(/C:\\fakepath\\/i, ''));
//     });
//   });
// })(jQuery);

const previewVideo = () => {
  
}

const form = document.getElementById('uploadForm');

const sendFile = async () => {
  const myFile = document.getElementById('myFile');
  const formData = new FormData();
  Object.keys(myFile).forEach((key) => {
    formData.append(myFile.item(key).name, myFile.item(key));
  });
  const res = await fetch('http://localhost:5000/api/v1/upload', 
    {
      method: 'POST',
      headers: {
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjY3MzA4OTc3LCJleHAiOjE2NjczMjY5Nzd9.ddkBgnptz1PPRpSQqw7rWzSxn37wvm5OFVv8z-dWxo4'
      } ,
      body: formData
    }
  )
  const json = await res.json();

  const h1 = document.querySelector('h1');
  h1.textContent = json;
  console.log(json);
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  sendFile();
})  

