const cafeList = document.querySelector('#cafe-list');
const form = document.querySelector('#add-cafe-form');

//Create element and render cafe
function renderCafe(doc){
    let li = document.createElement('li');
    let name = document.createElement('span');
    let city = document.createElement('span');
    let cross = document.createElement('div');

    li.setAttribute('data-id', doc.id);
    name.textContent = doc.data().name;
    city.textContent = doc.data().city;
    cross.textContent = 'x';

    li.appendChild(name);
    li.appendChild(city);
    li.appendChild(cross);

    cafeList.appendChild(li);

    //Deleting data
    cross.addEventListener('click', (evt) => {
        let id = evt.target.parentElement.getAttribute('data-id');
        db.collection('cafes').doc(id).delete();
    })
}

//getting data
db.collection('cafes').get().then((snapshot) => {
    snapshot.docs.forEach(doc => {
        renderCafe(doc);
    })

}) 

//saving data
form.addEventListener('submit', (evt) => {
    evt.preventDefault();
    db.collection('cafes').add({
        name: form.name.value,
        city: form.city.value
    });

    form.name.value = '';
    form.city.value = '';
})