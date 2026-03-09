// Global Variable Decleration
let allIssuesData = [];

const allIssues = () =>{  

    manageSpinner(true);
    
    const url = "https://phi-lab-server.vercel.app/api/v1/lab/issues";
    fetch(url)
        .then((res)=>res.json())
        .then((data)=>{
            // To save Data all data in global variable to use in future
            allIssuesData = data.data; 

            // Display Function called to show all data  
            displayAllIssues(allIssuesData); 
            activeButton("all-btn");
            
            });           
};


// // Modal Section Function
// const loadModalDetails = (id) =>{    
//     const url = `https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`;
//     fetch(url)
//         .then((res)=>res.json())
//         .then((data)=>{
//             modalData = data.data; 
//             console.log(modalData);
            
//             });    
// };

// Modal Section

const loadModalDetails = async (id) => {
    const url = `https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`;
   
    const res = await fetch(url);
    const details = await res.json();
    displayModalDetails(details.data);
};

const displayModalDetails = (modal) => {
    // console.log(modal);
    let modalLabels = "";
        for (let lab of modal.labels){
            modalLabels += `<span class="bg-yellow-100 rounded-full border border-yellow-500 text-yellow-600 px-2 py-1 mr-2 text-[10px]">
                                ${lab.toUpperCase()}
                            </span>`;
        }

    const modalBox = document.getElementById("modals-container")
    modalBox.innerHTML = `
        <div class="p-5 space-y-5">
            <div>
                <h2 class="text-xl font-bold mb-4">${modal.title}</h2>
            </div>
            <div>
                <span class="
                    ${modal.status === "open"?  "bg-green-100 rounded-full text-green-500 px-3 py-1 border border-green-600" 
                        : "bg-purple-100 rounded-full text-purple-500 px-3 py-1 border border-purple-600"
                    }               
                ">${modal.status}</span>
                <span class="text-slate-500"><i class="fa-solid fa-circle"></i>  ${modal.author}</span>
                <span class="text-slate-500"><i class="fa-solid fa-circle"></i>  ${modal.createdAt}</span>
            </div>

            <div>
                <div>                                
                    ${modalLabels}
                </div>                        
            </div>

            <div>
                <p class=" text-slate-500">${modal.description}</p>
            </div>
            <div class="flex justify-between items-center">
                <div>
                    <p class="text-slate-500">Assignee:</p>
                    <h2 class="font-bold">${modal.assignee}</h2>
                </div>
                <div>
                    <p class="text-slate-500">Priority:</p>
                    <span class="
                                    ${modal.priority === "high"?  "bg-red-100 rounded-full text-red-500 px-3 py-1" :
                                        modal.priority === "medium" ? "bg-yellow-100 rounded-full text-yellow-500 px-3 py-1" : 
                                        "bg-slate-100 rounded-full text-slate-500 px-3 py-1"
                                    }                               
                                ">${modal.priority}</span>
                </div>
            </div>
        </div>
    `;
    document.getElementById("my_modal_5").showModal();

};


// All Issue Display Function
const displayAllIssues=(issues)=>{
    // console.log(issues); 

    const allIssuesContainer = document.getElementById('all-issues-container');
    allIssuesContainer.innerHTML = "";


    for(let issue of issues){
        // Issue Counter
        const issueCount = document.getElementById("issue-count");
        issueCount.innerHTML = issues.length + " Issues";

        let innerLabels = "";
        for (let label of issue.labels){
            innerLabels += `<span class="bg-yellow-100 rounded-full border border-yellow-500 text-yellow-600 px-2 py-1 mr-2 text-[10px]">
                                ${label.toUpperCase()}
                            </span>`;
        }

        const issueCard = document.createElement('div')
        issueCard.innerHTML = `
            <div onClick="loadModalDetails(${issue.id})" class="
                ${issue.status === "open"?  "border-t-6 border-green-600 rounded-xl mt-6 shadow-xl" 
                    : "border-t-6 border-purple-600 rounded-xl mt-6 shadow-xl" 
                } h-full                
                ">
                <div class="pt-5 pl-5 pr-5">                
                    <div class="space-y-5">
                        <div class="flex items-center justify-between">
                            <div>
                                ${issue.status === "open"? `<img src="/assets/Open-Status.png" alt="">`: `<img src="/assets/Closed- Status .png" alt="">`}
                            </div>

                            <div>
                                <span class="
                                    ${issue.priority === "high"?  "bg-red-100 rounded-full text-red-500 px-3 py-1" :
                                        issue.priority === "medium" ? "bg-yellow-100 rounded-full text-yellow-500 px-3 py-1" : 
                                        "bg-slate-100 rounded-full text-slate-500 px-3 py-1"
                                    }                               
                                ">${issue.priority}</span>
                            </div>
                        </div>
                        <div>
                            <h2 class="text-xl font-bold mb-4">${issue.title}</h2>
                            <p class=" text-slate-500">${issue.description}</p>
                        </div>
                        <div>
                            <div>                                
                                ${innerLabels}
                            </div>                        
                        </div>
                    </div>                                
                </div>

                <div class="divider"></div>

                <div class="pb-5 pl-5 pr-5 rounded-xl text-slate-500 flex flex-col justify-center">
                    <div>
                        <span class="font-bold">${issue.author}</span>                        
                    </div>
                    <div>
                        <span>${issue.createdAt}</span>
                    </div>
                </div>
            </div>
        `;

        allIssuesContainer.appendChild(issueCard);
        manageSpinner(false);
    }
    
};



// Open Status Filtering for Open Button
const openIssues = () =>{
    const openData = allIssuesData.filter(issue => issue.status === "open");
    displayAllIssues(openData);
    activeButton("open-btn");
}

// Closed Status Filtering for Closed Button
const closedIssues = () =>{    
    const closedData = allIssuesData.filter(issue => issue.status === "closed");
    displayAllIssues(closedData);
    activeButton("closed-btn");    
}

// For All Button 
const showAll = () =>{
    displayAllIssues(allIssuesData);
    activeButton("all-btn");
}

// Active Button Select
function activeButton(id){
    const allBtn = document.getElementById("all-btn")
    allBtn.classList.remove("active");

    const openBtn = document.getElementById("open-btn")
    openBtn.classList.remove("active");

    const closedBtn = document.getElementById("closed-btn")
    closedBtn.classList.remove("active");

    const activeBtn = document.getElementById(id)
    activeBtn.classList.add("active");

}

// For Search

const search = () => {
    const searchText = document.getElementById("search-field").value.toLowerCase();
    const findSearch = allIssuesData.filter(issue =>
        issue.title.toLowerCase().includes(searchText) ||
        issue.description.toLowerCase().includes(searchText) ||
        issue.author.toLowerCase().includes(searchText) ||
        issue.priority.toLowerCase().includes(searchText) ||
        issue.status.toLowerCase().includes(searchText) ||
        issue.labels.join(" ").toLowerCase().includes(searchText)
    );
    displayAllIssues(findSearch);
};

// Spinner Function
const manageSpinner = (status) => {
    if (status == true) {
        document.getElementById("spinner").classList.remove("hidden");
        document.getElementById("all-issues-container").classList.add("hidden");
    } else {
        document.getElementById("all-issues-container").classList.remove("hidden");
        document.getElementById("spinner").classList.add("hidden");        
    }
};

allIssues();


