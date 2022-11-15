const BASE_URL = 'http://localhost:5000/api';
let tBody = document.querySelector('tbody');

const handleDelete = async (id) => {
    fetch(`${BASE_URL}/samples/delete/${id}`, {
        method: "DELETE"
    })
        .then(() => {
            window.location.reload();
        })
}

const dataLabel = fetch(`${BASE_URL}/labels`, {
    method: 'GET',
})
    .then(response => response.json())
    .then((result) => {
        console.log('Success:', result.data);
        const labels = result.data;
        tBody.innerHTML = '';
        for (let i = 0; i < labels.length; i++) {
            fetch(`${BASE_URL}/samples/labels/${labels[i].id}`, {
                method: 'GET',
            })
                .then(res => res.json())
                .then((resu) => {
                    let samples = resu.data;
                    for (let j = 0; j < samples.length; j++) {
                        tBody.innerHTML += `
                        <tr>
                            <td>${samples[j].id}</td>
                            <td>${samples[j].path}</td>
                            <td>${samples[j].description}</td>
                            <td>${samples[j].status}</td>
                            <td>${labels[i].title}</td>
                            <td>
                                <a href="./admin_info_sample.html"
                                    class="btn btn-warning mr-3 mt-2 mt-xl-0"">
                                    <span class="text-white fs-4"> Update</>
                                </a>
                                <button type="button"
                                    class="btn btn-danger mr-3 mt-2 mt-xl-0" onclick="handleDelete(${samples[j].id})">
                                    <span class="text-white fs-4"> Delete</>
                                </button>
                            </td>
                        </tr>
                    `
                    }
                })
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });