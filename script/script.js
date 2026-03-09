// Global Variable Decleration
let allIssuesData = [];

const allIssues = () =>{
    const url = "https://phi-lab-server.vercel.app/api/v1/lab/issues";
    fetch(url)
        .then((res)=>res.json())
        .then((data)=>{
            // To save Data all data in global variable to use in future
            allIssuesData = data.data; 

            // Display Function called to show all data  
            displayAllIssues(allIssuesData); 
            });    
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
            <div class="
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
    }
    
};

allIssues();

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





