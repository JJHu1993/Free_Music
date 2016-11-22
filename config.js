/*
 * This file is part of Free_Music.
 *
 * Free_Music is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * Free_Music is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with Free_Music.  If not, see <http://www.gnu.org/licenses/>.
 */


function getCurrentTabUrl(callback) {
  var queryInfo = {
    active: true,
    currentWindow: true
  };

  chrome.tabs.query(queryInfo, function(tabs){
    var tab = tabs[0];
    var url = tab.url;
    callback(url);
  });
}

function isMatchNEMusicDomain(theUrl){
  var testUrl = 'music.163.com';
  if(theUrl.indexOf(testUrl) !== -1)
  {
    return true;
  }else{
    return false;
  }
}

function isMatchQQMusicDomain(theUrl){
  var testUrl = 'y.qq.com';
  if(theUrl.indexOf(testUrl) !== -1)
  {
    return true;
  }else{
    return false;
  }
}

function isMatchXMMusicDomain(theUrl){
  var testUrl = 'www.xiami.com';
  if(theUrl.indexOf(testUrl) !== -1)
  {
    return true;
  }else{
    return false;
  }
}

function setupProxy(){
  //console.log("start to setup proxy for Netease music");
  getServerAddr(function(server_list){
    //the number of servers
    var mainmenu = document.getElementsByClassName('mainmenu')[0];
    var li = mainmenu.getElementsByTagName('li')[0];
    var message = document.createElement('div');
    message.className = 'messages';
    message.appendChild(document.createTextNode(server_list.length));
    li.appendChild(message);

    //information of servers
    for(var i = 0; i < server_list.length; i++)
    {
      var submenu = document.getElementsByClassName('submenu')[0]
      var li = document.createElement('li');
      var span = document.createElement('span');
      span.appendChild(document.createTextNode(server_list[i].info+'<IP>'+server_list[i].ip+':'+server_list[i].port));
      li.appendChild(span);
      submenu.appendChild(li);
      console.log(server_list[i]);
    }

    // setup_proxy(server_list);

  });
}

/*
 * No use
 */
function change_plugin_icon(option){
  switch(option){
    case 'enable':
      chrome.browserAction.setIcon({
        path:"icon.png"
      });
      chrome.browserAction.setTitile({title: 'turn on'});
      break;
    case 'disable':
      chrome.browserAction.setIcon({
        path:"greyicon.png"
      });
      chrome.browserAction.setTitile({title: 'turn off'});
      break;
  }
}

/*
 * When each time open netease website or xiami music website
 * update the proxy server, and reset PAC file.
 */
// document.addEventListener('DOMContentLoaded', function() {
//   getCurrentTabUrl(function(curUrl){
//     //console.log(curUrl);
//     if(isMatchNEMusicDomain(curUrl) ||isMatchXMMusicDomain(curUrl)){
//       //console.log("call setup proxy from addEventListener")
//       setupProxy();
//     }else{
//       //console.log("false");
//     }
//
//   });
// });


// set up a pac file when plugin lanched
setupProxy();
