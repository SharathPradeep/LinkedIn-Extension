const strInput = document.getElementById('search1');
const numInput = document.getElementById('search2');
const btn = document.getElementById('button');

btn.addEventListener('click', (e)=>
{
    e.preventDefault();
    const number = numInput.value;
    const str = strInput.value;    
    const urlArray = [];
    for (let i =1; i<=number; i++)
    {
        urlArray.push(`https://www.linkedin.com/search/results/people/?keywords=${str}&page=${i}`);
    }
    
    

    
    (async () =>
    {
        
        for(url of urlArray)
        {
            await new Promise(trav =>
                {
                    chrome.tabs.update({url: url, active: true}, tab=>
                    {
                        chrome.tabs.onUpdated.addListener(function onUpdated(tabid, loading)
                        {
                            if(tabid === tab.id && loading.status == 'complete')
                            {
                                chrome.tabs.onUpdated.removeListener(onUpdated);
                                chrome.tabs.executeScript(tabid, {file: "content.js"}, ()=>
                                {
                                    chrome.tabs.sendMessage(tab.id, "Success",(response)=>
                                    {
                                        const post = async (data)=>
                                        {
                                            const response = await fetch('https://602e7c2c4410730017c50b9d.mockapi.io/linkedIN_js_ext_task',
                                            {
                                                method: 'POST',
                                                headers: {'Content-type':'application/json'},
                                                body: JSON.stringify(data)
                                            });
                                            const res = await response.json();
                                            return res;
                                        }

                                        const res1 = post(response.data);
                                        const userDetails = (response.data);
                                        console.log(userDetails);
                                        console.log(res1);                                            
                                    });
                                    trav();
                                })
                            }
                        })
                    })  
                });
        }
    })();
     
})
