/*
 * This file is part of Free_Music.
 *
 * Foobar is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * Foobar is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with Foobar.  If not, see <http://www.gnu.org/licenses/>.
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
    for(var i = 0; i < server_list.length; i++)
    {
      console.log(server_list[i]);
    }
    setup_proxy(server_list);

  });
}

function change_plugin_icon(option){
  switch(option){
    case 'enable':
      chrome.browserAction.setIcon({
        path:"icon.png"
      });
      chrome.browserAction.setTitile({title: 'unblock netease is on'});
      break;
    case 'disable':
      chrome.browserAction.setIcon({
        path:"greyicon.png"
      });
      chrome.browserAction.setTitile({title: 'unblock netease is off'});
      break;
  }
}


/* When each time open netease website or qq music website
* update the proxy server, and reset PAC file.
*/
document.addEventListener('DOMContentLoaded', function() {
  getCurrentTabUrl(function(curUrl){
    //console.log(curUrl);
    if(isMatchNEMusicDomain(curUrl) || isMatchQQMusicDomain(curUrl)||isMatchXMMusicDomain(curUrl)){
      //console.log("call setup proxy from addEventListener")
      setupProxy();
    }else{
      //console.log("false");
    }

  });
});


// set up a pac file when plugin lanched
setupProxy();
FM_Version = '1.0';
