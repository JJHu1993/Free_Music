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


function ping(ip, port, callback){
  if(!this.inUse){
    this.status = 'unchecked';
    this.inUse = true;
    this.callback = callback;
    this.ip = ip;
    this.port = port;
    var _that = this;

    this.img = new Image();
    this.img.onload = function(){
      _that.inUse = false;
      _that.callback('responded');

    };
    this.img.onerror = function(e){
      if(_that.inUse){
        _that.inUse = false;
        _that.callback('responded', e);
      }

    };
    this.start = new Date().getTime();
    this.img.src = "http://"+ip;
    this.timer = setTimeout(function(){
          if(_that.inUse){
            _that.inUse = false;
            _that.callback('timeout');
          }
        }, 1500);
  }
}


function setup_pac_file(server_ip)
{
  var pac_server_addr = 'PROXY '+server_ip;
  //pac_server_addr = 'PROXY 122.193.14.104:80; ';
  console.log("use ip :"+pac_server_addr);
  pac_server_addr += '; DIRECT';
  //console.log(pac_server_addr);
  var pac_data = "function FindProxyForURL(url, host) {\n"+
                 "  if(shExpMatch(host, '*.163.com')||shExpMatch(host, '*.126.net')||shExpMatch(host, '*.qq.com'))\n" +
                 "    return '"+pac_server_addr+"';\n" +
                 "  return 'DIRECT';\n" +
                 "}";

  //console.log(pac_data);
  var proxy_config = {
    mode: 'pac_script',
    pacScript: {
      data: pac_data
    }
  };

  chrome.proxy.settings.set(
      {
        value: proxy_config,
        scope: 'regular'
      },
      function(){}
      );

}

/*
 * Test proxy server connection,
 * if ping succeeded, setup pac file.
 */
function test_server(server_list){
  //console.log("enter setup_pac_data func");

  // generate a random number between [0,5]
  // use this strategy to avoid the fastest server
  // is always the same and not working
  var random_num;
  if(server_list.length >= 5)
  {
    random_num = Math.floor(Math.random()*5);
  }else{
    random_num = Math.floor(Math.random()*server_list.length);
  }
  console.log("random_num:"+random_num);
  var server     = server_list[random_num];
  var server_responded_list = [];
  /*
   * ONLY TEST the Fastest server
   */
   var responded = false;
  for(var i=0; i<server_list.length; i++){
    console.log("test ip No:"+i);
    new ping(server_list[i].ip, server_list[i].port, function(stat,e){
      // check if this server is healthy
      if(stat === 'responded' && !responded){
        responded = true;
        console.log("responded ip :"+this.ip+":"+this.port);
        setup_pac_file(this.ip+":"+this.port);
      }
    });
  }
  if(!responded)
    setup_pac_file("218.25.13.23:80");


}

function setup_proxy(server_list){
  //console.log("execute setup_proxy func");
  test_server(server_list);
}