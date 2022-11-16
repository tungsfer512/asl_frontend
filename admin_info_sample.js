const BASE_URL = 'http://localhost:5000/api';
let form = document.querySelector('#addSampleForm');
let selectLabel = document.querySelector('#selectLabel');

fetch(`${BASE_URL}/labels`, {
    method: 'GET',
})
    .then(response => response.json())
    .then(async (result) => {
        console.log('Success:', result.data);
        const labels = result.data;
        console.log(labels);
        selectLabel.innerHTML = '';
        for (let i = 0; i < labels.length; i++) {
            selectLabel.innerHTML += `
                <<option value="${labels[i].id}">${labels[i].title}</option>
            `;
        };

        form.addEventListener('submit', (e) => {
            var formData = new FormData(form);
            e.preventDefault();
            fetch(`${BASE_URL}/samples/add`, {
                method: 'POST',
                body: formData
            })
                .then(response => response.json())
                .then((result) => {
                    console.log('Success:', result.data);
                    window.location.replace('./admin_sample.html')
                })
                .catch(error => {
                    console.error('Error:', error);
                });
        })

    })
    .catch(error => {
        console.error('Error:', error);
    });

