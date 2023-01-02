export const leagueDetails = {
  country: {
    name: 'Poland',
    code: 'PL',
    flag: 'https://media-1.api-sports.io/flags/pl.svg',
  },
  league: {
    id: 106,
    name: 'Ekstraklasa',
    type: 'League',
    logo: 'https://media-1.api-sports.io/football/leagues/106.png',
  },
  seasons: [
    {
      year: 2022,
      start: '2022-07-16',
      end: '2023-05-27',
      current: true,
      coverage: {
        fixtures: {
          events: true,
          lineups: true,
          statistics_fixtures: true,
          statistics_players: true,
        },
        standings: true,
        players: true,
        top_scorers: true,
        top_assists: true,
        top_cards: true,
        injuries: false,
        predictions: true,
        odds: false,
      },
    },
  ],
};
