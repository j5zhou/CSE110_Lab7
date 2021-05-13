// script.js

import { router } from './router.js'; // Router imported so you can use it to manipulate your SPA app here
const setState = router.setState;

// Make sure you register your service worker here too
    //added
    let setting = document.getElementsByTagName("img")[0];
    let main = document.querySelector('main');
    let title = document.querySelector('h1');
    let body = document.querySelector('body');

document.addEventListener('DOMContentLoaded', () => {
  fetch('https://cse110lab6.herokuapp.com/entries')
    .then(response => response.json())
    .then(entries => {
      //added
      let i = 1;

      entries.forEach(entry => {
        let newPost = document.createElement('journal-entry');
        newPost.entry = entry;
        newPost.number = i;
        //added
        newPost.addEventListener("click", () =>{
          router.setState(newPost.entry,"Entry "+newPost.number, "#entry"+(newPost.number));
            main.style.display ="none";
          
            //changing the title
            title.innerText="Entry " + newPost.number;
            
            //delete the old entry page
            let entry_page = document.querySelector('entry-page');
            if(entry_page){
              entry_page.remove();
             }
        
            //create the new entry page
            let new_entry = document.createElement('entry-page');
            new_entry.entry = newPost.entry;
            new_entry.style.display ="block";
        
            let position = document.querySelector("body");
            position.appendChild(new_entry);

        });
      
        i++;
        document.querySelector('main').appendChild(newPost);

      });
    });

    setting.addEventListener("click", () =>{
        router.setState({index:11},"Setting ","#settings");
        main.style.display ="none";
        title.innerText = "Settings";
        body.classList.add("settings");
         //delete the old entry page
         let entry_page = document.querySelector('entry-page');
         if(entry_page){
          entry_page.remove();
         }
    });

    title.addEventListener("click", () =>{
      router.setState({index:0},"Home Page ","/");
      main.style.display ="block";
      body.classList.remove("settings");
      title.innerText = "Journal Entries";
    });
});

window.addEventListener('popstate', (event) => {

    console.log(event.state);
    console.log(window.location);

    //home page
    if(!event.state||event.state.index==0){
      main.style.display ="block";
      body.classList.remove("settings");
      title.innerText = "Journal Entries";

      //delete the old entry page
      let entry_page = document.querySelector('entry-page');
      if(entry_page){
        entry_page.remove();
       }
    }
    //setting page
    else if(event.state.index==11){
      main.style.display ="none";
        title.innerText = "Settings";
        body.classList.add("settings");
         //delete the old entry page
         let entry_page = document.querySelector('entry-page');
         if(entry_page){
          entry_page.remove();
      }
    }else{
      main.style.display ="none";
          
      //changing the title
      let entry_title = window.location.hash.substr(6);
      title.innerText="Entry " + entry_title;
      
      body.classList.remove("settings");
      
      //delete the old entry page
      let entry_page = document.querySelector('entry-page');
      if(entry_page){
        entry_page.remove();
       }
  
      //create the new entry page
      let new_entry = document.createElement('entry-page');
      new_entry.entry = event.state;
      new_entry.style.display ="block";
  
      let position = document.querySelector("body");
      position.appendChild(new_entry);
    }
  
});
