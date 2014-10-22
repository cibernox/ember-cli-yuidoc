module.exports = {
  name: 'yuidoc',
  description: 'Generates html documentation using YUIDoc',
  runCommand: function(command, args) {
    console.log('Running yuidoc addon');
    console.log('command is ', command);
    console.log('args are ', args);
  }
}
