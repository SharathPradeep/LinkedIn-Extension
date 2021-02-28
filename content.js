chrome.runtime.onMessage.addListener(
    function(request,sender,sendResponse) {
      console.log(request);
      const name=document.querySelectorAll('.entity-result__title-text');

      let userInfo=[];
      
      name.forEach((current)=>{
        userUrl=(current.firstElementChild.getAttribute('href'));
        const array=current.innerText.split('\n');
        userName=(array[0]);
        userInfo.push({url:userUrl,name:userName});
      })
      
      sendResponse({data: userInfo});
    }
);

