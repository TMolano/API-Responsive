const key = '57acb95e5d18bf2ef168007fd66dd5ce';
const api_endpoint = 'https://gateway.marvel.com/v1/public/comics';


//Fetch API data


//Filter Comics based off Search Input

const form = document.getElementById('search-form');
form.onsubmit = function (ev) {
    ev.preventDefault();

    const filterValue = document.getElementById('searchbar').value.toUpperCase();
    const inputValue = document.getElementById('searchbar').value;
    const url = `${api_endpoint}?titleStartsWith=${filterValue}&limit=40&orderBy=issueNumber%2Ctitle&apikey=${key}`;

    fetch(url)

        .then(results => results.json())

        .then(resultsJSON => {
            //Insert API data
            let newContent = '';
            console.log(resultsJSON.data.results);

            if(resultsJSON.data.results.length > 20) {
                load.style.display = "block";
                for (let i = 0; i < 20; i++) {
                    newContent += '<li class="comicItem"><article>' + '<img src="' + resultsJSON.data.results[i].thumbnail.path + '.jpg"' + ' alt="image of comic art">';
                    newContent += '<p>' + resultsJSON.data.results[i].title + '</p></article></li>';
                }
            }
            else if(resultsJSON.data.results.length <= 20 && resultsJSON.data.results.length > 0) {
                load.style.display = "none";
                for (let i = 0; i < resultsJSON.data.results.length; i++) {
                    newContent += '<li class="comicItem"><article>' + '<img src="' + resultsJSON.data.results[i].thumbnail.path + '.jpg"' + ' alt="image of comic art">';
                    newContent += '<p>' + resultsJSON.data.results[i].title + '</p></article></li>';
                }
            }

            else if (resultsJSON.data.results.length === 0) {
                alert("No results found for that search query");
            }

            let apiResults = document.querySelector('ul#comicList');
            apiResults.innerHTML = newContent;

            function inputResults() {
                let resultsHeader = document.getElementById('results-of-search');
                resultsHeader.innerHTML = resultsJSON.data.results.length + " Results for \"" + inputValue + "\"";

                let body = document.getElementById("body");
                body.style.overflowY = "visible";

                let header = document.getElementById("header");
                header.style.height = "25rem";

            }

            let li = document.querySelectorAll('.comicItem');
            for(let i = 0; i < li.length;i++){

                let a = li[i].getElementsByTagName('p')[0];
                if(a.innerHTML.toUpperCase().indexOf(filterValue) > -1){
                    li[i].style.display = '';
                }

                else {
                    li[i].style.display = 'none';

                }

                inputResults();

            }

        })

        .catch( error => {
            console.log('An Error Occurred:', error);
            alert("Items not available, try again")
        });
};

const load = document.getElementById("load");

load.addEventListener("click", function () {

    load.style.display = "none";

    const filterValue = document.getElementById('searchbar').value.toUpperCase();
    const inputValue = document.getElementById('searchbar').value;
    const url = `${api_endpoint}?titleStartsWith=${filterValue}&limit=40&orderBy=issueNumber%2Ctitle&apikey=${key}`;

    fetch(url)

        .then(results => results.json())

        .then(resultsJSON => {
            //Insert API data
            let newContent = '';
            console.log(resultsJSON.data.results);

            for (let i = 21; i < 40; i++) {
                newContent += '<li class="comicItem"><article>' + '<img src="' + resultsJSON.data.results[i].thumbnail.path + '.jpg"' + ' alt="image of comic art">';
                newContent += '<p>' + resultsJSON.data.results[i].title + '</p></article></li>';
            }
            let apiResults = document.querySelector('ul#comicList');
            apiResults.insertAdjacentHTML("beforeend", newContent);

            document.getElementById("comicList").style.height = "fit-content";

        })

        .catch(error => {
            console.log('An Error Occurred:', error)
        });
});
