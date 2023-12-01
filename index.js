
// Helper functions

// fetch data
const fetchData = async (id) => {
    try {
        const response = await fetch(`https://openapi.programming-hero.com/api/videos/category/${id}`);
        const videos = await response.json();
        return videos;
    } catch(err) {
        console.log(err)
        throw err;
   }
}

// convert second
const convertSecond = (string) => {
    const seconds = parseFloat(string);
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    
    const hourText = hours > 0 ? `${hours} hours ` : "";
    const minuteText = minutes > 0 ? `${minutes} minutes` : "";

    if (hours > 0 && minutes > 0) {
        return `${hourText} ${minuteText} ago`
    
    } else if (hours > 0) {
        return `${hourText}`
    }
    else if (minutes > 0) {
        return `${minuteText}`
    } else {
        return 'Just Now'
    }
}

// convert string to number
const stringToNumber = (string) => {
    let newStr = string.slice(0,  -1);
    const number = parseFloat(newStr)
    return number;
}


// display data
const displayData = async (id) => {
    try {
        const videos = await fetchData(id);
        
        const container = document.getElementById('container');
        container.classList.add('video-container')
        container.innerHTML = '';
        
        //drawing button's code
        if (id == 1005 || !videos || !videos.data || videos.data.length == 0) {
            container.classList.remove('video-container')
            //error container
            const errorContainer = document.createElement('div')
            errorContainer.classList.add('error-container');
          
           
            //display image
            const errorImg = document.createElement('img');
            errorImg.src = './images/Icon.png';
            errorImg.alt = 'error image';
            errorContainer.appendChild(errorImg)
           
            //display error massage
            const error = document.createElement('h1')
            error.textContent = "OOps! Sorry there is no content here"
            errorContainer.appendChild(error)

            container.appendChild(errorContainer);
            return;

            console.log('No data found!')
        }

        
        const data = videos.data;
        console.log(data)
        data?.map((video) => {
            const card = document.createElement('div');
            card.classList.add('card');
            
            let isVerified = video.authors[0].verified;

            card.innerHTML = `
                <img class="thumbnail" src="${video.thumbnail}" alt="img"/>
                <small class="second">${convertSecond(video.others.posted_date)}</small>
                <div class="card-profile">
                    <img src="${video.authors[0].profile_picture}" alt="img"/>
                    <h4>${video.title}</h4> 
                    </div>
                    <div class="card-text">
                        <div class="verified-text">
                        <p>${video.authors[0].profile_name}</p>
                        ${isVerified ? '<img class="verified-badge" src="./images/tick.png" alt="verifiedImage" />' : ""}
                        </div>
                   
                    <p>${video.others.views} views</p>
                </div>
            `;

            container.appendChild(card);
        });
    } catch (err) {
       
        console.error(err);
    }
}

// display data by sorting
const displayDataByViews = async (id) => {
    try {
        const videos = await fetchData(id);
        
        const container = document.getElementById('container');
        // const btnContainer = document.querySelectorAll('btn');
        // btnContainer.foreach(btn => btn.classList.add('active'))
        container.classList.add('video-container')
        container.innerHTML = '';
        
        //drawing button's code
        if (id == 1005 || !videos || !videos.data || videos.data.length == 0) {
            container.classList.remove('video-container')
            //error container
            const errorContainer = document.createElement('div')
            errorContainer.classList.add('error-container');
          
           
            //display image
            const errorImg = document.createElement('img');
            errorImg.src = './images/Icon.png';
            errorImg.alt = 'error image';
            errorContainer.appendChild(errorImg)
           
            //display error massage
            const error = document.createElement('h1')
            error.textContent = "OOps! Sorry there is no content here"
            errorContainer.appendChild(error)

            container.appendChild(errorContainer);
            return;

            console.log('No data found!')
        }

        const data = videos.data.sort((a, b) => {
  
        return stringToNumber(b.others.views) - stringToNumber(a.others.views)
           
        })
        data?.map((video) => {
            const card = document.createElement('div');
            card.classList.add('card');
            
            let isVerified = video.authors[0].verified;

            card.innerHTML = `
                <img class="thumbnail" src="${video.thumbnail}" alt="img"/>
                <small class="second">${convertSecond(video.others.posted_date)}</small>
                <div class="card-profile">
                    <img src="${video.authors[0].profile_picture}" alt="img"/>
                    <h4>${video.title}</h4> 
                    </div>
                    <div class="card-text">
                        <div class="verified-text">
                        <p>${video.authors[0].profile_name}</p>
                        ${isVerified ? '<img class="verified-badge" src="./images/tick.png" alt="verifiedImage" />' : ""}
                        </div>
                   
                    <p>${video.others.views} views</p>
                </div>
            `;

            container.appendChild(card);
    
        });
    } catch (err) {
       
        console.error(err);
    }
}


displayData(1000);