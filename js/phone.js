const loadPhone = async (searchText,isShowAll) =>{
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data = await res.json();
    const phones = data.data;
    //console.log(phones);
    displayPhone(phones,isShowAll);
}
const displayPhone = (phones, isShowAll ) => {
    //console.log(phones);

    const phoneContainer = document.getElementById('Phone-container');
    // clear phone container cards before adding new cards 
    phoneContainer.textContent = '';

    //display show all button if there are more then 12 phones 
    const showAllContainerr = document.getElementById('show-all-container');
    if(phones.length > 12 && !isShowAll ){
        showAllContainerr.classList.remove('hidden');
    }
    else{
        showAllContainerr.classList.add('hidden');
    }
    console.log('is show all', isShowAll);


    // display only 12 phones if not show all
    
    if(!isShowAll){
        phones = phones.slice(0,12);
    }

    phones.forEach(phone =>{
        console.log(phone);
        // 2 Create a div
        const phoneCard = document.createElement('div');
        phoneCard.classList = `card bg-gray-150 p-4 shadow-xl`;
        // 3 set inner html
        phoneCard.innerHTML = `
        <figure><img src="${phone.image}" alt="Shoes" /></figure>
                            <div class="card-body">
                            <h2 class="card-title">${phone.phone_name}</h2>
                            <p>If a dog chews shoes whose shoes does he choose?</p>
                            <div class="card-actions justify-center">
                            <button onclick="handleShowDetail('${phone.slug}')" class="btn btn-primary">Show Details</button>
                            </div>
                            </div>
        `
        // 4 append child 
        phoneContainer.appendChild(phoneCard);
    });
    //hide loading spinner 
    toggleLoadingSpinner(false);
}

// show Detail button 
const handleShowDetail = async (id) =>{

    console.log(id);
    //load single phone data  data 
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
    const data = await res.json();
    console.log(data);
}



// handel search button
const handleSearch = (isShowAll) =>{
    toggleLoadingSpinner(true);
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    console.log(searchText);
    loadPhone(searchText, isShowAll);
}


const toggleLoadingSpinner = (isLoading) =>{
    const loadingSpinner = document.getElementById('loading-spinner');
    if(isLoading){
        loadingSpinner.classList.remove('hidden')
    }
    else{
        loadingSpinner.classList.add('hidden');
    }
}

//handle show all

const handleShowAll = () =>{
    handleSearch(true);
}

// loadPhone();
