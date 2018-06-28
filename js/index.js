const key = '57acb95e5d18bf2ef168007fd66dd5ce';
const api_endpoint = 'https://gateway.marvel.com/v1/public/comics';


//Fetch API data


//Filter Comics based off Search Input

const form = document.getElementById('search-form');
form.onsubmit = function (ev) {
    ev.preventDefault();

    const filterValue = document.getElementById('searchbar').value.toUpperCase();
    const inputValue = document.getElementById('searchbar').value;
    const url = `${api_endpoint}?titleStartsWith=${filterValue}&orderBy=issueNumber%2Ctitle&apikey=${key}`;

    fetch(url)

        .then(results => results.json())

        .then(resultsJSON => {
            //Insert API data
            let newContent = '';
            console.log(resultsJSON.data.results);
            for(let i = 0; i < resultsJSON.data.results.length; i++)
            {
                newContent += '<li class="comicItem"><article>'+ '<img src="' + resultsJSON.data.results[i].thumbnail.path + '.jpg"' + ' alt="image of comic art">';
                newContent += '<p>' + resultsJSON.data.results[i].title + '</p></article></li>';
            }
            let apiResults = document.querySelector('ul#comicList');
            apiResults.innerHTML = newContent;

            let ul = document.getElementById('comicList');

            let li = document.querySelectorAll('.comicItem');

            function inputResults() {
                let resultsHeader = document.getElementById('results-of-search');
                resultsHeader.innerHTML = li.length + " Results for \"" + inputValue + "\"";

                let body = document.getElementById("body");
                body.style.overflowY = "visible";

                let header = document.getElementById("header");
                header.style.height = "25rem";


            }

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
            console.log('An Error Occurred:', error)
        });
};