import router from '@/router';

export const goToLeaguePage = (leagueId, season) => {
  const params = {
    id: leagueId,
    season: season,
  };

  router.push({
    name: 'League details',
    params: {
      id: params.id,
      season: params.season,
    },
  });
};
