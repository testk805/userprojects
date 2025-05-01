const axios = require('axios');

exports.getTeams = async (req, res) => {
  const { countryname } = req.query;
  try {
    const response = await axios.get(`https://en.wikipedia.org/wiki/List_of_football_clubs_in_${countryname}`);
    const teams = extractTeams(response.data);
    res.json({ cupname: 'PL', teamlist: teams });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch teams' });
  }
};

function extractTeams(data) {
  // Placeholder: implement extraction logic
  return 'manu, manc, liverpool';
}