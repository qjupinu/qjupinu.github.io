document.getElementById('load-facts').addEventListener('click', function () {
    fetch('json/data.json')
        .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
        })
        .then(data => {
        const factsList = document.getElementById('facts-list');
        factsList.innerHTML = '';
        data.facts.forEach(fact => {
            const listItem = document.createElement('li');
            listItem.textContent = fact;
            factsList.appendChild(listItem);
        });
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
});