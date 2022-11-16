const BASE_URL = 'http://localhost:5000/api';
let form = document.querySelector('#addLabelForm');

form.addEventListener('submit', (e) => {
    let title = document.querySelector("#addLabelFormTitle").value;
    let description = document.querySelector("#addLabelFormDescription").value;
    e.preventDefault();
    fetch(`${BASE_URL}/labels/add`, {
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify({
        title: title, 
        description: description
    })
})
    .then(response => response.json())
    .then( (result) => {
        console.log('Success:', result.data);
        window.location.replace('./admin_label.html')
    })
    .catch(error => {
        console.error('Error:', error);
    });
})
