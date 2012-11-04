/*
BSD Licence

Copyright (c) 2011, Emidio STANI
All rights reserved.

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:

    * Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
    * Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
    * Neither the name of the creator nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.

//-----------------
History:

1.0:
	-Initial release
*/

var wiki = {
confluence:{
  start_table: "",
  end_table: "",
  header: "||Command||Target||Value||\n",
  header_row:"||#",
  start_row: "| ",
  end_row: " |\n",
  separator: " | ",
},
dokuwiki:{
  start_table: "",
  end_table: "",
  header: "^ Command ^ Target ^ Value ^\n",
  header_row:"^ # ",
  start_row: "| ",
  end_row: " |\n",
  separator: " | ",
},
mediawiki:{
  start_table: "{|border=\"1\" \n",
  end_table: "|}",
  header: "!Command\n!Target\n!Value\n",
  header_row:"!#\n",
  start_row: "|-\n|",
  end_row: "\n",
  separator: "\n|",
},
moinmoin:{
  start_table: "",
  end_table: "",
  header: "||\'\'\'Command\'\'\'||\'\'\'Target\'\'\'||\'\'\'Value\'\'\'||\n",
  header_row:"||\'\'\'#\'\'\'",
  start_row: "||",
  end_row: "||\n",
  separator: "||",
},
textile:{
  start_table: "",
  end_table: "",
  header: "|_. Command|_. Target|_. Value|\n",
  header_row:"|_. #",
  start_row: "|",
  end_row: "|\n",
  separator: "|",
},
trac:{
  start_table: "",
  end_table: "",
  header: "||= Command =||=  Target =||=  Value =||\n",
  header_row:"||= # =",
  start_row: "||",
  end_row: "||\n",
  separator: "||",
},
twiki:{
  start_table: "",
  end_table: "",
  header: "|  *Command*  |  *Target*  |  *Value*  |\n",
  header_row:"| *#*",
  start_row: "|  ",
  end_row: "  |\n",
  separator: "  |  ",
},
xwiki:{
  start_table: "",
  end_table: "",
  header: "|=Command|=Target|=Value\n",
  header_row:"|=#",
  start_row: "|",
  end_row: "\n",
  separator: "|",
}
};

function formatCommands(commands) {
  var result = '';
  var start_table =  wiki[options['wiki']]["start_table"];
  var end_table =  wiki[options['wiki']]["end_table"];
  var header = wiki[options['wiki']]["header"];
  var header_row = wiki[options['wiki']]["header_row"];
  var start_row = wiki[options['wiki']]["start_row"];
  var end_row = wiki[options['wiki']]["end_row"];
  var sep = wiki[options['wiki']]["separator"];
  var row_num = '';
  for (var i = 0; i < commands.length; i++) {
    var command = commands[i];
    if('true' == options.row)
            row_num= i+sep;
    if (command.type == 'command') {
      result += start_row + row_num+ command.command + sep + command.target + sep + command.value + end_row;
    }
  }
    if('true' == options.row)
         header = header_row+header;
    result = start_table + header + result + end_table;
  return result;
}

function parse(testCase, source) {
  var doc = source;
  var commands = [];
  var start_row = wiki[options['wiki']]["start_row"];
  var sep = wiki[options['wiki']]["separator"];
  while (doc.length > 0) {
    var line = /(.*)(\r\n|[\r\n])?/.exec(doc);
    var line2 = line[1].slice(start_row.length);
    var array = line2.split(sep);
    if (array.length >= 3) {
      var command = new Command();
      command.command = array[0];
      command.target = array[1];
      command.value = array[2];
      commands.push(command);
    }
    doc = doc.substr(line[0].length);
  }
  testCase.setCommands(commands);
}

function format(testCase, name) {
  return formatCommands(testCase.commands);
}

options = {wiki: 'confluence', row:"false"};

configForm ='<description>Choose a wiki syntax:</description>' +
			'<menulist id="options_wiki"><menupopup>' +
			'<menuitem label="Confluence" value="confluence"/>' +
			'<menuitem label="DokuWiki" value="dokuwiki"/>' +
			'<menuitem label="MediaWiki" value="mediawiki"/>' +
			'<menuitem label="MoinMoin" value="moinmoin"/>' +
			'<menuitem label="Textile" value="textile"/>' +
			'<menuitem label="Trac" value="trac"/>' +
			'<menuitem label="Twiki" value="twiki"/>' +
			'<menuitem label="Xwiki" value="xwiki"/>'+
			'</menupopup></menulist>'+
			'<separator class="groove"/>' +
			'<checkbox id="options_row" label="Row number"/>';