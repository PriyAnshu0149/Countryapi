const countriesContainer = document.querySelector('.countries-container') 
const filterByRegion = document.querySelector('.filter-by-region')
const searchInput =document.querySelector('.search-container input')

let allCountriesData 

fetch('https://restcountries.com/v3.1/all?fields=name,capital,flags,population,region')
  .then(res => res.json())
  .then((data)=>{
    rendercountries(data)
    allCountriesData = data
  

  })
   
  
 
filterByRegion.addEventListener('change',()=>{
//   console.log(event.target.value)
fetch(`https://restcountries.com/v3.1/region/${filterByRegion.value}`)
  .then(res => res.json())
  .then(rendercountries)
    
  
})

function rendercountries(data){
countriesContainer.innerHTML= ''
    data.forEach((country)=>{
       // console.log(country.flags.svg);
        const countryCard = document.createElement('a')
countryCard.classList.add('country-card')
countryCard.href = `/country.html?name=${country.name.common}`


const cardHTML =`
  <img src="${country.flags.svg}" alt="${country.name.common}">
            <div class="card-text">
                <h3 class="card-title">${country.name.common}</h3>
                <P><b>Population: </b>${country.population.toLocaleString('en-IN')}</P>
                <P><b>Region: </b>${country.region}</P>
                <P><b>Capital: </b>${country.capital}</P>
            </div>

`
countryCard.innerHTML = cardHTML
countriesContainer.append(countryCard)
    })
}

searchInput.addEventListener('input', (e)=>{
//  console.log(e.target.value);
//  console.log(allCountriesData);
const filteredCountries = allCountriesData.filter((country)=>country.name.common.toLowerCase().includes(e.target.value.toLowerCase()))
console.log(filteredCountries);
 rendercountries(filteredCountries)
})

// themeChanger.addEventListener('click', ()=>{
//   document.body.classList.toggle('dark')
// })


const themeChanger = document.querySelector('.theme-changer');

if (themeChanger) {
    themeChanger.addEventListener('click', () => {
        document.body.classList.toggle('dark');
        
        if (document.body.classList.contains('dark')) {
            // Corrected: Use themeChanger.innerHTML
            localStorage.setItem('theme', 'dark');
            themeChanger.innerHTML = '<i class="fa-solid fa-moon"></i>&nbsp;&nbsp;Light Mode'; 
        } else {
            // Corrected: Use themeChanger.innerHTML
            localStorage.setItem('theme', 'light');
            themeChanger.innerHTML = '<i class="fa-regular fa-moon"></i>&nbsp;&nbsp;Dark Mode';
        }
    });
}

// Function to set the theme based on localStorage
function initializeTheme() {
    const savedTheme = localStorage.getItem('theme');
    
    // Check if a theme is saved and if it's 'dark'
    if (savedTheme === 'dark') {
        document.body.classList.add('dark');
        // Set the button text to 'Light Mode' since we are in Dark Mode
        themeChanger.innerHTML = '<i class="fa-solid fa-moon"></i>&nbsp;&nbsp;Light Mode';
    } else {
        // Ensure the default state (light) is set if no preference or 'light' is saved
        document.body.classList.remove('dark');
        themeChanger.innerHTML = '<i class="fa-regular fa-moon"></i>&nbsp;&nbsp;Dark Mode';
    }
}

// Call the function when the script loads
initializeTheme();
