const serverURL = 'https://guess-the-emojis-server-ta5ihvbchq-uw.a.run.app'

function toTitleCase(value) {
  return value.replace(
    /\w\S*/g,
    function(txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    }
  );
}
