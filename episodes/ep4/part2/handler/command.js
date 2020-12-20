const { readdirSync } = require('fs');

const ascii = require("ascii-table");

let table = new ascii("Commands");
table.setHeading("Command Name", "Load Status");

module.exports = (client) => {

    readdirSync("./commands/").forEach(dir => {

        const commands = readdirSync(`./commands/${dir}`).filter(file => file.endsWith(".js"));

        for (let file of commands) {
            let pull = require(`../commands/${dir}/${file}`);

            if (pull.name) {
                client.commands.set(pull.name, pull);
                table.addRow(file, '✔️');
            }
            else {
                table.addRow(file, `❌ -> Missing a help.name or the help.name provided is not a valid string`);
                continue;
            }

            if (pull.aliases && Array.isArray(pull.aliases)) pull.aliases.forEach(alias => client.aliases.set(alias, pull.name));
        }
    });

    console.log(table.toString());
}

/**
 * Basic cmd layout for cmd handler. Use this when creating commands
 *---------------------------------------------------------------- 
 * const Discord = require('discord.js');
 * 
 * module.exports = {
 *  name: 'Command name',
 *  aliases: ["Alias1", "alias2", "alias3"], - Optional
 *  category: 'Name of subfolder',
 *  description: "Brief summary of what the command does",
 *  run: (client, message, args) => {
 * 
 * Command goes here to execute
 * 
 * }
 * }
 * -------------------------------------------------------------------
*/
