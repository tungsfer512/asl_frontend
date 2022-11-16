const BASE_URL = 'http://localhost:5000/api';
let tBody = document.querySelector('tbody');

const handleDelete = async (id) => {
    fetch(`${BASE_URL}/labels/delete/${id}`, {
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
    .then(async (result) => {
        console.log('Success:', result.data);
        const labels = result.data;
        console.log(labels);
        tBody.innerHTML = '';
        for(let i = 0; i < labels.length; i++) {
            fetch(`${BASE_URL}/samples/labels/${labels[i].id}`, {
                method: 'GET',
            })
            .then(res => res.json())
            .then((resu) => {
                tBody.innerHTML += `
                    <tr>
                        <td>${labels[i].id}</td>
                        <td>${labels[i].title}</td>
                        <td>${labels[i].description}</td>
                        <td>${resu.data.length}</td>
                        <td>
                            <button type="button"
                                class="btn btn-danger mr-3 mt-2 mt-xl-0" onclick="handleDelete(${labels[i].id})">
                                <span class="text-white fs-4"> Delete</>
                            </button>
                        </td>
                    </tr>
                `
            })
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });