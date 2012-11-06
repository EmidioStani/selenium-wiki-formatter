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
		confluence: {
			start_table: "",
			end_table: "",
			header: "||Command||Target||Value||\n",
			header_row: "||#",
			start_row: "| ",
			end_row: " |\n",
			separator: " | "
		},
		dokuwiki: {
			start_table: "",
			end_table: "",
			header: "^ Command ^ Target ^ Value ^\n",
			header_row: "^ # ",
			start_row: "| ",
			end_row: " |\n",
			separator: " | "
		},
		mediawiki: {
			start_table: "{|border=\"1\" \n",
			end_table: "|}",
			header: "!Command\n!Target\n!Value\n",
			header_row: "!#\n",
			start_row: "|-\n|",
			end_row: "\n",
			separator: "\n|"
		},
		moinmoin: {
			start_table: "",
			end_table: "",
			header: "||\'\'\'Command\'\'\'||\'\'\'Target\'\'\'||\'\'\'Value\'\'\'||\n",
			header_row: "||\'\'\'#\'\'\'",
			start_row: "||",
			end_row: "||\n",
			separator: "||"
		},
		textile: {
			start_table: "",
			end_table: "",
			header: "|_. Command|_. Target|_. Value|\n",
			header_row: "|_. #",
			start_row: "|",
			end_row: "|\n",
			separator: "|"
		},
		trac: {
			start_table: "",
			end_table: "",
			header: "||= Command =||=  Target =||=  Value =||\n",
			header_row: "||= # =",
			start_row: "||",
			end_row: "||\n",
			separator: "||"
		},
		twiki: {
			start_table: "",
			end_table: "",
			header: "|  *Command*  |  *Target*  |  *Value*  |\n",
			header_row: "| *#*",
			start_row: "|  ",
			end_row: "  |\n",
			separator: "  |  "
		},
		xwiki: {
			start_table: "",
			end_table: "",
			header: "|=Command|=Target|=Value\n",
			header_row: "|=#",
			start_row: "|",
			end_row: "\n",
			separator: "|"
		}
	};

var options = {wiki: 'confluence', row: "false"};

function formatCommands(commands) {
	var result = '',
		start_table =  wiki[options.wiki].start_table,
		end_table =  wiki[options.wiki].end_table,
		header = wiki[options.wiki].header,
		header_row = wiki[options.wiki].header_row,
		start_row = wiki[options.wiki].start_row,
		end_row = wiki[options.wiki].end_row,
		sep = wiki[options.wiki].separator,
		row_num = '',
		i,
		command;
	for (i = 0; i < commands.length; i = i + 1) {
		command = commands[i];
		if ('true' === options.row) {
			row_num = i + sep;
		}
		if (command.type === 'command') {
			result += start_row + row_num + command.command + sep + command.target + sep + command.value + end_row;
		}
	}
	if ('true' === options.row) {
		header = header_row + header;
	}
	result = start_table + header + result + end_table;
	return result;
}

function parse(testCase, source) {
	var doc = source,
		commands = [],
		start_row = wiki[options.wiki].start_row,
		sep = wiki[options.wiki].separator,
		line,
		line2,
		array,
		command,
		i;
	if (doc.length > 0) {
		line = doc.split(/\r?\n/);

		for (i = 0; i < line.length; i = i + 1) {
			line2 = line[i].slice(start_row.length);
			array = line2.split(sep);
			if (array.length >= 3) {
				command = new Command();
				command.command = array[0];
				command.target = array[1];
				command.value = array[2];
				commands.push(command);
			}
		}
	}

	testCase.setCommands(commands);
}

function format(testCase, name) {
	return formatCommands(testCase.commands);
}

var configForm = '<description>Choose a wiki syntax:</description>' +
			'<menulist id="options_wiki"><menupopup>' +
			'<menuitem label="Confluence" value="confluence"/>' +
			'<menuitem label="DokuWiki" value="dokuwiki"/>' +
			'<menuitem label="MediaWiki" value="mediawiki"/>' +
			'<menuitem label="MoinMoin" value="moinmoin"/>' +
			'<menuitem label="Textile" value="textile"/>' +
			'<menuitem label="Trac" value="trac"/>' +
			'<menuitem label="Twiki" value="twiki"/>' +
			'<menuitem label="Xwiki" value="xwiki"/>' +
			'</menupopup></menulist>' +
			'<separator class="groove"/>' +
			'<checkbox id="options_row" label="Row number"/>';