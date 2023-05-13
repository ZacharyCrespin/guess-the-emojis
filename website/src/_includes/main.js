const serverURL = 'https://server.guess-the-emojis.zacharyc.site'

function toTitleCase(value) {
  return value.replace(
    /\w\S*/g,
    function(txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    }
  );
}