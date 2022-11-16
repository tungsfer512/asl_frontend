const BASE_URL = 'http://localhost:5000/api';
let form = document.querySelector('#editSampleForm');
let selectSampleStatus = document.querySelector('#selectSampleStatus');
let sampleDescription = document.querySelector('#sampleDescription');
let url_str = document.URL
console.log(url_str);
let url = new URL(url_str);
let search_params = url.searchParams;
let id = search_params.get('id');
console.log(id);

const dataLabel = fetch(`${BASE_URL}/samples/${id}`, {
    method: 'GET',
})
    .then(response => response.json())
    .then((result) => {
        console.log('Success:', result.data);
        const sample = result.data;
        sampleDescription.value = sample.description;
        selectSampleStatus.value = sample.status;
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            let description = sampleDescription.value;
            console.log(description);
            let status = selectSampleStatus.value;
            console.log(status);
            fetch(`${BASE_URL}/samples/update/${id}`, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: 'PUT',
                body: JSON.stringify({
                    status: status,
                    description: description
                })
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


