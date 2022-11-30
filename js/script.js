const btn = document.getElementById('searchButton');
btn.addEventListener('click', searchLanguage);

function searchLanguage(event) {
    event.preventDefault();
    const textInput = document.getElementById('languageInput');
    const langauage = textInput.value.toLowerCase();
    //nollställer textinput när användaren har sökt/tryckt på knappen
    textInput.value = '';
    //error visas inte 
    document.getElementById('errorMessage').style.display = 'none';

    let populationIndex = 0;

    const countryUrl = `https://restcountries.com/v3.1/lang/${langauage}`;

    fetch(countryUrl)
        .then(
            response => {
                console.log(response);
                //kollar om användaren har angett felaktig input
                if (response.ok == false) throw 'Felaktigt språk. Försök igen';
                return response.json()
            }
        )
        .then(
            countryArrayObject => {
                document.getElementById('countryGroupContainer').innerHTML = '';
                // console.log(countryArrayObject);

                //kollar efter index på landet med den största populationen
                countryArrayObject.forEach(
                    (country, index) => {
                        if (countryArrayObject[populationIndex].population < country.population) {
                            populationIndex = index;
                        }
                    }
                )
                //skapa länderna och lägg till deras info till body
                countryArrayObject.forEach(
                    country => {
                        const cName = document.createElement('h1');
                        cName.innerText = `Country: ${country.name.official}`;
                        const cSubregion = document.createElement('h2');
                        cSubregion.innerText = `Subregion: ${country.subregion}`;
                        const cCapital = document.createElement('h3');
                        cCapital.innerText = `Capital: ${country.capital}`;
                        const cPopulation = document.createElement('h4');
                        cPopulation.innerText = `Population: ${country.population}`;
                        const cFlagImg = document.createElement('img');
                        cFlagImg.src = country.flags.png;

                        //skapar en container för varje enskilt country
                        const countryContainer = document.createElement('div');
                        countryContainer.id = 'countryContainer';
                        countryContainer.append(cName, cSubregion, cCapital, cPopulation, cFlagImg);
                        //kollar ifall country är det landet med den största populationen. Om det är det stylas det därefter
                        if (country == countryArrayObject[populationIndex]) {
                            countryContainer.style.border = '7.5px solid white';
                            cPopulation.style.border = '2px solid white'
                            cPopulation.style.color = 'hsl(0, 99%, 40%)';
                        }
                        //lägger till countryContainer till countryGroupContainer
                        document.getElementById('countryGroupContainer').append(countryContainer);
                    }//arrow-function
                )//forEach
            }//arrow-function
        )//then
        .catch(
            error => {
                //errorMessage visas när det blir ett error
                document.getElementById('errorMessage').style.display = 'block';
                document.getElementById('errorMessage').innerText = `${error} `;
            }
        );
}//function SearchLanguage

